import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
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
  for (const name of ['init', 'reveal', 'stagger', 'tilt', 'cycle', 'copy', 'countdown', 'opener', 'dialog', 'clear', 'menu', 'popmenu', 'bars', 'toast', 'daysUntil', 'behaviors']) {
    assert.ok(name in mod, `missing export ${name}`);
  }
  assert.equal(typeof mod.init(null), 'function', 'init without a DOM returns a no-op cleanup');
  mod.toast('no DOM, no crash');
});

test('copy says its result to screen readers, and writes nothing until it is pressed', async () => {
  const { copy } = await import(join(root, 'dist/poiema.js'));
  const wait = (ms) => new Promise((done) => setTimeout(done, ms));
  const element = () => ({
    textContent: '', children: [], attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    appendChild(child) { this.children.push(child); },
    querySelector() { return this.children[0] ?? null; },
  });
  const button = (host) => ({
    ...element(),
    hasAttribute: () => false,
    removeAttribute() {},
    closest: () => host,
    addEventListener(_, press) { this.press = press; },
    removeEventListener() {},
  });
  const body = element();
  const dialog = element();
  let write = async () => {};
  const realNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText: () => write() } } });
  globalThis.document = { body, createElement: element };
  try {
    const onPage = button(null);
    copy(onPage, { text: 'x', duration: 200 });
    assert.equal(body.children.length, 0, 'mounting must not write to the page, or hydration breaks');

    await onPage.press();
    const [region] = body.children;
    assert.equal(region.attributes['aria-live'], 'polite');
    assert.equal(region.className, 'pm-sr-only');
    assert.equal(region.textContent, '', 'text set as a region appears gets missed');
    await wait(150);
    assert.equal(region.textContent, 'Copied');

    await onPage.press();
    assert.equal(region.textContent, '', 'a repeat only counts as a change if it empties first');
    assert.equal(body.children.length, 1, 'one region, reused');
    await wait(150);
    assert.equal(region.textContent, 'Copied');
    await wait(250);
    assert.equal(region.textContent, '', 'gone with the label, not left in the reading order');

    write = () => Promise.reject(new Error('denied'));
    await onPage.press();
    await wait(150);
    assert.equal(region.textContent, 'Could not copy');

    const nothing = button(null);
    let wrote = false;
    write = async () => { wrote = true; };
    copy(nothing, { text: '', duration: 200 });
    await nothing.press();
    assert.equal(wrote, false, 'nothing to copy must not wipe the clipboard');
    assert.equal(nothing.attributes['data-pm-feedback'], 'Could not copy');

    const inDialog = button(dialog);
    copy(inDialog, { text: 'x', duration: 200 });
    write = async () => {};
    await inDialog.press();
    await wait(150);
    assert.equal(dialog.children[0].textContent, 'Copied', 'outside an open modal, a region stays silent');
    assert.equal(body.children.length, 1);
  } finally {
    delete globalThis.document;
    if (realNavigator) Object.defineProperty(globalThis, 'navigator', realNavigator);
    else delete globalThis.navigator;
  }
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

