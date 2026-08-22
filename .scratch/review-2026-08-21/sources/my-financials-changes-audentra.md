# My Financials changes (Aster New Student Portal / Audentra)

**Target screen:** `/#/financials/overview`, `/#/financials/aid`, `/#/financials/payments`
**Reference screen:** `/#/my-enrollment`
**Prototype:** audentra-design.vercel.app
**Strings and figures read from the build of 2026-08-21**

---

## 0. Instructions for whoever implements this

### 0.1. The principle that governs this document

**My Enrollment is the portal's reference screen.** Every divergence between screens is resolved in favour of My Enrollment. Where this document specifies a value or a component, it is deriving it from the reference screen.

This applies to form, not to logic. The component is the same; the rule that decides what goes inside it belongs to each screen.

### 0.2. Product rules these items rest on

| # | Rule |
|---|---|
| 1 | This screen is **one screen with three tabs**, not three screens. The banner, the balance card, the advisor and the outstanding-work alert are shared and persist across all three. |
| 2 | A figure that is not final is **never rendered as if it were**, and something unknown is never rendered as zero. |
| 3 | The white card carries an **advisor, a named person**, with the eyebrow "YOUR ... ADVISOR". This screen already conforms: Amara Nwosu · Financial Aid Office. |
| 4 | Money is never charged inside the portal. Payment finishes on Aster's own payment page, and the screen says so before the control. |

### 0.3. How to read the items

Every item states the current behaviour, the problem, the change, and an acceptance criterion. All of them are meant to be implemented. There are no conditional items.

All new copy is in section 6. No placeholders.

### 0.4. Everything ships in English

The product's interface language is English. Every string in section 6 is final English copy and goes to the screen as written. Do not translate, localise or paraphrase. Class names, tokens and state slugs are literal.

### 0.5. Scope

Desktop, all three tabs. Responsive and mobile layout are out of scope. Two of the six states were inspected, `ready` and `aid-final`. The other four follow the portal's established patterns.

---

## 1. How to load each state

| State | Slug | Preview description |
|---|---|---|
| Aid still pending | `ready` | "The federal loan is not final and two documents still need you." |
| Aid finalized | `aid-final` | "The loan is approved, nothing is outstanding, and progress has a record." |
| No financial file yet | `empty` | "Before Aster opens your financial record." |
| Loading | `loading` | "Before your financial package arrives." |
| Partial data | `partial` | "The package loaded; your schedule and progress did not." |
| Error | `error` | "Your financial information could not be loaded." |

URL pattern: `/?state=<slug>#/financials/overview`, base `https://audentra-design.vercel.app`

---

## 2. What the screen holds today

**Shared across the three tabs:** the banner, a white card with "ESTIMATED REMAINING BALANCE $32,400" marked ESTIMATE and the line "This is an estimate for 2026–27. It can go down, never up.", the advisor block, and a full-width alert for outstanding work.

**Overview.** A cost and coverage table running from cost of attendance down to the estimated remaining balance, then "Documents that need you", "NEXT PAYMENT", and "Still open to you".

**Financial aid.** "Aid by source", each source with who pays it and whether it is repaid, then "Possible additional aid", then an "Academic progress preview" of three checks.

**Payments.** "What Aster bills you, and what it doesn't", splitting $29,160 from $3,240, then the payment schedule of five rows, then the payment control.

---

## 3. What is right and must survive

**R1. Pending is not zero.** "Aid that is still pending is listed above without an amount, and is not subtracted from your balance. It has never been counted as zero." Showing an unknown as a blank rather than a zero, and saying so out loud, is the single most common lie in a financial interface and this screen refuses it.

**R2. The estimate has a direction.** "This is an estimate for 2026–27. It can go down, never up." A promise about which way a number can move is worth more than the number.

**R3. Every source says whether it is repaid.** "Grant · never repaid" against "Loan · you repay it after you leave Aster", next to the amount, plus who is paying it.

