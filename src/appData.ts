import { isPlayed, type Match } from "./data/types";
import { beforeKickoff, type LoggedPrediction, type LearningEvent } from "./learn";
import { generatePrediction, type Model, type Prediction } from "./predict";
import { compRates, strength, teamAt, type Params } from "./ratings";
import type { Player } from "./scorers";
import type { MatchNews } from "./teamNews";
import { getTeam } from "./teams";

/** Display names of the competitions the app lists, UEFA's club competitions first. */
export const COMP_NAMES: Record<string, string> = {
  cl: "Champions League",
  el: "Europa League",
  ecl: "Conference League",
  "en.1": "Premier League",
  "es.1": "LaLiga",
  "de.1": "Bundesliga",
  "it.1": "Serie A",
  "fr.1": "Ligue 1",
  "pt.1": "Primeira Liga",
  "nl.1": "Eredivisie",
  "at.1": "Austrian Bundesliga",
  "be.1": "Belgian Pro League",
  "tr.1": "Süper Lig",
  "sco.1": "Scottish Premiership",
  "gr.1": "Greek Super League",
};

/** The model update runs every 30 minutes (.github/workflows/nightly.yml). */
export const REFRESH_MINUTES = 30;
const FIXTURE_HOURS = 48;
const RESULT_HOURS = 24;

export type AppTeam = {
  id: string;
  name: string;
  short: string;
  abbr: string;
  color: string;
  markFg: string;
  country: string;
  /** Expected goal difference per game against a zero-rated side; ± its posterior spread. */
  strength: number;
  strengthSd: number;
  attack: number;
  defence: number;
  games: number;
};

type Call = { pHome: number; pDraw: number; pAway: number; pickTeamId: string; pWin: number; isHighProbability: boolean; at: string };

export type AppFixture = {
  id: string;
  comp: string;
  compName: string;
  date: string;
  kickoff?: string;
  localTime?: string;
  stage: string;
  home: AppTeam;
  away: AppTeam;
  /** The frozen first call, as scored for the record. */
  first?: Call;
  prediction: Pick<
    Prediction,
    | "fullTime"
    | "pHomeCi"
    | "pAwayCi"
    | "winner"
    | "margins"
    | "mostLikelyMargin"
    | "mostLikelyScore"
    | "topScores"
    | "xgHome"
    | "xgAway"
    | "pOver25"
    | "pBtts"
    | "pHomeAdvance"
    | "scenarios"
    | "bonusScorer"
    | "anytimeScorers"
    | "teamNews"
    | "commentary"
    | "confidence"
  >;
};

export type AppResult = {
  id: string;
  comp: string;
  compName: string;
  date: string;
  kickoff?: string;
  home: Pick<AppTeam, "id" | "name" | "short" | "abbr" | "color" | "markFg">;
  away: Pick<AppTeam, "id" | "name" | "short" | "abbr" | "color" | "markFg">;
  score: { home: number; away: number };
  /** The frozen call and how it fared; absent when the match was never predicted. */
  call?: { pHome: number; pDraw: number; pAway: number; pickTeamId: string; pWin: number; hit: boolean; logLoss: number; miss?: string; latestHit?: boolean };
};

export type RecordSummary = { n: number; logLoss: number; accuracy: number; highProbN: number; highProbWon: number; latestN: number; latestLogLoss: number };

export type AppData = {
  generatedAt: string;
  nextRefresh: string;
  ratingsAsOf: string;
  paramsVersion: number;
  tunedAt?: string;
  fixtures: AppFixture[];
  results: AppResult[];
  record: { all: RecordSummary; cl: RecordSummary; el: RecordSummary; ecl: RecordSummary; calibration: { band: string; predicted: number; happened: number; n: number }[] };
  learning?: { at: string; kind: string; reason: string };
  leagues: { country: string; offset: number; sd: number }[];
};

/** Listing order: Champions League, Europa League, Conference League, then the domestic leagues. */
const UEFA_ORDER = ["cl", "el", "ecl"];

const r3 = (x: number) => Math.round(x * 1000) / 1000;

