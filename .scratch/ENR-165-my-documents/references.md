# References — ENR-165 My Documents

Two research passes, merged. The first walked the screen as a loop — *send it*, then *find out what
happened to it* — and is organised by the four moments of that loop. The second went after the two
regions the loop does not cover: how the record reads once nothing is in flight, and the extraction
review the card's design brief asks for by name. Nine searches in all, `platform: "web"`,
`mode: "deep"`.

## 1. Stating the requirement before asking for a file (ENR-157 AC 1, AC 2)

- [Fiverr — upload your video](https://mobbin.com/screens/d55233e8-9f58-4207-a753-62df04cc3a8e) —
  the requirements are a list *above* the dropzone (length, resolution, aspect ratio, max size), the
  zone itself repeats the accepted extensions, and the refusal is a red line directly under the box.
  **Taken whole.** This is AC 1 and AC 2 in one layout: nothing is learned only from an error.
- [Deputy — upload documents](https://mobbin.com/screens/b55fd7dc-f194-40b1-b2a0-7a7645f37a63) —
  limits stated *per format* before the picker opens (`MP4: max 500MB`, `JPEG/PNG/PDF: max 20MB each`).
  **Taken:** our limits differ per requirement, so they are printed from the requirement, not global copy.
- [Airbnb — choose an ID type to add](https://mobbin.com/screens/cf932f55-63ac-4881-a2b8-5d16c73a3bb2) —
  what is accepted, *and* the privacy boundary in the same breath: "Your ID will be handled according
  to our Privacy Policy and won't be shared with your Host or guests." **Taken** as the model for the
  epic's "stated encrypted storage boundary".
- [Cohere — data requirements](https://mobbin.com/screens/e3a7e3a8-4318-4113-9b55-cd8dec4249b7) —
  the chosen file shows name + size + a remove control, and the requirements panel beside it turns red
  on the specific rule that failed. **Taken:** the refusal names the rule, never just "invalid file".
- [PayPal — upload documents](https://mobbin.com/flows/ba094997-f9e7-4f00-bdd3-a233be700bb8) —
  the same three moves in one control: what the document must *show* stated before the field ("shows
  your full legal name and date of birth… all corners visible"), formats as a quiet line under it,
  and on refusal that same field turns crimson with the reason on the same line, the offending file
  still on screen with a way to remove it. **Taken** as the confirming case — no modal anywhere.
- [Glassdoor — resume didn't upload](https://mobbin.com/screens/bfbc8fe8-732e-4735-b244-5dc071120a0a)
  — **taken for one distinction.** It offers `Upload another file instead` *and* `Try again` as
  separate buttons. Retrying a send and replacing a file are different intentions, and ENR-157 AC 6
  turns on not conflating them.

## 2. Carrying on while it processes (ENR-157 AC 3 — the whole point of the card)

- [Airwallex — ID verification](https://mobbin.com/screens/49dd7426-2703-40e6-bea1-42819d9489bb) —
  a banner at the top of the step: *"Verification in progress, you can continue to verify the others
  (if any)…"* with a spinner, over rows chipped `Verifying` / `Electronically verified` and a trailing
  eye to view what was sent. **Taken whole.** This is the card's sentence, drawn.
- [Airbnb — Trips, after submitting](https://mobbin.com/screens/d3a8ceec-6af8-4f17-8e78-a9526936ac10) —
  the strongest reference in the batch. Before: an amber banner asking her to verify. After: the same
  slot turns informational — *"We're reviewing your ID. Your reservation is still pending until this is
  complete—we'll email you an update within one hour."* The action link **disappears**. **Taken:** this
  is ENR-158 AC 4 and AC 7 as one move — in review names who holds it, gives a timeframe, and stops
  asking.
- [Perplexity — files tray](https://mobbin.com/screens/02d41e9b-745a-4bd4-8e7f-89b0434acdd1) —
  `Queued` as a status in the row and `Uploading 0 of 1 files…` on a progress bar at the foot.
  **Taken:** the in-flight state belongs on the row, not only in a toast that vanishes.
- [Binance — uploading a document](https://mobbin.com/flows/7bb0553d-5ae1-4183-bd28-4a38c23af034) —
  `Save and Exit` pinned in the corner of every step. The same permission as Airwallex's banner,
  offered as a control instead of a sentence. **Noted, not taken:** our student leaves by navigating
  away, and a portal that needs a Save button to allow that has already lost.

## 3. The four states, told apart (ENR-158 AC 1)

- [7shifts — submitted documents](https://mobbin.com/screens/ac1f85b7-b95d-4361-a5d8-025bfe8951cc) —
  document name on the left, one state pill on the right, nothing else. **Taken:** the row's anchor is
  the document; the state is the value column. Rejected: each row as its own floating card — ours are
  `.card-rows` on one card's white.
- [Docusign — all agreements](https://mobbin.com/screens/9889eedc-56fc-4b8c-bd60-3234a55a79a7) —
  the status column says *who is being waited on* ("Need to sign" vs "Waiting for Alex Smith") over a
  thin progress line, and the trailing button changes with it (Sign / Resend). **Taken:** the state
  names the holder, and the row's action is a function of the state — a row with nothing for the
  student to do carries no button at all.
- [Revolut Business — verify details](https://mobbin.com/screens/92e54678-09da-479f-8d03-baa0ae45ad12)
  — **taken, and it decided the grouping.** Rows are grouped by *who owes the next move* (`Requests`
  vs `Key corporate personnel`), the state is the **subtitle of the row** rather than a pill floating
  right, and only the rows that need the student carry the alert mark on the icon tile. A pill on
  twelve rows is texture; a line that changes per row is information.
- [Vanta — documents](https://mobbin.com/screens/7604dc30-f8bd-4e4a-9d84-bf4b870eb967) — **taken for
  colour only.** Three states, three colours: crimson `Needs document`, amber `Needs update`, green
  `OK`, with the overdue date also crimson. Maps onto our tokens with nothing invented — crimson for a
  deadline, amber for someone still has to act, green for satisfied.
- [Slite — knowledge management](https://mobbin.com/screens/290fe23a-5d4a-4361-977c-1fbeef9c2f40) —
  counted status chips as a filter bar across the top. **Rejected:** four counters is a dashboard, and
  this section has one figure. The count that matters goes in the summary panel and the rail anchor.

## 4. A rejection that leaves a route forward (ENR-158 AC 2, AC 3 — the epic guardrail)

- [OKX — verification unsuccessful](https://mobbin.com/screens/c81afdfb-0caa-4e1e-8276-13914d0b1934) —
  the best of the set. The specific reason ("The address you provided doesn't match the one on your
  proof of address"), then exactly what would satisfy it (a PDF or photo showing unit number, street,
  city, postal code, dated within 3 months, no P.O. boxes), then one button: **Try again**. Reason →
  remedy → route, in that order. **Taken whole**, as the shape of `changes requested`.
- [Uvodo / Stripe Identity](https://mobbin.com/screens/3b3536ad-f788-4718-a0ed-3a6e3c07bfae) —
  the reason plus a "For best results" list and *two* ways forward. **Taken:** when the office is the
  better route, the drawer offers it beside the re-upload rather than instead of it.
- [Stripe — ID verification, information required](https://mobbin.com/screens/0da270e9-0831-44ad-8bd5-ff15a0cefc23)
  — **taken** for where the reason sits: a crimson-tinted panel at the *head of the record*, with the
  rest of the panel untinted. One washed block per card is this repo's colour rule, arrived at here
  independently.
- [Upwork — try again after reviewing our tips](https://mobbin.com/screens/790aed80-c659-4982-8cde-ddf209da6f4c) —
  states the reason, then sends the user away: **"Retry from Settings."** **Rejected, and it is the
  anti-pattern the card names** — ENR-157 AC 6 and ENR-158 AC 3 require replacing a document *where it
  was rejected*, without restarting the requirement.
- [Hims — your ID photo is likely to be rejected](https://mobbin.com/screens/725b57fa-767d-4c16-be89-c0071435df78) —
  caught *before* submitting. **Taken in principle:** everything we can check on the student's own
  machine (format, size) is refused before the upload, never after it.
- [Revolut Business — account restricted](https://mobbin.com/screens/345527ab-1a18-47b7-8a80-58e3b814540c) —
  the consequence of not submitting is stated on the page the student is already on. **Taken:** our
  rows carry what the document holds up, the way `.doc-consequence` already does on My Financials.

## 5. Reviewing what was extracted, without confirming it by silence

The design brief on ENR-165 asks for this by name: *"Extraction results shown for review must invite
correction rather than approval by default."* It is also the one épico guardrail with no existing
surface anywhere in this repo.

- [QuickBooks — uploaded receipt / review details](https://mobbin.com/screens/13555932-4086-4811-a214-0deccbce373d)
  — **taken for the layout.** The file on one side, the extracted values on the other as *real,
  editable inputs already filled in*, under the line "Double-check the details and add any missing
  info." Editable fields rather than read-only text beside an Approve button is what "invite
  correction" means in layout terms.
- [Revolut Business — receipt match](https://mobbin.com/screens/1180d5ee-a7bc-45f2-bb0f-03a09b51859a)
  — **taken for the framing.** The machine's answer is marked as the machine's (`Match found`, with a
  sparkle; `Info required`) and the student's action is `Confirm match`. The guess never presents
  itself as a fact.
- [Mercury — reimbursement review](https://mobbin.com/screens/8156ac94-1476-4ca2-801e-89444dd78545)
  — **rejected, and it is the anti-pattern.** One `Approve` for the whole extraction, with the
  consequence explained only in a hover tooltip. That is approval by default with an extra click.
- QuickBooks is **also partly rejected**: its `Save and next` is live from the first frame, so a
  student who reads nothing still saves everything. We take the two-pane layout from it and refuse
  the silence — every extracted field is decided on its own before the submit unlocks.
- [PandaDoc](https://mobbin.com/screens/84f40264-964a-4a0a-8e9a-fc1ea47342c6),
  [Docusign — field builder](https://mobbin.com/screens/e6685743-f6da-48ec-91af-4454381f1e63),
  [Dropbox](https://mobbin.com/screens/72edd4f8-a6ab-481f-b797-59c5a4f7b879),
  [Zillow](https://mobbin.com/screens/3881291a-7f10-438a-8bc7-7c47ed187a76) — **rejected.** Field
  *builders*: someone places a signature box onto a template. The author, not the subject.

## 6. Documents Aster sends *to* the student (the nav's second promise)

- [Gusto — documents](https://mobbin.com/screens/e74f522b-aab3-40de-bb2f-0b6cd895f2b9) — **taken, and
  it removed a whole card from the design.** One list holds both directions, and the *caption under
  the name* says which way it went: `Uploaded document` vs `Employer provided document`. That is how
  the sidebar's promise — "everything you have sent Aster, and everything Aster has sent you" — is
  kept without a third card saying the same thing twice.
- [Origin — estate planning documents](https://mobbin.com/screens/8be11108-cfc3-4db1-a582-5a0bf9d9c74f)
  — **taken.** Quiet mono captions label each *run* of rows, and the chip appears only where it means
  something. Exactly this repo's rule: mark the exception, label the run once.
- [Cake Equity — documents](https://mobbin.com/screens/57e1bb7b-2e69-4a72-bb3d-f35f4a6cb513) —
  quiet list on the left, preview of the selected file on the right, a small tag per row. **Taken:**
  the inbound rows are read-only and visually quieter than what sits above them.
- [PayPal — statements](https://mobbin.com/screens/64c0ed49-09e6-4881-a421-04f12f85a542) and
  [Gemini — statements and history](https://mobbin.com/screens/dc5ae6d8-4aa1-4bd0-b4be-7fcfde267f23) —
  a row is a name, a date and one trailing action. Gemini adds an info banner scoping what you are
  looking at. **Taken:** one trailing action, nothing else. Rejected: grouping by year and the
  custom-statement generator — this student has six documents, not six years of them.

## Rejected for the page as a whole

- [Deel — documents requested by Deel](https://mobbin.com/screens/770406b8-d07b-4038-9853-6b2faf76b9bc),
  [Aboard](https://mobbin.com/screens/d6a6ad47-6520-44f4-af42-41feb0a611de),
  [Remote](https://mobbin.com/screens/2deb95e6-3ad7-4584-8ef4-097d1561f1ac),
  [Wrike](https://mobbin.com/screens/6b7f0d21-65bc-488c-9a48-c53769e7d2fd) — all four are the
  administrator's view: a sortable data table, per-category progress bars, a row per *worker*. That is
  ENR-59/ENR-60, the staff side of this épico. A student has six documents, not six hundred, and a
  table is the wrong instrument at that size.
- Deel's tab row (`Requested by Deel` / `Custom documents` / `Registration & files`) — in this repo
  `tabs` is a `PageShell` slot reserved for the leaves of a *group*, and My Documents is a single
  destination. Tabs would also let a rejection hide behind one nobody opened, which is the failure
  `docs/agents/design-workflow.md` already records against My Financials.
- [Coinbase — complete account setup](https://mobbin.com/screens/db265d81-747e-49f8-b1ae-b79729c94528)
  — a linear numbered wizard with a time estimate. My Enrollment already *is* that checklist; My
  Documents is where you come afterwards to find out what happened.
- [Eventbrite](https://mobbin.com/screens/317c039d-9b52-4435-99b7-bfd6cc498a53),
  [Pinterest](https://mobbin.com/screens/92465343-1e44-4584-ab91-ecd177cf858d),
  [Navan](https://mobbin.com/screens/47d724d8-d0bd-474b-a27d-59ee275c55fd) — modal dialogs over an
  upload failure. A modal makes the error the only thing that exists, which is the opposite of "carry
  on with something else", and Navan's prints nineteen identical parser lines at the user.

## Flows

- [Airbnb — verifying an identity](https://mobbin.com/flows/532a5f54-d0ab-41b1-bd38-442747ecb9c8) (15 screens)
- [Revolut Business — submitting proof of identity](https://mobbin.com/flows/55d0b6c4-c006-4452-823b-401ab71d1463) (6 screens)
- [Airwallex — verifying ID](https://mobbin.com/flows/4ddfb2ef-818d-416c-b963-1dedf5c91aa9) (7 screens)

All three put the *outcome* back on the page the student came from rather than at the end of a
wizard. That is why My Documents has no wizard: the drawer does one thing, and the answer is always
on the page.
