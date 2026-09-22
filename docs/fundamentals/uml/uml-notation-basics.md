---
title: "UML Notation Basics"
description: "Cross-diagram UML notation: visibility markers, multiplicities and how to read them, keywords, stereotypes, notes, tagged values, constraints, role names, naming conventions and diagram frames."
keywords:
    - UML
    - Notation
    - Visibility
    - Multiplicity
    - Keyword
    - Stereotype
    - Tagged Value
    - Constraint
    - Role Name
    - Diagram Frame
tags:
    - ap2
---

# UML Notation Basics

## Overview

A handful of notation elements appear in almost every UML diagram, independent of the diagram type. Visibility markers, multiplicities, keywords and stereotypes, notes, constraints and diagram frames mean the same thing in a [class diagram](./class-diagram.md), a [component diagram](./component-diagram.md) and a [state machine diagram](./state-machine-diagram.md) alike.

---

## Visibility

Visibility states who may access a feature (attribute, operation, or a member of a package or component). It is written as a single character directly in front of the feature name.

| Marker | Name      | Access granted to                                   | Typical use                       |
| ------ | --------- | --------------------------------------------------- | --------------------------------- |
| `+`    | public    | Every element that can see the classifier           | Interface of a class              |
| `-`    | private   | Only the classifier itself                          | Internal state, helper operations |
| `#`    | protected | The classifier and its specialisations (subclasses) | Extension points for subclasses   |
| `~`    | package   | Every element in the same package                   | Collaboration inside one module   |

Two further markers are frequently confused with visibility but express something else:

- `/` in front of a name marks a **derived** feature, whose value is computed from other features (`/ age` from `dateOfBirth`).
- An underlined name marks a **static** feature, which belongs to the classifier instead of to an individual object.

The following class uses all of these markers. Plain text cannot show an underline, so the static attribute `MAX_LIMIT` is marked with `(static)` instead:

```text
┌──────────────────────────────────────┐
│               Account                │
├──────────────────────────────────────┤
│ + accountNumber: String              │
│ - balance: Decimal                   │
│ # owner: Customer                    │
│ ~ auditLog: LogEntry [0..*]          │
│ / available: Decimal                 │
│ + MAX_LIMIT: Decimal = 5000 (static) │
├──────────────────────────────────────┤
│ + deposit(amount: Decimal)           │
│ + withdraw(amount: Decimal): Bool    │
│ - validate(amount: Decimal): Bool    │
└──────────────────────────────────────┘
```

Visibility is optional in UML. A missing marker means *unspecified*, not *public*, even though many tools default to public.

---

## Multiplicities

A multiplicity states how many objects may participate at one end of an association, or how many values an attribute may hold. It is written next to the association end or in square brackets after the attribute type.

| Notation | Range                | Reading                                            |
| -------- | -------------------- | -------------------------------------------------- |
| `1`      | exactly 1            | Mandatory, exactly one object                      |
| `0..1`   | 0 or 1               | Optional, at most one object                       |
| `*`      | 0 to unbounded       | Short form of `0..*`, no implicit lower bound of 1 |
| `0..*`   | 0 to unbounded       | Optional, any number                               |
| `1..*`   | 1 to unbounded       | Mandatory, at least one                            |
| `n..m`   | n to m               | Explicit range, for example `2..4`                 |
| `5`      | exactly 5            | Fixed number                                       |
| `1..3,7` | 1 to 3, or exactly 7 | Several ranges                                     |

Rules for reading and writing multiplicities:

- The multiplicity is placed next to the class it describes and states how many objects of that class are linked to one object at the other end.
- The lower bound decides whether the relationship is optional (`0`) or mandatory (`1` or higher).
- The upper bound decides whether the implementation holds a single reference (`1`) or a collection (`*`).
- An omitted multiplicity is formally undefined, most tools and textbooks read it as `1`.

### Reading an Association

```text
┌──────────────┐ 1          0..* ┌──────────────┐
│   Customer   ├─────────────────┤    Order     │
└──────────────┘   places   ▶    └──────────────┘
```

The sentence is built from the class at one end, the association name and the multiplicity at the other end, then repeated in the opposite direction:

