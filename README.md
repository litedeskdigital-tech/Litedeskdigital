# Champions League match model

Predicts UEFA Champions League (men's) matches: the full-time result, the high-probability winning team, winning-margin bands and an anytime goalscorer bonus pick.

## Pipeline

```
Elo priors ─┐
            ├─ fitRatings (ridge MAP) ─ attack/defence ─┐
results ────┘                                           │
                                                        ▼
                       simulateMatch: 400 form/pace draws × Dixon–Coles score grid
                                   │                         │
                         90-minute score grid         per-draw team scoring rates
                                   │                         │
            fullTime · winner pick · margin bands     anytime scorers (Poisson thinning)
            top scores · xG · O2.5 · BTTS · tie odds         │
                                   └──────── Prediction ─────┘
```

| Module | Role |
|---|---|
| `src/teams.ts` | Club registry with hand-set Elo priors (approximate; replace with a real source). |
| `src/fixtures.ts` | Fixture and result types, plus the league-phase results so far (**provisional**: check against uefa.com). |
| `src/posterior.ts` | Elo → attack/defence priors; `fitRatings` refits on results (winner's goals capped, home edge fixed). |
| `src/engine.ts` | `simulateMatch`: averages the score grid over shocks; prices two-legged ties and finals, including extra time and penalties. |
| `src/markets.ts` | Full-time 1X2, `pickWinner`, margin bands, top scores, goals markets. |
| `src/scorers.ts` | Player sheet type, CSV/JSON loaders, goal shares, anytime-scorer chances. |
| `src/predict.ts` | `generatePrediction`: assembles everything into one `Prediction`. |
| `src/evaluate.ts` | `backtest`: walk-forward log loss, Brier score and pick accuracy. |

## Outputs

- **Full-time result**: `fullTime = { home, draw, away }` for 90 minutes. Knockout ties also get `pHomeAdvance`.
- **High-probability winning team**: `winner` always names the more likely winner, with:
  - `pWin`, `pNotLose` and `pDrawNoBet` (win chance with the draw voided);
  - `likelyMargin`, the most likely margin if that side wins;
  - `confidence`;
  - `isHighProbability`, true only when `pWin ≥ 0.60`, so a 45% lean is never presented as a banker.
- **Margin**: `margins` has seven bands, from home by 3+ through draw to away by 3+, plus `mostLikelyMargin`, `mostLikelyScore` and `topScores`.
- **Bonus goalscorer**: `bonusScorer` is the highest anytime chance on either sheet; `anytimeScorers` lists the top six.
  - A player's share of team goals = (non-penalty goals per 90 × expected minutes) ÷ the team's usual goals per game. The named penalty taker also gets the 10% of team goals that come from penalties.
  - Unlisted players always keep at least 15% of open-play goals, and own goals are 3% of team goals.
  - Against a strong defence, the team's scoring rate drops, and every player's chance drops with it.
  - With no player sheet loaded, there is no pick, and `scorerNote` says why.

## Player data

Player stats are not bundled. Load a sheet:

```csv
id,name,teamId,position,npGoalsPer90,expectedMinutes,penaltyTaker
...,...,arsenal,FW,0.55,85,true
```

```ts
import { FIXTURES, fitRatings, generatePrediction, parsePlayersCsv } from "./src";

const p = generatePrediction({
  homeId: "liverpool", awayId: "real-madrid", stage: "league",
  venue: "Liverpool", dateLabel: "Matchday 3",
  ratings: fitRatings(FIXTURES),
  players: parsePlayersCsv(csvText),
  seed: 1,
});
p.winner;      // { teamId: "liverpool", pWin: 0.47, isHighProbability: false, ... }
p.margins;     // [{ label: "Liverpool by 3+", p: ... }, ...]
p.bonusScorer; // { name, pAnytime, ... } once a sheet is loaded
```

`npGoalsPer90` usually comes from domestic-league stats, while team rates are on a Champions League scale, so a player's share is a ratio of the two. Set `expectedMinutes` to 0 for injured or suspended players.

```sh
npm install
npm run typecheck
npm test
```
