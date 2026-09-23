---
title: "Component Diagram"
description: "UML component diagrams: components, provided and required interfaces, assembly and delegation connectors, ports, artifacts and manifestation, nesting, dependencies, and the delimitation from class and deployment diagrams."
keywords:
    - UML
    - Component Diagram
    - Component
    - Provided Interface
    - Required Interface
    - Assembly Connector
    - Delegation Connector
    - Port
    - Artifact
    - Software Architecture
    - Structural Diagram
tags:
    - ap2
---

# Component Diagram

## Overview

A component diagram is a **structural** UML diagram. It shows how a system is divided into replaceable building blocks and which interfaces those building blocks offer to and require from one another.

A component in the UML sense is a modular part of a system whose contents are hidden and whose behaviour is completely defined by its interfaces. Two consequences follow from that definition:

- A component can be replaced by any other component that provides the same interfaces.
- Nothing outside the component may depend on how the component works internally.

Typical applications:

- Documenting the architecture of a system as a coarse-grained overview
- Fixing the interface contract between teams before implementation starts
- Making dependencies visible so that cyclic or excessive coupling becomes obvious
- Planning which parts can be built, tested, deployed or replaced independently

---

## Notation

| Element                                                             | Notation                                                        | Meaning                                                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Component](#component)                                             | Rectangle with the keyword `<<component>>`                      | A replaceable, self-contained part of the system                                            |
| [Component icon](#component)                                        | Small rectangle with two protruding tabs, top right             | Alternative marking of a component, may be used instead of or together with the keyword     |
| [Provided interface](#provided-and-required-interfaces)             | Line ending in a filled circle (*ball*, *lollipop*)             | Service the component offers to its environment                                             |
| [Required interface](#provided-and-required-interfaces)             | Line ending in a half circle (*socket*)                         | Service the component needs from its environment                                            |
| [Assembly connector](#assembly-connector)                           | Socket placed over a ball                                       | One component's requirement is satisfied by another's offer                                 |
| [Port](#ports-and-delegation-connectors)                            | Small square on the component boundary                          | Named interaction point through which interfaces are exposed                                |
| [Delegation connector](#ports-and-delegation-connectors)            | Arrow from a port to an inner component                         | Forwards what arrives at the port to the part that handles it                               |
| [Interface](#provided-and-required-interfaces) (rectangle notation) | Rectangle with the keyword `<<interface>>`                      | Contract spelled out with its operations, complements the ball, which carries only the name |
| [Dependency](#dependencies)                                         | Dashed arrow with an open arrowhead                             | The source needs the target, without a named interface                                      |
| [Artifact](#artifacts-and-manifestation)                            | Rectangle with the keyword `<<artifact>>`                       | A physical file: `.jar`, `.dll`, `.war`, script, configuration file                         |
| [Manifestation](#artifacts-and-manifestation)                       | Dashed arrow labelled `<<manifest>>` from artifact to component | The artifact is the physical realisation of that component                                  |
| [Nested component](#nested-components)                              | Component drawn inside another component                        | Internal structure, the *parts* the outer component consists of                             |
| Note                                                                | Dog-eared rectangle on a dashed line                            | Comment without semantics                                                                   |

Naming rules that keep a diagram readable:

- Components are named after their responsibility as a noun: `PaymentService`, not `DoPayment` and not `Payments2`.
- Interfaces are named after the service, commonly with a leading `I`: `IPayment`, `IInventory`.
- The same interface name always refers to the same contract. A diagram must not use one name for two different things.

---

## Building Blocks

### Component

A component has no fixed size. Typical choices are a deployable service, a library, a layer of the architecture or a self-contained area of the domain.

```text
 ╭──────────────────────╮
 │ <<component>>     ⊞  │
 │ PaymentService       │
 ╰──────────────────────╯
```

### Provided and Required Interfaces

Wherever possible, dependencies between components are expressed through interfaces, never through direct access to internals. For the exception see [Dependencies](#dependencies).

- A **provided interface** is drawn as a line with a filled circle at its end. It is the promise *this is offered, and it may be used*.
- A **required interface** is drawn as a line with a half circle at its end. It is the demand *this is needed, someone has to supply it*.

```text
   provided interface                  required interface
   (ball, lollipop)                    (socket)

 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │            │ <<component>>     ⊞  │
 │ PaymentService       │───○        │ OrderService         │───C
 ╰──────────────────────╯            ╰──────────────────────╯
```

The ball only carries the interface name. Whenever the operations themselves matter, the interface is additionally drawn as a rectangle with the keyword `<<interface>>` and its operation list, and is linked to the ball.

### Assembly Connector

An assembly connector joins a required interface to a provided one. Graphically the socket is placed over the ball, which is why the notation is also called *ball and socket*.

```text
 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │ IPayment   │ <<component>>     ⊞  │
 │ OrderService         │───C○───────│ PaymentService       │
 ╰──────────────────────╯            ╰──────────────────────╯
```

The connector states that `OrderService` uses `PaymentService` **only** through `IPayment`. Any component that provides `IPayment` may take the place of `PaymentService`.

### Ports and Delegation Connectors

A port is an explicitly named interaction point on the boundary of a component. It is drawn as a small square on the border and bundles the interfaces that are reachable at that point. Ports become useful as soon as one component offers the same interface at several places, for instance an internal and an external entry point with different access rules.

Inside the component a delegation connector leads from the port to the part that actually handles the request.

```text
               IOrdering
                   ○
                   │
 ╭─────────────────■─────────────────────────────────────────────╮
 │ <<component>>   │                                          ⊞  │
 │ OrderManagement │  delegation                                 │
 │                 │                                             │
 │    ╭────────────┴─────────╮            ╭──────────────────╮   │
 │    │ <<component>>     ⊞  │  IPricing  │ <<component>> ⊞  │   │
 │    │ OrderIntake          │───C○───────│ PricingEngine    │   │
 │    ╰──────────────────────╯            ╰──────────────────╯   │
 │                                                               │
 ╰───────────────────────────────────────────────────────────────╯
```

The outside world sees only `IOrdering` at the port. That `OrderIntake` and `PricingEngine` exist behind it, and how they are wired, may be changed at any time.

### Nested Components

Components may contain further components. The inner ones are the *parts* the outer one is assembled from. Nesting is what turns a component diagram into a tool for several levels of abstraction: the top level shows a handful of subsystems, and each of them may be refined in a diagram of its own.

Two rules keep the refinement consistent:

- Every interface of the outer component is either delegated to an inner part or realised by the outer component itself.
- An inner part is never connected directly to the outside. The connection always runs through a port of the enclosing component.

### Artifacts and Manifestation

A component is a logical unit, an artifact is a physical file. The relationship between them is called *manifestation* and is drawn as a dashed arrow with the keyword `<<manifest>>` pointing from the artifact to the component.

```text
 ╭──────────────────────────────╮
 │ <<artifact>>                 │
 │ payment-service.jar          │
 ╰───────────────┬──────────────╯
                 ╎
                 ╎ <<manifest>>
                 ▼
 ╭───────────────────────────────╮
 │ <<component>>              ⊞  │
 │ PaymentService                │
 ╰───────────────────────────────╯
```

The mapping does not have to be one to one. One artifact may manifest several components, and one component may be spread over several artifacts, for example an implementation and a separate configuration file.

### Dependencies

Besides interfaces, a plain dependency may be drawn as a dashed arrow with an open arrowhead. It means *the source needs the target* without naming a contract, and it is the weaker, less precise statement.

A dependency is appropriate for relationships that genuinely have no interface of their own, such as the use of a shared data model or of an external system that is not modelled further. Wherever an interface exists, the ball-and-socket notation is preferred, because only it says *through what* the dependency runs.

---

## Mapping to Implementation

| Component diagram    | Typical implementation                                                         |
| -------------------- | ------------------------------------------------------------------------------ |
| Component            | Deployable service, Maven/Gradle module, npm package, .NET assembly            |
| Provided interface   | Public API of a module, REST resource, message topic                           |
| Required interface   | Injected dependency, client stub                                               |
| Assembly connector   | Wiring in the dependency injection container or composition root               |
| Port                 | Published endpoint, for example a base URL or a queue name                     |
| Delegation connector | Forwarding from the entry point to the internal class that handles the request |
| Artifact             | Build result: `.jar`, `.dll`, `.war`, container image, bundle                  |
| Manifestation        | The build step that packages the code of a component into that file            |
| Dependency           | Import or `require` without an agreed contract                                 |

---

## Delimitation from Other Diagrams

### Component Diagram and Class Diagram

| Aspect            | Component diagram                          | Class diagram                         |
| ----------------- | ------------------------------------------ | ------------------------------------- |
| Unit shown        | Subsystem, service, module                 | Class, attribute, operation           |
| Granularity       | Coarse, a handful of boxes per diagram     | Fine, often dozens of classes         |
| Relationship type | Provided/required interface, assembly      | Association, inheritance, aggregation |
| Question answered | Which parts exist and how are they coupled | How is one part structured internally |
| Typical audience  | Architecture, team boundaries, planning    | Implementation of a single component  |

### Component Diagram and Deployment Diagram

A component diagram is *logical*, a [deployment diagram](./deployment-diagram.md) is *physical*.

| Aspect            | Component diagram                      | Deployment diagram                         |
| ----------------- | -------------------------------------- | ------------------------------------------ |
| Main element      | Component                              | Node: hardware, virtual machine, container |
| Question answered | How is the software structured         | Where does the software run                |
| Relationships     | Interfaces and connectors              | Communication paths, protocols             |
| Artifacts         | Appear as manifestation of a component | Appear as deployment onto a node           |

---

## Example: Online Shop

The shop consists of a user interface, an order service, a payment service and a stock service. The user interface knows nothing about how orders are processed, it only needs `IOrdering`. The order service in turn needs `IPayment` and `IStock` and does not know which components supply them.

```text
 ╭────────────────────╮          ╭────────────────────╮          ╭────────────────────╮
 │ <<component>>   ⊞  │IOrdering │ <<component>>   ⊞  │IPayment  │ <<component>>   ⊞  │
 │ ShopUI             │───C○─────│ OrderService       │───C○─────│ PaymentService     │
 ╰────────────────────╯          ╰──────────┬─────────╯          ╰────────────────────╯
                                            ∩
                                            ○  IStock
                                            │
                                 ╭──────────┴─────────╮
                                 │ <<component>>   ⊞  │
                                 │ StockService       │
                                 ╰────────────────────╯
```

What we can learn from this example:

- `ShopUI` has exactly one socket and is therefore coupled to a single contract. A second front end, for instance a mobile app, can be added without changing anything behind `IOrdering`.
- `OrderService` carries two sockets. A test of `OrderService` has to fill both of them, with `PaymentService` and `StockService` or with test doubles. Every additional socket is one more dependency to provide, so a component with many sockets is hard to test in isolation.

A realistic extension would enclose `OrderService`, `PaymentService` and `StockService` in one component `Backend` with a single port that exposes `IOrdering` and delegates it to `OrderService`. `ShopUI` would then be connected to that port, and the internal structure of the backend would become interchangeable.

---

## Common Mistakes

1. **Components connected without an interface:** a plain line shows that two components are coupled, but not through which contract. Where an interface exists, it is drawn as ball and socket.
2. **Ball and socket swapped:** the filled circle belongs to the component that *offers* the service, the half circle to the one that *needs* it.
3. **Required interface without a provider:** an open socket means the system cannot run. Either a component is missing or the requirement is obsolete.
4. **Classes drawn as components:** attributes, operations and associations belong in the class diagram.
5. **Inner parts connected past the boundary:** a connector from an inner component directly to the outside bypasses the port of the enclosing component.
6. **Cyclic dependencies:** two components that require each other's interfaces can no longer be built, deployed or replaced separately.
7. **One interface name for different contracts:** two balls with the same name must offer the same operations.
8. **Component and artifact confused:** `PaymentService` is the component, `payment-service.jar` the artifact that manifests it.
9. **Too many components in one diagram:** too many boxes make a diagram unreadable. Details belong in a separate diagram that refines a single component.

---

## Tools

- draw.io / diagrams.net (free, browser-based, UML shape library included)
- PlantUML (text-based, diagram is generated from source and can be versioned)
- Mermaid (text-based, renders directly in Markdown on many platforms)
- Visual Paradigm, StarUML, Lucidchart (commercial, with free tiers)

## See Also

- [Class Diagram](./class-diagram.md): the fine-grained structure inside a single component
- [Deployment Diagram](./deployment-diagram.md): the physical counterpart, showing where the artifacts of the components run
- [Sequence Diagram](./sequence-diagram.md): shows how the components interact over time through their interfaces
- [Activity Diagram](./activity-diagram.md): the processes that run across the components
- [UML Overview](./uml-overview.mdx): classification of the diagram types
- [UML Notation Basics](./uml-notation-basics.md): keywords, stereotypes, notes and the elements shared by all diagram types
