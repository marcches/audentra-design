Jira: ENR-166
Status: ready-for-human
Labels: design, persona-student, screen-my-financials, wave-w2
Jam: none yet

> Jira status is `Development`, which the triage table in `docs/agents/triage-labels.md` does not
> carry. `ready-for-human` is the nearest role: the screen is built and machine-verified, and what is
> left is a pair of eyes on it. Jira stays authoritative.

# My Financials — what the year costs, what is covering it, and what is still mine to do

## 1. What this screen answers

**What do I still owe, and is anything about to affect my aid?** —
[ENR-147](https://audentra.atlassian.net/browse/ENR-147). Behaviour from
[ENR-159](https://audentra.atlassian.net/browse/ENR-159) (cost, aid, payments and balance in one
view) and [ENR-160](https://audentra.atlassian.net/browse/ENR-160) (which financial documents still
need me).

## 2. Where it lives

[ENR-180](https://audentra.atlassian.net/browse/ENR-180)'s information architecture makes **My
Financials a group of three pages**, not one destination. This card builds all three:

| Route | Page | Holds |
| --- | --- | --- |
| `#/financials/overview` | Overview | The five figures together, the coverage bar, the outstanding documents, the rail |
| `#/financials/aid` | Financial aid | Aid itemised by source, possible additional aid, the academic progress preview |
| `#/financials/payments` | Payments | Bill versus not-a-bill, the plan, the schedule |

**The tension, and how it was resolved.** ENR-159 AC 1 requires cost, accepted aid, payments and
deposits, possible additional aid and the estimated remaining balance to be shown **together**. A
three-way split would break that. So Overview carries all five as one ledger, each row linking to the
leaf that details it. The acceptance criterion holds and the IA holds; neither was traded away.

Each page carries `SectionTabs`, so the three are reachable from one another while the sidebar is
still the flat list ENR-167 shipped.

## 3. The page pattern

My Financials fills the same skeleton My Enrollment does, through
[ENR-180](https://audentra.atlassian.net/browse/ENR-180)'s `PageShell` and the shared classes.

| Region | My Enrollment | My Financials · Overview |
| --- | --- | --- |
| Head | `.welcome-panel` hero | `PageShell` standard head |
| Summary strip | `.progress-summary` — ring, `5 of 14 steps` | `.balance-summary` — figure, estimate chip, caveat |
| Strip, right | `.advisor-bar` — Tomás Okafor, Admissions | `.advisor-bar` — **Amara Nwosu, Student Financial Services** |
| `.page-grid` main | task list, in review, coming up, completed | alert strip, ledger, documents |
| `.insight-column` top (dark) | `.momentum-card` | `.next-payment-card` |
| `.insight-column` bottom (light) | `.skipped-card` | `.aid-opportunity-card` |

Aid and Payments carry `.balance-mini` instead of the full strip — the number a student came for is
never more than a glance away, and never stated twice in two different ways — and close with the
advisor bar, where doubt peaks.

## 4. The figures

Every one is derived in `src/lib/money.js`. Nothing is typed twice.

```
Cost of attendance                                   66,000
   of which Aster bills directly                     62,760   (tuition, fees, housing, meals)
   of which you spend elsewhere                       3,240   (books, personal, travel)

Accepted aid                                       − 33,600   Aster Grant 28,000 + Pell 5,600
Federal Direct Subsidized Loan                      Pending   blocked by income verification
Payments and deposits                        None recorded    the deposit is still an open task

Estimated remaining balance                          32,400   = 66,000 − 33,600 − 0
   Aster bills you for                               29,160
   you spend elsewhere                                3,240

Payment schedule total                               29,160   = 62,760 billed − 33,600 aid
   Nov 16  Enrollment deposit                           500   due
   Jan–Apr 5  Installments 1–4                    4 × 7,165
```

Invariants, checked by script against both snapshots:

- `balance = cost − accepted aid − recorded payments`
- `balance = billed remaining + spent elsewhere`
- `schedule total = what Aster bills − accepted aid`
- coverage segments sum to cost; no pending award carries an amount; every pending award names its
  blocker

**The deposit is deliberately unpaid.** The enrollment deposit is still an open task on My
Enrollment, so the ledger cannot show it as received. `Payments and deposits` reads *None recorded
yet* rather than `$0` — factually settled, unlike a pending award, and the two are treated
differently on purpose. The rail's next payment is therefore the $500 deposit, due Nov 16, the same
date and figure the checklist shows.

In the `aid-final` state the loan lands at 3,500 and the deposit is received: balance 28,400, billed
remaining 25,160, installments 4 × 6,290.

## 5. States

Six, from the `Concept preview` control in the topbar, using
[ENR-180](https://audentra.atlassian.net/browse/ENR-180)'s vocabulary and its `?state=` transport so
a Jam recording can link to the exact state it shows.

| State | What renders |
| --- | --- |
| **Aid still pending** (`ready`) — *default* | Everything in §4. Loan pending, two documents outstanding, one escalated, academic progress not started. |
| Aid finalized (`aid-final`) | Loan approved, deposit received, no documents outstanding (`StateCard`), academic progress **populated** — GPA 3.42 of 2.0, pace 88% of 67%, credits 31 of 180. |
| Partial data | Ledger and documents render. The schedule and the progress panel each fail on their own with `Try again`. A panel failing is not a page failing. |
| Loading | The frame's `PageSkeleton`. |
| No financial file yet | Balance reads `Not available yet`; one `StateCard` explains the file opens once the deposit is recorded. Rail hides. |
| Error | The frame's `PageError`, with `Try again`. |

Rules that hold in every state:

- No figure renders as `0` or `—` when the value is *not yet known*. It renders `Pending` or
  `Not available yet`, with the reason.
- Every derived figure carries `Estimate` or its own tooltip. A settled figure carries neither.
- A panel that cannot load keeps its heading. The frame stays, the contents change.

## 6. Interactions

| Control | Does | Never |
| --- | --- | --- |
| `TermTip` | Bubble opens on hover and on keyboard focus; on touch the control is a button and a tap opens the same bubble. `Esc` or blur closes it. Overlays, never pushes. | Leaves a word unexplained on a small screen |
| `Open it` — alert strip, document row, pending aid row | Opens the existing `TaskDrawer` for that task, routing to My Enrollment first when needed | Forks the drawer or its copy |
| `Make a payment` | Toast: *Aster's secure payment page would open here — nothing is sent yet* | Collects a card number |
| `Change plan` | Toast naming the surface that owns it | Changes a plan |
| `What academic progress means` | `InfoModal` variant `progress` | Reports a standing |
| Section tabs | Route within the group | Leave the wrong tab lit |

## 7. What was added to the design system

Tokens only, no dependency, no framework, no icon package.

**Semantic colour rule**, written down because this is the screen that forces it:

| Meaning | Token |
| --- | --- |
| Estimate — not settled, but nobody must act | `--muted` on `--canvas` |
| Pending — someone must act | `--amber` / `--amber-soft` |
| Covered, received, paid | `--green` / `--green-soft` |
| Inside the escalation window, or a panel failed | `--crimson` |
| Brand and interactive | `--purple` family |

An estimate is deliberately **not** amber. Tints that had no token are `color-mix()` over the
tokens rather than new hex.

New icons: `receipt`, `chart` (24×24, stroke 1.9). `alert`, `refresh`, `award`, `card` were already
added by ENR-180 and are reused.

New files:

```
src/lib/money.js                      every figure on the screen
src/pages/FinancialsOverview.jsx
src/pages/FinancialsAid.jsx
src/pages/FinancialsPayments.jsx
src/components/financials/            TermTip, SectionTabs, AlertStrip, BalanceStrip, BalanceMini,
                                      CoverageBar, CostCard, AidSources, DocumentList, ScheduleList,
                                      ProgressPreview, NextPaymentCard, AidOpportunityCard
```

Changed elsewhere: `data.js` (financial data, two new requirements, `PORTAL_TODAY`), `AdvisorBar`
(takes an `advisor` prop, defaulting to the enrollment advisor — existing calls unchanged),
`preview-state.js` (`FINANCIALS_STATES`), `InfoModal` (`progress` variant), `App.jsx` (three page
slots), `navigation.js` (the three financials destinations), `app.css` (one appended section).

## 8. Data

Reconciliation is structural, not clerical.

- `TOTAL_STEPS` `12 → 14`, because two requirements joined the checklist. My Enrollment reads
  `5 of 14 steps` (36%) instead of `5 of 12` (42%).
- `income-verification` (Student Financial Services, due Sep 2, 13 days, critical) and
  `loan-agreement` (due Sep 30, 41 days) are ordinary tasks carrying `financial: true`, `office` and
  `consequence`.
- The financial document list is `tasks.filter(t => t.financial)`. The count here and the count on
  the checklist cannot disagree, and finishing one in the drawer finishes it on both screens —
  [ENR-160](https://audentra.atlassian.net/browse/ENR-160) AC 5.
- `PORTAL_TODAY = '2026-08-20'`, matching `CAMPUS_TODAY` in `campus-data.js`. Every task's `daysLeft`
  was rebased from the old 8 August baseline, so the portal counts time one way.
- `financialTerms` holds every tooltip once, so a definition cannot drift between the ledger, the
  schedule and the rail.

## 9. Out of scope

From [ENR-147](https://audentra.atlassian.net/browse/ENR-147): making a payment, awarding or
adjusting aid, determining academic progress standing.

Raised rather than absorbed:

- `sortTasks` is unchanged. *Smart order* still ranks the deposit (88 days out, unlocks 3) above
  income verification (13 days out, unlocks 1), because `unlocks` outranks `daysLeft`. My Financials
  covers that with `.alert-strip`; My Enrollment does not. **A question for the next Jam.**
- The `aid-final` state shows no outstanding documents by overriding the filter rather than by
  completing the tasks. It is a hypothetical preview, not a second source of truth.
- Per-section advisors for the other sections. This card names one for Financials only.

## 10. Decisions taken with the reporter before build

| Question | Decision |
| --- | --- |
| How does a second screen exist? | Conform to ENR-180's contract rather than invent a parallel router. |
| How much of ENR-180 to build? | Only `navigation.js` entries and the page slots. ENR-180 built the frame itself while this card was in flight; its `PageShell`, `PreviewStateMenu` and state primitives are reused, not duplicated. |
| How do document counts reconcile? | The same task objects on both screens, the same drawer. |
| Academic progress with no record? | The honest *not started* state by default; populated behind the switcher. |
| Section order? | Conditional alert strip, then cost, documents, schedule, progress. |
| Default state? | Aid still pending — the state the brief is most afraid of. |
| Who is the advisor here? | A second advisor for Student Financial Services. Named **Amara Nwosu**: `Priya Raman` was already Student Life coordinator in `campus-data.js`, and one person cannot hold two offices. |
| How is a term explained? | Tooltip on hover, chosen by the reporter. Keyboard focus and tap open the same bubble, so the explanation survives the mobile-first requirement. |
| Paying and plans? | External hand-off; the plan is named, not changed. |
| One page or three? | Three, per ENR-180's IA — with the five figures kept together on Overview so ENR-159 AC 1 still holds. |

## 11. Verification

Machine-verified, all passing:

- `npm run build` clean.
- Ledger invariants (§4) checked against both snapshots by script.
- Server-rendered smoke across **4 routes × 6 states = 24 combinations**; every one renders without
  error, and My Enrollment is unchanged.
- Guardrail assertions against the rendered output: the five figures together; the estimate chip and
  its caveat; the pending award named with its reason; **no `$0` anywhere on the page**; aid broken
  down by source with grant-versus-loan stated; 10 term tooltips on Overview alone; the academic year
  stated; the schedule agreeing with the ledger; deadline, office and consequence on each document
  row; the 13-day deadline escalated; the same requirement present on both screens; the
  nothing-outstanding state; the progress panel framed as a preview with **no verdict vocabulary**
  (`satisfactory`, `probation`, `suspended`, `passed`, `failed`, `not eligible`); no card fields
  anywhere; paying handing off.

**Not verified — needs a person.** Layout, spacing, tooltip placement against real content, the three
breakpoints, and a keyboard pass. Both browser profiles on this machine were held by a concurrent
session and the Chrome extension was disconnected, so nothing was seen on screen. This is why the
card is `ready-for-human` rather than done.

## 12. Done when

- [x] Three financials routes exist and render; the other sections stay as ENR-180 left them
- [x] My Enrollment renders as before, at `5 of 14 steps`
- [x] The five figures appear together under a stated academic year — ENR-159 AC 1, 6
- [x] Every estimate says it is one and says what could change it — AC 2
- [x] The pending package renders as `Pending` with a reason and never as a zero — AC 3
- [x] Aid broken down by funding source, each saying whether it is repaid — AC 4
- [x] Every financial term has its explanation beside it — AC 5
- [x] Ledger, schedule and rail agree — AC 7
- [x] Documents show deadline, office and consequence, and open the requirement — ENR-160 AC 1–3
- [x] Nothing outstanding renders a state — AC 4
- [x] The count equals the checklist's, because it is the same list — AC 5
- [x] A deadline inside 14 days is escalated in the strip and on the row — AC 6
- [x] Academic progress reads as a preview, never a verdict
- [x] All six states reachable and correct
- [ ] **Seen on screen** at 1280, 820 and 375, and a keyboard pass on the tooltip, tabs and drawer
