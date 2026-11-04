<!-- Copied from docs/app.md by npm run build. Edit the original. -->

# The app register

**Same room, working volume.** Poiema has two registers. The gallery is for things people read once. The app register is for things people come back to and use.

| It's a **site** (the gallery) when… | It's an **app** (`.pm-app`) when… |
|---|---|
| people read it once and leave | people return to get a job done |
| landing page, event page, institutional page, guide | admin, portal, dashboard, internal tool, signed-in area |
| the headline is the point | the data is the point |

Decide first. One product can hold both: a public page in the gallery and `/admin` as an app.

The register changes volume, never identity. It keeps the gray room, paper, ink, one typeface, lowercase titles, the voice and no hue in the chrome. `demo/app.html` is a working example (in an app: `node_modules/poiema-ui/demo/app.html`): read its markup when a snippet leaves you guessing.

| | Gallery | App |
|---|---|---|
| Page title | `.pm-h1` 40–88px | `.pm-h1` 26–34px, same class |
| Page opens with | hero, section head, lead paragraph | title, one line of state, then the data |
| Cards | 40px radius, 28–72px padding, paper gradient | 24px radius, 16–24px padding, flat paper |
| A list | a stack of cards | **one card with a row per thing** (`.pm-rows`) |
| Navigation | topbar that scrolls away | sidebar on a desk, floating tab bar on a phone |
| Main action | a big button in the page | header button on a desk, circle above the tab bar on a phone |
| Forms | a page of their own | a panel over the list they belong to |
| Fields | 52px pills | 44px on touch, 40px with a mouse, 12px radius |
| Motion | reveal on scroll, float, tilt | none on content, overlays only |
| Hover | lift | quiet tint |
| Numbers | rings, huge numerals | counts in badges; rings only for steps |

## Turn it on

```html
<html lang="pt-BR" class="pm-app" data-theme="light">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
`.pm-app` re-points the tokens, so `.pm-btn`, `.pm-card`, `.pm-h1`, `.pm-input`, `.pm-dialog` and the rest follow with no other change. Put it on `<html>` so dialogs, popovers and toasts inherit it. An app inside a larger site can put it on a layout wrapper instead; `.pm-shell` applies it on its own. `viewport-fit=cover` is what lets the tab bar clear the phone's home indicator.

Icons are not part of this package. Use [Lucide](https://lucide.dev) (`lucide-react`, or inline SVG), 2px stroke, `currentColor`. The components size them.

## The screen

Every signed-in screen is this. Copy it, then fill it in.

```html
<div class="pm-shell">
  <aside class="pm-sidebar">
    <a class="pm-sidebar__brand" href="/">poiema</a>
    <nav class="pm-sidebar__nav" aria-label="Main">
      <div class="pm-sidebar__group">
        <p class="pm-sidebar__title">Work</p>
        <a href="/people" aria-current="page"><svg>…</svg>People</a>
        <a href="/schedule"><svg>…</svg>Schedule <span class="pm-badge pm-badge--danger"><span class="pm-flag"></span>3<span class="pm-sr-only"> to fix</span></span></a>
      </div>
    </nav>
    <div class="pm-sidebar__user">
      <strong>Marina Duarte</strong> Administrator
      <div class="pm-cluster"><a href="/profile">My profile</a><button type="button">Sign out</button></div>
    </div>
  </aside>

  <main class="pm-shell__main">
    <header class="pm-pagehead">
      <div class="pm-pagehead__line">
        <div class="pm-pagehead__title">
          <h1 class="pm-h1">people.</h1>
          <p class="pm-pagehead__sub">167 people · 6 on vacation</p>
        </div>
        <div class="pm-pagehead__actions">           <!-- desk only -->
          <button class="pm-btn pm-btn--soft">Select several</button>
          <button class="pm-btn">Add person</button>
        </div>
      </div>
      <div class="pm-toolbar"><!-- .pm-search --></div>
      <div class="pm-pillnav pm-pillnav--bleed" role="group" aria-label="Filter"><!-- chips with counts --></div>
    </header>

    <div class="pm-rows pm-rows--columns"><!-- .pm-row, one per person --></div>
  </main>
</div>

<nav class="pm-tabbar" aria-label="Main">      <!-- phone only -->
  <a href="/people" aria-current="page"><svg>…</svg>People</a>
  <a href="/schedule"><svg>…</svg>Schedule</a>
  <a href="/menu"><svg>…</svg>Menu</a>
