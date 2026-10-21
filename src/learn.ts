import { isPlayed, type Match } from "./data/types";
import { quickFullTime } from "./engine";
import { generatePrediction, type Model, type Prediction } from "./predict";
import type { Player } from "./scorers";
import { runFilter, viewMatch, type Params, type State } from "./ratings";
import { getTeam } from "./teams";
import { outcomeOf, tune, walkForward, type Outcome, type WalkForward } from "./tune";

/**
 * The learning loop. Every upcoming fixture is predicted once and the prediction is frozen in the log before the
 * match; results then score it. Ratings learn from every result (hit or miss) through the filter. The settings
 * are re-tuned only when the log shows a lasting calibration slip, or on a schedule, and a new set is adopted only
 * if it beats the current one walk-forward. Misses are reviewed and explained but never move the model on their
 * own: a 70% favourite should still lose 3 times in 10.
 */

export type MissReview = {
  kind: "upset" | "coin-flip" | "draw-missed" | "draw-called-wrongly";
  /** −ln P(actual outcome): how surprised the model was. */
  surprise: number;
  explanation: string;
};

export type LoggedPrediction = {
  matchId: string;
  comp: string;
  date: string;
  home: string;
  away: string;
  madeAt: string;
  paramsVersion: number;
  pHome: number;
  pDraw: number;
  pAway: number;
  pHomeCi: [number, number];
  pAwayCi: [number, number];
  pick: { side: "home" | "away"; teamId: string; pWin: number; isHighProbability: boolean };
  mostLikelyMargin: string;
  mostLikelyScore: string;
  /** Scenario summary from the 5,000 simulations, frozen with the odds. */
  scenario?: {
    firstGoalHome: number;
    firstGoalAway: number;
    favTrailsAtSomePoint: number;
    favWinsIfConcedesFirst: number;
    favDropsLead: number;
    htft: string;
  };
  /** Anytime-scorer bonus pick, when a player sheet covered either club. */
  bonusScorer?: { playerId: string; name: string; teamId: string; pAnytime: number };
  /** Kick-off (ISO UTC) when known, else the local time label. */
  kickoff?: string;
  localTime?: string;
  /**
   * The most recent refresh before kick-off. The first prediction above stays frozen for the honest record; this
   * one shows how the call moved as new results and data arrived, and is scored too.
   */
  latest?: LatestCall;
  result?: { home: number; away: number };
  scoredAt?: string;
  logLoss?: number;
  /** The single most likely of home/draw/away matched the result. */
  hit?: boolean;
  miss?: MissReview;
};

export type LatestCall = {
  at: string;
  paramsVersion: number;
  pHome: number;
  pDraw: number;
  pAway: number;
  pick: { side: "home" | "away"; teamId: string; pWin: number; isHighProbability: boolean };
  mostLikelyScore: string;
  logLoss?: number;
  hit?: boolean;
};

export type LearningEvent = {
  at: string;
  kind: "tuned" | "tune-rejected" | "drift-check";
  reason: string;
  paramsVersion: number;
  before?: WalkForward;
  after?: WalkForward;
  driftZ?: number;
};

/** How far ahead fixtures are predicted and logged. */
export const HORIZON_DAYS = 10;
/** Calibration check window: the most recent scored predictions. */
export const DRIFT_WINDOW = 200;
/** Re-tune when actual log loss exceeds the model's own expected log loss by this many standard errors. */
export const DRIFT_Z = 2;
/** Re-tune at least this often even when calibration looks fine, so new seasons of data are used. */
export const RETUNE_EVERY_DAYS = 60;
/** Walk-forward scoring and tuning skip the first months of data, while every rating is still a prior. */
export const BURN_IN_DAYS = 240;

function addDays(date: string, n: number): string {
  return new Date(Date.parse(date) + n * 86_400_000).toISOString().slice(0, 10);
}

function argmax(p: { home: number; draw: number; away: number }): Outcome {
  return p.home >= p.draw && p.home >= p.away ? "home" : p.away >= p.draw ? "away" : "draw";
}

