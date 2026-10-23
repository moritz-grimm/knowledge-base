---
title: "Polymorphie"
description: "Polymorphie in der objektorientierten Programmierung: dynamische Bindung, Überschreiben gegenüber Überladen sowie die Formen Subtyp-, Ad-hoc- und parametrische Polymorphie."
keywords:
    - Polymorphie
    - Dynamische Bindung
    - Late Binding
    - Späte Bindung
    - Überschreiben
    - Überladen
    - Subtyp-Polymorphie
    - Ad-hoc-Polymorphie
    - Parametrische Polymorphie
    - Generics
sidebar_position: 4
tags:
    - ap2
---

# Polymorphie

Polymorphie (griechisch für „Vielgestaltigkeit“) bedeutet, dass derselbe Aufruf je nach empfangendem Objekt unterschiedliches Verhalten auslöst. Ein Aufruf von `area()` auf einer Variablen vom Typ `Shape` führt die Implementierung von `Circle` oder `Rectangle` aus, je nachdem, auf welches Objekt die Variable verweist.

## Dynamische Bindung

Der Compiler kennt nur den deklarierten Typ einer Variablen, sodass er nicht festlegen kann, welche überschriebene Methode ausgeführt wird. Die Methode wird zur Laufzeit anhand der tatsächlichen Klasse des Objekts ausgewählt, was dynamische Bindung oder Late Binding heißt. Bei statischer Bindung oder Early Binding legt der Compiler die Methode anhand der deklarierten Typen fest, wie beim [Überladen](#überschreiben-vs-überladen).

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

Die Schleife kennt nur den Typ `Shape`, sodass sich eine neue Klasse `Triangle` ergänzen lässt, ohne die Schleife zu ändern.

## Überschreiben vs. Überladen

|                | Überschreiben (Overriding)             | Überladen (Overloading)                        |
| -------------- | -------------------------------------- | ---------------------------------------------- |
| Wo             | In einer Unterklasse                   | In derselben Klasse oder einer Unterklasse     |
| Methodenname   | Gleich                                 | Gleich                                         |
| Parameterliste | Gleich                                 | Verschieden (Anzahl, Typen oder Reihenfolge)   |
| Entschieden    | Zur Laufzeit (dynamische Bindung)      | Zur Kompilierzeit (statische Bindung)          |
| Zweck          | Unterklasse ändert geerbtes Verhalten  | Dieselbe Operation für verschiedene Eingaben   |
| Beispiel       | `Circle.area()` ersetzt `Shape.area()` | `print(text: String)` und `print(number: int)` |

In Java, C# und C++ sind zwei Methoden, die sich nur im Rückgabetyp unterscheiden, keine gültigen Überladungen und führen zu einem Compilerfehler.

## Formen der Polymorphie

- **Subtyp-Polymorphie:** Überschreiben plus dynamische Bindung wie im Beispiel oben. „Polymorphie“ ohne Zusatz meint meist diese Form.
- **Ad-hoc-Polymorphie:** Überladen. Der Compiler wählt die Methode anhand der Argumenttypen.
- **Parametrische Polymorphie:** Generics. `List<T>` funktioniert mit demselben Code für jeden Typ `T`.

## Häufige Fehler

1. **Überschreiben und Überladen verwechseln:** Überschreiben ersetzt eine geerbte Methode mit gleicher Signatur und wird zur Laufzeit aufgelöst. Überladen ergänzt eine Methode mit gleichem Namen, aber anderer Parameterliste, und wird zur Kompilierzeit aufgelöst.
2. **Geänderte Parameterliste beim Überschreiben:** In Java überschreibt eine Unterklassenmethode `equals(Customer other)` nicht `equals(Object other)`, sondern überlädt sie. Collections wie `List.contains()` rufen `equals(Object)` auf, sodass die geerbte Version läuft und nur Referenzen vergleicht.

## Siehe auch

- [Vererbung](./inheritance.md): die Beziehung zwischen Ober- und Unterklasse, auf der das Überschreiben aufbaut
- [Abstraktion](./abstraction.md): abstrakte Klassen wie `Shape` und Interfaces
- [Strategy](./design-patterns/strategy.md): ein Entwurfsmuster, das Verhalten über Polymorphie austauscht
