import { describe, expect, it } from "vitest";
import {
  buildPlayerSheet,
  fetchUefaSeason,
  mapTeams,
  parseRanking,
  playersToCsv,
  positionOf,
  rankingUrl,
  uefaSeasonYear,
  type UefaPlayer,
} from "../src/data/uefa";
import { parsePlayersCsv } from "../src/scorers";
import { registerTeam } from "../src/teams";

// Trimmed from a real compstats.uefa.com player-ranking response (2026-27, fetched by the probe workflow).
const ROW = {
  idProvider: "FAME",
  player: { internationalName: "Serhou Guirassy", fieldPosition: "FORWARD", detailedFieldPosition: "STRIKER", clubId: "52758" },
  playerId: "250080553",
  statistics: [
    { name: "goals", value: "4" },
    { name: "minutes_played_official", value: "210" },
    { name: "matches_appearance", value: "3" },
    { name: "penalty_scored", value: "1" },
  ],
  team: { id: "52758", internationalName: "B. Dortmund", countryCode: "GER", teamCode: "BVB" },
};

function p(over: Partial<UefaPlayer>): UefaPlayer {
  return {
    playerId: "1", name: "X", fieldPosition: "FORWARD", detailedPosition: "STRIKER", uefaTeamId: "t1", teamName: "Club",
    country: "ENG", goals: 0, penalties: 0, minutes: 270, apps: 3, ...over,
  };
}

describe("UEFA player importer", () => {
  it("builds the ranking URL with UEFA's end-year seasons", () => {
    expect(uefaSeasonYear("2026-27")).toBe(2027);
    const url = new URL(rankingUrl(2027, 100));
    expect(url.host).toBe("compstats.uefa.com");
    expect(url.searchParams.get("seasonYear")).toBe("2027");
    expect(url.searchParams.get("offset")).toBe("100");
    expect(url.searchParams.get("stats")).toContain("penalty_scored");
  });

  it("asks for the Champions League by default and any other UEFA competition by id", () => {
    expect(new URL(rankingUrl(2027, 0)).searchParams.get("competitionId")).toBe("1");
    expect(new URL(rankingUrl(2027, 0, 14)).searchParams.get("competitionId")).toBe("14");
  });

  it("parses a real response row", () => {
    expect(parseRanking([ROW])[0]).toEqual({
      playerId: "250080553", name: "Serhou Guirassy", fieldPosition: "FORWARD", detailedPosition: "STRIKER",
      uefaTeamId: "52758", teamName: "B. Dortmund", country: "GER", goals: 4, penalties: 1, minutes: 210, apps: 3,
    });
  });

  it("pages until a short page and stops at a season with no data", async () => {
    const calls: string[] = [];
    const full = JSON.stringify(Array.from({ length: 100 }, (_, i) => ({ ...ROW, playerId: String(i) })));
    const short = JSON.stringify([ROW]);
    const got = await fetchUefaSeason(2027, async (url) => {
      calls.push(url);
      return calls.length === 1 ? full : short;
    });
    expect(got).toHaveLength(101);
    expect(calls).toHaveLength(2);
    expect(await fetchUefaSeason(2030, async () => null)).toBeNull();
  });

  it("maps UEFA's short club names to database ids, and refuses to guess", () => {
    const ours = [
      { id: "borussia-dortmund", name: "Borussia Dortmund", country: "GER", inCl: true },
      { id: "manchester-city-fc", name: "Manchester City FC", country: "ENG", inCl: true },
      { id: "manchester-united-fc", name: "Manchester United FC", country: "ENG", inCl: true },
      { id: "paris-saint-germain-fc", name: "Paris Saint-Germain FC", country: "FRA", inCl: true },
      { id: "paris-fc", name: "Paris FC", country: "FRA", inCl: false },
      { id: "sporting-clube-de-portugal", name: "Sporting Clube de Portugal", country: "POR", inCl: true },
      { id: "sporting-clube-de-braga", name: "Sporting Clube de Braga", country: "POR", inCl: true },
    ];
    const m = mapTeams(
      [
        { uefaTeamId: "1", teamName: "B. Dortmund", country: "GER" },
        { uefaTeamId: "2", teamName: "Man City", country: "ENG" },
        { uefaTeamId: "3", teamName: "Paris", country: "FRA" },
        { uefaTeamId: "4", teamName: "Sporting CP", country: "POR" },
        { uefaTeamId: "5", teamName: "Sporting", country: "POR" },
        { uefaTeamId: "6", teamName: "Nowhere United", country: "ENG" },
        { uefaTeamId: "7", teamName: "Man Utd", country: "ENG" },
      ],
      ours,
      { "5": "sporting-clube-de-braga" },
    );
    expect(m.get("1")).toBe("borussia-dortmund");
    expect(m.get("2")).toBe("manchester-city-fc");
    expect(m.get("3")).toBe("paris-saint-germain-fc");
    expect(m.get("4")).toBe("sporting-clube-de-portugal");
    expect(m.get("5")).toBe("sporting-clube-de-braga");
    expect(m.get("6")).toBeNull();
    expect(m.get("7")).toBe("manchester-united-fc");
  });

  it("builds a shrunk, penalty-free scoring rate, expected minutes and one penalty taker per club", () => {
    const current = [
      p({ playerId: "a", name: "Hot Striker", goals: 4, penalties: 1, minutes: 210, apps: 3 }),
      p({ playerId: "b", name: "Sub", goals: 0, minutes: 20, apps: 2, fieldPosition: "MIDFIELDER", detailedPosition: "CENTRAL_MIDFIELDER" }),
      p({ playerId: "c", name: "Elsewhere", uefaTeamId: "t2", teamName: "Unknown" }),
    ];
    const { players, report } = buildPlayerSheet(current, [], new Map([["t1", "club-a"], ["t2", null]]));
    const striker = players.find((x) => x.name === "Hot Striker")!;
    // 3 non-penalty goals in 210', shrunk toward 0.35 with 4 matches' weight: (3 + 1.4) / (2.33 + 4).
    expect(striker.npGoalsPer90).toBeCloseTo(0.695, 2);
    expect(striker.expectedMinutes).toBe(70);
    expect(striker.penaltyTaker).toBe(true);
    // 20 minutes over 3 club games is under the 10-minute floor.
    expect(players.find((x) => x.name === "Sub")).toBeUndefined();
    expect(report.unmapped).toEqual([{ uefaTeamId: "t2", name: "Unknown", country: "ENG" }]);
  });

  it("writes a CSV the nightly loader accepts", () => {
    registerTeam("Club A", "ENG");
    const { players } = buildPlayerSheet([p({ name: 'Name, "Quoted"', goals: 2 })], [], new Map([["t1", "club-a"]]));
    expect(parsePlayersCsv(playersToCsv(players))[0]).toMatchObject({ name: 'Name, "Quoted"', teamId: "club-a", position: "FW" });
    expect(positionOf("FORWARD", "WINGER")).toBe("AM");
    expect(positionOf("MIDFIELDER", "ATTACKING_MIDFIELDER")).toBe("AM");
  });
});
