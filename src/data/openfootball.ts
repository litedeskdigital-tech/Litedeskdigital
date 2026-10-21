import { registerTeam, teamId, type Stage } from "../teams";
import { DOMESTIC_LEAGUES, LEAGUE_COUNTRY, matchId, type Match, type Score } from "./types";

/** openfootball publishes plain files on GitHub; these are the only sources the model reads. */
export const OPENFOOTBALL = "https://raw.githubusercontent.com/openfootball";
/** Earliest season loaded. 2023-24 is the last group-stage season; the parser reads both formats. */
export const FIRST_SEASON = 2023;

export function seasonLabel(startYear: number): string {
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, "0")}`;
}

/** Seasons from FIRST_SEASON up to the one in progress on `today` (a season starts in July). */
export function seasonsUpTo(today: string): string[] {
  const [y, m] = today.split("-").map(Number) as [number, number];
  const current = m >= 7 ? y : y - 1;
  const out: string[] = [];
  for (let s = FIRST_SEASON; s <= current; s += 1) out.push(seasonLabel(s));
  return out;
}

export function clUrl(season: string): string {
  return `${OPENFOOTBALL}/champions-league/master/${season}/cl.txt`;
}

export function leagueUrl(season: string, comp: string): string {
  return `${OPENFOOTBALL}/football.json/master/${season}/${comp}.json`;
}

const MONTHS: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

const FINALS_STAGE: Record<string, Stage> = {
  "Round of 16": "r16",
  Quarterfinals: "qf",
  Semifinals: "sf",
  Final: "final",
};

const MATCH_LINE = /^\s*(?:\d{1,2}:\d{2}\s+)?(.+?) \(([A-Z]{3})\)\s+v\s+(.+?) \(([A-Z]{3})\)\s*(.*)$/;
const DATE_LINE = /^\s*(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+([A-Z][a-z]{2})\s+(\d{1,2})(?:\s+(\d{4}))?\s*$/;

function pair(a: string, b: string): Score {
  return { home: Number(a), away: Number(b) };
}

/** "0-2 (0-0)", "3-2 a.e.t. (3-0, 1-0)", "4-3 pen. 1-1 a.e.t. (1-1, 0-1)", or "" for unplayed. */
export function parseClScore(text: string): Pick<Match, "ft" | "aet" | "pens"> {
  const t = text.trim();
  let m = /^(\d+)-(\d+) pen\. (\d+)-(\d+) a\.e\.t\. \((\d+)-(\d+)/.exec(t);
  if (m) return { pens: pair(m[1]!, m[2]!), aet: pair(m[3]!, m[4]!), ft: pair(m[5]!, m[6]!) };
  m = /^(\d+)-(\d+) a\.e\.t\. \((\d+)-(\d+)/.exec(t);
  if (m) return { aet: pair(m[1]!, m[2]!), ft: pair(m[3]!, m[4]!) };
  m = /^(\d+)-(\d+)/.exec(t);
  if (m) return { ft: pair(m[1]!, m[2]!) };
  return {};
}

/** Two-legged ties: the earlier meeting of a pair within a knockout stage is leg 1. */
function assignLegs(matches: Match[]): void {
  const ties = new Map<string, Match[]>();
  for (const m of matches) {
    if (m.stage === "league" || m.stage === "final") continue;
    const key = `${m.stage}|${[m.home, m.away].sort().join("|")}`;
    ties.set(key, [...(ties.get(key) ?? []), m]);
  }
  for (const legs of ties.values()) {
    if (legs.length !== 2) continue;
    legs.sort((a, b) => (a.date < b.date ? -1 : 1));
    legs[0]!.leg = 1;
    legs[1]!.leg = 2;
  }
}

/** Parses openfootball's Champions League text format (league phase or group stage, then knockouts). */
export function parseClText(text: string, season: string, source = "openfootball"): Match[] {
  const startYear = Number(season.slice(0, 4));
  let year = startYear;
  let lastMonth = 7;
  let date = "";
  let stage: Stage = "league";
  let matchday: number | undefined;
  const out: Match[] = [];

  for (const line of text.split(/\r?\n/)) {
    const header = /^▪\s*(League|Group|Playoffs|Finals),\s*(.+?)\s*$/.exec(line);
    if (header) {
      const [, kind, rest] = header;
      if (kind === "League" || kind === "Group") {
        stage = "league";
        matchday = Number(/Matchday (\d+)/.exec(rest!)?.[1]) || undefined;
      } else if (kind === "Playoffs") {
        stage = "playoff";
        matchday = undefined;
      } else {
        stage = FINALS_STAGE[rest!] ?? "r16";
        matchday = undefined;
      }
      continue;
    }
    const d = DATE_LINE.exec(line);
    if (d) {
      const month = MONTHS[d[1]!]!;
      if (d[3]) year = Number(d[3]);
      else if (month < lastMonth) year += 1;
      lastMonth = month;
      date = `${year}-${String(month).padStart(2, "0")}-${d[2]!.padStart(2, "0")}`;
      continue;
    }
    const mm = MATCH_LINE.exec(line);
    if (!mm || !date) continue;
    const [, homeName, homeCountry, awayName, awayCountry, rest] = mm;
    registerTeam(homeName!, homeCountry!);
    registerTeam(awayName!, awayCountry!);
    const home = teamId(homeName!);
    const away = teamId(awayName!);
    out.push({
      id: matchId("cl", season, stage, home, away),
      comp: "cl",
      season,
      date,
      stage,
      matchday,
      home,
      away,
      neutral: stage === "final" ? true : undefined,
      ...parseClScore(rest ?? ""),
      source,
    });
  }
  assignLegs(out);
  return out;
}

type LeagueJson = {
  matches: {
    round?: string;
    date: string;
    team1: string;
    team2: string;
    score?: { ft?: [number, number] } | [number, number];
  }[];
};

/** Parses an openfootball football.json league file. */
export function parseLeagueJson(json: LeagueJson, comp: string, season: string): Match[] {
  const country = LEAGUE_COUNTRY[comp] ?? "";
  return json.matches.map((m) => {
    registerTeam(m.team1, country);
    registerTeam(m.team2, country);
    const home = teamId(m.team1);
    const away = teamId(m.team2);
    const raw = Array.isArray(m.score) ? m.score : m.score?.ft;
    return {
      id: matchId(comp, season, "league", home, away),
      comp,
      season,
      date: m.date,
      stage: "league" as const,
      matchday: Number(/(\d+)/.exec(m.round ?? "")?.[1]) || undefined,
      home,
      away,
      ft: raw ? { home: raw[0], away: raw[1] } : undefined,
      source: "openfootball",
    };
  });
}

export type Fetcher = (url: string) => Promise<string | null>;

/** Plain fetch; null on 404 so seasons that are not published yet are skipped. */
export const httpFetcher: Fetcher = async (url) => {
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
};

export type FetchReport = { loaded: string[]; missing: string[] };

/** Every Champions League and covered domestic-league file from FIRST_SEASON to today's season. */
export async function fetchOpenfootball(today: string, fetcher: Fetcher = httpFetcher): Promise<{ matches: Match[]; report: FetchReport }> {
  const matches: Match[] = [];
  const report: FetchReport = { loaded: [], missing: [] };
  for (const season of seasonsUpTo(today)) {
    const cl = await fetcher(clUrl(season));
    if (cl) {
      matches.push(...parseClText(cl, season));
      report.loaded.push(`cl ${season}`);
    } else report.missing.push(`cl ${season}`);
    for (const comp of DOMESTIC_LEAGUES) {
      const text = await fetcher(leagueUrl(season, comp));
      if (text) {
        matches.push(...parseLeagueJson(JSON.parse(text) as LeagueJson, comp, season));
        report.loaded.push(`${comp} ${season}`);
      } else report.missing.push(`${comp} ${season}`);
    }
  }
  return { matches, report };
}
