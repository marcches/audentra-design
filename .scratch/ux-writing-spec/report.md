# Report — `aster-ux-writing-spec.md` applied, 2026-08-21

The three lists the document asks for (§0, "Report at the end"), plus the judgement calls the
grilling in `spec.md` took on the document's behalf. Verified by `npm run build` (clean), a
string-level check of every New string against `src/` (144 must-exist, 91 must-be-gone, 0
problems), and a pass over every route at 1440 and 390 with a clean console.

## 1. Strings listed that were not found — and what was done instead

| Row | What the codebase actually had | Done |
|---|---|---|
| 5.6 Office hours `Building C, ground floor · 9:00 AM–5:00 PM, Monday to Friday` | Not on `#/appointments`. It is the Help office list (`help/data.js` + `HelpRail`), already in the no-space format. | The appointments page's own time range (`timeRange()` in `appointments/logic.js`, `10:30 AM – 11:00 AM`) was the §2.3 violation; normalized to `10:30 AM–11:00 AM`. |
| 5.12 `7 credits under review — not counted` | Code said `… — not counted above`. | Replaced with the document's new string anyway (one dropped word, not a near match). |
| 5.13 `Edward · Aster's enrollment assistant` | Never one string: `name` + `role` in `edward/data.js`, the middot is layout. | `role` → `Aster’s AI assistant`; the hard-coded `aria-label` in `Edward.jsx` too. |
| 5.13 `No longer available — Housing Services replaced it…` | `title` + a `gone` string + a `No longer available —` prefix in `NotificationPanel`. | Title is now the one-line sentence; `gone` is a flag; the `<small>` line is gone. |
| 5.7 `PENDING` | CSS uppercase of `Pending`. | Consolidated per the row (see §3 below). |
| 5.1 `HEALTH & WELLNESS`, `MONEY & AID`; 5.4 kicker; 5.8 kicker; 5.10 `TYPICAL REPLY` | Title-case data uppercased by CSS. | Edited the data. |
| 2.4 `See why` on `#/appointments` | Not a link: a `<small>` inside the whole-row button. | Removed. The row still opens the drawer. |
| 5.1 `Most rewards decrease a little` | File has `Most rewards decrease a little each day.` | Untouched (do-not-change). |
| 6.7 | Nothing reads the browser clock. `PORTAL_TODAY = '2026-08-20'` and `CAMPUS_TODAY` already anchor every relative day; the `daysLeft` integers are literals consistent with it. | Only `opensOn()` changed (`en-GB` → `en-US`: `September 1`). The row is otherwise already satisfied. |
| 5.5 `#/accessibility`, 5.11 its H1 | No route existed. | Created (see §2). |

## 2. Strings changed that were not listed — and why

**The vendor name (5.2 rule, applied wherever Audentra was the actor)**
- `enrollment/data.js` Step 3 occurs **twice** (deposit and loan agreement); both replaced.
- `InfoModal.jsx` ×3 (`Audentra ranks steps…` → `Aster ranks…`; `Audentra can spot…` / `Audentra can show you…` → `The portal can…`), `BookingDrawer.jsx` and `CampusDrawer.jsx` preview disclaimers (`Audentra never…` → `The portal never…`). "The portal" is the document's own word for the software (5.9).
- **Kept, for Marco to decide:** `Powered by Audentra` (sidebar foot) and `Aster University sample experience · Designed with Audentra` (page foot). Vendor attribution in chrome, not the portal speaking to the student; a demo watermark.

**§3.3 narrator, product-wide (§0.8)** — 30 `we/us` strings in 20 files, not two pages. The "We couldn’t load X" family (Sidebar, ClassroomsPage, ClassroomsRail, DocumentsPage, DocumentList, RequestList, NotificationPanel, Catalogue, ProfilePage, ProfileRail, GateNotice, OnboardingPage) became subject-first (`Your sections couldn’t be loaded`). Others: `We read these…` → `Aster read these…`; `Check what we read` → `Check what Aster read`; `We’ll show available advisers…` → `Available advisers appear…`; `We’re here to help.` deleted (rule 6); `We saved your place` → `Aster saved your place`; `Tell us what to call you` → `Tell Aster what to call you`; `We texted a code` → `Aster texted a code`; `we do not know which it is` / `we cannot tell you` → `Aster`/passive. **Kept:** an office's quoted reply text in Help (`help/data.js:208, :252`) and a club's own post (`campus/data.js:322`) — those voices are not the portal's.

