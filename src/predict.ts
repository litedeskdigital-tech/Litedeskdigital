import { simulateMatch, N_SAMPLES } from "./engine";
import { isKnockout as stageIsKnockout, type Fixture, type Score } from "./fixtures";
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
import { teamGoalsPerGame, type Ratings } from "./posterior";
import { anytimeScorers, type Player, type ScorerProb } from "./scorers";
import { getTeam, type Stage, type Team } from "./teams";

export type PredictInput = {
  homeId: string;
  awayId: string;
  stage: Stage;
  leg?: 1 | 2;
  neutral?: boolean;
  /** Leg-1 score (leg-1 home first); turns a second leg into an aggregate tie. */
  firstLeg?: Score;
  venue: string;
  dateLabel: string;
  sourceNote?: string;
  /** Live ratings from fitRatings; defaults to the Elo priors. */
  ratings?: Ratings;
  /** Player sheet for either or both clubs; enables the anytime-scorer bonus pick. */
  players?: Player[];
  /** Fixes the shock draws so a run can be reproduced. */
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
  stage: Stage;
  leg?: 1 | 2;
  isKnockout: boolean;
  neutral: boolean;
  venue: string;
  dateLabel: string;
  /** 90-minute home / draw / away. */
  fullTime: FullTime;
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
  /** Highest anytime-scorer chance across both sheets; absent when no player data was given. */
  bonusScorer?: ScorerProb;
  /** Top anytime scorers across both clubs, most likely first. */
  anytimeScorers: ScorerProb[];
  scorerNote: string;
  confidence: Confidence;
  modelMode: string;
  timestamp: string;
  commentary: string;
  formNote: string;
  sourceNote: string;
  nSamples: number;
};

const FORM_NOTE =
  "Goals follow a Maher model with a Dixon–Coles low-score correction: each side's log scoring rate is its attack minus the opponent's defence plus a home edge. Attack and defence start from club Elo and get a damped update from league-phase results, with the winner's goals capped (6-0 counts as 3-0), so one rout cannot move a club far. AR(1) form and a match-pace shock are integrated over. Scorers split their team's goals by non-penalty goals per 90 × expected minutes, with penalties to the named taker.";
const MODEL_MODE = "Maher–Dixon–Coles v2 · full-time, margins, anytime scorer";
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
  let text: string;
  if (winner.isHighProbability) {
    text = `${fav.name} are the high-probability pick: ${pct(winner.pWin)} to win in 90 minutes, most likely by ${winner.likelyMargin === 3 ? "3 or more" : winner.likelyMargin}.`;
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
  const home = getTeam(input.homeId);
  const away = getTeam(input.awayId);
  const neutral = input.neutral ?? false;
  const sim = simulateMatch(input);

  const ft = fullTime(sim.grid);
  const bands = marginBands(sim.grid, home.shortName, away.shortName);
  const winner = pickWinner(ft, bands, home.id, away.id);
  const likelyBand = [...bands].sort((x, y) => y.p - x.p)[0]!;
  const scores = topScores(sim.grid);
  const best = scores[0]!;
  const goals = goalsMarkets(sim.grid);

  const players = input.players ?? [];
  const homePlayers = players.filter((p) => p.teamId === home.id);
  const awayPlayers = players.filter((p) => p.teamId === away.id);
  const scorers = [
    ...anytimeScorers(homePlayers, sim.samples, "home", teamGoalsPerGame(home.id, input.ratings)),
    ...anytimeScorers(awayPlayers, sim.samples, "away", teamGoalsPerGame(away.id, input.ratings)),
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
    stage: input.stage,
    leg: input.leg,
    isKnockout: stageIsKnockout(input),
    neutral,
    venue: input.venue,
    dateLabel: input.dateLabel,
    fullTime: { home: round3(ft.home), draw: round3(ft.draw), away: round3(ft.away) },
    winner: {
      ...winner,
      pWin: round3(winner.pWin),
      pNotLose: round3(winner.pNotLose),
      pDrawNoBet: round3(winner.pDrawNoBet),
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
    bonusScorer: scorers[0],
    anytimeScorers: scorers,
    scorerNote,
    confidence: winner.confidence,
    modelMode: MODEL_MODE,
    timestamp: formatTimestamp(new Date()),
    commentary: buildCommentary(home, away, ft, winner, likelyBand, pHomeAdvance, scorers[0], neutral),
    formNote: FORM_NOTE,
    sourceNote: input.sourceNote ?? "",
    nSamples: N_SAMPLES,
  };
}

export function inputFromFixture(
  fixture: Fixture,
  opts: { sourceNote?: string; ratings?: Ratings; players?: Player[]; seed?: number } = {},
): PredictInput {
  return {
    homeId: fixture.homeId,
    awayId: fixture.awayId,
    stage: fixture.stage,
    leg: fixture.leg,
    neutral: fixture.neutral,
    firstLeg: fixture.firstLeg,
    venue: fixture.venue,
    dateLabel: fixture.dateLabel,
    ...opts,
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
