---
title: "Activity Diagram"
description: "UML activity diagrams: notation, actions, control flow, decision and merge, loops, fork and join, swimlanes, and how the elements map to program control structures."
keywords:
    - UML
    - Activity Diagram
    - Control Flow
    - Decision Node
    - Merge Node
    - Fork and Join
    - Swimlane
    - Partition
    - Process Modelling
    - Behavioural Diagram
tags:
    - ap2
---

# Activity Diagram

## Overview

An activity diagram is a **behavioural** UML diagram. It describes a process as a sequence of actions connected by control flows, including branches, loops and steps that run in parallel.

Typical applications:

- Modelling a business process that runs across several departments or systems
- Describing an algorithm before it is implemented, independent of any language
- Detailing the steps inside a single use case
- Documenting an existing workflow for review with non-technical stakeholders

---

## Notation

| Element         | Notation                                     | Meaning                                                            |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| Initial node    | Filled circle `●`                            | Start of the activity, exactly one per diagram                     |
| Action          | Rounded rectangle                            | One indivisible work step, named *verb + object*                   |
| Activity (call) | Rounded rectangle with a rake symbol         | A step that is broken down in a diagram of its own                 |
| Control flow    | Solid arrow                                  | Order of execution, leads from one action to the next              |
| Guard           | `[condition]` written on a flow              | Condition under which that flow may be taken                       |
| Decision node   | Diamond, one incoming and several outgoing   | Branch, the outgoing flows carry mutually exclusive guards         |
| Merge node      | Diamond, several incoming and one outgoing   | Brings alternative paths back together, does **not** wait          |
| Fork            | Thick bar, one incoming and several outgoing | Splits the flow into concurrent flows                              |
| Join            | Thick bar, several incoming and one outgoing | Waits until every incoming flow has arrived                        |
| Activity final  | Filled circle in a ring `◉`                  | Ends the entire activity, including any paths still running        |
| Flow final      | Circle with a cross `⊗`                      | Ends only the path that arrives there, the activity continues      |
| Object node     | Plain rectangle on a flow                    | Data handed from one action to the next                            |
| Partition       | Labelled lane                                | The actor, role or system responsible for the actions in that lane |
| Note            | Dog-eared rectangle on a dashed line         | Comment without semantics                                          |

Naming rules that keep a diagram readable:

- Actions are named *verb + object*: `Validate order`, not `Order` and not `Validation`
- Guards are written in square brackets directly on the flow, never inside the action
- The remaining case of a branch is labelled `[else]` instead of a negated condition

---

## Building Blocks

### Sequence

Actions executed one after another. The flow leaves the initial node, passes through every action and ends at the activity final node.

```text
          ●
          │
          ▼
 ╭─────────────────╮
 │  Receive order  │
 ╰─────────────────╯
          │
          ▼
 ╭─────────────────╮
 │   Check stock   │
 ╰─────────────────╯
          │
          ▼
          ◉
```

### Decision and Merge

A decision node splits the flow into alternatives. Exactly one outgoing flow is taken, so the guards must be mutually exclusive and must cover every possible case. A merge node brings the alternatives back together, it passes on every path that arrives and never waits.

```text
                    │
                    ▼
              ╱───────────╲
             ╱   amount    ╲
             ╲   > 100 ?   ╱
              ╲───────────╱
               │         │
        [yes]  │         │ [no]
        ┌──────┘         └──────┐
        │                       │
        ▼                       ▼
╭───────────────╮       ╭───────────────╮
│Apply discount │       │  Keep price   │
╰───────────────╯       ╰───────────────╯
        │                       │
        └──────┐         ┌──────┘
               ▼         ▼
              ╱───────────╲
             ╱             ╲
             ╲             ╱
              ╲───────────╱
                    │
                    ▼
```

A branch with more than two outcomes uses one decision node with several guarded flows, which corresponds to `if / else if / else` or a `switch` statement. The merge node stays a single diamond regardless of how many paths lead into it.

### Loop

A loop is a control flow that leads back to an earlier point in the diagram. In the diagram below the decision sits *after* the action, so the body runs at least once, which corresponds to a `do … while` loop.

```text
              ●
              │
              ▼
     ╭─────────────────╮
┌───►│   Read record   │
│    ╰─────────────────╯
│             │
│             ▼
│       ╱───────────╲
│      ╱    more     ╲
│      ╲  records ?  ╱
│       ╲───────────╱
│        │         │
│  [yes] │         │ [no]
└────────┘         ▼
                   ◉
```

Placing the decision *before* the action instead, with the back edge entering above it, turns the same structure into a head-controlled `while` loop whose body may run zero times.

### Fork and Join

A fork splits one flow into several flows that run concurrently. A join waits until every incoming flow has arrived and only then continues as a single flow. Without a join the activity could end while parallel steps are still running.

```text
                  │
                  ▼
        ━━━━━━━━━━━━━━━━━━━━━
        │                   │
        ▼                   ▼
╭─────────────────╮ ╭─────────────────╮
│  Reserve stock  │ │   Charge card   │
╰─────────────────╯ ╰─────────────────╯
        │                   │
        ▼                   ▼
        ━━━━━━━━━━━━━━━━━━━━━
                  │
                  ▼
```

