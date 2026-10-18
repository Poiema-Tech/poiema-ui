<!-- Copied from docs/color.md by npm run build. Edit the original. -->

# Color

**The interface is grayscale. Color lives in objects.** The grays are the exact values of the reference page. The five **materials** were sampled from its 3D gem renders: barro, gesso, grama, ferro, diamante.

## Neutrals — the room

| Role | Token | Light | Dark |
|---|---|---|---|
| Page | `--pm-canvas` | `#e2e2e2` cool mid-gray | `#161616` |
| Paper (chips, inputs, bands) | `--pm-surface` | `#f7f7f7` | `#262626` |
| Panel / card base | `--pm-surface-2` | `#ececec` | `#1f1f1f` |
| Card fill | `--pm-card` | `linear-gradient(160deg, #fafafa, #ececec)` | `#1f1f1f` |
| Text, icons, solid buttons | `--pm-ink` | `#2b2b2b` | `#f7f7f7` |
| Body copy | `--pm-ink-2` | `#555555` | `#b9b9b9` |
| Small labels | `--pm-label` | `#646464` | `#9a9a9a` |
| Echo gray (large text only) | `--pm-muted` | `#7d7d7d` | `#8d8d8d` |
| Hairlines | `--pm-line` | `rgba(43,43,43,.14)` | `rgba(255,255,255,.12)` |

Pure white `#fff` appears only as the 1px top highlight on cards (`--pm-card-edge`). Pages are never white.

## Materials — the objects

| Material | pt-BR | Token | Light | Base | Deep |
|---|---|---|---|---|---|
| Clay | barro | `--pm-clay` | `#d47b4d` | `#b8562a` | `#903b14` |
| Plaster | gesso | `--pm-plaster` | `#edebe9` | `#cfcbc6` | `#a9a49d` |
| Grass | grama | `--pm-grass` | `#8aa83a` | `#4b650a` | `#2f4305` |
| Iron | ferro | `--pm-iron` | `#777164` | `#534d40` | `#2b261c` |
| Diamond | diamante | `--pm-diamond` | `#eef1f2` | `#c3c8ca` | `#8f989c` |

The order matters. It tells a story of **formation** (clay → diamond), so when you show all five, keep that sequence.

**Use materials for:** the gem and other illustrations, object renders, data-viz series, avatars and placeholders, a category dot.
**Never use materials for:** buttons, links, backgrounds, focus rings or borders of interactive UI.

### Semantic states
- `--pm-danger` (clay): errors and destructive actions. It's a warm earth tone, never alarm red. Pair it with text such as "Couldn't save", never color alone.
- `--pm-success` (grass): confirmations.
- No "warning" or "info" hue. Use a neutral `.pm-alert` with an uppercase title.

## Themes & inversion

- `data-theme="light" | "dark" | "auto"` on **any** element re-maps every semantic token for that subtree and paints it with `--pm-canvas`. Use it on `<html>` for the whole app, or on a single card for the dark-card rhythm. (`.pm-card` keeps its own card fill, `#1f1f1f` in dark.)
- `.pm-inverse` (built into `.pm-callout`, `.pm-marquee` and `.pm-ticket__main`) flips the foreground tokens and fills with ink: a **dark box on light pages and a paper box on dark cards**, automatically.
- Solid buttons use `--pm-ink` / `--pm-on-ink`, so they flip with the theme on their own.

## Accessibility

The build checks these pairs in both themes and fails if one regresses. `muted` is reserved for large display text, which needs 3:1. For small gray text, use `label` or `ink-2`. Small labels (`--pm-label`) are a little darker than the reference page's `#8a8a8a` so 12px uppercase text passes AA. Design tweak: the echo gray moved from `#8a8a8a` to `#7d7d7d` to pass 3:1 on the canvas.

<!-- contrast:start -->
| Foreground | Background | Light | Dark | Needs |
|---|---|---|---|---|
| `ink` | `canvas` | 10.93 | 16.89 | 4.5 (AA) |
| `ink` | `surface` | 13.22 | 14.13 | 4.5 (AA) |
| `ink` | `surface-2` | 11.99 | 15.39 | 4.5 (AA) |
| `ink-2` | `canvas` | 5.75 | 9.22 | 4.5 (AA) |
| `ink-2` | `surface` | 6.96 | 7.71 | 4.5 (AA) |
| `ink-2` | `surface-2` | 6.31 | 8.40 | 4.5 (AA) |
| `label` | `canvas` | 4.57 | 6.43 | 4.5 (AA) |
| `label` | `surface` | 5.52 | 5.38 | 4.5 (AA) |
| `label` | `surface-2` | 5.01 | 5.86 | 4.5 (AA) |
| `muted` | `canvas` | 3.18 | 5.45 | 3 (large text) |
| `muted` | `surface` | 3.84 | 4.56 | 3 (large text) |
| `muted` | `surface-2` | 3.48 | 4.97 | 3 (large text) |
| `on-ink` | `ink` | 13.22 | 13.22 | 4.5 (AA) |
| `on-ink-2` | `ink` | 7.22 | 6.96 | 4.5 (AA) |
| `on-ink-label` | `ink` | 5.03 | 5.52 | 4.5 (AA) |
| `on-ink-muted` | `ink` | 4.27 | 3.84 | 3 (large text) |
| `danger` | `canvas` | 5.75 | 5.81 | 4.5 (AA) |
| `danger` | `surface` | 6.95 | 4.86 | 4.5 (AA) |
| `success` | `canvas` | 6.05 | 6.67 | 4.5 (AA) |
| `success` | `surface` | 7.32 | 5.58 | 4.5 (AA) |
<!-- contrast:end -->
