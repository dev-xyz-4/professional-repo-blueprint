# BMAD Setup Guide (Lean Integration)

> **Ziel:** BMAD als *Prozess-Framework* in diesem Repo nutzen (Workflows + Artefakte), ohne Overhead.  
> **Prinzip:** Denken/Entscheiden wird als Markdown versioniert.  
> Codex-Verhalten wird über `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md` geregelt.

---

## 0) Kurzüberblick

- **BMAD = Struktur & Artefakte** (Break → Model → Analyze → Deliver)
- **Repo = Single Source of Truth** (Docs im Git, nicht im Chat-Verlauf)
- **VS Code + Codex Plugin = Ausführung** (Code schreiben, refactoren, testen)
- **Optional:** BMAD-CLI installieren, um Assets/Workflows schneller zu erzeugen (nicht zwingend)

---

## 1) Installation (2 Varianten)

### Variante A — Minimal (ohne BMAD-CLI) ✅ *empfohlen zum Start*
Du nutzt BMAD als **Konzept + Dokumentstruktur**:

1. Lege die Ordnerstruktur unter `docs/bmad/` an (siehe Abschnitt 2).
2. Nutze die Templates (Abschnitt 3) oder erstelle die Dateien manuell.
3. VS Code Codex-Verhalten und Implementierungs-Gating sind in `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md` definiert.

**Vorteil:** kein zusätzlicher Tooling-Overhead, sofort startklar.  
**Nachteil:** du pflegst Templates/Ordner initial selbst.

---

### Variante B — Mit BMAD-CLI (optional) ⚙️
Wenn du BMAD-Assets/Workflows aus dem offiziellen Repo übernehmen willst, installiere die CLI lokal.

**Voraussetzungen**
- Node.js **v20+**
- Terminal im Repo-Root

**Install (projekt-spezifisch, empfohlen)**
```bash
npx bmad-method install
```

**Update**
```bash
npx bmad-method update
```

> Hinweis: Die CLI ist **optional**. Für deinen Workflow (Docs → Implementierung) genügt oft Variante A.  
> Falls die CLI bei dir andere Dateien/Ordner anlegt als unten beschrieben: nutze sie als „Quelle“,  
> aber halte die Repo-Struktur in `docs/bmad/` stabil.

---

## 2) Vorgeschlagene `docs/bmad/`-Struktur

```text
docs/
  bmad/
    README.md
    guides/BMAD_SETUP_Lean_Integration.md
    00-project/
      README.md
      project-overview.md
      architecture-notes.md
      glossary.md
    features/
      <feature-name>/
        README.md
        01-break.md
        02-model.md
        03-analyze.md
        04-deliver.md
        questions.md
        changelog.md
    templates/
      break.template.md
      model.template.md
      analyze.template.md
      deliver.template.md
    notes/
      open-questions.md
      rejected-approaches.md
      decisions-log.md
```

### Bedeutung der Ordner

#### `docs/bmad/00-project/`
**Stabiler Kontext** über das bestehende Projekt (Brownfield-Fokus):
- Was ist das Repo? Ziel/Scope?
- Architektur-Skizze (Module, Datenflüsse)
- Glossar (Begriffe, Abkürzungen)
- Konventionen (Coding, Tests, Pfade)

**Zweck:** Codex und du habt eine „Basiswahrheit“, ohne jedes Mal alles neu zu erklären.

---

#### `docs/bmad/features/<feature-name>/`
BMAD-Artefakte pro Feature oder klar abgegrenztem Thema.

- `01-break.md` — Problem **zerlegen**, keine Lösung
- `02-model.md` — konzeptionelles Modell (Daten, Zustände, Invarianten)
- `03-analyze.md` — Optionen/Trade-offs, Entscheidungen, Risiken
- `04-deliver.md` — **Implementationsvertrag** (API, Schritte, Akzeptanzkriterien)
- `questions.md` — offene Punkte, die nicht geraten werden dürfen
- `changelog.md` — was wurde am Artefakt geändert und warum

**Wichtig:** Für die Umsetzung ist `04-deliver.md` *die* Quelle.

---

