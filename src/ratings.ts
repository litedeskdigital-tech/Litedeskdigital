import { byDate, isPlayed, LEAGUE_COUNTRY, type Match, type Score } from "./data/types";

const COVERED_COUNTRIES = new Set(Object.values(LEAGUE_COUNTRY));

/** A Gaussian belief: mean and variance. */
export type Gauss = { m: number; v: number };

export type TeamState = {
  attack: Gauss;
  defence: Gauss;
  /** Date of the last match folded in; the variance grows with the time since. */
  last: string;
  country: string;
  games: number;
};

/** Exponentially decayed goal totals per competition; their ratio is the competition's goal base and home edge. */
export type CompState = { home: number; away: number; n: number; last: string };

/**
 * Settings the model learns by walk-forward tuning (see tune.ts) rather than having them set by hand.
 * `version` goes up each time tuning adopts a new set.
 */
export type Params = {
  version: number;
  /** Rating variance added per day without a match: how fast form can drift. */
  driftPerDay: number;
  /** Variance of a club's rating when it first appears: how little the hierarchy prior is trusted. */
  initVar: number;
  /** Dixon–Coles low-score dependence. */
  rho: number;
  /** A club new to a league starts this far below that league's average (newly promoted sides are weaker). */
  newcomerOffset: number;
  /** Prior mean of the league offset for countries with no domestic data (their clubs mostly qualify from smaller leagues). */
  foreignPrior: number;
  /** Prior variance of a country's league offset: how unsure the model starts about one league against another. */
  leagueVar: number;
  /** League-offset variance added per day: how fast a league's level can drift. */
  leagueDriftPerDay: number;
  /** The winner's goals are capped at max(goalCap, loser + 1) before updating, so a rout does not over-move ratings. */
  goalCap: number;
  /** Half-life in days of the per-competition goal totals. */
  compHalfLifeDays: number;
  tunedAt?: string;
};

export const DEFAULT_PARAMS: Params = {
  version: 1,
  driftPerDay: 0.0001,
  initVar: 0.06,
  rho: -0.07,
  newcomerOffset: 0.15,
  foreignPrior: -0.25,
  leagueVar: 0.1,
  leagueDriftPerDay: 0.00001,
  goalCap: 3,
  compHalfLifeDays: 365,
};

/**
 * When a match has expected goals, the filter learns from this mix of goals and xG instead of goals alone: xG is the
 * less noisy measure of how the game went, goals are what counts. Not tuned (xG only covers recent UEFA matches).
 */
export const XG_WEIGHT = 0.5;

/** Pseudo-matches pulling a competition's goal base toward the global default until it has data. */
const COMP_PSEUDO = 30;
const DEFAULT_HOME_GOALS = 1.55;
const DEFAULT_AWAY_GOALS = 1.2;
/** Leagues need this many rated clubs before their average is trusted as a prior for newcomers. */
const MIN_LEAGUE_CLUBS = 8;

/** A country's league offset: added to the attack and defence of every club from it in cross-border matches. */
export type LeagueState = Gauss & { last: string };

export type State = {
  asOf: string;
  teams: Record<string, TeamState>;
  comps: Record<string, CompState>;
  leagues: Record<string, LeagueState>;
};

export function emptyState(): State {
  return { asOf: "", teams: {}, comps: {}, leagues: {} };
}

function days(from: string, to: string): number {
  if (!from) return 0;
  return Math.max(0, (Date.parse(to) - Date.parse(from)) / 86_400_000);
}

export function capScore(score: Score, cap: number): Score {
  const { home, away } = score;
  if (home > away) return { home: Math.min(home, Math.max(cap, away + 1)), away };
  if (away > home) return { home, away: Math.min(away, Math.max(cap, home + 1)) };
  return { home, away };
}

/** Log goal base (away rate) and log home edge for a competition, learned from its own results. */
export function compRates(state: State, comp: string, date: string, params: Params): { mu: number; home: number } {
  const c = state.comps[comp];
  const decay = c ? Math.pow(0.5, days(c.last, date) / params.compHalfLifeDays) : 0;
  const n = (c?.n ?? 0) * decay;
  const h = (c?.home ?? 0) * decay;
  const a = (c?.away ?? 0) * decay;
  const homeRate = (h + COMP_PSEUDO * DEFAULT_HOME_GOALS) / (n + COMP_PSEUDO);
  const awayRate = (a + COMP_PSEUDO * DEFAULT_AWAY_GOALS) / (n + COMP_PSEUDO);
  return { mu: Math.log(awayRate), home: Math.log(homeRate / awayRate) };
}

