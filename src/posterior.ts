import type { Fixture } from "./fixtures";
import { getTeam, TEAMS } from "./teams";

/**
 * Champions League goal base. Recent league phases average close to 3 goals a game, about 1.64 for the
 * home side and 1.36 away, so the away rate is the base and the home edge is the log ratio.
 */
export const UCL_MU = Math.log(1.36);
export const UCL_H = Math.log(1.64 / 1.36);

/** Reference Elo of an average league-phase side. */
export const ELO_REF = 1800;
/** Log-goal points per Elo point, split evenly over attack and defence: 100 Elo is a ~64% neutral expected score. */
export const ELO_TO_LOG = 0.0025;

/** Ridge weight pulling each rating back to its Elo prior; a game carries about a tenth of the prior's weight. */
export const RIDGE = 12;
/**
 * The winner's goals are capped before fitting at GOAL_CAP or one more than the loser's, whichever is higher,
 * so a 6-0 counts like 3-0 and a 6-3 like 4-3: the result survives, and one rout moves a rating by ~0.2 at most.
 */
export const GOAL_CAP = 3;
const FIT_ITERATIONS = 60;

/** Log attack and log defence per club. Higher defence means fewer goals conceded. */
export type TeamRating = { attack: number; defence: number };
export type Ratings = Record<string, TeamRating>;

export function capScore(score: { home: number; away: number }): { home: number; away: number } {
  const { home, away } = score;
  if (home > away) return { home: Math.min(home, Math.max(GOAL_CAP, away + 1)), away };
  if (away > home) return { home, away: Math.min(away, Math.max(GOAL_CAP, home + 1)) };
  return { home, away };
}

export function priorFromElo(elo: number): TeamRating {
  const half = ELO_TO_LOG * (elo - ELO_REF);
  return { attack: half, defence: half };
}

export const PRIOR_RATINGS: Ratings = Object.fromEntries(
  TEAMS.map((team) => [team.id, priorFromElo(team.elo)]),
);

export function ratingFor(id: string, ratings: Ratings = PRIOR_RATINGS): TeamRating {
  return ratings[id] ?? priorFromElo(getTeam(id).elo);
}

export function homeEdge(neutral: boolean): number {
  return neutral ? 0 : UCL_H;
}

/** Expected goals for each side before any form or pace shock. */
export function expectedGoals(
  homeId: string,
  awayId: string,
  neutral: boolean,
  ratings: Ratings = PRIOR_RATINGS,
): { home: number; away: number } {
  const h = ratingFor(homeId, ratings);
  const a = ratingFor(awayId, ratings);
  return {
    home: Math.exp(UCL_MU + homeEdge(neutral) + h.attack - a.defence),
    away: Math.exp(UCL_MU + a.attack - h.defence),
  };
}

/**
 * Ridge MAP of Maher attack/defence on played fixtures, centred on the Elo priors. Diagonal Newton steps
 * on a Poisson likelihood; the home edge stays fixed so a lopsided home win is read as strength, not venue.
 */
export function fitRatings(fixtures: Fixture[], priors: Ratings = PRIOR_RATINGS): Ratings {
  const played = fixtures.filter((f) => f.result !== undefined);
  const ratings: Ratings = {};
  const prior = (id: string) => priors[id] ?? priorFromElo(getTeam(id).elo);
  for (const f of played) {
    for (const id of [f.homeId, f.awayId]) ratings[id] ??= { ...prior(id) };
  }

  for (let iter = 0; iter < FIT_ITERATIONS; iter += 1) {
    const grad: Record<string, TeamRating> = {};
    const hess: Record<string, TeamRating> = {};
    for (const id of Object.keys(ratings)) {
      const p = prior(id);
      const r = ratings[id]!;
      grad[id] = { attack: -RIDGE * (r.attack - p.attack), defence: -RIDGE * (r.defence - p.defence) };
      hess[id] = { attack: RIDGE, defence: RIDGE };
    }
    for (const f of played) {
      const lam = expectedGoals(f.homeId, f.awayId, f.neutral ?? false, ratings);
      const { home: gHome, away: gAway } = capScore(f.result!);
      grad[f.homeId]!.attack += gHome - lam.home;
      grad[f.awayId]!.defence -= gHome - lam.home;
      grad[f.awayId]!.attack += gAway - lam.away;
      grad[f.homeId]!.defence -= gAway - lam.away;
      hess[f.homeId]!.attack += lam.home;
      hess[f.awayId]!.defence += lam.home;
      hess[f.awayId]!.attack += lam.away;
      hess[f.homeId]!.defence += lam.away;
    }
    for (const id of Object.keys(ratings)) {
      const r = ratings[id]!;
      r.attack += grad[id]!.attack / hess[id]!.attack;
      r.defence += grad[id]!.defence / hess[id]!.defence;
    }
  }

  return { ...priors, ...ratings };
}

/** Single-number live strength: expected goal difference per game against an average side at a neutral venue. */
export function liveStrength(id: string, ratings: Ratings = PRIOR_RATINGS): number {
  const r = ratingFor(id, ratings);
  return Math.exp(UCL_MU + r.attack) - Math.exp(UCL_MU - r.defence);
}
