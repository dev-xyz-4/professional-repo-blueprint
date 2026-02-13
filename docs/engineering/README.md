# Engineering Layer

## Purpose

This directory contains repository-level engineering governance.

It defines standards and operational policies that are **orthogonal to BMAD** and independent of individual features.

While BMAD structures feature development, the Engineering Layer governs:

- Security
- Versioning
- Release discipline
- Testing strategy
- Performance standards
- Observability
- Technical debt management
- Refactor documentation

---

## Separation of Concerns

The repository is structured into three distinct layers:

### 1) docs/00-project/
Project identity and context:
- Scope
- Risk profile
- Architecture overview
- Glossary

### 2) docs/bmad/
Feature governance:
- Break → Model → Analyze → Deliver
- Feature-specific documentation
- Implementation contracts

### 3) docs/engineering/
System-level governance:
- Policies
- Standards
- Operational procedures
- Quality enforcement

These layers must not be mixed.

---

## Engineering Documents

The following files are project-specific and must be filled according to project scope:

- security.md
- versioning.md
- release.md
- testing.md
- performance.md
- observability.md
- debt.md
- refactor-log.md

These are living documents and evolve with the system.

---

## Guides

The `guides/` directory contains scope-dependent reference documents.

They define:
- Minimum requirements per project type
- Escalation criteria
- Governance boundaries

Guides are generic and reusable across repositories.

---

## Templates

The `templates/` directory contains reusable blueprints for:

- Security policies
- Testing strategies
- Release processes
- Architectural Decision Records (ADR)

Templates are used when initializing a new repository or formalizing a new governance area.

---

## Core Principle

The Engineering Layer:

- Does not define features.
- Does not modify BMAD workflows.
- Does not expand implementation scope.

It ensures:

- Reproducibility
- Stability
- Traceability
- Long-term maintainability

---

## Versioning

Changes to governance documents must be version-controlled.

Structure is part of the system and must evolve deliberately.