**R4. Aster separates what it bills from what the student spends elsewhere.** $29,160 against $3,240, with "Only the amount Aster bills you ever arrives as a bill." Quoting cost of attendance and then billing something else is how students get blindsided, and this screen closes that gap.

**R5. The payment control says nothing is charged here.** "You finish on Aster's secure payment page. Nothing is charged here."

**R6. The academic progress preview refuses to be a decision.** "This is a preview. It isn't Aster's decision. The Financial Aid Office reviews every record individually."

**R7. The advisor is the right person.** Amara Nwosu · Financial Aid Office, which is the office that decides everything on this screen.

---

## 4. Items

### F1. The deposit is inside the plan on one tab and outside it on another

**Current:** Overview reads "Payment 1 of 5" and "$29,160 scheduled across 5 payments this year". Payments reads "You're on the 4-month plan" and lists the enrollment deposit above four installments.

The arithmetic agrees, $500 plus four instalments of $7,165 is $29,160, so the deposit is inside the billed total on both tabs. Only the framing disagrees: one counts five payments, the other names a four-month plan.

**Problem:** the student has to reconcile two descriptions of her own payment obligation. This is the one screen where an unexplained discrepancy costs trust immediately.

**Change:** one framing across both tabs. The plan is four instalments; the deposit is a separate payment that comes before the plan starts, and both tabs say it that way. Copy in 6.2.

**Acceptance:** no tab describes the payment count differently from another.

---

### F2. The same outstanding task is stated four times

**Current, in the `ready` state:** the shared alert says "Verify your household income · due in 13 days" with an explanation and a "Verify income" button, on all three tabs. Overview repeats it under "Documents that need you". The Financial aid tab repeats it as the action on the pending loan row. The task also lives on the enrollment checklist with its own due date and points.

**Problem:** four statements of one task, three of them within a single screen. The persistent alert already carries it everywhere; the repeats add nothing and push the tab content further down.

**Change:**

1. The shared alert stays. It is the right place, because the task blocks something on every tab.
2. "Documents that need you" on Overview keeps only what the alert is not currently naming. When there is one outstanding document it is the alert's, and the block does not render.
3. The pending loan row on the Financial aid tab keeps its explanation, "waiting on your income verification", and loses the button. The row states the dependency; the alert offers the action.

**Acceptance:** an outstanding task carries exactly one action control per screen.

---

### F3. One number, three names

**Current:** the same $32,400 appears as "ESTIMATED REMAINING BALANCE" in the shared card, as "Still to cover, before your pending loan" in the Overview figures, and as "Estimated remaining balance" in the table. In `aid-final` the middle one becomes "Still to cover", losing the qualifier.

**Problem:** three labels for one figure, and one of them adds a condition the others do not. A student reading the card and then the table cannot tell whether she is looking at the same number.

**Change:** one label everywhere, "Estimated remaining balance". The pending-loan qualifier moves to the note that already exists under the table, which is where the pending rule is explained. Copy in 6.1.

**Acceptance:** the figure carries the same label in every place it appears, on every tab, in every state.

---

### F4. "Possible additional aid" is rendered twice, identically

**Current:** the same block, with the same two options and the same "Nothing here is awarded yet, so none of it is subtracted from your balance. Together they could reduce it by up to $4,900.", appears on Overview and on Financial aid.

**Change:** it lives on Financial aid, which is the tab about where money comes from. Overview keeps one line in the coverage table, "Possible additional aid · up to $4,900", which it already has, with a link to the tab.

**Acceptance:** the block renders on one tab.

---

### F5. Scheduled instalments are estimates and are not marked as such

**Current:** each instalment row reads "SCHEDULED" with an exact figure, and a line beneath the schedule says instalments "are an estimate and are recalculated if your aid changes".

**Problem:** the marker is on the block and the figure is on the row. Everywhere else on this screen an estimated figure carries the ESTIMATE marker next to it, including the balance in the shared card. The rows are the exception, and they are the figures the student will write into her own budget.

**Change:** instalment rows carry the same ESTIMATE marker the balance uses. The deposit does not, because it is fixed.

