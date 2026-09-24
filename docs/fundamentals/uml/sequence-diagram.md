---
title: "Sequence Diagram"
description: "UML sequence diagrams: lifelines, execution specifications, synchronous and asynchronous messages, replies, creation and destruction of objects, combined fragments such as alt, opt, loop and par, and the delimitation from activity and communication diagrams."
keywords:
    - UML
    - Sequence Diagram
    - Interaction Diagram
    - Lifeline
    - Execution Specification
    - Combined Fragment
    - Synchronous Message
    - Asynchronous Message
    - Behavioural Diagram
tags:
    - ap2
---

# Sequence Diagram

## Overview

A sequence diagram is a **behavioural** UML diagram and belongs to the group of *interaction diagrams*. It shows which communication partners exchange which messages, and in which order this happens. The partners are arranged next to each other, time runs from top to bottom.

Typical applications:

- Detailing a single scenario of a [use case](./use-case-diagram.md), usually the normal course plus one exception
- Documenting the collaboration of objects or components for one piece of functionality
- Describing a protocol between systems, for example client, server and database
- Reviewing a draft design against the [class diagram](./class-diagram.md) in both directions: a message that no class offers as an operation exposes a missing operation, a lifeline without incoming messages an unreachable class

A sequence diagram always shows *one* concrete run. Alternatives and repetitions are expressible through combined fragments, but a diagram that tries to cover every case at once becomes unreadable. Several small diagrams are therefore preferable to one large one.

---

## Notation

| Element                 | Notation                                               | Meaning                                                        |
| ----------------------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| Frame                   | Rectangle with a pentagon tab reading `sd` plus a name | Boundary and name of the interaction                           |
| Lifeline head           | Rectangle with `name : Class`, `:Class` or `name`      | A communication partner, object, component or actor            |
| Lifeline                | Dashed vertical line below the head                    | Existence of that partner over time                            |
| Execution specification | Narrow rectangle on the lifeline (activation bar)      | Period in which the partner is active or is processing a call  |
| Synchronous message     | Solid line, filled arrowhead `──▶`                     | The sender waits until the reply arrives                       |
| Asynchronous message    | Solid line, open arrowhead `──>`                       | The sender continues immediately, no waiting                   |
| Reply message           | Dashed line, open arrowhead `<- - -`                   | Return of control, optionally labelled with the returned value |
| Self message            | Arrow leaving and re-entering the same lifeline        | A partner calls one of its own operations                      |
| Create message          | Dashed arrow with `«create»` onto a lifeline head      | The receiver comes into existence during the interaction       |
| Destruction occurrence  | Cross `X` at the lower end of a lifeline               | The object is destroyed, the lifeline ends there               |
| Combined fragment       | Rectangle with the operator in the top left corner     | Control structure, for example `alt`, `opt`, `loop`, `par`     |
| Operand                 | Section of a fragment, separated by a dashed line      | One case or one branch inside the fragment                     |
| Guard                   | `[condition]` at the start of an operand               | Condition under which that operand applies                     |
| Interaction use         | Fragment with the operator `ref`                       | Reference to an interaction drawn in a diagram of its own      |
| State invariant         | `{condition}` on a lifeline                            | Condition that has to hold at that point in time               |
| Note                    | Dog-eared rectangle on a dashed line                   | Comment without semantics                                      |

Naming rules that keep a diagram readable:

- A message carries the signature of the called operation, for example `reserve(seatNo)`, not a sentence such as `the seat is reserved`
- A reply is labelled with the returned value, not with the operation name again
- Lifelines are named after objects, not after actions: `:SeatRepository` is a partner, `Save seat` is not
- Anonymous objects are written as `:Class`, a named object as `seat : Seat`, a role only by its name

---

## Building Blocks

### Lifeline, Execution Specification and Reply

A message from one partner to another starts an execution specification on the receiver, and the reply ends it. A synchronous message fits a call whose result the caller needs before it can continue, for example a method call or an HTTP request whose response is awaited.

```text
   :Client                  :AuthService
      │                           │
     ┌┴┐                          │
     │ │─── login(user, pw) ────▶┌┴┐
     │ │                         │ │
     │ │<- - - - - token - - - - └┬┘
     │ │                          │
     └┬┘                          │
      │                           │
```

The reply may be omitted if it carries no information.

### Asynchronous Message

An asynchronous message is handed over and the sender continues without waiting. It fits events, notifications, messages to a queue and calls that run in a separate thread, where the sender does not need a result. The bar of the sender is independent of the bar of the receiver and may end before it.

