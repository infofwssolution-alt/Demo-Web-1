// Capture pass v3: fresh real-site assets + geometry for the 2:30 promo
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE = 'http://localhost:5173/#';
const out = (f) => path.resolve('public', f);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

// 1. Home, launcher closed
await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' });
await wait(1800);
await page.screenshot({ path: out('v3-home.png') });
console.log('home');

// 2. Full-page home for the scrolling site tour (lower DPR to keep the texture size sane)
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1.25 });
await wait(600);
await page.evaluate(() => {
  const h = document.querySelector('#ai-chatbot-widget-host');
  if (h) h.style.display = 'none';
});
await page.screenshot({ path: out('v3-home-full.png'), fullPage: true });
const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
console.log('home full', fullHeight);
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

// 3. Other pages (top of page)
for (const [route, file] of [
  ['/platform', 'v3-platform.png'],
  ['/hardware', 'v3-hardware.png'],
  ['/solutions', 'v3-solutions.png'],
  ['/pricing', 'v3-pricing.png'],
]) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle2' });
  await wait(1200);
  await page.screenshot({ path: out(file) });
  console.log(route);
}

// 4. Contact form, placeholders stripped so we can animate typing on top
await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle2' });
await wait(1200);
await page.evaluate(() => window.scrollTo(0, 420));
await wait(500);
const formGeo = await page.evaluate(() => {
  const pick = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      x: r.x, y: r.y, w: r.width, h: r.height,
      padL: parseFloat(cs.paddingLeft), padT: parseFloat(cs.paddingTop),
      font: cs.fontFamily, size: parseFloat(cs.fontSize), color: cs.color, lh: cs.lineHeight,
    };
  };
  const q = (s) => document.querySelector(s);
  const geo = {
    name: pick(q('input[placeholder="Dr. Evelyn Scott"]')),
    email: pick(q('input[placeholder="escott@biologics.com"]')),
    company: pick(q('input[placeholder="Apex Logistics Inc."]')),
    notes: pick(q('textarea')),
    submit: pick(q('form button[type="submit"]')),
  };
  document.querySelectorAll('input, textarea').forEach((el) => (el.placeholder = ''));
  return geo;
});
await page.screenshot({ path: out('v3-contact-empty.png') });

await page.type('input[type="text"]', 'Dr. Evelyn Scott');
await page.type('input[type="email"]', 'e.scott@apexbiologics.com');
await page.evaluate(() => {
  const inputs = document.querySelectorAll('form input[type="text"]');
  inputs[1].focus();
});
await page.keyboard.type('Apex Biologics Distribution');
await page.type('textarea', 'Monitoring 6 cold rooms at -20°C and 18 reefer trailers.');
await page.evaluate(() => document.querySelector('form button[type="submit"]').click());
await wait(1200);
await page.screenshot({ path: out('v3-contact-success.png') });
console.log('contact');

// 5. Mobile: real widget, real conversation
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await mobile.goto(`${BASE}/`, { waitUntil: 'networkidle2' });
await wait(1800);
await mobile.screenshot({ path: out('v3-mobile-home.png') });
await mobile.evaluate(() => {
  const sr = document.querySelector('#ai-chatbot-widget-host').shadowRoot;
  sr.querySelector('#chatLauncher').click();
});
await wait(900);
await mobile.evaluate(() => {
  const sr = document.querySelector('#ai-chatbot-widget-host').shadowRoot;
  const input = sr.querySelector('#chatInput');
  input.value = 'Is there a free trial?';
  sr.querySelector('#sendBtn').click();
});
for (let i = 0; i < 40; i++) {
  await wait(500);
  const done = await mobile.evaluate(() => {
    const sr = document.querySelector('#ai-chatbot-widget-host').shadowRoot;
    return !sr.querySelector('#sendBtn').disabled && sr.querySelectorAll('.message-wrapper').length >= 3;
  });
  if (done) break;
}
await wait(800);
await mobile.screenshot({ path: out('v3-mobile-chat.png') });
console.log('mobile');

fs.writeFileSync('src/geometry.json', JSON.stringify({ fullHeight, fullDpr: 1.25, form: formGeo }, null, 2));
await browser.close();
console.log('done');
