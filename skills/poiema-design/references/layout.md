<!-- Copied from docs/layout.md by npm run build. Edit the original. -->

# Layout, surfaces & spacing

## Grid & rhythm
- **Container:** `.pm-container`, 1180px max with a fluid gutter of `clamp(16px, 4vw, 48px)`.
- **Sections:** `.pm-section` adds half of `clamp(64px, 9vw, 120px)` above and below, so sections stack with one full gap.
- **Cards** pad `clamp(28px, 5.5vw, 72px)`, which is generous. Content never touches a card's edge.
- **Gaps between cards** are small (16–20px). Cards read as a stack of plates, not a grid of tiles.
- **Breakpoints:** 900px (columns collapse) and 560px (type and padding shrink).

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

Use what you need. An app screen is usually: topbar → `.pm-section-head` (ring + lowercase title + lead) → cards.
