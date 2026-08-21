Jira: ENR-163
Status: ready-for-agent
Labels: design, persona-student, screen-onboarding, wave-w2
Serves: ENR-149, ENR-150, ENR-151, ENR-152, ENR-153, ENR-154
Epic: ENR-143 — Student · Onboarding: eight steps that survive an interruption
Jam: (none)

# Onboarding — eight steps, four states, and a pause that costs nothing

## 1. What this screen answers

> *I accepted the offer. What does Aster need from me, how much is left, and can I stop halfway
> without losing it?*

The card names the emotional core and it is not the forms: **the progress rail has to make the path
feel finite and the pause feel safe.** Everything below is downstream of that sentence.

## 2. What already existed, confirmed before designing

The screen does not exist. Three of its answers do, scattered across sections that read them, and
the design is shaped by them rather than around them — a value onboarding captures and another
section renders must be the same object, not a lookalike.

- **Health already says its answer came from here.** `features/health/data.js` returns
  `{ value: 'no', on: 'Aug 12', where: 'onboarding' }`. So step 6 is where the accommodation answer
  is given, and `not right now` is a complete answer there for the same reason it is complete in
  Health — `CONTEXT.md` settles it.
- **Housing already says its plan came from here.** `features/housing/data.js` carries the preview
  state `onboarding-answered` with `planSource: 'onboarding'` and three residences already ranked.
  Step 5 is what produces that state, so it uses `planOptions` and `residences` from housing's own
  data and never a second copy of either.
- **Profile already renders what step 4 captured.** `features/profile/data.js` holds `initialGrants`
  — Renata Oliveira, mother, three categories, ends May 31 2027 — with the comment *"capture belongs
  to onboarding"*. Step 4 is that capture. The `permissions` preview state produces exactly that
  grant, so opening Profile after it tells the same story.
- **The seven record categories are already written down**, in `features/profile/data.js`, described
  as "ENR-144's vocabulary … the words a student consented in". Consent happens here, so **ownership
  moves**: `RECORD_CATEGORIES` is defined in `features/onboarding/data.js` and profile re-exports it.
  One line changes in profile. This is the precedent `features/enrollment/data.js` already sets by
  importing `responseDeadline` from housing — the feature that owns the concept exports it.

## 3. The frame — onboarding is not a section of the portal

`#/onboarding` is a **route, not a destination**. It has no row in `NAV`, no entry in `DESTINATIONS`,
and no `PageShell`. Three reasons, in descending order of force:

1. **ENR-151 AC 1 requires a step that is not yet reachable to be unopenable, including by direct
   navigation.** A sidebar full of portal sections is a list of ways out of a flow whose whole
   premise is one thing at a time.
2. Onboarding is what happens *before* the portal exists for her. The portal's own fiction says so:
   the accommodation answer is dated Aug 12, `PORTAL_TODAY` is Aug 20.
3. `PageShell` owns hero → summary → notice → tabs → rail. Onboarding has one question, one rail and
   one action bar. Four of the five slots would be empty and the fifth would mean something else.

So App branches on the hash **above** the app shell, not inside `renderPage()` the way the styleguide
does — the styleguide keeps the chrome, onboarding replaces it.

### The onboarding chrome, and what it deliberately lacks

| Region | Holds |
| --- | --- |
| Top bar | The Aster mark · `Save and finish later` (text) · the Concept preview pill |
| Left | The rail — the band |
| Right | One step: head, body, action bar |

- **No sidebar.** See above.
- **No Edward.** ENR-181 puts the floating assistant on every *page*; onboarding is not a page of the
  portal, and Edward's record is built from sections she has not got yet. The promise Edward makes —
  a named human is reachable — is kept instead by the advisor at the foot of the rail.
- **No notification bell, no points.** Neither exists until the portal does.

## 4. The rail — onboarding's band, rotated

The system's rule is that the purple band is the only saturated surface in the product. Onboarding
has no hero, so **the band is the rail**: it runs down the left at ≥1060 and lies across the top
below it, which is what a hero already is. No new colour, no second saturated surface, one decision.

Top to bottom:

