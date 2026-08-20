# Student portal — what is built and what is left

Read from the `ENR` board on 2026-08-20, cross-checked against the repo (`src/lib/navigation.js`
`built:` flags and the git log). Staff, Platform and Admin cards are out of this report; only the
`Student ·` and `Both ·` scope that the student portal renders is counted here.

How to read the board: a **Tarefa** is the buildable screen card — that is what lands in this repo.
A **História** is the acceptance story behind it, and it moves on its own clock (most are still
`Prioritized` even where the screen is already in QA). The Épico only groups them.

---

## 1. Built and in QA

Fourteen screens exist, all reachable, all on the shared page shell.

| Card | Screen | Status | Landed in |
|---|---|---|---|
| ENR-163 | Onboarding | Concluído | before this repo |
| ENR-167 | Student portal shell | QA | `1eaacff` |
| ENR-164 | My Enrollment | QA | `83fe604`, `b931d86` |
| ENR-180 | Portal navigation | QA | `4d9458b` |
| ENR-181 | Edward floating control | QA | `6100c3e` |
| ENR-166 | My Financials (Overview / Aid / Payments) | QA | `1eaacff` + pages |
| ENR-188 | My Classrooms | QA | `cd19791` |
| ENR-189 | My Campus Life (Events / Clubs) | QA | `1eaacff` |
| ENR-182 | Help | QA | `1eaacff` |
| ENR-183 | Appointments | QA | `d5612fb` |
| ENR-184 | Profile | QA | uncommitted work in the tree |
| ENR-165 | My Documents | Prioritized | this pass |
| ENR-206 | Health | Development | this pass |

Plus two Jam passes on top: `5ddab1d` (one page shell for every section) and `4b48031` (one summary
panel, advisor sized by the figure beside it).

**In flight right now:** ENR-184 has uncommitted changes in the working tree — `MyProfile.jsx` and
its spec, carrying a design-system change (`--card-zone`, `.card-foot`, the three zones of a card).
Another session owns it; don't touch those two files.

---

## 2. What is still missing

### 2.1 ~~My Documents — the real gap~~ — landed

**ENR-165 · Both · My Documents** — built in this pass. `navigation.js` now declares it `built: true`
with a `decisions` badge, and `App.jsx` renders `MyDocuments` instead of the placeholder. Spec:
`.scratch/ENR-165-my-documents/spec.md`; references: `references.md` in the same directory.

Its two stories, **ENR-157** and **ENR-158**, are both still `Prioritized` — they are acceptance, not
build work, and the spec carries a criterion-by-criterion table of where each of the fourteen lands.
Two of them are only partly this screen's and the spec says so rather than claiming them: ENR-158
AC 5 wants a *notification* as well as the page, and this repo has no mail and no Messages screen, so
what landed is the unread mark, the sidebar count and the toast.

What it leaves behind for anything that needs the record:

- `src/documents-data.js` — **document requirements** (what Aster asked for, each holding a history of
  submissions that is appended to and never overwritten) and **issued documents** (what Aster sent
  her). Every office id resolves against `help-data.js`; no sixth office was invented.
- `src/lib/documents.js` — the five states, and the rule that keeps the prototype honest:
  **checking advances on a clock; in review never does.** The machine's wait can be simulated; a
  reviewer's decision cannot, and ENR-146 puts that decision out of scope.
- `CONTEXT.md` at the repo root — the glossary that settles *requirement* (degree vs document) and
  *request* (Help vs document), which were each about to mean two things.

The three routes that pointed at a placeholder now resolve: `MyClassrooms.jsx:283`,
`data-profile.js:166`, and `next: 'my-documents'` from My Enrollment and Financial aid.

Still open on the staff side of the same épico ENR-146, if the round trip has to close: ENR-59 /
ENR-60 (`Development`), ENR-61 (`Ready for Development`), ENR-86 (`Prioritized`).

### 2.2 Messages — declared in the nav, no card on the board

`messages` is a destination in `navigation.js` with `built: false` and a full hero written, and it
sits fourth in the sidebar. **There is no `Student · Messages` Tarefa on the board** — ENR-85 is the
staff-side one.

Decide one of two things before building anything: either open a student Messages card, or drop the
destination from the nav so the portal stops advertising a page nobody owns. The nearest story is
**ENR-177 · Student · See that my question reached someone** (`Prioritized`, under ENR-190), which
Help partly answers today.

### 2.3 ~~Health — specced, not started~~ — landed

**ENR-206 · Student · Health** — built in this pass, to
`.scratch/ENR-206-health/spec.md`, from ENR-205, ENR-208 and ENR-209. `navigation.js` declares
`health` as a destination between My Classrooms and the two groups, deliberately **without a badge**.

Three things it settled that outlive it:

