# poiema-ui

**The Poiema design system:** a quiet gray gallery, huge lowercase type, soft 40px cards, ringed numbers, tactile objects that carry the only color, and a sincere, communal voice. Extracted from the [Poiema Conf 26 direction page](https://poiema-conference-direcionamento.pages.dev/) and generalized for any web app.

- **Framework-agnostic.** It's plain CSS (`pm-*` classes + `--pm-*` tokens), so it works with Next.js, SvelteKit, Vue, Astro, Rails, Django or a static page.
- **Small JS, optional.** Behaviors for scroll reveal, tilt, material swap, copy feedback, dialogs and toasts. They are SSR-safe and typed, with zero dependencies.
- **Tailwind v4 ready.** One import maps the tokens to `bg-canvas text-ink-2 rounded-card text-h1 animate-float`…
- **Agent-ready.** `AGENTS.md`, `llms.txt`, full docs, and three Claude skills: **poiema-design**, **poiema-voice** and **poiema-review**.

```html
<section class="pm-section pm-container">
  <header class="pm-section-head">
    <span class="pm-ring">01</span>
    <h2 class="pm-h1">your projects.</h2>
    <p>Everything each goal needs, in one place.</p>
  </header>
  <article class="pm-card" data-pm-reveal>
    <ul class="pm-list"><li>One owner, one outcome.</li><li>Every task has <strong>a date</strong>.</li></ul>
    <div class="pm-callout">
      <span class="pm-eyebrow">The message that must be clear</span>
      <p>A project isn't a folder. It's a commitment to a result.</p>
    </div>
  </article>
</section>
```

## Install

```bash
npm i github:guilherme-toti/poiema-style-guide   # today, straight from GitHub
# npm i poiema-ui                                 # once published to npm
```

```js
import 'poiema-ui/css';            // tokens + components (once, at the app root)
import { init } from 'poiema-ui';  // optional behaviors: call init() once on the client
```

No bundler? Use the CDN:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/guilherme-toti/poiema-style-guide@main/dist/poiema.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/guilherme-toti/poiema-style-guide@main/dist/poiema.auto.js"></script>
```

Framework recipes (Next.js, SvelteKit actions, Vue directives, Astro, Tailwind v4, tokens in JS) are in **[docs/frameworks.md](docs/frameworks.md)**.

## Teach your AI

```bash
npx poiema-ui init
```
This copies the three skills into `.claude/skills/` and adds a short Poiema section to your `AGENTS.md` (and to `CLAUDE.md` if you have one, importing the full rules). Codex, Cursor, Copilot and other agents that read `AGENTS.md` pick it up. Claude Code picks up the skills too.

Or install the skills globally as a Claude Code plugin:
```
/plugin marketplace add guilherme-toti/poiema-style-guide
/plugin install poiema@poiema
```

Other tools can read [`llms.txt`](llms.txt) (index) or [`llms-full.txt`](llms-full.txt) (everything in one file).

| Skill | Use it to |
|---|---|
| `poiema-design` | build or restyle pages, screens and components |
| `poiema-voice` | write headlines, microcopy, empty states and errors (pt-BR and en) |
| `poiema-review` | audit a page, diff or screenshot and list or apply fixes |

## What was extracted

| | |
|---|---|
| **Conversation style** | lowercase headlines ending in a period · triads (`from christ. in us. to the world.`) · "not X — Y" reframes · a closing "message that must be clear" · freedom vs. boundaries (✓ / ○) · calm alerts · verb-first buttons, "Copied ✓" → [docs/voice.md](docs/voice.md) |
| **Tone & mood** | quiet gray gallery, sincere and communal, editorial poster type, tactile objects, reverent but contemporary → [docs/principles.md](docs/principles.md) |
| **Colors** | grayscale chrome (`#e2e2e2` canvas, `#f7f7f7` paper, `#2b2b2b` ink) + five sampled materials: clay, plaster, grass, iron, diamond → [docs/color.md](docs/color.md) |
| **Animations** | rise-and-settle reveal (900ms, `cubic-bezier(.2,.8,.2,1)`), 7s float, pointer tilt, material cross-fade, 40s marquee, -2px lift → [docs/motion.md](docs/motion.md) |
| **Fonts** | Inter Tight 400–900, 800 headlines at -0.05em, 900 numerals at -0.07em, 12px uppercase eyebrows at +0.14em → [docs/typography.md](docs/typography.md) |

## Showcase

Open `demo/index.html` (e.g. `npm run demo`, then visit http://localhost:4173/demo/). It's a kitchen-sink page of every component in light and dark.

## Develop

```bash
npm run build   # dist/, docs/tokens.md, contrast table, skill references, llms-full.txt
npm test        # build + unit tests (fails if a contrast pair regresses)
```
`src/tokens.json` is the single source of truth. See the bottom of [AGENTS.md](AGENTS.md) for repo conventions.
