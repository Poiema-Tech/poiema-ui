<!-- Copied from docs/components.md by npm run build. Edit the original. -->

# Components

Plain HTML + `pm-*` classes. They work in any framework: rename `class` → `className` in JSX. Behaviors marked **[JS]** need `init()` from `poiema-ui` (or the auto script). Everything else is CSS only.

## Contents
Typography · Ring · Lockup · Chips & tags · Buttons · Cards · Feature · Section head · Callout · Alert · Lists · Pill nav · Topbar · Hero · Marquee · Object & frame · Stat · Ticket · Table · Forms · Dialog · Toast · Progress, spinner, skeleton · Footer · Layout helpers · Utilities · **App:** Shell · Page head · Search · Rows · Badge, count, flag · Dates · Notice · Empty state · Segmented & stepper · Screen actions · Sheet · Panel · Select mode · Workspace & to-do · Numbers · Gate · Loading

**Building an app, portal or admin?** Read `docs/app.md` first, then the App section at the end of this page.

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
<button class="pm-btn" data-pm-copy="Text to copy" data-pm-copied="Copied ✓" data-pm-copy-failed="Couldn't copy">Copy details</button>
<button class="pm-btn" data-pm-copy-target="#details">Copy details</button>
```
The labels default to English: set `data-pm-copied` and `data-pm-copy-failed` in any other language.
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
Active = `aria-current`, `aria-selected="true"` or `aria-pressed="true"` (ink fill). Hover is a quiet line tint, so only the active pill looks selected. Inside a `.pm-card` or `.pm-dialog`, resting pills get a `--pm-line` hairline so they stay visible on the paper fill; on the canvas they stay plain.

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
`--pillars` adds the two glowing light capsules on the sides, always behind the content (`.pm-hero` is its own stacking context).

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
toast('Removed ✓', { action: { label: 'Undo', onClick: restore } });
```
Toasts stack at the bottom center, as wide as the message up to the page gutters. One line reads as a pill; a longer message wraps into balanced, centered lines in a 24px box. Keep it to one or two short lines. With an `action` the toast stays for 6 seconds instead of 2.2: prefer Undo to asking first. In an app on a phone, toasts clear the tab bar and the action circle. Close any open dialog first: a modal makes the rest of the page inert, toasts included.

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

In an app: `.pm-faded` (a past day: dim until hovered or focused), `.pm-phone-only`, `.pm-desk-only` (either side of 900px, where the navigation switches), `.pm-narrow-only`, `.pm-wide-only` (either side of 1280px, where a rail appears).

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
| `dialog.pm-dialog`, `.pm-sheet`, `.pm-panel`, `.pm-fabmenu` | backdrop click + `[data-pm-close]`; a sheet drags down to close and rises above the phone keyboard | `dialog(el)` |
| `data-pm-clear` | empties the search field beside it and fires `input` (React sees it) | `clear(el)` |
| `data-pm-menu` on a `popovertarget` button | places the popover under the button | `menu(el)` |
| `.pm-menu[popover]`, `dialog.pm-fabmenu` | closes when an item is chosen, returning focus to the button | `popmenu(el)` |
| `.pm-bars` | reads out a bar on hover, touch or arrow keys | `bars(el)` |

---

# App

Put `class="pm-app"` on `<html>` first: it sets the sizes every component below expects. The rules for when to use each one are in `docs/app.md`.

## Shell
Sidebar from 900px up, tab bar below it. Each hides itself, so render both.
```html
<div class="pm-shell">
  <aside class="pm-sidebar">
    <a class="pm-sidebar__brand" href="/">poiema</a>
    <nav class="pm-sidebar__nav" aria-label="Main">
      <div class="pm-sidebar__group">
        <p class="pm-sidebar__title">Work</p>
        <a href="/people" aria-current="page"><svg aria-hidden="true">…</svg>People</a>
        <a href="/schedule"><svg aria-hidden="true">…</svg>Schedule <span class="pm-badge pm-badge--danger"><span class="pm-flag"></span>3<span class="pm-sr-only"> to fix</span></span></a>
      </div>
    </nav>
    <div class="pm-sidebar__user">
      <strong>Marina Duarte</strong> Administrator
      <div class="pm-cluster"><a href="/profile">My profile</a><button type="button">Sign out</button></div>
    </div>
  </aside>
  <main class="pm-shell__main">…</main>
</div>
<nav class="pm-tabbar" aria-label="Main">
  <a href="/people" aria-current="page"><svg aria-hidden="true">…</svg>People</a>
  <a href="/menu"><svg aria-hidden="true">…</svg>Menu</a>
</nav>
```
Two to four tabs, Menu last. Render the tab bar outside `.pm-shell__main`. The main column's bottom padding already clears it.

