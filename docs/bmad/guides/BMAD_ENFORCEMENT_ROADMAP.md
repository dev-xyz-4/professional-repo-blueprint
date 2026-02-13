# BMAD Enforcement Roadmap

This document outlines **how BMAD process rules could be technically enforced in the future**.
It is **descriptive**, not prescriptive, and does **not** introduce new rules.

Purpose:
- Make enforcement options explicit
- Separate *what is enforceable* from *what remains human judgment*
- Provide a staged path from manual discipline to technical gates

---

## 1) Enforcement Scope

BMAD enforcement focuses on **process hygiene**, not decision quality.

Enforceable:
- Presence of required artifacts
- Commit message structure
- Clear separation between BMAD Features and Minor Changes

Not enforceable:
- Whether a change *should* be a BMAD Feature
- Whether a design decision is “good”
- Whether a deliver spec is sufficiently well thought out

---

## 2) Enforcement Levels

### Level 0 — Manual (Current State)

- Rules are documented
- Discipline is human-driven
- Codex follows written policy
- Reviews catch violations

This level is required before any technical enforcement is added.

---

### Level 1 — Local Pre-Commit Gates (Soft)

**Goal:** Fast feedback without blocking learning.

Typical checks:
- Commit message matches allowed prefixes
- `feat(<feature>)` commits reference an existing feature folder
- `minor(...)` commits require an entry in `notes/minor-changes.md`

Characteristics:
- Local only
- Easy to bypass if necessary
- Developer-friendly

---

### Level 2 — CI Enforcement (Hard)

**Goal:** Protect main branches from process violations.

Typical checks:
- No `feat(<feature>)` commit without `04-deliver.md`
- No implementation changes when `questions.md` is non-empty
- No merge of Minor Changes without log entry

Characteristics:
- Centralized
- Hard fail on violation
- Applied only on protected branches

---

### Level 3 — Readiness Gates (Context-Aware)

**Goal:** Prevent premature implementation.

Typical checks:
- Feature marked as “implementable” only if:
  - `04-deliver.md` exists
  - Required sections are non-empty
- Warn (not fail) if:
  - `02-model.md` or `03-analyze.md` is missing

Characteristics:
- Mix of hard and soft gates
- Encourages best practice without forcing it

---

### Level 4 — Agent-Aware Enforcement (Future)

**Goal:** Align AI tooling with process state.

Concepts:
- Codex allowed to implement only if:
  - CI reports BMAD readiness
  - Feature state is “implementation-ready”
- Policy documents become machine-readable inputs

Status:
- Conceptual
- Depends on future toolchain support

---

## 3) Mapping Rules to Enforcement

| Rule | Enforceable | Level |
|-----|------------|-------|
| BMAD vs Minor classification | No | Manual |
| Commit prefix format | Yes | L1 |
| Feature folder existence | Yes | L1 |
| `04-deliver.md` required for implementation | Yes | L2 |
| Minor change log entry | Yes | L1 / L2 |
| Quality of decisions | No | Manual |

---

## 4) When to Introduce Enforcement

Recommended timing:
- After 2–3 real BMAD Features
- Once friction points are known
- When rules feel stable

Do **not** introduce hard enforcement:
- During exploration phases
- While rules are still changing
- Before the team trusts the process

---

## 5) Guiding Principle

> **Process first, enforcement second.**

Technical gates should:
- reduce cognitive load
- prevent accidental violations
- never replace judgment

---

## Final Note

This roadmap is intentionally conservative.
BMAD works without enforcement.
Enforcement exists to **support**, not replace, disciplined work.
