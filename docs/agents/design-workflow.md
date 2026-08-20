# Design workflow — from an ENR card to shipped UI

The loop this repo runs on. Every screen is built the same way, so the output is predictable even
when the card, the persona and the screen change.

```
ENR card ──▶ Mobbin research ──▶ spec ──▶ build ──▶ verify ──▶ Jam feedback ──▶ commit
   Jira        mcp__mobbin        .scratch    src/     build + eyes    on demand      ENR-<n>:
```

---

## 1. Read the card (always first)

`mcp__plugin_atlassian_atlassian__getJiraIssue` — see `docs/agents/issue-tracker.md` for the
coordinates. Extract, verbatim, into the spec:

- **Question it answers** — the user's question this screen exists to answer.
- **Objective** and **Closes when** — the acceptance bar.
- **Out of scope** — do not build these. Not "build them smaller".
- **Guardrails** — invariants. A design that violates one is wrong even if it looks better.

If the card is an `Épico`, the deliverable is usually a set of tickets under `issues/`, not one screen.

## 2. Mobbin research — mandatory, never skipped

**No screen gets designed from imagination.** Before writing JSX, search Mobbin and record what you
found. This is the step that keeps quality consistent across cards.

| Tool | Use it for |
| --- | --- |
| `mcp__mobbin__search_screens` | A single screen: "staff task board with blocker reason and owner chips" |
| `mcp__mobbin__search_flows` | A multi-step path: sign in, onboarding, upload-and-review |
| `mcp__mobbin__search_sections` | One region: empty state, filter bar, side sheet, pricing table |

Rules:

- `platform: "web"` for the staff workspace and the student portal. Use `ios` only when the card says mobile.
- `mode: "deep"` by default. One screen, one intent per query — split multi-part questions into
  separate searches.
- **Look at the returned images.** Metadata alone is not research.
- Run **at least 2 searches** per screen: one for the overall layout, one for the hard part (the
  blocker state, the permission-denied field, the empty state — whatever the card's `Guardrails` make risky).

Record the result in `.scratch/ENR-<n>-<slug>/references.md`:

```markdown
# References — ENR-21 Task board

## Layout
- [Linear — inbox triage](mobbin_url) — two-pane list + detail; we take the density and the row grouping.
- [Height — task list](mobbin_url) — blocker chip lives on the row, not in the detail. We take this.

## Rejected
- [Asana — board](mobbin_url) — kanban columns hide the blocker holder. Card guardrail says status is
  position and outcome is result; a column-only view can't express that.
```

Always cite the `mobbin_url` as a markdown link — for the file and when reporting to the user.

## 3. Spec

`.scratch/ENR-<n>-<slug>/spec.md`, front matter as in `docs/agents/issue-tracker.md`. Body:

1. **What this screen answers** — one sentence, from the card.
2. **Layout** — regions, in reading order, each with the Mobbin reference it came from.
3. **States** — loading, empty, error, permission-denied, and every state the `Guardrails` imply.
4. **Interactions** — what each control does and what it must never do.
5. **Data** — which fields of `src/data.js` (or a new shape) it reads.
6. **Out of scope** — copied from the card.
7. **Done when** — the card's `Closes when`, made checkable.

## 4. Build — the design system is a contract

This repo has **no UI library and no CSS framework**. Deviating from that is the fastest way to make
the product look like two products.

- **Tokens only.** Colors come from the `:root` variables in `src/styles/app.css`
  (`--ink`, `--muted`, `--line`, `--surface`, `--canvas`, `--purple`, `--purple-dark`, `--purple-soft`,
  `--crimson`, `--green`, `--green-soft`, `--amber`, `--amber-soft`). A raw hex in a new rule is a bug.
- **Shadows** are `--shadow-soft` / `--shadow-card`. Don't invent a third.
- **Type** is Geist / Geist Mono via `--font-geist-sans` / `--font-geist-mono`, self-hosted through
  `@fontsource-variable`. Never add a webfont link or an external request.
- **Classes** are flat and semantic (`.task-card`, `.insight-column`, `.drawer-tabs`) in
  `src/styles/app.css`. No utility classes, no CSS-in-JS, no CSS modules. Reuse an existing class
  before adding one; if you add one, put it next to its siblings, not at the bottom of the file.
- **Icons** are our own — add to `src/Icon.jsx`, 24×24, stroke 1.9, `currentColor`. No icon package.
- **Components** are function components in `src/components/`, one per file, props over context.
  State lives in `App.jsx` unless the card says otherwise.
- **Accessibility is part of done**: landmarks, `aria-label` / `aria-modal` / `role`, `Esc` closes
  drawers and modals, focus is trapped in overlays and returns on close, `prefers-reduced-motion`
  respected.
- **Responsive is part of done**: at narrow widths the sidebar becomes a drawer with a scrim and side
  panels become bottom sheets. Match the existing breakpoints.
- **Copy** is plain, student-facing English, using the card's vocabulary. No placeholder lorem.

## 5. Verify before claiming it works

```bash
npm run build      # must pass clean
npm run dev        # then actually look at the screen
```

Check, on screen: the happy path, every state listed in the spec, narrow width, keyboard-only
navigation. "It compiles" is not verification.

## 6. Jam feedback — on demand

Feedback arrives when the user **pastes a Jam link**. Nothing is polled automatically.

Given a Jam URL:

1. `mcp__Jam__getDetails` for the report, `mcp__Jam__getVideoTranscript` for what was said,
   `mcp__Jam__getScreenshots` / `getFrames` for what was shown.
2. `mcp__Jam__getConsoleLogs` and `mcp__Jam__getNetworkRequests` when it looks like a defect, not a
   design note.
3. Split the feedback into **defects** (fix now, in this card) and **new scope** (a new card — say so,
   don't silently absorb it).
4. Append the URL to the `Jam:` front-matter line of the card's `spec.md`, with a one-line summary of
   what it asked for.

Feedback so far comes from Laura Barcellos, mostly on the `Audentra Student Onboarding` folder.

## 7. Commit

- Branch: `enr-<n>-<slug>`, off `main`.
- Commit subject: `ENR-<n>: <what changed>`.
- One card per branch. Commit the `.scratch/` spec along with the code — the spec is the record.
- Never push or open a PR unless asked.

## Definition of done

- [ ] Card read; `Out of scope` and `Guardrails` respected
- [ ] `references.md` has ≥2 Mobbin searches, with links and a line on what was taken or rejected
- [ ] `spec.md` written, states enumerated
- [ ] Built with tokens, existing classes, our own icons — no new dependency
- [ ] `npm run build` clean, screen checked in the browser at wide and narrow widths
- [ ] Keyboard and `Esc` behavior verified on any overlay
- [ ] Jam feedback, if any was given, either resolved or filed as new scope
- [ ] Committed as `ENR-<n>: …`
