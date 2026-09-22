---
title: "Use Case Diagram"
description: "UML use case diagrams: actors, system boundary, associations, the relationships include, extend and generalization, the difference between diagram and use case description, and their role in requirements analysis."
keywords:
    - UML
    - Use Case Diagram
    - Actor
    - System Boundary
    - Include
    - Extend
    - Extension Point
    - Generalization
    - Use Case Description
    - Requirements Analysis
tags:
    - ap2
---

# Use Case Diagram

## Overview

A use case diagram is a **behavioural** UML diagram. It shows *which* services a system offers to its environment and *who* makes use of them, but deliberately says nothing about *how* those services are implemented. The diagram is therefore the outside view of a system, and what it defines is the **scope of the system**.

Typical applications:

- Scoping a project: an early answer to *what belongs in the system and what does not*
- Structuring functional requirements into units that carry business value
- Providing a shared vocabulary for developers, clients and domain experts
- Serving as the index of a requirements document, with one description per use case

A use case is always a **complete, self-contained service with an observable result of value** for at least one actor. `Place order` is a use case, `Click the order button` is not.

---

## Notation

| Element         | Notation                                                           | Meaning                                                                 |
| --------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Actor           | Stick figure, name below                                           | Role outside the system that interacts with it                          |
| Actor (system)  | Rectangle with the keyword `<<actor>>` or a stick figure           | External system in the role of an actor                                 |
| System boundary | Rectangle with the system name at the top edge                     | Everything drawn inside is part of the system under consideration       |
| Use case        | Ellipse with the name inside, always inside the boundary           | One self-contained service of the system, named *verb + object*         |
| Association     | Solid line without an arrowhead                                    | An actor participates in a use case                                     |
| Include         | Dashed arrow with `<<include>>`, pointing at the included use case | The base use case **always** executes the included one                  |
| Extend          | Dashed arrow with `<<extend>>`, pointing at the **base** use case  | The extending use case **may** execute under a condition                |
| Extension point | Named position in a compartment of the base use case               | The place at which an extension is inserted                             |
| Generalization  | Solid line with a hollow triangle at the general element           | Specialization of actors or of use cases                                |
| Note            | Dog-eared rectangle on a dashed line                               | Comment without semantics, e.g. the condition of an extend relationship |

Naming rules that keep a diagram readable:

- Use cases are named *verb + object* from the actor's point of view and in the language of the domain, not of the implementation: `Place order` and `Cancel invoice`, not `Order management`, `orderService()` or `Set the invoice status to 0`
- Actors are named after the **role**, not after the person: `Clerk`, not `Ms Weber`, because one person can occupy several roles

---

## Building Blocks

### Actors

An actor is a role outside the system that exchanges information with it. Actors are not necessarily people.

- **Primary actor:** triggers the use case and draws the benefit from it. By convention drawn on the left
- **Secondary actor:** is called by the system while the use case runs and supplies something the system needs. By convention drawn on the right
- **Human actor:** a person in a role, drawn as a stick figure
- **System actor:** an external system, a service or a timer, drawn as a stick figure or as a rectangle with the keyword `<<actor>>`

### System Boundary

The system boundary is a rectangle labelled with the system name. It separates responsibility from environment:

- Use cases are **always** drawn inside the boundary, because they are services of the system
- Actors are **always** drawn outside the boundary, because they are not built
- Associations are the only lines that cross the boundary

### Association

A solid line between an actor and a use case means that this actor participates in this use case. It carries no arrowhead, because it expresses participation, not a direction of data flow. Multiplicities such as `1` or `*` may be written at the ends, but are rarely needed in practice.

Associations exist only between an actor and a use case, never between two use cases and never between two actors.

### Include

`<<include>>` describes mandatory reuse. The base use case always executes the included one, at a fixed point in its flow. The dashed arrow points from the base use case **to** the included use case.

```text
 ╭─────────────────────╮                     ╭─────────────────────╮
(      Place order      )╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌►(   Authenticate user   )
 ╰─────────────────────╯     <<include>>     ╰─────────────────────╯
```

The included use case is a fragment shared by several base use cases. `Authenticate user` is also needed by `Manage wish list` and `View invoices`, and factoring it out avoids describing it three times. An included use case is generally not associated with an actor of its own, because it is never started on its own.

### Extend

`<<extend>>` describes optional behaviour. The extending use case runs only if a condition holds, and it is inserted at a named **extension point** of the base use case. Its dashed arrow points in the opposite direction from `<<include>>`: from the extending use case **to** the base use case.

