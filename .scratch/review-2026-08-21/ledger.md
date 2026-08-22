Jira: batch — ENR-164, ENR-166, ENR-181, ENR-183, ENR-184, ENR-188, ENR-189, ENR-206, ENR-207 (design cards, all in Jira status `QA` on 2026-08-22); stories touched: ENR-210, ENR-190, ENR-186, ENR-177, ENR-178
Status: triaged 2026-08-22 — briefs written, nothing transitioned, nothing written to Jira
Labels: persona-student, review-2026-08-21
Jam: (none — these arrived as five markdown documents, not as Jams)

# The review of 2026-08-21 — ledger

Five documents arrived on 2026-08-22 in `Downloads/correcoes-22-08-26/`. Four are effective; the
fifth (`aster-portal-decisions-and-conformance.md`) is a strict subset of
`…conformance2.md` (diff: 2 lines removed, 313 added — Part C) and is not kept. The four are copied
verbatim into `sources/` and are the primary source for every brief in this batch. **This file is the
index**: every item, its final state after the supersession chain, and the card that owns it.

## 0. Sources and the order of authority

| File in `sources/` | What it is | Authority |
| --- | --- | --- |
| `decisions-and-conformance.md` | Part A (call of 2026-08-21: escalation, Edward is the door), Part C (walkthrough of 2026-08-20), Part B (conformance with the ENR backlog) | **A, then C, then B** — newest first, and a Prioritized story beats a meeting note |
| `my-financials-changes-audentra.md` | F1–F16 on `/#/financials/*`; §9 is the portal-wide figure rule and the typography audit of four other screens | screen doc; patched by B3, B4.5, C10.2 |
| `housing-changes-audentra.md` | G1–G11 on `/#/housing`; §9.1 is a My Degree change | screen doc; patched by B4, 9.4, §12 |
| `campus-life-changes-audentra.md` | C1–C10 on `/#/events` and `/#/clubs` | screen doc; patched by C7, C8, B5, §12 |

The Appointments doc of 2026-08-21 already lives in `.scratch/ENR-183-appointments/`; Part A §4 says
which of its items still stand.

## 1. Vocabulary — what the documents call things, and what they are in this tree

The documents were written against the rendered prototype, not the source. Read them with this map so
nobody re-derives it.

| The documents say | In this tree |
| --- | --- |
| "the white card", "the card under the banner" | the `summary` slot of `PageShell`: `SummaryFigure` (figure cell) + `AdvisorBar` (the person), tucked into the hero |
| "the band", "the primary action band" | `ActionBand` |
| "the dark slot", "the dark card", "the rail's metric card" | `AnchorCard` — the rail's first card, on ink |
| "rail card" | `.provenance-card` / the rail card patterns; a rule-of-the-system link is the "How points work" shape (`InfoModal`) |
| "the sentence the page has to say", "the shared alert" | `Notice` in the `notice` slot — docks into the summary foot when there is a summary |
| "drawer" | `Drawer` |
| "tooltip" | a hint (repeats what is already said) or `InfoTip` (says something new; a button) |
| "section title, 17px weight 600" | `--fs-h2` + `--fw-semi` |
| "row title, 17px weight 400", "`--fs-h`" | `--fs-h2` + `--fw-regular` — **the documents' `--fs-h` is `--fs-h2`**; there is no `--fs-h` token |
| "the brand size, 15px" | `--fs-h3` (15px) — used in 28 rules across 11 stylesheets today, so "15px only on the brand line" is a portal-wide sweep |
| "the navigation step, 13.5px" | `--fs-h4` — navigation rows, tab labels, the band's lede and a strong lead-in inside running copy; never a figure, a title, a value or a price (the operative clause — the reference itself carries 13.5px on its lede and, until 2026-08-22, on its ring) |
| "card figure, 21px weight 700" | `--fs-display` + `--fw-bold` |
| "dark card lead, 17px weight 700" | `--fs-h2` + `--fw-bold` |
| "`--fs-figure`, 27px" | exists; used by financials (next-payment, balance ≤820), classrooms, rewards, patterns — to be retired per 9.0 |
| "`--fs-small` with `--ls-caps`" eyebrow | as written |
| "status pill" | `StatusPill` — tones `act`, `wait`, `progress` (all amber today), `done` (green), `stop` (crimson), `quiet` |
| "monogram" | `.org-tile` with initials (campus `OrgRow`, housing `ResidenceRow`) |
| "published image", "published emblem" | an asset under `public/` with provenance in `SOURCES.md`; never stock as the product's default, never generated |
| "Edward opens with the question written" | a door the Edward feature does not have yet — see the ENR-181 brief |