export function toLogged(pred: Prediction, matchId: string, madeAt: string): LoggedPrediction {
  return {
    matchId,
    comp: pred.comp,
    date: pred.date,
    home: pred.homeId,
    away: pred.awayId,
    madeAt,
    paramsVersion: pred.paramsVersion,
    pHome: pred.fullTime.home,
    pDraw: pred.fullTime.draw,
    pAway: pred.fullTime.away,
    pHomeCi: pred.pHomeCi,
    pAwayCi: pred.pAwayCi,
    pick: {
      side: pred.winner.side,
      teamId: pred.winner.teamId,
      pWin: pred.winner.pWin,
      isHighProbability: pred.winner.isHighProbability,
    },
    mostLikelyMargin: pred.mostLikelyMargin.label,
    mostLikelyScore: pred.mostLikelyScore,
    scenario: {
      firstGoalHome: pred.scenarios.firstGoal.home,
      firstGoalAway: pred.scenarios.firstGoal.away,
      favTrailsAtSomePoint: pred.scenarios.favourite.trailsAtSomePoint,
      favWinsIfConcedesFirst: pred.scenarios.favourite.winsIfConcedesFirst,
      favDropsLead: pred.scenarios.favourite.dropsLead,
      htft: pred.scenarios.htft[0]!.key,
    },
    bonusScorer: pred.bonusScorer && {
      playerId: pred.bonusScorer.playerId,
      name: pred.bonusScorer.name,
      teamId: pred.bonusScorer.teamId,
      pAnytime: pred.bonusScorer.pAnytime,
    },
  };
}

type Delta = { attack: number; defence: number };

function latestOf(pred: Prediction, at: string): LatestCall {
  return {
    at,
    paramsVersion: pred.paramsVersion,
    pHome: pred.fullTime.home,
    pDraw: pred.fullTime.draw,
    pAway: pred.fullTime.away,
    pick: { side: pred.winner.side, teamId: pred.winner.teamId, pWin: pred.winner.pWin, isHighProbability: pred.winner.isHighProbability },
    mostLikelyScore: pred.mostLikelyScore,
  };
}

/** Last refresh hour (UTC) on match day that still counts as pre-match when a fixture has no kick-off time. */
const NO_TIME_CUTOFF_HOUR = 10;

/** Still before kick-off at `now`? Exact with a UEFA kick-off time; conservative (morning of match day) without. */
export function beforeKickoff(m: Pick<Match, "date" | "kickoff">, now: string): boolean {
  if (m.kickoff) return now < m.kickoff;
  const today = now.slice(0, 10);
  return m.date > today || (m.date === today && Number(now.slice(11, 13)) < NO_TIME_CUTOFF_HOUR);
}

/** Explains a miss from the logged odds and how the result moved both clubs' ratings. */
export function reviewMiss(p: LoggedPrediction, result: { home: number; away: number }, deltas?: Record<string, Delta>): MissReview {
  const o = outcomeOf(result);
  const probs = { home: p.pHome, draw: p.pDraw, away: p.pAway };
  const called = argmax(probs);
  const surprise = -Math.log(Math.max(1e-9, probs[o]));
  const name = (id: string) => {
    try {
      return getTeam(id).shortName;
    } catch {
      return id;
    }
  };
  const score = `${result.home}-${result.away}`;
  let kind: MissReview["kind"];
  let text: string;
  if (o === "draw") {
    kind = "draw-missed";
    text = `Drawn ${score}; the model gave the draw ${Math.round(p.pDraw * 100)}% and leaned ${name(p.pick.teamId)} (${Math.round(p.pick.pWin * 100)}%).`;
  } else if (called === "draw") {
    kind = "draw-called-wrongly";
    text = `The draw was the single most likely outcome (${Math.round(p.pDraw * 100)}%), but it finished ${score}.`;
  } else if (p.pick.pWin >= 0.6) {
    kind = "upset";
    const winner = o === "home" ? p.home : p.away;
    text = `Upset: ${name(p.pick.teamId)} were ${Math.round(p.pick.pWin * 100)}% to win${p.pick.isHighProbability ? " (high-probability pick)" : ""}; ${name(winner)} won ${score}, an outcome priced at ${Math.round(probs[o] * 100)}%.`;
  } else {
    kind = "coin-flip";
    text = `Close call: the pick ${name(p.pick.teamId)} had only ${Math.round(p.pick.pWin * 100)}%; ${score} was priced at ${Math.round(probs[o] * 100)}%.`;
  }
  if (deltas) {
    const moves = [p.home, p.away]
      .map((id) => ({ id, d: deltas[id] }))
      .filter((x): x is { id: string; d: Delta } => x.d !== undefined)
      .map(({ id, d }) => `${name(id)} attack ${d.attack >= 0 ? "+" : ""}${d.attack.toFixed(3)}, defence ${d.defence >= 0 ? "+" : ""}${d.defence.toFixed(3)}`);
    if (moves.length) text += ` Ratings moved: ${moves.join("; ")}.`;
  }
  return { kind, surprise, explanation: text };
}

