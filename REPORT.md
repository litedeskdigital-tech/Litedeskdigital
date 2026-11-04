# Model report

Generated 2026-11-04. Ratings include results up to 2026-11-04. Parameter set v3 (tuned 2026-10-21).

Sources: openfootball cl 2023-24, openfootball cl 2024-25, openfootball cl 2025-26, openfootball en.1 2023-24, openfootball es.1 2023-24, openfootball de.1 2023-24, openfootball it.1 2023-24, openfootball fr.1 2023-24, openfootball pt.1 2023-24, openfootball nl.1 2023-24, openfootball at.1 2023-24, openfootball en.1 2024-25, openfootball es.1 2024-25, openfootball de.1 2024-25, openfootball it.1 2024-25, openfootball fr.1 2024-25, openfootball pt.1 2024-25, openfootball nl.1 2024-25, openfootball at.1 2024-25, openfootball be.1 2024-25, openfootball tr.1 2024-25, openfootball sco.1 2024-25, openfootball gr.1 2024-25, openfootball en.1 2025-26, openfootball es.1 2025-26, openfootball de.1 2025-26, openfootball it.1 2025-26, openfootball fr.1 2025-26, openfootball pt.1 2025-26, openfootball nl.1 2025-26, openfootball at.1 2025-26, openfootball be.1 2025-26, openfootball tr.1 2025-26, openfootball sco.1 2025-26, openfootball gr.1 2025-26, openfootball en.1 2026-27, openfootball es.1 2026-27, openfootball de.1 2026-27, openfootball it.1 2026-27, openfootball fr.1 2026-27, openfootball pt.1 2026-27, openfootball nl.1 2026-27, 30 provisional hand-entered CL rows, UEFA matches: 816 rows, 1 clubs skipped (see data/uefa-import.json), UEFA player stats 2026-27: 1887 players from 107 clubs, 1 clubs unmapped (see data/uefa-teams.json).

## Live record (predictions frozen before kick-off)

