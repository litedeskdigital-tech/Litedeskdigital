import { registerTeam } from "../teams";
import { parseClText } from "./openfootball";
import { byDate, type Match } from "./types";

/**
 * Merges sources into one database, later sources winning: open-source rows win over provisional hand-entered
 * rows, a played row is never replaced by an unplayed one, and a provisional season is dropped once an open
 * source publishes that season.
 */
export function mergeMatches(...sources: Match[][]): Match[] {
  const official = new Set<string>();
  for (const src of sources) {
    for (const m of src) if (!m.provisional) official.add(`${m.comp}/${m.season}`);
  }
  const out = new Map<string, Match>();
  for (const src of sources) {
    for (const m of src) {
      if (m.provisional && official.has(`${m.comp}/${m.season}`)) continue;
      const prev = out.get(m.id);
      if (!prev) {
        out.set(m.id, m);
        continue;
      }
      // A later source wins (new kick-off times, rescheduled dates, corrections) unless it would drop a result or
      // put a provisional row over an official one.
      const losesResult = !!prev.ft && !m.ft;
      const downgrade = !!m.provisional && !prev.provisional;
      if (!losesResult && !downgrade) out.set(m.id, m);
    }
  }
  return [...out.values()].sort(byDate);
}

/** Hand-entered Champions League results (openfootball format) for a season openfootball has not published. */
export function parseManualCl(text: string, season: string): Match[] {
  return parseClText(text, season, "manual").map((m) => ({ ...m, provisional: true }));
}

export type Db = { updatedAt: string; matches: Match[]; teams: Record<string, { name: string; country: string }> };

/** Re-registers the clubs stored with a saved database so getTeam works without refetching. */
export function hydrateTeams(db: Db): void {
  for (const t of Object.values(db.teams)) registerTeam(t.name, t.country);
}