```text
:OrderService                   :MailService
      │                               │
     ┌┴┐                              │
     │ │──── sendMail(order) ───────>┌┴┐
     └┬┘                             │ │
      │                              │ │
      │                              └┬┘
      │                               │
```

### Self Message

A self message is an arrow that leaves a lifeline and re-enters the same lifeline a little further down. It is drawn when an internal step of a partner, such as a validation or calculation, matters for understanding the flow. Private helper calls without that relevance are left out. A strictly drawn self call receives a nested execution specification, a slightly offset second bar on top of the first.

```text
:OrderService
      │
     ┌┴┐
     │ ├───┐ validate()
     │ ┌─┐◀┘
     │ │ │
     │ └─┘
     │ │
     └┬┘
      │
```

### Creation and Destruction of Objects

An object that only comes into existence during the interaction is drawn with its head at the vertical position at which it is created. The create message points at the head, not at the lifeline. Destruction is marked with a cross at the end of the lifeline.

```text
  :Session
      │
     ┌┴┐
     │ │        «create»
     │ │- - - - - - - - - ->┌─────────┐
     │ │                    │  :Cart  │
     │ │                    └────┬────┘
     │ │──── addItem(item) ────▶┌┴┐
     │ │                        └┬┘
     │ │──── «destroy» ────────▶ X
     └┬┘
      │
```

---

## Combined Fragments

A combined fragment is a rectangle around a part of the interaction. The operator in the top left corner determines which control structure applies to the enclosed messages, for example an alternative or a loop. Dashed horizontal lines divide the fragment into operands, and in an `alt` fragment every operand carries a guard.

| Operator   | Meaning                                                                         | Corresponds to                 |
| ---------- | ------------------------------------------------------------------------------- | ------------------------------ |
| `alt`      | Alternatives, exactly one operand runs, the remaining case is labelled `[else]` | `if / else if / else`          |
| `opt`      | A single operand that runs only if the guard holds                              | `if` without `else`            |
| `loop`     | Repetition, written as `loop(min,max)` or with a guard                          | `while`, `for`, `do … while`   |
| `break`    | The operand replaces the remainder of the enclosing interaction                 | Early `return`, exception      |
| `par`      | The operands run concurrently, their messages may be interleaved                | Threads, tasks, parallel calls |
| `ref`      | Reference to an interaction that is drawn in a diagram of its own               | Method call, subprocess        |
| `critical` | The operand must not be interrupted by concurrently running operands            | Critical section, lock         |
| `neg`      | The enclosed sequence is invalid and must not occur                             | Negative test case             |
| `assert`   | The enclosed sequence is the only valid continuation                            | Assertion                      |

In practice `alt`, `opt` and `loop` cover the vast majority of diagrams.

### Alternative

```text
      :Client                        :Booking
         │                               │
        ┌┴┐                              │
        │ │──── reserve(seatNo) ───────▶┌┴┐
        │ │                             │ │
 ┌──────┼─┼─────────────────────────────┼─┼────────┐
 │ alt  │ │ [seat is free]              │ │        │
 │      │ │<- - - - reservationId - - - │ │        │
 ├╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌┤
 │      │ │ [else]                      │ │        │
 │      │ │<- - - SeatTakenError - - - -│ │        │
 └──────┼─┼─────────────────────────────┼─┼────────┘
        └┬┘                             └┬┘
         │                               │
```

The guards of an `alt` fragment have to be mutually exclusive and should cover every case.

### Loop

```text
      :Order                         :LineItem
         │                               │
        ┌┴┐                              │
 ┌──────┼─┼──────────────────────────────┼─────────┐
 │ loop │ │ [more items]                 │         │
 │      │ │──── subtotal() ────────────▶┌┴┐        │
 │      │ │<- - - - amount - - - - - - -└┬┘        │
 └──────┼─┼──────────────────────────────┼─────────┘
        └┬┘                              │
         │                               │
```

`loop(1,n)` expresses a count instead of a condition, `loop` without an addition means an unbounded repetition.

---

## Example: Detailing the Use Case *Book Seat*

The scenario detailed here is the normal course of the use case *Book seat*: a customer books a specific seat, the system looks the seat up and, if it is still free, marks it as booked. The diagram is derived from the textual description of the use case in these steps:

1. One scenario of the use case is chosen, usually the normal course from the textual description.
2. The triggering actor becomes the leftmost lifeline.
3. The internal partners are added, typically along the layers of the architecture: user interface, control, domain object, persistence.
4. Every step of the textual course becomes a message whose name matches an operation of the receiver.
5. Exceptions from the textual description become `alt` or `break` fragments, or a separate diagram for each.

