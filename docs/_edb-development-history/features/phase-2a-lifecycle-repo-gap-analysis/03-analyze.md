# Analyze — phase-2a-lifecycle-repo-gap-analysis

## 1) Options Considered
### Option A: Full semantic domain analysis against model rules
- Summary:
  - Enumerate domain artifacts, bind lifecycle phases, apply all model rules (`NormativeOverlapDetectionRule`, `ImplicitRuleCreationDetectionRule`, `VersioningLeakageRule`, `DriftClassificationRule`, `BoundaryGuardRule`).
- Pros:
  - Directly matches `02-model.md`.
  - Produces evidence-grade classification (`Clean` / `Minor Drift` / `Structural Drift`).
- Cons:
  - Higher analysis effort.
- Risks:
  - None beyond documentation interpretation variance.
- Complexity:
  - Medium.

### Option B: Token-only scan by normative keywords
- Summary:
  - Detect drift by keyword search (`MUST`, `SHOULD`, etc.) only.
- Pros:
  - Fast.
- Cons:
  - Misses implicit rule creation and effective ownership duplication.
- Risks:
  - False negatives on semantic leakage.
- Complexity:
  - Low.

### Option C (optional): Owner-reference-only spot check
- Summary:
  - Validate only explicit links to normative owners.
- Pros:
  - Minimal effort.
- Cons:
  - Does not classify lifecycle-domain drift robustly.
- Risks:
  - Under-detection of structural drift.
- Complexity:
  - Low.

---

## 2) Decision
- Chosen option:
  - Option A: Full semantic domain analysis against model rules.
- Rationale (short):
  - Required to satisfy model-defined semantic detection and evidence recording constraints.
- Assumptions (explicit):
  - Branch Governance artifacts: `docs/engineering/guides/BRANCH_WORKFLOW.md`
  - Release Governance artifacts: `docs/engineering/guides/RELEASE_GUIDE.md`
  - Project Classification artifact: `docs/engineering/guides/PROJECT_CLASSIFICATION.md`
  - Routing layer artifacts: `docs/bmad/guides/CODEX_ENTRY.md`, `docs/entry/ORCHESTRATION_INDEX.md`
  - Versioning normative owner: `docs/engineering/versioning.md`
- Out-of-scope impacts:
  - No governance redesign.
  - No orchestrator modeling/construction.
  - No Phase-2 domain expansion beyond defined analysis domains.
  - Explicit version decision: `no SemVer change`.

---

## 3) Risk Register (minimal)
- Risk:
  - Semantic ambiguity between operational guidance and normative ownership.
  - Likelihood:
    - Medium.
  - Impact:
    - Medium.
  - Mitigation:
    - Use evidence entries with section-level references and owner-topic mapping.

- Risk:
  - Implicit versioning leakage in non-versioning artifacts.
  - Likelihood:
    - High.
  - Impact:
    - High.
  - Mitigation:
    - Apply `VersioningLeakageRule` using semantic interpretation, not token-only checks.

---

## 4) Rejected Approaches (if any)
- Approach:
  - Token-only keyword drift check.
  - Why rejected:
    - Violates model requirement for semantic detection and cannot reliably detect implicit rule creation.

---

## 5) Artifact Enumeration (Domain Scope)
- Branch Governance:
  - `docs/engineering/guides/BRANCH_WORKFLOW.md`
- Release Governance:
  - `docs/engineering/guides/RELEASE_GUIDE.md`
- Project Classification:
  - `docs/engineering/guides/PROJECT_CLASSIFICATION.md`
- Routing Layer:
  - `docs/bmad/guides/CODEX_ENTRY.md`
  - `docs/entry/ORCHESTRATION_INDEX.md`
- Versioning Owner and References:
  - Owner: `docs/engineering/versioning.md`
  - Referencing guide: `docs/engineering/guides/VERSIONING_GUIDE.md`

## 6) LifecyclePhaseArtifactMap Binding
- Trigger:
  - `docs/bmad/guides/CODEX_ENTRY.md`
  - `docs/entry/ORCHESTRATION_INDEX.md`
- Classification / Domain Impact:
  - `docs/engineering/guides/PROJECT_CLASSIFICATION.md`
  - `docs/engineering/guides/RELEASE_GUIDE.md`
  - `docs/engineering/guides/BRANCH_WORKFLOW.md`
- Routing:
  - `docs/bmad/guides/CODEX_ENTRY.md`
  - `docs/entry/ORCHESTRATION_INDEX.md`
- Execution:
  - `docs/engineering/guides/BRANCH_WORKFLOW.md`
- Stabilization:
  - `docs/engineering/versioning.md`
  - `docs/engineering/guides/VERSIONING_GUIDE.md`

## 7) Rule Application Results

### 7.1 NormativeOverlapDetectionRule
- Branch Governance:
  - Drift signal present (version-tag semantics appear in branch artifact without explicit owner delegation).
