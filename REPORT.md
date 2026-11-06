# Model report

Generated 2026-11-06. Ratings include results up to 2026-11-05. Parameter set v3 (tuned 2026-10-21).

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

| Date | Comp | Match | H / D / A | Pick | Margin | Score | Bonus scorer |
|---|---|---|---|---|---|---|---|
| 2026-11-06 | de.1 | Hamburger v Borussia Mönchengladbach | 38% / 23% / 39% | Borussia Mönchengladbach 39% (25%–56%) | Draw | 1–1 | – |
| 2026-11-06 | fr.1 | Toulouse v Strasbourg Alsace | 40% / 24% / 37% | Toulouse 40% (28%–53%) | Draw | 1–1 | – |
| 2026-11-06 | it.1 | Venezia v Udinese Calcio | 27% / 26% / 47% | Udinese Calcio 47% (33%–64%) | Draw | 0–1 | – |
| 2026-11-06 | nl.1 | Willem II v PEC Zwolle | 37% / 23% / 40% | PEC Zwolle 40% (25%–57%) | Draw | 1–1 | – |
| 2026-11-06 | pt.1 | Famalicão v Arouca | 51% / 24% / 24% | Famalicão 51% (39%–64%) | Famalicão by 1 | 1–0 | – |
| 2026-11-07 | de.1 | FSV Mainz v Bayern | 14% / 15% / 71% | Bayern 71% (58%–83%) ★ | Bayern by 3+ | 1–2 | Harry Kane 53% |
| 2026-11-07 | de.1 | Dortmund v Elversberg | 72% / 15% / 14% | Dortmund 72% (51%–89%) ★ | Dortmund by 3+ | 2–0 | Serhou Guirassy 55% |
| 2026-11-07 | de.1 | Leipzig v Augsburg | 61% / 19% / 20% | Leipzig 61% (47%–74%) ★ | Leipzig by 1 | 2–1 | Brajan Gruda 25% |
| 2026-11-07 | de.1 | Paderborn v Eintracht Frankfurt | 30% / 22% / 48% | Eintracht Frankfurt 48% (26%–73%) | Draw | 1–1 | – |
| 2026-11-07 | de.1 | Stuttgart v Werder Bremen | 64% / 18% / 18% | Stuttgart 64% (51%–77%) ★ | Stuttgart by 3+ | 2–1 | Deniz Undav 31% |
| 2026-11-07 | en.1 | Arsenal v Hull City | 71% / 19% / 10% | Arsenal 71% (54%–87%) ★ | Arsenal by 1 | 1–0 | Viktor Gyökeres 35% |
| 2026-11-07 | en.1 | Brighton & v Brentford | 47% / 23% / 30% | Brighton & 47% (34%–60%) | Draw | 1–1 | Georginio Rutter 35% |
| 2026-11-07 | en.1 | Crystal Palace v Liverpool | 26% / 23% / 51% | Liverpool 51% (39%–64%) | Liverpool by 1 | 1–1 | Dominik Szoboszlai 23% |
| 2026-11-07 | en.1 | Everton v Coventry City | 61% / 23% / 16% | Everton 61% (43%–79%) | Everton by 1 | 1–0 | – |
| 2026-11-07 | en.1 | Fulham v Newcastle United | 36% / 24% / 41% | Newcastle United 41% (28%–54%) | Draw | 1–1 | – |
| 2026-11-07 | en.1 | Ipswich Town v Bournemouth | 20% / 20% / 60% | Bournemouth 60% (45%–77%) | Bournemouth by 1 | 0–1 | Justin Kluivert 29% |
| 2026-11-07 | en.1 | Leeds United v Tottenham Hotspur | 44% / 24% / 33% | Leeds United 44% (30%–58%) | Draw | 1–1 | – |
| 2026-11-07 | en.1 | Man Utd v Villa | 40% / 23% / 37% | Man Utd 40% (28%–53%) | Draw | 1–1 | Nicolas Jackson 28% |
| 2026-11-07 | en.1 | Nottingham Forest v Man City | 25% / 23% / 52% | Man City 52% (40%–66%) | Man City by 1 | 0–1 | Erling Haaland 37% |
| 2026-11-07 | en.1 | Sunderland v Chelsea | 31% / 24% / 45% | Chelsea 45% (32%–61%) | Draw | 1–1 | Enzo Le Fée 14% |
| 2026-11-07 | fr.1 | AJ Auxerre v Paris | 37% / 25% / 38% | Paris 38% (25%–53%) | Draw | 1–1 | – |
| 2026-11-07 | fr.1 | PSG v ES Troyes | 93% / 5% / 2% | PSG 93% (84%–99%) ★ | PSG by 3+ | 4–0 | Ousmane Dembélé 57% |
| 2026-11-07 | it.1 | Roma v US Sassuolo | 68% / 18% / 14% | Roma 68% (56%–81%) ★ | Roma by 3+ | 2–0 | Donyell Malen 47% |
| 2026-11-07 | it.1 | Cagliari Calcio v Frosinone Calcio | 42% / 24% / 35% | Cagliari Calcio 42% (26%–58%) | Draw | 1–1 | – |
| 2026-11-07 | it.1 | Parma Calcio v Bologna | 26% / 27% / 46% | Bologna 46% (35%–60%) | Draw | 0–1 | – |
| 2026-11-07 | it.1 | Torino v US Lecce | 49% / 27% / 24% | Torino 49% (37%–62%) | Draw | 1–0 | – |
| 2026-11-07 | nl.1 | ADO Den v Sparta Rotterdam | 31% / 23% / 47% | Sparta Rotterdam 47% (28%–69%) | Draw | 1–1 | – |
| 2026-11-07 | nl.1 | Fortuna Sittard v Telstar | 43% / 24% / 33% | Fortuna Sittard 43% (30%–58%) | Draw | 1–1 | – |
| 2026-11-07 | nl.1 | SBV Excelsior v Go Ahead | 40% / 22% / 38% | SBV Excelsior 40% (27%–55%) | Draw | 1–1 | – |
| 2026-11-07 | pt.1 | Nacional v Académico de | 40% / 25% / 35% | Nacional 40% (22%–59%) | Draw | 1–1 | – |
| 2026-11-07 | pt.1 | Alverca v Casa Pia | 46% / 25% / 29% | Alverca 46% (32%–60%) | Draw | 1–0 | – |
| 2026-11-07 | pt.1 | Sporting v Moreirense | 81% / 12% / 7% | Sporting 81% (72%–90%) ★ | Sporting by 3+ | 2–0 | Luis Suárez 50% |
| 2026-11-08 | de.1 | Köln v Bayer Leverkusen | 18% / 19% / 63% | Bayer Leverkusen 63% (49%–77%) ★ | Bayer Leverkusen by 1 | 1–2 | Patrik Schick 39% |
| 2026-11-08 | de.1 | Freiburg v Union Berlin | 61% / 20% / 19% | Freiburg 61% (48%–74%) ★ | Freiburg by 1 | 2–1 | Vincenzo Grifo 36% |
| 2026-11-08 | de.1 | Hoffenheim v Schalke | 59% / 20% / 22% | Hoffenheim 59% (37%–79%) | Hoffenheim by 1 | 1–0 | Andrej Kramarić 26% |
| 2026-11-08 | es.1 | CA Osasuna v Athletic Club | 36% / 26% / 38% | Athletic Club 38% (27%–51%) | Draw | 1–1 | – |
| 2026-11-08 | es.1 | Atlético v Barça | 36% / 21% / 43% | Barça 43% (30%–57%) | Draw | 1–1 | Julián Alvarez 37% |
| 2026-11-08 | es.1 | Elche v Betis | 34% / 23% / 43% | Betis 43% (29%–59%) | Draw | 1–1 | Abde Ezzalzouli 24% |
| 2026-11-08 | es.1 | Málaga v Real Racing | 42% / 23% / 36% | Málaga 42% (18%–67%) | Draw | 1–1 | – |
| 2026-11-08 | es.1 | Celta de v Levante | 57% / 21% / 22% | Celta de 57% (43%–70%) | Celta de by 1 | 1–1 | Pablo Durán 23% |
| 2026-11-08 | es.1 | Espanyol de v Deportivo La | 48% / 24% / 28% | Espanyol de 48% (29%–69%) | Draw | 1–0 | – |
| 2026-11-08 | es.1 | Real Sociedad v Rayo Vallecano | 50% / 24% / 26% | Real Sociedad 50% (38%–62%) | Draw | 1–0 | Sergio Gómez 25% |
| 2026-11-08 | es.1 | Sevilla v Deportivo Alavés | 44% / 25% / 30% | Sevilla 44% (32%–57%) | Draw | 1–0 | – |
| 2026-11-08 | es.1 | Valencia v Real Madrid | 17% / 20% / 63% | Real Madrid 63% (51%–76%) ★ | Real Madrid by 1 | 0–1 | Kylian Mbappé 55% |
| 2026-11-08 | es.1 | Villarreal v Getafe | 59% / 22% / 19% | Villarreal 59% (47%–71%) | Villarreal by 1 | 1–0 | Georges Mikautadze 26% |
| 2026-11-08 | fr.1 | Angers SCO v OGC Nice | 35% / 28% / 37% | OGC Nice 37% (26%–50%) | Draw | 0–1 | – |
| 2026-11-08 | fr.1 | Le Havre v Lorient | 37% / 25% / 38% | Lorient 38% (26%–53%) | Draw | 1–1 | – |
| 2026-11-08 | fr.1 | Le Mans v Monaco | 24% / 19% / 58% | Monaco 58% (35%–81%) | Monaco by 1 | 1–2 | Paris Brunner 37% |
| 2026-11-08 | fr.1 | Lens v Olympique de | 43% / 23% / 34% | Lens 43% (31%–57%) | Draw | 1–1 | Ruben Aguilar 20% |
| 2026-11-08 | fr.1 | Stade Brestois v Olympique Lyonnais | 32% / 23% / 46% | Olympique Lyonnais 46% (33%–60%) | Draw | 1–1 | Keito Nakamura 23% |
| 2026-11-08 | fr.1 | Stade Rennais v Lille | 38% / 25% / 37% | Stade Rennais 38% (27%–50%) | Draw | 1–1 | Boulaye Dia 21% |
| 2026-11-08 | it.1 | Monza v Atalanta BC | 16% / 20% / 64% | Atalanta BC 64% (49%–79%) ★ | Atalanta BC by 1 | 0–1 | Gianluca Scamacca 31% |
| 2026-11-08 | it.1 | ACF Fiorentina v Juventus | 24% / 24% / 52% | Juventus 52% (40%–65%) | Juventus by 1 | 0–1 | Nick Woltemade 29% |
| 2026-11-08 | it.1 | Inter v Como | 55% / 21% / 24% | Inter 55% (41%–68%) | Inter by 1 | 2–1 | Tasos Douvikas 25% |
| 2026-11-08 | it.1 | Genoa CFC v Milan | 25% / 25% / 50% | Milan 50% (38%–64%) | Draw | 0–1 | Alphadjo Cisse 29% |
| 2026-11-08 | it.1 | Napoli v SS Lazio | 44% / 26% / 30% | Napoli 44% (32%–56%) | Draw | 1–0 | Scott McTominay 21% |
| 2026-11-08 | nl.1 | AZ v Groningen | 59% / 20% / 21% | AZ 59% (46%–72%) | AZ by 1 | 2–1 | Mexx Meerdink 39% |
| 2026-11-08 | nl.1 | Twente '65 v Ajax | 42% / 21% / 37% | Twente '65 42% (29%–55%) | Draw | 1–1 | Wout Weghorst 33% |
| 2026-11-08 | nl.1 | Utrecht v NEC | 42% / 21% / 37% | Utrecht 42% (29%–56%) | Draw | 1–1 | Bryan Linssen 33% |
| 2026-11-08 | nl.1 | Cambuur-Leeuwarden v PSV | 5% / 7% / 88% | PSV 88% (73%–98%) ★ | PSV by 3+ | 0–4 | Ivan Perišić 39% |
| 2026-11-08 | nl.1 | Heerenveen v Feyenoord | 26% / 20% / 54% | Feyenoord 54% (41%–68%) | Feyenoord by 1 | 1–2 | Anis Hadj Moussa 23% |
| 2026-11-08 | pt.1 | Santa Clara v Gil Vicente | 41% / 30% / 29% | Santa Clara 41% (30%–53%) | Draw | 1–0 | – |
| 2026-11-08 | pt.1 | Estrela da v Sport Lisboa | 10% / 15% / 76% | Sport Lisboa 76% (64%–87%) ★ | Sport Lisboa by 3+ | 0–2 | Jhon Durán 38% |
| 2026-11-08 | pt.1 | GD Estoril v CS Marítimo | 58% / 20% / 22% | GD Estoril 58% (37%–79%) | GD Estoril by 1 | 2–1 | – |
| 2026-11-08 | pt.1 | Rio Ave v Sporting Clube | 19% / 22% / 59% | Sporting Clube 59% (46%–72%) | Sporting Clube by 1 | 0–1 | Ricardo Horta 31% |
| 2026-11-08 | pt.1 | Vitória Guimarães v Porto | 19% / 24% / 57% | Porto 57% (45%–71%) | Porto by 1 | 0–1 | Samu 25% |



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
