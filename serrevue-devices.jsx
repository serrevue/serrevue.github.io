// Mobile + iPad mockup section — interactive hold-to-speak phone, interactive tablet dashboard.

const DEVICES_CSS = `
  .devices-section { padding: 100px 0; position: relative; overflow: hidden; }
  .devices-shell {
    display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 960px) { .devices-shell { grid-template-columns: 1fr; gap: 56px; } .ipad-stage { order: -1; } }

  .store-badges { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
  .store-badge {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 10px 16px; border-radius: 12px;
    background: var(--ink); color: var(--bg);
    font-weight: 500;
  }
  .store-badge:hover { transform: translateY(-1px); }
  .store-badge .store-ic { width: 24px; height: 24px; display: grid; place-items: center; }
  .store-badge .sm { font-size: 10px; line-height: 1; color: var(--ink-dimmer); text-transform: uppercase; letter-spacing: 0.08em; }
  .store-badge .lg { font-size: 15px; line-height: 1.1; font-family: var(--display); }

  /* --- Tablet + phone stage --- */
  .ipad-stage {
    position: relative; display: grid; place-items: center;
    padding: 40px 10px;
  }
  .ipad {
    position: relative;
    width: 100%; max-width: 520px;
    aspect-ratio: 4 / 3;
    border-radius: 24px;
    background: #1E2C24;
    padding: 14px;
    box-shadow: 0 30px 70px rgba(30,44,36,0.28), 0 10px 20px rgba(30,44,36,0.12);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .ipad-screen {
    width: 100%; height: 100%;
    border-radius: 12px;
    background: var(--panel);
    overflow: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
  }
  .ipad-top {
    padding: 10px 14px;
    display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid var(--line);
    font-size: 12px;
  }
  .ipad-top .lm {
    width: 22px; height: 22px; border-radius: 7px;
    background: linear-gradient(135deg, var(--leaf), var(--leaf-deep));
    color: #fff; display: grid; place-items: center;
    font-family: var(--display); font-size: 11px; font-weight: 700;
  }
  .ipad-top .status { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10px; color: var(--ink-dim); }
  .ipad-top .status .d { width: 6px; height: 6px; border-radius: 50%; background: var(--leaf); }

  .ipad-body {
    padding: 12px;
    display: grid; grid-template-columns: 1fr 1.3fr; gap: 10px;
    min-height: 0;
  }
  .ipad-left { display: grid; gap: 8px; align-content: start; }
  .ipad-zone-chip {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 10px; border-radius: 10px;
    border: 1px solid var(--line); background: var(--panel-2);
    font-size: 12px; cursor: var(--cursor-glove-point);
    transition: background .15s, border-color .15s;
  }
  .ipad-zone-chip:hover { background: var(--bg-2); }
  .ipad-zone-chip.on { border-color: var(--leaf); background: var(--leaf-soft); }
  .ipad-zone-chip .zd { width: 8px; height: 8px; border-radius: 50%; background: var(--leaf); }
  .ipad-zone-chip.warn .zd { background: var(--amber); }
  .ipad-zone-chip .nm { font-weight: 600; }
  .ipad-zone-chip .st { margin-left: auto; font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-dim); }

  .ipad-right { display: grid; gap: 10px; grid-template-rows: auto 1fr; min-height: 0; }
  .ipad-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .ipad-kpi {
    padding: 8px 10px; border-radius: 9px; background: var(--panel-2); border: 1px solid var(--line);
  }
  .ipad-kpi .l { font-family: var(--mono); font-size: 9px; color: var(--ink-dimmer); letter-spacing: 0.08em; text-transform: uppercase; }
  .ipad-kpi .v { font-family: var(--display); font-size: 16px; font-weight: 600; }
  .ipad-chart {
    position: relative;
    padding: 10px 12px;
    border-radius: 10px; border: 1px solid var(--line); background: var(--panel-2);
    display: grid; grid-template-rows: auto 1fr;
    min-height: 0;
  }
  .ipad-chart .hd {
    display: flex; align-items: baseline; justify-content: space-between;
    font-size: 11px; color: var(--ink-dim);
  }
  .ipad-chart .hd .k { font-weight: 600; color: var(--ink); }
  .ipad-chart svg { width: 100%; height: 100%; min-height: 0; }

  /* --- Phone --- */
  .phone-wrap {
    position: absolute;
    right: -30px; bottom: -30px;
    width: 210px;
    z-index: 2;
    filter: drop-shadow(0 25px 40px rgba(30,44,36,0.25));
  }
  @media (max-width: 960px) {
    .phone-wrap { right: 10px; bottom: -40px; width: 190px; }
  }
  .phone {
    position: relative;
    width: 100%;
    aspect-ratio: 9 / 19;
    border-radius: 32px;
    background: #0A1614;
    padding: 10px;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .phone-screen {
    width: 100%; height: 100%;
    background: linear-gradient(180deg, #F6F3EC, #EEE9DC);
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
  .phone-notch {
    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    width: 80px; height: 18px; border-radius: 10px;
    background: #0A1614;
    z-index: 5;
  }
  .phone-statusbar {
    padding: 14px 18px 4px;
    display: flex; justify-content: space-between;
    font-family: var(--mono); font-size: 10px; font-weight: 600; color: var(--ink);
  }
  .phone-head {
    padding: 20px 14px 10px; display: flex; align-items: center; gap: 8px;
  }
  .phone-head .lm {
    width: 22px; height: 22px; border-radius: 7px;
    background: var(--leaf); color: #fff; display: grid; place-items: center;
    font-family: var(--display); font-size: 11px; font-weight: 700;
  }
  .phone-head .nm { font-family: var(--display); font-size: 14px; font-weight: 600; }
  .phone-head .live {
    margin-left: auto; font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
    color: var(--leaf-deep); background: var(--leaf-soft); padding: 3px 6px; border-radius: 5px;
  }

  .phone-transcript {
    padding: 6px 12px 12px;
    display: grid; gap: 8px; align-content: end;
    overflow: hidden;
  }
  .phone-msg { display: flex; gap: 6px; align-items: flex-start; font-size: 11.5px; line-height: 1.35; }
  .phone-msg .b { padding: 7px 10px; border-radius: 12px; max-width: 85%; }
  .phone-msg.user .b { background: var(--ink); color: var(--bg); margin-left: auto; border-bottom-right-radius: 4px; }
  .phone-msg.ai   .b { background: var(--leaf-soft); color: var(--ink); border-bottom-left-radius: 4px; }
  .phone-msg .wave { display: inline-flex; align-items: center; gap: 2px; height: 12px; }
  .phone-msg .wave i { display: block; width: 2px; border-radius: 1px; background: var(--bg); animation: wv 0.9s ease-in-out infinite; }
  .phone-msg .wave i:nth-child(1){ height:50%; animation-delay: 0s; }
  .phone-msg .wave i:nth-child(2){ height:90%; animation-delay: .1s; }
  .phone-msg .wave i:nth-child(3){ height:60%; animation-delay: .2s; }
  .phone-msg .wave i:nth-child(4){ height:95%; animation-delay: .3s; }
  .phone-msg .wave i:nth-child(5){ height:45%; animation-delay: .4s; }
  .phone-msg .wave i:nth-child(6){ height:80%; animation-delay: .15s; }
  .phone-msg .wave i:nth-child(7){ height:55%; animation-delay: .25s; }
  .phone-msg .wave i:nth-child(8){ height:70%; animation-delay: .35s; }
  @keyframes wv { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }

  .phone-footer {
    padding: 10px 14px 18px;
    display: grid; place-items: center; gap: 6px;
    background: linear-gradient(180deg, transparent, rgba(246,243,236,0.9));
  }
  .phone-hint {
    font-family: var(--mono); font-size: 9px; color: var(--ink-dimmer);
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .phone-mic {
    position: relative;
    width: 64px; height: 64px; border-radius: 50%;
    background: var(--leaf); color: #fff;
    display: grid; place-items: center;
    cursor: var(--cursor-glove-point);
    transition: transform .15s, background .15s;
    border: 0;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
  }
  .phone-mic:hover { transform: scale(1.03); }
  .phone-mic.rec { background: var(--amber); }
  .phone-mic.rec::before {
    content:''; position: absolute; inset: -10px; border-radius: 50%;
    border: 2px solid var(--amber); opacity: 0.5;
    animation: micpulse 1.2s ease-out infinite;
  }
  .phone-mic.rec::after {
    content:''; position: absolute; inset: -18px; border-radius: 50%;
    border: 2px solid var(--amber); opacity: 0.25;
    animation: micpulse 1.2s ease-out .3s infinite;
  }
  @keyframes micpulse { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.2); opacity: 0; } }

  .phone-mic svg { width: 24px; height: 24px; }

  .phone-quick {
    display: flex; gap: 6px; padding: 0 12px 4px; flex-wrap: wrap; justify-content: center;
  }
  .phone-quick button {
    padding: 5px 9px; border-radius: 999px; background: var(--panel);
    border: 1px solid var(--line);
    font-size: 10px; color: var(--ink);
    cursor: var(--cursor-glove-point);
  }
  .phone-quick button:hover { background: var(--bg-2); }
`;

