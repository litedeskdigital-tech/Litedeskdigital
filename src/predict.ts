import type { Match, Score } from "./data/types";
import { simulateMatch, N_SAMPLES } from "./engine";
import {
  fullTime,
  goalsMarkets,
  marginBands,
  pickWinner,
  topScores,
  type Confidence,
  type FullTime,
  type MarginBand,
  type ScoreProb,
  type WinnerPick,
} from "./markets";
import { compRates, viewMatch, type Params, type State } from "./ratings";
import { simulateScenarios, type ScenarioReport } from "./simulate";
import { anytimeScorers, type Player, type ScorerProb } from "./scorers";
import { getTeam, type Stage, type Team } from "./teams";

/** A fitted model: the rating state after every result so far, the settings that produced it, club countries. */
export type Model = { state: State; params: Params; countries: Record<string, string> };

export type PredictInput = {
  match: Pick<Match, "home" | "away" | "comp" | "date" | "stage" | "leg" | "neutral">;
  model: Model;
  /** Leg-1 score (leg-1 home first); turns a second leg into an aggregate tie. */
  firstLeg?: Score;
  venue?: string;
  dateLabel?: string;
  sourceNote?: string;
  /** Player sheet for either or both clubs; enables the anytime-scorer bonus pick. */
  players?: Player[];
  /** Fixes the posterior draws so a run can be reproduced. */
  seed?: number;
};

export type Prediction = {
  id: string;
  homeId: string;
  awayId: string;
  homeName: string;
  awayName: string;
  homeShort: string;
  awayShort: string;
  homeAbbr: string;
  awayAbbr: string;
  homeColor: string;
  awayColor: string;
  homeMarkFg: string;
  awayMarkFg: string;
  comp: string;
  date: string;
  stage: Stage;
  leg?: 1 | 2;
  isKnockout: boolean;
  neutral: boolean;
  venue: string;
  dateLabel: string;
  /** 90-minute home / draw / away, averaged over the rating posterior. */
  fullTime: FullTime;
  /** 5th–95th percentile of the home and away win chances across the posterior. */
  pHomeCi: [number, number];
  pAwayCi: [number, number];
  /** The side more likely to win, how likely, and whether it clears the high-probability bar. */
  winner: WinnerPick;
  /** Winning-margin bands from home by 3+ to away by 3+. */
  margins: MarginBand[];
  mostLikelyMargin: MarginBand;
  mostLikelyScore: string;
  homeScore: number;
  awayScore: number;
  topScores: ScoreProb[];
  xgHome: number;
  xgAway: number;
  pOver25: number;
  pBtts: number;
  /** Chance the home side of this match goes through; only set for knockout ties. */
  pHomeAdvance?: number;
  /** 5,000 minute-by-minute simulations: first goal, game flow, the favourite's bad scenarios. */
  scenarios: ScenarioReport;
  /** Highest anytime-scorer chance across both sheets; absent when no player data was given. */
  bonusScorer?: ScorerProb;
  /** Top anytime scorers across both clubs, most likely first. */
  anytimeScorers: ScorerProb[];
  scorerNote: string;
  confidence: Confidence;
  modelMode: string;
  /** Tuned parameter set that produced this prediction, and the last result folded into the ratings. */
  paramsVersion: number;
  ratingsAsOf: string;
  timestamp: string;
  commentary: string;
  formNote: string;
  sourceNote: string;
  nSamples: number;
};

const FORM_NOTE =
  "Goals follow a Maher model with a Dixon–Coles low-score correction: each side's log scoring rate is its attack minus the opponent's defence plus the competition's home edge. Attack and defence are Gaussian beliefs updated after every Champions League and domestic-league result by a Kalman-style filter; they drift with time off and new clubs start from their league's level. Probabilities average over that uncertainty, and the range shows how sure the model is. Scorers split their team's goals by non-penalty goals per 90 × expected minutes, with penalties to the named taker.";
const MODEL_MODE = "Maher–Dixon–Coles v3 · dynamic hierarchical ratings, tuned walk-forward";
const TOP_SCORERS = 6;

function round3(x: number): number {
  return Math.round(x * 1000) / 1000;
}

