# BMAD Decision Matrix  
**BMAD Feature vs. Minor Change**

Use this page **before writing code or prompting Codex**.

---

## Step 1 — One Question

**Does this change introduce _new structure, new decisions, or new behavior_?**

- [ ] Yes → **BMAD Feature**
- [ ] No  → **Minor Change**

If unsure → treat as **BMAD Feature**.

---

## Step 2 — Classification Rules

### BMAD Feature (use B/M/A/D)

Choose **BMAD Feature** if **any** of the following is true:

- Introduces a new concept, abstraction, or workflow
- Adds or changes public APIs
- Requires architectural or data-model decisions
- Has multiple possible solution approaches
- Affects extensibility or future features
- Changes system behavior in non-local ways
- You need to explain *why* this solution was chosen

**Required output:**
docs/bmad/features/<feature-name>/
├─ 04-deliver.md (mandatory)
├─ 03-analyze.md (if decisions exist)
├─ 02-model.md (if structure exists)
└─ 01-break.md (if scope is unclear)

---

### Minor Change (no BMAD)

Choose **Minor Change** if **all** of the following are true:

- No new concepts or abstractions
- No architectural decisions
- Behavior remains fundamentally the same
- Change is local and easily reversible
- Reason is obvious (bugfix, cleanup, small refactor)

**Required output:**
docs/bmad/notes/minor-change-log.md

---

## Step 3 — Forbidden Combinations

The following are **not allowed**:

- ❌ Minor Change that silently introduces new structure
- ❌ BMAD Feature without `04-deliver.md`
- ❌ Implementing first, documenting later
- ❌ Letting Codex guess missing requirements

---

## Step 4 — Codex Interaction

This matrix defines **classification only**.

For Codex behavior, stop rules, and enforcement,
see `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md`.

---

## Final Rule

> **BMAD is for decisions.  
> Minor Changes are for execution.**

When in doubt: **BMAD Feature**.
