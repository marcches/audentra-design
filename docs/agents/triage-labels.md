# Triage Labels

The skills speak in terms of five canonical triage roles. In this repo those roles are **not** labels —
they map onto the `ENR` Jira workflow, which already gates work the same way. No new label is created
for triage.

| Role in mattpocock/skills | Jira status in `ENR`    | Meaning                                                |
| ------------------------- | ----------------------- | ------------------------------------------------------ |
| `needs-triage`            | `Initiated`             | Card exists, nobody has evaluated it yet               |
| `needs-info`              | `Solution Design`       | Being shaped; open questions still block implementation |
| `ready-for-agent`         | `Ready for Development` | Fully specified — an agent can build it unattended     |
| `ready-for-human`         | `Review`                | Needs a human decision or review before it moves on    |
| `wontfix`                 | `On Hold`               | Parked, not being actioned                             |

The `Status:` line in `.scratch/**/*.md` uses the **left column** (the role string). Jira carries the
**right column**. The Jira status wins whenever the two disagree.

## Transitions

`On Hold` is global (available from any status). The rest follow the gate order:

```
Initiated ──(2 Start Solution Design)──▶ Solution Design ──(3 Submit for Review)──▶ Review
                                                                                     │
                                                              (4 Approve for Execution)
                                                                                     ▼
                                                                        Ready for Development ──▶ Concluído
```

| Transition | ID | Target status           |
| ---------- | -- | ----------------------- |
| `On Hold`  | `7` | `On Hold` (global)     |
| `Start Solution Design` | `2` | `Solution Design` |
| `Submit for Review` | `3` | `Review`          |
| `Approve for Execution` | `4` | `Ready for Development` |

IDs are recorded for speed, not as gospel — confirm with
`mcp__plugin_atlassian_atlassian__getTransitionsForJiraIssue` before transitioning, since only the
transitions valid from the card's current status are offered.

## Statuses past the gate

The table above covers the statuses that gate work. The `ENR` workflow continues past
`Ready for Development` with statuses the triage roles do not name — read on 2026-08-22:
`Prioritized` (stories the backlog has committed to), `Development`, `QA`, and `Review` again, before
`Concluído`. A design card in `QA` is **built and under review**: feedback on it (a Jam, a stakeholder
document) is a QA finding and goes into the card's `.scratch/` folder as a changes brief, with a pointer
comment on the card. It is not re-triaged from `Initiated`, and an agent does not move it backwards.

## Notes

- `wontfix` has no exact equivalent in this workflow. A card that is genuinely rejected goes to
  `On Hold` **plus a comment saying why** — the comment is what carries the rejection, the status only
  parks it.
- Closing a card (`Concluído`) is a human call. An agent never transitions a card to done.
- `persona-*`, `screen-*` and `wave-*` labels describe **what** the card covers, never its triage
  state. Leave them alone unless the card's scope actually changed.
