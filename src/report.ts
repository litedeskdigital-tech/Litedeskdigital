import type { CycleOutput, LoggedPrediction } from "./learn";
import { compRates, strength, type Params } from "./ratings";
import { getTeam } from "./teams";
import type { WalkForward } from "./tune";

const pct = (p: number) => `${Math.round(p * 100)}%`;
const f3 = (x: number) => x.toFixed(3);

function name(id: string): string {
  try {
    return getTeam(id).shortName;
  } catch {
    return id;
  }
}

function summary(scored: LoggedPrediction[]): string {
  if (!scored.length) return "No scored predictions yet.";
  const n = scored.length;
  const ll = scored.reduce((s, p) => s + p.logLoss!, 0) / n;
  const hits = scored.filter((p) => p.hit).length;
  const hp = scored.filter((p) => p.pick.isHighProbability);
  const hpWins = hp.filter((p) => {
    const r = p.result!;
    return p.pick.side === "home" ? r.home > r.away : r.away > r.home;
  }).length;
  const latest = scored.filter((p) => p.latest?.logLoss !== undefined);
  return [
    `- Scored predictions: ${n}; log loss ${f3(ll)} (1.099 = guessing); most-likely outcome right ${pct(hits / n)}`,
    `- High-probability picks: ${hp.length}, won ${hp.length ? pct(hpWins / hp.length) : "–"} (they average ${hp.length ? pct(hp.reduce((s, p) => s + p.pick.pWin, 0) / hp.length) : "–"} predicted)`,
    ...(latest.length
      ? [`- Latest refreshed call (last update before kick-off): log loss ${f3(latest.reduce((s, p) => s + p.latest!.logLoss!, 0) / latest.length)} over ${latest.length} games`]
      : []),
  ].join("\n");
}

function calibration(scored: LoggedPrediction[]): string {
  const bins = Array.from({ length: 5 }, () => ({ p: 0, o: 0, n: 0 }));
  for (const s of scored) {
    const r = s.result!;
    const outs: [number, boolean][] = [
      [s.pHome, r.home > r.away],
      [s.pDraw, r.home === r.away],
      [s.pAway, r.away > r.home],
    ];
    for (const [p, happened] of outs) {
      const b = bins[Math.min(4, Math.floor(p * 5))]!;
      b.p += p;
      b.o += happened ? 1 : 0;
      b.n += 1;
    }
  }
  const rows = bins
    .map((b, i) => (b.n ? `| ${i * 20}–${i * 20 + 20}% | ${pct(b.p / b.n)} | ${pct(b.o / b.n)} | ${b.n} |` : ""))
    .filter(Boolean);
  return rows.length ? ["| Predicted band | Mean predicted | Happened | n |", "|---|---|---|---|", ...rows].join("\n") : "";
}

function wf(w: WalkForward): string {
  return `all ${w.all.n} matches log loss ${f3(w.all.logLoss)}, accuracy ${pct(w.all.accuracy)}; Champions League ${w.cl.n} matches log loss ${f3(w.cl.logLoss)}, accuracy ${pct(w.cl.accuracy)}`;
}

const UEFA = ["cl", "el", "ecl"];
const UEFA_NAMES: Record<string, string> = { cl: "Champions League", el: "Europa League", ecl: "Conference League" };

/** Scenario view for UEFA club-competition fixtures: how the 5,000 simulated games unfold. */
function scenarioTable(preds: CycleOutput["upcoming"]): string {
  if (!preds.length) return "";
  const rows = preds.map((p) => {
    const s = p.scenarios;
    const f = s.favourite;
    const fav = f.side === "home" ? p.homeShort : p.awayShort;
    const blocks = s.goalInBlock.map((x) => pct(x)).join(" ");
    return `| ${p.homeShort} v ${p.awayShort} | ${pct(s.firstGoal.home)} / ${pct(s.firstGoal.none)} / ${pct(s.firstGoal.away)} | ${fav}: ${pct(f.winsIfConcedesFirst)} | ${pct(f.trailsAtSomePoint)} / ${pct(f.trailsByTwo)} | ${pct(f.dropsLead)} | ${s.htft[0]!.key} ${pct(s.htft[0]!.p)}, ${s.htft[1]!.key} ${pct(s.htft[1]!.p)} | ${pct(s.lateWinner)} | ${blocks} |`;
  });
  return [
    "### UEFA club-competition scenarios (5,000 minute-by-minute simulations each)",
    "",
    "| Match | First goal H / none / A | Favourite wins after conceding first | Favourite trails / trails by 2 | Favourite drops a lead | Likeliest HT/FT | Late winner (level at 75') | Goal in each 15' block |",
    "|---|---|---|---|---|---|---|---|",
    ...rows,
  ].join("\n");
}

