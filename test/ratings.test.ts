import { describe, expect, it } from "vitest";
import { capScore, DEFAULT_PARAMS, runFilter, strength, teamAt } from "../src/ratings";
import { countries, ids, m, season } from "./helpers";

describe("rating filter", () => {
  it("raises the winner, lowers the loser and shrinks uncertainty", () => {
    const [a, b] = ids;
    const s = runFilter([m("en.1", "2025-08-10", a!, b!, 3, 0)], countries, DEFAULT_PARAMS);
    expect(s.teams[a!]!.attack.m).toBeGreaterThan(0);
    expect(s.teams[b!]!.defence.m).toBeLessThan(0);
    expect(s.teams[a!]!.attack.v).toBeLessThan(DEFAULT_PARAMS.initVar);
  });

  it("lets uncertainty grow back with time off, capped at the prior", () => {
    const [a, b] = ids;
    const s = runFilter([m("en.1", "2025-08-10", a!, b!, 1, 0)], countries, DEFAULT_PARAMS);
    const soon = teamAt(s, a!, "ENG", "2025-08-11", DEFAULT_PARAMS).attack.v;
    const later = teamAt(s, a!, "ENG", "2026-02-11", DEFAULT_PARAMS).attack.v;
    expect(later).toBeGreaterThan(soon);
    expect(teamAt(s, a!, "ENG", "2035-01-01", DEFAULT_PARAMS).attack.v).toBeLessThanOrEqual(DEFAULT_PARAMS.initVar);
  });

  it("learns league offsets only from cross-border games", () => {
    const s = runFilter(season(), countries, DEFAULT_PARAMS);
    expect(s.leagues["ENG"]!.m).toBeGreaterThan(s.leagues["GER"]!.m);
    // Compare the two leagues' bottom clubs: same domestic record, separated by the league offsets.
    const mu = Math.log(1.2);
    expect(strength(s, ids[3]!, mu)).toBeGreaterThan(strength(s, ids[7]!, mu));
  });

  it("caps routs without changing the result", () => {
    expect(capScore({ home: 7, away: 0 }, 3)).toEqual({ home: 3, away: 0 });
    expect(capScore({ home: 3, away: 6 }, 3)).toEqual({ home: 3, away: 4 });
    expect(capScore({ home: 2, away: 2 }, 3)).toEqual({ home: 2, away: 2 });
  });
});
