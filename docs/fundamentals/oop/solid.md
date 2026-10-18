---
title: "SOLID"
description: "The five SOLID design principles by Robert C. Martin: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation and Dependency Inversion."
keywords:
    - SOLID
    - Single Responsibility Principle
    - Open/Closed Principle
    - Liskov Substitution Principle
    - Interface Segregation Principle
    - Dependency Inversion Principle
    - Robert C. Martin
sidebar_position: 6
tags:
    - ap2
---

# SOLID

SOLID is an acronym for five design principles collected by Robert C. Martin.

| Letter | Principle                       | Statement                                                                                                                   |
| ------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| S      | Single Responsibility Principle | A class has exactly one responsibility and therefore only one reason to change.                                             |
| O      | Open/Closed Principle           | A class is open for extension but closed for modification: new behaviour is added without editing existing code.            |
| L      | Liskov Substitution Principle   | An object of a subclass can replace an object of its superclass without breaking the program.                               |
| I      | Interface Segregation Principle | Several small, specific interfaces are better than one large one; no class is forced to implement methods it does not need. |
| D      | Dependency Inversion Principle  | High-level modules do not depend on low-level modules; both depend on abstractions.                                         |

The classic violation of the Liskov principle is `Square extends Rectangle`. Mathematically a square is a rectangle, but a `Square` keeps both sides equal. For example, code that sets width 4 and height 5 on a `Rectangle` and expects an area of 20 gets 25 from a `Square`.

## Common Mistakes

1. **Single responsibility read as a single method:** The principle does not limit a class to one method but to one reason to change, i.e. one group of requirements that drives its changes. Splitting a class into one-method fragments scatters logic that always changes together across several files.
2. **Type switch that grows with every new variant:** A method such as `calculateShipping()` that branches on a type code has to be edited for each new shipping method. A separate class per variant behind a common interface adds new behaviour without touching existing code.
3. **Subclass that rejects inherited methods:** A `ReadOnlyList extends ArrayList` that throws an exception in `add()` breaks every caller that relies on the superclass contract. This violates the Liskov Substitution Principle even though the subclass compiles and its other methods work.
4. **Interface with too many methods:** Implementing classes have to provide methods they do not need, often as empty bodies or with `throw new Error("not supported")`. This violates the Interface Segregation Principle.
5. **Dependency inversion equated with dependency injection:** [Dependency injection](./dependency-injection.md) is a technique that passes dependencies in from outside. Dependency inversion concerns the direction of dependencies: the high-level module defines the abstraction and the low-level module implements it. Injecting a concrete class satisfies the first but not the second.
6. **Interface for every class:** An interface with exactly one implementation and no prospect of a second adds a layer of indirection without decoupling anything. The principles do not call for an interface on every class but address code that is expected to change.

## See Also

- [Dependency Injection](./dependency-injection.md): the most common technique to implement the Dependency Inversion Principle
- [Abstraction](./abstraction.md): abstract classes and interfaces as the abstractions the principles rely on
- [Design Patterns](./design-patterns/index.mdx): proven solutions built from these principles
