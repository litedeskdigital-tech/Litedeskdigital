import type { Player } from "../scorers";
import { buildNews, type MatchNews, type SideNews } from "../teamNews";
import { getTeam } from "../teams";
import { tokenMatches, tokens } from "./names";
import type { Match, Score } from "./types";

/**
 * Sportradar's licensed APIs: Soccer Extended v4 (seasons, schedules, missing players, lineups, match stats with
 * expected goals) and Odds Comparison Prematch v2 (bookmaker 1X2 odds). Used for the three UEFA club competitions
 * only, and only around matchdays, so a trial key's quota (1,000 calls per rolling 30 days, 1 call a second) lasts.
 *
 * Licensing: everything fetched stays in a private store (encrypted, in the Actions cache, never git). Only derived numbers leave
 * it: team-news effects (data/team-news.json), the ratings (which learn from xG) and an aggregate model-vs-market
 * score in REPORT.md. Raw odds, injury lists and xG are not published, which is what a trial key allows.
 */

export const SR_COMPETITIONS: Record<string, string> = {
  cl: "sr:competition:7",
  el: "sr:competition:679",
  ecl: "sr:competition:34480",
};

export type SrAccess = "trial" | "production";

export type SrConfig = {
  soccerKey?: string;
  oddsKey?: string;
  access: SrAccess;
  /** Calls per key per rolling 24 hours and 30 days; below the trial's 1,000 so a bad day cannot use it all. */
  dailyCap: number;
  monthlyCap: number;
};

export function srConfigFromEnv(env: Record<string, string | undefined>): SrConfig {
  return {
    soccerKey: env.SPORTRADAR_API_KEY || undefined,
    oddsKey: env.SPORTRADAR_ODDS_KEY || undefined,
    access: env.SPORTRADAR_ACCESS === "production" ? "production" : "trial",
    dailyCap: Number(env.SPORTRADAR_DAILY_CAP) || 60,
    monthlyCap: Number(env.SPORTRADAR_MONTHLY_CAP) || 900,
  };
}

export function soccerUrl(access: SrAccess, path: string): string {
  return `https://api.sportradar.com/soccer-extended/${access}/v4/en/${path}`;
}

export function oddsUrl(access: SrAccess, path: string): string {
  return `https://api.sportradar.com/oddscomparison-prematch/${access}/v2/en/${path}`;
}

// ---------- The private store ----------

export type SrSide = { starters: string[]; bench: string[] };
export type SrMissing = { name: string; status: string };
export type SrMarket = { home: number; draw: number; away: number; books: number; at: string };

export type SrStore = {
  version: 1;
  /** Request times per key, for the budget; older than 31 days are dropped. */
  calls: { soccer: string[]; odds: string[] };
  seasons: Record<string, { id: string; at: string }>;
  schedulesAt: Record<string, string>;
  /** Our match id → Sportradar event and competitor ids. */
  events: Record<string, { srId: string; homeSr: string; awaySr: string }>;
  /** Sportradar competitor id → our club id. */
  teams: Record<string, string>;
  missing: Record<string, { at: string; byTeam: Record<string, SrMissing[]> }>;
  lineups: Record<string, { at: string; attempts: number; home?: SrSide; away?: SrSide }>;
  /** Our match id → expected goals; null when the stats had none. */
  xg: Record<string, Score | null>;
  xgAttempts: Record<string, number>;
  /** Which summary endpoint carried xG the last time one did. */
  xgEndpoint?: "summary" | "extended_summary";
  /** Matches in a row whose stats had no xG; after XG_GIVE_UP the lookups pause for a week (the plan may lack xG). */
  xgMisses?: number;
  xgPausedUntil?: string;
  market: Record<string, SrMarket>;
  /** Log loss of the model's last pre-match call and of the market, per scored match. */
  marketScores: Record<string, { model: number; market: number }>;
};

export function emptyStore(): SrStore {
  return { version: 1, calls: { soccer: [], odds: [] }, seasons: {}, schedulesAt: {}, events: {}, teams: {}, missing: {}, lineups: {}, xg: {}, xgAttempts: {}, market: {}, marketScores: {} };
}