function DevicesSection({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const [selectedZone, setSelectedZone] = React.useState(1);

  // Install style once
  React.useEffect(() => {
    if (document.getElementById('devices-css')) return;
    const s = document.createElement('style');
    s.id = 'devices-css';
    s.textContent = DEVICES_CSS;
    document.head.appendChild(s);
  }, []);

  return (
    <section id="devices" className="devices-section">
      <div className="wrap devices-shell">
        <div>
          <span className="eyebrow"><span className="dot"></span>{t('On your phone & tablet', 'Sur votre téléphone & tablette')}</span>
          <h2 style={{marginTop: 20}}>{t('Take your greenhouse with you.','Votre serre, dans votre poche.')}</h2>
          <p style={{marginTop: 18, maxWidth: 480, fontSize: 17}}>
            {t(
              'Hold the mic and speak. SERREVUE understands plain French or English, sends the command, and texts you back when it\'s done. The tablet view lives by your office desk.',
              'Tenez le micro et parlez. SERREVUE comprend le français ou l\'anglais, exécute la commande et vous écrit quand c\'est fait. La vue tablette reste sur votre bureau.'
            )}
          </p>
          <div style={{marginTop: 24, display:'grid', gap: 12, maxWidth: 440}}>
            {[
              { en: 'Press and hold to talk, then release to send.', fr: 'Appuyez et parlez, puis relâchez pour envoyer.' },
              { en: 'Get a morning summary on your way to the greenhouse.', fr: 'Recevez le résumé du matin en route vers la serre.' },
              { en: 'Approve or cancel any action right from a notification.', fr: 'Approuvez ou annulez une action depuis la notification.' },
            ].map((f, i) => (
              <div key={i} style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                <span style={{flex:'0 0 auto', width:24, height:24, borderRadius:8, background:'var(--leaf-soft)', color:'var(--leaf-deep)', display:'grid', placeItems:'center'}}>
                  {Icons.check}
                </span>
                <span style={{color:'var(--ink)', fontSize: 14}}>{t(f.en, f.fr)}</span>
              </div>
            ))}
          </div>
          <div className="store-badges">
            <a className="store-badge" href="#">
              <span className="store-ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c-.03-3 2.45-4.44 2.56-4.51-1.4-2.04-3.57-2.32-4.34-2.36-1.85-.19-3.61 1.08-4.55 1.08-.94 0-2.39-1.05-3.93-1.02-2.02.03-3.88 1.17-4.92 2.97-2.1 3.63-.54 9.01 1.5 11.96 1 1.44 2.19 3.06 3.74 3 1.51-.06 2.08-.97 3.9-.97 1.82 0 2.34.97 3.93.94 1.62-.03 2.65-1.47 3.64-2.91 1.15-1.67 1.62-3.28 1.64-3.37-.04-.01-3.15-1.21-3.17-4.81zM14.42 4.27c.83-1 1.39-2.39 1.24-3.77-1.2.05-2.65.8-3.51 1.8-.77.89-1.44 2.3-1.26 3.66 1.34.1 2.7-.68 3.53-1.69z"/></svg>
              </span>
              <span style={{display:'grid'}}>
                <span className="sm">{t('Download on the','Téléchargez sur le')}</span>
                <span className="lg">App Store</span>
              </span>
            </a>
            <a className="store-badge" href="#">
              <span className="store-ic">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.5 2.7c-.3.3-.5.8-.5 1.4v15.8c0 .6.2 1.1.5 1.4l8.4-8.7L3.5 2.7z" fill="#7FB3A3"/>
                  <path d="M15.7 9.4L5.3 3.4l9 9L15.7 9.4z" fill="#D58B3A"/>
                  <path d="M15.7 14.6l-1.4-2.2-9 9 10.4-6-0-0z" fill="#3F8E5B"/>
                  <path d="M19.3 10.9l-3.6-2.1-1.4 1.4 1.4 1.4-1.4 1.4 1.4 1.4 3.6-2.1c1.1-.6 1.1-1.8 0-2.4z" fill="#1E2C24"/>
                </svg>
              </span>
              <span style={{display:'grid'}}>
                <span className="sm">{t('Get it on','Disponible sur')}</span>
                <span className="lg">Google Play</span>
              </span>
            </a>
          </div>
        </div>

        <div className="ipad-stage">
          <IpadMock lang={lang} selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
          <div className="phone-wrap">
            <PhoneMock lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ------ iPad mock ------
function IpadMock({ lang, selectedZone, setSelectedZone }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const zones = [
    { id: 1, n_en: 'Bay 1 · Tomato', n_fr: 'Baie 1 · Tomate',  s_en: 'healthy', s_fr: 'sain',  warn: false, kpis: { a: '23°', b: '72%', c: '820 CO₂' }, data: [22,23,24,23,22,24,23,24,22,23] },
    { id: 2, n_en: 'Bay 2 · Tomato', n_fr: 'Baie 2 · Tomate',  s_en: 'watch',   s_fr: 'surv.',  warn: true,  kpis: { a: '24°', b: '84%', c: '780 CO₂' }, data: [68,70,72,71,76,82,84,83,81,78] },
    { id: 3, n_en: 'Bay 3 · Pepper', n_fr: 'Baie 3 · Poivron', s_en: 'healthy', s_fr: 'sain',  warn: false, kpis: { a: '22°', b: '65%', c: '850 CO₂' }, data: [62,65,68,64,66,65,63,67,64,65] },
    { id: 4, n_en: 'Bay 4 · Cucumber', n_fr: 'Baie 4 · Concombre', s_en: 'healthy', s_fr: 'sain', warn: false, kpis: { a: '23°', b: '70%', c: '810 CO₂' }, data: [68,70,69,71,70,72,71,73,72,71] },
  ];
  const z = zones.find(x => x.id === selectedZone) || zones[0];
  const w = 100, h = 100;
  const max = Math.max(...z.data), min = Math.min(...z.data), range = max - min || 1;
  const pts = z.data.map((v, i) => [
    (i / (z.data.length - 1)) * w,
    h - ((v - min) / range) * (h - 20) - 10
  ]);
  let line = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i-1], [x, y] = pts[i];
    const mx = (x0 + x) / 2;
    line += ` C ${mx} ${y0}, ${mx} ${y}, ${x} ${y}`;
  }
  const area = `${line} L 100 100 L 0 100 Z`;

  return (
    <div className="ipad">
      <div className="ipad-screen">
        <div className="ipad-top">
          <span className="lm">S</span>
          <span style={{fontFamily:'var(--display)', fontWeight:600}}>{t('Greenhouse overview','Vue de la serre')}</span>
          <span className="status"><span className="d"></span>{t('all systems nominal','tout va bien')}</span>
        </div>
        <div className="ipad-body">
          <div className="ipad-left">
            <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--ink-dimmer)', padding:'2px 4px'}}>
              {t('Zones','Zones')}
            </div>
            {zones.map(zn => (
              <div
                key={zn.id}
                className={`ipad-zone-chip ${zn.warn ? 'warn' : ''} ${selectedZone === zn.id ? 'on' : ''}`}
                onClick={() => setSelectedZone(zn.id)}
              >
                <span className="zd"></span>
                <span className="nm">{t(zn.n_en, zn.n_fr)}</span>
                <span className="st">{t(zn.s_en, zn.s_fr)}</span>
              </div>
            ))}
          </div>
          <div className="ipad-right">
            <div className="ipad-kpis">
              <div className="ipad-kpi"><div className="l">{t('Temp','Temp')}</div><div className="v">{z.kpis.a}</div></div>
              <div className="ipad-kpi"><div className="l">{t('Humid.','Humid.')}</div><div className="v">{z.kpis.b}</div></div>
              <div className="ipad-kpi"><div className="l">CO₂</div><div className="v">{z.kpis.c}</div></div>
            </div>
            <div className="ipad-chart">
              <div className="hd">
                <span className="k">{t('Humidity · last 10h','Humidité · 10 dern. h')}</span>
                <span style={{fontFamily:'var(--mono)', fontSize:10}}>{z.warn ? t('watch','surveiller') : t('normal','normal')}</span>
              </div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ipad-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={z.warn ? 'var(--amber)' : 'var(--leaf)'} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={z.warn ? 'var(--amber)' : 'var(--leaf)'} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={area} fill="url(#ipad-grad)" />
                <path d={line} fill="none" stroke={z.warn ? 'var(--amber)' : 'var(--leaf)'} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------ Phone mock (hold-to-speak) ------
const PHONE_COMMANDS = [
  {
    q_en: 'Give me a summary of the morning.',
    q_fr: 'Fais-moi un résumé de la matinée.',
    a_en: 'All 4 bays healthy. Humidity in Bay 2 was high at 9am, I bumped the vents and it\'s back to 78%. Irrigation ran twice, as planned.',
    a_fr: 'Les 4 baies sont saines. L\'humidité en Baie 2 était haute à 9h, j\'ai augmenté les fenêtres et c\'est redescendu à 78%. Arrosage deux fois, comme prévu.',
  },
  {
    q_en: 'Water Bay 2 for five minutes.',
    q_fr: 'Arrose la baie 2 pendant cinq minutes.',
    a_en: 'Starting Bay 2 for 5 min, about 35 L. I\'ll text you when it\'s done.',
    a_fr: 'Baie 2 en cours, 5 min, environ 35 L. Je t\'écris quand c\'est fini.',
  },
  {
    q_en: 'Any alerts from last night?',
    q_fr: 'Des alertes cette nuit?',
    a_en: 'One. Temp in Bay 3 dropped 4° around 3am. Heating caught up in 12 minutes. Nothing to do.',
    a_fr: 'Une seule. La temp en Baie 3 a baissé de 4° vers 3h. Le chauffage a rattrapé en 12 min. Rien à faire.',
  },
];

function PhoneMock({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState('idle'); // idle | recording | thinking | answered
  const [transcript, setTranscript] = React.useState([]);
  const timers = React.useRef([]);

  const cancel = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  React.useEffect(() => () => cancel(), []);

  const runCommand = (i) => {
    cancel();
    setIdx(i);
    const cmd = PHONE_COMMANDS[i];
    setPhase('recording');
    setTranscript([{ role: 'user', text: '__wave' }]);
    timers.current.push(setTimeout(() => {
      setTranscript([{ role: 'user', text: t(cmd.q_en, cmd.q_fr) }]);
      setPhase('thinking');
    }, 1200));
    timers.current.push(setTimeout(() => {
      setTranscript(v => [...v, { role: 'ai', text: '__typing' }]);
    }, 1400));
    timers.current.push(setTimeout(() => {
      setTranscript([
        { role: 'user', text: t(cmd.q_en, cmd.q_fr) },
        { role: 'ai', text: t(cmd.a_en, cmd.a_fr) },
      ]);
      setPhase('answered');
    }, 3000));
  };

  // Autoplay first one after mount
  React.useEffect(() => {
    const tm = setTimeout(() => runCommand(0), 900);
    return () => clearTimeout(tm);
    // eslint-disable-next-line
  }, [lang]);

  // Also support press-and-hold on the mic button: start record, on release run command
  const holdStart = React.useRef(0);
  const onPress = () => {
    cancel();
    holdStart.current = Date.now();
    setPhase('recording');
    setTranscript([{ role: 'user', text: '__wave' }]);
  };
  const onRelease = () => {
    // pick next command
    const next = (idx + 1) % PHONE_COMMANDS.length;
    runCommand(next);
  };

  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-notch"></div>
        <div>
          <div className="phone-statusbar">
            <span>9:41</span>
            <span style={{display:'inline-flex', alignItems:'center', gap:5}}>
              {/* signal bars */}
              <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
                <rect x="0"  y="7" width="2.5" height="3" rx="0.5" fill="currentColor"/>
                <rect x="3.5" y="5" width="2.5" height="5" rx="0.5" fill="currentColor"/>
                <rect x="7"  y="3" width="2.5" height="7" rx="0.5" fill="currentColor"/>
                <rect x="10.5" y="1" width="2.5" height="9" rx="0.5" fill="currentColor"/>
              </svg>
              <span style={{fontSize:9, fontWeight:600, letterSpacing:'0.02em'}}>5G</span>
              {/* battery */}
              <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true">
                <rect x="0.5" y="0.5" width="18" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
                <rect x="20" y="3" width="1.5" height="4" rx="0.5" fill="currentColor"/>
                <rect x="2" y="2" width="13" height="6" rx="1" fill="currentColor"/>
              </svg>
            </span>
          </div>
          <div className="phone-head">
            <span className="lm">S</span>
            <span className="nm">SERREVUE</span>
            <span className="live">{t('live','direct')}</span>
          </div>
        </div>
        <div className="phone-transcript">
          {transcript.map((m, i) => (
            <div key={i} className={`phone-msg ${m.role}`}>
              <div className="b">
                {m.text === '__wave'
                  ? <span className="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                  : m.text === '__typing'
                  ? <span className="typing"><i></i><i></i><i></i></span>
                  : m.text}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="phone-quick">
            {PHONE_COMMANDS.map((c, i) => (
              <button key={i} onClick={() => runCommand(i)}>{t(c.q_en, c.q_fr).split(' ').slice(0, 3).join(' ')}…</button>
            ))}
          </div>
          <div className="phone-footer">
            <button
              className={`phone-mic ${phase === 'recording' ? 'rec' : ''}`}
              onMouseDown={onPress}
              onMouseUp={onRelease}
              onMouseLeave={() => phase === 'recording' && onRelease()}
              onTouchStart={(e) => { e.preventDefault(); onPress(); }}
              onTouchEnd={(e) => { e.preventDefault(); onRelease(); }}
              aria-label="Hold to speak"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor" stroke="none"/>
                <path d="M5 11a7 7 0 0014 0M12 18v3M8 21h8"/>
              </svg>
            </button>
            <span className="phone-hint">
              {phase === 'recording'
                ? t('listening… release to send','à l\'écoute… relâchez')
                : t('hold to speak','tenez pour parler')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.DevicesSection = DevicesSection;
