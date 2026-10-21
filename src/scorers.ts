import type { RateSample } from "./engine";
import { getTeam } from "./teams";

export type Position = "FW" | "AM" | "MF" | "DF" | "GK";

export type Player = {
  id: string;
  name: string;
  teamId: string;
  position: Position;
  /** Non-penalty goals (or npxG) per 90 minutes this season. */
  npGoalsPer90: number;
  /** Minutes expected in this match: ~85 for a nailed starter, ~20 for an impact sub, 0 if injured. */
  expectedMinutes: number;
  penaltyTaker?: boolean;
};

export type ScorerProb = {
  playerId: string;
  name: string;
  teamId: string;
  /** Chance of scoring at least once in 90 minutes. */
  pAnytime: number;
  /** Share of the team's goals expected to be this player's. */
  share: number;
};

/** Share of team goals from penalties; handed to the named taker, or to the unlisted pool if none. */
export const PEN_SHARE = 0.1;
/** Share of team goals that are own goals by the opponent; scored by nobody on the sheet. */
export const OWN_GOAL_SHARE = 0.03;
/** Open-play goals always left to players not on the sheet, so a short list cannot hoard the team's goals. */
export const UNLISTED_SHARE = 0.15;

/**
 * Splits a team's goals between its listed players. A player's open-play share is their non-penalty goals per
 * game (npGoalsPer90 × minutes) over the team's usual goals per game, so it does not depend on how complete the
 * sheet is; if the sheet would claim more than the open-play slice minus UNLISTED_SHARE, it is scaled down.
 * Penalties go to the taker(s).
 */
export function goalShares(players: Player[], teamGoalsPerGame: number): Map<string, number> {
  const weights = players.map((p) => p.npGoalsPer90 * Math.min(1, Math.max(0, p.expectedMinutes) / 90));
  const openPlay = 1 - PEN_SHARE - OWN_GOAL_SHARE;
  const raw = weights.map((w) => w / teamGoalsPerGame);
  const claimed = raw.reduce((s, x) => s + x, 0);
  const room = openPlay * (1 - UNLISTED_SHARE);
  const scale = claimed > room ? room / claimed : 1;
  const takers = players.filter((p) => p.penaltyTaker && p.expectedMinutes > 0);
  const shares = new Map<string, number>();
  players.forEach((p, i) => {
    const pen = p.penaltyTaker && p.expectedMinutes > 0 ? PEN_SHARE / takers.length : 0;
    shares.set(p.id, raw[i]! * scale + pen);
  });
  return shares;
}

/**
 * Anytime-scorer chances for one side. Team goals are Poisson given a sample's rate, so a player with share s
 * scores ~Poisson(rate · s) by thinning; averaging over samples carries the match uncertainty through, and a
 * strong or weak opponent moves every player's chance through the team rate.
 */
export function anytimeScorers(
  players: Player[],
  samples: RateSample[],
  side: "home" | "away",
  teamGoalsPerGame: number,
): ScorerProb[] {
  const shares = goalShares(players, teamGoalsPerGame);
  return players.map((p) => {
    const share = shares.get(p.id) ?? 0;
    const pAnytime = samples.reduce((s, r) => s + (1 - Math.exp(-r[side] * share)), 0) / samples.length;
    return { playerId: p.id, name: p.name, teamId: p.teamId, pAnytime, share };
  });
}

const POSITIONS = new Set<Position>(["FW", "AM", "MF", "DF", "GK"]);

function validate(p: Player, where: string): Player {
  getTeam(p.teamId);
  if (!p.id || !p.name) throw new Error(`${where}: player needs an id and a name`);
  if (!POSITIONS.has(p.position)) throw new Error(`${where}: bad position ${String(p.position)}`);
  if (!(p.npGoalsPer90 >= 0 && p.npGoalsPer90 < 3)) throw new Error(`${where}: npGoalsPer90 out of range`);
  if (!(p.expectedMinutes >= 0 && p.expectedMinutes <= 120)) throw new Error(`${where}: expectedMinutes out of range`);
  return p;
}

export function loadPlayers(json: unknown): Player[] {
  if (!Array.isArray(json)) throw new Error("Player data must be an array");
  return json.map((p, i) => validate(p as Player, `player ${i}`));
}

/** One CSV line into cells; double-quoted cells may contain commas, and "" inside them is a literal quote. */
function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]!;
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      cells.push(cell);
      cell = "";
    } else cell += ch;
  }
  cells.push(cell);
  return cells;
}

/** CSV with header id,name,teamId,position,npGoalsPer90,expectedMinutes,penaltyTaker (true/false or 1/0). */
export function parsePlayersCsv(csv: string): Player[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim() !== "");
  const header = lines.shift()?.split(",").map((h) => h.trim()) ?? [];
  const col = (name: string) => {
    const i = header.indexOf(name);
    if (i < 0 && name !== "penaltyTaker") throw new Error(`Player CSV is missing column ${name}`);
    return i;
  };
  const idx = {
    id: col("id"),
    name: col("name"),
    teamId: col("teamId"),
    position: col("position"),
    npGoalsPer90: col("npGoalsPer90"),
    expectedMinutes: col("expectedMinutes"),
    penaltyTaker: col("penaltyTaker"),
  };
  return lines.map((line, n) => {
    const cells = splitCsvLine(line).map((c) => c.trim());
    const pen = idx.penaltyTaker >= 0 ? (cells[idx.penaltyTaker] ?? "").toLowerCase() : "";
    return validate(
      {
        id: cells[idx.id] ?? "",
        name: cells[idx.name] ?? "",
        teamId: cells[idx.teamId] ?? "",
        position: (cells[idx.position] ?? "") as Position,
        npGoalsPer90: Number(cells[idx.npGoalsPer90]),
        expectedMinutes: Number(cells[idx.expectedMinutes]),
        penaltyTaker: pen === "true" || pen === "1",
      },
      `CSV row ${n + 2}`,
    );
  });
}
