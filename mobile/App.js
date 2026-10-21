import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

/**
 * The model publishes one JSON file every 6 hours: committed to the repo, and also served by GitHub Pages.
 * The app tries each in turn, keeps the last good copy on the device, and shows it offline.
 */
const SOURCES = [
  'https://raw.githubusercontent.com/litedeskdigital-tech/Litedeskdigital/main/data/app.json',
  'https://litedeskdigital-tech.github.io/Litedeskdigital/data/app.json',
];
const POLL_MS = 10 * 60 * 1000;
const KEY_DATA = 'ucl:data';
const KEY_PREFS = 'ucl:prefs';
const TABS = [
  ['fixtures', 'Next 48 hours'],
  ['results', 'Last 24 hours'],
  ['model', 'Model'],
];

const pct = (p) => `${Math.round(p * 100)}%`;

function when(f) {
  if (f.kickoff) {
    return new Date(f.kickoff).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
  const day = new Date(`${f.date}T12:00:00Z`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  return f.localTime ? `${day}, ${f.localTime} local` : day;
}

function ago(iso) {
  const mins = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (mins < 60) return `${Math.max(0, mins)} min ago`;
  const h = Math.round(mins / 60);
  return h < 48 ? `${h} h ago` : new Date(iso).toLocaleDateString();
}

async function fetchLatest() {
  let lastError;
  for (const url of SOURCES) {
    try {
      const res = await fetch(`${url}?t=${Date.now()}`, { headers: { 'Cache-Control': 'no-cache' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json && Array.isArray(json.fixtures)) return json;
      throw new Error('unexpected data');
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error('no source');
}

function palette(dark) {
  return dark
    ? { bg: '#0b1020', card: '#141a2e', text: '#e5e7eb', muted: '#9aa3b5', line: '#26304a', accent: '#60a5fa', home: '#3b82f6', draw: '#6b7280', away: '#ef4444', good: '#4ade80', bad: '#f87171', star: '#fbbf24', cl: '#93c5fd' }
    : { bg: '#f4f6fb', card: '#ffffff', text: '#111827', muted: '#6b7280', line: '#e5e7eb', accent: '#1d4ed8', home: '#1d4ed8', draw: '#9ca3af', away: '#dc2626', good: '#15803d', bad: '#b91c1c', star: '#b45309', cl: '#0b1f4d' };
}

function Badge({ t }) {
  return (
    <View style={[styles.badge, { backgroundColor: t.color }]}>
      <Text style={[styles.badgeText, { color: t.markFg }]}>{t.abbr}</Text>
    </View>
  );
}

function ProbBar({ h, d, a, c }) {
  const seg = (p, color, key) => (
    <View key={key} style={{ flex: Math.max(p, 0.001), backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
      {p >= 0.12 ? <Text style={styles.barText}>{pct(p)}</Text> : null}
    </View>
  );
  return (
    <View style={styles.bar} accessibilityLabel={`Home ${pct(h)}, draw ${pct(d)}, away ${pct(a)}`}>
      {seg(h, c.home, 'h')}
      {seg(d, c.draw, 'd')}
      {seg(a, c.away, 'a')}
    </View>
  );
}

function Row({ label, value, c }) {
  return (
    <View style={[styles.kvRow, { borderColor: c.line }]}>
      <Text style={[styles.kvLabel, { color: c.muted }]}>{label}</Text>
      <Text style={[styles.kvValue, { color: c.text }]}>{value}</Text>
    </View>
  );
}

function Report({ f, c }) {
  const p = f.prediction;
  const s = p.scenarios;
  const fav = s.favourite.side === 'home' ? f.home.short : f.away.short;
  const sign = (x) => `${x >= 0 ? '+' : ''}${x.toFixed(2)}`;
  const blocks = ["0–15'", "15–30'", "30–45'", "45–60'", "60–75'", "75–90'"];
  return (
    <View style={[styles.report, { borderColor: c.line }]}>
      <Text style={[styles.body, { color: c.text }]}>{p.commentary}</Text>
      <Text style={[styles.h4, { color: c.text }]}>Ratings ({f.home.short} / {f.away.short})</Text>
      <Row c={c} label="Strength (goal diff / game)" value={`${sign(f.home.strength)} / ${sign(f.away.strength)}`} />
      <Row c={c} label="Attack" value={`${sign(f.home.attack)} / ${sign(f.away.attack)}`} />
      <Row c={c} label="Defence" value={`${sign(f.home.defence)} / ${sign(f.away.defence)}`} />
      <Row c={c} label="Matches rated" value={`${f.home.games} / ${f.away.games}`} />
      <Row c={c} label="Expected goals" value={`${p.xgHome.toFixed(2)} / ${p.xgAway.toFixed(2)}`} />
      <Text style={[styles.h4, { color: c.text }]}>Margins</Text>
      {p.margins.map((m) => (
        <View key={m.key} style={styles.barRow}>
          <Text style={[styles.barLabel, { color: c.text }]} numberOfLines={1}>{m.label}</Text>
          <View style={[styles.barTrack, { backgroundColor: c.line }]}>
            <View style={{ width: `${Math.round(m.p * 100)}%`, height: 8, borderRadius: 4, backgroundColor: c.accent }} />
          </View>
          <Text style={[styles.barValue, { color: c.text }]}>{pct(m.p)}</Text>
        </View>
      ))}
      <Text style={[styles.h4, { color: c.text }]}>Most likely scores</Text>
      <Text style={[styles.body, { color: c.text }]}>{p.topScores.map((x) => `${x.home}–${x.away} (${pct(x.p)})`).join('  ·  ')}</Text>
      <Text style={[styles.small, { color: c.muted }]}>
        Over 2.5 goals {pct(p.pOver25)} · Both teams score {pct(p.pBtts)}
        {p.pHomeAdvance !== undefined && p.pHomeAdvance !== null ? ` · ${f.home.short} go through ${pct(p.pHomeAdvance)}` : ''}
      </Text>
      <Text style={[styles.h4, { color: c.text }]}>Scenarios ({s.simulations.toLocaleString()} simulations)</Text>
      <Row c={c} label="Scores first" value={`${f.home.short} ${pct(s.firstGoal.home)} · none ${pct(s.firstGoal.none)} · ${f.away.short} ${pct(s.firstGoal.away)}`} />
      <Row c={c} label={`If ${f.home.short} score first`} value={`H ${pct(s.ifHomeScoresFirst.home)} · D ${pct(s.ifHomeScoresFirst.draw)} · A ${pct(s.ifHomeScoresFirst.away)}`} />
      <Row c={c} label={`If ${f.away.short} score first`} value={`H ${pct(s.ifAwayScoresFirst.home)} · D ${pct(s.ifAwayScoresFirst.draw)} · A ${pct(s.ifAwayScoresFirst.away)}`} />
      <Row
        c={c}
        label={`${fav} (favourite) risks`}
        value={`trails ${pct(s.favourite.trailsAtSomePoint)} · by 2 ${pct(s.favourite.trailsByTwo)} · drops a lead ${pct(s.favourite.dropsLead)} · wins after conceding first ${pct(s.favourite.winsIfConcedesFirst)}`}
      />
      <Row c={c} label="Half-time / full-time" value={s.htft.slice(0, 3).map((x) => `${x.key} ${pct(x.p)}`).join(' · ')} />
      <Row c={c} label="Late winner (level at 75')" value={pct(s.lateWinner)} />
      {s.goalInBlock.map((g, i) => (
        <View key={i} style={styles.barRow}>
          <Text style={[styles.barLabel, { color: c.text }]}>Goal {blocks[i]}</Text>
          <View style={[styles.barTrack, { backgroundColor: c.line }]}>
            <View style={{ width: `${Math.round(g * 100)}%`, height: 8, borderRadius: 4, backgroundColor: c.accent }} />
          </View>
          <Text style={[styles.barValue, { color: c.text }]}>{pct(g)}</Text>
        </View>
      ))}
      {p.anytimeScorers && p.anytimeScorers.length ? (
        <>
          <Text style={[styles.h4, { color: c.text }]}>Anytime scorers</Text>
          <Text style={[styles.body, { color: c.text }]}>{p.anytimeScorers.map((x) => `${x.name} ${pct(x.pAnytime)}`).join('  ·  ')}</Text>
        </>
      ) : null}
    </View>
  );
}

function FixtureCard({ f, open, onToggle, c }) {
  const p = f.prediction;
  const w = p.winner;
  const pick = w.side === 'home' ? f.home.short : f.away.short;
  let move = null;
  if (f.first) {
    const was = w.side === 'home' ? f.first.pHome : f.first.pAway;
    const delta = Math.round(((w.side === 'home' ? p.fullTime.home : p.fullTime.away) - was) * 100);
    move =
      Math.abs(delta) < 1 ? (
        <Text style={[styles.small, { color: c.muted }]}>unchanged since first call</Text>
      ) : (
        <Text style={[styles.small, { color: delta > 0 ? c.good : c.bad }]}>
          {delta > 0 ? '▲' : '▼'} {Math.abs(delta)} pts since first call
        </Text>
      );
  }
  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.line }, f.comp === 'cl' && { borderLeftColor: c.cl, borderLeftWidth: 4 }]}>
      <View style={styles.meta}>
        <Text style={[styles.comp, { color: c.accent }]}>{f.compName}</Text>
        <Text style={[styles.small, { color: c.muted }]}>{when(f)}</Text>
      </View>
      {[
        [f.home, p.pHomeCi],
        [f.away, p.pAwayCi],
      ].map(([t, ci]) => (
        <View key={t.id} style={styles.team}>
          <Badge t={t} />
          <Text style={[styles.teamName, { color: c.text }]} numberOfLines={1}>{t.short}</Text>
          <Text style={[styles.small, { color: c.muted }]}>win {pct(ci[0])}–{pct(ci[1])}</Text>
        </View>
      ))}
      <ProbBar h={p.fullTime.home} d={p.fullTime.draw} a={p.fullTime.away} c={c} />
      <View style={styles.pickRow}>
        <Text style={[styles.pick, { color: c.text }]}>
          {pick} {pct(w.pWin)}{' '}
          <Text style={[styles.small, { color: c.muted }]}>({pct(w.pWinCi[0])}–{pct(w.pWinCi[1])})</Text>
          {w.isHighProbability ? <Text style={[styles.star, { color: c.star }]}>  ★ High probability</Text> : null}
        </Text>
        <Text style={[styles.small, { color: c.muted }]}>{p.mostLikelyMargin.label} · {p.mostLikelyScore}</Text>
      </View>
      <View style={styles.pickRow}>
        {p.bonusScorer ? <Text style={[styles.small, { color: c.text }]}>⚽ {p.bonusScorer.name} {pct(p.bonusScorer.pAnytime)}</Text> : <View />}
        {move}
      </View>
      <Pressable onPress={onToggle} style={[styles.more, { borderColor: c.line }]} accessibilityRole="button" accessibilityState={{ expanded: open }}>
        <Text style={{ color: c.accent, fontWeight: '600' }}>{open ? 'Hide report' : 'Pre-match report'}</Text>
      </Pressable>
      {open ? <Report f={f} c={c} /> : null}
    </View>
  );
}

function ResultCard({ r, c }) {
  const call = r.call;
  const pick = call ? (call.pickTeamId === r.home.id ? r.home.short : r.away.short) : '';
  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.line }, r.comp === 'cl' && { borderLeftColor: c.cl, borderLeftWidth: 4 }]}>
      <View style={styles.meta}>
        <Text style={[styles.comp, { color: c.accent }]}>{r.compName}</Text>
        <Text style={[styles.small, { color: c.muted }]}>{when(r)}</Text>
      </View>
      <View style={styles.scoreRow}>
        <View style={[styles.team, { flex: 1 }]}>
          <Badge t={r.home} />
          <Text style={[styles.teamName, { color: c.text }]} numberOfLines={1}>{r.home.short}</Text>
        </View>
        <Text style={[styles.score, { color: c.text }]}>{r.score.home} – {r.score.away}</Text>
        <View style={[styles.team, { flex: 1, justifyContent: 'flex-end' }]}>
          <Text style={[styles.teamName, { color: c.text, textAlign: 'right' }]} numberOfLines={1}>{r.away.short}</Text>
          <Badge t={r.away} />
        </View>
      </View>
      {call ? (
        <>
          <ProbBar h={call.pHome} d={call.pDraw} a={call.pAway} c={c} />
          <Text style={{ color: call.hit ? c.good : c.bad, fontWeight: '700' }}>
            {call.hit ? '✓ Called' : '✗ Missed'}: picked {pick} {pct(call.pWin)}
          </Text>
          {call.miss ? <Text style={[styles.small, { color: c.muted }]}>{call.miss}</Text> : null}
        </>
      ) : (
        <Text style={[styles.small, { color: c.muted }]}>Not predicted before kick-off.</Text>
      )}
    </View>
  );
}