// ---------- Parsing (defensive: unknown fields are ignored, missing ones skip the row) ----------

type Obj = Record<string, unknown>;
const obj = (x: unknown): Obj => (x && typeof x === "object" ? (x as Obj) : {});
const arr = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);
const str = (x: unknown): string => (typeof x === "string" ? x : typeof x === "number" ? String(x) : "");

export type SrSeason = { id: string; start: string; end: string };

export function parseSeasons(json: unknown): SrSeason[] {
  return arr(obj(json).seasons)
    .map((s) => ({ id: str(obj(s).id), start: str(obj(s).start_date), end: str(obj(s).end_date) }))
    .filter((s) => s.id);
}

/** The season running on `today`, else the latest one that has started. */
export function pickSeason(seasons: SrSeason[], today: string): SrSeason | undefined {
  const running = seasons.find((s) => s.start <= today && today <= s.end);
  if (running) return running;
  return [...seasons].filter((s) => s.start <= today).sort((a, b) => (a.start < b.start ? 1 : -1))[0];
}

export type SrCompetitor = { id: string; name: string; country: string };
export type SrEvent = { id: string; start: string; home: SrCompetitor; away: SrCompetitor };

export function parseSchedules(json: unknown): SrEvent[] {
  const rows = [...arr(obj(json).schedules).map((r) => obj(r).sport_event), ...arr(obj(json).sport_events)];
  const out: SrEvent[] = [];
  for (const r of rows) {
    const e = obj(r);
    const cs = arr(e.competitors).map(obj);
    const side = (q: string) => cs.find((c) => c.qualifier === q);
    const h = side("home");
    const a = side("away");
    if (!str(e.id) || !str(e.start_time) || !h || !a) continue;
    const comp = (c: Obj): SrCompetitor => ({ id: str(c.id), name: str(c.name), country: str(c.country_code) });
    out.push({ id: str(e.id), start: str(e.start_time), home: comp(h), away: comp(a) });
  }
  return out;
}

/** Missing players by Sportradar competitor id. "doubtful"-like statuses are kept as such. */
export function parseMissing(json: unknown): Record<string, SrMissing[]> {
  const out: Record<string, SrMissing[]> = {};
  for (const c of arr(obj(json).competitors).map(obj)) {
    const id = str(c.id);
    if (!id) continue;
    out[id] = arr(c.players)
      .map(obj)
      .map((p) => ({ name: str(p.name), status: str(p.status) || str(obj(p.reason).status) || str(p.type) || "out" }))
      .filter((p) => p.name);
  }
  return out;
}

/** Confirmed lineups by side; a side counts only with at least 11 starters. */
export function parseLineups(json: unknown): { home?: SrSide; away?: SrSide } {
  const out: { home?: SrSide; away?: SrSide } = {};
  for (const c of arr(obj(obj(json).lineups).competitors).map(obj)) {
    const q = str(c.qualifier);
    if (q !== "home" && q !== "away") continue;
    const ps = arr(c.players).map(obj);
    const starters = ps.filter((p) => p.starter === true).map((p) => str(p.name)).filter(Boolean);
    const bench = ps.filter((p) => p.starter !== true).map((p) => str(p.name)).filter(Boolean);
    if (starters.length >= 11) out[q] = { starters, bench };
  }
  return out;
}

const XG_KEY = /^(expected_goals|goals_expected|xg)$/i;

/** Expected goals per side from a match summary, wherever the stats block puts them; null if absent. */
export function findXg(json: unknown): Score | null {
  const totals = obj(obj(obj(json).statistics).totals);
  const got: Partial<Score> = {};
  for (const c of arr(totals.competitors).map(obj)) {
    const q = str(c.qualifier);
    if (q !== "home" && q !== "away") continue;
    const stats = obj(c.statistics);
    const key = Object.keys(stats).find((k) => XG_KEY.test(k));
    const v = key === undefined ? NaN : Number(stats[key]);
    if (Number.isFinite(v) && v >= 0 && v < 15) got[q] = v;
  }
  return got.home !== undefined && got.away !== undefined ? { home: got.home, away: got.away } : null;
}

