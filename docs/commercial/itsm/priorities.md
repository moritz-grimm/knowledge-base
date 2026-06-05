---
title: Prioritisation in IT Support
description: "The ITIL Priority Matrix (Urgency x Impact) and the Eisenhower Matrix as tools for prioritising incidents and tasks in IT support"
keywords:
  - "ITIL Priority Matrix"
  - "Urgency"
  - "Impact"
  - "Eisenhower Matrix"
  - "Prioritisation"
  - "Incident Priority"
  - "Response Time"
  - "SLA"
---

# Prioritisation in IT Support

## Overview

Two main tools are used for prioritisation in IT support: the **ITIL Priority Matrix** and the **Eisenhower Matrix**.

## ITIL Priority Matrix

### Urgency Levels

| Level          | Description                                                                                                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High (H)**   | Damage from the incident increases rapidly. Tasks that cannot be fulfilled are very time-critical. Rapid action can prevent a Minor Incident from becoming a [Major Incident](./incident-management.md#major-incident). Multiple VIP users are affected. |
| **Medium (M)** | Damage increases over time. Tasks that cannot be fulfilled are only moderately time-critical. One VIP user is affected.                                                                                                                                  |
| **Low (N)**    | Damage does not increase over time. Tasks that cannot be fulfilled are not time-critical.                                                                                                                                                                |

### Impact Levels

| Level          | Description                                                                                                                                                                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High (H)**   | Large number of employees affected and/or unable to fulfil their tasks. Large number of customers affected or substantially impaired. Financial damage likely > 10,000 EUR. Reputation damage in large scope likely. Risk to life and limb.   |
| **Medium (M)** | Moderate number of employees affected and/or unable to fulfil tasks as planned. Moderate number of customers affected or experiencing comfort restrictions. Financial damage likely 1,000–10,000 EUR. Moderate reputation damage likely.      |
| **Low (N)**    | Minimal number of employees affected; can still fulfil tasks but with additional effort. Minimal number of customers affected; only minor comfort restrictions. Financial damage likely < 1,000 EUR. Only minimal reputation damage expected. |

### Priority Matrix

The **Urgency x Impact matrix** produces a priority level from 1 (most critical) to 5 (lowest):

|               | **Impact H** | **Impact M** | **Impact N** |
| ------------- | ------------ | ------------ | ------------ |
| **Urgency H** | **1**        | 2            | 3            |
| **Urgency M** | 2            | **3**        | 4            |
| **Urgency N** | 3            | 4            | **5**        |

### Priority Codes and [SLA](./sla.md) Response/Resolution Times

| Priority | Description             | Response time | Resolution time |
| -------- | ----------------------- | ------------- | --------------- |
| **1**    | Kritisch (Critical)     | Immediately   | 1 hour          |
| **2**    | Hoch (High)             | 10 minutes    | 4 hours         |
| **3**    | Mittel (Medium)         | 1 hour        | 8 hours         |
| **4**    | Niedrig (Low)           | 4 hours       | 24 hours        |
| **5**    | Sehr niedrig (Very low) | 1 day         | 1 week          |

## Eisenhower Matrix

The **Eisenhower Matrix** is a time management method for distinguishing between important and urgent tasks. Named after US President Dwight D. Eisenhower (1953–1961). Also called: Four-Quadrant Method, Eisenhower Method, or Eisenhower Box.

**Goal:** Not to do things right, but to do the right things (effectiveness, not just efficiency).

Two questions per task:

1. How important is the task?
2. How urgent is the task?

### The Four Quadrants

|                   | **Urgent**                        | **Not urgent**                            |
| ----------------- | --------------------------------- | ----------------------------------------- |
| **Important**     | **A: Do** (immediately, yourself) | **B: Schedule** (plan and set a deadline) |
| **Not important** | **C: Delegate** (or automate)     | **D: Discard** (archive or delete)        |

### Principles

- Important tasks are those directly related to defined goals
- Urgent tasks tolerate no delay and should ideally be handled immediately
- Tasks that are important AND urgent: handle yourself, as fast as possible
- Tasks that are urgent but NOT important: delegate or automate if possible; if not, handle after A-tasks
- Tasks that are important but NOT urgent: plan and schedule; these are lower priority than A-tasks
- Tasks that are neither important nor urgent: do not process; archive or delete as appropriate

## Comparison: ITIL Matrix vs. Eisenhower Matrix

| Criterion           | ITIL Priority Matrix                                                                                                        | Eisenhower Matrix                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **Purpose**         | Prioritising IT [incidents](./incident-management.md)/[problems](./problem-management.md)/[changes](./change-management.md) | Prioritising personal or team tasks        |
| **Dimensions**      | Urgency x Impact (business-oriented)                                                                                        | Urgency x Importance (goal-oriented)       |
| **Scale**           | 5 priority levels with defined [SLA](./sla.md) times                                                                        | 4 quadrants with actions                   |
| **Best suited for** | IT Service Desk, structured teams                                                                                           | Self-management, general task organisation |
| **Practicality**    | Objective, standardised, scalable                                                                                           | Simpler, more flexible, less structured    |
