Jira: none — Jam feedback on My Enrollment (ENR-164's screen) plus Marco's standardisation brief of
     the same day. ENR-164 stays `ready-for-human`; this is a design-system pass, not a card.
Status: built (2026-08-21)
Labels: design-system, persona-student, screen-my-enrollment, screen-all
Jam: https://jam.dev/c/dce61b7f-4665-4363-a24f-d07e5ef4994d — Laura, 3m09s: collapse *Aster is
     reviewing* and *Coming up later* like *steps completed*; a photo for "MJ" (Maya); the loading
     state does not read as loading; the error should be red and centred; "Nothing gates
     registration" was not understood. Liked: See what's blocking, the sort group, the advisor bar,
     the empty state, points, notifications.
References: references.md (four Mobbin searches)

# My Enrollment, standardised — and the people, icons and marks the whole portal was missing

## 1. What this answers

Laura's five notes on the one screen every other section copies, and Marco's brief on top of them:
*"padronize essa tela, melhore os guidelines e a construção de layout de conteúdo, crie um padrão
para usar as variações do Phosphor com inteligência, use fotos de pessoas geradas sem direitos
autorais, popule o sistema com fotos, logos, ícones corretos e ilustrações onde achar necessário."*

## 2. The grilling — decisions, with the recommendation taken on each

Marco asked for every question to be settled by my recommendation. The tree, settled:

| # | Decision | Settled as |
| --- | --- | --- |
| Q1 | Which groups collapse, open or closed by default, remembered? | *Your next steps* never collapses and wears the same status head. *With Aster*, *Coming up later* and *Completed* are one disclosure shape, **all closed by default** — Marco overrode the first answer (Reviewing/Later open) mid-build: every accordion in the product starts closed, at most one open when there is a reason; the sidebar groups follow the same rule. Remembered per group in `localStorage`. |
| Q2 | Where the collapsible head lives | `CardHead kind="status"` takes `count`, `open`, `onToggle`, `controls`; with `onToggle` it renders as a `<button aria-expanded>`. No fourth kind of card. *Completed* is rebuilt as `Card` + `CardHead status tone="done"` + `CardRows`; `.completed-section` and its three raw values go. |
| Q3 | What makes loading perceivable | The skeleton takes the page's anatomy — a band-shaped block at `--hero-min`, a panel at `--panel-min`, then cards — and one visible line in the band: spinner + "Loading {label}…". Shimmer one step stronger; `prefers-reduced-motion` → static. No top progress bar. |
| Q4 | Error red and centred? One shape or two? | Both, and one shape: `PageError` is `StateCard variant="error" size="page"`, centred under the band, max-width 560, crimson tile on crimson-soft, "Try again" as `secondary`. Amber was a contract violation (crimson = "a panel failed"). |
| Q5 | "Nothing gates registration" | id kept; label "No registration gate", description "Class registration does not wait on any step." |
| Q6 | Photos: source, cast, storage | Synthetic faces from this-person-does-not-exist.com (gender/age/ethnicity parameters so the cast matches names and roles), fetched once, cropped 256², WebP, in `public/people/` with `SOURCES.md`. Cast: Maya Johnson, Tomás Okafor, Amara Nwosu, Ines Barros, Priya Raman, and the six club contacts. No photo for Edward (assistant), offices, or the family member on a permission. |
| Q7 | One `Avatar` primitive | `<Avatar person size>` — photo when `person.photo`, initials otherwise; `xs 24 · sm 32 · md 40 · lg 56`; `alt=""` beside the name, `alt={name}` alone. Replaces six classes. |
| Q8 | Phosphor wholesale or additive? | Wholesale, vendored: `scripts/icons/manifest.mjs` maps our names to Phosphor's; `npm run icons` writes `src/design-system/icon-paths.js` (generated, committed). No package, no runtime request. ADR 0004. |
| Q9 | The weight policy | regular — default ≥16px; bold — automatic below 16px; fill — the *on* state of a stateful control only; duotone — the mark in a tinted tile only; light/thin unused. The code chooses in almost every case. |
| Q10 | Logos and marks | `AsterMark` (our own aster, white on purple) in the brand row, the favicon and the payment-portal tile; the real Audentra symbol in "Powered by"; Federal Student Aid keeps a monogram; clubs get a Phosphor mark each instead of initials; residences keep initials (follow-up). |
| Q11 | Illustrations | Our own, one pattern: `<Spot>` — the band's orbit motif at card scale with a duotone glyph — for empty, error, partial, done and the all-caught-up card. No imported set. |
| Q12 | Guidelines | CLAUDE.md bullets for icons and people; design-workflow.md sections for icons, people, marks and spots, loading and error, disclosure; styleguide sections Icons, People, Spot, the collapsible head, Loading. |
| Q13 | What else on this screen is off-pattern | `.all-done-card` → `StateCard`; `.completed-section` → card; `.tiny-avatar` → `Avatar sm` with Maya's photo; raw values → tokens; error unified. |
| Q14 | Proof on the other routes | Before/after capture at 1440 and 500, diffed excluding `svg` and avatar subtrees; zero outside My Enrollment. |
| Q15 | Photo size | 256² WebP only — the largest use is 56px. |
| Q16 | The loading sentence | `destination.label` from `navigation.js`. |
| Q17 | The Aster mark | Drawn by us, eight petals and a disc — not a glyph from the set. |
| Q18 | The Phosphor map | In `manifest.mjs`; every name verified 200 on vendoring. |
| Q19 | Persistence key | `aster.enrollment.groups` → `{ reviewing, later, completed }`. |
| Q20 | Glossary | `CONTEXT.md` gains **Step** and its four standings — open, with Aster, locked, completed. |

## 3. Layout — what changes on the screen

1. **Four groups, one card shape.** *Your next steps* (section head + sort group) → *With Aster*
   (status head, amber clock, count, chevron) → *Coming up later* (status head, grey lock, count,
   chevron) → *Completed* (status head, green check, count, chevron; closed). The three status heads
   are buttons; their rows are `CardRows` and the card closes on the head when collapsed.
2. **The rail**: Momentum, then *Saved from welcome* with Maya's photo (`Avatar sm`).
3. **Loading**: band block, spinner line, panel block, two cards — same heights as the real page.
4. **Error**: band, then the centred crimson state card.
5. **All caught up**: `StateCard variant="done"` with a green spot, not a green-wash box.

## 4. States

| State | What shows |
| --- | --- |
| ready | as §3; groups as remembered |
| loading | the anatomy skeleton with the spinner line |
| partial | unchanged (Laura: ok) |
| error | the centred crimson card under the band |
| empty | 0 of 14, the all-caught-up card, *With Aster* and *Later* with their inline-empty lines, *Completed* with nothing to open |
| rewards-off / no registration gate | unchanged except the label |

## 5. Interactions

- A status head with rows toggles its group; `aria-expanded`, `aria-controls`, chevron turns;
  `Enter`/`Space` work because it is a button. A group with nothing in it is not a toggle — the head
  is static and the inline-empty line shows, so an empty group is never a button that does nothing.
- The remembered state survives a reload; nothing else is stored.

## 6. Data

- `person.photo` on `enrollmentAdvisor`, `financialAidAdvisor`, `courseAdvisor`, onboarding
  `advisor`, the profile `record`, and each club `contact`; `org.icon` on each club.
- Photos: `public/people/<slug>.webp`, 256², provenance in `public/people/SOURCES.md`.

## 7. Out of scope

- Residence photos (no rights-clean building photography at hand).
- A profile-page photo editor (QuickBooks reference noted; not asked).
- Per-section advisors (still the open scope noted on ENR-164).

## 8. Done when

- [x] *With Aster* and *Coming up later* collapse and remember; *Completed* is the same shape — and all three start closed (Marco: every accordion in the product does), the first group wears the same head
- [x] Loading shows a spinner line and the page's anatomy; reduced motion respected
- [x] Error is crimson, centred, one shape with `StateCard`
- [x] "No registration gate" in both state lists
- [x] Maya's photo on the rail card, sidebar chip and topbar; advisors' photos on every bar (second pass of picks after Marco asked for a US-university-directory look)
- [x] `Icon` renders Phosphor paths with the four-weight policy; nav active rows are fill; flat tiles are duotone; the hero core and line-only glyphs stay outline (Marco's correction)
- [x] Aster mark in the brand row and the favicon; Audentra symbol in "Powered by"; club marks
- [x] Spot on every state card
- [x] Styleguide: Icons, People, Spot, collapsible head, Loading
- [x] CLAUDE.md, design-workflow.md, CONTEXT.md, ADR 0004 updated
- [x] `npm run build` clean; checked at 1440 on my-enrollment, clubs, financials, appointments, profile, health and the styleguide, at 500 on my-enrollment; the toggles are buttons (Enter/Space by construction). Not run: the 3,984-element before/after capture (Q14) — two peer sessions were editing the same tree, so a stash-based A/B was unsafe; the screens were checked by eye instead