## 2. Facts from the fact-check that change the briefs (read before any doc)

Every "current" claim in the documents was checked against the tree on 2026-08-22 (grep + file
reads). What differs:

- **Already done — not in any brief.** C1.4 (fields are read-state + `Change`); C1.7 in full, nav
  included (My Documents is a `PANELS` entry owned by Profile, no sidebar row, since the Jam of
  2026-08-21); Appointments typography (9.1); Appointments "24" figure removed (no `--fs-figure` in
  appointments.css); Health status pills are the shared `StatusPill` at `--fs-small` (`cc2dd21`).
- **The orbit is not Profile's** — it is the `motif` of the shared `PageHero`. C1.1 is a PageHero
  variant that seats a person where the motif sits, not a Profile patch.
- **"Required for you" is `RequiredStrip`**, already above the tabs under 1061px and the first
  thing in the rail at or above it. C1 is "always above the tabs; drop the viewport switch".
- **Category labels have one source** — `enrollment/data.js` ("Your offer", "Money and aid",
  "About you", "Health and wellness", "Campus life", "Your degree"); Appointments derives its
  `checklistCategories` from it and its `conversationTypes[].category` must match. §6.3 is one
  rename, and Appointments follows in the same commit by construction.
- **Housing's two rail explanations are one card** ("What a preference is worth") with the
  "Changing your housing answer" guide quoted inside it. G9 is smaller than written.
- **Housing "I need help deciding" already routes** — `Ask Housing Services` → `#/help`. B4.2
  becomes "route through Edward/escalation, not the Help page".
