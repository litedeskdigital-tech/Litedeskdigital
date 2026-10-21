import { quickFullTime } from "./engine";
import type { Match } from "./data/types";
import { runFilter, viewMatch, type Params } from "./ratings";

export type Outcome = "home" | "draw" | "away";

export function outcomeOf(score: { home: number; away: number }): Outcome {
  return score.home > score.away ? "home" : score.home < score.away ? "away" : "draw";
}

export type Score3 = { n: number; logLoss: number; brier: number; accuracy: number };

export type WalkForward = {
  all: Score3;
  cl: Score3;
};

const EMPTY = (): { n: number; ll: number; br: number; hit: number } => ({ n: 0, ll: 0, br: 0, hit: 0 });

function finish(s: ReturnType<typeof EMPTY>): Score3 {
  return s.n
    ? { n: s.n, logLoss: s.ll / s.n, brier: s.br / s.n, accuracy: s.hit / s.n }
    : { n: 0, logLoss: 0, brier: 0, accuracy: 0 };
}

/**
 * Walk-forward score: every played match on or after `from` is priced from the state before it, then folded in.
 * Nothing is fitted on the match it is scored on.
 */
export function walkForward(
  matches: Match[],
  countries: Record<string, string>,
  params: Params,
  from: string,
): WalkForward {
  const all = EMPTY();
  const cl = EMPTY();
  runFilter(matches, countries, params, (m, state) => {
    if (m.date < from) return;
    const p = quickFullTime(viewMatch(state, m, countries, params), params.rho);
    const o = outcomeOf(m.ft);
    const po = p[o];
    const pick: Outcome = p.home >= p.draw && p.home >= p.away ? "home" : p.away >= p.draw ? "away" : "draw";
    const br =
      (p.home - (o === "home" ? 1 : 0)) ** 2 + (p.draw - (o === "draw" ? 1 : 0)) ** 2 + (p.away - (o === "away" ? 1 : 0)) ** 2;
    for (const s of m.comp === "cl" ? [all, cl] : [all]) {
      s.n += 1;
      s.ll -= Math.log(Math.max(1e-9, po));
      s.br += br;
      s.hit += pick === o ? 1 : 0;
    }
  });
  return { all: finish(all), cl: finish(cl) };
}

/** Values tried for each tunable setting; the search moves one setting at a time (coordinate descent). */
export const SEARCH: Partial<Record<keyof Params, number[]>> = {
  driftPerDay: [0.00002, 0.00005, 0.0001, 0.0002, 0.0004],
  initVar: [0.02, 0.04, 0.06, 0.1, 0.16, 0.25, 0.4],
  rho: [-0.15, -0.1, -0.07, -0.04, 0, 0.04, 0.08],
  newcomerOffset: [0, 0.08, 0.15, 0.25, 0.35, 0.5],
  foreignPrior: [-0.5, -0.35, -0.25, -0.15, 0],
  leagueVar: [0.02, 0.05, 0.1, 0.2, 0.4],
  leagueDriftPerDay: [0, 0.000005, 0.00001, 0.00003, 0.0001],
  goalCap: [2, 3, 4, 6, 10],
  compHalfLifeDays: [180, 365, 730, 1460],
};

/**
 * The objective weights the Champions League at least as much as all other matches together, since that is the
 * competition being predicted; domestic games still count so the shared ratings stay sound.
 */
function objective(w: WalkForward): number {
  if (w.cl.n === 0) return w.all.logLoss;
  return 0.5 * w.all.logLoss + 0.5 * w.cl.logLoss;
}

export type TuneResult = { params: Params; before: WalkForward; after: WalkForward; improved: boolean };

/** Minimum improvement in the objective before a new parameter set replaces the current one. */
export const ADOPT_MARGIN = 0.001;

export function tune(
  matches: Match[],
  countries: Record<string, string>,
  current: Params,
  from: string,
  passes = 2,
): TuneResult {
  const before = walkForward(matches, countries, current, from);
  let best = { ...current };
  let bestScore = objective(before);
  let bestWf = before;
  for (let pass = 0; pass < passes; pass += 1) {
    for (const [key, values] of Object.entries(SEARCH) as [keyof Params, number[]][]) {
      for (const v of values) {
        if (best[key] === v) continue;
        const trial = { ...best, [key]: v };
        const wf = walkForward(matches, countries, trial, from);
        const score = objective(wf);
        if (score < bestScore - 1e-6) {
          best = trial;
          bestScore = score;
          bestWf = wf;
        }
      }
    }
  }
  const improved = objective(before) - bestScore >= ADOPT_MARGIN;
  return {
    params: improved ? { ...best, version: current.version + 1 } : current,
    before,
    after: improved ? bestWf : before,
    improved,
  };
}
