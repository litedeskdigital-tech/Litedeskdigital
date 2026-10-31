# Model report

Generated 2026-10-31. Ratings include results up to 2026-10-22. Parameter set v3 (tuned 2026-10-21).

Sources: openfootball cl 2023-24, openfootball cl 2024-25, openfootball cl 2025-26, openfootball en.1 2023-24, openfootball es.1 2023-24, openfootball de.1 2023-24, openfootball it.1 2023-24, openfootball fr.1 2023-24, openfootball pt.1 2023-24, openfootball nl.1 2023-24, openfootball at.1 2023-24, openfootball en.1 2024-25, openfootball es.1 2024-25, openfootball de.1 2024-25, openfootball it.1 2024-25, openfootball fr.1 2024-25, openfootball pt.1 2024-25, openfootball nl.1 2024-25, openfootball at.1 2024-25, openfootball be.1 2024-25, openfootball tr.1 2024-25, openfootball sco.1 2024-25, openfootball gr.1 2024-25, openfootball en.1 2025-26, openfootball es.1 2025-26, openfootball de.1 2025-26, openfootball it.1 2025-26, openfootball fr.1 2025-26, openfootball pt.1 2025-26, openfootball nl.1 2025-26, openfootball at.1 2025-26, openfootball be.1 2025-26, openfootball tr.1 2025-26, openfootball sco.1 2025-26, openfootball gr.1 2025-26, openfootball en.1 2026-27, openfootball es.1 2026-27, openfootball de.1 2026-27, openfootball it.1 2026-27, openfootball fr.1 2026-27, openfootball pt.1 2026-27, openfootball nl.1 2026-27, 30 provisional hand-entered CL rows, UEFA matches: 816 rows, 1 clubs skipped (see data/uefa-import.json), UEFA player stats 2026-27: 1861 players from 107 clubs, 1 clubs unmapped (see data/uefa-teams.json).

## Live record (predictions frozen before kick-off)

