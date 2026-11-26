# Model report

Generated 2026-11-26. Ratings include results up to 2026-11-25. Parameter set v3 (tuned 2026-10-21).

Sources: openfootball cl 2023-24, openfootball cl 2024-25, openfootball cl 2025-26, openfootball en.1 2023-24, openfootball es.1 2023-24, openfootball de.1 2023-24, openfootball it.1 2023-24, openfootball fr.1 2023-24, openfootball pt.1 2023-24, openfootball nl.1 2023-24, openfootball at.1 2023-24, openfootball en.1 2024-25, openfootball es.1 2024-25, openfootball de.1 2024-25, openfootball it.1 2024-25, openfootball fr.1 2024-25, openfootball pt.1 2024-25, openfootball nl.1 2024-25, openfootball at.1 2024-25, openfootball be.1 2024-25, openfootball tr.1 2024-25, openfootball sco.1 2024-25, openfootball gr.1 2024-25, openfootball en.1 2025-26, openfootball es.1 2025-26, openfootball de.1 2025-26, openfootball it.1 2025-26, openfootball fr.1 2025-26, openfootball pt.1 2025-26, openfootball nl.1 2025-26, openfootball at.1 2025-26, openfootball be.1 2025-26, openfootball tr.1 2025-26, openfootball sco.1 2025-26, openfootball gr.1 2025-26, openfootball en.1 2026-27, openfootball es.1 2026-27, openfootball de.1 2026-27, openfootball it.1 2026-27, openfootball fr.1 2026-27, openfootball pt.1 2026-27, openfootball nl.1 2026-27, 30 provisional hand-entered CL rows, UEFA matches: 816 rows, 1 clubs skipped (see data/uefa-import.json), UEFA player stats 2026-27: 1968 players from 107 clubs, 1 clubs unmapped (see data/uefa-teams.json).

## Live record (predictions frozen before kick-off)

