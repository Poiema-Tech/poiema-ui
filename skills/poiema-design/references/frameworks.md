<!-- Copied from docs/frameworks.md by npm run build. Edit the original. -->

# Using it in any stack

The system is **CSS-first**. Every framework just imports a stylesheet and writes `pm-*` classes. The optional JS is a set of tiny element behaviors with the shape `behavior(el, opts) → { destroy() }`.

## Install

```bash
npm i github:Poiema-Tech/poiema-ui#semver:^0.2.1
```
The `#semver:` range takes the newest release it allows; `npm update poiema-ui` moves within it, and `CHANGELOG.md` (in an app: `node_modules/poiema-ui/CHANGELOG.md`) says what each release changed. No build step. `dist/` is committed. The repository is **private and proprietary** (see `LICENSE`): the machine installing it needs GitHub access (SSH key or `gh auth login`; a read-only deploy key or token in CI), and the package is never published to npm or a public CDN.

Then, optionally, give your coding agent the context:
```bash
npx poiema-ui init      # copies skills to .claude/skills and adds a Poiema section to AGENTS.md / CLAUDE.md
```
Add `"postinstall": "poiema-ui init"` to the app's scripts so the skills follow every update.

## Plain HTML / any server-rendered app (Rails, Django, Laravel, Go, PHP…)
Copy `dist/poiema.min.css` and `dist/poiema.auto.js` (from the repo or `node_modules/poiema-ui/dist/`) into the app's static folder:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/vendor/poiema/poiema.min.css">
<script defer src="/vendor/poiema/poiema.auto.js"></script>
```
The auto script calls `init()` on load, watches the DOM, and exposes `window.Poiema` (`Poiema.toast('Saved ✓')`). There is no public CDN, on purpose.

## Next.js (App Router) / React
```tsx
// app/layout.tsx
import 'poiema-ui/css';
import { Inter_Tight } from 'next/font/google';
import { PoiemaBehaviors } from './poiema-behaviors';

const font = Inter_Tight({ subsets: ['latin'], variable: '--pm-font-sans' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>{children}<PoiemaBehaviors /></body>
    </html>
  );
}
```
```tsx
// app/poiema-behaviors.tsx
'use client';
import { useEffect } from 'react';
import { init } from 'poiema-ui';
export function PoiemaBehaviors() {
  useEffect(() => init(), []);   // watches the DOM, so client navigation is covered
  return null;
}
```
Per element instead: `useEffect(() => { const h = tilt(ref.current!); return h.destroy; }, [])`.
Use `daysUntil()` in render rather than `data-pm-countdown` (React owns the text node). Toasts: `import { toast } from 'poiema-ui'`.

## SvelteKit / Svelte
```svelte
<!-- +layout.svelte -->
<script>
  import 'poiema-ui/css';
  import { onMount } from 'svelte';
  import { init } from 'poiema-ui';
  onMount(() => init());
</script>
<slot />
```
Or use the behaviors as **actions**, since they have the exact action signature:
```svelte
<script> import { reveal, tilt, cycle } from 'poiema-ui'; </script>
<article class="pm-card" data-pm-reveal use:reveal>…</article>
<div class="pm-feature__media" use:tilt={{ max: 6 }}>…</div>
```
Keep the `data-pm-reveal` attribute in the markup so SSR'd content starts hidden.

## Vue / Nuxt
```js
// main.js / a Nuxt client plugin
import 'poiema-ui/css';
import { init, reveal } from 'poiema-ui';
app.mount('#app');
init();
// or as a directive:
app.directive('reveal', { mounted: (el) => (el._pm = reveal(el)), unmounted: (el) => el._pm?.destroy() });
```

## Astro
```astro
---
import 'poiema-ui/css';
---
<script> import { init } from 'poiema-ui'; init(); </script>
```

## Tailwind CSS v4
```css
/* app.css */
@layer theme, base, poiema, components, utilities;
@import "tailwindcss";
@import "poiema-ui/tailwind.css";   /* tokens → theme: bg-canvas text-ink-2 rounded-card text-h1 tracking-display shadow-float animate-float ease-settle … */
@import "poiema-ui/poiema.css";     /* optional: the pm-* components */
```
- The first line places Poiema **below** Tailwind utilities, so `class="pm-btn px-10"` works as expected.
- Tailwind's default palette is **removed** on purpose. Only brand colors exist: `canvas surface surface-2 ink ink-strong ink-2 label muted line line-strong on-ink danger success`, the `gray-*` scale and the materials `clay plaster grass iron diamond` (+ `-light`/`-deep`).
- Type utilities bundle size, line-height, tracking and weight: `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-display`, `text-numeral`, `text-lead`, `text-eyebrow` (add `uppercase`).

## Tokens in JS (charts, canvas, emails)
```js
import { tokens, cssVar } from 'poiema-ui/tokens';
tokens.color.light.ink       // "#2b2b2b"
tokens.primitives.clay       // "#b8562a"
cssVar('ink')                // "var(--pm-ink)"
```
`poiema-ui/tokens.json` holds the same data for non-JS tools (Figma plugins, Style Dictionary, native apps).

## Theming
```html
<html data-theme="light">  <!-- default; "dark" or "auto" (follows OS) -->
<article class="pm-card" data-theme="dark">  <!-- any subtree -->
```
To rebrand, override semantic tokens after the import (unlayered CSS always wins):
```css
:root { --pm-canvas: #e6e4e1; --pm-radius-xl: 32px; }
```

## Imports cheat-sheet
| Import | What |
|---|---|
| `poiema-ui/css` (`/poiema.css`, `/poiema.min.css`) | everything: tokens + base + components + motion |
| `poiema-ui/tokens.css` | only the custom properties |
| `poiema-ui/tailwind.css` | Tailwind v4 theme (includes tokens) |
| `poiema-ui/fonts.css` | Inter Tight from Google Fonts |
| `poiema-ui` | JS behaviors (ESM, typed) |
| `poiema-ui/auto` | classic script: auto-init + `window.Poiema` |
| `poiema-ui/tokens`, `/tokens.json` | tokens as data |
| `poiema-ui/assets/gem.svg` | the gem |
