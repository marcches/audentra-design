# Health screen changes (Aster New Student Portal / Audentra)

**Target screen:** `/#/health`
**Reference screen:** `/#/my-enrollment`
**Prototype:** audentra-design.vercel.app
**Strings read from the build of 2026-08-21**

---

## 0. Instructions for whoever implements this

### 0.1. The principle that governs this document

**My Enrollment is the portal's reference screen.** Every divergence between screens is resolved in favour of My Enrollment. Where this document specifies a value or a component, it is deriving it from the reference screen.

This applies to form, not to logic. The component is the same; the rule that decides what goes inside it belongs to each screen. See H6.

### 0.2. Product rules these items rest on

| # | Rule |
|---|---|
| 1 | This screen carries **two things**, an immunization record and an accessibility question. Both are first class. |
| 2 | The white card carries an **advisor, a named person**, with the eyebrow "YOUR ... ADVISOR" naming the domain, the name in bold, and the office as a suffix. Health Services has no advisor role, so this screen shows the enrollment advisor. |
| 3 | The advisor **never routes a health decision**. The record is decided by Health Services and the accessibility question is answered to Accessibility Services. The advisor is portal-wide help, nothing else. |
| 4 | **Nothing on this screen ever asks what the student's condition is**, and nothing on it stores one. |

### 0.3. How to read the items

Every item states the current behaviour, the reference on the guide screen, the problem, the change, and an acceptance criterion. All of them are meant to be implemented. There are no conditional items in this document.

All new copy is in section 7. No placeholders.

### 0.4. Everything ships in English

The product's interface language is English. Every string in section 7 is final English copy and goes to the screen as written. Do not translate, localise or paraphrase. Class names, tokens and state slugs are literal.

### 0.5. Scope and what was inspected

Desktop. Responsive and mobile layout are out of scope.

Five of the eight states were inspected directly: `ready`, `empty`, `health-returned`, `health-settled`, plus the accessibility panel opened from within them. `send-fails`, `partial`, `loading` and `error` were not opened. Every item below is written to hold across states, and the copy tables cover the states that were seen. Before shipping, run section 5's acceptance criteria against the three that were not.

---

## 1. How to load each state

| State | Slug | Preview description |
|---|---|---|
| Ready | `ready` | "A record still to send." |
| Nothing sent yet | `empty` | "The health step skipped at onboarding: no record, and the question still open." |
| Record came back | `health-returned` | "A record sent back with a reason." |
| Record accepted | `health-settled` | "The record accepted and the accommodation question answered, and the section still shows both." |
| Sending fails | `send-fails` | "The next thing you send, a record, or an answer to the question, doesn't reach Aster." |
| Partial data | `partial` | "Neither the record nor your answer could be read." |
| Loading | `loading` | "Before your health record arrives." |
| Error | `error` | "The section couldn't be loaded at all." |

URL pattern: `/?state=<slug>#/health`, base `https://audentra-design.vercel.app`

---

## 2. What this screen does today

**Banner:** "HEALTH" / "One record, before you can register." / "One record Health Services needs before you can register for classes."

**No card under the banner.** The page goes straight from the banner into content. Every other screen in the portal has a white card there.

**Main column, two blocks:**

1. **Immunization record.** Subtitle "Health Services reviews it and decides.", a status, a deadline line, an encryption line, and one action. In `health-returned` it also carries "What would fix it" with three specific instructions, the reviewer's note, and an attribution with a date. In `health-returned` and `health-settled` it carries "EVERYTHING YOU HAVE SENT" with a file list.
2. **Accessibility.** A single collapsed row: title, the line "One question that's yours to answer, or not.", and a control labelled "Open". Expanded, it holds the question, two answer options with the consequence of each, and a line about who sees the answer.

**Right rail, three cards:** "HOW LONG A REVIEW TAKES", "WHO IS ON THE OTHER SIDE", "WHAT COUNTS AS PROOF". All three are about the record. None is about accessibility.

---

## 3. The diagnosis in one sentence

The screen carries two things and is written as though it carries one: the record gets the title, the subtitle, all three rail cards and the only visible action, while the accessibility question, which is the more consequential of the two for the student who needs it, sits behind a one-word control with no indication that anything is waiting on her.

---

## 4. What is right and must survive

Several changes below are constrained by these. **H2 in particular must not be implemented in a way that weakens R1.**

