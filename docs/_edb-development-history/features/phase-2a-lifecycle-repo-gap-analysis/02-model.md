# Model — phase-2a-lifecycle-repo-gap-analysis

## 1) System Overview (2–5 bullets)
- This model defines a deterministic mapping between Governance Lifecycle phases (Trigger -> Stabilization) and concrete repository artifacts.
- It provides an evaluation matrix for semantic detection of normative overlap, ownership duplication, implicit rule creation, and cross-domain versioning leakage.
- Findings are classified into exactly three outcomes: `Clean`, `Minor Drift`, `Structural Drift`.
- The model is diagnostic only and preserves Phase-1 authority invariants without introducing new governance domains.
- Explicit version decision for this modeling artifact: `no SemVer change`.

## 2) Key Concepts / Terms
- Lifecycle Phase: A conceptual stage from Governance Lifecycle Model v0.1 (`Trigger`, `Definition`, `Routing`, `Execution`, `Stabilization`).
- Artifact Node: A concrete repository document mapped to one lifecycle phase.
- Normative Owner: The single document holding binding authority for a rule-topic.
- Non-Owner Artifact: Any artifact that may reference, but not redefine, an externally owned rule-topic.
- Overlap Event: A finding where multiple artifacts effectively define the same rule-topic.
- Implicit Rule Creation: Enforcement semantics expressed without explicit normative keywords.
- Drift Class: Outcome label (`Clean`, `Minor Drift`, `Structural Drift`) produced by model rules.

## 3) Data Structures
- Name: `LifecyclePhaseArtifactMap`
  - Fields:
    - `phase_id` (string)
    - `phase_name` (enum: Trigger, Definition, Routing, Execution, Stabilization)
      These phases are a normalized abstraction layer for evaluation purposes and do not redefine the Governance Lifecycle Model v0.1.
    - `artifact_paths` (list[path])
    - `authority_role` (enum: Normative, Routing, Historical, Structural, Informational)
  - Meaning:
    - Deterministic mapping of conceptual lifecycle phase to repository artifacts and declared authority role.
  - Invariants:
    - Every mapped artifact has exactly one primary authority role.
    - Mapping must not introduce a new phase outside Trigger -> Stabilization.

- Name: `OwnershipEvaluationRecord`
  - Fields:
    - `rule_topic` (string)
    - `normative_owner` (path)
    - `inspected_artifact` (path)
    - `ownership_status` (enum: Owner, ReferenceOnly, Overlap)
    - `evidence` (list[string])
  - Meaning:
    - Captures whether inspected artifacts preserve single-owner authority.
  - Invariants:
    - `ownership_status = Overlap` implies drift classification is not `Clean`.

- Name: `DriftFinding`
  - Fields:
    - `finding_id` (string)
    - `domain` (enum: Branch, Release, ProjectClassification, VersioningReference)
    - `finding_type` (enum: NormativeOverlap, OwnershipDuplication, ImplicitRuleCreation, VersioningLeakage)
    - `severity` (enum: Clean, MinorDrift, StructuralDrift)
    - `evidence_refs` (list[string])
    - `boundary_flag` (bool)
  - Meaning:
    - Normalized record for analysis-phase findings.
  - Invariants:
    - `boundary_flag = true` indicates potential scope breach (phase expansion, orchestrator modeling, governance redesign).

- Name: `EvidenceEntry`
  - Fields:
    - `artifact_path` (path)
    - `section_anchor` (string)
    - `observed_statement` (string)
    - `owner_reference` (path or `N/A`)
    - `evaluation_note` (string)
  - Meaning:
    - Standardized citation unit for reproducible analysis evidence.
  - Invariants:
    - Evidence must be traceable to a concrete file section.

## 4) State Machine (if applicable)
### States
- S0: `ModelInitialized`
- S1: `PhaseMapBound`
- S2: `MatrixEvaluable`
- S3: `DriftClassifiable`
- S4: `BoundaryChecked`
- S5: `ReadyForAnalyze`

### Transitions
- `ModelInitialized` -> `PhaseMapBound`: lifecycle phases and artifact sets are fully enumerated.
- `PhaseMapBound` -> `MatrixEvaluable`: all evaluation dimensions are mapped to deterministic checks.
- `MatrixEvaluable` -> `DriftClassifiable`: classification logic can produce `Clean` / `Minor Drift` / `Structural Drift`.
- `DriftClassifiable` -> `BoundaryChecked`: explicit boundary guards are applied.
- `BoundaryChecked` -> `ReadyForAnalyze`: no modeled requirement exceeds Phase-2A scope.

