---
name: poiema-review
description: Audit an existing page, component, screenshot or diff against the Poiema design system and voice, then list concrete fixes (or apply them). Checks color (grayscale chrome, tokens only), typography (lowercase display + period, Inter Tight weights/tracking), geometry (40px cards, pills, rings, diamonds), motion catalogue, voice and accessibility. Use when the user asks to review, audit, "make this more Poiema", check consistency, or fix off-brand UI.
---

# Poiema review

Audit UI against the Poiema system and report **specific, located fixes**. Read `references/principles.md` first. Use `references/components.md`, `references/color.md`, `references/typography.md`, `references/motion.md` and `references/voice.md` as the rulebook.

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
4. **Prioritize:** 🔴 breaks the system (hue in chrome, wrong font, white page, missing focus/labels) → 🟡 off-voice or off-rhythm (title case, no callout, square buttons, bouncy motion) → ⚪ polish.
5. If the user asked for fixes, apply them using `pm-*` classes and tokens only, then re-run the scan.

## Checklist

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
- [ ] Cards 40px, callouts 28px, alerts and tiles 24px, controls pill.
- [ ] Numbers in `.pm-ring`; bullets are diamonds; ✓/○ for keep/free lists.
- [ ] Generous card padding; small gaps between cards; `.pm-container` width.
- [ ] Light and dark cards alternate for rhythm when there are 3+ cards.

**Content structure**
- [ ] Each explanatory section ends with a `.pm-callout` key message.
- [ ] Steps or sections are numbered `00…` in rings.
- [ ] At most one rich CTA per screen.

**Motion**
- [ ] Only catalogue motions: reveal, stagger, float, tilt, cycle, marquee, lift and nudge.
- [ ] Ease `--pm-ease`; no bounce, overshoot or decorative spin; no more than one loop per viewport.
- [ ] Reduced motion respected; `init()` called once if `data-pm-*` behaviors are used.

**Voice** (see `references/voice.md`)
- [ ] We/our, sincere; no hype or emoji; at most one `!`.
- [ ] Verb-first buttons; `Saved ✓` feedback; blameless errors; calm alert titles.

**Accessibility**
- [ ] Labels for every field; `aria-invalid` and an error message for errors.
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

the message that must be clear: <one sentence on the biggest gap>
```
