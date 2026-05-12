---
title: "ER Model"
description: "An overview of the Entity-Relationship model: entities, attributes, relationships, cardinality, and weak entities."
keywords:
  - "ER Model"
  - "Entity-Relationship"
  - "Database Design"
  - "Data Modeling"
  - "Entities"
  - "Attributes"
  - "Relationships"
  - "Cardinality"
  - "Weak Entity"
---

# ER Model

The Entity-Relationship (ER) model is a conceptual data model used to describe the structure of a database at a high level, independent of any specific database system. It was introduced by Peter Chen in 1976.

## Core Concepts

### Entities

An entity is a real-world object or concept that is distinguishable from other objects. Entities of the same kind are grouped into **entity types** (e.g., `Customer`, `Product`, `Order`). A single occurrence is called an **entity instance**.

### Attributes

Attributes describe the properties of an entity type.

| Type        | Description                     | Example                         |
| ----------- | ------------------------------- | ------------------------------- |
| Simple      | Atomic, indivisible value       | `FirstName`, `Age`              |
| Composite   | Made up of sub-attributes       | `Address` = (Street, City, ZIP) |
| Multivalued | Can hold multiple values        | `PhoneNumbers`                  |
| Derived     | Computed from another attribute | `Age` derived from `BirthDate`  |

The **key attribute** (primary key) uniquely identifies each entity instance, e.g., `CustomerID`.

### Relationships

A relationship describes an association between two or more entity types. Like entities, relationships are grouped into **relationship types** (e.g., a `Customer` *places* an `Order`). Relationships can also have their own attributes (e.g., a `WorksFor` relationship might carry a `StartDate`).

## Cardinality

Cardinality defines how many instances of one entity can be associated with instances of another.

| Type | Description                               | Example                                                             |
| ---- | ----------------------------------------- | ------------------------------------------------------------------- |
| 1:1  | One instance relates to exactly one other | One person has one passport                                         |
| 1:N  | One instance relates to many others       | One customer places many orders                                     |
| N:M  | Many instances relate to many others      | Students enroll in multiple courses; courses have multiple students |

**Participation** further specifies whether every entity instance must take part in a relationship:

- **Total participation** (mandatory): Every instance must be in at least one relationship, e.g., every order must belong to a customer.
- **Partial participation** (optional): Some instances may not participate, e.g., not every customer has placed an order.

## Weak Entities

A **weak entity** cannot be uniquely identified by its own attributes alone. It depends on a **strong (owner) entity** for its identity.

- The weak entity has a **partial key** (discriminator) that is unique only within the context of its owner.
- The relationship connecting a weak entity to its owner is called an **identifying relationship**.

**Example**: `OrderItem` is a weak entity. Its partial key `LineNumber` is only unique within a specific `Order`. The full identity is `(OrderID, LineNumber)`.

## Example: Order Management

The following example shows a `Customer` who places `Orders`, each consisting of one or more `OrderItems`. `OrderItem` is a weak entity, since a `LineNumber` only makes sense in the context of a specific order.

```text
┌──────────────────┐                      ┌──────────────────┐
│    Customer      │                      │     Order        │
├──────────────────┤                      ├──────────────────┤
│ CustomerID (PK)  │─── 1 ── places ── N ─│ OrderID (PK)     │
│ Name             │                      │ OrderDate        │
│ Email            │                      └────────┬─────────┘
└──────────────────┘                               │ 1
                                                   │
                                               contains
                                            (identifying)
                                                   │
                                                   │ 1..*
                                          ╔════════╧═════════╗
                                          ║    OrderItem     ║
                                          ╠══════════════════╣
                                          ║ ~LineNumber      ║
                                          ║  Quantity        ║
                                          ╚══════════════════╝
```

## Mapping to Relational Tables

| ER concept       | Relational mapping                                         |
| ---------------- | ---------------------------------------------------------- |
| Entity type      | Table                                                      |
| Attribute        | Column                                                     |
| Key attribute    | Primary key                                                |
| 1:N relationship | Foreign key on the N-side table                            |
| N:M relationship | Junction table with foreign keys to both entity tables     |
| Weak entity      | Table with composite primary key (owner key + partial key) |