## Page head
```html
<header class="pm-pagehead">
  <div class="pm-pagehead__line">
    <a class="pm-btn pm-btn--soft pm-btn--icon" href="/people" aria-label="Back"><svg aria-hidden="true">…</svg></a>   <!-- detail screens -->
    <div class="pm-pagehead__title">
      <h1 class="pm-h1">people.</h1>
      <p class="pm-pagehead__sub">167 people · 6 on vacation</p>
    </div>
    <span class="pm-badge pm-badge--dashed">Draft</span>                  <!-- optional state -->
    <div class="pm-pagehead__actions">                                    <!-- hidden on phones -->
      <button class="pm-btn pm-btn--soft">Select several</button>
      <button class="pm-btn">Add person</button>
    </div>
  </div>
  <div class="pm-toolbar">…search, filter button…</div>
  <div class="pm-pillnav pm-pillnav--bleed" role="group" aria-label="Filter">
    <button type="button" aria-pressed="true">All <span class="pm-count">167</span></button>
    <button type="button" aria-pressed="false">No seat <span class="pm-count">26</span></button>
    <button type="button" aria-pressed="false" data-tone="danger"><span class="pm-flag"></span>On vacation <span class="pm-count">6</span></button>
  </div>
</header>
```
`.pm-pagehead--pin` keeps only the title line on screen while a long page scrolls on a phone. `--bleed` lets the chips run edge to edge on phones. A button with `aria-pressed="true"` fills with ink: use it for a filter button with active filters.

## Search
No submit button: filter as the person types. The clear button hides itself while the field is empty, which it can only tell from the `placeholder`, so keep one.
```html
<label class="pm-search">
  <svg aria-hidden="true">…</svg>
  <input type="search" placeholder="Search by name" aria-label="Search people">
  <button class="pm-search__clear" type="button" data-pm-clear aria-label="Clear search"><svg aria-hidden="true">…</svg></button>
</label>
```

