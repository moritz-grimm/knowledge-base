---
title: Change Management
description: "Change management in ITSM: RFC, change types (Standard, Normal, Emergency), approval bodies (CAB, CIO, EC/ECAB), FSC, CMDB, and PIR"
keywords:
  - "Change Management"
  - "RFC"
  - "Request for Change"
  - "CAB"
  - "Change Advisory Board"
  - "Standard Change"
  - "Normal Change"
  - "Emergency Change"
  - "CMDB"
  - "FSC"
  - "PIR"
sidebar_position: 3
---

# Change Management

## Overview

**Change Management** is the third level of ITSM. It handles the approval and planning of changes to the IT system.

**Goal:** ensure that changes are not made hastily and without a full overview. Specialists from different areas assess risks to avoid follow-up errors. Only Emergency Changes can bypass this process, because the highest priority there is the fastest possible restoration of the system.

## Request for Change (RFC)

Before a change is executed, a **Request for Change (RFC)** is created, typically by [Problem Management](./problem-management.md). The RFC is a formal request to carry out a change. It contains:

- Description of the change
- Reason for the change
- Timeline
- Priority
- Expected side effects
- Estimated costs

The RFC describes **what** needs to be done, but not **how**, since the how is worked out in the Change Management process.

## RFC Prioritisation

Incoming RFCs are prioritised by **urgency** and **impact**:

### Urgency Levels

| Level                  | Description               |
| ---------------------- | ------------------------- |
| **Priority Low**       | Desirable but not urgent  |
| **Priority Middle**    | Necessary but not urgent  |
| **Priority High**      | Immediate action required |
| **Priority Immediate** | Immediate action required |

### Impact Levels

| Level             | Description                                  | Example                |
| ----------------- | -------------------------------------------- | ---------------------- |
| **Effect Low**    | Minimal effect on IT services, little effort | Swapping one PC        |
| **Effect Middle** | Moderate effect, increased effort            | Upgrading all PCs' OS  |
| **Effect High**   | High effect on IT services, very high effort | Complete server outage |

## Change Types

| Type                                  | Characteristics                                                                               | Approval             |
| ------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------- |
| **Standard Change**                   | Pre-approved routine changes from a catalogue; low risk; automatically authorised             | Change Manager alone |
| **Normal Change**                     | Medium risk, medium complexity, moderate urgency; requires evaluation by experts              | CAB + CIO            |
| **Emergency Change (Notfall Change)** | High urgency, short-term solution required; structured approval process is bypassed for speed | EC / ECAB            |

## Approval Bodies

| Body                                | Description                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Change Manager (CM)**             | Decides alone on low-reach changes (Standard Change); responsible for time management and monitoring                           |
| **Change Advisory Board (CAB)**     | Expert committee from various business areas; decides on medium-reach changes (Normal Change)                                  |
| **Chief Information Officer (CIO)** | Board/management-level person representing IT interests; involved in decisions with large business scope (e.g. staff training) |
| **Emergency Committee (EC / ECAB)** | Small, highly authorised expert team for urgent decisions; handles Emergency Changes                                           |

## Change Planning

### Forward Schedule of Change (FSC)

A calendar in which all planned long-term changes are documented. Planning should always aim to minimise downtime.

### Configuration Management Database (CMDB)

A central database where all CIs are stored with their specifications and licence numbers. All changes to CIs are documented here centrally.

Change Manager (CM) is responsible for time-controlled implementation and monitoring of changes.

## Approving and Executing Changes

The separation between approving/authorising and planning/executing a change is intentional in ITSM. This ensures:

- Sustainable decisions by specialists who consider the overall system
- Prevention of reactive error fixing without considering the broader context
- Documented accountability

## Closing a Change (PIR)

After a change is implemented, Change Management documents all measures and the root cause for the failure in the CMDB and KEDB for future reference.

The **Post Implementation Review (PIR)** documents all key points of the change:

- Test results
- Implementation details
- Changes from the previous system state
- Costs and effort
- Timestamps

**Goal of the PIR:** drive continuous improvement by reviewing and evaluating completed changes.

## Change Types and Approval Summary

| Change type      | Approval body  | Key characteristic                         |
| ---------------- | -------------- | ------------------------------------------ |
| Standard Change  | Change Manager | Catalogue-based, pre-approved, low risk    |
| Normal Change    | CAB + CIO      | Medium risk, CAB involved                  |
| Emergency Change | EC / ECAB      | Maximum speed, structured process bypassed |
