// Integrations section — "Plays well with your stack"
// Shows messaging/email tools SERREVUE can send notifications and receive commands through.

const INTEGRATIONS_CSS = `
  .integrations-section {
    padding: 80px 0 60px;
    background: var(--bg);
  }
  .integrations-section .section-head { margin-bottom: 48px; }
  .integrations-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
    align-items: stretch;
  }
  @media (max-width: 900px) { .integrations-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .integrations-grid { grid-template-columns: 1fr; } }

  .int-card {
    position: relative;
    display: grid; gap: 14px; align-content: start;
    padding: 22px 20px 20px;
    border-radius: 16px;
    background: var(--panel);
    border: 1px solid var(--line);
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    cursor: var(--cursor-glove-point);
  }
  .int-card:hover {
    transform: translateY(-3px);
    border-color: var(--leaf);
    box-shadow: 0 14px 30px rgba(30,44,36,0.08);
  }
  .int-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: grid; place-items: center;
    background: var(--panel-2);
    border: 1px solid var(--line);
    flex-shrink: 0;
  }
  .int-card h4 {
    font-family: var(--display);
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
  }
  .int-card p {
    font-size: 12.5px;
    line-height: 1.45;
    color: var(--ink-dim);
    margin: 0;
  }
  .int-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px 8px; border-radius: 999px;
    background: var(--leaf-soft);
    color: var(--leaf-deep);
    font-family: var(--mono); font-size: 10px;
    letter-spacing: 0.06em; text-transform: uppercase;
    width: fit-content;
  }
  .int-pill .pd { width: 5px; height: 5px; border-radius: 50%; background: var(--leaf); }

  .int-more {
    margin-top: 28px;
    display: flex; align-items: center; gap: 14px;
    padding: 16px 20px;
    border-radius: 14px;
    background: var(--panel-2);
    border: 1px dashed var(--line);
    font-size: 13px;
    color: var(--ink-dim);
  }
  .int-more strong { color: var(--ink); font-weight: 600; }
`;

// --- Logo components (real brand marks, traced as inline SVG) ---
const IntLogos = {
  teams: () => (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="14" y="6" width="16" height="16" rx="2" fill="#4B53BC"/>
      <text x="22" y="18" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" fill="#fff">T</text>
      <circle cx="10" cy="10" r="3.2" fill="#7B83EB"/>
      <path d="M4 14h12v10a3 3 0 01-3 3h-6a3 3 0 01-3-3V14z" fill="#7B83EB"/>
      <text x="10" y="24" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#fff">t</text>
    </svg>
  ),
  outlook: () => (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="14" y="6" width="14" height="18" rx="1.5" fill="#fff" stroke="#0364B8" strokeWidth="0.5"/>
      <rect x="14" y="6" width="14" height="4" fill="#0364B8"/>
      <rect x="16" y="11" width="10" height="2" fill="#D0D6E4"/>
      <rect x="16" y="14" width="10" height="2" fill="#D0D6E4"/>
      <rect x="16" y="17" width="6"  height="2" fill="#D0D6E4"/>
      <rect x="2" y="8" width="16" height="16" rx="2" fill="#0364B8"/>
      <text x="10" y="20" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fontStyle="italic" fill="#fff">O</text>
    </svg>
  ),
  gmail: () => (
    <svg width="26" height="20" viewBox="0 0 32 24" aria-hidden="true">
      <path d="M2 4v16a2 2 0 002 2h3V11L2 4z" fill="#4285F4"/>
      <path d="M30 4v16a2 2 0 01-2 2h-3V11l5-7z" fill="#34A853"/>
      <path d="M7 22h18V11L16 18 7 11v11z" fill="#EA4335"/>
      <path d="M7 4l9 7 9-7v7L16 18 7 11V4z" fill="#FBBC04"/>
      <path d="M2 4l5 7V4H4a2 2 0 00-2 2v-2z" fill="#C5221F"/>
      <path d="M30 4l-5 7V4h3a2 2 0 012 2v-2z" fill="#C5221F"/>
      <path d="M2 4h28L16 14 2 4z" fill="#EA4335"/>
    </svg>
  ),
  whatsapp: () => (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.5.7 4.8 1.9 6.8L3 29l6.4-1.7c1.9 1 4.1 1.6 6.6 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3z" fill="#25D366"/>
      <path d="M22.8 19.5c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.3-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z" fill="#fff"/>
    </svg>
  ),
  imessage: () => (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="imsg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5EE167"/>
          <stop offset="100%" stopColor="#3AC62D"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#imsg-grad)"/>
      <path d="M16 8c-5.5 0-10 3.6-10 8.1 0 2.4 1.3 4.6 3.5 6.1v3.3l3.3-1.9c1 .3 2.1.5 3.2.5 5.5 0 10-3.6 10-8.1S21.5 8 16 8z" fill="#fff"/>
    </svg>
  ),
};

