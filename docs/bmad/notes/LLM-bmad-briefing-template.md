# BMAD LLM Briefing Template

## Nutzung
Diese Datei ist ein wiederverwendbares Briefing-Template fuer einen neuen Chat mit einem LLM/Codex.
Alle Platzhalter in `<...>` vor Nutzung ersetzen.

## 1) Kontext / Ziel
Projekt:
- Name: `<project-name>`
- Ziel: `<one-sentence-goal>`
- Aktueller Fokus: `<current-focus>`

BMAD-Rahmen:
- Workflow: Break -> Model -> Analyze -> Deliver
- Implementierung erfolgt nur aus `04-deliver.md`
- Entscheidungen werden dokumentiert, nicht erraten

## 2) Relevante Repo-Struktur
```text
docs/
  bmad/
    README.md
    guides/
      CODEX_ENTRY.md
      CODEX_WORKFLOW_POLICY.md
      BMAD_DECISION_MATRIX.md
      BMAD_COMMIT_CONVENTIONS.md
      BMAD_SETUP_Lean_Integration.md
      TS_AUDIT_ROUTINE.md
      BMAD_ENFORCEMENT_ROADMAP.md
    templates/
      break.template.md
      model.template.md
      analyze.template.md
      deliver.template.md
    notes/
      minor-changes.md
      open-questions.md
      rejected-approaches.md
      decisions-log.md
      architecture-divergences.md
      <optional-project-note>.md
    features/
      <feature-slug>/
        01-break.md
        02-model.md
        03-analyze.md
        04-deliver.md
        questions.md
```

## 3) Verbindliche Regeln
- `CODEX_WORKFLOW_POLICY.md` ist die einzige normative Quelle fuer Codex-Verhalten.
- `CODEX_ENTRY.md` ist der Einstieg/Router.
- Minor Changes werden in `docs/bmad/notes/minor-changes.md` dokumentiert.
- Neue Struktur, neue Verträge oder neue Systementscheidungen sind BMAD Features.

## 4) Aktueller Feature-Status (Template)
Feature: `<feature-slug-1>`
- Status: `<planned|in-progress|implemented|stabilizing>`
- Dokumentlage: `<01-04 complete|partial>`
- Offene Punkte: `<none|summary>`

Feature: `<feature-slug-2>`
- Status: `<planned|in-progress|implemented|stabilizing>`
- Dokumentlage: `<01-04 complete|partial>`
- Offene Punkte: `<none|summary>`

## 5) Implementationskontext
- Geltender Implementationsvertrag: `docs/bmad/features/<feature-slug>/04-deliver.md`
- Unklare Punkte landen in: `docs/bmad/features/<feature-slug>/questions.md`
- Out-of-scope bleibt unveraendert

## 6) Erwarteter Arbeitsstil im Chat
- Kurze, praezise Antworten
- Klare Klassifikation: Minor Change vs BMAD Feature
- Bei Bedarf direkt umsetzbare Prompts
- Keine stillen Annahmen bei fehlenden Anforderungen

## 7) Prompt-Template: Documentation-Only (Break)
```text
Read docs/bmad/guides/CODEX_ENTRY.md.
Follow the routing and rules defined there (including the referenced policy).
Work in Documentation-Only Mode.

Create:
- docs/bmad/features/<feature-slug>/01-break.md

Use:
- docs/bmad/templates/break.template.md

Context:
- Existing behavior/system contracts to consider:
  - <existing-contract-1>
  - <existing-contract-2>
  - <existing-contract-3>

Break focus:
- <requirement-1>
- <requirement-2>
- <requirement-3>
- <requirement-4>

Constraints:
- Preserve existing behavior outside scope.
- Do not invent new requirements.
- Do not write implementation code.

Unknowns must be appended to:
- docs/bmad/features/<feature-slug>/questions.md
```

## 8) Prompt-Template: BMAD Feature (Implementation)
```text
Read docs/bmad/guides/CODEX_ENTRY.md.
Follow the routing and rules defined there (including the referenced policy).
Switch to Implementation Mode.

This is a BMAD Feature Implementation:
- <feature-slug> (<short-feature-intent>).

Implementation scope:
Implement strictly according to:
- docs/bmad/features/<feature-slug>/04-deliver.md

Do not implement behavior outside that document.

Problem:
- <problem-point-1>
- <problem-point-2>
- <problem-point-3>

Expected behavior (binding):

A) <contract-block-a>
- <rule-a1>
- <rule-a2>
- <rule-a3>

B) <contract-block-b>
- <rule-b1>
- <rule-b2>
- <rule-b3>

C) <contract-block-c>
- <rule-c1>
- <rule-c2>
- <rule-c3>

D) <normative-sequence-name> (exact ordering)
Implement EXACT ordering:
1) <step-1>
2) <step-2>
3) <step-3>
4) <step-4>
5) <step-5>

E) <lifecycle-and-async-guards>
- <lifecycle-rule-1>
- <lifecycle-rule-2>
- <lifecycle-rule-3>

F) <live-update-and-recovery>
- <recovery-rule-1>
- <recovery-rule-2>
- <recovery-rule-3>

G) <cache-or-state-namespacing>
- <namespace-rule-1>
- <namespace-rule-2>
- <namespace-rule-3>

H) Non-Regression Guarantees
- Do NOT modify:
  - <protected-area-1>
  - <protected-area-2>
  - <protected-area-3>
- <additional-non-regression-rule>

Rules (strict):
- Do not introduce behavior not present in `04-deliver.md`.
- Do not introduce hidden scope expansion.
- Do not add architecture decisions not documented in BMAD artifacts.
- Do not refactor unrelated code.
- Do not degrade performance characteristics defined in deliver acceptance criteria.

Targets (only these files may change):
- <target-file-1>
- <target-file-2>
- <target-file-3>

Non-targets:
- <non-target-path-1>
- <non-target-path-2>

Validation (must pass):
- <typecheck-command>
- <build-or-test-command>

Functional validation matrix:
- <behavior-check-1>
- <behavior-check-2>
- <behavior-check-3>
- <regression-check-1>
- <regression-check-2>

If any requirement is unclear:
Stop implementation.
Write clarification request to:
- docs/bmad/features/<feature-slug>/questions.md

Proceed step-by-step.
Do not widen scope.
```

## 9) Prompt-Template: Minor Change (Implementation)
```text
Read docs/bmad/guides/CODEX_ENTRY.md.
Follow the routing and rules defined there (including the referenced policy).
Switch to Implementation Mode.

This task is a Minor Change.

Fix:
- <short-minor-change-title>

Problem:
- <problem-point-1>
- <problem-point-2>

Expected behavior:
- When <condition>:
  - <expected-point-1>
  - <expected-point-2>
- Out of scope:
  - <out-of-scope-point>

Rules:
- Do not introduce new features or architecture.
- Do not refactor unrelated files.
- Preserve behavior outside this fix.

If requirements are missing or ambiguous:
- Stop implementation.
- Append open points to docs/bmad/features/<feature-slug>/questions.md.

Targets:
- <primary-target-file>
- <optional-secondary-target-file>

Validation:
- <validation-step-1>
- <validation-step-2>
- <regression-check-1>
```
