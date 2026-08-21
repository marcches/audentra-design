Jira: (none — asked for directly, 2026-08-21)
Status: built (2026-08-21)
Labels: design-system, screen-all
Jam: (none)

# The feedback system

Sibling of [the tooltip system](../design-system-tooltips/spec.md). That card answers *"what is
this?"* before you act. This one answers *"what just happened?"* after you do.

## What this answers

*"Did that work, is it still working, and can I take it back?"* — asked by a student on every
control in the portal, about a record that decides whether she can register for class.

## The problem

The portal has **58 feedback call sites and no feedback system.**

`setToast` is called 10 times in `App.jsx` and passed as `onToast` into 19 feature files, which call
it 48 more times. It is not a component. It is this, at `src/App.jsx:873`:

```jsx
{toast && (
  <div className="toast" role="status">
    <span><Icon name="check" size={17} /></span>
    {toast}
  </div>
)}
```

One string. One slot — a second call overwrites the first, unread. A green tick hard-coded into the
markup, so every message is a success whether or not it is one. A fixed 3600ms timer
(`App.jsx:275`) with no pause and no dismiss. No action, so nothing is ever reversible. Two raw
hexes in the rule (`patterns.css:1554`, `1559`) and a fourth shadow the contract says does not
exist. And it is **not on the styleguide** — which, by this repo's own rule, means it does not.

