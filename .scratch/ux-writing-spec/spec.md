Jira: (none — asked for directly, 2026-08-21)
Status: done — built, verified, committed to main 2026-08-21
Labels: persona-student, screen-all, ux-writing
Jam: (none)

# Aster UX writing — applying `aster-ux-writing-spec.md` to the portal

Source: `C:\Users\marco\Downloads\aster-ux-writing-spec.md` (audit of 2026-08-21 against
`audentra-design.vercel.app`). The document is prescriptive: it names strings, routes and data
corrections. This file is the grilling record that turned it into decisions this repo can execute
— every place the document and the codebase disagree, or where the document leaves a choice, is a
numbered question below with the answer taken. Marco asked for the grill to be run and for its
recommended answers to be followed without a round-trip, so each ➡️ is the decision, not a proposal.

The execution report the document asks for (§0, "Report at the end") is `report.md` beside this file.

## 0. What the codebase actually is (facts, not decisions)

Found by five read-only sweeps before any string was touched:

- **Copy lives in data, not in JSX, more than the document assumes.** H1s for every route are
  `lib/navigation.js` (`hero.title`); Profile overrides its own with a template. Section labels
  (`HEALTH & WELLNESS`) are title-case data uppercased by CSS. `HAPPENED` is a label map + CSS.
  `Blocks class registration` is `Blocks {registration.label}`. Several "Current strings" are built
  from templates, so exact-match replacement needed the source, not the rendered text.
- **6.7 is already half true.** Nothing in `src/` reads the browser clock. `PORTAL_TODAY =
  '2026-08-20'` (`enrollment/data.js:7`) and `CAMPUS_TODAY` anchor every relative day. The six
  `daysLeft` integers are hand-written literals consistent with that date. The only defect in that
  row is `opensOn()` formatting the gate date with `en-GB` → `1 September`.
- **`Audentra` appears in 10 student-visible places, not one.** The Step 3 string twice
  (`enrollment/data.js:45`, `:105`), three InfoModal bodies, two preview disclaimers
  (BookingDrawer, CampusDrawer), two footers (`Powered by Audentra`, `Designed with Audentra`), and
  the styleguide (not student-facing).
- **The narrator breaks on 20 files, not 2.** Thirty `we/us` strings; ten are the "We couldn’t
  load X" error family.
- **Channel promises: 11 contact promises and 6 channel names**, most outside the routes the
  document lists (Housing data, onboarding `HealthStep`, Edward, the enrollment empty state).
- **Accessibility Services is a card inside Health** (`features/health/AccommodationCard.jsx`),
  with its data in `health/data.js`, its states in `health/logic.js`, its answer held in
  `App.jsx`, and the rule that it reaches nothing else recorded as ADR-0001 — whose title says the
  answer *stays inside Health*. ENR-208, the story behind it, is labelled `screen-health`.
- **The My Documents badge counts unread decisions** (`unreadDecisions`, ENR-158 AC 5); the page
  counts `needsYou` (`needed` + `changes-requested`). 1 vs 2 is two predicates, not a bug in one.
- **Profile and Campus hold two separate interest constants** (`profile/data.js:201` joined
  string; `campus/data.js:7` array). Neither imports the other.
- **Another session is live in the same tree** (design-system tooltips + feedback cards), with
  uncommitted edits in `App.jsx`, `Sidebar.jsx`, `Icon.jsx`, `HealthPage.jsx`, `EnrollmentPage.jsx`,
  `DocumentsPage.jsx`, `patterns.css`, `tokens.css` and more. Every edit below is an anchored
  exact-string replacement that reports a missed anchor; no file is rewritten whole.

## 1. The design tree

### Root — apply the document. Branches: record · data corrections · the Accessibility route · names · channel · copy · mechanical sweep · glossary/ADR · verify · commit.

❓ **Q1 — Where does this work live?** No ENR card exists for it (JQL on summary ~ writing/copy/voice/tone returned nothing relevant).
➡️ `.scratch/ux-writing-spec/` — this spec, `references.md` (Mobbin for the one new screen) and `report.md`. Same convention as the other direct-ask cards this week (`design-system-feedback`). No Jira issue is opened.

