/**
 * Club-name matching across sources that spell clubs differently ("B. Dortmund", "Galatasaray" vs
 * "Galatasaray SK"). A name matches a candidate when every one of its tokens matches one of the candidate's.
 */

const NOISE = new Set(["fc", "cf", "afc", "sc", "sk", "fk", "ac", "as", "ssc", "rc", "cd", "rcd", "ud", "sd", "kv", "vfb", "vfl", "tsg", "sv", "bv", "osc", "pae", "sl", "nk", "gnk", "bsc", "club", "de", "del", "of", "the", "and", "1"]);

/** Abbreviations that are not prefixes of the full word. */
const SYNONYMS: Record<string, string> = { utd: "united" };

export function tokens(name: string): string[] {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t && !NOISE.has(t))
    .map((t) => SYNONYMS[t] ?? t);
}

/** A token matches a candidate's tokens if it equals it, is a prefix of it ("b" → "borussia", "man" → "manchester"), or abbreviates a run of ours ("cp" → "clube portugal"). */
export function tokenMatches(t: string, ours: string[]): boolean {
  if (ours.some((o) => o === t || o.startsWith(t))) return true;
  if (t.length >= 2) {
    for (let i = 0; i + t.length <= ours.length; i += 1) {
      if (ours.slice(i, i + t.length).map((o) => o[0]).join("") === t) return true;
    }
  }
  return false;
}

/** `inCl`: the club has Champions League matches in the database, which settles e.g. "Paris" → PSG, not Paris FC. */
export type TeamRef = { id: string; name: string; country: string; inCl: boolean };

/**
 * The single best candidate for `name` in `country`: every token of `name` matched, clubs with Champions League
 * history preferred, then the candidate with fewest unmatched tokens. Null when nothing matches or two tie.
 */
export function bestMatch(name: string, country: string, candidates: TeamRef[]): string | null {
  const ut = tokens(name);
  if (!ut.length) return null;
  const sameCountry = candidates.filter((o) => o.country === country);
  const pool = (list: TeamRef[]) =>
    list
      .map((o) => {
        const ot = tokens(o.name);
        const hit = ut.filter((t) => tokenMatches(t, ot)).length;
        return { id: o.id, ok: hit === ut.length, extra: ot.length - hit };
      })
      .filter((x) => x.ok)
      .sort((x, y) => x.extra - y.extra);
  const fromCl = pool(sameCountry.filter((o) => o.inCl));
  const scored = fromCl.length ? fromCl : pool(sameCountry);
  const best = scored[0];
  if (!best || (scored[1] && scored[1].extra === best.extra)) return null;
  return best.id;
}
