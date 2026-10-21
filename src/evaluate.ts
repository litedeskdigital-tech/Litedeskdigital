import { simulateMatch } from "./engine";
import type { Fixture } from "./fixtures";
import { fullTime } from "./markets";
import { fitRatings, PRIOR_RATINGS } from "./posterior";

export type BacktestRow = {
  fixtureId: string;
  pHome: number;
  pDraw: number;
  pAway: number;
  outcome: "home" | "draw" | "away";
  /** The model's pick (the most likely of the three) matched the result. */
  hit: boolean;
};

export type Backtest = {
  n: number;
  /** Mean negative log probability of the realised outcome; ln 3 ≈ 1.099 is a coin toss over three. */
  logLoss: number;
  /** Three-way Brier score; 0.667 is uniform guessing. */
  brier: number;
  accuracy: number;
  rows: BacktestRow[];
};

/**
 * Walk-forward check: every played league-phase game is priced with ratings fitted only on earlier
 * matchdays, so the score is out of sample. Matchday 1 is priced from the Elo priors alone.
 */
export function backtest(fixtures: Fixture[], seed = 1): Backtest {
  const played = fixtures.filter((f) => f.result !== undefined && f.matchday !== undefined);
  const rows: BacktestRow[] = [];
  for (const f of played) {
    const earlier = played.filter((g) => g.matchday! < f.matchday!);
    const ratings = earlier.length ? fitRatings(earlier) : PRIOR_RATINGS;
    const ft = fullTime(simulateMatch({ ...f, ratings, seed }).grid);
    const { home, away } = f.result!;
    const outcome = home > away ? "home" : home < away ? "away" : "draw";
    const pick = ft.home >= ft.draw && ft.home >= ft.away ? "home" : ft.away >= ft.draw ? "away" : "draw";
    rows.push({ fixtureId: f.id, pHome: ft.home, pDraw: ft.draw, pAway: ft.away, outcome, hit: pick === outcome });
  }
  const n = rows.length;
  const pOf = (r: BacktestRow) => (r.outcome === "home" ? r.pHome : r.outcome === "away" ? r.pAway : r.pDraw);
  const brierOf = (r: BacktestRow) =>
    (r.pHome - (r.outcome === "home" ? 1 : 0)) ** 2 +
    (r.pDraw - (r.outcome === "draw" ? 1 : 0)) ** 2 +
    (r.pAway - (r.outcome === "away" ? 1 : 0)) ** 2;
  return {
    n,
    logLoss: n ? rows.reduce((s, r) => s - Math.log(Math.max(1e-9, pOf(r))), 0) / n : 0,
    brier: n ? rows.reduce((s, r) => s + brierOf(r), 0) / n : 0,
    accuracy: n ? rows.filter((r) => r.hit).length / n : 0,
    rows,
  };
}
