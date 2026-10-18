# Poiema UI — instructions for coding agents

You are building UI with the **Poiema design system** (`poiema-ui`). Follow these rules whenever you create or change anything users see: markup, styles, copy or motion. Details live in `docs/` next to this file (in an app: `node_modules/poiema-ui/docs/`).

## The essence
A **quiet gray gallery**. Huge, tight, **lowercase** type does the shouting. Soft 40px cards and pills. **No hue in the interface**: color lives only in tactile objects (clay, plaster, grass, iron, diamond). The voice is **sincere and communal** ("we", "our family"), and every section ends with **the one message that must be clear**. Motion **rises and settles**; objects float.

## Setup (once per app)
- CSS: `import 'poiema-ui/css'` (or the CDN `dist/poiema.min.css`). Tailwind v4: see `docs/frameworks.md`.
- Font: Inter Tight 400–900 (`poiema-ui/fonts.css`, `next/font` with `variable: '--pm-font-sans'`, or `@fontsource-variable/inter-tight`).
- Behaviors (optional): call `init()` from `poiema-ui` once on the client at the app root, or load `poiema-ui/auto`.

## Hard rules
1. **Use the `pm-*` classes and `--pm-*` tokens.** Don't invent colors, radii, shadows or fonts. If something is missing, compose it from tokens.
2. **Grayscale chrome only.** Backgrounds: `--pm-canvas` (page), `.pm-card`, `--pm-surface` (paper). Text: `--pm-ink`, `--pm-ink-2`, `--pm-label`, `--pm-muted`. Material colors (`--pm-clay`, `--pm-grass`…) are for objects, illustrations and data only, never buttons, links or backgrounds. Errors use `--pm-danger`, confirmations `--pm-success`.
3. **Never use pure white pages.** The page is `#e2e2e2`; cards are paper.
4. **Display headlines are lowercase and end with a period** (questions end with `?`): `<h2 class="pm-h1">your projects.</h2>`. Eyebrows, tags and alert titles are small, bold, UPPERCASE via CSS.
5. **One echo per display line:** wrap one phrase in `.pm-muted` (the gray middle beat): `plan. <span class="pm-muted">focus.</span> finish.`
6. **Soft geometry:** cards 40px (`.pm-card`), callouts 28px, alerts and tiles 24px, buttons/chips/inputs pill. Numbers in rings (`.pm-ring`), bullets are diamonds (`.pm-list`).
7. **End each section with a `.pm-callout`** holding the key message (label: "The message that must be clear" / "Mensagem que precisa ficar clara").
8. **Rhythm by inversion:** alternate `.pm-card` and `.pm-card[data-theme="dark"]`; use ink callouts and the marquee band for punctuation, not color.
9. **Motion:** `data-pm-reveal` on sections/cards, `.pm-float` + `data-pm-tilt` on objects only, curve `--pm-ease`. No bounce, no spin, no parallax. Reduced motion is handled; keep it that way.
10. **Copy:** verb-first buttons (`Create project`), past-participle feedback (`Saved ✓`), calm alerts (`Attention` / `Important` + why), "we/our", no hype words, no emoji, at most one `!` (the closing line). Full guide: `docs/voice.md`.
11. **Accessibility:** keep semantic HTML, labels on fields, `aria-invalid` for errors, `aria-current`/`aria-selected` for active pills, alt text on objects (`alt=""` if decorative), visible focus (already styled).

## Cheat-sheet

