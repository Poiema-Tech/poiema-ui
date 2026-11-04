# Token reference

> Generated from `src/tokens.json` by `npm run build`. Do not edit by hand.

Every token is a CSS custom property. Use semantic colors (`--pm-ink`, `--pm-canvas`…), never primitives, in components.

## Semantic colors

| Variable | Light | Dark | Use |
|---|---|---|---|
| `--pm-canvas` | `#e2e2e2` | `#161616` | Page background. Cool, quiet mid-gray — never pure white. |
| `--pm-surface` | `#f7f7f7` | `#262626` | Raised small things: chips, pills, inputs, nav pills, soft buttons, bands. |
| `--pm-surface-2` | `#ececec` | `#1f1f1f` | Panels and the solid base of cards. |
| `--pm-card` | `linear-gradient(160deg, #fafafa, #ececec)` | `#1f1f1f` | Card fill. Light: soft paper gradient. Dark: solid deep ink. |
| `--pm-card-edge` | `inset 0 1px 0 #ffffff` | `inset 0 1px 0 rgba(255, 255, 255, .04)` | 1px top highlight that makes cards feel lit from above. |
| `--pm-ink` | `#2b2b2b` | `#f7f7f7` | Primary text, icons, solid buttons, strong rules. |
| `--pm-ink-strong` | `#1f1f1f` | `#ffffff` | Rare extra-strong text. |
| `--pm-ink-2` | `#555555` | `#b9b9b9` | Body copy, list items, descriptions. |
| `--pm-label` | `#646464` | `#9a9a9a` | Small uppercase eyebrows and field labels (AA at 12px). |
| `--pm-muted` | `#7d7d7d` | `#8d8d8d` | The 'echo' gray inside display text (em nós.). Large text only. |
| `--pm-line` | `rgba(43, 43, 43, .14)` | `rgba(255, 255, 255, .12)` | Hairlines, outlined cards, input borders. |
| `--pm-line-strong` | `#2b2b2b` | `#555555` | Outlined alerts, tags, checkbox borders. |
| `--pm-divider` | `rgba(43, 43, 43, .08)` | `rgba(255, 255, 255, .07)` | Hairline between rows inside a card. Lighter than line, so a long list stays quiet. |
| `--pm-perforation` | `#bdbdbd` | `#4a4a4a` | Dashed ticket perforation. |
| `--pm-on-ink` | `#f7f7f7` | `#2b2b2b` | Text on an ink fill (solid buttons, callouts). |
| `--pm-on-ink-2` | `#b9b9b9` | `#555555` | Secondary text on an ink fill. |
| `--pm-on-ink-label` | `#9a9a9a` | `#646464` | Labels on an ink fill. |
| `--pm-on-ink-muted` | `#8d8d8d` | `#7d7d7d` | Echo gray on an ink fill (large text). |
| `--pm-on-ink-line` | `rgba(255, 255, 255, .16)` | `rgba(43, 43, 43, .14)` | Hairlines on an ink fill. |
| `--pm-inverse-bg` | `#2b2b2b` | `#f7f7f7` | Fill of .pm-inverse regions (= ink, but safe to read inside the region). |
| `--pm-inverse-fg` | `#f7f7f7` | `#2b2b2b` | Text of .pm-inverse regions. |
| `--pm-glass` | `rgba(226, 226, 226, .8)` | `rgba(22, 22, 22, .78)` | Blurred sticky bars. |
| `--pm-scrim` | `rgba(20, 20, 20, .38)` | `rgba(0, 0, 0, .6)` | Dialog backdrop. |
| `--pm-pillar` | `.92` | `.07` | Strength (alpha) of the white light-pillars on the hero sides. |
| `--pm-danger` | `#903b14` | `#d47b4d` | Errors and destructive actions. Clay — warm, never alarm-red. |
| `--pm-danger-soft` | `#f4e5dc` | `#3a2418` | Pale clay wash behind danger text: problem badges, destructive buttons in apps, problem notices. |
| `--pm-success` | `#3f5a08` | `#8aa83a` | Confirmations. Grass. |
| `--pm-icon-check` | *(svg)* | *(svg)* | Checkbox tick (on-ink colored). |
| `--pm-icon-chevron` | *(svg)* | *(svg)* | Select chevron (ink colored). |

