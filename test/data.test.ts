import { describe, expect, it } from "vitest";
import { mergeMatches, parseManualCl } from "../src/data/db";
import { clNameResolver, parseClScore, parseClText, parseLeagueJson, seasonsUpTo } from "../src/data/openfootball";

const CL = `= UEFA Champions League 2025/26

▪ League, Matchday 1
  Tue Sep 16 2025
    18:45  Athletic Club (ESP)     v Arsenal FC (ENG)         0-2 (0-0)
  Wed Sep 17
           PAE Olympiakos SFP (GRE) v Paphos FC (CYP)          0-0

▪ Finals, Quarterfinals
  Tue Apr 7 2026
    21:00  Arsenal FC (ENG)        v Real Madrid CF (ESP)     3-0 (1-0)
  Wed Apr 15
    21:00  Real Madrid CF (ESP)    v Arsenal FC (ENG)         1-2 a.e.t. (1-1, 0-0)

▪ Finals, Final
  Sat May 30
    18:00  Paris Saint-Germain FC (FRA) v Arsenal FC (ENG)         4-3 pen. 1-1 a.e.t. (1-1, 0-1)
`;

describe("openfootball parsers", () => {
  it("reads scores in every format", () => {
    expect(parseClScore("0-2 (0-0)")).toEqual({ ft: { home: 0, away: 2 } });
    expect(parseClScore("3-2 a.e.t. (3-0, 1-0)")).toEqual({ aet: { home: 3, away: 2 }, ft: { home: 3, away: 0 } });
    expect(parseClScore("4-3 pen. 1-1 a.e.t. (1-1, 0-1)")).toMatchObject({ pens: { home: 4, away: 3 }, ft: { home: 1, away: 1 } });
    expect(parseClScore("")).toEqual({});
  });

  it("parses the CL text: dates, stages, legs, neutral final", () => {
    const ms = parseClText(CL, "2025-26");
    expect(ms).toHaveLength(5);
    expect(ms[0]).toMatchObject({ date: "2025-09-16", stage: "league", matchday: 1, home: "athletic-club", away: "arsenal-fc" });
    expect(ms[1]!.date).toBe("2025-09-17");
    const qf = ms.filter((x) => x.stage === "qf");
    expect(qf.map((x) => x.leg)).toEqual([1, 2]);
    expect(qf[1]!.ft).toEqual({ home: 1, away: 1 });
    expect(ms[4]).toMatchObject({ stage: "final", neutral: true, date: "2026-05-30" });
  });

  it("parses league JSON in both score shapes and leaves fixtures unplayed", () => {
    const ms = parseLeagueJson(
      {
        matches: [
          { round: "Matchday 1", date: "2026-08-21", team1: "Arsenal FC", team2: "Coventry City FC", score: { ft: [3, 0] } },
          { round: "Matchday 3", date: "2026-09-05", team1: "Hull City AFC", team2: "Aston Villa FC", score: [0, 0] },
          { round: "Matchday 6", date: "2026-10-10", team1: "Arsenal FC", team2: "Leeds United FC" },
        ],
      },
      "en.1",
      "2026-27",
    );
    expect(ms.map((x) => x.ft)).toEqual([{ home: 3, away: 0 }, { home: 0, away: 0 }, undefined]);
    expect(ms[2]!.matchday).toBe(6);
  });

  it("knows which seasons exist", () => {
    expect(seasonsUpTo("2026-10-21").at(-1)).toBe("2026-27");
    expect(seasonsUpTo("2026-03-01").at(-1)).toBe("2025-26");
  });
});

describe("mergeMatches", () => {
  it("drops a provisional season once the open source publishes it, and prefers played rows", () => {
    const manual = parseManualCl(CL, "2025-26");
    expect(manual.every((x) => x.provisional)).toBe(true);
    const official = parseClText(CL, "2025-26");
    const merged = mergeMatches(manual, official);
    expect(merged.every((x) => !x.provisional)).toBe(true);
    expect(merged).toHaveLength(5);

    const unplayed = { ...official[0]!, ft: undefined };
    expect(mergeMatches([official[0]!], [unplayed])[0]!.ft).toEqual({ home: 0, away: 2 });
  });
});

describe("league-name resolution", () => {
  it("maps league-file spellings onto Champions League names", () => {
    const resolve = clNameResolver([
      { name: "Galatasaray SK", country: "TUR" },
      { name: "SK Sturm Graz", country: "AUT" },
      { name: "Royale Union Saint-Gilloise", country: "BEL" },
      { name: "PAE Olympiakos SFP", country: "GRE" },
      { name: "LASK", country: "AUT" },
    ]);
    expect(resolve("Galatasaray", "TUR")).toBe("Galatasaray SK");
    expect(resolve("Sturm Graz", "AUT")).toBe("SK Sturm Graz");
    expect(resolve("Union Saint-Gilloise", "BEL")).toBe("Royale Union Saint-Gilloise");
    expect(resolve("Olympiakos Piraeus", "GRE")).toBe("PAE Olympiakos SFP");
    expect(resolve("LASK", "AUT")).toBe("LASK");
    // Clubs that never played in the Champions League keep their own name.
    expect(resolve("SK Austria Klagenfurt", "AUT")).toBe("SK Austria Klagenfurt");
    expect(resolve("FC Blau Weiß Linz", "AUT")).toBe("FC Blau Weiß Linz");
  });
});

describe("league-name resolution safety", () => {
  it("never merges a different club into a CL club already present in the same league", () => {
    const resolve = clNameResolver([{ name: "Paris Saint-Germain FC", country: "FRA" }]);
    const ligue1 = new Set(["Paris Saint-Germain FC", "Paris FC"]);
    expect(resolve("Paris FC", "FRA", ligue1)).toBe("Paris FC");
  });
});
