import { makeRng } from "./engine";
import type { Gauss, MatchView } from "./ratings";

/**
 * Minute-by-minute match simulation for scenario analysis: who scores first and what follows, how the game flows
 * by half and by 15-minute block, and how often the favourite falls behind or lets a lead go. The headline
 * home/draw/away comes from the exact score grid (predict.ts); these simulations answer "how" questions the grid
 * cannot, and their own home/draw/away is reported only as a consistency check.
 */

export const SIMULATIONS = 5000;
const MINUTES = 90;

/**
 * Share of a team's goals scored in each 15-minute block. Goals come later in matches (tiring legs, chasing
 * teams): a typical top-flight split is about 45/55 between halves, rising through each half.
 */
export const BLOCK_SHARE = [0.14, 0.15, 0.16, 0.16, 0.18, 0.21];

/**
 * Game-state effect: a trailing side pushes and scores a little more, a leading side sits back and scores a
 * little less. Kept small: on real fixtures stronger values (1.10 / 0.92) pushed the simulated draw rate up to
 * 4 points above the score-grid model; these keep the two within about 3 points.
 */
export const TRAILING_BOOST = 1.04;
export const LEADING_DAMP = 0.97;

export type Tri = { home: number; draw: number; away: number };

export type ScenarioReport = {
  simulations: number;
  /** Home/draw/away from the simulations; should sit close to the exact numbers. */
  simulated: Tri;
  firstGoal: { home: number; away: number; none: number };
  /** Full-time outcome given who scored first. */
  ifHomeScoresFirst: Tri;
  ifAwayScoresFirst: Tri;
  /** Half-time / full-time, most likely first, e.g. "D/H" = level at half-time, home win. */
  htft: { key: string; p: number }[];
  /** Chance of at least one goal in each 15-minute block (0–15, …, 75–90). */
  goalInBlock: number[];
  /** Level at 75' and then won by either side. */
  lateWinner: number;
  /** The favourite (the side more likely to win) in trouble. */
  favourite: {
    side: "home" | "away";
    trailsAtSomePoint: number;
    trailsByTwo: number;
    winsAfterTrailing: number;
    /** Led at some point but did not win. */
    dropsLead: number;
    /** Chance to win in the simulations where it concedes first. */
    winsIfConcedesFirst: number;
  };
};

type Rng = () => number;

function gaussian(rng: Rng): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function draw(g: Gauss, rng: Rng): number {
  return g.m + Math.sqrt(Math.max(0, g.v)) * gaussian(rng);
}

const HTFT_KEYS = ["H/H", "H/D", "H/A", "D/H", "D/D", "D/A", "A/H", "A/D", "A/A"];

function outcome(h: number, a: number): "H" | "D" | "A" {
  return h > a ? "H" : h < a ? "A" : "D";
}

