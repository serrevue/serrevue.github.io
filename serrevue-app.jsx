// Top-level app: language + tweaks wiring, mounts all sections.

function App() {
  const [lang, setLang] = React.useState('EN');

  // Language toggle (wired to external nav)
  React.useEffect(() => {
    const nav = document.getElementById('lang');
    if (!nav) return;
    const handler = (e) => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      const L = btn.dataset.lang;
      setLang(L);
      nav.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.lang === L));
      document.documentElement.lang = L === 'FR' ? 'fr' : 'en';
    };
    nav.addEventListener('click', handler);
    return () => nav.removeEventListener('click', handler);
  }, []);

  // Translate static nav labels
  React.useEffect(() => {
    const map = {
      EN: { '#how': 'How it works', '#benefits': 'Benefits', '#usecases': 'Use cases', '#product': 'Product', '#devices': 'Mobile', '#trust': 'Trust', demo: 'Book a demo →' },
      FR: { '#how': 'Comment ça marche', '#benefits': 'Bénéfices', '#usecases': 'Cas d\u2019usage', '#product': 'Produit', '#devices': 'Mobile', '#trust': 'Confiance', demo: 'Réserver une démo →' },
    };
    const dict = map[lang];
    document.querySelectorAll('nav.top .nav-links a').forEach(a => {
      const h = a.getAttribute('href');
      if (dict[h]) a.textContent = dict[h];
    });
    const cta = document.querySelector('nav.top .nav-cta');
    if (cta) cta.textContent = dict.demo;
  }, [lang]);

  return (
    <>
      <Hero lang={lang} />
      <PipelineSection lang={lang} />
      <DevicesSection lang={lang} />
      <Benefits lang={lang} />
      <UseCases lang={lang} />
      <ProductScreens lang={lang} />
      <IntegrationsSection lang={lang} />
      <Trust lang={lang} />
      <CtaFooter lang={lang} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);

// ---------- Tweaks (host-toggleable) ----------
(function wireTweaks() {
  const panel = document.getElementById('tweaks');
  const twLeaf = document.getElementById('tw-leaf');
  const twCyan = document.getElementById('tw-cyan');
  const twBg   = document.getElementById('tw-bg');
  const twGrid = document.getElementById('tw-grid');
  const twMot  = document.getElementById('tw-motion');

  const defaults = window.TWEAK_DEFAULTS || { accent: '#3F8E5B', cyan: '#7FB3A3', bg: 'cream', grid: 'on', motion: 'flow' };
  const state = { ...defaults };

  const applyBg = (v) => {
    const body = document.body;
    body.dataset.bg = v;
    if (v === 'cream') {
      body.style.setProperty('--bg',   '#F6F3EC');
      body.style.setProperty('--bg-2', '#EEE9DC');
      body.style.setProperty('--panel','#FFFFFF');
      body.style.setProperty('--panel-2','#F9F5EA');
    } else if (v === 'stone') {
      body.style.setProperty('--bg',   '#F1EEE7');
      body.style.setProperty('--bg-2', '#E6E1D4');
      body.style.setProperty('--panel','#FDFBF5');
      body.style.setProperty('--panel-2','#F4EFE2');
    } else if (v === 'sage') {
      body.style.setProperty('--bg',   '#EEF1EA');
      body.style.setProperty('--bg-2', '#E2E7DC');
      body.style.setProperty('--panel','#FAFBF6');
      body.style.setProperty('--panel-2','#EDF1E6');
    }
  };

  const applyGrid = (v) => {
    const g = document.querySelector('.grid-bg');
    if (g) g.style.display = v === 'off' ? 'none' : '';
  };

  const applyMotion = (v) => {
    // Replace animation style
    let s = document.getElementById('tw-motion-style');
    if (!s) { s = document.createElement('style'); s.id = 'tw-motion-style'; document.head.appendChild(s); }
    if (v === 'off')  s.textContent = 'svg.wires path.dashed { animation: none !important; stroke-dasharray: 0 !important; }';
    else if (v === 'pulse') s.textContent = 'svg.wires path.dashed { animation: dashflow 2.4s ease-in-out infinite !important; stroke-dasharray: 2 8 !important; }';
    else s.textContent = '';
  };

  const apply = () => {
    document.body.style.setProperty('--leaf', state.accent);
    document.body.style.setProperty('--leaf-soft', state.accent + '24');
    document.body.style.setProperty('--cyan', state.cyan);
    document.body.style.setProperty('--cyan-soft', state.cyan + '24');
    applyBg(state.bg);
    applyGrid(state.grid);
    applyMotion(state.motion);

    if (twLeaf) twLeaf.value = state.accent;
    if (twCyan) twCyan.value = state.cyan;
    [twBg, twGrid, twMot].forEach((seg, i) => {
      const key = ['bg','grid','motion'][i];
      if (!seg) return;
      seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === state[key]));
    });
  };

  const save = (edits) => {
    Object.assign(state, edits);
    apply();
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*'); } catch(e) {}
  };

  if (twLeaf) twLeaf.addEventListener('input', e => save({ accent: e.target.value }));
  if (twCyan) twCyan.addEventListener('input', e => save({ cyan: e.target.value }));
  [['bg', twBg], ['grid', twGrid], ['motion', twMot]].forEach(([key, seg]) => {
    if (!seg) return;
    seg.addEventListener('click', e => {
      const b = e.target.closest('button[data-v]');
      if (!b) return;
      save({ [key]: b.dataset.v });
    });
  });

  apply();

  // Edit-mode protocol: register FIRST, then announce.
  window.addEventListener('message', (ev) => {
    const d = ev.data || {};
    if (d.type === '__activate_edit_mode') panel.classList.add('open');
    else if (d.type === '__deactivate_edit_mode') panel.classList.remove('open');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e) {}
})();
