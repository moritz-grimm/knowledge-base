---
title: "Dependency Injection"
description: "Dependency injection as the most common technique to implement the Dependency Inversion Principle: constructor, setter and method injection, DI containers and the relation to inversion of control."
keywords:
    - Dependency Injection
    - DI
    - Dependency Inversion Principle
    - Constructor Injection
    - Setter Injection
    - Method Injection
    - DI Container
    - Inversion of Control
    - IoC
sidebar_position: 7
tags:
    - ap2
---

# Dependency Injection

Dependency injection (DI) is the most common technique to implement the [Dependency Inversion Principle](./solid.md). A class does not create the objects it depends on itself, but receives them from outside.

```typescript
interface MessageSender {
    send(to: string, text: string): void;
}

class EmailSender implements MessageSender {
    send(to: string, text: string): void {
        // send an email
    }
}

class OrderService {
    constructor(private readonly sender: MessageSender) {}   // dependency injected

    placeOrder(customer: string): void {
        // ...
        this.sender.send(customer, "Order confirmed");
    }
}

const service = new OrderService(new EmailSender());
```

`OrderService` depends only on the interface `MessageSender`. Switching to SMS or using a fake sender in a [unit test](../unit-tests.md) requires no change to `OrderService`. Without DI, `OrderService` would contain `new EmailSender()` and be bound to that class permanently.

## Kinds of Injection

- **Constructor injection:** The dependency is a constructor parameter, so the object is complete as soon as it is created. This is the usual form for required dependencies.
- **Setter injection:** A setter receives the dependency after the object has been created. This form suits optional dependencies or ones exchanged later, but the object stays incomplete until the setter is called.
- **Method injection:** The dependency is passed as a parameter to the single method that needs it, for example when it changes from call to call.

## DI Container

DI is a form of inversion of control (IoC), because the class gives up control over creating its dependencies. A DI container, as provided by DI frameworks, takes over this control completely: it creates the objects, resolves their dependencies and injects them automatically.

## See Also

- [SOLID](./solid.md): the Dependency Inversion Principle that DI implements
- [Unit Tests](../unit-tests.md): testing classes in isolation with test doubles in place of their dependencies
- [Singleton](./design-patterns/singleton.md): the pattern that a DI-managed single instance often replaces