#### `docs/bmad/templates/`
Vorlagen, um Dokumente konsistent zu halten.  
**Optional**, aber sehr hilfreich, wenn mehrere Features nach dem gleichen Pattern laufen.

---

#### `docs/bmad/notes/`
Querschnittliche Notizen, die nicht in einzelne Features gehören:
- große Entscheidungen (Decision Log)
- verworfene Ideen
- generelle offene Fragen

**Zweck:** Feature-Artefakte bleiben schlank.

---

## 3) Templates (Startpunkt)

Lege diese Templates an (oder übernehme sie später aus BMAD):

### `templates/break.template.md`
- Ziel / Nicht-Ziele
- Inputs / Outputs
- Randbedingungen
- Risiken / Unknowns
- Akzeptanz: „Wann ist das Problem korrekt verstanden?“

### `templates/model.template.md`
- Datenmodell / Strukturen
- Zustände / Transitions
- Invarianten
- Schnittstellen (konzeptionell)
- Failure-Modes

### `templates/analyze.template.md`
- Ansatz A/B/C
- Trade-offs (Performance, UX, Complexity, Extensibility)
- Entscheidung + Begründung
- Was wurde verworfen und warum?

### `templates/deliver.template.md`
- Scope (MVP vs später)
- File-/Folder-Targets
- API/Signaturen
- Implementationsreihenfolge
- Tests/Checks
- Akzeptanzkriterien (Definition of Done)

---

## 4) Welche Teile aus dem BMAD-Repo verwenden wir – und warum?

### Verwendet (Core, Einstieg)
1. **BMAD-Phasen B/M/A/D**  
   - Grund: zwingt explizite Entscheidungen, reduziert Drift.
2. **Artefakt-First** (Docs im Repo statt Chat)  
   - Grund: versionierbar, nach Wochen reproduzierbar.
3. **Quick vs Full Planning (Prinzip, nicht zwingend CLI)**  
   - Quick: kleine Änderungen mit wenig Overhead  
   - Full: größere Features mit klaren Deliverables
4. **Brownfield-Denken** (`00-project/` als Kontextbasis)  
   - Grund: gewachsene Projekte brauchen „shared understanding“.

### Vorläufig **nicht** verwendet
1. **Builder / Custom Agent-System**  
   - Grund: Overhead; erst sinnvoll, wenn du konstant gleiche Workflows automatisierst.
2. **Enterprise-Module (z. B. TEA/Test-Architektur)**  
   - Grund: erst einführen, wenn QA/Test-Gates wirklich der Bottleneck sind.
3. **Strikte Rollen-Simulation (PM/Architect/QA als separate Agents)**  
   - Grund: du kannst diese Rollen *als Abschnitte im Dokument* abbilden; später optional trennen.
4. **Maximal automatisierte Workflow-Ketten**  
   - Grund: zuerst „manuell stabilisieren“, dann automatisieren.

---

## 5) Arbeitsweise mit VS Code + Codex Plugin (entscheidend)

### Grundregel
Dieses Kapitel beschreibt die Integration mit dem VS Code Plugin.
Normative Codex-Regeln stehen in `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md`.

**Standard-Anweisung (Copy/Paste)**
> Implementiere strikt nach `docs/bmad/features/<feature>/04-deliver.md`.  
> Triff keine zusätzlichen Annahmen.  
> Bei fehlenden Informationen gilt das Verhalten aus  
> `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md`.

### Praktische Konsequenzen
- Keine Architektur-Diskussionen im Plugin-Chat
- Keine „stillen“ Scope-Erweiterungen
- Jede Entscheidung landet in `03-analyze.md` (oder `notes/decisions-log.md`)
- Jede Implementationsänderung wird in `04-deliver.md` reflektiert (wenn sie das Ziel verändert)
- Für TS-Fehler-Stabilisierung optional die Routine aus
  `docs/bmad/guides/TS_AUDIT_ROUTINE.md` nutzen (Diagnose, nicht normative Regel).

### „Clean Context“-Trick
Wenn ein Feature groß wird:
- Plugin bekommt **nur** `04-deliver.md` (+ 1–2 referenzierte Dateien)
- Der Rest (B/M/A) bleibt im Repo, nicht im Plugin-Kontext

---

