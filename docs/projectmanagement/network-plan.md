---
title: "Network Plan"
description: "A network plan models project tasks as a directed graph to identify dependencies, calculate earliest and latest times, and determine the critical path."
keywords:
    - Network Plan
    - CPM
    - Critical Path
    - Project Planning
    - Project Management
---

# Network Plan

## Overview

:::info
There are different network planning methods, such as CPM (Critical Path Method), PERT, and MPM. This article covers the CPM.
:::

A network plan is a directed graph that models tasks as nodes with arrows representing dependencies. It enables precise scheduling and identification of bottlenecks.

## Node Structure

Each node in the network plan contains the following fields:

```text
┌──────────────────────────┐
│         Task Name        │
├─────────────┬────────────┤
│ EAT         │ EET        │
├─────────────┼────────────┤
│ Total Float │ Free Float │
├─────────────┼────────────┤
│ LAT         │ LET        │
├─────────────┴────────────┤
|          Duration        |
└──────────────────────────┘
```

- **EAT** (Earliest Start Time): earliest the task can begin
- **EET** (Earliest End Time): earliest the task can end
- **LAT** (Latest Start Time): latest the task can begin without delaying the project
- **LET** (Latest End Time): latest the task can end
- **Free Float**: `min(EAT of all successors) − EET`; how far a task can be delayed without delaying any of its immediate successors
- **Total Float**: `LAT − EAT`; the amount of time a task can be delayed without delaying the project end date

## Buffer Types

**Free Float** describes *local* flexibility: how long a task can slip before it delays any of its immediate successors. It looks only one step ahead in the network.

**Total Float** describes *global* flexibility: how long a task can slip before the overall project end date is affected, regardless of intermediate effects.

The two always satisfy `Free Float ≤ Total Float`. When `Total Float > Free Float`, a delay larger than the Free Float shifts a successor earlier in the chain, but that successor has enough Total Float of its own to absorb the impact without pushing back the project end. Tasks on the critical path have both values equal to zero.

## Calculating the Plan

**Forward pass** – Calculate EAT and EET from left to right:

- EET = EAT + Duration
- If a task has multiple predecessors => EAT = the maximum EET of all predecessors

**Backward pass** – Calculate LAT and LET from right to left:

- LAT = LET − Duration
- If a task has multiple successors => LET = the minimum LAT of all successors

## Critical Path

The critical path is the longest sequence of dependent tasks from project start to finish. Tasks on the critical path have a **Total Float of zero**, meaning any delay directly pushes back the overall project end date.

## Advantages

- Explicitly models task dependencies
- Identifies the critical path and scheduling bottlenecks
- Allows precise calculation of earliest and latest start/end times
- Better suited for complex, dependency-heavy projects

## Disadvantages

- More complex to construct and read than a [Gantt chart](./gantt.md)
- Less intuitive for non-technical stakeholders
- Requires accurate duration estimates to be meaningful

## Example

**Project:** Website Launch

| ID | Task                  | Duration | Predecessors |
|----|-----------------------|----------|--------------|
| A  | Requirements Analysis | 2 days   | —            |
| B  | UI Design             | 3 days   | A            |
| C  | Backend Development   | 5 days   | A            |
| D  | Frontend Development  | 4 days   | B            |
| E  | Integration           | 2 days   | C, D         |
| F  | Testing               | 3 days   | E            |
| G  | Deployment            | 1 day    | F            |

**Network structure:**

```text
    ┌──► B ──► D ───┐
A ──┤               ├──► E ──► F ──► G
    └──► C ─────────┘
```

**Calculated node values:**

```text
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  A: Requirements     │      │  B: UI Design        │      │  C: Backend Dev      │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 0  │  EET: 2   │      │  EAT: 2  │  EET: 5   │      │  EAT: 2  │  EET: 7   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  2  │  FF:  2   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 0  │  LET: 2   │      │  LAT: 2  │  LET: 5   │      │  LAT: 4  │  LET: 9   │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 2        │      │        Dur: 3        │      │        Dur: 5        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  D: Frontend Dev     │      │  E: Integration      │      │  F: Testing          │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 5  │  EET: 9   │      │  EAT: 9  │  EET: 11  │      │  EAT: 11 │  EET: 14  │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 5  │  LET: 9   │      │  LAT: 9  │  LET: 11  │      │  LAT: 11 │  LET: 14  │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 4        │      │        Dur: 2        │      │        Dur: 3        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐
│  G: Deployment       │
├──────────┬───────────┤
│  EAT: 14 │  EET: 15  │
├──────────┼───────────┤
│  TF:  0  │  FF:  0   │
├──────────┼───────────┤
│  LAT: 14 │  LET: 15  │
├──────────┴───────────┤
│        Dur: 1        │
└──────────────────────┘
```

**Critical path:** A => B => D => E => F => G (15 days total)

Task C has a Total Float of 2 days (which also equals its Free Float here) and is not on the critical path, so backend development can start up to 2 days late without delaying any successor or the project end date.
