# Sidebar — one column, three parts, one left edge

Marco, 2026-08-21: "the sidebar looks inconsistent — paddings, separations, colours, hierarchy —
make it match Audentra's visual language." Not a card; a consistency pass on the shell's left
column. Verified in the browser at 1440 and 390, in ready / loading / error / partial.

## What was wrong (measured on `#/my-enrollment` at 1440)

| Thing | Was | Why it read as inconsistent |
| --- | --- | --- |
| Brand mark | `<AsterMark 44>` inside a 39×43 gradient box with a Georgia font, a raw-hex shadow and a 9/9/15/15 radius | the wrapper was the old letter tile; the mark overflowed it |
| Left edges | mark at x=26, row glyph at 33, group label at 28, avatar at 28, leaf glyph at 60 | five left edges for one column |
| Rows | top-level 46px / 13.5px; leaves 40px / 12.5px, indented 27px behind a guide line | two sizes of one thing; a painted edge on a rounded row |
| Active row | `linear-gradient(purple-soft → purple-wash)` + inset ring | the only gradient-selected control in the product; everything else is flat `--purple-soft` |
| Count | white pill with a raw-hex shadow, `--purple` text | raised, on a flat column; invisible on a rest row |
| Group toggle | fine type, chevron 15px (auto-bold) while the chip chevron is 16px regular | two chevrons |
| Foot | hairline on the profile chip; chip radius `0 0 12 12`; Help floats with no separation from the list | the divider was on the wrong element |
| Powered by | `text-align:center` + block svg → wrapped onto three lines; "Audentra" in `--purple-hover` | broken, and a hover colour at rest |
| Width | `254px` typed in `.sidebar` and again in `.workspace` | a layout constant with no name |
| Motion | `transition: all .18s` | raw duration, no token |
| Error | amber tile, hand-typed button | the contract says crimson is a panel that failed, and a button is `<Button>` |
| Split | `.profile-chip` defined in chrome.css *and* navigation.css; row rules across both | position decides ties |

## References (Mobbin, web)

- Remote, Homerun, Twenty, Magnific, StackAI — a caps group label sits above its rows at the
  rows' own left edge; rows under a label are the **same row**, not indented, not smaller.
- Whop, Homerun, Magnific, Twenty — the active row is one flat tint, no gradient, no ring.
- Charma, Reddit, Otter — profile at the foot: avatar, name, a second line, a chevron that points
  where the link goes.
- Fibery, Twenty — a count is a small flat chip at the row's right, not a raised pill.
- Salesforce, Fibery — the guide-line tree is for real children (Emails under Accounts), which
  ours are not: Overview / Financial aid / Payments are siblings under a heading.

## The contract

**One left edge.** Sidebar padding `--space-9`; every part pads `--space-5`; so the brand mark,
every row's glyph, every group label, the Help glyph and the avatar start at the same x.

**The brand row is `--topbar-height` tall** — the mark (40, the `md` avatar size) sits on the
same centre line as the topbar's controls across from it. No wrapper, no gradient, no shadow.

**One row.** `--control-height` tall (the shell's one control height), `--radius-tile`,
`--fs-h4` semi, glyph 18 regular → fill when active. Rest `--ink-2`; hover `--ink` on
`--canvas`; active `--purple-dark` on `--purple-soft`, flat. Top-level and group rows are the
same row; the group label above them is the hierarchy.

**A count** is a flat pill: `--purple-ink` on `--purple-soft`; on the active row it inverts to
`--purple-dark` on `--surface`. `--fs-meta` heavy.

**A group** is a caps eyebrow button (`--fs-small` heavy `--ls-caps`, `--muted`; `--purple-dark`
when it is closed over the page you are on) with a 14px chevron that rotates; `--space-6` above
it, `--space-1` to its rows. Closed by default; the one holding the page opens.

**The foot** is separated from the list by the one hairline; Help is a row; the profile chip is
a row with an avatar (`--radius-tile`, same hover and active as a row, chevron pointing right);
the vendor line is `--faint` with the name in `--muted`.

**Motion** is `--dur-fast var(--ease)` on colour and background only.

**Loading** mirrors the list's anatomy (glyph + word per row, a short eyebrow between blocks) so
loading → ready is a fade. **Error** is `StateCard` in its `compact` size, crimson, with a
secondary "Try again". **Partial** is one muted line under the list.

**Tokens added:** `--sidebar-width` (254), `--topbar-height` (70).

**On the styleguide:** `NavItem`, `NavGroup`, `ProfileChip`, `NavSkeleton` — rendered in a
sidebar-width specimen with the brand row and the foot.
