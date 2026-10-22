# Model report

Generated 2026-10-22. Ratings include results up to 2026-10-22. Parameter set v3 (tuned 2026-10-21).

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
| 2026-10-25 | de.1 | Freiburg v Bayern | 15% / 15% / 71% | Bayern 71% (58%–83%) ★ | Bayern by 3+ | 1–2 | Harry Kane 58% |
| 2026-10-25 | de.1 | Hoffenheim v Bayer Leverkusen | 25% / 20% / 55% | Bayer Leverkusen 55% (42%–70%) | Bayer Leverkusen by 1 | 1–2 | Patrik Schick 39% |
| 2026-10-25 | en.1 | Crystal Palace v Newcastle United | 33% / 24% / 43% | Newcastle United 43% (32%–57%) | Draw | 1–1 | Yeremy Pino 21% |
| 2026-10-25 | en.1 | Hull City v Brentford | 32% / 25% / 44% | Brentford 44% (24%–67%) | Draw | 0–1 | – |
| 2026-10-25 | en.1 | Liverpool v Brighton & | 51% / 22% / 27% | Liverpool 51% (39%–63%) | Liverpool by 1 | 1–1 | Georginio Rutter 29% |
| 2026-10-25 | en.1 | Man Utd v Bournemouth | 44% / 23% / 33% | Man Utd 44% (32%–57%) | Draw | 1–1 | Justin Kluivert 24% |
| 2026-10-25 | en.1 | Sunderland v Leeds United | 37% / 26% / 37% | Sunderland 37% (24%–51%) | Draw | 1–1 | Enzo Le Fée 14% |
| 2026-10-25 | es.1 | Athletic Club v Getafe | 53% / 27% / 20% | Athletic Club 53% (41%–64%) | Draw | 1–0 | Borja Mayoral 16% |
| 2026-10-25 | es.1 | Atlético v Deportivo La | 74% / 15% / 11% | Atlético 74% (56%–89%) ★ | Atlético by 3+ | 2–0 | Julián Alvarez 51% |
| 2026-10-25 | es.1 | Deportivo Alavés v Málaga | 62% / 23% / 16% | Deportivo Alavés 62% (44%–79%) | Deportivo Alavés by 1 | 1–0 | – |
| 2026-10-25 | es.1 | Barça v Real Madrid | 53% / 19% / 28% | Barça 53% (40%–67%) | Barça by 1 | 2–1 | Kylian Mbappé 47% |
| 2026-10-25 | es.1 | Rayo Vallecano v Elche | 51% / 23% / 26% | Rayo Vallecano 51% (37%–65%) | Rayo Vallecano by 1 | 1–0 | – |
| 2026-10-25 | es.1 | Celta de v Betis | 42% / 24% / 34% | Celta de 42% (31%–54%) | Draw | 1–1 | Antony 19% |
| 2026-10-25 | es.1 | Real Racing v Espanyol de | 36% / 21% / 42% | Espanyol de 42% (22%–66%) | Draw | 1–1 | – |
| 2026-10-25 | es.1 | Real Sociedad v Levante | 58% / 20% / 22% | Real Sociedad 58% (44%–72%) | Real Sociedad by 1 | 2–1 | Sergio Gómez 34% |
| 2026-10-25 | es.1 | Sevilla v CA Osasuna | 47% / 24% / 29% | Sevilla 47% (35%–60%) | Draw | 1–1 | – |
| 2026-10-25 | es.1 | Valencia v Villarreal | 34% / 23% / 44% | Villarreal 44% (31%–58%) | Draw | 1–1 | Georges Mikautadze 28% |
| 2026-10-25 | fr.1 | AJ Auxerre v Le Mans | 50% / 22% / 29% | AJ Auxerre 50% (29%–72%) | Draw | 1–1 | – |
| 2026-10-25 | fr.1 | Angers SCO v Lorient | 34% / 26% / 40% | Lorient 40% (28%–55%) | Draw | 1–1 | – |
| 2026-10-25 | fr.1 | Monaco v Lille | 46% / 24% / 30% | Monaco 46% (35%–59%) | Draw | 1–1 | Paris Brunner 32% |
| 2026-10-25 | fr.1 | Olympique de v Le Havre | 62% / 20% / 18% | Olympique de 62% (49%–74%) ★ | Olympique de by 1 | 1–0 | Keyliane Abdallah 32% |
| 2026-10-25 | fr.1 | PSG v Olympique Lyonnais | 70% / 16% / 14% | PSG 70% (59%–81%) ★ | PSG by 3+ | 2–0 | Ousmane Dembélé 44% |
| 2026-10-25 | fr.1 | Stade Rennais v Strasbourg Alsace | 45% / 22% / 33% | Stade Rennais 45% (32%–59%) | Draw | 1–1 | Boulaye Dia 26% |
| 2026-10-25 | it.1 | Atalanta BC v Frosinone Calcio | 63% / 20% / 17% | Atalanta BC 63% (48%–77%) ★ | Atalanta BC by 1 | 1–0 | Gianluca Scamacca 34% |
| 2026-10-25 | it.1 | Inter v ACF Fiorentina | 71% / 16% / 13% | Inter 71% (60%–82%) ★ | Inter by 3+ | 2–0 | Lautaro Martínez 38% |
| 2026-10-25 | it.1 | Genoa CFC v Venezia | 51% / 26% / 23% | Genoa CFC 51% (37%–66%) | Draw | 1–0 | – |
| 2026-10-25 | it.1 | Udinese Calcio v Milan | 26% / 24% / 50% | Milan 50% (38%–64%) | Draw | 0–1 | Alphadjo Cisse 34% |
| 2026-10-25 | it.1 | US Lecce v Juventus | 14% / 23% / 62% | Juventus 62% (51%–75%) ★ | Juventus by 1 | 0–1 | Nick Woltemade 31% |
| 2026-10-25 | nl.1 | AZ v Twente '65 | 46% / 22% / 32% | AZ 46% (34%–59%) | Draw | 1–1 | Wout Weghorst 30% |
| 2026-10-25 | nl.1 | Fortuna Sittard v SBV Excelsior | 40% / 23% / 37% | Fortuna Sittard 40% (27%–54%) | Draw | 1–1 | – |
| 2026-10-25 | nl.1 | NEC v Groningen | 54% / 21% / 26% | NEC 54% (40%–67%) | NEC by 1 | 2–1 | Tjaronn Chery 43% |
| 2026-10-25 | nl.1 | PSV v Feyenoord | 61% / 17% / 22% | PSV 61% (47%–74%) ★ | PSV by 3+ | 2–1 | Ivan Perišić 25% |
| 2026-10-25 | nl.1 | Sparta Rotterdam v Ajax | 23% / 20% / 57% | Ajax 57% (44%–71%) | Ajax by 1 | 1–2 | Tolu Arokodare 24% |
| 2026-10-25 | pt.1 | Nacional v Sporting Clube | 20% / 23% / 56% | Sporting Clube 56% (44%–70%) | Sporting Clube by 1 | 0–1 | Ricardo Horta 31% |
| 2026-10-25 | pt.1 | GD Estoril v Moreirense | 48% / 23% / 29% | GD Estoril 48% (35%–62%) | Draw | 1–1 | – |
| 2026-10-25 | pt.1 | Rio Ave v Famalicão | 26% / 26% / 48% | Famalicão 48% (36%–62%) | Draw | 0–1 | – |
| 2026-10-25 | pt.1 | Sporting v Académico de | 82% / 11% / 7% | Sporting 82% (67%–94%) ★ | Sporting by 3+ | 2–0 | Luis Suárez 54% |
| 2026-10-26 | pt.1 | Santa Clara v Sport Lisboa | 16% / 23% / 62% | Sport Lisboa 62% (49%–75%) ★ | Sport Lisboa by 1 | 0–1 | Jhon Durán 27% |
| 2026-10-27 | it.1 | Roma v Cagliari Calcio | 67% / 20% / 14% | Roma 67% (55%–78%) ★ | Roma by 1 | 1–0 | Donyell Malen 43% |
| 2026-10-27 | it.1 | Torino v Como | 23% / 23% / 54% | Como 54% (41%–69%) | Como by 1 | 0–1 | Tasos Douvikas 29% |
| 2026-10-27 | it.1 | US Sassuolo v SS Lazio | 30% / 24% / 46% | SS Lazio 46% (34%–61%) | Draw | 1–1 | – |
| 2026-10-28 | it.1 | Milan v Bologna | 49% / 25% / 27% | Milan 49% (37%–61%) | Draw | 1–0 | Alphadjo Cisse 32% |
| 2026-10-28 | it.1 | Monza v Napoli | 17% / 21% / 63% | Napoli 63% (48%–78%) ★ | Napoli by 1 | 0–1 | Rasmus Højlund 24% |
| 2026-10-28 | it.1 | Genoa CFC v Juventus | 20% / 25% / 55% | Juventus 55% (43%–69%) | Juventus by 1 | 0–1 | Nick Woltemade 29% |
| 2026-10-28 | it.1 | Parma Calcio v Udinese Calcio | 34% / 28% / 39% | Udinese Calcio 39% (28%–52%) | Draw | 0–1 | – |
| 2026-10-28 | it.1 | Venezia v Inter | 8% / 14% / 78% | Inter 78% (64%–90%) ★ | Inter by 3+ | 0–2 | Lautaro Martínez 40% |
| 2026-10-29 | it.1 | ACF Fiorentina v Atalanta BC | 28% / 24% / 48% | Atalanta BC 48% (36%–61%) | Draw | 0–1 | Gianluca Scamacca 27% |
| 2026-10-29 | it.1 | Frosinone Calcio v US Lecce | 52% / 24% / 24% | Frosinone Calcio 52% (37%–68%) | Frosinone Calcio by 1 | 1–0 | – |
| 2026-10-30 | de.1 | Elversberg v FSV Mainz | 39% / 22% / 39% | Elversberg 39% (20%–61%) | Draw | 1–1 | – |
| 2026-10-30 | fr.1 | Le Havre v PSG | 10% / 15% / 75% | PSG 75% (63%–86%) ★ | PSG by 3+ | 0–2 | Ousmane Dembélé 43% |
| 2026-10-30 | fr.1 | Lille v Lens | 43% / 26% / 31% | Lille 43% (32%–55%) | Draw | 1–0 | Olivier Giroud 18% |
| 2026-10-30 | pt.1 | Casa Pia v Sporting | 9% / 15% / 76% | Sporting 76% (65%–87%) ★ | Sporting by 3+ | 0–2 | Luis Suárez 47% |
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