## Primitives

Raw palette. Never use these directly in components; use the semantic colors below. The grays are the exact values of the reference page; the materials were sampled from its five 3D gem renders (barro, gesso, grama, ferro, diamante).

| Variable | Value |
|---|---|
| `--pm-gray-0` | `#ffffff` |
| `--pm-gray-50` | `#fafafa` |
| `--pm-gray-100` | `#f7f7f7` |
| `--pm-gray-150` | `#ececec` |
| `--pm-gray-200` | `#e2e2e2` |
| `--pm-gray-300` | `#bdbdbd` |
| `--pm-gray-350` | `#b9b9b9` |
| `--pm-gray-400` | `#9a9a9a` |
| `--pm-gray-450` | `#8d8d8d` |
| `--pm-gray-500` | `#7d7d7d` |
| `--pm-gray-550` | `#646464` |
| `--pm-gray-600` | `#555555` |
| `--pm-gray-700` | `#4a4a4a` |
| `--pm-gray-750` | `#2f2f2f` |
| `--pm-gray-800` | `#2b2b2b` |
| `--pm-gray-850` | `#262626` |
| `--pm-gray-900` | `#1f1f1f` |
| `--pm-gray-950` | `#161616` |
| `--pm-gray-1000` | `#111111` |
| `--pm-clay` | `#b8562a` |
| `--pm-clay-light` | `#d47b4d` |
| `--pm-clay-deep` | `#903b14` |
| `--pm-plaster` | `#cfcbc6` |
| `--pm-plaster-light` | `#edebe9` |
| `--pm-plaster-deep` | `#a9a49d` |
| `--pm-grass` | `#4b650a` |
| `--pm-grass-light` | `#8aa83a` |
| `--pm-grass-deep` | `#2f4305` |
| `--pm-iron` | `#534d40` |
| `--pm-iron-light` | `#777164` |
| `--pm-iron-deep` | `#2b261c` |
| `--pm-diamond` | `#c3c8ca` |
| `--pm-diamond-light` | `#eef1f2` |
| `--pm-diamond-deep` | `#8f989c` |

## Font

| Variable | Value | Note |
|---|---|---|
| `--pm-font-sans` | `"Inter Tight", "Inter Tight Variable", "Helvetica Neue", Helvetica, Arial, sans-serif` | The only typeface. Tight grotesk; weight does all the hierarchy work. |
| `--pm-font-mono` | `ui-monospace, "SF Mono", Menlo, Consolas, monospace` |  |

## Text

Font sizes. Display sizes are fluid clamps.

| Variable | Value | Note |
|---|---|---|
| `--pm-text-2xs` | `11px` |  |
| `--pm-text-xs` | `12px` |  |
| `--pm-text-sm` | `14px` |  |
| `--pm-text-md` | `16px` |  |
| `--pm-text-base` | `17px` | Body size (16px under 560px). |
| `--pm-text-lead` | `clamp(16px, 1.8vw, 19px)` |  |
| `--pm-text-xl` | `22px` |  |
| `--pm-text-h4` | `clamp(20px, 2.2vw, 26px)` |  |
| `--pm-text-h3` | `clamp(26px, 3.6vw, 44px)` |  |
| `--pm-text-h2` | `clamp(34px, 4.6vw, 58px)` |  |
| `--pm-text-h1` | `clamp(40px, 7vw, 88px)` |  |
| `--pm-text-display` | `clamp(56px, 12vw, 160px)` |  |
| `--pm-text-numeral` | `clamp(76px, 13vw, 168px)` |  |
| `--pm-text-stat` | `clamp(48px, 6vw, 72px)` | The value of a .pm-stat. |
| `--pm-text-hero` | `clamp(92px, 22vw, 290px)` | Only for the stacked hero lockup. |

