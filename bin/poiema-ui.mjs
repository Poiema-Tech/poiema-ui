#!/usr/bin/env node
// npx poiema-ui init   — give this project's coding agents the Poiema context.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'));
const [cmd = 'help', ...args] = process.argv.slice(2);
const flag = (f) => args.includes(f);
const cwd = process.cwd();
const START = '<!-- poiema-ui:start -->';
const END = '<!-- poiema-ui:end -->';

function copySkills(dest = join(cwd, '.claude', 'skills')) {
  const src = join(pkgRoot, 'skills');
  const names = readdirSync(src).filter((n) => existsSync(join(src, n, 'SKILL.md')));
  mkdirSync(dest, { recursive: true });
  for (const n of names) cpSync(join(src, n), join(dest, n), { recursive: true, force: true });
  return names.map((n) => relative(cwd, join(dest, n)));
}

function upsertBlock(file, body) {
  const path = join(cwd, file);
  const block = `${START}\n${body.trim()}\n${END}`;
  const before = existsSync(path) ? readFileSync(path, 'utf8') : '';
  const after = before.includes(START)
    ? before.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block)
    : (before ? before.trimEnd() + '\n\n' : '') + block + '\n';
  if (after !== before) writeFileSync(path, after);
  return before ? (after === before ? 'unchanged' : 'updated') : 'created';
}

function init() {
  const rel = relative(cwd, pkgRoot).split('\\').join('/') || '.';
  const intro = `## Design system: Poiema (${pkg.name})

All UI and user-facing copy in this project follows the Poiema design system.
Before creating or changing anything visual (markup, styles, motion) or any copy, follow
\`${rel}/AGENTS.md\`. Full docs: \`${rel}/docs/\` (start with components.md and voice.md).
Skills: \`poiema-design\` (build UI), \`poiema-voice\` (write copy), \`poiema-review\` (audit).`;

  const out = [];
  if (!flag('--no-skills')) out.push(...copySkills().map((p) => `skill     ${p}`));
  out.push(`AGENTS.md ${upsertBlock('AGENTS.md', intro)}`);
  if (existsSync(join(cwd, 'CLAUDE.md'))) {
    // Claude Code reads CLAUDE.md instead of AGENTS.md when both exist; import the rules directly.
    out.push(`CLAUDE.md ${upsertBlock('CLAUDE.md', `${intro}\n\n@${rel}/AGENTS.md`)}`);
  }
  console.log(`poiema-ui ${pkg.version} — agent context installed\n  ${out.join('\n  ')}`);
}

const commands = {
  init,
  skills: () => console.log(copySkills(args[0] ? resolve(cwd, args[0]) : undefined).join('\n')),
  path: () => console.log(pkgRoot),
  help: () => console.log(`poiema-ui ${pkg.version}

  npx poiema-ui init [--no-skills]   copy skills to .claude/skills and add a Poiema section
                                     to AGENTS.md (and CLAUDE.md if present). Idempotent.
  npx poiema-ui skills [dir]         only copy the skills (default .claude/skills)
  npx poiema-ui path                 print where the package lives (docs, dist, skills)`),
};

(commands[cmd] || commands.help)();