</nav>
<button class="pm-fab" data-pm-open="actions" aria-label="Actions for this screen"><svg>…</svg></button>   <!-- phone only -->
```

The sidebar and tab bar show or hide themselves at 900px, and so do `.pm-pagehead__actions` and `.pm-fab`. iPads in portrait get the tab bar: they are wide, but they are touched.

**The test:** on a list screen, on a 390×844 phone, the first row of data starts within about 200px of the top. If it doesn't, something above it is decoration. A screen that first has to say something (a draft to approve, a set of days to jump between) may spend more, as long as it's doing a job.

## The rules

These come from the church's rota app, which leaders use on their phones and the admin at a desk. Each one exists because something went wrong without it.

1. **Understood in two seconds.** Title, then one line that says what is happening: `167 people · 6 on vacation`. Not a sentence about what the screen is for.
2. **Navigation stays put.** Two to four tabs on a phone, Menu always last, and everything else inside Menu. On a desk, a sidebar in named groups. Build both from one list, so they can't drift apart.
3. **Screen actions have one home.** On a desk they are header buttons, and rarely used ones wait in a `⋯` menu. On a phone they live in the circle above the tab bar, in the same spot on every screen. Screens with none have no circle. One action: the circle is that action (`+`). Two or more: `⋯` opens them, with the main one last, closest to the thumb.
4. **One filled button per screen,** for what completes the job. Everything else is `--soft`, `--outline` or `--ghost`. Destructive buttons are a pale clay wash, never filled. When a list is empty, the empty state holds the action and the header stops offering it.
5. **A list is one card with a row per thing.** Not a card per thing. Rows are 44px or taller, with a title, an optional line under it, and a chevron or one trailing item.
6. **Names are never cut.** They wrap. A truncated name is a different person. Full names, no initials, no avatars unless there are real photos.
7. **Fix it where you see it.** A problem carries its own button: an open seat says `Choose`, right there. Never send someone to a menu or another screen to fix what they are looking at.
8. **Filtering answers immediately.** No submit button, no apply button. Chips show their count before you tap (`On vacation 6`), so a tap is never a guess. Counts follow the search. Hide a chip that has nothing at all, unless it's the active one; while someone is typing, keep the row still and let a 0 be the answer. Three big selects are a filter that nobody uses; a chip row and one search box are not. A second kind of filter goes behind one button that opens a sheet, and fills with ink (`aria-pressed="true"`) while it's on. If the whole list is small enough to send (hundreds of rows), filter in the browser and keep the URL in step; otherwise debounce a server query.
9. **The overlay fits the job.** See the table below. Creating or editing something keeps you on the list you came from.
10. **Clay means a problem, and is never alone.** Nothing else in the chrome has a hue. A problem is always written (`2 open seats`) or marked with `.pm-flag`, the one sharp shape in the system, so it reads without its color.
11. **No surprises on big actions.** Say exactly what will change before it happens. What can be reversed gets a toast with Undo, not a confirmation. What can't gets a dialog, with focus on Cancel.
12. **Wide screens show more, not longer.** `.pm-rows--columns` flows rows into two columns, then three. A rail (`.pm-workspace`) holds the to-do list. A row never stretches across 1400px. Only a short notice or a form stays narrow (`.pm-measure`).
13. **Nothing animates on the way in.** Data is there the moment the screen is. `data-pm-reveal` and `data-pm-stagger` do nothing inside `.pm-app`, on purpose. Only overlays move, and quickly.
14. **Every state is designed.** Loading looks like the screen it stands in for. Empty says what will be here and offers the button that starts it. Errors say what happened and offer to try again.
15. **Thumbs and mice both.** 44px targets on touch, compact with a mouse. Fields stay at 16px or more on touch, or iOS zooms the page.

## Which overlay

| Doing | Use | Phone | Desk |
|---|---|---|---|
| Tapped a name; a short choice | `.pm-sheet` | rises from the bottom | centered, 420px |
| Create or edit; pick from a long list | `.pm-panel` | full screen, back arrow | panel on the right, list still visible. Cancel means nothing happened: reset the form on the dialog's `close` event |
| Confirm something irreversible | `.pm-dialog` | centered | centered |
| Actions for this screen | `.pm-fab` + `dialog.pm-fabmenu` | blurs the screen | header buttons |
| A few more actions | `.pm-menu[popover]` + `data-pm-menu` | not needed, use the circle | under the `⋯` button |

A form earns its own page only when it is the whole job, like settings. Otherwise, use a panel. A field with a button beside it is `.pm-toolbar` > `.pm-input` + `.pm-btn`; `.pm-input-group` is for the gallery's pill fields.

## Which screen

| Screen | Build it from |
|---|---|
| A list of things | `.pm-pagehead` + `.pm-search` + `.pm-pillnav` chips + `.pm-rows.pm-rows--columns` |
| One thing | `.pm-pagehead` with a back button; its name is the title. `.pm-workspace` if it has a side column. Under 1280px the rail falls below everything, so if its content matters sooner, mark the rail `.pm-wide-only` and offer the same thing as a `.pm-narrow-only` row that opens a sheet |
| A month or a set of days | `.pm-datestrip`, one `.pm-rows` per day in a `.pm-grid`, `.pm-workspace__rail` with `.pm-todo` |
| Something awaiting approval | `.pm-notice.pm-notice--draft` above the data, `.pm-badge--dashed` beside the title |
| Numbers | `.pm-stats`, `.pm-bars` + `.pm-bars__axis` (every bar reads out its value and date, on hover and on touch), `.pm-row` with a `<progress class="pm-progress">` as its last child |
| Settings | `.pm-stack.pm-measure` of `.pm-card` and `.pm-rows` with switches and steppers |
| Everything that isn't a tab | A Menu screen: `.pm-rows` with an icon first and a line under each title. Language and sign out live here on a phone, and in `.pm-sidebar__user` on a desk, where Menu's other rows are already in the sidebar |
| Selecting many | Rows become `label.pm-row` with `.pm-check`; `.pm-selectbar` holds what to do |
| Sign in, not found, error | `.pm-gate` with one card, no navigation |
| Tables | `.pm-table` in a `.pm-card`, from 900px up. Under 900px, list the same data as rows |

## Copy in an app

The voice doesn't change. Where it lands does. **Three things are display, lowercase with a period or question mark:** the page title (`people.`), an empty state's title (`nothing here yet.`) and a dialog's question (`delete this link?`).

**Everything else is data, which keeps its case and takes no period,** whatever class it uses: a section of a screen (`Campaigns`), card headers (`Sunday, Nov 8`), rows, badges, panel titles (`Create link`).
- **A title that is a name stays a name:** `Easter service signup`, `Ana Souza`. Never `ana souza.`
- **No lead paragraph.** The sub-line states facts: `Kids · 4 Sundays · 3 open seats`.
- Rings are for steps. Counts go in a `.pm-badge` or `.pm-count`.

## Building it in React

Keep the classes; only the wiring is yours. Three things pay for themselves:

- **One nav list** (`{ key, href, label, icon, group }`) that renders both the sidebar and the tab bar, with the tabs chosen per role.
- **One action list per screen** (`{ id, label, hint, icon, primary, more, danger, onSelect }`), mapped to header buttons and to `.pm-menu__item`. The screen declares its actions once.
- **`init()` once at the root.** It wires `<dialog>`s, popover menus and `data-pm-clear` as they mount, however the route changes.

Native `<dialog>` gives you focus trapping, Esc and the top layer with no library, and `popover` gives a small menu Esc, a tap away and the top layer. Call `el.showModal()`, or use `data-pm-open`.

**Hydration.** `init()` adds nothing to the page: no children, no attributes. So a server-rendered screen still matches when React hydrates it, and what a behavior reads has to be in your markup, like the chart's `tabindex`. Rely on `data-pm-reveal` only on sites: it does write an attribute.

**Hidden routes.** With Next's `cacheComponents` (and anything using React's `<Activity>`) a route you left stays mounted under `display: none`. A modal left open there keeps the next page inert and locked against scrolling, so close it when the route hides, and give popovers ids that are unique per screen (`useId`):
```tsx
function AppDialog(props: ComponentProps<'dialog'>) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => { const el = ref.current; return () => el?.close(); }, []);
  return <dialog ref={ref} {...props} />;
}
```
A `[data-pm-open]` button finds the dialog on the visible screen by itself. In the DOM the old route's headings still exist, so scope test selectors with `:visible`.

To put a `<form>` around a panel's head, body and foot, give the form `style="display:contents"` so the panel's layout still applies. A menu closes when an item is chosen, so an item that copies should confirm with `toast('Copied ✓')`: `data-pm-copy`'s label swap would disappear with the menu.

## What not to do

These are what the gallery's habits look like when they land in a tool:

- An 88px title and a lead paragraph above the data. The first row starts 700px down.
- A card per item, each with a shadow and a hover lift: five items per screen.
- `data-pm-stagger` on a list. The rows are invisible until JavaScript runs.
- Navigation that scrolls away with the page, and sign out at the bottom of a long list.
- A search box with a Search button, plus two labeled selects, before any result.
- A new page for every form, losing the list behind it.
- `.pm-h2` in a dialog at 58px. With `.pm-app` on, it is a sensible size. Without it, it isn't.

## Known limits

- **The circle floats over content.** On a phone it can sit on top of a trailing button at rest. Scrolling moves the row out from under it, and the main column's bottom padding lets the last row clear it.
- **Toasts live under an open overlay.** While a sheet, panel or dialog is open the rest of the page is inert, so close it first, then call `toast()`. An Undo offered behind a modal can't be pressed.
- **Icons are yours.** The package ships none. `aria-hidden` on every decorative one, and a visible label on anything but the universal ones: close, back, search, menu, more, add.
