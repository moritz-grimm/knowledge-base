---
title: "State Machine Diagram"
description: "UML state machine diagrams: states, transitions with trigger, guard and effect, entry, do and exit activities, composite states, regions, history states, and the state transition table."
keywords:
    - UML
    - State Machine Diagram
    - State Diagram
    - Transition
    - Guard
    - Entry Action
    - Composite State
    - Region
    - History State
    - State Transition Table
    - Behavioural Diagram
tags:
    - ap2
---

# State Machine Diagram

## Overview

A state machine diagram is a **behavioural** UML diagram. It describes the life cycle of a *single* object, component or system: which states it can be in, which events move it from one state to the next, and what happens on the way.

Typical applications:

- Order status in a shop system (`New`, `Paid`, `Shipped`, `Delivered`, `Cancelled`)
- Session or login handling (`Anonymous`, `Authenticated`, `Locked`, `Expired`)
- Device and connection states (`Off`, `Booting`, `Ready`, `Error`)
- Protocol and parser logic, where the next character is interpreted differently depending on the state
- The internal behaviour of a class whose methods are only allowed in certain states

---

## Notation

| Element               | Notation                                              | Meaning                                                                  |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| Initial pseudostate   | Filled circle `●`                                     | Where the life cycle begins, exactly one per region                      |
| State                 | Rounded rectangle with a name                         | A situation in which the object waits, named as an adjective or a noun   |
| Transition            | Arrow from one state to another                       | State change, labelled `trigger [guard] / effect`, every part optional   |
| Trigger               | Event name on the transition                          | The event that offers the transition, e.g. `cancel`, `timeout`           |
| Completion transition | Transition without a trigger                          | Fires as soon as the behaviour of the source state is finished           |
| Guard                 | `[condition]` on the transition                       | Boolean condition, the transition only fires if it evaluates to true     |
| Effect                | `/ action` on the transition                          | Action executed while the transition fires, it must not block            |
| Self-transition       | Arrow leaving and re-entering the same state          | The state is left and entered again, `exit` and `entry` do run           |
| Internal transition   | `trigger / effect` inside the state box               | Reaction without a state change, `exit` and `entry` do **not** run       |
| Entry activity        | `entry / action` inside the state box                 | Runs every time the state is entered, regardless of the transition used  |
| Do activity           | `do / activity` inside the state box                  | Runs continuously while the state is active, may be interrupted          |
| Exit activity         | `exit / action` inside the state box                  | Runs every time the state is left, regardless of the transition used     |
| Composite state       | State box containing further states                   | A state broken down into substates                                       |
| Region                | Part of a composite state, separated by a dashed line | Substates that are active at the same time                               |
| Choice                | Diamond on a transition                               | Branch evaluated after the effect, outgoing transitions carry guards     |
| Shallow history       | Circle containing `H`                                 | On re-entry, the substate last active in that composite state is resumed |
| Deep history          | Circle containing `H*`                                | Resumes the last active substate including all nested levels             |
| Final state           | Filled circle in a ring `◉`                           | The life cycle ends here, the object accepts no further events           |

Naming rules that keep a diagram readable:

- States describe a condition, not an activity: `Paid`, `Waiting for payment`, not `Pay`
- Triggers are named after the event, not after the method that handles it: `cancel`, not `handleCancel`
- Effects and internal activities are named as operations with brackets: `/ refundPayment()`

---

## Building Blocks

### States and Transitions

```text
              ●
              │
              ▼
   ╭────────────────────────╮
   │         Idle           │
   ╰────────────────────────╯
              │
              │ coinInserted [amount >= price] / unlock()
              ▼
   ╭────────────────────────╮
   │        Ready           │
   ╰────────────────────────╯
              │
              │ productSelected / dispense()
              ▼
              ◉
```

Read as a sentence: *in state `Idle`, when the event `coinInserted` occurs and the condition `amount >= price` holds, `unlock()` is executed and the machine changes to `Ready`*. If the event occurs but the guard is false, the event is discarded and the state does not change.

### Self-Transition

After a self-transition the object is in the same state as before. On the way, the state is left and entered again, so `exit` and `entry` run and a `do` activity is restarted.

```text
        ┌───────────────────────────────────┐
        │   digitPressed / appendDigit()    │
        │                                   │
        │   ╭───────────────────────────╮   │
        └──►│        Collecting         │───┘
            ╰───────────────────────────╯
```

If restarting `entry`, `do` and `exit` is undesirable, an **internal transition** is used instead. It is written inside the state box and leaves the state active:

```text
╭───────────────────────────────────────────╮
│               Collecting                  │
├───────────────────────────────────────────┤
│ digitPressed / appendDigit()              │
╰───────────────────────────────────────────╯
```

