Jira: ENR-188 (the My Classrooms card, in QA) — this is the design brief `my-degree-changes-audentra.md`
     of 2026-08-21, applied to that screen. No new card was opened.
Status: built (2026-08-21)
Labels: design, persona-student, screen-my-classrooms
Jam: (none)
References: references.md (four Mobbin searches)
Brief: C:\Users\marco\Downloads\my-degree-changes-audentra.md — sixteen items D1–D16, copy in §7

# My Degree — the requirement list becomes a decision aid

## 1. What this answers

The brief's one-sentence diagnosis: *the screen models which courses satisfy a requirement but
never which requirements a course satisfies, it counts in credits while the student decides in
courses, and across thirty-odd course rows it offers no action at all.* Sixteen items, all
implemented, under four product rules: the university allocates, double counting is per pair of
requirements with a rule ID, a plan is the student's own list and moves no counter, and every route
to a person leads to the Office of the Registrar.

## 2. The grilling — decisions, with the recommendation taken on each

Marco asked for the brief to be grilled and then built in one go; every question below was settled
by the recommendation. Flip any one by editing the place named.

| # | Decision | Settled as | Where |
| --- | --- | --- | --- |
| Q1 | "Registrar's Office" (brief) vs *Office of the Registrar / the Registrar* (`CONTEXT.md`) | The glossary. "Ask the Registrar", "The Office of the Registrar reviews this and decides." | `ClassroomsPage.jsx`, `AcademicDrawer.jsx`, `CreditMatchCard.jsx` |
| Q2 | The brief measured the deployed build; the local reference has moved on | The local tree is the reference | — |
| Q3 | D11 "twice" vs R1/7.4 keeping the subtitle and the per-card line | Subtitle and per-card line stay (R1); the white card and the requirement rows become neutral pointers; match cards start closed, so the first paint says it twice | `ClassroomsPage.jsx`, `RequirementCard.jsx` |
| Q4 | Band component and position | `ActionBand` pattern (label, consequence *or* action), the reference's `.recommended-banner` CSS moved to `patterns.css`; rendered under the first group's head, above the first requirement — the reference's position | `design-system/patterns/ActionBand.jsx`, `patterns.css` |
| Q5 | D6.2 action inside a `<button>` head | `div.requirement-head` (click anywhere toggles) + `h3 > button.requirement-toggle` with `aria-expanded`/`aria-controls`; the action sits in the meters cell outside the button | `RequirementCard.jsx` |
| Q6 | Course row was a button opening the drawer | `article.course-row`: mark, identity, trailing cell with status or plan action, and a quiet "Details" that opens the course drawer | `CourseRow.jsx` |
| Q7 | Plan persistence | `localStorage` `aster.degree.plan` (array of course codes) | `ClassroomsPage.jsx` |
| Q8 | Plan helper placement | Once per expanded requirement, under the first plannable group label | `RequirementCard.jsx` |
| Q9 | Confidence chip icons | `gauge` for likely, `magnify` for needs review — vendored | `manifest.mjs`, `logic.js` |
| Q10 | Office in the summary panel | `AdvisorBar` takes an office subject: a `bank` glyph in a tile, no face; both actions route to the Registrar | `AdvisorBar.jsx`, `data.js` |
| Q11 | Remaining lines missing for Systems and Theory | "Three courses finish this."; credit-gap fallback when course credits differ | `data.js`, `logic.js` |
| Q12 | "This term" | `program.currentTerm = 'Fall'` | `data.js` |
| Q13 | Double-counting pairs | One, `QR-03`, Quantitative Reasoning ↔ the Computer Science major (MATH 101) | `data.js` |
| Q14 | Effect line | computed: `from`, `to = from + target.credits`, "stops being locked" for the target if locked and for every course whose prerequisite is the target | `logic.js` |
| Q15 | Evidence drawer content | D8's seven blocks in order; the confidence note joins the rule block, the "what to do meanwhile" advice joins *Who decides*; tabs go; no verdict control | `AcademicDrawer.jsx` |
| Q16 | Anchor card after D10 | the under-review amount is its figure | `ClassroomsRail.jsx` |
| Q17 | Four lines in the white card | one line under the figure: "2 of 10 requirements met · 46 elective credits remaining" | `ClassroomsPage.jsx` |
| Q18 | Locked row says the prerequisite twice | the meta prerequisite drops on locked rows; "Requires X, and you have it" stays (R5) | `CourseRow.jsx` |
| Q19 | Spec location | this directory, keyed to ENR-188 | — |
| Q20 | Commit | main, pathspec only | — |
| Q21 | Glossary | *Plan*, *Potential match*, *Counts toward*, *Requirement standing* | `CONTEXT.md` |
| Q22 | Group head count | text "6 requirements" in the trailing cell | `ClassroomsPage.jsx` |
| Q24 | Default open | IN PROGRESS only | `logic.js` |
| Q25 | Responsive | out of the brief's scope; nothing may break at 620 — existing rules kept, new cells stack | `classrooms.css` |

