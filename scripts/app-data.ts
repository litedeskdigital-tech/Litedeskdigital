/**
 * Writes app/public/data/app.json from the committed model files (no fetching, no learning).
 *
 *   tsx scripts/app-data.ts [--now ISO]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildAppData } from "../src/appData";
import { hydrateTeams, type Db } from "../src/data/db";
import type { LearningEvent, LoggedPrediction } from "../src/learn";
import type { Params, State } from "../src/ratings";
import { parsePlayersCsv } from "../src/scorers";
import type { MatchNews } from "../src/teamNews";

const ROOT = join(import.meta.dirname, "..");
const read = <T>(p: string): T => JSON.parse(readFileSync(join(ROOT, p), "utf8")) as T;

const i = process.argv.indexOf("--now");
const now = i >= 0 ? process.argv[i + 1]! : new Date().toISOString();

const db = read<Db>("data/matches.json");
hydrateTeams(db);
const countries = Object.fromEntries(Object.entries(db.teams).map(([id, t]) => [id, t.country]));
const params = read<Params>("model/params.json");
const playersPath = join(ROOT, "data/players.csv");
const newsPath = join(ROOT, "data/team-news.json");
const data = buildAppData({
  matches: db.matches,
  log: read<{ predictions: LoggedPrediction[] }>("data/predictions.json").predictions,
  events: read<LearningEvent[]>("data/learning-log.json"),
  model: { state: read<State>("model/state.json"), params, countries },
  params,
  players: existsSync(playersPath) ? parsePlayersCsv(readFileSync(playersPath, "utf8")) : undefined,
  news: existsSync(newsPath) ? (JSON.parse(readFileSync(newsPath, "utf8")) as { matches: Record<string, MatchNews> }).matches : undefined,
  now,
});
const out = join(ROOT, "app/public/data/app.json");
mkdirSync(join(out, ".."), { recursive: true });
writeFileSync(out, JSON.stringify(data));
console.log(`app.json: ${data.fixtures.length} fixtures in the next 48 h, ${data.results.length} results in the last 24 h`);
