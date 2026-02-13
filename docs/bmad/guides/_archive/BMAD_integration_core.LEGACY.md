# BMAD Integration Core (LEGACY)

This document is **deprecated** and kept for historical context only.
> Superseded by `docs/bmad/guides/BMAD_SETUP_Lean_Integration.md`.

## Ziel dieses Dokuments

Dieses Dokument beschreibt, wie die **BMAD Method** als **leichtgewichtetes Prozess-Framework**
in dieses Repository integriert wird.

BMAD wird hier **nicht als vollständiges Framework oder Dogma** verwendet,
sondern als strukturierter Workflow zur Erzeugung stabiler **Artefakte (Markdown)**,
die anschließend von Codex (VS Code Plugin) implementiert werden.

Der Fokus liegt auf:
- klarer Trennung von Denken und Implementieren
- reproduzierbaren Dokumenten statt Chat-Verlauf
- minimalem Overhead

---

## Grundprinzip

- **BMAD = Struktur & Artefakte**
- **VS Code + Codex Plugin = Umsetzung**
- **Markdown-Dateien = Single Source of Truth**

Architektur-, Analyse- und Entscheidungsarbeit findet **außerhalb** des Plugins statt
und wird als `.md` im Repository versioniert.

---

## Vorgeschlagene Verzeichnisstruktur

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
