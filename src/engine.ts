import { isKnockout as stageIsKnockout, type Score } from "./fixtures";
import { homeEdge, ratingFor, UCL_MU, type Ratings } from "./posterior";
import type { Stage } from "./teams";

/** Score grid runs 0..MAX_GOALS per side; mass beyond it is renormalised away. */
export const MAX_GOALS = 10;
export const N_SAMPLES = 400;
/** Dixon–Coles low-score dependence: negative values lift 0-0 and 1-1 above independent Poisson. */
export const DC_RHO = -0.07;
/** Extra time is a third of a match. */
const ET_FRACTION = 1 / 3;
const PHI = 0.72;
const SIGMA_FORM = 0.03;
const FORM_SD = SIGMA_FORM / Math.sqrt(1 - PHI * PHI);

export type MatchSpec = {
  homeId: string;
  awayId: string;
  stage: Stage;
  leg?: 1 | 2;
  neutral?: boolean;
  /** Leg-1 score (leg-1 home first); turns a second leg into an aggregate tie. */
  firstLeg?: Score;
  ratings?: Ratings;
  seed?: number;
};

/** One draw of the match-level shocks: the scoring rates that drive both the score grid and the scorer model. */
export type RateSample = { home: number; away: number };

export type MatchSim = {
  /** grid[h][a]: full-time (90-minute) score probabilities, averaged over shocks. */
  grid: number[][];
  samples: RateSample[];
  xgHome: number;
  xgAway: number;
  /** Chance the home side of this match goes through; only set for knockout ties. */
  pHomeAdvance?: number;
};

type Rng = () => number;

/** mulberry32: small, fast, seedable. */
export function makeRng(seed: number): Rng {
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

/**
 * Integrates the score grid over AR(1) form and a match-pace shock. Each sample's rates are kept so the
 * scorer model sees the same uncertainty as the scoreline.
 */
export function simulateMatch(spec: MatchSpec): MatchSim {
  const knockout = stageIsKnockout(spec);
  const neutral = spec.neutral ?? false;
  const rng = makeRng(spec.seed ?? Math.floor(Math.random() * 2 ** 32));
  const shock = knockout ? 0.12 : 0.08;
  const h = ratingFor(spec.homeId, spec.ratings);
  const a = ratingFor(spec.awayId, spec.ratings);
  const edge = homeEdge(neutral);
  const tieMode: "leg1" | "leg2" | "single" | undefined = !knockout
    ? undefined
    : spec.leg === 1
      ? "leg1"
      : spec.leg === 2
        ? "leg2"
        : "single";
  if (tieMode === "leg2" && !spec.firstLeg) {
    throw new Error("A second leg needs the first-leg score to price the tie");
  }

  const size = MAX_GOALS + 1;
  const grid: number[][] = Array.from({ length: size }, () => new Array<number>(size).fill(0));
  const samples: RateSample[] = [];
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
    samples.push({ home: lh, away: la });

    if (tieMode) {
      const diff = diffDist(sample);
      if (tieMode === "single") {
        advance += advanceFrom(diff, lh * ET_FRACTION, la * ET_FRACTION) / N_SAMPLES;
      } else if (tieMode === "leg2") {
        // This match's home side was away in leg 1.
        const lead = spec.firstLeg!.away - spec.firstLeg!.home;
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

  return {
    grid,
    samples,
    xgHome: samples.reduce((s, r) => s + r.home, 0) / N_SAMPLES,
    xgAway: samples.reduce((s, r) => s + r.away, 0) / N_SAMPLES,
    pHomeAdvance: tieMode ? advance : undefined,
  };
}
