/**
 * Nightly update: fetch open data, learn, score, maybe re-tune, predict ahead, write state and report.
 *
 *   tsx scripts/update.ts [--today YYYY-MM-DD] [--offline DIR] [--no-tune] [--retune] [--no-uefa]
 *
 * --offline reads files previously saved as DIR/cl-<season>.txt and DIR/<comp>-<season>.json instead of fetching.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { hydrateTeams, mergeMatches, parseManualCl, type Db } from "../src/data/db";
import { DOMESTIC_LEAGUES, type Match } from "../src/data/types";
import { fetchUefaMatches, toMatches, UEFA_COMPETITIONS, type MatchImportReport } from "../src/data/uefaMatches";
import { clUrl, fetchOpenfootball, httpFetcher, leagueUrl, seasonsUpTo, type Fetcher } from "../src/data/openfootball";
import { backtest, runCycle, type LearningEvent, type LoggedPrediction } from "../src/learn";
import { DEFAULT_PARAMS, type Params } from "../src/ratings";
import { renderReport } from "../src/report";
import { parsePlayersCsv } from "../src/scorers";
import { buildPlayerSheet, fetchUefaSeason, mapTeams, playersToCsv, uefaFetcher, uefaSeasonYear, type SheetReport, type UefaPlayer } from "../src/data/uefa";
import { allTeams, getTeam } from "../src/teams";
import { emptyStore, marketSummary, newsFromStore, srConfigFromEnv, syncSportradar } from "../src/data/sportradar";
import { openStore, sealStore } from "./sportradar-store";
import type { MatchNews } from "../src/teamNews";
import { outcomeOf } from "../src/tune";

const ROOT = join(import.meta.dirname, "..");
const P = {
  db: join(ROOT, "data/matches.json"),
  manual: join(ROOT, "data/manual"),
  log: join(ROOT, "data/predictions.json"),
  events: join(ROOT, "data/learning-log.json"),
  params: join(ROOT, "model/params.json"),
  state: join(ROOT, "model/state.json"),
  report: join(ROOT, "REPORT.md"),
  players: join(ROOT, "data/players.csv"),
  uefaTeams: join(ROOT, "data/uefa-teams.json"),
  uefaAliases: join(ROOT, "data/manual/uefa-team-aliases.json"),
  uefaImport: join(ROOT, "data/uefa-import.json"),
  news: join(ROOT, "data/team-news.json"),
  // Licensed Sportradar data: kept in the Actions cache, never committed (see src/data/sportradar.ts).
  srStore: process.env.SPORTRADAR_STORE ?? join(ROOT, ".cache/sportradar/store.enc"),
};

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as T) : fallback;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 1) + "\n");
}

/** One row per line: compact, and nightly diffs show exactly which rows changed. */
function writeRows(path: string, head: Record<string, unknown>, key: string, rows: unknown[]): void {
  mkdirSync(join(path, ".."), { recursive: true });
  const fields = Object.entries(head).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)},\n`);
  writeFileSync(path, `{${fields.join("")}${JSON.stringify(key)}:[\n${rows.map((r) => JSON.stringify(r)).join(",\n")}\n]}\n`);
}

function offlineFetcher(dir: string): Fetcher {
  const names = new Map<string, string>();
  for (const season of seasonsUpTo("2100-01-01")) {
    names.set(clUrl(season), `cl-${season}.txt`);
    for (const comp of DOMESTIC_LEAGUES) names.set(leagueUrl(season, comp), `${comp}-${season}.json`);
  }
  return async (url) => {
    const file = names.get(url);
    const path = file ? join(dir, file) : "";
    return path && existsSync(path) ? readFileSync(path, "utf8") : null;
  };
}

async function main(): Promise<void> {
  const today = arg("--today") ?? new Date().toISOString().slice(0, 10);
  const offline = arg("--offline");
  const fetcher = offline ? offlineFetcher(offline) : httpFetcher;

  // Previously stored matches are kept, so a source that disappears or fails never erases history.
  const stored = readJson<Db>(P.db, { updatedAt: "", matches: [], teams: {} });
  hydrateTeams(stored);
  const manual = seasonsUpTo(today).flatMap((season) => {
    const path = join(P.manual, `cl-${season}.txt`);
    return existsSync(path) ? parseManualCl(readFileSync(path, "utf8"), season) : [];
  });
  const manualClubs = [...new Set(manual.flatMap((m) => [m.home, m.away]))].map((id) => getTeam(id));
  const fetched = await fetchOpenfootball(today, fetcher, manualClubs);
  // UEFA fixtures and results: a failed fetch keeps whatever was stored before.
  let uefaMatches: Match[] = [];
  let uefaMatchNote = "";
  if (!offline && !process.argv.includes("--no-uefa")) {
    try {
      const clClubs = new Set(
        [...stored.matches, ...manual, ...fetched.matches].filter((m) => m.comp === "cl").flatMap((m) => [m.home, m.away]),
      );
      const res = await importUefaMatches(today, stored.matches, new Set(fetched.report.loaded), clClubs);
      uefaMatches = res.matches;
      uefaMatchNote = res.note;
    } catch (err) {
      uefaMatchNote = `UEFA match import failed, kept stored matches: ${String(err)}`;
      console.warn(uefaMatchNote);
    }
  }
  const matches = mergeMatches(stored.matches.filter((m) => !m.provisional), manual, fetched.matches, uefaMatches);
  const teams = Object.fromEntries(allTeams().map((t) => [t.id, { name: t.name, country: t.country }]));
  const countries = Object.fromEntries(allTeams().map((t) => [t.id, t.country]));

  const params = readJson<Params>(P.params, DEFAULT_PARAMS);
  // Player sheet from UEFA's club-competition stats. A failed or skipped fetch keeps the last good sheet.
  let uefaNote = "";
  if (!offline && !process.argv.includes("--no-uefa")) {
    try {
      uefaNote = await importUefaPlayers(today, matches);
    } catch (err) {
      uefaNote = `UEFA player import failed, kept the previous sheet: ${String(err)}`;
      console.warn(uefaNote);
    }
  }
  const players = existsSync(P.players) ? parsePlayersCsv(readFileSync(P.players, "utf8")) : undefined;
  const now = arg("--today") ? `${today}T00:00:00Z` : new Date().toISOString();

  // Sportradar (only with keys): team news for the next 48 hours, xG for learning, odds for the market check.
  const srCfg = srConfigFromEnv(process.env);
  const srSecret = srCfg.soccerKey ?? srCfg.oddsKey ?? "";
  const notes: string[] = [];
  let sr = emptyStore();
  if (srSecret && existsSync(P.srStore)) {
    const opened = openStore(readFileSync(P.srStore, "utf8"), srSecret);
    if (opened) sr = opened;
    else notes.push("Sportradar store could not be opened (key changed?); started a fresh one");
  }
  let news: Record<string, MatchNews> = {};
  if (!offline && (srCfg.soccerKey || srCfg.oddsKey)) {
    const res = await syncSportradar(sr, matches, srCfg, now);
    news = newsFromStore(sr, matches, players ?? [], now, new Date(Date.parse(now) + 48 * 3_600_000).toISOString());
    const used = (k: "soccer" | "odds") => sr.calls[k].filter((c) => Date.parse(now) - Date.parse(c) < 30 * 86_400_000).length;
    notes.push(
      `Sportradar: ${res.calls.soccer + res.calls.odds} calls this run (30-day use: soccer ${used("soccer")}, odds ${used("odds")} of ${srCfg.monthlyCap}); team news for ${Object.keys(news).length} matches, xG for ${Object.values(sr.xg).filter(Boolean).length} matches${res.notes.length ? `; ${res.notes.slice(0, 3).join("; ")}` : ""}`,
    );
  }
  // xG joins the matches in memory only: data/matches.json stays free of licensed data.
  const learnFrom = matches.map((m) => (sr.xg[m.id] ? { ...m, xg: sr.xg[m.id]! } : m));
  const out = runCycle({
    matches: learnFrom,
    countries,
    params,
    log: readJson<{ predictions: LoggedPrediction[] }>(P.log, { predictions: [] }).predictions,
    events: readJson<LearningEvent[]>(P.events, []),
    today,
    noTune: process.argv.includes("--no-tune"),
    forceTune: process.argv.includes("--retune"),
    now,
    players,
    news,
    // UEFA qualifiers (clq, and qualifying rows of el/ecl, which are imported played-only) only feed the ratings.
    predictComps: [...UEFA_COMPETITIONS.map((c) => c.comp), ...DOMESTIC_LEAGUES],
  });

  writeRows(P.db, { updatedAt: today, teams }, "matches", matches);
  writeRows(P.log, { updatedAt: today }, "predictions", out.log);
  writeJson(P.events, out.events);
  writeJson(P.params, out.params);
  writeJson(P.state, out.state);
  const sources = [
    ...fetched.report.loaded.map((s) => `openfootball ${s}`),
    ...(manual.length ? [`${manual.length} provisional hand-entered CL rows`] : []),
    ...(uefaMatchNote ? [uefaMatchNote] : []),
    ...(uefaNote ? [uefaNote] : []),
  ];
  // Market check: the model's last pre-match call against the bookmaker consensus, per scored match.
  for (const p of out.log) {
    const mk = sr.market[p.matchId];
    if (!p.result || !mk || sr.marketScores[p.matchId]) continue;
    const o = outcomeOf(p.result);
    const model = p.latest ?? p;
    const ll = (x: { home: number; draw: number; away: number }) => Math.round(-Math.log(Math.max(1e-9, x[o])) * 1000) / 1000;
    sr.marketScores[p.matchId] = { model: ll({ home: model.pHome, draw: model.pDraw, away: model.pAway }), market: ll(mk) };
  }
  const market = marketSummary(sr);
  if (market) notes.push(market);
  if (srCfg.soccerKey || srCfg.oddsKey) {
    mkdirSync(join(P.srStore, ".."), { recursive: true });
    writeFileSync(P.srStore, sealStore(sr, srSecret));
    writeJson(P.news, { updatedAt: now, matches: news });
  }
  writeFileSync(P.report, renderReport(out, today, backtest(learnFrom, countries, out.params), out.params, sources, notes));

  const played = matches.filter((m) => m.ft).length;
  console.log(
    `${today}: ${matches.length} matches (${played} played) · scored ${out.newlyScored.length} · new predictions ${out.newPredictions.length} · params v${out.params.version} · missing: ${fetched.report.missing.join(", ") || "none"}`,
  );
}

/**
 * Imports UEFA club-competition matches. The Europa League and Conference League main tournaments are taken with
 * fixtures for every season, the Champions League's for seasons openfootball has not published; qualifiers are
 * taken as played results. Finished past seasons already in the database are not fetched again.
 */
async function importUefaMatches(
  today: string,
  stored: Match[],
  openfootballLoaded: Set<string>,
  clClubs: Set<string>,
): Promise<{ matches: Match[]; note: string }> {
  const seasons = seasonsUpTo(today);
  const current = seasons.at(-1)!;
  const have = new Set(stored.filter((m) => m.source === "uefa").map((m) => `${m.comp}/${m.season}`));
  const aliases = readJson<Record<string, string>>(P.uefaAliases, {});
  const matches: Match[] = [];
  const total: MatchImportReport = { imported: 0, newClubs: [], skipped: [] };
  for (const season of seasons) {
    for (const c of UEFA_COMPETITIONS) {
      const wantTournament = c.comp !== "cl" || !openfootballLoaded.has(`cl ${season}`);
      const done = season !== current && have.has(`${c.qualifyingComp}/${season}`) && (!wantTournament || have.has(`${c.comp}/${season}`));
      if (done) continue;
      const rows = await fetchUefaMatches(c.id, uefaSeasonYear(season), uefaFetcher);
      const keep = c.comp === "cl" && !wantTournament ? rows.filter((r) => r.round?.phase === "QUALIFYING") : rows;
      // Main tournaments contribute fixtures to predict; qualifiers, results only.
      const tournament = keep.filter((r) => r.round?.phase !== "QUALIFYING");
      const rest = keep.filter((r) => r.round?.phase === "QUALIFYING");
      for (const [part, playedOnly] of [[tournament, false], [rest, true]] as const) {
        const { matches: ms, report } = toMatches(part, c, season, aliases, playedOnly, clClubs);
        matches.push(...ms);
        total.imported += report.imported;
        total.newClubs.push(...report.newClubs);
        total.skipped.push(...report.skipped);
      }
    }
  }
  const skipped = [...new Map(total.skipped.map((s) => [`${s.name}|${s.country}`, s])).values()];
  writeJson(P.uefaImport, { updatedAt: today, imported: total.imported, newClubs: [...new Set(total.newClubs)], skipped });
  return {
    matches,
    note: `UEFA matches: ${total.imported} rows${total.newClubs.length ? `, ${new Set(total.newClubs).size} new clubs` : ""}${skipped.length ? `, ${skipped.length} clubs skipped (see data/uefa-import.json)` : ""}`,
  };
}

/**
 * Fetches this and last season's player stats for the three UEFA club competitions and writes data/players.csv.
 * A player listed twice in a season (moved clubs between competitions) keeps the row with the most minutes.
 */
async function importUefaPlayers(today: string, matches: { comp: string; home: string; away: string }[]): Promise<string> {
  const season = seasonsUpTo(today).at(-1)!;
  const year = uefaSeasonYear(season);
  const fetchAll = async (y: number) => {
    const rows: UefaPlayer[] = [];
    for (const c of UEFA_COMPETITIONS) rows.push(...((await fetchUefaSeason(y, uefaFetcher, c.id)) ?? []));
    const best = new Map<string, UefaPlayer>();
    for (const p of rows) if ((best.get(p.playerId)?.minutes ?? -1) < p.minutes) best.set(p.playerId, p);
    return [...best.values()];
  };
  const current = await fetchAll(year);
  if (!current.length) return `UEFA player stats: none published yet for ${season}`;
  const previous = await fetchAll(year - 1);
  const inCl = new Set(matches.filter((m) => m.comp === "cl").flatMap((m) => [m.home, m.away]));
  const ours = allTeams().map((t) => ({ id: t.id, name: t.name, country: t.country, inCl: inCl.has(t.id) }));
  const aliases = readJson<Record<string, string>>(P.uefaAliases, {});
  const teamMap = mapTeams(current, ours, aliases);
  const { players, report } = buildPlayerSheet(current, previous, teamMap);
  writeFileSync(P.players, playersToCsv(players));
  writeJson(P.uefaTeams, {
    season,
    mapped: Object.fromEntries([...teamMap].filter(([, id]) => id).map(([uid, id]) => [uid, id])),
    unmapped: report.unmapped,
  } satisfies { season: string; mapped: Record<string, string | null>; unmapped: SheetReport["unmapped"] });
  return `UEFA player stats ${season}: ${report.players} players from ${report.mappedTeams} clubs${report.unmapped.length ? `, ${report.unmapped.length} clubs unmapped (see data/uefa-teams.json)` : ""}`;
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