**R1. The accessibility question is the best-written thing in the portal.** It states that it is optional, describes what Accessibility Services actually does in concrete terms, says "It's a conversation, not an application. You don't have to explain anything to start it.", and then states plainly: "Aster isn't asking what your condition is, and this page has nowhere to put it." Each of the two answers carries its own consequence, and the block closes with "Accessibility Services sees this. Your instructors and your advisor don't." Keep every one of those sentences.

**R2. "What would fix it" in `health-returned` is actionable.** Three specific instructions about photographing the page, legible dates, and sending only the page that came back. Then the reviewer's own words, attributed and dated. This is what a returned document should look like everywhere in the portal.

**R3. The encryption line sits with the action, not in a policy page.** "Encrypted, and read only by authorized Health Services staff."

**R4. The rail says the review needs nothing from her.** "That's how long Health Services usually takes to decide. Nothing for you to do while they have it." It removes a whole category of anxiety in one sentence.

**R5. "WHO IS ON THE OTHER SIDE"** names the office, what it handles, where it is and when it is open.

---

## 5. Items

### H1. The screen has no card under the banner

**Current:** the page goes from the banner straight into the record block. Every other screen in the portal has a white card there carrying the state of the thing plus the advisor.

**On the guide:** a progress ring, a lead figure, a support line, and the enrollment advisor block on the right.

**Change:** add the white card, using the same component. Contents:

| Slot | Health screen |
|---|---|
| Figure position | the record's status, as the lead line |
| Support line | the deadline, with days remaining |
| Second line | the state of the accessibility question, see H3 |
| Right side | the enrollment advisor block |

The card replaces nothing. The record block keeps its own status; the card is the summary.

**Acceptance:** in every state, the card is present and states both the record status and the accessibility question status.

---

### H2. The advisor block, and the one thing it must not break

**Current:** there is no advisor on this screen.

**Change:** add the advisor block to the white card, in the same position and with the same component as the reference screen: the uppercase eyebrow "YOUR ENROLLMENT ADVISOR", the name in bold, and the office as a suffix on the same line.

**Why the enrollment advisor and not a health one.** The block always names the advisor for the screen's domain, and Health Services has no advisor role. "Health advisor" is not idiomatic on a US campus, and where it is used it usually means pre-health academic advising, which is advice about applying to medical school. Using it here would name the wrong thing. The enrollment advisor is who covers her, and the scope line below says what for.

**The constraint, and it is not optional.** The accessibility block states "Accessibility Services sees this. Your instructors and your advisor don't." Putting the advisor at the top of the same page can read as though he is part of this. Three rules follow:

1. The advisor block carries a scope line saying what he is for on this screen. Copy in 7.1.
2. Neither the record action nor either accessibility answer routes to the advisor. The record goes to Health Services, the answer goes to Accessibility Services.
3. The sentence "Accessibility Services sees this. Your instructors and your advisor don't." stays exactly as written, and stays inside the accessibility block, where the answer is given.

**Acceptance:** the advisor appears on the screen, and no action anywhere on the screen sends anything about health or accessibility to him.

---

### H3. The accessibility question is invisible until opened

**Current:** a collapsed row with a title, the line "One question that's yours to answer, or not.", and a control labelled "Open". Nothing outside the block says the question exists, that it is unanswered, or what answering costs.

**Problem:** for a student who needs accommodations this is the most consequential thing on the page, and it is presented as an appendix to a vaccine form. The state "NOT ANSWERED YET" lives inside the collapsed block, so a student who does not open it never learns there is anything to answer.

**Change:**
1. The collapsed row carries the answer state on its face, in the same position the record block carries its status.
2. The control is labelled with what it does, not with "Open". Copy in 7.3.
3. The white card from H1 carries the question's state as its second line.
4. The block stays collapsed by default. This is deliberate: opening it by default would put a question about disability on screen for every student without being asked, which is the opposite of what R1 is doing. Signalled, not forced.

**Acceptance:** a student who never expands the block still knows the question exists and whether she has answered it.

---

### H4. The page describes itself as carrying one thing

**Current:** the banner reads "One record, before you can register." and "One record Health Services needs before you can register for classes." The page carries a record and a question.

**Problem:** the framing makes the accessibility question a footnote before the student reaches it, and it contradicts the preview description of the `health-settled` state, which says the section shows both.

**Change:** the banner names both. Copy in 7.1.

**Acceptance:** nothing in the banner or the subtitle implies the page carries a single item.

