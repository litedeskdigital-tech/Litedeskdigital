# Model report

Generated 2026-11-18. Ratings include results up to 2026-11-05. Parameter set v3 (tuned 2026-10-21).

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
| 2026-11-24 | cl | Arsenal v Dortmund | 70% / 18% / 12% | Arsenal 70% (58%–82%) ★ | Arsenal by 3+ | 2–0 | Viktor Gyökeres 32% |
| 2026-11-24 | cl | Como v AEK Athen | 68% / 16% / 16% | Como 68% (51%–83%) ★ | Como by 3+ | 2–1 | Tasos Douvikas 46% |
| 2026-11-24 | cl | Feyenoord v Porto | 34% / 22% / 44% | Porto 44% (30%–60%) | Draw | 1–1 | Samu 24% |
| 2026-11-24 | cl | Bodø/Glimt v LASK | 82% / 10% / 7% | Bodø/Glimt 82% (68%–94%) ★ | Bodø/Glimt by 3+ | 3–0 | Sondre Brunstad Fet 43% |
| 2026-11-24 | cl | Galatasaray v Villa | 34% / 21% / 45% | Villa 45% (29%–63%) | Draw | 1–1 | Nicolas Jackson 29% |
| 2026-11-24 | cl | Man City v Napoli | 78% / 12% / 10% | Man City 78% (65%–89%) ★ | Man City by 3+ | 2–0 | Erling Haaland 41% |
| 2026-11-24 | cl | Leipzig v Lens | 55% / 20% / 25% | Leipzig 55% (40%–71%) | Leipzig by 1 | 2–1 | Brajan Gruda 18% |
| 2026-11-24 | cl | Real Madrid v PSV | 73% / 13% / 14% | Real Madrid 73% (58%–86%) ★ | Real Madrid by 3+ | 3–1 | Kylian Mbappé 66% |
| 2026-11-24 | cl | ŠK Slovan v Betis | 13% / 15% / 73% | Betis 73% (56%–88%) ★ | Betis by 3+ | 0–2 | Isco 31% |
| 2026-11-25 | cl | Atlético v Viking | 74% / 13% / 14% | Atlético 74% (54%–90%) ★ | Atlético by 3+ | 3–1 | Julián Alvarez 51% |
| 2026-11-25 | cl | Brugge v Liverpool | 37% / 20% / 43% | Liverpool 43% (27%–61%) | Draw | 1–1 | Nicolò Tresoldi 38% |
| 2026-11-25 | cl | Inter v Stuttgart | 67% / 16% / 17% | Inter 67% (52%–81%) ★ | Inter by 3+ | 2–1 | Hakan Çalhanoğlu 28% |
| 2026-11-25 | cl | Shakhtar Donetsk v Fenerbahçe | 39% / 22% / 39% | Fenerbahçe 39% (23%–59%) | Draw | 1–1 | Kerem Aktürkoğlu 24% |
| 2026-11-25 | cl | Lille v Bayern | 20% / 18% / 62% | Bayern 62% (47%–77%) ★ | Bayern by 3+ | 1–2 | Harry Kane 42% |
| 2026-11-25 | cl | PSG v Roma | 69% / 16% / 16% | PSG 69% (54%–82%) ★ | PSG by 3+ | 2–1 | Ousmane Dembélé 39% |
| 2026-11-25 | cl | Sabah v Barça | 6% / 7% / 87% | Barça 87% (72%–97%) ★ | Barça by 3+ | 1–4 | Anthony Gordon 53% |
| 2026-11-25 | cl | Slavia v Villarreal | 28% / 19% / 53% | Villarreal 53% (34%–74%) | Villarreal by 1 | 1–2 | Georges Mikautadze 20% |
| 2026-11-25 | cl | Sporting v Man Utd | 51% / 20% / 29% | Sporting 51% (36%–67%) | Sporting by 1 | 2–1 | Luis Suárez 36% |
| 2026-11-26 | el | Sparta Praha v AZ | 40% / 24% / 37% | Sparta Praha 40% (25%–56%) | Draw | 1–1 | Mexx Meerdink 30% |
| 2026-11-26 | el | Beşiktaş v H. Beer-Sheva | 65% / 21% / 14% | Beşiktaş 65% (47%–82%) ★ | Beşiktaş by 1 | 1–0 | Hyeongyu Oh 23% |
| 2026-11-26 | el | Crystal Palace v Real Sociedad | 53% / 23% / 24% | Crystal Palace 53% (40%–67%) | Crystal Palace by 1 | 1–0 | Yeremy Pino 26% |
| 2026-11-26 | el | Red Bull v Ararat-Armenia | 80% / 12% / 8% | Red Bull 80% (63%–93%) ★ | Red Bull by 3+ | 2–0 | Haris Tabaković 38% |
| 2026-11-26 | el | Ferencváros v Celje | 76% / 13% / 11% | Ferencváros 76% (59%–90%) ★ | Ferencváros by 3+ | 2–0 | Kristoffer Zachariassen 53% |
| 2026-11-26 | el | Dinamo Zagreb v Bayer Leverkusen | 23% / 21% / 56% | Bayer Leverkusen 56% (39%–74%) | Bayer Leverkusen by 1 | 0–1 | Dion Beljo 34% |
| 2026-11-26 | el | Juventus v Omonia | 70% / 18% / 12% | Juventus 70% (55%–84%) ★ | Juventus by 3+ | 1–0 | Nick Woltemade 36% |
| 2026-11-26 | el | NEC v Stade Rennais | 35% / 22% / 43% | Stade Rennais 43% (29%–60%) | Draw | 1–1 | Bryan Linssen 31% |
| 2026-11-26 | el | OFI Heraklion v RSC Anderlecht | 24% / 22% / 54% | RSC Anderlecht 54% (37%–74%) | RSC Anderlecht by 1 | 0–1 | Mihajlo Cvetković 33% |
| 2026-11-26 | el | Olympique de v Levski Sofia | 65% / 21% / 14% | Olympique de 65% (49%–81%) ★ | Olympique de by 1 | 1–0 | Keyliane Abdallah 19% |
| 2026-11-26 | el | Olympique Lyonnais v Lillestrøm | 77% / 14% / 9% | Olympique Lyonnais 77% (57%–93%) ★ | Olympique Lyonnais by 3+ | 2–0 | Keito Nakamura 30% |
| 2026-11-26 | el | Olympiakos SFP v Milan | 46% / 26% / 28% | Olympiakos SFP 46% (32%–61%) | Draw | 1–0 | Armando González 20% |
| 2026-11-26 | el | Celta de v Bournemouth | 31% / 24% / 45% | Bournemouth 45% (32%–60%) | Draw | 1–1 | Justin Kluivert 22% |
| 2026-11-26 | el | Royale Union v Lech Poznań | 78% / 13% / 9% | Royale Union 78% (62%–92%) ★ | Royale Union by 3+ | 2–0 | Guilherme Smith 38% |
| 2026-11-26 | el | Sunderland v Jagiellonia | 63% / 22% / 15% | Sunderland 63% (47%–80%) ★ | Sunderland by 1 | 1–0 | Enzo Le Fée 19% |
| 2026-11-26 | el | Hoffenheim v Sturm Graz | 57% / 21% / 22% | Hoffenheim 57% (42%–73%) | Hoffenheim by 1 | 1–0 | Oumar Diakité 25% |
| 2026-11-26 | el | Viktoria Plzeň v Sport Lisboa | 23% / 25% / 53% | Sport Lisboa 53% (37%–71%) | Sport Lisboa by 1 | 0–1 | Jhon Durán 25% |
| 2026-11-26 | ecl | Ajax v Thun | 74% / 14% / 12% | Ajax 74% (55%–90%) ★ | Ajax by 3+ | 2–0 | Tolu Arokodare 46% |
| 2026-11-26 | ecl | Borac v Atalanta BC | 12% / 18% / 70% | Atalanta BC 70% (52%–87%) ★ | Atalanta BC by 3+ | 0–2 | Gianluca Scamacca 28% |
| 2026-11-26 | ecl | Brann v Aarhus | 64% / 20% / 17% | Brann 64% (43%–83%) | Brann by 1 | 1–0 | Niklas Castro 46% |
| 2026-11-26 | ecl | Brighton & v Univ. Craiova | 87% / 9% / 4% | Brighton & 87% (76%–96%) ★ | Brighton & by 3+ | 3–0 | Georginio Rutter 48% |
| 2026-11-26 | ecl | CSKA Sofia v Trabzonspor | 26% / 25% / 49% | Trabzonspor 49% (30%–71%) | Draw | 0–1 | Djú Franculino 31% |
| 2026-11-26 | ecl | Egnatia v L. Red | 73% / 16% / 11% | Egnatia 73% (54%–90%) ★ | Egnatia by 3+ | 2–0 | Ildi Gruda 46% |
| 2026-11-26 | ecl | Hajduk Split v Sint-Truidense VV | 42% / 25% / 33% | Hajduk Split 42% (24%–62%) | Draw | 1–1 | Dalisson 23% |
| 2026-11-26 | ecl | Heart of v Monaco | 17% / 19% / 64% | Monaco 64% (48%–81%) ★ | Monaco by 1 | 0–2 | Paris Brunner 35% |
| 2026-11-26 | ecl | Iberia Tbilisi v Getafe | 10% / 21% / 69% | Getafe 69% (51%–85%) ★ | Getafe by 1 | 0–1 | Borja Mayoral 28% |
| 2026-11-26 | ecl | Inter Escaldes v Copenhagen | 12% / 14% / 74% | Copenhagen 74% (53%–92%) ★ | Copenhagen by 3+ | 0–2 | Mohamed Elyounoussi 37% |
| 2026-11-26 | ecl | Jablonec v Lugano | 54% / 22% / 25% | Jablonec 54% (32%–76%) | Jablonec by 1 | 1–0 | Antonín Růsek 32% |
| 2026-11-26 | ecl | KAA Gent v Crvena Zvezda | 46% / 24% / 31% | KAA Gent 46% (29%–63%) | Draw | 1–1 | Hyllarion Goore 24% |
| 2026-11-26 | ecl | Kairat Almaty v Mjällby | 39% / 31% / 30% | Kairat Almaty 39% (21%–61%) | Draw | 0–0 | Marc Gual 30% |
| 2026-11-26 | ecl | Kauno Žalgiris v Riga | 30% / 25% / 45% | Riga 45% (26%–68%) | Draw | 0–1 | Reginaldo Ramires 29% |
| 2026-11-26 | ecl | Nordsjælland v Panathinaikos | 59% / 22% / 20% | Nordsjælland 59% (40%–77%) | Nordsjælland by 1 | 1–0 | Ibrahim Adel 34% |
| 2026-11-26 | ecl | Pafos v Midtjylland | 35% / 24% / 41% | Midtjylland 41% (24%–61%) | Draw | 1–1 | Lelê 20% |
| 2026-11-26 | ecl | Freiburg v Twente '65 | 57% / 22% / 21% | Freiburg 57% (43%–71%) | Freiburg by 1 | 1–0 | Vincenzo Grifo 32% |
| 2026-11-26 | ecl | Sporting Clube v KuPS Kuopio | 80% / 14% / 6% | Sporting Clube 80% (67%–91%) ★ | Sporting Clube by 3+ | 2–0 | Ricardo Horta 37% |
| 2026-11-20 | de.1 | Bayern v Köln | 91% / 6% / 3% | Bayern 91% (84%–97%) ★ | Bayern by 3+ | 4–0 | Harry Kane 70% |
| 2026-11-20 | fr.1 | ES Troyes v Le Havre | 31% / 24% / 44% | Le Havre 44% (24%–68%) | Draw | 0–1 | – |
| 2026-11-21 | de.1 | Union Berlin v Leipzig | 25% / 21% / 54% | Leipzig 54% (41%–69%) | Leipzig by 1 | 1–1 | Brajan Gruda 22% |
| 2026-11-21 | de.1 | Bayer Leverkusen v Paderborn | 74% / 16% / 10% | Bayer Leverkusen 74% (56%–90%) ★ | Bayer Leverkusen by 3+ | 2–0 | Patrik Schick 43% |
| 2026-11-21 | de.1 | Borussia Mönchengladbach v Dortmund | 20% / 19% / 61% | Dortmund 61% (48%–75%) ★ | Dortmund by 1 | 1–2 | Serhou Guirassy 48% |
| 2026-11-21 | de.1 | Eintracht Frankfurt v Hoffenheim | 50% / 19% / 31% | Eintracht Frankfurt 50% (35%–65%) | Eintracht Frankfurt by 1 | 2–1 | Andrej Kramarić 23% |
| 2026-11-21 | de.1 | Schalke v Stuttgart | 23% / 21% / 55% | Stuttgart 55% (34%–77%) | Stuttgart by 1 | 0–1 | Deniz Undav 26% |
| 2026-11-21 | de.1 | Elversberg v Freiburg | 38% / 21% / 42% | Freiburg 42% (20%–66%) | Draw | 1–1 | Vincenzo Grifo 32% |
| 2026-11-21 | en.1 | Bournemouth v Nottingham Forest | 47% / 25% / 28% | Bournemouth 47% (35%–60%) | Draw | 1–0 | Justin Kluivert 22% |
| 2026-11-21 | en.1 | Villa v Sunderland | 58% / 23% / 20% | Villa 58% (45%–71%) | Villa by 1 | 1–0 | Nicolas Jackson 33% |
| 2026-11-21 | en.1 | Brentford v Everton | 46% / 26% / 28% | Brentford 46% (34%–59%) | Draw | 1–0 | – |
| 2026-11-21 | en.1 | Chelsea v Leeds United | 50% / 22% / 28% | Chelsea 50% (36%–65%) | Chelsea by 1 | 1–1 | – |
| 2026-11-21 | en.1 | Coventry City v Crystal Palace | 25% / 25% / 51% | Crystal Palace 51% (31%–72%) | Draw | 0–1 | Yeremy Pino 23% |
| 2026-11-21 | en.1 | Hull City v Brighton & | 29% / 25% / 46% | Brighton & 46% (27%–69%) | Draw | 0–1 | Georginio Rutter 32% |
| 2026-11-21 | en.1 | Liverpool v Man Utd | 54% / 21% / 25% | Liverpool 54% (42%–67%) | Liverpool by 1 | 2–1 | Dominik Szoboszlai 26% |
| 2026-11-21 | en.1 | Man City v Fulham | 65% / 19% / 16% | Man City 65% (53%–77%) ★ | Man City by 1 | 2–0 | Erling Haaland 43% |
| 2026-11-21 | en.1 | Newcastle United v Arsenal | 22% / 24% / 54% | Arsenal 54% (42%–67%) | Arsenal by 1 | 0–1 | Viktor Gyökeres 30% |
| 2026-11-21 | en.1 | Tottenham Hotspur v Ipswich Town | 65% / 18% / 17% | Tottenham Hotspur 65% (50%–79%) ★ | Tottenham Hotspur by 3+ | 2–0 | – |
| 2026-11-21 | fr.1 | Monaco v AJ Auxerre | 63% / 19% / 18% | Monaco 63% (50%–76%) ★ | Monaco by 1 | 2–0 | Paris Brunner 35% |
| 2026-11-21 | fr.1 | Lille v Olympique Lyonnais | 43% / 25% / 32% | Lille 43% (31%–54%) | Draw | 1–1 | Soriba Diaoune 21% |
| 2026-11-21 | fr.1 | OGC Nice v PSG | 11% / 15% / 74% | PSG 74% (62%–85%) ★ | PSG by 3+ | 0–2 | Ousmane Dembélé 39% |
| 2026-11-21 | fr.1 | Lens v Toulouse | 51% / 23% / 26% | Lens 51% (38%–64%) | Lens by 1 | 1–1 | Ruben Aguilar 20% |
| 2026-11-21 | fr.1 | Strasbourg Alsace v Stade Brestois | 52% / 21% / 26% | Strasbourg Alsace 52% (39%–66%) | Strasbourg Alsace by 1 | 1–1 | – |
| 2026-11-21 | it.1 | Como v Cagliari Calcio | 66% / 19% / 15% | Como 66% (53%–78%) ★ | Como by 1 | 2–0 | Tasos Douvikas 39% |
| 2026-11-21 | it.1 | Parma Calcio v Roma | 16% / 22% / 62% | Roma 62% (49%–75%) ★ | Roma by 1 | 0–1 | Donyell Malen 38% |
| 2026-11-21 | it.1 | SS Lazio v US Lecce | 61% / 24% / 16% | SS Lazio 61% (49%–73%) ★ | SS Lazio by 1 | 1–0 | – |
| 2026-11-21 | it.1 | Napoli v Torino | 57% / 23% / 20% | Napoli 57% (45%–70%) | Napoli by 1 | 1–0 | Scott McTominay 26% |
| 2026-11-21 | nl.1 | Groningen v Heerenveen | 45% / 23% / 32% | Groningen 45% (31%–59%) | Draw | 1–1 | – |
| 2026-11-21 | nl.1 | Utrecht v Cambuur-Leeuwarden | 74% / 13% / 13% | Utrecht 74% (55%–90%) ★ | Utrecht by 3+ | 2–1 | – |
| 2026-11-21 | nl.1 | Feyenoord v SBV Excelsior | 72% / 15% / 13% | Feyenoord 72% (59%–83%) ★ | Feyenoord by 3+ | 2–1 | Anis Hadj Moussa 29% |
| 2026-11-21 | nl.1 | NEC v PSV | 22% / 17% / 62% | PSV 62% (47%–76%) ★ | PSV by 3+ | 1–2 | Bryan Linssen 31% |
| 2026-11-21 | nl.1 | Telstar v PEC Zwolle | 51% / 22% / 27% | Telstar 51% (37%–66%) | Telstar by 1 | 1–1 | – |
| 2026-11-22 | de.1 | Augsburg v FSV Mainz | 38% / 24% / 38% | Augsburg 38% (26%–51%) | Draw | 1–1 | – |
| 2026-11-22 | de.1 | Werder Bremen v Hamburger | 52% / 22% / 26% | Werder Bremen 52% (37%–67%) | Werder Bremen by 1 | 1–1 | – |
| 2026-11-22 | es.1 | Athletic Club v Espanyol de | 55% / 24% / 21% | Athletic Club 55% (42%–68%) | Athletic Club by 1 | 1–0 | – |
| 2026-11-22 | es.1 | CA Osasuna v Málaga | 61% / 22% / 17% | CA Osasuna 61% (43%–79%) | CA Osasuna by 1 | 1–0 | – |
| 2026-11-22 | es.1 | Deportivo Alavés v Deportivo La | 51% / 24% / 25% | Deportivo Alavés 51% (32%–71%) | Draw | 1–0 | – |
| 2026-11-22 | es.1 | Barça v Villarreal | 80% / 11% / 10% | Barça 80% (68%–89%) ★ | Barça by 3+ | 3–1 | Anthony Gordon 54% |
| 2026-11-22 | es.1 | Getafe v Atlético | 22% / 26% / 52% | Atlético 52% (40%–64%) | Draw | 0–1 | Julián Alvarez 32% |
| 2026-11-22 | es.1 | Levante v Elche | 47% / 22% / 31% | Levante 47% (31%–64%) | Draw | 1–1 | – |
| 2026-11-22 | es.1 | Rayo Vallecano v Valencia | 48% / 26% / 26% | Rayo Vallecano 48% (36%–60%) | Draw | 1–0 | – |
| 2026-11-22 | es.1 | Real Madrid v Celta de | 75% / 15% / 11% | Real Madrid 75% (64%–85%) ★ | Real Madrid by 3+ | 2–0 | Kylian Mbappé 64% |
| 2026-11-22 | es.1 | Real Racing v Real Sociedad | 29% / 19% / 52% | Real Sociedad 52% (30%–76%) | Real Sociedad by 1 | 1–2 | Sergio Gómez 33% |
| 2026-11-22 | es.1 | Sevilla v Betis | 36% / 25% / 40% | Betis 40% (28%–53%) | Draw | 1–1 | Abde Ezzalzouli 21% |
| 2026-11-22 | fr.1 | Lorient v Stade Rennais | 36% / 22% / 41% | Stade Rennais 41% (28%–57%) | Draw | 1–1 | Boulaye Dia 25% |
| 2026-11-22 | fr.1 | Olympique de v Le Mans | 66% / 17% / 18% | Olympique de 66% (44%–85%) | Olympique de by 3+ | 2–1 | Keyliane Abdallah 31% |
| 2026-11-22 | fr.1 | Paris v Angers SCO | 55% / 25% / 21% | Paris 55% (41%–69%) | Paris by 1 | 1–0 | – |
| 2026-11-22 | it.1 | Milan v Frosinone Calcio | 60% / 20% / 20% | Milan 60% (44%–76%) | Milan by 1 | 1–0 | Alphadjo Cisse 37% |
| 2026-11-22 | it.1 | Atalanta BC v Inter | 29% / 24% / 48% | Inter 48% (36%–61%) | Draw | 1–1 | Lautaro Martínez 21% |
| 2026-11-22 | it.1 | Bologna v Udinese Calcio | 50% / 25% / 26% | Bologna 50% (37%–62%) | Draw | 1–0 | – |
| 2026-11-22 | it.1 | US Sassuolo v Genoa CFC | 44% / 25% / 32% | US Sassuolo 44% (30%–57%) | Draw | 1–1 | – |
| 2026-11-22 | nl.1 | Ajax v ADO Den | 85% / 9% / 6% | Ajax 85% (71%–96%) ★ | Ajax by 3+ | 3–0 | Tolu Arokodare 54% |
| 2026-11-22 | nl.1 | Twente '65 v Willem II | 78% / 14% / 9% | Twente '65 78% (65%–89%) ★ | Twente '65 by 3+ | 2–0 | Wout Weghorst 45% |
| 2026-11-22 | nl.1 | Go Ahead v Fortuna Sittard | 57% / 20% / 23% | Go Ahead 57% (43%–70%) | Go Ahead by 1 | 2–1 | – |
| 2026-11-22 | nl.1 | Sparta Rotterdam v AZ | 25% / 22% / 53% | AZ 53% (40%–67%) | AZ by 1 | 1–1 | Mexx Meerdink 36% |
| 2026-11-23 | it.1 | Monza v ACF Fiorentina | 26% / 23% / 52% | ACF Fiorentina 52% (37%–68%) | ACF Fiorentina by 1 | 0–1 | – |
| 2026-11-23 | it.1 | Juventus v Venezia | 75% / 17% / 9% | Juventus 75% (62%–86%) ★ | Juventus by 3+ | 2–0 | Nick Woltemade 37% |
| 2026-11-27 | de.1 | Werder Bremen v Borussia Mönchengladbach | 47% / 22% / 32% | Werder Bremen 47% (33%–61%) | Draw | 1–1 | – |
| 2026-11-27 | fr.1 | Stade Brestois v Paris | 41% / 24% / 35% | Stade Brestois 41% (27%–56%) | Draw | 1–1 | – |
| 2026-11-27 | nl.1 | Groningen v Willem II | 65% / 19% / 16% | Groningen 65% (50%–80%) ★ | Groningen by 1 | 1–0 | – |
| 2026-11-27 | pt.1 | CS Marítimo v Nacional | 39% / 25% / 37% | CS Marítimo 39% (21%–59%) | Draw | 1–1 | – |
| 2026-11-28 | de.1 | Köln v Elversberg | 40% / 21% / 39% | Köln 40% (19%–63%) | Draw | 1–1 | – |
| 2026-11-28 | de.1 | FSV Mainz v Union Berlin | 57% / 22% / 21% | FSV Mainz 57% (44%–71%) | FSV Mainz by 1 | 1–0 | – |
| 2026-11-28 | de.1 | Hamburger v Bayern | 7% / 10% / 84% | Bayern 84% (72%–94%) ★ | Bayern by 3+ | 0–3 | Harry Kane 62% |
| 2026-11-28 | de.1 | Paderborn v Schalke | 42% / 26% / 32% | Paderborn 42% (19%–67%) | Draw | 1–0 | – |
| 2026-11-28 | de.1 | Stuttgart v Eintracht Frankfurt | 58% / 18% / 24% | Stuttgart 58% (44%–72%) | Stuttgart by 3+ | 2–1 | Deniz Undav 32% |
| 2026-11-28 | en.1 | Arsenal v Man City | 51% / 25% / 25% | Arsenal 51% (39%–62%) | Draw | 1–0 | Viktor Gyökeres 28% |
| 2026-11-28 | en.1 | Brighton & v Newcastle United | 46% / 23% / 32% | Brighton & 46% (33%–59%) | Draw | 1–1 | Georginio Rutter 36% |
| 2026-11-28 | en.1 | Crystal Palace v Hull City | 44% / 26% / 30% | Crystal Palace 44% (26%–64%) | Draw | 1–0 | Yeremy Pino 21% |
| 2026-11-28 | en.1 | Everton v Liverpool | 29% / 26% / 45% | Liverpool 45% (34%–59%) | Draw | 0–1 | Dominik Szoboszlai 19% |
| 2026-11-28 | en.1 | Fulham v Bournemouth | 36% / 25% / 39% | Bournemouth 39% (27%–53%) | Draw | 1–1 | Justin Kluivert 20% |
| 2026-11-28 | en.1 | Ipswich Town v Villa | 17% / 19% / 64% | Villa 64% (48%–79%) ★ | Villa by 1 | 0–1 | Nicolas Jackson 39% |
| 2026-11-28 | en.1 | Leeds United v Coventry City | 64% / 20% / 16% | Leeds United 64% (44%–83%) | Leeds United by 1 | 1–0 | – |
| 2026-11-28 | en.1 | Man Utd v Brentford | 44% / 23% / 33% | Man Utd 44% (31%–57%) | Draw | 1–1 | Matheus Cunha 29% |
| 2026-11-28 | en.1 | Nottingham Forest v Chelsea | 39% / 24% / 38% | Nottingham Forest 39% (27%–51%) | Draw | 1–1 | – |
| 2026-11-28 | en.1 | Sunderland v Tottenham Hotspur | 36% / 26% / 39% | Tottenham Hotspur 39% (26%–53%) | Draw | 1–1 | Enzo Le Fée 14% |
| 2026-11-28 | fr.1 | Angers SCO v Lens | 25% / 26% / 49% | Lens 49% (37%–64%) | Draw | 0–1 | Ruben Aguilar 18% |
| 2026-11-28 | fr.1 | Le Havre v Strasbourg Alsace | 30% / 24% / 46% | Strasbourg Alsace 46% (34%–61%) | Draw | 1–1 | – |
| 2026-11-28 | fr.1 | Le Mans v Lille | 26% / 22% / 52% | Lille 52% (31%–75%) | Lille by 1 | 0–1 | Soriba Diaoune 25% |
| 2026-11-28 | fr.1 | OGC Nice v ES Troyes | 62% / 20% / 19% | OGC Nice 62% (40%–82%) | OGC Nice by 1 | 1–0 | – |
| 2026-11-28 | fr.1 | PSG v Lorient | 84% / 10% / 6% | PSG 84% (74%–92%) ★ | PSG by 3+ | 3–0 | Ousmane Dembélé 47% |
| 2026-11-28 | nl.1 | PSV v Go Ahead | 79% / 11% / 9% | PSV 79% (68%–89%) ★ | PSV by 3+ | 3–1 | Ivan Perišić 31% |
| 2026-11-28 | nl.1 | SBV Excelsior v Telstar | 49% / 22% / 29% | SBV Excelsior 49% (34%–64%) | Draw | 1–1 | – |
| 2026-11-28 | nl.1 | Cambuur-Leeuwarden v Sparta Rotterdam | 32% / 21% / 48% | Sparta Rotterdam 48% (27%–71%) | Draw | 1–1 | – |
| 2026-11-28 | pt.1 | Académico de v Alverca | 46% / 24% / 30% | Académico de 46% (27%–68%) | Draw | 1–0 | – |
| 2026-11-28 | pt.1 | Arouca v Rio Ave | 55% / 22% / 23% | Arouca 55% (42%–69%) | Arouca by 1 | 1–0 | – |
| 2026-11-28 | pt.1 | Moreirense v Santa Clara | 35% / 29% / 36% | Santa Clara 36% (25%–49%) | Draw | 0–1 | – |
| 2026-11-28 | pt.1 | Vitória Guimarães v Estrela da | 55% / 23% / 22% | Vitória Guimarães 55% (42%–68%) | Vitória Guimarães by 1 | 1–0 | – |

