---
title: "Inheritance"
description: "Inheritance in object-oriented programming: superclass and subclass, generalisation and specialisation, is-a versus has-a, composition over inheritance, multiple inheritance and the diamond problem."
keywords:
    - Inheritance
    - Superclass
    - Subclass
    - Generalisation
    - Specialisation
    - Composition over Inheritance
    - Multiple Inheritance
    - Diamond Problem
sidebar_position: 3
tags:
    - ap2
---

# Inheritance

Inheritance derives a new class (subclass, child class, derived class) from an existing one (superclass, parent class, base class). The subclass takes over all attributes and methods of the superclass, can add new ones and can [override](./polymorphism.md#overriding-vs-overloading) inherited methods.

The relationship has two reading directions:

- **Generalisation:** Common features of several classes are moved up into a superclass, e.g. `Car` and `Truck` => `Vehicle`.
- **Specialisation:** A superclass is refined into more specific subclasses, e.g. `Vehicle` => `Car`, `Truck`.

Inheritance fits only an **is-a** relationship: a car is a vehicle. A **has-a** relationship is no reason for inheritance and is modelled with composition: a car has an engine but is not one, so `Car` does not inherit from `Engine`.

The rule "composition over inheritance" prefers composition even where inheritance would be possible. Composition can be changed at runtime and does not expose the internals of the reused class, while inheritance binds the subclass permanently to the implementation of the superclass.

```typescript
class Vehicle {
    protected speed = 0;
    protected readonly maxSpeed: number;

    constructor(maxSpeed: number) {
        this.maxSpeed = maxSpeed;
    }

    accelerate(delta: number): void {
        this.speed = Math.min(this.speed + delta, this.maxSpeed);
    }
}

class Car extends Vehicle {
    private readonly seats: number;

    constructor(maxSpeed: number, seats: number) {
        super(maxSpeed);               // calls the superclass constructor
        this.seats = seats;
    }
}

const car = new Car(200, 5);
car.accelerate(50);                    // inherited from Vehicle
```

## Multiple Inheritance and the Diamond Problem

With multiple inheritance, a class has more than one direct superclass. This leads to the diamond problem:

```text
          A
       + greet()
        △     △
        │     │
        B     C
  + greet()   + greet()
        △     △
        │     │
          D
```

When `greet()` is called on a `D` object, it is unclear which implementation applies. Languages resolve this ambiguity in different ways:

- **C++:** Allows multiple inheritance. Ambiguous calls must be qualified explicitly (`B::greet()`). Virtual inheritance prevents `A` from being contained twice.
- **Python:** Allows multiple inheritance and resolves calls through a fixed method resolution order (MRO).
- **Java, C#, TypeScript:** Allow only one superclass, but any number of [interfaces](./abstraction.md). Interfaces carry no state, so the problem largely disappears. If two Java interfaces provide conflicting `default` methods, the class must override the method, otherwise compilation fails.

## Preventing Inheritance and Overriding

No class can inherit from a final class, and no subclass can override a final method. This protects behaviour that a subclass could otherwise break, such as the immutability of a value type or the fixed sequence of a [template method](./design-patterns/template-method.md).

## Common Mistakes

1. **Inheritance for code reuse only:** Without an is-a relationship, the subclass inherits methods that make no sense for it. A stack class derived from a general list class also offers insertion at any position, so the last-in-first-out order can be bypassed. Composition avoids this.

## See Also

- [Polymorphism](./polymorphism.md): overriding inherited methods and dynamic binding
- [Abstraction](./abstraction.md): abstract classes and interfaces as superclass and contract
- [Class Diagram](../uml/class-diagram.md): the UML notation for classes, visibilities, inheritance and associations
