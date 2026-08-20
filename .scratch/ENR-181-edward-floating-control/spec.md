Jira: ENR-181
Status: ready-for-agent
Labels: design, persona-student, screen-edward-student, wave-w2
Jam: —

> Jira status is `Development`. `docs/agents/triage-labels.md` has no such role; `ready-for-agent` is
> the nearest and the card is fully specified. Jira stays authoritative.

# Edward — one control, three forms, thirteen pages

## 1. What this screen answers

*Can I ask about this, without leaving it?* — [ENR-169](https://audentra.atlassian.net/browse/ENR-169),
behaviour from [ENR-175](https://audentra.atlassian.net/browse/ENR-175) (open from anywhere without
losing my place) and [ENR-176](https://audentra.atlassian.net/browse/ENR-176) (answers from my own
record, or a route to a person).

### Two corrections to the card

1. **"This screen already exists" is false in this repo.** `docs/portal-build-order.md` records
   ENR-181 as *does not exist*, and there is no `#/edward` route to retire. ENR-175 Scenario 2 —
   "the old page route no longer resolves" — is therefore satisfied by construction, not by a
   deletion. This is a build.
2. **`Help` is not Edward.** `#/help` is its own destination with its own card
   ([ENR-182](https://audentra.atlassian.net/browse/ENR-182)). But its `lede` in
   `src/lib/navigation.js` promises *"Ask Aster anything that is blocking a step"* — the same promise
   Edward makes, under a different name. Two surfaces cannot make one promise. Fixed here as part of
   the vocabulary rule in section 9.

The card carries no `Out of scope` and no `Guardrails`. The binding contract is the sixteen
acceptance criteria of ENR-175 and ENR-176.

## 2. The three forms

| Form | 821px and up | 621–820px | 620px and below |
| --- | --- | --- | --- |
| **Collapsed** | pill `Ask Edward`, fixed to the lower-right | same | same, compact padding |
| **Expanded** — one conversation | floating window, `min(420px, 100vw - 32px)` by `min(620px, 100vh - 108px)`, anchored to the corner | same | bottom sheet, `min(88vh, 760px)`, radius `23px 23px 0 0`, `sheetIn` |
| **Fuller** — history | same window widened to `min(720px, 100vw - 32px)`, two panes: list `232px` + conversation | one pane: the list **replaces** the conversation, with a back control | same |

A floating window, not a full-height rail: the student has to keep seeing the thing they are asking
about, which is the whole of ENR-175. Reference:
[Linear](https://mobbin.com/screens/51c2bd60-f22d-4879-8c28-c5800ac1f4b6).

A **labelled pill**, not a circle: the portal has no other floating element, so there is nothing to
learn the affordance from. The label is the affordance.

**No badge, ever.** The topbar bell owns notification; Edward owns questions. Edward changes no
record (ENR-176 AC5), so it has nothing to announce.

Header controls, left to right: title, then history, new conversation, close. Reference:
[Fabric](https://mobbin.com/screens/584d470e-5926-4b98-9f8c-693e030fea85).

## 3. The corner is never taken — ENR-175 AC7

Three mechanisms, because one is discipline and three is structure.

1. **Reserved.** `--safe-bottom` in `:root`. `PageShell`'s footer reserves it, so page content can
   never end underneath the pill. Any future fixed page action reads the same token.
2. **Yielded.** While any dialog owns the screen — `TaskDrawer`, `AcademicDrawer`, `CampusDrawer`,
   `InfoModal`, the mobile navigation — the pill is not rendered, and an opening dialog collapses
   Edward. **One overlay owns the screen at a time** is the rule.
3. **Cleared.** The toast is centred with `max-width: min(430px, 100vw - 30px)`, so its right edge
   crosses the pill's left edge below about 734px. Both now read `--toast-bottom`, which the 820px
   breakpoint lifts to `calc(var(--safe-bottom) + 10px)` — one token, so the two can never be laid
   out into each other again. Measured at 380px: toast bottom 654, pill top 682.

Verified by sweeping the pill's whole rectangle against `elementsFromPoint` on all fourteen routes
at 1440, 800 and 380px, with each page scrolled to its end: 42 checks, no interactive element
underneath. See section 16.

## 4. Context — ENR-175 AC4

The chip lives **inside the composer**, removable with a close control. References:
[Notion](https://mobbin.com/screens/6a524e27-e401-4806-b36e-b07c07a468da),
[ChatGPT](https://mobbin.com/screens/e8593f58-6950-4b25-b85d-df479726334a),
[Comet](https://mobbin.com/screens/15aad059-d954-44e8-ae71-55128f8e4f4b).

- The chip always names **the current page** — `My Enrollment`, `My Financials · Payments`.
- Each sent message **stores the context it was sent with** and shows it as a caption on the bubble.

So the chip never lies about the next question, and the transcript never lies about an old one. A
chip that followed navigation would silently rewrite what a past answer was about; a chip pinned to
where the conversation opened would go stale the moment the student moved.

Removing the chip is allowed: the next question is then asked of the record at large.

## 5. Suggested questions — ENR-176 AC7

Full-width stacked rows, wrapping to two lines, never truncating, in two groups:

- **About this page** — one or two, keyed to the destination.
- **What's outstanding** — up to three, derived from the open steps in `src/data.js`.

Reference: [Asana](https://mobbin.com/screens/f2b651ef-bce1-464c-9c47-52f2fb187238). Horizontal chips
rejected: they truncate the long ones and hide the rest.

The count is two to five and the length varies, which is the point. Today the record carries six open
steps, `income-verification` 13 days out (inside `ESCALATION_WINDOW`), and the federal loan pending
on it — so those lead.

**Scenario 5 is structural.** The deposit suggestion is built from `snapshot.payments`. In the
`aid-final` preview the deposit is `received`, so the suggestion is not generated. Completing the
task in the UI removes it from `tasks` and does the same. Neither path is a special case.

## 6. What an answer looks like — ENR-176 AC4, AC5

Body, then a **source line**, then a **route**:

> Your income verification is due Sep 2 — 13 days from today. Until Financial Services clears it,
> your Federal Direct Subsidized Loan stays pending and its amount is not on your balance.
>
> *Based on your record · My Enrollment* — [ Open Verify your household income ]

- Record answers say `Based on your record · <destination>`. Guidance answers say
  `Based on Aster's published guidance · <topic>`. Every answer says which.
- Edward performs no action. **The route is the action** (AC5). Following it navigates and collapses
  Edward on the mobile sheet; on desktop the window is non-modal, so it stays.
- Every answer carries `Play answer` — see section 8.

## 7. No answer, and another student — ENR-176 AC2, AC3

`src/lib/edward.js` is handed one record: this student's. There is no second student in
`src/data.js` to resolve, and the only people the staff directory holds are the two advisors. A
question about a classmate resolves to nothing because the lookup has nothing to find — not because
a string was matched and refused.

The dead end always ends in a **named person**, using the advisor block the portal already shows:

| Topic | Person |
| --- | --- |
| Money, aid, payments, verification | Amara Nwosu · Student Financial Services |
| Everything else | Tomás Okafor · Admissions Office |

[TravelPerk](https://mobbin.com/screens/dd154cd6-e461-46c9-8cb3-38f6ddbc489e) is the shape to avoid:
it states the absence and stops there.

## 8. Voice — ENR-176 AC8

Simulated, and labelled as such, following the `prototypeNote` convention already in `src/data.js`.

- **In**: mic, then `Listening…` with a waveform, then the field fills with the question, which the
  student edits before sending. Nothing sends itself.
- **Out**: `Play answer` on every answer, then `Playing…` with the same waveform. Same answer, same
  source line, same caution — voice is a method, not a second capability with different limits.
- **Denied**: a `Microphone unavailable` line in the composer, with the typed field still there.

## 9. Vocabulary — one promise per name

- **Edward** is the assistant. It is the only thing called Edward and it has exactly one entry point:
  the pill. No page grows an "Ask Edward" button.
- **"Ask a named person or office"** is always a human. `Ask your advisor` (`CreditMatchCard`,
  `AcademicDrawer`) and `Ask Student Life` (`CampusRail`) are correct and stay.
- **Aster** is the institution, never a respondent. `navigation.js`'s Help entry stops saying *"Ask
  Aster anything that is blocking a step"*.

## 10. States

Reusing the portal's own vocabulary from `src/lib/preview-state.js`, so Edward has no private state
language. Reachable from the `Concept preview` pill on any page.

| State | Edward |
| --- | --- |
| `loading` | Window opens on a skeleton: greeting line, three suggestion rows. Composer disabled. |
| `ready` | Greeting, grouped suggestions, composer. Sending, then thinking, then a grounded answer. |
| `empty` | No record yet: suggestions collapse to the guidance group, and record questions say the record holds nothing so far, with the route to a person. |
| `partial` | Edward opened, the record did not. Guidance still answers; record questions say so explicitly and offer the person. This is the honest partial, not a spinner. |
| `error` | Sending fails: an error bubble in the thread with `Try again`, the question preserved in the field. The window itself still opens — Edward failing to answer is not Edward failing to exist. |

Plus, reachable by interaction rather than by the preview menu: thinking, listening, playing, no
answer, and the empty history.

## 11. Accessibility and "exactly where I was" — ENR-175 AC3, AC6, Scenario 5

- **Desktop: non-modal.** No scrim, no focus trap, the page stays interactive and scroll is never
  touched. `role="dialog"` without `aria-modal`. This is what makes Scenario 5 true by construction:
  the page never unmounts, never scrolls, and unsaved input is never remounted.
- **620px and below: modal.** Scrim, focus trapped, `overscroll-behavior: contain` — the same
  treatment the sidebar drawer already gets. No body scroll lock exists in this repo, and this card
  does not add one.
- `Esc` closes and returns focus to the pill, at both sizes.
- The thread is a `log` with `aria-live="polite"`; thinking is announced once, not per frame.
- `prefers-reduced-motion` kills the sheet animation, the waveform and the thinking pulse.

## 12. Data

Reads, never writes:

- `src/data.js` — `initialTasks`, `initialCompleted`, `initialReviewing`, `lockedTasks`,
  `financialStates`, `enrollmentAdvisor`, `financialAidAdvisor`, `TOTAL_STEPS`, `PORTAL_TODAY`,
  `ESCALATION_WINDOW`.
- `src/lib/navigation.js` — the destination for the context chip and for every route an answer
  offers. An answer can never name a page the navigation does not have.
- **New** `src/data-edward.js` — greeting, the standing caution, the guidance corpus, the staff
  routes, and three seeded conversations so ENR-175 Scenario 3 has something to browse.
- **New** `src/lib/edward.js` — the record-bounded engine: `suggestionsFor`, `answerFor`, `routeFor`.

Conversations persist in `localStorage` under `aster.edward`, mirroring `aster.nav.groups`.

## 13. The standardization this card carries

Agreed scope: tokens plus one overlay primitive. Not a copy sweep.

1. **Layer scale.** `z-index` was 20 / 29 / 30 / 40 / 50 / 70 / 71 / 90 / 120 with no names. Now
   `--z-topbar`, `--z-nav-scrim`, `--z-sidebar`, `--z-popover-scrim`, `--z-popover`, `--z-edward`,
   `--z-scrim`, `--z-panel`, `--z-modal`, `--z-toast`.
2. **Bottom safe area.** `--safe-bottom`, read by the pill, the toast and `PageShell`.
3. **One overlay primitive.** `src/lib/overlay.js` — opener memory, focus in, focus return, `Esc`,
   tab trap, `modal`, `suspended`. Before this card: `TaskDrawer` and `InfoModal` had **no trap at
   all** and leaned on a global `Esc` listener in `App.jsx`; `AcademicDrawer` and `CampusDrawer` each
   carried their own copy of a `FOCUSABLE` constant and their own trap, subtly different from each
   other. The four now use the hook, and `Sidebar` — the one overlay that never unmounts, so the
   hook's mount-scoped lifetime does not fit it — reads the shared `FOCUSABLE` instead of a fifth
   copy of it.

   **This fixed a real defect.** The global `Esc` listener closed every overlay at once, so pressing
   `Esc` on the points modal opened from inside a task drawer closed the drawer as well. The stack
   now unwinds one layer at a time: verified, first `Esc` closes the modal and leaves the drawer,
   second closes the drawer.
4. **Motion tokens.** `--dur-fast`, `--dur-base` and `--ease` replace the loose `.22s`, `.25s`,
   `.26s`.
5. **`--shadow-float`.** The floating-window shadow, shared by `.info-modal` and the Edward window,
   so the family has three named shadows instead of two named and two inline.

## 14. Raised, not absorbed

- **`TaskDrawer` hard-codes what the task already carries.** The external panel prints
  `payments.harvard.edu` and the destination name as literals, and the upload panel hard-codes the
  immunization copy, while `task.destination` and `task.upload` hold the real values for every task.
  The Harvard string is a brand leak that survived the ENR-167 rebrand and is fixed here — one line.
  The wider "read the task instead of retyping it" refactor belongs to a card of its own.
- **`aid-final` contradicts itself, and Edward makes it visible.** In that preview My Financials
  shows the loan approved and no outstanding documents, while My Enrollment still lists
  `income-verification` as open — `App.jsx` empties `financialDocs` for `aid-final` but leaves
  `tasks` alone. Edward reads both, so it now offers "what happens if I miss the deadline on Verify
  your household income" on a screen that says the loan it was blocking is finalized. The preview
  model belongs to ENR-166; not fixed here.
- **`Messages` and `My Progress` still have no card** — carried forward from ENR-180 section 11 and
  `docs/portal-build-order.md`.

## 15. Out of scope

- The `Help` page itself — [ENR-182](https://audentra.atlassian.net/browse/ENR-182). Only its `lede`
  changes here, and only because it makes Edward's promise under another name.
- Any real language model, transcription or speech synthesis.
- Appointments, Profile, My Documents — ENR-183, ENR-184, ENR-165.

## 16. Done when

- [x] Three forms exist and each is reachable at 1440, 800 and 380px
- [x] The pill is on all thirteen routes, has no navigation entry, and `#/edward` resolves to nothing
- [x] The pill covers no primary action on any route at any of the three widths, and the toast clears it
- [x] Opening does not navigate, does not scroll, and does not remount the page; closing returns focus to the pill
- [x] The context chip names the current page; each sent message keeps the context it was sent with
- [x] Suggestions come from the record and change with it; the deposit suggestion is absent under `aid-final`
- [x] Every answer names what it is based on and offers a route rather than performing an action
- [x] An unanswerable question ends in a named person
- [x] Conversation history is browsable and a new conversation is one control away
- [x] The standing caution is visible in every form, including the mobile sheet
- [x] Voice in and voice out both have states, and both say they are a prototype
- [x] `loading`, `empty`, `partial` and `error` all reachable from the preview pill
- [x] The overlays share one primitive; `Esc` and focus return verified on each
- [x] Built from tokens, existing classes and our own icons — no new dependency
- [x] `npm run build` clean
