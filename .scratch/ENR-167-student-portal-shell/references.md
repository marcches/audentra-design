# References — ENR-167 Student portal shell

Mobbin, `platform: web`, `mode: deep`. Two searches: the overall nav layout, and the hard part named
in the card's design brief — "navigation, notifications, points and the route to a person compete for
the same corner".

## Layout — a long section list that stays scannable

- [Circle — community home](https://mobbin.com/screens/afde5712-b2c0-4fc1-be7b-4ac42446d642) — flat
  rows with a 27px icon well and a count badge riding on the row itself, not a separate column. We
  take the count-on-the-row treatment; our `.nav-count` already does this and now carries the open
  requirement count on **My Enrollment**.
- [Reddit — notifications](https://mobbin.com/screens/3a974012-b019-4a09-9f50-ca7a69cbfec0) — muted
  uppercase group headers break a long nav into three or four blocks. Held, not taken: see Rejected.
- [Uxcel — home](https://mobbin.com/screens/fd18dfba-a969-4c35-90e9-561b75fe6dd6) — `LEARN` / `GROW`
  headers over the nav, and the reward balance (750 coins) parked in the **top bar**, away from the
  section list. Confirms the split we already have: points live in `.progress-panel`, never in the nav.

## The hard part — notifications, points and the person in one corner

- [ClassDojo — classroom](https://mobbin.com/screens/3433ce40-d2e9-45ab-923e-88ab85ff69f8) — the top
  right is four small icon buttons of equal weight (shield, bell, help, avatar) and the points event
  is rendered in the page body, not in the chrome. This is the card's guardrail as a layout: *points
  are a reward and never a distraction from an overdue requirement*. We take it — `.topbar-actions`
  keeps help, notifications and avatar, and no balance is added to it.
- [Lovable — workspace](https://mobbin.com/screens/40307b85-7631-424f-8aff-089d9216326c) — the bell
  carries a small numeric badge and the credit balance is one click away in a popover instead of
  standing permanently on the bar. We take the restraint: our unread count stays a badge on the bell.

## Rejected

- [Reddit's](https://mobbin.com/screens/3a974012-b019-4a09-9f50-ca7a69cbfec0) grouped headers, for
  now. Six sections still read fine flat, and the Jam is explicit that spacing does not change
  ("mantém o espaçamento, isso não muda"). Revisit when the two unnamed sections land and the list
  reaches eight.
- [Teachable — my schools](https://mobbin.com/screens/6a15e96c-6baf-49ed-8cc1-3e564b8d8b78) — puts the
  identity block (avatar, name, email) at the **top** of the sidebar, above the nav. Our profile chip
  is at the bottom and the institution is at the top, which is the right order for a portal a student
  visits as a guest of the institution rather than as the owner of the workspace.