/** Actual vs expected log loss over the latest scored predictions; z > DRIFT_Z means the model is overconfident. */
export function driftCheck(log: LoggedPrediction[]): { n: number; actual: number; expected: number; z: number } {
  const scored = log.filter((p) => p.logLoss !== undefined).sort((a, b) => (a.date < b.date ? -1 : 1)).slice(-DRIFT_WINDOW);
  const n = scored.length;
  if (n < 30) return { n, actual: 0, expected: 0, z: 0 };
  const diffs = scored.map((p) => {
    const ps = [p.pHome, p.pDraw, p.pAway];
    const expected = -ps.reduce((s, q) => s + (q > 0 ? q * Math.log(q) : 0), 0);
    return p.logLoss! - expected;
  });
  const mean = diffs.reduce((s, x) => s + x, 0) / n;
  const sd = Math.sqrt(diffs.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1)) || 1;
  const actual = scored.reduce((s, p) => s + p.logLoss!, 0) / n;
  return { n, actual, expected: actual - mean, z: mean / (sd / Math.sqrt(n)) };
}

export type CycleInput = {
  matches: Match[];
  countries: Record<string, string>;
  params: Params;
  log: LoggedPrediction[];
  events: LearningEvent[];
  today: string;
  /** Skip tuning (tests, quick runs). */
  noTune?: boolean;
  /** Re-tune now, e.g. after new data sources were added. A new set is still adopted only if it scores better. */
  forceTune?: boolean;
  /** Player sheet (data/players.csv); enables the anytime-scorer bonus pick. */
  players?: Player[];
  /** Competitions whose fixtures are predicted and logged; others only feed the ratings. All when omitted. */
  predictComps?: string[];
  /** Current time (ISO UTC); decides which fixtures are still before kick-off. Defaults to the start of `today`. */
  now?: string;
};

export type CycleOutput = {
  params: Params;
  state: State;
  log: LoggedPrediction[];
  events: LearningEvent[];
  newlyScored: LoggedPrediction[];
  newPredictions: LoggedPrediction[];
  upcoming: Prediction[];
};