That is the eight-hand-typed-drawers pathology, still alive. But the deeper bug is not the
duplication, it is the **misuse**: a toast is being made to carry things that are not toasts.

    setToast('Aster's secure payment page would open here — nothing is sent yet.')  // a caveat
    setToast('Nice work — 40 Momentum points added.')                              // a reward
    setToast('Record submitted — your points are reserved while Aster reviews it.') // a state change

Three different jobs, one shape, `role="status"`, gone in 3.6 seconds. A student who looks away
loses all three. If one of them were *"your payment did not go through"* — and the day the portal
talks to a real payment provider, one of them will be — it would be announced politely and then
deleted, with no record anywhere that it happened.

Meanwhile the other two rungs of the ladder barely exist:

- **`Button` has no pending state** (`primitives/Button.jsx:19` takes `kind`, `icon`, `leadingIcon`,
  `full` and nothing else). Every asynchronous action in the portal speaks only *after* it finishes,
  never while it runs. That absence is what makes the toast carry so much: a control that cannot say
  "working" has to be followed by something that says "done".
- **`aria-invalid` appears once in the entire repo** (`features/onboarding/Field.jsx:28`). There are
  18 raw `<input>` across 15 files and two separate answers to what a field is —
  `onboarding/Field.jsx` and `profile/FieldRow.jsx` — neither of which is in `design-system/`.

## The system

**Three rungs, and one rule for choosing between them.**

| | In place | Toast | Blocking |
| --- | --- | --- | --- |
| Answers | "this control, right now" | "something happened elsewhere" | "you must decide before continuing" |
| Lives | on the control or its row | bottom-centre, floating | modal, or the whole page |
| Lifetime | as long as it is true | seconds, then gone | until dismissed |
| Carries | a pending spinner, a field error, a saved row | a confirmation, a reversal | a consequence, a choice |
| Component | `Button pending`, `Field error` | `Toast` | `InfoModal`, `PageError` |

> **The rule: a toast may never be the only place something is said.**
>
> Anything a student may need after it has vanished — an error, an obligation, a state change she
> did not watch happen — has a permanent home, and the toast is a pointer to it. A toast is for
> *confirming what you just watched happen*, and for *offering the way back while it is still
> cheap*.

That rule is what makes each of the three pieces below buildable, and it is the whole card. Every
one of the 58 call sites gets classified against it, and the ones that were never toasts stop being
toasts.

---

### 1. `Toast` — the rung that already has 58 callers

`design-system/patterns/Toast.jsx` plus a `useToast()` in `lib/toast.js`. The call site changes from
a string to a shape:

    toast({ tone, title, body, action })

| Prop | |
| --- | --- |
| `tone` | `success` · `info` · `critical`. Decides the glyph, the glyph's tint, the ARIA role and whether it auto-dismisses. |
| `title` | The outcome, in the student's words. One line, always present. |
| `body` | The consequence. Optional — [Skiff](https://mobbin.com/screens/bf104b69-c42d-4fb9-a746-d51ca884f4a6)'s second line. Omit it and you get [Pinterest](https://mobbin.com/screens/70234394-ca14-4def-8aa4-e9784fdccae1)'s one-line pill, which is the default measure. |
| `action` | `{ label, onAct }`. At most one. A second action is a decision, and a decision is a modal. |

**`critical` is not a red toast.** It is a different contract: `role="alert"` instead of
`role="status"`, and **it never auto-dismisses.** It stays until the student dismisses it, and it
must carry either a retry or a route to the permanent statement of the failure — because by the rule
above, a failure has one. If neither exists, the thing being reported does not belong in a toast at
all.

**Timing.** No constant. `success` and `info` live for `max(4s, words × 0.35s)`, capped at 10s, and
the timer **pauses on hover and on focus** — without that, a toast with an action is an action you
must catch. A toast carrying an `action` takes
[Asana](https://mobbin.com/screens/36cb9092-004d-4cfa-abc7-930e4a7ff931)'s timer bar across its top,
so the window is visible rather than guessed. Toasts without an action do not get the bar: there is
no deadline to show.

**Stack.** Up to three, newest nearest the bottom edge, older ones pushing up. The fourth drops the
oldest. Today the second toast silently deletes the first, which is how a student misses the one
that mattered.

**Placement.** Stays bottom-centre (`--toast-bottom`), and the stack must clear the Edward launcher
and the mobile sheet — both are bottom-anchored and neither may ever be covered by a confirmation.
Verify at 1440 and 390 with Edward open and closed.

**Tokens.** `#161a2f47` at `patterns.css:1554` becomes `--shadow-float` — a toast floats above
everything, and if that reads too heavy the token changes, not the rule. `#85d5b121` at `1559`
becomes the tone's own tint role (`--green-tint`, `--purple-tint`, `--crimson-soft`), which is what
makes three tones cost one rule instead of three. `--z-toast: 120` already exists and already sits
above the tooltip layer the parallel card is moving to 110 — nothing to add.

### 2. `Button pending` — the rung that removes most toasts

    <Button kind="primary" pending={saving}>Submit record</Button>

The button **keeps its exact footprint** and swaps its label for a spinner
([Assembly](https://mobbin.com/screens/1b2791e8-8b91-435d-a0e2-6855b4aec9f7),
[Heidi](https://mobbin.com/screens/03a2347e-6f15-4d60-b7f5-6e8e58df143c)), holding its own surface
rather than fading to grey
([Family](https://mobbin.com/screens/d4b574e8-b6fd-40dd-9c9c-0c30df610851),
[Visitors](https://mobbin.com/screens/e87d31f5-4b22-4a04-8aa9-47bfc90f5be8)) — the primary button is
the one gradient in the product, and a control that fades while it works reads as a control that
refused. `pending` sets `aria-busy="true"` and `disabled`, so the same prop closes the
double-submit hole every one of these call sites currently has.

Width is measured before the swap so no card reflows. Nothing else on the screen moves, and there is
**no page-level blocking spinner** — that shape
([Paramount+](https://mobbin.com/screens/95ccebe5-475c-4adf-a603-f1c5f0325927)) loses which control
was pressed and makes a two-second request feel like a failure.

**The second pending shape**, for work that has a proportion: a determinate bar with a `Cancel`, in
the panel that started it
([Adobe Express](https://mobbin.com/screens/7534530b-d7b4-4dfa-81e7-1b0d121c062f)).
`DocumentDrawer`'s upload is exactly this and today has neither a bar nor a cancel.

The spinner is ours — `Icon.jsx`, 24×24, stroke 1.9, `currentColor` — and it must honour
`prefers-reduced-motion` by stepping rather than sweeping.

### 3. `Field` — the rung with one `aria-invalid` in the whole repo

`onboarding/Field.jsx` moves to `design-system/primitives/Field.jsx`; `profile/FieldRow.jsx` keeps
its read-only row shape and takes the control half from it. `.field.invalid input`
(`features/onboarding.css:320`) moves to `patterns.css` — it is design-system shape living in a
feature file, which is the bug that put the whole card system inside My Financials.

    <Field label="Postal code" hint="…" error="Enter a five-digit code." />

An invalid field takes a crimson edge and an alert glyph inside the input; **the label goes crimson
with it** ([Melio](https://mobbin.com/screens/fc2a7650-802f-4a5b-bd88-4c84c612b2c6)) so the error is
findable when the message is scrolled off; the message sits directly under the field, led by a glyph
([Clerk](https://mobbin.com/screens/cc5ea40b-c5e8-4b80-ae30-7991b8119906)) because crimson alone is
not a signal. `error` wires `aria-invalid` and `aria-describedby` itself — the caller cannot ship a
field that is red to the eye and silent to a screen reader. Only the invalid field changes; every
other field is untouched
([Claude](https://mobbin.com/screens/34e3cb61-99c3-4184-a302-74d9b03bdd0e)).

**When validation runs, exactly:**

1. **Never while typing.** A field being typed into has not been finished.
2. **On blur**, once the field has been touched.
3. **On submit**, for every field.
4. Once a field *is* showing an error, it re-validates on every change, so the error clears the
   moment it is fixed rather than at the next blur.

**The submit button stays enabled.** A disabled submit refuses without saying why, and on a form of
ten fields it refuses without saying which — which is why
[Substack](https://mobbin.com/screens/286c847a-7843-4ff8-a13f-4fd526bd635f) is in the rejected list.
Pressing it with errors moves focus to the first invalid field. A summary above the form appears
only when the form is long enough that the first error can be off-screen — the onboarding steps and
`PersonDrawer` are the only two that qualify.

### 4. Undo or confirm — never both

The 58 call sites contain no undo and no confirm shape; each screen has invented its own protection
or none. One decision, taken once:

| The action is… | Then |
| --- | --- |
| Reversible, and cheap to reverse | Do it. Offer `Undo` in the toast, **and leave a permanent way back** |
| Irreversible, or has a consequence the student cannot see | Confirm first, in an `InfoModal`, naming the consequence |

The permanent way back is not optional and not a nicety — it is what makes a six-second undo window
acceptable to a keyboard user, to a screen-reader user, and to anyone who looked away. It is exactly
what Asana's screen does: the toast offers `Undo`, and the page behind it offers **Restore Project**.

Cancelling an appointment inside the notice window, revoking a permission in `PermissionGrant`, and
submitting a record to an office are the three that fail this test today and get confirms. The rest
get undo.

---

## States

| | |
| --- | --- |
| Toast, `success` | Green glyph on `--green-tint`, `role="status"`, auto-dismiss |
| Toast, `info` | Neutral glyph, `role="status"`, auto-dismiss |
| Toast, `critical` | Crimson glyph, `role="alert"`, **persists**, carries retry or route |
| Toast, with action | Timer bar on top, pause on hover and focus, close present |
| Toast, stacked | Up to three; the fourth drops the oldest |
| Toast, reduced motion | Fades, does not travel |
| Button, pending | Spinner, footprint held, `aria-busy`, `disabled` |
| Button, long work | Determinate bar and `Cancel`, in place |
| Field, untouched | Normal |
| Field, invalid | Crimson edge, crimson label, glyph in field, message under, `aria-invalid` |
| Field, corrected | Error clears on change, not on next blur |
| Form, submitted with errors | Focus to first invalid; summary only on long forms |

## Out of scope

- A notification centre, an inbox, or any persistent list of past toasts.
- Optimistic UI, offline queueing, retry-with-backoff.
- Rewriting the copy of call sites that do not change rung. A call that was correctly a toast keeps
  its sentence; only the ones moving to in-place or to blocking get rewritten.
- The tooltip system — its own card, already in progress. This card must not touch `Tooltip.jsx`,
  `--z-tooltip`, or the `patterns.css` bubble rules.

## Done when

- [ ] `Toast` is a pattern with three tones, an optional action, a stack, a paused timer and a
      derived duration; `useToast()` replaces the `toast` string in `App.jsx`.
- [ ] `Button` takes `pending`; the footprint is held, `aria-busy` and `disabled` are set together.
- [ ] `Field` is a primitive; `error` wires `aria-invalid` and `aria-describedby` and cannot be
      passed without them.
- [ ] All 58 call sites classified against the ladder, and the ones that were never toasts moved.
      Any that could not be moved are listed here, with why.
- [ ] No raw value left in `.toast`; no fourth shadow.
- [ ] A **Feedback** section on `#/styleguide`: the ladder table, the three tones with and without an
      action, the button pending, the field in error. Same commit.
- [ ] `npm run build` clean; checked at 1440 and 390, with Edward open, with a drawer open, and on
      the keyboard alone.
- [ ] `prefers-reduced-motion` honoured by the spinner, the toast entrance and the timer bar.

---

## What was built, and what was not

Built and verified in the browser at 1440 and at 390, on the keyboard, with Edward open:

- `patterns/Toast.jsx` + `lib/toast.js` — three tones, a stack of three, a duration derived from
  the sentence, a timer that pauses on hover and on focus, at most one action. `critical` takes
  `role="alert"` and does not auto-dismiss; the other two take `role="status"` and do.
- `Button pending` — footprint held to the pixel (measured: 232px before, 232px during),
  `aria-busy` and `disabled` set together, and `.primary-button.pending:disabled` wins over the
  faded disabled surface **by rule**, not by position.
- `primitives/Field.jsx` — `error` is a string and there is no boolean beside it. Verified in the
  real app: `aria-invalid="true"`, `aria-describedby` resolving to the message, crimson label and
  edge, and only the invalid field touched.
- All 58 call sites classified. Nine became `success` with the outcome and its consequence on
  separate lines; two got `Undo`; the rest were already `info` and keep their sentence — which is
  the point of the default landing on `info` rather than on a green tick.
- Adopters for `pending`: `AskCard` and `DocumentDrawer`, which had each hand-typed a
  `{sending ? 'Sending…' : …}` label swap on a raw `<button className="primary-button">`.
- A **Feedback** section on `#/styleguide`, firing real toasts through the real queue.

### Three decisions taken during the build

1. **Revoking a permission got `Undo`, not a confirm.** The spec listed it as a confirm; reading
   `revokeGrant` changed the answer, and the ladder's own rule is what decided it — the whole grant
   object is in hand, so restoring it costs nothing, while rebuilding it by hand costs a name, an
   email and six checkboxes. Asking a student to confirm twice before *reducing* what she shares is
   friction pointed the wrong way. Verified: revoke → toast → `Undo` → the grant is back.
2. **`PersonDrawer` stopped printing its error twice.** With the field carrying its own message, the
   pinned `.drawer-problem` strip was repeating the same eight words on the same screen. It now
   appears only for the one problem with no field to sit under — the category set — and submitting
   moves focus to the offending control instead.
3. **Cancelling an appointment is still not a confirm.** It is the one action here that is genuinely
   irreversible from the student's side: the time goes back to a calendar someone else can take. It
   needs a `ConfirmDialog`, which is a new pattern with its own overlay and focus contract — and
   **no Mobbin research was done on confirm dialogs**, so building one now would be designing a
   shape from imagination. Next card, starting at the research step.

### A bug found on the way, and fixed by rule

`features/onboarding.css` and `features/profile.css` both defined a bare `.field-label`, meaning
different things by it — 9.5px uppercase block in one, 10.5px semibold flex-with-a-glyph in the
other. `onboarding.css` imports after `profile.css`, so **on My Profile every record label was
rendering as the onboarding rule**: uppercase, `display: block`, and the verification glyph stripped
of the flex row it was written for. Neither file would have failed a build; it is the third instance
of the tie this repo has been bitten by.

Fixed the way the contract says to fix one — by rule, not by position. The record row's label is now
`.field-row-label`, its own name for its own thing, and `.field-label` is defined exactly once, in
`patterns.css`. Verified on the live page: 10.5px, weight 600, `display: flex`, `gap: 4px`, no
uppercase.