function buildCommentary(
  home: Team,
  away: Team,
  ft: FullTime,
  winner: WinnerPick,
  band: MarginBand,
  pHomeAdvance: number | undefined,
  bonus: ScorerProb | undefined,
  neutral: boolean,
): string {
  const fav = winner.side === "home" ? home : away;
  const pct = (p: number) => `${Math.round(p * 100)}%`;
  const range = `${pct(winner.pWinCi[0])}–${pct(winner.pWinCi[1])}`;
  let text: string;
  if (winner.isHighProbability) {
    text = `${fav.name} are the high-probability pick: ${pct(winner.pWin)} to win in 90 minutes (likely range ${range}), most likely by ${winner.likelyMargin === 3 ? "3 or more" : winner.likelyMargin}.`;
  } else if (winner.pWin >= 0.6) {
    text = `${fav.name} are favourites at ${pct(winner.pWin)}, but the ratings are unsure (range ${range}), so this is not flagged high probability.`;
  } else if (ft.draw >= winner.pWin - 0.1) {
    text = `No strong favourite. ${fav.name} edge it at ${pct(winner.pWin)}, but the draw is live at ${pct(ft.draw)}.`;
  } else {
    text = `${fav.name} lean at ${pct(winner.pWin)} (${pct(winner.pDrawNoBet)} with the draw voided); not a banker.`;
  }
  text += ` Single most likely margin: ${band.label} (${pct(band.p)}).`;
  if (neutral) text += " Neutral venue, so no home edge is applied.";
  if (pHomeAdvance !== undefined) {
    const through = pHomeAdvance >= 0.5 ? home : away;
    text += ` ${through.name} go through ${pct(Math.max(pHomeAdvance, 1 - pHomeAdvance))} of the time, counting extra time and penalties.`;
  }
  if (bonus) text += ` Bonus scorer: ${bonus.name} (${pct(bonus.pAnytime)} anytime).`;
  return text;
}

function roundScenarios(r: ScenarioReport): ScenarioReport {
  const t = (x: { home: number; draw: number; away: number }) => ({ home: round3(x.home), draw: round3(x.draw), away: round3(x.away) });
  return {
    ...r,
    simulated: t(r.simulated),
    firstGoal: { home: round3(r.firstGoal.home), away: round3(r.firstGoal.away), none: round3(r.firstGoal.none) },
    ifHomeScoresFirst: t(r.ifHomeScoresFirst),
    ifAwayScoresFirst: t(r.ifAwayScoresFirst),
    htft: r.htft.map((x) => ({ key: x.key, p: round3(x.p) })),
    goalInBlock: r.goalInBlock.map(round3),
    lateWinner: round3(r.lateWinner),
    favourite: {
      ...r.favourite,
      trailsAtSomePoint: round3(r.favourite.trailsAtSomePoint),
      trailsByTwo: round3(r.favourite.trailsByTwo),
      winsAfterTrailing: round3(r.favourite.winsAfterTrailing),
      dropsLead: round3(r.favourite.dropsLead),
      winsIfConcedesFirst: round3(r.favourite.winsIfConcedesFirst),
    },
  };
}

