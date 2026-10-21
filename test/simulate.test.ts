import { describe, expect, it } from "vitest";
import { generatePrediction } from "../src/predict";
import { viewMatch } from "../src/ratings";
import { simulateScenarios, SIMULATIONS } from "../src/simulate";
import { countries, ids, model, season } from "./helpers";

const fitted = model(season());
const match = { home: ids[0]!, away: ids[7]!, comp: "cl", date: "2026-03-01", stage: "league" as const };

describe("scenario simulations", () => {
  const view = viewMatch(fitted.state, match, countries, fitted.params);
  const r = simulateScenarios(view, "home", 3);

  it("runs 5,000 simulations whose home/draw/away agree with the exact model", () => {
    const exact = generatePrediction({ match, model: fitted, seed: 3 }).fullTime;
    expect(r.simulations).toBe(SIMULATIONS);
    // Sampling error at n=5000 is about ±1.4 points; the game-state effect adds a little more.
    expect(Math.abs(r.simulated.home - exact.home)).toBeLessThan(0.04);
    expect(Math.abs(r.simulated.draw - exact.draw)).toBeLessThan(0.04);
  });

  it("produces coherent scenario numbers", () => {
    const sum = (t: { home: number; draw: number; away: number }) => t.home + t.draw + t.away;
    expect(r.firstGoal.home + r.firstGoal.away + r.firstGoal.none).toBeCloseTo(1, 9);
    expect(sum(r.ifHomeScoresFirst)).toBeCloseTo(1, 9);
    expect(r.htft.reduce((s, x) => s + x.p, 0)).toBeCloseTo(1, 9);
    // Scoring first helps; conceding first hurts.
    expect(r.ifHomeScoresFirst.home).toBeGreaterThan(r.simulated.home);
    expect(r.favourite.winsIfConcedesFirst).toBeLessThan(r.simulated.home);
    // Goals come later in matches.
    expect(r.goalInBlock[5]!).toBeGreaterThan(r.goalInBlock[0]!);
    for (const x of Object.values(r.favourite)) if (typeof x === "number") expect(x).toBeGreaterThanOrEqual(0);
  });

  it("is reproducible and reaches predictions, commentary and the frozen log", () => {
    expect(simulateScenarios(view, "home", 3)).toEqual(r);
    const p = generatePrediction({ match, model: fitted, seed: 3 });
    expect(p.scenarios.favourite.side).toBe(p.winner.side);
    expect(p.commentary).toMatch(/5,000 simulations/);
  });
});
