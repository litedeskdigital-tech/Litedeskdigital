import { describe, expect, it } from "vitest";
import { beforeKickoff, driftCheck, reviewMiss, runCycle, type LoggedPrediction } from "../src/learn";
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

describe("player sheet in the nightly cycle", () => {
  it("freezes a bonus scorer with the prediction when a sheet covers the club", () => {
    const players = [
      { id: "s9", name: "Striker", teamId: ids[0]!, position: "FW" as const, npGoalsPer90: 0.6, expectedMinutes: 85, penaltyTaker: true },
    ];
    const out = runCycle({ matches: [...past, fixture], countries, params: DEFAULT_PARAMS, log: [], events: [], today: "2026-03-01", noTune: true, players });
    expect(out.log[0]!.bonusScorer).toMatchObject({ playerId: "s9", teamId: ids[0] });
    expect(out.upcoming[0]!.bonusScorer?.playerId).toBe("s9");
    expect(out.log[0]!.scenario?.htft).toMatch(/^[HDA]\/[HDA]$/);
  });
});

describe("frozen first call and refreshed latest call", () => {
  it("keeps the first call, refreshes the latest until kick-off, and scores both", () => {
    const fx = { ...fixture, kickoff: "2026-03-05T19:00:00Z" };
    const run = (matches: typeof past, log: LoggedPrediction[], now: string) =>
      runCycle({ matches, countries, params: DEFAULT_PARAMS, log, events: [], today: now.slice(0, 10), now, noTune: true });

    const first = run([...past, fx], [], "2026-03-01T04:00:00Z").log[0]!;
    expect(first.latest?.at).toBe("2026-03-01T04:00:00Z");
    expect(first.kickoff).toBe("2026-03-05T19:00:00Z");

    // New evidence arrives: the bottom club wins away. The latest call moves; the first call does not.
    const extra = m("en.1", "2026-03-03", ids[2]!, ids[3]!, 0, 3);
    const later = run([...past, extra, fx], [first], "2026-03-05T16:00:00Z").log[0]!;
    expect(later.pHome).toBe(first.pHome);
    expect(later.latest!.pAway).toBeGreaterThan(first.latest!.pAway);

    // After kick-off nothing changes any more.
    const afterKo = run([...past, extra, fx], [later], "2026-03-05T19:30:00Z").log[0]!;
    expect(afterKo.latest).toEqual(later.latest);

    const scored = run([...past, extra, { ...fx, ft: { home: 2, away: 0 } }], [afterKo], "2026-03-06T04:00:00Z").log[0]!;
    expect(scored.hit).toBe(true);
    expect(scored.latest?.hit).toBe(true);
    expect(scored.latest?.logLoss).toBeGreaterThan(0);
  });
});

describe("beforeKickoff", () => {
  it("uses the kick-off time when known, else the morning of match day", () => {
    expect(beforeKickoff({ date: "2026-03-05", kickoff: "2026-03-05T19:00:00Z" }, "2026-03-05T18:59:00Z")).toBe(true);
    expect(beforeKickoff({ date: "2026-03-05", kickoff: "2026-03-05T19:00:00Z" }, "2026-03-05T19:00:00Z")).toBe(false);
    expect(beforeKickoff({ date: "2026-03-05" }, "2026-03-05T04:17:00Z")).toBe(true);
    expect(beforeKickoff({ date: "2026-03-05" }, "2026-03-05T16:17:00Z")).toBe(false);
  });
});
