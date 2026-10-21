import { isKnockout as stageIsKnockout, type Fixture, type Score } from "./fixtures";
import { homeEdge, ratingFor, UCL_MU, type Ratings } from "./posterior";
import { getTeam, type Stage, type Team } from "./teams";

export type GoalDiffBin = { diff: number; p: number };
export type ScoreProb = { home: number; away: number; p: number };
export type Confidence = "High" | "Medium" | "Low";

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
  pHomeWin: number;
  pDraw: number;
  pAwayWin: number;
  /** Chance the home side of this match goes through; only set for knockout ties. */
  pHomeAdvance?: number;
  xgHome: number;
  xgAway: number;
  pOver25: number;
  pBtts: number;
  mostLikelyScore: string;
  homeScore: number;
  awayScore: number;
  topScores: ScoreProb[];
  bins: GoalDiffBin[];
  modelMode: string;
  timestamp: string;
  commentary: string;
  formNote: string;
  confidence: Confidence;
  sourceNote: string;
  nSamples: number;
};

const N_SAMPLES = 400;
/** Score grid runs 0..MAX_GOALS per side; mass beyond it is renormalised away. */
const MAX_GOALS = 10;
const BIN_MIN = -5;
const BIN_MAX = 5;
/** Dixon–Coles low-score dependence: negative values lift 0-0 and 1-1 above independent Poisson. */
export const DC_RHO = -0.07;
/** Extra time is a third of a match. */
const ET_FRACTION = 1 / 3;
const PHI = 0.72;
const SIGMA_FORM = 0.03;
const FORM_SD = SIGMA_FORM / Math.sqrt(1 - PHI * PHI);
const FORM_NOTE =
  "Goals follow a Maher model with a Dixon–Coles low-score correction: each side's log scoring rate is its attack minus the opponent's defence plus a home edge. Attack and defence start from club Elo and get a damped update from league-phase results, with the winner's goals capped (6-0 counts as 3-0), so one rout cannot move a club far. AR(1) form and a match-pace shock are integrated over.";
const MODEL_MODE = "Maher–Dixon–Coles v1 · damped posterior, UCL league phase";

type Rng = () => number;

/** mulberry32: small, fast, seedable. */
function makeRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rng: Rng): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function poissonPmf(lambda: number, max: number): number[] {
  const out: number[] = [Math.exp(-lambda)];
  for (let k = 1; k <= max; k += 1) out.push(out[k - 1]! * (lambda / k));
  return out;
}

function tau(h: number, a: number, lh: number, la: number, rho: number): number {
  if (h === 0 && a === 0) return 1 - lh * la * rho;
  if (h === 0 && a === 1) return 1 + lh * rho;
  if (h === 1 && a === 0) return 1 + la * rho;
  if (h === 1 && a === 1) return 1 - rho;
  return 1;
}

/** Score matrix grid[h][a], normalised to 1. rho = 0 gives independent Poisson. */
export function scoreGrid(lh: number, la: number, rho = DC_RHO, max = MAX_GOALS): number[][] {
  const ph = poissonPmf(lh, max);
  const pa = poissonPmf(la, max);
  const grid: number[][] = [];
  let total = 0;
  for (let h = 0; h <= max; h += 1) {
    const row: number[] = [];
    for (let a = 0; a <= max; a += 1) {
      const p = Math.max(0, ph[h]! * pa[a]! * tau(h, a, lh, la, rho));
      row.push(p);
      total += p;
    }
    grid.push(row);
  }
  return grid.map((row) => row.map((p) => p / total));
}

/** Goal-difference distribution (home minus away) as a map from diff to probability. */
function diffDist(grid: number[][]): Map<number, number> {
  const out = new Map<number, number>();
  grid.forEach((row, h) => row.forEach((p, a) => out.set(h - a, (out.get(h - a) ?? 0) + p)));
  return out;
}

function convolve(x: Map<number, number>, y: Map<number, number>): Map<number, number> {
  const out = new Map<number, number>();
  for (const [dx, px] of x) {
    for (const [dy, py] of y) out.set(dx + dy, (out.get(dx + dy) ?? 0) + px * py);
  }
  return out;
}