❓ **Q2 — Branch or main?** `CLAUDE.md` says one branch per card; memory says commit on `main` and push.
➡️ Main, per memory. The tree carried another session's unfinished work in shared files when this started, and the later memory says that is a question for Marco, not a call to make alone. It resolved itself: Marco asked mid-pass for "commit e push pro deploy" once everything checks out, and the design-system session committed its own work (dbca41f, c83436d) before this pass finished. The one remaining foreign thing in the tree — a third session's `.scratch/jam-2026-08-21-design-system-1/` — is left out at that session's request (staged by path, not `-A`).

### Branch B — data corrections (§6), first

❓ **Q3 — 6.1, the immunization deadline.** Must fall before registration opens on Sep 1. The task is `due: 'Nov 30', daysLeft: 102`.
➡️ **Aug 28, 2026**, `daysLeft: 8`. Eight days from `PORTAL_TODAY`; six business days, which is one more than Health Services' five-day review, so a record sent today can still clear in time. The health card renders it as `Aug 28, 2026` (§2.3). `Optional now` goes from `health/logic.js:87`, replaced by the 5.4 line.

❓ **Q4 — 6.2, the orientation date.** Sep 3 must move before Sep 1. Onboarding also lists sessions (`Friday Aug 28`, `Thursday Sep 3` "for anyone who cannot make the first two").
➡️ Campus event → **2026-08-27** (Thursday): within seven days of today, so it renders as `Thursday, Aug 27` — the exact example §2.3 gives. Onboarding's late session → `Monday Aug 31`, still before Sep 1 and still after the first two. Time ranges lose the spaces around the en dash (§2.3).

❓ **Q5 — 6.3.** ➡️ `entry: 'Fall 2026 entry'`. The SAP sentences about "after the Spring 2027 term" stay: a Fall entrant's first check is after their first spring.

❓ **Q6 — 6.4, one source for interests.** The document says make Profile the source.
➡️ `profile/data.js` exports `campusInterests = ['Music', 'Volunteering']` and joins it for its own field; `campus/data.js` re-exports it as `studentInterests`. One import changes, the ranking and the `Matches Music` badges keep working.

❓ **Q7 — 6.6, the My Documents badge.** Today it counts *unread decisions* (ENR-158 AC 5: a decision she has not opened reaches her somewhere other than the page it happened on). The document says badges count what needs action.
➡️ Badge = `needsYou(record.requirements).length`, matching the page. The ENR-158 reach is not lost: the unread decision is an item in the bell's feed, which is what the document says the bell is for. Recorded as a comment at the predicate, not an ADR — it is one line and reversible.

❓ **Q8 — 6.7.** ➡️ Nothing to freeze; `PORTAL_TODAY` already does it. Fix `opensOn()` to US order (`September 1`), and report the row as already satisfied.

### Branch C — the Accessibility route (6.5 / 5.5)

❓ **Q9 — Move Accessibility out of Health, against ADR-0001's title and ENR-208's `screen-health` label?**
The document's reason: filing accommodations as a medical matter contradicts the page's own "Aster isn't asking what your condition is". ADR-0001's *substance* — the answer creates nothing anywhere else: no help request, no badge, no notification, nothing Edward can read — is about concealment, not about which sidebar row the card sits under.
➡️ **Move it.** Marco's instruction is the document. The concealment rule travels with it untouched. Write **ADR-0003** (own route, no badge, the rule restated) and mark ADR-0001 as superseded *in location only*. ENR-208's scenarios say "opens the Health section"; that is reported as a divergence on the record, the way ENR-214's spec recorded its own.

❓ **Q10 — What does the new page consist of?** The document gives the H1 and the card strings, nothing else.
➡️ `features/accessibility/` — `AccessibilityPage`, `AccommodationCard` (moved), `AccessibilityRail`, `data.js` (question, answers, `answerFor`), `logic.js` (answer states). `PageShell` with hero only: kicker `Accessibility · Accessibility Services`, H1 `Accommodations, if you want them.`, lede derived from the half of Health's old lede that moved (`One question that’s yours to answer, or not.`). **No summary slot**: the page has no standing (ADR-0001: the answer is never a figure), and My Campus Life already renders without one. Rail: `AnchorCard` with the office's own reply time (`Usual reply` / `3 business days`, the §1.5 pattern, the figure the office already publishes on Help) then *Who is on the other side* with the one office. Sidebar row `Accessibility` straight after `Health`, new `accessibility` icon, **no badge**. Preview states: the subset of Health's that concern the answer (`ready`, `empty`, `health-settled` as "asked to talk", `send-fails`, `partial`, `loading`, `error`).