Concurrent in UML means *without a prescribed order*, not necessarily *at the same time on separate processors*. Whether the two branches run on two threads or simply in an arbitrary sequence is an implementation decision.

---

## Partitions (Swimlanes)

A partition groups actions by the actor, role, department or system that carries them out. Lanes may be drawn vertically or horizontally, the flow simply crosses the lane boundaries.

Rules worth keeping in mind:

- An action belongs to exactly one lane, the lane is the answer to *who does this*
- Decision and merge nodes belong to the lane of the actor who decides
- A fork may span several lanes, that is precisely how parallel work by different actors is shown
- The number of lane crossings is a rough measure of coordination effort in the process

---

## Mapping to Code

| Activity diagram                            | Program construct                                |
| ------------------------------------------- | ------------------------------------------------ |
| Actions in sequence                         | Statements one after another                     |
| Decision with two guards plus merge         | `if / else`                                      |
| Decision with several guards plus `[else]`  | `if / else if / else` or `switch`                |
| Back edge with the decision after the body  | `do … while`                                     |
| Back edge with the decision before the body | `while` or `for`                                 |
| Fork and join                               | Threads, tasks, `Promise.all`, parallel stream   |
| Called activity                             | Method or function call                          |
| Object node between two actions             | Return value passed on as a parameter            |
| Activity final                              | End of the method, `return`                      |
| Flow final                                  | One path terminates while the rest keeps running |

---

## Example: Processing an Online Order

Three partitions are involved: the customer, the shop system and the warehouse. The order is validated by the shop, an invalid order is rejected, a valid one is picked and shipped by the warehouse.

```text
      Customer       │       Shop System        │      Warehouse
─────────────────────┼──────────────────────────┼─────────────────────
          ●          │                          │
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │   Place order   │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          └──────────┼────────────┐             │
                     │            │             │
                     │            ▼             │
                     │   ╭─────────────────╮    │
                     │   │ Validate order  │    │
                     │   ╰─────────────────╯    │
                     │            │             │
                     │            ▼             │
                     │      ╱───────────╲       │
                     │     ╱    order    ╲      │
                     │     ╲   valid ?   ╱      │
                     │      ╲───────────╱       │
                     │       │         │        │
                     │ [no]  │         │ [yes]  │
          ┌──────────┼───────┘         └────────┼──────────┐
          │          │                          │          │
          ▼          │                          │          ▼
 ╭─────────────────╮ │                          │ ╭─────────────────╮
 │ Read rejection  │ │                          │ │   Pick items    │
 ╰─────────────────╯ │                          │ ╰─────────────────╯
          │          │                          │          │
          ▼          │                          │          ▼
          ◉          │                          │ ╭─────────────────╮
                     │                          │ │   Ship parcel   │
                     │                          │ ╰─────────────────╯
                     │                          │          │
          ┌──────────┼──────────────────────────┼──────────┘
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │ Receive parcel  │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          ▼          │                          │
          ◉          │                          │
```

What we can learn from this example:

- The customer starts the process, the initial node therefore sits in the customer lane
- `Validate order` is a single action here. If validation is complex it becomes a called activity with its own diagram
- The guards `[no]` and `[yes]` are mutually exclusive and cover every case, so the flow can never get stuck at the decision
- Both branches end in an activity final node, the process has two possible outcomes
- Nothing is said about *how* the order is validated or *how long* shipping takes, an activity diagram models control flow, not data structures or timing

A realistic extension would fork after `[yes]` so that `Charge card` in the shop lane and `Pick items` in the warehouse lane run concurrently, joined again before `Ship parcel`.

---

## Common Mistakes

1. **Missing or overlapping guards:** every outgoing flow of a decision needs a guard, the guards must be mutually exclusive and complete, otherwise the flow either has no path or several
2. **Decision used instead of fork:** a diamond means *one of these paths*, a bar means *all of these paths*
3. **Fork without join:** the activity may reach a final node while parallel flows are still running, and the final node then discards them
4. **Join without fork:** a join waits for a flow that never arrives and the process deadlocks
5. **Nouns as action names:** `Invoice` says nothing, `Create invoice` does
6. **Conditions inside the action:** the condition belongs on the outgoing flow, the action is what is done, not what is checked
7. **Several initial nodes:** an activity has exactly one starting point. Concurrent starts are modelled with a fork
8. **Lanes as decoration:** if the actors are drawn but the flow never crosses a lane boundary, the partitioning adds nothing
9. **Mixing control flow and data flow:** data passed between actions belongs in object nodes, not in the labels of control flows

---

## Tools

- draw.io / diagrams.net (free, browser-based, UML shape library included)
- PlantUML (text-based, diagram is generated from source and can be versioned)
- Mermaid (text-based, renders directly in Markdown on many platforms)
- Visual Paradigm, StarUML, Lucidchart (commercial, with free tiers)

## See Also

- [Class Diagram](./class-diagram.md): the structural counterpart, modelling classes and their relationships
- [ER Model](../databases/er-model.md): modelling the data that the actions in an activity diagram operate on
