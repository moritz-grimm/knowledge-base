---
title: "Further UML Diagrams"
description: "Object, package, communication, timing, interaction overview, composite structure and profile diagram: purpose, central notation elements, typical use and the boundary to the closest related UML diagram."
keywords:
    - UML
    - Object Diagram
    - Package Diagram
    - Communication Diagram
    - Timing Diagram
    - Interaction Overview Diagram
    - Composite Structure Diagram
    - Profile Diagram
    - Stereotype
    - Structural Diagram
    - Behavioural Diagram
tags:
    - ap2
---

# Further UML Diagrams

## Overview

UML 2.5 defines fourteen diagram types. The seven not covered by entries of their own are listed here.

| Diagram                      | Category  | Core question                                                              |
| ---------------------------- | --------- | -------------------------------------------------------------------------- |
| Object diagram               | Structure | Which concrete instances exist at one moment and how are they linked?      |
| Package diagram              | Structure | How is the model divided into units and which unit depends on which?       |
| Communication diagram        | Behaviour | Which objects exchange messages, and along which links?                    |
| Timing diagram               | Behaviour | Which state does an element hold at which point on the time axis?          |
| Interaction overview diagram | Behaviour | In which order are whole interactions executed?                            |
| Composite structure diagram  | Structure | How is a classifier built internally and through which ports does it talk? |
| Profile diagram              | Structure | How is UML itself extended for a domain or a platform?                     |

---

## Object Diagram

A snapshot of a system at one particular moment: the instances that exist and the links between them. The notation is that of the [class diagram](./class-diagram.md), but on the instance level.

Central notation elements:

- **Instance specification:** rectangle with an underlined name in the form `name : Class`; name or class may be omitted (`o7 : Order`, `: Order`, `o7`)
- **Attribute values:** in the lower compartment as `attribute = value`
- **Link:** plain solid line between two instances, the instance-level counterpart of an association; no multiplicities, because a link always joins exactly two instances

Plain text cannot show an underline, in real notation the names `m1 : Customer` and `o7 : Order` are underlined:

```text
 ┌────────────────────┐              ┌────────────────────┐
 │ m1 : Customer      │   places     │ o7 : Order         │
 ├────────────────────┤──────────────├────────────────────┤
 │ name = "Meier"     │              │ total = 249.90     │
 │ city = "Kiel"      │              │ status = "paid"    │
 └────────────────────┘              └────────────────────┘
```

Typical use: explaining a complicated class diagram with a worked example, discussing one concrete data constellation, documenting test data or the state in which a defect occurs.

---

## Package Diagram

A package diagram shows how a model is cut into units and which unit depends on which. Packages carry no behaviour of their own.

Central notation elements:

- **Package:** rectangle with a tab; nesting written graphically or as `shop::service`
- **Dependency:** dashed arrow pointing from the using to the used package
- **`«import»`:** makes the public elements of the target package usable without qualification
- **`«access»`:** the same relation, but without passing the imported names on any further
- **`«merge»`:** conceptually copies the content of the target package into the source package and combines it with it
- **Layering:** packages arranged one above the other with all dependencies pointing in one direction

```text
┌──────┐
│ shop │
├──────┴──────────────────┐
│                         │
│   ┌─────────┐           │
│   │ ui      │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────┐           │
│   │ service │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────────┐       │
│   │ persistence │       │
│   ├─────────────┴───┐   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
└─────────────────────────┘
```

Typical use: layered architectures, cutting a system into modules, making cyclic dependencies visible before they reach the code.

Boundary: a [component diagram](./component-diagram.md) describes replaceable building blocks that offer and require interfaces at runtime, a package diagram only organises model and source elements at design time.

---

## Communication Diagram

A communication diagram shows which objects exchange messages and along which links they do so. The objects are placed freely, the order of the messages follows from their numbering.

Central notation elements:

- **Object:** rectangle with an underlined `name : Class`, as in the object diagram
- **Link:** solid line between two objects
- **Message:** small arrow drawn next to the link, labelled `1: placeOrder()`
- **Hierarchical sequence numbers:** `1`, `1.1`, `1.2`, with `1.1` and `1.2` sent one after the other as part of handling message `1`
- **Iteration marker and guards:** `*` and `[condition]` as part of the message label

```text
  ┌──────────┐   1: placeOrder() ►  ┌─────────────┐
  │ : Client │──────────────────────│ : OrderCtrl │
  └──────────┘   ◄ 1.3: confirm()   └─────────────┘
                                           │
                                           │ ▼ 1.1: checkStock()
                                           │ ▼ 1.2: reserve()
                                           │
                                    ┌─────────────┐
                                    │ : Warehouse │
                                    └─────────────┘
```

Typical use: making visible which objects communicate with one another, judging the coupling of a design, small interactions in which the structure matters more than the exact order.

Boundary: a [sequence diagram](./sequence-diagram.md) shows the same interaction along an explicit time axis from top to bottom and offers combined fragments such as `alt`, `opt` and `loop`. Objects, messages and their order can be carried over from one diagram into the other, the combined fragments have no counterpart in the communication diagram. Alternatives and loops are easier to read in a sequence diagram, the network of links is easier to see in a communication diagram.

---

## Timing Diagram

A timing diagram shows how the state or the value of one or more elements develops along an explicit time axis.

Central notation elements:

- **Time axis:** horizontal, with a scale, one lane per lifeline
- **State lifeline:** step line between the states listed on the vertical axis
- **Value lifeline:** compact band form in which a crossing marks the change of value
- **Duration and time constraint:** `{d..3*d}` and `{t = 0}`
- **Events and messages:** arrows between the lanes
- **Tick marks:** units of the time scale

```text
 : Motor
           │
   active  │         ┌──────────────┐
           │         │              │
   idle    ├─────────┘              └──────────
           │         ├── {20..40} ──┤
           └────┬────┬────┬────┬────┬────┬────┬───► t
           0    10   20   30   40   50   60   70  ms
```

Typical use: real-time and embedded systems, bus and network protocols, hardware-related control, requirements on latency, timeouts and minimum hold times.

Boundary: a [state machine diagram](./state-machine-diagram.md) defines which states and transitions are possible, without a time axis. A timing diagram shows when an element is in which of these states.

---

## Interaction Overview Diagram

An interaction overview diagram arranges several sequence, communication or timing diagrams into one control flow, each node being a complete interaction.

Central notation elements:

- **Frame:** with the header `sd <name>`
- **Interaction use:** rectangle with the keyword `ref` and the name of an existing interaction diagram
- **Inline interaction:** a small sequence diagram embedded directly as a node
- **Control elements:** all those of the activity diagram, i.e. initial node, decision, merge, fork, join, final node

```text
 ┌ sd Checkout ─────────────────────────────┐
 │                  ●                       │
 │                  │                       │
 │                  ▼                       │
 │          ┌───────────────┐               │
 │          │ ref  Login    │               │
 │          └───────────────┘               │
 │                  │                       │
 │             ╱─────────╲                  │
 │            ╱  paid ?   ╲                 │
 │            ╲           ╱                 │
 │             ╲─────────╱                  │
 │       [yes]  │       │  [no]             │
 │     ┌────────┘       └────────┐          │
 │     ▼                         ▼          │
 │ ┌───────────────┐   ┌───────────────┐    │
 │ │ ref  Ship     │   │ ref  Cancel   │    │
 │ └───────────────┘   └───────────────┘    │
 │     │                         │          │
 │     └────────┐       ┌────────┘          │
 │              ▼       ▼                   │
 │                  ◉                       │
 └──────────────────────────────────────────┘
```

Typical use: the overall view of a protocol or of a long-running business transaction that consists of many individual interactions.

