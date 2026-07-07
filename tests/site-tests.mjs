#!/usr/bin/env node
// SerreVue site tests. Run on every deploy (GitHub Actions) and locally before push.
//   node tests/site-tests.mjs --static     fast checks, no browser
//   node tests/site-tests.mjs --rendered   puppeteer checks against SITE_URL (default http://127.0.0.1:8080)
//   node tests/site-tests.mjs              both
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_PAGES = ['index.html', 'suite.html', '404.html'];
const I18N_PAGES = ['index.html', 'suite.html'];
const BRAND_GREENS = ['#2C6B43', '#3F8E5B'];
const FONTS = ['Space Grotesk', 'Fraunces', 'Inter'];

let failures = [], warnings = [], passes = 0;
const ok = (name) => { passes++; console.log(`  ok  ${name}`); };
const fail = (name, detail) => { failures.push(name); console.log(`FAIL  ${name}${detail ? ' :: ' + detail : ''}`); };
const warn = (name, detail) => { warnings.push(name); console.log(`warn  ${name}${detail ? ' :: ' + detail : ''}`); };
const read = (f) => readFileSync(resolve(ROOT, f), 'utf8');

function staticTests() {
  console.log('\n== static checks ==');

  // repo plumbing
  existsSync(resolve(ROOT, '.nojekyll')) ? ok('.nojekyll exists') : fail('.nojekyll exists');
  if (existsSync(resolve(ROOT, 'CNAME'))) {
    read('CNAME').trim() === 'serrevue.com' ? ok('CNAME is serrevue.com') : fail('CNAME is serrevue.com', read('CNAME').trim());
  } else fail('CNAME exists');
  for (const a of ['favicon.svg', 'og.png', 'apple-touch-icon.png']) {
    existsSync(resolve(ROOT, a)) ? ok(`asset ${a} exists`) : fail(`asset ${a} exists`);
  }

  for (const page of PUBLIC_PAGES) {
    if (!existsSync(resolve(ROOT, page))) { fail(`${page} exists`); continue; }
    const html = read(page);

    // technical basics
    /<title>[^<]+<\/title>/.test(html) ? ok(`${page}: <title>`) : fail(`${page}: <title>`);
    /<html[^>]+lang=/.test(html) ? ok(`${page}: <html lang>`) : fail(`${page}: <html lang>`);
    /name="viewport"/.test(html) ? ok(`${page}: viewport meta`) : fail(`${page}: viewport meta`);

    // brand copy rule: no em dashes in public copy
    const em = (html.match(/—/g) || []).length;
    em === 0 ? ok(`${page}: no em dashes`) : fail(`${page}: no em dashes`, `${em} found`);

    // local references resolve
    const refs = [...html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)].map(m => m[1])
      .filter(u => !/^(https?:|mailto:|data:|#|\/\/)/.test(u))
      .map(u => u.replace(/[?#].*$/, '').replace(/^\.?\//, ''))
      .filter(u => u.length);
    const missing = [...new Set(refs)].filter(u => !existsSync(resolve(ROOT, u)));
    missing.length === 0 ? ok(`${page}: local hrefs/srcs resolve (${refs.length})`) : fail(`${page}: local hrefs/srcs resolve`, missing.join(', '));
  }

  for (const page of I18N_PAGES) {
    const html = read(page);

    // brand identity present
    for (const f of FONTS) html.includes(f) ? ok(`${page}: font ${f}`) : fail(`${page}: font ${f}`);
    BRAND_GREENS.some(g => html.toLowerCase().includes(g.toLowerCase())) ? ok(`${page}: brand greens`) : fail(`${page}: brand greens`);
    /class="vue"/.test(html) ? ok(`${page}: SerreVue wordmark structure`) : fail(`${page}: SerreVue wordmark structure`);

    // i18n attribute parity: every tag with data-en has data-fr and vice versa
    const tags = html.match(/<[a-zA-Z][^>]*>/g) || [];
    const badTags = tags.filter(t => (/\bdata-en="/.test(t) !== /\bdata-fr="/.test(t)));
    badTags.length === 0 ? ok(`${page}: data-en/data-fr parity per tag`) : fail(`${page}: data-en/data-fr parity per tag`, badTags.slice(0, 3).join(' | '));
    const badHref = tags.filter(t => (/\bdata-en-href="/.test(t) !== /\bdata-fr-href="/.test(t)));
    badHref.length === 0 ? ok(`${page}: data-en-href/data-fr-href parity`) : fail(`${page}: data-en-href/data-fr-href parity`, badHref.slice(0, 3).join(' | '));

    // no empty translations
    const empty = tags.filter(t => /\bdata-(en|fr)=""/.test(t));
    empty.length === 0 ? ok(`${page}: no empty translations`) : fail(`${page}: no empty translations`, empty.slice(0, 3).join(' | '));
  }

  // suite.html JS content dictionaries: en:/fr: key counts must match
  const suite = read('suite.html');
  const enKeys = (suite.match(/\ben\s*:\s*["']/g) || []).length;
  const frKeys = (suite.match(/\bfr\s*:\s*["']/g) || []).length;
  enKeys === frKeys ? ok(`suite.html: JS dict en/fr key parity (${enKeys})`) : fail('suite.html: JS dict en/fr key parity', `en:${enKeys} fr:${frKeys}`);
}

async function renderedTests() {
  console.log('\n== rendered checks ==');
  const base = process.env.SITE_URL || 'http://127.0.0.1:8080';
  let puppeteer;
  try { puppeteer = (await import('puppeteer')).default; }
  catch { fail('puppeteer available', 'npm install puppeteer first'); return; }

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  try {
    for (const page of ['index.html', 'suite.html']) {
      const p = await browser.newPage();
      const pageErrors = [], consoleErrors = [];
      p.on('pageerror', e => pageErrors.push(String(e)));
      p.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
      await p.setViewport({ width: 1440, height: 1000 });
      const resp = await p.goto(`${base}/${page}`, { waitUntil: 'networkidle2', timeout: 45000 });
      resp && resp.ok() ? ok(`${page}: HTTP ${resp.status()}`) : fail(`${page}: HTTP ok`, resp ? String(resp.status()) : 'no response');
      await new Promise(r => setTimeout(r, 1200));

      pageErrors.length === 0 ? ok(`${page}: no uncaught JS errors`) : fail(`${page}: no uncaught JS errors`, pageErrors.slice(0, 2).join(' | '));
      const netErrs = consoleErrors.filter(t => !/favicon/i.test(t));
      netErrs.length === 0 ? ok(`${page}: no console errors`) : warn(`${page}: console errors`, netErrs.slice(0, 2).join(' | '));

      const textLen = await p.evaluate(() => document.body.innerText.trim().length);
      textLen > 100 ? ok(`${page}: renders visible text (${textLen} chars)`) : fail(`${page}: renders visible text`, `${textLen} chars`);

      const font = await p.evaluate(() => { const h = document.querySelector('h1'); return h ? getComputedStyle(h).fontFamily : ''; });
      /Space Grotesk/.test(font) ? ok(`${page}: h1 uses Space Grotesk`) : fail(`${page}: h1 uses Space Grotesk`, font);

      // language toggle EN -> FR
      const hasFr = await p.evaluate(() => !!document.querySelector('.lang-btn[data-lang="fr"]'));
      if (hasFr) {
        await p.click('.lang-btn[data-lang="fr"]');
        await new Promise(r => setTimeout(r, 400));
        const frApplied = await p.evaluate(() => {
          const els = [...document.querySelectorAll('[data-en]')];
          const wrong = els.filter(el => {
            const fr = el.getAttribute('data-fr'), en = el.getAttribute('data-en');
            return fr && en && fr !== en && el.textContent.trim() === en.trim();
          });
          return { total: els.length, wrong: wrong.length, sample: wrong.slice(0, 3).map(e => e.getAttribute('data-en')) };
        });
        frApplied.wrong === 0 ? ok(`${page}: FR applies to all ${frApplied.total} translated nodes`) : fail(`${page}: FR applies everywhere`, `${frApplied.wrong} still EN, e.g. ${frApplied.sample.join(', ')}`);
      } else warn(`${page}: no FR toggle found`);

      // page-specific content checks
      if (page === 'suite.html') {
        const chip = await p.evaluate(() => { const b = document.querySelector('.mchip[data-m="humid"] .mval'); return b ? b.textContent.trim() : null; });
        chip === '1.0 kPa' ? ok('suite.html: VPD chip value 1.0 kPa') : fail('suite.html: VPD chip value', String(chip));
        const dpv = await p.evaluate(() => { const s = document.querySelector('.mchip[data-m="humid"] [data-en]'); return s ? s.textContent.trim() : null; });
        dpv === 'DPV' ? ok('suite.html: VPD chip label is DPV in FR') : fail('suite.html: VPD chip label in FR', String(dpv));
      }

      // mobile sanity (warning only)
      await p.setViewport({ width: 390, height: 844 });
      await new Promise(r => setTimeout(r, 500));
      const overflow = await p.evaluate(() => document.scrollingElement.scrollWidth - window.innerWidth);
      overflow <= 2 ? ok(`${page}: no horizontal overflow at 390px`) : warn(`${page}: horizontal overflow at 390px`, `${overflow}px`);

      await p.close();
    }
  } finally { await browser.close(); }
}

const args = process.argv.slice(2);
const doStatic = args.includes('--static') || args.length === 0;
const doRendered = args.includes('--rendered') || args.length === 0;
if (doStatic) staticTests();
if (doRendered) await renderedTests();

console.log(`\n${passes} passed, ${warnings.length} warnings, ${failures.length} failures`);
if (failures.length) { console.log('FAILED:', failures.join(' ; ')); process.exit(1); }
