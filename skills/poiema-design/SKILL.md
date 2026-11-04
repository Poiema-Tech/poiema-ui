---
name: poiema-design
description: Build or restyle web UI in the Poiema design system (poiema-ui). Sites get the gallery register — huge lowercase Inter Tight headlines, 40px cards, ringed numbers, slow settling motion. Apps, portals, admins and dashboards get the app register (`.pm-app`) — sidebar and tab bar, one card with a row per thing, sheets and panels, no motion on content. Use whenever creating pages, screens, components, landing pages, dashboards, admin areas or forms in a project that uses poiema-ui, or when the user asks for "Poiema style" or "the Poiema look".
---

# Poiema design

You build interfaces in one quiet gray room, at one of two volumes. **A site** feels like the Poiema Conf 26 direction page: type that shouts, tactile objects that carry all the color, and copy that gets to the point. **An app** is the same room at working volume: small titles, data first, navigation that stays put.

## Decide first: site or app?
- **Read once** (landing page, event, institutional, guide) → the gallery register. Follow the workflow below.
- **Used again and again** (admin, portal, dashboard, internal tool, anything behind a login) → the app register. **Read `references/app.md` first and follow it instead of steps 3 and 5 below.** `class="pm-app"` goes on `<html>`, and every screen is `.pm-shell` → `.pm-pagehead` → one `.pm-rows` card. No hero, section heads, lead paragraphs, stacks of cards, reveal or stagger. On a list screen on a 390×844 phone, the first row of data starts within about 200px of the top. `demo/app.html` in the package is a working example.

## Workflow
1. **Find the system.** Look for `node_modules/poiema-ui/` (or this repo's `dist/`). If it's missing, install it: `npm i github:Poiema-Tech/poiema-ui#semver:^0.2.2` (a private, proprietary repo; only for Poiema projects), then import `poiema-ui/css` once and load Inter Tight (see `references/frameworks.md`).
2. **Read before building:** `references/components.md` for the exact class names and HTML, and `references/principles.md` for the mood. Use `references/tokens.md` when you need a value.
3. **Plan the page as a numbered journey:** hero → `00` first step → sections `01…n` (each with a ring and a lowercase title) → closing band with a motto.
4. **Write the copy in the Poiema voice** (lowercase display + period, triads, "not X — Y", verb-first buttons, ✓ feedback). Use the `poiema-voice` skill if it's available.
5. **Add motion last,** from the catalogue only: `data-pm-reveal` on sections and cards, `.pm-float` + `data-pm-tilt` on objects, `data-pm-cycle` for material swaps. Make sure `init()` runs once at the app root.
6. **Self-review** with the checklist below. Use the `poiema-review` skill for a full audit.

## Non-negotiables
- Classes `pm-*` and tokens `--pm-*` only. No new hex values, no Tailwind default palette, no ad-hoc radii or shadows.
- **Grayscale chrome.** Page `--pm-canvas` (#e2e2e2), cards `.pm-card`, paper `--pm-surface`. Hue only on objects and illustrations (materials: clay, plaster, grass, iron, diamond) and on `--pm-danger`/`--pm-success` states.
- **Display type:** `.pm-h1/.pm-h2/.pm-display`, lowercase, ends with `.` or `?`. At most one `.pm-muted` echo phrase per line.
- **Shapes:** cards 40px, callouts 28px, alerts and tiles 24px, everything interactive pill-shaped. Numbers go in `.pm-ring`, bullets are diamonds (`.pm-list`).
- **Emphasis by inversion, never by color:** alternate `.pm-card` and `.pm-card[data-theme="dark"]`, `.pm-chip--solid` for the one hot fact. `.pm-callout` only when the user asks for a key message.
- **Calm alerts:** `.pm-alert` outlined, title "Attention"/"Important", explain why.

## Patterns to reach for on a site

| Need | Use |
|---|---|
| Page/section title | `.pm-section-head` > `.pm-ring` + `.pm-h1` + `p` |
| Explain a concept | `.pm-card.pm-feature` (object + ring + h2 + `.pm-list`) |
| Key takeaway (only when asked) | `.pm-callout` > `.pm-eyebrow` + `p` |
| Rules vs freedom | two cards: `.pm-list--check` (must keep) and `.pm-card--outline` + `.pm-list--open` (your call) + `.pm-alert` |
| Event/plan/receipt summary | `.pm-ticket` |
| Big number | `.pm-numeral` or `.pm-stat` |
| Primary download/next step | `.pm-btn.pm-btn--rich` (one per screen) |
| Section index / tabs | `.pm-pillnav` with `.pm-ring--sm` |
| Statement | `.pm-h3` (a full sentence, big, 700) |
| Closing | `.pm-band.pm-center` > eyebrow + `.pm-h3` + materials `.pm-float-group` + `.pm-display` motto |

## Patterns to reach for in an app

| Need | Use |
|---|---|
| Screen | `.pm-shell` > `.pm-sidebar` + `main.pm-shell__main`, then `.pm-tabbar` + `.pm-fab` |
| Title and state | `.pm-pagehead` > `.pm-h1` + `.pm-pagehead__sub` (`167 people · 6 on vacation`) |
| Find and filter | `.pm-search` (no submit button) + `.pm-pillnav` chips with `.pm-count` |
| A list | one `.pm-rows.pm-rows--columns` > `.pm-row`; never a card per item |
| A problem | `.pm-row--danger` + its button on the row; `.pm-flag`, `.pm-badge--danger` |
| A quick choice | `dialog.pm-sheet` |
| Create or edit | `dialog.pm-panel`, over the list |
| Confirm what can't be undone | `dialog.pm-dialog`, focus on Cancel; otherwise `toast('Removed ✓', { action })` |
| Empty | `.pm-empty` with the button that starts it |

## Checklist before you finish
- [ ] Gray page, paper/ink surfaces, no hue in chrome, no pure white page.
- [ ] Lowercase display titles with periods; one echo max; eyebrows small and uppercase.
- [ ] No key-message callout unless the user asked for one.
- [ ] Radii from tokens (a site reads 40/28/24/pill; `.pm-app` steps them down on its own); on a site, rings for numbers; diamonds for bullets.
- [ ] Motion from the catalogue only, reduced motion respected, `init()` wired once.
- [ ] Responsive at 390px: nothing overflows, columns collapse (`.pm-split`, `.pm-feature`, `.pm-grid--2/3` handle it).
- [ ] Labels on inputs, alt text on objects, `aria-current`/`aria-selected` on active pills.
- [ ] An app also passes the app checklist in `AGENTS.md`, seen at 390px and 1440px.

## References
- `references/app.md`: **apps, portals and admins**: when to use what, and why
- `references/components.md`: every class with an HTML snippet
- `references/principles.md`: tone, mood, do/don't
- `references/color.md`, `references/typography.md`, `references/layout.md`, `references/motion.md`, `references/imagery.md`
- `references/frameworks.md`: Next.js, SvelteKit, Vue, Astro, Tailwind v4, CDN
- `references/tokens.md`: every token value