## Weight

| Variable | Value | Note |
|---|---|---|
| `--pm-weight-regular` | `400` |  |
| `--pm-weight-medium` | `500` |  |
| `--pm-weight-semibold` | `600` |  |
| `--pm-weight-bold` | `700` |  |
| `--pm-weight-heavy` | `800` |  |
| `--pm-weight-black` | `900` |  |

## Tracking

| Variable | Value | Note |
|---|---|---|
| `--pm-tracking-eyebrow` | `.14em` |  |
| `--pm-tracking-tag` | `.1em` |  |
| `--pm-tracking-tight` | `-.01em` |  |
| `--pm-tracking-snug` | `-.02em` |  |
| `--pm-tracking-title` | `-.035em` |  |
| `--pm-tracking-heading` | `-.05em` |  |
| `--pm-tracking-display` | `-.055em` |  |
| `--pm-tracking-numeral` | `-.07em` |  |
| `--pm-tracking-stat` | `-.06em` |  |

## Leading

| Variable | Value | Note |
|---|---|---|
| `--pm-leading-numeral` | `.8` |  |
| `--pm-leading-display` | `.92` |  |
| `--pm-leading-heading` | `.95` |  |
| `--pm-leading-title` | `1.1` |  |
| `--pm-leading-statement` | `1.14` |  |
| `--pm-leading-snug` | `1.5` |  |
| `--pm-leading-body` | `1.6` |  |

## Radius

| Variable | Value | Note |
|---|---|---|
| `--pm-radius-xs` | `7px` |  |
| `--pm-radius-sm` | `14px` |  |
| `--pm-radius-md` | `24px` |  |
| `--pm-radius-lg` | `28px` |  |
| `--pm-radius-xl` | `40px` | The signature radius: every card, section, frame and ticket. |
| `--pm-radius-pill` | `999px` |  |

## Space

| Variable | Value | Note |
|---|---|---|
| `--pm-space-1` | `4px` |  |
| `--pm-space-2` | `8px` |  |
| `--pm-space-3` | `12px` |  |
| `--pm-space-4` | `16px` |  |
| `--pm-space-5` | `20px` |  |
| `--pm-space-6` | `24px` |  |
| `--pm-space-7` | `28px` |  |
| `--pm-space-8` | `32px` |  |
| `--pm-space-10` | `40px` |  |
| `--pm-space-12` | `48px` |  |
| `--pm-space-14` | `56px` |  |
| `--pm-space-16` | `64px` |  |
| `--pm-space-18` | `72px` |  |
| `--pm-space-24` | `96px` |  |
| `--pm-space-30` | `120px` |  |

## Layout

| Variable | Value | Note |
|---|---|---|
| `--pm-container` | `1180px` | Max content width. |
| `--pm-gutter` | `clamp(16px, 4vw, 48px)` |  |
| `--pm-section` | `clamp(64px, 9vw, 120px)` | Vertical rhythm between sections. |
| `--pm-card-pad` | `clamp(28px, 5.5vw, 72px)` |  |
| `--pm-card-pad-sm` | `clamp(24px, 4vw, 48px)` |  |
| `--pm-sticky-top` | `58px` | Height of .pm-topbar; offset for sticky elements below it. Taller on touch: see Touch. |
| `--pm-btn-h` | `48px` | Height of .pm-btn. The app register lowers every control size below. |
| `--pm-btn-h-sm` | `36px` |  |
| `--pm-btn-h-lg` | `56px` |  |
| `--pm-btn-pad` | `14px 26px` |  |
| `--pm-btn-pad-sm` | `9px 16px` |  |
| `--pm-btn-pad-lg` | `18px 32px` |  |
| `--pm-btn-text` | `15px` |  |
| `--pm-btn-text-lg` | `17px` |  |
| `--pm-field-h` | `52px` | Height of inputs and selects. |
| `--pm-field-pad` | `22px` |  |
| `--pm-field-radius` | `999px` | Pill on sites. In apps fields are soft rectangles, so a field never reads as a button. |
| `--pm-field-text` | `16px` | Never under 16px on touch: iOS zooms the page into smaller fields. |
| `--pm-chip-h` | `0px` | Minimum height of a .pm-pillnav pill. |
| `--pm-alert-pad` | `20px 24px` |  |
| `--pm-dialog-w` | `560px` |  |
| `--pm-tabbar-h` | `58px` | Height of the phone tab bar in an app. |
| `--pm-sidebar-w` | `248px` | Width of the desktop sidebar in an app. |

