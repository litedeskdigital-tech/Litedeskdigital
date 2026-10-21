export type Stage = "league" | "playoff" | "r16" | "qf" | "sf" | "final";

export type Team = {
  id: string;
  name: string;
  shortName: string;
  abbr: string;
  /** FIFA-style three-letter country code, when known. */
  country: string;
  color: string;
  markFg: string;
};

type Style = Pick<Team, "shortName" | "abbr" | "color" | "markFg">;

/** Display styling for clubs that have one; any other club gets a neutral style. Keyed by team id (see teamId). */
const STYLES: Record<string, Style> = {
  "arsenal-fc": { shortName: "Arsenal", abbr: "ARS", color: "#EF0107", markFg: "#FFFFFF" },
  "aston-villa-fc": { shortName: "Villa", abbr: "AVL", color: "#670E36", markFg: "#95BFE5" },
  "club-atletico-de-madrid": { shortName: "Atlético", abbr: "ATM", color: "#CB3524", markFg: "#FFFFFF" },
  "fc-barcelona": { shortName: "Barça", abbr: "BAR", color: "#A50044", markFg: "#EDBB00" },
  "fc-bayern-munchen": { shortName: "Bayern", abbr: "BAY", color: "#DC052D", markFg: "#FFFFFF" },
  "club-brugge-kv": { shortName: "Brugge", abbr: "BRU", color: "#0067CE", markFg: "#000000" },
  "como-1907": { shortName: "Como", abbr: "COM", color: "#1C3F94", markFg: "#FFFFFF" },
  "borussia-dortmund": { shortName: "Dortmund", abbr: "BVB", color: "#FDE100", markFg: "#000000" },
  "feyenoord-rotterdam": { shortName: "Feyenoord", abbr: "FEY", color: "#E2001A", markFg: "#FFFFFF" },
  "galatasaray-sk": { shortName: "Galatasaray", abbr: "GAL", color: "#A90432", markFg: "#FDB912" },
  "fc-internazionale-milano": { shortName: "Inter", abbr: "INT", color: "#010E80", markFg: "#FFFFFF" },
  lask: { shortName: "LASK", abbr: "LAS", color: "#000000", markFg: "#FFFFFF" },
  "rb-leipzig": { shortName: "Leipzig", abbr: "RBL", color: "#DD0741", markFg: "#FFFFFF" },
  "racing-club-de-lens": { shortName: "Lens", abbr: "RCL", color: "#FFD700", markFg: "#C8102E" },
  "lille-osc": { shortName: "Lille", abbr: "LIL", color: "#E01E13", markFg: "#FFFFFF" },
  "liverpool-fc": { shortName: "Liverpool", abbr: "LIV", color: "#C8102E", markFg: "#FFFFFF" },
  "manchester-city-fc": { shortName: "Man City", abbr: "MCI", color: "#6CABDD", markFg: "#1C2C5B" },
  "manchester-united-fc": { shortName: "Man Utd", abbr: "MUN", color: "#DA291C", markFg: "#FBE122" },
  "ssc-napoli": { shortName: "Napoli", abbr: "NAP", color: "#12A0D7", markFg: "#FFFFFF" },
  "fc-porto": { shortName: "Porto", abbr: "POR", color: "#003893", markFg: "#FFFFFF" },
  psv: { shortName: "PSV", abbr: "PSV", color: "#ED1C24", markFg: "#FFFFFF" },
  "real-betis-balompie": { shortName: "Betis", abbr: "BET", color: "#00954C", markFg: "#FFFFFF" },
  "real-madrid-cf": { shortName: "Real Madrid", abbr: "RMA", color: "#FEBE10", markFg: "#00529F" },
  "as-roma": { shortName: "Roma", abbr: "ROM", color: "#8E1F2F", markFg: "#F0BC42" },
  "sabah-fk": { shortName: "Sabah", abbr: "SAB", color: "#0D2C6C", markFg: "#FFFFFF" },
  "sk-slavia-praha": { shortName: "Slavia", abbr: "SLA", color: "#E10600", markFg: "#FFFFFF" },
  "sporting-clube-de-portugal": { shortName: "Sporting", abbr: "SCP", color: "#008057", markFg: "#FFFFFF" },
  "vfb-stuttgart": { shortName: "Stuttgart", abbr: "VFB", color: "#E32219", markFg: "#FFFFFF" },
  "viking-fk": { shortName: "Viking", abbr: "VIK", color: "#002F6C", markFg: "#FFFFFF" },
  "villarreal-cf": { shortName: "Villarreal", abbr: "VIL", color: "#FFE667", markFg: "#005187" },
  "paris-saint-germain-fc": { shortName: "PSG", abbr: "PSG", color: "#004170", markFg: "#DA291C" },
  "chelsea-fc": { shortName: "Chelsea", abbr: "CHE", color: "#034694", markFg: "#FFFFFF" },
};

/** Stable id from an openfootball club name: accents dropped, lower case, dashes. */
export function teamId(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const NOISE = /^(fc|cf|afc|sc|sk|fk|ac|as|ssc|rc|cd|rcd|ud|sd|kv|vfb|vfl|tsg|sv|bv|osc|pae|sl|nk|gnk|bsc)$/i;

function shortFrom(name: string): string {
  const words = name.split(/\s+/).filter((w) => !NOISE.test(w) && !/^\d/.test(w));
  return words.slice(0, 2).join(" ") || name;
}

const REGISTRY = new Map<string, Team>();

/** Adds clubs discovered in the match data so getTeam can describe them. */
export function registerTeam(name: string, country: string): Team {
  const id = teamId(name);
  const existing = REGISTRY.get(id);
  if (existing) {
    if (!existing.country && country) existing.country = country;
    return existing;
  }
  const short = shortFrom(name);
  const style = STYLES[id] ?? {
    shortName: short,
    abbr: short.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase().padEnd(3, "X"),
    color: "#5B6573",
    markFg: "#FFFFFF",
  };
  const team: Team = { id, name, country, ...style };
  REGISTRY.set(id, team);
  return team;
}

export function getTeam(id: string): Team {
  const team = REGISTRY.get(id);
  if (!team) throw new Error(`Unknown team id: ${id} (load the match database first)`);
  return team;
}

export function allTeams(): Team[] {
  return [...REGISTRY.values()];
}