---

### H5. The rail serves only the record

**Current:** three cards, "HOW LONG A REVIEW TAKES", "WHO IS ON THE OTHER SIDE" and "WHAT COUNTS AS PROOF", all about the immunization record.

**Problem:** half the page has no support in the rail. A student deciding whether to answer the accessibility question has nowhere to learn who Accessibility Services is, where they are, or what happens after she says yes.

**Change:** the rail gains a fourth card for Accessibility Services, in the shape of "WHO IS ON THE OTHER SIDE": the office, what it handles, where it is and when it is open. It renders in every state, because the question exists in every state.

The three existing cards stay as they are and gain a scope line naming the record, so it is clear which of the two things each one is about.

**Acceptance:** every card in the rail states which of the two things it refers to, and both things have support in the rail.

---

### H6. There is no primary action band

**Current:** the reference screen has a primary action band above its list. Health has none.

**Change:** adopt the band component. The rule is this screen's:

1. If the record is in a state that needs her, the band names the state and the button is the record action.
2. If the record needs nothing and the accessibility question is unanswered, the band names the question and the button opens the accessibility block.
3. If the record needs nothing and the question is answered, the band does not render.

**Where each case fires, in the states inspected:**

| State | Case | What appears |
|---|---|---|
| `ready` | 1 | the record has not been sent |
| `empty` | 1 | the record has not been sent |
| `health-returned` | 1 | the record came back and needs another try |
| `health-settled` | 3 | the record is accepted and the question is answered |

**Why case 2 is worded carefully.** The band nudges the question once, when nothing else is outstanding, and names it as optional in the label. It never nudges twice, and it never appears while the record still needs her, because stacking a disability question on top of a registration blocker is the wrong moment.

**Acceptance:** the band never points at the accessibility question while the record needs action, and never renders when both are settled.

---

### H7. `ready` and `empty` render identically

**Current:** the two states are described differently in the preview control, "A record still to send" against "The health step skipped at onboarding: no record, and the question still open", but the rendered page is the same in both, at the same length, with the same status and the same copy.

**Problem:** either the distinction was never designed or the state is redundant. Both are worth fixing, and they are fixed differently.

**Change:** `empty` is the student who skipped the health step during onboarding. It carries that history and `ready` does not. Copy in 7.2, which adds one line to `empty` and leaves `ready` alone.

**Acceptance:** the two states are distinguishable without opening the preview control.

---

### H8. Status vocabulary is mixed

**Current:** across the states inspected the screen uses "Not sent yet", "Blocks class registration", "Changes requested", "· Needs another try", "Accepted", and "NOT ANSWERED YET". Some are states, some are consequences, some are instructions, and they sit side by side in the same slot.

**Change:** separate the two ideas. One pill for the state of the thing, one line for the consequence, always in that order and always in the same place.

| Thing | State pill | Consequence line |
|---|---|---|
| Record, not sent | "NOT SENT" | "Blocks class registration" |
| Record, under review | "IN REVIEW" | "Nothing for you to do while they have it" |
| Record, returned | "CAME BACK" | "Blocks class registration" |
| Record, accepted | "ACCEPTED" | none |
| Question, unanswered | "NOT ANSWERED" | "Optional. Nothing happens until you answer." |
| Question, answered | "ANSWERED" | none |

"· Needs another try" is removed; it duplicates the pill.

**Acceptance:** no slot mixes a state and a consequence, and every state pill comes from the table above.

---

### H9. The file list does not mark which file came back

**Current:** in `health-returned` the reviewer's note explains in prose that the second photograph is the problem and that the first page is already on the record, and the instructions say "Send only the page that came back; the one that was accepted stays where it is." The file list then shows both files under one shared line, "Sent Aug 11 · came back Aug 16".

**Problem:** the student is told to send only one page and then shown two files with a single shared status. The distinction exists in the prose and not in the list, which is where she will look when choosing what to replace.

**Change:** each file row carries its own state and its own date, and the row that came back carries the replace action. Copy in 7.4.

**Acceptance:** in `health-returned`, the file that came back is identifiable without reading the note.

---

### H10. The deadline carries no urgency

**Current:** "Health Services asks for it by Aug 28, 2026", as plain text, in every state where the record is outstanding.

**On the guide:** deadlines read "Due Nov 16 · 88 days", with the remaining time next to the date.