```text
┌────────────────┐
│ sd BookSeat    │
├────────────────┴─────────────────────────────────────────────────────┐
│                                                                      │
│       :Customer            :BookingService         :SeatRepository   │
│           │                       │                       │          │
│          ┌┴┐                      │                       │          │
│          │ │── bookSeat(id) ────▶┌┴┐                      │          │
│          │ │                     │ │── findSeat(id) ────▶┌┴┐         │
│          │ │                     │ │<- - seat - - - - - -└┬┘         │
│          │ │                     │ │                      │          │
│          │ │              ┌──────┼─┼──────────────────────┼───────┐  │
│          │ │              │ opt  │ │ [seat is free]       │       │  │
│          │ │              │      │ │── markBooked(id) ──▶┌┴┐      │  │
│          │ │              │      │ │<- - - - ok - - - - -└┬┘      │  │
│          │ │              └──────┼─┼──────────────────────┼───────┘  │
│          │ │<- - confirmation - -└┬┘                      │          │
│          └┬┘                      │                       │          │
│           │                       │                       │          │
└──────────────────────────────────────────────────────────────────────┘
```

What can be read from this example:

- The failing case of the `opt` fragment is not drawn here, it would be modelled either with `alt` or in a separate diagram.
- The payment step would be inserted as a `ref` fragment so that this diagram stays readable and the payment gets its own interaction.

---

## Sequence, Activity or Communication Diagram

All three are behavioural diagrams.

| Criterion    | Sequence diagram                         | Activity diagram                        | Communication diagram                     |
| ------------ | ---------------------------------------- | --------------------------------------- | ----------------------------------------- |
| Focus        | Message exchange over time               | Control flow of a process               | Structure of the collaboration            |
| Time         | Explicit, as the vertical axis           | Implicit, through the direction of flow | Only through numbering of the messages    |
| Participants | Lifelines side by side                   | Optional, as partitions                 | Objects placed freely, connected by links |
| Branching    | Combined fragments, quickly gets crowded | Decision and merge nodes, well readable | Hardly readable                           |
| Concurrency  | `par` fragment                           | Fork and join                           | Possible, but hard to read                |
| Typical use  | Detailing one scenario                   | Modelling a whole process               | Showing which object knows which other    |

Rules of thumb:

- Many branches and loops, few participants => [activity diagram](./activity-diagram.md)
- Few branches, many participants and a relevant order => sequence diagram
- The question *who is connected to whom* rather than *in which order* => [communication diagram](./further-uml-diagrams.md#communication-diagram)
- The behaviour of *one single* object across its entire life => [state machine diagram](./state-machine-diagram.md)

---

## Common Mistakes

1. **Time axis ignored:** time runs from top to bottom across all lifelines. An arrow drawn upwards therefore reverses the intended order. Two messages at the same height have no defined order.
2. **Reply as a solid arrow:** a reply is drawn as a dashed line with an open arrowhead. A solid line with a filled arrowhead is read as a new call in the opposite direction.
3. **Synchronous and asynchronous confused:** the filled arrowhead means that the sender waits for the reply. Events, notifications and messages to a queue are asynchronous and get the open arrowhead.
4. **Execution specifications not closed:** the bar of a caller has to extend at least until the reply arrives. A bar that ends earlier states that the caller had already finished.
5. **Activities instead of objects on the lifelines:** a lifeline stands for a communication partner such as `:SeatRepository`. A step such as `Check availability` is not a partner and becomes a message instead.
6. **Guards missing on alt operands:** without guards the diagram does not show under which condition each operand of the `alt` fragment applies.

---

## Tools

- draw.io / diagrams.net (free, browser-based, UML shape library included)
- PlantUML (text-based, particularly strong for sequence diagrams, can be versioned)
- Mermaid (text-based, renders directly in Markdown on many platforms)
- Visual Paradigm, StarUML, Lucidchart (commercial, with free tiers)

## See Also

- [Activity Diagram](./activity-diagram.md): the alternative for processes with many branches and loops
- [Use Case Diagram](./use-case-diagram.md): supplies the scenarios that a sequence diagram details
- [Class Diagram](./class-diagram.md): supplies the classes and operations that the messages refer to
- [State Machine Diagram](./state-machine-diagram.md): the behaviour of a single object instead of the interplay of several
- [UML Overview](./uml-overview.mdx): classification of all diagram types
- [UML Notation Basics](./uml-notation-basics.md): elements shared by every diagram type
