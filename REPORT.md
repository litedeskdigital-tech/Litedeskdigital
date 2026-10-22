# Model report

Generated 2026-10-22. Ratings include results up to 2026-10-21. Parameter set v3 (tuned 2026-10-21).

Sources: openfootball cl 2023-24, openfootball cl 2024-25, openfootball cl 2025-26, openfootball en.1 2023-24, openfootball es.1 2023-24, openfootball de.1 2023-24, openfootball it.1 2023-24, openfootball fr.1 2023-24, openfootball pt.1 2023-24, openfootball nl.1 2023-24, openfootball at.1 2023-24, openfootball en.1 2024-25, openfootball es.1 2024-25, openfootball de.1 2024-25, openfootball it.1 2024-25, openfootball fr.1 2024-25, openfootball pt.1 2024-25, openfootball nl.1 2024-25, openfootball at.1 2024-25, openfootball be.1 2024-25, openfootball tr.1 2024-25, openfootball sco.1 2024-25, openfootball gr.1 2024-25, openfootball en.1 2025-26, openfootball es.1 2025-26, openfootball de.1 2025-26, openfootball it.1 2025-26, openfootball fr.1 2025-26, openfootball pt.1 2025-26, openfootball nl.1 2025-26, openfootball at.1 2025-26, openfootball be.1 2025-26, openfootball tr.1 2025-26, openfootball sco.1 2025-26, openfootball gr.1 2025-26, openfootball en.1 2026-27, openfootball es.1 2026-27, openfootball de.1 2026-27, openfootball it.1 2026-27, openfootball fr.1 2026-27, openfootball pt.1 2026-27, openfootball nl.1 2026-27, 30 provisional hand-entered CL rows, UEFA matches: 816 rows, 1 clubs skipped (see data/uefa-import.json), UEFA player stats 2026-27: 1761 players from 107 clubs, 1 clubs unmapped (see data/uefa-teams.json).

## Live record (predictions frozen before kick-off)

