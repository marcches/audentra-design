# Aster student portal: decisions and conformance (Audentra)

**One document, two parts.**

**Part A, sections 0 to 12:** the change of direction from the stakeholder review call of **2026-08-21**, the day after the walkthrough. It is the most recent input. It supersedes parts of the Appointments screen document and establishes how a student reaches a person anywhere in the portal.

**Part C, sections C1 to C11:** the screen walkthrough call of **2026-08-20**, in which the built screens were reviewed one by one. It **supersedes Part B where they disagree**, which happens once, at item C7.

**Part B, sections B0 to B7:** every screen document in this series checked against the ENR backlog in Jira, read on 2026-08-21. It states, per document, what conflicts with a prioritized story and what the backlog requires that a document missed.

**Order of authority, newest first: Part A (Aug 21), then Part C (Aug 20), then Part B.** Each conflict is marked where it happens.

**The two calls are one conversation.** The Aug 20 record lists "Help strategy and Edward routing" under **Needs Further Discussion**. The Aug 21 call is where that discussion happened and where it was resolved, which is what Part A carries. Read that way, Part C is the screen-by-screen feedback and Part A is the decision that came out of the question Part C left open.

Both transcripts are machine-generated, with the Portuguese passages garbled. Everything quoted was legible in full, and each is cross-checked against its meeting record.

**Sources:** the review call and its recording, the meeting record for the same call, the ENR project in Jira, the Aster onboarding build spec, and the prototype at audentra-design.vercel.app as it stood on 2026-08-21.

---

# Part A · The decision and what it changes

## 0. Where Part A came from

The Appointments document specifies a booking screen. The review call rejected that framing. Appointments is not a screen about booking; it is the last step of an escalation that starts with Edward and ends, only when nothing else worked, with time on a person's calendar.

Part A records that change, the model that replaces it, and every item in the earlier document that no longer holds.

**A note on the source.** The call transcript is machine-generated and parts of it are garbled. Everything quoted below was legible in full. Anything that depended on an unclear passage is marked in section 7 rather than guessed at.

---

## 1. The decision

**Appointments, Help and Edward are one flow, not three features.**

From the call: *"you guys can combine my appointments and my help together... all of these three functions, talking to Edward, talking to a person, meeting with that person. I think they're under the same thing."*

The reasoning given: a student does not want an appointment. She wants an answer. An appointment is what happens when the earlier steps did not produce one.

*"why would you want to have an appointment to talk about the Red Sox game that happened last Sunday? No, of course you need help or you need some advice."*

This was named on the call as an escalation process, and confirmed as such.

---

## 2. The escalation model

The reference given on the call is Amazon's customer support flow: the system tries to resolve, and hands off only when it cannot, with the student choosing the next channel each time.

| Step | What happens | Available in MVP |
|---|---|---|
| 1 | Edward answers, using the student's own context rather than a generic reply | yes |
| 2 | If Edward cannot resolve it, the student is asked whether it was resolved | yes |
| 3 | If not, email the office. The portal composes it and sends it | yes |
| 4 | If a calendar is connected, offer the times that office has posted | yes |
| 5 | If no calendar is connected, request a callback | yes |
| Later | Live chat with a person | **no, explicitly out of MVP** |

From the call: *"For the MVP, the chat is out."* — *"Yes, yeah, just email."*

**Step 2 is the hinge and it does not exist today.** Nothing in the portal asks whether the answer worked. Without it there is no escalation, only three separate entry points, which is the current state.

---

## 3. What replaces "ask for a time"

The call questioned the feature directly: *"But why do we ask for a time? Why can't they just get into our calendar?"*

The answer given is that a missing calendar is an integration gap, not a negotiation:

*"we should change the language because right now we are creating a middle MIT so if they use the connectors, we should directly show them what they can schedule."*

**Consequences:**

1. **Where a calendar is connected, the student books directly.** No request, no waiting, no REQUESTED state for that path.
2. **Where no calendar is connected, the correct offer is a callback, not a time.** From the call: *"We can say ask for a callback... instead of like scheduling the available."*
3. **The reason given for preferring a callback over a time request** is that a request creates a dependency on the student seeing a reply: *"if they don't see that notification and or if they see they reply what student doesn't see it kind of loses the transition. We are creating additional dependencies."*
4. **The absence of a calendar is a fact about the institution, and the copy says so plainly** rather than describing it as a choice the office made.

---

## 4. What this supersedes in the Appointments document

| Item there | Status | Why |
|---|---|---|
| **A2**, asking for another time as a row action | **superseded** | the action becomes a callback request, and only where no calendar is connected. Where one is connected, the student books directly and there is no fallback to offer. |
| **A7**, the REQUESTED badge | **narrowed** | it applies to a callback request, not a time request. The copy in that item that describes asking a team for a time is replaced by section 6.2 here. |
| **Section 9**, the booking drawer, tab "Ask for a time" | **superseded** | the drawer keeps one tab, the published times. The second tab is replaced by the escalation step, which is not a tab and not part of booking. |
| **8.7**, the band label for a topic with no open calendar | **superseded** | replaced by section 6.1 here. |
| **A9**, category names | **amended** | the taxonomy stands; the labels change, see section 6.3. |
| **A6**, the band rule | **amended** | case 3, pointing at a topic with no open calendar, now routes into escalation rather than into a time request. |
| Everything else | **stands** | the typography, the hierarchy, the removal of the metric card, the accordion rules, the copy for the states, and the states themselves are unaffected. |

---

## 5. The two problems this screen is mixing

From the call: *"under my appointment, you're solving two problems, right? So the one is the periodic meetings. One is the help."*

**Problem one, help.** Covered by sections 2 and 3 above.

**Problem two, periodic meetings.** Advisor meetings that happen on a schedule, without anything going wrong. From the call: *"these people are academic advisors, mainly to meet with the student every semester, right? Maybe twice."*

This does not exist anywhere in the prototype and is in none of the earlier documents.

**Status:** out of MVP, mock only. From the call: *"This can be outside of MDP, but just think about it, right? Maybe we can just have the markups, but then the team doesn't work on it yet."*

**What a mock has to show, and it is not a booking screen:** a meeting the institution scheduled, not one the student requested. The student's move is to confirm, reschedule or say she cannot make it. It shares the appointment card component and none of the booking flow.