For example, a timeout implemented as `entry / startTimer()` is reset by a self-transition and kept running by an internal transition.

### Internal Activities

Three keywords describe behaviour that belongs to the state itself rather than to a transition:

- `entry / action`: executed once on every entry, before any do activity
- `do / activity`: executed while the state is active, may run for a long time and may be interrupted by an outgoing transition
- `exit / action`: executed once on every exit, after the do activity has ended or been aborted

```text
╭───────────────────────────────────────────╮
│                 Heating                   │
├───────────────────────────────────────────┤
│ entry / switchHeaterOn()                  │
│ do / measureTemperature()                 │
│ exit / switchHeaterOff()                  │
╰───────────────────────────────────────────╯
```

The order for a state change is always: `exit` of the source state, then the effect of the transition, then `entry` of the target state.

Putting an action into `entry` instead of onto every incoming transition removes duplication and guarantees that the action cannot be forgotten when a new transition into that state is added later.

### Composite States

A composite state contains a state machine of its own. It keeps diagrams small and allows a transition to be drawn once for a whole group of substates.

```text
╭────────────────────────────────────────────────────────╮
│ Active                                                 │
│                                                        │
│    ●                                                   │
│    │                                                   │
│    ▼                                                   │
│  ╭───────────────────╮  connected  ╭───────────────────╮
│  │     Dialling      │────────────►│    Talking        │
│  ╰───────────────────╯             ╰───────────────────╯
│                                                        │
╰────────────────────────────────────────────────────────╯
              │
              │ hangUp
              ▼
   ╭───────────────────╮
   │       Idle        │
   ╰───────────────────╯
```

The transition `hangUp` starts at the *border* of the composite state, so it applies to `Dialling` and `Talking` alike.

Rules worth keeping in mind:

- A composite state needs its own initial pseudostate, otherwise it is undefined which substate becomes active
- Exactly one substate is active at a time per region, together with the composite state that contains it
- A transition may also point directly at a substate, which bypasses the initial pseudostate
- A final state inside a composite state ends that inner machine, which then triggers the outgoing completion transition of the composite state

### Regions and Parallel States

A composite state may be divided into **regions** by a dashed line. Each region has its own initial pseudostate, substates and transitions. While the composite state is active, one substate is active in every region at the same time. This models independent aspects of one object, such as audio and video of a recording.

```text
╭──────────────────────────────────────────────────────────╮
│ Recording                                                │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮   muteAudio   ╭───────────────╮       │
│  │ AudioRunning  │──────────────►│  AudioMuted   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮  pauseVideo   ╭───────────────╮       │
│  │ VideoRunning  │──────────────►│ VideoPaused   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

An event is offered to every region. It may trigger a transition in one region, in several regions or in none.

### History State

A history state answers the question *where does the machine continue after an interruption*. Without it, re-entering a composite state always starts at its initial pseudostate.

```text
              ╭──────────────────────────────────────────╮
              │ Playing                                  │
   resume     │                                          │
 ┌───────────►│   (H)                                    │
 │            │    │                                     │
 │            │    ▼                                     │
 │            │  ╭───────────╮        ╭───────────╮      │
 │            │  │  Track 1  │───────►│  Track 2  │      │
 │            │  ╰───────────╯        ╰───────────╯      │
 │            ╰──────────────────────────────────────────╯
 │                           │ pause
 │            ╭──────────────▼───────────╮
 └────────────│          Paused          │
              ╰──────────────────────────╯
```

The shallow history `(H)` restores the substate that was last active on this level. A deep history `(H*)` restores the last configuration including all nested levels. If the composite state has never been entered before, the transition into the history state falls back to the initial pseudostate.

---

## State Transition Table

A state machine diagram can also be written as a **state transition table**. The table is easier to check for completeness than the diagram, because missing combinations of state and event stand out when the rows are grouped by state.

| Current state | Event             | Guard             | Effect                 | Next state  |
| ------------- | ----------------- | ----------------- | ---------------------- | ----------- |
| `New`         | `itemAdded`       | –                 | `recalculateTotal()`   | –           |
| `New`         | `paymentReceived` | –                 | `capturePayment()`     | `Paid`      |
| `New`         | `cancel`          | –                 | `releaseReservation()` | `Cancelled` |
| `Paid`        | `dispatched`      | `allItemsInStock` | `sendTrackingMail()`   | `Shipped`   |
| `Paid`        | `cancel`          | –                 | `refundPayment()`      | `Cancelled` |
| `Shipped`     | `delivered`       | –                 | –                      | `Delivered` |

A combination that does not appear in the table triggers no transition. The event is discarded without effect.

A row with an empty *Next state* column and a filled *Effect* column describes an internal transition. A row whose current state and next state are identical describes a self-transition.

---

## Example: Order Status

The life cycle of an order in a shop system, from creation to delivery or cancellation.

```text
                          ●
                          │
                          ▼
                ╭────────────────────────╮
                │          New           │
                │ entry / reserveItems() │
                ╰────────────────────────╯
                     │              │
    paymentReceived  │              │ cancel
    / capturePayment()              │ / releaseReservation()
         ┌───────────┘              └────────────┐
         ▼                                       │
