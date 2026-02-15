# GOVERNANCE MODEL GUIDE

Generated on: 2026-02-15

------------------------------------------------------------------------

## Purpose

Clarify the normative models used across the Engineering Layer and define their interoperability.

------------------------------------------------------------------------

## Model 1: Compliance Model

Definition:
- MUST
- SHOULD
- MAY
- NOT REQUIRED

Purpose:
- Defines baseline obligations.
- Used in scope-based governance guides.

Interpretation:
- MUST -> required; absence blocks readiness.
- SHOULD -> expected; deviation requires explicit rationale.
- MAY -> optional.
- NOT REQUIRED -> no baseline obligation.

------------------------------------------------------------------------

## Model 2: Depth Model

Definition:
- Minimal
- Standard
- Extended

Purpose:
- Defines maturity depth.
- Used for scaling implementation intensity within obligations.

Interpretation:
- Minimal -> baseline viable implementation.
- Standard -> recommended operational level.
- Extended -> high-assurance or high-risk contexts.

------------------------------------------------------------------------

## Interoperability Rule

The two models are orthogonal:

- Compliance defines whether something is required.
- Depth defines how deeply it is implemented.
- They operate on different governance axes.

Example:
- A requirement may be MUST (compliance) but implemented at Minimal depth in low-risk contexts.
- A requirement may be SHOULD and implemented at Extended depth in high-risk contexts.

------------------------------------------------------------------------

## Governance Boundary

This document:

- Does not alter existing guide semantics.
- Does not introduce enforcement mechanisms.
- Does not override project-level instance documents.
- Does not modify BMAD feature governance.

------------------------------------------------------------------------

## Version

Initial baseline established at v1.0.0.