---

## 6. Copy

### 6.1. The strings the call rejected

The call flagged the language directly: *"the language is important so academic advising office hasn't opened a calendar yet is not like US English... the idea is great basically... It's just you gotta pull the words out."*

Three things make that sentence read wrong on a US campus. Offices are referred to without "Office" in running text. "Opened a calendar" is portal vocabulary rather than campus vocabulary; a US student hears "posted times" or "has availability". And the sentence puts the office's internal process in front of the student's question, which is whether she can get help.

| Where | Rejected | New |
|---|---|---|
| Band label | "The Academic Advising Office hasn't opened a calendar yet" | "Academic Advising doesn't have times posted right now" |
| Row state | "No times published yet" | "No times posted" |
| Row explanation | "They haven't opened a calendar yet. You can ask for a time, or wait and we'll tell you when they open one." | "Academic Advising hasn't posted times yet. You can ask them to call you back, or we'll let you know when times go up." |
| Row primary action | "Ask for a time" | "Request a callback" |
| Row secondary action | "Tell me when times open" | "Email me when times are posted" |
| Row primary action, times available | "Choose a time" | "Book a time" |
| Card label and link | "How booking works" | "How this works", matching the label the reference screen already uses |

### 6.2. The callback request, replacing the time request

| Element | Text |
|---|---|
| Drawer label | "REQUEST A CALLBACK" |
| Drawer title | "Ask Academic Advising to call you" |
| Opening line | "They don't have times posted right now. Tell them when you're usually free and they'll get back to you." |
| Field | "When are you usually free?" with the help line "Days and rough times are enough." |
| About field | unchanged from the booking drawer |
| Note | "This isn't a booking. Someone from Academic Advising gets in touch, usually within two business days." |
| Primary button | "Send request" |
| Badge on the resulting item | "CALLBACK REQUESTED" |
| Support line on that item | "Waiting on Academic Advising. You'll see their reply here." |

### 6.3. Category labels

The call asked for one form across the set: *"it says like, you know, your offers, right? And then it says money and a and then your degree. So if I were, I would have made it sound like your financials."*

| Today | New |
|---|---|
| YOUR OFFER | Your offer |
| MONEY AND AID | Your financials |
| HEALTH AND WELLNESS | Your health |
| ABOUT YOU | Your details |
| CAMPUS LIFE | Your campus life |
| YOUR DEGREE | Your degree |

**Two consequences worth stating.**

These categories are the checklist's, not Appointments'. Renaming them changes My Enrollment as well, and the two screens have to change in the same release or the taxonomy splits.

The navigation uses "My", as in "My Financials" and "My Degree", while these labels use "Your". That is defensible and worth keeping deliberately: navigation is the student's own filing, and content addressed to her speaks to her. It should be a decision, not an accident, because it will look like an inconsistency to anyone who did not decide it.

### 6.4. The escalation prompt, which does not exist today

| Element | Text |
|---|---|
| After an Edward answer | "Did that answer it?" with "Yes" and "Not really" |
| After "Not really" | "Let's get you to a person." |
| Option, calendar connected | "Book a time with Academic Advising" |
| Option, no calendar connected | "Request a callback" |
| Option, always | "Email Academic Advising" |
| Note under the options | "Whatever you already told Edward goes with it, so you don't start over." |

---

## 7. The three open questions, answered from the backlog

The call left three things open. All three are answered by the ENR project in Jira and by what the prototype already publishes. Two of the answers contradict what sections 2 and 3 of this document proposed, and those sections are corrected in section 8.

### 7.1. Where the escalation lives: it already has a home and a name

**ENR-190, "Student · Support services: reach a person, book time, control my record"** is an epic that already groups exactly the surfaces in question:

> *"Support services: Help, Appointments and Profile. Three reliable routes out of the portal and into the institution, so that a student can reach a person, book time with the right team, and keep control of what is theirs."*

Its children are ENR-177 (Help), ENR-178 (Appointments), ENR-179 (Profile) as stories, and ENR-182, ENR-183, ENR-184 as the matching design tasks.

**Answer:** the container exists and is called **Support services**. The call floated "support centers"; the backlog already says Support services, and that is the name to use. Nothing new needs to be created to hold the escalation. What changes is that the three routes stop being three destinations and become one ordered flow inside that epic.

### 7.2. The callback window: it is published per office, not set by the portal

The backlog does not state a window, and it does not need to. **ENR-177 requires that "Every support route names a real accountable office."** The prototype already publishes a reply time per office: Housing Services shows "Usually replies in 2 business days", Health Services shows "5 business days" under "HOW LONG A REVIEW TAKES".

**Answer:** the window is the office's, published by the office, and the portal shows what that office published. The two business days in section 6.2 of this document is wrong as a constant and is corrected in section 8.

### 7.3. Periodic meetings: the backlog is silent

Nothing under ENR-190, and nothing in the student epics, describes a recurring advisor meeting. ENR-178 covers only student-initiated booking from published availability.

**Answer:** this is new scope, exactly as the call treated it. Section 5 of this document stands as written, including its status as mock-only, and it needs a story of its own before anything is built.

---

## 8. Two corrections to this document, from prioritized stories

### 8.1. Email is not the durable channel. The portal is.

Section 2 of this document put email at step 3 of the escalation. **ENR-177 rules that out**, and it is already Prioritized:

> *"The reply appears in the portal, which is the durable channel."*
> *"Nothing implies that replying to an external message will reach a person while no inbound channel exists."*

The call said *"just email"* for the MVP. Both can be true, and the distinction matters: **email may be the outbound notification, and the inquiry and its reply live in the portal.** What must not happen is a message that invites the student to reply to an address nobody is reading.

**Corrected step 3:** the student sends an inquiry from the portal. Receipt is confirmed immediately, the inquiry carries a state she can check later, and the reply arrives in the portal. Email notifies her that a reply is waiting and does not carry the conversation.

**Two further constraints from the same story, which this document had not captured:**

- The state shown never exposes who is handling it: *"no assignee or internal team detail is exposed."*
- A resolved inquiry reopens when the student replies, and returns to whoever handled it.

### 8.2. "Ask for a time" was never in the backlog, and is ruled out by a prioritized story

