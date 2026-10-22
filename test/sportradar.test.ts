import { describe, expect, it } from "vitest";
import {
  emptyStore,
  findXg,
  linkEvents,
  matchPlayer,
  newsFromStore,
  parseLineups,
  parseMarket1x2,
  parseMissing,
  parseSchedules,
  pickSeason,
  syncSportradar,
  type SrConfig,
} from "../src/data/sportradar";
import { generatePrediction } from "../src/predict";
import { openStore, sealStore } from "../scripts/sportradar-store";
import { runFilter, DEFAULT_PARAMS } from "../src/ratings";
import type { Player } from "../src/scorers";
import { applyNews, buildNews } from "../src/teamNews";
import { countries, ids, m, model, season } from "./helpers";

const [alpha, , , , eins] = ids;
const fixture = { ...m("el", "2026-10-22", alpha!, eins!), kickoff: "2026-10-22T19:00:00Z" };

const srEvent = (start = "2026-10-22T19:00:00+00:00") => ({
  schedules: [
    {
      sport_event: {
        id: "sr:sport_event:1",
        start_time: start,
        competitors: [
          { id: "sr:competitor:10", name: "Alpha", country_code: "ENG", qualifier: "home" },
          { id: "sr:competitor:20", name: "Eins", country_code: "DEU", qualifier: "away" },
        ],
      },
    },
  ],
});

const sheet: Player[] = [
  { id: "p9", name: "Harry Striker", teamId: alpha!, position: "FW", npGoalsPer90: 0.6, expectedMinutes: 85, penaltyTaker: true },
  { id: "p7", name: "Wing Er", teamId: alpha!, position: "AM", npGoalsPer90: 0.3, expectedMinutes: 80 },
  { id: "q9", name: "Max Mustermann", teamId: eins!, position: "FW", npGoalsPer90: 0.4, expectedMinutes: 85 },
];

describe("Sportradar parsing", () => {
  it("reads schedules, seasons, missing players and lineups", () => {
    const [e] = parseSchedules(srEvent());
    expect(e).toMatchObject({ id: "sr:sport_event:1", home: { id: "sr:competitor:10", name: "Alpha" }, away: { name: "Eins" } });
    const seasons = [
      { id: "s1", start: "2025-07-01", end: "2026-06-01" },
      { id: "s2", start: "2026-07-01", end: "2027-06-01" },
    ];
    expect(pickSeason(seasons, "2026-10-22")?.id).toBe("s2");
    expect(pickSeason(seasons, "2026-06-20")?.id).toBe("s1");
    const missing = parseMissing({ competitors: [{ id: "sr:competitor:10", players: [{ name: "Striker, Harry", status: "injured" }, { name: "Er, Wing", status: "doubtful" }] }] });
    expect(missing["sr:competitor:10"]).toEqual([
      { name: "Striker, Harry", status: "injured" },
      { name: "Er, Wing", status: "doubtful" },
    ]);
    const eleven = (prefix: string) => Array.from({ length: 11 }, (_, i) => ({ name: `${prefix}${i}, A`, starter: true }));
    const lu = parseLineups({ lineups: { competitors: [{ qualifier: "home", players: [...eleven("H"), { name: "Bench, B", starter: false }] }, { qualifier: "away", players: eleven("A").slice(0, 5) }] } });
    expect(lu.home?.starters).toHaveLength(11);
    expect(lu.home?.bench).toEqual(["Bench, B"]);
    expect(lu.away).toBeUndefined();
  });

  it("finds xG wherever the summary names it, and averages margin-free 1X2 odds", () => {
    const summary = (key: string) => ({
      statistics: { totals: { competitors: [{ qualifier: "home", statistics: { [key]: 1.8, shots_total: 14 } }, { qualifier: "away", statistics: { [key]: "0.6" } }] } },
    });
    expect(findXg(summary("expected_goals"))).toEqual({ home: 1.8, away: 0.6 });
    expect(findXg(summary("goals_expected"))).toEqual({ home: 1.8, away: 0.6 });
    expect(findXg(summary("shots_on_target"))).toBeNull();
    const book = (h: number, d: number, a: number) => ({
      outcomes: [
        { type: "home_team_winner", odds_decimal: String(h) },
        { type: "draw", odds_decimal: String(d) },
        { type: "away_team_winner", odds_decimal: String(a) },
      ],
    });
    const mk = parseMarket1x2({ markets: [{ name: "1x2", books: [book(2, 3.5, 4), book(2.1, 3.4, 3.8), { ...book(9, 9, 9), removed: true }] }] }, "now")!;
    expect(mk.books).toBe(2);
    expect(mk.home + mk.draw + mk.away).toBeCloseTo(1, 2);
    expect(mk.home).toBeGreaterThan(mk.away);
    expect(parseMarket1x2({ markets: [{ name: "total", books: [] }] }, "now")).toBeNull();
  });
});

