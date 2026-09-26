---
title: "Scrum"
description: "Scrum is an agile framework for developing complex products through short iterations, clear roles, and regular reflection."
keywords:
    - SCRUM
    - Agile
    - Sprints
tags:
    - ap2
---

# Scrum

## Overview

Scrum is an **agile framework** for developing complex products. It is used particularly often in software development and is based on short iterations called **sprints**, clear **roles**, and regular **reflection**.

---

## The 3 roles

A Scrum team consists of one Product Owner, one Scrum Master, and the Developers. It typically has 10 or fewer members and no sub-teams or hierarchies. These roles are also called **accountabilities**.

### Product Owner (PO)

The Product Owner is the **single person responsible for the product**. They represent the interests of stakeholders.

**Tasks**:

- Maintains and prioritizes the product backlog
- Defines requirements (user stories)
- Decides what will be built
- Tests results

### Scrum Master

The Scrum Master is **responsible for the process** itself. They are not a traditional manager but a **servant leader**.

**Tasks**:

- Ensures that Scrum is applied correctly
- Removes obstacles (impediments)
- Coaches the team
- Moderates meetings

### Developers

The Developers are the people in the Scrum team who **implement the requirements**. The Scrum team is **self-managing**: it decides internally who does what, when, and how, without being directed by outsiders.

- Cross-functional
- Create the sprint backlog
- Create at least one usable increment per sprint

---

## The 5 events

### Sprint

A sprint is a **fixed time period** during which the team works on a set of tasks. It is the **heartbeat of Scrum**, providing a regular rhythm for planning, building, and reviewing work.

- **Duration:** 1 month at most (commonly 2-4 weeks)
- **Goal:** Finished, usable increment

**Important**: During a sprint, no changes that jeopardize the sprint goal should be introduced.

### Sprint Planning

At the beginning of each sprint, the **entire Scrum team** meets to decide what work will be taken on. The team selects items from the product backlog and creates a plan for how to deliver them.

**Result**:

- Sprint Goal
- Sprint Backlog

### Daily Scrum / Daily Standup

The Daily Scrum is a **short synchronization meeting** where the Developers align on progress and identify blockers. It is also called a "standup" because participants often stand during the meeting to encourage brevity and ensure the **15-minute timebox** is respected.

- **Duration:** 15 minutes
- **Participants:** Developers

No fixed structure is prescribed. Three questions are common:

- What did I do yesterday?
- What am I doing today?
- Are there any obstacles?

### Sprint Review

At the end of each sprint, the team **presents the finished increment** to stakeholders. The purpose is to gather **feedback** and collaboratively decide on the next steps for the product.

- Presentation of results
- Feedback from stakeholders
- Adjustment of the product backlog

### Sprint Retrospective (Retro)

The retrospective is an **internal meeting** for the Scrum team to reflect on the past sprint. The goal is to identify **concrete improvements** for the next sprint, making this the key event for continuous improvement.

Typical questions:

- What went well?
- What went badly?
- How can we improve?

---

## The 3 artifacts

Each artifact has a **commitment** against which its progress is measured: the product backlog has the [product goal](#product-goal), the sprint backlog the [sprint goal](#sprint-goal), and the increment the [Definition of Done](#definition-of-done-dod).

### Product Backlog

The product backlog is the **single source of truth** for all work that needs to be done on the product. It is a **living document** that evolves as the product and its environment change.

- A prioritized list of all requirements
- Maintained by the Product Owner
- Entries mostly in the form of user stories (e.g. "As a user, I want X so that Y")

### Sprint Backlog

The sprint backlog contains the **subset of the product backlog** selected for the current sprint, the [sprint goal](#sprint-goal), and a plan for delivering the selected items.

- Filled with tasks for the current sprint
- Created by the Developers
- Concrete and feasible

### Increment

An increment is a **concrete step** toward the [product goal](#product-goal) and adds to all previous increments. Several increments can be created within one sprint, and their sum is presented at the sprint review. Each increment must be in a **usable state** regardless of whether the Product Owner decides to release it.

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

### Product Goal

The product goal describes a **future state of the product** and serves as the long-term objective of the Scrum team. The Scrum team pursues exactly one product goal at a time. It must be fulfilled or abandoned before the next one is taken on.

### Sprint Goal

The sprint goal is an **overarching objective** that gives the team a shared direction for the sprint. It should describe a **meaningful outcome** rather than a list of tasks.

Not "complete 5 tickets", but for example:

- "Users can register and log in"
- "Users can give feedback with a dedicated button"

### Velocity

Velocity measures the **average number of story points** a team completes per sprint. It is used as a **planning tool** to forecast how much work can realistically be taken on in future sprints. It is not a tool for ranking performance.

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

## Pros and cons of Scrum

### Pros

- Fast delivery of value
- High flexibility
- Early feedback through stakeholders
- Transparency
- Continuous improvement

### Cons

In practice, Scrum is often implemented incorrectly. This leads to common anti-patterns:

- Misunderstood role of the Product Owner
- Scrum Master as a "mini-boss"
- Daily as a long status meeting for managers
- No real self-management
- "We do Scrum, but..."

---

## Difference from traditional project management (e.g. waterfall model)

| Waterfall                       | Scrum                              |
| ------------------------------- | ---------------------------------- |
| Fixed planning at the beginning | Iterative approach                 |
| Changes are expensive           | Changes are planned for            |
| One delivery                    | Regular updates through increments |
| Strong hierarchy                | Self-managing                      |
