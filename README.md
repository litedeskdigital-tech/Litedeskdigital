# Champions League match model

TypeScript port of the RLWC Maher model to football, for the UEFA Champions League (men's).

- `src/teams.ts`: club registry with hand-set Elo priors (approximate; replace with a real source).
- `src/fixtures.ts`: fixture/result types and the league-phase results collected so far (**provisional**, check against uefa.com).
- `src/posterior.ts`: Elo → attack/defence priors, plus `fitRatings`, a ridge MAP refit on played results (winner's goals capped, home edge fixed).
- `src/predict.ts`: `generatePrediction` gives home/draw/away, expected goals, over 2.5, both teams to score, top scorelines and the goal-difference distribution. Goals are Dixon–Coles corrected Poisson, averaged over form and pace shocks. Knockout ties also get `pHomeAdvance`, for leg 1 (simulating both legs), leg 2 (from the first-leg score) and a neutral final, including extra time and penalties.

```ts
import { FIXTURES, fitRatings, generatePrediction } from "./src";

const ratings = fitRatings(FIXTURES);
const p = generatePrediction({
  homeId: "liverpool", awayId: "real-madrid", stage: "league",
  venue: "Liverpool", dateLabel: "Matchday 3", ratings, seed: 1,
});
```

```sh
npm install
npm run typecheck
npm test
```