function IntegrationsSection({ lang }) {
  const t = (en, fr) => lang === 'FR' ? fr : en;

  React.useEffect(() => {
    if (document.getElementById('integrations-css')) return;
    const s = document.createElement('style');
    s.id = 'integrations-css';
    s.textContent = INTEGRATIONS_CSS;
    document.head.appendChild(s);
  }, []);

  const items = [
    {
      key: 'teams',
      Logo: IntLogos.teams,
      name: 'Microsoft Teams',
      desc_en: 'Drop alerts into your ops channel and approve actions with a reaction.',
      desc_fr: 'Envoie les alertes dans votre canal et approuvez avec une réaction.',
    },
    {
      key: 'outlook',
      Logo: IntLogos.outlook,
      name: 'Outlook',
      desc_en: 'Morning summary in your inbox, weekly reports with charts and trends.',
      desc_fr: 'Résumé du matin dans votre boîte, rapports hebdomadaires avec graphiques.',
    },
    {
      key: 'gmail',
      Logo: IntLogos.gmail,
      name: 'Gmail',
      desc_en: 'Same summaries and incident reports, tagged so they thread cleanly.',
      desc_fr: 'Mêmes résumés et rapports, étiquetés pour un fil clair.',
    },
    {
      key: 'whatsapp',
      Logo: IntLogos.whatsapp,
      name: 'WhatsApp',
      desc_en: 'Chat with your greenhouse, send commands, get photos back from the cameras.',
      desc_fr: 'Clavardez avec votre serre, commandes et photos directes des caméras.',
    },
    {
      key: 'imessage',
      Logo: IntLogos.imessage,
      name: 'iMessage',
      desc_en: 'Critical alerts go straight to your lock screen. Reply YES to confirm.',
      desc_fr: 'Alertes critiques directement sur votre écran. Répondez OUI pour confirmer.',
    },
  ];

  return (
    <section id="integrations" className="integrations-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>{t('Compatible integrations','Intégrations compatibles')}</span>
          <h2>{t('Plays well with your stack.','S\u2019intègre à vos outils.')}</h2>
          <p style={{maxWidth:640, marginTop:14, fontSize:15, color:'var(--ink-dim)'}}>
            {t(
              'SERREVUE reaches you where you already work. Get alerts, daily summaries, and approve actions from the apps your team already opens every morning.',
              'SERREVUE vous rejoint là où vous travaillez déjà. Alertes, résumés quotidiens et approbations depuis les applications que votre équipe utilise chaque matin.'
            )}
          </p>
        </div>

        <div className="integrations-grid">
          {items.map(({ key, Logo, name, desc_en, desc_fr }) => (
            <div key={key} className="int-card">
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10}}>
                <div className="int-logo"><Logo /></div>
                <span className="int-pill"><span className="pd"></span>{t('live','actif')}</span>
              </div>
              <h4>{name}</h4>
              <p>{t(desc_en, desc_fr)}</p>
            </div>
          ))}
        </div>

        <div className="int-more">
          <span style={{
            width:34, height:34, borderRadius:10,
            background:'var(--panel)', border:'1px solid var(--line)',
            display:'grid', placeItems:'center', flexShrink:0,
            color:'var(--leaf-deep)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </span>
          <span>
            <strong>{t('Using something else?','Vous utilisez autre chose\u00A0?')}</strong>{' '}
            {t(
              'Slack, Telegram, SMS, webhook. If it has an API, we probably already speak to it. Ask us.',
              'Slack, Telegram, SMS, webhook. Si ça a une API, on s\u2019y branche probablement déjà. Demandez-nous.'
            )}
          </span>
        </div>
      </div>
    </section>
  );
}

window.IntegrationsSection = IntegrationsSection;