/** A club with this many matches counts as established when judging whether its league is up and running. */
const ESTABLISHED_GAMES = 10;

/**
 * Team level of the hierarchy: a club's rating is its league's offset plus its own deviation. A club new to an
 * established covered league starts at the average deviation there minus the newcomer offset; clubs present when
 * a league's data begins, and clubs from countries without domestic data, start at their compatriots' average
 * (0 when there are none), leaving the level to the league offset.
 */
function priorMean(state: State, country: string, params: Params): number {
  let sum = 0;
  let n = 0;
  let established = 0;
  for (const t of Object.values(state.teams)) {
    if (t.country !== country) continue;
    sum += (t.attack.m + t.defence.m) / 2;
    n += 1;
    if (t.games >= ESTABLISHED_GAMES) established += 1;
  }
  if (COVERED_COUNTRIES.has(country)) {
    return established >= MIN_LEAGUE_CLUBS ? sum / n - params.newcomerOffset : 0;
  }
  return n > 0 ? sum / n : 0;
}

/** League level of the hierarchy: covered leagues start level at 0, others at foreignPrior; both drift slowly. */
export function leagueAt(state: State, country: string, date: string, params: Params): LeagueState {
  const l = state.leagues[country];
  if (!l) return { m: COVERED_COUNTRIES.has(country) ? 0 : params.foreignPrior, v: params.leagueVar, last: date };
  return { ...l, v: Math.min(params.leagueVar, l.v + params.leagueDriftPerDay * days(l.last, date)) };
}

/** The club's belief as of `date`: created from the hierarchy prior if new, variance grown for time off. */
export function teamAt(state: State, id: string, country: string, date: string, params: Params): TeamState {
  const t = state.teams[id];
  if (!t) {
    const m = priorMean(state, country, params);
    return { attack: { m, v: params.initVar }, defence: { m, v: params.initVar }, last: date, country, games: 0 };
  }
  const grow = params.driftPerDay * days(t.last, date);
  // Cap at the prior variance: a club long unseen is no less known than a brand-new one.
  return {
    ...t,
    attack: { m: t.attack.m, v: Math.min(params.initVar, t.attack.v + grow) },
    defence: { m: t.defence.m, v: Math.min(params.initVar, t.defence.v + grow) },
  };
}

/**
 * One Poisson observation y ~ Poisson(exp(base + Σ c·x)) over Gaussian beliefs x: a Laplace (extended Kalman) step
 * on the linear predictor, shared back onto each term in proportion to its variance. Cross-covariances are dropped.
 */
function poissonStep(base: number, terms: { g: Gauss; c: number }[], y: number): Gauss[] {
  let s2 = 0;
  let eta = base;
  for (const { g, c } of terms) {
    s2 += c * c * g.v;
    eta += c * g.m;
  }
  const lam = Math.exp(eta);
  const k = 1 / (1 + s2 * lam);
  const resid = (y - lam) * k;
  return terms.map(({ g, c }) => ({ m: g.m + c * g.v * resid, v: g.v - c * c * g.v * g.v * lam * k }));
}

function plus(a: Gauss, b: Gauss): Gauss {
  return { m: a.m + b.m, v: a.v + b.v };
}

/** Ratings as they bear on one match: league offsets folded in when the clubs come from different countries. */
export type MatchView = {
  home: TeamState;
  away: TeamState;
  mu: number;
  homeEdge: number;
};

function withLeague(t: TeamState, l: LeagueState | undefined): TeamState {
  return l ? { ...t, attack: plus(t.attack, l), defence: plus(t.defence, l) } : t;
}

/** Everything a prediction needs for this match, as of its date, without changing the state. */
export function viewMatch(
  state: State,
  m: Pick<Match, "home" | "away" | "comp" | "date" | "neutral">,
  countries: Record<string, string>,
  params: Params,
): MatchView {
  const { mu, home } = compRates(state, m.comp, m.date, params);
  const hc = countries[m.home] ?? "";
  const ac = countries[m.away] ?? "";
  // Offsets cancel between compatriots, so they only enter cross-border matches.
  const cross = hc !== ac;
  return {
    home: withLeague(teamAt(state, m.home, hc, m.date, params), cross ? leagueAt(state, hc, m.date, params) : undefined),
    away: withLeague(teamAt(state, m.away, ac, m.date, params), cross ? leagueAt(state, ac, m.date, params) : undefined),
    mu,
    homeEdge: m.neutral ? 0 : home,
  };
}

