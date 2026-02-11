---
title: Class Diagram
description: Comprehensive explanation of UML class diagrams. Including structure, visibility, relationships, cardinality, best practices, and a example on the basis of a library system.
keywords: 
    - UML
    - Class Diagram
last_update:
    author: moritz-grimm
---

# Class Diagram

## Definition

A class diagram is a structural UML diagram that visualizes the static structure of a system by showing classes, their attributes, methods, and the relationships between them. It's one of the most commonly used diagrams in object-oriented programming and software design.

## Purpose

Class diagrams are used to:

- Model the structure of a system
- Visualize relationships between classes
- Plan software architecture before implementation
- Document existing code structure
- Communicate design decisions to team members

## Components

### Classes

A class is represented as a rectangle divided into three sections:

```text
┌─────────────────┐
│   ClassName     │  ← Class name (PascalCase)
├─────────────────┤
│   - attribute   │  ← Attributes (camelCase)
│   # attribute   │
├─────────────────┤
│   + method()    │  ← Methods (camelCase)
└─────────────────┘
```

### Attributes

Attributes represent the data/properties of a class.

**Syntax:** `visibility name: dataType`

Example: `- email: String`

### Methods

Methods represent the behavior/functions of a class.

**Syntax:** `visibility methodName(parameter: type): returnType`

Example: `+ getName(): String`

### Visibility Modifiers

| Symbol | Visibility | Meaning                            | When to use              |
| ------ | ---------- | ---------------------------------- | ------------------------ |
| `-`    | Private    | Only accessible within the class   | Default for attributes   |
| `#`    | Protected  | Accessible in class and subclasses | For inherited attributes |
| `+`    | Public     | Accessible from anywhere           | Default for methods      |
| `~`    | Package    | Accessible within the same package | Rarely used              |

## Relationships

### Association

A general relationship between two classes, indicating that objects of one class are connected to objects of another.

**Notation:** Solid line connecting two classes

**Example:** A `Customer` is associated with an `Order`

```text
Customer ────── Order
```

### Aggregation (Weak Ownership)

A special type of association where one class is a container for another, but the contained class can exist independently.

**Notation:** Hollow diamond on the container side

**Example:** A `Library` has `Books`, but books can exist without the library

```text
Library ◇────── Book
```

**Key characteristic:** If the container is destroyed, the contained objects survive.

### Composition (Strong Ownership)

A stronger form of aggregation where the contained class cannot exist without the container.

**Notation:** Filled diamond on the container side

**Example:** A `Book` has `Chapters`, chapters cannot exist without the book

```text
Book ◆────── Chapter
```

**Key characteristic:** If the container is destroyed, the contained objects are also destroyed.

### Inheritance (Is-A)

Represents a relationship where one class (subclass/child) inherits attributes and methods from another class (superclass/parent).

**Notation:** Hollow arrow pointing to the parent class

**Example:** `Dog` and `Cat` inherit from `Animal`

```text
      Animal
         △
         │
    ┌────┴────┐
    │         │
   Dog       Cat
```

**Important:** Inherited attributes in the parent class should use `protected` visibility (`#`) so subclasses can access them.

## Cardinality (Multiplicity)

Cardinality specifies how many instances of one class can be associated with instances of another class.

| Notation      | Meaning        | Example                                        |
| ------------- | -------------- | ---------------------------------------------- |
| `1`           | Exactly one    | A person has exactly one birth date            |
| `0..1`        | Zero or one    | A person may have zero or one driver's license |
| `*` or `0..*` | Zero or more   | A library can have zero or more books          |
| `1..*`        | One or more    | A book has one or more pages                   |
| `n..m`        | Specific range | A course has 5..30 students                    |

**Placement:** Cardinality is placed near the class it describes.

```text
Library 1 ────── 0..* Book
```

*One library can have zero or more books*

## Naming Conventions

### General Rules

1. **Class names:** Start with uppercase (PascalCase)
   - ✅ `Customer`, `ShoppingCart`
   - ❌ `customer`, `shopping_cart`

2. **Attributes and methods:** Start with lowercase (camelCase)
   - ✅ `firstName`, `calculateTotal()`
   - ❌ `FirstName`, `CalculateTotal()`

3. **No umlauts or special characters**
   - ✅ `doppelgaenger`
   - ❌ `doppelgänger` → use `doppelgaenger` (since 'ä' becomes 'ae')

4. **Boolean attributes:** Prefix with `is`, `has`, or `can`
   - ✅ `isActive`, `hasPermission`

5. **Method names:** Use verbs
   - ✅ `calculateTotal()`, `saveData()`
   - ❌ `total()`, `data()`

## Best Practices

### Attribute Visibility

- **Default:** Use `private` (`-`) for all attributes
- **Exception:** Use `protected` (`#`) for attributes that will be inherited by subclasses
- **Avoid:** Making attributes `public` unless absolutely necessary

### Method Visibility

- **Default:** Use `public` (`+`) for methods that form the class's interface
- **Use `private`:** For helper methods only used within the class

### Abstract Classes

Indicate abstract classes by:

- Writing the class name in *italics*
- Or adding `<<abstract>>` above the class name

```text
┌────────────────────────┐
│   <<abstract>>         │
│      Vehicle           │
├────────────────────────┤
│ # licensePlate: String │
├────────────────────────┤
│ + startEngine(): void  │
└────────────────────────┘
```

### Interfaces

Indicate interfaces by adding `<<interface>>` above the interface name.

## Complete Example: Library System

This example demonstrates all important concepts of class diagrams.

### Scenario

A simple library management system with books, magazines, users, and borrowing functionality.

### Classes Overview