Boundary: an [activity diagram](./activity-diagram.md) uses the same control elements, but its nodes are single actions. The interaction overview diagram is also an alternative to one oversized sequence diagram packed with nested `alt` and `loop` fragments.

---

## Composite Structure Diagram

A composite structure diagram looks inside a single classifier: which parts it consists of, how these parts are wired and through which interaction points it is connected to its environment.

Central notation elements:

- **Part:** rectangle inside the frame of the classifier, written as `role : Type` with an optional multiplicity, e.g. `wheels : Wheel [4]`
- **Port:** small square on the border of the classifier, a named and typed interaction point
- **Interfaces:** provided interface as a lollipop `─○`, required interface as a socket `─(`
- **Connectors:** assembly connector between two parts, delegation connector between a part and a port
- **Collaboration:** dashed ellipse with named roles, describing a cooperation pattern independently of concrete classes

```text
 ┌ Car ──────────────────────────────────────┐
 │                                           │
 │ ┌────────────┐        ┌──────────────┐    │
 │ │ e : Engine │────────│ g : Gearbox  │────┼──□───○ Drive
 │ └────────────┘        └──────────────┘    │
 │                                           │
 └───────────────────────────────────────────┘
```

Typical use: the internal architecture of a component, the wiring of parts in system and embedded design, the description of a design pattern as a collaboration of roles.

Boundary: a [class diagram](./class-diagram.md) says which classes are related in general, a composite structure diagram says how the instances inside one whole are wired in a specific role. A [component diagram](./component-diagram.md) uses the same lollipop and socket notation, but at the level of the deployable building blocks of the whole system rather than the inside of one classifier.

---

## Profile Diagram

A profile diagram extends UML itself for a domain or a target platform.

Central notation elements:

- **Profile:** package with the keyword `«profile»`
- **Stereotype:** rectangle with the keyword `«stereotype»`, extending an existing metaclass; any name in guillemets that is not a predefined UML keyword is a stereotype defined in some profile
- **Extension:** solid line with a filled arrowhead from the stereotype to the metaclass, e.g. `«metaclass» Class`
- **Tagged value:** attribute of the stereotype, e.g. `table : String`, filled in at the element that carries the stereotype
- **Constraint:** rule in curly braces, written in OCL or in free text
- **Application:** `«apply»` dependency from a package to the profile; its elements may then carry `«entity»`, `«controller»` and so on

```text
 ┌ «profile» Persistence ─────────────────────┐
 │                                            │
 │  ┌─────────────────┐     ┌───────────────┐ │
 │  │ «stereotype»    │────►│ «metaclass»   │ │
 │  │ Entity          │     │ Class         │ │
 │  ├─────────────────┤     └───────────────┘ │
 │  │ table : String  │                       │
 │  └─────────────────┘                       │
 └────────────────────────────────────────────┘
```

Relation to the metamodel: UML is described by a four-layer architecture. `M0` holds the real objects, `M1` the model, `M2` the UML metamodel that defines what a class or an association is, and `M3` the MOF (Meta Object Facility), the language in which the metamodel itself is written. A profile is the lightweight extension mechanism of UML: it extends layer `M2` without modifying it, which is why profiled models can still be exchanged between tools. A heavyweight extension would alter the metamodel directly and thereby create a new language.

Typical use: domain-specific modelling languages such as SysML or MARTE, mapping a model onto a platform such as JPA or EJB, company-wide modelling conventions.

---

## See Also

- [UML Overview](./uml-overview.mdx): classification of all diagram types into structure and behaviour
- [UML Notation Basics](./uml-notation-basics.md): elements shared by every UML diagram, including keywords, stereotypes and notes
- [Class Diagram](./class-diagram.md): the basis of object, package and composite structure diagrams
- [Sequence Diagram](./sequence-diagram.md): the time-oriented counterpart of the communication diagram
- [ER Model](../databases/er-model.md): models the data whose concrete instances an object diagram shows
