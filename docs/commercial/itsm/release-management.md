---
title: Release Management
description: "Release management in ITSM: executing changes smoothly via Big Bang or Phased rollout, release packages, rollback, virtual machines, and the PIR"
keywords:
  - "Release Management"
  - "Big Bang"
  - "Phased Rollout"
  - "Release Package"
  - "Rollback"
  - "Virtual Machine"
  - "PIR"
  - "Change Management"
  - "ITSM"
sidebar_position: 4
---

# Release Management

## Overview

**Release Management** is the fourth level of ITSM and the continuation of Change Management. While Change Management approves and plans a change, Release Management **executes it**, aiming for a smooth, interruption-free rollout.

## Relationship to Change Management

| Change Management                                                | Release Management                                                  |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| Approves and plans changes                                       | Executes changes                                                    |
| Creates the [RFC](./change-management.md#request-for-change-rfc) | Implements the [RFC](./change-management.md#request-for-change-rfc) |
| Decides what and when                                            | Decides how and rolls it out                                        |

## Release Package

Before rollout, a **release package** is created containing all planned changes. Testing is done preferably on a [CI](./incident-management.md#configuration-items-ci) taken from the running production environment, updated, and returned to a test environment. After a defined problem-free test period, the release can be rolled out to all target systems.

A software distribution system helps distribute releases efficiently to many [CIs](./incident-management.md#configuration-items-ci).

## Rollout Approaches

### Big Bang

All recipients receive the release at the same time.

**Advantages:**

- Faster overall implementation
- All systems have the same update simultaneously
- More efficient troubleshooting (no version differences)

**Disadvantages:**

- High risk if errors occur (all systems affected at once)
- High load on infrastructure during rollout

### Phased

The release is rolled out to a **subset** of recipients first, then progressively to more.

**Advantages:**

- Lower risk (only part of the systems affected)
- Errors are detected earlier without major outages

**Disadvantages:**

- Implementation takes longer
- Different software versions running simultaneously during the transition

## Rollback

If a release unexpectedly fails in the production environment, a **rollback** to the previous state should always be available. After the rollout completes, the user is informed about the update via the process instances.

## Virtual Machines in Release Management

**Virtual Machine (VM):** a software-based encapsulation of a computer system that simulates a real PC on a host computer.

**Advantages:**

- Copies can be created, started, and modified easily and risk-free
- Physical systems can be converted to VMs (P2V = Physical to Virtual)

**Benefit for Release Management:** New versions, updates, and applications can be safely tested in a VM environment. Older versions can continue to run in parallel (resource efficiency).

## ITSM Process Overview

The four ITSM levels work together as a chain:

| Process                                             | Role                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| [**Incident Management**](./incident-management.md) | Records disruptions, filters out problems                    |
| [**Problem Management**](./problem-management.md)   | Identifies root causes, provides a workaround where possible |
| [**Change Management**](./change-management.md)     | Approves and plans sensible changes                          |
| [**Release Management**](./release-management.md)   | Executes changes safely                                      |

**Reason for this separation:** The orchestration of processes aims for sustainability and brings structure to a complex workflow.

## ITSM Processes and [IMAC/R/D Phases](./service-types.md#imacrd-lifecycle)

| IMAC/R/D Activity          | Relevant ITSM Processes                                                        |
| -------------------------- | ------------------------------------------------------------------------------ |
| Wartung (maintenance)      | Change Management, Release Management                                          |
| Inspektion (inspection)    | Problem Management, Change Management, Release Management                      |
| Instandsetzung (repair)    | Incident Management, Problem Management, Change Management, Release Management |
| Verbesserung (improvement) | Change Management, Release Management                                          |