- Medium (abstract parent class)
  - Abstract class representing any borrowable item
  - Attributes are `protected` because they're inherited

- Book (inherits from Medium)
  - Specific type of medium
  - Has a composition relationship with chapters

- Magazine (inherits from Medium)
  - Another specific type of medium

- Chapter
  - Part of a book (composition)
  - Cannot exist without a book

- Library
  - Contains media (aggregation)
  - Media can exist without the library

- Media
  - Is part of the library (aggregation)
  - Can exist without the library

- User
  - Can borrow media (association)

### Class Details

#### Medium (Abstract)

```text
┌────────────────────────────┐
│     <<abstract>>           │
│        Medium              │
├────────────────────────────┤
│ # titel: String            │
│ # isbn: String             │
├────────────────────────────┤
│ + borrowMedium(): boolean  │
│ + returnMedium(): void     │
└────────────────────────────┘
```

#### Book

```text
┌─────────────────────────┐
│         Book            │
├─────────────────────────┤
│ - author: String        │
│ - numberOfPages: int    │
├─────────────────────────┤
│ + getAuthor(): String   │
└─────────────────────────┘
```

#### Magazine

```text
┌────────────────────────┐
│       Magazine         │
├────────────────────────┤
│ - edition: int         │
│ - releaseDate: Date    │
├────────────────────────┤
│ + getEdition(): int    │
└────────────────────────┘
```

#### Chapter

```text
┌─────────────────────────┐
│       Chapter           │
├─────────────────────────┤
│ - chapterNumber: int    │
│ - headline: String      │
├─────────────────────────┤
└─────────────────────────┘
```

#### Library

```text
┌──────────────────────────────────────────┐
│            Library                       │
├──────────────────────────────────────────┤
│ - name: String                           │
│ - adress: String                         │
├──────────────────────────────────────────┤
│ + addMedium(medium: Medium): void        │
│ + removeMedium(medium: Medium): boolean  │
└──────────────────────────────────────────┘
```

#### Benutzer

```text
┌─────────────────────────────────────────┐
│           User                          │
├─────────────────────────────────────────┤
│ - userId: int                           │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Relationships

1. **Inheritance:**
   - `Book` inherits from `Medium`
   - `Magazine` inherits from `Medium`

2. **Composition:** `Book ◆────── 1..* Chapter`
   - A book must have at least one chapter
   - Chapters cannot exist without their book

3. **Aggregation:** `Library ◇────── 0..* Medium`
   - A library can have zero or more media
   - Media can exist independently of the library

4. **Association:** `User ────── * Medium` (labeled "borrows")
   - Users can borrow multiple media
   - Media can be borrowed by multiple users over time

### Visual Representation

```text
                    ┌────────────────────────────┐
                    │     <<abstract>>           │
                    │        Medium              │
                    ├────────────────────────────┤
                    │ # titel: String            │
                    │ # isbn: String             │
                    ├────────────────────────────┤
                    │ + borrowMedium(): boolean  │
                    │ + returnMedium(): void     │
                    └───────────┬────────────────┘
                                △
                                │ (inheritance)
                    ┌───────────┴───────────┐
                    │                       │
        ┌───────────┴──────────┐   ┌────────┴──────────────┐
        │       Book           │   │    Magazine           │
        ├──────────────────────┤   ├───────────────────────┤
        │ - author: String     │   │ - edition: int        │
        │ - numberOfPages: int │   │ - releaseDate: Date   │
        ├──────────────────────┤   ├───────────────────────┤
        │ + getAuthor()        │   │ + getEdition()        │
        └─────────┬────────────┘   └───────────────────────┘
                  │
                  │ ◆ (composition)
                  │ 1..*
        ┌─────────┴────────────┐
        │      Chapter         │
        ├──────────────────────┤
        │ - chapterNumber: int │
        │ - headline: String   │
        └──────────────────────┘


┌────────────────────────┐                *  ┌────────────────┐
│        Library         │ ◇──────────────   │    Medium     │
├────────────────────────┤  (aggregation)    └────────────────┘
│ - name: String         │
│ - adress: String       │
├────────────────────────┤
│ + mediumHinzufuegen()  │
│ + mediumEntfernen()    │
└────────────────────────┘


┌─────────────────────────────────────────┐ 1         borrows         *  ┌─────────────────┐
│     User                                │ ───────────────────────────  │     Medium      │
├─────────────────────────────────────────┤        (association)         └─────────────────┘
│ - benutzerId: int                       │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Key Takeaways from this Example

1. **Protected attributes in Medium:** `titel` and `isbn` are protected (`#`) so that `Buch` and `Zeitschrift` can inherit them
2. **Composition vs Aggregation:** Chapters belong strongly to books (composition), while media can exist without a library (aggregation)
3. **Inheritance:** Both `Buch` and `Zeitschrift` inherit common behavior from `Medium`
4. **Cardinality:** A book must have at least one chapter (`1..*`), but a library can have zero media (`0..*`)

## Tools for Creating Class Diagrams

- draw.io / diagrams.net (Free, browser-based)
- Lucidchart (Limited free version)
- PlantUML (Text-based, requires setup)
- Visual Paradigm
- StarUML

## Common Mistakes to Avoid

1. **Using public attributes:** Almost always use private or protected
2. **Forgetting cardinality:** Always specify how many instances can be related
3. **Wrong relationship type:** Understand the difference between aggregation and composition
4. **Inconsistent naming:** Use camelCase for attributes/methods, PascalCase for classes

## Related Concepts

- Object Diagram (shows instances of classes)
- Sequence Diagram (shows interactions over time)
- Use Case Diagram (shows system functionality)
- ER Diagram (database modeling)
