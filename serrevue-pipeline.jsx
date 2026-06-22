// Pipeline centerpiece: plain-language nodes, clickable, hover highlights.

const NODES = {
  // Inputs — "What the greenhouse tells us"
  climate: { col: 'in', icon: 'climate', title_en: 'Air & climate',        title_fr: 'Air & climat',        meta_en: 'temperature, humidity, CO₂',     meta_fr: 'température, humidité, CO₂',     tip_en: 'Tracks how the air feels in every zone.',           tip_fr: 'Suit comment l\'air se comporte dans chaque zone.' },
  soil:    { col: 'in', icon: 'soil',    title_en: 'Root zone',            title_fr: 'Zone racinaire',       meta_en: 'moisture, fertility, acidity',   meta_fr: 'humidité, fertilité, acidité',   tip_en: 'Knows when plants are thirsty or hungry.',          tip_fr: 'Sait quand les plants ont soif ou faim.' },
  camera:  { col: 'in', icon: 'camera',  title_en: 'Eyes in the greenhouse', title_fr: 'Yeux dans la serre', meta_en: 'cameras & scouting robot',       meta_fr: 'caméras & robot de dépistage',   tip_en: 'Spots pests and disease before you do.',            tip_fr: 'Repère ravageurs et maladies avant vous.' },
  notes:   { col: 'in', icon: 'note',    title_en: 'Your notes',           title_fr: 'Vos notes',            meta_en: 'tasks & observations',           meta_fr: 'tâches & observations',          tip_en: 'What your team sees and writes down.',              tip_fr: 'Ce que votre équipe observe et note.' },
  // Brain — "What SERREVUE does with it"
  ingest:  { col: 'br', icon: 'ingest',  title_en: 'Listens',              title_fr: 'Écoute',               meta_en: 'gathers everything, 24/7',       meta_fr: 'tout rassembler, 24/7',          tip_en: 'Pulls every reading together in real time.',        tip_fr: 'Rassemble toutes les lectures en temps réel.' },
  ai:      { col: 'br', icon: 'ai',      title_en: 'Thinks',               title_fr: 'Réfléchit',            meta_en: 'explains what\'s going on',      meta_fr: 'explique ce qui se passe',       tip_en: 'Plain-English answers about your greenhouse.',      tip_fr: 'Des réponses claires sur votre serre.' },
  risk:    { col: 'br', icon: 'risk',    title_en: 'Watches for trouble',  title_fr: 'Détecte les problèmes', meta_en: 'disease, drift, failures',      meta_fr: 'maladies, dérives, pannes',      tip_en: 'Flags pest risk, leaks, sick plants early.',        tip_fr: 'Signale ravageurs, fuites et plants malades tôt.' },
  policy:  { col: 'br', icon: 'policy',  title_en: 'Your rules',           title_fr: 'Vos règles',           meta_en: 'what it can do on its own',      meta_fr: 'ce qu\'elle peut faire seule',   tip_en: 'You decide what SERREVUE can act on alone.',        tip_fr: 'Vous décidez ce qu\'elle peut faire seule.' },
  // Actions — "What actually happens in the greenhouse"
  pump:    { col: 'ac', icon: 'pump',    title_en: 'Watering',             title_fr: 'Arrosage',             meta_en: 'pumps & drip lines',             meta_fr: 'pompes & goutte-à-goutte',       tip_en: 'Waters each zone only when needed.',                tip_fr: 'Arrose chaque zone seulement au besoin.' },
  valve:   { col: 'ac', icon: 'valve',   title_en: 'Feeding',              title_fr: 'Nutrition',            meta_en: 'fertilizer valves & mixing',     meta_fr: 'vannes d\'engrais & mélange',    tip_en: 'Adjusts the food mix to match the crop.',           tip_fr: 'Ajuste le mélange d\'engrais selon la culture.' },
  fan:     { col: 'ac', icon: 'fan',     title_en: 'Climate control',      title_fr: 'Climat',               meta_en: 'fans, vents, heating',           meta_fr: 'ventilation, fenêtres, chauffage', tip_en: 'Keeps air and temperature in the sweet spot.',     tip_fr: 'Maintient air et température parfaits.' },
  alert:   { col: 'ac', icon: 'alert',   title_en: 'Tell your team',       title_fr: 'Prévient l\'équipe',   meta_en: 'text, email, work orders',       meta_fr: 'texto, courriel, tâches',        tip_en: 'Pings the right person at the right time.',         tip_fr: 'Contacte la bonne personne au bon moment.' },
  report:  { col: 'ac', icon: 'report',  title_en: 'Daily summary',        title_fr: 'Résumé quotidien',     meta_en: 'what happened, what\'s next',    meta_fr: 'ce qui s\'est passé, la suite',  tip_en: 'Every morning, a plain-English rundown.',           tip_fr: 'Chaque matin, un résumé en français clair.' },
};

