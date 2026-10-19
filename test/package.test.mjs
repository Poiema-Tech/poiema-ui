import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const pkg = JSON.parse(read('package.json'));

test('package stays private and proprietary', () => {
  assert.equal(pkg.private, true, 'package.json must keep "private": true so it can never be published');
  assert.equal(pkg.license, 'SEE LICENSE IN LICENSE');
  assert.ok(existsSync(join(root, 'LICENSE')));
  assert.match(read('dist/poiema.css'), /^\/\*![^\n]*proprietary/);
});

test('every package export points to a built file', () => {
  for (const [key, target] of Object.entries(pkg.exports)) {
    const targets = typeof target === 'string' ? [target] : Object.values(target);
    for (const t of targets) {
      if (t.includes('*')) continue;
      assert.ok(existsSync(join(root, t)), `${key} -> ${t} is missing`);
    }
  }
  assert.ok(existsSync(join(root, 'dist/assets/gem.svg')));
});

test('ESM entry exposes the documented API and is SSR-safe to import', async () => {
  const mod = await import(join(root, 'dist/poiema.js'));
  for (const name of ['init', 'reveal', 'stagger', 'tilt', 'cycle', 'copy', 'countdown', 'opener', 'dialog', 'toast', 'daysUntil', 'behaviors']) {
    assert.ok(name in mod, `missing export ${name}`);
  }
  assert.equal(typeof mod.init(null), 'function', 'init without a DOM returns a no-op cleanup');
  mod.toast('no DOM, no crash');
});

test('daysUntil rounds up and never goes negative', async () => {
  const { daysUntil } = await import(join(root, 'dist/poiema.js'));
  const now = new Date('2026-10-18T12:00:00-03:00');
  assert.equal(daysUntil('2026-11-13T00:00:00-03:00', now), 26);
  assert.equal(daysUntil('2026-10-18T12:00:00-03:00', now), 0);
  assert.equal(daysUntil('2020-01-01', now), 0);
});

test('classic auto script defines window.Poiema and auto-inits', () => {
  let ready;
  const documentElement = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; }, nodeType: 1, matches: () => false, querySelectorAll: () => [] };
  const sandbox = {
    window: {},
    document: { readyState: 'loading', nodeType: 9, documentElement, addEventListener: (_, fn) => { ready = fn; } },
  };
  vm.runInNewContext(read('dist/poiema.auto.js'), sandbox);
  assert.equal(typeof sandbox.window.Poiema.init, 'function');
  assert.equal(typeof sandbox.window.Poiema.toast, 'function');
  ready();
  assert.ok('data-pm-ready' in documentElement.attrs, 'init() marks the document ready');
});

test('tokens module matches tokens.json and resolves references', async () => {
  const { tokens, cssVar } = await import(join(root, 'dist/tokens.js'));
  assert.deepEqual(tokens, JSON.parse(read('dist/tokens.json')));
  assert.equal(tokens.color.light.canvas, '#e2e2e2');
  assert.equal(tokens.color.dark.ink, '#f7f7f7');
  assert.equal(tokens.color.light.danger, tokens.primitives['clay-deep']);
  assert.equal(cssVar('ink'), 'var(--pm-ink)');
});

test('CSS bundle: layered, balanced, minified copy equivalent in structure', () => {
  const css = read('dist/poiema.css');
  const min = read('dist/poiema.min.css');
  assert.match(css, /^\/\*![^\n]*\n@layer poiema\.tokens, poiema\.base, poiema\.components, poiema\.utilities;/);
  const count = (s, ch) => s.replace(/\/\*[\s\S]*?\*\//g, '').split(ch).length - 1;
  assert.equal(count(css, '{'), count(css, '}'));
  assert.equal(count(min, '{'), count(css, '{'));
  for (const cls of ['.pm-btn', '.pm-card', '.pm-callout', '.pm-ring', '.pm-ticket__dates', '.pm-dialog', '.pm-input']) {
    assert.ok(css.includes(cls), `${cls} missing from bundle`);
  }
  assert.ok(!/#[0-9a-f]{3,8}\b/i.test(read('src/css/components.css').replace(/\/\*[\s\S]*?\*\//g, '').replace(/rgba?\([^)]*\)/g, '')),
    'components.css should use tokens, not hex literals');
});

test('every class documented in components.md exists in the CSS', () => {
  const css = read('dist/poiema.css');
  const documented = new Set([...read('docs/components.md').matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => c.startsWith('pm-')));
  const missing = [...documented].filter((c) => !css.includes(`.${c}`));
  assert.deepEqual(missing, []);
});

test('skills have valid frontmatter (name = folder, description <= 1024 chars)', () => {
  const dirs = readdirSync(join(root, 'skills'));
  assert.deepEqual(dirs.sort(), ['poiema-design', 'poiema-review', 'poiema-voice']);
  for (const d of dirs) {
    const md = read(`skills/${d}/SKILL.md`);
    const fm = md.match(/^---\n([\s\S]*?)\n---/)[1];
    assert.equal(fm.match(/^name: (.+)$/m)[1].trim(), d);
    const desc = fm.match(/^description: (.+)$/m)[1].trim();
    assert.ok(desc.length > 50 && desc.length <= 1024, `${d} description length ${desc.length}`);
    for (const ref of md.matchAll(/`(references\/[\w.-]+\.md)`/g)) {
      assert.ok(existsSync(join(root, 'skills', d, ref[1])), `${d}: ${ref[1]} missing`);
    }
  }
});

test('plugin and marketplace manifests agree', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  const market = JSON.parse(read('.claude-plugin/marketplace.json'));
  assert.equal(market.plugins[0].name, plugin.name);
  assert.equal(plugin.version, pkg.version);
});

test('npx poiema-ui init installs skills and is idempotent', () => {
  const dir = mkdtempSync(join(tmpdir(), 'poiema-init-'));
  try {
    const run = () => execFileSync(process.execPath, [join(root, 'bin/poiema-ui.mjs'), 'init'], { cwd: dir, encoding: 'utf8' });
    run();
    assert.ok(existsSync(join(dir, '.claude/skills/poiema-design/SKILL.md')));
    assert.ok(existsSync(join(dir, '.claude/skills/poiema-voice/references/voice.md')));
    const first = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
    assert.match(first, /poiema-ui:start[\s\S]*AGENTS\.md[\s\S]*poiema-ui:end/);
    const out = run();
    assert.match(out, /AGENTS\.md unchanged/);
    assert.equal(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), first);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('init points agents at node_modules/poiema-ui when the package is symlinked (pnpm)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'poiema-init-pnpm-'));
  try {
    mkdirSync(join(dir, 'node_modules'));
    symlinkSync(root, join(dir, 'node_modules', pkg.name), 'dir');
    writeFileSync(join(dir, 'CLAUDE.md'), '# App\n');
    execFileSync(process.execPath, [join(dir, 'node_modules', pkg.name, 'bin/poiema-ui.mjs'), 'init'], { cwd: dir, encoding: 'utf8' });
    assert.match(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), /`node_modules\/poiema-ui\/AGENTS\.md`/);
    assert.match(readFileSync(join(dir, 'CLAUDE.md'), 'utf8'), /^@node_modules\/poiema-ui\/AGENTS\.md$/m);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