**§1.5 channel rule, product-wide (§7.4)** — beyond the three listed surfaces:
- Accessibility yes-answer: `means` (`…and reaches out` dropped), `next` (`They will reach out before term starts…` → `Accessibility Services has your name. Nothing’s pending on you, and they set up anything you agree on before your first classes.`), the success toast body.
- Housing: `Aster will send you the commuter parking…` → `…appears on this page before term starts`; `Housing Services will come back to you` (data ×1, `HousingPage` toast, `PlanOutcome`) → `will help you decide`; `PlanPanel` after-deadline `Housing Services will contact you.` → `This page updates when Housing Services decides.` (the document's own safe form).
- `EnrollmentPage` empty state `We’ll let you know…` → `New steps appear here when Aster adds them.`; Edward `${office} would contact you first` dropped; onboarding `HealthStep` `emails you within two working days` / `will write to you at the address from step 2` → `gets your name…` / `has your name.`; `RequestDrawer` `never only by email` dropped; `FieldRow` `so it will email you until then` dropped.
- **Exempt, reported:** onboarding's notification-preference options (the channel *is* the subject; one stale `in Messages` corrected to `in the portal`), the phone-verification code line, `ContactStep`'s address note.

**§3.2 office names, product-wide** — `Aster Registrar` also in `campus/data.js` (`requiredBy` ×2); `Registrar’s Office` in `classrooms/data.js` (office, note, `decidedOn` ×2 → `by the Registrar`), `AcademicDrawer`, `InfoModal` credit step, `documents/data.js` privacy. `Aster’s Financial Aid office` → `Student Financial Services`.

**§2.1 em dashes** — about 140 prose strings in ~60 files (every non-comment one). **Kept:** the `—` used as a null glyph for a missing figure (Topbar points, rails, ProgressPreview, the new ledger cell — a placeholder, not punctuation), and the two points-system strings the document forbids touching (`Nice work — N Momentum points added.`, `Your deadline never changes—and points never affect admission decisions.`).

**§2.2 more British** — `programme` ×3 → `program`, `organiser` → `organizer`, `licence` → `license`, `Counselling Service` ×2 → `Counseling Service`. **Left:** identifiers (`Catalogue.jsx`, `catalogue` props/keys, `campusOrganisations`, `expandOrganisation`, the `organisation` kind string) — code, not copy; and `cancelled`/`Cancelled`, a valid US variant.

**§2.3 dates** — the formatters every section imports (`campus/logic.js`: `longDate`, `weekdayDate`, `shortDate`; `appointments/logic.js`: `shortWeekdayDate`, `weekdayShort`) now render US order, weekday only inside seven days of the frozen date; `HousingRail` formats the guide date instead of printing ISO. Literals: appointments `bookedOn`/`cancelledOn` ×5, three campus club posts, classrooms `Published by Aster on Aug 12` / `Approved Aug 4` / `Uploaded Aug 6`, housing `Dec 15, 2026`, the two birth dates (`Mar 14, 2008` — onboarding said 2009 and Profile 2008; aligned to the record), onboarding session labels. Time ranges: 45 in campus data, the orientation event, onboarding sessions, the appointments template.

**§2.1 `and`** — `Cost &amp; coverage` → `Cost and coverage`; `Housing & Residential Life` → `and`. `Writing & Rhetoric`, `Arts & Humanities` kept (course names).

**Other** — `You’re all caught up!` → period (1.3). The Smart-order modal line `Quick wins appear…` → `The fastest steps appear…` (the tab was renamed). `I read your own record…` second Edward occurrence. `My Classrooms` → `My Degree` in Profile's "elsewhere" row and Edward's answer; `CONTEXT.md`. `See how` is one source line rendering six cards, not five. Health's preview-state descriptions, and Housing/`preview-state.js` descriptions that mentioned the question or carried dashes.

**§4 glosses that had no row** — *Cost of attendance* as a caption under the row title; *Federal Direct Subsidized Loan* as a caption (`gloss` on the data item, both fixture states); *Federal Work-Study* inline; *Completion pace* / *Attempted credits* rendered as the full sentence with the gloss as a muted continuation (so the row survives 390px); *Verification* in the financials alert consequence and the document's `why` line (`Verification is the check that your reported income matches your tax records.`); *Immunization record* — the Health card's `needs` line already reads `A current immunization record from your doctor or your previous school…`; left as the gloss. The existing `TermTip` tooltips stay beside the inline glosses — the other session owns tooltips this week.

**Shape, not copy** — new data fields `step`, `neededLine`, `dueFull`, `shortAction`, `gloss`, `years`, `campusInterests` (Profile exports, Campus re-exports); `DOCUMENT_STATES.needed.line(office, requirement)`; My Documents badge = `needsYou(...).length`; `features/accessibility/` (page, card moved, rail, data, logic) and `styles/features/accessibility.css` (question block moved whole from `health.css`, captured before/after and diffed: 23/24 elements identical at 1440, the one diff is a shortened sentence; 24/24 at 390); `health/data.js` and `health/AccommodationCard.jsx` deleted; `accessibility` icon; `financials.css` gloss rules; `patterns.css` `.pending` scoped to the three button kinds (a bare `.pending { color: transparent }` from dbca41f was making the pending aid row's title invisible).

## 3. Additional §2 / §6 violations the document did not enumerate

- **6.2 in onboarding too:** the orientation step listed `Friday Aug 28` and `Thursday Sep 3` sessions. Campus event → `2026-08-27`; onboarding commuter day → `Thursday, Aug 27` (same day, so the two sources agree), late session → `Monday, Aug 31`.
- **6.6:** the badge counted *unread decisions* (ENR-158 AC 5) while the page counted *needs you*; now one predicate, and the unread decision still reaches her through the bell.
- **6.7's premise:** already frozen; see §1.
- **§2.3:** every formatter was British-order (`Thursday 3 September`, `3 Sep`), and `bookedOn: '18 August'`-style literals; the birth year disagreed between onboarding and Profile.
- **§2.2:** `programme`, `organiser`, `licence`, `Counselling`.
- **§1.5 / §3.3:** the counts above.
- **Not copy, seen on the way:** `nav.group-tabs` is 392px wide at a 390px viewport on the group pages (My Financials, My Campus Life) — a 1px horizontal overflow that predates this pass and belongs to the shell, not to any string. Reported, not touched. The `.pending` regression above.
- **ENR-208** is labelled `screen-health` and its scenarios say "opens the Health section"; the move to `#/accessibility` is recorded as a divergence in ADR-0003 and `spec.md`.

## 4. Judgement calls, in one place

Footers with the vendor name kept · points copy untouched · `cancelled` kept · onboarding channel preferences kept (stale `Messages` fixed) · the sharing-category line kept as a fragment under "What Renata can see" rather than the document's `Renata can see that…` (the name is dynamic, the sibling lines are fragments) · `TermTip` kept beside inline glosses · contractions applied to every string touched, not swept product-wide (§1.2 governs replacements, §7 lists no sweep for it) · placeholder `—` kept · identifiers in British spelling kept.
