Jira: ENR-90 (Staff · Executive operational view — the base screen) and ENR-82 (Staff · Task detail — the
     stakeholder's reference, redrawn). No new card was opened; this is a brief, not a build.
Status: delivered (2026-08-21) — waiting on the stakeholder's reply
Labels: design, persona-executive, persona-staff, screen-morning-brew, screen-task-board
Jam: (none)
References: none — Marco declined the Mobbin step for this board (2026-08-21); the reference is the
     stakeholder's own two screenshots (WhatsApp, channel `audentra-product`, 2026-08-21 15:47)
Deliverable: `board/index.html` — open it; no server, no build, no network. Shows the task detail
     only; the Morning Brew draft is kept behind `?s=brew` and has no control on the board (Marco, 2026-08-21)

# Staff portal — the visual direction, offered as three directions

## 1. What this answers

Before the staff portal's repository exists, which visual language it is written in. The
stakeholder sent two screenshots of what they have in mind — an advisor's task detail
(*Follow up: Unaccepted Financial Aid Package*) and a four-tab montage with their principles
written under it: *"Clean, focused views per step in the workflow; Right panel shows essential
context at all times."* This brief turns that into a choice they can make by looking: **the same
two screens in three skins**, one HTML, switchable in place. They reply with a letter and what they
would keep from the others; that answer, plus the borrowings, becomes the staff repo's
`tokens.css`.

## 2. The grilling — decisions, with the recommendation taken on each

Two rounds, every question settled by the recommendation. Flip any one by editing the place named.

| # | Decision | Settled as | Where |
| --- | --- | --- | --- |
| 1.1 | Is the page's structure part of the choice? | **No — invariant.** Sidebar, breadcrumb row with the page's actions, title with its mark and facts, tabs per step, right rail always in view. Directions differ in skin, never in bones. | `board/css/structure.css` |
| 1.2 | How many directions, and which theses | **Three.** A *Faithful to the reference*; B *The student's family*; C *Editorial* (what ENR-90's brief asks for, read literally). Teal from the brand book is not a direction. | `board/css/tokens.css` §3, `board/js/board.js` THESIS |
| 1.3 | Which screens | Drawn: ENR-90 *Operational health by division* and ENR-82 *Task detail · Outcomes*. **Shown: ENR-82 only** — Marco, after seeing both (2026-08-21): the stakeholder asked for that screen and the board should show the variations on it and nothing else. ENR-90 stays in the file, hidden, reachable by `?s=brew` for us. | `board/index.html`, `board/js/board.js` |
| 1.4 | Which brand the staff portal wears | **Audentra in the chrome** (the mark in the sidebar, as the screenshot shows); Aster appears as data — names on records, never in the sidebar. Accent stays purple; teal stays out of the product UI. | sidebar markup; `tokens.css` `--accent` |
| 1.5 | Typography — an axis or a constant | **Constant: Geist in all three**, vendored. Satoshi only if it becomes a licensed decision. | `board/css/fonts.css` |
| 1.6 | Delivery | Self-contained folder, one index. **One floating control and nothing else over the screen:** A · B · C, and a full-screen toggle that drops the stage and makes the screen the window (sticky sidebar, fluid main) so it reads as the working product; the browser's own full screen on top when it allows it. Keys `1 2 3`, `f`, Esc. `?d=&full=1` is the state. Originally an Artifact link with a thesis strip and a three-up compare; Marco cut it to this on 2026-08-21: *"só algo pra trocar de versão, e abrir em tela cheia como se fosse de fato funcionando."* | `board/` |
| 1.7 | Fidelity and content | Static, hover/focus painted, buttons inert. Content faithful to the cards, not lorem ipsum. | `board/index.html` |
| 1.8 | Where it lives; the new repo | Here, under `.scratch/`, as the founding document of `audentra-staff-design` — same stack and role as this repo (React 19 + Vite, plain CSS, no TS; a product base that informs `Audentra-portals`). Sharing `tokens.css` as a package vs forking is decided **after** the direction is chosen. | this file |
| 1.9 | How the stakeholder answers | *"Reply with A, B or C, and anything you'd keep from the others."* Mixing is allowed and expected. | `board/index.html` footer |
| 2.1 | The concrete values per direction | The table in §3, as proposed. | `tokens.css` §3, `direction-*.css` |
| 2.2 | Colour meaning | **Invariant, the product's:** green = done / better for the student; amber = someone has to look; crimson = a deadline or a failure; purple = the action. **Priority is ordinal:** glyph + word in ink, crimson only when an SLA is breached. | `structure.css` `.pill`, `.fig` |
| 2.3 | How AI-produced content is marked, and its name | **Mark invariant and sober:** a glyph + the word in the card head, same surface, no gradient. **The mock keeps the reference's labels** (*AI Summary*). *"AI" vs "Edward"* on the staff side is a product decision to take with the stakeholder, recorded in §6. ENR-90 carries the opposite mark — *basis*, *canonical*, rule and period — because the Morning Brew is counted, not generated. | `index.html` cards 3–5; §6 |
| 2.4 | *Task* in the glossary | **Added:** *Task (staff)* is the staff workspace's unit of work, a different object from the student's *Step*. | `CONTEXT.md` |
| 2.5 | Which screen leads; which sidebar | ENR-90 leads. The sidebar is **the screenshot's list** (My Work, Team Work, Core Plays, Students, Communications, Reports, Calendar, AI Insights, Knowledge Base, Settings) plus *Morning Brew* at the top, because the board has a Morning Brew and the list did not. Illustrative; the mapping to the board's screens is in §5. | `index.html` `.sb-nav` |
| 2.6 | Delivery detail | ~~Thesis in three lines per direction, on the board~~ — cut with 1.6; the theses live in §3 of this brief. Stakeholder named by role until Marco gives the name. | §3, §7 |
| 2.7 | Which tab of the task; the internal/student invariant | **Outcomes**, as in the full-resolution screenshot, plus the one thing ENR-82's brief demands and the screenshot lacks: *what reaches the student and what is internal never look like the same surface*. Card 5's two actions carry it — *Reaches Maya* vs *Internal* — and each direction resolves it in its own language. | `index.html` card 5; `direction-*.css` `.action-group` |
| 2.8 | ENR-90, not ENR-196 | The mock is the **operational view by division** (delta headline, absolute under it, period stated, a figure out of season absent, a division with insufficient data saying so, a blocked figure visible where it would have been, four insight states, basis one step away, no assignment control) — not the daily read that already exists in preview. | `index.html` screen 1 |
| 2.9 | Division vs Office | **One division per office**, each with a named director; the executive's word for the team the student calls an office. Added to the glossary. | `CONTEXT.md` |

