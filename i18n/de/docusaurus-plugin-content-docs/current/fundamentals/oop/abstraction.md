---
title: "Abstraktion"
description: "Abstraktion in der objektorientierten Programmierung: abstrakte Klassen und Interfaces im Vergleich nach Zustand, implementierten Methoden, Konstruktor, Anzahl, Schlüsselwort, Beziehung und UML-Notation."
keywords:
    - Abstraktion
    - Abstrakte Klasse
    - Interface
    - Abstrakte Methode
    - extends
    - implements
sidebar_position: 5
tags:
    - ap2
---

# Abstraktion

Abstraktion reduziert eine Sache auf die Merkmale, die für die jeweilige Aufgabe relevant sind, und blendet die Details aus. Wer [`shape.area()`](./polymorphism.md#dynamische-bindung) aufruft, muss wissen, dass jede Form eine Fläche hat, nicht wie sie berechnet wird.

Zwei Sprachkonstrukte unterstützen Abstraktion:

- **Abstrakte Klasse:** Eine mit `abstract` markierte Klasse, die nicht instanziiert werden kann. Sie kann abstrakte Methoden ohne Rumpf enthalten, die jede konkrete Unterklasse implementieren muss, außerdem Attribute und implementierte Methoden.
- **Interface:** Ein reiner Vertrag aus Methodensignaturen. Eine Klasse, die ein Interface implementiert, sichert zu, alle seine Methoden bereitzustellen.

| Kriterium               | Abstrakte Klasse                | Interface                                                               |
| ----------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| Instanziierbar          | Nein                            | Nein                                                                    |
| Attribute (Zustand)     | Ja                              | Nein, nur Konstanten (Java)                                             |
| Implementierte Methoden | Ja                              | Nur `default`- und `static`-Methoden (ab Java 8)                        |
| Konstruktor             | Ja                              | Nein                                                                    |
| Wie viele pro Klasse    | Eine (Einfachvererbung)         | Beliebig viele                                                          |
| Schlüsselwort           | `extends`                       | `implements`                                                            |
| Beziehung               | ist-ein, eng verwandte Klassen  | kann-etwas, Fähigkeit nicht verwandter Klassen                          |
| UML                     | Name kursiv oder `<<abstract>>` | `<<interface>>`, Realisierung als gestrichelte Linie mit hohlem Dreieck |

Eine abstrakte Klasse passt, wenn mehrere verwandte Klassen Code und Zustand teilen, z.B. `Shape` mit gemeinsamem `toString()`. Ein Interface passt, wenn nicht verwandte Klassen eine Fähigkeit teilen, z.B. `Comparable` für alles Sortierbare, von `Invoice` bis `Employee`.

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

## Siehe auch

- [Polymorphie](./polymorphism.md): Aufruf der Implementierung hinter einem abstrakten Typ zur Laufzeit
- [SOLID](./solid.md): Entwurfsprinzipien, von denen mehrere auf Abstraktionen aufbauen
- [Klassendiagramm](../uml/class-diagram.md): die UML-Notation für Klassen, Sichtbarkeiten, Vererbung und Assoziationen
- [Namenskonventionen](../../typescript/naming-conventions.md): Benennung von Klassen, Interfaces und Elementen in TypeScript
