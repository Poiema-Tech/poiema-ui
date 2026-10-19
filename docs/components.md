# Components

Plain HTML + `pm-*` classes. They work in any framework: rename `class` → `className` in JSX. Behaviors marked **[JS]** need `init()` from `poiema-ui` (or the auto script). Everything else is CSS only.

## Contents
Typography · Ring · Lockup · Chips & tags · Buttons · Cards · Feature · Section head · Callout · Alert · Lists · Pill nav · Topbar · Hero · Marquee · Object & frame · Stat · Ticket · Table · Forms · Dialog · Toast · Progress, spinner, skeleton · Footer · Layout helpers · Utilities

---

## Typography
```html
<p class="pm-eyebrow">Step 02 · Details</p>
<h1 class="pm-h1">your projects.</h1>
<h2 class="pm-h2">what is a project?</h2>
<p class="pm-h3">A project is <span class="pm-muted">a place</span> for everything one goal needs.</p>
<h4 class="pm-h4">Weekly review</h4>
<p class="pm-lead">A guide so every team ships with <strong>unity, clarity and alignment</strong>.</p>
<p class="pm-display">plan. <span class="pm-muted">focus.</span> finish.</p>
<span class="pm-numeral">19</span>
```
`.pm-prose` styles raw markdown/CMS HTML (h1–h4, p, ul with diamonds, ol with rings, blockquote, code, pre, hr).

## Ring
The circled number. Use it for steps, section indexes and badges. Sizes: `--sm` 26px, default 52px (44px on mobile), `--lg` 72px.
```html
<span class="pm-ring">01</span>
<span class="pm-ring pm-ring--sm">03</span>
<span class="pm-ring">—</span>   <!-- unnumbered section -->
```

## Lockup (hero wordmark)
Small word on top, huge word below, an object replacing one letter, and a ringed badge. For one hero per product.
```html
<h1 class="pm-lockup" aria-label="poiema conf 26">
  <span class="pm-lockup__top">poiema</span>
  <span class="pm-lockup__main">
    <span>c</span>
    <span class="pm-lockup__object" data-pm-cycle aria-hidden="true">   <!-- [JS] material swap -->
      <svg style="color:var(--pm-clay)">…gem…</svg>
      <svg style="color:var(--pm-diamond)">…gem…</svg>
    </span>
    <span>nf</span>
    <span class="pm-lockup__badge">26</span>
  </span>
</h1>
```

## Chips & tags
```html
<span class="pm-chip">13 · 14 · 15 nov</span>
<span class="pm-chip pm-chip--solid"><b>26</b> days</span>
<span class="pm-chip pm-chip--outline">Draft</span>
<span class="pm-tag">Internal · Team</span>
```

## Buttons
Solid buttons use ink, so they are dark on light surfaces and paper on dark cards automatically.
```html
<button class="pm-btn">Create project</button>
<button class="pm-btn pm-btn--soft">Cancel</button>
<button class="pm-btn pm-btn--outline">Preview</button>
<button class="pm-btn pm-btn--ghost">Skip</button>
<button class="pm-btn pm-btn--danger">Delete</button>
<button class="pm-btn pm-btn--sm">Small</button>
<button class="pm-btn pm-btn--lg pm-btn--block">Large, full width</button>
<button class="pm-btn pm-btn--icon" aria-label="Close">✕</button>

<!-- Rich CTA: one per screen, for the main download / next step -->
<a class="pm-btn pm-btn--rich" href="…">
  <span class="pm-btn__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg></span>
  <span class="pm-btn__text"><b>Download files</b><small>Folder with files for every screen</small></span>
  <span class="pm-btn__arrow" aria-hidden="true">↗</span>
</a>
<!-- add pm-btn--soft for a paper rich CTA on a light page -->

<!-- [JS] copy with feedback -->
<button class="pm-btn" data-pm-copy="Text to copy" data-pm-copied="Copied ✓">Copy details</button>
<button class="pm-btn" data-pm-copy-target="#details">Copy details</button>
```
`.pm-play` is a round paper play button (for media covers).