Section 3 of this document treated the removal of time requests as a change of direction from the call. It is not a change. **ENR-178 already forbids it,** and it is Prioritized:

> *"The student selects from availability the institution has published and never proposes an arbitrary time."*
> *"A conversation type with no availability says so rather than showing an empty picker."*

The design task **ENR-183, "Student · Appointments"**, states the intent in the same terms:

> *"A free date and time field becomes a picker over published availability, which changes the emotional register from request to booking."*

**What this means for the prototype.** The "ask for a time" feature is not a design decision that the call reversed. It is the prototype drifting away from an already prioritized story, and the earlier Appointments document specified it further rather than catching it. The correction is not new scope, it is a return to what was written.

**And ENR-183 states a state distinction this document should carry:**

> *"a student with no appointments and a conversation type with no availability are different emptinesses and must read differently."*

That is the same distinction item C2 of the Appointments document makes about repetition, arrived at from the other direction.

### 8.3. The callback, corrected

| Element | Was, in 6.2 | Corrected |
|---|---|---|
| Note under the request | "usually within two business days" | the reply time that office publishes, in the same place Housing and Health already publish theirs |
| Where the reply arrives | implied to be a reply to the student | in the portal, per ENR-177, with email notifying her it is there |
| The state on the item | "CALLBACK REQUESTED" | unchanged, and it exposes no assignee or team detail, per ENR-177 |

---

## 9. What the backlog confirms that this document assumed

Two things this document and the earlier ones took as premises turn out to be written down, which is worth recording so nobody relitigates them.

**Health and Housing are always present and only require work when onboarding was skipped.** ENR-205 states it in its acceptance criteria: anything resolved at onboarding *"arrives already resolved and is shown as a current state, not asked again"*, and anything skipped *"is shown as outstanding here, and the existing enrollment checklist item routes to this section."*

**The accessibility question collects nothing about a condition.** ENR-208 requires that the section *"collects no diagnosis, no condition name and no supporting documentation"*, that answering no *"is a complete answer"* that blocks nothing and is never shown as outstanding, and that concealment from instructional staff *"is enforced below the interface rather than by hiding it in the view."*

The Health document treats that block as untouchable. The backlog is the reason why, and ENR-212 adds one thing the Health document does not: a yes creates a work item for Accessibility Services carrying a contact deadline derived from the start of term, and carrying no condition. If the Health screen ever shows the student what happens after she says yes, that is the fact to show.

---

## 10. What the meeting record settles

The meeting record for the same call carries one item under **Aligned**:

> *"The customer support workflow is defined as email-based communication for the MVP, with secondary escalation paths for meeting scheduling and call-back requests."*

That confirms three things this document proposed and one it got the shape of slightly wrong.

**Confirmed:** the callback is a real escalation path and not an invention; scheduling is a path rather than the destination; live chat is out of the MVP.

**Corrected shape:** the record puts **email first** and treats scheduling and callback as secondary. This document's section 2 ordered them as Edward, then email, then booking, then callback. The recording supports Edward being first (*"our goal is to solve all the problems with Edward first"*), and the record supports email being the primary human channel after that. Both hold together, and the order in section 2 stands with one clarification: **booking is not a step above email, it is one of two secondary paths alongside the callback.**

**And the record leaves the same tension section 8.1 identified.** It says email-based communication; ENR-177 says the portal is the durable channel and that nothing may imply a reply to an external address will reach a person. The story is Prioritized and the record is a meeting note, so the story wins: email carries the notification, the portal carries the conversation.

One item is recorded as **Needs Further Discussion**, the full page against pop-up question for the action screen. That concerns the staff portal and does not touch anything in this document.

---

## 11. The escalation user story, as a draft

The meeting record assigns the group a next step: *"Design Escalation Workflow: Draft a user story for the escalation workflow to handle issues that cannot be resolved automatically."*

This is that draft, written in the format the ENR stories already use, for the group to amend rather than start from nothing. It belongs under **ENR-190, Support services**.

---

**Student · Get to a person when the assistant cannot resolve it**

*As a student, I want a clear route to a person when the assistant cannot answer, so that a question I could not resolve never ends in silence.*

### Acceptance criteria

1. After the assistant answers, the student is asked whether the answer resolved the question, and the question is asked once and is easy to dismiss.
2. Answering that it did not resolve offers the routes that are actually available for the responsible office, and never a route that does not exist.
3. The routes are: send an inquiry, book from published availability, and request a callback. Booking and callback are alternatives to each other, not steps in a sequence.
4. Booking is offered only where the responsible office has published availability. Where it has not, the callback is offered in its place and the absence is stated.
5. The context the student already gave the assistant travels with whichever route she takes, so she does not restate her question.
6. Every route names the office that receives it, per ENR-177.
7. The reply arrives in the portal. Email notifies the student that a reply is waiting and does not carry the conversation.
8. Each route produces an item the student can check later, with a state that exposes no assignee or internal team detail.
9. A callback request states the reply time that office publishes, and never a time the portal invented.
10. Declining to escalate costs nothing and leaves no outstanding item.

### Scenarios

**Scenario 1: The assistant resolves it \[Happy path\]**
Given the assistant answers a student's question
When the student confirms it resolved the question
Then no route is offered
And nothing is left outstanding

**Scenario 2: Escalate to an inquiry \[Happy path\]**
Given the assistant did not resolve the question
When the student chooses to send an inquiry
Then the inquiry carries the context she already gave
And receipt is confirmed immediately
And the reply arrives in the portal

**Scenario 3: Escalate to a booking \[Happy path\]**
Given the responsible office has published availability
When the student chooses to book
Then she selects from published times only
And the subject travels with the booking

**Scenario 4: No availability, so a callback instead \[Alternate\]**
Given the responsible office has published no availability
When the routes are offered
Then booking is not offered
And the absence is stated
And a callback is offered in its place, with that office's published reply time

**Scenario 5: The student declines to escalate \[Edge\]**
Given the routes are offered
When the student dismisses them
Then nothing is sent
And no item is created
And her checklist and points are unchanged

**Scenario 6: The route cannot be completed \[Negative\]**
Given the inquiry, booking or callback cannot be created
When the student submits it
Then the failure and its reason are stated
And nothing is presented as sent or booked
And the context she gave is preserved so she can retry

---

