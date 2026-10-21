export type Stage = "league" | "playoff" | "r16" | "qf" | "sf" | "final";

export type Team = {
  id: string;
  name: string;
  shortName: string;
  abbr: string;
  country: string;
  city: string;
  color: string;
  markFg: string;
  /** Pre-season club Elo, hand-set. Only used as the prior; results move the live rating. */
  elo: number;
};

/**
 * Clubs seen in the 2026/27 league phase so far. Elo priors are approximate, rounded to 10, and are
 * meant to be overwritten by a proper source. Add the remaining clubs here before simulating them.
 */
export const TEAMS: Team[] = [
  { id: "arsenal", name: "Arsenal", shortName: "Arsenal", abbr: "ARS", country: "ENG", city: "London", color: "#EF0107", markFg: "#FFFFFF", elo: 2030 },
  { id: "aston-villa", name: "Aston Villa", shortName: "Villa", abbr: "AVL", country: "ENG", city: "Birmingham", color: "#670E36", markFg: "#95BFE5", elo: 1850 },
  { id: "atletico-madrid", name: "Atlético de Madrid", shortName: "Atlético", abbr: "ATM", country: "ESP", city: "Madrid", color: "#CB3524", markFg: "#FFFFFF", elo: 1890 },
  { id: "barcelona", name: "FC Barcelona", shortName: "Barça", abbr: "BAR", country: "ESP", city: "Barcelona", color: "#A50044", markFg: "#EDBB00", elo: 1990 },
  { id: "bayern", name: "FC Bayern München", shortName: "Bayern", abbr: "BAY", country: "GER", city: "Munich", color: "#DC052D", markFg: "#FFFFFF", elo: 1990 },
  { id: "club-brugge", name: "Club Brugge", shortName: "Brugge", abbr: "BRU", country: "BEL", city: "Bruges", color: "#0067CE", markFg: "#000000", elo: 1760 },
  { id: "como", name: "Como 1907", shortName: "Como", abbr: "COM", country: "ITA", city: "Como", color: "#1C3F94", markFg: "#FFFFFF", elo: 1780 },
  { id: "dortmund", name: "Borussia Dortmund", shortName: "Dortmund", abbr: "BVB", country: "GER", city: "Dortmund", color: "#FDE100", markFg: "#000000", elo: 1840 },
  { id: "feyenoord", name: "Feyenoord", shortName: "Feyenoord", abbr: "FEY", country: "NED", city: "Rotterdam", color: "#E2001A", markFg: "#FFFFFF", elo: 1730 },
  { id: "galatasaray", name: "Galatasaray", shortName: "Galatasaray", abbr: "GAL", country: "TUR", city: "Istanbul", color: "#A90432", markFg: "#FDB912", elo: 1760 },
  { id: "inter", name: "Inter", shortName: "Inter", abbr: "INT", country: "ITA", city: "Milan", color: "#010E80", markFg: "#FFFFFF", elo: 1940 },
  { id: "lask", name: "LASK", shortName: "LASK", abbr: "LAS", country: "AUT", city: "Linz", color: "#000000", markFg: "#FFFFFF", elo: 1600 },
  { id: "leipzig", name: "RB Leipzig", shortName: "Leipzig", abbr: "RBL", country: "GER", city: "Leipzig", color: "#DD0741", markFg: "#FFFFFF", elo: 1780 },
  { id: "lens", name: "RC Lens", shortName: "Lens", abbr: "RCL", country: "FRA", city: "Lens", color: "#FFD700", markFg: "#C8102E", elo: 1760 },
  { id: "lille", name: "LOSC Lille", shortName: "Lille", abbr: "LIL", country: "FRA", city: "Lille", color: "#E01E13", markFg: "#FFFFFF", elo: 1780 },
  { id: "liverpool", name: "Liverpool", shortName: "Liverpool", abbr: "LIV", country: "ENG", city: "Liverpool", color: "#C8102E", markFg: "#FFFFFF", elo: 2000 },
  { id: "man-city", name: "Manchester City", shortName: "Man City", abbr: "MCI", country: "ENG", city: "Manchester", color: "#6CABDD", markFg: "#1C2C5B", elo: 1990 },
  { id: "man-united", name: "Manchester United", shortName: "Man Utd", abbr: "MUN", country: "ENG", city: "Manchester", color: "#DA291C", markFg: "#FBE122", elo: 1830 },
  { id: "napoli", name: "SSC Napoli", shortName: "Napoli", abbr: "NAP", country: "ITA", city: "Naples", color: "#12A0D7", markFg: "#FFFFFF", elo: 1860 },
  { id: "porto", name: "FC Porto", shortName: "Porto", abbr: "POR", country: "POR", city: "Porto", color: "#003893", markFg: "#FFFFFF", elo: 1790 },
  { id: "psv", name: "PSV Eindhoven", shortName: "PSV", abbr: "PSV", country: "NED", city: "Eindhoven", color: "#ED1C24", markFg: "#FFFFFF", elo: 1810 },
  { id: "real-betis", name: "Real Betis", shortName: "Betis", abbr: "BET", country: "ESP", city: "Seville", color: "#00954C", markFg: "#FFFFFF", elo: 1790 },
  { id: "real-madrid", name: "Real Madrid", shortName: "Real Madrid", abbr: "RMA", country: "ESP", city: "Madrid", color: "#FEBE10", markFg: "#00529F", elo: 1960 },
  { id: "roma", name: "AS Roma", shortName: "Roma", abbr: "ROM", country: "ITA", city: "Rome", color: "#8E1F2F", markFg: "#F0BC42", elo: 1790 },
  { id: "sabah", name: "Sabah FK", shortName: "Sabah", abbr: "SAB", country: "AZE", city: "Baku", color: "#0D2C6C", markFg: "#FFFFFF", elo: 1540 },
  { id: "slavia-praha", name: "SK Slavia Praha", shortName: "Slavia", abbr: "SLA", country: "CZE", city: "Prague", color: "#E10600", markFg: "#FFFFFF", elo: 1700 },
  { id: "sporting", name: "Sporting CP", shortName: "Sporting", abbr: "SCP", country: "POR", city: "Lisbon", color: "#008057", markFg: "#FFFFFF", elo: 1820 },
  { id: "stuttgart", name: "VfB Stuttgart", shortName: "Stuttgart", abbr: "VFB", country: "GER", city: "Stuttgart", color: "#E32219", markFg: "#FFFFFF", elo: 1780 },
  { id: "viking", name: "Viking FK", shortName: "Viking", abbr: "VIK", country: "NOR", city: "Stavanger", color: "#002F6C", markFg: "#FFFFFF", elo: 1580 },
  { id: "villarreal", name: "Villarreal CF", shortName: "Villarreal", abbr: "VIL", country: "ESP", city: "Villarreal", color: "#FFE667", markFg: "#005187", elo: 1810 },
];

const BY_ID = new Map(TEAMS.map((team) => [team.id, team]));

export function getTeam(id: string): Team {
  const team = BY_ID.get(id);
  if (!team) throw new Error(`Unknown team id: ${id}`);
  return team;
}
