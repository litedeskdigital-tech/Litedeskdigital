import type { AppData, AppFixture, AppResult, AppTeam, RecordSummary } from "../../src/appData";
import "./style.css";

/** The data changes every 30 minutes; the page checks for a new file every 5 minutes and when it regains focus. */
const POLL_MS = 5 * 60 * 1000;
/** UEFA's club competitions, listed first and marked with their own colour. */
const UEFA = ["cl", "el", "ecl"];
const compClass = (comp: string) => (UEFA.includes(comp) ? ` ${comp}` : "");
const DATA_URL = "./data/app.json";

let data: AppData | null = null;
let filter = "all";
let tab = "fixtures";
const open = new Set<string>();

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function when(f: { kickoff?: string; date: string; localTime?: string }): string {
  if (f.kickoff) {
    return new Date(f.kickoff).toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }
  const day = new Date(`${f.date}T12:00:00Z`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  return f.localTime ? `${day}, ${f.localTime} local` : day;
}

function ago(iso: string): string {
  const mins = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (mins < 60) return `${Math.max(0, mins)} min ago`;
  const h = Math.round(mins / 60);
  return h < 48 ? `${h} h ago` : new Date(iso).toLocaleDateString();
}

function badge(t: Pick<AppTeam, "abbr" | "color" | "markFg">): string {
  return `<span class="badge" style="--c:${esc(t.color)};--f:${esc(t.markFg)}">${esc(t.abbr)}</span>`;
}

function bar(h: number, d: number, a: number, label = "Full-time probabilities"): string {
  return `<div class="bar" role="img" aria-label="${label}: home ${pct(h)}, draw ${pct(d)}, away ${pct(a)}">
    <span class="h" style="flex:${h}">${h >= 0.12 ? pct(h) : ""}</span><span class="d" style="flex:${d}">${d >= 0.12 ? pct(d) : ""}</span><span class="a" style="flex:${a}">${a >= 0.12 ? pct(a) : ""}</span>
  </div>`;
}

function movement(f: AppFixture): string {
  if (!f.first) return "";
  const now = f.prediction.winner.side === "home" ? f.prediction.fullTime.home : f.prediction.fullTime.away;
  const was = f.prediction.winner.side === "home" ? f.first.pHome : f.first.pAway;
  const delta = Math.round((now - was) * 100);
  if (Math.abs(delta) < 1) return `<span class="muted">unchanged since first call</span>`;
  return `<span class="${delta > 0 ? "up" : "down"}">${delta > 0 ? "▲" : "▼"} ${Math.abs(delta)} pts since first call (${esc(f.first.at)})</span>`;
}

function teamRow(t: AppTeam, ci?: [number, number]): string {
  return `<div class="team">${badge(t)}<span class="name">${esc(t.short)}</span>${ci ? `<span class="muted small" title="90% range of this side's win chance">win ${pct(ci[0])}–${pct(ci[1])}</span>` : ""}</div>`;
}

function ratingTable(f: AppFixture): string {
  const row = (label: string, h: string, a: string) => `<tr><th scope="row">${label}</th><td>${h}</td><td>${a}</td></tr>`;
  const sign = (x: number) => `${x >= 0 ? "+" : ""}${x.toFixed(2)}`;
  return `<table class="kv"><thead><tr><th></th><th>${esc(f.home.short)}</th><th>${esc(f.away.short)}</th></tr></thead><tbody>
    ${row("Strength (goal diff / game)", `${sign(f.home.strength)} ± ${f.home.strengthSd.toFixed(2)}`, `${sign(f.away.strength)} ± ${f.away.strengthSd.toFixed(2)}`)}
    ${row("Attack", sign(f.home.attack), sign(f.away.attack))}
    ${row("Defence", sign(f.home.defence), sign(f.away.defence))}
    ${row("Matches rated", String(f.home.games), String(f.away.games))}
    ${row("Expected goals", f.prediction.xgHome.toFixed(2), f.prediction.xgAway.toFixed(2))}
  </tbody></table>`;
}

function report(f: AppFixture): string {
  const p = f.prediction;
  const s = p.scenarios;
  const fav = s.favourite.side === "home" ? f.home.short : f.away.short;
  const blocks = ["0–15", "15–30", "30–45", "45–60", "60–75", "75–90"];
  return `<div class="report">
    <p>${esc(p.commentary)}</p>
    <h4>Ratings</h4>
    ${ratingTable(f)}
    <h4>Margins</h4>
    <ul class="bars">${p.margins.map((m) => `<li><span>${esc(m.label)}</span><i style="width:${Math.round(m.p * 100)}%"></i><b>${pct(m.p)}</b></li>`).join("")}</ul>
    <h4>Most likely scores</h4>
    <p>${p.topScores.map((x) => `${x.home}–${x.away} <span class="muted">${pct(x.p)}</span>`).join(" · ")}</p>
    <p class="muted">Over 2.5 goals ${pct(p.pOver25)} · Both teams score ${pct(p.pBtts)}${p.pHomeAdvance !== undefined ? ` · ${esc(f.home.short)} go through ${pct(p.pHomeAdvance)}` : ""}</p>
    <h4>Scenarios <span class="muted small">(${s.simulations.toLocaleString()} minute-by-minute simulations)</span></h4>
    <table class="kv"><tbody>
      <tr><th scope="row">Scores first</th><td>${esc(f.home.short)} ${pct(s.firstGoal.home)} · none ${pct(s.firstGoal.none)} · ${esc(f.away.short)} ${pct(s.firstGoal.away)}</td></tr>
      <tr><th scope="row">If ${esc(f.home.short)} score first</th><td>H ${pct(s.ifHomeScoresFirst.home)} · D ${pct(s.ifHomeScoresFirst.draw)} · A ${pct(s.ifHomeScoresFirst.away)}</td></tr>
      <tr><th scope="row">If ${esc(f.away.short)} score first</th><td>H ${pct(s.ifAwayScoresFirst.home)} · D ${pct(s.ifAwayScoresFirst.draw)} · A ${pct(s.ifAwayScoresFirst.away)}</td></tr>
      <tr><th scope="row">${esc(fav)} (favourite) risks</th><td>trails ${pct(s.favourite.trailsAtSomePoint)} · trails by 2 ${pct(s.favourite.trailsByTwo)} · drops a lead ${pct(s.favourite.dropsLead)} · wins after conceding first ${pct(s.favourite.winsIfConcedesFirst)}</td></tr>
      <tr><th scope="row">Half-time / full-time</th><td>${s.htft.slice(0, 3).map((x) => `${x.key} ${pct(x.p)}`).join(" · ")}</td></tr>
      <tr><th scope="row">Late winner (level at 75')</th><td>${pct(s.lateWinner)}</td></tr>
    </tbody></table>
    <ul class="bars">${s.goalInBlock.map((g, i) => `<li><span>Goal ${blocks[i]}'</span><i style="width:${Math.round(g * 100)}%"></i><b>${pct(g)}</b></li>`).join("")}</ul>
    ${p.anytimeScorers.length ? `<h4>Anytime scorers</h4><p>${p.anytimeScorers.map((x) => `${esc(x.name)} <span class="muted">${pct(x.pAnytime)}</span>`).join(" · ")}</p>` : ""}
  </div>`;
}

function fixtureCard(f: AppFixture): string {
  const p = f.prediction;
  const w = p.winner;
  const pickName = w.side === "home" ? f.home.short : f.away.short;
  const isOpen = open.has(f.id);
  return `<article class="card${compClass(f.comp)}">
    <div class="meta"><span class="comp">${esc(f.compName)}</span><time>${esc(when(f))}</time></div>
    <div class="teams">${teamRow(f.home, p.pHomeCi)}${teamRow(f.away, p.pAwayCi)}</div>
    ${bar(p.fullTime.home, p.fullTime.draw, p.fullTime.away)}
    <div class="pick">
      <span><b>${esc(pickName)} ${pct(w.pWin)}</b> <span class="muted small">(${pct(w.pWinCi[0])}–${pct(w.pWinCi[1])})</span>${w.isHighProbability ? ` <span class="star" title="High-probability pick: ≥60% and the low end of the range ≥45%">★ High probability</span>` : ""}</span>
      <span class="muted">${esc(p.mostLikelyMargin.label)} · ${esc(p.mostLikelyScore)}</span>
    </div>
    <div class="extra">
      ${p.bonusScorer ? `<span>⚽ ${esc(p.bonusScorer.name)} ${pct(p.bonusScorer.pAnytime)}</span>` : ""}
      <span>${movement(f)}</span>
    </div>
    <button class="more" aria-expanded="${isOpen}" data-id="${esc(f.id)}">${isOpen ? "Hide" : "Pre-match"} report</button>
    ${isOpen ? report(f) : ""}
  </article>`;
}

function resultCard(r: AppResult): string {
  const c = r.call;
  const pick = c ? (c.pickTeamId === r.home.id ? r.home.short : r.away.short) : "";
  return `<article class="card result${compClass(r.comp)}">
    <div class="meta"><span class="comp">${esc(r.compName)}</span><time>${esc(when(r))}</time></div>
    <div class="score">
      <span class="team">${badge(r.home)}<span class="name">${esc(r.home.short)}</span></span>
      <b>${r.score.home} – ${r.score.away}</b>
      <span class="team right"><span class="name">${esc(r.away.short)}</span>${badge(r.away)}</span>
    </div>
    ${
      c
        ? `${bar(c.pHome, c.pDraw, c.pAway, "Pre-match call")}
           <p class="${c.hit ? "hit" : "miss"}">${c.hit ? "✓ Called" : "✗ Missed"}: picked ${esc(pick)} ${pct(c.pWin)}${c.latestHit !== undefined && c.latestHit !== c.hit ? ` (latest call ${c.latestHit ? "✓" : "✗"})` : ""}</p>
           ${c.miss ? `<p class="muted small">${esc(c.miss)}</p>` : ""}`
        : `<p class="muted small">Not predicted before kick-off.</p>`
    }
  </article>`;
}

function recordCard(title: string, r: RecordSummary): string {
  if (!r.n) return `<div class="stat"><h3>${title}</h3><p class="muted">No scored predictions yet.</p></div>`;
  return `<div class="stat"><h3>${title}</h3>
    <p class="big">${pct(r.accuracy)}</p><p class="muted">results called · ${r.n} games</p>
    <p>Log loss <b>${r.logLoss.toFixed(3)}</b> <span class="muted small">(1.099 = guessing)</span></p>
    <p>High-probability picks won <b>${r.highProbN ? pct(r.highProbWon / r.highProbN) : "–"}</b> <span class="muted small">(${r.highProbWon}/${r.highProbN})</span></p>
    ${r.latestN ? `<p>Latest-call log loss <b>${r.latestLogLoss.toFixed(3)}</b> <span class="muted small">(${r.latestN} games)</span></p>` : ""}
  </div>`;
}

function renderModel(d: AppData): string {
  // Older feeds (before the Europa and Conference League were added) have no el/ecl records.
  const uefa = (
    [
      ["Champions League", d.record.cl],
      ["Europa League", d.record.el],
      ["Conference League", d.record.ecl],
    ] as const
  ).filter(([, r]) => r && r.n > 0);
  return `<div class="grid">${uefa.map(([t, r]) => recordCard(t, r!)).join("")}${recordCard("All competitions", d.record.all)}</div>
    ${
      d.record.calibration.length
        ? `<h3>Calibration</h3><table class="kv"><thead><tr><th>Predicted band</th><th>Average predicted</th><th>Happened</th><th>n</th></tr></thead><tbody>
      ${d.record.calibration.map((b) => `<tr><td>${b.band}</td><td>${pct(b.predicted)}</td><td>${pct(b.happened)}</td><td>${b.n}</td></tr>`).join("")}</tbody></table>`
        : ""
    }
    <h3>Learning</h3>
    <p>Settings v${d.paramsVersion}${d.tunedAt ? `, tuned ${esc(d.tunedAt)}` : ""}. Ratings include results up to ${esc(d.ratingsAsOf)}.</p>
    ${d.learning ? `<p class="muted">${esc(d.learning.at)}: ${esc(d.learning.kind)}, ${esc(d.learning.reason)}</p>` : ""}
    <h3>League strength</h3>
    <ul class="bars">${d.leagues.map((l) => `<li><span>${esc(l.country)}</span><i style="width:${Math.max(2, Math.round((l.offset + 0.5) * 100))}%"></i><b>${l.offset >= 0 ? "+" : ""}${l.offset.toFixed(2)}</b></li>`).join("")}</ul>`;
}

function renderFilters(d: AppData): void {
  const comps = new Map<string, string>();
  for (const x of [...d.fixtures, ...d.results]) comps.set(x.comp, x.compName);
  const rank = (c: string) => UEFA.indexOf(c) >>> 0;
  const chips = [["all", "All"], ...[...comps].sort((a, b) => rank(a[0]) - rank(b[0]) || a[1].localeCompare(b[1]))];
  $("filters").hidden = tab === "model";
  $("filters").innerHTML = chips
    .map(([code, name]) => `<button class="chip" aria-pressed="${filter === code}" data-comp="${esc(code!)}">${esc(name!)}</button>`)
    .join("");
}

function render(): void {
  if (!data) return;
  const d = data;
  $("status").textContent = `Updated ${ago(d.generatedAt)} · next refresh ~${new Date(d.nextRefresh).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
  renderFilters(d);
  const keep = <T extends { comp: string }>(xs: T[]) => xs.filter((x) => filter === "all" || x.comp === filter);
  const fx = keep(d.fixtures);
  const rs = keep(d.results);
  $("fixtures").innerHTML = fx.length
    ? fx.map(fixtureCard).join("")
    : `<p class="empty">No fixtures in the next 48 hours${filter === "all" ? "" : " for this competition"}.</p>`;
  $("results").innerHTML = rs.length
    ? rs.map(resultCard).join("")
    : `<p class="empty">No results in the last 24 hours${filter === "all" ? "" : " for this competition"}. Domestic results can arrive a day or two late from the open sources.</p>`;
  $("model").innerHTML = renderModel(d);
  for (const id of ["fixtures", "results", "model"]) $(id).hidden = id !== tab;
  document.querySelectorAll<HTMLButtonElement>("[data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === tab)));
}

async function load(): Promise<void> {
  try {
    const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const next = (await res.json()) as AppData;
    if (!data || next.generatedAt !== data.generatedAt) data = next;
    render();
  } catch (err) {
    if (!data) $("status").textContent = `Could not load predictions (${String(err)}). Retrying…`;
  }
}

document.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>("[data-tab],[data-comp],[data-id]");
  if (!el) return;
  if (el.dataset.tab) tab = el.dataset.tab;
  else if (el.dataset.comp) filter = el.dataset.comp;
  else if (el.dataset.id) {
    if (open.has(el.dataset.id)) open.delete(el.dataset.id);
    else open.add(el.dataset.id);
  }
  render();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") void load();
});
setInterval(() => void load(), POLL_MS);
setInterval(render, 60 * 1000);
void load();
