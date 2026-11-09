# Model report

Generated 2026-11-09. Ratings include results up to 2026-11-05. Parameter set v3 (tuned 2026-10-21).

Sources: openfootball cl 2023-24, openfootball cl 2024-25, openfootball cl 2025-26, openfootball en.1 2023-24, openfootball es.1 2023-24, openfootball de.1 2023-24, openfootball it.1 2023-24, openfootball fr.1 2023-24, openfootball pt.1 2023-24, openfootball nl.1 2023-24, openfootball at.1 2023-24, openfootball en.1 2024-25, openfootball es.1 2024-25, openfootball de.1 2024-25, openfootball it.1 2024-25, openfootball fr.1 2024-25, openfootball pt.1 2024-25, openfootball nl.1 2024-25, openfootball at.1 2024-25, openfootball be.1 2024-25, openfootball tr.1 2024-25, openfootball sco.1 2024-25, openfootball gr.1 2024-25, openfootball en.1 2025-26, openfootball es.1 2025-26, openfootball de.1 2025-26, openfootball it.1 2025-26, openfootball fr.1 2025-26, openfootball pt.1 2025-26, openfootball nl.1 2025-26, openfootball at.1 2025-26, openfootball be.1 2025-26, openfootball tr.1 2025-26, openfootball sco.1 2025-26, openfootball gr.1 2025-26, openfootball en.1 2026-27, openfootball es.1 2026-27, openfootball de.1 2026-27, openfootball it.1 2026-27, openfootball fr.1 2026-27, openfootball pt.1 2026-27, openfootball nl.1 2026-27, 30 provisional hand-entered CL rows, UEFA matches: 816 rows, 1 clubs skipped (see data/uefa-import.json), UEFA player stats 2026-27: 1953 players from 107 clubs, 1 clubs unmapped (see data/uefa-teams.json).

## Live record (predictions frozen before kick-off)