function team(model: Model, id: string, date: string, mu: number): AppTeam {
  const t = getTeam(id);
  const s = teamAt(model.state, id, t.country, date, model.params);
  const league = model.state.leagues[t.country];
  const known = model.state.teams[id] ? strength(model.state, id, mu) : 0;
  return {
    id,
    name: t.name,
    short: t.shortName,
    abbr: t.abbr,
    color: t.color,
    markFg: t.markFg,
    country: t.country,
    strength: r3(known),
    strengthSd: r3(Math.sqrt((s.attack.v + s.defence.v) / 2 + (league?.v ?? 0))),
    attack: r3(s.attack.m + (league?.m ?? 0)),
    defence: r3(s.defence.m + (league?.m ?? 0)),
    games: s.games,
  };
}

function brief(t: AppTeam) {
  return { id: t.id, name: t.name, short: t.short, abbr: t.abbr, color: t.color, markFg: t.markFg };
}

function summarise(log: LoggedPrediction[]): RecordSummary {
  const scored = log.filter((p) => p.logLoss !== undefined);
  const n = scored.length;
  const hp = scored.filter((p) => p.pick.isHighProbability);
  const won = hp.filter((p) => (p.pick.side === "home" ? p.result!.home > p.result!.away : p.result!.away > p.result!.home)).length;
  const latest = scored.filter((p) => p.latest?.logLoss !== undefined);
  return {
    n,
    logLoss: n ? r3(scored.reduce((s, p) => s + p.logLoss!, 0) / n) : 0,
    accuracy: n ? r3(scored.filter((p) => p.hit).length / n) : 0,
    highProbN: hp.length,
    highProbWon: won,
    latestN: latest.length,
    latestLogLoss: latest.length ? r3(latest.reduce((s, p) => s + p.latest!.logLoss!, 0) / latest.length) : 0,
  };
}

function inWindow(m: Match, now: string, hours: number, forward: boolean): boolean {
  const t = Date.parse(now);
  const edge = t + (forward ? 1 : -1) * hours * 3_600_000;
  if (m.kickoff) {
    const k = Date.parse(m.kickoff);
    return forward ? k > t && k <= edge : k <= t && k >= edge;
  }
  // No kick-off time: compare whole days.
  const day = (x: number) => new Date(x).toISOString().slice(0, 10);
  return forward ? m.date >= day(t) && m.date <= day(edge) : m.date <= day(t) && m.date >= day(edge);
}

export type AppInputs = {
  matches: Match[];
  log: LoggedPrediction[];
  events: LearningEvent[];
  model: Model;
  params: Params;
  players?: Player[];
  /** Team news by match id (data/team-news.json). */
  news?: Record<string, MatchNews>;
  now: string;
};