**Acceptance:** every figure on the screen that can change carries the same marker, and no figure that cannot change carries it.

---

### F6. The academic progress preview is three rows of dashes

**Current:** three checks, each reading NOT STARTED YET with an em dash for the value, against a minimum. Above them: "You have not started classes yet, so there is nothing to check."

**Problem:** the sentence above already says everything the three rows say. The rows spend a block of the tab rendering the absence of data three times, in a table shaped like a report.

**Change:** before the first check, the block is the sentence, the date of the first check, and the three rules stated in one line each without value columns. The table appears when there is something in it.

**Acceptance:** no table renders with every value empty.

---

### F7. The screen has no primary action band

**Current:** the reference screen has a band above its list. This screen has a persistent alert, which is close but is not the same component and does not follow the same rule.

**Change:** the shared alert becomes the band component from the reference screen, in the same position, with this screen's rule:

1. If a document is outstanding, the band names the nearest one by due date and its action.
2. If nothing is outstanding and a payment is due, the band names the payment and the action is `Make a payment`.
3. If nothing is outstanding and no payment is due, the band does not render.

In `aid-final` nothing is outstanding, so case 2 or 3 applies, which is what that state already does by dropping the alert.

**Acceptance:** the band uses the same component as the reference screen and never renders empty.

---

### F8. "Compare residences" is the only action inside a table of numbers

**Current:** the Housing and Meals rows of the cost table carry a "Compare residences" link. Both rows also carry an assumption, "Assumes a standard double room" and "Assumes the full meal plan".

**Problem:** the idea is right, these are the two costs the student can still change, and it is worth saying. But the link reads as navigation dropped into a ledger, and the assumption underneath it is what actually matters: these two figures are conditional on a choice she has not finalised.

**Change:** the two rows are marked as conditional in the same way the estimated rows are marked ESTIMATE, and the link is named for what it changes rather than for where it goes. Copy in 6.1.

**Acceptance:** every conditional figure in the table is marked, and any link out of the table names the effect rather than the destination.

---

### F9. Documents on this screen and tasks on the checklist are the same work in two shapes

**Current:** "Verify your household income" and "Sign your federal loan agreement" appear here with an office and a due date, and on My Enrollment with a due date, a time estimate, points and a different action label.

**Problem:** two records of one obligation, with different metadata on each. A student who completes one has no way to know the other is the same thing.

**Change:** this screen states that these are checklist items and shows the same due date and the same action label the checklist uses. It does not repeat the points or the time estimate, which belong to the checklist's own mechanic.

**Acceptance:** a task's due date and action label are identical on both screens.

---

### F10. The tab content starts below the fold

**Current:** the banner, the balance card, the advisor and the alert all sit above the tabs, so every tab opens with its first content pushed down.

**Change:** the space comes from F2 and F4, which remove repeated blocks, and from F7, which turns the alert into the band component. Do not resize the banner or the card; both are shared components.

**Acceptance:** on any tab, the first block of that tab's own content is visible without scrolling, at a 1440x900 viewport.

---

### F11. Two sizes on this screen are not in the type scale

**Measured on Overview, against the reference screen measured in the same session.**

| Element | My Enrollment | My Financials | Conforms |
|---|---|---|---|
| H1 | 34px / 700 | 34px / 700 | yes |
| Section title, `H2` | 17px / 600 | 17px / 600 | yes |
| Row title, actionable, `H3` | 17px / 400 | **12.5px / 400** | no, see F12 |
| Row title, not actionable, `H3` | 12.5px / 400 | 12.5px / 400 | yes |
| "2 more ways to lower this", `H3` | — | **15px / 400** | no, off scale |
| Tab labels | 13.5px / 600 in the sidebar nav | 13.5px / 600 | yes, this is the navigation step |
| Cost of attendance figure | — | **13.5px / 600** | no, a figure at the navigation step |
| Section eyebrow "Still open to you" | — | 8.5px / 700 | see F13 |

