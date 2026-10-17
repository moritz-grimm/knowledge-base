---
title: "Prototyping"
description: "Prototyping as a technique for clarifying requirements and testing solutions early: exploratory, experimental and evolutionary prototyping, throwaway prototypes, horizontal and vertical prototypes, the prototyping cycle, advantages and disadvantages."
keywords:
    - Prototyping
    - Prototype
    - Exploratory Prototyping
    - Experimental Prototyping
    - Evolutionary Prototyping
    - Throwaway Prototype
    - Rapid Prototyping
    - Proof of Concept
    - Horizontal Prototype
    - Vertical Prototype
    - Clickable Prototype
tags:
    - ap2
---

# Prototyping

**Prototyping** builds a **prototype**, an early, executable model of a system or of part of it, to clarify requirements, check technical feasibility or test a solution with users before the system is completed.

Prototyping is not bound to a particular approach and can also be used on its own. It is regularly used in agile development and within classic models, e.g. in the second quadrant of the [spiral model](../projectmanagement/classic-vs-agile.md#spiral-model).

## Exploratory, Experimental and Evolutionary Prototyping

Christiane Floyd (1984) distinguishes three kinds of prototyping by their goal:

| Kind         | Goal                                                                                        | Prototype afterwards |
| ------------ | ------------------------------------------------------------------------------------------- | -------------------- |
| Exploratory  | Clarify the requirements together with the users                                            | Usually discarded    |
| Experimental | Test whether a technical solution works, e.g. an architecture, an algorithm or an interface | Usually discarded    |
| Evolutionary | Develop the system step by step from a first usable version                                 | Becomes the product  |

A prototype that is discarded after its evaluation is called a **throwaway prototype** or **rapid prototype**. It is built quickly, without tests, error handling or a maintainable structure, because only the answer to its question is needed. An experimental prototype that answers whether a solution is feasible is called a **proof of concept**. It is usually discarded as well, but not every throwaway prototype is a proof of concept.

Because every later version builds on it, an **evolutionary prototype** is built with production quality from the start, and evolutionary prototyping thus comes close to incremental development.

## Horizontal and Vertical Prototypes

Independently of its goal, a prototype is classified by the part of the system that it covers.

| Type       | Covers                                                                          | Suited to                                                  |
| ---------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Horizontal | One layer across many functions, e.g. the user interface without business logic | Checking workflows and navigation with users               |
| Vertical   | One function through all layers, e.g. from the user interface to the database   | Checking technical feasibility, performance and interfaces |

The goal usually determines the coverage: an exploratory prototype is horizontal, an experimental prototype vertical. A [clickable prototype](./software-ergonomics/wireframe-mockup-prototype.md) of the user interface is a horizontal prototype.

## Prototyping Cycle

1. **Define the question:** The requirement or technical question that the prototype is to answer and the kind of prototype are fixed.
2. **Build:** The prototype is built with as little effort as the question allows.
3. **Evaluate:** Users or experts try out the prototype, and their feedback is recorded.
4. **Decide:** The prototype is refined and evaluated again, discarded with the answer documented, or, for an evolutionary prototype, released as the next version.

## Advantages and Disadvantages

**Advantages:**

- Users react to something they can see and use, so requirements become concrete earlier than from a document.
- Misunderstandings between customer and developers are found before the implementation.
- Technical risks are tested before the project commits to a solution.
- Involving users early increases the acceptance of the finished system.

**Disadvantages:**

- Building prototypes that are discarded causes additional effort.
- A polished prototype can create the impression that the system is almost finished, so the customer underestimates the remaining effort.
- Without a defined question and end, the cycle of building and evaluating continues indefinitely.
- Requirements clarified with a prototype are often not documented, because the prototype seems to document them.

## Example: Room Booking for a Library

A city library wants its visitors to book group study rooms online. The booking data has to come from the existing library management system.

| Question                                                                     | Prototype                                                                                                                          |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Do visitors understand how to find a free room and book it?                  | Exploratory, horizontal: clickable screens without business logic, tested with five visitors, then discarded                       |
| Can the library management system supply the room availability in real time? | Experimental, vertical: one booking from the user interface through the interface of the library management system, then discarded |
| How is the booking system introduced?                                        | Evolutionary: a first version with booking only goes live and is extended by cancellation and reminders                            |

## Common Mistakes

1. **Throwaway prototype continued as the product:** Its missing tests, error handling and structure are carried into operation. Whether a prototype is discarded or evolved has to be decided before it is built.
2. **Prototype mistaken for an almost finished product:** A high-fidelity prototype of the user interface looks finished, although no business logic exists behind it. Customers who are not told this may expect an early delivery and underestimate the remaining effort.
3. **Horizontal and vertical prototype swapped:** Only a vertical prototype reaches the lower layers, so only it can show whether a solution is technically feasible. A horizontal prototype answers only questions about workflows and navigation.
4. **Prototyping as a classic process model only:** Prototyping is a technique that agile teams use as well, e.g. to test a user interface idea before a sprint. It is not tied to plan-driven development.

## See Also

- [Classic vs. Agile Project Management](../projectmanagement/classic-vs-agile.md): the process models in which prototyping is used
- [Wireframe, Mockup and Prototype](./software-ergonomics/wireframe-mockup-prototype.md): prototypes of the user interface and their fidelity
- [Usability and Human-Centred Design](./software-ergonomics/usability.md): the design process in which prototypes are evaluated with users
- [Requirement/Functional Specifications](../projectmanagement/requirements-specification.md): the documents that record the requirements clarified with a prototype