### UEFA club-competition scenarios (5,000 minute-by-minute simulations each)

| Match | First goal H / none / A | Favourite wins after conceding first | Favourite trails / trails by 2 | Favourite drops a lead | Likeliest HT/FT | Late winner (level at 75') | Goal in each 15' block |
|---|---|---|---|---|---|---|---|
| Arsenal v Dortmund | 70% / 5% / 25% | Arsenal: 33% | 28% / 6% | 10% | H/H 45%, D/H 22% | 10% | 34% 37% 38% 38% 42% 46% |
| Como v AEK Athen | 66% / 3% / 32% | Como: 35% | 38% / 12% | 14% | H/H 44%, D/H 17% | 10% | 42% 45% 46% 46% 51% 55% |
| Feyenoord v Porto | 45% / 4% / 51% | Porto: 18% | 53% / 23% | 18% | A/A 26%, H/H 20% | 12% | 36% 39% 40% 41% 45% 49% |
| Bodø/Glimt v LASK | 77% / 2% / 21% | Bodø/Glimt: 54% | 25% / 6% | 9% | H/H 61%, D/H 16% | 8% | 46% 50% 50% 51% 56% 60% |
| Galatasaray v Villa | 45% / 3% / 52% | Villa: 19% | 54% / 24% | 19% | A/A 28%, H/H 19% | 12% | 40% 43% 44% 44% 49% 53% |
| Man City v Napoli | 73% / 2% / 24% | Man City: 48% | 29% / 7% | 10% | H/H 55%, D/H 18% | 9% | 43% 46% 47% 48% 52% 56% |
| Leipzig v Lens | 59% / 3% / 38% | Leipzig: 26% | 46% / 17% | 17% | H/H 34%, D/H 16% | 12% | 39% 42% 43% 44% 48% 52% |
| Real Madrid v PSV | 69% / 1% / 30% | Real Madrid: 46% | 38% / 13% | 13% | H/H 52%, D/H 15% | 10% | 49% 53% 54% 55% 60% 64% |
| ŠK Slovan v Betis | 27% / 3% / 70% | Betis: 41% | 32% / 9% | 11% | A/A 51%, D/A 18% | 9% | 41% 44% 46% 46% 50% 55% |
| Atlético v Viking | 70% / 1% / 29% | Atlético: 46% | 36% / 12% | 13% | H/H 53%, D/H 15% | 10% | 48% 52% 53% 54% 59% 63% |
| Brugge v Liverpool | 47% / 3% / 50% | Liverpool: 18% | 57% / 27% | 21% | A/A 26%, H/H 22% | 12% | 41% 44% 45% 45% 50% 54% |
| Inter v Stuttgart | 65% / 2% / 33% | Inter: 38% | 41% / 15% | 15% | H/H 43%, D/H 17% | 11% | 44% 48% 49% 50% 54% 58% |
| Shakhtar Donetsk v Fenerbahçe | 48% / 4% / 48% | Fenerbahçe: 16% | 57% / 26% | 19% | A/A 23%, H/H 23% | 12% | 36% 40% 40% 41% 45% 49% |
| Lille v Bayern | 34% / 3% / 63% | Bayern: 32% | 41% / 14% | 15% | A/A 41%, D/A 16% | 11% | 40% 43% 44% 45% 49% 53% |
| PSG v Roma | 66% / 2% / 31% | PSG: 38% | 38% / 12% | 14% | H/H 45%, D/H 17% | 10% | 43% 46% 47% 47% 52% 56% |
| Sabah v Barça | 21% / 0% / 78% | Barça: 67% | 26% / 6% | 6% | A/A 69%, D/A 15% | 6% | 55% 58% 60% 61% 65% 70% |
| Slavia v Villarreal | 41% / 3% / 57% | Villarreal: 26% | 50% / 21% | 18% | A/A 34%, H/H 16% | 11% | 42% 45% 47% 47% 52% 56% |
| Sporting v Man Utd | 56% / 3% / 41% | Sporting: 23% | 50% / 20% | 18% | H/H 31%, A/A 16% | 12% | 40% 44% 44% 45% 49% 53% |
| Sparta Praha v AZ | 49% / 6% / 45% | Sparta Praha: 14% | 54% / 23% | 17% | H/H 23%, A/A 21% | 12% | 33% 36% 36% 37% 42% 45% |
| Beşiktaş v H. Beer-Sheva | 67% / 8% / 25% | Beşiktaş: 24% | 28% / 6% | 10% | H/H 41%, D/H 21% | 10% | 30% 33% 33% 34% 38% 41% |
| Crystal Palace v Real Sociedad | 58% / 6% / 36% | Crystal Palace: 20% | 42% / 13% | 14% | H/H 32%, D/H 18% | 11% | 32% 35% 35% 36% 40% 44% |
| Red Bull v Ararat-Armenia | 75% / 3% / 22% | Red Bull: 47% | 25% / 6% | 8% | H/H 57%, D/H 18% | 8% | 41% 44% 45% 46% 50% 54% |
| Ferencváros v Celje | 72% / 2% / 25% | Ferencváros: 45% | 30% / 8% | 10% | H/H 53%, D/H 17% | 9% | 43% 46% 47% 48% 52% 56% |
| Dinamo Zagreb v Bayer Leverkusen | 35% / 5% / 60% | Bayer Leverkusen: 24% | 41% / 14% | 14% | A/A 36%, D/A 17% | 11% | 34% 38% 38% 39% 43% 47% |
| Juventus v Omonia | 71% / 6% / 23% | Juventus: 31% | 26% / 5% | 9% | H/H 45%, D/H 22% | 9% | 32% 35% 36% 36% 40% 44% |
| NEC v Stade Rennais | 46% / 4% / 50% | Stade Rennais: 18% | 54% / 24% | 18% | A/A 26%, H/H 20% | 11% | 37% 41% 41% 42% 46% 50% |
| OFI Heraklion v RSC Anderlecht | 36% / 6% / 58% | RSC Anderlecht: 23% | 41% / 15% | 13% | A/A 34%, D/A 17% | 11% | 34% 37% 37% 38% 42% 46% |
| Olympique de v Levski Sofia | 68% / 9% / 23% | Olympique de: 24% | 26% / 5% | 10% | H/H 41%, D/H 21% | 10% | 29% 32% 32% 33% 37% 40% |
| Olympique Lyonnais v Lillestrøm | 74% / 4% / 22% | Olympique Lyonnais: 39% | 25% / 5% | 8% | H/H 52%, D/H 20% | 9% | 37% 40% 41% 41% 46% 49% |
| Olympiakos SFP v Milan | 53% / 10% / 38% | Olympiakos SFP: 13% | 43% / 14% | 14% | H/H 26%, D/D 18% | 11% | 28% 30% 31% 32% 36% 39% |
| Celta de v Bournemouth | 42% / 6% / 52% | Bournemouth: 17% | 48% / 19% | 16% | A/A 27%, H/H 17% | 11% | 32% 35% 36% 36% 41% 44% |
| Royale Union v Lech Poznań | 74% / 3% / 23% | Royale Union: 45% | 27% / 6% | 9% | H/H 54%, D/H 19% | 9% | 41% 44% 44% 45% 50% 53% |
| Sunderland v Jagiellonia | 66% / 9% / 25% | Sunderland: 22% | 28% / 6% | 10% | H/H 39%, D/H 21% | 10% | 29% 31% 31% 33% 36% 40% |
| Hoffenheim v Sturm Graz | 61% / 5% / 34% | Hoffenheim: 23% | 40% / 13% | 14% | H/H 35%, D/H 18% | 11% | 35% 38% 39% 39% 43% 47% |
| Viktoria Plzeň v Sport Lisboa | 33% / 9% / 57% | Sport Lisboa: 19% | 37% / 11% | 12% | A/A 33%, D/A 18% | 11% | 29% 31% 31% 33% 36% 40% |
| Ajax v Thun | 71% / 3% / 26% | Ajax: 42% | 31% / 8% | 10% | H/H 51%, D/H 18% | 9% | 41% 45% 45% 46% 51% 54% |
| Borac v Atalanta BC | 24% / 6% / 70% | Atalanta BC: 34% | 26% / 6% | 9% | A/A 47%, D/A 21% | 9% | 33% 36% 36% 37% 41% 45% |
| Brann v Aarhus | 65% / 6% / 29% | Brann: 27% | 33% / 8% | 11% | H/H 41%, D/H 20% | 10% | 33% 36% 37% 37% 41% 45% |
| Brighton & v Univ. Craiova | 83% / 3% / 14% | Brighton &: 58% | 16% / 2% | 5% | H/H 66%, D/H 18% | 7% | 42% 45% 45% 46% 51% 55% |
| CSKA Sofia v Trabzonspor | 36% / 10% / 54% | Trabzonspor: 16% | 40% / 14% | 13% | A/A 30%, D/D 17% | 11% | 29% 32% 31% 33% 36% 40% |
| Egnatia v L. Red | 73% / 5% / 22% | Egnatia: 35% | 25% / 5% | 9% | H/H 49%, D/H 21% | 9% | 35% 38% 38% 39% 43% 47% |
| Hajduk Split v Sint-Truidense VV | 50% / 8% / 42% | Hajduk Split: 13% | 49% / 19% | 15% | H/H 24%, A/A 19% | 11% | 31% 33% 33% 35% 38% 42% |
| Heart of v Monaco | 31% / 4% / 65% | Monaco: 30% | 35% / 11% | 11% | A/A 42%, D/A 19% | 10% | 36% 39% 40% 41% 44% 49% |
| Iberia Tbilisi v Getafe | 19% / 11% / 70% | Getafe: 30% | 21% / 4% | 7% | A/A 45%, D/A 23% | 9% | 27% 30% 29% 31% 34% 38% |
| Inter Escaldes v Copenhagen | 25% / 3% / 72% | Copenhagen: 41% | 29% / 8% | 10% | A/A 53%, D/A 18% | 9% | 41% 44% 45% 45% 50% 54% |
| Jablonec v Lugano | 59% / 6% / 36% | Jablonec: 21% | 42% / 14% | 15% | H/H 34%, D/H 17% | 11% | 34% 37% 37% 38% 42% 46% |
| KAA Gent v Crvena Zvezda | 53% / 7% / 40% | KAA Gent: 15% | 47% / 17% | 15% | H/H 27%, A/A 17% | 11% | 32% 35% 35% 36% 40% 43% |
| Kairat Almaty v Mjällby | 44% / 17% / 39% | Kairat Almaty: 8% | 42% / 13% | 11% | D/D 24%, H/H 21% | 11% | 23% 25% 25% 27% 29% 32% |
| Kauno Žalgiris v Riga | 39% / 10% / 51% | Riga: 15% | 44% / 16% | 13% | A/A 27%, D/D 17% | 11% | 29% 32% 32% 33% 36% 40% |
| Nordsjælland v Panathinaikos | 62% / 7% / 31% | Nordsjælland: 23% | 35% / 10% | 12% | H/H 37%, D/H 19% | 10% | 32% 35% 35% 36% 40% 44% |
| Pafos v Midtjylland | 44% / 7% / 48% | Midtjylland: 14% | 50% / 21% | 15% | A/A 24%, H/H 20% | 11% | 31% 34% 34% 35% 39% 43% |
| Freiburg v Twente '65 | 61% / 6% / 33% | Freiburg: 23% | 38% / 11% | 13% | H/H 35%, D/H 19% | 11% | 33% 36% 36% 37% 41% 45% |
| Sporting Clube v KuPS Kuopio | 79% / 7% / 15% | Sporting Clube: 38% | 16% / 2% | 6% | H/H 54%, D/H 23% | 8% | 32% 35% 35% 36% 40% 43% |

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