/**
 * Bookmaker consensus for the 90-minute 1X2 market: each book's implied chances with its margin removed,
 * averaged over the books. Null when no book prices all three outcomes.
 */
export function parseMarket1x2(json: unknown, at: string): SrMarket | null {
  const markets = arr(obj(json).markets).map(obj);
  const m = markets.find((x) => /^(1x2|3way|match winner|full time result)$/i.test(str(x.name).trim()));
  if (!m) return null;
  const probs: { home: number; draw: number; away: number }[] = [];
  for (const b of arr(m.books).map(obj)) {
    if (b.removed === true) continue;
    const odds: Record<string, number> = {};
    for (const o of arr(b.outcomes).map(obj)) {
      const t = str(o.type).toLowerCase();
      const d = Number(o.odds_decimal ?? o.odds);
      if (!(d > 1)) continue;
      if (t.includes("draw")) odds.draw = d;
      else if (t.includes("home")) odds.home = d;
      else if (t.includes("away")) odds.away = d;
    }
    if (!odds.home || !odds.draw || !odds.away) continue;
    const ih = 1 / odds.home;
    const id = 1 / odds.draw;
    const ia = 1 / odds.away;
    const sum = ih + id + ia;
    probs.push({ home: ih / sum, draw: id / sum, away: ia / sum });
  }
  if (!probs.length) return null;
  const avg = (k: "home" | "draw" | "away") => Math.round((probs.reduce((s, p) => s + p[k], 0) / probs.length) * 1000) / 1000;
  return { home: avg("home"), draw: avg("draw"), away: avg("away"), books: probs.length, at };
}

// ---------- Matching Sportradar to our database ----------

function similarity(a: string, b: string): number {
  const ta = tokens(a);
  const tb = tokens(b);
  if (!ta.length || !tb.length) return 0;
  const ab = ta.filter((t) => tokenMatches(t, tb)).length / ta.length;
  const ba = tb.filter((t) => tokenMatches(t, ta)).length / tb.length;
  return Math.max(ab, ba);
}

/** Kick-off within 3 hours, or the same UTC date (±1 day) when we have no kick-off time. */
function sameSlot(e: SrEvent, m: Match): boolean {
  if (m.kickoff) return Math.abs(Date.parse(e.start) - Date.parse(m.kickoff)) <= 3 * 3_600_000;
  return Math.abs(Date.parse(e.start.slice(0, 10)) - Date.parse(m.date)) <= 86_400_000;
}

/**
 * Links Sportradar events to our matches of the same competition: same slot, and both clubs matching by a known
 * competitor id or by name (at least half the tokens). Ambiguous links are left out rather than guessed.
 */
export function linkEvents(
  events: SrEvent[],
  ours: Match[],
  known: Record<string, string>,
): { links: Record<string, { srId: string; homeSr: string; awaySr: string }>; teams: Record<string, string> } {
  const links: Record<string, { srId: string; homeSr: string; awaySr: string }> = {};
  const teams: Record<string, string> = {};
  const score = (c: SrCompetitor, ourId: string) => (known[c.id] ? (known[c.id] === ourId ? 1 : 0) : similarity(c.name, getTeam(ourId).name));
  for (const e of events) {
    const scored = ours
      .filter((m) => sameSlot(e, m))
      .map((m) => ({ m, h: score(e.home, m.home), a: score(e.away, m.away) }))
      .filter((x) => x.h >= 0.5 && x.a >= 0.5)
      .sort((x, y) => y.h + y.a - (x.h + x.a));
    const best = scored[0];
    if (!best || (scored[1] && scored[1].h + scored[1].a === best.h + best.a)) continue;
    links[best.m.id] = { srId: e.id, homeSr: e.home.id, awaySr: e.away.id };
    teams[e.home.id] = best.m.home;
    teams[e.away.id] = best.m.away;
  }
  return { links, teams };
}