**What this story does not cover, and needs its own:** the periodic advisor meeting described in section 5. It is institution-initiated and shares only the appointment card with this flow.

---

## 12. Edward is the door, not the last resort

The escalation only works if the student has already talked to Edward. Today the portal does not take her there: the floating control waits in the corner, and several screens offer a direct route to a person before she has spoken to anyone. This section makes Edward the entry point to every human route in the portal.

### 12.1. The rule

**No route to a person appears before Edward.** Where a screen offers a direct line to an office today, that control opens Edward instead, with the question already written for the student.

**Two exceptions, both deliberate.**

1. **Booking from published availability is not a route to a person, it is a resolution.** Where an office has posted times, `Book a time` stays on the row and does not pass through Edward. Making a student consult an assistant in order to click a time that is already there is invented friction.
2. **The office is still named everywhere.** ENR-177 requires that every support route name a real accountable office, and it stays named. What changes is where the student starts, not who she can see is responsible.

### 12.2. How the control behaves

Opening Edward from one of these controls **fills the input with the question and does not send it.** The student sees the question written, can edit it, and sends it herself.

This is deliberate. A question sent on her behalf is a conversation she did not choose to start, and the point of the pattern is to spare her the typing, not the decision. It also lets her correct the framing when the screen guessed wrong about what she actually wanted to ask.

The panel opens focused on the input, with the cursor at the end of the text.

### 12.3. What changes on each screen

| Screen | Today | New |
|---|---|---|
| Appointments, row with no published times | "Ask a team for another time" | opens Edward, input filled |
| Appointments, `no-times` empty state | "Email the Admissions Office" | opens Edward, input filled |
| My Degree, credit match | "Ask the Registrar's Office" and "Ask your advisor" | one control, opens Edward, input filled |
| Campus Life, club card | "Message Dana" | opens Edward, input filled |
| Any screen, `Book a time` where times are posted | direct | **unchanged**, no Edward |
| Any screen, the office name and its hours | shown | **unchanged**, still shown |

**This supersedes item B2.1 below.** That item restored the advisor route on the credit match, to satisfy ENR-186 criterion 6, which requires a route to an advisor from the match. The route still exists and still reaches the advisor; it now starts in Edward. Nothing in ENR-186 requires the route to be direct.

### 12.4. The prefilled questions

Each control writes a question in the student's voice, naming the office, so that what she sends is a question and not a form.

| Where | Text placed in the input |
|---|---|
| Appointments, topic with no posted times | "Academic Advising hasn't posted any times. How do I get in touch with them?" |
| Appointments, `no-times` state | "No team has posted times yet. Who should I talk to about my enrollment step?" |
| My Degree, credit match | "Would my IB Spanish credit count toward Foreign Language, and who decides that?" |
| Campus Life, club card | "How do I get in touch with Dana Whitfield about the Aster Chamber Choir?" |

The question names the specific item, not the screen. A question that reads "I have a question about this page" saves nobody any typing.

### 12.5. What this does to the Appointments screen

With booking staying direct and every other human route starting in Edward, the Appointments screen keeps its job: it is where a student books from posted times and follows what she has already booked. It stops being where she asks for anything.

Everything the Appointments document specifies for booking, the drawer, the states, the row anatomy and the typography, stands. What leaves it is the asking, which was already ruled out by ENR-178 and is now routed through Edward instead.

### 12.6. What has to be true for this to work

Edward has to be able to answer these questions, or the pattern moves the dead end rather than removing it. ENR-176 requires that he give answers about the student's own record **or a route to a person**, so the capability is specified. The escalation prompt in section 6.4 is what he offers when he cannot answer, and it is the same prompt regardless of which control opened him.

---

# Part C · The screen walkthrough

The team demonstrated the built screens and the stakeholder reacted screen by screen. This section carries what he asked for, grouped by where it lands.

---

## C1. Profile, the screen with the most feedback

### C1.1. The orbit graphic goes, a photograph replaces it

**Asked:** *"instead of having that like a time on the right with the protons and neutrons spinning it around... maybe put, like, Maya's picture over that."*

**Change:** the decorative orbit in the banner is replaced by the student's own photograph. Where none is uploaded, the slot carries her initials in the monogram treatment the portal already uses, and an upload control.

**This is the only place in the portal where a photograph of the student appears**, and it is hers, uploaded by her. Nothing about the consent rules for club and residence imagery changes.

### C1.2. The right column is not carrying its weight

**Asked:** *"on the right side... your session, one person out of several categories. I think all of that is really useless information."*

**Change:** the current rail contents go. The layout stays two thirds and one third, and the rail takes content that earns the position. The stakeholder's own suggestion is the shape: *"I would put that name on the left and put, like, different type of information over there and say, like, about me."*

### C1.3. The screen is too long and needs sectioning

**Asked, twice:** *"this is a little long, so we want to probably get looked at in a session"* and *"it's again, just a little long to scroll. Let's fix that."*

**Change:** Profile is sectioned rather than scrolled, following the pattern already applied on My Financials, which the same call approved: *"Following your advice, when we didn't scroll, we put pagination."*

**Proposed sections**, which is where the other Profile asks land:

| Section | Holds |
|---|---|
| About me | name, preferred name, pronouns, the photograph |
| Contact and communication | addresses, phone, email, channel preferences, see C1.6 |
| Who can see what | family authorizations, see C1.5 |
| My documents | everything the student has sent, see C1.7 |
| Where I came from | previous institution record, see C1.8 |

### C1.4. Editing is one click too easy

**Asked:** *"this is really editable, right? ... it's too easy to edit... we want to make it maybe one step harder to edit."*

**Change:** editable fields render as read state with an explicit edit control, not as inputs sitting open. This is not a permission change; the backend already allows the edit, per the call. It is about a student changing a legal-adjacent field by accident.

**This sits alongside ENR-179**, which already requires that student-controlled and institution-owned fields be visually distinguished and labelled, and that every owned field offer a route to the office that can change it. The call adds a step to the controlled ones.

### C1.5. Family permissions: name the categories, and make revoking deliberate

**Asked:** *"instead of saying like three of seven, probably I will just say financial aid status, billing, blah, such as such."* And: *"we put like a button over that says revoke relative access... it did not even ask me, are you sure you want to revoke this access."*

