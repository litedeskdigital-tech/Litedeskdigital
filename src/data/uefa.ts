import type { Player, Position } from "../scorers";
import { bestMatch, type TeamRef } from "./names";
import type { Fetcher } from "./openfootball";

/**
 * UEFA's public competition-stats API (the one uefa.com's own statistics pages read). Only the Champions League
 * (competitionId 1) is used. UEFA counts seasons by the year they end: 2026-27 is seasonYear 2027.
 */
export const UEFA_RANKING = "https://compstats.uefa.com/v1/player-ranking";
export const UEFA_USER_AGENT = "Litedeskdigital-model/1.0 (+https://github.com/litedeskdigital-tech/Litedeskdigital)";
const PAGE = 100;
/** Hard stop on paging, far above a season's real size (~800 players), so a misbehaving API cannot loop us. */
const MAX_PAGES = 20;

export type UefaPlayer = {
  playerId: string;
  name: string;
  fieldPosition: string;
  detailedPosition: string;
  uefaTeamId: string;
  teamName: string;
  country: string;
  goals: number;
  penalties: number;
  minutes: number;
  apps: number;
};

type RankingRow = {
  playerId: string;
  player?: { internationalName?: string; fieldPosition?: string; detailedFieldPosition?: string };
  team?: { id?: string; internationalName?: string; countryCode?: string };
  statistics?: { name: string; value: string }[];
};

export function uefaSeasonYear(season: string): number {
  return Number(season.slice(0, 4)) + 1;
}

export function rankingUrl(seasonYear: number, offset: number): string {
  const q = new URLSearchParams({
    competitionId: "1",
    seasonYear: String(seasonYear),
    phase: "TOURNAMENT",
    order: "DESC",
    optionalFields: "PLAYER,TEAM",
    stats: "goals,minutes_played_official,matches_appearance,penalty_scored",
    limit: String(PAGE),
    offset: String(offset),
  });
  return `${UEFA_RANKING}?${q}`;
}

export function parseRanking(rows: RankingRow[]): UefaPlayer[] {
  return rows
    .filter((r) => r.team?.id)
    .map((r) => {
      const stat = (name: string) => Number(r.statistics?.find((s) => s.name === name)?.value ?? 0) || 0;
      return {
        playerId: r.playerId,
        name: r.player?.internationalName ?? r.playerId,
        fieldPosition: r.player?.fieldPosition ?? "",
        detailedPosition: r.player?.detailedFieldPosition ?? "",
        uefaTeamId: r.team!.id!,
        teamName: r.team?.internationalName ?? "",
        country: r.team?.countryCode ?? "",
        goals: stat("goals"),
        penalties: stat("penalty_scored"),
        minutes: stat("minutes_played_official"),
        apps: stat("matches_appearance"),
      };
    });
}

/** Every player row for one season, a page of 100 at a time; null when the season has no data yet. */
export async function fetchUefaSeason(seasonYear: number, fetcher: Fetcher): Promise<UefaPlayer[] | null> {
  const out: UefaPlayer[] = [];
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const text = await fetcher(rankingUrl(seasonYear, page * PAGE));
    if (text === null) return page === 0 ? null : out;
    const rows = JSON.parse(text) as RankingRow[] | null;
    if (!Array.isArray(rows) || rows.length === 0) break;
    out.push(...parseRanking(rows));
    if (rows.length < PAGE) break;
  }
  return out.length ? out : null;
}

/** Fetcher for UEFA: identifies itself, asks for JSON, and fails loudly on anything but 200/404. */
export const uefaFetcher: Fetcher = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": UEFA_USER_AGENT, Accept: "application/json" } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
};

// ---------- Matching UEFA clubs to the match database ----------

export type { TeamRef };

/**
 * Maps each UEFA club to a club id in the match database (see bestMatch). Anything ambiguous or unmatched is left
 * unmapped rather than guessed; `aliases` (UEFA team id → our id) settles those by hand.
 */
export function mapTeams(
  uefa: { uefaTeamId: string; teamName: string; country: string }[],
  ours: TeamRef[],
  aliases: Record<string, string> = {},
): Map<string, string | null> {
  const out = new Map<string, string | null>();
  for (const u of uefa) {
    if (out.has(u.uefaTeamId)) continue;
    out.set(u.uefaTeamId, aliases[u.uefaTeamId] ?? bestMatch(u.teamName, u.country, ours));
  }
  return out;
}

// ---------- Building the player sheet ----------