**Change:** the deadline follows the guide's format, date plus days remaining, and appears in the white card as well as in the record block.

**Acceptance:** the deadline states days remaining wherever it appears.

---

### H11. "Open" does not say what it opens

**Current:** the accessibility block's control is labelled "Open".

**Problem:** it names the mechanism, not the content. It is also the only control on the screen that does, since the record's action reads "Send your immunization record".

**Change:** the label names the thing. Copy in 7.3.

---

### H12. Accordion and hierarchy conformance

**Current:** the accessibility block collapses. Nothing else on the screen does. The portal's accordion pattern lives on the My Degree screen.

**Change:**

| Element | Collapses | Initial state |
|---|---|---|
| Immunization record block | no | always open |
| Accessibility block | yes | closed, see H3 |
| "EVERYTHING YOU HAVE SENT" | yes | closed when the record is accepted, open when it came back |
| Rail cards | no | always open |

Reuse the existing mechanism: the header as a full-width `button` following `.requirement-head`, an `open` class on the container, the chevron following `.requirement-chevron` with `transition: transform .2s` and `rotate(180deg)`, and `border-top: 1px solid var(--line)` on the body. `aria-expanded` on the header, `aria-controls` on the body, Enter and Space toggle.

**Typography:** apply the same rule the other screens are getting. Block titles are `H3` at `--fs-h`, weight 400, never bold, and never smaller than the section title above them. If this screen already conforms, no change is needed; the acceptance criterion is what matters.

**Acceptance:** no title on the screen is bolder than weight 400 or smaller than its parent, and every collapsible block states what it holds while collapsed.

---

## 6. Findings per state

**E1. `health-returned` is the best state on the screen.** It says what happened, what would fix it, in the reviewer's own words, attributed and dated. It is the model the rest of the portal should follow for a returned document.

**E2. `health-settled` keeps both things visible.** The record shows "Accepted Aug 16 by Aster University Health Services. Your record is clear and nothing more is needed here." and the accessibility block is still there. Resolved is not the same as gone, and the screen gets that right.

**E3. `ready` and `empty` are indistinguishable.** Basis for H7.

**E4. `send-fails`, `partial`, `loading` and `error` were not inspected.** The other screens in the portal handle failure well, with an alert that says what was not affected and a "Try again". Verify these four against the acceptance criteria in section 5 rather than assuming.

---

## 7. Copy

Left column is what is on screen today, right column is what ships.

### 7.1. Banner and white card

| Element | Today | New |
|---|---|---|
| Banner title | "One record, before you can register." | "One record, and one question." |
| Banner subtitle | "One record Health Services needs before you can register for classes." | "Health Services needs your immunization record before you can register. Accessibility Services has a question you can answer whenever you want, or not at all." |
| Card lead line | does not exist | the record state pill plus its consequence, from H8 |
| Card support line | does not exist | "Health Services asks for it by Aug 28 · 7 days" |
| Card second line | does not exist | "Accessibility question: not answered" |
| Advisor block | does not exist | "YOUR ENROLLMENT ADVISOR" as the eyebrow, then "Tomás Okafor · Admissions Office" |
| Advisor scope line | does not exist | "For anything about enrollment. He isn't part of your health record or your accessibility answer." |

### 7.2. Record block

| Element | Today | New |
|---|---|---|
| Title | "Immunization record" | unchanged |
| Subtitle | "Health Services reviews it and decides." | unchanged |
| Deadline | "Health Services asks for it by Aug 28, 2026" | "Health Services asks for it by Aug 28 · 7 days" |
| Encryption line | "Encrypted, and read only by authorized Health Services staff." | unchanged |
| Action | "Send your immunization record" | unchanged |
| History line, `empty` only | does not exist | "You skipped this step while accepting your offer. Nothing was lost, and it's still here." |
| "What would fix it" | unchanged | unchanged |
| Reviewer note and attribution | unchanged | unchanged |

### 7.3. Accessibility block

| Element | Today | New |
|---|---|---|
| Title | "Accessibility" | unchanged |
| Subtitle | "One question that's yours to answer, or not." | unchanged |
| State on the collapsed row | does not exist | "NOT ANSWERED" plus "Optional. Nothing happens until you answer." |
| Control | "Open" | "See the question" |
| Control, once answered | "Open" | "See your answer" |
| Everything inside the block | unchanged | **unchanged, see R1** |

### 7.4. File list