## Shadow

| Variable | Value | Note |
|---|---|---|
| `--pm-shadow-xs` | `0 1px 2px rgba(0, 0, 0, .05)` |  |
| `--pm-shadow-lift` | `0 18px 40px -16px rgba(0, 0, 0, .35)` |  |
| `--pm-shadow-lift-hover` | `0 24px 50px -16px rgba(0, 0, 0, .45)` |  |
| `--pm-shadow-card` | `0 1px 2px rgba(0, 0, 0, .04), 0 6px 18px rgba(0, 0, 0, .05)` | Soft lift for paper in an app: cards, rows, search, soft buttons. |
| `--pm-shadow-pop` | `0 18px 40px rgba(0, 0, 0, .2)` | Things above the page in an app: sheets, panels, menus, the tab bar. |
| `--pm-shadow-float` | `0 40px 90px -40px rgba(0, 0, 0, .5)` | Big soft shadow under frames and tickets. |
| `--pm-shadow-object` | `0 30px 34px rgba(0, 0, 0, .22)` | Use inside filter: drop-shadow() for cut-out objects. |

## Motion

| Variable | Value | Note |
|---|---|---|
| `--pm-ease` | `cubic-bezier(.2, .8, .2, 1)` | 'Settle' — fast start, long soft landing. The house curve. |
| `--pm-ease-float` | `ease-in-out` |  |
| `--pm-dur-fast` | `200ms` |  |
| `--pm-dur-base` | `300ms` |  |
| `--pm-dur-slow` | `700ms` |  |
| `--pm-dur-reveal` | `900ms` |  |
| `--pm-dur-swap` | `1000ms` |  |
| `--pm-reveal-distance` | `28px` |  |
| `--pm-stagger-step` | `80ms` |  |
| `--pm-lift` | `-2px` |  |
| `--pm-lift-lg` | `-3px` |  |
| `--pm-float-distance` | `-10px` |  |
| `--pm-float-duration` | `7s` |  |
| `--pm-marquee-duration` | `40s` |  |
| `--pm-cycle-interval` | `1800ms` | Read by the JS cycle behavior. |
| `--pm-blur` | `14px` |  |

## App register

The app register: same room, working volume. `.pm-app` or `.pm-shell` applies `tokens` to its subtree, and a fine pointer adds `fine`. Every key names an existing token (the build fails otherwise), so components change with the register and need no second version.