/**
 * Prior non-penalty goals per 90 by position. A player's own rate is shrunk toward it by PRIOR_MATCHES
 * matches' worth of weight, so three Champions League games cannot make anyone a 1.3-a-game striker.
 */
export const POSITION_PRIOR: Record<Position, number> = { FW: 0.35, AM: 0.2, MF: 0.08, DF: 0.03, GK: 0 };
export const PRIOR_MATCHES = 4;
/** Last season's Champions League counts at this weight next to this season's. */
export const PREVIOUS_SEASON_WEIGHT = 0.5;
/** Players expected to play less than this are left off the sheet. */
export const MIN_EXPECTED_MINUTES = 10;

export function positionOf(field: string, detailed: string): Position {
  if (field === "GOALKEEPER") return "GK";
  if (field === "DEFENDER") return "DF";
  if (field === "FORWARD") return detailed === "WINGER" ? "AM" : "FW";
  if (detailed.includes("ATTACKING")) return "AM";
  return "MF";
}

export type SheetReport = { players: number; mappedTeams: number; unmapped: { uefaTeamId: string; name: string; country: string }[] };

/**
 * One row per player in this season's Champions League. Scoring rate pools this season and (at half weight)
 * last season, minus penalties, shrunk toward the position prior. Expected minutes are this season's minutes
 * over the club's matches so far. The club's penalty taker is its player with the most penalty goals.
 */
export function buildPlayerSheet(
  current: UefaPlayer[],
  previous: UefaPlayer[],
  teamMap: Map<string, string | null>,
): { players: Player[]; report: SheetReport } {
  const prev = new Map(previous.map((p) => [p.playerId, p]));
  const clubGames = new Map<string, number>();
  for (const p of current) clubGames.set(p.uefaTeamId, Math.max(clubGames.get(p.uefaTeamId) ?? 0, p.apps));

  const takers = new Map<string, { id: string; pens: number }>();
  for (const p of current) {
    const pens = p.penalties + (prev.get(p.playerId)?.penalties ?? 0) * PREVIOUS_SEASON_WEIGHT;
    const best = takers.get(p.uefaTeamId);
    if (pens > 0 && (!best || pens > best.pens)) takers.set(p.uefaTeamId, { id: p.playerId, pens });
  }

  const players: Player[] = [];
  const unmapped = new Map<string, { uefaTeamId: string; name: string; country: string }>();
  for (const p of current) {
    const teamId = teamMap.get(p.uefaTeamId);
    if (!teamId) {
      unmapped.set(p.uefaTeamId, { uefaTeamId: p.uefaTeamId, name: p.teamName, country: p.country });
      continue;
    }
    const games = clubGames.get(p.uefaTeamId) ?? 0;
    const expectedMinutes = games > 0 ? Math.min(90, p.minutes / games) : 0;
    if (expectedMinutes < MIN_EXPECTED_MINUTES) continue;
    const position = positionOf(p.fieldPosition, p.detailedPosition);
    const last = prev.get(p.playerId);
    const npGoals = p.goals - p.penalties + (last ? (last.goals - last.penalties) * PREVIOUS_SEASON_WEIGHT : 0);
    const nineties = p.minutes / 90 + (last ? (last.minutes / 90) * PREVIOUS_SEASON_WEIGHT : 0);
    const npGoalsPer90 = (Math.max(0, npGoals) + PRIOR_MATCHES * POSITION_PRIOR[position]) / (nineties + PRIOR_MATCHES);
    players.push({
      id: `uefa-${p.playerId}`,
      name: p.name,
      teamId,
      position,
      npGoalsPer90: Math.round(npGoalsPer90 * 1000) / 1000,
      expectedMinutes: Math.round(expectedMinutes),
      penaltyTaker: takers.get(p.uefaTeamId)?.id === p.playerId,
    });
  }
  const mappedTeams = [...teamMap.values()].filter(Boolean).length;
  return { players, report: { players: players.length, mappedTeams, unmapped: [...unmapped.values()] } };
}

export function playersToCsv(players: Player[]): string {
  const esc = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  const rows = players.map((p) =>
    [p.id, esc(p.name), p.teamId, p.position, p.npGoalsPer90, p.expectedMinutes, p.penaltyTaker ? "true" : "false"].join(","),
  );
  return ["id,name,teamId,position,npGoalsPer90,expectedMinutes,penaltyTaker", ...rows].join("\n") + "\n";
}
