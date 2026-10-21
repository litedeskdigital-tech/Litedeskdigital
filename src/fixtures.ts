import { getTeam, type Stage } from "./teams";

export type Score = { home: number; away: number };

export type Fixture = {
  id: string;
  stage: Stage;
  /** League-phase matchday (1–8); omitted for knockout rounds. */
  matchday?: number;
  /** Knockout leg; a one-off match (the final) has none. */
  leg?: 1 | 2;
  homeId: string;
  awayId: string;
  /** Neutral venue: home edge is switched off (the final). */
  neutral?: boolean;
  venue: string;
  dateLabel: string;
  result?: Score;
  /** Leg-1 score, home team of leg 1 first; needed to price a second leg. */
  firstLeg?: Score;
};

export function isKnockout(fixture: Pick<Fixture, "stage">): boolean {
  return fixture.stage !== "league";
}

function league(matchday: number, dateLabel: string, homeId: string, awayId: string, result?: Score): Fixture {
  return {
    id: `md${matchday}-${homeId}-${awayId}`,
    stage: "league",
    matchday,
    homeId,
    awayId,
    venue: getTeam(homeId).city,
    dateLabel,
    result,
  };
}

const MD1 = "Matchday 1 · 8–10 Sep 2026";
const MD2 = "Matchday 2 · 13–14 Oct 2026";

/**
 * League-phase fixtures with results. Scores were collected from UEFA page snapshots that do not fully
 * agree with each other, so treat them as provisional and check them against uefa.com before relying on them.
 */
export const FIXTURES: Fixture[] = [
  league(1, MD1, "club-brugge", "aston-villa", { home: 2, away: 3 }),
  league(1, MD1, "dortmund", "villarreal", { home: 3, away: 2 }),
  league(1, MD1, "porto", "man-city", { home: 0, away: 2 }),
  league(1, MD1, "lille", "real-betis", { home: 2, away: 3 }),
  league(1, MD1, "real-madrid", "inter", { home: 2, away: 1 }),
  league(1, MD1, "barcelona", "feyenoord", { home: 5, away: 1 }),
  league(1, MD1, "stuttgart", "viking", { home: 3, away: 1 }),
  league(1, MD1, "liverpool", "atletico-madrid", { home: 2, away: 1 }),
  league(1, MD1, "napoli", "arsenal", { home: 0, away: 1 }),
  league(2, MD2, "lens", "sporting", { home: 0, away: 2 }),
  league(2, MD2, "sabah", "slavia-praha", { home: 2, away: 0 }),
  league(2, MD2, "arsenal", "lille", { home: 3, away: 0 }),
  league(2, MD2, "atletico-madrid", "man-united", { home: 2, away: 0 }),
  league(2, MD2, "inter", "club-brugge", { home: 3, away: 4 }),
  league(2, MD2, "galatasaray", "barcelona", { home: 1, away: 4 }),
  league(2, MD2, "leipzig", "psv", { home: 1, away: 0 }),
  league(2, MD2, "viking", "bayern", { home: 3, away: 3 }),
  league(2, MD2, "villarreal", "napoli", { home: 3, away: 1 }),
  league(2, MD2, "feyenoord", "como", { home: 3, away: 2 }),
  league(2, MD2, "lask", "liverpool", { home: 3, away: 6 }),
  league(2, MD2, "roma", "real-madrid", { home: 3, away: 4 }),
];

export function playedFixtures(fixtures: Fixture[] = FIXTURES): Fixture[] {
  return fixtures.filter((f) => f.result !== undefined);
}

export function upcomingFixtures(fixtures: Fixture[] = FIXTURES): Fixture[] {
  return fixtures.filter((f) => f.result === undefined);
}