## Rows
One card, one row per thing. `.pm-rows--columns` flows five or more into two columns from 1100px and three from 1600px.
```html
<div class="pm-rows pm-rows--columns">
  <!-- the whole row is a link, with a chevron for free -->
  <a class="pm-row" href="/people/1">
    <span class="pm-row__text">
      <span class="pm-row__title">Ana Souza</span>
      <span class="pm-row__sub">married to João Souza</span>
    </span>
  </a>

  <!-- the row opens the link and a button still works: a trailing item replaces the chevron -->
  <div class="pm-row">
    <span class="pm-row__text">
      <a class="pm-row__title pm-row__link" href="/links/1">Easter signup</a>
      <span class="pm-row__sub">/pascoa · 1,204 clicks</span>
    </span>
    <button class="pm-btn pm-btn--soft pm-btn--sm" data-pm-copy="…" data-pm-copied="Copied ✓">Copy</button>
  </div>

  <!-- a problem, fixed right here -->
  <div class="pm-row pm-row--danger">
    <span class="pm-row__text">
      <span class="pm-row__title">Open seat</span>
      <span class="pm-row__sub">Check-in</span>
    </span>
    <button class="pm-btn pm-btn--outline pm-btn--sm">Choose</button>
  </div>

  <div class="pm-row pm-row--off"><span class="pm-row__text"><span class="pm-row__title">Bruno Lima</span><span class="pm-row__sub pm-row__sub--danger">On vacation that Sunday</span></span></div>

  <!-- a checkbox in front: the whole row toggles it -->
  <label class="pm-row"><input class="pm-check" type="checkbox"><span class="pm-row__text"><span class="pm-row__title">Carla Mendes</span></span></label>

  <!-- a switch or stepper behind -->
  <label class="pm-row"><span class="pm-row__text"><span class="pm-row__title">Couples serve together</span></span><input class="pm-switch" type="checkbox" role="switch"></label>

  <!-- last row: one more of what the card lists -->
  <button class="pm-row pm-row--add" type="button">Add person</button>
</div>
```
With a header and sections, as on a Sunday card:
```html
<div class="pm-rows">
  <div class="pm-rows__head"><h2>Sunday, Nov 8</h2><span class="pm-badge">4 people</span></div>
  <p class="pm-rows__label">Now</p>            <!-- small uppercase caption -->
  <p class="pm-rows__section">2 to 5 years</p> <!-- bold heading over the names under it -->
  <a class="pm-row" href="…">…</a>
</div>
<div class="pm-rows"><p class="pm-rows__empty">Nobody with that name.</p></div>
```
A row's first `<svg>` is a 22px icon (the Menu screen), and the chevron stays. Any other trailing item replaces the chevron. A `<progress>` as a row's last child spans the whole row, so every bar compares:
```html
<a class="pm-row" href="/menu/folders"><svg aria-hidden="true">…</svg><span class="pm-row__text"><span class="pm-row__title">Folders</span><span class="pm-row__sub">how links are sorted</span></span></a>

<div class="pm-row">
  <span class="pm-row__text"><span class="pm-row__title">WhatsApp</span></span>
  <span class="pm-badge">698</span>
  <progress class="pm-progress" value="58" max="100" aria-label="58 percent"></progress>
</div>
```
`<details class="pm-disclosure">` folds what is out of the way:
```html
<details class="pm-disclosure">
  <summary>Past · 3</summary>
  <div class="pm-rows pm-faded">…</div>
</details>
```

## Badge, count, flag
```html
<span class="pm-badge">3 people</span>
<span class="pm-badge pm-badge--danger"><span class="pm-flag"></span>2 open seats</span>
<span class="pm-badge pm-badge--solid">Band 1</span>
<span class="pm-badge pm-badge--outline"><svg aria-hidden="true">…</svg>Published</span>
<span class="pm-badge pm-badge--dashed">Draft</span>
<span class="pm-count">26</span>                                    <!-- inside a chip or button -->
<span class="pm-flag"></span><span class="pm-sr-only">has a problem</span>   <!-- the clay diamond -->
```
A problem is always written or flagged: never color alone, and always with text for screen readers.

## Dates
```html
<span class="pm-datetile"><small>Sun</small><b>08</b></span>
<span class="pm-datetile pm-datetile--sm"><small>Sun</small><b>08</b><span class="pm-flag"></span></span>

<nav class="pm-datestrip" aria-label="Sundays">
  <a class="pm-datetile pm-faded" href="#d1"><small>Sun</small><b>01</b></a>
  <a class="pm-datetile" href="#d8" aria-current="true"><small>Sun</small><b>08</b></a>
  <a class="pm-datetile" href="#d15"><small>Sun</small><b>15</b><span class="pm-flag"></span><span class="pm-sr-only">has open seats</span></a>
</nav>
```

## Notice
What this screen needs from you, and the button that does it. `--draft` is dashed: not final yet. `--danger` is the clay wash.
```html
<section class="pm-notice pm-notice--draft">
  <div>
    <h2>November draft: review and approve</h2>
    <p>The teams see it once every ministry has approved.</p>
  </div>
  <button class="pm-btn">Approve Kids</button>
</section>
<section class="pm-notice pm-notice--danger"><div><h2>This Sunday has no band</h2></div><button class="pm-btn pm-btn--soft">Choose</button></section>
```
Use `.pm-alert` for a calm note with nothing to press.

## Empty state
```html
<div class="pm-empty">
  <span class="pm-empty__icon"><svg aria-hidden="true">…</svg></span>
  <h2 class="pm-empty__title">nothing here yet.</h2>
  <p>When you create your first link, it shows up here.</p>
  <button class="pm-btn">Create link</button>
</div>
```

