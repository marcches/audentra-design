# References — ENR-184 Student · Profile

Four searches, `platform: web`, `mode: deep`. The third one decided the hardest part of the card.

## Layout — one row per field, the edit affordance is the distinction

- [Mercury — My Profile](https://mobbin.com/screens/1403417f-b482-40ef-aeec-80b2f63ee800) — **the
  shape we took.** A flat list of labelled fields, value on the right, `Edit ›` under the ones that
  are yours. The distinction between a field you control and one you do not is carried by the
  presence of the affordance, on the row, at a glance — ENR-179 AC 1 without a legend to read.
- [Coinbase — Profile](https://mobbin.com/screens/273d313f-fb94-4501-a3dc-750c852b7394) — the same
  rows, grouped by subject (Contact info / Personal info / Address) rather than by owner. We take the
  grouping: a student looks for "my phone number", not for "the fields the registrar owns", and
  splitting preferred name from legal name into two cards would separate the two halves of one fact.
- [Zoho CRM — Profile](https://mobbin.com/screens/16159ccc-23ac-4d65-9e00-c03d33739c1d) — label-above
  -value pairs in a card. Confirms the density we use inside a row.

## Verification — the state belongs on the label, not on the value

- [Airwallex — Personal details](https://mobbin.com/screens/8db8dc97-bef3-4eb5-9da1-280231b4b768) —
  a `Verified` pill sits beside the field *label*, not beside the value. Taken: it makes verification
  a property of the field, which is what lets `Verification pending` read as a state rather than as a
  broken value.
- [Square — Sign in](https://mobbin.com/screens/2b6f3ac5-f88c-4e75-92b4-d86e25f5ca9d) — **the pending
  state we took.** `Pending verification` in neutral grey next to the label, the value dimmed, and
  `Resend` + `Update` on the row. No red, no alert icon, nothing framed as a failure — exactly the
  card's "pending rather than broken".
- [Airwallex — ID verification](https://mobbin.com/screens/49dd7426-2703-40e6-bea1-42819d9489bb) —
  `Electronically verified` in green beside `Verifying` in neutral lilac. Confirms the colour rule we
  already have: green means settled, and an in-flight state is deliberately not green and not red.

### Rejected

- [Airbnb — Booking permissions](https://mobbin.com/screens/e9adf199-11ef-4600-9ec1-606800bd4c03) —
  an unverified email raises a red banner and a warning glyph on the row. This is the failure mode the
  card names: it reads as broken. Rejected.
- [PayPal — Email](https://mobbin.com/screens/61cc199f-ed5f-4f7d-8921-592debc6aaa8) — `Primary,
  Unconfirmed` as grey subtext under the value. Too quiet to survive a glance; a student reads the
  address as confirmed. Rejected — ENR-179 AC 5 wants it *labelled*.
- [Hims — Profile](https://mobbin.com/screens/71133217-406c-47f7-b52e-e8b3e1038d8e) and
  [Hers](https://mobbin.com/screens/4fdc9593-bb27-416e-a3ce-38aca30e8d53) — one `Edit` button for the
  whole card. Rejected: our ownership boundary runs between the rows of a card, not around it.

## Family permissions — a person, their categories, an end date, a way out

- [Docusign — Shared Access](https://mobbin.com/screens/9b886e71-78a6-4257-8115-8467ed47bf32) — **the
  model we took.** One row per person: status, start date, **end date**, the permissions granted, and
  `Remove`. It is ENR-144's grant — person, categories, purpose, expiry — already drawn.
- [Attio — Permissions](https://mobbin.com/screens/271262c5-f23e-4c7e-ae86-37fc0da01f51) — each access
  level is spelled out in words under its name ("Read only — can only view lists"). Taken: every one of
  our seven categories says what it lets the person see, so a grant is never a word nobody can check.
- [GitHub — Who has access](https://mobbin.com/screens/f33c072d-07fb-4e8b-8198-2e07c436e914) — a
  summary of access above the list of people, and `Remove` on the row. Taken for the rail anchor: the
  standing ("one person, three of seven categories") above, the control in the page.

### Rejected

- [Rise — Permissions to meeting rooms](https://mobbin.com/screens/b279cefb-9f98-47ef-a3eb-578d462b5895)
  — a modal that asks for *more* permissions, arguing for them. Rejected twice over: granting happens in
  onboarding (ENR-190 out of scope), and nothing here should sell a student on sharing more.
- [Squarespace — Permissions](https://mobbin.com/screens/9587cff1-4f65-434c-aaf0-995994568943) — roles
  as one word each (`Website Editor, Analytics, Billing`). Rejected: a role name hides what is actually
  visible, and ENR-144's guardrail is per-category consent.

## Ending the session — say why, then offer it

- [Disney+ — Manage Devices](https://mobbin.com/screens/4d1ef8ae-f245-446c-84d9-de9998be811e) — the
  reason is in the lede ("log out of all devices for added security"), above the control. Taken: ENR-179
  AC 7 asks for the shared-device reason, and it belongs before the button, not after it.
- [Revolut — Device management](https://mobbin.com/screens/a33d51b9-51c6-46f1-b44f-eb4bc6207346) — one
  card, this device, one action. Taken for the shape.

### Rejected

- [Coinbase — Active sessions](https://mobbin.com/screens/387ea5a8-afb4-4315-b74a-e93a1700a244),
  [Airwallex — Login sessions](https://mobbin.com/screens/e45318d2-b981-4533-9375-7093c1edc707) and
  [Pipedrive — Your devices](https://mobbin.com/screens/7ed47d98-c70b-4186-ac34-5a9b8bf02028) — session
  tables with IP addresses and device history. Rejected: a device manager is a screen of its own, and the
  card asks for one sign out with a reason, not a security console.
