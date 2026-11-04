# Poiema UI — instructions for coding agents

You are building UI with the **Poiema design system** (`poiema-ui`). It is **proprietary to Poiema** (see `LICENSE`): use it only in Poiema's own projects. Never publish it to npm or a public CDN, and never copy it into projects for anyone else. Follow these rules whenever you create or change anything users see: markup, styles, copy or motion. Details live in `docs/` next to this file (in an app: `node_modules/poiema-ui/docs/`).

## The essence
A **quiet gray gallery**. Huge, tight, **lowercase** type does the shouting. Soft 40px cards and pills. **No hue in the interface**: color lives only in tactile objects (clay, plaster, grass, iron, diamond). The voice is **sincere and communal** ("we", "our family"), and it gets to the point. Motion **rises and settles**; objects float.

## Decide first: site or app?
Everything else depends on this, and the wrong answer can't be fixed with polish.

- **A site** is read once: landing page, event page, institutional page, guide. Use the gallery register, which is the default and what most of this file describes.
- **An app** is used again and again: admin, portal, dashboard, internal tool, anything behind a login. Put `class="pm-app"` on `<html>` and **read `docs/app.md` before writing a screen.** Same room, working volume.

One product can be both: a public page in the gallery and `/admin` as an app.

**An app screen is never** a hero, a section head with a lead paragraph, or a stack of cards. It is `.pm-shell` (sidebar + tab bar) → `.pm-pagehead` (title + one line of state) → search and filter chips with counts → one `.pm-rows` card with a row per thing. On a list screen on a 390×844 phone, the first row starts within about 200px of the top. Creating or editing opens a `.pm-panel` over the list. A problem is fixed on its own row. Navigation never scrolls away.

## Setup (once per app)
- CSS: `import 'poiema-ui/css'` (or a self-hosted copy of `dist/poiema.min.css`). Tailwind v4: see `docs/frameworks.md`.
- Font: Inter Tight 400–900 (`poiema-ui/fonts.css`, `next/font` with `variable: '--pm-font-sans'`, or `@fontsource-variable/inter-tight`).
- Behaviors (optional): call `init()` from `poiema-ui` once on the client at the app root, or load `poiema-ui/auto`.

