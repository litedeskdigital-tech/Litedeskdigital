import { describe, expect, it } from "vitest";
import { fullTime, marginBands, pickWinner } from "../src/markets";
import { scoreGrid } from "../src/engine";
import { generatePrediction } from "../src/predict";
import { goalShares, parsePlayersCsv, type Player } from "../src/scorers";
import { ids, model, season } from "./helpers";

const fitted = model(season());
const match = { home: ids[0]!, away: ids[7]!, comp: "cl", date: "2026-03-01", stage: "league" as const };

describe("generatePrediction", () => {
  it("gives a three-way market, a range, and names the favourite", () => {
    const p = generatePrediction({ match, model: fitted, seed: 1 });
    expect(p.fullTime.home + p.fullTime.draw + p.fullTime.away).toBeCloseTo(1, 2);
    expect(p.winner.teamId).toBe(ids[0]);
    expect(p.pHomeCi[0]).toBeLessThan(p.fullTime.home);
    expect(p.pHomeCi[1]).toBeGreaterThan(p.fullTime.home);
    expect(p.margins.reduce((s, b) => s + b.p, 0)).toBeCloseTo(1, 2);
  });

  it("is reproducible with a seed and symmetric at a neutral venue", () => {
    const a = generatePrediction({ match, model: fitted, seed: 4 });
    const b = generatePrediction({ match, model: fitted, seed: 4 });
    expect(a.fullTime).toEqual(b.fullTime);
    const even = generatePrediction({ match: { ...match, home: ids[1]!, away: ids[2]!, neutral: true }, model: fitted, seed: 4 });
    const mirror = generatePrediction({ match: { ...match, home: ids[2]!, away: ids[1]!, neutral: true }, model: fitted, seed: 4 });
    expect(Math.abs(even.fullTime.home - mirror.fullTime.away)).toBeLessThan(0.03);
  });

  it("prices knockout ties", () => {
    const leg2 = generatePrediction({
      match: { ...match, stage: "qf", leg: 2, home: ids[7]!, away: ids[0]! },
      firstLeg: { home: 3, away: 0 },
      model: fitted,
      seed: 1,
    });
    expect(leg2.pHomeAdvance!).toBeLessThan(0.05);
    const final = generatePrediction({ match: { ...match, stage: "final", neutral: true }, model: fitted, seed: 1 });
    expect(final.pHomeAdvance!).toBeGreaterThan(final.fullTime.home);
  });
});

describe("winner pick", () => {
  it("withholds the high-probability flag when the range is too wide", () => {
    const grid = scoreGrid(2.2, 0.8, 0);
    const ft = fullTime(grid);
    const bands = marginBands(grid, "H", "A");
    const sure = pickWinner(ft, bands, "h", "a", { home: [0.55, 0.8], away: [0.05, 0.2] });
    const shaky = pickWinner(ft, bands, "h", "a", { home: [0.3, 0.9], away: [0.05, 0.4] });
    expect(ft.home).toBeGreaterThan(0.6);
    expect(sure.isHighProbability).toBe(true);
    expect(shaky.isHighProbability).toBe(false);
  });
});

describe("anytime scorer", () => {
  const sheet: Player[] = [
    { id: "s9", name: "Striker", teamId: ids[0]!, position: "FW", npGoalsPer90: 0.6, expectedMinutes: 85, penaltyTaker: true },
    { id: "w7", name: "Winger", teamId: ids[0]!, position: "AM", npGoalsPer90: 0.3, expectedMinutes: 80 },
  ];

  it("picks the favourite's striker, and no pick without data", () => {
    expect(generatePrediction({ match, model: fitted, seed: 1 }).bonusScorer).toBeUndefined();
    const p = generatePrediction({ match, model: fitted, seed: 1, players: sheet });
    expect(p.bonusScorer?.playerId).toBe("s9");
    expect(p.bonusScorer!.pAnytime).toBeGreaterThan(0.2);
    expect(p.bonusScorer!.pAnytime).toBeLessThan(0.95);
  });

  it("never lets a sheet claim all the team's goals, and validates CSV", () => {
    const greedy = goalShares(sheet.map((p) => ({ ...p, npGoalsPer90: 2.5 })), 1.5);
    expect([...greedy.values()].reduce((s, x) => s + x, 0)).toBeLessThan(0.9);
    expect(() => parsePlayersCsv(`id,name,teamId,position,npGoalsPer90,expectedMinutes\nx,X,nobody,FW,0.5,80`)).toThrow();
  });
});
