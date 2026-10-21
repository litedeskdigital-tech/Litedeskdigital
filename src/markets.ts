/** Full-time markets derived from a 90-minute score grid (grid[home][away]). */

export type FullTime = { home: number; draw: number; away: number };
export type ScoreProb = { home: number; away: number; p: number };
export type Confidence = "High" | "Medium" | "Low";

export type MarginKey = "home3+" | "home2" | "home1" | "draw" | "away1" | "away2" | "away3+";
export type MarginBand = { key: MarginKey; label: string; p: number };

export type WinnerPick = {
  side: "home" | "away";
  teamId: string;
  /** Chance the picked side wins in 90 minutes. */
  pWin: number;
  /** Chance the picked side does not lose (win or draw). */
  pNotLose: number;
  /** Win chance with the draw voided: pWin / (pHome + pAway). */
  pDrawNoBet: number;
  /** 5th–95th percentile of pWin across the rating posterior. */
  pWinCi: [number, number];
  /** Most likely winning margin for the picked side, given that it wins. */
  likelyMargin: 1 | 2 | 3;
  confidence: Confidence;
  /**
   * pWin clears HIGH_PROBABILITY and even the low end of its interval clears HIGH_PROBABILITY_FLOOR: the pick is a
   * genuine favourite the model is sure about, not a lean that only looks strong on a shaky rating.
   */
  isHighProbability: boolean;
};

/** A favourite needs at least this 90-minute win chance to count as a high-probability pick. */
export const HIGH_PROBABILITY = 0.6;
/** ...and the 5th percentile of that chance must be at least this. */
export const HIGH_PROBABILITY_FLOOR = 0.45;
const MEDIUM_PROBABILITY = 0.45;

export function fullTime(grid: number[][]): FullTime {
  let home = 0;
  let draw = 0;
  let away = 0;
  grid.forEach((row, h) =>
    row.forEach((p, a) => {
      if (h > a) home += p;
      else if (h === a) draw += p;
      else away += p;
    }),
  );
  return { home, draw, away };
}

export function marginBands(grid: number[][], homeName: string, awayName: string): MarginBand[] {
  const p: Record<MarginKey, number> = {
    "home3+": 0,
    home2: 0,
    home1: 0,
    draw: 0,
    away1: 0,
    away2: 0,
    "away3+": 0,
  };
  grid.forEach((row, h) =>
    row.forEach((q, a) => {
      const d = h - a;
      if (d >= 3) p["home3+"] += q;
      else if (d === 2) p.home2 += q;
      else if (d === 1) p.home1 += q;
      else if (d === 0) p.draw += q;
      else if (d === -1) p.away1 += q;
      else if (d === -2) p.away2 += q;
      else p["away3+"] += q;
    }),
  );
  return [
    { key: "home3+", label: `${homeName} by 3+`, p: p["home3+"] },
    { key: "home2", label: `${homeName} by 2`, p: p.home2 },
    { key: "home1", label: `${homeName} by 1`, p: p.home1 },
    { key: "draw", label: "Draw", p: p.draw },
    { key: "away1", label: `${awayName} by 1`, p: p.away1 },
    { key: "away2", label: `${awayName} by 2`, p: p.away2 },
    { key: "away3+", label: `${awayName} by 3+`, p: p["away3+"] },
  ];
}

export function confidenceOf(pWin: number): Confidence {
  if (pWin >= HIGH_PROBABILITY) return "High";
  if (pWin >= MEDIUM_PROBABILITY) return "Medium";
  return "Low";
}

/** Always names a team: the side more likely to win in 90 minutes, with how sure the model is. */
export function pickWinner(
  ft: FullTime,
  bands: MarginBand[],
  homeId: string,
  awayId: string,
  ci: { home: [number, number]; away: [number, number] },
): WinnerPick {
  const side = ft.home >= ft.away ? "home" : "away";
  const pWin = side === "home" ? ft.home : ft.away;
  const pWinCi = side === "home" ? ci.home : ci.away;
  const byKey = new Map(bands.map((b) => [b.key, b.p]));
  const margins: [1 | 2 | 3, number][] = [
    [1, byKey.get(`${side}1`) ?? 0],
    [2, byKey.get(`${side}2`) ?? 0],
    [3, byKey.get(`${side}3+`) ?? 0],
  ];
  margins.sort((x, y) => y[1] - x[1]);
  return {
    side,
    teamId: side === "home" ? homeId : awayId,
    pWin,
    pNotLose: pWin + ft.draw,
    pDrawNoBet: pWin / (ft.home + ft.away),
    pWinCi,
    likelyMargin: margins[0]![0],
    confidence: confidenceOf(pWin),
    isHighProbability: pWin >= HIGH_PROBABILITY && pWinCi[0] >= HIGH_PROBABILITY_FLOOR,
  };
}

export function topScores(grid: number[][], n = 5): ScoreProb[] {
  const scores: ScoreProb[] = [];
  grid.forEach((row, h) => row.forEach((p, a) => scores.push({ home: h, away: a, p })));
  return scores.sort((x, y) => y.p - x.p).slice(0, n);
}

export function goalsMarkets(grid: number[][]): { pOver25: number; pBtts: number } {
  let pOver25 = 0;
  let pBtts = 0;
  grid.forEach((row, h) =>
    row.forEach((p, a) => {
      if (h + a > 2) pOver25 += p;
      if (h > 0 && a > 0) pBtts += p;
    }),
  );
  return { pOver25, pBtts };
}