## Hard rules
1. **Use the `pm-*` classes and `--pm-*` tokens.** Don't invent colors, radii, shadows or fonts. If something is missing, compose it from tokens.
2. **Grayscale chrome only.** Backgrounds: `--pm-canvas` (page), `.pm-card`, `--pm-surface` (paper). Text: `--pm-ink`, `--pm-ink-2`, `--pm-label`, `--pm-muted`. Material colors (`--pm-clay`, `--pm-grass`…) are for objects, illustrations and data only, never buttons, links or backgrounds. Errors use `--pm-danger`, confirmations `--pm-success`.
3. **Never use pure white pages.** The page is `#e2e2e2`; cards are paper.
4. **Display headlines are lowercase and end with a period** (questions end with `?`): `<h2 class="pm-h1">your projects.</h2>`. Eyebrows, tags and alert titles are small, bold, UPPERCASE via CSS. In an app display means three roles: the page title, an empty state's title and a dialog's question. The rest is data and keeps its case, and a title that is a name stays a name (`Ana Souza`).
5. **One echo per display line:** wrap one phrase in `.pm-muted` (the gray middle beat): `plan. <span class="pm-muted">focus.</span> finish.`
6. **Soft geometry:** cards 40px (`.pm-card`), callouts 28px, alerts and tiles 24px, buttons/chips/inputs pill. Numbers in rings (`.pm-ring`), bullets are diamonds (`.pm-list`). `.pm-app` steps these down to 24/20/16/12 with fields at 12px, on its own: never hard-code a radius. In an app, rings are for steps only and counts go in badges.
7. **Key-message callouts only on request.** The reference page briefed leaders, so every section closed with a `.pm-callout` labeled "The message that must be clear" / "Mensagem que precisa ficar clara". Poiema products mostly speak to consumers: don't add that callout unless the user asks for it.
8. **Rhythm by inversion:** alternate `.pm-card` and `.pm-card[data-theme="dark"]`; use ink boxes (`.pm-inverse`) and the marquee band for punctuation, not color. Sites only: in an app the ink tab bar is the inversion, and black means chosen or primary.
9. **Motion:** `data-pm-reveal` on sections/cards, `.pm-float` + `data-pm-tilt` on objects only, curve `--pm-ease`. No bounce, no spin, no parallax. Reduced motion is handled; keep it that way. In an app, nothing moves on the way in: data is there the moment the screen is.
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
nav         .pm-pillnav(--sticky) > a|button (+ .pm-ring--sm), active = aria-current / aria-selected / aria-pressed
data        .pm-stat(__value __label) .pm-numeral .pm-ticket(__main __dates __month __side __row) .pm-table .pm-progress
forms       .pm-field > .pm-label + .pm-input|.pm-select|.pm-textarea + .pm-hint|.pm-error ; .pm-choice > .pm-check|.pm-radio|.pm-switch
overlay     dialog.pm-dialog (+ data-pm-open="id", data-pm-close) ; toast('Saved ✓')
layout      .pm-container .pm-section .pm-band .pm-stack(--sm|--lg|--xl) .pm-cluster .pm-grid(--2|--3) .pm-split .pm-ruled
type        .pm-eyebrow .pm-display .pm-h1 .pm-h2 .pm-h3 .pm-h4 .pm-lead .pm-body .pm-small .pm-numeral .pm-prose
utility     .pm-muted .pm-ink-2 .pm-nums .pm-center .pm-measure .pm-lower .pm-sr-only .pm-inverse .pm-lift
themes      data-theme="light|dark|auto" on any element
motion [JS] data-pm-reveal(="fade"|"scale") data-pm-stagger data-pm-tilt data-pm-cycle data-pm-copy data-pm-countdown
```

Apps (`html.pm-app`):
```
screen      .pm-shell > .pm-sidebar + main.pm-shell__main > .pm-pagehead + content ; then .pm-tabbar + .pm-fab
sidebar     .pm-sidebar > .pm-sidebar__brand + .pm-sidebar__nav > .pm-sidebar__group > .pm-sidebar__title + a[aria-current] ; .pm-sidebar__user
tabs        nav.pm-tabbar > a[aria-current]  (2-4, Menu last)
head        .pm-pagehead(--pin) > .pm-pagehead__line > .pm-pagehead__title(h1.pm-h1 + .pm-pagehead__sub) + .pm-pagehead__actions
filter      .pm-toolbar > label.pm-search(input + .pm-search__clear[data-pm-clear]) ; .pm-pillnav--bleed > button[aria-pressed] + .pm-count, [data-tone=danger], .pm-flag
list        .pm-rows(--columns) > .pm-rows__head | .pm-rows__label | .pm-rows__section | .pm-rows__empty | .pm-row
row         .pm-row(--danger|--off|--add) > .pm-row__text(.pm-row__title + .pm-row__sub(--danger)) + one trailing item ; .pm-row__link stretches over the row
facts       .pm-badge(--solid|--danger|--outline|--dashed) .pm-count .pm-flag .pm-datetile(--sm) .pm-datestrip .pm-stats .pm-bars[tabindex=0](> span[style=--v][data-value][data-label]) + .pm-bars__axis ; progress.pm-progress as a row's last child
states      .pm-empty(__icon __title) .pm-notice(--draft|--danger) .pm-disclosure .pm-faded .pm-skeleton
overlays    dialog.pm-sheet (__title __sub __actions) quick choice ; dialog.pm-panel (__head __title __sub __body __foot) forms ; dialog.pm-dialog (__foot) confirm
actions     .pm-fab ; dialog.pm-fabmenu > .pm-menu + .pm-fab[data-pm-close] ; [popover].pm-menu[data-pm-menu trigger] > .pm-menu__item(--primary|--danger) > .pm-menu__icon + .pm-menu__label + .pm-menu__hint
inputs      .pm-segmented > label > input + span ; .pm-stepper > button + output + button
layout      .pm-workspace > main + .pm-workspace__rail > .pm-todo ; .pm-selectbar ; .pm-gate ; .pm-phone-only .pm-desk-only (900px) .pm-narrow-only .pm-wide-only (1280px)
feedback    toast('Removed ✓', { action: { label: 'Undo', onClick } })
```

Key tokens: `--pm-canvas --pm-surface --pm-surface-2 --pm-card --pm-ink --pm-ink-2 --pm-label --pm-muted --pm-line --pm-divider --pm-danger --pm-danger-soft --pm-success --pm-font --pm-text-h1 --pm-radius-xl --pm-gutter --pm-section --pm-ease --pm-shadow-float --pm-shadow-card --pm-shadow-pop`. Full list: `docs/tokens.md`.

## Before you finish a UI task, check
- [ ] No hex colors or hues outside tokens; no Tailwind default palette; no pure white page.
- [ ] Every display headline is lowercase and ends with `.`/`?`; one `.pm-muted` echo at most per line.
- [ ] No key-message `.pm-callout` unless the user asked for one.
- [ ] Radii come from tokens, never hard-coded; bullets are diamonds.
- [ ] Motion only via the catalogue in `docs/motion.md`.
- [ ] Copy follows `docs/voice.md` (verb-first buttons, ✓ feedback, no emoji).

Building a site? Also: radii read 40/28/24/pill and numbers sit in rings.

Building an app? Also, seen at 390px and 1440px:
- [ ] `pm-app` is on `<html>`; navigation is `.pm-sidebar` + `.pm-tabbar`, from one list.
- [ ] On a list screen the first row of data starts within about 200px of the top on a phone. No hero, no lead paragraph.
- [ ] Lists are one `.pm-rows` card, not a card per item. Names wrap, never cut.
- [ ] Filters answer as you type or tap; chips show counts; no submit button.
- [ ] One filled button per screen; when a list is empty, the empty state holds it. Destructive is the clay wash. Create and edit open a `.pm-panel`.
- [ ] A problem is written or flagged, and its fix is on its own row.
- [ ] Loading, empty and error are designed. 44px targets on touch, fields 16px on touch.

## Docs map
**`docs/app.md` building apps, portals, admins** · `docs/principles.md` tone & mood · `docs/voice.md` conversation style · `docs/color.md` · `docs/typography.md` · `docs/layout.md` · `docs/motion.md` · `docs/components.md` (every class with HTML) · `docs/imagery.md` · `docs/frameworks.md` (Next, Svelte, Vue, Astro, Tailwind, plain HTML) · `docs/tokens.md` (generated). Skills: `skills/poiema-design`, `skills/poiema-voice`, `skills/poiema-review`. Working examples: `demo/index.html` (site), `demo/app.html` (app).

---

## Working on this repository (not on an app)
- `src/tokens.json` is the single source for tokens. `src/css/*.css` holds components (each file declares its `@layer`). `src/js/poiema.js` holds behaviors (keep every export a top-level `export function`/`export const`; the auto build strips `export`).
- `npm run build` regenerates `dist/`, `docs/tokens.md`, the contrast table in `docs/color.md`, `skills/*/references/` and `llms-full.txt`. **Never edit generated files by hand.** Commit `dist/` (GitHub installs use it; there is no public CDN).
- `npm test` builds and runs `test/`. The build fails if a contrast pair in `src/tokens.json` drops below its threshold.
- New component: add CSS in the right file, document it in `docs/components.md` (HTML snippet), add it to the cheat-sheet above and to `demo/index.html` (`demo/app.html` for app components).
- The app register is token-first: `app` in `src/tokens.json` re-points existing tokens, and the build fails on a name that doesn't exist. Reach for a token before a `.pm-app` selector. Nothing in `src/css/app.css` may change a page without `.pm-app`: scope any rule on an existing component with `:is(.pm-app, .pm-shell)`.
- After visual changes, refresh the README images with `npm run screenshots` (needs Playwright: `npm i --no-save playwright`). `screenshots/` is not shipped in the package.
- Releases come only from the **Release** workflow (`.github/workflows/release.yml`, run from GitHub Actions): it bumps `package.json` and the plugin manifest, points install snippets at the new `#semver:` range, rebuilds, writes `CHANGELOG.md`, tags `vX.Y.Z` and publishes a GitHub release listing the commits since the last tag. Never bump the version, edit `CHANGELOG.md` or tag by hand. Bump `patch` for docs, skills and fixes, `minor` for new components or tokens, `major` for renamed or removed classes and tokens or rules that make agents rewrite existing screens (while on `0.x`, breaking changes go out as `minor`).
- Zero runtime dependencies. Keep it that way.