```text
 ╭─────────────────────────────╮
(          Place order          )
(  ---------------------------  )              ╭────────────────────╮
(  extension points:            )◄╌╌╌╌╌╌┬╌╌╌╌╌(   Redeem voucher     )
(   payment method selected     )       ╎      ╰────────────────────╯
 ╰─────────────────────────────╯   <<extend>>
                                        ╎
                     ┌──────────────────┴────────╮
                     │ Condition:                │
                     │ {voucher code entered}    │
                     │ extension point:          │
                     │  payment method selected  │
                     └───────────────────────────┘
```

The base use case is complete without the extension. `Place order` works perfectly well without a voucher, whereas it does not work without authentication. The condition is a constraint and therefore stands in curly braces. UML shows it, together with the extension point it refers to, in a note attached to the extend relationship. Many tools and textbooks abbreviate the note to `<<extend>> {condition}` written next to the arrow, which is a tolerated short form of the same thing.

A simple test distinguishes the two relationships:

- Can the base use case be described without ever mentioning the other one? If yes, it is `<<extend>>`
- Does the base use case break if the other one is removed? If yes, it is `<<include>>`

### Generalization

Generalization expresses *is a kind of*, for actors as well as for use cases. The line carries a hollow triangle at the more general element.

Generalization of actors: a specialized actor inherits every association of the general actor and may add its own.

```text
                  ○
                 ╱│╲
                 ╱ ╲
              Customer
                  △
       ┌──────────┴──────────┐
       │                     │
       ○                     ○
      ╱│╲                   ╱│╲
      ╱ ╲                   ╱ ╲
  Registered               Guest
   customer
```

Both `Registered customer` and `Guest` inherit every association of `Customer`, so `Search catalogue` does not need to be connected three times.

```text
                  ╭───────────────╮
                 (  Pay for order  )
                  ╰───────────────╯
                          △
           ┌──────────────┴──────────────┐
           │                             │
 ╭────────────────────╮       ╭─────────────────────╮
(  Pay by credit card  )     (  Pay by direct debit  )
 ╰────────────────────╯       ╰─────────────────────╯
```

Generalization of use cases is powerful but easily overused. Where the variants differ only in an optional step, `<<extend>>` is the clearer choice.

---

## Diagram and Description

The diagram alone is a quick overview, not a specification: it names the use cases and their relationships, but says nothing about the flow. The detail lives in the **use case description**, written as continuous text or in a template, one per use case.

| Field             | Content                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| Name              | Identical to the label in the diagram, *verb + object*                     |
| Short description | One or two sentences on the purpose and the business value                 |
| Actors            | Primary actor, secondary actors                                            |
| Precondition      | What must hold before the use case may start                               |
| Postcondition     | What holds after a successful run                                          |
| Trigger           | The event that starts the use case                                         |
| Main scenario     | The numbered standard flow, everything going well                          |
| Alternative flows | Deviations that still lead to the goal, numbered against the main scenario |
| Exceptions        | Deviations that prevent the goal from being reached                        |
| Non-functional    | Response times, volumes, legal constraints                                 |

A filled-in example for `Place order`:

- **Precondition:** the shopping cart contains at least one item, the customer is authenticated
- **Postcondition:** the order is stored with the status `paid` and a confirmation has been sent
- **Trigger:** the customer confirms the shopping cart
- **Main scenario:** 1. system displays the order summary => 2. customer selects a payment method => 3. system reserves the goods => 4. system processes the payment => 5. system confirms the order
- **Alternative flow 2a:** customer enters a voucher code, the system reduces the amount and continues at step 3
- **Exception 3a:** an item is no longer in stock, the system offers a partial delivery or cancels the order

A scenario is *one concrete path* through a use case: the main scenario is the expected path, the alternative flows are the remaining ones. Anything drawn as `<<extend>>` in the diagram turns up as an alternative flow in the description, anything drawn as `<<include>>` turns up as a reference to another description.

---

## Role in Requirements Analysis