export function renderReport(out: CycleOutput, today: string, backtest: WalkForward, params: Params, sources: string[], notes: string[] = []): string {
  const scored = out.log.filter((p) => p.logLoss !== undefined);
  const misses = scored.filter((p) => p.miss).sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 12);
  const cl = compRates(out.state, "cl", today, params);
  const top = Object.entries(out.state.teams)
    .filter(([, t]) => t.games >= 10)
    .map(([id, t]) => ({ id, s: strength(out.state, id, cl.mu), sd: Math.sqrt((t.attack.v + t.defence.v) / 2 + (out.state.leagues[t.country]?.v ?? 0)) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 20);
  const rank = (c: string) => UEFA.indexOf(c) >>> 0;
  const upcoming = [...out.upcoming].sort((a, b) => rank(a.comp) - rank(b.comp) || (a.date < b.date ? -1 : 1));
  const byComp = UEFA.map((c) => [UEFA_NAMES[c]!, scored.filter((p) => p.comp === c)] as const).filter(([, ps]) => ps.length > 0);
  const lastEvent = [...out.events].reverse().find((e) => e.kind !== "drift-check");

  return `# Model report

Generated ${today}. Ratings include results up to ${out.state.asOf}. Parameter set v${params.version}${params.tunedAt ? ` (tuned ${params.tunedAt})` : ""}.

Sources: ${sources.join(", ")}.
${notes.length ? `\n${notes.map((n) => `- ${n}`).join("\n")}\n` : ""}
## Live record (predictions frozen before kick-off)

${summary(scored)}

${byComp.map(([n, ps]) => `${n} only:\n\n${summary(ps)}`).join("\n\n")}

${calibration(scored)}

## Walk-forward backtest (all history)

${wf(backtest)}

## Learning

${lastEvent ? `- Last tuning check ${lastEvent.at}: ${lastEvent.kind} — ${lastEvent.reason}` : "- No tuning run yet."}
- Settings: drift ${params.driftPerDay}/day, prior variance ${params.initVar}, Dixon–Coles ρ ${params.rho}, newcomer offset ${params.newcomerOffset}, foreign prior ${params.foreignPrior}, goal cap ${params.goalCap}, competition half-life ${params.compHalfLifeDays} days

## Recent misses

${misses.length ? misses.map((p) => `- ${p.date} ${name(p.home)} v ${name(p.away)} (${p.comp}): ${p.miss!.explanation}`).join("\n") : "None yet."}

## Upcoming (next days)

${upcoming.length ? ["| Date | Comp | Match | H / D / A | Pick | Margin | Score | Bonus scorer |", "|---|---|---|---|---|---|---|---|", ...upcoming.map((p) => `| ${p.date} | ${p.comp} | ${p.homeShort} v ${p.awayShort} | ${pct(p.fullTime.home)} / ${pct(p.fullTime.draw)} / ${pct(p.fullTime.away)} | ${name(p.winner.teamId)} ${pct(p.winner.pWin)} (${pct(p.winner.pWinCi[0])}–${pct(p.winner.pWinCi[1])})${p.winner.isHighProbability ? " ★" : ""} | ${p.mostLikelyMargin.label} | ${p.mostLikelyScore} | ${p.bonusScorer ? `${p.bonusScorer.name} ${pct(p.bonusScorer.pAnytime)}` : "–"} |`)].join("\n") : "No fixtures in the horizon."}

${scenarioTable(upcoming.filter((p) => UEFA.includes(p.comp)))}

★ = high-probability pick (≥60% and the low end of its range ≥45%).

## League offsets (shared by every club from the country in cross-border games)

| Country | Offset | ± |
|---|---|---|
${Object.entries(out.state.leagues).sort((a, b) => b[1].m - a[1].m).slice(0, 12).map(([c, l]) => `| ${c || "?"} | ${l.m >= 0 ? "+" : ""}${l.m.toFixed(2)} | ${Math.sqrt(l.v).toFixed(2)} |`).join("\n")}

## Strongest clubs (expected goal difference per game vs a zero-rated side)

| Club | Strength | ± |
|---|---|---|
${top.map((t) => `| ${getTeam(t.id).name} | ${t.s >= 0 ? "+" : ""}${t.s.toFixed(2)} | ${t.sd.toFixed(2)} |`).join("\n")}
`;
}