/** Everything the app shows, from the committed model files. Fixture predictions are recomputed from the current state. */
export function buildAppData({ matches, log, events, model, params, players, news, now }: AppInputs): AppData {
  const byMatch = new Map(log.map((p) => [p.matchId, p]));
  const shown = new Set(Object.keys(COMP_NAMES));
  const order = (c: string) => UEFA_ORDER.indexOf(c) >>> 0;
  const sortKey = (m: Match) => m.kickoff ?? `${m.date}T${m.localTime ?? "12:00"}`;

  const fixtures: AppFixture[] = matches
    .filter((m) => shown.has(m.comp) && !isPlayed(m) && inWindow(m, now, FIXTURE_HOURS, true) && beforeKickoff(m, now))
    .sort((a, b) => order(a.comp) - order(b.comp) || (sortKey(a) < sortKey(b) ? -1 : 1))
    .flatMap((m) => {
      const firstLeg =
        m.leg === 2
          ? matches.find((x) => x.leg === 1 && x.stage === m.stage && x.season === m.season && x.home === m.away && x.away === m.home)?.ft
          : undefined;
      if (m.leg === 2 && !firstLeg) return [];
      const p = generatePrediction({ match: m, model, firstLeg, players, news: news?.[m.id], seed: 1 });
      const mu = compRates(model.state, m.comp, m.date, params).mu;
      const logged = byMatch.get(m.id);
      return [
        {
          id: m.id,
          comp: m.comp,
          compName: COMP_NAMES[m.comp] ?? m.comp,
          date: m.date,
          kickoff: m.kickoff,
          localTime: m.localTime,
          stage: m.stage,
          home: team(model, m.home, m.date, mu),
          away: team(model, m.away, m.date, mu),
          first: logged && {
            pHome: logged.pHome,
            pDraw: logged.pDraw,
            pAway: logged.pAway,
            pickTeamId: logged.pick.teamId,
            pWin: logged.pick.pWin,
            isHighProbability: logged.pick.isHighProbability,
            at: logged.madeAt,
          },
          prediction: {
            fullTime: p.fullTime,
            pHomeCi: p.pHomeCi,
            pAwayCi: p.pAwayCi,
            winner: p.winner,
            margins: p.margins,
            mostLikelyMargin: p.mostLikelyMargin,
            mostLikelyScore: p.mostLikelyScore,
            topScores: p.topScores,
            xgHome: p.xgHome,
            xgAway: p.xgAway,
            pOver25: p.pOver25,
            pBtts: p.pBtts,
            pHomeAdvance: p.pHomeAdvance,
            scenarios: p.scenarios,
            teamNews: p.teamNews,
            bonusScorer: p.bonusScorer,
            anytimeScorers: p.anytimeScorers.slice(0, 4),
            commentary: p.commentary,
            confidence: p.confidence,
          },
        },
      ];
    });

  const results: AppResult[] = matches
    .filter((m) => shown.has(m.comp) && isPlayed(m) && inWindow(m, now, RESULT_HOURS, false))
    .sort((a, b) => order(a.comp) - order(b.comp) || (sortKey(a) > sortKey(b) ? -1 : 1))
    .map((m) => {
      const l = byMatch.get(m.id);
      const mu = compRates(model.state, m.comp, m.date, params).mu;
      return {
        id: m.id,
        comp: m.comp,
        compName: COMP_NAMES[m.comp] ?? m.comp,
        date: m.date,
        kickoff: m.kickoff,
        home: brief(team(model, m.home, m.date, mu)),
        away: brief(team(model, m.away, m.date, mu)),
        score: m.ft!,
        call:
          l && l.logLoss !== undefined
            ? {
                pHome: l.pHome,
                pDraw: l.pDraw,
                pAway: l.pAway,
                pickTeamId: l.pick.teamId,
                pWin: l.pick.pWin,
                hit: !!l.hit,
                logLoss: r3(l.logLoss),
                miss: l.miss?.explanation,
                latestHit: l.latest?.hit,
              }
            : undefined,
      };
    });

  const scored = log.filter((p) => p.logLoss !== undefined);
  const bins = Array.from({ length: 5 }, () => ({ p: 0, o: 0, n: 0 }));
  for (const s of scored) {
    const r = s.result!;
    for (const [p, hit] of [
      [s.pHome, r.home > r.away],
      [s.pDraw, r.home === r.away],
      [s.pAway, r.away > r.home],
    ] as [number, boolean][]) {
      const b = bins[Math.min(4, Math.floor(p * 5))]!;
      b.p += p;
      b.o += hit ? 1 : 0;
      b.n += 1;
    }
  }
  const last = [...events].reverse().find((e) => e.kind !== "drift-check");

  return {
    generatedAt: now,
    nextRefresh: new Date(Date.parse(now) + REFRESH_MINUTES * 60_000).toISOString(),
    ratingsAsOf: model.state.asOf,
    paramsVersion: params.version,
    tunedAt: params.tunedAt,
    fixtures,
    results,
    record: {
      all: summarise(log),
      cl: summarise(log.filter((p) => p.comp === "cl")),
      el: summarise(log.filter((p) => p.comp === "el")),
      ecl: summarise(log.filter((p) => p.comp === "ecl")),
      calibration: bins
        .map((b, i) => ({ band: `${i * 20}–${i * 20 + 20}%`, predicted: b.n ? r3(b.p / b.n) : 0, happened: b.n ? r3(b.o / b.n) : 0, n: b.n }))
        .filter((b) => b.n > 0),
    },
    learning: last && { at: last.at, kind: last.kind, reason: last.reason },
    leagues: Object.entries(model.state.leagues)
      .map(([country, l]) => ({ country, offset: r3(l.m), sd: r3(Math.sqrt(l.v)) }))
      .sort((a, b) => b.offset - a.offset)
      .slice(0, 12),
  };
}