function nameTokens(name: string): string[] {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * Our player for a Sportradar name ("Vlahovic, Dusan" or "Dusan Vlahovic"): every surname token present, first
 * name or initial agreeing when given. Null unless exactly one player fits.
 */
export function matchPlayer(srName: string, players: Player[]): Player | null {
  const [last, first] = srName.includes(",") ? srName.split(",", 2).map((s) => s.trim()) : [srName, ""];
  const lastT = nameTokens(last!);
  const firstT = nameTokens(first ?? "");
  if (!lastT.length) return null;
  const fits = players.filter((p) => {
    const ours = nameTokens(p.name);
    if (!lastT.every((t) => ours.includes(t))) return false;
    if (!firstT.length) return true;
    return ours.some((o) => o === firstT[0] || (o.length === 1 && o === firstT[0]![0]) || (firstT[0]!.length === 1 && o[0] === firstT[0]));
  });
  if (fits.length === 1) return fits[0]!;
  // A bare surname shared by teammates is ambiguous; "Name Surname" written without a comma may need flipping.
  if (!srName.includes(",") && lastT.length > 1) return matchPlayer(`${lastT.at(-1)}, ${lastT.slice(0, -1).join(" ")}`, players);
  return null;
}

const DOUBTFUL = /doubt|question|uncertain|late fitness|probable/i;

function sideNews(teamId: string, srTeamId: string, players: Player[], store: SrStore, comp: string, lineup?: SrSide): SideNews {
  const mine = players.filter((p) => p.teamId === teamId);
  const out = new Set<string>();
  const doubtful = new Set<string>();
  for (const miss of store.missing[comp]?.byTeam[srTeamId] ?? []) {
    const p = matchPlayer(miss.name, mine);
    if (p) (DOUBTFUL.test(miss.status) ? doubtful : out).add(p.id);
  }
  if (!lineup) return { out, doubtful };
  const starters = new Set(lineup.starters.map((n) => matchPlayer(n, mine)?.id).filter((x): x is string => !!x));
  const squad = new Set([...starters, ...lineup.bench.map((n) => matchPlayer(n, mine)?.id).filter((x): x is string => !!x)]);
  return { out, doubtful, starters, squad };
}

/** Team news for every linked match in the window, from the stored missing-player lists and lineups. */
export function newsFromStore(store: SrStore, matches: Match[], players: Player[], from: string, to: string): Record<string, MatchNews> {
  const out: Record<string, MatchNews> = {};
  for (const m of matches) {
    const link = store.events[m.id];
    const t = m.kickoff ?? `${m.date}T12:00:00Z`;
    if (!link || m.ft || t < from || t > to) continue;
    const lu = store.lineups[m.id];
    const at = [store.missing[m.comp]?.at, lu?.home || lu?.away ? lu.at : undefined].filter((x): x is string => !!x).sort().at(-1);
    if (!at) continue;
    const news = buildNews(
      players.filter((p) => p.teamId === m.home),
      players.filter((p) => p.teamId === m.away),
      sideNews(m.home, link.homeSr, players, store, m.comp, lu?.home),
      sideNews(m.away, link.awaySr, players, store, m.comp, lu?.away),
      at,
    );
    if (news) out[m.id] = news;
  }
  return out;
}

// ---------- Fetching within the budget ----------

/** GET returning parsed JSON, null on 404; throws on any other failure. */
export type SrGet = (url: string, key: string) => Promise<unknown | null>;

export const srGet: SrGet = async (url, key) => {
  let res = await fetch(url, { headers: { "x-api-key": key, Accept: "application/json" } });
  // Older Sportradar gateways only take the key as a query parameter.
  if (res.status === 401 || res.status === 403) res = await fetch(`${url}?api_key=${encodeURIComponent(key)}`, { headers: { Accept: "application/json" } });
  if (res.status === 404) return null;
  // The URL is printed without the key.
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
};

const XG_GIVE_UP = 6;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const hours = (h: number) => h * 3_600_000;

export type SyncDeps = { get?: SrGet; wait?: (ms: number) => Promise<void> };
export type SyncResult = { calls: { soccer: number; odds: number }; notes: string[] };

/**
 * One budgeted pass, run every 30 minutes. Per competition, only around its matchdays (a match within 8 days back or
 * 3 days ahead): the season id (weekly), the schedule to link events (daily), missing players (twice a day before a
 * match). Per match: the lineup in the 75 minutes before kick-off, the match stats with xG once the result is in, and
 * the odds about 30 and 3 hours before kick-off. Updates `store` in place.
 */
export async function syncSportradar(store: SrStore, matches: Match[], cfg: SrConfig, now: string, deps: SyncDeps = {}): Promise<SyncResult> {
  const get = deps.get ?? srGet;
  const wait = deps.wait ?? sleep;
  const t = Date.parse(now);
  const result: SyncResult = { calls: { soccer: 0, odds: 0 }, notes: [] };
  for (const k of ["soccer", "odds"] as const) store.calls[k] = store.calls[k].filter((c) => t - Date.parse(c) < 31 * 86_400_000);

  const can = (k: "soccer" | "odds") => {
    const c = store.calls[k];
    return c.filter((x) => t - Date.parse(x) < 86_400_000).length < cfg.dailyCap && c.filter((x) => t - Date.parse(x) < 30 * 86_400_000).length < cfg.monthlyCap;
  };
  const call = async (k: "soccer" | "odds", url: string): Promise<unknown | null | undefined> => {
    const key = k === "soccer" ? cfg.soccerKey : cfg.oddsKey;
    if (!key || !can(k)) return undefined;
    if (result.calls.soccer + result.calls.odds > 0) await wait(1100);
    store.calls[k].push(now);
    result.calls[k] += 1;
    try {
      return await get(url, key);
    } catch (err) {
      result.notes.push(String(err instanceof Error ? err.message : err));
      return undefined;
    }
  };
  const older = (at: string | undefined, h: number) => !at || t - Date.parse(at) > hours(h);
  const kick = (m: Match) => Date.parse(m.kickoff ?? `${m.date}T18:00:00Z`);
  const today = now.slice(0, 10);

  if (cfg.soccerKey) {
    for (const [comp, srComp] of Object.entries(SR_COMPETITIONS)) {
      const ours = matches.filter((m) => m.comp === comp && kick(m) > t - 8 * 86_400_000 && kick(m) < t + 3 * 86_400_000);
      if (!ours.length) continue;
      if (older(store.seasons[comp]?.at, 24 * 7)) {
        const json = await call("soccer", soccerUrl(cfg.access, `competitions/${srComp}/seasons.json`));
        const s = pickSeason(parseSeasons(json), today);
        if (s) store.seasons[comp] = { id: s.id, at: now };
        else if (json !== undefined) result.notes.push(`no current Sportradar season for ${comp} (${srComp})`);
      }
      const season = store.seasons[comp]?.id;
      if (!season) continue;
      const unlinked = ours.some((m) => !m.ft && !store.events[m.id] && kick(m) < t + hours(48));
      if (older(store.schedulesAt[comp], 20) || (unlinked && older(store.schedulesAt[comp], 6))) {
        const json = await call("soccer", soccerUrl(cfg.access, `seasons/${season}/schedules.json`));
        if (json) {
          const { links, teams } = linkEvents(parseSchedules(json), matches.filter((m) => m.comp === comp), store.teams);
          Object.assign(store.events, links);
          Object.assign(store.teams, teams);
          store.schedulesAt[comp] = now;
        }
      }
      const soon = ours.some((m) => !m.ft && kick(m) > t && kick(m) < t + hours(36));
      const verySoon = ours.some((m) => !m.ft && kick(m) > t && kick(m) < t + hours(4));
      if (soon && older(store.missing[comp]?.at, verySoon ? 3 : 12)) {
        const json = await call("soccer", soccerUrl(cfg.access, `seasons/${season}/missing_players.json`));
        if (json) store.missing[comp] = { at: now, byTeam: parseMissing(json) };
      }
    }

    for (const m of matches) {
      const link = store.events[m.id];
      if (!link) continue;
      const k = kick(m);
      const lu = (store.lineups[m.id] ??= { at: "", attempts: 0 });
      if (!m.ft && k > t && k - t <= hours(1.25) && !(lu.home && lu.away) && lu.attempts < 3) {
        const json = await call("soccer", soccerUrl(cfg.access, `sport_events/${link.srId}/lineups.json`));
        if (json !== undefined) {
          lu.attempts += 1;
          const parsed = parseLineups(json);
          if (parsed.home || parsed.away) Object.assign(lu, parsed, { at: now });
        }
      }
      if (!lu.at && !lu.attempts) delete store.lineups[m.id];
      const xgPaused = store.xgPausedUntil && Date.parse(store.xgPausedUntil) > t;
      if (m.ft && !xgPaused && store.xg[m.id] === undefined && !store.xgAttempts[m.id] && t - k > hours(2.5) && t - k < 7 * 86_400_000) {
        const order: ("summary" | "extended_summary")[] = store.xgEndpoint === "extended_summary" ? ["extended_summary", "summary"] : ["summary", "extended_summary"];
        let answered = false;
        for (const ep of order) {
          const json = await call("soccer", soccerUrl(cfg.access, `sport_events/${link.srId}/${ep}.json`));
          if (json === undefined) break;
          answered = true;
          const xg = findXg(json);
          if (xg) {
            store.xg[m.id] = xg;
            store.xgEndpoint = ep;
            break;
          }
          if (store.xgEndpoint) break;
        }
        // Out of budget or a failed request: try again on a later run.
        if (!answered) continue;
        store.xgAttempts[m.id] = 1;
        if (store.xg[m.id] === undefined) {
          store.xg[m.id] = null;
          store.xgMisses = (store.xgMisses ?? 0) + 1;
          if (store.xgMisses >= XG_GIVE_UP) {
            store.xgPausedUntil = new Date(t + 7 * 86_400_000).toISOString();
            store.xgMisses = 0;
            result.notes.push(`no xG in the last ${XG_GIVE_UP} match summaries; xG lookups paused for a week`);
          }
        } else store.xgMisses = 0;
      }
    }
  }

  if (cfg.oddsKey) {
    for (const m of matches) {
      const link = store.events[m.id];
      if (!link || m.ft) continue;
      const k = kick(m);
      const have = store.market[m.id];
      const due = k > t && k - t <= hours(30) && (!have || (k - t <= hours(3) && Date.parse(have.at) < k - hours(3)));
      if (!due) continue;
      const json = await call("odds", oddsUrl(cfg.access, `sport_events/${link.srId}/sport_event_markets.json`));
      const market = json ? parseMarket1x2(json, now) : null;
      if (market) store.market[m.id] = market;
    }
  }

  // Old per-match entries are no longer needed (xG and market scores are kept: they feed learning and the report).
  const live = new Set(matches.filter((m) => t - kick(m) < 30 * 86_400_000).map((m) => m.id));
  for (const id of Object.keys(store.lineups)) if (!live.has(id)) delete store.lineups[id];
  for (const id of Object.keys(store.market)) if (!live.has(id) && store.marketScores[id]) delete store.market[id];
  return result;
}

/** Model-vs-market line for the report, from the stored per-match scores (aggregates only). */
export function marketSummary(store: SrStore): string | undefined {
  const s = Object.values(store.marketScores);
  if (!s.length) return undefined;
  const avg = (k: "model" | "market") => (s.reduce((a, x) => a + x[k], 0) / s.length).toFixed(3);
  return `Model vs bookmaker consensus (Sportradar odds), ${s.length} matches: model log loss ${avg("model")}, market ${avg("market")} (lower is better).`;
}