## Cards
```html
<article class="pm-card">…</article>                         <!-- paper gradient, 40px radius -->
<article class="pm-card" data-theme="dark">…</article>       <!-- deep ink card: alternate for rhythm -->
<article class="pm-card pm-card--outline">…</article>        <!-- transparent, hairline: "optional/soft" -->
<article class="pm-card pm-card--compact">…</article>        <!-- smaller padding -->
<a class="pm-card" href="…">…</a>                            <!-- clickable: lifts on hover -->

<div class="pm-tile">                                         <!-- small outlined box -->
  <span class="pm-eyebrow">Current series</span>
  <strong class="pm-tile__title">Acts 29</strong>
  <p>Understanding the identity and mission of the church.</p>
</div>
```

## Feature (object + content card)
```html
<article class="pm-card pm-feature" data-pm-reveal>
  <div class="pm-feature__media" data-pm-tilt>                  <!-- [JS] tilt -->
    <img class="pm-object pm-float" src="object.png" alt="…">
  </div>
  <div class="pm-feature__body">
    <span class="pm-ring">01</span>
    <h2 class="pm-h2">what is a project?</h2>
    <ul class="pm-list">…</ul>
  </div>
</article>
```
`.pm-feature--flip` puts the media on the right (alternate every other card). Columns collapse under 900px.

## Section head
```html
<header class="pm-section-head">
  <span class="pm-ring">00</span>
  <h2 class="pm-h1">watch first.</h2>
  <p>Understand why we're doing this and how to use the steps below.</p>
</header>
```
Without a ring it becomes a single column.

## Callout: "the message that must be clear"
Inverted ink box. It is dark on light cards and paper on dark cards, automatically. Use it only when someone asks for a key message: it comes from a leaders' briefing, and consumer screens don't close sections with it.
```html
<div class="pm-callout">
  <span class="pm-eyebrow">The message that must be clear</span>
  <p>It isn't just a three-day schedule. It's a time to gather, grow and get direction.</p>
  <p class="pm-callout__big">Don't come for a name. Come for Jesus!</p>  <!-- optional closer -->
</div>
```
`.pm-inverse` gives any element the same flip.

## Alert
Calm and outlined. The title is one word.
```html
<div class="pm-alert" role="note">
  <strong class="pm-alert__title">Attention</strong>
  <p>Don't present this as a critique of other teams. It's a direction for us, this year.</p>
</div>
<div class="pm-alert pm-alert--danger" role="alert">…</div>
<div class="pm-alert pm-alert--success" role="status">…</div>
```

## Lists
```html
<ul class="pm-list">…</ul>                 <!-- ◆ diamonds (default) -->
<ul class="pm-list pm-list--check">…</ul>  <!-- ✓ what must be kept -->
<ul class="pm-list pm-list--open">…</ul>   <!-- ○ what is up to you -->
<ol class="pm-list pm-list--numbered">…</ol> <!-- 01 02 03 in small rings -->
```
Items are ink-2; `<strong>` inside them is ink.

## Pill nav (index, tabs, filters)
```html
<nav class="pm-pillnav pm-pillnav--sticky" aria-label="Sections">
  <a href="#b1"><span class="pm-ring pm-ring--sm">01</span> overview</a>
  <a href="#b2" aria-current="true"><span class="pm-ring pm-ring--sm">02</span> details</a>
</nav>
<div class="pm-pillnav" role="tablist">
  <button role="tab" aria-selected="true">All</button>
  <button role="tab" aria-selected="false">Drafts</button>
</div>
```
Active = `aria-current`, `aria-selected="true"` or `aria-pressed="true"` (ink fill).

## Topbar
```html
<header class="pm-topbar">
  <a class="pm-topbar__brand" href="/">poiema</a>
  <nav class="pm-topbar__nav"><a href="/projects" aria-current="page">projects</a><a href="/team">team</a></nav>
  <span class="pm-tag">Internal · Team</span>
</header>
```
Sticky, 80% canvas glass with a 14px blur. Its height is `--pm-sticky-top` (58px), and sticky children offset by it.

