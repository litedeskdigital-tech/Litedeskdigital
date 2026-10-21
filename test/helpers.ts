import type { Match } from "../src/data/types";
import { matchId } from "../src/data/types";
import { registerTeam, teamId } from "../src/teams";
import { DEFAULT_PARAMS, runFilter, type Params } from "../src/ratings";
import type { Model } from "../src/predict";

export const CLUBS: [string, string][] = [
  ["Alpha FC", "ENG"], ["Beta FC", "ENG"], ["Gamma FC", "ENG"], ["Delta FC", "ENG"],
  ["Eins SV", "GER"], ["Zwei SV", "GER"], ["Drei SV", "GER"], ["Vier SV", "GER"],
];
for (const [n, c] of CLUBS) registerTeam(n, c);
export const countries = Object.fromEntries(CLUBS.map(([n, c]) => [teamId(n), c]));
export const ids = CLUBS.map(([n]) => teamId(n));

export function m(comp: string, date: string, home: string, away: string, hs?: number, as?: number): Match {
  return {
    id: matchId(comp, "2025-26", "league", home, away),
    comp,
    season: "2025-26",
    date,
    stage: "league",
    home,
    away,
    ft: hs === undefined ? undefined : { home: hs, away: as! },
    source: "test",
  };
}

/** Double round robin per league, where each league's first club wins at home, plus CL games English clubs win. */
export function season(): Match[] {
  const out: Match[] = [];
  let day = 0;
  const date = () => {
    const d = new Date(Date.UTC(2025, 7, 1) + day * 86_400_000);
    day += 2;
    return d.toISOString().slice(0, 10);
  };
  for (const [comp, group] of [["en.1", ids.slice(0, 4)], ["de.1", ids.slice(4)]] as const) {
    for (const h of group) for (const a of group) if (h !== a) out.push(m(comp, date(), h, a, h === group[0] ? 3 : 1, 1));
  }
  for (let i = 0; i < 4; i += 1) {
    out.push(m("cl", date(), ids[i]!, ids[4 + i]!, 2, 0));
    out.push(m("cl", date(), ids[4 + i]!, ids[i]!, 0, 1));
  }
  return out;
}

export function model(matches: Match[], params: Params = DEFAULT_PARAMS): Model {
  return { state: runFilter(matches, countries, params), params, countries };
}
