# BMAD Integration Core (LEGACY)

This document is **deprecated** and kept for historical context only.
> Superseded by `docs/bmad/guides/BMAD_SETUP_Lean_Integration.md`.

## Purpose of this document

This document describes how the **BMAD Method** is integrated as a **lightweight process framework**
into this repository.

BMAD is **not used here as a complete framework or dogma**,
but as a structured workflow for producing stable **artifacts (Markdown)**,
which are then implemented by Codex (VS Code Plugin).

The focus is on:
- clear separation of thinking and implementation
- reproducible documents instead of chat history
- minimal overhead

---

## Core principle

- **BMAD = structure & artifacts**
- **VS Code + Codex Plugin = execution**
- **Markdown files = single source of truth**

Architecture, analysis, and decision work happens **outside** the plugin
and is versioned as `.md` in the repository.

---

## Suggested directory structure

```text
docs/
  bmad/
    guides/
    00-project/
      README.md
      project-overview.md
    features/
      <feature-name>/
        README.md
        01-break.md
        02-model.md
        03-analyze.md
        04-deliver.md
    templates/
      break.template.md
      model.template.md
      analyze.template.md
      deliver.template.md
    notes/
      rejected-approaches.md
      open-questions.md
