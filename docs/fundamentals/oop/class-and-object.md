---
title: "Class and Object"
description: "Basic terms of object-oriented programming: class, object, instance, attribute, method, message, constructor, destructor, static members and persistence, and identity, state and behaviour of an object."
keywords:
    - Class
    - Object
    - Instance
    - Instantiation
    - Attribute
    - Method
    - Constructor
    - Destructor
    - Static Member
    - Identity
    - State
    - Behaviour
sidebar_position: 1
tags:
    - ap2
---

# Class and Object

A class defines the attributes and methods of a kind of thing, and an object is a concrete instance of it with its own attribute values. A `Customer` class describes what every customer has (name, id) and can do (rename), while each customer object holds its own values.

| Term          | Meaning                                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Class         | Blueprint that defines the attributes and methods of a kind of object                                                                                                              |
| Object        | Concrete thing created from a class at runtime, with its own attribute values                                                                                                      |
| Instance      | Synonym for object, stressing the relationship to its class ("an instance of `Customer`")                                                                                          |
| Instantiation | Creating an object from a class                                                                                                                                                    |
| Attribute     | Variable belonging to an object, also called field or property. Together, the attributes form the state.                                                                           |
| Method        | Function belonging to a class that describes the behaviour of its objects                                                                                                          |
| Message       | Calling a method on an object. The caller sends a message, and the object decides how to react.                                                                                    |
| Constructor   | Special method that runs during instantiation and initialises the attributes                                                                                                       |
| Destructor    | Special method that runs when an object is destroyed and releases its resources. Not every language has one, because languages with a garbage collector free memory automatically. |
| Static member | Attribute or method that belongs to the class itself and is shared by all instances                                                                                                |
| Persistence   | Storing the state of an object beyond the runtime of the program, e.g. in a database or file                                                                                       |

Every object has three properties:

- **Identity:** Two objects with identical attribute values are still two distinct objects. Comparing the references tests identity, a method such as `equals()` tests content.
- **State:** The current values of all attributes. The state can change over the object's lifetime.
- **Behaviour:** The methods that can be called on the object. They read or change the state.

```typescript
class Customer {
    static customerCount = 0;          // static: shared by all instances

    private readonly id: number;       // readonly: set once in the constructor
    private name: string;

    constructor(name: string) {
        Customer.customerCount++;
        this.id = Customer.customerCount;
        this.name = name;
    }

    rename(newName: string): void {    // method => behaviour
        this.name = newName;
    }
}

const alice = new Customer("Alice");   // instantiation => object alice
const bob = new Customer("Bob");       // instantiation => object bob
alice.rename("Alice Smith");           // message to alice, bob is unaffected
```

## Common Mistakes

1. **Confusing class and object:** A class exists once in the source code and describes structure and behaviour. Objects are created from it at runtime, any number of times, each with its own state.

## See Also

- [Encapsulation](./encapsulation.md): access modifiers that protect the state of an object
- [Class Diagram](../uml/class-diagram.md): the UML notation for classes, visibilities, inheritance and associations
- [Naming Conventions](../../typescript/naming-conventions.md): naming of classes, interfaces and members in TypeScript
