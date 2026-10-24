---
title: "Abstraction"
description: "Abstraction in object-oriented programming: abstract classes and interfaces compared by state, implemented methods, constructor, multiplicity, keyword, relationship and UML notation."
keywords:
    - Abstraction
    - Abstract Class
    - Interface
    - Abstract Method
    - extends
    - implements
sidebar_position: 5
tags:
    - ap2
---

# Abstraction

Abstraction reduces a thing to the features relevant for the task at hand and hides the details. A caller of [`shape.area()`](./polymorphism.md#dynamic-binding) needs to know that every shape has an area, not how it is computed.

Two language constructs support abstraction:

- **Abstract class:** A class marked `abstract` that cannot be instantiated. It can contain abstract methods without a body, which every concrete subclass must implement, as well as attributes and implemented methods.
- **Interface:** A pure contract listing method signatures. A class that implements an interface promises to provide all its methods.

| Criterion           | Abstract Class                    | Interface                                                        |
| ------------------- | --------------------------------- | ---------------------------------------------------------------- |
| Instantiable        | No                                | No                                                               |
| Attributes (state)  | Yes                               | No, only constants (Java)                                        |
| Implemented methods | Yes                               | Only `default` and `static` methods (Java 8+)                    |
| Constructor         | Yes                               | No                                                               |
| How many per class  | One (single inheritance)          | Any number                                                       |
| Keyword             | `extends`                         | `implements`                                                     |
| Relationship        | is-a, closely related classes     | can-do, capability shared by unrelated classes                   |
| UML                 | Name in italics or `<<abstract>>` | `<<interface>>`, realisation as dashed line with hollow triangle |

An abstract class fits when several related classes share code and state, e.g. `Shape` with a shared `toString()`. An interface fits when unrelated classes share a capability, e.g. `Comparable` for anything that can be sorted, from `Invoice` to `Employee`.

```typescript
interface Printable {
    print(): void;
}

abstract class Shape {
    constructor(protected name: string) {}

    abstract area(): number;

    toString(): string {
        return `${this.name}: ${this.area()}`;
    }
}

class Circle extends Shape implements Printable {
    constructor(private radius: number) {
        super("Circle");
    }

    area(): number {
        return Math.PI * this.radius ** 2;
    }

    print(): void {
        console.log(this.toString());
    }
}
```

## See Also

- [Polymorphism](./polymorphism.md): calling the implementation behind an abstract type at runtime
- [SOLID](./solid.md): design principles, several of which rely on abstractions
- [Class Diagram](../uml/class-diagram.md): the UML notation for classes, visibilities, inheritance and associations
- [Naming Conventions](../../typescript/naming-conventions.md): naming of classes, interfaces and members in TypeScript