/** `favourite`: the side the exact model picks; the "trouble" numbers are reported for it. */
export function simulateScenarios(
  view: MatchView,
  favourite: "home" | "away",
  seed = 1,
  n = SIMULATIONS,
): ScenarioReport {
  const rng = makeRng(seed ^ 0x5eed);
  let ftH = 0;
  let ftD = 0;
  let ftA = 0;
  let firstH = 0;
  let firstA = 0;
  const afterHomeFirst = { home: 0, draw: 0, away: 0 };
  const afterAwayFirst = { home: 0, draw: 0, away: 0 };
  const htft = new Map<string, number>(HTFT_KEYS.map((k) => [k, 0]));
  const blockGoal = new Array<number>(BLOCK_SHARE.length).fill(0);
  let late = 0;
  // Per side: [trails at some point, trails by 2+, wins after trailing, led but did not win]
  const trouble = { home: [0, 0, 0, 0], away: [0, 0, 0, 0] };

  for (let i = 0; i < n; i += 1) {
    // One posterior draw of all four ratings per simulated match, as in the exact model.
    const lh = Math.exp(view.mu + view.homeEdge + draw(view.home.attack, rng) - draw(view.away.defence, rng));
    const la = Math.exp(view.mu + draw(view.away.attack, rng) - draw(view.home.defence, rng));
    let h = 0;
    let a = 0;
    let first: "home" | "away" | null = null;
    let htH = 0;
    let htA = 0;
    let at75: [number, number] = [0, 0];
    const flags = { home: [false, false, false], away: [false, false, false] }; // trailed, trailed by 2, led
    const blockHit = new Array<boolean>(BLOCK_SHARE.length).fill(false);

    for (let minute = 0; minute < MINUTES; minute += 1) {
      const block = Math.floor(minute / 15);
      const perMinute = BLOCK_SHARE[block]! / 15;
      const stateH = h < a ? TRAILING_BOOST : h > a ? LEADING_DAMP : 1;
      const stateA = a < h ? TRAILING_BOOST : a > h ? LEADING_DAMP : 1;
      const pH = lh * perMinute * stateH;
      const pA = la * perMinute * stateA;
      // At most one goal a minute; the rare double is assigned in proportion.
      const u = rng();
      if (u < pH) {
        h += 1;
        first ??= "home";
        blockHit[block] = true;
      } else if (u < pH + pA) {
        a += 1;
        first ??= "away";
        blockHit[block] = true;
      }
      if (h < a) flags.home[0] = true;
      if (a < h) flags.away[0] = true;
      if (a - h >= 2) flags.home[1] = true;
      if (h - a >= 2) flags.away[1] = true;
      if (h > a) flags.home[2] = true;
      if (a > h) flags.away[2] = true;
      if (minute === 44) {
        htH = h;
        htA = a;
      }
      if (minute === 74) at75 = [h, a];
    }

    const ft = outcome(h, a);
    if (ft === "H") ftH += 1;
    else if (ft === "D") ftD += 1;
    else ftA += 1;
    if (first === "home") {
      firstH += 1;
      afterHomeFirst[ft === "H" ? "home" : ft === "D" ? "draw" : "away"] += 1;
    } else if (first === "away") {
      firstA += 1;
      afterAwayFirst[ft === "H" ? "home" : ft === "D" ? "draw" : "away"] += 1;
    }
    const key = `${outcome(htH, htA)}/${ft}`;
    htft.set(key, htft.get(key)! + 1);
    blockHit.forEach((hit, b) => {
      if (hit) blockGoal[b]! += 1;
    });
    if (at75[0] === at75[1] && ft !== "D") late += 1;
    for (const side of ["home", "away"] as const) {
      const won = side === "home" ? ft === "H" : ft === "A";
      const [trailed, trailedBy2, led] = flags[side];
      const t = trouble[side];
      if (trailed) t[0]! += 1;
      if (trailedBy2) t[1]! += 1;
      if (trailed && won) t[2]! += 1;
      if (led && !won) t[3]! += 1;
    }
  }

  const tri = (x: { home: number; draw: number; away: number }, d: number): Tri =>
    d ? { home: x.home / d, draw: x.draw / d, away: x.away / d } : { home: 0, draw: 0, away: 0 };
  const side = favourite;
  const t = trouble[side];
  const concededFirst = side === "home" ? afterAwayFirst : afterHomeFirst;
  const concededFirstN = side === "home" ? firstA : firstH;
  return {
    simulations: n,
    simulated: { home: ftH / n, draw: ftD / n, away: ftA / n },
    firstGoal: { home: firstH / n, away: firstA / n, none: (n - firstH - firstA) / n },
    ifHomeScoresFirst: tri(afterHomeFirst, firstH),
    ifAwayScoresFirst: tri(afterAwayFirst, firstA),
    htft: [...htft].map(([key, c]) => ({ key, p: c / n })).sort((x, y) => y.p - x.p),
    goalInBlock: blockGoal.map((c) => c / n),
    lateWinner: late / n,
    favourite: {
      side,
      trailsAtSomePoint: t[0]! / n,
      trailsByTwo: t[1]! / n,
      winsAfterTrailing: t[2]! / n,
      dropsLead: t[3]! / n,
      winsIfConcedesFirst: concededFirstN ? concededFirst[side] / concededFirstN : 0,
    },
  };
}