| Element | Today | New |
|---|---|---|
| Section title | "EVERYTHING YOU HAVE SENT" | unchanged |
| Shared line, `health-returned` | "Sent Aug 11 · came back Aug 16" | removed, replaced by per-file lines |
| File row, accepted | "immunization_page_1.jpg 2.1 MB" | "immunization_page_1.jpg · 2.1 MB · On your record" |
| File row, returned | "immunization_page_2.jpg 1.9 MB" | "immunization_page_2.jpg · 1.9 MB · Came back Aug 16" |
| Action on the returned row | does not exist | "Replace this page" |
| Shared line, `health-settled` | "Sent Aug 11 · accepted Aug 16" | unchanged |

### 7.5. Primary action band, see H6

| Case | Band label | Button |
|---|---|---|
| Record not sent | "Class registration is waiting on this" | "Send your immunization record" |
| Record came back | "One page came back from Health Services" | "Replace that page" |
| Record settled, question unanswered | "There's one optional question left" | "See the question" |

### 7.6. Right rail

| Element | Today | New |
|---|---|---|
| Card 1 title | "HOW LONG A REVIEW TAKES" | "HOW LONG A RECORD REVIEW TAKES" |
| Card 1 body | "That's how long Health Services usually takes to decide. Nothing for you to do while they have it." | unchanged |
| Card 2 title | "WHO IS ON THE OTHER SIDE" | "WHO REVIEWS YOUR RECORD" |
| Card 2 body | unchanged | unchanged |
| Card 3 title | "WHAT COUNTS AS PROOF" | unchanged |
| Card 3 body | unchanged | unchanged |
| Card 4 title | does not exist | "WHO HANDLES ACCESSIBILITY" |
| Card 4 body | does not exist | "Aster University Accessibility Services. Extra time, note-taking, accessible rooms, flexible attendance. They talk to you first and set up whatever fits." |

Card 4 carries a location and opening hours in the same format as card 2, taken from the same source.

---

## 8. Component and token map

No item creates new styling.

| Item | Element | Use |
|---|---|---|
| H1 | white card | the same card component as the reference screen |
| H2 | advisor block | the same block component the reference screen uses |
| H3 | state on a collapsed row | `.status-pill` |
| H5 | fourth rail card | the same card component as the other three, inside `aside.page-rail` |
| H6 | band | the same band component as My Enrollment |
| H8 | state pills | `.status-pill` |
| H9 | replace action on a file row | `.secondary-button` |
| H11 | accessibility control | `.secondary-button` |
| H12 | accordion | `.requirement-head`, the `open` class, `.requirement-chevron`, and a body with `border-top: 1px solid var(--line)` |

### 8.1. What is an accordion and what is not

| Element | Pattern |
|---|---|
| Accessibility block | **accordion**, closed by default |
| "EVERYTHING YOU HAVE SENT" | **accordion**, open when the record came back, closed when accepted |
| Immunization record block | does not collapse |
| Rail cards | do not collapse |
| "Required immunizations for 2026–27" | the existing link, unchanged |
| Advisor scope line | none, plain text in the card |

---

## 9. Execution order

| Step | Items | Why |
|---|---|---|
| 1 | H4, H8, H11, and the copy in 7.2 and 7.3 | framing and vocabulary, depends on nothing |
| 2 | H7 | make the two states distinguishable before building on top of them |
| 3 | H1 and H2 | the card and the advisor, with the scope line written in the same step, never after |
| 4 | H3 | surface the question's state, which the card from step 3 also carries |
| 5 | H10 | the deadline format, in both places at once |
| 6 | H5 | the fourth rail card |
| 7 | H9 | per-file states |
| 8 | H6 | the band, which points at both things, so both have to be finished first |
| 9 | H12 | accordion and hierarchy, last, once every block carries its final content |

---

## 10. Changes to other screens

This section is not about the Health screen. It collects changes that belong to other screens but were decided here, so they live in one place instead of drifting apart across documents.

**10.1 to 10.4** are about the advisor block, across the portal.
**10.5 to 10.8** are about the Appointments screen and supersede what the Appointments document says.
**10.9 to 10.11** are about the My Degree screen and are additions to the My Degree document, not corrections of it.

### 10.1. The advisor block: the rule

The white card under the banner always carries an advisor block, and the block always names **a person**.

| Slot | Content |
|---|---|
| Eyebrow, uppercase | "YOUR ... ADVISOR", naming the domain of that screen |
| Name | the person, in bold |
| Suffix on the same line | the office they belong to, after a middot |
| Right side | the two contact buttons |

