Jira: (none — asked for directly, 2026-08-21)
Status: done
Labels: design-system, screen-all
Jam: (none)

# The tooltip system

## What this answers

*"What is this control, and what does this word mean?"* — asked on every screen, by a student who
has never enrolled anywhere before, about a product whose vocabulary is not hers.

## The problem

The portal had two tooltips and no tooltip system.

- `TermTip` (`features/financials/`) — a real one: hover, keyboard focus and tap, an ink bubble with
  a title and a sentence, wired with `role="tooltip"` and `aria-describedby`. Correct, and available
  to exactly one section, because it lives in a feature folder and reads that feature's dictionary.
- `.advisor-action::after { content: attr(data-tip) }` (`patterns.css`) — a CSS-only label. No
  keyboard, no touch, and it is what forced `.summary-alert` to take the panel's bottom corners:
  a bubble drawn as a child of a control cannot leave the box that clips it.

Both are absolutely positioned inside their own parent, so both are one `overflow: hidden` away from
being invisible. Both hand-typed their own shadow. And **fourteen icon-only buttons** are written as
`<button className="icon-button" aria-label="…">` rather than as the `IconButton` primitive that
exists — so the label is announced by a screen reader and shown to nobody else.

## The system

Two shapes, because there are two questions, and one bubble, because there is one product.

| | `Tooltip` — the hint | `InfoTip` — the explainer |
| --- | --- | --- |
| Answers | "what is this control?" | "what does this word mean?" |
| Trigger | the control itself | its own ⓘ button, inline with the word |
| Content | 1–3 words, no title | a title and one or two sentences |
| Opens on | hover (mouse only), keyboard focus | hover, focus, **and tap** |
| Closes on | leave, blur, click, `Esc` | leave, blur, tap outside, `Esc` |
| Screen reader | nothing — it repeats the control's own name | `role="tooltip"` + `aria-describedby` |
| May carry | only what is already the accessible name | information not printed anywhere else |

**The rule that keeps them apart:** a hint may only repeat something a screen reader already says.
The moment a bubble carries information the student has no other way to reach, it is an `InfoTip` —
because hover does not exist on a phone and does not exist on a keyboard.

### The handlers go on the control, the bubble goes in a portal

`Tooltip` clones its child rather than wrapping it, so nothing new appears in
anybody's flex row — the advisor bar measures 420×93 with two 34px discs before
and after, to the pixel. `IconButton` and `InfoTip` put the same handlers on
themselves through `useTip`.

### One bubble, drawn once, in a portal

Both render the same `.tip-bubble` into `document.body`, positioned `fixed` from the trigger's
rectangle, flipped to the other side when the window is short, clamped to the window when the trigger
is near an edge, with an arrow that keeps pointing at the trigger through the clamp. Three
consequences, all of them the point:

- **A tooltip can never be clipped.** Not by a card, a drawer, a rail, a scroll container.
- **A tooltip is never under the thing it points at.** `--z-tooltip` moves from 40 (under drawers,
  under modals, under Edward) to 110 — above everything but a toast. A tooltip belongs to whatever
  is on top, because you are pointing at it.
- **`Esc` reaches the tooltip first.** Its key listener is on `window` in capture, and overlays
  listen on `document` in capture, so a pinned explainer inside a drawer closes without closing the
  drawer.

### Every icon-only control names itself

`IconButton` takes `label`, and now shows `label` as its own hint by default. So the fix for the
fourteen hand-written ones is to use the primitive, and an icon button that explains itself is no
longer something an author has to remember.

## States

- Hint, mouse: appears after `--delay-tip` (300ms); a second hint within 400ms appears at once, so
  running along a row of icon buttons does not stutter.
- Hint, touch: never. The tap does the thing; the label is the accessible name.
- Hint, keyboard: appears immediately on `:focus-visible`, and only then — clicking a button does
  not leave its own label hanging over the page.
- Explainer, mouse: hover opens; crossing the gap into the bubble keeps it open (140ms grace).
- Explainer, touch/keyboard: opens pinned, stays until tapped outside or `Esc`.
- Reduced motion: no fade, no travel.
- One at a time: opening any tooltip closes the one that was open.

## Out of scope

- Menus, popovers and anything with a control inside it. That is `TopbarPopover` or `Drawer`.
- Anything longer than two sentences. That is `InfoModal`.
- Charts and data hover. There are none in the portal.

## Done when

- [x] `Tooltip`, `InfoTip` and `useTip` in `design-system/primitives/Tooltip.jsx`
- [x] Bubble, arrow, ink and motion in `patterns.css` from tokens only
- [x] `--tip-gap`, `--tip-edge`, `--tip-measure`, `--delay-tip` in `tokens.css`; `--z-tooltip` raised
- [x] `TermTip` reduced to a dictionary lookup over `InfoTip`; `data-tip` CSS deleted
- [x] Every hand-written `.icon-button` is an `IconButton`; every other icon-only control — the
      advisor's two discs, the topbar's bell and points, Edward's mic, send and context dismiss, the
      two info buttons on My Enrollment — carries a `Tooltip`
- [x] The section figure explains what it counts on My Enrollment, My Documents, My Classrooms,
      Health and My Financials. My Profile and Housing pass nothing: the line under the figure
      already says it, and an explainer on every label is an explainer that means nothing
- [x] On the styleguide, in both variants and both placements
- [x] The standard written into `docs/agents/design-workflow.md` and `CLAUDE.md`
- [x] `npm run build` clean; checked at 1440 and 390, with a mouse and with a keyboard