**Problem:** the `--fs-*` scale is 34, 27, 21, 17, 12.5, 11.5, 10.5, 9.5 and 8.5. Two further values exist in the product outside that list: **13.5px, which is the navigation step**, used by every item in the sidebar and by these tabs, and **15px, which is the sidebar brand line** and appears nowhere else by design.

The tab labels at 13.5px are therefore correct: the tabs are navigation. The two defects are the cost-of-attendance figure rendering at the navigation step, and a section title rendering at the brand size.

**Change:** the section title goes to `--fs-h`. The figure goes to the display step, see F13.

**Acceptance:** 13.5px appears only on navigation, 15px only on the brand line, and no figure or heading uses either.

---

### F12. Actionable documents are rendered at the demoted tier

**Current:** the two rows under "Documents that need you", each with an office, a due date, a countdown and an "Open it" button, render at 12.5px weight 400.

**On the reference screen:** 12.5px is what "Aster is reviewing" and "Coming up later" use, for things the student cannot act on. Rows she can act on are 17px.

**Problem:** the screen uses the tier that means "not your move" for the two things on it that most are. These are the items blocking her federal loan.

**Change:** the two rows take `--fs-h` at weight 400, the same as an actionable row on the reference screen.

**Acceptance:** no row with a due date and an action renders at the demoted tier.

---

### F13. The figure hierarchy is inverted

**Current, measured:**

| Figure | What it is | Size |
|---|---|---|
| $500 | the enrollment deposit | 27px / 700 |
| $66,000 | cost of attendance | 13.5px / 600 |
| $33,600 | aid accepted | 12.5px / 600 |
| $32,400 | still to cover | 12.5px / 600 |

**Problem:** the two figures that summarise the whole tab, what covers the year and what is left, are rendered at body size. The largest type on the tab belongs to $500, which is the smallest amount on the screen and the one that changes least. A number sixty-five times larger is rendered half the size.

The screen already has a display treatment for the number that matters: the shared card renders the balance at that scale. Inside the tab, the same figure drops to body text while a deposit takes the display slot.

**Change:** the coverage figures take the card-figure treatment, 21px weight 700, per 9.0. The deposit drops to the level of the other payment figures, since the payment schedule is where a payment belongs. `--fs-figure`, 27px, is not used on this screen at all.

**Acceptance:** on any tab, the largest figure is the one the tab is about.

---

### F14. A section eyebrow is set at footer size

**Current:** "Still open to you" renders at 8.5px weight 700, which is `--fs-micro`, the step used for the footer links and drawer footnotes.

**Change:** section eyebrows take `--fs-small` with `--ls-caps`, matching the eyebrow treatment on the reference screen.

**Acceptance:** no section label renders at `--fs-micro`.

---

### F15. Accordion conformance

| Element | Collapses | Initial state |
|---|---|---|
| Cost and coverage table | no | always open |
| Aid by source | no | always open |
| Payment schedule | no | always open |
| Academic progress preview | no | always open |
| Tabs | not an accordion | Overview by default |

Nothing on this screen collapses. It is a ledger, and a ledger that hides rows is not one.

---

### F16. A note on the reference screen's section weight

**Measured this session:** the reference screen's `H2` renders at 17px weight **600**, not 400. My Financials already matches it.

This matters beyond this screen. The documents for Appointments, My Degree, Health and Housing all state that section titles are 17px weight 400, which was correct when each was measured and is no longer. **Whoever implements those four should take 17px weight 600 as the section-title value and 17px weight 400 as the row-title value.** The rule those documents describe, that a row title is never heavier than the section title above it, is unaffected and still holds; only the section number changed.

---

---

## 5. Findings per state

**E1. `aid-final` is handled correctly.** The balance drops to $28,400, a third figure appears, "$500 You've paid", the alert disappears because nothing is outstanding, and the estimate line changes to "Your package is final. This can still change if your housing or meal plan does." Changing the caveat rather than dropping it is the right call.

