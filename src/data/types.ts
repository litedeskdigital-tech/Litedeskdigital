import type { Stage } from "../teams";

export type Score = { home: number; away: number };

/** Competition codes: "cl" for the Champions League, openfootball league codes ("en.1", "es.1", …) otherwise. */
export type Comp = string;

export type Match = {
  /** comp/season/stage/home-v-away: stable across reschedules, unique per ordered pair and stage. */
  id: string;
  comp: Comp;
  /** "2025-26" style season label. */
  season: string;
  /** ISO date (YYYY-MM-DD), local to the match. */
  date: string;
  /** Kick-off as an ISO UTC timestamp, when the source gives one (UEFA does). */
  kickoff?: string;
  /** Local kick-off time ("20:45") from sources without a time zone (openfootball). */
  localTime?: string;
  stage: Stage;
  matchday?: number;
  leg?: 1 | 2;
  home: string;
  away: string;
  neutral?: boolean;
  /** 90-minute score; absent for fixtures not yet played. The model learns from this (and xg, when present). */
  ft?: Score;
  /**
   * Expected goals from licensed match stats (Sportradar). Held in memory only: it is attached from the private
   * cache before learning and never written to the public data files.
   */
  xg?: Score;
  /** Score after extra time and the shoot-out, when a knockout went that far. */
  aet?: Score;
  pens?: Score;
  /** Entered by hand from unverified sources; replaced as soon as an open source carries the match. */
  provisional?: boolean;
  source: string;
};

/** Country of each covered domestic league; used to seed ratings for clubs first seen there. */
export const LEAGUE_COUNTRY: Record<string, string> = {
  "en.1": "ENG",
  "es.1": "ESP",
  "de.1": "GER",
  "it.1": "ITA",
  "fr.1": "FRA",
  "pt.1": "POR",
  "nl.1": "NED",
  // Leagues of regular Champions League clubs; openfootball has these from 2024-25 (Austria from 2023-24).
  "at.1": "AUT",
  "be.1": "BEL",
  "tr.1": "TUR",
  "sco.1": "SCO",
  "gr.1": "GRE",
};

export const DOMESTIC_LEAGUES = Object.keys(LEAGUE_COUNTRY);

export function matchId(comp: Comp, season: string, stage: Stage, home: string, away: string): string {
  return `${comp}/${season}/${stage}/${home}-v-${away}`;
}

export function isPlayed(m: Match): m is Match & { ft: Score } {
  return m.ft !== undefined;
}

/** Chronological, with id as a tiebreak so runs are reproducible. */
export function byDate(a: Match, b: Match): number {
  return a.date < b.date ? -1 : a.date > b.date ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}
