# Typography

**One family: [Inter Tight](https://fonts.google.com/specimen/Inter+Tight)** (400–900). It's a narrow grotesk, and the tightness is the point. Weight, size and negative tracking carry all hierarchy. Fallback: `"Helvetica Neue", Helvetica, Arial, sans-serif`.

## Loading the font
Pick one:
- **Google Fonts**: `@import "poiema-ui/fonts.css";` or `<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">`
- **Self-hosted**: `npm i @fontsource-variable/inter-tight` then `import "@fontsource-variable/inter-tight"` (family `"Inter Tight Variable"` is already in the stack).
- **Next.js**: `next/font/google` → `Inter_Tight({ subsets: ['latin'], variable: '--pm-font-sans' })` and put the class on `<html>`.

## Scale

| Class | Size | Weight | Tracking | Leading | Use |
|---|---|---|---|---|---|
| `.pm-lockup` | 92→290px | 800 | -0.055em | .8 | Hero wordmark only |
| `.pm-display` | 56→160px | 800 | -0.055em | .92 | Closing motto, one huge word |
| `.pm-numeral` | 76→168px | 900 | -0.07em | .8 | Dates, years, counts |
| `.pm-h1` | 40→88px | 800 | -0.05em | .92 | Section titles |
| `.pm-h2` | 34→58px | 800 | -0.05em | .95 | Card titles |
| `.pm-h3` | 26→44px | 700 | -0.035em | 1.14 | **Statements**: a full sentence set big |
| `.pm-h4` | 20→26px | 800 | -0.035em | 1.1 | Tile titles, ticket values |
| `.pm-lead` | 16→19px | 400 | 0 | 1.6 | Intro paragraph (ink-2, strong = ink) |
| body | 17px (16 mobile) | 400 | 0 | 1.6 | Everything else |
| `.pm-eyebrow` | 12px | 700 | +0.14em | 1.4 | UPPERCASE labels above titles |
| `.pm-tag` | 11px | 700 | +0.10em | 1.2 | Outlined pill label |

## Rules
1. **Display text is lowercase and ends with a period.** Write it lowercase in the source, or use `.pm-lower` for CMS content.
2. **The echo:** wrap one phrase of a display line in `.pm-muted`, usually the middle beat of a triad or the last words of a quote: `a mensagem sempre foi maior do que <span class="pm-muted">o mensageiro.</span>`
3. **Negative tracking grows with size.** Body is 0, titles -0.035em, headlines -0.05em, numerals -0.07em. Never track body text.
4. **Uppercase only for small labels**, always tracked +0.10 to +0.14em, always bold.
5. **Weights:** 400 body · 600 nav/chips · 700 labels, strong, statements · 800 headlines · 900 numerals. Avoid 300 and lighter.
6. **`<strong>` is ink, the surrounding body is ink-2.** That contrast is how emphasis reads. Use one per paragraph.
7. **Balance headlines** (`text-wrap: balance`, applied automatically) and cap them with `max-width: 14ch` in narrow columns.
8. **Tabular numbers** for times, counters and tables (`.pm-nums`).