**E2. The arithmetic holds in `ready`.** $66,000 minus $33,600 is $32,400; $29,160 plus $3,240 is $32,400; $500 plus four instalments of $7,165 is $29,160. Every total on the screen reconciles.

**E3. `empty`, `loading`, `partial` and `error` were not inspected.** They follow the portal's established patterns on the other screens.

---

## 6. Copy

### 6.1. Shared card and cost table

| Element | Today | New |
|---|---|---|
| Card label | "ESTIMATED REMAINING BALANCE" | unchanged |
| Overview figure label | "Still to cover, before your pending loan" | "Estimated remaining balance" |
| Overview figure label, `aid-final` | "Still to cover" | "Estimated remaining balance" |
| Table row label | "Estimated remaining balance" | unchanged |
| Pending qualifier | inside the figure label | moves to the existing note: "Your pending loan is not subtracted from this. Aid that is still pending is listed above without an amount, and has never been counted as zero." |
| Housing row marker | none | "IF YOU KEEP THIS PLAN" |
| Meals row marker | none | "IF YOU KEEP THIS PLAN" |
| Housing and Meals link | "Compare residences" | "See what a different room costs" and "See what a different plan costs" |

### 6.2. Payments

| Element | Today | New |
|---|---|---|
| Overview payment line | "Payment 1 of 5" | "Your deposit, before the plan starts" |
| Overview schedule line | "$29,160 scheduled across 5 payments this year. Each one is an estimate and is recalculated if your aid changes." | "$29,160 this year: your $500 deposit, then four instalments. The instalments are estimates and are recalculated if your aid changes." |
| Payments plan line | "You're on the 4-month plan" | unchanged |
| Instalment row marker | "SCHEDULED" | "SCHEDULED · ESTIMATE" |
| Deposit row marker | "DUE NEXT" | unchanged |

### 6.3. Financial aid tab

| Element | Today | New |
|---|---|---|
| Pending loan row action | "Verify income" | removed, see F2 |
| Pending loan row line | "Pending · waiting on your income verification" | unchanged |
| Progress preview, before any term | three rows of "NOT STARTED YET" and "—" | one line each, no value column: "Grade point average, minimum 2.0", "Completion pace, minimum 67% of the credits you start", "Attempted credits, maximum 180" |
| Progress preview lead | "Aster checks three things at the end of each term to keep your aid. You have not started classes yet, so there is nothing to check." | unchanged |
| Progress preview disclaimer | "This is a preview. It isn't Aster's decision. The Financial Aid Office reviews every record individually." | unchanged |

### 6.4. Primary action band, see F7

| Case | Band label | Button |
|---|---|---|
| A document is outstanding | "Your federal loan is waiting on this · due in 13 days" | "Verify income" |
| A payment is due and nothing is outstanding | "Your enrollment deposit is due Nov 16" | "Make a payment" |

### 6.5. Copy that is removed

| Where | Text | Why |
|---|---|---|
| Overview | the "Documents that need you" block, when the only document is the one in the band | F2 |
| Overview | the "Possible additional aid" block, in full | F4, it stays as one row in the table with a link to the Financial aid tab |
| Financial aid | the "Verify income" button on the pending loan row | F2 |

---

## 7. Component and token map

| Item | Element | Use |
|---|---|---|
| F5, F8 | ESTIMATE and conditional markers | the same marker treatment the balance card already uses |
| F7 | band | the same band component as My Enrollment |
| F9 | task rows | the same due-date and action-label source the checklist uses |
| F11 | off-scale sizes | `--fs-h` for the section title and the tab labels, `--fs-body` for the figure |
| F12 | actionable row titles | `--fs-h`, weight 400 |
| F13 | coverage figures | `--fs-figure`, the step the deposit uses today |
| F14 | section eyebrows | `--fs-small` with `--ls-caps` |

### 7.1. What is an accordion and what is not

Nothing on this screen collapses. The tabs are tabs, not disclosure.

---

## 8. Execution order