- The **[requirements specification](../../projectmanagement/requirements-specification.md#requirement-specification)** is written by the client and states *what* is needed and *why*. Use cases are an excellent structure for it, since each one describes a requirement without prescribing a solution
- The **[functional specification](../../projectmanagement/requirements-specification.md#functional-specification)** is written by the contractor and states *how* the requirements are met. The use case diagram is carried over, the descriptions are refined, and technical constraints are added
- **Traceability:** every requirement should be traceable to at least one use case, and every use case to at least one requirement. Use cases without a requirement are gold plating, requirements without a use case have been forgotten
- **Estimation and planning:** use cases are a natural unit for effort estimation, for release planning and for acceptance testing, because each one can be accepted on its own
- **Test basis:** the main scenario yields the happy-path test case, every alternative flow and every exception yields at least one further test case

A user story is a small increment of planning, a use case is a complete service including every alternative. One use case typically decomposes into several user stories.

---

## Example: Online Shop

The system under consideration is an online shop. The customer searches the catalogue and places orders. Placing an order always requires authentication and payment processing, and may optionally be extended by redeeming a voucher. Payment processing calls an external payment provider.

```text
                                 Online Shop
         ┌──────────────────────────────────────────────────────────┐
         │                                                          │
         │           ╭────────────────────╮                         │
    ┌────┼──────────(   Search catalogue   )                        │
    │    │           ╰────────────────────╯                         │
 ○  │    │                                                          │
╱│╲─┤    │                                                          │
╱ ╲ │    │           ╭────────────────────╮     ╭────────────────╮  │
    └────┼──────────(     Place order      )◄╌╌(  Redeem voucher  ) │
Customer │           ╰────────────────────╯     ╰────────────────╯  │
         │                  ╎       ╎       <<extend>>              │
         │      <<include>> ╎       ╎ <<include>>                   │
         │              ┌───┘       └───────────┐                   │
         │              ▼                       ▼                   │
         │     ╭─────────────────╮      ╭────────────────╮          │  ○
         │    (  Authenticate     )    (  Process payment )─────────┼─╱│╲
         │    (      user         )     ╰────────────────╯          │ ╱ ╲
         │     ╰─────────────────╯                                  │
         │                                                          │
         └──────────────────────────────────────────────────────────┘
                                                                    Payment
                                                                   Provider
```

What we can learn from this example:

- `Customer` is the primary actor on the left, `Payment Provider` a secondary system actor on the right: the shop calls it, not the other way around
- `Authenticate user` is included because no order can be placed without it, and it has no association of its own since it is never started in isolation
- `Redeem voucher` extends `Place order`: removing it leaves `Place order` fully functional, which is exactly the criterion for `<<extend>>`

---

## Common Mistakes

1. **Include and extend swapped:** `<<include>>` points away from the base use case and means *always*, `<<extend>>` points towards it and means *possibly*
2. **Solid and dashed lines swapped:** associations and generalizations are drawn as solid lines, `<<include>>` and `<<extend>>` as dashed arrows
3. **Process steps instead of use cases:** `Enter customer number`, `Validate input`, `Save record` are steps within a flow, not services with business value. They belong in the use case description or in an activity diagram
4. **Missing system boundary:** without a boundary the diagram no longer says which functionality belongs to the system, and the scope becomes negotiable
5. **Actor inside the boundary:** actors are outside by definition, since they are not part of what is being built. An actor drawn inside usually means a component has been mistaken for a role
6. **Functional decomposition via include:** breaking every use case into three included sub-use cases turns the diagram into a call tree. `<<include>>` is for reuse across several base use cases, not for structuring a single flow
7. **Associations between use cases:** a solid line without a keyword between two ellipses has no meaning in UML. Relationships between use cases are only `<<include>>`, `<<extend>>` or generalization
8. **Actors named after people or job titles of individuals:** an actor is a role. The same person may be `Clerk` in one use case and `Customer` in another
9. **Arrowheads on associations:** the association expresses participation and carries no direction
10. **Diagram without descriptions:** the diagram names the use cases, it does not specify them. A project that has only the diagram has an index and no content
11. **Technical terminology in names:** `POST /orders` or `saveOrder()` are implementation, not a service seen from the outside. The name has to be understandable to the client
12. **Square brackets for the extend condition:** the condition is a constraint and therefore belongs in curly braces, in a note attached to the extend relationship. `[condition]` is the guard notation of [activity](./activity-diagram.md), [state machine](./state-machine-diagram.md) and [sequence diagrams](./sequence-diagram.md)

---

## Tools

- draw.io / diagrams.net (free, browser-based, UML shape library included)
- PlantUML (text-based, diagram is generated from source and can be versioned)
- Mermaid (text-based, renders directly in Markdown on many platforms)
- Visual Paradigm, StarUML, Lucidchart (commercial, with free tiers)

## See Also

- [UML Overview](./uml-overview.mdx): classification of the diagram types into structure and behaviour
- [Activity Diagram](./activity-diagram.md): detailing the flow of a single use case
- [Sequence Diagram](./sequence-diagram.md): the interaction between actor and system within a scenario
- [Class Diagram](./class-diagram.md): the structural counterpart, modelling the domain objects the use cases operate on