- A `Customer` places **zero or more** `Order` objects.
- An `Order` is placed by **exactly one** `Customer`.

The small filled triangle `▶` after the association name is the **reading direction** marker. It states in which direction the name forms a sentence and carries no further semantics. The triangle is optional, without it the name is read from left to right or from top to bottom.

---

## Keywords and Stereotypes

A label in guillemets (`«…»`) adds meaning to an existing model element without inventing a new shape for it. It is written above or in front of the element name.

```text
┌──────────────────────┐
│     «interface»      │
│      Printable       │
├──────────────────────┤
│ + print(): void      │
└──────────────────────┘
```

Where guillemets are unavailable, the doubled angle brackets `<<interface>>` are accepted as a substitute, which is why both spellings appear in practice.

Two kinds of label are written this way:

- A **keyword** is predefined by UML itself. It names a metaclass or a fixed variant of one, is reserved, and may be used without declaring anything first.
- A **stereotype** is defined by the modeller or a tool and adapts an element to a domain, a technology or a company standard. It carries meaning only where it is defined.

Keywords predefined by UML:

| Keyword                    | Applies to            | Meaning                                    |
| -------------------------- | --------------------- | ------------------------------------------ |
| `<<interface>>`            | Class                 | Declares operations without implementation |
| `<<enumeration>>`          | Class                 | A type with a fixed set of literals        |
| `<<include>>`              | Use case relationship | A use case always uses another one         |
| `<<extend>>`               | Use case relationship | A use case optionally extends another one  |
| `<<use>>`                  | Dependency            | The client requires the supplier           |
| `<<create>>`               | Message               | The message creates the receiving object   |
| `<<destroy>>`              | Message               | The message destroys the receiving object  |
| `<<device>>`               | Node                  | A physical piece of hardware               |
| `<<executionEnvironment>>` | Node                  | Runtime environment on a device            |
| `<<artifact>>`             | Artifact              | A deployable file                          |

Stereotypes sit on top of these and are equally legitimate, as long as they are defined somewhere, for a small project a short legend listing the stereotypes in use is sufficient. Classic examples from analysis modelling are `<<entity>>` for a persistent business object, `<<boundary>>` for an element at the system border and `<<control>>` for a coordinating element.

---

## Notes and Comments

A note is a rectangle with a folded corner, attached to the element it comments on by a dashed line. It carries no semantics, it is free text for the reader.

```text
┌──────────────┐         ┌───────────────────────────┐
│   Invoice    │- - - - -│ Net amounts only, VAT is  └─┐
└──────────────┘         │ added by the tax service.   │
                         └─────────────────────────────┘
```

Guidance for using notes:

- A note explains *why*, not *what*, repeating the element name in prose adds nothing.
- A note may be attached to several elements with several dashed lines.
- Assumptions, open questions and decisions with their rationale are typical content.
- A model that only becomes comprehensible through its notes usually has a structural problem.

---

## Tagged Values

A tagged value attaches a named property to a model element, written as `name = value` in braces. Tagged values are normally introduced by a stereotype, which defines which tags exist and what they mean.

```text
┌───────────────────────────────────┐
│             «entity»              │
│             Customer              │
│ {table = "CUST", schema = "crm"}  │
└───────────────────────────────────┘
```

Typical applications:

- Technical mapping information, for example a table or column name for persistence
- Process metadata such as `{author = "Team A", version = "1.2", status = "reviewed"}`
- Non-functional requirements such as `{maxResponseTime = "200ms"}`
- Code generation hints consumed by a model-driven toolchain

Several tagged values are separated by commas inside one pair of braces, or written on separate lines in a note attached to the element.

---

## Constraints

A constraint is a condition that must hold for the model to be valid. It is written in braces, either directly at the element or in an attached note.

| Constraint             | Applies to         | Meaning                                                 |
| ---------------------- | ------------------ | ------------------------------------------------------- |
| `{readOnly}`           | Attribute, end     | The value is set once and not modified afterwards       |
| `{abstract}`           | Class, operation   | No implementation, alternative to italics               |
| `{xor}`                | Two associations   | Exactly one of the two associations may be instantiated |
| `{complete, disjoint}` | Generalisation set | Every object belongs to exactly one subclass            |