## 3. The three directions — one palette, one set of bones

Everything that differs is a token on `.screen[data-direction]`; nothing that differs is written
anywhere else. The palette is the product's (`src/styles/tokens.css`, layer 1), verbatim.

| Axis | **A · Faithful to the reference** | **B · The student's family** | **C · Editorial** |
| --- | --- | --- | --- |
| Sidebar | ink `--ink-800` (the screenshot's navy), white mark, active = white on `#ffffff14`; 224px | glass `#ffffffeb` + hairline, active `--purple-soft`/`--purple-dark`, colour mark; 254px | white, hairline right, 32px items, active = weight + a dot, ink mark; 208px |
| Canvas | white | `--ink-25` | white, **rules** instead of boxes |
| Card | white + `--ink-150` hairline, **10px**, no shadow, head = tinted glyph + "1." | white on canvas, **18px**, `--shadow-card`, head and foot zoned `--ink-50`, bare outline glyph | **no box:** rule above, head in 11px caps with a mono "01" |
| Rail | cards | **first card is the anchor card** on ink→purple | a ruled column |
| Accent | primary solid purple; links, active tab, title tile | same + **gradient primary**; pill tabs | links and the primary only; tabs underline in ink |
| Status | filled pills (tint + line) | same, smaller and bolder | **dot + word**, no pill |
| Type | Geist 14 body · 24 title · 16 card head | the portal's scale: 12.5 · 25 · 15 | 13 body · 28 title · 11 caps heads · **Geist Mono** for every figure |
| Density | card pad 20, gap 16, rows 44 | pad 18, gap 16, rows 40 | pad 0, rules, rows 34 |
| Icons | Phosphor regular 20 in tinted tiles | **duotone** in tinted tiles (the product's rule), regular elsewhere | regular 16 inline, no tiles |
| Figures | delta + a 3px trend bar | `SummaryFigure`-sized delta, 27px | **delta first, mono**, ▲▼ in the status hue, no bars |

Three things the stakeholder should notice (they were on the board as each direction's thesis; the board now shows only the switcher, so they are said here and in the message that sends it):
A's navy *is* the product's ink, so A and B are relatives; B is the only one whose tokens already
exist; C is the only one that makes a five-minute brief read like one.

## 4. What the board shows — and why those exact states

**Screen 1 — ENR-90** (drawn, hidden; `?s=brew`), Aster, Fall 2026 cycle, read at 7:02 AM ET on Aug 21, 2026, Aug 1–20 vs
Jul 1–20. Six divisions × *throughput, capacity, service performance*. The states the stories
name, each present once:

- change as the headline and the absolute subordinate (ENR-72 AC3, scenario 6) — every cell;
- the comparison period and the definition stated (AC6, AC8) — title chips, column heads, foot;
- a figure out of season **absent**, and listed in the rail as not shown (AC4, scenarios 3–4) —
  *Deposits posted*, Admissions, until Nov 1;
- a division with insufficient data **saying so** rather than showing zero (AC7) — Student Health
  Services, 9 of 30 records;
- a blocked figure visible where it would have been, no fallback (ENR-78 AC4–5) — *Transcript
  turnaround*, rule RG-SVC-01 withdrawn Aug 14;
- the expansion to basis one step away and not a page (ENR-76 AC6, ENR-90) — the ruled line under
  Financial Aid's service figure: rule, version, effective date, record count, source, *Trace the
  records*;
- insights in four states (ENR-74): **new**, **changed** (what changed, since when), **carried**
  (day 7, "carried 2 of 5", *Set aside for me*), **resolved** (shown once);
- no assignment, reassignment or task control anywhere (ENR-72 AC5) — the only verbs are *Ask*
  and *Trace*;
- the Morning Brew's own disclaimer, from the preview that exists: counts of canonical records,
  nothing modelled, projected or generated.

**Screen 2 — ENR-82 · Outcomes** (the one the board shows). The screenshot's five cards and four rail cards, copy kept,
names Aster's: the student is Maya Johnson, the advisor is Amara Nwosu (Financial Aid Office — the
task is about an aid package), both from `public/people/`; directors get initials because no
photo is on file, which is the product's rule. Dates moved to 2026 so both screens are one world.
Priority is a glyph and a word in ink, not red (§2.2). Card 5 carries the guardrail (§2.7).

## 5. The sidebar, mapped

The list is the screenshot's. Against the board's 23 staff screens: My Work ≈ Today + Task board;
Team Work ≈ Team view; Core Plays = Core plays; Students = Students; Communications ≈ Messages;
Reports — no card; Calendar — no card; AI Insights ≈ Edward (staff); Knowledge Base = Knowledge
base; Settings ≈ Institution setup. *Morning Brew* was added because ENR-30/ENR-191 exist and the
list had nowhere to put them. The staff IA is its own decision, not this board's.

## 6. Decisions this board deliberately does not take

- **"AI" or "Edward"** as the name on staff screens. The product has a named assistant and the
  staff preview already has `staff-edward`; the stakeholder's screens say "AI" everywhere. Decide
  with them, once, before the first staff card ships copy.
- **Tokens shared or forked.** If B wins, `tokens.css` wants to be a package both repos import; if
  A or C wins, the staff repo forks the palette and diverges in the roles. Decide after the reply.
- **The staff IA** (§5) and the nav labels.
- **Edward on the Morning Brew** — the preview shows him as a slide-over, never inline; the board
  does not draw him.

## 7. Who decides, and how the answer comes back

The stakeholder (product side, via the WhatsApp channel `audentra-product`; name to be recorded —
Marco to supply) replies with **A, B or C, and anything they'd keep from the others**. Mixing is
expected: the final direction is the chosen one plus the named borrowings, and that is what the
staff repo's `tokens.css` is written from.

## 8. Files

```
.scratch/brief-2026-08-21-staff-visual-direction/
  spec.md                      this brief
  board/
    index.html                 the board: the switcher, the two screens (task shown, brew hidden)
    css/fonts.css              Geist + Geist Mono, @font-face (OFL, vendored)
    css/tokens.css             palette (the product's) → shared roles → three directions
    css/structure.css          the bones: layout and components, token-only
    css/direction-a.css        what A changes beyond tokens (numbered heads, white mark, trend bar)
    css/direction-b.css        zoned head, anchor card, duotone tiles, pill tabs, gradient primary
    css/direction-c.css        rules instead of boxes, caps heads, dot+word status, mono figures
    css/board.css              the stage, the switcher, the full-screen mode
    js/icons.js                72 Phosphor glyphs, 30 read from the product's icon-paths.js (generated)
    js/board.js                icon rendering, switching, full screen, URL state
    tools/build-icons.mjs      regenerates js/icons.js
    assets/fonts/*.woff2       from node_modules/@fontsource-variable
    assets/img/people/*.webp   Maya Johnson, Amara Nwosu — public/people/, see SOURCES.md
    assets/img/audentra-symbol.svg
```

Open `board/index.html`. `?d=a|b|c` picks the direction and `&full=1` opens without the stage; `&s=brew`
shows the hidden Morning Brew draft. Nothing loads from the network.

## 9. Done when

- [x] Three directions, two screens each, one DOM per screen — the skin is the only thing that changes.
- [x] Every value that differs between directions is a token; `structure.css` names none.
- [x] ENR-90's states from ENR-72/74/76/78 each present once; no action control on the page.
- [x] ENR-82's internal/student guardrail visible in all three.
- [x] Colour meaning and priority treatment identical across directions.
- [x] Fonts, icons, portraits vendored; opens from disk; rendered and checked at 1440 in all six
      combinations, and in full screen at 1366 and 1680.
- [x] The board shows the task detail only, with one control: A · B · C and full screen.
- [x] `CONTEXT.md`: *Task (staff)* and *Division* added.
- [ ] Stakeholder's reply recorded here, with the borrowings — then the staff repo's `tokens.css`.
