<!-- Copied from docs/principles.md by npm run build. Edit the original. -->

# Principles — tone & mood

> **Poiema** (ποίημα): *workmanship, something made*. The system grew out of the direction page for Poiema Conf 26. Its central image is material being formed: **clay → plaster → grass → iron → diamond**. The interface is the quiet studio, and the objects carry the transformation.

## The mood in one line

**A quiet gray gallery, huge confident lowercase type, and a few tactile objects floating in soft light. It is sincere and communal, and it never shouts in color.**

| It feels | It never feels |
|---|---|
| quiet, weighty, calm | loud, busy, "growth-hacky" |
| tactile and physical (objects, shadows, paper) | flat, glossy, neon, gradient-heavy |
| editorial and poster-like | dashboard-like, template-like |
| sincere and pastoral ("we", "our family") | salesy, ironic, jokey |
| clear and decisive | vague, hedging |
| contemporary and reverent | churchy-clichéd, or cold-corporate |

## The eight principles

### 1. Gray is the room; objects carry the color
Interface chrome is strictly **grayscale**: canvas `#e2e2e2`, paper `#f7f7f7`, ink `#2b2b2b`. Hue appears only inside **material objects** such as 3D renders, photos and the gem, and in the rare semantic state (danger = clay, success = grass). Never paint buttons, links or backgrounds with a hue.

### 2. Type does the shouting
Hierarchy comes from **scale, weight and tight tracking** in one family (Inter Tight). Headlines are huge, heavy (800), tightly tracked (-0.05em), **lowercase, and end with a period**: `watch first.` Everything around them is small and calm: 12px tracked uppercase eyebrows, 17px body.

### 3. Soft geometry
Every container is soft: **40px cards, pill buttons and chips, circular rings**. The only sharp shape is the small rotated-square **diamond** bullet, which echoes the gem. No 4px or 8px "app" corners on large surfaces.

### 4. One point per section
Each section makes one point, and its headline and first line carry it. Write for skimmers. The reference page, a briefing for leaders, repeated that point in an ink callout labeled *"the message that must be clear"*; Poiema products mostly speak to consumers, so add that callout only when someone asks for it.

### 5. Rhythm by inversion
Light cards and dark cards alternate. Ink boxes punctuate paper. A dark marquee band breaks the page. Contrast, not color, creates emphasis and pacing.

### 6. Numbers are structure
Content is a numbered journey: `00 watch first.` → `01` … `07`. Numbers sit in **rings**, the same drawing as the "26" badge of the logo. Dates are typographic: `13 · 14 · 15 nov`, `18.10.2026`.

### 7. Motion settles
Things **rise 28px and settle** (900ms, `cubic-bezier(.2,.8,.2,1)`). Objects **float** on a slow 7s breath and tilt toward the pointer. Materials **cross-fade**. Nothing bounces, flashes or spins for fun, and everything respects reduced motion.

### 8. Freedom with clear boundaries
The voice separates **what must be kept** (✓ checks) from **what is up to you** (○ open circles). It explains the *why* behind every rule and trusts the reader.

## Do / don't

| Do | Don't |
|---|---|
| Use `--pm-canvas` gray as the page, paper cards on top | Use pure white `#fff` pages or colored backgrounds |
| One huge lowercase headline per section, ending in `.` | Title Case Headlines Or ALL CAPS HEADLINES |
| Make one phrase gray (`.pm-muted`) to create an echo: `from christ. <span class="pm-muted">in us.</span> to the world.` | Use color or underline for emphasis in display type |
| Put the main point in the headline and first line | Bury it mid-paragraph, or repeat it in a callout nobody asked for |
| Pills for actions, rings for numbers, diamonds for bullets | Square buttons, emoji bullets, icon-font clutter |
| Real objects with soft drop shadows, floating | Flat stock illustrations, glossy 3D blobs, gradients as decoration |
| Calm outlined alerts ("Attention", "Important") | Red/yellow alert banners and exclamation icons |
| Slow reveal on scroll and gentle float | Bouncy springs, parallax overload, auto-playing noise |

## When building something that isn't a church page
The system is not tied to its source. A dashboard, a store or a tool gets the same treatment: gray room, paper cards, ink actions, one big lowercase title per view, numbered steps in rings, and a single object (product shot, gem, photo) as the only color on screen.