**Change:**

1. The authorization states **which categories** are shared, by name, not a count. "3 of 7" tells the student nothing about what the person can see.
2. Revoking asks for confirmation, and the confirmation names the person and what they will stop seeing.
3. The seven categories come from the onboarding step and stay consistent with it.

ENR-179 already requires the authorization, its categories and its end date to be visible and changeable from Profile. This adds the naming and the confirmation.

### C1.6. Communication preferences are one setting and should be several

**Asked:** *"come up with maybe something more complex over here... if it's about financially, I prefer [one channel]. If it's about clubs, I prefer emails... maybe something about a grid."*

**Change:** channel preference becomes per category rather than one global setting. The categories are the portal's own, the ones the checklist and Appointments already use, so a student sets how she wants to hear about money separately from how she wants to hear about campus life.

**Recorded as asked, and worth a decision before it is built.** A grid of categories against channels is a settings screen, and the student has not arrived yet. A first release could carry a default with per-category overrides only where the institution actually varies its channel.

### C1.7. My Documents moves into Profile

**Asked:** *"my documents, what they provide, that should be under this profile, in my opinion... whatever they are providing to us is about their profile."*

**Change:** My Documents stops being a separate navigation entry and becomes a section of Profile.

**This touches the backlog.** ENR-146 and its stories, ENR-157 and ENR-158, are written as a My Documents screen. The behaviour they specify does not change, only where it lives. The navigation change is also a change to ENR-174, which governs how destinations are grouped.

### C1.8. The previous institution record has no home

**Asked:** *"there needs to be some sort of page, some sort of section that you can see the previous institution record... your high school name, the classes you took, this is your GPA, these are the credits."*

**Change:** a section carrying what the student came in with: the previous institution, the coursework, the grades and the credits, presented as a record rather than as a form.

**Where it goes is open, and the call said so:** *"maybe if it's necessary, if you think that should go under academics, I'm happy with that."* It connects to My Degree, because it is the evidence behind a credit match. Profile is the safer home under the principle he stated, which is that what the student provided is profile.

### C1.9. "Term time address" is not US English

**Asked:** *"what does that term time address mean? ... normally in the US we have permanent addresses, which is where you reside, or mailing addresses, which is different."*

**Change:** the labels follow US convention.

| Today | New |
|---|---|
| Term time address | Campus address |
| Home address | Permanent address |
| does not exist | Mailing address, where it differs from the permanent one |

"Term time" is British usage. The three addresses above are what a US student sees on every registrar form.

---

## C2. My Enrollment

### C2.1. Completed items say a number and a date and explain neither

**Asked:** *"what is that 150? What is August 7th? ... is it due August 7 or is it completed on August 7th?"* And the same for the future items: *"same thing with January. Is it due, or is it coming up?"*

**Change:** every date on a task states what kind of date it is, and every figure states what it is. A completed row reads as one sentence: what it was, when it completed, and what it earned.

### C2.2. A completed item does not need its description

**Asked:** *"since it's completed, in my opinion, you don't have to put the subtext."*

**Change:** completed rows drop the description and keep the title, the category, the completion date and the points.

### C2.3. Category is what ties the features together

**Asked, and it is the same point the Appointments document makes in item A9:** the category on a task is what connects a checklist item to the screen that owns it.

**Change:** completed and upcoming rows carry the category, as the active ones do.

---

## C3. Colour is doing no semantic work

**Asked:** *"maybe you don't have to use purple for everything... you can use gray, blue and green... we may need to have something like to do, in progress, done."* Confirmed by the team as semantic colour.

**Change:** state carries a colour, and the colour means the same thing on every screen.

| State | Where it appears |
|---|---|
| Not started | My Enrollment, My Degree, Health, Housing |
| In progress, or waiting on the institution | all of the above |
| Done | all of the above |
| Needs the student | the escalated deadline case in the My Financials document |

Purple stays the brand colour and stops being the status colour. **This is a portal-wide change and it touches every screen document in this series**, each of which specifies status pills without specifying their colour.

---

## C4. Spacing between the banner and the first block

**Asked:** *"there is a wide space between that banner and that one... you have this, like, a wide space between enrollment step and book conversation. Wide enough for me to be able to park my Volkswagen over there."*

**Change:** the gap between the banner and the first content block is reduced, portal-wide, as a single spacing token rather than per screen.

**This is not the same as the fold problem** that items L1 in the Appointments document and F10 in the My Financials document describe, but it is the cheapest part of it: the space costs nothing to remove and it is the first thing a reader sees on every screen.

---

## C5. Edward appears at the task, not only in the corner

**Asked:** *"imagine, if you are a student, if you are struggling with your housing, the funds... would you want to see AI over there? ... How can I help you with locking your place? Or verify your household income... I don't have to explain that I am from, who am I. Anything that it needs to know comes from the context."*

**This extends section 12 of Part A rather than replacing it.** Section 12 makes Edward the entry point to every human route. This adds a second thing: **Edward is offered inline at a task the student is stuck on, with that task's context already loaded.**

**Change:**

1. A task row carries a quiet control offering Edward with that task's context. It is not a route to a person; it is help with the task itself.
2. The question is written from the task, in the same prefilled and unsent pattern section 12.2 establishes.
3. Nothing is re-explained. The task, its office and its deadline travel with the question.

**And one input mode was named:** *"I don't type. I go and talk."* Voice input for Edward was raised. It is not in the backlog and is recorded here as a wish rather than a requirement.

---

## C6. Help and Messages are de-prioritised

**Asked, plainly:** *"help is not that useful... don't waste too much time on help and figuring this out. We will figure this out later."* And later: *"Nobody needs help. Nobody needs messages."*

**What it means, and what it does not.** The strategy stated in the same breath is *"our help strategy is based on Edward and escalation to real human agents"*, which is exactly Part A. Help is not being deleted; it is being absorbed. What is de-prioritised is **designing the Help screen as a destination**.

**Change:** no further design effort on the Help screen as it stands. The behaviour ENR-177 requires, that an inquiry confirms receipt, carries a state and returns its reply in the portal, still has to live somewhere, and under Part A that somewhere is the escalation flow.

---

## C7. Clubs: the interest control comes back

**This supersedes item B5.1 below.**