const PROMPTS = {
  humidity: {
    text_en: "Why is it getting muggy in Zone B?",
    text_fr: "Pourquoi c'est humide en Zone B?",
    path: ['climate', 'camera', 'ingest', 'ai', 'risk', 'policy', 'fan', 'alert'],
    answer_en: "Humidity in Zone B jumped from 72% to 84% over the last 40 minutes. One of your exhaust fans is running weaker than usual, and the canopy is denser since pruning. I'd turn up Vent Loop B by 30% for half an hour.",
    answer_fr: "L'humidité en Zone B est passée de 72 à 84% en 40 minutes. Un de vos ventilateurs tourne plus faiblement que d'habitude, et le feuillage est plus dense depuis la taille. Je monterais la Boucle Vent B de 30% pendant 30 min.",
    action_en: "Turn up Vent Loop B · 30 min",
    action_fr: "Monter Boucle Vent B · 30 min",
  },
  irrigate: {
    text_en: "Water Bay 2 for 6 minutes.",
    text_fr: "Arrose la baie 2 pendant 6 minutes.",
    path: ['notes', 'soil', 'ingest', 'ai', 'risk', 'policy', 'pump', 'valve', 'alert', 'report'],
    answer_en: "Ready to water Bay 2 for 6 minutes, about 42 L. The root zone is a bit low on fertilizer, so I'll use your \"Tomato Week 3\" recipe. I need your OK to start.",
    answer_fr: "Prêt à arroser la Baie 2 pendant 6 minutes, environ 42 L. Le sol est un peu pauvre en engrais, je vais utiliser votre recette « Tomate Semaine 3 ». J'attends votre accord.",
    action_en: "Water Bay 2 · 6 min · recipe Tomato-W3",
    action_fr: "Arroser Baie 2 · 6 min · recette Tomate-S3",
  },
  pest: {
    text_en: "Any pest risk this week?",
    text_fr: "Risque de ravageurs cette semaine?",
    path: ['camera', 'climate', 'ingest', 'ai', 'risk', 'alert', 'report'],
    answer_en: "Whitefly risk is climbing toward Thursday. Warmer days plus steady humidity is the same pattern as last outbreak. The scouting cameras flagged two spots in Zone C. I'd walk those rows and swap yellow cards today.",
    answer_fr: "Le risque d'aleurodes monte vers jeudi. Des jours plus chauds et une humidité stable, même motif que la dernière éclosion. Les caméras ont repéré deux foyers en Zone C. Je ferais une tournée et remplacerais les cartes jaunes aujourd'hui.",
    action_en: "Plan a Zone C walk-through",
    action_fr: "Planifier une tournée Zone C",
  },
};