- Scored predictions: 56; log loss 1.027 (1.099 = guessing); most-likely outcome right 57%
- High-probability picks: 16, won 63% (they average 71% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.013 over 56 games

Champions League only:

- Scored predictions: 20; log loss 0.924 (1.099 = guessing); most-likely outcome right 70%
- High-probability picks: 5, won 80% (they average 75% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.884 over 20 games

Europa League only:

- Scored predictions: 18; log loss 1.021 (1.099 = guessing); most-likely outcome right 56%
- High-probability picks: 4, won 75% (they average 67% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.021 over 18 games

Conference League only:

- Scored predictions: 18; log loss 1.150 (1.099 = guessing); most-likely outcome right 44%
- High-probability picks: 7, won 43% (they average 70% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.149 over 18 games

| Predicted band | Mean predicted | Happened | n |
|---|---|---|---|
| 0–20% | 16% | 22% | 49 |
| 20–40% | 28% | 23% | 69 |
| 40–60% | 51% | 55% | 31 |
| 60–80% | 66% | 69% | 16 |
| 80–100% | 86% | 33% | 3 |

## Walk-forward backtest (all history)

all 9993 matches log loss 0.980, accuracy 53%; Champions League 464 matches log loss 0.885, accuracy 61%

## Learning

- Last tuning check 2026-10-21: tuned — re-tune requested (new data sources)
- Settings: drift 0.00002/day, prior variance 0.1, Dixon–Coles ρ 0.04, newcomer offset 0.25, foreign prior -0.5, goal cap 6, competition half-life 1460 days

## Recent misses

- 2026-11-05 Stade Rennais v Olympiakos SFP (el): Drawn 0-0; the model gave the draw 25% and leaned Stade Rennais (40%). Ratings moved: Stade Rennais attack -0.016, defence +0.015; Olympiakos SFP attack -0.019, defence +0.025.
- 2026-11-04 Fenerbahçe v Liverpool (cl): Close call: the pick Liverpool had only 57%; 3-2 was priced at 24%. Ratings moved: Fenerbahçe attack +0.022, defence +0.002; Liverpool attack -0.001, defence -0.021.
- 2026-11-03 Bodø/Glimt v Lille (cl): Drawn 0-0; the model gave the draw 20% and leaned Bodø/Glimt (56%). Ratings moved: Bodø/Glimt attack -0.035, defence +0.022; Lille attack -0.015, defence +0.026.
- 2026-10-22 Viktoria Plzeň v Levski Sofia (el): Close call: the pick Viktoria Plzeň had only 54%; 1-2 was priced at 17%. Ratings moved: Viktoria Plzeň attack -0.005, defence -0.039; Levski Sofia attack +0.057, defence +0.007.
- 2026-10-22 Sturm Graz v Olympique de (el): Close call: the pick Olympique de had only 39%; 1-0 was priced at 37%. Ratings moved: Sturm Graz attack -0.005, defence +0.023; Olympique de attack -0.015, defence +0.004.
- 2026-10-22 Lech Poznań v Sunderland (el): Drawn 1-1; the model gave the draw 22% and leaned Sunderland (51%). Ratings moved: Lech Poznań attack -0.004, defence +0.018; Sunderland attack -0.015, defence +0.003.
- 2026-10-22 Juventus v Stade Rennais (el): Drawn 2-2; the model gave the draw 20% and leaned Juventus (63%). Ratings moved: Juventus attack +0.000, defence -0.015; Stade Rennais attack +0.013, defence -0.000.
- 2026-10-22 Dinamo Zagreb v NEC (el): Close call: the pick Dinamo Zagreb had only 58%; 2-4 was priced at 22%. Ratings moved: Dinamo Zagreb attack -0.001, defence -0.059; NEC attack +0.029, defence +0.001.
- 2026-10-22 Celje v Red Bull (el): Drawn 2-2; the model gave the draw 20% and leaned Red Bull (50%). Ratings moved: Celje attack +0.008, defence +0.001; Red Bull attack -0.001, defence -0.007.
- 2026-10-22 Beşiktaş v Crystal Palace (el): Drawn 2-2; the model gave the draw 25% and leaned Crystal Palace (44%). Ratings moved: Beşiktaş attack +0.014, defence -0.010; Crystal Palace attack +0.007, defence -0.011.
- 2026-10-22 Thun v Hajduk Split (ecl): Close call: the pick Thun had only 44%; 0-1 was priced at 33%. Ratings moved: Thun attack -0.071, defence +0.011; Hajduk Split attack -0.009, defence +0.059.
- 2026-10-22 Pafos v Riga (ecl): Drawn 1-1; the model gave the draw 19% and leaned Pafos (65%). Ratings moved: Pafos attack -0.025, defence -0.005; Riga attack +0.006, defence +0.028.

## Upcoming (next days)

| Date | Comp | Match | H / D / A | Pick | Margin | Score | Bonus scorer |
|---|---|---|---|---|---|---|---|
| 2026-11-04 | cl | Dortmund v Betis | 61% / 19% / 20% | Dortmund 61% (47%–75%) ★ | Dortmund by 1 | 2–1 | Serhou Guirassy 42% |
| 2026-11-04 | cl | Porto v Napoli | 54% / 22% / 24% | Porto 54% (40%–68%) | Porto by 1 | 1–1 | Samu 24% |
| 2026-11-04 | cl | PSV v Brugge | 48% / 19% / 34% | PSV 48% (30%–66%) | Draw | 2–1 | Nicolò Tresoldi 40% |
| 2026-11-04 | cl | Lens v Como | 45% / 21% / 34% | Lens 45% (29%–61%) | Draw | 1–1 | Tasos Douvikas 34% |
| 2026-11-04 | cl | Leipzig v Man City | 23% / 19% / 58% | Man City 58% (43%–74%) | Man City by 1 | 1–2 | Erling Haaland 28% |
| 2026-11-04 | cl | Slavia v Arsenal | 7% / 13% / 80% | Arsenal 80% (66%–92%) ★ | Arsenal by 3+ | 0–2 | Viktor Gyökeres 36% |
| 2026-11-04 | cl | Viking v Sabah | 74% / 12% / 14% | Viking 74% (49%–93%) ★ | Viking by 3+ | 3–1 | Peter Christiansen 38% |
| 2026-11-05 | el | Milan v Ferencváros | 62% / 19% / 19% | Milan 62% (45%–77%) ★ | Milan by 1 | 1–0 | Alphadjo Cisse 33% |
| 2026-11-05 | el | Sparta Praha v Bournemouth | 19% / 20% / 61% | Bournemouth 61% (44%–78%) | Bournemouth by 1 | 0–1 | Justin Kluivert 30% |
| 2026-11-05 | el | AZ v Juventus | 27% / 24% / 49% | Juventus 49% (36%–64%) | Draw | 0–1 | Nick Woltemade 30% |
| 2026-11-05 | el | Bayer Leverkusen v Olympique de | 63% / 19% / 18% | Bayer Leverkusen 63% (50%–77%) ★ | Bayer Leverkusen by 1 | 2–0 | Patrik Schick 36% |
| 2026-11-05 | el | Celtic v Beşiktaş | 44% / 22% / 33% | Celtic 44% (28%–61%) | Draw | 1–1 | Camilo Durán 30% |
| 2026-11-05 | el | Crystal Palace v Hoffenheim | 60% / 20% / 20% | Crystal Palace 60% (46%–74%) | Crystal Palace by 1 | 1–0 | Yeremy Pino 30% |
| 2026-11-05 | el | H. Beer-Sheva v OFI Heraklion | 43% / 25% / 32% | H. Beer-Sheva 43% (24%–63%) | Draw | 1–0 | Taxiarchis Fountas 16% |
| 2026-11-05 | el | Levski Sofia v Jagiellonia | 39% / 30% / 32% | Levski Sofia 39% (23%–57%) | Draw | 1–0 | Reinaldo 24% |
| 2026-11-05 | el | Lillestrøm v Viktoria Plzeň | 32% / 27% / 41% | Viktoria Plzeň 41% (21%–67%) | Draw | 0–1 | Thomas Olsen 19% |
| 2026-11-05 | el | NEC v Omonia | 44% / 24% / 32% | NEC 44% (28%–61%) | Draw | 1–1 | Tjaronn Chery 35% |
| 2026-11-05 | el | Celta de v Royale Union | 36% / 25% / 39% | Royale Union 39% (27%–55%) | Draw | 1–1 | Guilherme Smith 23% |
| 2026-11-05 | el | Real Sociedad v Olympique Lyonnais | 45% / 22% / 33% | Real Sociedad 45% (31%–59%) | Draw | 1–1 | Sergio Gómez 29% |
| 2026-11-05 | el | RSC Anderlecht v Red Bull | 63% / 19% / 18% | RSC Anderlecht 63% (47%–79%) ★ | RSC Anderlecht by 1 | 1–0 | Mihajlo Cvetković 41% |
| 2026-11-05 | el | Sturm Graz v Celje | 71% / 16% / 13% | Sturm Graz 71% (55%–86%) ★ | Sturm Graz by 3+ | 2–0 | Oumar Diakité 25% |
| 2026-11-05 | el | Sport Lisboa v Lech Poznań | 83% / 10% / 7% | Sport Lisboa 83% (70%–94%) ★ | Sport Lisboa by 3+ | 3–0 | Jhon Durán 46% |
| 2026-11-05 | el | Sunderland v Dinamo Zagreb | 66% / 19% / 15% | Sunderland 66% (49%–82%) ★ | Sunderland by 1 | 1–0 | Dion Beljo 26% |
| 2026-11-05 | ecl | Aarhus v Sporting Clube | 27% / 23% / 50% | Sporting Clube 50% (30%–73%) | Draw | 0–1 | Ricardo Horta 30% |
| 2026-11-05 | ecl | Monaco v Nordsjælland | 52% / 22% / 26% | Monaco 52% (33%–73%) | Monaco by 1 | 1–1 | Paris Brunner 35% |
| 2026-11-05 | ecl | Atalanta BC v Kairat Almaty | 84% / 11% / 5% | Atalanta BC 84% (71%–94%) ★ | Atalanta BC by 3+ | 2–0 | Gianluca Scamacca 34% |
| 2026-11-05 | ecl | Copenhagen v Iberia Tbilisi | 92% / 6% / 2% | Copenhagen 92% (82%–99%) ★ | Copenhagen by 3+ | 3–0 | Andreas Cornelius 44% |
| 2026-11-05 | ecl | Twente '65 v Pafos | 59% / 22% / 19% | Twente '65 59% (43%–75%) | Twente '65 by 1 | 1–0 | Wout Weghorst 37% |
| 2026-11-05 | ecl | Crvena Zvezda v Inter Escaldes | 88% / 7% / 5% | Crvena Zvezda 88% (73%–98%) ★ | Crvena Zvezda by 3+ | 3–0 | Vasilije Kostov 49% |
| 2026-11-05 | ecl | Getafe v Brighton & | 23% / 27% / 51% | Brighton & 51% (38%–65%) | Draw | 0–1 | Georginio Rutter 27% |
| 2026-11-05 | ecl | KuPS Kuopio v KAA Gent | 24% / 26% / 50% | KAA Gent 50% (34%–70%) | Draw | 0–1 | Hyllarion Goore 19% |
| 2026-11-05 | ecl | L. Red v Hajduk Split | 17% / 22% / 61% | Hajduk Split 61% (42%–81%) | Hajduk Split by 1 | 0–1 | Dalisson 29% |
| 2026-11-05 | ecl | Lugano v Kauno Žalgiris | 81% / 12% / 8% | Lugano 81% (63%–94%) ★ | Lugano by 3+ | 2–0 | Albian Ajeti 44% |
| 2026-11-05 | ecl | Midtjylland v Ajax | 53% / 22% / 25% | Midtjylland 53% (38%–69%) | Midtjylland by 1 | 1–0 | Julius Emefile 19% |
| 2026-11-05 | ecl | Mjällby v Borac | 47% / 27% / 26% | Mjällby 47% (27%–69%) | Draw | 1–0 | Jacob Bergström 31% |
| 2026-11-05 | ecl | Panathinaikos v CSKA Sofia | 71% / 17% / 12% | Panathinaikos 71% (52%–87%) ★ | Panathinaikos by 3+ | 2–0 | Cyriel Dessers 41% |
| 2026-11-05 | ecl | Riga v Jablonec | 27% / 24% / 49% | Jablonec 49% (28%–74%) | Draw | 0–1 | Antonín Růsek 30% |
| 2026-11-05 | ecl | Sint-Truidense VV v Brann | 41% / 23% / 37% | Sint-Truidense VV 41% (23%–59%) | Draw | 1–1 | Niklas Castro 38% |
| 2026-11-05 | ecl | Thun v Heart of | 47% / 23% / 30% | Thun 47% (27%–70%) | Draw | 1–1 | Brighton Labeau 25% |
| 2026-11-05 | ecl | Trabzonspor v Freiburg | 38% / 25% / 37% | Trabzonspor 38% (24%–53%) | Draw | 1–1 | Djú Franculino 36% |
| 2026-11-05 | ecl | Univ. Craiova v Egnatia | 49% / 22% / 29% | Univ. Craiova 49% (27%–71%) | Draw | 1–1 | Assad Al Hamlawi 42% |
| 2026-11-06 | de.1 | Hamburger v Borussia Mönchengladbach | 38% / 23% / 39% | Borussia Mönchengladbach 39% (25%–56%) | Draw | 1–1 | – |
| 2026-11-06 | fr.1 | Toulouse v Strasbourg Alsace | 40% / 24% / 37% | Toulouse 40% (28%–53%) | Draw | 1–1 | – |
| 2026-11-06 | it.1 | Venezia v Udinese Calcio | 27% / 26% / 47% | Udinese Calcio 47% (33%–64%) | Draw | 0–1 | – |
| 2026-11-06 | nl.1 | Willem II v PEC Zwolle | 37% / 23% / 40% | PEC Zwolle 40% (25%–57%) | Draw | 1–1 | – |
| 2026-11-06 | pt.1 | Famalicão v Arouca | 51% / 24% / 24% | Famalicão 51% (39%–64%) | Famalicão by 1 | 1–0 | – |
| 2026-11-07 | de.1 | FSV Mainz v Bayern | 14% / 15% / 71% | Bayern 71% (58%–83%) ★ | Bayern by 3+ | 1–2 | Harry Kane 53% |
| 2026-11-07 | de.1 | Dortmund v Elversberg | 72% / 15% / 14% | Dortmund 72% (51%–89%) ★ | Dortmund by 3+ | 2–0 | Serhou Guirassy 55% |
| 2026-11-07 | de.1 | Leipzig v Augsburg | 60% / 19% / 20% | Leipzig 60% (47%–74%) ★ | Leipzig by 1 | 2–1 | Brajan Gruda 24% |
| 2026-11-07 | de.1 | Paderborn v Eintracht Frankfurt | 30% / 22% / 48% | Eintracht Frankfurt 48% (26%–73%) | Draw | 1–1 | – |
| 2026-11-07 | de.1 | Stuttgart v Werder Bremen | 64% / 18% / 18% | Stuttgart 64% (51%–77%) ★ | Stuttgart by 3+ | 2–1 | Deniz Undav 31% |
| 2026-11-07 | en.1 | Arsenal v Hull City | 72% / 19% / 10% | Arsenal 72% (55%–87%) ★ | Arsenal by 1 | 1–0 | Viktor Gyökeres 36% |
| 2026-11-07 | en.1 | Brighton & v Brentford | 47% / 23% / 30% | Brighton & 47% (34%–59%) | Draw | 1–1 | Georginio Rutter 37% |
| 2026-11-07 | en.1 | Crystal Palace v Liverpool | 26% / 23% / 51% | Liverpool 51% (39%–64%) | Liverpool by 1 | 1–1 | Dominik Szoboszlai 23% |
| 2026-11-07 | en.1 | Everton v Coventry City | 61% / 23% / 16% | Everton 61% (43%–79%) | Everton by 1 | 1–0 | – |
| 2026-11-07 | en.1 | Fulham v Newcastle United | 36% / 24% / 41% | Newcastle United 41% (28%–54%) | Draw | 1–1 | – |
| 2026-11-07 | en.1 | Ipswich Town v Bournemouth | 20% / 20% / 60% | Bournemouth 60% (44%–76%) | Bournemouth by 1 | 0–1 | Justin Kluivert 34% |
| 2026-11-07 | en.1 | Leeds United v Tottenham Hotspur | 44% / 24% / 33% | Leeds United 44% (30%–58%) | Draw | 1–1 | – |
| 2026-11-07 | en.1 | Man Utd v Villa | 40% / 23% / 37% | Man Utd 40% (28%–53%) | Draw | 1–1 | Nicolas Jackson 28% |
| 2026-11-07 | en.1 | Nottingham Forest v Man City | 25% / 23% / 52% | Man City 52% (40%–65%) | Man City by 1 | 0–1 | Erling Haaland 34% |
| 2026-11-07 | en.1 | Sunderland v Chelsea | 32% / 24% / 44% | Chelsea 44% (30%–59%) | Draw | 1–1 | Enzo Le Fée 14% |
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
| 2026-11-08 | de.1 | Köln v Bayer Leverkusen | 18% / 19% / 64% | Bayer Leverkusen 64% (50%–78%) ★ | Bayer Leverkusen by 1 | 1–2 | Patrik Schick 39% |
| 2026-11-08 | de.1 | Freiburg v Union Berlin | 61% / 20% / 19% | Freiburg 61% (48%–74%) ★ | Freiburg by 1 | 2–1 | Vincenzo Grifo 39% |
| 2026-11-08 | de.1 | Hoffenheim v Schalke | 58% / 20% / 22% | Hoffenheim 58% (37%–79%) | Hoffenheim by 1 | 1–0 | Andrej Kramarić 27% |
| 2026-11-08 | es.1 | CA Osasuna v Athletic Club | 36% / 26% / 38% | Athletic Club 38% (27%–51%) | Draw | 1–1 | – |
| 2026-11-08 | es.1 | Atlético v Barça | 36% / 21% / 43% | Barça 43% (30%–57%) | Draw | 1–1 | Julián Alvarez 37% |
| 2026-11-08 | es.1 | Elche v Betis | 34% / 23% / 43% | Betis 43% (29%–59%) | Draw | 1–1 | Troy Parrott 24% |
| 2026-11-08 | es.1 | Málaga v Real Racing | 42% / 23% / 36% | Málaga 42% (18%–67%) | Draw | 1–1 | – |
| 2026-11-08 | es.1 | Celta de v Levante | 57% / 21% / 22% | Celta de 57% (43%–71%) | Celta de by 1 | 1–0 | Williot Swedberg 20% |
| 2026-11-08 | es.1 | Espanyol de v Deportivo La | 48% / 24% / 28% | Espanyol de 48% (29%–69%) | Draw | 1–0 | – |
| 2026-11-08 | es.1 | Real Sociedad v Rayo Vallecano | 50% / 24% / 26% | Real Sociedad 50% (38%–63%) | Draw | 1–0 | Sergio Gómez 27% |
| 2026-11-08 | es.1 | Sevilla v Deportivo Alavés | 44% / 25% / 30% | Sevilla 44% (32%–57%) | Draw | 1–0 | – |
| 2026-11-08 | es.1 | Valencia v Real Madrid | 17% / 20% / 63% | Real Madrid 63% (51%–76%) ★ | Real Madrid by 1 | 0–1 | Kylian Mbappé 55% |
| 2026-11-08 | es.1 | Villarreal v Getafe | 59% / 22% / 19% | Villarreal 59% (47%–71%) | Villarreal by 1 | 1–0 | Georges Mikautadze 26% |
| 2026-11-08 | fr.1 | Angers SCO v OGC Nice | 35% / 28% / 37% | OGC Nice 37% (26%–50%) | Draw | 0–1 | – |
| 2026-11-08 | fr.1 | Le Havre v Lorient | 37% / 25% / 38% | Lorient 38% (26%–53%) | Draw | 1–1 | – |
| 2026-11-08 | fr.1 | Le Mans v Monaco | 24% / 19% / 57% | Monaco 57% (34%–81%) | Monaco by 1 | 1–2 | Paris Brunner 42% |
| 2026-11-08 | fr.1 | Lens v Olympique de | 47% / 23% / 31% | Lens 47% (34%–60%) | Draw | 1–1 | Keyliane Abdallah 23% |
| 2026-11-08 | fr.1 | Stade Brestois v Olympique Lyonnais | 32% / 23% / 46% | Olympique Lyonnais 46% (33%–60%) | Draw | 1–1 | Keito Nakamura 25% |
| 2026-11-08 | fr.1 | Stade Rennais v Lille | 38% / 25% / 37% | Stade Rennais 38% (27%–50%) | Draw | 1–1 | Boulaye Dia 21% |
| 2026-11-08 | it.1 | Monza v Atalanta BC | 15% / 20% / 65% | Atalanta BC 65% (50%–79%) ★ | Atalanta BC by 1 | 0–1 | Gianluca Scamacca 34% |
| 2026-11-08 | it.1 | ACF Fiorentina v Juventus | 24% / 24% / 52% | Juventus 52% (40%–65%) | Juventus by 1 | 0–1 | Nick Woltemade 30% |
| 2026-11-08 | it.1 | Inter v Como | 57% / 21% / 23% | Inter 57% (44%–70%) | Inter by 1 | 2–1 | Tasos Douvikas 26% |
| 2026-11-08 | it.1 | Genoa CFC v Milan | 24% / 24% / 52% | Milan 52% (39%–66%) | Milan by 1 | 0–1 | Alphadjo Cisse 33% |
| 2026-11-08 | it.1 | Napoli v SS Lazio | 45% / 27% / 29% | Napoli 45% (33%–56%) | Draw | 1–0 | Scott McTominay 21% |
| 2026-11-08 | nl.1 | AZ v Groningen | 60% / 20% / 21% | AZ 60% (46%–72%) | AZ by 1 | 2–1 | Mexx Meerdink 32% |
| 2026-11-08 | nl.1 | Twente '65 v Ajax | 43% / 22% / 35% | Twente '65 43% (31%–56%) | Draw | 1–1 | Wout Weghorst 36% |
| 2026-11-08 | nl.1 | Utrecht v NEC | 43% / 21% / 36% | Utrecht 43% (30%–57%) | Draw | 1–1 | Tjaronn Chery 37% |
| 2026-11-08 | nl.1 | Cambuur-Leeuwarden v PSV | 5% / 7% / 89% | PSV 89% (74%–98%) ★ | PSV by 3+ | 0–4 | Ivan Perišić 39% |
| 2026-11-08 | nl.1 | Heerenveen v Feyenoord | 26% / 20% / 54% | Feyenoord 54% (41%–68%) | Feyenoord by 1 | 1–2 | Anis Hadj Moussa 23% |
| 2026-11-08 | pt.1 | Santa Clara v Gil Vicente | 41% / 30% / 29% | Santa Clara 41% (30%–53%) | Draw | 1–0 | – |
| 2026-11-08 | pt.1 | Estrela da v Sport Lisboa | 9% / 15% / 76% | Sport Lisboa 76% (65%–87%) ★ | Sport Lisboa by 3+ | 0–2 | Jhon Durán 38% |
| 2026-11-08 | pt.1 | GD Estoril v CS Marítimo | 58% / 20% / 22% | GD Estoril 58% (37%–79%) | GD Estoril by 1 | 2–1 | – |
| 2026-11-08 | pt.1 | Rio Ave v Sporting Clube | 19% / 22% / 59% | Sporting Clube 59% (47%–72%) | Sporting Clube by 1 | 0–1 | Ricardo Horta 33% |
| 2026-11-08 | pt.1 | Vitória Guimarães v Porto | 20% / 24% / 56% | Porto 56% (44%–70%) | Porto by 1 | 0–1 | Samu 23% |

### UEFA club-competition scenarios (5,000 minute-by-minute simulations each)

| Match | First goal H / none / A | Favourite wins after conceding first | Favourite trails / trails by 2 | Favourite drops a lead | Likeliest HT/FT | Late winner (level at 75') | Goal in each 15' block |
|---|---|---|---|---|---|---|---|
| Dortmund v Betis | 63% / 3% / 34% | Dortmund: 30% | 41% / 13% | 15% | H/H 39%, D/H 18% | 12% | 39% 42% 43% 43% 48% 52% |
| Porto v Napoli | 59% / 5% / 36% | Porto: 22% | 42% / 14% | 15% | H/H 33%, D/H 18% | 11% | 34% 37% 37% 38% 42% 46% |
| PSV v Brugge | 53% / 2% / 45% | PSV: 24% | 58% / 28% | 22% | H/H 29%, A/A 20% | 12% | 46% 49% 50% 51% 56% 60% |
| Lens v Como | 52% / 3% / 45% | Lens: 19% | 55% / 24% | 19% | H/H 27%, A/A 20% | 12% | 39% 42% 43% 44% 48% 52% |
| Leipzig v Man City | 37% / 3% / 60% | Man City: 29% | 44% / 16% | 15% | A/A 38%, D/A 16% | 11% | 40% 43% 44% 45% 49% 53% |
| Slavia v Arsenal | 17% / 4% / 78% | Arsenal: 46% | 19% / 3% | 6% | A/A 57%, D/A 21% | 8% | 36% 39% 39% 40% 44% 48% |
| Viking v Sabah | 69% / 1% / 29% | Viking: 47% | 37% / 12% | 12% | H/H 53%, D/H 15% | 9% | 50% 53% 54% 55% 60% 64% |
| Milan v Ferencváros | 64% / 5% / 32% | Milan: 28% | 38% / 11% | 14% | H/H 38%, D/H 19% | 11% | 36% 39% 39% 40% 44% 48% |
| Sparta Praha v Bournemouth | 32% / 5% / 63% | Bournemouth: 28% | 36% / 11% | 12% | A/A 39%, D/A 19% | 11% | 34% 37% 37% 38% 42% 46% |
| AZ v Juventus | 38% / 8% / 54% | Juventus: 17% | 43% / 15% | 14% | A/A 30%, D/A 17% | 11% | 31% 33% 34% 35% 38% 42% |
| Bayer Leverkusen v Olympique de | 65% / 5% / 30% | Bayer Leverkusen: 29% | 35% / 10% | 13% | H/H 40%, D/H 19% | 10% | 35% 39% 39% 40% 44% 48% |
| Celtic v Beşiktaş | 52% / 5% / 44% | Celtic: 17% | 52% / 22% | 17% | H/H 26%, A/A 19% | 12% | 35% 38% 39% 39% 44% 48% |
| Crystal Palace v Hoffenheim | 63% / 5% / 32% | Crystal Palace: 25% | 38% / 11% | 13% | H/H 37%, D/H 19% | 11% | 35% 38% 38% 39% 43% 47% |
| H. Beer-Sheva v OFI Heraklion | 50% / 9% / 41% | H. Beer-Sheva: 12% | 47% / 18% | 14% | H/H 25%, A/A 18% | 11% | 30% 32% 32% 33% 37% 40% |
| Levski Sofia v Jagiellonia | 45% / 15% / 40% | Levski Sofia: 8% | 44% / 15% | 12% | D/D 22%, H/H 20% | 12% | 24% 26% 26% 28% 30% 34% |
| Lillestrøm v Viktoria Plzeň | 41% / 12% / 48% | Viktoria Plzeň: 12% | 45% / 17% | 13% | A/A 24%, D/D 19% | 11% | 27% 30% 29% 31% 34% 38% |
| NEC v Omonia | 52% / 6% / 42% | NEC: 15% | 49% / 19% | 16% | H/H 26%, A/A 18% | 11% | 32% 35% 36% 37% 41% 44% |
| Celta de v Royale Union | 45% / 8% / 48% | Royale Union: 13% | 51% / 21% | 16% | A/A 22%, H/H 20% | 11% | 31% 33% 33% 35% 38% 42% |
| Real Sociedad v Olympique Lyonnais | 52% / 4% / 43% | Real Sociedad: 17% | 52% / 21% | 18% | H/H 26%, A/A 19% | 12% | 35% 39% 39% 40% 44% 48% |
| RSC Anderlecht v Red Bull | 65% / 5% / 31% | RSC Anderlecht: 28% | 36% / 10% | 13% | H/H 40%, D/H 19% | 11% | 36% 39% 39% 40% 44% 48% |
| Sturm Graz v Celje | 69% / 4% / 27% | Sturm Graz: 38% | 32% / 8% | 11% | H/H 46%, D/H 19% | 10% | 38% 41% 42% 42% 47% 51% |
| Sport Lisboa v Lech Poznań | 78% / 2% / 20% | Sport Lisboa: 54% | 24% / 6% | 8% | H/H 62%, D/H 17% | 8% | 45% 49% 49% 50% 55% 59% |
| Sunderland v Dinamo Zagreb | 67% / 6% / 27% | Sunderland: 28% | 31% / 7% | 11% | H/H 42%, D/H 20% | 10% | 33% 36% 37% 37% 41% 45% |
| Aarhus v Sporting Clube | 38% / 7% / 55% | Sporting Clube: 19% | 44% / 16% | 14% | A/A 31%, D/A 17% | 11% | 33% 36% 36% 37% 41% 44% |
| Monaco v Nordsjælland | 58% / 5% / 37% | Monaco: 21% | 44% / 15% | 15% | H/H 32%, D/H 17% | 11% | 35% 37% 38% 39% 43% 47% |
| Atalanta BC v Kairat Almaty | 82% / 5% / 13% | Atalanta BC: 47% | 15% / 2% | 5% | H/H 59%, D/H 22% | 7% | 35% 38% 39% 39% 43% 47% |
| Copenhagen v Iberia Tbilisi | 88% / 3% / 9% | Copenhagen: 64% | 10% / 1% | 3% | H/H 73%, D/H 17% | 5% | 43% 46% 47% 48% 52% 56% |
| Twente '65 v Pafos | 63% / 7% / 30% | Twente '65: 21% | 34% / 9% | 12% | H/H 37%, D/H 19% | 10% | 32% 35% 35% 36% 40% 43% |
| Crvena Zvezda v Inter Escaldes | 83% / 1% / 16% | Crvena Zvezda: 60% | 19% / 4% | 6% | H/H 69%, D/H 15% | 6% | 49% 52% 53% 53% 59% 63% |
| Getafe v Brighton & | 33% / 11% / 56% | Brighton &: 17% | 36% / 10% | 11% | A/A 30%, D/A 19% | 11% | 26% 28% 28% 31% 33% 37% |
| KuPS Kuopio v KAA Gent | 34% / 11% / 56% | KAA Gent: 16% | 37% / 11% | 12% | A/A 30%, D/D 18% | 11% | 27% 29% 29% 31% 34% 38% |
| L. Red v Hajduk Split | 27% / 9% / 64% | Hajduk Split: 26% | 30% / 7% | 10% | A/A 39%, D/A 20% | 10% | 30% 32% 32% 34% 37% 41% |
| Lugano v Kauno Žalgiris | 77% / 3% / 20% | Lugano: 47% | 23% / 5% | 7% | H/H 58%, D/H 19% | 8% | 40% 43% 44% 44% 49% 53% |
| Midtjylland v Ajax | 59% / 6% / 36% | Midtjylland: 21% | 42% / 14% | 15% | H/H 33%, D/H 18% | 11% | 33% 37% 37% 38% 42% 46% |
| Mjällby v Borac | 53% / 12% / 35% | Mjällby: 13% | 39% / 13% | 12% | H/H 27%, D/D 19% | 11% | 27% 29% 29% 31% 34% 37% |
| Panathinaikos v CSKA Sofia | 71% / 6% / 24% | Panathinaikos: 32% | 27% / 6% | 10% | H/H 46%, D/H 21% | 9% | 34% 37% 37% 38% 42% 46% |
| Riga v Jablonec | 37% / 9% / 54% | Jablonec: 18% | 41% / 15% | 13% | A/A 30%, D/A 17% | 11% | 30% 32% 33% 34% 38% 41% |
| Sint-Truidense VV v Brann | 49% / 6% / 45% | Sint-Truidense VV: 14% | 54% / 23% | 17% | H/H 24%, A/A 21% | 12% | 34% 37% 38% 38% 42% 46% |
| Thun v Heart of | 54% / 6% / 40% | Thun: 17% | 48% / 18% | 16% | H/H 29%, A/A 17% | 11% | 34% 37% 37% 37% 42% 46% |
| Trabzonspor v Freiburg | 47% / 8% / 46% | Trabzonspor: 11% | 53% / 22% | 16% | H/H 22%, A/A 21% | 11% | 31% 33% 34% 35% 38% 42% |
| Univ. Craiova v Egnatia | 55% / 5% / 39% | Univ. Craiova: 19% | 47% / 18% | 16% | H/H 30%, A/A 17% | 12% | 35% 38% 38% 39% 43% 47% |

★ = high-probability pick (≥60% and the low end of its range ≥45%).

## League offsets (shared by every club from the country in cross-border games)

| Country | Offset | ± |
|---|---|---|
| ENG | +0.50 | 0.05 |
| ESP | +0.33 | 0.05 |
| GER | +0.28 | 0.05 |
| FRA | +0.25 | 0.05 |
| ITA | +0.22 | 0.05 |
| BEL | +0.19 | 0.06 |
| DEN | +0.11 | 0.06 |
| TUR | +0.10 | 0.06 |
| GRE | +0.08 | 0.06 |
| POR | +0.06 | 0.06 |
| NOR | +0.05 | 0.06 |
| CRO | -0.02 | 0.07 |

## Strongest clubs (expected goal difference per game vs a zero-rated side)

| Club | Strength | ± |
|---|---|---|
| FC Barcelona | +3.23 | 0.11 |
| FC Bayern München | +3.21 | 0.12 |
| Manchester City FC | +2.70 | 0.12 |
| Paris Saint-Germain FC | +2.69 | 0.12 |
| Real Madrid CF | +2.58 | 0.12 |
| Arsenal FC | +2.57 | 0.12 |
| Liverpool FC | +2.32 | 0.12 |
| FC Internazionale Milano | +2.21 | 0.12 |
| Newcastle United FC | +1.94 | 0.12 |
| Aston Villa FC | +1.93 | 0.12 |
| Chelsea FC | +1.92 | 0.12 |
| Club Atlético de Madrid | +1.88 | 0.11 |
| Brighton & Hove Albion FC | +1.86 | 0.12 |
| Sporting Clube de Portugal | +1.83 | 0.12 |
| Sport Lisboa e Benfica | +1.81 | 0.12 |
| Manchester United FC | +1.81 | 0.12 |
| Brentford FC | +1.75 | 0.12 |
| Borussia Dortmund | +1.75 | 0.12 |
| AFC Bournemouth | +1.72 | 0.12 |
| Bayer 04 Leverkusen | +1.70 | 0.12 |