## Hero
```html
<section class="pm-hero pm-hero--pillars">
  <p class="pm-eyebrow">Communication guide · 18.10.2026</p>
  <h1 class="pm-lockup">…</h1>                      <!-- or .pm-display -->
  <div class="pm-cluster pm-cluster--center">
    <span class="pm-chip">13 · 14 · 15 nov</span>
    <span class="pm-chip pm-chip--solid"><b>26</b> days</span>
  </div>
  <p class="pm-lead">A guide so every team speaks with <strong>unity, clarity and alignment</strong>.</p>
  <a class="pm-scroll-cue" href="#next" aria-label="Scroll"></a>
</section>
```
`--pillars` adds the two glowing light capsules on the sides.

## Marquee
Render the group **twice**; the second copy is `aria-hidden`. Loops in 40s and pauses on hover.
```html
<div class="pm-marquee" aria-hidden="true">
  <div class="pm-marquee__track">
    <div class="pm-marquee__group"><span>from christ.</span><img src="gem.svg" alt=""><span class="pm-muted">in us.</span><img …><span>to the world.</span><img …></div>
    <div class="pm-marquee__group"><!-- exact same content --></div>
  </div>
</div>
```

## Object & frame
```html
<img class="pm-object pm-float" src="medal.png" alt="…">     <!-- cut-out + soft shadow + float -->
<div class="pm-float-group">…objects…</div>                   <!-- staggered floating -->
<div class="pm-frame">
  <video …></video>
  <button class="pm-frame__cover"><span class="pm-play"></span><span class="pm-eyebrow">Watch 2:43</span></button>
</div>
```
Assets: `poiema-ui/assets/gem.svg` (uses `currentColor`; inline it and set `color: var(--pm-clay)` etc.).

## Stat
```html
<div class="pm-stat"><strong class="pm-stat__value">26</strong><span class="pm-stat__label">days to go</span></div>
<div class="pm-stat pm-stat--stacked"><span class="pm-numeral">19</span><span class="pm-stat__label">years<br>15.11.2026</span></div>
```

## Ticket
For events, plans, receipts or summaries. The dark stub flips to paper in dark mode.
```html
<div class="pm-ticket">
  <div class="pm-ticket__main">
    <p class="pm-eyebrow">poiema conference</p>
    <div class="pm-ticket__dates"><span>13</span><span>14</span><span>15</span></div>  <!-- middle one is muted -->
    <p class="pm-ticket__month">november · 2026</p>
  </div>
  <div class="pm-ticket__side">
    <div class="pm-ticket__row"><span>Venue</span><strong>Tangaroa Hall</strong></div>
    <div class="pm-ticket__row"><span>City</span><strong>Taubaté, SP</strong></div>
    <div class="pm-ticket__row"><div class="pm-stat"><strong class="pm-stat__value" data-pm-countdown="2026-11-13T00:00:00-03:00">—</strong><span class="pm-stat__label">days to go</span></div></div>
  </div>
</div>
```
The notches use `--pm-notch` (default `--pm-canvas`). Set it to the ticket's real background if different.

## Table
```html
<div class="pm-table-wrap"><table class="pm-table">
  <thead><tr><th>Name</th><th>Status</th><th class="pm-num">Total</th></tr></thead>
  <tbody><tr><td>Lisbon trip</td><td>Planned</td><td class="pm-num">1,240</td></tr></tbody>
</table></div>
```

