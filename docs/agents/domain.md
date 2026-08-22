# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This is a **single-context** repo: one `CONTEXT.md` and one `docs/adr/` at the root.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — the glossary and ubiquitous language.
- **`docs/adr/`** — read ADRs that touch the area you're about to work in.
- **`docs/domain/us-enrollment.md`** — how a US campus runs new-student enrollment, sourced: the
  journey, the offices, the words, the regulatory frame. It binds by default (ADR 0006).
- **`docs/domain/aster.md`** — the sample institution's facts: type, calendar, today's date, offices
  and people, persona. Every date and name in `src/` derives from it (ADR 0007).
- **`README.md`** — carries the current domain model of the enrollment checklist (task shape,
  state collections) and the design tokens until `CONTEXT.md` exists.

If any of these don't exist, **proceed silently**. Don't flag their absence; don't suggest creating
them upfront. `/domain-modeling` creates them lazily when terms or decisions actually get resolved.

## File structure

```
/
├── CONTEXT.md
├── docs/
│   ├── adr/
│   │   ├── 0001-....md
│   │   └── 0002-....md
│   └── agents/          ← this file, issue-tracker.md, triage-labels.md, design-workflow.md
└── src/
```

## Use the glossary's vocabulary

When your output names a domain concept — a spec title, a component name, a test name, UI copy — use
the term as defined in `CONTEXT.md`, and failing that, the term the `ENR` Jira card uses. The
Audentra backlog is deliberate about language (`staff` is one persona with departments, `work item`,
`case`, `outcome` vs `status`, `blocker`, `authorization category`). Don't drift to synonyms.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language
the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_

The same applies to a card's `Guardrails` section: contradicting one is a conversation, not a
judgement call you make alone.