- **One record, two windows.** The immunization record was already a document requirement in
  `documents-data.js`; Health reads that object rather than copying it, and the record, the send and
  the `checking` clock moved up to `App.jsx`. That fixed an existing gap in ENR-165 as a side
  effect — an upload now survives leaving the page, which is what ENR-157 AC 3 promises in words.
- **One door per requirement, and it can move.** `doorOf` in `lib/documents.js` says where a first
  submission is made. The checklist step and My Documents now both route to Health for this record
  and offer no field of their own.
- **The accommodation answer never leaves the section** — `docs/adr/0001`. No help request, no
  appointment, no badge, and nothing in the record Edward speaks from.

`CONTEXT.md` gained **Accommodation answer**, widened **Office** (a team can receive what a section
routes to it and decide nothing) and widened **Submission** to carry one *or more* files — ENR-209
AC 1 asks for eight, and a vaccination record is physically several photographed pages.

Its three stories, ENR-205, ENR-208 and ENR-209, stay `Prioritized`: they are acceptance, not build
work. **ENR-208 AC 6** is the one this repo cannot honour — concealment enforced below the interface
needs a backend — so it is declared as a property of the shape and said plainly in the spec instead
of being simulated. **ENR-212** is the staff side, and a different surface.

### 2.4 ~~Housing — a card with no story~~ — landed

The earlier reading of this card was wrong on all three counts: it is `Development`, not `Backlog`;
it has three stories under it, not none; and it now has a spec.

**ENR-207 · Student · Housing** — built in this pass. `navigation.js` declares `housing` as a
top-level destination, last in the sidebar, with no badge. Spec:
`.scratch/ENR-207-housing/spec.md`; references: `references.md` in the same directory.

Its stories: **ENR-210** (choose my housing plan) and **ENR-211** (rank my residence preferences),
both `Prioritized` — acceptance, not build work. **ENR-213** is the staff side and is out of scope
here; only its AC 6, the assignment the student sees, is rendered, from published data.

Two divergences are recorded on the spec rather than smoothed over: a fourth plan option
(*arranging my own housing*), which ENR-210 AC 1 does not name but ENR-213 AC 2 requires the
assignment population to distinguish; and the interface never saying *request*, because `CONTEXT.md`
had already given that word to Help, pointing the other way.

What it leaves behind:

- `src/housing-data.js` — the eight published residences, the four plan options, and the response
  deadline, which `data.js` now reads rather than repeating as a literal.
- `src/lib/housing.js` — the rules that keep a **plan** (an answer) apart from a **preference** (a
  request for something somebody else decides), and the reconciliation each residence states
  against My Financials.
- `docs/adr/0002-housing-is-not-a-campus-life-leaf.md` — why this is not a third leaf of My Campus
  Life, which is the first thing a reader of ENR-173 will ask.
- `CONTEXT.md` — `Housing plan`, `Residence`, `Preference`, `Shortlist`, `Response deadline` and
  `Room assignment`, the last as a sibling of `Decision` rather than a case of it.

It also removed the last `kind: 'form'` from `TaskDrawer`: the plan used to be answered inside the
drawer. Housing now routes there through the same `task.section` signpost ENR-206 built for Health,
generalised so both steps carry their own two sentences.

Still open on the staff side of ENR-173: **ENR-213** (`Backlog`).

---

## 3. Stories still open behind screens that are already built

These are not build work — they are acceptance. Every one of them is `Prioritized` while its screen
sits in QA, so they are what a Jam has to sign off, not what has to be coded.

| Story | Screen it belongs to |
|---|---|
| ENR-155, ENR-156 | My Enrollment |
| ENR-159, ENR-160 | My Financials |
| ENR-161, ENR-162 | Portal shell (points, what changed since last visit) |
| ENR-174 | Portal navigation |
| ENR-175, ENR-176 | Edward |
| ENR-178, ENR-179 | Appointments, Profile |
| ENR-185, ENR-186, ENR-187 | My Classrooms, My Campus Life |

Two worth a second look, because the screen may not fully answer them yet:

- **ENR-161 — See what changed since I was last here.** No "since your last visit" surface exists in
  the shell today.
- **ENR-162 — See my points and what they are worth.** Points are named in the ENR-148 Épico title;
  check whether the Topbar actually carries them.

Onboarding stories **ENR-150 to ENR-154** are in QA, one step further along than the rest.

---

## 4. Suggested order

1. ~~**ENR-165 · My Documents**~~ — landed. The nav has no broken promise left.
2. **Messages** — decide: open a card, or remove the destination. Now the only one.
3. **ENR-161 / ENR-162** — verify against the shell; small if the surfaces exist, a card if not.
4. ~~**ENR-206 · Health**~~ — landed, with the record shared with My Documents rather than copied.
5. ~~**ENR-207 · Housing**~~ — landed. It did not need refining; the stories were already there.

After that the student portal is feature-complete against the board as it stands today.
