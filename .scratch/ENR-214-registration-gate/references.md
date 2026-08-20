# References — ENR-214 Registration gate

Mobbin research for the checklist row that says *this one will stop you registering for classes*.
Two searches per `docs/agents/design-workflow.md` §2 — one for the layout, one for the hard part.

The hard part here is **AC6**: a requirement that has been submitted and is in review must read as
*pending*, not as *met*, and the gate has to stay in place while it is. A screen that renders
"submitted" as a green tick teaches the student the gate is lifted when it is not.

---

## A. Layout — a checklist that names what an item blocks

- [Oyster — onboarding home](https://mobbin.com/screens/50fd50d0-ccb6-45f0-9779-6c5b8dcb1fe1) —
  **the layout we take.** A numbered checklist where one row carries a `Pending` chip on the trailing
  edge and its description says who it waits on: *"Your employer will share the contract with you to
  sign."* Above the list, one banner states the consequence once — *"we need you to verify your
  profile"* — with the route inline. Consequence stated once at the top, marked per row below. That
  is ENR-214 AC1 and AC2 without a new component.
- [Customer.io — workspace setup](https://mobbin.com/screens/b9bde54a-06d4-4204-9645-b5bc94694684) —
  the top banner names both the state and the demand: *"We're reviewing your account, but we need
  additional information. **Action required** to verify your account."* We take the two-clause
  sentence: what is happening, and what it needs from you. Our version has to add the third clause
  ENR-214 AC2 requires — *by when*.

### Rejected

- [Whop — "You're missing a few things"](https://mobbin.com/screens/11c1db5a-5a81-4f39-8722-de70adf6a925)
  — the unmet list in a modal with an *Understood* button. Rejected: a gate is a standing condition,
  not an interruption you dismiss. The student has to be able to come back to it.
- [Docusign](https://mobbin.com/screens/1974d3a6-8020-40df-bf6c-ad3d16b8923a),
  [Google Workspace](https://mobbin.com/screens/05a829a2-525b-4a6e-911a-f4d5e2e5b9ce) and
  [Navan](https://mobbin.com/screens/8c9e47c7-dc7e-4ee5-9658-9a9b80b925e3) — illustration-led setup
  checklists where every row is equally cheerful. None of them can express that one row is different
  from the others, which is the entire card.

## B. The hard part — in review is not met

- [Airwallex — verification](https://mobbin.com/screens/5b2e67a8-ded8-496b-80f0-d2aa8ab4ae03) — **the
  reference that settles AC6.** A three-stage track: `Sign up · Completed` → `Verification · In
  review` → `Activation · Pending`. *In review* and *pending* are two different words on one line,
  and the third stage is visibly the thing that is being held. We take the vocabulary: the
  requirement is *in review*, the thing it gates is *pending*, and neither is *done*.
- [Mercury — application](https://mobbin.com/screens/2a7de612-6f88-42d7-bce5-1d8fe2219314) — the
  checklist greys out and a card says *"We're waiting for information from beneficial owners… **No
  action is needed on your end** — you'll be able to continue after they submit."* Beside it a
  timeline rail names the current stage. We take the sentence that tells the reader they are not the
  holder — the same holder principle `CONTEXT.md` already carries, and the thing that stops a student
  refreshing a page waiting for themselves.
- [Contractbook — signature status](https://mobbin.com/screens/4df1e4a6-5907-4cd8-a9a9-3b54c111bde7)
  — a `Pending` chip in the header and a per-party panel with its own state chip. We take the idea
  that the gate's state and each requirement's state are two different readings, shown separately.

### Rejected

- [OKX](https://mobbin.com/screens/56aafe11-2b76-4cc6-a2ba-102d35d3b0d1),
  [Binance](https://mobbin.com/screens/97ad290a-c321-47d8-b0db-ea024212c8a9) and
  [Coinbase](https://mobbin.com/screens/085df375-3abc-468b-8a1c-e81937f76696) — full-page *Under
  review* screens with a spinner or an illustration and nothing else. Rejected twice over: the
  checklist has to stay usable while one requirement waits, and this repo draws no illustrations.