The block names who covers the student. It does not name who decides the thing on the screen. Where those differ, the screen's actions route to the decider and the block stays as it is.

Where a screen's domain has no advisor role, the block falls back to the enrollment advisor and a scope line says what he is for on that screen.

### 10.2. Per screen

| Screen | Eyebrow | Person | Note |
|---|---|---|---|
| My Enrollment | "YOUR ENROLLMENT ADVISOR" | Tomás Okafor · Admissions Office | already in place, no change |
| My Degree | "YOUR ACADEMIC ADVISOR" | the assigned academic advisor | falls back while unassigned, see 10.3 |
| Health | "YOUR ENROLLMENT ADVISOR" | Tomás Okafor · Admissions Office | no health advisor role exists, see H2 |

### 10.3. The My Degree change, in full

**Current on that screen:** the white card carries "YOUR ENROLLMENT ADVISOR / Tomás Okafor · Admissions Office", and each credit match offers "Ask your advisor". The same page states "Office of the Registrar decides" twice and "Your official academic record lives with the Office of the Registrar" in the rail.

**Problem:** the screen names the deciding office three times and then routes a credit question to someone who does not decide it.

**Change, and the two halves are separate:**

1. **The block stays a person and the eyebrow changes** to "YOUR ACADEMIC ADVISOR", because the domain of that screen is academic.
2. **The match action routes to the Registrar's Office.** The second action on each match card changes from "Ask your advisor" to "Ask the Registrar's Office".

**The academic advisor is not assigned yet, and the screen has to say so.** The reference screen carries the future task "Meet your academic adviser", with "Waiting for program assignment" and "Available advisers appear after Aster assigns your academic program." Until that happens there is no academic advisor to name. The block falls back to the enrollment advisor and states why, rather than showing an empty slot or a placeholder name.

| Case | Eyebrow | Body |
|---|---|---|
| Academic advisor assigned | "YOUR ACADEMIC ADVISOR" | the name, with the office as a suffix |
| Not assigned yet | "YOUR ENROLLMENT ADVISOR" | "Tomás Okafor · Admissions Office", plus the line "Your academic advisor is assigned with your program. Tomás covers this until then." |

**Acceptance, both screens:** the block always names a real person, the eyebrow names the domain, no slot is ever empty or filled with a placeholder, and no credit question routes to anyone other than the Registrar's Office.

### 10.4. One screen this rule does not yet cover

The Appointments document specifies removing this block from that screen, on the grounds that Appointments routes by subject across three teams rather than by person. Under 10.1 the block would stay there instead.

The two cannot both be right. This document does not change the Appointments specification; it records the conflict so that whoever implements does not resolve it by guessing.

---

### 10.5. Appointments: the blocked row is over-demoted, and its button is too strong

**This supersedes items T5 and A1 in the Appointments document, and the corresponding rows in that document's section 8.4.** Where the two disagree, this one is correct.

**What was specified there.** T5 demoted a row with no published times to the 12.5px step, deriving that from the way the reference screen treats its "Aster is reviewing" and "Coming up later" sections. A1 and A2 then gave that same row the primary button.

**Why it was wrong.** The reference screen demotes what the student **cannot act on**. A row with no published times is not that: she can ask that office for a time, and she can ask to be told when times open. Two actions is the opposite of not actionable.

**What it looks like implemented.** The row ends up smaller and lighter than its neighbours while carrying the strongest button on the screen, a solid one, where the available rows carry outline buttons. The row whispers and shouts at once, and with the band sitting directly above it, the item meant to be least prominent became the most visible thing in the block.

**Change:**

1. **T5 is removed.** All rows in "Book a conversation" use the same title treatment, `H3` at `--fs-h`, weight 400. A row with no published times is not demoted.
2. **The button weight is inverted from what was specified.** Rows with published times take the solid `.primary-button`, because booking is the screen's main action. The row without times takes the `.secondary-button`, because asking for a time is the fallback.
3. **The secondary link on the row without times stays as specified**, "Tell me when times open".
4. **The band above the row is what signals the situation.** With the row normalised, the band plus the "No times published yet" metadata plus the explanatory sentence already carry it. Nothing else is needed.

**Copy in that document is unaffected.** Only weight, size and button variant change.

