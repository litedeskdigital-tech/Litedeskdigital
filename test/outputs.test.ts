import { describe, expect, it } from "vitest";
import { backtest } from "../src/evaluate";
import { FIXTURES } from "../src/fixtures";
import { marginBands, pickWinner, fullTime, HIGH_PROBABILITY } from "../src/markets";
import { scoreGrid } from "../src/engine";
import { generatePrediction, type PredictInput } from "../src/predict";
import { goalShares, loadPlayers, parsePlayersCsv, PEN_SHARE, type Player } from "../src/scorers";

// Synthetic sheet for tests only: not real player data.
const SHEET: Player[] = [
  { id: "h-fw", name: "Home Striker", teamId: "arsenal", position: "FW", npGoalsPer90: 0.6, expectedMinutes: 85, penaltyTaker: true },
  { id: "h-am", name: "Home Ten", teamId: "arsenal", position: "AM", npGoalsPer90: 0.3, expectedMinutes: 80 },
  { id: "h-df", name: "Home Back", teamId: "arsenal", position: "DF", npGoalsPer90: 0.05, expectedMinutes: 90 },
  { id: "a-fw", name: "Away Striker", teamId: "viking", position: "FW", npGoalsPer90: 0.6, expectedMinutes: 85 },
];

const base: PredictInput = {
  homeId: "arsenal",
  awayId: "viking",
  stage: "league",
  venue: "London",
  dateLabel: "test",
  seed: 3,
};

describe("margin bands and winner pick", () => {
  it("bands sum to one and agree with the full-time market", () => {
    const grid = scoreGrid(2.1, 0.9);
    const ft = fullTime(grid);
    const bands = marginBands(grid, "H", "A");
    expect(bands.reduce((s, b) => s + b.p, 0)).toBeCloseTo(1, 9);
    const homeBands = bands.filter((b) => b.key.startsWith("home")).reduce((s, b) => s + b.p, 0);
    expect(homeBands).toBeCloseTo(ft.home, 9);
  });

  it("flags a clear favourite as high probability and names a margin", () => {
    const p = generatePrediction(base);
    expect(p.winner.teamId).toBe("arsenal");
    expect(p.winner.pWin).toBeGreaterThanOrEqual(HIGH_PROBABILITY);
    expect(p.winner.isHighProbability).toBe(true);
    expect(p.winner.pNotLose).toBeGreaterThan(p.winner.pWin);
    expect([1, 2, 3]).toContain(p.winner.likelyMargin);
  });

  it("does not call an even game high probability", () => {
    const grid = scoreGrid(1.3, 1.3);
    const ft = fullTime(grid);
    const pick = pickWinner(ft, marginBands(grid, "H", "A"), "h", "a");
    expect(pick.isHighProbability).toBe(false);
    expect(pick.confidence).toBe("Low");
    expect(pick.pDrawNoBet).toBeCloseTo(0.5, 2);
  });
});

describe("anytime scorer", () => {
  it("gives no pick without player data", () => {
    const p = generatePrediction(base);
    expect(p.bonusScorer).toBeUndefined();
    expect(p.scorerNote).toMatch(/No player data/);
  });

  it("picks the striker of the favourite and keeps chances sensible", () => {
    const p = generatePrediction({ ...base, players: SHEET });
    expect(p.bonusScorer?.playerId).toBe("h-fw");
    expect(p.bonusScorer!.pAnytime).toBeGreaterThan(0.3);
    // Arsenal expect ~5 goals against Viking, so a penalty-taking striker sits near 80%.
    expect(p.bonusScorer!.pAnytime).toBeLessThan(0.85);
    const away = p.anytimeScorers.find((s) => s.playerId === "a-fw")!;
    expect(away.pAnytime).toBeLessThan(p.bonusScorer!.pAnytime);
  });

  it("prices the same striker lower against a strong defence", () => {
    const vsMinnow = generatePrediction({ ...base, players: SHEET }).bonusScorer!.pAnytime;
    const vsElite = generatePrediction({ ...base, awayId: "man-city", players: SHEET }).bonusScorer!.pAnytime;
    expect(vsElite).toBeLessThan(vsMinnow - 0.15);
    expect(vsElite).toBeGreaterThan(0.25);
  });

  it("never hands out more than the listed share of team goals", () => {
    const shares = goalShares(SHEET.filter((s) => s.teamId === "arsenal"), 2.6);
    const total = [...shares.values()].reduce((s, x) => s + x, 0);
    expect(total).toBeLessThan(1);
    // A sheet of prolific players is scaled back so unlisted players keep their slice.
    const greedy = goalShares([{ ...SHEET[0]!, npGoalsPer90: 2.5, expectedMinutes: 90 }, { ...SHEET[1]!, npGoalsPer90: 2.5, expectedMinutes: 90 }], 1.5);
    expect([...greedy.values()].reduce((s, x) => s + x, 0)).toBeLessThanOrEqual(1 - 0.03 - 0.15 * 0.87 + 1e-9);
    expect(shares.get("h-fw")!).toBeGreaterThan(PEN_SHARE);
  });

  it("parses and validates a CSV sheet", () => {
    const csv = "id,name,teamId,position,npGoalsPer90,expectedMinutes,penaltyTaker\nx,Some Player,arsenal,FW,0.5,80,true\n";
    expect(parsePlayersCsv(csv)[0]).toMatchObject({ id: "x", penaltyTaker: true, npGoalsPer90: 0.5 });
    expect(() => parsePlayersCsv(csv.replace("arsenal", "nobody-fc"))).toThrow();
    expect(() => loadPlayers([{ ...SHEET[0], npGoalsPer90: -1 }])).toThrow();
  });
});

describe("backtest", () => {
  it("scores the shipped results out of sample", () => {
    const bt = backtest(FIXTURES);
    expect(bt.n).toBe(FIXTURES.filter((f) => f.result).length);
    expect(bt.logLoss).toBeGreaterThan(0);
    expect(bt.brier).toBeGreaterThan(0);
  });
});
