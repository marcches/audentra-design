Jira: ENR-163
Status: done
Labels: design, persona-student, screen-onboarding, wave-w2
Serves: ENR-149, ENR-150, ENR-151, ENR-152, ENR-153, ENR-154
Epic: ENR-143 — Student · Onboarding: eight steps that survive an interruption
Jam: (none — the feedback arrived in conversation on 2026-08-21: "the UX and the flow are right;
      the UI has to match the approved one")
Supersedes: nothing. `spec.md` in this folder is still the spec of the *flow*; this file is the
      spec of its *surface*, decided in the grilling of 2026-08-21.

# Onboarding — the approved surface on the built flow

## 1. What this changes, and what it does not

The feedback was precise: the experience is right, the look is not. So the line is drawn at **form**:

| Changes (UI) | Does not change (UX) |
| --- | --- |
| the rail: white, numbered, a crest at the top, the advisor and the vendor at the foot | the eight steps, their order, their questions, their copy |
| the frame: no top bar; content + a step panel in two columns where they fit | what a step asks, how it saves, skips, locks, refuses, resumes |
| every surface and control's treatment; the type hierarchy | the four states and their meaning |
| the step panel — a read-only mirror of what the step already holds | the Entry screen (does not exist here; new scope, a new card) |

## 2. The reference, and what was taken from it

The approved prototype is `C:\Users\marco\Dev\backup\audentra-onboarding-prototype` (Vite + Tailwind
+ shadcn, Satoshi, violet/azure/mint, disposable). What carries over is **composition and
treatment**, never its tokens:

- white rail with a brand head, a progress block, a numbered list with a connector, a foot;
- content column + sticky context panel; a plain hairline-and-buttons footer;
- filled inputs that lift to white on focus; read-only facts in a dashed box with a lock;
- a dropzone with a tinted tile; cards floating on a light canvas.

What does **not** carry over, and why: Satoshi (an external font request; the product is Geist),
the violet/azure/mint palette (one purple system), the "Needs you" chips on section heads (texture,
not information — the panel carries the standing), "Saved automatically" (here the save is the
button, and the sentence would lie), "Next: <step>" labels (copy is UX), confetti / SplitText /
Grainient (new dependencies; no accept moment in this flow).

Mobbin, this round (`references.md`): Mercury, Remote, Melio, Deel.

## 3. Layout, in reading order

```
.onboarding                              flex row, --canvas
├── <StepRail>   (design system)         --flow-rail (304px) · --surface · hairline right · sticky, 100vh
│   ├── .rail-brand                      AsterMark 40 tile · "Aster University" · eyebrow line
│   ├── .rail-band                       greeting (h2) · figure "2 of 8 saved" · note · meter (6px)
│   ├── .rail-steps                      numbered 24px marks · connector · name + meta per row
│   ├── .rail-advisor                    label · <Avatar md> · name · office · mail
│   └── .rail-vendor                     "Powered by" AudentraMark
└── main.flow-page  (container: flow)    flex 1
    ├── header.topbar.flow-topbar        sticky, glass; right: PreviewStateMenu · "Save and finish later" (topbar-chip)
    └── .flow-body › .flow-measure
        ├── <PageHero>                   the band: eyebrow "Step n of 8" · question · lede · motif
        ├── .page-notice › <Notice>      one line under the band (refusal / outcome / welcome back)
        ├── <StateCard>                  unreadable record
        └── .flow-grid                   1 col; 2 cols when the container ≥ 1032px
            ├── .flow-content            the step's cards · .step-failed
            ├── aside.flow-aside         <StepPanel> — sticky, top: --space-12
            └── <StepActions>            under the content column; fixed at ≤620 as before
```

- **1032px** is `--flow-column` (736) + `--space-10` (22) + `--flow-aside-min` (272), rounded: the
  width at which the two columns fit. It is a container query on the main column, not a fifth
  viewport breakpoint — the same mechanism the summary panel uses at 940.
- Below **1060** the rail is the compact header: crest + name on the left, the count and a 96px meter
  on the right, and the existing disclosure opens the list. Sticky, `--z-topbar`.
- Below **620** the actions pin to the bottom, as before.

## 4. The rail's five drawings

| state | mark | row |
| --- | --- | --- |
| saved | 24px disc, `--green`, white check | name `--ink`, meta "Saved" |
| current | 24px disc, `--grad-purple`, white number | row washed `--purple-wash`, name heavy `--purple-ink`, meta "Step n of 8" |
| upcoming | 24px ring `--line-strong`, number `--muted` | name `--muted`, meta "n min · optional" |
| locked | the upcoming ring with a lock glyph | meta = the reason |
| skipped | 24px disc `--surface-sunk`, ring `--line`, `half` glyph `--muted` | name `--ink` (full contrast — the point), meta "Skipped · you can come back" |

Skipped is neither amber nor crimson nor dimmed (ENR-150, card guardrail). The connector is the
`ol`'s spine; the current row's wash covers it, the way the reference does.

## 5. The step panel, per step — mirror, never control

Head: `CardHead kind="status"` bare (no glyph), the title, one line. Rows: `StatedField`
(label over value; `quiet` when the value is not there yet). Foot: one sentence.

| step | title | rows | foot |
| --- | --- | --- | --- |
| 1 details | This step | What we'll call you · Pronouns | The Registrar keeps your legal name, date of birth and student number. The rest is yours. |
| 2 contact | How Aster reaches you | Personal email · Mobile · Mailing address · Writes first | Anything with a deadline is also written down in the portal. |
| 3 emergency | Who Aster would call | Name · Relationship · Phone | {first} cannot see anything in your record. |
| 4 permissions | Who can see your record | Nobody, unless you say so — or one row per grant (name → "n of 7 things · until date") | Changeable any time from your profile. |
| 5 housing | Your housing plan | Plan; if on campus, 1st/2nd/3rd choice | shortlistLine / "Answer the question and what happens next appears here." |
| 6 health | Your answer | Accessibility Services → yes / not right now / not answered yet | Not right now is a complete answer. |
| 7 photo | Your photo | File → name or none chosen | Skipping this costs you nothing but a queue. |
| 8 orientation | Your session | Session · Where | Whichever you pick lands in Appointments. |

## 5c. The third round, 2026-08-21 evening — the header

"Falta construir o header tipo os do portal… tá tudo inconsistente aqui." The main column opened
with a bare eyebrow and `h1` on the canvas, a notice floating above, two controls floating above
that. Now it opens the way a section does, with the portal's own mechanisms (Mobbin in
`references.md`, "The header"):