function Record({ title, r, c }) {
  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.line }]}>
      <Text style={[styles.h3, { color: c.text }]}>{title}</Text>
      {r.n ? (
        <>
          <Text style={[styles.big, { color: c.text }]}>{pct(r.accuracy)}</Text>
          <Text style={[styles.small, { color: c.muted }]}>results called · {r.n} games</Text>
          <Text style={[styles.body, { color: c.text }]}>Log loss {r.logLoss.toFixed(3)} (1.099 = guessing)</Text>
          <Text style={[styles.body, { color: c.text }]}>
            High-probability picks won {r.highProbN ? pct(r.highProbWon / r.highProbN) : '–'} ({r.highProbWon}/{r.highProbN})
          </Text>
          {r.latestN ? <Text style={[styles.body, { color: c.text }]}>Latest-call log loss {r.latestLogLoss.toFixed(3)} ({r.latestN} games)</Text> : null}
        </>
      ) : (
        <Text style={[styles.body, { color: c.muted }]}>No scored predictions yet.</Text>
      )}
    </View>
  );
}

function ModelTab({ d, c }) {
  return (
    <ScrollView contentContainerStyle={styles.list}>
      <Record title="Champions League" r={d.record.cl} c={c} />
      <Record title="All competitions" r={d.record.all} c={c} />
      {d.record.calibration.length ? (
        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.line }]}>
          <Text style={[styles.h3, { color: c.text }]}>Calibration</Text>
          {d.record.calibration.map((b) => (
            <Row key={b.band} c={c} label={b.band} value={`predicted ${pct(b.predicted)} · happened ${pct(b.happened)} · n ${b.n}`} />
          ))}
        </View>
      ) : null}
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.line }]}>
        <Text style={[styles.h3, { color: c.text }]}>Learning</Text>
        <Text style={[styles.body, { color: c.text }]}>
          Settings v{d.paramsVersion}{d.tunedAt ? `, tuned ${d.tunedAt}` : ''}. Ratings include results up to {d.ratingsAsOf}.
        </Text>
        {d.learning ? <Text style={[styles.small, { color: c.muted }]}>{d.learning.at}: {d.learning.kind}, {d.learning.reason}</Text> : null}
      </View>
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.line }]}>
        <Text style={[styles.h3, { color: c.text }]}>League strength</Text>
        {d.leagues.map((l) => (
          <View key={l.country} style={styles.barRow}>
            <Text style={[styles.barLabel, { color: c.text }]}>{l.country}</Text>
            <View style={[styles.barTrack, { backgroundColor: c.line }]}>
              <View style={{ width: `${Math.max(2, Math.min(100, Math.round((l.offset + 0.5) * 100)))}%`, height: 8, borderRadius: 4, backgroundColor: c.accent }} />
            </View>
            <Text style={[styles.barValue, { color: c.text }]}>{l.offset >= 0 ? '+' : ''}{l.offset.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <Text style={[styles.small, { color: c.muted, marginTop: 8 }]}>
        Probabilities are model estimates from open data (openfootball, UEFA). They are not betting advice.
      </Text>
    </ScrollView>
  );
}

function Main() {
  const dark = useColorScheme() === 'dark';
  const c = palette(dark);
  const [hydrated, setHydrated] = useState(false);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('fixtures');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const dataRef = useRef(null);

  // Load saved state before the first real paint; nothing is written back until this has finished.
  useEffect(() => {
    (async () => {
      try {
        const [savedData, savedPrefs] = await Promise.all([AsyncStorage.getItem(KEY_DATA), AsyncStorage.getItem(KEY_PREFS)]);
        if (savedData) {
          const d = JSON.parse(savedData);
          dataRef.current = d;
          setData(d);
        }
        if (savedPrefs) {
          const p = JSON.parse(savedPrefs);
          if (p.tab) setTab(p.tab);
          if (p.filter) setFilter(p.filter);
        }
      } catch {
        // Corrupt or missing storage: start clean.
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(KEY_PREFS, JSON.stringify({ tab, filter })).catch(() => {});
  }, [hydrated, tab, filter]);

  const refresh = useCallback(async () => {
    try {
      const next = await fetchLatest();
      setError(null);
      if (!dataRef.current || next.generatedAt !== dataRef.current.generatedAt) {
        dataRef.current = next;
        setData(next);
        AsyncStorage.setItem(KEY_DATA, JSON.stringify(next)).catch(() => {});
      }
    } catch (err) {
      setError(String(err?.message ?? err));
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    refresh();
    const timer = setInterval(refresh, POLL_MS);
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') refresh();
    });
    return () => {
      clearInterval(timer);
      sub.remove();
    };
  }, [hydrated, refresh]);

  const onPull = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const comps = useMemo(() => {
    if (!data) return [];
    const m = new Map();
    for (const x of [...data.fixtures, ...data.results]) m.set(x.comp, x.compName);
    return [...m].sort((a, b) => (a[0] === 'cl' ? -1 : b[0] === 'cl' ? 1 : a[1].localeCompare(b[1])));
  }, [data]);

  if (!hydrated) {
    return (
      <View style={[styles.center, { backgroundColor: c.bg }]}>
        <ActivityIndicator color={c.accent} />
      </View>
    );
  }

  const keep = (xs) => xs.filter((x) => filter === 'all' || x.comp === filter);
  const fixtures = data ? keep(data.fixtures) : [];
  const results = data ? keep(data.results) : [];
  const status = data
    ? `Updated ${ago(data.generatedAt)} · next refresh ~${new Date(data.nextRefresh).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}${error ? ' · offline, showing saved data' : ''}`
    : error
      ? `Could not load predictions (${error}). Pull to retry.`
      : 'Loading…';

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.bg }]} edges={['top', 'left', 'right']}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <View style={[styles.header, { backgroundColor: c.card, borderColor: c.line }]}>
        <Text style={[styles.title, { color: c.text }]}>UCL Match Model</Text>
        <Text style={[styles.small, { color: c.muted }]}>{status}</Text>
        <View style={styles.tabs}>
          {TABS.map(([key, label]) => (
            <Pressable key={key} onPress={() => setTab(key)} style={[styles.tab, tab === key && { borderBottomColor: c.accent }]} accessibilityRole="tab" accessibilityState={{ selected: tab === key }}>
              <Text style={{ color: tab === key ? c.accent : c.muted, fontWeight: '700' }}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      {tab !== 'model' && comps.length ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips} contentContainerStyle={styles.chipsInner}>
          {[['all', 'All'], ...comps].map(([code, name]) => (
            <Pressable key={code} onPress={() => setFilter(code)} style={[styles.chip, { borderColor: c.line, backgroundColor: filter === code ? c.accent : c.card }]}>
              <Text style={{ color: filter === code ? '#fff' : c.text, fontSize: 13 }}>{name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
      {tab === 'model' && data ? (
        <ModelTab d={data} c={c} />
      ) : (
        <FlatList
          data={tab === 'fixtures' ? fixtures : results}
          keyExtractor={(x) => x.id}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPull} tintColor={c.accent} />}
          renderItem={({ item }) =>
            tab === 'fixtures' ? (
              <FixtureCard f={item} c={c} open={!!open[item.id]} onToggle={() => setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))} />
            ) : (
              <ResultCard r={item} c={c} />
            )
          }
          ListEmptyComponent={
            <Text style={[styles.body, { color: c.muted, padding: 16 }]}>
              {data
                ? tab === 'fixtures'
                  ? 'No fixtures in the next 48 hours.'
                  : 'No results in the last 24 hours. Domestic results can arrive a day or two late from the open sources.'
                : ' '}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { paddingHorizontal: 16, paddingTop: 8, borderBottomWidth: 1 },
  title: { fontSize: 19, fontWeight: '800' },
  tabs: { flexDirection: 'row', marginTop: 6 },
  tab: { paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  chips: { flexGrow: 0 },
  chipsInner: { paddingHorizontal: 12, paddingVertical: 8, gap: 6 },
  chip: { borderWidth: 1, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 },
  list: { padding: 12, gap: 12, paddingBottom: 32 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 8 },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  comp: { fontWeight: '700', fontSize: 12 },
  team: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  teamName: { flexShrink: 1, flexGrow: 1, fontWeight: '600', fontSize: 15 },
  badge: { width: 36, height: 22, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 10, fontWeight: '800' },
  bar: { flexDirection: 'row', height: 22, borderRadius: 6, overflow: 'hidden' },
  barText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  pickRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4 },
  pick: { fontWeight: '700', fontSize: 14 },
  star: { fontWeight: '700', fontSize: 12 },
  small: { fontSize: 12 },
  body: { fontSize: 14, lineHeight: 20 },
  h3: { fontSize: 15, fontWeight: '700' },
  h4: { fontSize: 13, fontWeight: '700', marginTop: 10 },
  big: { fontSize: 30, fontWeight: '800' },
  more: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
  report: { borderTopWidth: 1, paddingTop: 8, gap: 4 },
  kvRow: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 4, gap: 8 },
  kvLabel: { flex: 2, fontSize: 12 },
  kvValue: { flex: 3, fontSize: 12 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barLabel: { width: 110, fontSize: 12 },
  barTrack: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  barValue: { width: 44, textAlign: 'right', fontSize: 12, fontWeight: '600' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  score: { fontSize: 22, fontWeight: '800' },
});