❓ **Q11 — The CSS.** The question card's rules live in `health.css`; the rail's `.teams-list` shape would now be used by two sections.
➡️ New `styles/features/accessibility.css` imported right after `health.css`; the question-card block moves there whole, in order. `.teams-list` / `.team-where` **stay** in `health.css` and the new rail reuses them — the way every rail already reuses `.provenance-card` from `campus.css`; moving them to `patterns.css` would have meant a styleguide entry in a file another session was editing that hour, for a shape that was not changing. The move is proved, not eyeballed: captures of the question card on `#/health` were taken before any edit (twice, zero diffs between runs) and diffed against the card on `#/accessibility` after — 23 of 24 elements byte-identical at 1440 (the one diff is a shortened sentence's width), 24 of 24 at 390; on `#/health` itself only heights and widths moved, all from shorter copy.

❓ **Q12 — What else in Health still talks about the question?** `navigation.js` health lede, `documents/logic.js` `DOORS.health.line`, `enrollment/data.js` `sectionLine`, Health's preview-state descriptions, and onboarding's own copy of the question (`HealthStep.jsx`).
➡️ Rewrite each so Health speaks only of the record. Onboarding keeps its step (it is the place the answer is first given) and only its channel-rule violations change (Q16).

### Branch D — names (§3)

❓ **Q13 — `Aster Registrar` / `Registrar’s Office` appear in 9 more places than §5 lists.** ➡️ Apply §3.2 everywhere: `Office of the Registrar` on first mention per surface, `the Registrar` after. `Aster’s Financial Aid office` → `Student Financial Services`.

❓ **Q14 — The narrator.** Thirty `we/us` strings across 20 files; §3.3 says two pages.
➡️ §0.8 makes §3 product-wide, so all go — except quoted voices that are not the portal's (an office's reply text in Help, a club's own post). The "We couldn’t load X" family becomes subject-first (`Your sections couldn’t be loaded`), the form the document itself keeps for `Your record could not be read just now`. `We’re here to help.` is deleted outright (rule 6: never perform care).

❓ **Q15 — `Smart order` stays; its modal says "Quick wins appear when…"** ➡️ The tab is renamed `Fastest` by 5.1, so the modal sentence is updated to `The fastest steps appear when…`, reported as an unlisted change (a renamed thing cannot keep its old name in the next sentence).

### Branch E — the channel rule (§1.5), product-wide per §7.4

❓ **Q16 — Eleven contact promises and six channel names, most unlisted.**
➡️ Every promise of contact is rewritten to what the office does or what the screen shows (`This page updates when they decide`). The yes-answer copy in Accessibility becomes `Accessibility Services gets your name. Nothing about your health is sent with it.` / `Accessibility Services has your name. Nothing’s pending on you.` Exempt, and reported as judgement calls: copy whose *subject* is the channel — onboarding's notification-preference options, the phone-verification code, `Aster can’t text you until that number is verified` — because naming the channel there is the feature, not a promise. One of those is stale (`Aster writes to you in Messages`; Messages was removed) and is corrected to `in the portal`.

❓ **Q17 — `Audentra` in the seven unlisted places.** ➡️ Where the vendor is the *actor* (InfoModal ×3, the two preview disclaimers) it becomes `Aster` or `the portal`, the two words the document itself uses. The two footer attributions (`Powered by Audentra`, `Aster University sample experience · Designed with Audentra`) are left and reported: they are chrome that credits a vendor, not the portal speaking to the student, and whether a demo watermark stays is Marco's call.

### Branch F — copy by route (§5) and glossary (§4)

❓ **Q18 — Setup card body (5.1), conditional.** The drawer's form collects two fields, both contact (`Mobile number`, `Emergency contact`). Its help tab also lists "Review your preferred name and mailing address", which the form does not collect.
➡️ The form is what the card collects → first option: `Add the contact details you didn’t have during setup. You can change them any time.` The help-tab line is left (not listed; not wrong).

❓ **Q19 — Glosses with no row to sit in.** §4 asks for *Verification* (`#/financials`, `#/my-documents`) and *Immunization record* (`#/health`, `#/my-documents`) inline, but §5 gives no sentence for them; `Cost of attendance` may be a row or a caption; the two metric rows say "Replace" with a 70-character label.
➡️ Glosses go where the term is first read on that route, as a caption or a trailing clause, never behind the existing `TermTip` (which stays — the other session owns tooltips). Metric labels render the full sentence with the gloss as a muted continuation so the row survives 390px. Each placement is listed in `report.md` as an unlisted change, with §4 as the reason.

❓ **Q20 — 5.12 quotes `7 credits under review — not counted`; the code says `not counted above`.** ➡️ Replace the source line with the document's new string (`7 credits under review, not counted yet`); §0.6 says skip on no match, but this is the same string with one word the audit dropped, not a near match.

### Branch G — the mechanical sweep (§2)

❓ **Q21 — 226 em-dash lines.** ➡️ All prose ones go (comma or period, period when the second clause carries the news). Exempt: the `—` used as a null glyph for a missing figure (7 places: a placeholder, not punctuation) and comments. `aria-label` templates are included — a screen reader reads them. En dashes in ranges are untouched; the capture distinguishes the two characters.

❓ **Q22 — `catalogue` / `organisation` as identifiers** (`Catalogue.jsx`, `campusOrganisations`, a `kind` string). ➡️ Display strings only. Renaming identifiers is not copy and would touch the other session's `HousingPage.jsx`; reported.

❓ **Q23 — Dates.** ➡️ `longDate` / `weekdayDate` / `shortDate` / `shortWeekdayDate` and `opensOn` become US-order; weekday appears only within seven days of today (the function takes `today` and defaults to the frozen date). Literals (`bookedOn: '18 August'`, `Approved 4 Aug`, `Published by Aster on 12 Aug`, `December 15, 2026`, `March 14, 2008`) follow §2.3. Onboarding's birth year (2009) disagrees with Profile's (2008); aligned to the record and reported.

### Branch H — glossary and decisions

❓ **Q24 — What does `CONTEXT.md` learn?** ➡️ **Step** (a checklist item is a verb phrase; the document it produces is a noun phrase — §3.1 as vocabulary); the offices by their canonical names with the forms to avoid; **Wellness** over wellbeing; the section now called My Degree. ADR-0003 for the Accessibility route. No ADR for badges, voice or punctuation — all reversible in a line.

### Branch I — verify and report

➡️ `npm run build` clean; every route at 1440 and 390 through the playwright fallback (both Chrome MCP profiles may be held by the other session); keyboard on the new page; the two CSS-move diffs at zero; `report.md` with the three lists §0 asks for.

## 2. Execution order (§7, with the dependencies this codebase adds)

1. §6 all — 6.7's formatter, then 6.1–6.4, 6.6, then 6.5 (the move, which needs the captures taken first).
2. 5.2 — the vendor name, everywhere it is the actor.
3. §3 — names, product-wide.
4. §1.5 — channel, product-wide.
5. §5 — route by route, including the new route's own copy.
6. §4 — glosses.
7. §2 — punctuation, US English, dates, `and`, serial comma, buttons, status labels.
8. `CONTEXT.md`, ADR-0003, ADR-0001 note.
9. Build, browser, diffs, `report.md`.

## 3. Done when

- [x] Every string in §5 located is replaced verbatim; every one not found is in `report.md`.
- [x] §6 corrections land before §5 and the six contradictions are gone on screen.
- [x] `#/accessibility` exists, is in the sidebar after Health with no badge, and Health no longer renders the question.
- [x] No `Audentra` speaks to the student; the two attributions are reported, not silently kept.
- [x] No `we/us/our` from the portal; no promise of contact; no channel named outside the exempt, reported places.
- [x] No em dash in prose; no British spelling or date order; `and` in titles; `Usually replies in N business days` on all three surfaces.
- [x] CSS move diffs at zero style changes on the captured elements.
- [x] `CONTEXT.md` and `docs/adr/0003-*.md` written; ADR-0001 annotated.
- [x] `npm run build` clean; 14 routes checked at 1440 and 390 with a clean console.
