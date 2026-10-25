---
title: "Vererbung"
description: "Vererbung in der objektorientierten Programmierung: Oberklasse und Unterklasse, Generalisierung und Spezialisierung, ist-ein gegenüber hat-ein, Komposition vor Vererbung, Mehrfachvererbung und das Diamond-Problem."
keywords:
    - Vererbung
    - Oberklasse
    - Unterklasse
    - Generalisierung
    - Spezialisierung
    - Komposition vor Vererbung
    - Mehrfachvererbung
    - Diamond-Problem
sidebar_position: 3
tags:
    - ap2
---

# Vererbung

Vererbung leitet eine neue Klasse (Unterklasse, Kindklasse, abgeleitete Klasse) von einer bestehenden ab (Oberklasse, Elternklasse, Basisklasse). Die Unterklasse übernimmt alle Attribute und Methoden der Oberklasse, kann neue ergänzen und geerbte Methoden [überschreiben](./polymorphism.md#überschreiben-vs-überladen).

Die Beziehung hat zwei Leserichtungen:

- **Generalisierung:** Gemeinsame Merkmale mehrerer Klassen werden in eine Oberklasse verschoben, z.B. `Car` und `Truck` => `Vehicle`.
- **Spezialisierung:** Eine Oberklasse wird in speziellere Unterklassen verfeinert, z.B. `Vehicle` => `Car`, `Truck`.

Vererbung passt nur zu einer **ist-ein**-Beziehung: Ein Auto ist ein Fahrzeug. Eine **hat-ein**-Beziehung ist kein Grund für Vererbung und wird mit Komposition abgebildet: Ein Auto hat einen Motor, ist aber keiner, deshalb erbt `Car` nicht von `Engine`.

Die Regel „Komposition vor Vererbung“ bevorzugt Komposition auch dort, wo Vererbung möglich wäre. Komposition lässt sich zur Laufzeit ändern und legt das Innere der wiederverwendeten Klasse nicht offen, während Vererbung die Unterklasse dauerhaft an die Implementierung der Oberklasse bindet.

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

## Mehrfachvererbung und das Diamond-Problem

Bei Mehrfachvererbung hat eine Klasse mehr als eine direkte Oberklasse. Daraus entsteht das Diamond-Problem:

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

Wird `greet()` an einem `D`-Objekt aufgerufen, ist unklar, welche Implementierung gilt. Sprachen lösen diese Mehrdeutigkeit unterschiedlich:

- **C++:** Erlaubt Mehrfachvererbung. Mehrdeutige Aufrufe müssen explizit qualifiziert werden (`B::greet()`). Virtuelle Vererbung verhindert, dass `A` doppelt enthalten ist.
- **Python:** Erlaubt Mehrfachvererbung und löst Aufrufe über eine feste Method Resolution Order (MRO) auf.
- **Java, C#, TypeScript:** Erlauben nur eine Oberklasse, aber beliebig viele [Interfaces](./abstraction.md). Interfaces haben keinen Zustand, dadurch entfällt das Problem weitgehend. Stellen zwei Java-Interfaces widersprüchliche `default`-Methoden bereit, muss die Klasse die Methode überschreiben, sonst schlägt die Kompilierung fehl.

## Vererbung und Überschreiben verhindern

Keine Klasse kann von einer finalen Klasse erben, und keine Unterklasse kann eine finale Methode überschreiben. Das schützt Verhalten, das eine Unterklasse sonst brechen könnte, z.B. die Unveränderlichkeit eines Wertetyps oder den festen Ablauf einer [Template Method](./design-patterns/template-method.md).

## Häufige Fehler

1. **Vererbung nur zur Wiederverwendung von Code:** Ohne ist-ein-Beziehung erbt die Unterklasse Methoden, die für sie keinen Sinn ergeben. Eine Stack-Klasse, die von einer allgemeinen Listenklasse erbt, bietet auch das Einfügen an beliebigen Positionen an, sodass sich die Last-in-first-out-Reihenfolge umgehen lässt. Komposition vermeidet das.

## Siehe auch

- [Polymorphie](./polymorphism.md): Überschreiben geerbter Methoden und dynamische Bindung
- [Abstraktion](./abstraction.md): abstrakte Klassen und Interfaces als Oberklasse und Vertrag
- [Klassendiagramm](../uml/class-diagram.md): die UML-Notation für Klassen, Sichtbarkeiten, Vererbung und Assoziationen
