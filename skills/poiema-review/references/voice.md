<!-- Copied from docs/voice.md by npm run build. Edit the original. -->

# Voice — conversation style

The voice is a **pastor-editor**: warm, communal, sure of itself and brief. It speaks as **"we"** to **"our family"**, explains the *why*, draws clear boundaries and leaves room for freedom. Examples come in Portuguese (the brand's native language) and English. Apply the same rules in either.

## The ten patterns

### 1. Lowercase display headlines that end with a period
Headlines are statements, so they get a period. Questions keep their `?`.

| pt-BR | en |
|---|---|
| `assista primeiro.` | `watch first.` |
| `orientações gerais às lideranças.` | `general guidance for leaders.` |
| `por que não vamos divulgar o lineup?` | `why we won't announce the lineup?` |
| `suas tarefas de hoje.` | `your tasks for today.` |

Body text uses normal sentence case. Proper nouns stay capitalized in body copy and are lowercased only in display headlines (`o que é a poiema conference?`).

### 2. Triads with periods
Three short beats, each closed by a period. In display type the **middle beat goes gray** (`.pm-muted`), which creates the "echo."
- `de cristo. em nós. para o mundo.` / `from christ. in us. to the world.`
- In running text, use a comma triad: `com unidade, clareza e alinhamento` / `with unity, clarity and alignment`.
- App example: `plan. focus. finish.`

### 3. Reframe: "not X — Y"
Say what something is *not* before saying what it is. This is the signature rhetorical move.
- `Não é apenas uma programação de três dias. É um tempo de…` / `It isn't just a three-day schedule. It's a time of…`
- `Este material não é um roteiro de fala.` / `This isn't a script.`
- `Mais do que um evento, …` / `More than an event, …`
- `não apenas …, mas também …` / `not only …, but also …`

### 4. The message that must be clear (only on request)
The reference page briefed leaders, so each section closed with one or two sentences in a `.pm-callout` labeled **"Mensagem que precisa ficar clara"** / **"The message that must be clear"**. Poiema products mostly speak to consumers, so don't add it by default. When someone asks for it, keep it to one or two sentences that carry the point on their own.

### 5. Communal "we", warm and direct
Use `nós / nossa família / queremos / cremos` and `we / our family / we want / we believe`. Address the reader as a partner and never as a customer. No hype words ("incrível", "revolutionary", "🚀").

### 6. Freedom with boundaries
Split guidance explicitly into what must be kept (`.pm-list--check`) and what is up to the reader (`.pm-list--open`), then add one calm `.pm-alert` that guards the meaning:
> **Important.** Freedom in how you say it should not change what it means.

### 7. Calm alerts that explain
Alerts are titled with one uppercase word, **Atenção / Attention** or **Importante / Important**. They say what *not* to do and *why*, without blame and without exclamation marks.

### 8. Short verb-first actions, past-tense feedback
- Buttons: verb + object. `Baixar motions`, `Copiar informações`, `Assistir 2:43` / `Download files`, `Copy details`, `Watch 2:43`.
- Feedback: past participle + ✓. `Copiado ✓` / `Copied ✓`, `Salvo ✓` / `Saved ✓`.
- Failure: plain and blameless. `Não foi possível copiar` / `Couldn't copy`.
- Rich CTA subtitle: one line of *what you get*. `Pasta com os arquivos para cada telão` / `Folder with files for every screen`.

### 9. Typographic data
- Separate metadata with a middle dot and spaces: `Material interno · Poiemas`, `Tangaroa Hall · Taubaté`.
- Dates: `13 · 14 · 15 nov`, `18.10.2026`, `novembro · 2026`.
- Numbers are heroes: `19` (years), `26 dias` (countdown). Let one number be huge.
- Index steps with two digits in rings: `00`, `01` … `07`. `00` means "before everything".

### 10. Close with a couplet
End a page with an antithesis or anaphora pair, the one line people repeat:
- `Não venha por um nome. Venha por Jesus!` / `Don't come for a name. Come for Jesus!`
- App example: `Not more features. Fewer, better ones.`
The closing line is the only place an exclamation mark may appear.

## Microcopy kit (app contexts)

| Situation | pt-BR | en |
|---|---|---|
| Page title | `seus projetos.` | `your projects.` |
| Empty state title | `nada por aqui ainda.` | `nothing here yet.` |
| Empty state body | `Quando você criar o primeiro projeto, ele aparece aqui.` | `When you create your first project, it shows up here.` |
| Primary action | `Criar projeto` | `Create project` |
| Destructive confirm | `Excluir projeto?` + `Isso não pode ser desfeito.` | `Delete project?` + `This can't be undone.` |
| Success toast | `Projeto criado ✓` | `Project created ✓` |
| Error (form) | `Informe um e-mail válido.` | `Enter a valid email.` |
| Error (system) | `Algo não funcionou. Tente de novo em instantes.` | `Something didn't work. Try again in a moment.` |
| Loading | `Carregando…` | `Loading…` |
| Section eyebrow | `Passo 02 · Detalhes` | `Step 02 · Details` |
| Key-message callout label (on request) | `Mensagem que precisa ficar clara` | `The one thing to remember` |
| Onboarding step | `00 · comece por aqui.` | `00 · start here.` |

## Punctuation & casing rules
- Display headlines: lowercase, period at the end (or `?`).
- Eyebrows, tags and alert titles: UPPERCASE in CSS (`text-transform`), so write them in sentence case in the source.
- Buttons: Sentence case, no period.
- Body: sentence case, periods, `—` for asides, `…` for ellipsis.
- One `<strong>` per paragraph at most. It marks the phrase that must not be missed.
- No emoji. The only symbols are `·`, `✓`, `○`, `↗` and `—`.

## Self-check before shipping copy
1. Does every display headline end with `.` or `?` and stay lowercase?
2. Does each section's headline and first line carry its one point? (No key-message callout unless asked.)
3. Did you use "we/our" instead of "the company/users"?
4. Is any rhetorical "not X — Y" or triad doing real work, or is it decoration? Use them where they mean something, at most once or twice per page.
5. Are buttons verb-first, and does feedback use a past participle + ✓?
6. Zero hype words, zero emoji, at most one exclamation mark (the closing line).