- Scored predictions: 44; log loss 1.082 (1.099 = guessing); most-likely outcome right 52%
- High-probability picks: 14, won 57% (they average 71% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.063 over 44 games

Champions League only:

- Scored predictions: 9; log loss 1.101 (1.099 = guessing); most-likely outcome right 56%
- High-probability picks: 3, won 67% (they average 81% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.013 over 9 games

Europa League only:

- Scored predictions: 17; log loss 1.000 (1.099 = guessing); most-likely outcome right 59%
- High-probability picks: 4, won 75% (they average 67% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.000 over 17 games

Conference League only:

- Scored predictions: 18; log loss 1.150 (1.099 = guessing); most-likely outcome right 44%
- High-probability picks: 7, won 43% (they average 70% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.149 over 18 games

| Predicted band | Mean predicted | Happened | n |
|---|---|---|---|
| 0–20% | 15% | 26% | 38 |
| 20–40% | 28% | 25% | 56 |
| 40–60% | 50% | 48% | 21 |
| 60–80% | 66% | 64% | 14 |
| 80–100% | 86% | 33% | 3 |

## Walk-forward backtest (all history)

all 9981 matches log loss 0.980, accuracy 53%; Champions League 453 matches log loss 0.887, accuracy 60%

## Learning

- Last tuning check 2026-10-21: tuned — re-tune requested (new data sources)
- Settings: drift 0.00002/day, prior variance 0.1, Dixon–Coles ρ 0.04, newcomer offset 0.25, foreign prior -0.5, goal cap 6, competition half-life 1460 days

## Recent misses

- 2026-10-22 Viktoria Plzeň v Levski Sofia (el): Close call: the pick Viktoria Plzeň had only 54%; 1-2 was priced at 17%. Ratings moved: Viktoria Plzeň attack -0.005, defence -0.039; Levski Sofia attack +0.057, defence +0.007.
- 2026-10-22 Sturm Graz v Olympique de (el): Close call: the pick Olympique de had only 39%; 1-0 was priced at 37%. Ratings moved: Sturm Graz attack -0.005, defence +0.023; Olympique de attack -0.015, defence +0.004.
- 2026-10-22 Lech Poznań v Sunderland (el): Drawn 1-1; the model gave the draw 22% and leaned Sunderland (51%). Ratings moved: Lech Poznań attack -0.004, defence +0.018; Sunderland attack -0.015, defence +0.003.
- 2026-10-22 Juventus v Stade Rennais (el): Drawn 2-2; the model gave the draw 20% and leaned Juventus (63%). Ratings moved: Juventus attack +0.000, defence -0.015; Stade Rennais attack +0.013, defence -0.000.
- 2026-10-22 Dinamo Zagreb v NEC (el): Close call: the pick Dinamo Zagreb had only 58%; 2-4 was priced at 22%. Ratings moved: Dinamo Zagreb attack -0.001, defence -0.059; NEC attack +0.029, defence +0.001.
- 2026-10-22 Celje v Red Bull (el): Drawn 2-2; the model gave the draw 20% and leaned Red Bull (50%). Ratings moved: Celje attack +0.008, defence +0.001; Red Bull attack -0.001, defence -0.007.
- 2026-10-22 Beşiktaş v Crystal Palace (el): Drawn 2-2; the model gave the draw 25% and leaned Crystal Palace (44%). Ratings moved: Beşiktaş attack +0.014, defence -0.010; Crystal Palace attack +0.007, defence -0.011.
- 2026-10-22 Thun v Hajduk Split (ecl): Close call: the pick Thun had only 44%; 0-1 was priced at 33%. Ratings moved: Thun attack -0.071, defence +0.011; Hajduk Split attack -0.009, defence +0.059.
- 2026-10-22 Pafos v Riga (ecl): Drawn 1-1; the model gave the draw 19% and leaned Pafos (65%). Ratings moved: Pafos attack -0.025, defence -0.005; Riga attack +0.006, defence +0.028.
- 2026-10-22 Nordsjælland v CSKA Sofia (ecl): Drawn 2-2; the model gave the draw 9% and leaned Nordsjælland (86%). Ratings moved: Nordsjælland attack -0.027, defence -0.079; CSKA Sofia attack +0.075, defence +0.034.
- 2026-10-22 Midtjylland v Sint-Truidense VV (ecl): Upset: Midtjylland were 71% to win (high-probability pick); Sint-Truidense VV won 0-1, an outcome priced at 13%. Ratings moved: Midtjylland attack -0.045, defence -0.003; Sint-Truidense VV attack +0.002, defence +0.044.
- 2026-10-22 Jablonec v Brighton & (ecl): Drawn 0-0; the model gave the draw 22% and leaned Brighton & (59%). Ratings moved: Jablonec attack -0.042, defence +0.085; Brighton & attack -0.019, defence +0.010.

## Upcoming (next days)

| Date | Comp | Match | H / D / A | Pick | Margin | Score | Bonus scorer |
|---|---|---|---|---|---|---|---|
| 2026-11-03 | cl | Atlético v Bayern | 37% / 19% / 44% | Bayern 44% (29%–61%) | Draw | 1–2 | Harry Kane 41% |
| 2026-11-03 | cl | Barça v Villa | 64% / 16% / 20% | Barça 64% (49%–79%) ★ | Barça by 3+ | 2–1 | Anthony Gordon 38% |
| 2026-11-03 | cl | Feyenoord v Inter | 28% / 19% / 54% | Inter 54% (38%–71%) | Inter by 1 | 1–2 | Lautaro Martínez 25% |
| 2026-11-03 | cl | Bodø/Glimt v Lille | 56% / 20% / 25% | Bodø/Glimt 56% (39%–72%) | Bodø/Glimt by 1 | 2–1 | Sondre Brunstad Fet 29% |
| 2026-11-03 | cl | Shakhtar Donetsk v Sporting | 26% / 20% / 54% | Sporting 54% (36%–73%) | Sporting by 1 | 1–2 | Luis Suárez 37% |
| 2026-11-03 | cl | Galatasaray v Stuttgart | 48% / 20% / 33% | Galatasaray 48% (32%–65%) | Draw | 2–1 | Victor Osimhen 35% |
| 2026-11-03 | cl | LASK v ŠK Slovan | 56% / 20% / 24% | LASK 56% (38%–75%) | LASK by 1 | 2–1 | Suleiman Camara 26% |
| 2026-11-03 | cl | Man Utd v Roma | 54% / 20% / 26% | Man Utd 54% (39%–69%) | Man Utd by 1 | 2–1 | Donyell Malen 28% |
| 2026-11-03 | cl | Villarreal v PSG | 30% / 18% / 52% | PSG 52% (36%–69%) | PSG by 1 | 1–2 | Ousmane Dembélé 41% |
| 2026-11-04 | cl | AEK Athen v Real Madrid | 17% / 17% / 66% | Real Madrid 66% (50%–83%) ★ | Real Madrid by 3+ | 1–2 | Kylian Mbappé 55% |
| 2026-11-04 | cl | Dortmund v Betis | 60% / 19% / 21% | Dortmund 60% (46%–74%) ★ | Dortmund by 1 | 2–1 | Serhou Guirassy 45% |
| 2026-11-04 | cl | Porto v Napoli | 55% / 22% / 24% | Porto 55% (41%–69%) | Porto by 1 | 1–0 | Samu 26% |
| 2026-11-04 | cl | Fenerbahçe v Liverpool | 24% / 19% / 57% | Liverpool 57% (42%–74%) | Liverpool by 1 | 1–2 | Dominik Szoboszlai 25% |
| 2026-11-04 | cl | PSV v Brugge | 49% / 18% / 33% | PSV 49% (31%–67%) | PSV by 1 | 2–1 | Nicolò Tresoldi 39% |
| 2026-11-04 | cl | Lens v Como | 45% / 21% / 34% | Lens 45% (29%–61%) | Draw | 1–1 | Tasos Douvikas 25% |
| 2026-11-04 | cl | Leipzig v Man City | 23% / 19% / 58% | Man City 58% (43%–74%) | Man City by 1 | 1–2 | Erling Haaland 29% |
| 2026-11-04 | cl | Slavia v Arsenal | 7% / 13% / 80% | Arsenal 80% (66%–92%) ★ | Arsenal by 3+ | 0–2 | Bukayo Saka 30% |
| 2026-11-04 | cl | Viking v Sabah | 74% / 12% / 14% | Viking 74% (50%–93%) ★ | Viking by 3+ | 3–1 | Peter Christiansen 46% |
| 2026-11-04 | el | Stade Rennais v Olympiakos SFP | 40% / 25% / 35% | Stade Rennais 40% (26%–55%) | Draw | 1–1 | Boulaye Dia 19% |
| 2026-11-05 | el | Milan v Ferencváros | 61% / 20% / 19% | Milan 61% (45%–77%) | Milan by 1 | 1–0 | Alphadjo Cisse 33% |
| 2026-11-05 | el | Sparta Praha v Bournemouth | 19% / 21% / 60% | Bournemouth 60% (43%–77%) | Bournemouth by 1 | 0–1 | Justin Kluivert 30% |
| 2026-11-05 | el | AZ v Juventus | 29% / 25% / 47% | Juventus 47% (34%–62%) | Draw | 0–1 | Nick Woltemade 29% |
| 2026-11-05 | el | Bayer Leverkusen v Olympique de | 64% / 19% / 17% | Bayer Leverkusen 64% (50%–78%) ★ | Bayer Leverkusen by 1 | 2–0 | Patrik Schick 37% |
| 2026-11-05 | el | Celtic v Beşiktaş | 45% / 22% / 33% | Celtic 45% (29%–62%) | Draw | 1–1 | Camilo Durán 30% |
| 2026-11-05 | el | Crystal Palace v Hoffenheim | 60% / 20% / 20% | Crystal Palace 60% (46%–74%) ★ | Crystal Palace by 1 | 1–0 | Yeremy Pino 30% |
| 2026-11-05 | el | H. Beer-Sheva v OFI Heraklion | 43% / 25% / 32% | H. Beer-Sheva 43% (24%–63%) | Draw | 1–0 | Taxiarchis Fountas 16% |
| 2026-11-05 | el | Levski Sofia v Jagiellonia | 39% / 30% / 32% | Levski Sofia 39% (23%–57%) | Draw | 1–0 | Reinaldo 24% |
| 2026-11-05 | el | Lillestrøm v Viktoria Plzeň | 32% / 27% / 41% | Viktoria Plzeň 41% (21%–67%) | Draw | 0–1 | Thomas Olsen 19% |
| 2026-11-05 | el | NEC v Omonia | 45% / 24% / 32% | NEC 45% (29%–62%) | Draw | 1–1 | Tjaronn Chery 35% |
| 2026-11-05 | el | Celta de v Royale Union | 37% / 25% / 38% | Royale Union 38% (25%–53%) | Draw | 1–1 | Guilherme Smith 22% |
| 2026-11-05 | el | Real Sociedad v Olympique Lyonnais | 47% / 22% / 31% | Real Sociedad 47% (33%–62%) | Draw | 1–1 | Sergio Gómez 30% |
| 2026-11-05 | el | RSC Anderlecht v Red Bull | 63% / 19% / 18% | RSC Anderlecht 63% (47%–79%) ★ | RSC Anderlecht by 1 | 1–0 | Mihajlo Cvetković 41% |
| 2026-11-05 | el | Sturm Graz v Celje | 71% / 16% / 13% | Sturm Graz 71% (55%–86%) ★ | Sturm Graz by 3+ | 2–0 | Oumar Diakité 25% |
| 2026-11-05 | el | Sport Lisboa v Lech Poznań | 83% / 10% / 7% | Sport Lisboa 83% (70%–94%) ★ | Sport Lisboa by 3+ | 3–0 | Jhon Durán 46% |
| 2026-11-05 | el | Sunderland v Dinamo Zagreb | 66% / 19% / 15% | Sunderland 66% (49%–82%) ★ | Sunderland by 1 | 1–0 | Dion Beljo 26% |
| 2026-11-05 | ecl | Aarhus v Sporting Clube | 27% / 23% / 50% | Sporting Clube 50% (30%–72%) | Draw | 0–1 | Ricardo Horta 30% |
| 2026-11-05 | ecl | Monaco v Nordsjælland | 51% / 22% / 27% | Monaco 51% (32%–72%) | Monaco by 1 | 1–1 | Paris Brunner 35% |
| 2026-11-05 | ecl | Atalanta BC v Kairat Almaty | 84% / 12% / 5% | Atalanta BC 84% (71%–94%) ★ | Atalanta BC by 3+ | 2–0 | Gianluca Scamacca 34% |
| 2026-11-05 | ecl | Copenhagen v Iberia Tbilisi | 92% / 6% / 2% | Copenhagen 92% (82%–99%) ★ | Copenhagen by 3+ | 3–0 | Andreas Cornelius 44% |
| 2026-11-05 | ecl | Twente '65 v Pafos | 61% / 21% / 18% | Twente '65 61% (45%–76%) | Twente '65 by 1 | 1–0 | Wout Weghorst 38% |
| 2026-11-05 | ecl | Crvena Zvezda v Inter Escaldes | 88% / 7% / 5% | Crvena Zvezda 88% (73%–98%) ★ | Crvena Zvezda by 3+ | 3–0 | Vasilije Kostov 49% |
| 2026-11-05 | ecl | Getafe v Brighton & | 23% / 27% / 50% | Brighton & 50% (37%–64%) | Draw | 0–1 | Georginio Rutter 27% |
| 2026-11-05 | ecl | KuPS Kuopio v KAA Gent | 24% / 26% / 50% | KAA Gent 50% (33%–70%) | Draw | 0–1 | Hyllarion Goore 19% |
| 2026-11-05 | ecl | L. Red v Hajduk Split | 17% / 22% / 61% | Hajduk Split 61% (42%–81%) | Hajduk Split by 1 | 0–1 | Dalisson 29% |
| 2026-11-05 | ecl | Lugano v Kauno Žalgiris | 81% / 12% / 8% | Lugano 81% (63%–94%) ★ | Lugano by 3+ | 2–0 | Albian Ajeti 44% |
| 2026-11-05 | ecl | Midtjylland v Ajax | 53% / 22% / 25% | Midtjylland 53% (37%–69%) | Midtjylland by 1 | 1–1 | Julius Emefile 19% |
| 2026-11-05 | ecl | Mjällby v Borac | 47% / 27% / 26% | Mjällby 47% (27%–69%) | Draw | 1–0 | Jacob Bergström 31% |
| 2026-11-05 | ecl | Panathinaikos v CSKA Sofia | 71% / 17% / 12% | Panathinaikos 71% (52%–87%) ★ | Panathinaikos by 3+ | 2–0 | Cyriel Dessers 41% |
| 2026-11-05 | ecl | Riga v Jablonec | 25% / 25% / 49% | Jablonec 49% (29%–73%) | Draw | 0–1 | Antonín Růsek 30% |
| 2026-11-05 | ecl | Sint-Truidense VV v Brann | 40% / 23% / 37% | Sint-Truidense VV 40% (23%–59%) | Draw | 1–1 | Niklas Castro 38% |
| 2026-11-05 | ecl | Thun v Heart of | 47% / 23% / 30% | Thun 47% (27%–70%) | Draw | 1–1 | Brighton Labeau 25% |
| 2026-11-05 | ecl | Trabzonspor v Freiburg | 38% / 25% / 37% | Trabzonspor 38% (24%–53%) | Draw | 1–1 | Djú Franculino 36% |
| 2026-11-05 | ecl | Univ. Craiova v Egnatia | 49% / 22% / 29% | Univ. Craiova 49% (27%–71%) | Draw | 1–1 | Assad Al Hamlawi 42% |
| 2026-10-31 | de.1 | Bayer Leverkusen v Stuttgart | 56% / 20% / 25% | Bayer Leverkusen 56% (43%–68%) | Bayer Leverkusen by 1 | 2–1 | Patrik Schick 38% |
| 2026-10-31 | de.1 | Borussia Mönchengladbach v Paderborn | 52% / 22% / 26% | Borussia Mönchengladbach 52% (31%–74%) | Borussia Mönchengladbach by 1 | 1–0 | – |
| 2026-10-31 | de.1 | Augsburg v Freiburg | 38% / 23% / 40% | Freiburg 40% (27%–54%) | Draw | 1–1 | Vincenzo Grifo 31% |
| 2026-10-31 | de.1 | Bayern v Dortmund | 66% / 16% / 18% | Bayern 66% (53%–78%) ★ | Bayern by 3+ | 2–1 | Harry Kane 55% |
| 2026-10-31 | de.1 | Schalke v Leipzig | 24% / 22% / 54% | Leipzig 54% (32%–76%) | Leipzig by 1 | 0–1 | Brajan Gruda 21% |
| 2026-10-31 | de.1 | Werder Bremen v Hoffenheim | 41% / 21% / 39% | Werder Bremen 41% (27%–55%) | Draw | 1–1 | Andrej Kramarić 24% |
| 2026-10-31 | en.1 | Bournemouth v Leeds United | 48% / 24% / 28% | Bournemouth 48% (34%–62%) | Draw | 1–1 | Justin Kluivert 28% |
| 2026-10-31 | en.1 | Villa v Fulham | 53% / 23% / 24% | Villa 53% (41%–66%) | Villa by 1 | 1–0 | Nicolas Jackson 33% |
| 2026-10-31 | en.1 | Brentford v Nottingham Forest | 47% / 24% / 29% | Brentford 47% (35%–59%) | Draw | 1–1 | – |
| 2026-10-31 | en.1 | Chelsea v Man Utd | 45% / 22% / 33% | Chelsea 45% (33%–59%) | Draw | 1–1 | Bruno Fernandes 16% |
| 2026-10-31 | en.1 | Coventry City v Sunderland | 26% / 26% / 48% | Sunderland 48% (29%–71%) | Draw | 0–1 | Enzo Le Fée 16% |
| 2026-10-31 | en.1 | Hull City v Ipswich Town | 56% / 22% / 22% | Hull City 56% (35%–78%) | Hull City by 1 | 1–0 | – |
| 2026-10-31 | en.1 | Man City v Brighton & | 57% / 21% / 22% | Man City 57% (45%–69%) | Man City by 1 | 1–0 | Erling Haaland 39% |
| 2026-10-31 | en.1 | Tottenham Hotspur v Crystal Palace | 46% / 24% / 30% | Tottenham Hotspur 46% (34%–58%) | Draw | 1–1 | Yeremy Pino 19% |
| 2026-10-31 | fr.1 | ES Troyes v Le Mans | 33% / 21% / 47% | Le Mans 47% (21%–78%) | Draw | 1–1 | – |
| 2026-10-31 | fr.1 | Lorient v Stade Brestois | 43% / 23% / 34% | Lorient 43% (30%–57%) | Draw | 1–1 | – |
| 2026-10-31 | fr.1 | OGC Nice v Stade Rennais | 34% / 23% / 43% | Stade Rennais 43% (31%–57%) | Draw | 1–1 | Boulaye Dia 23% |
| 2026-10-31 | fr.1 | Olympique Lyonnais v Angers SCO | 65% / 20% / 15% | Olympique Lyonnais 65% (53%–77%) ★ | Olympique Lyonnais by 1 | 1–0 | Keito Nakamura 28% |
| 2026-10-31 | it.1 | Milan v Inter | 28% / 23% / 49% | Inter 49% (36%–63%) | Draw | 1–1 | Lautaro Martínez 28% |
| 2026-10-31 | it.1 | Bologna v Monza | 63% / 21% / 16% | Bologna 63% (50%–77%) ★ | Bologna by 1 | 1–0 | – |
| 2026-10-31 | it.1 | Udinese Calcio v Roma | 20% / 23% / 57% | Roma 57% (44%–71%) | Roma by 1 | 0–1 | Donyell Malen 39% |
| 2026-10-31 | nl.1 | Ajax v AZ | 49% / 21% / 30% | Ajax 49% (37%–62%) | Ajax by 1 | 2–1 | Mexx Meerdink 24% |
| 2026-10-31 | nl.1 | Feyenoord v Fortuna Sittard | 76% / 14% / 10% | Feyenoord 76% (65%–87%) ★ | Feyenoord by 3+ | 2–0 | Anis Hadj Moussa 32% |
| 2026-10-31 | nl.1 | PSV v Willem II | 93% / 5% / 3% | PSV 93% (85%–98%) ★ | PSV by 3+ | 4–0 | Ivan Perišić 38% |
| 2026-10-31 | nl.1 | Cambuur-Leeuwarden v Go Ahead | 23% / 18% / 59% | Go Ahead 59% (38%–81%) | Go Ahead by 3+ | 1–2 | – |
| 2026-10-31 | nl.1 | Heerenveen v NEC | 40% / 21% / 39% | Heerenveen 40% (27%–53%) | Draw | 1–1 | Tjaronn Chery 38% |
| 2026-10-31 | pt.1 | Porto v GD Estoril | 75% / 16% / 10% | Porto 75% (64%–85%) ★ | Porto by 3+ | 2–0 | Samu 36% |
| 2026-10-31 | pt.1 | Moreirense v Estrela da | 47% / 25% / 28% | Moreirense 47% (35%–60%) | Draw | 1–0 | – |
| 2026-11-01 | de.1 | Union Berlin v Köln | 43% / 24% / 33% | Union Berlin 43% (29%–57%) | Draw | 1–1 | – |
| 2026-11-01 | de.1 | Eintracht Frankfurt v Hamburger | 62% / 18% / 19% | Eintracht Frankfurt 62% (47%–77%) ★ | Eintracht Frankfurt by 3+ | 2–1 | – |
| 2026-11-01 | en.1 | Liverpool v Arsenal | 28% / 26% / 46% | Arsenal 46% (35%–58%) | Draw | 0–1 | Bukayo Saka 20% |
| 2026-11-01 | es.1 | Athletic Club v Real Sociedad | 49% / 24% / 28% | Athletic Club 49% (37%–61%) | Draw | 1–1 | Sergio Gómez 20% |
| 2026-11-01 | es.1 | Elche v Valencia | 47% / 23% / 30% | Elche 47% (33%–62%) | Draw | 1–1 | – |
| 2026-11-01 | es.1 | Barça v Deportivo Alavés | 81% / 11% / 7% | Barça 81% (71%–90%) ★ | Barça by 3+ | 3–0 | Anthony Gordon 49% |
| 2026-11-01 | es.1 | Getafe v Sevilla | 41% / 28% / 31% | Getafe 41% (30%–52%) | Draw | 1–0 | Borja Mayoral 24% |
| 2026-11-01 | es.1 | Levante v Atlético | 22% / 21% / 57% | Atlético 57% (44%–72%) | Atlético by 1 | 1–2 | Julián Alvarez 44% |
| 2026-11-01 | es.1 | Rayo Vallecano v Celta de | 41% / 26% / 33% | Rayo Vallecano 41% (30%–53%) | Draw | 1–1 | Williot Swedberg 13% |
| 2026-11-01 | es.1 | Deportivo La v CA Osasuna | 42% / 24% / 33% | Deportivo La 42% (25%–63%) | Draw | 1–1 | – |
| 2026-11-01 | es.1 | Betis v Málaga | 72% / 18% / 11% | Betis 72% (55%–87%) ★ | Betis by 3+ | 1–0 | Antony 29% |
| 2026-11-01 | es.1 | Real Racing v Real Madrid | 9% / 11% / 80% | Real Madrid 80% (60%–94%) ★ | Real Madrid by 3+ | 1–3 | Kylian Mbappé 73% |
| 2026-11-01 | es.1 | Villarreal v Espanyol de | 63% / 19% / 18% | Villarreal 63% (50%–76%) ★ | Villarreal by 1 | 2–1 | Georges Mikautadze 35% |
| 2026-11-01 | fr.1 | Olympique de v Toulouse | 52% / 22% / 26% | Olympique de 52% (39%–66%) | Olympique de by 1 | 1–1 | Keyliane Abdallah 30% |
| 2026-11-01 | fr.1 | Paris v Monaco | 33% / 23% / 44% | Monaco 44% (30%–60%) | Draw | 1–1 | Paris Brunner 33% |
| 2026-11-01 | fr.1 | Strasbourg Alsace v AJ Auxerre | 55% / 22% / 24% | Strasbourg Alsace 55% (41%–68%) | Strasbourg Alsace by 1 | 1–0 | – |
| 2026-11-01 | it.1 | Como v Venezia | 74% / 16% / 10% | Como 74% (61%–87%) ★ | Como by 3+ | 2–0 | Tasos Douvikas 37% |
| 2026-11-01 | it.1 | Frosinone Calcio v Torino | 42% / 24% / 34% | Frosinone Calcio 42% (27%–59%) | Draw | 1–1 | – |
| 2026-11-01 | it.1 | Juventus v Napoli | 46% / 26% / 28% | Juventus 46% (35%–57%) | Draw | 1–0 | Nick Woltemade 27% |
| 2026-11-01 | it.1 | SS Lazio v Cagliari Calcio | 53% / 25% / 22% | SS Lazio 53% (41%–66%) | SS Lazio by 1 | 1–0 | – |
| 2026-11-01 | it.1 | US Lecce v Genoa CFC | 31% / 29% / 40% | Genoa CFC 40% (29%–53%) | Draw | 0–1 | – |
| 2026-11-01 | nl.1 | Groningen v Sparta Rotterdam | 52% / 23% / 25% | Groningen 52% (39%–66%) | Groningen by 1 | 1–1 | – |
| 2026-11-01 | nl.1 | PEC Zwolle v ADO Den | 56% / 20% / 24% | PEC Zwolle 56% (36%–76%) | PEC Zwolle by 1 | 2–1 | – |
| 2026-11-01 | nl.1 | SBV Excelsior v Twente '65 | 29% / 22% / 49% | Twente '65 49% (36%–63%) | Twente '65 by 1 | 1–1 | Wout Weghorst 37% |
| 2026-11-01 | nl.1 | Telstar v Utrecht | 35% / 23% / 42% | Utrecht 42% (29%–57%) | Draw | 1–1 | – |
| 2026-11-01 | pt.1 | Académico de v Rio Ave | 49% / 24% / 28% | Académico de 49% (30%–70%) | Draw | 1–0 | – |
| 2026-11-01 | pt.1 | CS Marítimo v Santa Clara | 29% / 27% / 45% | Santa Clara 45% (27%–66%) | Draw | 0–1 | – |
| 2026-11-01 | pt.1 | Arouca v Nacional | 53% / 23% / 25% | Arouca 53% (39%–66%) | Arouca by 1 | 1–0 | – |
| 2026-11-01 | pt.1 | Sporting Clube v Famalicão | 50% / 26% / 24% | Sporting Clube 50% (39%–61%) | Draw | 1–0 | Ricardo Horta 27% |
| 2026-11-02 | en.1 | Newcastle United v Everton | 48% / 25% / 27% | Newcastle United 48% (37%–61%) | Draw | 1–0 | – |
| 2026-11-02 | it.1 | Atalanta BC v Parma Calcio | 63% / 22% / 14% | Atalanta BC 63% (52%–75%) ★ | Atalanta BC by 1 | 1–0 | Gianluca Scamacca 30% |
| 2026-11-02 | it.1 | US Sassuolo v ACF Fiorentina | 38% / 23% / 39% | ACF Fiorentina 39% (27%–54%) | Draw | 1–1 | – |
| 2026-11-02 | pt.1 | Gil Vicente v Vitória Guimarães | 40% / 27% / 33% | Gil Vicente 40% (29%–53%) | Draw | 1–0 | – |
| 2026-11-02 | pt.1 | Sport Lisboa v Alverca | 84% / 11% / 6% | Sport Lisboa 84% (74%–92%) ★ | Sport Lisboa by 3+ | 2–0 | Jhon Durán 43% |
| 2026-11-06 | de.1 | Hamburger v Borussia Mönchengladbach | 38% / 23% / 39% | Borussia Mönchengladbach 39% (25%–56%) | Draw | 1–1 | – |
| 2026-11-06 | fr.1 | Toulouse v Strasbourg Alsace | 40% / 24% / 37% | Toulouse 40% (28%–53%) | Draw | 1–1 | – |
| 2026-11-06 | it.1 | Venezia v Udinese Calcio | 27% / 26% / 47% | Udinese Calcio 47% (33%–64%) | Draw | 0–1 | – |
| 2026-11-06 | nl.1 | Willem II v PEC Zwolle | 37% / 23% / 40% | PEC Zwolle 40% (25%–57%) | Draw | 1–1 | – |
| 2026-11-06 | pt.1 | Famalicão v Arouca | 51% / 24% / 24% | Famalicão 51% (39%–64%) | Famalicão by 1 | 1–0 | – |
| 2026-11-07 | de.1 | FSV Mainz v Bayern | 14% / 15% / 70% | Bayern 70% (57%–83%) ★ | Bayern by 3+ | 1–2 | Harry Kane 55% |
| 2026-11-07 | de.1 | Dortmund v Elversberg | 72% / 15% / 14% | Dortmund 72% (51%–89%) ★ | Dortmund by 3+ | 2–0 | Serhou Guirassy 59% |
| 2026-11-07 | de.1 | Leipzig v Augsburg | 60% / 19% / 20% | Leipzig 60% (47%–74%) ★ | Leipzig by 1 | 2–1 | Brajan Gruda 25% |
| 2026-11-07 | de.1 | Paderborn v Eintracht Frankfurt | 30% / 22% / 48% | Eintracht Frankfurt 48% (26%–73%) | Draw | 1–1 | – |
| 2026-11-07 | de.1 | Stuttgart v Werder Bremen | 65% / 18% / 18% | Stuttgart 65% (52%–77%) ★ | Stuttgart by 3+ | 2–1 | Deniz Undav 33% |
| 2026-11-07 | en.1 | Arsenal v Hull City | 72% / 19% / 10% | Arsenal 72% (55%–87%) ★ | Arsenal by 1 | 1–0 | Bukayo Saka 27% |
| 2026-11-07 | en.1 | Brighton & v Brentford | 47% / 23% / 30% | Brighton & 47% (34%–60%) | Draw | 1–1 | Georginio Rutter 37% |
| 2026-11-07 | en.1 | Crystal Palace v Liverpool | 26% / 23% / 51% | Liverpool 51% (40%–65%) | Liverpool by 1 | 0–1 | Dominik Szoboszlai 21% |
| 2026-11-07 | en.1 | Everton v Coventry City | 61% / 23% / 16% | Everton 61% (43%–79%) | Everton by 1 | 1–0 | – |
| 2026-11-07 | en.1 | Fulham v Newcastle United | 36% / 24% / 41% | Newcastle United 41% (28%–54%) | Draw | 1–1 | – |
| 2026-11-07 | en.1 | Ipswich Town v Bournemouth | 20% / 21% / 59% | Bournemouth 59% (43%–75%) | Bournemouth by 1 | 0–1 | Justin Kluivert 34% |
| 2026-11-07 | en.1 | Leeds United v Tottenham Hotspur | 44% / 24% / 33% | Leeds United 44% (30%–58%) | Draw | 1–1 | – |
| 2026-11-07 | en.1 | Man Utd v Villa | 39% / 23% / 38% | Man Utd 39% (28%–52%) | Draw | 1–1 | Nicolas Jackson 29% |
| 2026-11-07 | en.1 | Nottingham Forest v Man City | 25% / 23% / 52% | Man City 52% (40%–65%) | Man City by 1 | 0–1 | Erling Haaland 35% |
| 2026-11-07 | en.1 | Sunderland v Chelsea | 32% / 24% / 44% | Chelsea 44% (30%–59%) | Draw | 1–1 | Enzo Le Fée 14% |
| 2026-11-07 | fr.1 | AJ Auxerre v Paris | 37% / 25% / 38% | Paris 38% (25%–53%) | Draw | 1–1 | – |
| 2026-11-07 | fr.1 | PSG v ES Troyes | 93% / 5% / 2% | PSG 93% (82%–99%) ★ | PSG by 3+ | 4–0 | Ousmane Dembélé 62% |
| 2026-11-07 | it.1 | Roma v US Sassuolo | 68% / 18% / 14% | Roma 68% (56%–81%) ★ | Roma by 3+ | 2–0 | Donyell Malen 47% |
| 2026-11-07 | it.1 | Cagliari Calcio v Frosinone Calcio | 42% / 24% / 35% | Cagliari Calcio 42% (26%–58%) | Draw | 1–1 | – |
| 2026-11-07 | it.1 | Parma Calcio v Bologna | 26% / 27% / 46% | Bologna 46% (35%–60%) | Draw | 0–1 | – |
| 2026-11-07 | it.1 | Torino v US Lecce | 49% / 27% / 24% | Torino 49% (37%–62%) | Draw | 1–0 | – |
| 2026-11-07 | nl.1 | ADO Den v Sparta Rotterdam | 31% / 23% / 47% | Sparta Rotterdam 47% (28%–69%) | Draw | 1–1 | – |
| 2026-11-07 | nl.1 | Fortuna Sittard v Telstar | 43% / 24% / 33% | Fortuna Sittard 43% (30%–58%) | Draw | 1–1 | – |
| 2026-11-07 | nl.1 | SBV Excelsior v Go Ahead | 40% / 22% / 38% | SBV Excelsior 40% (27%–55%) | Draw | 1–1 | – |
| 2026-11-07 | pt.1 | Nacional v Académico de | 40% / 25% / 35% | Nacional 40% (22%–59%) | Draw | 1–1 | – |
| 2026-11-07 | pt.1 | Alverca v Casa Pia | 46% / 25% / 29% | Alverca 46% (32%–60%) | Draw | 1–0 | – |
| 2026-11-07 | pt.1 | Sporting v Moreirense | 82% / 12% / 7% | Sporting 82% (72%–90%) ★ | Sporting by 3+ | 2–0 | Luis Suárez 51% |
| 2026-11-08 | de.1 | Köln v Bayer Leverkusen | 18% / 19% / 64% | Bayer Leverkusen 64% (50%–78%) ★ | Bayer Leverkusen by 1 | 1–2 | Patrik Schick 39% |
| 2026-11-08 | de.1 | Freiburg v Union Berlin | 60% / 20% / 20% | Freiburg 60% (47%–73%) ★ | Freiburg by 1 | 1–0 | Vincenzo Grifo 38% |
| 2026-11-08 | de.1 | Hoffenheim v Schalke | 58% / 20% / 22% | Hoffenheim 58% (37%–79%) | Hoffenheim by 1 | 1–0 | Andrej Kramarić 27% |
| 2026-11-08 | es.1 | CA Osasuna v Athletic Club | 36% / 26% / 38% | Athletic Club 38% (27%–51%) | Draw | 1–1 | – |
| 2026-11-08 | es.1 | Atlético v Barça | 38% / 21% / 42% | Barça 42% (29%–56%) | Draw | 1–1 | Julián Alvarez 40% |
| 2026-11-08 | es.1 | Elche v Betis | 34% / 23% / 43% | Betis 43% (29%–59%) | Draw | 1–1 | Antony 23% |
| 2026-11-08 | es.1 | Málaga v Real Racing | 42% / 23% / 36% | Málaga 42% (18%–67%) | Draw | 1–1 | – |
| 2026-11-08 | es.1 | Celta de v Levante | 58% / 21% / 22% | Celta de 58% (44%–71%) | Celta de by 1 | 1–0 | Williot Swedberg 20% |
| 2026-11-08 | es.1 | Espanyol de v Deportivo La | 48% / 24% / 28% | Espanyol de 48% (29%–69%) | Draw | 1–0 | – |
| 2026-11-08 | es.1 | Real Sociedad v Rayo Vallecano | 50% / 24% / 26% | Real Sociedad 50% (38%–63%) | Draw | 1–0 | Sergio Gómez 27% |
| 2026-11-08 | es.1 | Sevilla v Deportivo Alavés | 44% / 25% / 30% | Sevilla 44% (32%–57%) | Draw | 1–0 | – |
| 2026-11-08 | es.1 | Valencia v Real Madrid | 17% / 20% / 63% | Real Madrid 63% (51%–76%) ★ | Real Madrid by 1 | 0–1 | Kylian Mbappé 56% |
| 2026-11-08 | es.1 | Villarreal v Getafe | 61% / 21% / 18% | Villarreal 61% (48%–73%) ★ | Villarreal by 1 | 1–0 | Georges Mikautadze 30% |
| 2026-11-08 | fr.1 | Angers SCO v OGC Nice | 35% / 28% / 37% | OGC Nice 37% (26%–50%) | Draw | 0–1 | – |
| 2026-11-08 | fr.1 | Le Havre v Lorient | 37% / 25% / 38% | Lorient 38% (26%–53%) | Draw | 1–1 | – |
| 2026-11-08 | fr.1 | Le Mans v Monaco | 24% / 19% / 57% | Monaco 57% (34%–81%) | Monaco by 1 | 1–2 | Paris Brunner 42% |
| 2026-11-08 | fr.1 | Lens v Olympique de | 47% / 23% / 31% | Lens 47% (34%–60%) | Draw | 1–1 | Keyliane Abdallah 23% |
| 2026-11-08 | fr.1 | Stade Brestois v Olympique Lyonnais | 32% / 23% / 46% | Olympique Lyonnais 46% (33%–60%) | Draw | 1–1 | Keito Nakamura 25% |
| 2026-11-08 | fr.1 | Stade Rennais v Lille | 39% / 24% / 37% | Stade Rennais 39% (27%–51%) | Draw | 1–1 | Boulaye Dia 21% |
| 2026-11-08 | it.1 | Monza v Atalanta BC | 15% / 20% / 65% | Atalanta BC 65% (50%–80%) ★ | Atalanta BC by 1 | 0–1 | Gianluca Scamacca 34% |
| 2026-11-08 | it.1 | ACF Fiorentina v Juventus | 25% / 24% / 51% | Juventus 51% (39%–64%) | Juventus by 1 | 0–1 | Nick Woltemade 30% |
| 2026-11-08 | it.1 | Inter v Como | 56% / 21% / 23% | Inter 56% (43%–69%) | Inter by 1 | 2–1 | Lautaro Martínez 32% |
| 2026-11-08 | it.1 | Genoa CFC v Milan | 24% / 24% / 52% | Milan 52% (39%–66%) | Milan by 1 | 0–1 | Alphadjo Cisse 33% |
| 2026-11-08 | it.1 | Napoli v SS Lazio | 45% / 27% / 29% | Napoli 45% (33%–56%) | Draw | 1–0 | Rasmus Højlund 17% |
| 2026-11-08 | nl.1 | AZ v Groningen | 60% / 20% / 20% | AZ 60% (46%–72%) | AZ by 1 | 2–1 | Mexx Meerdink 32% |
| 2026-11-08 | nl.1 | Twente '65 v Ajax | 43% / 22% / 35% | Twente '65 43% (31%–56%) | Draw | 1–1 | Wout Weghorst 36% |
| 2026-11-08 | nl.1 | Utrecht v NEC | 43% / 21% / 36% | Utrecht 43% (30%–57%) | Draw | 1–1 | Tjaronn Chery 37% |
| 2026-11-08 | nl.1 | Cambuur-Leeuwarden v PSV | 5% / 7% / 89% | PSV 89% (74%–98%) ★ | PSV by 3+ | 0–4 | Ivan Perišić 39% |
| 2026-11-08 | nl.1 | Heerenveen v Feyenoord | 25% / 20% / 55% | Feyenoord 55% (41%–69%) | Feyenoord by 1 | 1–2 | Anis Hadj Moussa 25% |
| 2026-11-08 | pt.1 | Santa Clara v Gil Vicente | 41% / 30% / 29% | Santa Clara 41% (30%–53%) | Draw | 1–0 | – |
| 2026-11-08 | pt.1 | Estrela da v Sport Lisboa | 9% / 15% / 76% | Sport Lisboa 76% (65%–87%) ★ | Sport Lisboa by 3+ | 0–2 | Jhon Durán 38% |
| 2026-11-08 | pt.1 | GD Estoril v CS Marítimo | 58% / 20% / 22% | GD Estoril 58% (37%–79%) | GD Estoril by 1 | 2–1 | – |
| 2026-11-08 | pt.1 | Rio Ave v Sporting Clube | 19% / 22% / 59% | Sporting Clube 59% (47%–72%) | Sporting Clube by 1 | 0–1 | Ricardo Horta 33% |
| 2026-11-08 | pt.1 | Vitória Guimarães v Porto | 20% / 24% / 56% | Porto 56% (44%–70%) | Porto by 1 | 0–1 | Samu 25% |

### UEFA club-competition scenarios (5,000 minute-by-minute simulations each)

| Match | First goal H / none / A | Favourite wins after conceding first | Favourite trails / trails by 2 | Favourite drops a lead | Likeliest HT/FT | Late winner (level at 75') | Goal in each 15' block |
|---|---|---|---|---|---|---|---|
| Atlético v Bayern | 47% / 2% / 51% | Bayern: 21% | 59% / 29% | 21% | A/A 27%, H/H 22% | 12% | 44% 48% 49% 49% 54% 58% |
| Barça v Villa | 63% / 1% / 36% | Barça: 38% | 45% / 17% | 17% | H/H 42%, D/H 15% | 12% | 47% 50% 52% 52% 57% 61% |
| Feyenoord v Inter | 40% / 2% / 58% | Inter: 28% | 50% / 21% | 19% | A/A 35%, H/H 15% | 12% | 43% 47% 48% 48% 53% 57% |
| Bodø/Glimt v Lille | 59% / 3% / 38% | Bodø/Glimt: 26% | 45% / 16% | 16% | H/H 34%, D/H 17% | 12% | 38% 42% 42% 43% 47% 51% |
| Shakhtar Donetsk v Sporting | 39% / 4% / 58% | Sporting: 24% | 46% / 18% | 16% | A/A 34%, D/A 15% | 11% | 38% 42% 42% 43% 47% 51% |
| Galatasaray v Stuttgart | 54% / 2% / 44% | Galatasaray: 23% | 55% / 25% | 21% | H/H 29%, A/A 19% | 12% | 43% 46% 47% 47% 52% 56% |
| LASK v ŠK Slovan | 59% / 4% / 37% | LASK: 24% | 44% / 15% | 15% | H/H 35%, D/H 17% | 12% | 38% 41% 42% 42% 46% 50% |
| Man Utd v Roma | 58% / 3% / 38% | Man Utd: 25% | 46% / 17% | 16% | H/H 33%, D/H 16% | 12% | 39% 42% 43% 43% 47% 52% |
| Villarreal v PSG | 43% / 1% / 56% | PSG: 28% | 54% / 24% | 20% | A/A 34%, H/H 17% | 12% | 46% 49% 51% 51% 56% 60% |
| AEK Athen v Real Madrid | 31% / 3% / 66% | Real Madrid: 35% | 37% / 12% | 13% | A/A 45%, D/A 17% | 10% | 41% 44% 45% 45% 50% 54% |
| Dortmund v Betis | 62% / 3% / 35% | Dortmund: 29% | 42% / 14% | 15% | H/H 38%, D/H 18% | 12% | 39% 42% 43% 43% 48% 52% |
| Porto v Napoli | 60% / 5% / 35% | Porto: 22% | 41% / 14% | 14% | H/H 34%, D/H 18% | 11% | 34% 37% 37% 38% 42% 46% |
| Fenerbahçe v Liverpool | 37% / 3% / 60% | Liverpool: 28% | 44% / 16% | 15% | A/A 37%, D/A 16% | 11% | 39% 43% 43% 44% 48% 52% |
| PSV v Brugge | 54% / 1% / 45% | PSV: 24% | 57% / 28% | 22% | H/H 30%, A/A 20% | 12% | 46% 49% 50% 51% 56% 60% |
| Lens v Como | 52% / 3% / 45% | Lens: 19% | 55% / 24% | 19% | H/H 27%, A/A 20% | 12% | 39% 42% 43% 44% 48% 52% |
| Leipzig v Man City | 37% / 3% / 60% | Man City: 29% | 44% / 16% | 15% | A/A 38%, D/A 16% | 11% | 40% 43% 44% 45% 49% 53% |
| Slavia v Arsenal | 17% / 5% / 78% | Arsenal: 45% | 19% / 3% | 6% | A/A 57%, D/A 22% | 8% | 36% 39% 39% 40% 44% 48% |
| Viking v Sabah | 70% / 1% / 29% | Viking: 47% | 36% / 12% | 13% | H/H 54%, D/H 15% | 9% | 50% 53% 54% 55% 60% 64% |
| Stade Rennais v Olympiakos SFP | 49% / 8% / 43% | Stade Rennais: 12% | 50% / 20% | 16% | H/H 23%, A/A 19% | 11% | 30% 32% 33% 34% 38% 41% |
| Milan v Ferencváros | 63% / 5% / 32% | Milan: 27% | 38% / 11% | 14% | H/H 38%, D/H 19% | 11% | 36% 39% 39% 40% 44% 48% |
| Sparta Praha v Bournemouth | 32% / 6% / 62% | Bournemouth: 26% | 37% / 11% | 12% | A/A 38%, D/A 19% | 11% | 33% 37% 37% 38% 42% 46% |
| AZ v Juventus | 39% / 8% / 53% | Juventus: 16% | 44% / 16% | 14% | A/A 28%, D/A 16% | 11% | 31% 33% 33% 34% 38% 42% |
| Bayer Leverkusen v Olympique de | 66% / 5% / 30% | Bayer Leverkusen: 30% | 35% / 10% | 13% | H/H 41%, D/H 19% | 10% | 36% 39% 39% 40% 44% 48% |
| Celtic v Beşiktaş | 53% / 5% / 43% | Celtic: 17% | 51% / 21% | 17% | H/H 27%, A/A 19% | 12% | 35% 38% 39% 39% 44% 48% |
| Crystal Palace v Hoffenheim | 63% / 5% / 32% | Crystal Palace: 26% | 38% / 11% | 13% | H/H 38%, D/H 19% | 11% | 35% 38% 39% 39% 43% 47% |
| H. Beer-Sheva v OFI Heraklion | 50% / 9% / 41% | H. Beer-Sheva: 12% | 47% / 18% | 14% | H/H 25%, A/A 18% | 11% | 30% 32% 32% 33% 37% 40% |
| Levski Sofia v Jagiellonia | 45% / 15% / 40% | Levski Sofia: 8% | 44% / 15% | 12% | D/D 22%, H/H 20% | 12% | 24% 26% 26% 28% 30% 34% |
| Lillestrøm v Viktoria Plzeň | 41% / 12% / 48% | Viktoria Plzeň: 12% | 45% / 17% | 13% | A/A 24%, D/D 19% | 11% | 27% 30% 29% 31% 34% 38% |
| NEC v Omonia | 52% / 6% / 41% | NEC: 15% | 49% / 19% | 16% | H/H 26%, A/A 18% | 11% | 32% 35% 36% 37% 41% 44% |
| Celta de v Royale Union | 46% / 8% / 46% | Royale Union: 12% | 52% / 22% | 16% | A/A 21%, H/H 21% | 11% | 30% 33% 33% 34% 38% 42% |
| Real Sociedad v Olympique Lyonnais | 54% / 4% / 41% | Real Sociedad: 18% | 50% / 19% | 18% | H/H 28%, A/A 17% | 12% | 36% 39% 40% 40% 44% 48% |
| RSC Anderlecht v Red Bull | 65% / 5% / 31% | RSC Anderlecht: 29% | 36% / 10% | 13% | H/H 40%, D/H 19% | 11% | 36% 39% 39% 40% 44% 48% |
| Sturm Graz v Celje | 69% / 4% / 27% | Sturm Graz: 37% | 31% / 8% | 11% | H/H 47%, D/H 19% | 10% | 38% 41% 42% 42% 47% 51% |
| Sport Lisboa v Lech Poznań | 78% / 2% / 21% | Sport Lisboa: 54% | 24% / 6% | 8% | H/H 62%, D/H 17% | 8% | 45% 49% 49% 50% 55% 59% |
| Sunderland v Dinamo Zagreb | 67% / 6% / 27% | Sunderland: 28% | 31% / 7% | 11% | H/H 42%, D/H 20% | 10% | 33% 36% 37% 37% 41% 45% |
| Aarhus v Sporting Clube | 38% / 7% / 55% | Sporting Clube: 19% | 44% / 16% | 14% | A/A 31%, D/A 17% | 11% | 32% 36% 36% 37% 41% 44% |
| Monaco v Nordsjælland | 57% / 5% / 38% | Monaco: 19% | 45% / 16% | 15% | H/H 31%, D/H 17% | 11% | 34% 37% 38% 39% 43% 47% |
| Atalanta BC v Kairat Almaty | 82% / 5% / 13% | Atalanta BC: 45% | 14% / 2% | 5% | H/H 59%, D/H 22% | 7% | 35% 38% 38% 39% 43% 47% |
| Copenhagen v Iberia Tbilisi | 88% / 3% / 9% | Copenhagen: 64% | 10% / 1% | 3% | H/H 73%, D/H 17% | 5% | 43% 46% 47% 48% 52% 56% |
| Twente '65 v Pafos | 64% / 7% / 29% | Twente '65: 22% | 33% / 9% | 12% | H/H 38%, D/H 20% | 10% | 32% 34% 34% 36% 39% 43% |
| Crvena Zvezda v Inter Escaldes | 82% / 1% / 16% | Crvena Zvezda: 60% | 19% / 4% | 6% | H/H 69%, D/H 15% | 6% | 49% 52% 53% 53% 59% 63% |
| Getafe v Brighton & | 33% / 11% / 55% | Brighton &: 17% | 37% / 10% | 11% | A/A 30%, D/A 19% | 11% | 26% 28% 28% 30% 33% 37% |
| KuPS Kuopio v KAA Gent | 34% / 11% / 56% | KAA Gent: 17% | 37% / 11% | 12% | A/A 30%, D/D 19% | 11% | 27% 29% 29% 31% 34% 38% |
| L. Red v Hajduk Split | 27% / 9% / 64% | Hajduk Split: 26% | 30% / 7% | 10% | A/A 39%, D/A 20% | 10% | 30% 32% 32% 34% 37% 40% |
| Lugano v Kauno Žalgiris | 77% / 3% / 20% | Lugano: 47% | 23% / 5% | 7% | H/H 58%, D/H 19% | 8% | 40% 43% 44% 44% 49% 53% |
| Midtjylland v Ajax | 58% / 6% / 36% | Midtjylland: 21% | 43% / 14% | 15% | H/H 32%, D/H 18% | 11% | 33% 36% 37% 37% 42% 45% |
| Mjällby v Borac | 53% / 12% / 35% | Mjällby: 13% | 39% / 13% | 12% | H/H 27%, D/D 19% | 11% | 27% 29% 29% 31% 34% 37% |
| Panathinaikos v CSKA Sofia | 71% / 6% / 24% | Panathinaikos: 32% | 27% / 6% | 10% | H/H 46%, D/H 21% | 9% | 34% 37% 37% 38% 42% 46% |
| Riga v Jablonec | 35% / 10% / 55% | Jablonec: 16% | 39% / 12% | 12% | A/A 30%, D/A 18% | 11% | 28% 31% 31% 32% 36% 39% |
| Sint-Truidense VV v Brann | 49% / 6% / 45% | Sint-Truidense VV: 14% | 54% / 24% | 17% | H/H 24%, A/A 21% | 12% | 34% 37% 38% 38% 42% 46% |
| Thun v Heart of | 54% / 6% / 40% | Thun: 17% | 48% / 18% | 16% | H/H 29%, A/A 17% | 11% | 33% 37% 37% 37% 42% 46% |
| Trabzonspor v Freiburg | 46% / 8% / 46% | Trabzonspor: 11% | 53% / 22% | 16% | A/A 21%, H/H 21% | 11% | 30% 33% 33% 34% 38% 41% |
| Univ. Craiova v Egnatia | 55% / 5% / 39% | Univ. Craiova: 19% | 47% / 18% | 16% | H/H 30%, A/A 17% | 12% | 35% 38% 38% 39% 43% 47% |

★ = high-probability pick (≥60% and the low end of its range ≥45%).

## League offsets (shared by every club from the country in cross-border games)

| Country | Offset | ± |
|---|---|---|
| ENG | +0.51 | 0.05 |
| ESP | +0.34 | 0.05 |
| GER | +0.28 | 0.05 |
| FRA | +0.24 | 0.05 |
| ITA | +0.21 | 0.05 |
| BEL | +0.19 | 0.06 |
| DEN | +0.11 | 0.06 |
| TUR | +0.08 | 0.06 |
| GRE | +0.08 | 0.06 |
| POR | +0.06 | 0.06 |
| NOR | +0.06 | 0.06 |
| NED | -0.01 | 0.06 |

## Strongest clubs (expected goal difference per game vs a zero-rated side)

| Club | Strength | ± |
|---|---|---|
| FC Barcelona | +3.28 | 0.11 |
| FC Bayern München | +3.17 | 0.12 |
| Manchester City FC | +2.70 | 0.12 |
| Real Madrid CF | +2.63 | 0.12 |
| Arsenal FC | +2.57 | 0.12 |
| Paris Saint-Germain FC | +2.50 | 0.12 |
| Liverpool FC | +2.34 | 0.12 |
| FC Internazionale Milano | +2.13 | 0.12 |
| Club Atlético de Madrid | +1.99 | 0.11 |
| Aston Villa FC | +1.97 | 0.12 |
| Newcastle United FC | +1.94 | 0.12 |
| Chelsea FC | +1.92 | 0.12 |
| Brighton & Hove Albion FC | +1.86 | 0.12 |
| Sporting Clube de Portugal | +1.83 | 0.12 |
| Sport Lisboa e Benfica | +1.80 | 0.12 |
| Manchester United FC | +1.79 | 0.12 |
| Brentford FC | +1.75 | 0.12 |
| Borussia Dortmund | +1.73 | 0.12 |
| Bayer 04 Leverkusen | +1.69 | 0.12 |
| AFC Bournemouth | +1.67 | 0.12 |