**Acceptance:** in the "Book a conversation" list, all three rows share one title treatment, and no row without published times carries a stronger button than a row with them.

---

### 10.6. Appointments: "How booking works" appears three times

**This supersedes the header link specified in the Appointments document's items T4 and 8.3.**

**What was specified there.** T4 added a "How booking works" link in the section header, in the position the reference screen uses for its control chips. C1 separately gave the permanent right-column card the label "HOW BOOKING WORKS" and a closing link with the same words.

**The result.** The same phrase appears three times in one viewport: the header link, the card label, and the card's closing link. The card is also a block titled "HOW BOOKING WORKS" that ends in a link reading "How booking works", which is the same text twice within the same card.

**Change:**

1. **The header link is removed.** The explanation lives in the right column, in view, so a link at the top of the list pointing at it is redundant and competes with the row buttons.
2. **The card's closing link is removed.** The card already carries the explanation; a link repeating its own title adds nothing.
3. **The card keeps its label, its body and its footer.**

**A judgement worth recording.** The card is the highest-contrast block on the screen and it does not act. On the reference screen that slot earns its weight by carrying a progress bar and something at stake. An explainer does not. The correct fix is to reduce the weight, not to add an action to justify it: the card takes the same light treatment as the other cards in the column. Adding a call to action to an explanation would only lead to more reading, which is not an action.

**Acceptance:** the phrase "How booking works" appears once on the screen, and the explanatory card carries no call to action.

---

### 10.7. Appointments: the section header was implemented inverted

**Current implementation.** "Book a conversation" renders as the large title with "What it's about" small and purple underneath.

**What T4 specifies.** The opposite: "BOOK A CONVERSATION" as the small uppercase eyebrow, and "What it's about" as the `H2` title.

**Additional problem in the implementation.** The small line renders in purple, which on this screen is the colour of links and of the row action text. It reads as clickable and is not.

**Change:** apply T4 as written, and the eyebrow takes `var(--muted)`, never the purple used for actions.

**Acceptance:** the uppercase line is the eyebrow, the sentence is the title, and neither renders in an action colour.

---

### 10.8. Appointments: the band's position was not specified

**Current implementation.** The band renders between two rows, directly above the row it refers to, rather than above the first row of the list.

**What A6 specifies.** The band component from the reference screen, where it sits above the first row.

**Change:** anchoring the band to the row it names is better than floating it at the top of the list, because it puts the statement next to its subject. Adopt the implemented behaviour deliberately: the band renders immediately above the row it refers to, and above the first row only when it refers to the list as a whole, which is case 2 of the A6 rule.

This is a divergence from the reference screen's band placement and it is intentional. The component is unchanged; only its anchor differs.

**Acceptance:** the band always sits immediately above the row it names, and never appears more than once per state.

---

### 10.9. My Degree: requirements are in no order

**Addition to the My Degree document.**

**Current:** inside a group, requirements appear in catalog order, so a SATISFIED sits between two NOT STARTED. In Core curriculum the sequence is Writing & Rhetoric, Quantitative Reasoning, Natural Science, Arts & Humanities, Historical Inquiry, Foreign Language, mixing three statuses with nothing separating them.

**Problem:** the student cannot see where she stands without reading every row and sorting them in her head. Two of the six rows are already done and take the same vertical space as the ones that need her.

**Change:** inside each group, requirements are ordered by status, in the same order the D3 groups use inside a requirement. One ordering rule for the whole screen instead of two.

| Order | Status | Sort within the band |
|---|---|---|
| 1 | IN PROGRESS | fewest courses left first |
| 2 | NOT STARTED | fewest courses left first |

SATISFIED requirements leave the group entirely, see 10.10.

**Each band carries a label**, in the same treatment as the group labels inside a requirement. Without one the list looks like catalog order and the student cannot tell it has been sorted. A label is only rendered when its band has rows.

**Groups are not reordered.** Core curriculum stays above the Computer Science major. That taxonomy is what her advisor and the university website use, and reordering by status across the whole screen would break it. Group first, status inside.

**Applied to Core curriculum:** Natural Science, then Historical Inquiry, Writing & Rhetoric and Foreign Language ordered by how much is left.

**Acceptance:** in any group, no requirement that needs action appears below one that does not.

---

### 10.10. My Degree: satisfied requirements need their own section

**Addition to the My Degree document.**

**Current:** a satisfied requirement sits in its group beside unfinished ones, with the same weight and the same height.

