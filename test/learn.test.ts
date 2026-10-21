import { describe, expect, it } from "vitest";
import { driftCheck, reviewMiss, runCycle, type LoggedPrediction } from "../src/learn";
import { DEFAULT_PARAMS } from "../src/ratings";
import { tune } from "../src/tune";
import { countries, ids, m, season } from "./helpers";

const past = season();
const fixture = m("en.1", "2026-03-05", ids[0]!, ids[3]!);

function logged(over: Partial<LoggedPrediction>): LoggedPrediction {
  return {
    matchId: "x",
    comp: "en.1",
    date: "2026-01-01",
    home: ids[0]!,
    away: ids[1]!,
    madeAt: "2025-12-30",
    paramsVersion: 1,
    pHome: 0.45,
    pDraw: 0.27,
    pAway: 0.28,
    pHomeCi: [0.3, 0.6],
    pAwayCi: [0.2, 0.4],
    pick: { side: "home", teamId: ids[0]!, pWin: 0.45, isHighProbability: false },
    mostLikelyMargin: "",
    mostLikelyScore: "1–1",
    ...over,
  };
}

describe("learning cycle", () => {
  it("freezes a prediction before the match, scores it after, and learns from the result", () => {
    const run = (matches: typeof past, log: LoggedPrediction[], today: string) =>
      runCycle({ matches, countries, params: DEFAULT_PARAMS, log, events: [], today, noTune: true });
    const first = run([...past, fixture], [], "2026-03-01");
    expect(first.newPredictions.map((p) => p.matchId)).toEqual([fixture.id]);
    const frozen = first.log[0]!;

    expect(run([...past, fixture], first.log, "2026-03-02").newPredictions).toHaveLength(0);

    const after = run([...past, { ...fixture, ft: { home: 0, away: 2 } }], first.log, "2026-03-06");
    const scored = after.log.find((p) => p.matchId === fixture.id)!;
    expect(scored.pHome).toBe(frozen.pHome);
    expect(scored.hit).toBe(false);
    expect(scored.miss?.explanation).toMatch(/Ratings moved/);
    expect(after.newlyScored).toHaveLength(1);
    expect(after.state.teams[ids[3]!]!.attack.m).toBeGreaterThan(first.state.teams[ids[3]!]!.attack.m);
  });

  it("classifies misses", () => {
    expect(reviewMiss(logged({}), { home: 1, away: 1 }).kind).toBe("draw-missed");
    expect(reviewMiss(logged({}), { home: 0, away: 1 }).kind).toBe("coin-flip");
    expect(reviewMiss(logged({ pHome: 0.7, pick: { side: "home", teamId: ids[0]!, pWin: 0.7, isHighProbability: true } }), { home: 0, away: 1 }).kind).toBe("upset");
    expect(reviewMiss(logged({ pHome: 0.3, pDraw: 0.4, pAway: 0.3 }), { home: 2, away: 0 }).kind).toBe("draw-called-wrongly");
  });

  it("flags overconfidence in the drift check, not calibrated odds", () => {
    const mk = (i: number, p: number, won: boolean) =>
      logged({ matchId: String(i), pHome: p, pDraw: (1 - p) / 2, pAway: (1 - p) / 2, logLoss: -Math.log(won ? p : (1 - p) / 2) });
    const calibrated = Array.from({ length: 200 }, (_, i) => mk(i, 0.6, i % 10 < 6));
    const overconfident = Array.from({ length: 200 }, (_, i) => mk(i, 0.9, i % 10 < 5));
    expect(Math.abs(driftCheck(calibrated).z)).toBeLessThan(2);
    expect(driftCheck(overconfident).z).toBeGreaterThan(2);
  });

  it("tuning never adopts a worse parameter set", () => {
    const res = tune(past, countries, DEFAULT_PARAMS, "2025-09-01", 1);
    const obj = (w: typeof res.before) => (w.cl.n ? 0.5 * w.all.logLoss + 0.5 * w.cl.logLoss : w.all.logLoss);
    expect(obj(res.after)).toBeLessThanOrEqual(obj(res.before));
    expect(res.params.version).toBe(res.improved ? DEFAULT_PARAMS.version + 1 : DEFAULT_PARAMS.version);
  });
});