/** Folds one played match into the state (in place). */
export function rateMatch(state: State, m: Match & { ft: Score }, countries: Record<string, string>, params: Params): void {
  const { mu, home: edge } = compRates(state, m.comp, m.date, params);
  const hc = countries[m.home] ?? "";
  const ac = countries[m.away] ?? "";
  const th = teamAt(state, m.home, hc, m.date, params);
  const ta = teamAt(state, m.away, ac, m.date, params);
  const capped = capScore(m.ft, params.goalCap);
  const y = m.xg
    ? { home: (1 - XG_WEIGHT) * capped.home + XG_WEIGHT * m.xg.home, away: (1 - XG_WEIGHT) * capped.away + XG_WEIGHT * m.xg.away }
    : capped;
  const base = m.neutral ? mu : mu + edge;

  if (hc !== ac) {
    // Cross-border: the result also teaches the two league offsets, so every club in each league moves with them.
    let lh = leagueAt(state, hc, m.date, params);
    let la = leagueAt(state, ac, m.date, params);
    const [ha, ad, lh1, la1] = poissonStep(base, [{ g: th.attack, c: 1 }, { g: ta.defence, c: -1 }, { g: lh, c: 1 }, { g: la, c: -1 }], y.home);
    const [aa, hd, la2, lh2] = poissonStep(mu, [{ g: ta.attack, c: 1 }, { g: th.defence, c: -1 }, { g: la1!, c: 1 }, { g: lh1!, c: -1 }], y.away);
    lh = { ...lh2!, last: m.date };
    la = { ...la2!, last: m.date };
    state.leagues[hc] = lh;
    state.leagues[ac] = la;
    state.teams[m.home] = { ...th, attack: ha!, defence: hd!, last: m.date, games: th.games + 1 };
    state.teams[m.away] = { ...ta, attack: aa!, defence: ad!, last: m.date, games: ta.games + 1 };
  } else {
    const [ha, ad] = poissonStep(base, [{ g: th.attack, c: 1 }, { g: ta.defence, c: -1 }], y.home);
    const [aa, hd] = poissonStep(mu, [{ g: ta.attack, c: 1 }, { g: th.defence, c: -1 }], y.away);
    state.teams[m.home] = { ...th, attack: ha!, defence: hd!, last: m.date, games: th.games + 1 };
    state.teams[m.away] = { ...ta, attack: aa!, defence: ad!, last: m.date, games: ta.games + 1 };
  }

  const c = state.comps[m.comp];
  const decay = c ? Math.pow(0.5, days(c.last, m.date) / params.compHalfLifeDays) : 0;
  state.comps[m.comp] = {
    home: (c?.home ?? 0) * decay + m.ft.home,
    away: (c?.away ?? 0) * decay + m.ft.away,
    n: (c?.n ?? 0) * decay + 1,
    last: m.date,
  };
  if (m.date > state.asOf) state.asOf = m.date;
}

/**
 * Runs the filter over every played match in date order. `before` sees each match with the state as it stood
 * beforehand — that is what walk-forward scoring and the prediction log use, so no result leaks into its own forecast.
 */
export function runFilter(
  matches: Match[],
  countries: Record<string, string>,
  params: Params,
  before?: (m: Match & { ft: Score }, state: State) => void,
  after?: (m: Match & { ft: Score }, state: State) => void,
): State {
  const state = emptyState();
  for (const m of [...matches].sort(byDate)) {
    if (!isPlayed(m)) continue;
    before?.(m, state);
    rateMatch(state, m, countries, params);
    after?.(m, state);
  }
  return state;
}

/**
 * Strength on one scale across leagues (league offset included): expected goal difference per game against a
 * zero-rated club at a neutral venue.
 */
export function strength(state: State, id: string, mu: number): number {
  const t = state.teams[id]!;
  const l = state.leagues[t.country];
  const off = l?.m ?? 0;
  return Math.exp(mu + t.attack.m + off) - Math.exp(mu - t.defence.m - off);
}
