#!/usr/bin/env node
// Regenerates screenshots/ (used by the README) from demo/index.html.
// Needs Playwright with Chromium, which is not a dependency of this package:
//   npm i --no-save playwright && npx playwright install chromium
// Shots are taken with reduced motion so every frame is settled and repeatable.
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (name) => join(root, 'screenshots', name);
const url = pathToFileURL(join(root, 'demo/index.html')).href;

const { chromium } = await import('playwright').catch(() => {
  console.error('Playwright is not installed. Run: npm i --no-save playwright && npx playwright install chromium');
  process.exit(1);
});

mkdirSync(join(root, 'screenshots'), { recursive: true });
const browser = await chromium.launch();

async function open({ width, height, theme = 'light' }) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  if (theme === 'dark') await page.click('#theme'); // the demo's own toggle, so its label reads right
  await page.evaluate(() => document.fonts.ready);
  return page;
}

// A component with a margin of canvas around it; sticky bars are unstuck so they don't overlap.
async function element(page, selector, file, { pad = 16, maxHeight = Infinity } = {}) {
  await page.addStyleTag({ content: '.pm-topbar, .pm-pillnav--sticky { position: static !important; }' });
  const height = await page.$eval(selector, (el) => el.getBoundingClientRect().height);
  const h = Math.ceil(Math.min(height, maxHeight));
  await page.setViewportSize({ width: page.viewportSize().width, height: h + pad * 2 });
  await page.$eval(selector, (el, p) => scrollTo({ top: el.getBoundingClientRect().top + scrollY - p, behavior: 'instant' }), pad);
  const r = await page.$eval(selector, (el) => el.getBoundingClientRect().toJSON());
  await page.screenshot({ path: out(file), clip: { x: r.left - pad, y: r.top - pad, width: r.width + pad * 2, height: h + pad * 2 } });
}

// What a phone shows after scrolling to a section (sticky bars included).
async function phone(page, selector, file) {
  if (selector) await page.$eval(selector, (el) => scrollTo({ top: el.getBoundingClientRect().top + scrollY - 128, behavior: 'instant' }));
  await page.screenshot({ path: out(file) });
}

const shots = [];
for (const theme of ['light', 'dark']) {
  const p = await open({ width: 1280, height: 800, theme });
  await p.screenshot({ path: out(`hero-${theme}.png`) });
  shots.push(`hero-${theme}.png`);
}

const desk = await open({ width: 1280, height: 800 });
for (const [selector, file, opts] of [
  ['#b1', 'feature.png'],
  ['#b6', 'voice.png'],
  ['#b4', 'components.png', { maxHeight: 890 }],
  ['#b5', 'forms.png'],
  ['#b7 .pm-ticket', 'ticket.png'],
]) {
  await element(desk, selector, file, opts);
  shots.push(file);
}

const mobile = await open({ width: 390, height: 844 });
for (const [selector, file] of [[null, 'mobile-hero.png'], ['#b2', 'mobile-card.png'], ['#b7', 'mobile-ticket.png']]) {
  await phone(mobile, selector, file);
  shots.push(file);
}

await browser.close();
console.log(`screenshots/ ← ${shots.join(', ')}`);
