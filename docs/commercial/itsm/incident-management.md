---
title: Incident Management
description: "Incident management in ITSM: configuration items, categorisation, prioritisation, the incident record, major incidents, and support levels"
keywords:
  - "Incident Management"
  - "Configuration Item"
  - "CI"
  - "Incident Record"
  - "Major Incident"
  - "First Level Support"
  - "Service Request"
  - "Issue Tracking System"
sidebar_position: 1
---

# Incident Management

## Overview

**Incident Management** is the **first level of ITSM**, focused on helping users resume their work after an IT disruption as quickly as possible.

## Configuration Items (CI)

A **Configuration Item (CI)** is a broad term covering essentially all hardware and software. CIs are characterised by attributes and linked to other CIs.

| Category            | Examples                                               |
| ------------------- | ------------------------------------------------------ |
| Hardware systems    | PC, notebook, server, thin client                      |
| Hardware components | Graphics cards, network cards, hard drives, processors |
| Software components | Operating systems, application software                |
| Network components  | Router, switch, hub, repeater, patch panel, NAS        |
| Peripheral devices  | Printer, scanner, webcam                               |
| Mobile devices      | Tablet, smartphone, data capture devices               |

## Incident Definition

An **incident** is any unplanned interruption or quality reduction of an IT service. Even an event that could potentially impair an IT service in the future counts as an incident. This includes minor events such as replacing an empty toner cartridge.

**Top goal: restore the affected service as quickly as possible.**

## Categorisation

Incidents are categorised when first logged in the Issue Tracking System:

- **HW** = Hardware problem
- **SW** = Software problem
- **NW** = Network problem

Purpose: ensures the right team is responsible and the severity can be assessed correctly.

## Prioritisation

Prioritisation is determined by two factors:

- **Urgency (Dringlichkeit)**: How severely does the disruption affect the user's goal?
- **Impact (Auswirkung)**: How many people are affected by the disruption?

The combination of [urgency and impact](./priorities.md#itil-priority-matrix) determines the order in which incoming tickets are processed.

## Support Levels

| Level                    | Description                                                                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **First Level Support**  | Helpdesk / SPOC; handles simple issues using the Knowledge Base and acts as a "firewall" for Second Level Support by handling direct customer communication |
| **Second Level Support** | Experts for root cause analysis ([Problem Management](./problem-management.md)); re-evaluates the initial priority set by First Level                       |
| **Third Level Support**  | Manufacturer support or external specialists when Second Level cannot resolve the issue                                                                     |

## Incident Record

The **Incident Record** is a document containing all information about an incident, documenting its lifecycle from initial capture to resolution. It is an information document that must not be altered after the process instance is closed.

The 17 standard components:

1. ID / Identifier
2. Initial capture (date/time)
3. Notification type
4. Service desk agent
5. Reporter/user data
6. Communication channel
7. **Symptom description** (most important field; helps diagnose and research solutions)
8. Affected users, locations, and/or business areas
9. Affected services
10. Prioritisation
11. CI references
12. Incident category
13. Links to other incident records
14. Links to problem records
15. Incident status history
16. Activity history / tasks
17. Resolution and closure data

**Top 5 fields that must always be captured:** Prioritisation, Incident Category, ID, Affected User/Service, Communication Channel.

## Major Incident

A **Major Incident** is a high-priority, high-impact event causing a critical service outage or massive disruption that significantly affects business operations. It is typically assigned priority "Critical" or "High".

Characteristics:

- A significant number of customers or important customer groups are affected
- Costs and losses for customers and/or the service organisation are considerable
- The service provider's reputation is likely to be damaged
- The work and time effort to resolve the incident is likely large, and existing [SLA](./sla.md) agreements are likely to be violated

## Service Request vs. Incident

|                | Service Request                                            | Incident                                   |
| -------------- | ---------------------------------------------------------- | ------------------------------------------ |
| **Trigger**    | User actively contacts support with a question or wish     | Unplanned service disruption               |
| **Examples**   | Forgotten password, software question, new workplace setup | Printer fails, ERP unreachable, ransomware |
| **Handled by** | Usually fully resolved in First Level Support              | May require escalation to 2nd/3rd level    |
| **Process**    | Request Fulfillment                                        | Incident Management                        |
