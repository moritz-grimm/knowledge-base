---
title: Network Plan (CPM)
description: A network plan models project tasks as a directed graph to identify dependencies, calculate earliest and latest times, and determine the critical path.
keywords:
    - Network Plan
    - Netzplan
    - CPM
    - Critical Path Method
    - Critical Path
    - Project Planning
    - Project Management
draft: true
---

# Network Plan (CPM)

## Overview

A network plan (based on the **Critical Path Method, CPM**) is a directed graph that models tasks as nodes with arrows representing dependencies. It enables precise scheduling and identification of bottlenecks.

## Node Structure

Each node in the network plan contains the following fields:

```
┌──────────────────────┐
│  Task Name           │
├────────┬─────────────┤
│ EAT   │ EET          │
├────────┼─────────────┤
│ Buffer │ Duration    │
├────────┼─────────────┤
│ LAT   │ LET          │
└────────┴─────────────┘
```

- **EAT** (Earliest Start Time / Frühester Anfangszeitpunkt): earliest the task can begin
- **EET** (Earliest End Time / Frühester Endzeitpunkt): earliest the task can end
- **LAT** (Latest Start Time / Spätester Anfangszeitpunkt): latest the task can begin without delaying the project
- **LET** (Latest End Time / Spätester Endzeitpunkt): latest the task can end
- **Buffer / Puffer**: `LAT − EAT`; the amount of time a task can be delayed without impact

## Calculating the Plan

**Forward pass** – Calculate EAT and EET from left to right:

- EET = EAT + Duration
- If a task has multiple predecessors, EAT = the maximum EET of all predecessors

**Backward pass** – Calculate LAT and LET from right to left:

- LAT = LET − Duration
- If a task has multiple successors, LET = the minimum LAT of all successors

## Critical Path

The critical path is the longest sequence of dependent tasks from project start to finish. Tasks on the critical path have a **buffer of zero** — any delay directly pushes back the overall project end date.

## Advantages

- Explicitly models task dependencies
- Identifies the critical path and scheduling bottlenecks
- Allows precise calculation of earliest and latest start/end times
- Better suited for complex, dependency-heavy projects

## Disadvantages

- More complex to construct and read than a Gantt chart
- Less intuitive for non-technical stakeholders
- Requires accurate duration estimates to be meaningful
