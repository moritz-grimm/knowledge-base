---
title: Scrum
description: Scrum is an agile framework for developing complex products through short iterations, clear roles, and regular reflection.
keywords:
    - SCRUM
    - Agile
    - Sprints
---

:::info

This page has not been translated into German yet

:::

# Scrum

## Overview

Scrum is an **agile framework** for developing complex products. It is especially often used in software development and is based on short iterations called **sprints**, clear **roles**, and regular **reflection**.

**Goals**:

- Fast delivery of value
- High transparency
- Continuous improvement
- Adaptability to change

---

## The 3 roles

### Product Owner (PO)

The Product Owner is the **single person responsible for the product**. They represent the interests of stakeholders and decide which features the team is working on.

**Tasks**:

- Maintains and prioritizes the product backlog
- Defines requirements (user stories)
- Decides what will be built
- Tests results

### Scrum Master

The Scrum Master is **responsible for the process** itself. They are not a traditional manager but rather a **servant leader** who makes sure the team follows the Scrum framework correctly.

**Tasks**:

- Ensures that Scrum is applied correctly
- Removes obstacles (impediments)
- Coaches the team
- Moderates meetings

### Dev Team

The development team is the group that **implements the requirements**. It is **self-organized**, meaning the team decides internally how to accomplish the work without being directed by outsiders.

- 3-9 people
- Interdisciplinary
- Self-organized
- Delivers a finished increment at the end of each sprint

---

## The 5 events

### Sprint

A sprint is a **fixed time period** during which the team works on a set of tasks to produce a usable increment. It is the **heartbeat of Scrum**, providing a regular rhythm for planning, building, and reviewing work.

- **Duration**: 2-4 weeks
- **Goal**: Finished, usable increment

**Important**: During a sprint, no changes that jeopardize the sprint goal should be introduced.

### Sprint Planning

At the beginning of each sprint, the **entire Scrum team** meets to decide what work will be taken on. The team selects items from the product backlog and creates a plan for how to deliver them.

**Result**:

- Sprint Goal
- Sprint Backlog

### Daily Scrum / Daily Standup

The Daily Scrum is a **short synchronization meeting** where the development team aligns on progress and identifies blockers. It is also called a "standup" because participants often stand during the meeting to encourage brevity and ensure the **15-minute timebox** is respected.

- **Duration**: 15 minutes
- Only the dev team participates

**Questions**:

- What did I do yesterday?
- What am I doing today?
- Are there any obstacles?

### Sprint Review

At the end of each sprint, the team **presents the finished increment** to stakeholders. The purpose is to gather **feedback** and collaboratively decide on the next steps for the product.

- Presentation of results
- Feedback from stakeholders
- Product backlog is adjusted

### Sprint Retrospective (Retro)

The retrospective is an **internal meeting** for the Scrum team to reflect on the past sprint. The goal is to identify **concrete improvements** for the next sprint, making this the key event for continuous improvement.

- Only the Scrum team
- What went well?
- What went badly?
- How can we improve?

---

## The 3 artifacts

### Product Backlog

The product backlog is the **single source of truth** for all work that needs to be done on the product. It is a **living document** that evolves as the product and its environment change.

- A prioritized list with every requirement
- Maintained by the product owner
- Dynamic, constantly changing
- Entries are formulated as user stories most of the time (e.g. "As a user, I want X so that Y")

### Sprint Backlog

The sprint backlog is the **subset of the product backlog** that the team commits to delivering during the current sprint. It also includes a plan for how the team intends to accomplish the work.

- Filled with tasks for the current sprint
- Created by the dev team
- Concrete and feasible

### Increment

The increment is the **sum of all completed product backlog items** at the end of a sprint. It must be in a **usable state** regardless of whether the Product Owner decides to release it.

- Finished, tested product component
- Must comply with the [Definition of Done (DoD)](#definition-of-done-dod)

---

## Important terms

### Definition of Done (DoD)

The Definition of Done is a **shared agreement** within the team that defines clear criteria for when a backlog item is considered "finished." It ensures **consistent quality** and prevents incomplete work from being delivered.

**Example**:

- Code written
- Tests green
- Review conducted
- Documentation updated

### Sprint Goal

The sprint goal is an **overarching objective** that gives the team a shared direction for the sprint. It should describe a **meaningful outcome** rather than just a list of tasks.

Not just "complete 5 tickets," but rather, for example:

- "Users can register and log in"
- "Users can give feedback with a dedicated button"

### Velocity

Velocity measures the **average number of story points** a team completes per sprint. It is used as a **planning tool** to forecast how much work can realistically be taken on in future sprints.

- Helps with planning
- Not a performance ranking tool

### Story Points

Story points are a **relative unit of estimation** used to express the overall effort needed to implement a backlog item. Rather than estimating in hours, teams **compare items against each other**.

- Often Fibonacci (1, 2, 3, 5, 8, 13, ...)
- Takes into account complexity, risk, and effort

---

## Typical sprint process

1. [Sprint Planning](#sprint-planning)
2. Development + [Daily Standups](#daily-scrum--daily-standup)
3. [Sprint Review](#sprint-review)
4. [Sprint Retro](#sprint-retrospective-retro)
5. New sprint

---

## Pros and Cons of Scrum

### Pros

- High flexibility
- Early feedback through stakeholders
- Transparency
- Continuous improvement

### Cons

In practice, Scrum is often implemented incorrectly, leading to common anti-patterns:

- Incorrect role of the product owner
- Scrum Master as a "mini-boss"
- Daily becomes a long status meeting for managers
- No real self-organisation
- "We do Scrum, but..."

---

## Difference from traditional project management (e.g., waterfall model)

| Waterfall                       | Scrum                              |
| ------------------------------- | ---------------------------------- |
| Fixed planning at the beginning | Iterative approach                 |
| Changes are expensive           | Changes are planned for            |
| One delivery                    | Regular updates through increments |
| Strong hierarchy                | Self-organized                     |