describe("matching Sportradar to the database", () => {
  it("links an event by slot and club names, and refuses a different slot", () => {
    const { links, teams } = linkEvents(parseSchedules(srEvent()), [fixture], {});
    expect(links[fixture.id]).toEqual({ srId: "sr:sport_event:1", homeSr: "sr:competitor:10", awaySr: "sr:competitor:20" });
    expect(teams["sr:competitor:20"]).toBe(eins);
    expect(linkEvents(parseSchedules(srEvent("2026-10-23T19:00:00+00:00")), [fixture], {}).links).toEqual({});
  });

  it("matches player names written either way, and only when unambiguous", () => {
    expect(matchPlayer("Striker, Harry", sheet)?.id).toBe("p9");
    expect(matchPlayer("Striker, H.", sheet)?.id).toBe("p9");
    expect(matchPlayer("Harry Striker", sheet)?.id).toBe("p9");
    expect(matchPlayer("Striker, Bob", sheet)).toBeNull();
    const twins = [...sheet, { ...sheet[0]!, id: "p10", name: "Jim Striker" }];
    expect(matchPlayer("Striker", twins)).toBeNull();
  });
});

describe("team news", () => {
  it("drops injured players, halves doubtful ones and lowers the attack", () => {
    const news = buildNews(sheet.slice(0, 2), sheet.slice(2), { out: new Set(["p9"]), doubtful: new Set(["p7"]) }, { out: new Set(), doubtful: new Set() }, "t")!;
    expect(news.minutes).toEqual({ p9: 0, p7: 40 });
    expect(news.homeOut).toBe(1);
    expect(news.homeAttack).toBeLessThan(-0.1);
    expect(news.awayAttack).toBe(0);
    expect(applyNews(sheet, news).map((p) => p.id)).toEqual(["p7", "q9"]);
  });

  it("uses a confirmed lineup: starters play, the bench comes on late, the rest are out", () => {
    const news = buildNews(sheet.slice(0, 2), [], { out: new Set(), doubtful: new Set(), starters: new Set(["p7"]), squad: new Set(["p7", "p9"]) }, { out: new Set(), doubtful: new Set() }, "t")!;
    expect(news.minutes).toEqual({ p9: 20 });
    expect(news.lineups).toBe(true);
  });

  it("moves the prediction and the scorer pick", () => {
    const fitted = model(season());
    const match = { home: alpha!, away: eins!, comp: "el", date: "2026-10-22", stage: "league" as const };
    const plain = generatePrediction({ match, model: fitted, players: sheet, seed: 1 });
    const news = buildNews(sheet.slice(0, 2), sheet.slice(2), { out: new Set(["p9"]), doubtful: new Set() }, { out: new Set(), doubtful: new Set() }, "t")!;
    const hit = generatePrediction({ match, model: fitted, players: sheet, news, seed: 1 });
    expect(plain.bonusScorer?.playerId).toBe("p9");
    expect(hit.bonusScorer?.playerId).not.toBe("p9");
    expect(hit.fullTime.home).toBeLessThan(plain.fullTime.home);
    expect(hit.teamNews?.homeOut).toBe(1);
    expect(hit.commentary).toContain("Team news");
  });

  it("is built from the store for linked fixtures only", () => {
    const store = emptyStore();
    store.events[fixture.id] = { srId: "sr:sport_event:1", homeSr: "sr:competitor:10", awaySr: "sr:competitor:20" };
    store.missing.el = { at: "2026-10-22T10:00:00Z", byTeam: { "sr:competitor:10": [{ name: "Striker, Harry", status: "injured" }] } };
    const news = newsFromStore(store, [fixture], sheet, "2026-10-22T12:00:00Z", "2026-10-24T12:00:00Z");
    expect(news[fixture.id]?.minutes).toEqual({ p9: 0 });
    expect(newsFromStore(store, [fixture], sheet, "2026-10-23T12:00:00Z", "2026-10-24T12:00:00Z")).toEqual({});
  });
});

