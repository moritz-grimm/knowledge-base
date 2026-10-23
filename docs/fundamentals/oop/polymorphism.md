---
title: "Polymorphism"
description: "Polymorphism in object-oriented programming: dynamic binding, overriding versus overloading, and the forms subtype, ad-hoc and parametric polymorphism."
keywords:
    - Polymorphism
    - Dynamic Binding
    - Late Binding
    - Overriding
    - Overloading
    - Subtype Polymorphism
    - Ad-hoc Polymorphism
    - Parametric Polymorphism
    - Generics
sidebar_position: 4
tags:
    - ap2
---

# Polymorphism

Polymorphism (Greek for "many forms") means that one call can trigger different behaviour depending on the object receiving it. A call of `area()` on a variable of type `Shape` runs the implementation of `Circle` or `Rectangle`, depending on which object the variable refers to.

## Dynamic Binding

The compiler only knows the declared type of a variable, so it cannot fix which overridden method runs. The method is selected at runtime from the actual class of the object, which is called dynamic or late binding. With static or early binding, the compiler fixes the method from the declared types, as with [overloading](#overriding-vs-overloading).

```typescript
abstract class Shape {
    abstract area(): number;

    toString(): string {
        return `${this.constructor.name} with area ${this.area().toFixed(2)}`;
    }
}

class Circle extends Shape {
    constructor(private readonly radius: number) {
        super();
    }

    override area(): number {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(private readonly width: number, private readonly height: number) {
        super();
    }

    override area(): number {
        return this.width * this.height;
    }
}

const shapes: Shape[] = [new Circle(1), new Rectangle(2, 3)];
for (const shape of shapes) {
    console.log(shape.toString());     // "Circle with area 3.14", "Rectangle with area 6.00"
}
```

The loop knows only the type `Shape`, so a new class `Triangle` can be added without changing the loop.

## Overriding vs. Overloading

|                | Overriding                              | Overloading                                    |
| -------------- | --------------------------------------- | ---------------------------------------------- |
| Where          | In a subclass                           | In the same class or a subclass                |
| Method name    | Same                                    | Same                                           |
| Parameter list | Same                                    | Different (number, types or order)             |
| Decided        | At runtime (dynamic binding)            | At compile time (static binding)               |
| Purpose        | Subclass changes inherited behaviour    | Same operation for different inputs            |
| Example        | `Circle.area()` replaces `Shape.area()` | `print(text: String)` and `print(number: int)` |

In Java, C# and C++, two methods that differ only in their return type are not valid overloads and cause a compiler error.

## Forms of Polymorphism

- **Subtype polymorphism:** Overriding plus dynamic binding, as in the example above. "Polymorphism" without qualifier usually means this form.
- **Ad-hoc polymorphism:** Overloading. The compiler selects the method based on the argument types.
- **Parametric polymorphism:** Generics. `List<T>` works for any type `T` with the same code.

## Common Mistakes

1. **Confusing overriding and overloading:** Overriding replaces an inherited method with the same signature and is resolved at runtime. Overloading adds a method with the same name but a different parameter list and is resolved at compile time.
2. **Changed parameter list when overriding:** In Java, a subclass method `equals(Customer other)` does not override `equals(Object other)` but overloads it. Collections such as `List.contains()` call `equals(Object)`, so the inherited version runs and compares references only.

## See Also

- [Inheritance](./inheritance.md): the superclass-subclass relationship that overriding builds on
- [Abstraction](./abstraction.md): abstract classes such as `Shape` and interfaces
- [Strategy](./design-patterns/strategy.md): a design pattern that exchanges behaviour through polymorphism