/** One nightly cycle: score, learn, maybe re-tune, predict ahead. Pure apart from the clock passed in. */
export function runCycle(input: CycleInput): CycleOutput {
  const { countries, today } = input;
  // Results dated after `today` are invisible, so a cycle can be replayed on any past date without leaking.
  const matches = input.matches.map((m) =>
    m.date > today && m.ft ? { ...m, ft: undefined, aet: undefined, pens: undefined } : m,
  );
  let params = input.params;
  const events = [...input.events];
  const byId = new Map(matches.map((m) => [m.id, m]));

  // 1. Learn from every result, and record how each club's rating moved on each match (for miss reviews).
  const pending = new Set(input.log.filter((p) => p.result === undefined).map((p) => p.matchId));
  const deltas = new Map<string, Record<string, Delta>>();
  let snapshot: Record<string, Delta> = {};
  const fold = (ps: Params) =>
    runFilter(
      matches,
      countries,
      ps,
      (m, s) => {
        if (!pending.has(m.id)) return;
        snapshot = {};
        for (const id of [m.home, m.away]) {
          const t = s.teams[id];
          if (t) snapshot[id] = { attack: t.attack.m, defence: t.defence.m };
        }
      },
      (m, s) => {
        if (!pending.has(m.id)) return;
        const d: Record<string, Delta> = {};
        for (const id of [m.home, m.away]) {
          const t = s.teams[id]!;
          const b = snapshot[id] ?? { attack: 0, defence: 0 };
          d[id] = { attack: t.attack.m - b.attack, defence: t.defence.m - b.defence };
        }
        deltas.set(m.id, d);
      },
    );
  let state = fold(params);

  // 2. Score frozen predictions whose matches have now been played.
  const newlyScored: LoggedPrediction[] = [];
  const log = input.log.map((p) => {
    if (p.result !== undefined) return p;
    const m = byId.get(p.matchId);
    if (!m || !isPlayed(m)) return p;
    const o = outcomeOf(m.ft);
    const probs = { home: p.pHome, draw: p.pDraw, away: p.pAway };
    const hit = argmax(probs) === o;
    const lp = p.latest && { home: p.latest.pHome, draw: p.latest.pDraw, away: p.latest.pAway };
    const scored: LoggedPrediction = {
      ...p,
      latest: p.latest && lp && { ...p.latest, logLoss: -Math.log(Math.max(1e-9, lp[o])), hit: argmax(lp) === o },
      result: m.ft,
      scoredAt: today,
      logLoss: -Math.log(Math.max(1e-9, probs[o])),
      hit,
      miss: hit ? undefined : reviewMiss(p, m.ft, deltas.get(m.id)),
    };
    newlyScored.push(scored);
    return scored;
  });

  // 3. Re-tune when calibration has slipped or the schedule says so; adopt only a walk-forward improvement.
  const drift = driftCheck(log);
  const lastTune = [...events].reverse().find((e) => e.kind === "tuned" || e.kind === "tune-rejected");
  const due = !lastTune || Date.parse(today) - Date.parse(lastTune.at) >= RETUNE_EVERY_DAYS * 86_400_000;
  const slipped = drift.z > DRIFT_Z;
  if (!input.noTune && (due || slipped || input.forceTune)) {
    const first = matches.find(isPlayed)?.date ?? today;
    const from = addDays(first, BURN_IN_DAYS);
    const reason = input.forceTune
      ? "re-tune requested (new data sources)"
      : slipped
      ? `calibration slip: last ${drift.n} predictions log loss ${drift.actual.toFixed(3)} vs expected ${drift.expected.toFixed(3)} (z=${drift.z.toFixed(2)})`
      : `scheduled re-tune (every ${RETUNE_EVERY_DAYS} days)`;
    const res = tune(matches, countries, params, from);
    events.push({
      at: today,
      kind: res.improved ? "tuned" : "tune-rejected",
      reason,
      paramsVersion: res.params.version,
      before: res.before,
      after: res.after,
      driftZ: drift.z,
    });
    if (res.improved) {
      params = { ...res.params, tunedAt: today };
      state = fold(params);
    }
  } else if (drift.n >= 30) {
    events.push({ at: today, kind: "drift-check", reason: "calibration within bounds", paramsVersion: params.version, driftZ: drift.z });
  }

  // 4. Predict and freeze every fixture in the horizon that is not logged yet.
  const model: Model = { state, params, countries };
  const now = input.now ?? `${today}T00:00:00Z`;
  const byMatch = new Map(log.map((p, i) => [p.matchId, i]));
  const horizon = addDays(today, HORIZON_DAYS);
  const upcoming: Prediction[] = [];
  const newPredictions: LoggedPrediction[] = [];
  for (const m of matches) {
    if (isPlayed(m) || m.date < today || m.date > horizon) continue;
    if (input.predictComps && !input.predictComps.includes(m.comp)) continue;
    const firstLeg = m.leg === 2 ? matches.find((x) => x.leg === 1 && x.stage === m.stage && x.season === m.season && x.home === m.away && x.away === m.home)?.ft : undefined;
    if (m.leg === 2 && !firstLeg) continue;
    const pred = generatePrediction({ match: m, model, firstLeg, players: input.players, seed: 1 });
    upcoming.push(pred);
    const i = byMatch.get(m.id);
    if (i === undefined) {
      if (!beforeKickoff(m, now)) continue;
      const entry: LoggedPrediction = { ...toLogged(pred, m.id, today), kickoff: m.kickoff, localTime: m.localTime, latest: latestOf(pred, now) };
      byMatch.set(m.id, log.length);
      log.push(entry);
      newPredictions.push(entry);
    } else if (beforeKickoff(m, now)) {
      log[i] = { ...log[i]!, kickoff: m.kickoff ?? log[i]!.kickoff, localTime: m.localTime ?? log[i]!.localTime, latest: latestOf(pred, now) };
    }
  }

  return { params, state, log, events, newlyScored, newPredictions, upcoming };
}

/** Walk-forward summary on all data, for the report. */
export function backtest(matches: Match[], countries: Record<string, string>, params: Params): WalkForward {
  const first = matches.find(isPlayed)?.date ?? "";
  return walkForward(matches, countries, params, addDays(first, BURN_IN_DAYS));
}

/** Pre-match home/draw/away for one match from a state (no sampling). */
export function quickPredict(state: State, m: Match, countries: Record<string, string>, params: Params) {
  return quickFullTime(viewMatch(state, m, countries, params), params.rho);
}
