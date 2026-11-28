# Model report

Generated 2026-11-28. Ratings include results up to 2026-11-26. Parameter set v3 (tuned 2026-10-21).

Sources: openfootball cl 2023-24, openfootball cl 2024-25, openfootball cl 2025-26, openfootball en.1 2023-24, openfootball es.1 2023-24, openfootball de.1 2023-24, openfootball it.1 2023-24, openfootball fr.1 2023-24, openfootball pt.1 2023-24, openfootball nl.1 2023-24, openfootball at.1 2023-24, openfootball en.1 2024-25, openfootball es.1 2024-25, openfootball de.1 2024-25, openfootball it.1 2024-25, openfootball fr.1 2024-25, openfootball pt.1 2024-25, openfootball nl.1 2024-25, openfootball at.1 2024-25, openfootball be.1 2024-25, openfootball tr.1 2024-25, openfootball sco.1 2024-25, openfootball gr.1 2024-25, openfootball en.1 2025-26, openfootball es.1 2025-26, openfootball de.1 2025-26, openfootball it.1 2025-26, openfootball fr.1 2025-26, openfootball pt.1 2025-26, openfootball nl.1 2025-26, openfootball at.1 2025-26, openfootball be.1 2025-26, openfootball tr.1 2025-26, openfootball sco.1 2025-26, openfootball gr.1 2025-26, openfootball en.1 2026-27, openfootball es.1 2026-27, openfootball de.1 2026-27, openfootball it.1 2026-27, openfootball fr.1 2026-27, openfootball pt.1 2026-27, openfootball nl.1 2026-27, 30 provisional hand-entered CL rows, UEFA matches: 816 rows, 1 clubs skipped (see data/uefa-import.json), UEFA player stats 2026-27: 2044 players from 107 clubs, 1 clubs unmapped (see data/uefa-teams.json).

## Live record (predictions frozen before kick-off)

