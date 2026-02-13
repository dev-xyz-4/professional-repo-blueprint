# TypeScript Audit Routine (BMAD-konform)

## Zweck
Das TS-Audit dient der strukturierten Entscheidung,
ob TypeScript-Fehler als **Minor Changes** behoben werden können
oder einen **BMAD-Trigger** darstellen (neuer Vertrag / neue Architektur).

Das Audit ist ein **Diagnose-Tool**, kein Pflichtartefakt jedes Features.

---

## Standard-Regel
- **Default-Gate:** `tsc --noEmit` (oder `npm run typecheck`) muss grün sein.
- Kein Audit-Protokoll bei 0–2 trivialen TS-Fehlern nötig.

---

## Wann ein TS-Audit ausführen?
Führe ein Audit-Script (`ts:audit:*`) aus, wenn mindestens eines zutrifft:

- > 3–5 TS-Fehler gleichzeitig
- Fehler konzentrieren sich auf:
  - eine zentrale UI-Komponente (`<critical-ui-file>`)
  - eine zentrale Domainenheit (`<core-domain-module>`)
  - Datenfluss-/Mapping-Logik (`<mapping-layer>`)
  - Historie-/Transaktionslogik (`<history-layer>`)
- Unsicherheit, ob Fix:
  - nur Typ-Narrowing ist (**Minor**)
  - oder einen neuen Vertrag impliziert (**BMAD**)

---

## Audit-Output
Ein Audit erzeugt ein Markdown-Protokoll mit:

- TS-Code + Original-Fehlermeldung
- Datei + Zeile/Spalte
- Code-Kontext
- Klassifikation:
  - `MINOR`
  - `BMAD-TRIGGER`
- Kurze rationale Begründung
- Fix-Richtung (nicht implementierend)

Beispiel:
docs/bmad/notes/ts-audits/YYYY-MM-DD-<scope>.md

### Repo-Integration (Template)
- Standard Script-Datei: `scripts/ts-audit-chart.mjs`
- Standard Command: `node scripts/ts-audit-chart.mjs --project <project-dir> --target <relative-file>`
- Optional NPM-Command: `npm run <ts-audit-command>`

Beim Übernehmen dieser Routine in ein anderes Repo:
- Script-Pfad und NPM-Script mit übernehmen/anpassen
- Output-Pfad im Guide entsprechend aktualisieren

---

## Klassifikations-Regeln (Kurzfassung)

### MINOR
- null / undefined guards
- Union-Narrowing
- Event-, Ref-, Hook-Typen
- Generics / Imports
- lokale Prop- oder Callback-Typen
- Typ-Konsistenz an API-Grenzen (ohne Semantikänderung)

### BMAD-TRIGGER
- neuer persistenter State
- Änderung von Interaktionsverträgen
- Änderung zentraler Entitätsbeziehungen
- Änderungen an Mapping-/Orchestrierungslogik
- Änderung von Undo/Redo- oder Transaktionssemantik
- mehrere plausible Architektur-Optionen

Im Zweifel: **BMAD-TRIGGER**.

---

## Versionierung von Audit-Protokollen
Audit-Protokolle werden **nicht automatisch committed**.

Committe ein Protokoll nur, wenn:
- ein größerer Fix-Sweep durchgeführt wurde
- ein BMAD-Trigger dokumentiert wird
- eine Fix-Entscheidung später nachvollziehbar sein muss

Empfohlenes Naming:
docs/bmad/notes/ts-audits/YYYY-MM-DD-<scope>.md

---

## Definition of Done (für TS-Stabilisierung)
- `npm run typecheck` ist grün
- ggf. Audit durchgeführt und ausgewertet
- alle verbleibenden Fehler bewusst:
  - gefixt (Minor)
  - oder dokumentiert (BMAD / Deferred)

---

## Nicht-Ziele
- Kein Ersatz für BMAD Break/Model/Analyze
- Kein automatisches Refactoring
- Kein „Greenwashing“ durch `any` oder TS-Disable