Item B5.1 cut the "I'm interested" control from the club card, on the grounds that no story asks for it and no staff story receives the signal. The call asks for it directly:

> *"they should be able to maybe follow the events... but they show interest in clubs."*
> *"based on what they show interest in, we recommend it for you in the events."*

**Change:** the control returns to the club card, and the reason it exists is now stated: **the signal feeds recommendations.** That is what B5.1 could not find and what makes the control more than a dead button.

**What still has to be true, and it is the same objection restated at a lower level:**

1. The copy says what happens to the signal. It feeds what the portal shows her, and it is not an application to join.
2. Whether the club is told is a separate decision from whether the recommendation engine is fed. The call only asked for the second.
3. ENR-187 acceptance criterion 5 already requires that interests selected at onboarding shape what is surfaced first. This extends that mechanism rather than inventing one.

**Events take a follow rather than an interest**, per the same quote, and for a different reason: an event is dated, so following it is about being reminded.

## C8. Clubs: imagery, categories and the match label

### C8.1. Emblems, confirmed, with one caution

**Asked:** *"we can benefit from having a picture for each club... these clubs have their logos, most of them."* The team named it as a badge or emblem.

This confirms the Campus Life document's item C4b as written.

**The caution:** the call also said *"you guys can put stock images."* Section 4.6 of the onboarding build spec forbids stock photography as a default, and item C4b forbids it too. **The two disagree, and the spec is the written rule.** Where no emblem is published, the fallback is the club's initials, not a stock photograph of strangers implying a community.

### C8.2. Academic clubs divide by school

**Asked:** *"academic club, in priority I will divide it by school. Let's say this college has five schools: school of engineering, school of arts and sciences... Don't call it just academic."*

**Change:** the Academic category is replaced by the institution's schools, published by Student Life like every other category on that screen.

### C8.3. "Matches Music" on a music club says nothing

**Asked:** *"music, of course, matches music."*

**Change:** the match label is suppressed where the club's own category is the interest that matched it. It is kept where the match is not obvious from the category, which is where it earns its space.

---

## C9. Health becomes My Health and Wellness

**Asked:** *"maybe you can combine that two into one page and say My health and wellness."*

The two are already one page in the prototype and in the Health document. What changes is the name.

**Change:** the screen is titled "My health and wellness" in the navigation and in the banner. This aligns it with the "My ..." form the rest of the navigation uses, and it stops the screen reading as being only about a medical record, which is the framing problem item H4 of the Health document already identifies.

---

## C10. Three things the meeting record carries that the transcript did not make clear

### C10.1. The family permissions block is the FERPA block

The record names it: the "who can see your records" section is reviewed *"ensuring compliance with FERPA regulations"*, and the next step assigned to the group reads *"Refine FERPA Access: Implement an additional confirmation step for editing FERPA settings to prevent accidental modifications."*

**Why this matters beyond a label.** FERPA is US federal law on the privacy of student education records, and a student authorizing a parent to see her grades or her bill is exercising a right under it. That reframes items C1.4 and C1.5: the extra step before editing is not a usability nicety, it is a legal-adjacent control, and the categories named in C1.5 are the record categories the law distinguishes.

**Change:** the section names what it is. The student is told, in one line, that these are her records and that sharing them is her choice to make and to withdraw.

### C10.2. Financials moved to tooltips as well as pagination

The record lists as **Aligned**: *"The financials overview page is set to use tooltips and pagination for improved readability, moving away from the use of subtitles."*

The tooltip half is not in the My Financials document. It is the mechanism behind item F5 of that document, which asks every changeable figure to state what could change it: the answer sits in a tooltip, not in a subtitle under every row.

### C10.3. Journeys needs a name and its icons need to be configurable

**Asked:** *"they're working on something they call Journeys. I want you guys to come up with a new name for that."* And: *"that icon that you show needs to be customizable, that button that we have over there needs to be customizable."*

This is staff-side, ENR-121, and does not change any student screen. It is recorded because the icon and the button being configurable is a constraint on the student screens that render them: **no student screen may hardcode a task icon or a task action label**, since both are set per institution.

---

## C11. Part C checked against the build, 2026-08-21

The walkthrough was on Aug 20 and the prototype has moved since. This is each Part C item against what the Profile screen and the rest of the portal actually render today, read on Aug 21.

### C11.1. Already done, or never a problem

| Item | Status in the build |
|---|---|
| C1.4, editing one step harder | **done.** Every editable field renders as a read state with a `Change` control. No field sits open as an input. |
| C1.5, name the categories | **partly done.** The authorization lists the categories by name under "WHAT RENATA CAN SEE", with the purpose the student gave. The count "3 OF 7" is still the heading above them. |
| C1.7, My Documents under Profile | **done in the content, not in the navigation.** A section called "The rest of your record" opens My Documents and points at My Degree and My Financials. My Documents is still its own navigation entry. |
| C1.2, the rail is useless information | **already reasonable.** The rail holds three cards: who can see the record, ending your session, and the offices. The session card explains why signing out matters on a shared computer, which is the opposite of useless. |
| Locked against editable | **done and done well.** The screen splits every group into "YOURS TO CHANGE" and "ASTER'S RECORD", names the office beside each owned field, and offers a route to it. |

**The session card is worth defending.** The stakeholder called that rail content useless. It reads: *"On a shared or library computer, closing the tab does not sign you out. Whoever opens the portal next would land in your record: your aid, your address, your grades."* That is a real risk stated in the student's terms, and ENR-179 acceptance criterion 7 requires it. **Do not remove it.** What can go is the count of categories duplicated in the rail, which the section below already states.

### C11.2. Still open

| Item | What the build shows |
|---|---|
| C1.1, the orbit graphic | **still there.** The classes `orbit-ring ring-one`, `orbit-ring ring-two` and `orbit-core` are in the banner. The photograph has not replaced it. |
| C1.3, the screen is too long | **still one scroll.** No sectioning, no pagination. |
| C1.6, communication preferences per category | **still one setting.** "Preferred channel · Portal" is a single value. |
| C1.8, previous institution record | **absent.** Nothing on the screen carries the high school, the coursework, the GPA or the incoming credits. |
| C1.9, "Term-time address" | **still there,** alongside "Home address". Both labels change per C1.9. |
| C1.5, the "3 OF 7" heading | still a count where it should be a statement |