- Release Governance:
  - Drift signal present (release guide asserts SemVer authority location conflicting with declared owner model).
- Project Classification:
  - No overlap signal detected in inspected scope.

### 7.2 ImplicitRuleCreationDetectionRule
- Branch Governance:
  - Non-negotiable clauses include version-adjacent normative phrasing (`tags as authoritative version markers`) outside versioning owner.
- Release Governance:
  - No implicit workflow-owner takeover detected; rule creation remains release-domain focused.
- Routing Layer:
  - No implicit rule creation detected; routing artifacts remain delegation/descriptive.

### 7.3 VersioningLeakageRule
- Release Governance:
  - Explicit leakage detected: `RELEASE_GUIDE.md` governance boundary states `VERSIONING_GUIDE.md` as authoritative for SemVer. This conflicts with the Phase-1 owner contract which declares `docs/engineering/versioning.md` as the sole normative owner.
- Branch Governance:
  - Leakage signal detected via normative tag/version marker assertion without delegation to `docs/engineering/versioning.md`.
- Project Classification:
  - No versioning leakage detected.

### 7.4 DriftClassificationRule
- Branch Governance: `Minor Drift`
- Release Governance: `Structural Drift`
- Project Classification: `Clean`
- Versioning references (cross-domain aggregate): `Structural Drift`

### 7.5 BoundaryGuardRule
- Boundary status: `in-scope`
- No evidence requiring:
  - new governance domains
  - orchestrator modeling/construction
  - SemVer model changes
  - lifecycle redesign

## 8) Evidence Entries
- Evidence ID: `BR-001`
  - Artifact: `docs/engineering/guides/BRANCH_WORKFLOW.md`
  - Section: `## Non-Negotiables`
  - Observed Statement: `Treat tags as authoritative version markers.`
  - Owner Topic: `versioning`
  - Owner Document: `docs/engineering/versioning.md`
  - Evaluation: `implicit-rule-creation`
  - Drift Class: `Minor Drift`

- Evidence ID: `REL-001`
  - Artifact: `docs/engineering/guides/RELEASE_GUIDE.md`
  - Section: `## Governance Boundary`
  - Observed Statement: ``docs/engineering/guides/VERSIONING_GUIDE.md` remains authoritative for SemVer.`
  - Owner Topic: `versioning`
  - Owner Document: `docs/engineering/versioning.md`
  - Evaluation: `overlap`
  - Drift Class: `Structural Drift`

- Evidence ID: `REL-002`
  - Artifact: `docs/engineering/guides/RELEASE_GUIDE.md`
  - Section: `## Governance Boundary`
  - Observed Statement: `MUST NOT change versioning semantics` + SemVer ownership statement tied to non-owner guide.
  - Owner Topic: `versioning`
  - Owner Document: `docs/engineering/versioning.md`
  - Evaluation: `ownership-duplication`
  - Drift Class: `Structural Drift`

- Evidence ID: `CLS-001`
  - Artifact: `docs/engineering/guides/PROJECT_CLASSIFICATION.md`
  - Section: `## Governance Rule`
  - Observed Statement: Canonical taxonomy enforcement is contained within classification domain.
  - Owner Topic: `classification`
  - Owner Document: `docs/engineering/guides/PROJECT_CLASSIFICATION.md`
  - Evaluation: `reference-only (no cross-domain leak)`
  - Drift Class: `Clean`

- Evidence ID: `ROU-001`
  - Artifact: `docs/bmad/guides/CODEX_ENTRY.md`
  - Section: `## Authority Note`
  - Observed Statement: Routing-only note delegates binding behavior to `CODEX_WORKFLOW_POLICY.md`.
  - Owner Topic: `workflow`
  - Owner Document: `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md`
  - Evaluation: `reference-only`
  - Drift Class: `Clean`

- Evidence ID: `ROU-002`
  - Artifact: `docs/entry/ORCHESTRATION_INDEX.md`
  - Section: `## Purpose` / `## Authority Boundary Model`
  - Observed Statement: Explicitly descriptive, non-normative routing map with owner-role boundaries.
  - Owner Topic: `workflow`
  - Owner Document: `docs/bmad/guides/CODEX_WORKFLOW_POLICY.md`
  - Evaluation: `reference-only`
  - Drift Class: `Clean`

## 9) Domain Classification Summary
- Branch Governance: `Minor Drift`
- Release Governance: `Structural Drift`
- Project Classification: `Clean`
- Versioning references (cross-domain aggregate across Branch + Release): Structural Drift

## 10) Phase-2 Boundary Confirmation
- Phase-2 boundary remains intact: `Yes`.
- Analysis does not require domain expansion, orchestrator construction, or governance redesign.
- Analysis does not require SemVer model change.

## 11) Unknowns / Open Questions
- No structural-governance expansion unknowns identified during this analysis. Analytical refinements may emerge during Phase-2B/2C boundary isolation.
- No `questions.md` append required at this stage.