| Variable | App | Mouse | Note |
|---|---|---|---|
| `--pm-card` | `var(--pm-surface)` |  | Flat paper: a gradient drifts into the canvas along a long list. |
| `--pm-text-base` | `16px` |  |  |
| `--pm-text-lead` | `16px` |  |  |
| `--pm-text-h4` | `16px` |  |  |
| `--pm-text-h3` | `18px` |  |  |
| `--pm-text-h2` | `clamp(20px, 1.8vw, 24px)` |  |  |
| `--pm-text-h1` | `clamp(26px, 2.6vw, 34px)` |  | The page title. A screen starts working under it, not a scroll later. |
| `--pm-text-display` | `clamp(34px, 4vw, 48px)` |  |  |
| `--pm-text-numeral` | `clamp(40px, 4.5vw, 56px)` |  |  |
| `--pm-text-stat` | `clamp(26px, 2.6vw, 34px)` |  |  |
| `--pm-tracking-title` | `-.02em` |  |  |
| `--pm-tracking-heading` | `-.03em` |  |  |
| `--pm-tracking-display` | `-.04em` |  |  |
| `--pm-tracking-numeral` | `-.045em` |  |  |
| `--pm-tracking-stat` | `-.035em` |  |  |
| `--pm-leading-numeral` | `.95` |  |  |
| `--pm-leading-display` | `1.05` |  |  |
| `--pm-leading-heading` | `1.1` |  |  |
| `--pm-leading-title` | `1.2` |  |  |
| `--pm-leading-statement` | `1.25` |  |  |
| `--pm-leading-body` | `1.5` |  |  |
| `--pm-radius-xl` | `24px` |  | Cards, sheets, panels. 40px would clip rows that run close to the edge. |
| `--pm-radius-lg` | `20px` |  |  |
| `--pm-radius-md` | `16px` |  |  |
| `--pm-radius-sm` | `12px` |  |  |
| `--pm-gutter` | `clamp(14px, 3vw, 24px)` |  |  |
| `--pm-section` | `24px` |  |  |
| `--pm-card-pad` | `clamp(16px, 2vw, 24px)` |  |  |
| `--pm-card-pad-sm` | `16px` |  |  |
| `--pm-sticky-top` | `58px` |  | The site's default again, so `touch` never reaches an app. |
| `--pm-btn-h` | `44px` | `40px` | Touch first: 44px targets. |
| `--pm-btn-h-sm` | `44px` | `32px` |  |
| `--pm-btn-h-lg` | `48px` | `44px` |  |
| `--pm-btn-pad` | `0 18px` | `0 16px` |  |
| `--pm-btn-pad-sm` | `0 14px` | `0 12px` |  |
| `--pm-btn-pad-lg` | `0 22px` |  |  |
| `--pm-btn-text-lg` | `16px` |  |  |
| `--pm-field-h` | `44px` | `40px` |  |
| `--pm-field-pad` | `14px` |  |  |
| `--pm-field-radius` | `var(--pm-radius-sm)` |  |  |
| `--pm-chip-h` | `44px` | `36px` |  |
| `--pm-alert-pad` | `12px 14px` |  |  |
| `--pm-dialog-w` | `448px` |  |  |
| `--pm-lift` | `0px` |  | Nothing lifts on hover: a tool is touched all day. |
| `--pm-lift-lg` | `0px` |  |  |
| `--pm-dur-base` | `200ms` |  | Overlays open quickly. |
| `--pm-btn-text` | | `14px` |  |
| `--pm-field-text` | | `14px` |  |

## Touch

Sites on a touch screen. A coarse pointer re-points these tokens at `:root`, so small targets reach 44px and the offsets they push follow. With a mouse nothing changes. Every key names an existing token and is also set in `app.tokens` (the build fails otherwise), so an app keeps its own sizes.

| Variable | Touch | Note |
|---|---|---|
| `--pm-btn-h-sm` | `44px` | `.pm-btn--sm` and its round icon button. |
| `--pm-chip-h` | `44px` | A `.pm-pillnav` pill. |
| `--pm-sticky-top` | `68px` | A `.pm-topbar` holding 44px targets: 44 plus 12px of padding above and below. |

## Breakpoints

Documentation only — CSS custom properties cannot be used in media queries.

| Name | Value | Note |
|---|---|---|
| md | `900px` |  |
| sm | `560px` |  |
| app-rail | `1280px` | App: a side rail joins the main column. |
| app-columns | `1100px` | App: long lists flow into two columns (three from 1600px). |