- Scored predictions: 97; log loss 0.997 (1.099 = guessing); most-likely outcome right 58%
- High-probability picks: 30, won 63% (they average 72% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.989 over 97 games

Champions League only:

- Scored predictions: 27; log loss 0.845 (1.099 = guessing); most-likely outcome right 70%
- High-probability picks: 8, won 88% (they average 74% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.815 over 27 games

Europa League only:

- Scored predictions: 34; log loss 1.069 (1.099 = guessing); most-likely outcome right 56%
- High-probability picks: 10, won 50% (they average 68% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.066 over 34 games

Conference League only:

- Scored predictions: 36; log loss 1.043 (1.099 = guessing); most-likely outcome right 50%
- High-probability picks: 12, won 58% (they average 75% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.045 over 36 games

| Predicted band | Mean predicted | Happened | n |
|---|---|---|---|
| 0–20% | 15% | 21% | 82 |
| 20–40% | 28% | 24% | 121 |
| 40–60% | 50% | 56% | 52 |
| 60–80% | 66% | 59% | 27 |
| 80–100% | 85% | 67% | 9 |

## Walk-forward backtest (all history)

all 10034 matches log loss 0.980, accuracy 53%; Champions League 471 matches log loss 0.881, accuracy 61%

## Learning

- Last tuning check 2026-10-21: tuned — re-tune requested (new data sources)
- Settings: drift 0.00002/day, prior variance 0.1, Dixon–Coles ρ 0.04, newcomer offset 0.25, foreign prior -0.5, goal cap 6, competition half-life 1460 days

## Recent misses

- 2026-11-05 Sunderland v Dinamo Zagreb (el): Upset: Sunderland were 66% to win (high-probability pick); Dinamo Zagreb won 0-2, an outcome priced at 15%. Ratings moved: Sunderland attack -0.039, defence -0.021; Dinamo Zagreb attack +0.024, defence +0.040.
- 2026-11-05 Stade Rennais v Olympiakos SFP (el): Drawn 0-0; the model gave the draw 25% and leaned Stade Rennais (40%). Ratings moved: Stade Rennais attack -0.016, defence +0.015; Olympiakos SFP attack -0.019, defence +0.025.
- 2026-11-05 Sturm Graz v Celje (el): Upset: Sturm Graz were 71% to win (high-probability pick); Celje won 2-3, an outcome priced at 13%. Ratings moved: Sturm Graz attack -0.006, defence -0.034; Celje attack +0.036, defence +0.007.
- 2026-11-05 Real Sociedad v Olympique Lyonnais (el): Drawn 1-1; the model gave the draw 22% and leaned Real Sociedad (47%). Ratings moved: Real Sociedad attack -0.008, defence +0.005; Olympique Lyonnais attack -0.004, defence +0.008.
- 2026-11-05 H. Beer-Sheva v OFI Heraklion (el): Close call: the pick H. Beer-Sheva had only 43%; 0-2 was priced at 32%. Ratings moved: H. Beer-Sheva attack -0.053, defence -0.029; OFI Heraklion attack +0.021, defence +0.027.
- 2026-11-05 Crystal Palace v Hoffenheim (el): Drawn 1-1; the model gave the draw 20% and leaned Crystal Palace (60%). Ratings moved: Crystal Palace attack -0.011, defence +0.001; Hoffenheim attack -0.001, defence +0.012.
- 2026-11-05 Bayer Leverkusen v Olympique de (el): Upset: Bayer Leverkusen were 64% to win (high-probability pick); Olympique de won 0-1, an outcome priced at 17%. Ratings moved: Bayer Leverkusen attack -0.021, defence -0.000; Olympique de attack +0.000, defence +0.026.
- 2026-11-05 Milan v Ferencváros (el): Upset: Milan were 61% to win; Ferencváros won 0-2, an outcome priced at 19%. Ratings moved: Milan attack -0.023, defence -0.013; Ferencváros attack +0.018, defence +0.038.
- 2026-11-05 Trabzonspor v Freiburg (ecl): Close call: the pick Trabzonspor had only 38%; 0-1 was priced at 37%. Ratings moved: Trabzonspor attack -0.026, defence +0.006; Freiburg attack -0.003, defence +0.015.
- 2026-11-05 Sint-Truidense VV v Brann (ecl): Drawn 1-1; the model gave the draw 23% and leaned Sint-Truidense VV (40%). Ratings moved: Sint-Truidense VV attack -0.010, defence +0.008; Brann attack -0.009, defence +0.012.
- 2026-11-05 Riga v Jablonec (ecl): Drawn 1-1; the model gave the draw 25% and leaned Jablonec (49%). Ratings moved: Riga attack +0.001, defence +0.013; Jablonec attack -0.021, defence -0.001.
- 2026-11-05 Midtjylland v Ajax (ecl): Close call: the pick Midtjylland had only 53%; 1-6 was priced at 25%. Ratings moved: Midtjylland attack -0.014, defence -0.117; Ajax attack +0.046, defence +0.008.

## Upcoming (next days)

No fixtures in the horizon.



★ = high-probability pick (≥60% and the low end of its range ≥45%).

## League offsets (shared by every club from the country in cross-border games)

| Country | Offset | ± |
|---|---|---|
| ENG | +0.49 | 0.05 |
| ESP | +0.32 | 0.05 |
| GER | +0.28 | 0.05 |
| FRA | +0.25 | 0.05 |
| ITA | +0.22 | 0.05 |
| BEL | +0.20 | 0.06 |
| TUR | +0.09 | 0.06 |
| GRE | +0.09 | 0.06 |
| DEN | +0.08 | 0.06 |
| POR | +0.07 | 0.06 |
| NOR | +0.06 | 0.06 |
| NED | -0.00 | 0.05 |

## Strongest clubs (expected goal difference per game vs a zero-rated side)

| Club | Strength | ± |
|---|---|---|
| FC Barcelona | +3.25 | 0.11 |
| FC Bayern München | +3.24 | 0.12 |
| Manchester City FC | +2.72 | 0.12 |
| Paris Saint-Germain FC | +2.71 | 0.12 |
| Real Madrid CF | +2.59 | 0.12 |
| Arsenal FC | +2.55 | 0.12 |
| Liverpool FC | +2.32 | 0.12 |
| FC Internazionale Milano | +2.22 | 0.12 |
| Newcastle United FC | +1.93 | 0.12 |
| Aston Villa FC | +1.92 | 0.12 |
| Chelsea FC | +1.91 | 0.12 |
| Club Atlético de Madrid | +1.89 | 0.11 |
| Sporting Clube de Portugal | +1.87 | 0.12 |
| Brighton & Hove Albion FC | +1.85 | 0.12 |
| Sport Lisboa e Benfica | +1.84 | 0.12 |
| Manchester United FC | +1.81 | 0.12 |
| Borussia Dortmund | +1.76 | 0.12 |
| AFC Bournemouth | +1.75 | 0.12 |
| Club Brugge KV | +1.74 | 0.14 |
| Brentford FC | +1.74 | 0.12 |
