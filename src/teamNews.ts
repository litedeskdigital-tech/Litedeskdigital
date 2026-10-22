import type { Player } from "./scorers";

/**
 * Team news for one match, already turned into what the model needs: each side's attack shift (log goal rate, for
 * this match only) and expected minutes for players on the sheet. Built from missing-player lists and confirmed
 * lineups (see data/sportradar.ts); holds no source data beyond counts, so it can be committed publicly.
 */
export type MatchNews = {
  homeAttack: number;
  awayAttack: number;
  /** Expected minutes by player id, for players the news changes; 0 = not playing. */
  minutes: Record<string, number>;
  homeOut: number;
  awayOut: number;
  /** True when at least one side's starting lineup was confirmed. */
  lineups: boolean;
  /** When the news was last updated (ISO UTC). */
  at: string;
};

export type NewsSummary = Pick<MatchNews, "homeOut" | "awayOut" | "homeAttack" | "awayAttack" | "lineups" | "at">;

/** Share of a missing player's goals the stand-in does not replace. */
export const REPLACEMENT_LOSS = 0.5;
/** Bounds on the net share of a side's goals the news can move. */
const MAX_LOSS = 0.6;
const MAX_GAIN = 0.2;
/** Nominal goals per game used to turn scoring rates into shares; only ratios matter here. */
const TEAM_GOALS = 1.5;
const STARTER_MINUTES = 80;
const BENCH_MINUTES = 20;

/** What is known about one side. `starters`/`squad` only when the lineup is confirmed (squad = starters + bench). */
export type SideNews = { out: Set<string>; doubtful: Set<string>; starters?: Set<string>; squad?: Set<string> };

function sideMinutes(players: Player[], news: SideNews): Map<string, number> {
  const out = new Map<string, number>();
  const confirmed = news.starters && news.starters.size > 0;
  for (const p of players) {
    let m = p.expectedMinutes;
    if (confirmed) {
      if (news.starters!.has(p.id)) m = Math.max(m, STARTER_MINUTES);
      else if (news.squad?.has(p.id)) m = Math.min(m, BENCH_MINUTES);
      else m = 0;
    } else if (news.out.has(p.id)) m = 0;
    else if (news.doubtful.has(p.id)) m = Math.round(m / 2);
    if (m !== p.expectedMinutes) out.set(p.id, m);
  }
  return out;
}

/** Net share of the side's goals lost (negative: gained) when minutes change, and players ruled out. */
function sideEffect(players: Player[], minutes: Map<string, number>): { attack: number; out: number } {
  let net = 0;
  let out = 0;
  for (const p of players) {
    const m = minutes.get(p.id);
    if (m === undefined) continue;
    if (m === 0) out += 1;
    const rate = (mins: number) => (p.npGoalsPer90 * Math.min(1, mins / 90)) / TEAM_GOALS;
    net += rate(p.expectedMinutes) - rate(m);
  }
  const lost = Math.min(MAX_LOSS, Math.max(-MAX_GAIN, net));
  return { attack: Math.log(1 - REPLACEMENT_LOSS * lost), out };
}

/** Team news for a match, or undefined when it changes nothing. */
export function buildNews(
  homePlayers: Player[],
  awayPlayers: Player[],
  home: SideNews,
  away: SideNews,
  at: string,
): MatchNews | undefined {
  const hm = sideMinutes(homePlayers, home);
  const am = sideMinutes(awayPlayers, away);
  const lineups = !!(home.starters?.size || away.starters?.size);
  if (!hm.size && !am.size && !lineups) return undefined;
  const h = sideEffect(homePlayers, hm);
  const a = sideEffect(awayPlayers, am);
  return {
    homeAttack: h.attack,
    awayAttack: a.attack,
    minutes: Object.fromEntries([...hm, ...am]),
    homeOut: h.out,
    awayOut: a.out,
    lineups,
    at,
  };
}

/** The player sheet with the news applied; players ruled out are dropped. */
export function applyNews(players: Player[], news: MatchNews): Player[] {
  return players.flatMap((p) => {
    const m = news.minutes[p.id];
    if (m === undefined) return [p];
    return m > 0 ? [{ ...p, expectedMinutes: m }] : [];
  });
}

export function newsSentence(home: string, away: string, news: MatchNews): string {
  const side = (name: string, out: number, attack: number) => {
    if (!out && Math.abs(attack) < 0.005) return "";
    const pct = Math.round((Math.exp(attack) - 1) * 100);
    return `${name} ${out} out${pct ? ` (attack ${pct > 0 ? "+" : "−"}${Math.abs(pct)}%)` : ""}`;
  };
  const parts = [side(home, news.homeOut, news.homeAttack), side(away, news.awayOut, news.awayAttack)].filter(Boolean);
  return ` Team news${news.lineups ? " (lineups confirmed)" : ""}: ${parts.length ? parts.join("; ") : "no key absences"}.`;
}