- **Housing has no summary panel by decision**: removed in `5e68b80` after the Jam of 2026-08-21
  with a reasoned comment in `HousingPage` ("its figure was the plan she chose, which is what
  `PlanPanel` is; its line was the deadline"). G5/G6 ask it back. **Conflict — see §5.**
- **My Financials' alert is `AlertStrip`** (a `Notice` docked in the summary foot), not
  `ActionBand`. F7 is a real swap. Deadline escalation has a mechanism already (`escalation(daysLeft)`
  tone, `.deadline-chip {level}`); B3.2's finding is that 13 and 41 days render alike.
- **Edward has no external open API.** `Edward` owns `open` in local state; the only opener is its
  launcher; no prop, no context, no imperative handle; suggestion chips call `ask()` directly; nothing
  asks "did that answer it". §12 and C5 are a mechanism to build (ENR-181), then wiring per screen.
- **`StatusPill` tones `act`/`wait`/`progress` share one amber**; there is no blue palette. C3 is:
  give the three states their own colours, add blue, purple stops meaning status, styleguide shows it.
- **`--hero-gap: 30px` is already a token** (and `--hero-tuck: 20px`). C4 is one value.
- **Health 9.3 is probably moot**: "Accessibility" is no longer a block with a bold body-size title;
  after `cc2dd21` it is an `EntryRow` in a headless `Card` (the H4 design). Verify in the browser;
  do not build 9.3 blind.
- **ADR 0005** ("a student can ask a team for a time", accepted 2026-08-21, confirmed by Marco in
  grilling) is reversed by Part A §3/§8.2 and ENR-178 (Prioritized). **ADR 0010 supersedes it**
  (written in this triage). `state: 'requested'` becomes the callback state.
- **The onboarding build spec** (§4.6, §5.4) cited by B4.1 and C4b is not in this repo. Its edit is
  external.
- **A parallel session** is writing `CLAUDE.md`, `docs/agents/design-workflow.md`, `CONTEXT.md`,
  ADR 0006/0007 and `docs/domain/` (US standard) right now. Briefs carry a Domain section per the new
  workflow; commit with pathspec.

## 3. Item ledger

State vocabulary: **stands** (as written), **amended** (by a later part), **superseded** (replaced),
**done** (already in the build), **moot** (no longer applies), **external** (not this repo).

### 3.1 `decisions-and-conformance.md` — Part A (call of 2026-08-21)

| § | Item | Final state | Card |
| --- | --- | --- | --- |
| 1–2 | Appointments, Help, Edward are one escalation: Edward → "did that answer it?" → inquiry / book / callback; chat out of MVP | stands; **§10 clarifies** booking and callback are alternatives, not steps | ENR-181 (the prompt), story under ENR-190 (human) |
| 3 | Callback replaces "ask for a time"; book directly where a calendar exists | stands; **§8.2**: not a change of direction but a return to ENR-178 | ENR-183 + ADR 0010 |
| 4 | Appointments doc: A2 superseded, A7 narrowed (callback), §9 "Ask for a time" tab superseded, 8.7 superseded, A9 amended (labels), A6 amended (band case 3 → escalation); everything else stands | stands | ENR-183 |
| 5 | Periodic advisor meetings: institution-scheduled; confirm / reschedule / can't make it; shares the appointment card, none of the booking flow | **out of MVP, mock only**, needs its own story (§7.3) | prototype branch + story (human) |
| 6.1 | Rejected strings → US campus English ("Academic Advising doesn't have times posted right now", "No times posted", "Request a callback", "Email me when times are posted", "Book a time", "How this works") | stands | ENR-183 (+ `InfoModal` title) |
| 6.2 | Callback drawer copy | **amended by 8.3**: reply time is the office's published one; reply arrives in the portal; badge exposes no team detail | ENR-183 |
| 6.3 | Category labels: "Your offer", "Your financials", "Your health", "Your details", "Your campus life", "Your degree"; navigation keeps "My" deliberately | stands; one source | ENR-164 (Appointments follows by construction) |
| 6.4 | Escalation prompt copy ("Did that answer it?" / "Let's get you to a person." / options / note) | stands; the "Email …" option must not imply a reply to an external address (ENR-177 AC6, §8.1) — label it as sending an inquiry from the portal | ENR-181 |
| 7.1 | Container is ENR-190 "Support services" | stands | — |
| 7.2 | Callback window is the office's published reply time | stands | ENR-183 |
| 7.3 | Periodic meetings are new scope | stands | story (human) |
| 8.1 | Portal is the durable channel; email notifies; no assignee/team detail; resolved inquiry reopens on reply | stands | ENR-181, ENR-183 |
| 8.2 | "Ask for a time" forbidden by ENR-178; drift, not design | stands → **bug** | ENR-183 |
| 9 | Confirmations (Health/Housing always present; accessibility collects no condition; ENR-212 yes → work item) | no work; ENR-212 fact available to Health | — |
| 10 | Meeting record: email first; booking/callback secondary alternatives; chat out | stands | ENR-181 |
| 11 | Draft story "Get to a person when the assistant cannot resolve it" | **human** — not created in this triage | Jira (ENR-190) |
| 12.1 | No route to a person before Edward; exceptions: `Book a time` (resolution), the office stays named | stands | every screen below |
| 12.2 | Opening from a control fills the input, does not send, focuses, cursor at end | stands | ENR-181 |
| 12.3 | Appointments no-times row → Edward; Appointments `no-times` empty state → Edward; My Degree match → one control → Edward (supersedes B2.1's two); Campus club contact → Edward; `Book a time` unchanged | stands | ENR-183, ENR-188, ENR-189 |
| 12.4 | The four prefilled questions | stands | same |
| 12.5 | Appointments keeps booking and what is booked; loses the asking | stands | ENR-183 |
| 12.6 | Edward answers or offers the prompt (ENR-176) | stands | ENR-181 |

**One reconciliation, recorded here so it is not re-argued.** §6.1 gives the no-times row a primary
"Request a callback"; §12.3, later in the same part, sends that row's control to Edward. §12 wins
(newest, and it says the asking leaves the screen). Final: the row's primary opens Edward with the
§12.4 question; Edward's prompt (§6.4) offers the callback, and the §6.2 drawer is reached from there.
"Email me when times are posted" is a notification, not a route to a person, and stays on the row.

### 3.2 Part C (walkthrough of 2026-08-20), checked against the build (C11)

| § | Item | Final state | Card |
| --- | --- | --- | --- |
| C1.1 | Photograph replaces the orbit; initials + upload control when none | stands — a `PageHero` figure variant; `maya-johnson.webp` exists | ENR-184 |
| C1.2 | Rail "useless" | **narrowed by C11.1**: keep the session card (ENR-179 AC7) and the offices; drop only the category count duplicated in the rail | ENR-184 |
| C1.3 | Profile sectioned, not scrolled; five sections | stands | ENR-184 |
| C1.4 | Editing one step harder | **done** | — |
| C1.5 | Name the shared categories, not "3 of 7"; revoke asks confirmation naming person + categories | stands — the legend "What Renata can see · 3 of 7" and the rail's "3 of 7 categories" line are the count; the seven names already render beneath | ENR-184 |
| C1.6 | Channel preference per category | **decision needed** (doc itself says so); default proposed: one default + per-category overrides | ENR-184 (needs-info) |
| C1.7 | My Documents under Profile, nav included | **done** | — |
| C1.8 | Previous-institution record section | stands; **home is open** (Profile default, My Degree the alternative) | ENR-184 (needs-info) |
| C1.9 | "Campus address", "Permanent address", "Mailing address" | stands | ENR-184 |
| C2.1, C2.2, C2.3 | Dates say their kind; completed rows drop description; category on every row | stands | ENR-164 |
| C3 | Semantic status colour portal-wide; purple stops meaning status | stands — foundation, then every screen's pills consume | foundations |
| C4 | Gap banner → first block, one token | stands — `--hero-gap` | foundations |
| C5 | Edward inline at a task, context loaded, prefilled-unsent | stands — control is a pattern (ENR-181); task rows host it (ENR-164); voice is a wish | ENR-181, ENR-164 |
| C6 | Help de-prioritised as a destination | stands — no work; inquiry state lives in escalation | ENR-182 (no action, per Marco 2026-08-22) |
| C7 | "I'm interested" returns (feeds recommendations; not an application; club not necessarily told); events take "Follow" | stands; supersedes B5.1 **and** the campus doc's 6.3 sentence about passing her name to the club | ENR-189 |
| C8.1 | Emblems confirmed; fallback initials, never stock | stands | ENR-189 |
| C8.2 | Academic → the institution's schools (published) | stands | ENR-189 |
| C8.3 | Suppress "Matches Music" on a Music club | stands | ENR-189 |
| C9 | "My health and wellness" in nav and banner | stands; nav convention is title case (ENR-174 AC5) → "My Health and Wellness" | ENR-206 |
| C10.1 | FERPA: the section says these are her records, hers to share and withdraw | stands | ENR-184 |
| C10.2 | Financials: tooltips as well as pagination — F5's "what could change it" | stands | ENR-166 |
| C10.3 | Journeys rename; task icon and action label configurable | **staff (ENR-121)**; constraint here: no student screen hardcodes a task icon or action label | constraint, all cards |
| C11.1, C11.2 | Profile checked against the build: done (C1.4, C1.7, locked-vs-editable, the rail) and still open (C1.1, C1.3, C1.5's count, C1.6, C1.8, C1.9) | as the C1.x rows above | ENR-184 |
| C11.3 | Profile values at 15px → `--fs-h2`, 400 student-owned / 600 institution-owned | stands | ENR-184 |
| C11.4 | Keep "Profile · Version 4 · Updated …" and "8 of 12 details are yours" | stands (keep) | ENR-184 |
| C12 | Praised, do not touch: My Enrollment as a whole, Appointments states, progress chart, Financials pagination | keep | — |

### 3.3 Part B (conformance)

| § | Item | Final state | Card |
| --- | --- | --- | --- |
| B2.1 | Match routes to advisor too (ENR-186 AC6) | **amended by §12**: one control, opens Edward; eyebrow stays "YOUR ACADEMIC ADVISOR"; fallback enrollment advisor | ENR-188 |
| B3.1 | "Documents that need you" cannot be removed (ENR-160 AC4/5) — F2 corrected | stands | ENR-166 |
| B3.2 | Deadline inside a configured window is visually escalated (ENR-160 AC6); F5's marker says what changes it | stands | ENR-166 |
| B4.1 | ENR-210 AC1/AC3 → four plan values; onboarding spec §5.4 likewise | **human** (Jira) + **external** (spec) | Jira |
| B4.2 | "Needing help deciding" routes to a person (ENR-210 AC4) | stands — through Edward/escalation; plan stays open; item stays outstanding | ENR-207 |
| B4.3 | Residence detail (room, building, rates) + compare (ENR-211 AC2) — enlarges G1; hosts G10 | stands | ENR-207 |
| B4.4 | Partial shortlist state (ENR-211 AC9) | stands | ENR-207 |
| B4.5 | Financials housing figure derived from the housing answer (ENR-211 AC8) | stands | ENR-166 |
| B5.1 | Cut "I'm interested" | **superseded by C7** | — |
| B5.2 | Events: email → message to the host; external booking links out and says so | stands — registration is a resolution, not a route to a person; stays direct | ENR-189 |
| B6, B7 | nothing new | — | — |

### 3.4 `my-financials-changes-audentra.md`

F1, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16 **stand**; F2 **amended by
B3.1**; plus B3.2, B4.5, C10.2. §9.0 (figure rule) and §9
(section 17/600, row 17/400) → **foundations**; 9.1 Appointments **done**; 9.2 My Degree → ENR-188;
9.3 Health → ENR-206 (verify; likely moot); 9.4 Housing → ENR-207. Card: **ENR-166**.

### 3.5 `housing-changes-audentra.md`

G1 **enlarged by B4.3**; G2 **stands** (the screen wins; B4.1 updates the story); G3, G4, G7, G8,
G10, G11 **stand**; G5/G6 **in conflict with the Jam of 2026-08-21** (see §5); G9 **smaller than
written** (one card); plus B4.2, B4.4, 9.4. §9.1 → ENR-188. Card: **ENR-207**.

### 3.6 `campus-life-changes-audentra.md`

C1 **smaller than written** (RequiredStrip already exists; make it always-above-tabs); C2, C3, C4b,
C5–C10 **stand**; C4 **amended**: club contact control opens Edward (§12.3), primary "I'm interested"
returns with C7's meaning and without 6.3's "passes your name to the club" sentence; events take
"Follow" (C7); event actions per B5.2; plus C8.2, C8.3. The B0 "hold" verdict falls with B5.1.
Card: **ENR-189**.

## 4. Outside the cards

| What | Where it goes | Who |
| --- | --- | --- |
| ENR-210 AC1 → four values; AC3 names all four | Jira edit | human (not done; Marco deferred Jira writes on 2026-08-22) |
| Story "Student · Get to a person when the assistant cannot resolve it" (§11 draft) under ENR-190 | Jira create | human |
| Story for the *advising meeting* (§5, §7.3), mock-only — the institution-scheduled meeting, confirm / reschedule / decline | Jira create | human |
| Onboarding build spec §5.4 (four values) and §4.6 (emblems/images) | external document | human |
| ADR 0005 → superseded by ADR 0010 (callback, not time request) | `docs/adr/` | **done in this triage** |
| `CONTEXT.md` "Time request" → "Callback request" | `CONTEXT.md` | done in this triage (surgical; a peer session is editing the same file) |
| Journeys name + configurable task icon/action (C10.3) | staff portal, ENR-121 | out of this repo |
| Pointer comments on the nine cards | Jira comments | not done (deferred) |

## 5. Decisions — grilled and settled 2026-08-22 (`/grill-with-docs`, Marco accepted every recommendation)

1. **C1.6 Communication preferences → one default + per-category override, for every category.**
   The onboarding keeps asking one value and it becomes the default; Profile's *Contact and
   communication* offers, behind a closed disclosure, one row per checklist category with the default
   pre-selected. Not a grid; not "only where the institution varies" (opaque to the student).
2. **C1.8 Previous-institution record → Profile owns it** (*Where I came from*), **My Degree reads
   it**: "See the evidence" on a potential match opens the record at that line. The data already
   exists in two features (the final high school transcript requirement; the IB / Northside College
   transcript evidence).
3. **Imagery in the prototype → residence halls get stock building photography** (Unsplash exteriors
   and shared spaces, chosen by hand, `public/residences/SOURCES.md` as `people/SOURCES.md`; bedrooms
   only with a caption naming the room type; never people, never generated; monogram fallback);
   **clubs' emblems are the duotone glyph tile that `OrgRow` already renders**, initials when none.
   Written into CLAUDE.md ("a place may carry a photograph of the place, never of people").
4. **Housing summary panel → returns** (G4–G6): figure = the plan's standing, support = deadline or
   assignment, second line = "n of 3 residences ranked", `AdvisorBar` with the scope line. Passes the
   workflow's test the way Health did; the Jam's objection was to the old figure. Recorded in
   `docs/agents/design-workflow.md`.
5. **Advising meeting mock → one institution-scheduled meeting in *Your conversations*** on
   Appointments, own preview state, states *scheduled by the office → confirmed / reschedule requested
   / declined*, three actions; reschedule is a request to the office, not a picker; on
   `prototype/periodic-meetings` via `/prototype`, never on `main`. Term: **Advising meeting**
   (glossary). Story: human.
6. **Responsive → in, on every card.** "Out of scope" in the documents meant "not inspected".
7. **C9 → "My Health and Wellness"** in the nav row and the hero kicker; and the other kickers align
   to the nav label in the same commit ("My Degree · BA Computer Science", "My Campus Life ·
   Published by Aster Student Life"); My Enrollment's "Class of 2031" with its flag stays — it is the
   one hero that states a fact about her standing, by design.
8. **Glossary → *Inquiry* replaces *Help request*; *Escalation* and *Advising meeting* added;
   *Callback request* already in** (`CONTEXT.md`). Code names (`features/help`, `HelpPage`) are not
   the glossary and do not change — Help has no work (C6).

Residual assumptions, stated so they are not silent: the *Where I came from* record shows what she
sent as received, with each transcript's review state, not only accepted transcripts; the scope
line's slot on Housing's panel is the implementer's (the Health precedent is the model). No new ADR:
none of these is hard to reverse; the one that was (time request → callback) is ADR 0010.

## 6. Execution order

| Wave | What | Blocks |
| --- | --- | --- |
| 1a | Foundations: `StatusPill` semantic colours + blue, `--hero-gap`, figure rule (`--fs-figure` retired), section/row weights, the 15px and 13.5px sweeps, styleguide — `review-2026-08-21/brief.md` | every screen |
| 1b | Edward is the door + escalation prompt + inline-at-task — ENR-181 | 183, 188, 189, 207 (B4.2), 164 (C5) |
| 1c | Category labels rename — ENR-164 (one source; Appointments follows) | — |
| 2 | ENR-166, ENR-207, ENR-189, ENR-184 in parallel; ENR-183 after 1b + ADR 0010; ENR-188, ENR-164 (C2), ENR-206 small | — |
| 3 | Cross-screen sweep: 15px only on the brand line, 13.5px only on navigation, two figure treatments, no status at `--fs-micro`, no route to a person before Edward except `Book a time`, no hardcoded task icon/action label, categories identical on checklist and Appointments; capture at 1440/390 | — |

## 7. Progress

| Wave | State | Where |
| --- | --- | --- |
| 1a foundations | **built 2026-08-22** (`2761ff4`) — proof in `brief.md` "Done" | — |
| 1b Edward door, check, escalation, inline ask | **built 2026-08-22** — proof in `ENR-181-edward-floating-control/changes-2026-08-22.md` "Done"; Mobbin references recorded first | — |
| 1c category rename | **built 2026-08-22** — one source (`enrollment/data.js`) + the conversation types; glossary entry **Category** records the My/Your decision. Side-finding: `d14f807` (the US-calendar commit, a parallel session) removed the *Your offer* tasks from the checklist, so Appointments' "Enrollment step" conversation type — category *Your offer* — is no longer offered (a type whose category the checklist does not know is not shown). Flagged, not fixed here: the category a deposited student's enrollment step belongs to is that session's call | ENR-164 |
| 2 screens | ENR-206 **built 2026-08-22** (rename + kickers; 9.3 verified moot by design). ENR-164 **built 2026-08-22** (C2.1–C2.3, C5 inline ask). ENR-188 **built 2026-08-22** (§9.1 program in the dark slot, 9.2, B2.1 via Edward). ENR-166 **built 2026-08-22** (F1–F16 with B3.1/B3.2/B4.5/C10.2; follow-up: the housing figure follows the student's *live* plan once Housing's plan state is lifted out of its page). ENR-183 **built 2026-08-22** (no time request; the door on the no-times row; the callback drawer from Edward; "How this works"; the orphaned *Your offer* topic back). ENR-207 **built 2026-08-22** (G1–G11, B4.2–B4.4: `PlaceTile` + eight stock exteriors with `SOURCES.md`; the panel returns with the standing as its figure; the compare view hosts the filters; the band; the rail behind *How housing decisions work*; *help deciding* → Edward). ENR-189 **built 2026-08-22** (C1–C10 with B5.2, §12: the required block above the tabs everywhere; one list; rows that act; emblems on every club; *I'm interested*; the contact through Edward; the schools replace Academic). ENR-184 **built 2026-08-22** (C1.1–C1.9, C10.1, C11.3: her photograph in the hero; five sections as routed tabs; the share named and ending it confirmed, FERPA said; one default and per-kind channels; *Where I came from*; US addresses). All nine cards built | each card |
| 3 sweep | **done 2026-08-22** — sixteen routes at 1440: no 15px and no 13.5px text in any content column, notice, summary or rail after two fixes (the ledger total's label → `--fs-h2`; the inline document rows' titles → `--fs-h2`/regular); figures are 21px text or a pill; status pills at `--fs-small`, none at micro; the only direct routes left are *Book a time*, *Email the host* (B5.2, a resolution), *Email me when times are posted* (a notification) and Profile's *Ask {office}* (an inquiry to an office, not a person); the campus rail's *Ask Student Life* became the Edward door; categories identical on the checklist, Appointments and Profile's channel rows. No element-by-element capture diff was run for this session's CSS — every change after 1a was additive or scoped to a new class, none moved a rule. `coverage-2026-08-22.md` holds the item-by-item account | `coverage-2026-08-22.md` |