| Step | Items | Why |
|---|---|---|
| 1 | F3, F1 | settle what each figure is called and how many payments there are, before anything is built on them |
| 2 | F5, F8 | mark every figure that can change |
| 3 | F2, F4 | remove the repeats |
| 4 | F9 | reconcile with the checklist |
| 5 | F6 | the progress preview |
| 6 | F7 | the band, which replaces the alert removed in step 3 |
| 7 | F10 | the fold, which only improves after steps 3 and 6 |
| 8 | F11, F12, F13, F14, F15 | hierarchy, last, once every block carries its final content |

---

## 9. Changes to other screens

This section is not about My Financials. It collects the typographic audit of the other four screens, measured in the same session, so the results live in the open document instead of being written into closed ones.

**The reference values, measured on `/#/my-enrollment` in this session:**

| Level | Value |
|---|---|
| Page title, `H1` | 34px / 700 |
| Section title, `H2` | 17px / **600** |
| Row title, actionable, `H3` | 17px / 400 |
| Row title, not actionable, `H3` | 12.5px / 400 |
| Navigation | 13.5px / 600 |
| Sidebar brand line | 15px / 700, and nowhere else |

**Figures are the level that does not match anywhere.** Titles conform across all five screens. Figures do not, and there was no rule written for them until now. See 9.0.

**The section-title weight changed.** Every earlier document in this series states 17px weight 400 for a section title, which was correct when each was measured. It is 600 now. Take 600 as the section value and 400 as the row value. The rule those documents describe, that a row title is never heavier than the section above it, is unaffected.

### 9.0. The figure rule, which no document has stated

**What the reference screen does.** It uses exactly two figure treatments, and one figure per card.

| Treatment | Value | Where |
|---|---|---|
| Card figure | 21px / 700 | "5 of 14 steps complete", the lead figure of the white card |
| Dark card lead | 17px / 700 | "372 pts to one late fee waived" |

One figure per card, and nothing else in the card competes with it.

**What the five screens do today:**

| Screen | Lead figure | Conforms |
|---|---|---|
| My Enrollment | 21px / 700 | reference |
| Health | 21px / 700, "5 business days" | yes |
| My Degree | 13.5px / 750, the ring percentage | no, at the navigation step |
| Housing | 13.5px / 700, the residence prices | no, and no figure leads |
| My Financials | 12.5px / 600 on the coverage figures, 27px / 700 on the deposit | no, and inverted |

**The rule, for every screen in the portal:**

1. **Two treatments only.** A card's lead figure is `--fs-display`, 21px, weight 700. A dark card's lead line is 17px weight 700. Nothing else in the portal renders a figure at display weight.
2. **One lead figure per card.** A card that shows three numbers picks the one the card is about; the rest are body text.
3. **The lead figure is the largest number in its card.** If a smaller amount is rendered larger, the treatment is wrong, not the number.
4. **`--fs-figure`, 27px, is not a figure step.** It is currently used by the "24" on Appointments, which item C1 of that document removes, and by the deposit on My Financials, which item F13 of this one moves. After both, nothing uses it.
5. **Navigation and brand steps are never figures.** 13.5px belongs to the sidebar and the tabs, 15px to the brand line, and neither carries a number anywhere.

**Applied per screen:**

| Screen | Change |
|---|---|
| My Enrollment | none |
| Health | none |
| My Degree | the ring percentage goes to 21px / 700, see 9.2 |
| Housing | prices go to `--fs-body`; no figure leads on that screen and none should, because the card there is a catalog row, not a summary |
| My Financials | the coverage figures go to 21px / 700 and the deposit drops out of the display step, see F13 |

**Acceptance:** across the portal, exactly two figure treatments exist, no card has two lead figures, and no lead figure is smaller than another number in the same card.

---

### 9.1. Appointments: typography now conforms

**Measured:** `H1` 34/700, section titles "Book a conversation", "Your conversations" and "Past and cancelled" all `H2` 17/600, and every row title `H3` 17/400.