╭────────────────────────╮                       │
│          Paid          │──────────────────────►┤
╰────────────────────────╯  cancel               │
         │                  / refundPayment()    │
         │ dispatched [allItemsInStock]          │
         │ / sendTrackingMail()                  ▼
         ▼                          ╭────────────────────────╮
╭────────────────────────╮          │       Cancelled        │
│        Shipped         │          ╰────────────────────────╯
╰────────────────────────╯                       │
         │                                       │
         │ delivered                             │
         ▼                                       │
╭────────────────────────╮                       │
│       Delivered        │                       │
╰────────────────────────╯                       │
         │                                       │
         └───────────────────┐   ┌───────────────┘
                             ▼   ▼
                             ◉
```

What we can learn from this example:

- The refund sits on the transition `Paid => Cancelled` and **not** as an `entry` activity of `Cancelled`, because an order cancelled from `New` has never been paid.
- `dispatched` carries a guard. If stock is missing, the order stays in `Paid`.
- `Shipped` has no transition for `cancel`. The business rule *a dispatched order can no longer be cancelled* is expressed by the absence of a transition.

Implemented in code, each state becomes a value of an enumeration, and the table becomes a `switch` over state and event. Everything not listed in the table falls into the default branch and is rejected. An invalid state change is therefore impossible by construction.

---

## Delimitation from the Activity Diagram

| Aspect           | State machine diagram            | [Activity diagram](./activity-diagram.md)       |
| ---------------- | -------------------------------- | ----------------------------------------------- |
| Node             | A **state**, the object waits    | An **action**, work is being done               |
| Naming           | Adjective or noun: `Paid`        | Verb + object: `Capture payment`                |
| Arrow            | Triggered by an **event**        | Fires when the previous action **is finished**  |
| Scope            | The life cycle of one object     | One process run, possibly across several actors |
| Branch           | Guards on outgoing transitions   | Decision node with guarded flows                |
| Parallelism      | Regions inside a composite state | Fork and join                                   |
| Typical question | *Which state is the order in?*   | *Which step comes next?*                        |

If an arrow can only be labelled with something like *afterwards*, an activity diagram is the right choice. If the arrow needs a name such as `cancel`, `timeout` or `paymentReceived`, a state machine diagram fits.

---

## Common Mistakes

1. **Activities used as state names:** `Pay` is an action and belongs in an activity diagram. The state is `Paid` or `Waiting for payment`.
2. **Transitions without a trigger:** an arrow between two states without an event is a completion transition. It fires as soon as the source state has finished its behaviour.
3. **Overlapping guards:** if two transitions with the same trigger can both have a true guard, the behaviour is undefined. The guards must exclude each other.
4. **Guard confused with trigger:** `[cancel]` is a condition, not an event. `cancel [orderNotShipped]` separates the two correctly.
5. **Missing initial pseudostate:** without it, the starting state is undefined. Every diagram and every region needs exactly one.
6. **Unreachable or dead-end states:** a state without an incoming transition is never reached. A state without an outgoing transition that is not a final state traps the object.
7. **Self-transition where an internal transition is meant:** a self-transition restarts `entry`, `do` and `exit`. A timer started in `entry` is reset as a result.
8. **State explosion:** combining independent aspects into one flat set of states multiplies the number of states. Regions or additional attributes avoid this.

---

## Tools

- draw.io / diagrams.net (free, browser-based, UML shape library included)
- PlantUML (text-based, diagram is generated from source and can be versioned)
- Mermaid (text-based, `stateDiagram-v2` renders directly in Markdown on many platforms)
- Visual Paradigm, StarUML, Lucidchart (commercial, with free tiers)

## See Also

- [Activity Diagram](./activity-diagram.md): the process view, actions and control flow instead of states and events
- [Sequence Diagram](./sequence-diagram.md): shows which messages trigger the events used here, over time
- [Class Diagram](./class-diagram.md): the class whose life cycle is described by a state machine diagram
- [Use Case Diagram](./use-case-diagram.md): the outside view from which the events of a state machine originate
- [UML Overview](./uml-overview.mdx): classification of the diagram types into structure and behaviour
- [UML Notation Basics](./uml-notation-basics.md): notation elements shared by all diagram types
- [Further UML Diagrams](./further-uml-diagrams.md): the remaining diagram types at a glance