## 6) Betriebsregeln (leichtgewichtig, aber verbindlich)

1. **Single Source of Truth:** `04-deliver.md`
2. **Keine Annahmen ohne Dokumentation:** offene Punkte → `questions.md`
3. **Änderungen am Plan sind normal:** aber dann Artefakte updaten, nicht „im Kopf“ ändern
4. **BMAD nur dort, wo es sich lohnt:** neue Komplexität, echte Trade-offs, langfristige Evolvierbarkeit
5. **Commit-Disziplin:** `docs/bmad/` wird versioniert, sonst verliert BMAD den Hauptnutzen

---

## 7) Start-Checklist (10 Minuten)

- [ ] `docs/bmad/guides/BMAD_SETUP_Lean_Integration.md` (dieses Dokument) committen
- [ ] `docs/bmad/00-project/` anlegen + `project-overview.md` grob füllen
- [ ] `docs/bmad/templates/` anlegen (4 Templates)
- [ ] Für das nächste Feature: `docs/bmad/features/<name>/04-deliver.md` erstellen
- [ ] Für Codex die Regeln aus `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md` anwenden

---

## 8) Troubleshooting & FAQ

### Wann nutze ich „Quick“ vs. „Full“ BMAD?

**Quick (minimal):**
- kleine, klar begrenzte Änderungen
- wenig bis keine Architektur-Entscheidungen
- bestehende Modelle werden nicht verändert

→ Oft reicht **nur `04-deliver.md`** (+ evtl. ein kurzes `01-break.md`).

**Full (B/M/A/D):**
- neue strukturelle Logik
- mehrere Lösungswege möglich
- spätere Erweiterbarkeit relevant
- Risiko von Fehlentscheidungen

→ Alle vier Phasen explizit dokumentieren.

---

### Was tun, wenn während der Implementierung Infos fehlen?

Das konkrete Stop- und Klärungsverhalten von Codex ist in
`docs/bmad/guides/CODEX_WORKFLOW_POLICY.md` definiert.

Für die Dokumentation gilt:
1. Fehlende Punkte werden in `docs/bmad/features/<feature>/questions.md` ergänzt.
2. Entscheidungen werden in `03-analyze.md` nachgetragen.
3. `04-deliver.md` wird bei Bedarf aktualisiert.

---

### Wann muss `04-deliver.md` aktualisiert werden?

Immer dann, wenn sich eines davon ändert:
- Scope
- API / Signaturen
- Reihenfolge der Implementierung
- Akzeptanzkriterien
- Definition of Done

**Faustregel:**  
Wenn der Code etwas anderes tut als geplant → `04-deliver.md` ist veraltet.

---

### Darf Codex im Plugin Entscheidungen treffen?

Die normative Antwort steht in
`docs/bmad/guides/CODEX_WORKFLOW_POLICY.md`.

Dieser Setup-Guide bleibt beschreibend; Entscheidungen werden in `03-analyze.md` dokumentiert.

---

### Was, wenn BMAD „zu schwer“ wirkt?

Dann wird es **zu breit eingesetzt**.

BMAD ist kein Standard für:
- Bugfixes
- kosmetische Änderungen
- reine Umbenennungen

BMAD ist ein Werkzeug für **neue Komplexität**.

---

### Kann ich BMAD später wieder entfernen?

Ja.

BMAD erzeugt **nur Markdown-Artefakte**.
Kein Code ist davon abhängig.

Worst Case:
- Du behältst gute Dokumentation.
- Du lässt den Prozess fallen.

---

## 9) Commit- & Änderungsregeln für BMAD-Artefakte

BMAD funktioniert nur, wenn die Dokumente **versioniert, nachvollziehbar und stabil** sind.

### Grundregeln
1. **`docs/bmad/` wird immer mitcommittet**
2. Artefakte sind Teil der Code-Review-Grundlage
3. Änderungen am Plan sind normal – **stille Änderungen nicht**

---

### Empfohlene Commit-Struktur

#### Änderungen an BMAD-Dokumenten
```text
docs(bmad): clarify deliver scope for <feature>
docs(bmad): add decision on data model trade-offs
docs(bmad): document rejected approach for <feature>
```
