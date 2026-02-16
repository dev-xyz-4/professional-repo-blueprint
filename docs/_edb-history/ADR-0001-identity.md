# ADR-0001: Repository Identity as Engineering Delivery Blueprint (EDB)

## Status
Accepted

## Context

The repository combines two first-class concerns:

- BMAD-powered delivery operations (`docs/bmad`)
- Engineering governance baseline (`docs/engineering`)

Without an explicit identity declaration, the repository can be interpreted too narrowly as governance-only or process-only.

## Decision

The repository identity is formally declared as:

**Engineering Delivery Blueprint (EDB)**.

Positioning:

- BMAD-powered delivery operating model
- Engineering Governance Baseline

This ADR anchors naming and positioning and is the canonical reference for repository identity.

## Consequences

- Repository descriptions should consistently use "Engineering Delivery Blueprint (EDB)".
- BMAD and Engineering Governance are treated as complementary, not competing, pillars.
- This ADR is declarative only and does not introduce new governance rules, workflows, or enforcement.
- Structural changes must remain consistent with this identity framing.
