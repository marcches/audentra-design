# Issue tracker: Local Markdown, keyed to Jira

Work of record lives in **Jira** (project `ENR`). The **working spec** for each card lives as
markdown in `.scratch/` inside this repo. Jira holds the state; `.scratch/` holds the detail the
agent reads and writes while building.

## Jira coordinates

| | |
| --- | --- |
| Site | `https://audentra.atlassian.net` |
| `cloudId` | `f9f09695-e5d4-4bba-a866-b8dc3ef274c5` |
| Project | `ENR` — Audentra Student Enrollment |
| Board URL | `https://audentra.atlassian.net/browse/ENR-<n>` |
| Issue types | `Épico`, `História`, `Tarefa`, `Problema`, `Subtarefa` |
| Access | MCP tools `mcp__plugin_atlassian_atlassian__*` |

Other projects on the same site (`ACO` — Corporate Operations, `ACA` — Client Acquisition) are **not**
this repo's tracker. Never create or move issues there.

## File layout

```
.scratch/
  ENR-21-task-board/
    spec.md                  ← the spec for the card
    issues/
      01-blocker-model.md    ← implementation tickets, numbered from 01
      02-outcome-field.md
    references.md            ← Mobbin research (see docs/agents/design-workflow.md)
```

- One directory per Jira card: `.scratch/ENR-<n>-<slug>/`, slug taken from the card summary.
- The spec is always `spec.md`. Never a single combined tickets file — one file per ticket under
  `issues/`, numbered from `01`.
- `.scratch/` is committed, not ignored. The spec is part of the record.

## Spec front matter

Every `spec.md` and every ticket file starts with:

```markdown
Jira: ENR-21
Status: ready-for-agent
Labels: persona-staff, screen-task-board, wave-w2
Jam: (none)
```

- `Status:` uses the role strings in `docs/agents/triage-labels.md`, which map onto the Jira
  workflow. The Jira status is authoritative — if the two disagree, re-read the card and fix the file.
- `Labels:` mirrors the card's labels. This repo's vocabulary is `persona-*`, `screen-*`, `wave-*`.
  Read existing labels on the board before inventing a new one.
- `Jam:` collects Jam URLs the user pasted for this card, one per line.

## When a skill says "publish to the issue tracker"

Create the file under `.scratch/ENR-<n>-<slug>/` (creating the directory if needed). Do **not** open a
new Jira issue unless the user asks for one — the ENR backlog is authored by humans.

## When a skill says "fetch the relevant ticket"

1. `mcp__plugin_atlassian_atlassian__getJiraIssue` with `cloudId` above and the `ENR-<n>` key, then
2. read `.scratch/ENR-<n>-*/spec.md` if it exists.

The card body is the contract. Audentra epics carry a fixed shape — `Question it answers`,
`Objective`, `Closes when`, `Out of scope`, `Guardrails` — and `Out of scope` plus `Guardrails` are
binding. Do not build past them; raise the gap instead.

Find a card from a description with
`mcp__plugin_atlassian_atlassian__searchJiraIssuesUsingJql`, e.g.
`project = ENR AND labels = screen-task-board AND statusCategory != Done ORDER BY created ASC`.

## Writing back to Jira

Allowed as an explicit step of the workflow, never as a side effect:

- **Comment** (`addCommentToJiraIssue`) — a pointer to the spec path, or a question that blocks work.
- **Transition** (`transitionJiraIssue`) — only the move described in `docs/agents/triage-labels.md`,
  and only for the card being worked on.

Never bulk-edit, never touch a card the current task did not name, and never close a card — closure
is a human call.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `.scratch/ENR-<n>-<slug>/map.md` — the Notes / Decisions-so-far / Fog body.
- **Child ticket**: `.scratch/ENR-<n>-<slug>/issues/NN-<slug>.md`, numbered from `01`. A `Type:` line
  records the ticket type (`research`/`prototype`/`grilling`/`task`); `Status:` records
  `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. Unblocked when every file it lists is `resolved`.
- **Frontier**: scan `issues/` for files that are open, unblocked, and unclaimed; lowest number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a
  context pointer to the map's Decisions-so-far.
