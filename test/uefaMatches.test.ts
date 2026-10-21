import { describe, expect, it } from "vitest";
import { mergeMatches, parseManualCl } from "../src/data/db";
import { fetchUefaMatches, matchesUrl, stageOf, toMatches, type UefaMatchRow } from "../src/data/uefaMatches";
import { registerTeam } from "../src/teams";

for (const [n, c] of [
  ["VfB Stuttgart", "GER"],
  ["Club Atlético de Madrid", "ESP"],
  ["Lille OSC", "FRA"],
  ["Galatasaray SK", "TUR"],
  ["Paris Saint-Germain FC", "FRA"],
  ["Paris FC", "FRA"],
  ["Arsenal FC", "ENG"],
  ["AEK Athen", "GRE"],
] as const) registerTeam(n, c);

const team = (id: string, internationalName: string, countryCode: string) => ({ id, internationalName, countryCode });

// Trimmed from real match.uefa.com/v5/matches rows fetched by the probe workflow.
const FINISHED: UefaMatchRow = {
  id: "2049596",
  status: "FINISHED",
  homeTeam: team("50107", "Stuttgart", "GER"),
  awayTeam: team("50124", "Atleti", "ESP"),
  kickOffTime: { date: "2026-10-20" },
  round: { phase: "TOURNAMENT", metaData: { name: "League Phase", type: "GROUP_STANDINGS" } },
  matchday: { longName: "Matchday 3", sequenceNumber: "3", type: "MATCHDAY" },
  score: { regular: { home: 1, away: 1 }, total: { home: 1, away: 1 } },
};
const UPCOMING: UefaMatchRow = {
  id: "2049605",
  status: "UPCOMING",
  homeTeam: team("75797", "Lille", "FRA"),
  awayTeam: team("50067", "Galatasaray", "TUR"),
  kickOffTime: { date: "2026-10-21" },
  round: { phase: "TOURNAMENT", metaData: { name: "League Phase", type: "GROUP_STANDINGS" } },
  matchday: { sequenceNumber: "3" },
};
const FINAL: UefaMatchRow = {
  id: "2047742",
  status: "FINISHED",
  homeTeam: team("52747", "Paris", "FRA"),
  awayTeam: team("52280", "Arsenal", "ENG"),
  kickOffTime: { date: "2026-05-30" },
  round: { phase: "TOURNAMENT", metaData: { name: "Final", type: "FINAL" } },
  score: { penalty: { home: 4, away: 3 }, regular: { home: 1, away: 1 }, total: { home: 1, away: 1 } },
};
const CL = { comp: "cl", qualifyingComp: "clq" };
const clClubs = new Set(["paris-saint-germain-fc", "arsenal-fc", "vfb-stuttgart", "club-atletico-de-madrid", "lille-osc", "galatasaray-sk"]);

describe("UEFA match importer", () => {
  it("builds paged URLs and stops on a short page", async () => {
    expect(new URL(matchesUrl(1, 2027, 200)).searchParams.get("offset")).toBe("200");
    const calls: string[] = [];
    const rows = await fetchUefaMatches(1, 2027, async (url) => {
      calls.push(url);
      return JSON.stringify(calls.length === 1 ? Array.from({ length: 200 }, () => FINISHED) : [UPCOMING]);
    });
    expect(rows).toHaveLength(201);
    expect(calls).toHaveLength(2);
  });

  it("maps UEFA names onto database clubs and keeps fixtures unplayed", () => {
    const { matches, report } = toMatches([FINISHED, UPCOMING], CL, "2026-27", {}, false, clClubs);
    expect(matches[0]).toMatchObject({
      id: "cl/2026-27/league/vfb-stuttgart-v-club-atletico-de-madrid",
      date: "2026-10-20",
      matchday: 3,
      ft: { home: 1, away: 1 },
      source: "uefa",
    });
    expect(matches[1]).toMatchObject({ id: "cl/2026-27/league/lille-osc-v-galatasaray-sk", ft: undefined });
    expect(report.skipped).toEqual([]);
  });

  it("reads finals: neutral venue, 90-minute score, penalties; Paris is PSG", () => {
    const [m] = toMatches([FINAL], CL, "2025-26", {}, false, clClubs).matches;
    expect(m).toMatchObject({ stage: "final", neutral: true, home: "paris-saint-germain-fc", ft: { home: 1, away: 1 }, pens: { home: 4, away: 3 } });
    expect(stageOf({ ...FINAL, round: { metaData: { name: "Quarter-finals", type: "X" } } })).toBe("qf");
  });

  it("uses the alias table for spellings token matching cannot settle", () => {
    const aek: UefaMatchRow = { ...UPCOMING, homeTeam: team("50129", "AEK Athens", "GRE") };
    expect(toMatches([aek], CL, "2026-27", {}, false, clClubs).matches[0]!.home).toBe("aek-athen");
  });

  it("adds new clubs only from countries without league data, and drops unplayed rows when asked", () => {
    const viking: UefaMatchRow = { ...FINISHED, homeTeam: team("9", "Viking", "NOR"), awayTeam: team("10", "Mystery FC", "ENG") };
    const { matches, report } = toMatches([viking, UPCOMING], { comp: "el", qualifyingComp: "el" }, "2026-27", {}, true, clClubs);
    expect(report.newClubs).toEqual(["Viking (NOR)"]);
    expect(report.skipped).toEqual([{ name: "Mystery FC", country: "ENG" }]);
    expect(matches).toHaveLength(0);
  });

  it("replaces the hand-entered season once UEFA rows exist, keeping the same match ids", () => {
    const manual = parseManualCl(
      `▪ League, Matchday 3\n  Wed Oct 21 2026\n    16:45  Lille OSC (FRA)         v Galatasaray SK (TUR)\n`,
      "2026-27",
    );
    const uefa = toMatches([UPCOMING], CL, "2026-27", {}, false, clClubs).matches;
    const merged = mergeMatches(manual, uefa);
    expect(merged).toHaveLength(1);
    expect(merged[0]).toMatchObject({ source: "uefa", id: manual[0]!.id });
  });
});