test('app register re-points tokens without touching the site defaults', () => {
  const css = read('dist/tokens.css');
  const T = JSON.parse(read('src/tokens.json'));
  assert.match(css, /\.pm-app, \.pm-shell \{[^}]*--pm-text-h1: clamp\(26px/);
  assert.match(css, /--pm-text-h1: clamp\(40px, 7vw, 88px\);/, 'the gallery title stays huge at :root');
  assert.match(css, /@media \(pointer: fine\) \{\s*\.pm-app, \.pm-shell \{[^}]*--pm-field-text: 14px/, 'small fields only with a mouse');
  assert.equal(T.app.tokens['field-text'], undefined, 'fields stay at the 16px default on touch, or iOS zooms');
  assert.equal(T.layout['field-text'].value, '16px');
});

test('a coarse pointer grows small targets at :root, and the app register keeps its own', () => {
  const css = read('dist/tokens.css');
  const T = JSON.parse(read('src/tokens.json'));
  const touch = css.match(/@media \(pointer: coarse\) \{\s*:root \{([^}]*)\}/);
  assert.ok(touch, 'touch tokens live on :root under a coarse pointer');
  for (const declaration of ['--pm-btn-h-sm: 44px;', '--pm-chip-h: 44px;', '--pm-sticky-top: 68px;']) {
    assert.ok(touch[1].includes(declaration), `${declaration} missing from the coarse block`);
  }
  for (const published of ['--pm-btn-h-sm: 36px;', '--pm-chip-h: 0px;', '--pm-sticky-top: 58px;']) {
    assert.ok(css.indexOf(published) < touch.index, `${published} stays the default at :root`);
  }
  assert.ok(touch.index < css.indexOf('.pm-app, .pm-shell {'), 'the app register comes later, so it wins');
  assert.match(css, /\.pm-app, \.pm-shell \{[^}]*--pm-sticky-top: 58px/, 'an app must not inherit the taller topbar');
  assert.equal(T.app.tokens['sticky-top'].value, T.layout['sticky-top'].value);
  assert.match(read('dist/poiema.min.css'), /@media \(pointer: coarse\)\{:root\{[^}]*--pm-chip-h: 44px/);

  const components = read('src/css/components.css');
  assert.match(components, /\.pm-topbar__nav:not\(:is\(\.pm-app, \.pm-shell\) \*\) a \{[^}]*min-height: var\(--pm-btn-h-sm\)/);
  assert.match(components, /\.pm-input-group:not\(:is\(\.pm-app, \.pm-shell\) \*\) > \.pm-btn \{[^}]*min-height: var\(--pm-btn-h-sm\)/);
  assert.match(read('docs/tokens.md'), /## Touch[\s\S]*\| `--pm-sticky-top` \| `68px` \|/);
});

test('the build rejects a touch key that is no token, or that an app would inherit', () => {
  const dir = mkdtempSync(join(tmpdir(), 'poiema-touch-'));
  try {
    mkdirSync(join(dir, 'scripts'));
    mkdirSync(join(dir, 'src'));
    cpSync(join(root, 'scripts/build.mjs'), join(dir, 'scripts/build.mjs'));
    cpSync(join(root, 'package.json'), join(dir, 'package.json'));
    const build = (touch) => {
      writeFileSync(join(dir, 'src/tokens.json'), JSON.stringify({ ...JSON.parse(read('src/tokens.json')), touch }));
      return () => execFileSync(process.execPath, [join(dir, 'scripts/build.mjs')], { stdio: 'pipe' });
    };
    assert.throws(build({ 'btn-h-small': '44px' }), /touch: unknown token "btn-h-small"/);
    assert.throws(build({ 'btn-text': '16px' }), /touch: "btn-text" would reach the app register/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a row label with a sub-line keeps the sub-line out of the name', () => {
  for (const file of ['docs/components.md', 'demo/app.html']) {
    for (const [row] of read(file).matchAll(/<label class="pm-row">[\s\S]*?<\/label>/g)) {
      if (row.includes('pm-row__sub')) assert.match(row, /aria-labelledby=[\s\S]*aria-describedby=/, `${file}: ${row.slice(0, 80)}`);
    }
  }
});

test('nothing in app.css can change a page without the app scope', () => {
  const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
  const classes = (css) => new Set([...css.matchAll(/\.pm-[\w-]+/g)].map((m) => m[0]));
  const gallery = new Set(['type', 'layout', 'components', 'forms', 'motion', 'utilities'].flatMap((f) => [...classes(strip(read(`src/css/${f}.css`)))]));
  gallery.delete('.pm-tabbar'); // components.css only lists it among the regions that invert
  for (const scope of ['.pm-app', '.pm-shell']) gallery.delete(scope); // components.css only names them to keep its touch rules off an app
  const css = strip(read('src/css/app.css'));
  const leaks = [];
  for (const rule of css.matchAll(/(^|[{}])\s*([^{}@]+)\{/g)) {
    for (const selector of rule[2].split(/,(?![^(]*\))/)) {
      const found = [...classes(selector)];
      // Only classes a gallery page already uses, and no scope: it would reach that page.
      if (found.length && found.every((c) => gallery.has(c)) && !selector.includes(':is(.pm-app, .pm-shell)')) leaks.push(selector.trim());
    }
  }
  assert.deepEqual(leaks, []);
  assert.ok(!/#[0-9a-f]{3,8}\b/i.test(css.replace(/rgba?\([^)]*\)/g, '')), 'app.css should use tokens, not hex literals');
});

test('the demos the docs point agents at ship in the package', () => {
  assert.ok(pkg.files.includes('demo'), 'docs/app.md tells agents to open demo/app.html');
  assert.match(read('demo/app.html'), /href="\.\.\/dist\/poiema\.css"/, 'the demo works from inside node_modules/poiema-ui');
});

test('app guide is reachable by agents and its demo exists', () => {
  assert.match(read('AGENTS.md'), /Decide first: site or app\?/);
  assert.match(read('AGENTS.md'), /docs\/app\.md/);
  assert.match(read('skills/poiema-design/SKILL.md'), /references\/app\.md/);
  assert.ok(existsSync(join(root, 'skills/poiema-design/references/app.md')));
  assert.ok(read('llms-full.txt').includes('# The app register'));
  const demo = read('demo/app.html');
  assert.match(demo, /<html[^>]*class="pm-app"/);
  for (const cls of ['pm-shell', 'pm-sidebar', 'pm-tabbar', 'pm-fab', 'pm-rows', 'pm-panel', 'pm-sheet']) assert.ok(demo.includes(cls), `${cls} missing from the app demo`);
});

test('every class documented in components.md exists in the CSS', () => {
  const css = read('dist/poiema.css');
  const documented = new Set([...read('docs/components.md').matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => c.startsWith('pm-')));
  const missing = [...documented].filter((c) => !css.includes(`.${c}`));
  assert.deepEqual(missing, []);
});

test('a hint or error sits outside the label and is tied to its field by id', () => {
  for (const file of ['docs/components.md', 'docs/app.md', 'demo/index.html', 'demo/app.html']) {
    const source = read(file);
    assert.doesNotMatch(source, /<label\b[^>]*\bpm-field\b/, `${file}: a label around a whole field makes its hint part of the field's name`);
    // `<label>` in prose is the word, not a tag: read as markup it would run on to the next </label>.
    for (const [label] of source.matchAll(/<label\b(?!>`)[\s\S]*?<\/label>/g)) {
      assert.doesNotMatch(label, /\bpm-(hint|error)\b/, `${file}: ${label}`);
    }
    const ids = new Set([...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
    const described = [...source.matchAll(/\baria-describedby="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/));
    for (const id of [...source.matchAll(/\bfor="([^"]+)"/g)].map((match) => match[1]).concat(described)) {
      assert.ok(ids.has(id), `${file}: nothing has id "${id}"`);
    }
    for (const [, id] of source.matchAll(/<[^>]*\bpm-error\b[^>]*\bid="([^"]+)"[^>]*\shidden\b/g)) {
      assert.ok(!described.includes(id), `${file}: a hidden error that aria-describedby names can still be read: "${id}"`);
    }
  }
  const panel = read('demo/app.html');
  assert.match(panel, /setAttribute\('aria-describedby', 'new-link-error'\)/, 'the panel points at its error while it shows');
  assert.match(panel, /removeAttribute\('aria-describedby'\)/, 'and stops when it clears');
  assert.match(read('AGENTS.md'), /^forms +div\.pm-field > label\.pm-label\[for/m);
  assert.match(read('skills/poiema-review/SKILL.md'), /outside the `<label>`.*`aria-describedby`/);
});

test('skills have valid frontmatter (name = folder, description <= 1024 chars)', () => {
  const dirs = readdirSync(join(root, 'skills')).filter((d) => !d.startsWith('.'));
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

test('release bumps every manifest and lists only the commits since the last tag', () => {
  const dir = mkdtempSync(join(tmpdir(), 'poiema-release-'));
  const notesFile = `${dir}-notes.md`;
  try {
    cpSync(root, dir, { recursive: true, filter: (src) => !/[/\\](\.git|node_modules|screenshots)$/.test(src) });
    const git = (...args) => execFileSync('git', ['-c', 'user.name=test', '-c', 'user.email=test@example.com', ...args], { cwd: dir, encoding: 'utf8' });
    git('init', '--quiet');
    git('add', '-A');
    git('commit', '--quiet', '-m', 'chore: before the last release');
    git('tag', 'v0.0.1');
    git('commit', '--quiet', '--allow-empty', '-m', 'feat: add a thing');
    git('commit', '--quiet', '--allow-empty', '-m', 'fix: mend a thing');
    execFileSync(process.execPath, [join(dir, 'scripts/release.mjs'), 'minor', notesFile], { cwd: dir, encoding: 'utf8' });

    const [major, minor] = pkg.version.split('.').map(Number);
    const next = `${major}.${minor + 1}.0`;
    const at = (p) => readFileSync(join(dir, p), 'utf8');
    assert.equal(JSON.parse(at('package.json')).version, next);
    assert.equal(JSON.parse(at('.claude-plugin/plugin.json')).version, next);
    assert.ok(at('dist/poiema.css').startsWith(`/*! poiema-ui v${next} `), 'dist rebuilt with the new version');
    assert.ok(at('README.md').includes(`poiema-ui#semver:^${next}`), 'install snippets pin the new range');

    const notes = readFileSync(notesFile, 'utf8');
    assert.deepEqual(notes.match(/^- .+? \(/gm), ['- fix: mend a thing (', '- feat: add a thing (']);
    assert.ok(at('CHANGELOG.md').includes(`## v${next} · `) && at('CHANGELOG.md').includes(notes.split('\n')[0]));
  } finally {
    rmSync(dir, { recursive: true, force: true });
    rmSync(notesFile, { force: true });
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