describe("xG in the ratings", () => {
  it("learns less from a lucky win than from a deserved one", () => {
    const [a, b] = ids;
    const lucky = runFilter([{ ...m("en.1", "2025-08-10", a!, b!, 1, 0), xg: { home: 0.3, away: 2.1 } }], countries, DEFAULT_PARAMS);
    const deserved = runFilter([{ ...m("en.1", "2025-08-10", a!, b!, 1, 0), xg: { home: 2.1, away: 0.3 } }], countries, DEFAULT_PARAMS);
    expect(lucky.teams[a!]!.attack.m).toBeLessThan(deserved.teams[a!]!.attack.m);
  });
});

describe("budgeted sync", () => {
  const cfg: SrConfig = { soccerKey: "k", oddsKey: "o", access: "trial", dailyCap: 60, monthlyCap: 900 };
  const fake = (calls: string[]) => async (url: string) => {
    calls.push(url.replace("https://api.sportradar.com/", ""));
    if (url.endsWith("/seasons.json")) return { seasons: [{ id: "sr:season:1", start_date: "2026-07-01", end_date: "2027-06-01" }] };
    if (url.endsWith("/schedules.json")) return srEvent();
    if (url.endsWith("/missing_players.json")) return { competitors: [] };
    if (url.endsWith("/lineups.json")) return { lineups: { competitors: [] } };
    if (url.endsWith("/sport_event_markets.json")) return { markets: [{ name: "1x2", books: [{ outcomes: [{ type: "home_team_winner", odds_decimal: "2" }, { type: "draw", odds_decimal: "3.4" }, { type: "away_team_winner", odds_decimal: "3.9" }] }] }] };
    return null;
  };
  const noWait = async () => {};

  it("only calls around the competition's matchdays and respects the caps", async () => {
    const calls: string[] = [];
    const store = emptyStore();
    await syncSportradar(store, [fixture], cfg, "2026-10-22T09:00:00Z", { get: fake(calls), wait: noWait });
    expect(calls).toEqual([
      "soccer-extended/trial/v4/en/competitions/sr:competition:679/seasons.json",
      "soccer-extended/trial/v4/en/seasons/sr:season:1/schedules.json",
      "soccer-extended/trial/v4/en/seasons/sr:season:1/missing_players.json",
      "oddscomparison-prematch/trial/v2/en/sport_events/sr:sport_event:1/sport_event_markets.json",
    ]);
    expect(store.market[fixture.id]?.books).toBe(1);
    // Half an hour later nothing is due.
    calls.length = 0;
    await syncSportradar(store, [fixture], cfg, "2026-10-22T09:30:00Z", { get: fake(calls), wait: noWait });
    expect(calls).toEqual([]);
    // An hour before kick-off: the lineup, fresh missing players and the closing odds.
    await syncSportradar(store, [fixture], cfg, "2026-10-22T18:00:00Z", { get: fake(calls), wait: noWait });
    expect(calls.map((c) => c.split("/").at(-1))).toEqual(["missing_players.json", "lineups.json", "sport_event_markets.json"]);
    // Out of season: no calls at all; and a spent daily cap stops everything.
    calls.length = 0;
    await syncSportradar(emptyStore(), [{ ...fixture, kickoff: "2027-03-01T19:00:00Z", date: "2027-03-01" }], cfg, "2026-10-22T09:00:00Z", { get: fake(calls), wait: noWait });
    const spent = emptyStore();
    spent.calls.soccer = Array.from({ length: 60 }, () => "2026-10-22T08:00:00Z");
    await syncSportradar(spent, [fixture], { ...cfg, oddsKey: undefined }, "2026-10-22T09:00:00Z", { get: fake(calls), wait: noWait });
    expect(calls).toEqual([]);
  });

  it("keeps the store sealed with the key", () => {
    const store = emptyStore();
    store.xg["x"] = { home: 1, away: 2 };
    const sealed = sealStore(store, "secret");
    expect(sealed).not.toContain("xg");
    expect(openStore(sealed, "secret")?.xg["x"]).toEqual({ home: 1, away: 2 });
    expect(openStore(sealed, "other")).toBeNull();
  });
});
