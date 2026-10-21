import { allTeams, registerTeam, type Stage } from "../teams";
import { bestMatch, UEFA_NAME_ALIASES, type TeamRef } from "./names";
import type { Fetcher } from "./openfootball";
import { LEAGUE_COUNTRY, matchId, type Match, type Score } from "./types";

/**
 * UEFA's public match API (what uefa.com's fixture pages read): fixtures, kick-off dates and 90-minute scores
 * for UEFA club competitions. The Champions League main tournament gives the fixtures the model predicts; its
 * qualifiers, the Europa League and the Conference League are imported as played results only, because they are
 * the cross-border games that tie clubs from leagues without open data (Norway, Ukraine, …) to the rest.
 */
export const UEFA_MATCHES = "https://match.uefa.com/v5/matches";
const PAGE = 200;
const MAX_PAGES = 10;

/** UEFA competition id → our competition code. Qualifying rounds of the Champions League get their own code. */
export const UEFA_COMPETITIONS = [
  { id: 1, comp: "cl", qualifyingComp: "clq" },
  { id: 14, comp: "el", qualifyingComp: "el" },
  { id: 2019, comp: "ecl", qualifyingComp: "ecl" },
] as const;

type UefaTeam = { id: string; internationalName: string; countryCode: string };

export type UefaMatchRow = {
  id: string;
  status: string;
  homeTeam?: UefaTeam;
  awayTeam?: UefaTeam;
  kickOffTime?: { date?: string; dateTime?: string };
  round?: { phase?: string; metaData?: { name?: string; type?: string } };
  matchday?: { longName?: string; sequenceNumber?: string; type?: string };
  leg?: { number?: number };
  score?: { regular?: Score; total?: Score; penalty?: Score };
};

export function matchesUrl(competitionId: number, seasonYear: number, offset: number): string {
  const q = new URLSearchParams({
    competitionId: String(competitionId),
    seasonYear: String(seasonYear),
    limit: String(PAGE),
    offset: String(offset),
    order: "ASC",
  });
  return `${UEFA_MATCHES}?${q}`;
}

export async function fetchUefaMatches(competitionId: number, seasonYear: number, fetcher: Fetcher): Promise<UefaMatchRow[]> {
  const out: UefaMatchRow[] = [];
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const text = await fetcher(matchesUrl(competitionId, seasonYear, page * PAGE));
    if (text === null) break;
    const rows = JSON.parse(text) as UefaMatchRow[] | null;
    if (!Array.isArray(rows) || rows.length === 0) break;
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

const KNOCKOUT_STAGE: Record<string, Stage> = {
  FINAL: "final",
  SEMIFINAL: "sf",
  QUARTER_FINAL: "qf",
  QUARTERFINAL: "qf",
  ROUND_OF_16: "r16",
};

export function stageOf(row: UefaMatchRow): Stage {
  const type = row.round?.metaData?.type ?? "";
  if (type === "GROUP_STANDINGS") return "league";
  if (KNOCKOUT_STAGE[type]) return KNOCKOUT_STAGE[type]!;
  const name = (row.round?.metaData?.name ?? "").toLowerCase();
  if (name.includes("round of 16")) return "r16";
  if (name.includes("quarter")) return "qf";
  if (name.includes("semi")) return "sf";
  if (name === "final") return "final";
  return "playoff";
}

function differs(a?: Score, b?: Score): boolean {
  return !!a && !!b && (a.home !== b.home || a.away !== b.away);
}

const COVERED = new Set(Object.values(LEAGUE_COUNTRY));

export type MatchImportReport = { imported: number; newClubs: string[]; skipped: { name: string; country: string }[] };

/**
 * Turns UEFA rows into database matches. Clubs are matched to existing ids (bestMatch, plus hand `aliases`).
 * A club from a country without league data that is not known yet is added as a new club; an unmatched club
 * from a covered country is skipped and reported instead, because it almost certainly exists under another
 * spelling and adding it would split one club in two.
 */
export function toMatches(
  rows: UefaMatchRow[],
  code: { comp: string; qualifyingComp: string },
  season: string,
  aliases: Record<string, string>,
  playedOnly: boolean,
  /** Clubs with Champions League matches in the database: preferred on a name tie ("Paris" → PSG, not Paris FC). */
  clClubs: Set<string>,
): { matches: Match[]; report: MatchImportReport } {
  const report: MatchImportReport = { imported: 0, newClubs: [], skipped: [] };
  const resolved = new Map<string, string | null>();
  const resolve = (t: UefaTeam): string | null => {
    if (resolved.has(t.id)) return resolved.get(t.id)!;
    let id: string | null = aliases[t.id] ?? UEFA_NAME_ALIASES[t.internationalName] ?? null;
    if (!id) {
      const refs: TeamRef[] = allTeams().map((x) => ({ id: x.id, name: x.name, country: x.country, inCl: clClubs.has(x.id) }));
      id = bestMatch(t.internationalName, t.countryCode, refs);
    }
    if (!id && !COVERED.has(t.countryCode)) {
      id = registerTeam(t.internationalName, t.countryCode).id;
      report.newClubs.push(`${t.internationalName} (${t.countryCode})`);
    }
    if (!id) report.skipped.push({ name: t.internationalName, country: t.countryCode });
    resolved.set(t.id, id);
    return id;
  };

  const matches: Match[] = [];
  for (const row of rows) {
    if (!row.homeTeam || !row.awayTeam || !row.kickOffTime?.date) continue;
    const played = row.status === "FINISHED" && row.score?.regular !== undefined;
    if (playedOnly && !played) continue;
    const home = resolve(row.homeTeam);
    const away = resolve(row.awayTeam);
    if (!home || !away) continue;
    const qualifying = row.round?.phase === "QUALIFYING";
    const comp = qualifying ? code.qualifyingComp : code.comp;
    const stage = qualifying ? "playoff" : stageOf(row);
    const regular = row.score?.regular;
    const total = row.score?.total;
    matches.push({
      id: `${matchId(comp, season, stage, home, away)}${qualifying ? `/${row.id}` : ""}`,
      comp,
      season,
      date: row.kickOffTime.date,
      kickoff: row.kickOffTime.dateTime,
      stage,
      matchday: stage === "league" ? Number(row.matchday?.sequenceNumber) || undefined : undefined,
      leg: row.leg?.number === 1 || row.leg?.number === 2 ? (row.leg.number as 1 | 2) : undefined,
      home,
      away,
      neutral: stage === "final" ? true : undefined,
      ft: played ? regular : undefined,
      aet: played && differs(total, regular) ? total : undefined,
      pens: played ? row.score?.penalty : undefined,
      source: "uefa",
    });
    report.imported += 1;
  }
  return { matches, report };
}