## Forms
```html
<label class="pm-field">
  <span class="pm-label">Email</span>
  <input class="pm-input" type="email" placeholder="you@example.com">
  <span class="pm-hint">We only use it for the confirmation.</span>
</label>
<label class="pm-field">
  <span class="pm-label">Team</span>
  <select class="pm-select"><option>Design</option></select>
</label>
<label class="pm-field">
  <span class="pm-label">Message</span>
  <textarea class="pm-textarea" aria-invalid="true"></textarea>
  <span class="pm-error">Write at least one sentence.</span>
</label>
<div class="pm-input-group"><input class="pm-input" placeholder="Search"><button class="pm-btn">Search</button></div>

<label class="pm-choice"><input class="pm-check" type="checkbox" checked> Keep me posted</label>
<label class="pm-choice"><input class="pm-radio" type="radio" name="r" checked> Monthly</label>
<label class="pm-choice"><input class="pm-switch" type="checkbox" role="switch"> Dark mode</label>
```
Invalid state: `aria-invalid="true"` (clay border). Focus: 2px ink ring. The checked radio is the brand ring.

## Dialog
Native `<dialog>`. [JS] `data-pm-open="id"` opens it, a backdrop click closes it, and `[data-pm-close]` or `<form method="dialog">` closes it.
```html
<button class="pm-btn" data-pm-open="confirm">Delete</button>
<dialog class="pm-dialog" id="confirm">
  <div class="pm-stack pm-stack--lg">
    <h2 class="pm-h2">delete project?</h2>
    <p class="pm-body">This can't be undone.</p>
    <div class="pm-cluster"><button class="pm-btn pm-btn--danger" data-pm-close>Delete</button><button class="pm-btn pm-btn--soft" data-pm-close>Cancel</button></div>
  </div>
</dialog>
```

## Toast
```js
import { toast } from 'poiema-ui';
toast('Project created ✓');
```

## Progress, spinner, skeleton
```html
<progress class="pm-progress" value="40" max="100"></progress>
<span class="pm-spinner" aria-label="Loading"></span>
<span class="pm-skeleton" style="width: 60%; height: 18px"></span>
```

## Footer
```html
<footer class="pm-footer" data-theme="dark">
  <strong class="pm-topbar__brand">poiema</strong>
  <p>Poiema · Internal use</p>
</footer>
```

## Layout helpers
| Class | Does |
|---|---|
| `.pm-container` (`--narrow`) | 1180px (820px) centered with fluid gutter |
| `.pm-section` | vertical rhythm block |
| `.pm-band` | full-width paper band (add `data-theme="dark"` for ink) |
| `.pm-stack` (`--xs --sm --lg --xl`) | vertical flex with gap 8/12/16/28/48 |
| `.pm-cluster` (`--between --center`) | wrapping row |
| `.pm-grid` (`--2 --3`) | auto-fit grid (min `--pm-min`, 280px) / fixed columns |
| `.pm-split` (`--even --top --center`) | 1.35fr / 1fr asymmetric columns |
| `.pm-ruled`, `.pm-rule` | 2px ink top rule opening a block |

Override any gap with `style="--pm-gap: 24px"`.

## Utilities
`.pm-ink .pm-ink-2 .pm-muted .pm-danger .pm-success .pm-lower .pm-upper .pm-nums .pm-balance .pm-center .pm-measure .pm-sr-only .pm-lift .pm-inverse`

## Behaviors [JS]

| Attribute | Behavior | Action function |
|---|---|---|
| `data-pm-reveal` (`="fade"`, `="scale"`) | rise and fade on scroll, once | `reveal(el, opts)` |
| `data-pm-stagger` | children reveal 80ms apart | `stagger(el, opts)` |
| `data-pm-tilt` | first child tilts toward the pointer | `tilt(el, {max, scale})` |
| `data-pm-cycle="1800"` | children cross-fade in turn | `cycle(el, {interval})` |
| `data-pm-copy="text"` / `data-pm-copy-target="#id"` | copy + "Copied ✓" | `copy(el, opts)` |
| `data-pm-countdown="ISO date"` | writes days left | `countdown(el)` / `daysUntil(date)` |
| `data-pm-open="dialogId"` | opens a `<dialog>` | `opener(el)` |
| `dialog.pm-dialog` | backdrop click + `[data-pm-close]` | `dialog(el)` |