function scenarioSentence(fav: Team, r: ScenarioReport): string {
  const pct = (p: number) => `${Math.round(p * 100)}%`;
  const f = r.favourite;
  return ` In ${r.simulations.toLocaleString("en-GB")} simulations ${fav.name} trail at some point ${pct(f.trailsAtSomePoint)} of the time and win ${pct(f.winsIfConcedesFirst)} of the games where they concede first; most likely half-time/full-time ${r.htft[0]!.key} (${pct(r.htft[0]!.p)}).`;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generatePrediction(input: PredictInput): Prediction {
  const { match, model } = input;
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const neutral = match.neutral ?? false;
  const view = viewMatch(model.state, match, model.countries, model.params);
  const rates = compRates(model.state, match.comp, match.date, model.params);
  const sim = simulateMatch({
    view,
    reverseHomeEdge: neutral ? 0 : rates.home,
    stage: match.stage,
    leg: match.leg,
    firstLeg: input.firstLeg,
    rho: model.params.rho,
    seed: input.seed,
  });

  const ft = fullTime(sim.grid);
  const bands = marginBands(sim.grid, home.shortName, away.shortName);
  const winner = pickWinner(ft, bands, home.id, away.id, { home: sim.pHomeCi, away: sim.pAwayCi });
  const scenarios = roundScenarios(simulateScenarios(view, winner.side, input.seed ?? 1));
  const likelyBand = [...bands].sort((x, y) => y.p - x.p)[0]!;
  const scores = topScores(sim.grid);
  const best = scores[0]!;
  const goals = goalsMarkets(sim.grid);

  const players = input.players ?? [];
  const homePlayers = players.filter((p) => p.teamId === home.id);
  const awayPlayers = players.filter((p) => p.teamId === away.id);
  const scorers = [
    // A club's usual goals per game: against a zero-rated side, half its games at home.
    ...anytimeScorers(homePlayers, sim.samples, "home", Math.exp(rates.mu + rates.home / 2 + view.home.attack.m)),
    ...anytimeScorers(awayPlayers, sim.samples, "away", Math.exp(rates.mu + rates.home / 2 + view.away.attack.m)),
  ]
    .sort((x, y) => y.pAnytime - x.pAnytime)
    .slice(0, TOP_SCORERS)
    .map((s) => ({ ...s, pAnytime: round3(s.pAnytime), share: round3(s.share) }));
  const missing = [homePlayers.length ? "" : home.name, awayPlayers.length ? "" : away.name].filter(Boolean);
  const scorerNote =
    missing.length === 2
      ? "No player data loaded, so no scorer pick. Load a player sheet with loadPlayers or parsePlayersCsv."
      : missing.length === 1
        ? `No player data for ${missing[0]}; the bonus pick only covers the other side.`
        : "Anytime chances over 90 minutes; penalties go to the named taker.";
  const pHomeAdvance = sim.pHomeAdvance === undefined ? undefined : round3(sim.pHomeAdvance);

  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `run-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
    homeId: home.id,
    awayId: away.id,
    homeName: home.name,
    awayName: away.name,
    homeShort: home.shortName,
    awayShort: away.shortName,
    homeAbbr: home.abbr,
    awayAbbr: away.abbr,
    homeColor: home.color,
    awayColor: away.color,
    homeMarkFg: home.markFg,
    awayMarkFg: away.markFg,
    comp: match.comp,
    date: match.date,
    stage: match.stage,
    leg: match.leg,
    isKnockout: match.stage !== "league",
    neutral,
    venue: input.venue ?? "",
    dateLabel: input.dateLabel ?? match.date,
    fullTime: { home: round3(ft.home), draw: round3(ft.draw), away: round3(ft.away) },
    pHomeCi: [round3(sim.pHomeCi[0]), round3(sim.pHomeCi[1])],
    pAwayCi: [round3(sim.pAwayCi[0]), round3(sim.pAwayCi[1])],
    winner: {
      ...winner,
      pWin: round3(winner.pWin),
      pNotLose: round3(winner.pNotLose),
      pDrawNoBet: round3(winner.pDrawNoBet),
      pWinCi: [round3(winner.pWinCi[0]), round3(winner.pWinCi[1])],
    },
    margins: bands.map((b) => ({ ...b, p: round3(b.p) })),
    mostLikelyMargin: { ...likelyBand, p: round3(likelyBand.p) },
    mostLikelyScore: `${best.home}–${best.away}`,
    homeScore: best.home,
    awayScore: best.away,
    topScores: scores.map((s) => ({ ...s, p: round3(s.p) })),
    xgHome: Math.round(sim.xgHome * 100) / 100,
    xgAway: Math.round(sim.xgAway * 100) / 100,
    pOver25: round3(goals.pOver25),
    pBtts: round3(goals.pBtts),
    pHomeAdvance,
    scenarios,
    bonusScorer: scorers[0],
    anytimeScorers: scorers,
    scorerNote,
    confidence: winner.confidence,
    modelMode: MODEL_MODE,
    paramsVersion: model.params.version,
    ratingsAsOf: model.state.asOf,
    timestamp: formatTimestamp(new Date()),
    commentary:
      buildCommentary(home, away, ft, winner, likelyBand, pHomeAdvance, scorers[0], neutral) +
      scenarioSentence(winner.side === "home" ? home : away, scenarios),
    formNote: FORM_NOTE,
    sourceNote: input.sourceNote ?? "",
    nSamples: N_SAMPLES,
  };
}

export type HistoryItem = Pick<
  Prediction,
  | "id"
  | "homeId"
  | "awayId"
  | "homeAbbr"
  | "awayAbbr"
  | "homeShort"
  | "awayShort"
  | "fullTime"
  | "winner"
  | "mostLikelyMargin"
  | "mostLikelyScore"
  | "bonusScorer"
  | "pHomeAdvance"
  | "stage"
  | "isKnockout"
  | "venue"
  | "dateLabel"
  | "timestamp"
>;

export function toHistoryItem(prediction: Prediction): HistoryItem {
  return {
    id: prediction.id,
    homeId: prediction.homeId,
    awayId: prediction.awayId,
    homeAbbr: prediction.homeAbbr,
    awayAbbr: prediction.awayAbbr,
    homeShort: prediction.homeShort,
    awayShort: prediction.awayShort,
    fullTime: prediction.fullTime,
    winner: prediction.winner,
    mostLikelyMargin: prediction.mostLikelyMargin,
    mostLikelyScore: prediction.mostLikelyScore,
    bonusScorer: prediction.bonusScorer,
    pHomeAdvance: prediction.pHomeAdvance,
    stage: prediction.stage,
    isKnockout: prediction.isKnockout,
    venue: prediction.venue,
    dateLabel: prediction.dateLabel,
    timestamp: prediction.timestamp,
  };
}