### C11.3. Typography, measured on Profile

`H1` 34/700 and all four section titles `H2` 17/600, which conforms.

**Every value on the screen renders at 15px**, the brand step: "Maya", "she / her", "Music · Volunteering", "Amelia Maya Johnson", "Mar 14, 2008", the student ID, "Portal". Weight varies between 600 and 700 with no rule behind it.

**Change:** values take `--fs-h`, 17px, at weight 400 for a value the student can change and weight 600 for one the institution owns, so the weight carries the distinction the screen is already making with its grouping. 15px appears only on the sidebar brand line.

This is the same defect found on Housing, where the residence names render at 15px with inconsistent weight.

### C11.4. Two things the screen does that no document had captured

**The screen states its own version.** "PROFILE · VERSION 4 · UPDATED AUG 12, 2026", which ENR-179 acceptance criterion 6 requires and which no document in this series mentions. Keep it.

**It counts what is hers.** "8 of 12 details are yours." That is the clearest single sentence about ownership anywhere in the portal, and it answers the question C1.4 and ENR-179 are both circling. Keep it, and use it as the model for the "3 of 7" fix: a count works when it is followed by what the categories are, and fails when it stands alone as a heading.

---

## C12. What was praised and should not be touched

Recorded so that nobody optimises it away in the next round.

The My Enrollment screen as a whole. The state coverage on Appointments, *"so the developers know how each scenario should look like."* The progress chart. The pagination on My Financials, which was adopted from earlier feedback. And the overall direction: *"this is exactly what I was looking for."*

---

# Part B · Conformance with the backlog

Part B checks each screen document against the ENR backlog. The first five screen documents were written before the backlog was read; only Part A of this document was checked against it. This closes that gap.

## B0. Summary of the conformance review

| Document | Conflicts with a Prioritized story | Gaps the backlog requires and the document misses | Verdict |
|---|---|---|---|
| This document, part A | none | none | it is the correction |
| Health | none | none | send |
| My Degree | 1 | 0 | send with item B2.1 applied |
| My Financials | 1 | 1 | send with items 3.1 and 3.2 applied |
| Housing | 0, one divergence resolved in the screen's favour | 3 | send with section B4 applied, and update ENR-210 |
| Campus Life | 0 | 1, and one invented mechanic to cut | **hold**, see section 5 |
| Appointments | already corrected by the escalation document | 0 | send with the escalation document alongside it |

---

## B1. What the backlog confirms

Before the conflicts, the things the documents got right and can stop being argued about.

**My Degree.** ENR-185 requires that "Degree requirements are the organising unit and courses appear as the way a requirement is satisfied", and that the portal "states where the official record lives". Both are in the screen and in the document. ENR-186 requires that a match "never changes a requirement status, a credit total or a degree progress figure" and that the rule and its confidence are available. That is exactly what the document protects.

**My Financials.** ENR-159 requires that "a pending or unfinalized aid package is shown as pending and never rendered as a zero that looks final". The screen does it and the document lists it as untouchable.

**Campus Life.** ENR-187 requires that content is "the published projection from the staff editor and is never authored here", that mandatory events are distinguishable from optional, that a past event "leaves the browsable set without being deleted", and that an empty section states what produces content. All four are in the screen.

**Housing.** ENR-211 requires that the section "states that a preference is a request and not an assignment". The screen does it better than the story asks.

---

## B2. My Degree

### B2.1. The match must route to an advisor, not only to the Registrar

**Conflict, with ENR-186, Prioritized.**

The document changed the second action on each credit match from "Ask your advisor" to "Ask the Registrar's Office", reasoning that the screen names the Registrar three times as the decider.

**ENR-186 acceptance criterion 6:** *"A route to an advisor is offered from the match."*
**ENR-186 acceptance criterion 3:** the match *"states that registrar or advisor approval is still required."*

The story treats both as legitimate, and the reasoning is sound in a way the document missed: the Registrar decides, but the advisor is who a student talks to about whether a match is worth pursuing at all. Removing that route removes the only person on that screen a student can ask a question to.

**Change:** the match carries **both** routes. "Ask the Registrar's Office" for the decision, and "Ask your advisor" for the conversation. Where no academic advisor is assigned, the advisor route falls back to the enrollment advisor, as the document already specifies for the block itself.

**This does not reverse the block change.** The eyebrow still reads "YOUR ACADEMIC ADVISOR" and the block still names a person. Only the removal of the advisor action is reversed.

**Superseded in part by section 12 above.** The advisor route stays, as ENR-186 requires, and it now starts in Edward rather than as a direct control. Two controls on the match become one that opens Edward with the question written. Nothing in ENR-186 requires the route to be direct.

---

## B3. My Financials

### B3.1. The outstanding-documents block cannot be removed

**Conflict, with ENR-160, Prioritized.**

Item F2 of the document removes the "Documents that need you" block when the only outstanding document is already named in the band, on the grounds that the same task is stated four times.

Two acceptance criteria forbid that:

**ENR-160 acceptance criterion 5:** *"The count shown here matches the count shown on the enrollment checklist for the same documents."* A block that does not render has no count to reconcile.
**ENR-160 acceptance criterion 4:** *"A student with nothing outstanding sees a state that says so rather than an empty area."* The story anticipates the empty case and answers it with a state, not with removal.

**Corrected F2:** the repetition is real and still worth fixing, but by weight rather than by deletion.

1. The band stays and carries the action.
2. **The "Documents that need you" block stays in every state**, carries its count, and reconciles with the checklist.
3. The block's rows lose their duplicate action button. The row states the document, its office, its deadline and its consequence; the action lives in the band.
4. When nothing is outstanding, the block renders a state saying so.
5. The pending loan row on the Financial aid tab still loses its button, as the document specifies. That one is a third occurrence, not the reconciling count.

### B3.2. Deadlines approaching need visual escalation

**Gap, from ENR-160, Prioritized.**

**Acceptance criterion 6:** *"A deadline approaching within a configured window is visually escalated."*

Nothing in the document covers this. The screen shows "Due in 13 days" and "Due in 41 days" in the same treatment, and the shared band carries the nearest one with no urgency marker.

**Change:** an outstanding document inside the configured window takes an escalated treatment on its row and in the band. The window is configuration, not a constant in the design, and the copy states the days remaining as it already does.