function shift(x: Map<number, number>, by: number): Map<number, number> {
  return new Map([...x].map(([d, p]) => [d + by, p]));
}

/** Win chance from an aggregate diff: ahead goes through, level goes to extra time, then a coin-flip shoot-out. */
function advanceFrom(aggregate: Map<number, number>, etFor: number, etAgainst: number): number {
  const et = diffDist(scoreGrid(etFor, etAgainst, 0, 6));
  let pLevel = 0;
  let pAhead = 0;
  for (const [d, p] of aggregate) {
    if (d > 0) pAhead += p;
    else if (d === 0) pLevel += p;
  }
  let pEtWin = 0;
  let pEtLevel = 0;
  for (const [d, p] of et) {
    if (d > 0) pEtWin += p;
    else if (d === 0) pEtLevel += p;
  }
  return pAhead + pLevel * (pEtWin + 0.5 * pEtLevel);
}

function round3(x: number): number {
  return Math.round(x * 1000) / 1000;
}

function confidenceOf(pHome: number, pDraw: number, pAway: number): Confidence {
  const top = Math.max(pHome, pDraw, pAway);
  if (top > 0.6) return "High";
  if (top > 0.45) return "Medium";
  return "Low";
}

function buildCommentary(
  home: Team,
  away: Team,
  pHome: number,
  pDraw: number,
  pAway: number,
  pHomeAdvance: number | undefined,
  input: PredictInput,
): string {
  let text: string;
  if (pHome >= 0.65) text = `${home.name} are strong favourites on current ratings.`;
  else if (pHome >= 0.5) text = `Clear edge to ${home.name}, but one goal swings most Champions League nights.`;
  else if (pAway >= 0.65) text = `${away.name} are strong favourites even away from home.`;
  else if (pAway >= 0.5) text = `${away.name} are favoured despite travelling.`;
  else if (pDraw >= 0.28) text = "Very even match-up with a live chance of a draw.";
  else text = `Slight lean to ${pHome >= pAway ? home.name : away.name}. Expect a tight contest.`;
  if (input.neutral) text += " Neutral venue, so no home edge is applied.";
  if (pHomeAdvance !== undefined) {
    const fav = pHomeAdvance >= 0.5 ? home : away;
    const p = Math.max(pHomeAdvance, 1 - pHomeAdvance);
    text += ` ${fav.name} go through ${Math.round(p * 100)}% of the time, counting extra time and penalties.`;
  }
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
  const knockout = stageIsKnockout(input);
  const neutral = input.neutral ?? false;
  const rng = makeRng(input.seed ?? Math.floor(Math.random() * 2 ** 32));
  const shock = knockout ? 0.12 : 0.08;

  const h = ratingFor(home.id, input.ratings);
  const a = ratingFor(away.id, input.ratings);
  const edge = homeEdge(neutral);
  const tieMode: "leg1" | "leg2" | "single" | undefined = !knockout
    ? undefined
    : input.leg === 1
      ? "leg1"
      : input.leg === 2
        ? "leg2"
        : "single";
  if (tieMode === "leg2" && !input.firstLeg) {
    throw new Error("A second leg needs the first-leg score to price the tie");
  }

  const size = MAX_GOALS + 1;
  const grid: number[][] = Array.from({ length: size }, () => new Array<number>(size).fill(0));
  let xgHome = 0;
  let xgAway = 0;
  let advance = 0;

  for (let i = 0; i < N_SAMPLES; i += 1) {
    const formGap = gaussian(rng) * FORM_SD - gaussian(rng) * FORM_SD;
    const pace = Math.exp(gaussian(rng) * shock - 0.5 * shock * shock);
    const lh = Math.exp(UCL_MU + edge + h.attack - a.defence + formGap) * pace;
    const la = Math.exp(UCL_MU + a.attack - h.defence - formGap) * pace;
    const sample = scoreGrid(lh, la);
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) grid[x]![y]! += sample[x]![y]! / N_SAMPLES;
    }
    xgHome += lh / N_SAMPLES;
    xgAway += la / N_SAMPLES;

    if (tieMode) {
      const diff = diffDist(sample);
      if (tieMode === "single") {
        advance += advanceFrom(diff, lh * ET_FRACTION, la * ET_FRACTION) / N_SAMPLES;
      } else if (tieMode === "leg2") {
        // This match's home side was away in leg 1.
        const lead = input.firstLeg!.away - input.firstLeg!.home;
        advance += advanceFrom(shift(diff, lead), lh * ET_FRACTION, la * ET_FRACTION) / N_SAMPLES;
      } else {
        // Leg 2 at the other ground, form carried over, fresh pace.
        const pace2 = Math.exp(gaussian(rng) * shock - 0.5 * shock * shock);
        const l2For = Math.exp(UCL_MU + h.attack - a.defence + formGap) * pace2;
        const l2Against = Math.exp(UCL_MU + edge + a.attack - h.defence - formGap) * pace2;
        const leg2 = diffDist(scoreGrid(l2Against, l2For));
        const leg2ForHome = new Map([...leg2].map(([d, p]) => [-d, p]));
        advance +=
          advanceFrom(convolve(diff, leg2ForHome), l2For * ET_FRACTION, l2Against * ET_FRACTION) / N_SAMPLES;
      }
    }
  }

  let pHome = 0;
  let pDraw = 0;
  let pAway = 0;
  let pOver25 = 0;
  let pBtts = 0;
  const scores: ScoreProb[] = [];
  const bins: GoalDiffBin[] = [];
  for (let d = BIN_MIN; d <= BIN_MAX; d += 1) bins.push({ diff: d, p: 0 });
  grid.forEach((row, x) =>
    row.forEach((p, y) => {
      if (x > y) pHome += p;
      else if (x === y) pDraw += p;
      else pAway += p;
      if (x + y > 2) pOver25 += p;
      if (x > 0 && y > 0) pBtts += p;
      scores.push({ home: x, away: y, p });
      const d = Math.min(BIN_MAX, Math.max(BIN_MIN, x - y));
      bins[d - BIN_MIN]!.p += p;
    }),
  );
  scores.sort((s, t) => t.p - s.p);
  const best = scores[0]!;
  const pHomeAdvance = tieMode ? round3(advance) : undefined;

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
    isKnockout: knockout,
    neutral,
    venue: input.venue,
    dateLabel: input.dateLabel,
    pHomeWin: round3(pHome),
    pDraw: round3(pDraw),
    pAwayWin: round3(pAway),
    pHomeAdvance,
    xgHome: Math.round(xgHome * 100) / 100,
    xgAway: Math.round(xgAway * 100) / 100,
    pOver25: round3(pOver25),
    pBtts: round3(pBtts),
    mostLikelyScore: `${best.home}–${best.away}`,
    homeScore: best.home,
    awayScore: best.away,
    topScores: scores.slice(0, 5).map((s) => ({ ...s, p: round3(s.p) })),
    bins: bins.map((b) => ({ ...b, p: round3(b.p) })),
    modelMode: MODEL_MODE,
    timestamp: formatTimestamp(new Date()),
    commentary: buildCommentary(home, away, pHome, pDraw, pAway, pHomeAdvance, input),
    formNote: FORM_NOTE,
    confidence: confidenceOf(pHome, pDraw, pAway),
    sourceNote: input.sourceNote ?? "",
    nSamples: N_SAMPLES,
  };
}

export function inputFromFixture(fixture: Fixture, sourceNote?: string, ratings?: Ratings): PredictInput {
  return {
    homeId: fixture.homeId,
    awayId: fixture.awayId,
    stage: fixture.stage,
    leg: fixture.leg,
    neutral: fixture.neutral,
    firstLeg: fixture.firstLeg,
    venue: fixture.venue,
    dateLabel: fixture.dateLabel,
    sourceNote,
    ratings,
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
  | "mostLikelyScore"
  | "pHomeWin"
  | "pDraw"
  | "pAwayWin"
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
    mostLikelyScore: prediction.mostLikelyScore,
    pHomeWin: prediction.pHomeWin,
    pDraw: prediction.pDraw,
    pAwayWin: prediction.pAwayWin,
    pHomeAdvance: prediction.pHomeAdvance,
    stage: prediction.stage,
    isKnockout: prediction.isKnockout,
    venue: prediction.venue,
    dateLabel: prediction.dateLabel,
    timestamp: prediction.timestamp,
  };
}