**Problem:** it is finished. It cannot be acted on, and it takes the space of something that can.

**Change:** a section at the bottom of the requirement list, after the last group, holding every satisfied requirement from every group. It collapses and starts closed.

**What a row in that section carries.** A satisfied requirement is looked up for one reason, which is to answer how it was satisfied:

| Element | Content |
|---|---|
| Title | the requirement name |
| Group | which group it came from, since it has left it |
| Credits | the counter, e.g. "4 of 4 credits" |
| What closed it | the course or the credit that satisfied it, with its date |
| Status | the SATISFIED pill |

The row does not expand into the full course list. Which courses could have satisfied it is no longer a decision.

**Group counts change with this.** A group header states what is left in it, "4 requirements left", the satisfied section states its own count, "2 satisfied", and the white card keeps the total, "2 of 10 requirements met".

**Copy:** section title "Satisfied requirements". Band labels "IN PROGRESS" and "NOT STARTED" for 10.9. A satisfied row's closing line reads in the shape of "Closed by credit Aster accepted on Aug 4".

**Acceptance:** no satisfied requirement appears inside a group, every satisfied row states how it was satisfied, and the section is closed on load.

---

### 10.11. My Degree: the plan has no surface

**Addition to the My Degree document.**

The My Degree document lets the student add a course to a plan and never says where the plan lives. Without this, that button leads nowhere.

**Pattern.** A drawer, using the portal's existing pattern: `.modal-scrim` plus `.drawer`, fixed right at `width: min(465px, 100vw)`, entering via `drawerIn` over 0.26s, with a new `.plan-drawer` modifier following the convention of `.person-drawer` and `.document-drawer`. Header `.drawer-header` with `.drawer-label`, body `.drawer-content`, title `.drawer-title`, term headings `.drawer-subheading`, notes `.picker-note`, empty state `.no-slots`, footer `.drawer-actions`. Course rows reuse `.course-row`. No new class is needed.

**How it opens.** From a fourth card in the right rail, and from the "In your plan" state on a course row, which opens the drawer scrolled to that course. **It never opens automatically**, including right after a course is added. Adding gives inline feedback on the row; it does not interrupt.

**Contents.** A line stating what the plan is and is not, the planned credit total as its own figure, then the courses grouped by term with `.drawer-subheading`, chronological, with an "Any term" group last. Each row carries the course code and name, its credits, the requirement it would count toward, and a `Remove` link.

**Conflicts are stated, not resolved.** Where two planned courses in the same term have a prerequisite relationship, the later one carries a `.picker-note` saying so. The drawer does not reorder or block anything.

**Footer:** a single `.secondary-button` "Close". No save, because nothing is pending. No submit, because a plan is not sent anywhere.

**What the plan never does:**
1. It never changes the credit ring, the requirement counters, or a remaining line.
2. It never appears in the "Waiting on the Registrar" section.
3. It is never sent to anyone, and no copy implies an office can see it.

**Rail entry point.** A fourth card in `aside.page-rail`, below the existing three, using the same card component: title "YOUR PLAN", the number of planned courses, the planned credit total, and a "See your plan" link.

**Copy:**

| Element | Text |
|---|---|
| Drawer label | "YOUR PLAN" |
| Drawer title | "Courses you're thinking about" |
| What it is line | "Your own list. Aster can't see it, it doesn't register you for anything, and it doesn't change any credit you've been approved for." |
| Planned credit figure | "12 credits planned" |
| Term heading | "Fall 2026", "Spring 2027", "Any term" |
| Row support line | "Would count toward Natural Science" |
| Conflict note | "CS 111 needs CS 110 first, and both are in the same term." |
| Remove link | "Remove" |
| Drawer empty state | "Nothing here yet. Add a course from any requirement and it shows up here." |
| Footer button | "Close" |
| Rail card figure | "3 courses" |
| Rail card support line | "12 credits planned, none of them approved" |
| Rail card link | "See your plan" |
| Rail card, empty | "Nothing planned yet. Adding a course from a requirement starts your list." |

**Accessibility.** `role="dialog"` and `aria-modal="true"`, focus to the `.drawer-title` on open and back to the trigger on close, focus trapped while open, Esc closes, clicking the scrim closes, and removing a course moves focus to the next row or to the empty state.

**Acceptance:** every planned course is reachable from the drawer, no counter on the screen changes when a course is planned, and the drawer never opens by itself.