## Segmented & stepper
```html
<div class="pm-segmented" role="radiogroup" aria-label="Redirect">
  <label><input type="radio" name="r" checked><span>Temporary</span></label>
  <label><input type="radio" name="r"><span>Permanent</span></label>
</div>

<span class="pm-stepper" role="group" aria-label="People per service">
  <button type="button" aria-label="Fewer">−</button>
  <output aria-live="polite">4</output>
  <button type="button" aria-label="More">+</button>
</span>
```

## Screen actions
On a phone, the circle above the tab bar. With one action it does that action directly:
```html
<button class="pm-fab" type="button" aria-label="Add person" data-pm-open="new-person"><svg aria-hidden="true">…</svg></button>
```
With two or more it opens them, in a modal `<dialog>` so focus stays with the actions. A tap on the blur closes it, and the main action goes last, closest to the thumb:
```html
<button class="pm-fab" type="button" data-pm-open="actions" aria-label="Actions for this screen"><svg aria-hidden="true">…</svg></button>
<dialog class="pm-fabmenu" id="actions" aria-label="Actions for this screen">
  <div class="pm-menu">
    <button class="pm-menu__item" type="button">
      <span class="pm-menu__icon"><svg aria-hidden="true">…</svg></span>
      <span><span class="pm-menu__label">Select several</span><span class="pm-menu__hint">to move them at once</span></span>
    </button>
    <button class="pm-menu__item pm-menu__item--primary" type="button" data-pm-open="new-person">
      <span class="pm-menu__icon"><svg aria-hidden="true">…</svg></span>
      <span class="pm-menu__label">Add person</span>
    </button>
  </div>
  <button class="pm-fab" type="button" data-pm-close aria-label="Close actions"><svg aria-hidden="true">…</svg></button>
</dialog>
```
On a desk, the same actions are header buttons, and the rarely used ones wait in a `⋯` menu:
```html
<button class="pm-btn pm-btn--soft pm-btn--icon" type="button" popovertarget="more" data-pm-menu aria-label="More actions"><svg aria-hidden="true">…</svg></button>
<div class="pm-menu" id="more" popover>
  <button class="pm-menu__item" type="button"><svg aria-hidden="true">…</svg><span><span class="pm-menu__label">Archive</span><span class="pm-menu__hint">the address keeps working</span></span></button>
  <button class="pm-menu__item pm-menu__item--danger" type="button"><svg aria-hidden="true">…</svg><span class="pm-menu__label">Delete link</span></button>
</div>
```

## Sheet
Tapped a name, short choice. Rises from the bottom on a phone, centered at 420px on a desk. With `init()`, its top can be dragged down to close it, and it rises above the phone's keyboard.
```html
<dialog class="pm-sheet" id="person" aria-labelledby="person-name">
  <h2 class="pm-sheet__title" id="person-name">Diego Prado</h2>
  <p class="pm-sheet__sub">Kids · Sunday, Nov 8</p>
  <div class="pm-sheet__actions">
    <button class="pm-btn">Swap</button>
    <button class="pm-btn pm-btn--soft">See person</button>
    <button class="pm-btn pm-btn--ghost pm-btn--block pm-danger">Remove from schedule</button>
  </div>
</dialog>
```

## Panel
Create, edit, pick from a long list. Full screen on a phone, a right-hand panel on a desk.
```html
<dialog class="pm-panel" id="new-person" aria-labelledby="new-person-title">
  <div class="pm-panel__head">
    <button class="pm-btn pm-btn--soft pm-btn--icon" type="button" data-pm-close aria-label="Back"><svg aria-hidden="true">…</svg></button>
    <div>
      <h2 class="pm-panel__title" id="new-person-title">Add person</h2>
      <p class="pm-panel__sub">Kids</p>
    </div>
  </div>
  <div class="pm-panel__body">…fields…</div>
  <div class="pm-panel__foot">
    <button class="pm-btn pm-btn--soft" type="button" data-pm-close>Cancel</button>
    <button class="pm-btn">Save</button>
  </div>
</dialog>
```
For confirmations, use `.pm-dialog` with `.pm-dialog__foot` and `autofocus` on Cancel:
```html
<dialog class="pm-dialog" id="confirm" aria-labelledby="confirm-title">
  <h2 class="pm-h2" id="confirm-title">delete this link?</h2>
  <p class="pm-body">Printed QR codes stop working. This can't be undone.</p>
  <div class="pm-dialog__foot">
    <button class="pm-btn pm-btn--soft" data-pm-close autofocus>Cancel</button>
    <button class="pm-btn pm-btn--danger">Delete link</button>
  </div>
</dialog>
```

