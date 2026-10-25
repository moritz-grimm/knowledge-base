---
title: "Dependency Injection"
description: "Dependency Injection als gängigste Technik, um das Dependency Inversion Principle umzusetzen: Konstruktor-, Setter- und Methodeninjektion, DI-Container und der Bezug zu Inversion of Control."
keywords:
    - Dependency Injection
    - DI
    - Dependency Inversion Principle
    - Konstruktorinjektion
    - Setter-Injektion
    - Methodeninjektion
    - DI-Container
    - Inversion of Control
    - IoC
sidebar_position: 7
tags:
    - ap2
---

# Dependency Injection

Dependency Injection (DI) ist die gängigste Technik, um das [Dependency Inversion Principle](./solid.md) umzusetzen. Eine Klasse erzeugt die Objekte, von denen sie abhängt, nicht selbst, sondern bekommt sie von außen übergeben.

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

`OrderService` hängt nur vom Interface `MessageSender` ab. Ein Wechsel zu SMS oder ein Fake-Sender im [Unit-Test](../unit-tests.md) erfordert keine Änderung an `OrderService`. Ohne DI enthielte `OrderService` ein `new EmailSender()` und wäre dauerhaft an diese Klasse gebunden.

## Arten der Injektion

- **Konstruktorinjektion:** Die Abhängigkeit ist ein Konstruktorparameter, sodass das Objekt sofort nach dem Erzeugen vollständig ist. Das ist die übliche Form für zwingend benötigte Abhängigkeiten.
- **Setter-Injektion:** Ein Setter erhält die Abhängigkeit, nachdem das Objekt erzeugt wurde. Diese Form eignet sich für optionale oder später ausgetauschte Abhängigkeiten, aber das Objekt bleibt unvollständig, bis der Setter aufgerufen wird.
- **Methodeninjektion:** Die Abhängigkeit wird als Parameter an die einzelne Methode übergeben, die sie braucht, z.B. wenn sie sich von Aufruf zu Aufruf ändert.

## DI-Container

DI ist eine Form von Inversion of Control (IoC), weil die Klasse die Kontrolle über das Erzeugen ihrer Abhängigkeiten abgibt. Ein DI-Container, wie ihn DI-Frameworks bereitstellen, übernimmt diese Kontrolle vollständig: Er erzeugt die Objekte, löst ihre Abhängigkeiten auf und injiziert sie automatisch.

## Siehe auch

- [SOLID](./solid.md): das Dependency Inversion Principle, das DI umsetzt
- [Unit-Tests](../unit-tests.md): isoliertes Testen von Klassen mit Testdoubles anstelle ihrer Abhängigkeiten
- [Singleton](./design-patterns/singleton.md): das Muster, das eine per DI verwaltete Einzelinstanz oft ersetzt
