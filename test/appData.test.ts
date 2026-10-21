import { describe, expect, it } from "vitest";
import { buildAppData } from "../src/appData";
import { runCycle } from "../src/learn";
import { DEFAULT_PARAMS } from "../src/ratings";
import { countries, ids, m, model, season } from "./helpers";

describe("app data feed", () => {
  const past = season();
  const now = "2026-03-05T12:00:00Z";
  const soon = { ...m("cl", "2026-03-05", ids[0]!, ids[4]!), kickoff: "2026-03-05T20:00:00Z" };
  const later = { ...m("en.1", "2026-03-06", ids[1]!, ids[2]!), localTime: "15:00" };
  const tooFar = { ...m("cl", "2026-03-10", ids[3]!, ids[5]!), kickoff: "2026-03-10T20:00:00Z" };
  const started = { ...m("cl", "2026-03-05", ids[6]!, ids[7]!), kickoff: "2026-03-05T11:00:00Z" };
  const finished = { ...m("cl", "2026-03-04", ids[2]!, ids[6]!, 2, 1), kickoff: "2026-03-04T20:00:00Z" };
  const old = { ...m("cl", "2026-03-01", ids[3]!, ids[7]!, 0, 0), kickoff: "2026-03-01T20:00:00Z" };
  const matches = [...past, soon, later, tooFar, started, finished, old];
  const fitted = model(past);
  const log = runCycle({ matches: [...past, soon], countries, params: DEFAULT_PARAMS, log: [], events: [], today: "2026-03-05", now: "2026-03-05T06:00:00Z", noTune: true }).log;
  const d = buildAppData({ matches, log, events: [], model: fitted, params: DEFAULT_PARAMS, now });

  it("lists fixtures in the next 48 hours, Champions League first, not ones already started", () => {
    expect(d.fixtures.map((f) => f.id)).toEqual([soon.id, later.id]);
    expect(d.fixtures[0]!.compName).toBe("Champions League");
    expect(d.fixtures[0]!.first?.at).toBe("2026-03-05");
    expect(d.fixtures[0]!.prediction.scenarios.simulations).toBe(5000);
    expect(d.fixtures[0]!.home.games).toBeGreaterThan(0);
  });

  it("lists results from the last 24 hours only", () => {
    expect(d.results.map((r) => r.id)).toEqual([finished.id]);
    expect(d.results[0]!.score).toEqual({ home: 2, away: 1 });
  });

  it("schedules the next refresh six hours on", () => {
    expect(d.nextRefresh).toBe("2026-03-05T18:00:00.000Z");
  });
});
