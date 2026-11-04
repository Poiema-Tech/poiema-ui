<!-- Copied from docs/layout.md by npm run build. Edit the original. -->

# Layout, surfaces & spacing

## Grid & rhythm
> Everything here is the gallery register, for pages. Apps have their own sizes and anatomy: see `docs/app.md`.

- **Container:** `.pm-container`, 1180px max with a fluid gutter of `clamp(16px, 4vw, 48px)`.
- **Sections:** `.pm-section` adds half of `clamp(64px, 9vw, 120px)` above and below, so sections stack with one full gap.
- **Cards** pad `clamp(28px, 5.5vw, 72px)`, which is generous. Content never touches a card's edge.
- **Gaps between cards** are small (16–20px). Cards read as a stack of plates, not a grid of tiles.
- **Breakpoints:** 900px (columns collapse) and 560px (type and padding shrink).
- **Touch:** on a coarse pointer, small targets reach 44px: `.pm-btn--sm`, `.pm-pillnav` pills, `.pm-topbar__nav` links, `.pm-choice` rows and the button in `.pm-input-group`. To hold them, the topbar and `--pm-sticky-top` go from 58px to 68px, and everything offset by that token follows. With a mouse nothing changes. The values are under Touch in `docs/tokens.md`.

## Space scale
4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64 · 72 · 96 · 120 (`--pm-space-1` … `--pm-space-30`). Typical values: 8 between chips, 12–16 between list items and tiles, 28 between a title and its body, 36 under a section head.

## Radii

| Token | px | Where |
|---|---|---|
| `--pm-radius-xl` | 40 | **Signature.** Cards, frames, tickets, dialogs, dark sections |
| `--pm-radius-lg` | 28 | Callouts |
| `--pm-radius-md` | 24 | Alerts, tiles, textareas, mobile frames |
| `--pm-radius-sm` | 14 | Inner screens, skeletons |
| `--pm-radius-xs` | 7 | Checkboxes |
| `--pm-radius-pill` | 999 | Buttons, chips, tags, inputs, nav pills |

Inside `.pm-app` the scale steps down to 24 / 20 / 16 / 12, and fields use 12 so they never read as buttons.

## Elevation
Depth comes from **light, not borders**:
1. Canvas (gray), then card (lighter paper gradient with a 1px white top highlight), then chip or input (paper).
2. Objects get a **drop-shadow** (`filter: drop-shadow(var(--pm-shadow-object))`) because they are cut-outs, not boxes.
3. Frames and tickets get one big soft shadow (`--pm-shadow-float`: `0 40px 90px -40px`).
4. Hairline outlines (`--pm-line`) mark "soft" or optional areas: outlined cards, tiles, inputs.

## Page anatomy (the reference page, generalized)

```
topbar        brand ············································ [TAG · CONTEXT]
hero          EYEBROW · DATE
              lockup / display headline
              (chip) (chip) (solid chip)
              lead paragraph with one strong phrase
              scroll cue
marquee       short phrase · object · short phrase · object …   (ink band)
section 00    (00) huge lowercase title.  + lead
              media frame / primary content
section       dark card: text + rich CTA  |  visual
section       ruled split: big statement  |  "not a script" stamp + body
pill nav      (01) a  (02) b  (03) c …                           (sticky)
features      card: object | (01) title + diamonds + callout
              dark card: huge numeral | (02) title + list + paper callout
              card (full): trio of objects with captions + split list | callout
              …
section 07    (07) title. → ticket (dark stub | paper rows) → hint + copy button
section       (—) title. → card: ✓ must keep  | outlined card: ○ your call + alert
band          EYEBROW · centered statement · five materials floating · motto
footer        dark, centered, small
```

Use what you need. This anatomy is for pages people read. **An app screen doesn't follow it:** no hero, no section heads, no lead paragraphs, no stack of cards. It is `.pm-shell` → `.pm-pagehead` → one `.pm-rows` card (`docs/app.md`).
