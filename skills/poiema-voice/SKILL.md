---
name: poiema-voice
description: Write or rewrite interface copy, headlines, landing-page text, onboarding, empty states, errors, buttons, toasts and announcements in the Poiema voice — sincere, communal ("we/our family"), lowercase display headlines ending with a period, triads, "not X — Y" reframes, verb-first buttons and "Saved ✓" feedback. Works in Portuguese (pt-BR) and English. Use when the user asks for copy, microcopy or text in Poiema style, or when building Poiema-styled UI that needs words.
---

# Poiema voice

The voice is a **pastor-editor**: warm, communal, sure of itself and brief. It speaks as **we** to **our family**, explains the *why*, draws clear boundaries and leaves room for freedom. Read `references/voice.md` for the full guide with examples.

## Before writing
- Detect the language from the project or the user (pt-BR or English) and keep it consistent.
- Identify the **one point** of each section. Put it in the headline and first line; everything else supports it.

## Rules
1. **Display headlines:** lowercase, end with `.` (questions with `?`). `assista primeiro.` / `watch first.` Body text uses normal sentence case.
2. **Triads:** three short beats with periods: `de cristo. em nós. para o mundo.` In display type, the middle beat gets `.pm-muted`.
3. **Reframe:** say what it is *not*, then what it is. `Não é apenas X. É Y.` / `It isn't just X. It's Y.` Also `Mais do que X, …`, `não apenas …, mas também …`.
4. **Key-message callout only on request:** the reference page briefed leaders and closed each section with a `Mensagem que precisa ficar clara` / `The message that must be clear` callout. Poiema products mostly speak to consumers, so add one (1–2 sentences) only when the user asks for it.
5. **Communal and sincere:** `nós, nossa família, queremos, cremos` / `we, our, we want, we believe`. No hype, no superlatives for their own sake, no emoji.
6. **Freedom with boundaries:** list what must be kept (✓) separately from what is up to the reader (○), and add one calm `Importante` / `Important` note that protects the meaning.
7. **Alerts:** one-word uppercase title (`Atenção`/`Attention`, `Importante`/`Important`), then what not to do and why, without blame.
8. **Actions:** verb + object, sentence case, no period: `Copiar informações` / `Copy details`. Rich CTA subtitle: what you get. Feedback: past participle + ✓: `Copiado ✓` / `Copied ✓`. Errors: plain and blameless: `Não foi possível copiar` / `Couldn't copy`.
9. **Data as type:** `13 · 14 · 15 nov`, `18.10.2026`, metadata joined with ` · `, steps `00`–`07`.
10. **Close with a couplet:** antithesis or anaphora, the only place for `!`: `Não venha por um nome. Venha por Jesus!` / `Not more features. Fewer, better ones.`

## Output format
When asked for copy for a screen, return it **by slot** so it maps onto components:
```
eyebrow:      Passo 02 · Detalhes
title (h1):   seus projetos.
lead:         Tudo o que cada objetivo precisa, em um só lugar — com **clareza** para toda a equipe.
list:         ◆ … ◆ … ◆ …
button:       Criar projeto
toast:        Projeto criado ✓
empty:        nada por aqui ainda. / Quando você criar o primeiro projeto, ele aparece aqui.
```

## Self-check
- [ ] Every display headline is lowercase and ends with `.`/`?`.
- [ ] Each section's point is in its headline and first line; no key-message callout unless asked.
- [ ] "We/our", not "the company/users".
- [ ] Triads and reframes appear where they mean something (at most 1–2 per page).
- [ ] Verb-first buttons, ✓ feedback, blameless errors.
- [ ] No hype words, no emoji, at most one `!`.
