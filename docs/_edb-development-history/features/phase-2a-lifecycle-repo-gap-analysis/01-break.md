# Break — phase-2a-lifecycle-repo-gap-analysis

## 1) Problem Statement (one paragraph)
After Phase-1 authority enforcement (C1-C5), the repository needs a focused documentation-level gap analysis that maps lifecycle phases (Trigger -> Stabilization) to real artifacts and validates whether Phase-2 lifecycle domains (Branch, Release, Project Classification) remain authority-clean. The core uncertainty is whether normative overlap, implicit rule creation, or ownership duplication still exists outside declared owners, which could reintroduce drift before Phase-2 harmonization.

## 2) Goal
- Produce a clear phase-to-artifact lifecycle map for current repository governance artifacts.
- Detect and classify lifecycle-domain findings as `Clean`, `Minor Drift`, or `Structural Drift`.
- Verify whether normative overlap exists across Branch Governance, Release Governance, Project Classification, and Versioning references.
- Confirm that no hidden Phase-2 domain expansion is required.
- Confirm that no implicit System-Orchestrator construction is introduced.

## 3) Non-Goals
- No governance redesign.
- No repository refactor or file moves.
- No implementation/code changes.
- No new governance domains.
- No orchestrator architecture design.
- No SemVer model changes.

## 4) Users / Actors (if any)
- EDB governance maintainers
- BMAD workflow maintainers
- Phase-2 lifecycle harmonization planners

## 5) Inputs / Outputs
### Inputs
- Phase-1 Core Governance Kernel Contract (single normative owners, log entnormification, authority boundaries, prohibition matrix, invariants I1-I7)
- `core-governance-kernel-refactor` execution contract and C1-C5 checkpoints
- Governance Lifecycle Model v0.1 (conceptual, non-normative)
- Stability Audit v1.12.10
- Routing artifacts: `docs/bmad/guides/CODEX_ENTRY.md`, `docs/entry/ORCHESTRATION_INDEX.md`
- Versioning owner artifact: `docs/engineering/versioning.md`
- `docs/engineering/guides/BRANCH_WORKFLOW.md`
- `docs/engineering/guides/RELEASE_GUIDE.md`
- `docs/engineering/PROJECT_CLASSIFICATION.md`

### Outputs
- A break-level scoping artifact for Phase-2A lifecycle repository gap analysis.
- Explicit analysis boundary for the next BMAD phases (`02-model`, `03-analyze`, `04-deliver`) without scope expansion.
- Drift-classification framing (`Clean` / `Minor Drift` / `Structural Drift`) for later evidence-based validation.

## 6) Constraints
- Technical: Read/analyze only; no implementation and no structural repo changes.
- Performance: Not applicable (documentation analysis).
- UX: Keep analysis framing deterministic and auditable.
- Compatibility: Preserve Phase-1 authority contracts and existing behavior outside scope.
- Legal/Compliance (if relevant): Not applicable.
- Namespace clarification must remain explicit:
  - Workflow classification: `Minor Change (workflow)` / `BMAD Feature`
  - Version classification: `SemVer PATCH` / `SemVer MINOR` / `SemVer MAJOR`
- Explicit version decision for this break artifact: `no SemVer change` (documentation planning scope only).

## 7) Unknowns / Open Questions
- None at break stage but Unknowns may emerge during artifact-phase mapping and must be appended to questions.md.
- Any unknowns discovered in subsequent analysis must be appended to:
  - `docs/_edb-development-history/features/phase-2a-lifecycle-repo-gap-analysis/questions.md`

## 8) Success Criteria (high level)
- Lifecycle phases (Trigger -> Stabilization) can be mapped to concrete repository artifacts without ambiguity.
- Normative overlap checks are explicitly bounded to Branch, Release, Project Classification, and Versioning references.
- Drift outcomes can be classified using only `Clean`, `Minor Drift`, or `Structural Drift`.
- Scope explicitly excludes hidden Phase-2 expansion and implicit orchestrator construction.
- The artifact is sufficient to proceed to Phase-2A modeling without introducing new requirements.
