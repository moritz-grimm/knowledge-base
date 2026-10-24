---
title: "Klasse und Objekt"
description: "Grundbegriffe der objektorientierten Programmierung: Klasse, Objekt, Instanz, Attribut, Methode, Nachricht, Konstruktor, Destruktor, statische Elemente und Persistenz sowie Identität, Zustand und Verhalten eines Objekts."
keywords:
    - Klasse
    - Objekt
    - Instanz
    - Instanziierung
    - Attribut
    - Methode
    - Konstruktor
    - Destruktor
    - Statisches Element
    - Identität
    - Zustand
    - Verhalten
sidebar_position: 1
tags:
    - ap2
---

# Klasse und Objekt

Eine Klasse legt die Attribute und Methoden einer Art von Dingen fest, und ein Objekt ist ein konkretes Exemplar davon mit eigenen Attributwerten. Eine Klasse `Customer` beschreibt, was jeder Kunde hat (Name, ID) und kann (umbenennen), während jedes Kundenobjekt seine eigenen Werte hält.

| Begriff            | Bedeutung                                                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Klasse             | Bauplan, der Attribute und Methoden einer Art von Objekt festlegt                                                                                                                             |
| Objekt             | Konkretes, zur Laufzeit aus einer Klasse erzeugtes Exemplar mit eigenen Attributwerten                                                                                                        |
| Instanz            | Synonym für Objekt, betont die Beziehung zur Klasse („eine Instanz von `Customer`“)                                                                                                           |
| Instanziierung     | Erzeugen eines Objekts aus einer Klasse                                                                                                                                                       |
| Attribut           | Variable eines Objekts, auch Feld oder Eigenschaft genannt. Alle Attribute zusammen bilden den Zustand.                                                                                       |
| Methode            | Funktion einer Klasse, die das Verhalten ihrer Objekte beschreibt                                                                                                                             |
| Nachricht          | Aufruf einer Methode an einem Objekt. Der Aufrufer sendet eine Nachricht, und das Objekt entscheidet, wie es reagiert.                                                                        |
| Konstruktor        | Spezielle Methode, die bei der Instanziierung läuft und die Attribute initialisiert                                                                                                           |
| Destruktor         | Spezielle Methode, die beim Zerstören eines Objekts läuft und dessen Ressourcen freigibt. Nicht jede Sprache kennt sie, da Sprachen mit Garbage Collector den Speicher automatisch freigeben. |
| Statisches Element | Attribut oder Methode, die zur Klasse selbst gehört und von allen Instanzen geteilt wird                                                                                                      |
| Persistenz         | Speichern des Objektzustands über die Laufzeit des Programms hinaus, z.B. in einer Datenbank oder Datei                                                                                       |

Jedes Objekt hat drei Eigenschaften:

- **Identität:** Zwei Objekte mit identischen Attributwerten sind trotzdem zwei verschiedene Objekte. Der Vergleich der Referenzen prüft die Identität, eine Methode wie `equals()` den Inhalt.
- **Zustand:** Die aktuellen Werte aller Attribute. Der Zustand kann sich während der Lebensdauer des Objekts ändern.
- **Verhalten:** Die Methoden, die am Objekt aufgerufen werden können. Sie lesen oder ändern den Zustand.

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
const bob = new Customer("Bob");
alice.rename("Alice Smith");           // message to alice, bob is unaffected
```

## Häufige Fehler

1. **Klasse und Objekt verwechseln:** Eine Klasse existiert einmal im Quellcode und beschreibt Struktur und Verhalten. Objekte werden zur Laufzeit beliebig oft daraus erzeugt, jedes mit eigenem Zustand.

## Siehe auch

- [Kapselung](./encapsulation.md): Sichtbarkeiten, die den Zustand eines Objekts schützen
- [Klassendiagramm](../uml/class-diagram.md): die UML-Notation für Klassen, Sichtbarkeiten, Vererbung und Assoziationen
- [Namenskonventionen](../../typescript/naming-conventions.md): Benennung von Klassen, Interfaces und Elementen in TypeScript
