# Champions League match model

Predicts UEFA Champions League (men's) matches: the full-time result, a high-probability winning team, winning-margin bands and an anytime goalscorer bonus pick. It learns every night from open data: all Champions League results since 2023/24, plus seven domestic leagues.

The latest numbers are in [REPORT.md](REPORT.md): the live record, the walk-forward backtest, calibration, recent misses, upcoming predictions and ratings.

## How it learns

```
openfootball ──► data/matches.json ──► rating filter ──► model/state.json ──► predictions (next 10 days)
 (CL + 7 leagues)   (kept forever)        (every result)                            │ frozen in
                                                ▲                                     ▼ data/predictions.json
                                                │                               results arrive
            model/params.json ◄── walk-forward tuning ◄── calibration check ◄── scored + misses reviewed
                                (adopted only if better)  (lasting slip, or every 60 days)
```

1. **Data.** Every night the importers fetch every published openfootball file from 2023/24 to the current season:
   - Champions League: `champions-league/<season>/cl.txt`;
   - domestic leagues: `football.json/<season>/<league>.json` for England, Spain, Germany, Italy, France, Portugal and the Netherlands.

   New seasons are picked up automatically. Stored matches are never dropped, so the database only grows.

   The 2026/27 Champions League isn't on openfootball yet, so `data/manual/cl-2026-27.txt` holds hand-entered **provisional** results in the same format. It's ignored automatically once openfootball publishes that season.
2. **Ratings: a dynamic hierarchical Bayesian model.**
   - Each club has an attack and a defence belief: a mean and a variance.
   - Each country has a league offset, shared by all its clubs in cross-border games. Domestic games teach relative strength within a league; Champions League games move whole leagues.
   - Every result updates the beliefs through a Kalman-style Poisson filter (an extended Kalman / Laplace step).
   - Uncertainty grows with time off, so form can drift.
   - New and promoted clubs start from their league's level.
   - Goal rates and home edges are learned separately for each competition.
3. **Predictions.**
   - **Score probabilities** come from a Dixon–Coles score grid, averaged over 400 draws from the rating posterior.
   - **Ranges:** every win chance comes with a 90% credible interval.
   - **High-probability flag:** set only when the win chance is ≥ 60% and the low end of its range is ≥ 45%.
   - **Ties and finals:** knockout ties are priced over both legs, and finals at a neutral venue, including extra time and penalties.
4. **Frozen log.** Each upcoming fixture is predicted once and written to `data/predictions.json` before kick-off. It's never rewritten, so the live record is honest.
5. **Scoring and miss reviews.** When a result arrives, the frozen prediction is scored (log loss and hit). Each miss is classified as an upset, a coin flip, a missed draw or a wrongly called draw, and explained with how far the result moved both clubs' ratings.
6. **Learning from every result, not just misses.** The ratings learn from all results through the filter. The tunable settings, listed in `model/params.json`, change only when the evidence says so:
   - **Triggers:** re-tuning runs when the last 200 scored predictions are worse than the model's own expected log loss by more than 2 standard errors, or every 60 days.
   - **Adoption:** a new parameter set is adopted only if it beats the current one walk-forward.
   - **Record:** every decision is written to `data/learning-log.json`.

   A model that changes itself after every miss overreacts: a 70% favourite should still lose 3 times in 10.

## Player stats and the bonus scorer

Every night, `src/data/uefa.ts` reads UEFA's public Champions League player statistics (`compstats.uefa.com`), for this season and last season, and writes `data/players.csv`.

- **Scoring rate:** non-penalty goals per 90. Last season counts at half weight, and the rate is shrunk toward a position prior, so a hot week can't make anyone a 1.3-a-game striker.
- **Expected minutes:** this season's minutes per club match.
- **Penalty taker:** each club's top penalty scorer.
- **Club matching:** UEFA club names are matched to the database by country and name, preferring clubs with Champions League history. Clubs that can't be matched safely are listed in `data/uefa-teams.json`, never guessed. Add `"<uefa team id>": "<our team id>"` to `data/manual/uefa-team-aliases.json` to fix one by hand.
- **Requests:** about 10 per night, with an identifying user agent. A failed fetch keeps the previous sheet.
- **Limits:** only Champions League minutes and goals are counted (domestic form isn't), and injuries aren't known.
- **Terms:** UEFA's terms restrict automated collection of its data; the repo owner has accepted that risk. Run `npm run update -- --no-uefa` to skip the import.

## Running

```sh
npm install
npm run typecheck
npm test
npm run update                                 # fetch, learn, score, maybe re-tune, predict, write REPORT.md
npm run update -- --today 2026-10-21 --no-tune # replay a date; results after it are ignored
npm run update -- --offline DIR                # read saved openfootball files instead of fetching
```

`.github/workflows/nightly.yml` runs the update at 04:17 UTC every day and commits `data/`, `model/` and `REPORT.md` straight to `main`. It can also be started by hand from the Actions tab.

## Using the model in code

```ts
import { generatePrediction, parsePlayersCsv, type Model } from "./src";

const p = generatePrediction({
  match: { home: "liverpool-fc", away: "real-madrid-cf", comp: "cl", date: "2026-11-04", stage: "league" },
  model,                         // { state, params, countries } from model/*.json
  players: parsePlayersCsv(csv), // optional: enables the anytime-scorer pick
  seed: 1,
});
p.fullTime;    // { home, draw, away } over 90 minutes
p.pHomeCi;     // 90% range of the home win chance
p.winner;      // pick, pWin, pWinCi, likelyMargin, isHighProbability
p.margins;     // home by 3+ … away by 3+
p.bonusScorer; // once a player sheet is loaded
```

Team ids are slugs of openfootball names (`teamId("Liverpool FC") === "liverpool-fc"`).

## Modules

| Module | Role |
|---|---|
| `src/data/openfootball.ts` | Season discovery, fetching, and parsers for both openfootball formats. |
| `src/data/db.ts` | Merging sources: open data beats provisional rows, played beats unplayed. |
| `src/ratings.ts` | The hierarchical rating filter, per-competition goal rates, and the tunable `Params`. |
| `src/engine.ts` | Posterior sampling, the Dixon–Coles grid, credible intervals, two-legged ties. |
| `src/markets.ts` | Full time, winner pick, margin bands, scorelines. |
| `src/scorers.ts` | Player sheets and anytime-scorer chances. |
| `src/predict.ts` | Assembles one `Prediction`. |
| `src/tune.ts` | Walk-forward scoring and coordinate-descent tuning. |
| `src/learn.ts` | The nightly cycle: frozen log, scoring, miss reviews, drift check, re-tune, predict ahead. |
| `src/report.ts` | Writes REPORT.md. |

## Limits

- **Data:** only openfootball is used. There are no betting odds, xG, lineups or injuries, so the model can't see late team news.
- **Player stats:** none are bundled; the scorer pick needs a sheet you supply.
- **Data lag:** openfootball domestic results usually lag by a few days, and Champions League 2026/27 depends on the provisional file until it's published.
- **Accuracy ceiling:** even with perfect ratings, football 1X2 log loss stays around 0.8–0.9. Treat the probabilities as calibrated odds, not certainties.