| Row | Type | Content |
| --- | --- | --- |
| Eyebrow | Geist Mono, 10.5px, tracked .13em | `Class of 2031 · Offer accepted` |
| Greeting | 22px | `Let's get you set up, Maya.` |
| **Figure** | 21px | `3 of 8 saved` |
| Under it, one line | 12.5px | `1 skipped · 4 still to do` |
| Meter | 4px | saved as a filled run, skipped as a lighter run, the rest empty |
| The eight steps | rows | see below |
| Foot | `AdvisorBar` shape | `Stuck? Priya Raman · Enrollment` |

The greeting is 22px and the figure is 21px, deliberately near-equal: the hierarchy rule this repo
learned the hard way is that the greeting must never dwarf the figure it introduces.

### The four step states — four treatments (ENR-149 AC 3)

| State | Mark | Name | Meta line |
| --- | --- | --- | --- |
| **Saved** | filled disc, `check` | normal weight | `Saved` |
| **In progress** | ring with a solid dot | **bold, full-contrast** | `Step 3 of 8` |
| **Skipped** | `half` in an outlined disc, the rail's own light ink | normal weight, **full opacity** | `Skipped — you can come back` |
| **Upcoming** | empty ring, low contrast | reduced opacity | — |

**Locked is not a fifth state.** ENR-149 names four; ENR-151 AC 3 asks a locked step to state why. A
locked step is an upcoming step that carries a reason: mark `lock`, meta
`Opens once your housing plan is recorded`. Rendering it as its own state would break AC 3's sibling,
which is that the four states are the four states.

**Why skipped is not amber.** Amber in this product means someone still has to act. That is true of a
skipped step *on the checklist*, and it is a nag *inside the flow she is currently walking*. The mark
is the half-filled circle already in `Icon.jsx`, in the rail's light ink: started, not finished, no
alarm. The row's own words carry the rest — `you can come back` — which is the sentence the card asks
for when it says skipped must not look like failure.

### What is clickable

- **Saved** and **skipped** rows are `<button>`s. ENR-151 AC 4 and ENR-150 AC 3 / AC 4.
- **Upcoming** and **locked** rows are not buttons and are not `disabled` buttons. A disabled control
  is an offer withdrawn; no control is a stage that has not arrived. `PlanPanel` already follows this
  rule after the response deadline, and this is the same rule.
- `aria-current="step"` marks the row in progress. The list is an `<ol>` inside
  `<nav aria-label="Your onboarding steps">`.

### At 390 (mobile first, per the card)

Below 1060 the rail is a band across the top: eyebrow, greeting, the figure, the meter, and the
current step's name. The eight rows collapse behind a `Steps` disclosure, closed by default, opening
in place. The step head keeps `Step 3 of 8` at all times (ENR-151 AC 5), so collapsing the rail never
costs the position. The action bar becomes sticky at the bottom, primary full-width, `Skip for now`
below it, `Back` above the head.

## 5. The eight steps

| # | id | Name | Question | Rule |
| --- | --- | --- | --- | --- |
| 1 | `details` | Confirm your details | *Is this you, Maya?* | required |
| 2 | `contact` | How Aster reaches you | *Where should Aster reach you?* | required |
| 3 | `emergency` | Emergency contact | *Who should Aster call in an emergency?* | required |
| 4 | `permissions` | Family permissions | *Who can talk to Aster about you?* | required — **nobody is a complete answer** |
| 5 | `housing` | Where you will live | *Where will you live?* | required |
| 6 | `health` | Health and accessibility | *Anything Aster should know before you arrive?* | **optional** |
| 7 | `photo` | Your student photo | *Want your campus card ready before you arrive?* | **optional** |
| 8 | `orientation` | Choose your orientation session | *Which orientation will you come to?* | required, **locked until 5 is saved** |

The lock is not a demonstration device. Residents and commuters are given different sessions, so
`orientation` genuinely cannot be answered before `housing` — which is what makes its stated reason
true rather than a placeholder sentence.

### Step 1 — Confirm your details

Two cards, and the split is the point. `What Aster has` holds the Registrar's fields — legal name,
date of birth, student number — read-only, each routing to the Registrar, exactly as
`features/profile` already renders institution-owned rows. `Yours to set` holds the preferred name
and pronouns. One card asks; the other only states. Colour is spent once, on the card that asks.

### Step 2 — How Aster reaches you

