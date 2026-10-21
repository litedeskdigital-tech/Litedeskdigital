import { describe, expect, it } from "vitest";
import { FIXTURES, type Fixture } from "../src/fixtures";
import { capScore, fitRatings, PRIOR_RATINGS, expectedGoals } from "../src/posterior";
import { scoreGrid } from "../src/engine";
import { generatePrediction, type PredictInput } from "../src/predict";

const base: PredictInput = {
  homeId: "arsenal",
  awayId: "viking",
  stage: "league",
  venue: "London",
  dateLabel: "test",
  seed: 7,
};

describe("scoreGrid", () => {
  it("sums to one and lifts 0-0 above independent Poisson", () => {
    const dc = scoreGrid(1.4, 1.1);
    const indep = scoreGrid(1.4, 1.1, 0);
    const total = dc.flat().reduce((s, p) => s + p, 0);
    expect(total).toBeCloseTo(1, 9);
    expect(dc[0]![0]!).toBeGreaterThan(indep[0]![0]!);
  });
});

describe("generatePrediction", () => {
  it("returns a three-way market that sums to one", () => {
    const p = generatePrediction(base);
    expect(p.fullTime.home + p.fullTime.draw + p.fullTime.away).toBeCloseTo(1, 2);
    expect(p.fullTime.home).toBeGreaterThan(0.7);
    expect(p.pHomeAdvance).toBeUndefined();
  });

  it("is reproducible with a seed", () => {
    const a = generatePrediction(base);
    const b = generatePrediction(base);
    expect(a.fullTime.home).toBe(b.fullTime.home);
    expect(a.mostLikelyScore).toBe(b.mostLikelyScore);
  });

  it("gives the home side an edge in an even match-up", () => {
    const p = generatePrediction({ ...base, homeId: "lille", awayId: "stuttgart" });
    expect(p.fullTime.home).toBeGreaterThan(p.fullTime.away);
    const n = generatePrediction({ ...base, homeId: "lille", awayId: "stuttgart", neutral: true });
    expect(Math.abs(n.fullTime.home - n.fullTime.away)).toBeLessThan(0.02);
  });

  it("prices a second leg from the aggregate", () => {
    const comeback = generatePrediction({
      ...base,
      homeId: "inter",
      awayId: "barcelona",
      stage: "qf",
      leg: 2,
      firstLeg: { home: 3, away: 0 },
    });
    expect(comeback.pHomeAdvance!).toBeLessThan(0.1);
    expect(() => generatePrediction({ ...base, stage: "qf", leg: 2 })).toThrow();
  });

  it("splits a neutral final between equal sides", () => {
    const p = generatePrediction({ ...base, homeId: "lille", awayId: "stuttgart", stage: "final", neutral: true });
    expect(p.pHomeAdvance!).toBeCloseTo(0.5, 1);
  });

  it("makes the stronger club the favourite over two legs", () => {
    const p = generatePrediction({ ...base, homeId: "sabah", awayId: "liverpool", stage: "r16", leg: 1 });
    expect(p.pHomeAdvance!).toBeLessThan(0.15);
  });
});

describe("fitRatings", () => {
  it("is damped: one rout moves a club only a little", () => {
    const rout: Fixture = {
      id: "x",
      stage: "league",
      homeId: "sabah",
      awayId: "real-madrid",
      venue: "Baku",
      dateLabel: "test",
      result: { home: 6, away: 0 },
    };
    const fitted = fitRatings([rout]);
    const before = PRIOR_RATINGS["sabah"]!;
    const after = fitted["sabah"]!;
    expect(after.attack).toBeGreaterThan(before.attack);
    expect(after.attack - before.attack).toBeLessThan(0.25);
    const xg = expectedGoals("real-madrid", "sabah", false, fitted);
    expect(xg.home).toBeGreaterThan(xg.away);
  });

  it("caps routs without changing the result", () => {
    expect(capScore({ home: 6, away: 0 })).toEqual({ home: 3, away: 0 });
    expect(capScore({ home: 3, away: 6 })).toEqual({ home: 3, away: 4 });
    expect(capScore({ home: 4, away: 4 })).toEqual({ home: 4, away: 4 });
  });

  it("fits the shipped league-phase results", () => {
    const fitted = fitRatings(FIXTURES);
    for (const r of Object.values(fitted)) {
      expect(Number.isFinite(r.attack) && Number.isFinite(r.defence)).toBe(true);
    }
  });
});