function Pipeline({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const [tab, setTab] = React.useState('live');
  const [rules, setRules] = React.useState({ r1: true, r2: true, r3: false, r4: true });
  const [activePrompt, setActivePrompt] = React.useState('humidity');
  const [pathStep, setPathStep] = React.useState(999);
  const [transcript, setTranscript] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const [hoverNode, setHoverNode] = React.useState(null);
  const nodeRefs = React.useRef({});
  const canvasRef = React.useRef(null);
  const [geom, setGeom] = React.useState(null);
  const transcriptRef = React.useRef(null);
  const timersRef = React.useRef([]);

  const runPrompt = (key) => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    const p = PROMPTS[key];
    setActivePrompt(key);
    setPathStep(0);
    setApproved(false);
    setPending(true);
    setTranscript([{ role: 'user', text: t(p.text_en, p.text_fr) }]);

    p.path.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setPathStep(i + 1), 250 + i * 220));
    });
    timersRef.current.push(setTimeout(() => {
      setTranscript(v => [...v, { role: 'ai', text: '__typing' }]);
    }, 500 + p.path.length * 220));
    timersRef.current.push(setTimeout(() => {
      setTranscript(v => {
        const c = [...v];
        if (c[c.length - 1]?.text === '__typing') c.pop();
        c.push({ role: 'ai', text: t(p.answer_en, p.answer_fr) });
        return c;
      });
      setPending(false);
    }, 1600 + p.path.length * 220));
  };

  // Click a single node → ripple everything it connects to
  const pokeNode = (id) => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPending(false);
    // Build a little wave: this node + its direct neighbors across edges
    const neighbors = edgeList.reduce((acc, [a, b]) => {
      if (a === id) acc.push(b);
      if (b === id) acc.push(a);
      return acc;
    }, [id]);
    // Reuse activePrompt's structure but override lighting
    setActivePrompt('_poke');
    const seq = [id, ...Array.from(new Set(neighbors)).filter(n => n !== id)];
    setPathStep(0);
    pokePathRef.current = seq;
    seq.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setPathStep(i + 1), 120 + i * 140));
    });
    timersRef.current.push(setTimeout(() => setPathStep(0), 120 + seq.length * 140 + 800));
  };
  const pokePathRef = React.useRef([]);

  React.useEffect(() => { runPrompt('humidity'); /* eslint-disable-next-line */ }, [lang]);
  React.useEffect(() => () => timersRef.current.forEach(clearTimeout), []);
  React.useEffect(() => {
    if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [transcript]);

  const edgeList = React.useMemo(() => {
    const list = [];
    ['climate', 'soil', 'camera', 'notes'].forEach(i => list.push([i, 'ingest']));
    list.push(['ingest', 'ai']);
    list.push(['ingest', 'risk']);
    list.push(['ai', 'policy']);
    list.push(['risk', 'policy']);
    ['pump','valve','fan','alert','report'].forEach(a => list.push(['policy', a]));
    list.push(['ai', 'alert']);
    list.push(['risk', 'alert']);
    return list;
  }, []);

  const recomputeGeom = React.useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const sx = canvas.scrollLeft, sy = canvas.scrollTop;
    const entries = Object.entries(NODES).map(([id]) => {
      const el = nodeRefs.current[id];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { id, left: r.left - canvasRect.left + sx, right: r.right - canvasRect.left + sx, top: r.top - canvasRect.top + sy + r.height / 2 };
    }).filter(Boolean);
    setGeom({ width: canvas.scrollWidth, height: canvas.scrollHeight, nodes: Object.fromEntries(entries.map(e => [e.id, e])) });
  }, []);

  React.useLayoutEffect(() => {
    recomputeGeom();
    const ro = new ResizeObserver(recomputeGeom);
    if (canvasRef.current) ro.observe(canvasRef.current);
    window.addEventListener('resize', recomputeGeom);
    return () => { ro.disconnect(); window.removeEventListener('resize', recomputeGeom); };
  }, [recomputeGeom]);

  const currentPath = activePrompt === '_poke'
    ? pokePathRef.current
    : PROMPTS[activePrompt]?.path || [];
  const activeSet = new Set(currentPath.slice(0, pathStep));

  // Hover highlights neighbors
  const hoverNeighbors = React.useMemo(() => {
    if (!hoverNode) return null;
    const set = new Set([hoverNode]);
    edgeList.forEach(([a, b]) => {
      if (a === hoverNode) set.add(b);
      if (b === hoverNode) set.add(a);
    });
    return set;
  }, [hoverNode, edgeList]);

  const edgeClass = (a, b) => {
    const on = activeSet.has(a) && activeSet.has(b);
    const hovered = hoverNeighbors && hoverNeighbors.has(a) && hoverNeighbors.has(b);
    if (on || hovered) return 'active-leaf dashed';
    return '';
  };

  const buildPath = (a, b) => {
    if (!geom) return '';
    const A = geom.nodes[a], B = geom.nodes[b];
    if (!A || !B) return '';
    const x1 = A.right, y1 = A.top, x2 = B.left, y2 = B.top;
    const mid = (x1 + x2) / 2;
    return `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
  };

  const Col = ({ label, ids, note_en, note_fr }) => (
    <div className="col">
      <div className="col-head col-label">
        <span className="d"></span>{label}
        <span style={{marginLeft:'auto', textTransform:'none', letterSpacing:0, color:'var(--ink-dimmer)', fontFamily:'var(--sans)', fontSize:11, fontWeight:500}}>
          {t(note_en, note_fr)}
        </span>
      </div>
      <div className="nodes">
        {ids.map(id => {
          const def = NODES[id];
          const active = activeSet.has(id);
          const dimmed = hoverNeighbors && !hoverNeighbors.has(id);
          return (
            <div
              key={id}
              ref={el => nodeRefs.current[id] = el}
              className={`node ${active ? 'active' : ''} ${dimmed ? 'dimmed' : ''}`}
              onMouseEnter={() => setHoverNode(id)}
              onMouseLeave={() => setHoverNode(null)}
              onClick={() => pokeNode(id)}
            >
              <div className="ico">{Icons[def.icon]}</div>
              <div style={{minWidth: 0}}>
                <div className="ttl">{t(def.title_en, def.title_fr)}</div>
                <div className="meta" style={{fontFamily:'var(--sans)', textTransform:'none', letterSpacing:0, fontSize:11, color:'var(--ink-dimmer)'}}>
                  {t(def.meta_en, def.meta_fr)}
                </div>
              </div>
              {def.col !== 'in' && <div className="port in"></div>}
              {def.col !== 'ac' && <div className="port out"></div>}
              <div className="tooltip">{t(def.tip_en, def.tip_fr)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="pipeline-shell">
      <div className="pipeline-topbar">
        <span className="dots"><i></i><i></i><i></i></span>
        <span style={{fontFamily:'var(--sans)', textTransform:'none', letterSpacing:0, fontSize:12, color:'var(--ink)'}}>
          {t('Your greenhouse · Zone B', 'Votre serre · Zone B')}
        </span>
        <span className="tabs">
          <span className={tab==='live' ? 'on' : ''} onClick={() => setTab('live')}>{t('Live','En direct')}</span>
          <span className={tab==='past' ? 'on' : ''} onClick={() => setTab('past')}>{t('Past week','Semaine passée')}</span>
          <span className={tab==='rules' ? 'on' : ''} onClick={() => setTab('rules')}>{t('My rules','Mes règles')}</span>
        </span>
        <span className="run">● {t('Watching now', 'À l\'écoute')}</span>
      </div>

      {tab === 'past' && <PastWeek lang={lang} />}
      {tab === 'rules' && <MyRules lang={lang} rules={rules} setRules={setRules} />}
      {tab === 'live' && (
      <div className="pipeline-body">
        <div className="pipeline-canvas" ref={canvasRef}>
          <svg className="wires" preserveAspectRatio="none" width={geom?.width || 0} height={geom?.height || 0} viewBox={geom ? `0 0 ${geom.width} ${geom.height}` : undefined}>
            {edgeList.map(([a, b], i) => (
              <path key={i} d={buildPath(a, b)} className={edgeClass(a, b)} />
            ))}
          </svg>

          <div className="columns">
            <Col
              label={t('What it senses', 'Ce qu\'elle perçoit')}
              note_en="your greenhouse speaks" note_fr="votre serre parle"
              ids={['climate','soil','camera','notes']}
            />
            <Col
              label={t('What it thinks', 'Ce qu\'elle pense')}
              note_en="quietly, all day" note_fr="calmement, toute la journée"
              ids={['ingest','ai','risk','policy']}
            />
            <Col
              label={t('What it does', 'Ce qu\'elle fait')}
              note_en="with your OK" note_fr="avec votre accord"
              ids={['pump','valve','fan','alert','report']}
            />
          </div>

          <div style={{position:'absolute', bottom: 14, left: 24, right: 24, display:'flex', alignItems:'center', gap:10, fontSize: 12, color: 'var(--ink-dimmer)', pointerEvents:'none'}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
              <span style={{width:18, height:2, background:'var(--leaf)', borderRadius:2}}></span>
              {t('hover or click a card to trace what connects', 'passez ou cliquez pour voir les liens')}
            </span>
          </div>
        </div>

        <div className="ask-panel">
          <div className="ask-head">
            <span className="logo-mark" style={{width:26, height:26}}></span>
            <span className="name">{t('Ask SERREVUE', 'Parler à SERREVUE')}</span>
            <span className="badge">{t('always on','toujours là')}</span>
          </div>

          <div className="prompt-list">
            <div className="label">{t('Try asking', 'Essayez de demander')}</div>
            {Object.entries(PROMPTS).map(([k, p]) => (
              <button
                key={k}
                className={`prompt ${activePrompt === k ? 'active' : ''}`}
                onClick={() => runPrompt(k)}
              >
                <span className="ic">{Icons.bolt}</span>
                {t(p.text_en, p.text_fr)}
              </button>
            ))}
          </div>

          <div className="ask-transcript" ref={transcriptRef}>
            {transcript.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="av">{m.role === 'ai' ? 'S' : t('You','Vous')}</div>
                <div className="b">
                  {m.text === '__typing'
                    ? <span className="typing"><i></i><i></i><i></i></span>
                    : m.text}
                </div>
              </div>
            ))}
            {!pending && transcript.length > 1 && PROMPTS[activePrompt] && (
              <div className="action-strip">
                <span className="pill">{t('DO IT', 'ACTION')}</span>
                <span>{t(PROMPTS[activePrompt].action_en, PROMPTS[activePrompt].action_fr)}</span>
                <button className="approve" onClick={() => setApproved(true)}>
                  {approved
                    ? <>{Icons.check} {t('Done','Fait')}</>
                    : t('Go ahead','Allez-y')}
                </button>
              </div>
            )}
          </div>

          <div className="ask-input">
            <input
              placeholder={t('Ask your greenhouse anything…', 'Demandez à votre serre…')}
              onKeyDown={e => { if (e.key === 'Enter') runPrompt('humidity'); }}
            />
            <button>{Icons.send} {t('Send','Envoyer')}</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

// ---------- Past week charts ----------
function PastWeek({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const series = [
    { key_en: 'Temperature', key_fr: 'Température', unit: '°C', v: '23.4', d_en: 'steady this week', d_fr: 'stable cette semaine', data: [22, 23, 24, 23, 22, 24, 23], warn: false },
    { key_en: 'Humidity',    key_fr: 'Humidité',    unit: '%',  v: '78',   d_en: 'trending up · Thu', d_fr: 'en hausse · jeu', data: [68, 70, 72, 71, 76, 82, 78], warn: true },
    { key_en: 'Soil moisture', key_fr: 'Humidité du sol', unit: '%', v: '64', d_en: 'evening out nicely', d_fr: 'se stabilise', data: [58, 62, 70, 65, 60, 64, 64], warn: false },
    { key_en: 'Water used',  key_fr: 'Eau utilisée', unit: 'L', v: '312', d_en: '-8% vs last week', d_fr: '-8% vs sem. passée', data: [45, 52, 38, 48, 42, 44, 43], warn: false },
  ];
  const days_en = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const days_fr = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const sparkPath = (data) => {
    const max = Math.max(...data), min = Math.min(...data);
    const range = max - min || 1;
    const w = 100, h = 100;
    const pts = data.map((v, i) => [
      (i / (data.length - 1)) * w,
      h - ((v - min) / range) * (h - 20) - 10
    ]);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i-1], [x, y] = pts[i];
      const mx = (x0 + x) / 2;
      d += ` C ${mx} ${y0}, ${mx} ${y}, ${x} ${y}`;
    }
    return d;
  };
  const areaPath = (data) => {
    const line = sparkPath(data);
    return `${line} L 100 100 L 0 100 Z`;
  };
  return (
    <div className="charts-view">
      <div className="charts-head">
        <h3>{t('Last 7 days · Zone B', '7 derniers jours · Zone B')}</h3>
        <p>{t('Hover a chart to see what SERREVUE noticed.', 'Survolez un graphique pour voir ce que SERREVUE a remarqué.')}</p>
      </div>
      {series.map((s, i) => (
        <div key={i} className={`chart-row ${s.warn ? 'warn' : ''}`}>
          <div className="label">
            <span className="k">{t(s.key_en, s.key_fr)}</span>
            <span className="v">{s.v}<span style={{fontSize:13, color:'var(--ink-dim)', marginLeft:4}}>{s.unit}</span></span>
            <span className="d">{t(s.d_en, s.d_fr)}</span>
          </div>
          <div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`g-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.warn ? 'var(--amber)' : 'var(--leaf)'} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={s.warn ? 'var(--amber)' : 'var(--leaf)'} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath(s.data)} fill={`url(#g-${i})`} />
              <path d={sparkPath(s.data)} fill="none" stroke={s.warn ? 'var(--amber)' : 'var(--leaf)'} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
              {s.data.map((v, j) => {
                const max = Math.max(...s.data), min = Math.min(...s.data), range = max - min || 1;
                const cx = (j / (s.data.length - 1)) * 100;
                const cy = 100 - ((v - min) / range) * 80 - 10;
                return <circle key={j} cx={cx} cy={cy} r="1.4" fill={s.warn ? 'var(--amber)' : 'var(--leaf)'} vectorEffect="non-scaling-stroke" />;
              })}
            </svg>
            <div className="xaxis">
              {(lang === 'FR' ? days_fr : days_en).map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- My rules ----------
function MyRules({ lang, rules, setRules }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const list = [
    { id: 'r1', t_en: 'Auto-water when soil drops below 55%', t_fr: 'Arrose si le sol descend sous 55%', d_en: 'Max 3 cycles per day · asks first if weather is rainy', d_fr: 'Max 3 cycles/jour · demande d\'abord si pluie' },
    { id: 'r2', t_en: 'Open vents when humidity goes above 82%', t_fr: 'Ouvre les fenêtres si humidité > 82%', d_en: 'Runs by itself, up to 30 min', d_fr: 'S\'exécute seule, jusqu\'à 30 min' },
    { id: 'r3', t_en: 'Change fertilizer mix', t_fr: 'Modifier le mélange d\'engrais', d_en: 'Requires your approval every time', d_fr: 'Approbation requise à chaque fois' },
    { id: 'r4', t_en: 'Send morning summary at 6am', t_fr: 'Envoyer le résumé du matin à 6h', d_en: 'SMS + email to owner and grow manager', d_fr: 'SMS + courriel au propriétaire et responsable' },
  ];
  return (
    <div className="rules-view">
      <div className="charts-head">
        <h3>{t('Your rules', 'Vos règles')}</h3>
        <p>{t('Turn automations on or off. SERREVUE never acts outside these.', 'Activez ou désactivez les automatisations. SERREVUE n\'agit jamais en dehors.')}</p>
      </div>
      {list.map((r, i) => (
        <div
          key={r.id}
          className={`rule ${rules[r.id] ? '' : 'off'}`}
          onClick={() => setRules(v => ({ ...v, [r.id]: !v[r.id] }))}
          style={{cursor:'var(--cursor-glove-point)'}}
        >
          <div className="num">{i+1}</div>
          <div className="body">
            <div className="t">{t(r.t_en, r.t_fr)}</div>
            <div className="d">{t(r.d_en, r.d_fr)}</div>
          </div>
          <div className="toggle">
            {rules[r.id] ? t('ON','ACTIF') : t('OFF','INACTIF')}
            <div className="sw"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

window.Pipeline = Pipeline;
window.PROMPTS = PROMPTS;
