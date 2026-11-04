---
name: poiema-review
description: Audit an existing page, app screen, component, screenshot or diff against the Poiema design system and voice, then list concrete fixes (or apply them). Checks color (grayscale chrome, tokens only), typography (lowercase display + period, Inter Tight weights/tracking), geometry (cards, pills, rings, diamonds), motion catalogue, voice and accessibility, and for apps also navigation, density, overlays and states. Use when the user asks to review, audit, "make this more Poiema", check consistency, fix off-brand UI, or says an app feels hard to use.
---

# Poiema review

Audit UI against the Poiema system and report **specific, located fixes**. Read `references/principles.md` first. Use `references/components.md`, `references/color.md`, `references/typography.md`, `references/motion.md` and `references/voice.md` as the rulebook.

**First, is it a site or an app?** Something people return to use (admin, portal, dashboard, tool) is an app, and `references/app.md` is its rulebook too. A big-type gallery screen is the most common defect in an app, and it is a 🔴: gallery rules passing is not the same as the app working.

## Procedure
1. **Collect the surface:** the files (templates, CSS, components) or the screenshot/URL the user points to. If you can render it, look at it at desktop width and at 390px.
2. **Scan the code mechanically** where possible:
   - hex/rgb/hsl literals outside `--pm-*` tokens → `grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(' <files>`
   - Tailwind palette classes (`bg-blue-500`, `text-red-…`, `bg-white`)
   - radii that aren't 40/28/24/14/7/pill
   - font families other than Inter Tight, weights < 400
   - headings with Title Case or no final period
   - animations or transitions not built on `--pm-ease`/catalogue durations
3. **Walk the checklist** below and record each miss with file:line (or screen region), what's wrong, and the exact fix (class or token to use).
4. **Prioritize:** 🔴 breaks the system (hue in chrome, wrong font, white page, missing focus/labels) → 🟡 off-voice or off-rhythm (title case, square buttons, bouncy motion) → ⚪ polish.
5. If the user asked for fixes, apply them using `pm-*` classes and tokens only, then re-run the scan.

## Checklist

**App** (skip for a site)
- [ ] `pm-app` on `<html>`. Nav is `.pm-sidebar` + `.pm-tabbar`, always reachable; sign out isn't at the bottom of a long list.
- [ ] Measure it: on a list screen on a 390×844 phone, the first row of data starts within about 200px of the top. No hero, section head or lead paragraph above it.
- [ ] A list is one `.pm-rows` card, not a card per item. Rows 44px+, names wrap and are never cut.
- [ ] Filters answer immediately, chips show counts, no Search or Apply button, no wall of labeled selects.
- [ ] One filled button per screen. Screen actions: header on a desk, `.pm-fab` on a phone. Destructive is the clay wash.
- [ ] Create and edit open a `.pm-panel`. Quick choices use `.pm-sheet`. `.pm-dialog` only for what can't be undone, with focus on Cancel; what can be undone gets a toast with Undo.
- [ ] A problem is written or flagged with `.pm-flag`, and its fix is on its own row.
- [ ] No `data-pm-reveal`/`data-pm-stagger` on content. Loading looks like the screen; empty offers the next step; errors offer a retry.
- [ ] 44px targets on touch; fields 16px on touch (14px only under `pointer: fine`).
- [ ] Wide screens show more (`--columns`, a rail), not longer rows.

**Color**
- [ ] Page is `--pm-canvas`, never `#fff`; cards `.pm-card`; paper `--pm-surface`.
- [ ] No hue on buttons, links, backgrounds, borders or focus. Materials appear only in objects and data.
- [ ] Errors use `--pm-danger` (clay) with text; success uses `--pm-success`.
- [ ] Small gray text uses `--pm-label`/`--pm-ink-2`, not `--pm-muted`.

**Typography**
- [ ] Inter Tight only; 400 body, 700 labels, 800 headlines, 900 numerals.
- [ ] Display headlines are lowercase, end with `.`/`?`, have negative tracking, and use `text-wrap: balance`.
- [ ] Eyebrows: 12px, 700, uppercase, +0.14em, placed above titles.
- [ ] At most one `.pm-muted` echo per display line; one `<strong>` per paragraph.

**Geometry & layout**
- [ ] Cards 40px, callouts 28px, alerts and tiles 24px, controls pill (in `.pm-app` these step down on their own; flag hard-coded radii, not the smaller values).
- [ ] Numbers in `.pm-ring`; bullets are diamonds; ✓/○ for keep/free lists.
- [ ] Generous card padding; small gaps between cards; `.pm-container` width.
- [ ] Light and dark cards alternate for rhythm when there are 3+ cards (sites only).

**Content structure**
- [ ] Each section's main point is in its headline or first line, not buried mid-paragraph. A key-message `.pm-callout` is optional and only on request; never flag its absence.
- [ ] Steps or sections are numbered `00…` in rings (on a site; an app numbers only real steps).
- [ ] At most one rich CTA per screen.

**Motion**
- [ ] Only catalogue motions: reveal, stagger, float, tilt, cycle, marquee, lift and nudge (in an app, only the overlay motions).
- [ ] Ease `--pm-ease`; no bounce, overshoot or decorative spin; no more than one loop per viewport.
- [ ] Reduced motion respected; `init()` called once if `data-pm-*` behaviors are used.

**Voice** (see `references/voice.md`)
- [ ] We/our, sincere; no hype or emoji; at most one `!`.
- [ ] Verb-first buttons; `Saved ✓` feedback; blameless errors; calm alert titles.

**Accessibility**
- [ ] Labels for every field; `aria-invalid` and an error message for errors.
- [ ] A hint or error sits outside the `<label>` and is tied to its field by `aria-describedby`. A `label.pm-row` with a sub-line points `aria-labelledby` at the title and `aria-describedby` at the sub.
- [ ] Visible focus (don't remove outlines); `aria-current`/`aria-selected` on active pills.
- [ ] Alt text on meaningful objects, `alt=""` + `aria-hidden` on decorative ones; marquee duplicate `aria-hidden`.
- [ ] Contrast: never put `--pm-muted` on small text.

## Report format
```
## poiema review — <target>

score: 7/10 · 2 🔴 · 4 🟡 · 3 ⚪

🔴 src/app/page.tsx:42 — primary button is bg-blue-600 → use class "pm-btn"
🟡 src/app/page.tsx:18 — "Your Projects" → "your projects." (.pm-h1)
⚪ …

biggest gap: <one sentence>
```