- Scored predictions: 150; log loss 0.970 (1.099 = guessing); most-likely outcome right 59%
- High-probability picks: 57, won 63% (they average 73% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.966 over 150 games

Champions League only:

- Scored predictions: 45; log loss 0.860 (1.099 = guessing); most-likely outcome right 67%
- High-probability picks: 19, won 74% (they average 73% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.842 over 45 games

Europa League only:

- Scored predictions: 51; log loss 1.045 (1.099 = guessing); most-likely outcome right 55%
- High-probability picks: 18, won 50% (they average 70% predicted)
- Latest refreshed call (last update before kick-off): log loss 1.046 over 51 games

Conference League only:

- Scored predictions: 54; log loss 0.991 (1.099 = guessing); most-likely outcome right 56%
- High-probability picks: 20, won 65% (they average 75% predicted)
- Latest refreshed call (last update before kick-off): log loss 0.993 over 54 games

| Predicted band | Mean predicted | Happened | n |
|---|---|---|---|
| 0–20% | 14% | 20% | 137 |
| 20–40% | 27% | 23% | 175 |
| 40–60% | 50% | 58% | 74 |
| 60–80% | 68% | 58% | 52 |
| 80–100% | 85% | 75% | 12 |

## Walk-forward backtest (all history)

all 10087 matches log loss 0.980, accuracy 53%; Champions League 489 matches log loss 0.881, accuracy 61%

## Learning

- Last tuning check 2026-10-21: tuned — re-tune requested (new data sources)
- Settings: drift 0.00002/day, prior variance 0.1, Dixon–Coles ρ 0.04, newcomer offset 0.25, foreign prior -0.5, goal cap 6, competition half-life 1460 days

## Recent misses

- 2026-11-26 Viktoria Plzeň v Sport Lisboa (el): Close call: the pick Sport Lisboa had only 53%; 4-0 was priced at 23%. Ratings moved: Viktoria Plzeň attack +0.074, defence +0.039; Sport Lisboa attack -0.013, defence -0.042.
- 2026-11-26 Sunderland v Jagiellonia (el): Drawn 1-1; the model gave the draw 22% and leaned Sunderland (63%). Ratings moved: Sunderland attack -0.014, defence -0.006; Jagiellonia attack +0.007, defence +0.017.
- 2026-11-26 Royale Union v Lech Poznań (el): Drawn 2-2; the model gave the draw 13% and leaned Royale Union (78%). Ratings moved: Royale Union attack -0.013, defence -0.022; Lech Poznań attack +0.027, defence +0.017.
- 2026-11-26 Olympiakos SFP v Milan (el): Close call: the pick Olympiakos SFP had only 46%; 2-4 was priced at 28%. Ratings moved: Olympiakos SFP attack +0.011, defence -0.056; Milan attack +0.035, defence -0.009.
- 2026-11-26 Olympique Lyonnais v Lillestrøm (el): Drawn 0-0; the model gave the draw 14% and leaned Olympique Lyonnais (77%). Ratings moved: Olympique Lyonnais attack -0.023, defence +0.008; Lillestrøm attack -0.039, defence +0.138.
- 2026-11-26 NEC v Stade Rennais (el): Close call: the pick Stade Rennais had only 43%; 3-1 was priced at 35%. Ratings moved: NEC attack +0.016, defence +0.008; Stade Rennais attack -0.009, defence -0.019.
- 2026-11-26 Ferencváros v Celje (el): Drawn 0-0; the model gave the draw 13% and leaned Ferencváros (76%). Ratings moved: Ferencváros attack -0.049, defence +0.019; Celje attack -0.018, defence +0.044.
- 2026-11-26 Sparta Praha v AZ (el): Close call: the pick Sparta Praha had only 40%; 2-4 was priced at 37%. Ratings moved: Sparta Praha attack +0.012, defence -0.054; AZ attack +0.027, defence -0.006.
- 2026-11-26 Kauno Žalgiris v Riga (ecl): Close call: the pick Riga had only 45%; 2-0 was priced at 30%. Ratings moved: Kauno Žalgiris attack +0.041, defence +0.033; Riga attack -0.040, defence -0.027.
- 2026-11-26 KAA Gent v Crvena Zvezda (ecl): Drawn 1-1; the model gave the draw 24% and leaned KAA Gent (46%). Ratings moved: KAA Gent attack -0.008, defence +0.003; Crvena Zvezda attack -0.004, defence +0.010.
- 2026-11-26 Inter Escaldes v Copenhagen (ecl): Upset: Copenhagen were 74% to win (high-probability pick); Inter Escaldes won 2-0, an outcome priced at 12%. Ratings moved: Inter Escaldes attack +0.036, defence +0.067; Copenhagen attack -0.052, defence -0.032.
- 2026-11-26 Iberia Tbilisi v Getafe (ecl): Upset: Getafe were 69% to win (high-probability pick); Iberia Tbilisi won 1-0, an outcome priced at 10%. Ratings moved: Iberia Tbilisi attack +0.023, defence +0.047; Getafe attack -0.024, defence -0.007.

## Upcoming (next days)

| Date | Comp | Match | H / D / A | Pick | Margin | Score | Bonus scorer |
|---|---|---|---|---|---|---|---|
| 2026-12-08 | cl | AEK Athen v Galatasaray | 35% / 22% / 43% | Galatasaray 43% (27%–62%) | Draw | 1–1 | Victor Osimhen 27% |
| 2026-12-08 | cl | Roma v Sporting | 49% / 21% / 31% | Roma 49% (33%–64%) | Draw | 2–1 | Donyell Malen 33% |
| 2026-12-08 | cl | Villa v PSG | 39% / 21% / 40% | PSG 40% (26%–55%) | Draw | 1–1 | Ousmane Dembélé 27% |
| 2026-12-08 | cl | Barça v Man City | 51% / 18% / 31% | Barça 51% (34%–67%) | Barça by 1 | 2–1 | Anthony Gordon 38% |
| 2026-12-08 | cl | Bayern v Slavia | 92% / 5% / 3% | Bayern 92% (83%–98%) ★ | Bayern by 3+ | 4–0 | Harry Kane 59% |
| 2026-12-08 | cl | Man Utd v Leipzig | 60% / 18% / 22% | Man Utd 60% (45%–75%) | Man Utd by 3+ | 2–1 | Bruno Fernandes 38% |
| 2026-12-08 | cl | Napoli v Brugge | 44% / 21% / 36% | Napoli 44% (28%–60%) | Draw | 1–1 | Nicolò Tresoldi 35% |
| 2026-12-08 | cl | Viking v Feyenoord | 50% / 18% / 31% | Viking 50% (30%–73%) | Viking by 1 | 2–1 | Peter Christiansen 26% |
| 2026-12-08 | cl | Villarreal v Sabah | 81% / 10% / 9% | Villarreal 81% (65%–93%) ★ | Villarreal by 3+ | 3–1 | Tani Oluwaseyi 29% |
| 2026-11-28 | de.1 | Köln v Elversberg | 40% / 21% / 39% | Köln 40% (19%–63%) | Draw | 1–1 | – |
| 2026-11-28 | de.1 | FSV Mainz v Union Berlin | 57% / 22% / 21% | FSV Mainz 57% (44%–71%) | FSV Mainz by 1 | 1–0 | – |
| 2026-11-28 | de.1 | Hamburger v Bayern | 7% / 10% / 83% | Bayern 83% (71%–93%) ★ | Bayern by 3+ | 0–3 | Harry Kane 57% |
| 2026-11-28 | de.1 | Paderborn v Schalke | 42% / 26% / 32% | Paderborn 42% (19%–67%) | Draw | 1–0 | – |
| 2026-11-28 | de.1 | Stuttgart v Eintracht Frankfurt | 57% / 19% / 24% | Stuttgart 57% (43%–71%) | Stuttgart by 1 | 2–1 | Ermedin Demirović 34% |
| 2026-11-28 | en.1 | Arsenal v Man City | 51% / 25% / 24% | Arsenal 51% (39%–62%) | Draw | 1–0 | Viktor Gyökeres 32% |
| 2026-11-28 | en.1 | Brighton & v Newcastle United | 46% / 23% / 31% | Brighton & 46% (34%–59%) | Draw | 1–1 | Georginio Rutter 25% |
| 2026-11-28 | en.1 | Crystal Palace v Hull City | 44% / 26% / 30% | Crystal Palace 44% (26%–64%) | Draw | 1–0 | Jean-Philippe Mateta 21% |
| 2026-11-28 | en.1 | Everton v Liverpool | 28% / 26% / 46% | Liverpool 46% (35%–60%) | Draw | 0–1 | Dominik Szoboszlai 20% |
| 2026-11-28 | en.1 | Fulham v Bournemouth | 37% / 25% / 38% | Bournemouth 38% (27%–52%) | Draw | 1–1 | Álvaro Rodríguez 24% |
| 2026-11-28 | en.1 | Ipswich Town v Villa | 18% / 19% / 63% | Villa 63% (47%–79%) ★ | Villa by 1 | 0–1 | Nicolas Jackson 38% |
| 2026-11-28 | en.1 | Leeds United v Coventry City | 64% / 20% / 16% | Leeds United 64% (44%–83%) | Leeds United by 1 | 1–0 | – |
| 2026-11-28 | en.1 | Man Utd v Brentford | 44% / 23% / 33% | Man Utd 44% (31%–57%) | Draw | 1–1 | Bruno Fernandes 33% |
| 2026-11-28 | en.1 | Nottingham Forest v Chelsea | 39% / 24% / 38% | Nottingham Forest 39% (27%–51%) | Draw | 1–1 | – |
| 2026-11-28 | en.1 | Sunderland v Tottenham Hotspur | 35% / 26% / 39% | Tottenham Hotspur 39% (27%–54%) | Draw | 1–1 | Timur Tutierov 16% |
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
| 2026-11-29 | de.1 | Dortmund v Bayer Leverkusen | 46% / 23% / 32% | Dortmund 46% (34%–59%) | Draw | 1–1 | Serhou Guirassy 36% |
| 2026-11-29 | de.1 | Freiburg v Leipzig | 39% / 22% / 39% | Freiburg 39% (27%–53%) | Draw | 1–1 | Vincenzo Grifo 29% |
| 2026-11-29 | de.1 | Hoffenheim v Augsburg | 52% / 20% / 28% | Hoffenheim 52% (38%–67%) | Hoffenheim by 1 | 2–1 | Adam Hložek 27% |
| 2026-11-29 | es.1 | Elche v Atlético | 23% / 21% / 56% | Atlético 56% (42%–71%) | Atlético by 1 | 1–2 | Julián Alvarez 42% |
| 2026-11-29 | es.1 | Levante v Real Racing | 62% / 17% / 21% | Levante 62% (38%–83%) | Levante by 3+ | 2–1 | – |
| 2026-11-29 | es.1 | Málaga v Athletic Club | 22% / 26% / 53% | Athletic Club 53% (34%–72%) | Draw | 0–1 | – |
| 2026-11-29 | es.1 | Celta de v Villarreal | 43% / 22% / 35% | Celta de 43% (31%–56%) | Draw | 1–1 | Tani Oluwaseyi 22% |
| 2026-11-29 | es.1 | Deportivo La v Barça | 13% / 15% / 72% | Barça 72% (51%–90%) ★ | Barça by 3+ | 1–2 | Anthony Gordon 49% |
| 2026-11-29 | es.1 | Espanyol de v Getafe | 45% / 29% / 27% | Espanyol de 45% (33%–57%) | Draw | 1–0 | Borja Mayoral 14% |
| 2026-11-29 | es.1 | Betis v Rayo Vallecano | 54% / 24% / 22% | Betis 54% (42%–66%) | Betis by 1 | 1–0 | Abde Ezzalzouli 22% |
| 2026-11-29 | es.1 | Real Madrid v Deportivo Alavés | 77% / 14% / 9% | Real Madrid 77% (66%–87%) ★ | Real Madrid by 3+ | 2–0 | Kylian Mbappé 63% |
| 2026-11-29 | es.1 | Real Sociedad v Sevilla | 53% / 22% / 25% | Real Sociedad 53% (40%–66%) | Real Sociedad by 1 | 1–1 | Sergio Gómez 24% |
| 2026-11-29 | es.1 | Valencia v CA Osasuna | 45% / 25% / 30% | Valencia 45% (32%–58%) | Draw | 1–0 | – |
| 2026-11-29 | fr.1 | AJ Auxerre v Olympique de | 31% / 23% / 46% | Olympique de 46% (33%–60%) | Draw | 1–1 | Amine Gouiri 29% |
| 2026-11-29 | fr.1 | Olympique Lyonnais v Monaco | 43% / 22% / 35% | Olympique Lyonnais 43% (31%–56%) | Draw | 1–1 | Folarin Balogun 26% |
| 2026-11-29 | fr.1 | Toulouse v Stade Rennais | 41% / 23% / 36% | Toulouse 41% (28%–55%) | Draw | 1–1 | Boulaye Dia 22% |
| 2026-11-29 | it.1 | Roma v Monza | 78% / 14% / 8% | Roma 78% (66%–89%) ★ | Roma by 3+ | 2–0 | Donyell Malen 48% |
| 2026-11-29 | it.1 | Cagliari Calcio v Milan | 25% / 24% / 51% | Milan 51% (39%–65%) | Milan by 1 | 0–1 | Alphadjo Cisse 33% |
| 2026-11-29 | it.1 | Como v Juventus | 39% / 25% / 36% | Como 39% (28%–52%) | Draw | 1–1 | Tasos Douvikas 27% |
| 2026-11-29 | it.1 | Inter v Genoa CFC | 75% / 15% / 9% | Inter 75% (64%–86%) ★ | Inter by 3+ | 2–0 | Lautaro Martínez 31% |
| 2026-11-29 | it.1 | Frosinone Calcio v Parma Calcio | 47% / 25% / 28% | Frosinone Calcio 47% (32%–64%) | Draw | 1–0 | – |
| 2026-11-29 | it.1 | Torino v SS Lazio | 29% / 27% / 45% | SS Lazio 45% (33%–59%) | Draw | 0–1 | – |
| 2026-11-29 | it.1 | Udinese Calcio v ACF Fiorentina | 38% / 25% / 38% | Udinese Calcio 38% (26%–51%) | Draw | 1–1 | – |
| 2026-11-29 | it.1 | US Lecce v Atalanta BC | 17% / 24% / 59% | Atalanta BC 59% (48%–72%) | Atalanta BC by 1 | 0–1 | Gianluca Scamacca 22% |
| 2026-11-29 | it.1 | US Sassuolo v Napoli | 26% / 23% / 51% | Napoli 51% (38%–66%) | Napoli by 1 | 1–1 | Scott McTominay 26% |
| 2026-11-29 | it.1 | Venezia v Bologna | 21% / 25% / 55% | Bologna 55% (40%–71%) | Bologna by 1 | 0–1 | – |
| 2026-11-29 | nl.1 | ADO Den v Utrecht | 22% / 19% / 59% | Utrecht 59% (38%–80%) | Utrecht by 1 | 1–2 | – |
| 2026-11-29 | nl.1 | Feyenoord v Ajax | 49% / 20% / 31% | Feyenoord 49% (36%–63%) | Feyenoord by 1 | 2–1 | Tolu Arokodare 23% |
| 2026-11-29 | nl.1 | Fortuna Sittard v Heerenveen | 37% / 23% / 41% | Heerenveen 41% (28%–56%) | Draw | 1–1 | – |
| 2026-11-29 | nl.1 | NEC v Twente '65 | 41% / 21% / 38% | NEC 41% (28%–54%) | Draw | 1–1 | Bryan Linssen 36% |
| 2026-11-29 | nl.1 | PEC Zwolle v AZ | 20% / 19% / 61% | AZ 61% (48%–75%) ★ | AZ by 1 | 1–2 | Mexx Meerdink 37% |
| 2026-11-29 | pt.1 | Porto v Sporting | 39% / 26% / 35% | Porto 39% (28%–51%) | Draw | 1–1 | Luis Suárez 28% |
| 2026-11-29 | pt.1 | Gil Vicente v GD Estoril | 46% / 24% / 30% | Gil Vicente 46% (33%–59%) | Draw | 1–1 | – |
| 2026-11-30 | pt.1 | Casa Pia v Sporting Clube | 18% / 23% / 59% | Sporting Clube 59% (47%–72%) | Sporting Clube by 1 | 0–1 | Pau Víctor 24% |
| 2026-11-30 | pt.1 | Sport Lisboa v Famalicão | 66% / 20% / 14% | Sport Lisboa 66% (54%–77%) ★ | Sport Lisboa by 1 | 1–0 | Jhon Durán 29% |
| 2026-12-02 | en.1 | Bournemouth v Brighton & | 40% / 24% / 36% | Bournemouth 40% (28%–52%) | Draw | 1–1 | Álvaro Rodríguez 26% |
| 2026-12-02 | en.1 | Villa v Everton | 49% / 26% / 25% | Villa 49% (37%–61%) | Draw | 1–0 | Nicolas Jackson 28% |
| 2026-12-02 | en.1 | Brentford v Arsenal | 21% / 25% / 54% | Arsenal 54% (42%–67%) | Arsenal by 1 | 0–1 | Viktor Gyökeres 32% |
| 2026-12-02 | en.1 | Chelsea v Crystal Palace | 54% / 22% / 25% | Chelsea 54% (41%–66%) | Chelsea by 1 | 1–1 | Jean-Philippe Mateta 18% |
| 2026-12-02 | en.1 | Coventry City v Ipswich Town | 40% / 25% / 36% | Coventry City 40% (21%–63%) | Draw | 1–1 | – |
| 2026-12-02 | en.1 | Hull City v Nottingham Forest | 35% / 27% / 39% | Nottingham Forest 39% (21%–61%) | Draw | 0–1 | – |
| 2026-12-02 | en.1 | Liverpool v Sunderland | 65% / 20% / 15% | Liverpool 65% (52%–77%) ★ | Liverpool by 1 | 1–0 | Dominik Szoboszlai 27% |
| 2026-12-02 | en.1 | Man City v Leeds United | 65% / 19% / 17% | Man City 65% (51%–77%) ★ | Man City by 1 | 2–0 | Erling Haaland 43% |
| 2026-12-02 | en.1 | Newcastle United v Man Utd | 46% / 22% / 32% | Newcastle United 46% (33%–60%) | Draw | 1–1 | Bruno Fernandes 30% |
| 2026-12-02 | en.1 | Tottenham Hotspur v Fulham | 43% / 24% / 32% | Tottenham Hotspur 43% (31%–56%) | Draw | 1–1 | – |
| 2026-12-04 | nl.1 | Telstar v Groningen | 38% / 24% / 38% | Groningen 38% (25%–54%) | Draw | 1–1 | – |
| 2026-12-05 | de.1 | Union Berlin v Hamburger | 45% / 24% / 31% | Union Berlin 45% (30%–60%) | Draw | 1–1 | – |
| 2026-12-05 | de.1 | Bayer Leverkusen v Borussia Mönchengladbach | 73% / 15% / 12% | Bayer Leverkusen 73% (61%–84%) ★ | Bayer Leverkusen by 3+ | 2–0 | Patrik Schick 44% |
| 2026-12-05 | de.1 | Eintracht Frankfurt v Werder Bremen | 55% / 20% / 26% | Eintracht Frankfurt 55% (40%–69%) | Eintracht Frankfurt by 1 | 2–1 | – |
| 2026-12-05 | de.1 | Augsburg v Köln | 52% / 22% / 27% | Augsburg 52% (37%–66%) | Augsburg by 1 | 1–1 | – |
| 2026-12-05 | de.1 | Bayern v Paderborn | 89% / 7% / 4% | Bayern 89% (76%–98%) ★ | Bayern by 3+ | 3–0 | Harry Kane 61% |
| 2026-12-05 | de.1 | Schalke v Dortmund | 17% / 20% / 63% | Dortmund 63% (42%–83%) | Dortmund by 1 | 0–1 | Serhou Guirassy 41% |
| 2026-12-05 | de.1 | Leipzig v FSV Mainz | 54% / 21% / 25% | Leipzig 54% (40%–67%) | Leipzig by 1 | 1–1 | Antonio Nusa 29% |
| 2026-12-05 | de.1 | Freiburg v Hoffenheim | 51% / 20% / 30% | Freiburg 51% (37%–65%) | Freiburg by 1 | 2–1 | Vincenzo Grifo 36% |
| 2026-12-05 | de.1 | Elversberg v Stuttgart | 31% / 20% / 49% | Stuttgart 49% (27%–75%) | Stuttgart by 1 | 1–2 | Ermedin Demirović 30% |
| 2026-12-05 | en.1 | Bournemouth v Hull City | 54% / 23% / 23% | Bournemouth 54% (34%–74%) | Bournemouth by 1 | 1–0 | Álvaro Rodríguez 29% |
| 2026-12-05 | en.1 | Villa v Crystal Palace | 55% / 23% / 22% | Villa 55% (43%–67%) | Villa by 1 | 1–0 | Nicolas Jackson 33% |
| 2026-12-05 | en.1 | Brentford v Man City | 29% / 22% / 49% | Man City 49% (36%–63%) | Draw | 1–1 | Erling Haaland 37% |
| 2026-12-05 | en.1 | Chelsea v Liverpool | 34% / 22% / 44% | Liverpool 44% (31%–58%) | Draw | 1–1 | Dominik Szoboszlai 24% |
| 2026-12-05 | en.1 | Everton v Fulham | 41% / 28% / 31% | Everton 41% (30%–54%) | Draw | 1–0 | – |
| 2026-12-05 | en.1 | Leeds United v Ipswich Town | 64% / 19% / 17% | Leeds United 64% (48%–80%) ★ | Leeds United by 1 | 1–0 | – |
| 2026-12-05 | en.1 | Man Utd v Coventry City | 71% / 17% / 12% | Man Utd 71% (52%–88%) ★ | Man Utd by 3+ | 2–0 | Bruno Fernandes 44% |
| 2026-12-05 | en.1 | Newcastle United v Sunderland | 57% / 22% / 21% | Newcastle United 57% (44%–71%) | Newcastle United by 1 | 1–0 | Timur Tutierov 13% |
| 2026-12-05 | en.1 | Nottingham Forest v Brighton & | 35% / 26% / 40% | Brighton & 40% (29%–53%) | Draw | 1–1 | Georginio Rutter 20% |
| 2026-12-05 | en.1 | Tottenham Hotspur v Arsenal | 18% / 23% / 60% | Arsenal 60% (48%–72%) | Arsenal by 1 | 0–1 | Viktor Gyökeres 35% |
| 2026-12-05 | fr.1 | Monaco v Angers SCO | 68% / 19% / 13% | Monaco 68% (56%–80%) ★ | Monaco by 1 | 1–0 | Folarin Balogun 34% |
| 2026-12-05 | fr.1 | ES Troyes v Olympique Lyonnais | 16% / 18% / 67% | Olympique Lyonnais 67% (45%–86%) | Olympique Lyonnais by 3+ | 0–2 | Corentin Tolisso 30% |
| 2026-12-05 | fr.1 | Lille v AJ Auxerre | 57% / 23% / 19% | Lille 57% (45%–70%) | Lille by 1 | 1–0 | Ayase Ueda 22% |
| 2026-12-05 | fr.1 | Olympique de v OGC Nice | 59% / 21% / 20% | Olympique de 59% (46%–72%) | Olympique de by 1 | 1–0 | Amine Gouiri 34% |
| 2026-12-05 | fr.1 | Paris v Le Mans | 56% / 20% / 24% | Paris 56% (34%–78%) | Paris by 1 | 1–1 | – |
| 2026-12-05 | fr.1 | Lens v Le Havre | 59% / 22% / 19% | Lens 59% (46%–72%) | Lens by 1 | 1–0 | Florian Thauvin 19% |
| 2026-12-05 | fr.1 | Strasbourg Alsace v Lorient | 54% / 21% / 25% | Strasbourg Alsace 54% (40%–69%) | Strasbourg Alsace by 1 | 2–1 | – |
| 2026-12-05 | fr.1 | Stade Rennais v Stade Brestois | 52% / 21% / 27% | Stade Rennais 52% (38%–66%) | Stade Rennais by 1 | 1–1 | Boulaye Dia 28% |
| 2026-12-05 | fr.1 | Toulouse v PSG | 15% / 17% / 68% | PSG 68% (55%–81%) ★ | PSG by 3+ | 0–2 | Ousmane Dembélé 36% |
| 2026-12-05 | nl.1 | AZ v PSV | 29% / 19% / 51% | PSV 51% (38%–66%) | PSV by 1 | 1–2 | Mexx Meerdink 29% |
| 2026-12-05 | nl.1 | Fortuna Sittard v PEC Zwolle | 51% / 22% / 28% | Fortuna Sittard 51% (37%–65%) | Fortuna Sittard by 1 | 1–1 | – |
| 2026-12-05 | nl.1 | Sparta Rotterdam v NEC | 30% / 21% / 49% | NEC 49% (35%–64%) | Draw | 1–1 | Bryan Linssen 38% |
| 2026-12-05 | nl.1 | Willem II v Feyenoord | 12% / 15% / 73% | Feyenoord 73% (58%–87%) ★ | Feyenoord by 3+ | 0–2 | Anis Hadj Moussa 27% |
| 2026-12-06 | es.1 | Athletic Club v Real Madrid | 24% / 23% / 53% | Real Madrid 53% (41%–67%) | Real Madrid by 1 | 0–1 | Kylian Mbappé 49% |
| 2026-12-06 | es.1 | CA Osasuna v Elche | 49% / 22% / 29% | CA Osasuna 49% (34%–64%) | Draw | 1–1 | – |
| 2026-12-06 | es.1 | Atlético v Betis | 59% / 21% / 20% | Atlético 59% (47%–70%) | Atlético by 1 | 1–0 | Julián Alvarez 41% |
| 2026-12-06 | es.1 | Deportivo Alavés v Espanyol de | 48% / 26% / 27% | Deportivo Alavés 48% (35%–61%) | Draw | 1–0 | – |
| 2026-12-06 | es.1 | Barça v Celta de | 80% / 11% / 8% | Barça 80% (70%–90%) ★ | Barça by 3+ | 3–0 | Anthony Gordon 54% |
| 2026-12-06 | es.1 | Getafe v Valencia | 40% / 30% / 30% | Getafe 40% (30%–51%) | Draw | 1–0 | Borja Mayoral 18% |
| 2026-12-06 | es.1 | Rayo Vallecano v Levante | 51% / 24% / 25% | Rayo Vallecano 51% (37%–66%) | Rayo Vallecano by 1 | 1–0 | – |
| 2026-12-06 | es.1 | Real Racing v Deportivo La | 40% / 20% / 40% | Deportivo La 40% (17%–70%) | Draw | 1–1 | – |
| 2026-12-06 | es.1 | Sevilla v Málaga | 62% / 22% / 16% | Sevilla 62% (44%–80%) | Sevilla by 1 | 1–0 | – |
| 2026-12-06 | es.1 | Villarreal v Real Sociedad | 54% / 20% / 26% | Villarreal 54% (41%–68%) | Villarreal by 1 | 2–1 | Tani Oluwaseyi 28% |
| 2026-12-06 | it.1 | Milan v Parma Calcio | 63% / 22% / 16% | Milan 63% (51%–75%) ★ | Milan by 1 | 1–0 | Alphadjo Cisse 36% |
| 2026-12-06 | it.1 | Monza v Como | 13% / 17% / 70% | Como 70% (55%–84%) ★ | Como by 3+ | 0–2 | Tasos Douvikas 42% |
| 2026-12-06 | it.1 | ACF Fiorentina v Cagliari Calcio | 48% / 24% / 28% | ACF Fiorentina 48% (35%–60%) | Draw | 1–0 | – |
| 2026-12-06 | it.1 | Bologna v Roma | 27% / 25% / 48% | Roma 48% (36%–62%) | Draw | 0–1 | Donyell Malen 31% |
| 2026-12-06 | it.1 | Frosinone Calcio v Inter | 14% / 16% / 70% | Inter 70% (53%–86%) ★ | Inter by 3+ | 0–2 | Lautaro Martínez 31% |
| 2026-12-06 | it.1 | Genoa CFC v Torino | 39% / 27% / 34% | Genoa CFC 39% (27%–52%) | Draw | 1–0 | – |
| 2026-12-06 | it.1 | Juventus v Udinese Calcio | 64% / 21% / 16% | Juventus 64% (51%–76%) ★ | Juventus by 1 | 1–0 | Nick Woltemade 30% |
| 2026-12-06 | it.1 | SS Lazio v Atalanta BC | 35% / 27% / 38% | Atalanta BC 38% (27%–51%) | Draw | 0–1 | Gianluca Scamacca 17% |
| 2026-12-06 | it.1 | Napoli v US Lecce | 66% / 21% / 13% | Napoli 66% (54%–78%) ★ | Napoli by 1 | 1–0 | Scott McTominay 27% |
| 2026-12-06 | it.1 | Venezia v US Sassuolo | 28% / 24% / 48% | US Sassuolo 48% (32%–66%) | Draw | 0–1 | – |
| 2026-12-06 | nl.1 | ADO Den v SBV Excelsior | 27% / 21% / 52% | SBV Excelsior 52% (32%–75%) | SBV Excelsior by 1 | 1–1 | – |
| 2026-12-06 | nl.1 | Ajax v Utrecht | 64% / 17% / 19% | Ajax 64% (51%–77%) ★ | Ajax by 3+ | 2–1 | Tolu Arokodare 33% |
| 2026-12-06 | nl.1 | Go Ahead v Twente '65 | 34% / 22% / 44% | Twente '65 44% (31%–58%) | Draw | 1–1 | Wout Weghorst 31% |
| 2026-12-06 | nl.1 | Heerenveen v Cambuur-Leeuwarden | 71% / 14% / 14% | Heerenveen 71% (50%–88%) ★ | Heerenveen by 3+ | 2–1 | – |
| 2026-12-06 | pt.1 | Nacional v Sport Lisboa | 11% / 16% / 73% | Sport Lisboa 73% (61%–85%) ★ | Sport Lisboa by 3+ | 0–2 | Jhon Durán 34% |
| 2026-12-06 | pt.1 | Santa Clara v Porto | 18% / 27% / 55% | Porto 55% (43%–68%) | Porto by 1 | 0–1 | Samu 22% |
| 2026-12-06 | pt.1 | Estrela da v Gil Vicente | 34% / 26% / 40% | Gil Vicente 40% (29%–55%) | Draw | 1–1 | – |
| 2026-12-06 | pt.1 | Alverca v Moreirense | 40% / 26% / 34% | Alverca 40% (27%–55%) | Draw | 1–1 | – |
| 2026-12-06 | pt.1 | Famalicão v Académico de | 55% / 24% / 21% | Famalicão 55% (36%–74%) | Famalicão by 1 | 1–0 | – |
| 2026-12-06 | pt.1 | GD Estoril v Vitória Guimarães | 40% / 24% / 36% | GD Estoril 40% (28%–54%) | Draw | 1–1 | – |
| 2026-12-06 | pt.1 | Rio Ave v Casa Pia | 43% / 26% / 31% | Rio Ave 43% (31%–56%) | Draw | 1–0 | – |
| 2026-12-06 | pt.1 | Sporting Clube v Arouca | 63% / 20% / 17% | Sporting Clube 63% (51%–75%) ★ | Sporting Clube by 1 | 1–0 | Pau Víctor 28% |
| 2026-12-06 | pt.1 | Sporting v CS Marítimo | 88% / 8% / 4% | Sporting 88% (75%–97%) ★ | Sporting by 3+ | 3–0 | Luis Suárez 61% |

### UEFA club-competition scenarios (5,000 minute-by-minute simulations each)

| Match | First goal H / none / A | Favourite wins after conceding first | Favourite trails / trails by 2 | Favourite drops a lead | Likeliest HT/FT | Late winner (level at 75') | Goal in each 15' block |
|---|---|---|---|---|---|---|---|
| AEK Athen v Galatasaray | 46% / 4% / 50% | Galatasaray: 18% | 54% / 24% | 18% | A/A 26%, H/H 20% | 11% | 37% 40% 41% 41% 45% 50% |
| Roma v Sporting | 54% / 3% / 43% | Roma: 20% | 52% / 21% | 18% | H/H 29%, A/A 18% | 12% | 39% 42% 43% 44% 48% 52% |
| Villa v PSG | 48% / 3% / 49% | PSG: 16% | 58% / 28% | 20% | A/A 24%, H/H 23% | 12% | 39% 42% 43% 43% 48% 52% |
| Barça v Man City | 55% / 1% / 44% | Barça: 26% | 56% / 27% | 22% | H/H 30%, A/A 19% | 12% | 47% 50% 52% 52% 57% 61% |
| Bayern v Slavia | 85% / 1% / 14% | Bayern: 69% | 16% / 3% | 4% | H/H 75%, D/H 14% | 5% | 51% 54% 55% 56% 61% 65% |
| Man Utd v Leipzig | 61% / 3% / 36% | Man Utd: 29% | 44% / 15% | 16% | H/H 38%, D/H 16% | 11% | 41% 44% 45% 45% 50% 54% |
| Napoli v Brugge | 51% / 3% / 46% | Napoli: 18% | 56% / 25% | 19% | H/H 26%, A/A 21% | 12% | 39% 43% 43% 44% 48% 52% |
| Viking v Feyenoord | 55% / 2% / 43% | Viking: 26% | 55% / 25% | 20% | H/H 31%, A/A 19% | 12% | 45% 48% 49% 50% 55% 59% |
| Villarreal v Sabah | 75% / 1% / 24% | Villarreal: 54% | 30% / 8% | 10% | H/H 61%, D/H 15% | 8% | 50% 53% 54% 55% 60% 65% |

★ = high-probability pick (≥60% and the low end of its range ≥45%).

## League offsets (shared by every club from the country in cross-border games)

| Country | Offset | ± |
|---|---|---|
| ENG | +0.49 | 0.05 |
| ESP | +0.32 | 0.05 |
| GER | +0.28 | 0.05 |
| ITA | +0.24 | 0.05 |
| FRA | +0.24 | 0.05 |
| BEL | +0.19 | 0.06 |
| TUR | +0.10 | 0.06 |
| DEN | +0.08 | 0.06 |
| GRE | +0.08 | 0.06 |
| POR | +0.06 | 0.06 |
| NOR | +0.04 | 0.06 |
| NED | +0.01 | 0.05 |

## Strongest clubs (expected goal difference per game vs a zero-rated side)

| Club | Strength | ± |
|---|---|---|
| FC Barcelona | +3.21 | 0.11 |
| FC Bayern München | +3.20 | 0.12 |
| Manchester City FC | +2.65 | 0.12 |
| Real Madrid CF | +2.63 | 0.12 |
| Paris Saint-Germain FC | +2.62 | 0.12 |
| Arsenal FC | +2.49 | 0.12 |
| Liverpool FC | +2.34 | 0.12 |
| FC Internazionale Milano | +2.29 | 0.12 |
| Newcastle United FC | +1.91 | 0.12 |
| Chelsea FC | +1.89 | 0.12 |
| Club Atlético de Madrid | +1.86 | 0.12 |
| Aston Villa FC | +1.85 | 0.12 |
| Brighton & Hove Albion FC | +1.85 | 0.12 |
| Sporting Clube de Portugal | +1.83 | 0.12 |
| Manchester United FC | +1.80 | 0.12 |
| Borussia Dortmund | +1.79 | 0.12 |
| Sport Lisboa e Benfica | +1.74 | 0.12 |
| Brentford FC | +1.72 | 0.12 |
| AS Roma | +1.70 | 0.12 |
| Bayer 04 Leverkusen | +1.70 | 0.12 |