- **The topbar** — `.topbar`, sticky, glass, the controls on the right in the topbar's family:
  the concept pill and *Save and finish later* as a `.topbar-chip`. Static below 1060, where the
  rail is the sticky header.
- **The band** — `PageHero`, extracted from `PageShell` (same markup; the portal renders
  identically) and rendered by the flow: eyebrow in mono with the position (*Step 3 of 8 ·
  optional*), the question as the title, the lede, the step's glyph in the motif (`icon` on each
  step in `data.js`). The title takes focus on a step change, ring on ink. The finish gets the band
  too.
- **The notice docked under the band** — `.page-notice`, the shell's line dock: two hairlines and
  a sentence. A refusal or an outcome shows there; the welcome-back line yields to either and comes
  back after.
- The loading skeleton draws the band's height first, so loading → ready is a fade.

## 6. What landed in the design system

- `StepRail` — rewritten (white, numbered, brand head, Avatar, vendor foot). Styleguide `sg-steps`.
- `primitives/StatedField` — promoted from onboarding; `office` draws the locked box, `quiet`
  mutes a value that is not there yet. Styleguide `sg-steps`.
- `patterns/Dropzone` — the photo zone, as a shape. Styleguide `sg-steps`.
- `Field` — the input is filled (`--surface-sunk`) and lifts to `--surface` on focus. **Product-wide**,
  deliberately: two input surfaces would be two products. The capture diff names every element.
- `patterns/PageHero` — the band, extracted from `PageShell` so a flow can open with it.
- tokens: `--flow-rail`, `--flow-column`, `--flow-aside`, `--flow-aside-min`; `--flow-bar` removed
  (the bar is gone); `--shadow-primary` / `--shadow-primary-hover` name the glow the primary button
  wrote raw.

## 7. Out of scope, said out loud

- Entry / sign in / create account — no such screen exists in this repo; a new card.
- Residence and club photography — a thing is a glyph in a tile here; imagery is a separate decision.
- The selectors `onboarding.css` leaks to the rest of the product (`.drawer-title`, `.card-foot p`,
  `.status-icon.done`) — pre-existing; moving CSS needs its own capture proof. Left as is.
- The product's type scale — unchanged; if the flow reads too dense beside the reference, that is a
  product decision, not an onboarding one.

## 8. Done when

- [x] `npm run build` clean
- [x] every portal route diffs to zero against the baseline (13 routes × 1440 and 390, captured
      twice before and once after; the styleguide's 170 diffs are the new `sg-steps` section, the
      y-shift under it, and the two demo inputs' fill — no route in the portal renders a `.field
      input` at rest, so the product-wide change shows on the styleguide alone)
- [x] 1440, 1000 and 390 checked by eye on steps 1, 3, 4, 5, 6, 7, the finish, first visit, loading,
      unreadable and error; the panel stacks under the content and above the actions below 1032
- [x] `#/styleguide` shows the rail in all five drawings, `StatedField` both ways, `Dropzone` both ways
- [x] `CONTEXT.md` carries *Setup step*
