/**
 * Nightly update: fetch open data, learn, score, maybe re-tune, predict ahead, write state and report.
 *
 *   tsx scripts/update.ts [--today YYYY-MM-DD] [--offline DIR] [--no-tune]
 *
 * --offline reads files previously saved as DIR/cl-<season>.txt and DIR/<comp>-<season>.json instead of fetching.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { hydrateTeams, mergeMatches, parseManualCl, type Db } from "../src/data/db";
import { clUrl, fetchOpenfootball, httpFetcher, leagueUrl, seasonsUpTo, type Fetcher } from "../src/data/openfootball";
import { backtest, runCycle, type LearningEvent, type LoggedPrediction } from "../src/learn";
import { DEFAULT_PARAMS, type Params } from "../src/ratings";
import { renderReport } from "../src/report";
import { parsePlayersCsv } from "../src/scorers";
import { allTeams } from "../src/teams";

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
    for (const comp of ["en.1", "es.1", "de.1", "it.1", "fr.1", "pt.1", "nl.1"]) names.set(leagueUrl(season, comp), `${comp}-${season}.json`);
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
  const fetched = await fetchOpenfootball(today, fetcher);
  const manual = seasonsUpTo(today).flatMap((season) => {
    const path = join(P.manual, `cl-${season}.txt`);
    return existsSync(path) ? parseManualCl(readFileSync(path, "utf8"), season) : [];
  });
  const matches = mergeMatches(stored.matches.filter((m) => !m.provisional), manual, fetched.matches);
  const teams = Object.fromEntries(allTeams().map((t) => [t.id, { name: t.name, country: t.country }]));
  const countries = Object.fromEntries(allTeams().map((t) => [t.id, t.country]));

  const params = readJson<Params>(P.params, DEFAULT_PARAMS);
  // Written by the player importer, or by hand; team ids must match the match database (see teamId()).
  const players = existsSync(P.players) ? parsePlayersCsv(readFileSync(P.players, "utf8")) : undefined;
  const out = runCycle({
    matches,
    countries,
    params,
    log: readJson<{ predictions: LoggedPrediction[] }>(P.log, { predictions: [] }).predictions,
    events: readJson<LearningEvent[]>(P.events, []),
    today,
    noTune: process.argv.includes("--no-tune"),
    players,
  });

  writeRows(P.db, { updatedAt: today, teams }, "matches", matches);
  writeRows(P.log, { updatedAt: today }, "predictions", out.log);
  writeJson(P.events, out.events);
  writeJson(P.params, out.params);
  writeJson(P.state, out.state);
  const sources = [...fetched.report.loaded.map((s) => `openfootball ${s}`), ...(manual.length ? [`${manual.length} provisional hand-entered CL rows`] : [])];
  writeFileSync(P.report, renderReport(out, today, backtest(matches, countries, out.params), out.params, sources));

  const played = matches.filter((m) => m.ft).length;
  console.log(
    `${today}: ${matches.length} matches (${played} played) · scored ${out.newlyScored.length} · new predictions ${out.newPredictions.length} · params v${out.params.version} · missing: ${fetched.report.missing.join(", ") || "none"}`,
  );
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