A free-text constraint is equally valid and far more common in practice:

```text
┌──────────────┐         ┌─────────────────────────────┐
│   Account    │- - - - -│ {balance >= overdraftLimit} └─┐
└──────────────┘         └───────────────────────────────┘
```

### OCL

For conditions that need to be stated formally, the OMG defines the **Object Constraint Language** (OCL), a separate textual language used alongside UML. The condition from the note above, written in OCL:

```text
context Account
  inv: balance >= overdraftLimit
```

`context` names the class the condition applies to, `inv` marks an invariant, a condition that must hold at all times. In practice an informal condition in braces is usually sufficient, what matters is that it is attached to the right element.

---

## Role Names and Navigability

An association end may carry a **role name**, stating the part the class plays in that relationship. The role name is written at the end it describes, in lower case, and becomes the attribute name in the implementation.

```text
┌──────────────┐ employer        employee ┌──────────────┐
│   Company    ├──────────────────────────┤    Person    │
└──────────────┘ 1                    0..*└──────────────┘
```

Reading: a `Person` has exactly one `Company` in the role `employer`, a `Company` has zero or more `Person` objects in the role `employee`. The implementation would carry a field `employer` in `Person` and a collection `employee` in `Company`.

Role names become indispensable when two classes are connected more than once, or when a class is associated with itself:

```text
┌────────────────────┐
│      Employee      │
└──┬──────────────┬──┘
   │ 0..1         │ 0..*
   │ supervisor   │ subordinate
   └──────────────┘
```

Reading: an `Employee` has at most one other `Employee` in the role `supervisor` and zero or more in the role `subordinate`.

Elements that give an association a direction:

- **Reading direction (`▶`):** next to the association name, purely a reading aid
- **Navigability (open arrowhead):** at one end, that end can be reached from the other
- **Non-navigability (small cross `x`):** at one end, that end explicitly cannot be reached
- **No arrowheads:** navigability unspecified, in practice read as *navigable in both directions*

---

## Naming Conventions

The conventions below are not part of the UML specification but are near-universal in practice.

| Element          | Convention                        | Example                       |
| ---------------- | --------------------------------- | ----------------------------- |
| Class            | PascalCase, singular noun         | `Invoice`, `CustomerAccount`  |
| Interface        | PascalCase, often an adjective    | `Printable`, `Comparable`     |
| Attribute        | camelCase, noun                   | `orderDate`, `totalAmount`    |
| Operation        | camelCase, verb + object          | `calculateTotal()`            |
| Role name        | camelCase, noun naming the role   | `employer`, `lineItems`       |
| Association name | Verb in the third person singular | `places`, `contains`          |
| Package          | Lower case, singular              | `billing`, `reporting`        |
| Use case         | Verb + object in the infinitive   | `Place order`                 |
| Actor            | Role noun, never a person's name  | `Customer`, `Payment Service` |
| Action           | Verb + object in the infinitive   | `Validate order`              |
| State            | Adjective or participle           | `Paid`, `Awaiting approval`   |
| Component        | Noun describing the service       | `OrderService`                |
| Node             | Noun describing device or host    | `Application Server`          |

Two rules apply to all of them:

- One name for one concept across the whole model, a class named `Customer` in one diagram is not `Client` in the next.
- The language of the model is chosen once, for the whole model, and not mixed.

---

## Diagram Frames

Every UML diagram may be drawn inside a frame: a rectangle whose upper left corner carries a pentagon-shaped tag with the diagram kind and the diagram name.

```text
┌─────────────────────────────────────────────┐
│ sd Place Order ╱                            │
├───────────────┘                             │
│                                             │
│          (contents of the diagram)          │
│                                             │
└─────────────────────────────────────────────┘
```

The frame header follows the pattern `<kind> <name>`, optionally with parameters. Common kind keywords, in the short form and the long form that tools also accept:

| Short | Long            | Diagram                         |
| ----- | --------------- | ------------------------------- |
| `sd`  | `interaction`   | Sequence, communication, timing |
| `act` | `activity`      | Activity                        |
| `stm` | `state machine` | State machine                   |
| `cmp` | `component`     | Component                       |
| `dep` | `deployment`    | Deployment                      |
| `cls` | `class`         | Class                           |
| `uc`  | `use case`      | Use case                        |
| `pkg` | `package`       | Package                         |

When the frame is required rather than optional:

- In a [sequence diagram](./sequence-diagram.md), where the frame is standard and nested combined fragments (`alt`, `opt`, `loop`, `ref`) are drawn as frames of their own
- Whenever one diagram is referenced from another, since the reference uses the frame name
- Whenever several diagrams appear on one page or in one document and need to be told apart

For a single diagram on its own page the frame is usually omitted and a heading takes its place.

---

## Mapping to Code

| Notation               | Construct in the program                     |
| ---------------------- | -------------------------------------------- |
| `+`                    | `public`                                     |
| `-`                    | `private`                                    |
| `#`                    | `protected`                                  |
| `~`                    | Package-private in Java, `internal` in C#    |
| Underlined name        | `static`                                     |
| `/` in front of a name | Getter computing the value, no stored field  |
| `1`                    | Field that must not be `null`                |
| `0..1`                 | Nullable field, `Optional<T>`, `T?`          |
| `{readOnly}`           | `final`, `readonly`, `const`                 |
| `<<interface>>`        | `interface`                                  |
| `<<enumeration>>`      | `enum`                                       |
| `{abstract}`           | `abstract class`                             |
| Role name              | Name of the field holding the reference      |
| `inv` in OCL           | Check in the constructor and in every setter |

---

## Common Mistakes

1. **Mistaking `-` for a dash:** a leading `-` is the visibility marker *private*, not decoration, a private attribute is not accessible from another class.
2. **Reading `*` as "many, but at least one":** `*` means `0..*`, if at least one object is required the notation is `1..*`.
3. **Multiplicity at the wrong end:** the multiplicity next to a class states how many objects of *that* class participate, seen from the opposite end.
4. **Braces and guillemets swapped:** `{...}` holds a constraint or a tagged value, `«...»` a keyword or a stereotype, the two are not interchangeable.
5. **Stereotypes without a definition:** an invented stereotype that is explained nowhere is decoration, not information.
6. **Role name identical to the class name:** a role `customer` on a `Customer` adds nothing, a role name is only worth writing when it says more than the type does.
7. **Notes carrying model semantics:** a condition that the system must enforce belongs in a constraint, not in a prose note.
8. **Reading direction confused with navigability:** the filled triangle `▶` concerns the sentence, the open arrowhead concerns access.
9. **Mixed languages and inconsistent names:** the same concept under two names produces two concepts in the reader's head.
10. **Omitting visibility everywhere and implementing everything as public:** an unspecified visibility is a gap in the model, not a decision.

---

## Tools

- draw.io / diagrams.net (free, browser-based, UML shape library included)
- PlantUML (text-based, supports stereotypes, tagged values and frames directly in the source)
- Mermaid (text-based, renders in Markdown, supports a subset of the notation)
- Visual Paradigm, StarUML, Enterprise Architect (commercial, with OCL support)

## See Also

- [UML Overview](./uml-overview.mdx): the diagram types of UML and how they relate to each other
- [Class Diagram](./class-diagram.md): where visibility, multiplicity and role names are used most intensively
- [Activity Diagram](./activity-diagram.md): notes and frames in a behavioural diagram
- [Use Case Diagram](./use-case-diagram.md): the keywords `<<include>>` and `<<extend>>` in context
- [Sequence Diagram](./sequence-diagram.md): frames as combined fragments
- [State Machine Diagram](./state-machine-diagram.md): guards and constraints on transitions
- [Component Diagram](./component-diagram.md): keywords on components and interfaces
- [Deployment Diagram](./deployment-diagram.md): the node keywords `<<device>>` and `<<executionEnvironment>>`
- [Further UML Diagrams](./further-uml-diagrams.md): the remaining diagram types and their frame keywords
- [ER Model](../databases/er-model.md): cardinalities in data modelling compared with UML multiplicities