## 5) Algorithms / Rules (if applicable)
- Rule: `PhaseArtifactBindingRule`
  - Inputs:
    - lifecycle phases
    - repository artifact inventory
  - Output:
    - `LifecyclePhaseArtifactMap`
  - Notes:
    - One artifact may appear in multiple lifecycle contexts but retains one primary authority role.

- Rule: `NormativeOverlapDetectionRule`
  - Inputs:
    - `OwnershipEvaluationRecord` set
  - Output:
    - overlap findings (`DriftFinding`)
  - Notes:
    - Detects effective rule duplication even when explicit normative tokens are absent.

- Rule: `ImplicitRuleCreationDetectionRule`
  - Inputs:
    - non-owner artifact statements
  - Output:
    - implicit enforcement findings
  - Notes:
    - Evaluates semantic enforcement intent, not keyword-only matching.

- Rule: `VersioningLeakageRule`
  - Inputs:
    - versioning-related references across Branch/Release/Classification domains
  - Output:
    - leakage finding set
  - Notes:
    - `docs/engineering/versioning.md` remains sole normative owner reference target.

- Rule: `DriftClassificationRule`
  - Inputs:
    - normalized findings
  - Output:
    - `Clean` / `Minor Drift` / `Structural Drift`
  - Notes:
    - `Clean`: no overlap, no implicit rule creation, owner references consistent.
    - `Minor Drift`: isolated ambiguity without direct owner contract violation.
    - `Structural Drift`: repeated or clear owner-contract violations.

- Rule: `BoundaryGuardRule`
  - Inputs:
    - modeled findings and scope flags
  - Output:
    - boundary status (`in-scope` / `clarification-required`)
  - Notes:
    - Prevents Phase-2 domain expansion, orchestrator modeling, and governance redesign.

## 6) Failure Modes / Edge Cases
- Artifact expresses enforcement semantics indirectly while avoiding explicit normative vocabulary.
- A guide or lifecycle artifact restates versioning obligations, creating effective dual ownership.
- A routing/reference artifact mixes role boundaries and behaves like a hidden normative source.
- Evidence statements are too generic to attribute to a section-level source.
- Boundary breach condition:
  - If modeling implies new governance domain, lifecycle redesign, or orchestrator design, stop and request clarification.

## 7) Observability (optional)
- Logs:
  - Not applicable (documentation modeling only).
- Metrics:
  - `mapped_artifacts_count`
  - `findings_count_by_type`
  - `drift_class_distribution`
  - `boundary_flag_count`

## 8) Evaluation Matrix (Formal)
| Dimension | Unit of Evaluation | PASS Condition | Drift Trigger |
|---|---|---|---|
| Normative overlap detection | Rule-topic ownership records | Exactly one normative owner per topic | Multiple artifacts effectively define same topic |
| Ownership duplication detection | Owner vs non-owner semantic role | Non-owner artifacts remain reference-only | Non-owner defines or redefines obligations |
| Implicit rule creation detection | Semantic intent in non-owner statements | Descriptive/reference phrasing only | Enforcement semantics without owner delegation |
| Cross-domain versioning leakage | Branch/Release/Classification references to versioning | References route to `docs/engineering/versioning.md` | Parallel versioning requirement logic outside owner |

## 9) Evidence Recording Format
- `Evidence ID`: `<domain>-<increment>`
- `Artifact`: `<path>`
- `Section`: `<heading or anchor>`
- `Observed Statement`: `<verbatim excerpt or precise paraphrase>`
- `Owner Topic`: `<workflow | versioning | branch | release | classification>`
- `Owner Document`: `<canonical owner path>`
- `Evaluation`: `<reference-only | overlap | implicit-rule-creation>`
- `Drift Class`: `<Clean | Minor Drift | Structural Drift>`

## 10) Boundary Rules (Explicit)
- No Phase-2 domain expansion beyond Branch, Release, Project Classification, and Versioning references.
- No orchestrator modeling or orchestrator construction logic.
- No governance redesign or authority-model redefinition.
- Preserve Phase-1 invariants and owner declarations as fixed constraints.
- Namespace clarifier remains fixed:
  - Workflow classification uses `Minor Change (workflow)` / `BMAD Feature`.
  - Version classification uses `SemVer PATCH` / `SemVer MINOR` / `SemVer MAJOR`.

## 11) Unknowns / Open Questions
- No structural unknowns identified during modeling. Analytical unknowns may emerge during evidence mapping.
- If unknowns emerge in analysis, append to:
  - `docs/_edb-development-history/features/phase-2a-lifecycle-repo-gap-analysis/questions.md`