**And one thing the document should have cited.** ENR-159 acceptance criterion 2 requires that *"Every figure states whether it is an estimate and what could change it."* Item F5 marks the instalments as estimates but does not say what changes them. The line under the schedule already answers it, "recalculated if your aid changes", and that clause belongs on the marker's tooltip or beside the figure, not only in the block footnote.

---

## B4. Housing

### B4.1. The plan has four answers. The story is what changes.

**Divergence from ENR-210, Prioritized, resolved in favour of the screen.**

**ENR-210 acceptance criterion 1** reads: *"The Housing section asks the plan first: living on campus, commuting, or needing help deciding."* Three values. The screen offers four: living on campus, commuting, arranging my own housing, and needing help deciding.

**This is the one place in this review where the screen wins over the story.** The four are a deliberate product decision, taken since the story was written, and they carry a distinction the three collapse: a student commuting from a family home and a student signing a lease near campus are different for Housing Services. One needs commuter parking and transit information, which the screen already promises in the `send-fails` state. The other needs nothing further from Aster, which the screen also already says.

**Change:** **ENR-210 acceptance criterion 1 is updated to four values.** The screen stays as it is, and item G2 of the Housing document stands as written: the portal's four are correct and the onboarding build spec adopts them.

**What has to move with it,** because the story governs more than the list:

- Acceptance criterion 3 currently splits behaviour between living on campus and commuting. It has to name all four: living on campus opens the ranking, commuting and arranging your own housing do not and say why, and needing help deciding leaves the plan open.
- The onboarding build spec's section 5.4 still states "Three values only." and lists "On campus", "Off campus", "Not decided yet". Both the count and two of the labels change. An existing answer of "Off campus" cannot be mapped automatically, which is what item G2 of the Housing document already handles with a one-time question.
- ENR-211 acceptance criterion 6, about a ranking submitted at onboarding arriving as the current shortlist, is unaffected.

**Until the story is updated, the screen and the backlog disagree in writing.** That is worth doing before this reaches the designer, so that nobody implementing from the story removes an option on purpose.

### B4.2. "Needing help deciding" must route to a person

**Gap, from ENR-210, Prioritized.**

**Acceptance criterion 4:** *"Needing help deciding routes the student to a person and leaves the plan open rather than recording a decision."*

The screen states "Housing Services will help you decide. Your plan stays open." and offers no route. The document did not catch it.

**Change:** choosing that answer opens the route to Housing Services, using whichever escalation path the escalation document establishes. The plan stays open and the housing item stays outstanding with its deadline, which the story also requires.

### B4.3. A residence needs a detail view, not only a card

**Gap, from ENR-211, Prioritized.**

**Acceptance criterion 2:** *"The student can open a residence detail carrying the room, the building and the rates, and can compare residences."*

The document's item G1 adds a published image to the card. The story asks for more: a detail surface with the room, the building and the rates, and a comparison.

**Change:** the residence card opens a detail. G1's image belongs there at full size, alongside the room types, the building, the rates and what each rate includes. The comparison is a second surface and is the natural home for the filters item G10 adds.

**This makes G1 larger, not different.** The image rule and its consent constraints stand as written.

### B4.4. A partial shortlist has a state

**Gap, from ENR-211, Prioritized.**

**Acceptance criterion 9:** *"A partial shortlist of one or two is saved as a partial shortlist and is not presented as complete."*

The document covers the full shortlist and the empty slot, and never the state where one or two are ranked and the student leaves. The story also requires that the housing item stays outstanding in that case.

**Change:** the shortlist states how many of three are ranked, saves partially, and the housing item stays outstanding until three are ranked or the deadline passes.

### B4.5. A cross-screen constraint the Financials document should carry

**From ENR-211, acceptance criterion 8:** *"Rates shown in a residence detail do not contradict the cost shown in My Financials."*

The Financials cost table shows Housing at $12,400 with "Assumes a standard double room", and the Housing catalog ranges from $9,800 to $15,800. The two reconcile today only because the ranked first preference happens to match.

**Change:** item F8 of the Financials document already marks those rows as conditional. It should also state that the figure is derived from the student's current housing answer, and that changing the answer changes the figure. Neither screen should hold its own housing number.

---

## B5. Campus Life

### B5.1. "I'm interested" is not in the backlog and should be cut

**Superseded by section C7 above.** The stakeholder asked for the control directly in the screen walkthrough, and named what the signal is for. The rest of this item is kept because its objection still applies: the control has to say what happens to the signal.

**No conflict, but no support either.**

**ENR-187 acceptance criterion 2** requires only that organisations show *"category, description, a named contact and their latest update."* Nothing anywhere asks for a way to register interest in a club, and no staff story receives such a signal.

Item C4 of the Campus Life document invents that mechanic, including copy describing what Student Life does with the student's name. Nothing in the product does that.

**Change:** cut the primary action from the club card. The secondary action, contacting the named person, stands: it uses the contact the story already requires.

This is the third time in this series a control was specified without its destination existing. It is worth naming as a pattern rather than a one-off.

### B5.2. Events must state how to register, and that is the whole requirement

**ENR-187 acceptance criterion 1:** *"Published events show date, location, category and how to register."*

The screen already states it, as "RSVP by email", "Book a shift" or "No RSVP needed". Item C4 turns those labels into controls, which is more than the story requires and does not contradict it.

**Keep**, with one narrowing: where registration is by email, the control opens a message to the named host. Where it is a booking on an external system, the control links out and says so. Neither invents a mechanic the product does not have.

---

## B6. Appointments

No new conflict. The one that existed, the "ask for a time" feature against ENR-178, is already recorded and corrected in the escalation document, along with the email channel against ENR-177.

**Send the escalation document alongside the Appointments one.** On its own, the Appointments document specifies a feature that a Prioritized story forbids.

---

## B7. Health

No conflict. ENR-205, ENR-208 and ENR-209 line up with the document, and ENR-208 is the reason the accessibility block is untouchable.

**One thing to add if the screen ever shows what happens after a yes.** ENR-212 states that a yes creates a work item for Accessibility Services carrying a contact deadline derived from the start of term, and carrying no condition. That is the fact to show, and it is the answer to what the student is waiting for.