Personal email, mobile, mailing address. Then the channel, from profile's `channelOptions`, as a
`.choice-panel`: each option says what Aster will *do*, not what the setting is called.
`Text message` carries `Needs a verified number` — the consequence, on the option, before it is
chosen.

### Step 3 — Emergency contact

Name, relationship, phone; `Add a second contact` as a text button. The card closes with a
`CardFoot`:

> An emergency contact cannot see anything in your record. Letting someone *see* things is a
> separate decision, and it is the next step.

That sentence is ENR-152 AC 4, placed where it is answering a question the student is actually
asking, one screen before the screen it is about.

### Step 4 — Family permissions (the hard one)

Reading order, and the first three blocks are acceptance criteria turned into layout:

1. **The default, stated before any choice** (ENR-152 AC 2). A `status` card, `shield`, tone neutral:
   *Right now, nobody can see any of it.* Then one sentence: Aster discusses your record with you and
   nobody else — your grades, your bill, your aid, where you live.
2. **Continuing with nobody is complete** (ENR-152 AC 3), said **before** the control, not after.
   *You can leave it exactly like that. Continuing without adding anyone is a complete answer, and
   you can change your mind any time from your profile.* Position taken from Docusign; the product
   already cites that screen in `PlanPanel` for the same reason.
3. **The emergency contact is not record access** (ENR-152 AC 4), and it is concrete because she
   filled it in one screen ago: *You gave Renata Oliveira as your emergency contact. That lets Aster
   call her if something happens to you. It does not let her see anything below.*
4. **Who can talk to Aster about you** — the list. Empty by default, with one `Add someone`.

**Adding a person** opens `<Drawer>` — the primitive, so scrim, `aria-modal`, focus trap, `Esc` and
focus return are not this card's problem. Fields, in order:

- Name, relationship (`.choice-panel`: Parent or guardian · Another family member · Someone else),
  email.
- **The seven categories**, all of them, ticked or not (ENR-153 AC 1, AC 6). Each row: the category
  name, and the sentence saying what that person could then discuss. Checkboxes, all clear —
  default-on would invert ENR-152 AC 1, and a switch reads as a preference rather than a grant.
- **Purpose**, one line, with the real example under it: *Help me with billing and financial aid
  while I am away.*
- **End date**, required (ENR-153 AC 7). `May 31, 2027` offered as a chip — the end of the academic
  year, the same date `initialGrants` carries — plus a date field for any other.

Refusals, stated rather than prevented: saving with **no category** is refused with the reason on the
category set (ENR-153 Scenario 2), not by greying the button. A greyed button says *you cannot*; a
stated refusal says *here is what is missing*.

Once saved, the person renders as a card in the list: initials, name, relation, email, the categories
they may discuss listed by name, the purpose in the student's own words, the end date, and `Edit` /
`Remove`. Removing takes effect on click with no confirm step — ENR-154 AC 2 — and is confirmed by a
`role="status"` line naming **what that person can no longer discuss** (ENR-154 AC 5). More than one
person, each with an independent set (ENR-153 AC 4).

**Tone.** Every sentence names a person and a thing that person could discuss. No "we take your
privacy seriously", no "data processing", no emoji, no "your fam". The test the card sets is
seventeen years old and making a decision with consequences: she is owed the concrete version.

### Step 5 — Where you will live

**The concrete question leads.** The card is explicit that the abstract framing was rejected, so the
screen opens on `Where will you live?` and the four plans, above the fold, with nothing before them
but the one sentence ENR-210 AC 2 requires:

> All four are complete answers and none of them is a skip.

Below the choice, the consequence of the chosen plan — `planOptions[].consequence`, the strings
housing already publishes. Choosing `Living on campus` opens the shortlist below, on the same screen:
the published residences as rows, tap to rank, up to three, with `1 · 2 · 3` chips. A partial
shortlist is saved and shown as partial, never as complete — `CONTEXT.md` settles that word. A foot
line routes the rest: *Room types, rates and meal plans are all in Housing, and you can change this
until Dec 15.*

### Step 6 — Health and accessibility (optional)