```
page        body (canvas) > .pm-topbar + main > .pm-section > .pm-container
hero        .pm-hero(.pm-hero--pillars) > .pm-eyebrow + .pm-lockup|.pm-display + .pm-cluster(.pm-chip…) + .pm-lead + .pm-scroll-cue
title       .pm-section-head > .pm-ring + .pm-h1 + p
card        .pm-card | [data-theme=dark] | --outline | --compact      tile: .pm-tile
feature     .pm-card.pm-feature(--flip) > .pm-feature__media[data-pm-tilt] > img.pm-object.pm-float + .pm-feature__body
callout     .pm-callout > .pm-eyebrow + p (+ p.pm-callout__big)
alert       .pm-alert(--danger|--success) > strong.pm-alert__title + p
lists       .pm-list (◆) | --check (✓ must keep) | --open (○ your call) | --numbered
buttons     .pm-btn | --soft | --outline | --ghost | --danger | --sm | --lg | --icon | --block | --rich(__icon __text __arrow)
chips       .pm-chip | --solid | --outline     .pm-tag (outlined uppercase)
nav         .pm-pillnav(--sticky) > a|button (+ .pm-ring--sm), active = aria-current / aria-selected
data        .pm-stat(__value __label) .pm-numeral .pm-ticket(__main __dates __month __side __row) .pm-table .pm-progress
forms       .pm-field > .pm-label + .pm-input|.pm-select|.pm-textarea + .pm-hint|.pm-error ; .pm-choice > .pm-check|.pm-radio|.pm-switch
overlay     dialog.pm-dialog (+ data-pm-open="id", data-pm-close) ; toast('Saved ✓')
layout      .pm-container .pm-section .pm-band .pm-stack(--sm|--lg|--xl) .pm-cluster .pm-grid(--2|--3) .pm-split .pm-ruled
type        .pm-eyebrow .pm-display .pm-h1 .pm-h2 .pm-h3 .pm-h4 .pm-lead .pm-body .pm-small .pm-numeral .pm-prose
utility     .pm-muted .pm-ink-2 .pm-nums .pm-center .pm-measure .pm-lower .pm-sr-only .pm-inverse .pm-lift
themes      data-theme="light|dark|auto" on any element
motion [JS] data-pm-reveal(="fade"|"scale") data-pm-stagger data-pm-tilt data-pm-cycle data-pm-copy data-pm-countdown
```

Key tokens: `--pm-canvas --pm-surface --pm-card --pm-ink --pm-ink-2 --pm-label --pm-muted --pm-line --pm-danger --pm-success --pm-font --pm-text-h1 --pm-radius-xl --pm-gutter --pm-section --pm-ease --pm-shadow-float`. Full list: `docs/tokens.md`.

## Before you finish a UI task, check
- [ ] No hex colors or hues outside tokens; no Tailwind default palette; no pure white page.
- [ ] Every display headline is lowercase and ends with `.`/`?`; one `.pm-muted` echo at most per line.
- [ ] Sections that explain something end with a `.pm-callout`.
- [ ] Radii are 40/28/24/pill; numbers in rings; bullets are diamonds.
- [ ] Motion only via the catalogue in `docs/motion.md`.
- [ ] Copy follows `docs/voice.md` (verb-first buttons, ✓ feedback, no emoji).

## Docs map
`docs/principles.md` tone & mood · `docs/voice.md` conversation style · `docs/color.md` · `docs/typography.md` · `docs/layout.md` · `docs/motion.md` · `docs/components.md` (every class with HTML) · `docs/imagery.md` · `docs/frameworks.md` (Next, Svelte, Vue, Astro, Tailwind, CDN) · `docs/tokens.md` (generated). Skills: `skills/poiema-design`, `skills/poiema-voice`, `skills/poiema-review`.

---

## Working on this repository (not on an app)
- `src/tokens.json` is the single source for tokens. `src/css/*.css` holds components (each file declares its `@layer`). `src/js/poiema.js` holds behaviors (keep every export a top-level `export function`/`export const`; the auto build strips `export`).
- `npm run build` regenerates `dist/`, `docs/tokens.md`, the contrast table in `docs/color.md`, `skills/*/references/` and `llms-full.txt`. **Never edit generated files by hand.** Commit `dist/` (GitHub installs and the jsDelivr CDN use it).
- `npm test` builds and runs `test/`. The build fails if a contrast pair in `src/tokens.json` drops below its threshold.
- New component: add CSS in the right file, document it in `docs/components.md` (HTML snippet), add it to the cheat-sheet above and to `demo/index.html`.
- Zero runtime dependencies. Keep it that way.