**This closes three items in the Appointments document.** T1 asked for row titles to move from `SPAN` 15px/700 to `H3` 17px/400: done. T2 asked for 11.5px to disappear from the row action slot: the rows now carry buttons. The correction recorded in the Health document, which removed the 12.5px demotion of the row without published times, is also reflected: all three rows sit at 17/400.

**Nothing further is needed on that screen's typography.** T4, the eyebrow and title inversion, is a structure item and is unaffected by this.

### 9.2. My Degree: two defects

**Measured:** `H1` 34/700, all three section titles 17/600, all eleven requirement titles `H3` 17/400. That part conforms and matches what D14 asked for.

**Defect 1, the ring percentage renders at the navigation step.** "13%" is 13.5px weight 750. It is the figure inside the progress ring and it is set at the size used for sidebar links. Every other lead figure in the portal sits at 21px or 27px.

**Change:** the ring percentage takes 21px weight 700, which is what the reference screen uses for the figure in the same card, and what 9.0 sets as the only card-figure treatment.

**Defect 2, the program name renders at the brand size.** "BA Computer Science" is 15px weight 700. With that card moving into the dark slot, per the Housing document's section 9.1, its lead line has to sit at the dark card's lead treatment, 17px weight 700, which is what the reference screen's dark card uses.

**Acceptance:** no figure or heading on My Degree renders at 13.5px or 15px.

### 9.3. Health: one defect and one gap

**Measured:** `H1` 34/700, "Immunization record" `H2` 17/600. The rail figure "5 business days" is 21px/700, correct. The office name is 10.5px/600, matching the metadata step.

**Defect, the accessibility block title is a row title in bold body size.** "Accessibility" renders as a `STRONG` at 12.5px weight 700. It is the title of one of the two things on the screen, and it sits two steps below the immunization block's title while being heavier than it.

This is the same inversion the other documents remove: the child outweighs the parent, at a smaller size.

**Change:** "Accessibility" becomes an `H2` at 17px weight 600, matching "Immunization record". The two blocks are peers and the screen's whole point, per item H4 of the Health document, is that it carries two things.

**Gap, the record status renders at footer size.** "Not sent yet" is 8.5px weight 600, which is `--fs-micro`, the step used for footer links. It is the status of the item that blocks class registration.

**Change:** status pills take `--fs-small`, 9.5px, matching the status treatment on the other screens.

**Acceptance:** the two blocks on Health carry the same title treatment, and no status renders at `--fs-micro`.

### 9.4. Housing: the residence cards are off the scale

**Measured:** `H1` 34/700, and all three section titles, "Where will you live?", "Rank the residences you would like" and "Residences", at `H2` 17/600. That part conforms.

**Defect 1, residence names render at the brand size.** "Coyne House", "Alcott House", "Dunmore Court" and the rest are 15px weight 700, and one of them, "Fairholt House", is 15px weight 600, so the catalog is not even internally consistent.

**Change:** residence names become `H3` at `--fs-h`, weight 400, the same as any other row title in the portal. This also fixes the inversion: at 700 they currently outweigh the section title above them.

**Defect 2, the monograms render at the navigation step.** "CH", "AH", "DC", "FH", "BH" are 13.5px weight 750. This resolves itself when item G1 of the Housing document replaces them with published images, and the monogram survives only as a fallback. In that fallback the monogram takes the same step the residence name takes.

**Defect 3, prices render at the navigation step.** "from $9,800" and the other prices are 13.5px weight 700. Price is the second thing a student reads on a housing card.

**Change:** prices take `--fs-body`, 12.5px, the step used for figures inside a row elsewhere in the portal. No figure on that screen takes the lead treatment, per 9.0: a residence card is a catalog row, not a summary.

**Defect 4, a callout renders at the navigation step.** "A preference is not an assignment." is 13.5px weight 700. It is the most important sentence on the screen and it is set at the size of a sidebar link, in bold, which reads as emphasis without hierarchy.

**Change:** it takes `--fs-h` at weight 400, the step for a statement that leads a block.

**Acceptance:** 13.5px and 15px appear nowhere in the Housing content column.