The accommodation answer, in `CONTEXT.md`'s vocabulary: two values, `Yes, put me in touch` and
`Not right now`, and **not right now is a complete answer** — it is recorded, it blocks nothing, and
it is never shown as outstanding. Under it, a plain note that the immunization record is a document
Aster will ask for in My Documents, and is not uploaded here. Skipping this step leaves the question
*never answered*, which is a third condition and not a value — the distinction Health already draws.

### Step 7 — Your student photo (optional)

A drop zone, the three rules (face forward, plain background, no hat), and what the photo is used for
— the campus card and class rosters, and nothing else. The most skippable thing in the flow, and it
is placed second-to-last for that reason.

### Step 8 — Choose your orientation session

Three sessions as `.choice-panel` rows: date, time, place, and who each one is for. Filtered by the
plan saved at step 5. Locked until then, with the reason on the rail row and, if reached by direct
navigation, on the bounce notice.

## 6. Saving — the browser never decides (ENR-149)

| AC | How it is honoured |
| --- | --- |
| AC 1 server confirms | `Save and continue` → `saving` (~700 ms, the `SEND_MS` cadence `App.jsx` already uses for a submission) → `saved`, or `failed` |
| AC 2 read on load | every state comes from the preview fixture, which stands in for the server; nothing is read back from anything the browser wrote |
| AC 3 four states | §4 |
| AC 4 a failed save stays in progress | the step stays in progress, the count is unchanged, and an `alert` strip on the step names what failed and offers `Try again` — preview state `save-fails` |
| AC 5 another device | the same fixture on any load; the state is not in the browser |
| AC 6 resume at the first unresolved step | `#/onboarding` with no step resolves to `firstUnresolved`, where **resolved = saved or skipped** |
| AC 7 partial input is preserved and is not saved | the draft lives in the page's state, survives moving between steps in the session, and the rail keeps showing **in progress** |

A returning student gets a `role="status"` band above the step head:
*Welcome back, Maya. You saved through How Aster reaches you on Aug 12.* Dismissible. It is not a
ninth screen.

## 7. Order and locking (ENR-151)

- The step is in the route: `#/onboarding/5`. It has to be *attemptable* for the refusal to exist.
- Navigating to a step that is not reachable returns her to the step she is on and says why, in a
  `role="status"` line above the head: *Step 8 isn't open yet — it opens once your housing plan is
  recorded.* (AC 1, AC 2, AC 3.)
- A saved step reopens with her answers and can be saved again (AC 4).
- Position and total are on the step head at all times, in mono, and in the rail figure (AC 5).

## 8. States

| State | What it shows |
| --- | --- |
| `ready` | 2 saved (details, contact), step 3 in progress, step 8 locked |
| `empty` | the first visit: 0 of 8, step 1 in progress, nothing saved, nothing skipped |
| `resume-skipped` | 5 saved, `health` skipped, resumes at step 7 — the skipped row and the resume band together |
| `permissions` | parked on step 4 with Renata Oliveira already authorized for three categories, so the hard screen and its populated state are one click away |
| `housing` | parked on step 5, `Living on campus` chosen, a **partial** shortlist of two |
| `save-fails` | ENR-149 AC 4: the next save does not reach Aster |
| `complete` | 6 saved, 2 skipped, all eight resolved — the finish screen |
| `loading` | the rail and the column as skeletons; no count is claimed |
| `partial` | **the configuration arrived; her answers did not.** The eight steps and their names render; every state is unknown, the figure reads `Couldn't be checked` instead of a count, and saving is refused with the reason stated. This is ENR-149 Scenario 4 made something you can look at |
| `error` | the published configuration could not be loaded at all — `PageError`, with a retry |

## 9. The finish

When all eight are resolved: the rail reads `6 saved · 2 skipped`, and the column shows one card —
what is recorded, what was skipped and where each skipped thing can still be done, and one primary,
`Go to My Enrollment`. It is not a nine-of-eight and it is not a congratulation over an unfinished
list: a skipped step is named, with its route, and the button still says the flow is over.

## 9b. What landed in the design system, not in the section

Three things left `features/onboarding/` during the build, each for the reason the repo already
records somewhere:

- **`StepRail` is `design-system/patterns/StepRail.jsx`.** What a step that was set aside looks like
  is a decision about the *product*, not about one screen — the moment a second flow copies those
  classes by hand they drift, which is the failure `Drawer` was written to end. It knows no domain:
  the caller passes the words and a `state` per row, and the pattern owns what each state looks like
  and what it is called. Its CSS moved with it, into `patterns.css`; no rule anywhere in the repo
  named `.step-rail`, `.step-row`, `.step-mark` or any `.rail-*` before this, so the move settles no
  tie and changes nothing that was rendering.
- **`--flow-bar: 53px`** joins the frame constants in `tokens.css`, beside `--safe-bottom`. The rail
  is sticky under the flow's top bar and is pinned to the window in both directions so the band
  always reaches the bottom edge; the bar's height was the one raw number that made that work, and a
  raw value in a rule is a bug.
- **`channelOptions` moved to `features/onboarding/data.js`** alongside `RECORD_CATEGORIES`, and
  profile re-exports both. Not only ownership: with the categories here and the channels there, the
  two files imported each other. The dependency now runs one way.

`.choice-panel` was *not* moved — it is already in `patterns.css`, so this flow uses it as it stands.
No existing rule was relocated by this card.

## 10. Data

`features/onboarding/data.js`

- `STEPS` — the eight, each `{ id, name, question, lede, required, minutes, locks }`.
- `RECORD_CATEGORIES` — the seven, moved here from profile (§2). Profile re-exports.
- `RELATIONSHIPS`, `PRONOUNS`, `ORIENTATION_SESSIONS`, `PHOTO_RULES`.
- `recordFor(previewState)` — `{ saved, skipped, current, grants, plan, shortlist, answer, … }`.

`features/onboarding/logic.js`

- `stepState(id, record)` → `saved | skipped | current | upcoming | locked | unknown`
- `isReachable`, `firstUnresolved`, `savedCount`, `skippedCount`, `lockReason`
- `grantSummary(grant)` — the sentence naming what one person may discuss.

Imported, never copied: `planOptions`, `residences`, `responseDeadline` from housing;
`channelOptions` from profile.

## 11. Out of scope

- The staff workspace side of a revocation (ENR-154 AC 4 / Scenario 4) — the portal has no staff
  surface. What the portal owes is that revocation takes effect immediately *here*, and it does.
- The audit history of authorizations (ENR-154 AC 3) — it is a record, not a screen, and no card
  puts it in the student portal.
- Real file upload for the student photo; the prototype's simulated pick, as elsewhere.
- Editing the enrollment checklist. Onboarding produces the state the portal reads; it does not
  render the portal.

## 12. Done when

- [x] `#/onboarding` renders its own frame — no sidebar, no Edward, no bell
- [x] Eight steps, one per screen, named in the rail
- [x] Four step states visually distinct; skipped reads as set aside, not failed
- [x] Locked step unopenable from the rail **and** from `#/onboarding/8`; verified — the hash bounces
      back to the step she is on and the notice reads *"Choose your orientation session isn't open
      yet — it opens once your housing plan is recorded."* Same refusal from `?state=empty`
      → `#/onboarding/4`, which lands on step 1
- [x] Required steps offer no skip; optional steps offer `Skip for now`
- [x] The figure distinguishes saved from skipped — `5 of 8 saved` over `1 skipped · 2 still to do`,
      and the meter draws the two runs apart
- [x] A failed save leaves the step in progress with the reason stated and the count unchanged —
      verified in `save-fails`: the count stayed at 2 of 8 and the button became `Try again`
- [x] Draft input survives moving between steps and never shows as saved
- [x] `#/onboarding` opens the first unresolved step, not the first step — `resume-skipped` opens
      step 7 with step 6 marked skipped
- [x] Family permissions: default stated first, nobody is complete, emergency contact separated by
      name, zero categories refused with a stated reason, revocation immediate and confirmed by what
      it ended
- [x] Housing step opens on the concrete plan question
- [x] All ten preview states reachable from the pill and linkable by `?state=`
- [x] `StepRail` is on `#/styleguide`, in this commit, with all four states plus locked — and it is a
      design-system pattern rather than a feature component (§9b)
- [x] Tokens only; our own icons; no new dependency
- [x] `npm run build` clean; checked at 1440 and 390; `Esc` closes the drawer and focus returns to
      `Add someone`; all fourteen portal routes still render with no console errors after the
      `RECORD_CATEGORIES` / `channelOptions` move
