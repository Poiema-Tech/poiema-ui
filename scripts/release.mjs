#!/usr/bin/env node
// node scripts/release.mjs <patch|minor|major> [notes-file]
// Bumps the version, points install snippets at the new range, writes the commits since the last
// tag to CHANGELOG.md (and to notes-file, for the GitHub release) and rebuilds. Committing, tagging
// and publishing happen in .github/workflows/release.yml.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, s) => writeFileSync(join(root, p), s);
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const fail = (msg) => { console.error(msg); process.exit(1); };

const [bump, notesFile] = process.argv.slice(2);
if (!['patch', 'minor', 'major'].includes(bump)) fail('usage: node scripts/release.mjs <patch|minor|major> [notes-file]');
if (git('status', '--porcelain')) fail('Commit or stash your changes first: a release must match a commit.');

const pkg = JSON.parse(read('package.json'));
const [major, minor, patch] = pkg.version.split('.').map(Number);
const version = { major: `${major + 1}.0.0`, minor: `${major}.${minor + 1}.0`, patch: `${major}.${minor}.${patch + 1}` }[bump];
const tag = `v${version}`;
if (git('tag', '--list', tag)) fail(`${tag} already exists.`);

const previous = git('tag', '--list', 'v*', '--sort=-v:refname').split('\n')[0];
const commits = git('log', '--no-merges', '--format=%h %s', previous ? `${previous}..HEAD` : 'HEAD').split('\n').filter(Boolean);
if (!commits.length) fail(`Nothing to release: no commits since ${previous}.`);

const slug = pkg.repository.url.match(/github\.com[/:](.+?)(?:\.git)?$/)[1];
const notes = commits
  .map((line) => {
    const [hash, ...subject] = line.split(' ');
    return `- ${subject.join(' ')} ([${hash}](https://github.com/${slug}/commit/${hash}))`;
  })
  .join('\n')
  .concat(previous ? `\n\nFull diff: https://github.com/${slug}/compare/${previous}...${tag}\n` : '\n');

for (const file of ['package.json', '.claude-plugin/plugin.json']) {
  write(file, read(file).replace(/"version": "[^"]+"/, `"version": "${version}"`));
}

// Install snippets carry the range, so a new app gets every release up to the next breaking one.
const install = `github:${slug}`;
const snippet = new RegExp(`${install}(?:#semver:\\^[\\w.-]+)?`, 'g');
const docs = git('grep', '-l', '-F', install, '--', '*.md', '*.html', ':!CHANGELOG.md').split('\n').filter(Boolean);
for (const file of docs) write(file, read(file).replace(snippet, `${install}#semver:^${version}`));

const HEADER = '# Changelog\n\nEvery release lists its commits. Written by `scripts/release.mjs`; never edit it by hand.\n';
const older = existsSync(join(root, 'CHANGELOG.md')) ? read('CHANGELOG.md').slice(HEADER.length) : '';
write('CHANGELOG.md', `${HEADER}\n## ${tag} · ${new Date().toISOString().slice(0, 10)}\n\n${notes}${older}`);

execFileSync(process.execPath, [join(root, 'scripts/build.mjs')], { cwd: root, stdio: 'inherit' });
if (notesFile) writeFileSync(notesFile, notes);
console.log(`${tag}: ${commits.length} commit(s) since ${previous || 'the first commit'}`);