## Select mode
Rows turn into `label.pm-row` with a `.pm-check`, the circle goes away, and this bar holds what to do. It floats above the tab bar on a phone and sticks under the list on a desk.
```html
<div class="pm-selectbar">
  <button class="pm-btn pm-btn--ghost pm-btn--icon" type="button" aria-label="Stop selecting"><svg aria-hidden="true">…</svg></button>
  <p aria-live="polite">2 selected</p>
  <button class="pm-btn">Move to folder</button>
</div>
```

## Workspace & to-do
The main column plus a 288px rail from 1280px up. Below that, the rail follows the main column, at the very end of the page. If what's in it matters sooner, add `.pm-wide-only` to the rail and offer the same thing in a `.pm-narrow-only` row that opens a sheet.
```html
<div class="pm-workspace">
  <div class="pm-stack">…</div>
  <aside class="pm-workspace__rail">
    <div class="pm-todo">
      <span class="pm-datetile"><small>Sun</small><b>15</b></span>
      <h3>Kids · 2 open seats</h3>
      <p>2 to 5 years · Helper, Check-in</p>
      <button class="pm-btn pm-btn--outline pm-btn--sm">Fill</button>
    </div>
  </aside>
</div>
```

## Numbers
```html
<div class="pm-card pm-card--compact pm-stats">
  <div class="pm-stat pm-stat--stacked"><strong class="pm-stat__value pm-nums">3,482</strong><span class="pm-stat__label">Clicks</span></div>
  <div class="pm-stat pm-stat--stacked"><strong class="pm-stat__value pm-nums">604</strong><span class="pm-stat__label">QR scans</span></div>
</div>

<div class="pm-cluster pm-cluster--between">
  <h2 class="pm-h4">Clicks per day</h2>
  <p class="pm-small pm-nums">Most: 104 clicks · Oct 6</p>
</div>
<div class="pm-bars" role="img" aria-label="Clicks per day over the last 30 days" tabindex="0">
  <span style="--v:.4" data-value="42 clicks" data-label="Oct 5"></span>
  <span style="--v:1" data-value="104 clicks" data-label="Oct 6"></span>
  <span style="--v:0" data-value="0 clicks" data-label="Oct 7"></span>
</div>
<div class="pm-bars__axis" aria-hidden="true"><span>Oct 5</span><span>Oct 7</span></div>
<table class="pm-sr-only">…the same numbers…</table>
```
`--v` runs from 0 to 1, relative to the tallest bar. With `init()`, a bar reads out its `data-value` and `data-label`: on hover, under a finger as it slides or taps, and with the arrow keys once the chart has focus. The whole column answers, not just the painted part, and a day with nothing still has a column.

Say the highest value in the line above the chart, as here: it gives the chart a scale on screens that can't hover. Write the labels in the product's language, and leave out `title`: a native tooltip would appear over the readout.

## Gate
A screen with one job and no navigation: sign in, not found, a fatal error.
```html
<main class="pm-gate">
  <div class="pm-card pm-card--compact pm-stack">
    <h1 class="pm-h1">sign in.</h1>
    …
  </div>
</main>
```

## Loading
A skeleton shaped like the screen it stands in for, and one message for screen readers:
```html
<p class="pm-sr-only" role="status">Loading…</p>
<div class="pm-rows" aria-hidden="true">
  <div class="pm-row"><span class="pm-row__text"><span class="pm-skeleton" style="width:50%; height:16px"></span></span></div>
  <div class="pm-row"><span class="pm-row__text"><span class="pm-skeleton" style="width:66%; height:16px"></span></span></div>
</div>
```
