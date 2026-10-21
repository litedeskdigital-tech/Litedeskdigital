import type { Score } from "./data/types";
import type { Gauss, MatchView } from "./ratings";
import type { Stage } from "./teams";

/** Score grid runs 0..MAX_GOALS per side; mass beyond it is renormalised away. */
export const MAX_GOALS = 10;
/** Draws from the rating posterior per prediction. */
export const N_SAMPLES = 400;
/** Extra time is a third of a match. */
const ET_FRACTION = 1 / 3;

export type MatchSpec = {
  view: MatchView;
  /** Home edge the other way round, for the second leg of a tie (the competition's edge; 0 for neutral). */
  reverseHomeEdge: number;
  stage: Stage;
  leg?: 1 | 2;
  /** Leg-1 score (leg-1 home first); turns a second leg into an aggregate tie. */
  firstLeg?: Score;
  rho: number;
  seed?: number;
};

/** One posterior draw: the scoring rates that drive both the score grid and the scorer model. */
export type RateSample = { home: number; away: number };

export type MatchSim = {
  /** grid[h][a]: full-time (90-minute) score probabilities, averaged over the rating posterior. */
  grid: number[][];
  samples: RateSample[];
  xgHome: number;
  xgAway: number;
  /** 5th–95th percentile of P(home win) and P(away win) across posterior draws: how sure the model is of its own odds. */
  pHomeCi: [number, number];
  pAwayCi: [number, number];
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
export function scoreGrid(lh: number, la: number, rho: number, max = MAX_GOALS): number[][] {
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

function draw(g: Gauss, rng: Rng): number {
  return g.m + Math.sqrt(Math.max(0, g.v)) * gaussian(rng);
}

function percentile(sorted: number[], q: number): number {
  return sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))]!;
}

/**
 * Integrates the score grid over the rating posterior: each draw samples all four ratings, so leg 2 of a tie
 * sees the same draw as leg 1, and the spread of per-draw win chances gives the credible interval.
 */
export function simulateMatch(spec: MatchSpec): MatchSim {
  const { view, rho } = spec;
  const knockout = spec.stage !== "league";
  const rng = makeRng(spec.seed ?? Math.floor(Math.random() * 2 ** 32));
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
  const pHomes: number[] = [];
  const pAways: number[] = [];
  let advance = 0;

  for (let i = 0; i < N_SAMPLES; i += 1) {
    const aH = draw(view.home.attack, rng);
    const dH = draw(view.home.defence, rng);
    const aA = draw(view.away.attack, rng);
    const dA = draw(view.away.defence, rng);
    const lh = Math.exp(view.mu + view.homeEdge + aH - dA);
    const la = Math.exp(view.mu + aA - dH);
    const sample = scoreGrid(lh, la, rho);
    let pH = 0;
    let pA = 0;
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        const p = sample[x]![y]!;
        grid[x]![y]! += p / N_SAMPLES;
        if (x > y) pH += p;
        else if (y > x) pA += p;
      }
    }
    pHomes.push(pH);
    pAways.push(pA);
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
        // Leg 2 at the other ground, same rating draw.
        const l2For = Math.exp(view.mu + aH - dA);
        const l2Against = Math.exp(view.mu + spec.reverseHomeEdge + aA - dH);
        const leg2 = diffDist(scoreGrid(l2Against, l2For, rho));
        const leg2ForHome = new Map([...leg2].map(([d, p]) => [-d, p]));
        advance +=
          advanceFrom(convolve(diff, leg2ForHome), l2For * ET_FRACTION, l2Against * ET_FRACTION) / N_SAMPLES;
      }
    }
  }

  pHomes.sort((x, y) => x - y);
  pAways.sort((x, y) => x - y);
  return {
    grid,
    samples,
    xgHome: samples.reduce((s, r) => s + r.home, 0) / N_SAMPLES,
    xgAway: samples.reduce((s, r) => s + r.away, 0) / N_SAMPLES,
    pHomeCi: [percentile(pHomes, 0.05), percentile(pHomes, 0.95)],
    pAwayCi: [percentile(pAways, 0.05), percentile(pAways, 0.95)],
    pHomeAdvance: tieMode ? advance : undefined,
  };
}

/** Gauss–Hermite nodes and weights (3 points, unit normal). */
const GH: [number, number][] = [
  [-Math.sqrt(3), 1 / 6],
  [0, 2 / 3],
  [Math.sqrt(3), 1 / 6],
];

/** Fast deterministic home/draw/away over the rating posterior, for tuning and the backtest. */
export function quickFullTime(view: MatchView, rho: number): { home: number; draw: number; away: number } {
  const mh = view.mu + view.homeEdge + view.home.attack.m - view.away.defence.m;
  const sh = Math.sqrt(view.home.attack.v + view.away.defence.v);
  const ma = view.mu + view.away.attack.m - view.home.defence.m;
  const sa = Math.sqrt(view.away.attack.v + view.home.defence.v);
  let home = 0;
  let drawP = 0;
  let away = 0;
  for (const [xh, wh] of GH) {
    for (const [xa, wa] of GH) {
      const g = scoreGrid(Math.exp(mh + sh * xh), Math.exp(ma + sa * xa), rho);
      const w = wh * wa;
      g.forEach((row, x) =>
        row.forEach((p, y) => {
          if (x > y) home += w * p;
          else if (x === y) drawP += w * p;
          else away += w * p;
        }),
      );
    }
  }
  return { home, draw: drawP, away };
}
