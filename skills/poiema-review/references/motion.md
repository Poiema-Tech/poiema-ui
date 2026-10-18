<!-- Copied from docs/motion.md by npm run build. Edit the original. -->

# Motion

**Things arrive and settle. Objects breathe. Materials transform.** Motion is slow, physical and sparse. Use it to reveal and to give weight, never to entertain.

## The house curve
`--pm-ease: cubic-bezier(.2, .8, .2, 1)` ("settle"): a fast start and a long, soft landing. Use it for every movement except the float (`ease-in-out`) and the marquee (`linear`).

## Durations

| Token | ms | For |
|---|---|---|
| `--pm-dur-fast` | 200 | hover lift, color/background changes |
| `--pm-dur-base` | 300 | controls appearing, dialogs, toasts, rich-button hover |
| `--pm-dur-slow` | 700 | cross-fade opacity |
| `--pm-dur-reveal` | 900 | scroll reveal |
| `--pm-dur-swap` | 1000 | material swap transform |

## The catalogue

| Motion | How | Values |
|---|---|---|
| **Reveal** | `data-pm-reveal` (JS) | opacity 0→1, translateY 28px→0, 900ms settle, once, at 10% visible |
| **Stagger** | `data-pm-stagger` on a parent (JS) | children reveal 80ms apart |
| **Float** | `.pm-float` (+ `.pm-float-group`) | translate 0 → -10px → 0 over 7s, ease-in-out, siblings offset -1.2s |
| **Tilt** | `data-pm-tilt` on a wrapper (JS) | first child: perspective 700px, ±9° on X/Y following the pointer, scale 1.04, 250ms ease-out. Hover devices only. |
| **Material swap** | `data-pm-cycle` (JS) | stacked children; outgoing → opacity 0, scale .9, rotate -8°; incoming → none. Every 1.8s. |
| **Marquee** | `.pm-marquee` | track moves -50% in 40s linear, content rendered twice, pauses on hover |
| **Lift** | `.pm-btn`, `.pm-lift` | translateY -2px (rich CTA -3px plus a stronger shadow), 200ms settle |
| **Nudge** | `.pm-btn__arrow`, `.pm-btn__icon svg` | ↗ moves (3px, -3px); download icon moves down 2px |
| **Scroll cue** | `.pm-scroll-cue` | a dot drops inside a mouse outline, 1.8s loop |
| **Copy feedback** | `data-pm-copy` (JS) | label swaps to "Copied ✓" for 2.2s |
| **Dialog / toast** | `.pm-dialog`, `toast()` | rise 28px + fade, 300ms settle |
| **Sticky glass** | `.pm-topbar` | `backdrop-filter: blur(14px)` over 80% canvas |

## Rules
1. **Reveal containers, not atoms.** Put `data-pm-reveal` on sections and cards, not on every paragraph or button.
2. **Float only objects** (cut-out images, the gem), never text or cards.
3. **One looping thing per viewport.** A floating object or a marquee is enough. Don't stack loops.
4. **No bounce, no overshoot, no spin** (except the loading spinner).
5. **Respect `prefers-reduced-motion`.** Already handled: reveals show instantly, loops stop, tilt is disabled. If you write new motion, add it to the reduced-motion block.
6. Hover effects only on `(hover: hover)` devices when they rely on the pointer (tilt).

## Without JS
All CSS motion (float, marquee, lift, nudge, scroll cue, dialog/toast transitions) works without JavaScript. JS-driven content (`data-pm-reveal`) is hidden only when scripting is enabled, and a CSS failsafe reveals it after 2.5s if `init()` never runs.
