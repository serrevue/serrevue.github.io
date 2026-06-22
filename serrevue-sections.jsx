// Content sections: hero, benefits, use cases, product screens, trust, CTA.

// ---------- Hero ----------
function Hero({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const [step, setStep] = React.useState(0);

  // Scripted mini-chat in hero
  React.useEffect(() => {
    setStep(0);
    const steps = [400, 1400, 2600, 3800];
    const timers = steps.map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [lang]);

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>
            {t('Talk to your', 'Parlez à votre')}<br/>
            <span className="accent">{t('greenhouse.', 'serre.')}</span>
          </h1>
          <p className="hero-sub">
            {t(
              'SERREVUE connects sensors, cameras, pumps, and climate systems to an AI operator you can chat with. You stay in control, and SERREVUE executes with guardrails.',
              'SERREVUE connecte vos capteurs, caméras, pompes et systèmes climatiques à un opérateur IA avec qui vous discutez. Vous gardez le contrôle, et SERREVUE exécute avec des garde-fous.'
            )}
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#demo">{t('Book a demo','Réserver une démo')} <span className="arrow">→</span></a>
            <a className="btn btn-ghost" href="#how">{t('See live workflow','Voir le flux en direct')}</a>
          </div>
          <div className="hero-meta">
            <span><span className="d"></span>{t('Sensors · cameras · automation','Capteurs · caméras · automatisation')}</span>
            <span><span className="d"></span>{t('Agentic actions, human approval','Actions agentiques, approbation humaine')}</span>
            <span><span className="d"></span>{t('Works with your existing hardware and software','Compatible avec votre matériel et vos logiciels actuels')}</span>
          </div>
        </div>

        <div style={{position: 'relative'}}>
          <HeroChat lang={lang} step={step} />
          <div className="stat-chip one">
            <span className="d" style={{background:'var(--cyan)', boxShadow:'0 0 8px var(--cyan)'}}></span>
            <span>Zone B · 24.1°C · 84% RH</span>
          </div>
          <div className="stat-chip two">
            <span className="d" style={{background:'var(--leaf)', boxShadow:'0 0 8px var(--leaf)'}}></span>
            <span>{t('Vent Loop B · +30% · approved','Boucle Vent B · +30% · approuvé')}</span>
          </div>
          <div className="stat-chip three">
            <span className="d" style={{background:'var(--amber)', boxShadow:'0 0 8px var(--amber)'}}></span>
            <span>{t('Whitefly risk · Thu','Aleurode · jeudi')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroChat({ lang, step }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  return (
    <div className="chat-card">
      <div className="chat-head">
        <span className="dots"><i></i><i></i><i></i></span>
        <span>ask.serrevue / zone-b</span>
        <span className="zone">● {t('LIVE','EN DIRECT')}</span>
      </div>
      <div className="chat-body">
        {step >= 1 && (
          <div className="msg user">
            <div className="av">You</div>
            <div className="b">{t('Why is humidity rising in Zone B?', "Pourquoi l'humidité monte en Zone B?")}</div>
          </div>
        )}
        {step >= 2 && step < 3 && (
          <div className="msg ai">
            <div className="av">SV</div>
            <div className="b"><span className="typing"><i></i><i></i><i></i></span></div>
          </div>
        )}
        {step >= 3 && (
          <div className="msg ai">
            <div className="av">SV</div>
            <div className="b">
              {t(
                'Humidity climbed 72 → 84% in 40 min. Exhaust fan 3 is underperforming and canopy density is up. Recommend Vent Loop B +30% for 30 min.',
                "L'humidité est passée de 72 à 84% en 40 min. Le ventilateur 3 sous-performe et la densité du couvert a augmenté. Boucle Vent B +30% pendant 30 min."
              )}
            </div>
          </div>
        )}
        {step >= 4 && (
          <div className="action-strip">
            <span className="pill">{t('ACTION','ACTION')}</span>
            <span style={{fontFamily:'var(--mono)', fontSize:12}}>{t('Vent Loop B · +30% · 30 min','Boucle Vent B · +30% · 30 min')}</span>
            <button className="approve">{Icons.check} {t('Approved','Approuvé')}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Pipeline wrapper section ----------
function PipelineSection({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  return (
    <section id="how" className="pipeline-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>{t('How it works','Comment ça marche')}</span>
          <h2>{t('One pipeline from sensor to action.','Un flux continu, du capteur à l\u2019action.')}</h2>
          <p className="sub">
            {t(
              'Every reading, image, and note flows through the same graph. The brain reasons, the policy layer enforces your guardrails, and actions are executed with a human in the loop.',
              'Chaque lecture, image et note passe par le même graphe. Le cerveau raisonne, la politique applique vos garde-fous, et les actions sont exécutées avec approbation humaine.'
            )}
          </p>
        </div>
        <Pipeline lang={lang} />
      </div>
    </section>
  );
}

// ---------- Benefits ----------
const BENEFITS = [
  { big: '4×',     k_en: 'Faster issue detection', k_fr: 'Détection plus rapide', p_en: 'Disease, climate anomalies, and equipment drift flagged in minutes, not on the next walk-through.', p_fr: 'Maladies, anomalies climatiques et dérives d\'équipement signalées en minutes, pas à la prochaine ronde.' },
  { big: '-62%',   k_en: 'Fewer manual checks',    k_fr: 'Moins de vérifications', p_en: 'Your team stops chasing dashboards. SERREVUE pings only when something actually matters.', p_fr: 'Votre équipe arrête de surveiller les tableaux. SERREVUE alerte seulement quand c\'est nécessaire.' },
  { big: '+18%',   k_en: 'Crop consistency',       k_fr: 'Consistance des récoltes', p_en: 'Tighter feedback loops on climate and fertigation yield a more predictable harvest, zone by zone.', p_fr: 'Des boucles plus serrées sur le climat et la fertigation donnent des récoltes prévisibles, zone par zone.' },
  { big: '-24%',   k_en: 'Resource waste',         k_fr: 'Gaspillage',            p_en: 'Only water, nutrients, and energy that the crop actually needs, measured against live plant state.', p_fr: 'Seulement l\'eau, les nutriments et l\'énergie réellement nécessaires, mesurés selon l\'état réel des plants.' },
  { big: '100%',   k_en: 'Human-in-the-loop',      k_fr: 'Humain dans la boucle', p_en: 'Every automated action passes through your approval policy. No silent changes to your greenhouse.', p_fr: 'Chaque action passe par votre politique d\'approbation. Aucun changement silencieux dans votre serre.' },
];

function Benefits({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  return (
    <section id="benefits" className="benefits-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>{t('Key benefits','Bénéfices')}</span>
          <h2>{t('Operational wins, measured.*','Des gains opérationnels, mesurés.*')}</h2>
        </div>
        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <div className="benefit" key={i}>
              <div className="big">{b.big}</div>
              <h3>{t(b.k_en, b.k_fr)}</h3>
              <p>{t(b.p_en, b.p_fr)}</p>
            </div>
          ))}
        </div>
        <p style={{
          marginTop: 24,
          fontFamily: 'var(--mono)',
          fontSize: 11,
          color: 'var(--ink-dimmer)',
          letterSpacing: '0.02em',
        }}>
          {t(
            '* Based on pilot results across partner greenhouses in Québec. Your numbers will vary by crop, climate, and starting baseline.',
            '* Selon les résultats des pilotes menés avec des serres partenaires au Québec. Les chiffres varient selon la culture, le climat et la base de départ.'
          )}
        </p>
      </div>
    </section>
  );
}

// ---------- Use cases ----------
const USECASES = [
  {
    tag_en: 'Early warning', tag_fr: 'Alerte précoce',
    t_en: 'Disease & pest detection', t_fr: 'Maladies & ravageurs',
    p_en: 'Camera scouting + climate fusion flags whitefly, powdery mildew, and botrytis risk days before visible symptoms.',
    p_fr: 'Dépistage caméra + fusion climatique détecte aleurodes, oïdium et botrytis des jours avant les symptômes visibles.',
    spark: [3,4,5,4,6,7,8,7,9,10,11,14,18,22,16,12,10,9,7,6,5,4,4,3],
    hiIx: [12, 13, 14],
  },
  {
    tag_en: 'Anomalies', tag_fr: 'Anomalies',
    t_en: 'Climate anomaly detection', t_fr: 'Détection climatique',
    p_en: 'Drift in humidity, VPD, or CO₂ is correlated against vent, fan, and heating telemetry, not just thresholds.',
    p_fr: 'Les dérives d\'humidité, VPD ou CO₂ sont corrélées avec les ventilateurs et le chauffage, pas seulement des seuils.',
    spark: [5,5,6,6,6,7,7,8,8,7,9,11,10,9,8,8,7,7,6,6,5,5,6,6],
    warnIx: [9, 10, 11, 12],
  },
  {
    tag_en: 'Optimization', tag_fr: 'Optimisation',
    t_en: 'Irrigation optimization', t_fr: 'Optimisation d\'arrosage',
    p_en: 'Per-zone moisture and EC targets drive pump and valve recipes. SERREVUE skips a cycle when substrate is already wet.',
    p_fr: 'Les cibles d\'humidité et d\'EC par zone pilotent pompes et vannes. SERREVUE saute un cycle si le substrat est déjà humide.',
    spark: [4,6,8,10,7,3,5,7,9,11,8,4,6,8,10,12,9,5,6,8,10,7,4,5],
    hiIx: [2, 10, 17],
  },
  {
    tag_en: 'Co-pilot', tag_fr: 'Copilote',
    t_en: 'Daily operator co-pilot', t_fr: 'Copilote quotidien',
    p_en: 'Morning briefing, task suggestions, and chat-driven control. Everything the grow manager needs in one thread.',
    p_fr: 'Briefing du matin, suggestions de tâches et contrôle par chat. Tout ce qu\'il faut en un seul fil.',
    spark: [6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,12,12,11,11,10,10,9,8,7],
  },
];

function UseCases({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  return (
    <section id="usecases" className="usecase-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>{t('Use cases','Cas d\u2019usage')}</span>
          <h2>{t('Designed for real greenhouse operations.','Conçu pour les vraies opérations de serre.')}</h2>
        </div>
        <div className="usecase-grid">
          {USECASES.map((u, i) => (
            <div className="usecase" key={i}>
              <span className="tag">{Icons.spark}{t(u.tag_en, u.tag_fr)}</span>
              <h3>{t(u.t_en, u.t_fr)}</h3>
              <p>{t(u.p_en, u.p_fr)}</p>
              <div className="spark" aria-hidden="true">
                {u.spark.map((v, j) => {
                  const max = Math.max(...u.spark);
                  const cls = u.warnIx?.includes(j) ? 'warn' : u.hiIx?.includes(j) ? 'hi' : '';
                  return <i key={j} className={cls} style={{ height: `${(v / max) * 100}%` }} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Product screens ----------
function ProductScreens({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  return (
    <section id="product" className="screens-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>{t('Product','Produit')}</span>
          <h2>{t('One view for the whole greenhouse.','Une vue unique pour toute la serre.')}</h2>
          <p className="sub">{t(
            'Dashboards, the pipeline builder, chat + action log, and alerts, all wired to the same live data model.',
            'Tableaux de bord, éditeur de pipeline, chat + journal d\'actions, et alertes, tous connectés au même modèle de données en direct.'
          )}</p>
        </div>

        <div className="screens-grid">
          <div className="screen">
            <div className="screen-head">
              <span className="dots"><i></i><i></i><i></i></span>
              <span className="url">serrevue.app / dashboard / zone-b</span>
            </div>
            <div className="screen-body">
              <div className="dash-grid">
                <div className="kpi"><div className="l">{t('Temp','Temp')}</div><div className="v">24.1°</div><div className="d">+0.4°</div></div>
                <div className="kpi warn"><div className="l">{t('Humidity','Humidité')}</div><div className="v">84%</div><div className="d">▲ {t('rising','en hausse')}</div></div>
                <div className="kpi"><div className="l">CO₂</div><div className="v">842</div><div className="d">{t('in range','dans la plage')}</div></div>
                <div className="kpi"><div className="l">VPD</div><div className="v">0.82</div><div className="d">-0.06</div></div>
              </div>
              <div className="zone-row">
                <span>Bay 1 · Tomato</span>
                <div className="bar"><span style={{width:'58%'}}></span></div>
                <span className="status">{t('HEALTHY','SAIN')}</span>
              </div>
              <div className="zone-row warn">
                <span>Bay 2 · Tomato</span>
                <div className="bar"><span style={{width:'82%'}}></span></div>
                <span className="status">{t('WATCH','À SURVEILLER')}</span>
              </div>
              <div className="zone-row">
                <span>Bay 3 · Pepper</span>
                <div className="bar"><span style={{width:'44%'}}></span></div>
                <span className="status">{t('HEALTHY','SAIN')}</span>
              </div>
              <div className="zone-row">
                <span>Bay 4 · Cucumber</span>
                <div className="bar"><span style={{width:'66%'}}></span></div>
                <span className="status">{t('HEALTHY','SAIN')}</span>
              </div>
            </div>
          </div>

          <div className="screen">
            <div className="screen-head">
              <span className="dots"><i></i><i></i><i></i></span>
              <span className="url">serrevue.app / actions</span>
            </div>
            <div className="screen-body" style={{gap: 0}}>
              <div className="log-row">
                <span className="dot"></span>
                <div>
                  <div style={{fontWeight:600}}>{t('Vent Loop B raised to 70%','Boucle Vent B à 70%')}</div>
                  <div style={{fontSize:12, color:'var(--ink-dimmer)'}}>{t('Approved by Marie · 30 min','Approuvé par Marie · 30 min')}</div>
                </div>
                <span className="t">09:42</span>
              </div>
              <div className="log-row warn">
                <span className="dot"></span>
                <div>
                  <div style={{fontWeight:600}}>{t('Humidity anomaly · Zone B','Anomalie d\'humidité · Zone B')}</div>
                  <div style={{fontSize:12, color:'var(--ink-dimmer)'}}>{t('Exhaust fan 3 underperforming -18%','Ventilateur 3 sous-performant -18%')}</div>
                </div>
                <span className="t">09:41</span>
              </div>
              <div className="log-row info">
                <span className="dot"></span>
                <div>
                  <div style={{fontWeight:600}}>{t('Fertigation recipe applied · Bay 2','Recette fertigation · Baie 2')}</div>
                  <div style={{fontSize:12, color:'var(--ink-dimmer)'}}>{t('Tomato-Veg-3 · EC 2.2','Tomato-Veg-3 · EC 2,2')}</div>
                </div>
                <span className="t">08:15</span>
              </div>
              <div className="log-row">
                <span className="dot"></span>
                <div>
                  <div style={{fontWeight:600}}>{t('Morning scout complete','Tournée matinale complète')}</div>
                  <div style={{fontSize:12, color:'var(--ink-dimmer)'}}>{t('4 zones · 0 critical · 1 watch','4 zones · 0 critique · 1 surveillé')}</div>
                </div>
                <span className="t">07:00</span>
              </div>
              <div className="log-row info">
                <span className="dot"></span>
                <div>
                  <div style={{fontWeight:600}}>{t('Daily report sent','Rapport quotidien envoyé')}</div>
                  <div style={{fontSize:12, color:'var(--ink-dimmer)'}}>{t('Operator + agronomist','Opérateur + agronome')}</div>
                </div>
                <span className="t">06:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Trust ----------
const TRUSTS = [
  { ic: 'shield', t_en: 'Approval workflows', t_fr: 'Approbations',       p_en: 'Every automated action runs through a configurable approval policy, per zone, per hardware, per operator role.', p_fr: 'Chaque action passe par une politique d\'approbation configurable, par zone, matériel et rôle.' },
  { ic: 'lock',   t_en: 'Permissions & audit', t_fr: 'Permissions & audit', p_en: 'Scoped roles for owners, grow managers, and technicians. Every change is logged and exportable.', p_fr: 'Rôles délimités pour propriétaires, responsables et techniciens. Chaque changement est journalisé.' },
  { ic: 'globe',  t_en: 'Bilingual support',   t_fr: 'Support bilingue',    p_en: 'Full EN / FR interface and documentation. Local Québec support team of real operators, not chatbots.', p_fr: 'Interface et documentation bilingues FR / EN. Équipe locale au Québec, de vrais opérateurs.' },
  { ic: 'layers', t_en: 'Works with your gear', t_fr: 'Compatible',          p_en: 'Modbus, MQTT, and common climate controllers supported out of the box. Keep what you already run.', p_fr: 'Modbus, MQTT et contrôleurs courants supportés. Gardez ce que vous utilisez déjà.' },
];

function Trust({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  return (
    <section id="trust" className="trust-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>{t('Trust','Confiance')}</span>
          <h2>{t('Built for real greenhouses.','Conçu pour les vraies serres.')}</h2>
          <p className="sub">{t(
            'You stay in control. SERREVUE executes with guardrails: approval workflows, scoped permissions, and a full audit trail on every zone.',
            'Vous gardez le contrôle. SERREVUE exécute avec garde-fous : approbations, permissions délimitées et journal complet par zone.'
          )}</p>
        </div>
        <div className="trust-grid">
          {TRUSTS.map((x, i) => (
            <div className="trust" key={i}>
              <div className="ic">{Icons[x.ic]}</div>
              <h3>{t(x.t_en, x.t_fr)}</h3>
              <p>{t(x.p_en, x.p_fr)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- CTA footer ----------
function CtaFooter({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;
  const [sent, setSent] = React.useState(false);
  const [contactErr, setContactErr] = React.useState(false);
  return (
    <section id="demo" className="cta-section">
      <div className="wrap">
        <div className="cta-card">
          <div className="cta-grid">
            <div>
              <span className="eyebrow"><span className="dot"></span>{t('Free pilot program','Programme pilote gratuit')}</span>
              <h2 style={{marginTop:16}}>{t('Start a free pilot in your greenhouse.','Lancez un pilote gratuit dans votre serre.')}</h2>
              <p style={{marginTop:14, maxWidth: 440}}>
                {t(
                  'One zone, one month, on us. No cost, no long commitment. We bring the brain and integrate with your existing sensors and controllers.',
                  'Une zone, un mois, offerts. Sans frais, sans engagement. Nous apportons le cerveau et intégrons vos capteurs et contrôleurs.'
                )}
              </p>
              <div style={{marginTop:22, display:'flex', gap:10, flexWrap:'wrap', fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-dim)'}}>
                <span>hello@serrevue.com</span>
                <span>·</span>
                <span>{t('Québec, Canada','Québec, Canada')}</span>
              </div>
            </div>
            <form
              className="cta-form"
              onSubmit={e => {
                e.preventDefault();
                const f = e.currentTarget;
                const email = f.elements.namedItem('email').value.trim();
                const phone = f.elements.namedItem('phone').value.trim();
                if (!email && !phone) {
                  setContactErr(true);
                  return;
                }
                setContactErr(false);

                // Forward to private Google Form backend (responses land in our private Sheet).
                try {
                  const val = (n) => { const el = f.elements.namedItem(n); return el ? el.value.trim() : ''; };
                  const body = new URLSearchParams();
                  body.append('entry.1467411753', val('name'));
                  body.append('entry.699766975',  val('company'));
                  body.append('entry.537678743',  email);
                  body.append('entry.1103888134', phone);
                  body.append('entry.1806289493', val('ghsize'));
                  fetch(
                    ['https://docs.google.com/forms/d/e',
                     '1FAIpQLSdY_ERkt6zkTihGTXqV5pIm-0_SkOeNklSkBVJBF2c8t5c1Ig',
                     'formResponse'].join('/'),
                    { method: 'POST', mode: 'no-cors', body }
                  ).catch(() => {});
                } catch (err) { /* network hiccup: still show success */ }

                setSent(true);
              }}
            >
              <div className="row">
                <div>
                  <label>{t('Name','Nom')}</label>
                  <input name="name" required placeholder={t('Jane Grower','Jean Cultivateur')} />
                </div>
                <div>
                  <label>{t('Company','Entreprise')}</label>
                  <input name="company" placeholder={t('Serres Saint-Jean','Serres Saint-Jean')} />
                </div>
              </div>
              <div className="row">
                <div>
                  <label>
                    {t('Email','Courriel')} <span style={{color:'var(--ink-dimmer)', textTransform:'none', letterSpacing:0}}>{t('(optional)','(optionnel)')}</span>
                  </label>
                  <input name="email" type="email" placeholder="you@farm.com" onChange={() => setContactErr(false)} />
                </div>
                <div>
                  <label>
                    {t('Phone','Téléphone')} <span style={{color:'var(--ink-dimmer)', textTransform:'none', letterSpacing:0}}>{t('(optional)','(optionnel)')}</span>
                  </label>
                  <input name="phone" type="tel" placeholder="+1 (418) 555-0134" onChange={() => setContactErr(false)} />
                </div>
              </div>
              <div style={{
                fontFamily:'var(--mono)', fontSize:11,
                color: contactErr ? 'var(--amber)' : 'var(--ink-dimmer)',
                marginTop: -4,
              }}>
                {contactErr
                  ? t('Please provide an email or a phone number.','Veuillez fournir un courriel ou un numéro de téléphone.')
                  : t('We\'ll reach out by whichever you prefer, email or phone.','On vous contacte comme vous préférez, courriel ou téléphone.')}
              </div>
              <div className="row">
                <div>
                  <label>{t('Greenhouse size','Taille de la serre')}</label>
                  <select name="ghsize">
                    <option>&lt; 1,000 m²</option>
                    <option>1,000 – 5,000 m²</option>
                    <option>5,000 – 20,000 m²</option>
                    <option>&gt; 20,000 m²</option>
                  </select>
                </div>
                <div>
                  <label>{t('Main crop','Culture principale')}</label>
                  <input placeholder={t('Tomato, pepper, cannabis…','Tomate, poivron, cannabis…')} />
                </div>
              </div>
              <div>
                <label>{t('What would you automate first?','Qu\'aimeriez-vous automatiser en premier?')}</label>
                <textarea rows="2" placeholder={t('Climate, irrigation, scouting…','Climat, arrosage, dépistage…')}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}}>
                {sent
                  ? <>{Icons.check} {t('Received, talk soon','Reçu, à bientôt')}</>
                  : <>{t('Request pilot','Demander un pilote')} <span className="arrow">→</span></>}
              </button>
            </form>
          </div>
        </div>

        <footer className="site">
          <div className="foot">
            <span className="logo"><span className="logo-mark"></span> SERREVUE</span>
            <span style={{color:'var(--ink-dimmer)', fontFamily:'var(--mono)', fontSize:11}}>
              © 2026 · {t('Québec, Canada','Québec, Canada')}
            </span>
            <span className="links">
              <a href="#how">{t('How it works','Comment ça marche')}</a>
              <a href="#product">{t('Product','Produit')}</a>
              <a href="#trust">{t('Trust','Confiance')}</a>
              <a href="#demo">{t('Contact','Contact')}</a>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, PipelineSection, Benefits, UseCases, ProductScreens, Trust, CtaFooter });