- Scored predictions: 115; log loss 0.979 (1.099 = guessing); most-likely outcome right 58%
- High-probability picks: 41, won 63% (they average 72% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.972 over 115 games

Champions League only:

- Scored predictions: 45; log loss 0.860 (1.099 = guessing); most-likely outcome right 67%
- High-probability picks: 19, won 74% (they average 73% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.842 over 45 games

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
| 0–20% | 15% | 20% | 106 |
| 20–40% | 28% | 24% | 134 |
| 40–60% | 50% | 57% | 58 |
| 60–80% | 67% | 58% | 36 |
| 80–100% | 85% | 73% | 11 |

## Walk-forward backtest (all history)

all 10052 matches log loss 0.980, accuracy 53%; Champions League 489 matches log loss 0.881, accuracy 61%

## Learning

- Last tuning check 2026-10-21: tuned — re-tune requested (new data sources)
- Settings: drift 0.00002/day, prior variance 0.1, Dixon–Coles ρ 0.04, newcomer offset 0.25, foreign prior -0.5, goal cap 6, competition half-life 1460 days

## Recent misses

- 2026-11-25 Sporting v Man Utd (cl): Drawn 2-2; the model gave the draw 20% and leaned Sporting (51%). Ratings moved: Sporting attack -0.001, defence -0.007; Man Utd attack +0.006, defence +0.001.
- 2026-11-25 PSG v Roma (cl): Drawn 2-2; the model gave the draw 16% and leaned PSG (69%). Ratings moved: PSG attack -0.006, defence -0.010; Roma attack +0.009, defence +0.008.
- 2026-11-25 Lille v Bayern (cl): Upset: Bayern were 62% to win (high-probability pick); Lille won 2-1, an outcome priced at 20%. Ratings moved: Lille attack +0.009, defence +0.017; Bayern attack -0.011, defence -0.010.
- 2026-11-25 Shakhtar Donetsk v Fenerbahçe (cl): Close call: the pick Fenerbahçe had only 39%; 0-1 was priced at 39%. Ratings moved: Shakhtar Donetsk attack -0.034, defence +0.012; Fenerbahçe attack -0.008, defence +0.023.
- 2026-11-24 Man City v Napoli (cl): Drawn 2-2; the model gave the draw 12% and leaned Man City (78%). Ratings moved: Man City attack -0.009, defence -0.014; Napoli attack +0.013, defence +0.012.
- 2026-11-24 Galatasaray v Villa (cl): Close call: the pick Villa had only 45%; 1-0 was priced at 34%. Ratings moved: Galatasaray attack -0.009, defence +0.028; Villa attack -0.019, defence +0.007.
- 2026-11-24 Arsenal v Dortmund (cl): Drawn 1-1; the model gave the draw 18% and leaned Arsenal (70%). Ratings moved: Arsenal attack -0.011, defence -0.003; Dortmund attack +0.002, defence +0.015.
- 2026-11-05 Sunderland v Dinamo Zagreb (el): Upset: Sunderland were 66% to win (high-probability pick); Dinamo Zagreb won 0-2, an outcome priced at 15%. Ratings moved: Sunderland attack -0.039, defence -0.021; Dinamo Zagreb attack +0.024, defence +0.040.
- 2026-11-05 Stade Rennais v Olympiakos SFP (el): Drawn 0-0; the model gave the draw 25% and leaned Stade Rennais (40%). Ratings moved: Stade Rennais attack -0.016, defence +0.015; Olympiakos SFP attack -0.019, defence +0.025.
- 2026-11-05 Sturm Graz v Celje (el): Upset: Sturm Graz were 71% to win (high-probability pick); Celje won 2-3, an outcome priced at 13%. Ratings moved: Sturm Graz attack -0.006, defence -0.034; Celje attack +0.036, defence +0.007.
- 2026-11-05 Real Sociedad v Olympique Lyonnais (el): Drawn 1-1; the model gave the draw 22% and leaned Real Sociedad (47%). Ratings moved: Real Sociedad attack -0.008, defence +0.005; Olympique Lyonnais attack -0.004, defence +0.008.
- 2026-11-05 H. Beer-Sheva v OFI Heraklion (el): Close call: the pick H. Beer-Sheva had only 43%; 0-2 was priced at 32%. Ratings moved: H. Beer-Sheva attack -0.053, defence -0.029; OFI Heraklion attack +0.021, defence +0.027.

## Upcoming (next days)

| Date | Comp | Match | H / D / A | Pick | Margin | Score | Bonus scorer |
|---|---|---|---|---|---|---|---|
| 2026-11-26 | el | Sparta Praha v AZ | 40% / 24% / 37% | Sparta Praha 40% (26%–56%) | Draw | 1–1 | Mexx Meerdink 30% |
| 2026-11-26 | el | Beşiktaş v H. Beer-Sheva | 65% / 21% / 14% | Beşiktaş 65% (48%–82%) ★ | Beşiktaş by 1 | 1–0 | Hyeongyu Oh 23% |
| 2026-11-26 | el | Crystal Palace v Real Sociedad | 52% / 23% / 25% | Crystal Palace 52% (39%–66%) | Crystal Palace by 1 | 1–0 | Yeremy Pino 25% |
| 2026-11-26 | el | Red Bull v Ararat-Armenia | 80% / 12% / 8% | Red Bull 80% (64%–93%) ★ | Red Bull by 3+ | 2–0 | Haris Tabaković 39% |
| 2026-11-26 | el | Ferencváros v Celje | 76% / 13% / 11% | Ferencváros 76% (59%–90%) ★ | Ferencváros by 3+ | 2–0 | Kristoffer Zachariassen 53% |
| 2026-11-26 | el | Dinamo Zagreb v Bayer Leverkusen | 23% / 21% / 56% | Bayer Leverkusen 56% (39%–74%) | Bayer Leverkusen by 1 | 0–1 | Dion Beljo 34% |
| 2026-11-26 | el | Juventus v Omonia | 70% / 18% / 12% | Juventus 70% (55%–84%) ★ | Juventus by 3+ | 1–0 | Nick Woltemade 36% |
| 2026-11-26 | el | NEC v Stade Rennais | 35% / 22% / 44% | Stade Rennais 44% (30%–60%) | Draw | 1–1 | Bryan Linssen 30% |
| 2026-11-26 | el | OFI Heraklion v RSC Anderlecht | 25% / 22% / 53% | RSC Anderlecht 53% (36%–73%) | RSC Anderlecht by 1 | 0–1 | Mihajlo Cvetković 33% |
| 2026-11-26 | el | Olympique de v Levski Sofia | 65% / 21% / 14% | Olympique de 65% (49%–81%) ★ | Olympique de by 1 | 1–0 | Keyliane Abdallah 19% |
| 2026-11-26 | el | Olympique Lyonnais v Lillestrøm | 77% / 14% / 9% | Olympique Lyonnais 77% (58%–93%) ★ | Olympique Lyonnais by 3+ | 2–0 | Keito Nakamura 30% |
| 2026-11-26 | el | Olympiakos SFP v Milan | 46% / 26% / 28% | Olympiakos SFP 46% (32%–60%) | Draw | 1–0 | Alphadjo Cisse 15% |
| 2026-11-26 | el | Celta de v Bournemouth | 34% / 24% / 42% | Bournemouth 42% (30%–57%) | Draw | 1–1 | Justin Kluivert 21% |
| 2026-11-26 | el | Royale Union v Lech Poznań | 78% / 13% / 9% | Royale Union 78% (62%–91%) ★ | Royale Union by 3+ | 2–0 | Guilherme Smith 38% |
| 2026-11-26 | el | Sunderland v Jagiellonia | 63% / 22% / 15% | Sunderland 63% (47%–79%) ★ | Sunderland by 1 | 1–0 | Enzo Le Fée 19% |
| 2026-11-26 | el | Hoffenheim v Sturm Graz | 55% / 21% / 23% | Hoffenheim 55% (40%–71%) | Hoffenheim by 1 | 1–0 | Oumar Diakité 25% |
| 2026-11-26 | el | Viktoria Plzeň v Sport Lisboa | 23% / 25% / 53% | Sport Lisboa 53% (37%–71%) | Sport Lisboa by 1 | 0–1 | Jhon Durán 25% |
| 2026-11-26 | ecl | Ajax v Thun | 74% / 14% / 12% | Ajax 74% (55%–90%) ★ | Ajax by 3+ | 2–0 | Tolu Arokodare 46% |
| 2026-11-26 | ecl | Borac v Atalanta BC | 11% / 18% / 71% | Atalanta BC 71% (53%–87%) ★ | Atalanta BC by 3+ | 0–2 | Gianluca Scamacca 28% |
| 2026-11-26 | ecl | Brann v Aarhus | 63% / 20% / 17% | Brann 63% (43%–83%) | Brann by 1 | 1–0 | Niklas Castro 46% |
| 2026-11-26 | ecl | Brighton & v Univ. Craiova | 87% / 9% / 4% | Brighton & 87% (75%–96%) ★ | Brighton & by 3+ | 3–0 | Georginio Rutter 48% |
| 2026-11-26 | ecl | CSKA Sofia v Trabzonspor | 26% / 25% / 49% | Trabzonspor 49% (30%–71%) | Draw | 0–1 | Djú Franculino 31% |
| 2026-11-26 | ecl | Egnatia v L. Red | 73% / 16% / 11% | Egnatia 73% (54%–90%) ★ | Egnatia by 3+ | 2–0 | Ildi Gruda 46% |
| 2026-11-26 | ecl | Hajduk Split v Sint-Truidense VV | 43% / 25% / 33% | Hajduk Split 43% (24%–63%) | Draw | 1–1 | Dalisson 23% |
| 2026-11-26 | ecl | Heart of v Monaco | 17% / 19% / 64% | Monaco 64% (47%–81%) ★ | Monaco by 1 | 0–2 | Paris Brunner 35% |
| 2026-11-26 | ecl | Iberia Tbilisi v Getafe | 10% / 21% / 69% | Getafe 69% (52%–85%) ★ | Getafe by 1 | 0–1 | Borja Mayoral 28% |
| 2026-11-26 | ecl | Inter Escaldes v Copenhagen | 12% / 14% / 74% | Copenhagen 74% (53%–92%) ★ | Copenhagen by 3+ | 0–2 | Maher Carrizo 40% |
| 2026-11-26 | ecl | Jablonec v Lugano | 54% / 22% / 25% | Jablonec 54% (32%–76%) | Jablonec by 1 | 1–0 | Antonín Růsek 32% |
| 2026-11-26 | ecl | KAA Gent v Crvena Zvezda | 45% / 24% / 31% | KAA Gent 45% (28%–62%) | Draw | 1–1 | Hyllarion Goore 23% |
| 2026-11-26 | ecl | Kairat Almaty v Mjällby | 39% / 31% / 30% | Kairat Almaty 39% (21%–61%) | Draw | 0–0 | Marc Gual 30% |
| 2026-11-26 | ecl | Kauno Žalgiris v Riga | 30% / 25% / 45% | Riga 45% (25%–68%) | Draw | 0–1 | Reginaldo Ramires 29% |
| 2026-11-26 | ecl | Nordsjælland v Panathinaikos | 59% / 22% / 20% | Nordsjælland 59% (40%–77%) | Nordsjælland by 1 | 1–0 | Ibrahim Adel 34% |
| 2026-11-26 | ecl | Pafos v Midtjylland | 34% / 25% / 42% | Midtjylland 42% (25%–62%) | Draw | 1–1 | Lelê 20% |
| 2026-11-26 | ecl | Freiburg v Twente '65 | 58% / 21% / 21% | Freiburg 58% (44%–72%) | Freiburg by 1 | 1–0 | Vincenzo Grifo 33% |
| 2026-11-26 | ecl | Sporting Clube v KuPS Kuopio | 80% / 14% / 6% | Sporting Clube 80% (67%–91%) ★ | Sporting Clube by 3+ | 2–0 | Ricardo Horta 38% |
| 2026-11-27 | de.1 | Werder Bremen v Borussia Mönchengladbach | 47% / 22% / 32% | Werder Bremen 47% (33%–61%) | Draw | 1–1 | – |
| 2026-11-27 | fr.1 | Stade Brestois v Paris | 41% / 24% / 35% | Stade Brestois 41% (27%–56%) | Draw | 1–1 | – |
| 2026-11-27 | nl.1 | Groningen v Willem II | 65% / 19% / 16% | Groningen 65% (50%–80%) ★ | Groningen by 1 | 1–0 | – |
| 2026-11-27 | pt.1 | CS Marítimo v Nacional | 39% / 25% / 37% | CS Marítimo 39% (21%–59%) | Draw | 1–1 | – |
| 2026-11-28 | de.1 | Köln v Elversberg | 40% / 21% / 39% | Köln 40% (19%–63%) | Draw | 1–1 | – |
| 2026-11-28 | de.1 | FSV Mainz v Union Berlin | 57% / 22% / 21% | FSV Mainz 57% (44%–71%) | FSV Mainz by 1 | 1–0 | – |
| 2026-11-28 | de.1 | Hamburger v Bayern | 7% / 10% / 83% | Bayern 83% (71%–93%) ★ | Bayern by 3+ | 0–3 | Harry Kane 57% |
| 2026-11-28 | de.1 | Paderborn v Schalke | 42% / 26% / 32% | Paderborn 42% (19%–67%) | Draw | 1–0 | – |
| 2026-11-28 | de.1 | Stuttgart v Eintracht Frankfurt | 57% / 19% / 24% | Stuttgart 57% (43%–71%) | Stuttgart by 1 | 2–1 | Ermedin Demirović 34% |
| 2026-11-28 | en.1 | Arsenal v Man City | 51% / 25% / 24% | Arsenal 51% (39%–62%) | Draw | 1–0 | Viktor Gyökeres 32% |
| 2026-11-28 | en.1 | Brighton & v Newcastle United | 46% / 23% / 32% | Brighton & 46% (33%–59%) | Draw | 1–1 | Georginio Rutter 36% |
| 2026-11-28 | en.1 | Crystal Palace v Hull City | 44% / 26% / 30% | Crystal Palace 44% (26%–64%) | Draw | 1–0 | Yeremy Pino 21% |
| 2026-11-28 | en.1 | Everton v Liverpool | 28% / 26% / 46% | Liverpool 46% (35%–60%) | Draw | 0–1 | Dominik Szoboszlai 20% |
| 2026-11-28 | en.1 | Fulham v Bournemouth | 37% / 25% / 38% | Bournemouth 38% (27%–52%) | Draw | 1–1 | Justin Kluivert 20% |
| 2026-11-28 | en.1 | Ipswich Town v Villa | 18% / 19% / 63% | Villa 63% (47%–79%) ★ | Villa by 1 | 0–1 | Nicolas Jackson 38% |
| 2026-11-28 | en.1 | Leeds United v Coventry City | 64% / 20% / 16% | Leeds United 64% (44%–83%) | Leeds United by 1 | 1–0 | – |
| 2026-11-28 | en.1 | Man Utd v Brentford | 44% / 23% / 33% | Man Utd 44% (31%–57%) | Draw | 1–1 | Bruno Fernandes 33% |
| 2026-11-28 | en.1 | Nottingham Forest v Chelsea | 39% / 24% / 38% | Nottingham Forest 39% (27%–51%) | Draw | 1–1 | – |
| 2026-11-28 | en.1 | Sunderland v Tottenham Hotspur | 36% / 26% / 39% | Tottenham Hotspur 39% (26%–53%) | Draw | 1–1 | Enzo Le Fée 14% |
| 2026-11-28 | fr.1 | Angers SCO v Lens | 25% / 26% / 49% | Lens 49% (36%–63%) | Draw | 0–1 | Florian Thauvin 15% |
| 2026-11-28 | fr.1 | Le Havre v Strasbourg Alsace | 30% / 24% / 46% | Strasbourg Alsace 46% (34%–61%) | Draw | 1–1 | – |
| 2026-11-28 | fr.1 | Le Mans v Lille | 25% / 22% / 53% | Lille 53% (32%–75%) | Lille by 1 | 0–1 | Ayase Ueda 23% |
| 2026-11-28 | fr.1 | OGC Nice v ES Troyes | 62% / 20% / 19% | OGC Nice 62% (40%–82%) | OGC Nice by 1 | 1–0 | – |
| 2026-11-28 | fr.1 | PSG v Lorient | 84% / 10% / 6% | PSG 84% (73%–92%) ★ | PSG by 3+ | 3–0 | Ousmane Dembélé 46% |
| 2026-11-28 | nl.1 | PSV v Go Ahead | 79% / 12% / 10% | PSV 79% (67%–89%) ★ | PSV by 3+ | 3–1 | Ivan Perišić 30% |
| 2026-11-28 | nl.1 | SBV Excelsior v Telstar | 49% / 22% / 29% | SBV Excelsior 49% (34%–64%) | Draw | 1–1 | – |
| 2026-11-28 | nl.1 | Cambuur-Leeuwarden v Sparta Rotterdam | 32% / 21% / 48% | Sparta Rotterdam 48% (27%–71%) | Draw | 1–1 | – |
| 2026-11-28 | pt.1 | Académico de v Alverca | 46% / 24% / 30% | Académico de 46% (27%–68%) | Draw | 1–0 | – |
| 2026-11-28 | pt.1 | Arouca v Rio Ave | 55% / 22% / 23% | Arouca 55% (42%–69%) | Arouca by 1 | 1–0 | – |
| 2026-11-28 | pt.1 | Moreirense v Santa Clara | 35% / 29% / 36% | Santa Clara 36% (25%–49%) | Draw | 0–1 | – |
| 2026-11-28 | pt.1 | Vitória Guimarães v Estrela da | 55% / 23% / 22% | Vitória Guimarães 55% (42%–68%) | Vitória Guimarães by 1 | 1–0 | – |
| 2026-11-29 | de.1 | Dortmund v Bayer Leverkusen | 46% / 23% / 31% | Dortmund 46% (34%–59%) | Draw | 1–1 | Serhou Guirassy 36% |
| 2026-11-29 | de.1 | Freiburg v Leipzig | 39% / 22% / 39% | Freiburg 39% (27%–53%) | Draw | 1–1 | Vincenzo Grifo 30% |
| 2026-11-29 | de.1 | Hoffenheim v Augsburg | 52% / 20% / 28% | Hoffenheim 52% (37%–66%) | Hoffenheim by 1 | 2–1 | Andrej Kramarić 26% |
| 2026-11-29 | es.1 | Elche v Atlético | 23% / 21% / 56% | Atlético 56% (42%–71%) | Atlético by 1 | 1–2 | Julián Alvarez 42% |
| 2026-11-29 | es.1 | Levante v Real Racing | 62% / 17% / 21% | Levante 62% (38%–83%) | Levante by 3+ | 2–1 | – |
| 2026-11-29 | es.1 | Málaga v Athletic Club | 22% / 26% / 53% | Athletic Club 53% (34%–72%) | Draw | 0–1 | – |
| 2026-11-29 | es.1 | Celta de v Villarreal | 44% / 22% / 34% | Celta de 44% (32%–57%) | Draw | 1–1 | Tani Oluwaseyi 21% |
| 2026-11-29 | es.1 | Deportivo La v Barça | 13% / 15% / 72% | Barça 72% (51%–90%) ★ | Barça by 3+ | 1–2 | Anthony Gordon 49% |
| 2026-11-29 | es.1 | Espanyol de v Getafe | 44% / 29% / 27% | Espanyol de 44% (32%–56%) | Draw | 1–0 | Borja Mayoral 14% |
| 2026-11-29 | es.1 | Betis v Rayo Vallecano | 54% / 24% / 22% | Betis 54% (42%–66%) | Betis by 1 | 1–0 | Abde Ezzalzouli 22% |
| 2026-11-29 | es.1 | Real Madrid v Deportivo Alavés | 77% / 14% / 9% | Real Madrid 77% (66%–87%) ★ | Real Madrid by 3+ | 2–0 | Kylian Mbappé 63% |
| 2026-11-29 | es.1 | Real Sociedad v Sevilla | 53% / 22% / 25% | Real Sociedad 53% (40%–67%) | Real Sociedad by 1 | 1–1 | Sergio Gómez 28% |
| 2026-11-29 | es.1 | Valencia v CA Osasuna | 45% / 25% / 30% | Valencia 45% (32%–58%) | Draw | 1–0 | – |
| 2026-11-29 | fr.1 | AJ Auxerre v Olympique de | 31% / 23% / 46% | Olympique de 46% (33%–61%) | Draw | 1–1 | Keyliane Abdallah 21% |
| 2026-11-29 | fr.1 | Olympique Lyonnais v Monaco | 43% / 22% / 35% | Olympique Lyonnais 43% (31%–56%) | Draw | 1–1 | Paris Brunner 26% |
| 2026-11-29 | fr.1 | Toulouse v Stade Rennais | 40% / 23% / 37% | Toulouse 40% (28%–54%) | Draw | 1–1 | Boulaye Dia 22% |
| 2026-11-29 | it.1 | Roma v Monza | 78% / 14% / 8% | Roma 78% (66%–89%) ★ | Roma by 3+ | 2–0 | Donyell Malen 48% |
| 2026-11-29 | it.1 | Cagliari Calcio v Milan | 26% / 24% / 50% | Milan 50% (38%–64%) | Draw | 0–1 | Alphadjo Cisse 29% |
| 2026-11-29 | it.1 | Como v Juventus | 40% / 25% / 35% | Como 40% (28%–53%) | Draw | 1–1 | Tasos Douvikas 27% |
| 2026-11-29 | it.1 | Inter v Genoa CFC | 75% / 15% / 9% | Inter 75% (64%–86%) ★ | Inter by 3+ | 2–0 | Lautaro Martínez 31% |
| 2026-11-29 | it.1 | Frosinone Calcio v Parma Calcio | 47% / 25% / 28% | Frosinone Calcio 47% (32%–64%) | Draw | 1–0 | – |
| 2026-11-29 | it.1 | Torino v SS Lazio | 29% / 27% / 45% | SS Lazio 45% (33%–59%) | Draw | 0–1 | – |
| 2026-11-29 | it.1 | Udinese Calcio v ACF Fiorentina | 38% / 25% / 38% | Udinese Calcio 38% (26%–51%) | Draw | 1–1 | – |
| 2026-11-29 | it.1 | US Lecce v Atalanta BC | 17% / 24% / 59% | Atalanta BC 59% (48%–72%) | Atalanta BC by 1 | 0–1 | Gianluca Scamacca 26% |
| 2026-11-29 | it.1 | US Sassuolo v Napoli | 26% / 23% / 51% | Napoli 51% (38%–66%) | Napoli by 1 | 1–1 | Scott McTominay 26% |
| 2026-11-29 | it.1 | Venezia v Bologna | 21% / 25% / 55% | Bologna 55% (40%–71%) | Bologna by 1 | 0–1 | – |
| 2026-11-29 | nl.1 | ADO Den v Utrecht | 22% / 19% / 59% | Utrecht 59% (38%–80%) | Utrecht by 1 | 1–2 | – |
| 2026-11-29 | nl.1 | Feyenoord v Ajax | 50% / 20% / 30% | Feyenoord 50% (37%–63%) | Feyenoord by 1 | 2–1 | Tolu Arokodare 30% |
| 2026-11-29 | nl.1 | Fortuna Sittard v Heerenveen | 37% / 23% / 41% | Heerenveen 41% (28%–56%) | Draw | 1–1 | – |
| 2026-11-29 | nl.1 | NEC v Twente '65 | 40% / 21% / 39% | NEC 40% (27%–53%) | Draw | 1–1 | Bryan Linssen 33% |
| 2026-11-29 | nl.1 | PEC Zwolle v AZ | 21% / 19% / 60% | AZ 60% (47%–74%) | AZ by 1 | 1–2 | Mexx Meerdink 40% |
| 2026-11-29 | pt.1 | Porto v Sporting | 39% / 26% / 35% | Porto 39% (28%–51%) | Draw | 1–1 | Luis Suárez 28% |
| 2026-11-29 | pt.1 | Gil Vicente v GD Estoril | 46% / 24% / 30% | Gil Vicente 46% (33%–59%) | Draw | 1–1 | – |
| 2026-11-30 | pt.1 | Casa Pia v Sporting Clube | 19% / 23% / 58% | Sporting Clube 58% (46%–72%) | Sporting Clube by 1 | 0–1 | Ricardo Horta 29% |
| 2026-11-30 | pt.1 | Sport Lisboa v Famalicão | 68% / 20% / 13% | Sport Lisboa 68% (56%–79%) ★ | Sport Lisboa by 1 | 1–0 | Jhon Durán 31% |
| 2026-12-02 | en.1 | Bournemouth v Brighton & | 40% / 24% / 36% | Bournemouth 40% (28%–52%) | Draw | 1–1 | Georginio Rutter 30% |
| 2026-12-02 | en.1 | Villa v Everton | 49% / 26% / 25% | Villa 49% (37%–61%) | Draw | 1–0 | Nicolas Jackson 28% |
| 2026-12-02 | en.1 | Brentford v Arsenal | 21% / 25% / 54% | Arsenal 54% (42%–67%) | Arsenal by 1 | 0–1 | Viktor Gyökeres 32% |
| 2026-12-02 | en.1 | Chelsea v Crystal Palace | 54% / 22% / 24% | Chelsea 54% (41%–67%) | Chelsea by 1 | 1–1 | Yeremy Pino 18% |
| 2026-12-02 | en.1 | Coventry City v Ipswich Town | 40% / 25% / 36% | Coventry City 40% (21%–63%) | Draw | 1–1 | – |
| 2026-12-02 | en.1 | Hull City v Nottingham Forest | 35% / 27% / 39% | Nottingham Forest 39% (21%–61%) | Draw | 0–1 | – |
| 2026-12-02 | en.1 | Liverpool v Sunderland | 65% / 20% / 16% | Liverpool 65% (52%–77%) ★ | Liverpool by 1 | 1–0 | Dominik Szoboszlai 27% |
| 2026-12-02 | en.1 | Man City v Leeds United | 65% / 19% / 17% | Man City 65% (51%–77%) ★ | Man City by 1 | 2–0 | Erling Haaland 43% |
| 2026-12-02 | en.1 | Newcastle United v Man Utd | 46% / 22% / 32% | Newcastle United 46% (33%–60%) | Draw | 1–1 | Bruno Fernandes 30% |
| 2026-12-02 | en.1 | Tottenham Hotspur v Fulham | 43% / 24% / 32% | Tottenham Hotspur 43% (31%–56%) | Draw | 1–1 | – |
| 2026-12-04 | nl.1 | Telstar v Groningen | 38% / 24% / 38% | Groningen 38% (25%–54%) | Draw | 1–1 | – |
| 2026-12-05 | de.1 | Union Berlin v Hamburger | 45% / 24% / 31% | Union Berlin 45% (30%–60%) | Draw | 1–1 | – |
| 2026-12-05 | de.1 | Bayer Leverkusen v Borussia Mönchengladbach | 73% / 15% / 12% | Bayer Leverkusen 73% (60%–84%) ★ | Bayer Leverkusen by 3+ | 2–0 | Patrik Schick 45% |
| 2026-12-05 | de.1 | Eintracht Frankfurt v Werder Bremen | 55% / 20% / 26% | Eintracht Frankfurt 55% (40%–69%) | Eintracht Frankfurt by 1 | 2–1 | – |
| 2026-12-05 | de.1 | Augsburg v Köln | 52% / 22% / 27% | Augsburg 52% (37%–66%) | Augsburg by 1 | 1–1 | – |
| 2026-12-05 | de.1 | Bayern v Paderborn | 89% / 7% / 4% | Bayern 89% (76%–98%) ★ | Bayern by 3+ | 3–0 | Harry Kane 61% |
| 2026-12-05 | de.1 | Schalke v Dortmund | 17% / 20% / 63% | Dortmund 63% (42%–83%) | Dortmund by 1 | 0–1 | Serhou Guirassy 41% |
| 2026-12-05 | de.1 | Leipzig v FSV Mainz | 54% / 21% / 25% | Leipzig 54% (40%–67%) | Leipzig by 1 | 1–1 | Antonio Nusa 29% |
| 2026-12-05 | de.1 | Freiburg v Hoffenheim | 51% / 20% / 29% | Freiburg 51% (37%–65%) | Freiburg by 1 | 2–1 | Vincenzo Grifo 36% |
| 2026-12-05 | de.1 | Elversberg v Stuttgart | 31% / 20% / 49% | Stuttgart 49% (27%–75%) | Stuttgart by 1 | 1–2 | Ermedin Demirović 30% |
| 2026-12-05 | en.1 | Bournemouth v Hull City | 54% / 23% / 23% | Bournemouth 54% (34%–74%) | Bournemouth by 1 | 1–0 | Justin Kluivert 24% |
| 2026-12-05 | en.1 | Villa v Crystal Palace | 55% / 23% / 22% | Villa 55% (43%–67%) | Villa by 1 | 1–0 | Nicolas Jackson 33% |
| 2026-12-05 | en.1 | Brentford v Man City | 29% / 22% / 49% | Man City 49% (36%–63%) | Draw | 1–1 | Erling Haaland 37% |
| 2026-12-05 | en.1 | Chelsea v Liverpool | 34% / 22% / 44% | Liverpool 44% (31%–58%) | Draw | 1–1 | Dominik Szoboszlai 24% |
| 2026-12-05 | en.1 | Everton v Fulham | 41% / 28% / 31% | Everton 41% (30%–54%) | Draw | 1–0 | – |
| 2026-12-05 | en.1 | Leeds United v Ipswich Town | 64% / 19% / 17% | Leeds United 64% (48%–80%) ★ | Leeds United by 1 | 1–0 | – |
| 2026-12-05 | en.1 | Man Utd v Coventry City | 71% / 17% / 12% | Man Utd 71% (52%–88%) ★ | Man Utd by 3+ | 2–0 | Bruno Fernandes 44% |
| 2026-12-05 | en.1 | Newcastle United v Sunderland | 57% / 22% / 21% | Newcastle United 57% (43%–71%) | Newcastle United by 1 | 1–0 | Enzo Le Fée 11% |
| 2026-12-05 | en.1 | Nottingham Forest v Brighton & | 35% / 26% / 39% | Brighton & 39% (28%–52%) | Draw | 1–1 | Georginio Rutter 29% |
| 2026-12-05 | en.1 | Tottenham Hotspur v Arsenal | 18% / 23% / 60% | Arsenal 60% (48%–72%) | Arsenal by 1 | 0–1 | Viktor Gyökeres 35% |
| 2026-12-05 | fr.1 | Monaco v Angers SCO | 68% / 19% / 13% | Monaco 68% (55%–80%) ★ | Monaco by 1 | 1–0 | Paris Brunner 35% |
| 2026-12-05 | fr.1 | ES Troyes v Olympique Lyonnais | 16% / 17% / 67% | Olympique Lyonnais 67% (45%–87%) ★ | Olympique Lyonnais by 3+ | 0–2 | Keito Nakamura 30% |
| 2026-12-05 | fr.1 | Lille v AJ Auxerre | 57% / 23% / 19% | Lille 57% (45%–70%) | Lille by 1 | 1–0 | Ayase Ueda 22% |
| 2026-12-05 | fr.1 | Olympique de v OGC Nice | 59% / 21% / 20% | Olympique de 59% (46%–72%) | Olympique de by 1 | 1–0 | Keyliane Abdallah 25% |
| 2026-12-05 | fr.1 | Paris v Le Mans | 56% / 20% / 24% | Paris 56% (34%–78%) | Paris by 1 | 1–1 | – |
| 2026-12-05 | fr.1 | Lens v Le Havre | 59% / 22% / 19% | Lens 59% (46%–72%) | Lens by 1 | 1–0 | Florian Thauvin 19% |
| 2026-12-05 | fr.1 | Strasbourg Alsace v Lorient | 54% / 21% / 25% | Strasbourg Alsace 54% (40%–69%) | Strasbourg Alsace by 1 | 2–1 | – |
| 2026-12-05 | fr.1 | Stade Rennais v Stade Brestois | 53% / 21% / 26% | Stade Rennais 53% (39%–66%) | Stade Rennais by 1 | 1–1 | Boulaye Dia 28% |
| 2026-12-05 | fr.1 | Toulouse v PSG | 15% / 17% / 68% | PSG 68% (55%–81%) ★ | PSG by 3+ | 0–2 | Ousmane Dembélé 36% |
| 2026-12-05 | nl.1 | AZ v PSV | 29% / 19% / 52% | PSV 52% (38%–67%) | PSV by 1 | 1–2 | Mexx Meerdink 32% |
| 2026-12-05 | nl.1 | Fortuna Sittard v PEC Zwolle | 51% / 22% / 28% | Fortuna Sittard 51% (37%–65%) | Fortuna Sittard by 1 | 1–1 | – |
| 2026-12-05 | nl.1 | Sparta Rotterdam v NEC | 31% / 22% / 48% | NEC 48% (34%–63%) | Draw | 1–1 | Bryan Linssen 35% |
| 2026-12-05 | nl.1 | Willem II v Feyenoord | 12% / 15% / 73% | Feyenoord 73% (58%–87%) ★ | Feyenoord by 3+ | 0–2 | Anis Hadj Moussa 27% |
| 2026-12-06 | es.1 | Athletic Club v Real Madrid | 24% / 23% / 53% | Real Madrid 53% (41%–67%) | Real Madrid by 1 | 0–1 | Kylian Mbappé 49% |
| 2026-12-06 | es.1 | CA Osasuna v Elche | 49% / 22% / 29% | CA Osasuna 49% (34%–64%) | Draw | 1–1 | – |
| 2026-12-06 | es.1 | Atlético v Betis | 59% / 21% / 20% | Atlético 59% (47%–70%) | Atlético by 1 | 1–0 | Julián Alvarez 41% |
| 2026-12-06 | es.1 | Deportivo Alavés v Espanyol de | 48% / 26% / 27% | Deportivo Alavés 48% (35%–61%) | Draw | 1–0 | – |
| 2026-12-06 | es.1 | Barça v Celta de | 79% / 12% / 9% | Barça 79% (69%–89%) ★ | Barça by 3+ | 3–0 | Anthony Gordon 53% |
| 2026-12-06 | es.1 | Getafe v Valencia | 41% / 29% / 30% | Getafe 41% (30%–53%) | Draw | 1–0 | Borja Mayoral 18% |
| 2026-12-06 | es.1 | Rayo Vallecano v Levante | 51% / 24% / 25% | Rayo Vallecano 51% (37%–66%) | Rayo Vallecano by 1 | 1–0 | – |
| 2026-12-06 | es.1 | Real Racing v Deportivo La | 40% / 20% / 40% | Deportivo La 40% (17%–70%) | Draw | 1–1 | – |
| 2026-12-06 | es.1 | Sevilla v Málaga | 62% / 22% / 16% | Sevilla 62% (44%–80%) | Sevilla by 1 | 1–0 | – |
| 2026-12-06 | es.1 | Villarreal v Real Sociedad | 54% / 20% / 26% | Villarreal 54% (40%–68%) | Villarreal by 1 | 2–1 | Tani Oluwaseyi 28% |
| 2026-12-06 | it.1 | Milan v Parma Calcio | 62% / 22% / 16% | Milan 62% (49%–74%) ★ | Milan by 1 | 1–0 | Alphadjo Cisse 32% |
| 2026-12-06 | it.1 | Monza v Como | 13% / 17% / 70% | Como 70% (55%–84%) ★ | Como by 3+ | 0–2 | Tasos Douvikas 42% |
| 2026-12-06 | it.1 | ACF Fiorentina v Cagliari Calcio | 48% / 24% / 28% | ACF Fiorentina 48% (35%–60%) | Draw | 1–0 | – |
| 2026-12-06 | it.1 | Bologna v Roma | 27% / 25% / 48% | Roma 48% (36%–62%) | Draw | 0–1 | Donyell Malen 31% |
| 2026-12-06 | it.1 | Frosinone Calcio v Inter | 14% / 16% / 70% | Inter 70% (53%–86%) ★ | Inter by 3+ | 0–2 | Lautaro Martínez 31% |
| 2026-12-06 | it.1 | Genoa CFC v Torino | 39% / 27% / 34% | Genoa CFC 39% (27%–52%) | Draw | 1–0 | – |
| 2026-12-06 | it.1 | Juventus v Udinese Calcio | 62% / 22% / 16% | Juventus 62% (50%–75%) ★ | Juventus by 1 | 1–0 | Nick Woltemade 32% |
| 2026-12-06 | it.1 | SS Lazio v Atalanta BC | 34% / 27% / 38% | Atalanta BC 38% (28%–51%) | Draw | 0–1 | Gianluca Scamacca 20% |
| 2026-12-06 | it.1 | Napoli v US Lecce | 66% / 21% / 13% | Napoli 66% (54%–78%) ★ | Napoli by 1 | 1–0 | Scott McTominay 27% |
| 2026-12-06 | it.1 | Venezia v US Sassuolo | 28% / 24% / 48% | US Sassuolo 48% (32%–66%) | Draw | 0–1 | – |
| 2026-12-06 | nl.1 | ADO Den v SBV Excelsior | 27% / 21% / 52% | SBV Excelsior 52% (32%–75%) | SBV Excelsior by 1 | 1–1 | – |
| 2026-12-06 | nl.1 | Ajax v Utrecht | 64% / 17% / 19% | Ajax 64% (50%–76%) ★ | Ajax by 3+ | 2–1 | Tolu Arokodare 42% |
| 2026-12-06 | nl.1 | Go Ahead v Twente '65 | 34% / 22% / 44% | Twente '65 44% (31%–58%) | Draw | 1–1 | Wout Weghorst 32% |
| 2026-12-06 | nl.1 | Heerenveen v Cambuur-Leeuwarden | 71% / 14% / 14% | Heerenveen 71% (50%–88%) ★ | Heerenveen by 3+ | 2–1 | – |
| 2026-12-06 | pt.1 | Nacional v Sport Lisboa | 10% / 16% / 74% | Sport Lisboa 74% (62%–86%) ★ | Sport Lisboa by 3+ | 0–2 | Jhon Durán 36% |
| 2026-12-06 | pt.1 | Santa Clara v Porto | 18% / 27% / 55% | Porto 55% (43%–68%) | Porto by 1 | 0–1 | Samu 22% |
| 2026-12-06 | pt.1 | Estrela da v Gil Vicente | 34% / 26% / 40% | Gil Vicente 40% (29%–55%) | Draw | 1–1 | – |
| 2026-12-06 | pt.1 | Alverca v Moreirense | 40% / 26% / 34% | Alverca 40% (27%–55%) | Draw | 1–1 | – |
| 2026-12-06 | pt.1 | Famalicão v Académico de | 55% / 24% / 21% | Famalicão 55% (36%–74%) | Famalicão by 1 | 1–0 | – |
| 2026-12-06 | pt.1 | GD Estoril v Vitória Guimarães | 40% / 24% / 36% | GD Estoril 40% (28%–54%) | Draw | 1–1 | – |
| 2026-12-06 | pt.1 | Rio Ave v Casa Pia | 43% / 26% / 31% | Rio Ave 43% (31%–56%) | Draw | 1–0 | – |
| 2026-12-06 | pt.1 | Sporting Clube v Arouca | 62% / 20% / 18% | Sporting Clube 62% (50%–74%) ★ | Sporting Clube by 1 | 1–0 | Ricardo Horta 34% |
| 2026-12-06 | pt.1 | Sporting v CS Marítimo | 88% / 8% / 4% | Sporting 88% (75%–97%) ★ | Sporting by 3+ | 3–0 | Luis Suárez 61% |

### UEFA club-competition scenarios (5,000 minute-by-minute simulations each)

| Match | First goal H / none / A | Favourite wins after conceding first | Favourite trails / trails by 2 | Favourite drops a lead | Likeliest HT/FT | Late winner (level at 75') | Goal in each 15' block |
|---|---|---|---|---|---|---|---|
| Sparta Praha v AZ | 49% / 6% / 45% | Sparta Praha: 14% | 54% / 23% | 17% | H/H 23%, A/A 21% | 12% | 33% 36% 36% 37% 42% 45% |
| Beşiktaş v H. Beer-Sheva | 67% / 8% / 24% | Beşiktaş: 24% | 28% / 6% | 10% | H/H 41%, D/H 21% | 10% | 30% 33% 33% 34% 38% 41% |
| Crystal Palace v Real Sociedad | 58% / 6% / 36% | Crystal Palace: 19% | 42% / 13% | 14% | H/H 31%, D/H 18% | 11% | 32% 35% 35% 36% 40% 44% |
| Red Bull v Ararat-Armenia | 76% / 3% / 21% | Red Bull: 48% | 25% / 5% | 8% | H/H 57%, D/H 18% | 8% | 41% 44% 45% 46% 51% 54% |
| Ferencváros v Celje | 72% / 2% / 25% | Ferencváros: 44% | 30% / 8% | 10% | H/H 53%, D/H 17% | 10% | 43% 46% 47% 48% 52% 56% |
| Dinamo Zagreb v Bayer Leverkusen | 36% / 5% / 59% | Bayer Leverkusen: 24% | 41% / 14% | 14% | A/A 35%, D/A 17% | 11% | 34% 38% 38% 38% 43% 46% |
| Juventus v Omonia | 70% / 7% / 23% | Juventus: 32% | 26% / 5% | 9% | H/H 45%, D/H 22% | 9% | 32% 35% 35% 36% 40% 44% |
| NEC v Stade Rennais | 45% / 4% / 51% | Stade Rennais: 18% | 54% / 23% | 18% | A/A 26%, H/H 20% | 11% | 37% 40% 41% 42% 46% 50% |
| OFI Heraklion v RSC Anderlecht | 37% / 6% / 58% | RSC Anderlecht: 22% | 42% / 15% | 14% | A/A 34%, D/A 17% | 11% | 33% 36% 37% 37% 42% 45% |
| Olympique de v Levski Sofia | 68% / 9% / 23% | Olympique de: 23% | 26% / 5% | 10% | H/H 41%, D/H 21% | 10% | 29% 32% 32% 33% 37% 40% |
| Olympique Lyonnais v Lillestrøm | 74% / 4% / 22% | Olympique Lyonnais: 39% | 25% / 5% | 8% | H/H 52%, D/H 20% | 9% | 37% 40% 41% 41% 46% 49% |
| Olympiakos SFP v Milan | 52% / 10% / 38% | Olympiakos SFP: 13% | 43% / 14% | 14% | H/H 26%, D/D 18% | 11% | 28% 30% 31% 32% 36% 39% |
| Celta de v Bournemouth | 44% / 7% / 50% | Bournemouth: 15% | 50% / 20% | 16% | A/A 25%, H/H 19% | 11% | 32% 34% 35% 36% 40% 43% |
| Royale Union v Lech Poznań | 74% / 3% / 23% | Royale Union: 44% | 27% / 6% | 9% | H/H 54%, D/H 19% | 8% | 40% 43% 44% 45% 49% 53% |
| Sunderland v Jagiellonia | 66% / 9% / 25% | Sunderland: 23% | 28% / 6% | 10% | H/H 39%, D/H 21% | 10% | 29% 31% 31% 33% 36% 40% |
| Hoffenheim v Sturm Graz | 60% / 5% / 35% | Hoffenheim: 21% | 41% / 14% | 14% | H/H 34%, D/H 18% | 11% | 34% 37% 38% 38% 42% 46% |
| Viktoria Plzeň v Sport Lisboa | 33% / 9% / 57% | Sport Lisboa: 19% | 37% / 11% | 12% | A/A 33%, D/A 18% | 11% | 29% 31% 31% 33% 36% 40% |
| Ajax v Thun | 71% / 3% / 26% | Ajax: 42% | 31% / 9% | 11% | H/H 50%, D/H 18% | 9% | 41% 45% 45% 46% 51% 54% |
| Borac v Atalanta BC | 23% / 6% / 71% | Atalanta BC: 35% | 26% / 6% | 9% | A/A 47%, D/A 21% | 9% | 33% 36% 36% 37% 41% 45% |
| Brann v Aarhus | 65% / 6% / 29% | Brann: 26% | 33% / 8% | 11% | H/H 40%, D/H 20% | 10% | 33% 36% 36% 37% 41% 45% |
| Brighton & v Univ. Craiova | 83% / 3% / 15% | Brighton &: 57% | 16% / 2% | 5% | H/H 66%, D/H 18% | 7% | 42% 45% 45% 46% 51% 54% |
| CSKA Sofia v Trabzonspor | 36% / 10% / 54% | Trabzonspor: 17% | 40% / 13% | 13% | A/A 30%, D/D 17% | 11% | 29% 32% 31% 33% 36% 40% |
| Egnatia v L. Red | 73% / 5% / 22% | Egnatia: 35% | 25% / 5% | 9% | H/H 49%, D/H 21% | 9% | 35% 38% 38% 39% 43% 47% |
| Hajduk Split v Sint-Truidense VV | 50% / 8% / 42% | Hajduk Split: 13% | 49% / 18% | 15% | H/H 25%, A/A 18% | 11% | 31% 33% 33% 35% 38% 42% |
| Heart of v Monaco | 31% / 4% / 65% | Monaco: 30% | 36% / 11% | 11% | A/A 42%, D/A 19% | 10% | 36% 39% 40% 40% 44% 49% |
| Iberia Tbilisi v Getafe | 19% / 11% / 71% | Getafe: 30% | 20% / 3% | 7% | A/A 45%, D/A 23% | 9% | 27% 30% 30% 31% 34% 38% |
| Inter Escaldes v Copenhagen | 25% / 3% / 72% | Copenhagen: 40% | 29% / 8% | 10% | A/A 53%, D/A 18% | 9% | 41% 44% 45% 45% 50% 54% |
| Jablonec v Lugano | 59% / 6% / 36% | Jablonec: 21% | 42% / 14% | 15% | H/H 33%, D/H 17% | 11% | 34% 37% 37% 38% 42% 46% |
| KAA Gent v Crvena Zvezda | 53% / 7% / 40% | KAA Gent: 14% | 47% / 18% | 15% | H/H 27%, A/A 17% | 11% | 32% 35% 35% 36% 40% 43% |
| Kairat Almaty v Mjällby | 44% / 17% / 39% | Kairat Almaty: 8% | 42% / 13% | 11% | D/D 24%, H/H 21% | 11% | 23% 25% 25% 27% 29% 32% |
| Kauno Žalgiris v Riga | 40% / 10% / 51% | Riga: 15% | 44% / 16% | 14% | A/A 27%, D/D 17% | 11% | 29% 32% 32% 33% 36% 40% |
| Nordsjælland v Panathinaikos | 62% / 7% / 31% | Nordsjælland: 23% | 36% / 10% | 12% | H/H 37%, D/H 19% | 10% | 32% 35% 35% 36% 40% 44% |
| Pafos v Midtjylland | 43% / 8% / 49% | Midtjylland: 15% | 49% / 20% | 16% | A/A 25%, H/H 19% | 11% | 31% 34% 34% 35% 39% 42% |
| Freiburg v Twente '65 | 62% / 6% / 32% | Freiburg: 23% | 38% / 11% | 13% | H/H 36%, D/H 19% | 11% | 33% 36% 36% 37% 41% 45% |
| Sporting Clube v KuPS Kuopio | 79% / 7% / 15% | Sporting Clube: 38% | 16% / 2% | 6% | H/H 54%, D/H 23% | 8% | 32% 35% 35% 36% 40% 43% |

★ = high-probability pick (≥60% and the low end of its range ≥45%).

## League offsets (shared by every club from the country in cross-border games)

| Country | Offset | ± |
|---|---|---|
| ENG | +0.49 | 0.05 |
| ESP | +0.33 | 0.05 |
| GER | +0.28 | 0.05 |
| FRA | +0.25 | 0.05 |
| ITA | +0.23 | 0.05 |
| BEL | +0.19 | 0.06 |
| TUR | +0.10 | 0.06 |
| GRE | +0.09 | 0.06 |
| DEN | +0.08 | 0.06 |
| POR | +0.07 | 0.06 |
| NOR | +0.05 | 0.06 |
| NED | -0.01 | 0.06 |

## Strongest clubs (expected goal difference per game vs a zero-rated side)

| Club | Strength | ± |
|---|---|---|
| FC Barcelona | +3.27 | 0.11 |
| FC Bayern München | +3.17 | 0.12 |
| Real Madrid CF | +2.68 | 0.12 |
| Paris Saint-Germain FC | +2.66 | 0.12 |
| Manchester City FC | +2.64 | 0.12 |
| Arsenal FC | +2.48 | 0.12 |
| Liverpool FC | +2.33 | 0.12 |
| FC Internazionale Milano | +2.24 | 0.12 |
| Club Atlético de Madrid | +1.90 | 0.12 |
| Newcastle United FC | +1.90 | 0.12 |
| Chelsea FC | +1.88 | 0.12 |
| Sporting Clube de Portugal | +1.85 | 0.12 |
| Aston Villa FC | +1.84 | 0.12 |
| Sport Lisboa e Benfica | +1.84 | 0.12 |
| Brighton & Hove Albion FC | +1.82 | 0.12 |
| Manchester United FC | +1.79 | 0.12 |
| Borussia Dortmund | +1.77 | 0.12 |
| Brentford FC | +1.71 | 0.12 |
| Bayer 04 Leverkusen | +1.66 | 0.12 |
| AFC Bournemouth | +1.66 | 0.12 |