## 3. Layout — the page after the brief

1. **Summary panel**: ring tracks credits (`15 of 120 → 13%`), caption "Credits approved", line
   "2 of 10 requirements met · 46 elective credits remaining"; the Registrar block where the
   advisor was; foot notice "2 potential matches are waiting on the Registrar" / "Nothing is
   waiting on a credit decision".
2. **Core curriculum** card: head (bare glyph, name, line, "6 requirements"); the band as the
   first thing in the list; then the requirements. **Computer Science major** card: "4
   requirements". The Electives group is gone.
3. **A requirement**: mark · h3 name (the toggle) · summary · remaining line · meters (credits,
   status pill, "See what you can take") · chevron. A neutral pointer strip when a match targets
   it. Open: up to four labelled groups — COUNTED, YOU CAN TAKE THIS TERM, LATER TERMS, BLOCKED
   FOR NOW — the plan helper once, under the first plannable label.
4. **A course row**: mark · name + PLANNED pill · meta (credits, terms, resolved prerequisite) ·
   counts-toward line · pending-match line · trailing: "Approved Aug 4" / "Locked until you have X"
   / "Add to my plan" / "In your plan · Remove", and "Details".
5. **Waiting on the Registrar**: ADVISORY badge, subtitle; each match a closed accordion — head:
   from → to, confidence chip with icon; body: rule, decider, effect line, disclaimer, actions
   ("See the evidence", "Ask the Registrar"), reverse link to the course.
6. **Rail**: anchor card with the under-review figure; Your program; Your official record.
7. **Evidence drawer** (`.evidence-drawer`): POTENTIAL MATCH · target course · the document ·
   WHAT ASTER READ · THE RULE THAT APPLIES · WHO DECIDES · actions.

## 4. States

| State | Band | Open on load | Notes |
| --- | --- | --- | --- |
| ready | case 1: "2 potential matches are with the Registrar" → See what's waiting | Natural Science, Foreign Language | disclaimer on subtitle + rail; per card inside |
| no-matches | case 2: "Natural Science has courses open this term" → See what you can take | same | match section empty state unchanged |
| loading | none | — | frame skeleton |
| partial | case 2 | Foreign Language (NS is pending) | matches unreachable; nothing changes |
| empty | none | — | unchanged |

## 5. Interactions

- Requirement head: click anywhere toggles; Enter/Space on the name; `aria-expanded`,
  `aria-controls`. "See what you can take" opens the requirement and scrolls to the takeable group.
- Band button: case 1 scrolls to the match section; case 2 opens the requirement it names even if
  the student closed it, and scrolls to its takeable group.
- Pointer on a requirement / pending-match line on a course: scroll to the match and open it. The
  match card's reverse link opens the requirement and scrolls to the course row.
- Add to my plan → In your plan + Remove, PLANNED pill; nothing else moves. Remove undoes it.
- See the evidence → the evidence drawer; Ask the Registrar → toast naming the office; Close.
- No control approves, dismisses or applies a match, anywhere.

## 6. Data

`features/classrooms/data.js`: `program.currentTerm`, `program.electiveCreditsApproved`,
`registrarOffice` (the bar's subject), `remaining` per requirement, `doubleCountRules`; the
`electives` group and requirement removed. `logic.js`: `courseSituation`, `groupCourses`,
`remainingLine`, `countsToward`, `matchEffect`, `bandFor`, `electiveRemaining`,
`confidenceIcon`; `creditTotals` and `requirementStatus` still read approved credit only, and the
plan is not an input to either.

## 7. Out of scope

Mobile layout (the brief), course registration, any change to an academic outcome, a new Jira card.

## 8. Done when

- [x] D1 every course row states what it counts toward, one of three wordings
- [x] D2 every unfinished requirement states what is left in courses
- [x] D3 courses grouped COUNTED / YOU CAN TAKE THIS TERM / LATER TERMS / BLOCKED FOR NOW, labels only when non-empty
- [x] D4 a locked course targeted by a match links to it, and back
- [x] D5 the band renders in ready and no-matches with the right case, never a placeholder
- [x] D6 Add to my plan / In your plan + Remove + PLANNED; no counter moves; See what you can take on unfinished heads
- [x] D7 every match states its conditional effect
- [x] D8 the evidence drawer: document, reading, rule, decider; no verdict control
- [x] D9 10 requirements; elective figure once, as a remainder
- [x] D10 the ring tracks credits, unit named; no figure more than twice
- [x] D11 disclaimer at most twice on first paint
- [x] D12 three status families, three forms
- [x] D13 no "In the catalog"
- [x] D14 requirement titles H3 at `--fs-h2` weight 400; course titles `--fs-body` weight 400
- [x] D15 every route to a person leads to the Office of the Registrar
- [x] D16 groups never collapse; IN PROGRESS open; closed heads carry the count; match cards closed
- [x] `npm run build` clean; ready / no-matches / loading / partial / empty checked at 1440; keyboard on the accordion and the drawer