- Scored predictions: 9; log loss 1.101 (1.099 = guessing); most-likely outcome right 56%
- High-probability picks: 3, won 67% (they average 81% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.013 over 9 games

Champions League only:

- Scored predictions: 9; log loss 1.101 (1.099 = guessing); most-likely outcome right 56%
- High-probability picks: 3, won 67% (they average 81% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.013 over 9 games

| Predicted band | Mean predicted | Happened | n |
|---|---|---|---|
| 0–20% | 13% | 20% | 10 |
| 20–40% | 29% | 22% | 9 |
| 40–60% | 47% | 67% | 3 |
| 60–80% | 64% | 67% | 3 |
| 80–100% | 86% | 50% | 2 |

## Walk-forward backtest (all history)

all 9946 matches log loss 0.980, accuracy 53%; Champions League 453 matches log loss 0.887, accuracy 60%

## Learning

- Last tuning check 2026-10-21: tuned — re-tune requested (new data sources)
- Settings: drift 0.00002/day, prior variance 0.1, Dixon–Coles ρ 0.04, newcomer offset 0.25, foreign prior -0.5, goal cap 6, competition half-life 1460 days

## Recent misses

- 2026-10-21 Sporting v LASK (cl): Upset: Sporting were 92% to win (high-probability pick); LASK won 2-3, an outcome priced at 4%. Ratings moved: Sporting attack -0.017, defence -0.032; LASK attack +0.048, defence +0.036.
- 2026-10-21 Lille v Galatasaray (cl): Upset: Lille were 61% to win; Galatasaray won 2-4, an outcome priced at 19%. Ratings moved: Lille attack +0.001, defence -0.035; Galatasaray attack +0.040, defence -0.002.
- 2026-10-21 Bayern v Arsenal (cl): Drawn 2-2; the model gave the draw 23% and leaned Arsenal (39%). Ratings moved: Bayern attack +0.004, defence -0.006; Arsenal attack +0.004, defence -0.007.
- 2026-10-21 Como v Man Utd (cl): Close call: the pick Man Utd had only 41%; 4-1 was priced at 38%. Ratings moved: Como attack +0.030, defence +0.011; Man Utd attack -0.009, defence -0.027.

## Upcoming (next days)

| Date | Comp | Match | H / D / A | Pick | Margin | Score | Bonus scorer |
|---|---|---|---|---|---|---|---|
| 2026-10-22 | el | Bournemouth v Milan | 56% / 22% / 22% | Bournemouth 56% (42%–71%) | Bournemouth by 1 | 1–0 | Álvaro Rodríguez 27% |
| 2026-10-22 | el | Ararat-Armenia v AZ | 22% / 22% / 57% | AZ 57% (38%–77%) | AZ by 1 | 0–1 | Mexx Meerdink 28% |
| 2026-10-22 | el | Beşiktaş v Crystal Palace | 31% / 25% / 44% | Crystal Palace 44% (31%–60%) | Draw | 0–1 | Jørgen Strand Larsen 23% |
| 2026-10-22 | el | Celje v Red Bull | 30% / 20% / 50% | Red Bull 50% (32%–70%) | Red Bull by 1 | 1–2 | Haris Tabaković 33% |
| 2026-10-22 | el | Celtic v Celta de | 35% / 23% / 42% | Celta de 42% (28%–60%) | Draw | 1–1 | Camilo Durán 29% |
| 2026-10-22 | el | Dinamo Zagreb v NEC | 58% / 20% / 22% | Dinamo Zagreb 58% (41%–75%) | Dinamo Zagreb by 1 | 2–1 | Dion Beljo 41% |
| 2026-10-22 | el | Jagiellonia v RSC Anderlecht | 35% / 26% / 40% | RSC Anderlecht 40% (24%–58%) | Draw | 1–1 | Mihajlo Cvetković 24% |
| 2026-10-22 | el | Juventus v Stade Rennais | 63% / 20% / 17% | Juventus 63% (49%–77%) ★ | Juventus by 1 | 1–0 | Nick Woltemade 38% |
| 2026-10-22 | el | Lech Poznań v Sunderland | 27% / 22% / 51% | Sunderland 51% (33%–72%) | Sunderland by 1 | 1–1 | Mikael Ishak 25% |
| 2026-10-22 | el | Lillestrøm v Real Sociedad | 36% / 25% / 39% | Real Sociedad 39% (19%–64%) | Draw | 1–1 | Thomas Olsen 16% |
| 2026-10-22 | el | OFI Heraklion v Bayer Leverkusen | 14% / 17% / 69% | Bayer Leverkusen 69% (52%–85%) ★ | Bayer Leverkusen by 3+ | 0–2 | Patrik Schick 41% |
| 2026-10-22 | el | Omonia v Sport Lisboa | 25% / 24% / 51% | Sport Lisboa 51% (35%–69%) | Draw | 0–1 | Jhon Durán 30% |
| 2026-10-22 | el | Olympiakos SFP v Sparta Praha | 65% / 20% / 15% | Olympiakos SFP 65% (49%–81%) ★ | Olympiakos SFP by 1 | 1–0 | Gelson Martins 27% |
| 2026-10-22 | el | Royale Union v H. Beer-Sheva | 73% / 18% / 9% | Royale Union 73% (56%–88%) ★ | Royale Union by 3+ | 1–0 | Mateo Biondic 30% |
| 2026-10-22 | el | Sturm Graz v Olympique de | 37% / 24% / 39% | Olympique de 39% (25%–55%) | Draw | 1–1 | Keyliane Abdallah 22% |
| 2026-10-22 | el | Hoffenheim v Olympique Lyonnais | 39% / 22% / 39% | Hoffenheim 39% (26%–54%) | Draw | 1–1 | Keito Nakamura 26% |
| 2026-10-22 | el | Viktoria Plzeň v Levski Sofia | 54% / 29% / 17% | Viktoria Plzeň 54% (37%–73%) | Draw | 1–0 | Reinaldo 12% |
| 2026-10-22 | ecl | Aarhus v Egnatia | 58% / 20% / 23% | Aarhus 58% (33%–82%) | Aarhus by 1 | 1–0 | James Bogere 33% |
| 2026-10-22 | ecl | Ajax v Atalanta BC | 31% / 23% / 46% | Atalanta BC 46% (33%–61%) | Draw | 1–1 | Giacomo Raspadori 21% |
| 2026-10-22 | ecl | Monaco v Freiburg | 55% / 21% / 24% | Monaco 55% (41%–69%) | Monaco by 1 | 1–1 | Paris Brunner 34% |
| 2026-10-22 | ecl | Borac v KuPS Kuopio | 47% / 28% / 26% | Borac 47% (29%–66%) | Draw | 1–0 | Luka Juričić 24% |
| 2026-10-22 | ecl | Crvena Zvezda v Copenhagen | 37% / 24% / 39% | Copenhagen 39% (23%–60%) | Draw | 1–1 | Bamba Dieng 20% |
| 2026-10-22 | ecl | Getafe v Lugano | 64% / 21% / 15% | Getafe 64% (48%–79%) ★ | Getafe by 1 | 1–0 | Borja Mayoral 29% |
| 2026-10-22 | ecl | Iberia Tbilisi v Mjällby | 22% / 27% / 52% | Mjällby 52% (31%–76%) | Draw | 0–1 | Jacob Bergström 34% |
| 2026-10-22 | ecl | Inter Escaldes v Univ. Craiova | 30% / 20% / 50% | Univ. Craiova 50% (27%–77%) | Univ. Craiova by 1 | 1–2 | Assad Al Hamlawi 47% |
| 2026-10-22 | ecl | Jablonec v Brighton & | 19% / 22% / 59% | Brighton & 59% (37%–80%) | Brighton & by 1 | 0–1 | Georginio Rutter 38% |
| 2026-10-22 | ecl | Kairat Almaty v Panathinaikos | 27% / 29% / 44% | Panathinaikos 44% (27%–64%) | Draw | 0–1 | Marc Gual 21% |
| 2026-10-22 | ecl | Kauno Žalgiris v Brann | 14% / 20% / 66% | Brann 66% (46%–86%) ★ | Brann by 1 | 0–1 | Niklas Castro 31% |
| 2026-10-22 | ecl | L. Red v Twente '65 | 11% / 18% / 71% | Twente '65 71% (54%–86%) ★ | Twente '65 by 3+ | 0–1 | Wout Weghorst 38% |
| 2026-10-22 | ecl | Midtjylland v Sint-Truidense VV | 71% / 16% / 13% | Midtjylland 71% (54%–87%) ★ | Midtjylland by 3+ | 2–0 | Julius Emefile 27% |
| 2026-10-22 | ecl | Nordsjælland v CSKA Sofia | 86% / 9% / 4% | Nordsjælland 86% (70%–97%) ★ | Nordsjælland by 3+ | 2–0 | Prince Amoako 35% |
| 2026-10-22 | ecl | Pafos v Riga | 65% / 19% / 15% | Pafos 65% (45%–85%) ★ | Pafos by 1 | 1–0 | Lelê 22% |
| 2026-10-22 | ecl | Sporting Clube v KAA Gent | 64% / 20% / 16% | Sporting Clube 64% (50%–78%) ★ | Sporting Clube by 1 | 1–0 | Ricardo Horta 37% |
| 2026-10-22 | ecl | Thun v Hajduk Split | 44% / 23% / 33% | Thun 44% (21%–69%) | Draw | 1–1 | Brighton Labeau 26% |
| 2026-10-22 | ecl | Trabzonspor v Heart of | 62% / 21% / 17% | Trabzonspor 62% (45%–78%) | Trabzonspor by 1 | 1–0 | Djú Franculino 43% |
| 2026-10-23 | de.1 | Stuttgart v Borussia Mönchengladbach | 67% / 16% / 17% | Stuttgart 67% (54%–79%) ★ | Stuttgart by 3+ | 2–1 | Deniz Undav 36% |
| 2026-10-23 | en.1 | Ipswich Town v Nottingham Forest | 23% / 23% / 54% | Nottingham Forest 54% (39%–70%) | Nottingham Forest by 1 | 0–1 | – |
| 2026-10-23 | fr.1 | Stade Brestois v OGC Nice | 48% / 24% / 29% | Stade Brestois 48% (35%–61%) | Draw | 1–1 | – |
| 2026-10-23 | it.1 | Torino v Monza | 53% / 23% / 23% | Torino 53% (39%–68%) | Torino by 1 | 1–0 | – |
| 2026-10-23 | nl.1 | Go Ahead v Telstar | 55% / 21% / 24% | Go Ahead 55% (40%–69%) | Go Ahead by 1 | 1–1 | – |
| 2026-10-23 | pt.1 | Vitória Guimarães v CS Marítimo | 59% / 21% / 20% | Vitória Guimarães 59% (40%–79%) | Vitória Guimarães by 1 | 1–0 | – |
| 2026-10-24 | de.1 | Köln v Schalke | 46% / 24% / 30% | Köln 46% (26%–67%) | Draw | 1–0 | – |
| 2026-10-24 | de.1 | FSV Mainz v Werder Bremen | 52% / 23% / 26% | FSV Mainz 52% (39%–65%) | FSV Mainz by 1 | 1–1 | – |
| 2026-10-24 | de.1 | Dortmund v Eintracht Frankfurt | 67% / 16% / 17% | Dortmund 67% (54%–79%) ★ | Dortmund by 3+ | 2–1 | Serhou Guirassy 57% |
| 2026-10-24 | de.1 | Augsburg v Union Berlin | 52% / 22% / 26% | Augsburg 52% (39%–66%) | Augsburg by 1 | 1–1 | – |
| 2026-10-24 | de.1 | Leipzig v Elversberg | 62% / 18% / 21% | Leipzig 62% (39%–83%) | Leipzig by 3+ | 2–1 | Brajan Gruda 27% |
| 2026-10-24 | de.1 | Paderborn v Hamburger | 43% / 25% / 32% | Paderborn 43% (24%–66%) | Draw | 1–0 | – |
| 2026-10-24 | en.1 | Arsenal v Everton | 64% / 23% / 12% | Arsenal 64% (54%–75%) ★ | Arsenal by 1 | 1–0 | Bukayo Saka 23% |
| 2026-10-24 | en.1 | Villa v Man City | 32% / 23% / 45% | Man City 45% (33%–58%) | Draw | 1–1 | Erling Haaland 34% |
| 2026-10-24 | en.1 | Chelsea v Tottenham Hotspur | 51% / 21% / 27% | Chelsea 51% (39%–64%) | Chelsea by 1 | 1–1 | – |
| 2026-10-24 | en.1 | Coventry City v Fulham | 23% / 24% / 53% | Fulham 53% (33%–75%) | Fulham by 1 | 0–1 | – |
| 2026-10-24 | fr.1 | Lens v Paris | 52% / 23% / 25% | Lens 52% (38%–66%) | Lens by 1 | 1–0 | Florian Thauvin 22% |
| 2026-10-24 | fr.1 | Toulouse v ES Troyes | 68% / 17% / 15% | Toulouse 68% (47%–87%) ★ | Toulouse by 3+ | 2–0 | – |
| 2026-10-24 | it.1 | Cagliari Calcio v Bologna | 31% / 26% / 43% | Bologna 43% (32%–56%) | Draw | 0–1 | – |
| 2026-10-24 | it.1 | Como v US Sassuolo | 65% / 18% / 17% | Como 65% (51%–78%) ★ | Como by 3+ | 2–1 | Tasos Douvikas 36% |
| 2026-10-24 | it.1 | SS Lazio v Parma Calcio | 56% / 25% / 19% | SS Lazio 56% (44%–69%) | SS Lazio by 1 | 1–0 | – |
| 2026-10-24 | it.1 | Napoli v Roma | 34% / 26% / 41% | Roma 41% (30%–53%) | Draw | 1–1 | Donyell Malen 31% |
| 2026-10-24 | nl.1 | ADO Den v Heerenveen | 24% / 20% / 56% | Heerenveen 56% (36%–77%) | Heerenveen by 1 | 1–2 | – |
| 2026-10-24 | nl.1 | Utrecht v PEC Zwolle | 63% / 18% / 18% | Utrecht 63% (50%–76%) ★ | Utrecht by 3+ | 2–1 | – |
| 2026-10-24 | nl.1 | Willem II v Cambuur-Leeuwarden | 48% / 21% / 32% | Willem II 48% (26%–70%) | Draw | 1–1 | – |
| 2026-10-24 | pt.1 | Estrela da v Casa Pia | 45% / 25% / 30% | Estrela da 45% (32%–57%) | Draw | 1–0 | – |
| 2026-10-24 | pt.1 | Alverca v Arouca | 36% / 24% / 40% | Arouca 40% (27%–55%) | Draw | 1–1 | – |
| 2026-10-24 | pt.1 | Gil Vicente v Porto | 18% / 24% / 57% | Porto 57% (46%–71%) | Porto by 1 | 0–1 | Samu 25% |
| 2026-10-25 | de.1 | Freiburg v Bayern | 15% / 15% / 70% | Bayern 70% (57%–83%) ★ | Bayern by 3+ | 1–2 | Harry Kane 57% |
| 2026-10-25 | de.1 | Hoffenheim v Bayer Leverkusen | 25% / 19% / 56% | Bayer Leverkusen 56% (43%–71%) | Bayer Leverkusen by 1 | 1–2 | Patrik Schick 41% |
| 2026-10-25 | en.1 | Crystal Palace v Newcastle United | 33% / 24% / 43% | Newcastle United 43% (32%–56%) | Draw | 1–1 | Jørgen Strand Larsen 22% |
| 2026-10-25 | en.1 | Hull City v Brentford | 32% / 25% / 44% | Brentford 44% (24%–67%) | Draw | 0–1 | – |
| 2026-10-25 | en.1 | Liverpool v Brighton & | 51% / 22% / 27% | Liverpool 51% (38%–63%) | Liverpool by 1 | 1–1 | Georginio Rutter 30% |
| 2026-10-25 | en.1 | Man Utd v Bournemouth | 45% / 23% / 32% | Man Utd 45% (33%–58%) | Draw | 1–1 | Álvaro Rodríguez 21% |
| 2026-10-25 | en.1 | Sunderland v Leeds United | 37% / 26% / 36% | Sunderland 37% (24%–52%) | Draw | 1–1 | Noah Sadiki 18% |
| 2026-10-25 | es.1 | Athletic Club v Getafe | 50% / 28% / 21% | Athletic Club 50% (39%–62%) | Draw | 1–0 | Borja Mayoral 13% |
| 2026-10-25 | es.1 | Atlético v Deportivo La | 74% / 15% / 11% | Atlético 74% (56%–89%) ★ | Atlético by 3+ | 2–0 | Julián Alvarez 51% |
| 2026-10-25 | es.1 | Deportivo Alavés v Málaga | 62% / 23% / 16% | Deportivo Alavés 62% (44%–79%) | Deportivo Alavés by 1 | 1–0 | – |
| 2026-10-25 | es.1 | Barça v Real Madrid | 53% / 19% / 28% | Barça 53% (40%–67%) | Barça by 1 | 2–1 | Kylian Mbappé 47% |
| 2026-10-25 | es.1 | Rayo Vallecano v Elche | 51% / 23% / 26% | Rayo Vallecano 51% (37%–65%) | Rayo Vallecano by 1 | 1–0 | – |
| 2026-10-25 | es.1 | Celta de v Betis | 42% / 24% / 34% | Celta de 42% (30%–54%) | Draw | 1–1 | Williot Swedberg 19% |
| 2026-10-25 | es.1 | Real Racing v Espanyol de | 36% / 21% / 42% | Espanyol de 42% (22%–66%) | Draw | 1–1 | – |
| 2026-10-25 | es.1 | Real Sociedad v Levante | 56% / 21% / 24% | Real Sociedad 56% (41%–70%) | Real Sociedad by 1 | 2–1 | Mikel Oyarzabal 23% |
| 2026-10-25 | es.1 | Sevilla v CA Osasuna | 47% / 24% / 29% | Sevilla 47% (35%–60%) | Draw | 1–1 | – |
| 2026-10-25 | es.1 | Valencia v Villarreal | 34% / 23% / 44% | Villarreal 44% (31%–58%) | Draw | 1–1 | Georges Mikautadze 28% |
| 2026-10-25 | fr.1 | AJ Auxerre v Le Mans | 50% / 22% / 29% | AJ Auxerre 50% (29%–72%) | Draw | 1–1 | – |
| 2026-10-25 | fr.1 | Angers SCO v Lorient | 34% / 26% / 40% | Lorient 40% (28%–55%) | Draw | 1–1 | – |
| 2026-10-25 | fr.1 | Monaco v Lille | 46% / 24% / 31% | Monaco 46% (34%–58%) | Draw | 1–1 | Paris Brunner 31% |
| 2026-10-25 | fr.1 | Olympique de v Le Havre | 63% / 20% / 18% | Olympique de 63% (50%–75%) ★ | Olympique de by 1 | 1–0 | Keyliane Abdallah 36% |
| 2026-10-25 | fr.1 | PSG v Olympique Lyonnais | 69% / 17% / 14% | PSG 69% (57%–80%) ★ | PSG by 3+ | 2–1 | Ousmane Dembélé 44% |
| 2026-10-25 | fr.1 | Stade Rennais v Strasbourg Alsace | 45% / 22% / 33% | Stade Rennais 45% (32%–59%) | Draw | 1–1 | Esteban Lepaul 22% |
| 2026-10-25 | it.1 | Atalanta BC v Frosinone Calcio | 64% / 20% / 17% | Atalanta BC 64% (48%–78%) ★ | Atalanta BC by 1 | 1–0 | Gianluca Scamacca 30% |
| 2026-10-25 | it.1 | Inter v ACF Fiorentina | 71% / 16% / 13% | Inter 71% (60%–82%) ★ | Inter by 3+ | 2–0 | Lautaro Martínez 38% |
| 2026-10-25 | it.1 | Genoa CFC v Venezia | 51% / 26% / 23% | Genoa CFC 51% (37%–66%) | Draw | 1–0 | – |
| 2026-10-25 | it.1 | Udinese Calcio v Milan | 26% / 24% / 51% | Milan 51% (39%–65%) | Milan by 1 | 0–1 | Alphadjo Cisse 31% |
| 2026-10-25 | it.1 | US Lecce v Juventus | 14% / 23% / 63% | Juventus 63% (51%–75%) ★ | Juventus by 1 | 0–1 | Nick Woltemade 32% |
| 2026-10-25 | nl.1 | AZ v Twente '65 | 45% / 23% / 32% | AZ 45% (33%–58%) | Draw | 1–1 | Wout Weghorst 26% |
| 2026-10-25 | nl.1 | Fortuna Sittard v SBV Excelsior | 40% / 23% / 37% | Fortuna Sittard 40% (27%–54%) | Draw | 1–1 | – |
| 2026-10-25 | nl.1 | NEC v Groningen | 52% / 21% / 27% | NEC 52% (38%–66%) | NEC by 1 | 2–1 | Tjaronn Chery 34% |
| 2026-10-25 | nl.1 | PSV v Feyenoord | 61% / 17% / 22% | PSV 61% (47%–74%) ★ | PSV by 3+ | 2–1 | Ivan Perišić 25% |
| 2026-10-25 | nl.1 | Sparta Rotterdam v Ajax | 24% / 20% / 56% | Ajax 56% (43%–71%) | Ajax by 1 | 1–2 | Tolu Arokodare 24% |
| 2026-10-25 | pt.1 | Nacional v Sporting Clube | 21% / 23% / 56% | Sporting Clube 56% (44%–70%) | Sporting Clube by 1 | 0–1 | Ricardo Horta 32% |
| 2026-10-25 | pt.1 | GD Estoril v Moreirense | 48% / 23% / 29% | GD Estoril 48% (35%–62%) | Draw | 1–1 | – |
| 2026-10-25 | pt.1 | Rio Ave v Famalicão | 26% / 26% / 48% | Famalicão 48% (36%–62%) | Draw | 0–1 | – |
| 2026-10-25 | pt.1 | Sporting v Académico de | 82% / 11% / 7% | Sporting 82% (67%–94%) ★ | Sporting by 3+ | 2–0 | Luis Suárez 54% |
| 2026-10-26 | pt.1 | Santa Clara v Sport Lisboa | 16% / 23% / 61% | Sport Lisboa 61% (48%–74%) ★ | Sport Lisboa by 1 | 0–1 | Jhon Durán 33% |
| 2026-10-27 | it.1 | Roma v Cagliari Calcio | 67% / 20% / 14% | Roma 67% (55%–78%) ★ | Roma by 1 | 1–0 | Donyell Malen 43% |
| 2026-10-27 | it.1 | Torino v Como | 23% / 23% / 54% | Como 54% (41%–69%) | Como by 1 | 0–1 | Tasos Douvikas 29% |
| 2026-10-27 | it.1 | US Sassuolo v SS Lazio | 30% / 24% / 46% | SS Lazio 46% (34%–61%) | Draw | 1–1 | – |
| 2026-10-28 | it.1 | Milan v Bologna | 50% / 25% / 26% | Milan 50% (38%–62%) | Draw | 1–0 | Alphadjo Cisse 29% |
| 2026-10-28 | it.1 | Monza v Napoli | 17% / 21% / 63% | Napoli 63% (48%–78%) ★ | Napoli by 1 | 0–1 | Rasmus Højlund 24% |
| 2026-10-28 | it.1 | Genoa CFC v Juventus | 20% / 25% / 55% | Juventus 55% (43%–69%) | Juventus by 1 | 0–1 | Nick Woltemade 30% |
| 2026-10-28 | it.1 | Parma Calcio v Udinese Calcio | 34% / 28% / 39% | Udinese Calcio 39% (28%–52%) | Draw | 0–1 | – |
| 2026-10-28 | it.1 | Venezia v Inter | 8% / 14% / 78% | Inter 78% (64%–90%) ★ | Inter by 3+ | 0–2 | Lautaro Martínez 40% |
| 2026-10-29 | it.1 | ACF Fiorentina v Atalanta BC | 27% / 24% / 49% | Atalanta BC 49% (37%–62%) | Draw | 0–1 | Gianluca Scamacca 24% |
| 2026-10-29 | it.1 | Frosinone Calcio v US Lecce | 52% / 24% / 24% | Frosinone Calcio 52% (37%–68%) | Frosinone Calcio by 1 | 1–0 | – |
| 2026-10-30 | de.1 | Elversberg v FSV Mainz | 39% / 22% / 39% | Elversberg 39% (20%–61%) | Draw | 1–1 | – |
| 2026-10-30 | fr.1 | Le Havre v PSG | 10% / 15% / 75% | PSG 75% (63%–86%) ★ | PSG by 3+ | 0–2 | Ousmane Dembélé 43% |
| 2026-10-30 | fr.1 | Lille v Lens | 43% / 26% / 31% | Lille 43% (32%–55%) | Draw | 1–0 | Olivier Giroud 18% |
| 2026-10-30 | pt.1 | Casa Pia v Sporting | 9% / 15% / 76% | Sporting 76% (65%–87%) ★ | Sporting by 3+ | 0–2 | Luis Suárez 47% |
| 2026-10-31 | de.1 | Bayer Leverkusen v Stuttgart | 55% / 20% / 25% | Bayer Leverkusen 55% (42%–68%) | Bayer Leverkusen by 1 | 2–1 | Patrik Schick 40% |
| 2026-10-31 | de.1 | Borussia Mönchengladbach v Paderborn | 52% / 22% / 26% | Borussia Mönchengladbach 52% (31%–74%) | Borussia Mönchengladbach by 1 | 1–0 | – |
| 2026-10-31 | de.1 | Augsburg v Freiburg | 37% / 23% / 41% | Freiburg 41% (28%–55%) | Draw | 1–1 | Vincenzo Grifo 33% |
| 2026-10-31 | de.1 | Bayern v Dortmund | 66% / 16% / 18% | Bayern 66% (53%–78%) ★ | Bayern by 3+ | 2–1 | Harry Kane 55% |
| 2026-10-31 | de.1 | Schalke v Leipzig | 24% / 22% / 54% | Leipzig 54% (32%–76%) | Leipzig by 1 | 0–1 | Brajan Gruda 21% |
| 2026-10-31 | de.1 | Werder Bremen v Hoffenheim | 42% / 21% / 37% | Werder Bremen 42% (28%–56%) | Draw | 1–1 | Adam Hložek 17% |
| 2026-10-31 | en.1 | Bournemouth v Leeds United | 47% / 24% / 29% | Bournemouth 47% (33%–61%) | Draw | 1–1 | Álvaro Rodríguez 25% |
| 2026-10-31 | en.1 | Villa v Fulham | 53% / 23% / 24% | Villa 53% (41%–66%) | Villa by 1 | 1–0 | Nicolas Jackson 33% |
| 2026-10-31 | en.1 | Brentford v Nottingham Forest | 47% / 24% / 29% | Brentford 47% (35%–59%) | Draw | 1–1 | – |
| 2026-10-31 | en.1 | Chelsea v Man Utd | 45% / 22% / 33% | Chelsea 45% (33%–59%) | Draw | 1–1 | Bruno Fernandes 16% |
| 2026-10-31 | en.1 | Coventry City v Sunderland | 25% / 26% / 49% | Sunderland 49% (29%–72%) | Draw | 0–1 | Noah Sadiki 20% |
| 2026-10-31 | en.1 | Hull City v Ipswich Town | 56% / 22% / 22% | Hull City 56% (35%–78%) | Hull City by 1 | 1–0 | – |
| 2026-10-31 | en.1 | Man City v Brighton & | 57% / 21% / 22% | Man City 57% (44%–69%) | Man City by 1 | 2–1 | Erling Haaland 39% |
| 2026-10-31 | en.1 | Tottenham Hotspur v Crystal Palace | 46% / 24% / 30% | Tottenham Hotspur 46% (34%–58%) | Draw | 1–1 | Jørgen Strand Larsen 21% |
| 2026-10-31 | fr.1 | ES Troyes v Le Mans | 33% / 21% / 47% | Le Mans 47% (21%–78%) | Draw | 1–1 | – |
| 2026-10-31 | fr.1 | Lorient v Stade Brestois | 43% / 23% / 34% | Lorient 43% (30%–57%) | Draw | 1–1 | – |
| 2026-10-31 | fr.1 | OGC Nice v Stade Rennais | 34% / 23% / 42% | Stade Rennais 42% (30%–57%) | Draw | 1–1 | Esteban Lepaul 20% |
| 2026-10-31 | fr.1 | Olympique Lyonnais v Angers SCO | 66% / 20% / 14% | Olympique Lyonnais 66% (54%–78%) ★ | Olympique Lyonnais by 1 | 1–0 | Keito Nakamura 30% |
| 2026-10-31 | it.1 | Milan v Inter | 29% / 23% / 48% | Inter 48% (35%–62%) | Draw | 1–1 | Lautaro Martínez 28% |
| 2026-10-31 | it.1 | Bologna v Monza | 63% / 21% / 16% | Bologna 63% (50%–77%) ★ | Bologna by 1 | 1–0 | – |
| 2026-10-31 | it.1 | Udinese Calcio v Roma | 20% / 23% / 57% | Roma 57% (44%–71%) | Roma by 1 | 0–1 | Donyell Malen 39% |
| 2026-10-31 | nl.1 | Ajax v AZ | 50% / 21% / 30% | Ajax 50% (37%–63%) | Ajax by 1 | 2–1 | Tolu Arokodare 23% |
| 2026-10-31 | nl.1 | Feyenoord v Fortuna Sittard | 76% / 14% / 10% | Feyenoord 76% (65%–87%) ★ | Feyenoord by 3+ | 2–0 | Anis Hadj Moussa 32% |
| 2026-10-31 | nl.1 | PSV v Willem II | 93% / 5% / 3% | PSV 93% (85%–98%) ★ | PSV by 3+ | 4–0 | Ivan Perišić 38% |
| 2026-10-31 | nl.1 | Cambuur-Leeuwarden v Go Ahead | 23% / 18% / 59% | Go Ahead 59% (38%–81%) | Go Ahead by 3+ | 1–2 | – |
| 2026-10-31 | nl.1 | Heerenveen v NEC | 41% / 21% / 38% | Heerenveen 41% (28%–54%) | Draw | 1–1 | Tjaronn Chery 30% |
| 2026-10-31 | pt.1 | Porto v GD Estoril | 75% / 16% / 10% | Porto 75% (64%–85%) ★ | Porto by 3+ | 2–0 | Samu 36% |
| 2026-10-31 | pt.1 | Moreirense v Estrela da | 47% / 25% / 28% | Moreirense 47% (35%–60%) | Draw | 1–0 | – |
| 2026-11-01 | de.1 | Union Berlin v Köln | 43% / 24% / 33% | Union Berlin 43% (29%–57%) | Draw | 1–1 | – |
| 2026-11-01 | de.1 | Eintracht Frankfurt v Hamburger | 62% / 18% / 19% | Eintracht Frankfurt 62% (47%–77%) ★ | Eintracht Frankfurt by 3+ | 2–1 | – |
| 2026-11-01 | en.1 | Liverpool v Arsenal | 28% / 26% / 46% | Arsenal 46% (35%–58%) | Draw | 0–1 | Bukayo Saka 20% |
| 2026-11-01 | es.1 | Athletic Club v Real Sociedad | 51% / 24% / 26% | Athletic Club 51% (39%–63%) | Athletic Club by 1 | 1–0 | Mikel Oyarzabal 13% |
| 2026-11-01 | es.1 | Elche v Valencia | 47% / 23% / 30% | Elche 47% (33%–62%) | Draw | 1–1 | – |
| 2026-11-01 | es.1 | Barça v Deportivo Alavés | 81% / 11% / 7% | Barça 81% (71%–90%) ★ | Barça by 3+ | 3–0 | Anthony Gordon 49% |
| 2026-11-01 | es.1 | Getafe v Sevilla | 42% / 29% / 30% | Getafe 42% (31%–53%) | Draw | 1–0 | Borja Mayoral 20% |
| 2026-11-01 | es.1 | Levante v Atlético | 22% / 21% / 57% | Atlético 57% (44%–72%) | Atlético by 1 | 1–2 | Julián Alvarez 44% |
| 2026-11-01 | es.1 | Rayo Vallecano v Celta de | 41% / 26% / 33% | Rayo Vallecano 41% (30%–53%) | Draw | 1–1 | Williot Swedberg 16% |
| 2026-11-01 | es.1 | Deportivo La v CA Osasuna | 42% / 24% / 33% | Deportivo La 42% (25%–63%) | Draw | 1–1 | – |
| 2026-11-01 | es.1 | Betis v Málaga | 72% / 18% / 11% | Betis 72% (55%–87%) ★ | Betis by 3+ | 1–0 | Antony 29% |
| 2026-11-01 | es.1 | Real Racing v Real Madrid | 9% / 11% / 80% | Real Madrid 80% (60%–94%) ★ | Real Madrid by 3+ | 1–3 | Kylian Mbappé 73% |
| 2026-11-01 | es.1 | Villarreal v Espanyol de | 63% / 19% / 18% | Villarreal 63% (50%–76%) ★ | Villarreal by 1 | 2–1 | Georges Mikautadze 35% |
| 2026-11-01 | fr.1 | Olympique de v Toulouse | 53% / 22% / 26% | Olympique de 53% (40%–66%) | Olympique de by 1 | 1–1 | Keyliane Abdallah 33% |
| 2026-11-01 | fr.1 | Paris v Monaco | 34% / 23% / 43% | Monaco 43% (29%–59%) | Draw | 1–1 | Paris Brunner 32% |
| 2026-11-01 | fr.1 | Strasbourg Alsace v AJ Auxerre | 55% / 22% / 24% | Strasbourg Alsace 55% (41%–68%) | Strasbourg Alsace by 1 | 1–0 | – |
| 2026-11-01 | it.1 | Como v Venezia | 74% / 16% / 10% | Como 74% (61%–87%) ★ | Como by 3+ | 2–0 | Tasos Douvikas 37% |
| 2026-11-01 | it.1 | Frosinone Calcio v Torino | 42% / 24% / 34% | Frosinone Calcio 42% (27%–59%) | Draw | 1–1 | – |
| 2026-11-01 | it.1 | Juventus v Napoli | 46% / 27% / 27% | Juventus 46% (35%–58%) | Draw | 1–0 | Nick Woltemade 27% |
| 2026-11-01 | it.1 | SS Lazio v Cagliari Calcio | 53% / 25% / 22% | SS Lazio 53% (41%–66%) | SS Lazio by 1 | 1–0 | – |
| 2026-11-01 | it.1 | US Lecce v Genoa CFC | 31% / 29% / 40% | Genoa CFC 40% (29%–53%) | Draw | 0–1 | – |
| 2026-11-01 | nl.1 | Groningen v Sparta Rotterdam | 52% / 23% / 25% | Groningen 52% (39%–66%) | Groningen by 1 | 1–1 | – |
| 2026-11-01 | nl.1 | PEC Zwolle v ADO Den | 56% / 20% / 24% | PEC Zwolle 56% (36%–76%) | PEC Zwolle by 1 | 2–1 | – |
| 2026-11-01 | nl.1 | SBV Excelsior v Twente '65 | 30% / 22% / 48% | Twente '65 48% (35%–63%) | Draw | 1–1 | Wout Weghorst 32% |
| 2026-11-01 | nl.1 | Telstar v Utrecht | 35% / 23% / 42% | Utrecht 42% (29%–57%) | Draw | 1–1 | – |
| 2026-11-01 | pt.1 | Académico de v Rio Ave | 49% / 24% / 28% | Académico de 49% (30%–70%) | Draw | 1–0 | – |
| 2026-11-01 | pt.1 | CS Marítimo v Santa Clara | 29% / 27% / 45% | Santa Clara 45% (27%–66%) | Draw | 0–1 | – |
| 2026-11-01 | pt.1 | Arouca v Nacional | 53% / 23% / 25% | Arouca 53% (39%–66%) | Arouca by 1 | 1–0 | – |
| 2026-11-01 | pt.1 | Sporting Clube v Famalicão | 50% / 26% / 24% | Sporting Clube 50% (38%–61%) | Draw | 1–0 | Ricardo Horta 28% |

### UEFA club-competition scenarios (5,000 minute-by-minute simulations each)

| Match | First goal H / none / A | Favourite wins after conceding first | Favourite trails / trails by 2 | Favourite drops a lead | Likeliest HT/FT | Late winner (level at 75') | Goal in each 15' block |
|---|---|---|---|---|---|---|---|
| Bournemouth v Milan | 61% / 6% / 33% | Bournemouth: 22% | 38% / 11% | 14% | H/H 35%, D/H 19% | 11% | 33% 35% 36% 37% 41% 44% |
| Ararat-Armenia v AZ | 34% / 6% / 60% | AZ: 24% | 38% / 12% | 12% | A/A 37%, D/A 18% | 11% | 33% 36% 36% 37% 41% 45% |
| Beşiktaş v Crystal Palace | 41% / 9% / 51% | Crystal Palace: 14% | 45% / 17% | 14% | A/A 26%, D/D 17% | 11% | 30% 32% 32% 34% 37% 40% |
| Celje v Red Bull | 42% / 3% / 55% | Red Bull: 23% | 51% / 21% | 19% | A/A 32%, H/H 17% | 11% | 41% 44% 45% 45% 50% 54% |
| Celtic v Celta de | 46% / 5% / 50% | Celta de: 17% | 54% / 23% | 17% | A/A 25%, H/H 20% | 12% | 35% 39% 39% 40% 44% 48% |
| Dinamo Zagreb v NEC | 61% / 4% / 35% | Dinamo Zagreb: 26% | 42% / 14% | 15% | H/H 36%, D/H 17% | 11% | 37% 40% 41% 42% 46% 50% |
| Jagiellonia v RSC Anderlecht | 43% / 9% / 47% | RSC Anderlecht: 12% | 49% / 19% | 14% | A/A 23%, H/H 19% | 11% | 29% 31% 31% 33% 36% 40% |
| Juventus v Stade Rennais | 65% / 5% / 29% | Juventus: 27% | 34% / 9% | 12% | H/H 40%, D/H 20% | 10% | 33% 37% 37% 38% 42% 45% |
| Lech Poznań v Sunderland | 38% / 5% / 57% | Sunderland: 22% | 44% / 17% | 15% | A/A 32%, D/A 17% | 11% | 34% 37% 37% 38% 43% 46% |
| Lillestrøm v Real Sociedad | 45% / 9% / 46% | Real Sociedad: 12% | 50% / 21% | 14% | A/A 22%, H/H 20% | 11% | 30% 32% 32% 34% 37% 41% |
| OFI Heraklion v Bayer Leverkusen | 28% / 4% / 68% | Bayer Leverkusen: 34% | 32% / 9% | 11% | A/A 47%, D/A 19% | 10% | 37% 41% 41% 42% 46% 50% |
| Omonia v Sport Lisboa | 36% / 8% / 56% | Sport Lisboa: 18% | 40% / 13% | 14% | A/A 31%, D/A 17% | 11% | 30% 33% 33% 34% 38% 41% |
| Olympiakos SFP v Sparta Praha | 67% / 7% / 26% | Olympiakos SFP: 27% | 29% / 7% | 11% | H/H 42%, D/H 20% | 10% | 32% 35% 35% 36% 40% 43% |
| Royale Union v H. Beer-Sheva | 73% / 9% / 18% | Royale Union: 30% | 19% / 3% | 7% | H/H 48%, D/H 23% | 9% | 30% 32% 32% 33% 37% 40% |
| Sturm Graz v Olympique de | 47% / 7% / 47% | Olympique de: 13% | 53% / 23% | 16% | A/A 22%, H/H 21% | 11% | 32% 35% 35% 36% 40% 44% |
| Hoffenheim v Olympique Lyonnais | 49% / 4% / 48% | Hoffenheim: 15% | 58% / 27% | 19% | A/A 23%, H/H 23% | 12% | 37% 40% 41% 41% 46% 50% |
| Viktoria Plzeň v Levski Sofia | 57% / 17% / 26% | Viktoria Plzeň: 13% | 28% / 6% | 9% | H/H 31%, D/D 23% | 11% | 22% 24% 24% 26% 28% 31% |
| Aarhus v Egnatia | 61% / 5% / 34% | Aarhus: 24% | 41% / 14% | 14% | H/H 37%, D/H 17% | 11% | 37% 40% 40% 41% 45% 49% |
| Ajax v Atalanta BC | 42% / 6% / 52% | Atalanta BC: 18% | 49% / 19% | 16% | A/A 28%, H/H 17% | 11% | 33% 36% 37% 37% 42% 45% |
| Monaco v Freiburg | 60% / 5% / 36% | Monaco: 23% | 42% / 14% | 15% | H/H 34%, D/H 17% | 11% | 35% 39% 39% 40% 44% 48% |
| Borac v KuPS Kuopio | 53% / 13% / 35% | Borac: 12% | 39% / 12% | 12% | H/H 27%, D/D 20% | 11% | 26% 28% 28% 30% 33% 36% |
| Crvena Zvezda v Copenhagen | 46% / 8% / 47% | Copenhagen: 13% | 52% / 22% | 16% | A/A 23%, H/H 21% | 11% | 31% 34% 34% 35% 39% 43% |
| Getafe v Lugano | 66% / 9% / 25% | Getafe: 23% | 28% / 6% | 10% | H/H 40%, D/H 21% | 10% | 30% 32% 32% 34% 37% 41% |
| Iberia Tbilisi v Mjällby | 31% / 13% / 56% | Mjällby: 16% | 34% / 9% | 10% | A/A 32%, D/D 20% | 11% | 26% 28% 28% 30% 33% 36% |
| Inter Escaldes v Univ. Craiova | 42% / 3% / 55% | Univ. Craiova: 22% | 50% / 21% | 18% | A/A 32%, H/H 17% | 11% | 40% 43% 44% 44% 48% 53% |
| Jablonec v Brighton & | 31% / 8% / 62% | Brighton &: 24% | 35% / 10% | 12% | A/A 37%, D/A 19% | 11% | 31% 34% 34% 35% 39% 43% |
| Kairat Almaty v Panathinaikos | 36% / 14% / 50% | Panathinaikos: 13% | 38% / 11% | 11% | A/A 25%, D/D 21% | 11% | 24% 26% 26% 28% 31% 34% |
| Kauno Žalgiris v Brann | 25% / 8% / 67% | Brann: 30% | 28% / 7% | 10% | A/A 43%, D/A 20% | 10% | 32% 34% 34% 35% 39% 43% |
| L. Red v Twente '65 | 23% / 7% / 71% | Twente '65: 34% | 25% / 5% | 9% | A/A 47%, D/A 21% | 9% | 32% 35% 35% 36% 41% 44% |
| Midtjylland v Sint-Truidense VV | 70% / 4% / 26% | Midtjylland: 36% | 31% / 8% | 11% | H/H 47%, D/H 19% | 10% | 37% 41% 41% 42% 46% 50% |
| Nordsjælland v CSKA Sofia | 83% / 4% / 14% | Nordsjælland: 53% | 14% / 2% | 4% | H/H 66%, D/H 18% | 6% | 40% 42% 43% 44% 48% 52% |
| Pafos v Riga | 67% / 7% / 27% | Pafos: 27% | 30% / 7% | 11% | H/H 42%, D/H 20% | 10% | 33% 36% 36% 37% 41% 45% |
| Sporting Clube v KAA Gent | 66% / 6% / 28% | Sporting Clube: 27% | 32% / 8% | 11% | H/H 41%, D/H 20% | 10% | 33% 36% 37% 37% 41% 45% |
| Thun v Hajduk Split | 51% / 6% / 43% | Thun: 15% | 50% / 21% | 16% | H/H 26%, A/A 19% | 11% | 33% 36% 36% 37% 41% 45% |
| Trabzonspor v Heart of | 65% / 7% / 28% | Trabzonspor: 24% | 32% / 8% | 11% | H/H 39%, D/H 20% | 10% | 32% 34% 35% 36% 40% 43% |

★ = high-probability pick (≥60% and the low end of its range ≥45%).

## League offsets (shared by every club from the country in cross-border games)

| Country | Offset | ± |
|---|---|---|
| ENG | +0.50 | 0.05 |
| ESP | +0.34 | 0.05 |
| GER | +0.27 | 0.05 |
| FRA | +0.24 | 0.06 |
| ITA | +0.23 | 0.06 |
| BEL | +0.16 | 0.06 |
| DEN | +0.13 | 0.07 |
| TUR | +0.08 | 0.06 |
| NOR | +0.07 | 0.06 |
| GRE | +0.07 | 0.06 |
| POR | +0.05 | 0.06 |
| CRO | -0.01 | 0.07 |

## Strongest clubs (expected goal difference per game vs a zero-rated side)

| Club | Strength | ± |
|---|---|---|
| FC Barcelona | +3.26 | 0.11 |
| FC Bayern München | +3.15 | 0.12 |
| Manchester City FC | +2.70 | 0.12 |
| Real Madrid CF | +2.61 | 0.12 |
| Arsenal FC | +2.56 | 0.12 |
| Paris Saint-Germain FC | +2.51 | 0.12 |
| Liverpool FC | +2.34 | 0.12 |
| FC Internazionale Milano | +2.19 | 0.12 |
| Aston Villa FC | +1.97 | 0.12 |
| Club Atlético de Madrid | +1.97 | 0.12 |
| Newcastle United FC | +1.93 | 0.12 |
| Chelsea FC | +1.92 | 0.12 |
| Brighton & Hove Albion FC | +1.90 | 0.12 |
| Sporting Clube de Portugal | +1.79 | 0.12 |
| Manchester United FC | +1.79 | 0.12 |
| Brentford FC | +1.75 | 0.12 |
| Borussia Dortmund | +1.72 | 0.12 |
| Sport Lisboa e Benfica | +1.71 | 0.12 |
| Bayer 04 Leverkusen | +1.67 | 0.12 |
| AFC Bournemouth | +1.62 | 0.12 |
