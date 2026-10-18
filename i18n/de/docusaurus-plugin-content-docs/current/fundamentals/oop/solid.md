---
title: "SOLID"
description: "Die fünf SOLID-Entwurfsprinzipien nach Robert C. Martin: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation und Dependency Inversion."
keywords:
    - SOLID
    - Single Responsibility Principle
    - Open/Closed Principle
    - Liskov Substitution Principle
    - Interface Segregation Principle
    - Dependency Inversion Principle
    - Robert C. Martin
sidebar_position: 6
tags:
    - ap2
---

# SOLID

SOLID ist ein Akronym für fünf Entwurfsprinzipien, die Robert C. Martin zusammengestellt hat.

| Buchstabe | Prinzip                         | Aussage                                                                                                                              |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| S         | Single Responsibility Principle | Eine Klasse hat genau eine Verantwortung und damit nur einen Grund, sich zu ändern.                                                  |
| O         | Open/Closed Principle           | Eine Klasse ist offen für Erweiterung, aber geschlossen für Änderung: Neues Verhalten kommt hinzu, ohne bestehenden Code zu ändern.  |
| L         | Liskov Substitution Principle   | Ein Objekt einer Unterklasse kann ein Objekt seiner Oberklasse ersetzen, ohne dass das Programm fehlerhaft wird.                     |
| I         | Interface Segregation Principle | Mehrere kleine, spezifische Interfaces sind besser als ein großes; keine Klasse muss Methoden implementieren, die sie nicht braucht. |
| D         | Dependency Inversion Principle  | Module höherer Ebene hängen nicht von Modulen niedrigerer Ebene ab; beide hängen von Abstraktionen ab.                               |

Der klassische Verstoß gegen das Liskov-Prinzip ist `Square extends Rectangle`. Mathematisch ist ein Quadrat ein Rechteck, aber ein `Square` hält beide Seiten gleich. Code, der z.B. bei einem `Rectangle` Breite 4 und Höhe 5 setzt und Fläche 20 erwartet, erhält von einem `Square` 25.

## Häufige Fehler

1. **Single Responsibility als eine Methode verstanden:** Das Prinzip beschränkt eine Klasse nicht auf eine Methode, sondern auf einen Grund zur Änderung, d.h. auf eine Gruppe von Anforderungen, die ihre Änderungen auslöst. Wird eine Klasse in Fragmente mit je einer Methode zerlegt, verteilt sich Logik, die sich immer gemeinsam ändert, auf mehrere Dateien.
2. **Typ-Switch, der mit jeder neuen Variante wächst:** Eine Methode wie `calculateShipping()`, die nach einem Typcode verzweigt, muss für jede neue Versandart bearbeitet werden. Eine eigene Klasse pro Variante hinter einem gemeinsamen Interface ergänzt neues Verhalten, ohne bestehenden Code anzufassen.
3. **Unterklasse, die geerbte Methoden verweigert:** Eine `ReadOnlyList extends ArrayList`, die in `add()` eine Exception wirft, bricht jeden Aufrufer, der sich auf den Vertrag der Oberklasse verlässt. Das verstößt gegen das Liskov Substitution Principle, obwohl die Unterklasse kompiliert und ihre übrigen Methoden funktionieren.
4. **Interface mit zu vielen Methoden:** Implementierende Klassen müssen Methoden bereitstellen, die sie nicht brauchen, oft mit leerem Rumpf oder mit `throw new Error("not supported")`. Das verstößt gegen das Interface Segregation Principle.
5. **Dependency Inversion mit Dependency Injection gleichgesetzt:** [Dependency Injection](./dependency-injection.md) ist eine Technik, die Abhängigkeiten von außen übergibt. Dependency Inversion betrifft die Richtung der Abhängigkeiten: Das Modul höherer Ebene definiert die Abstraktion, und das Modul niedrigerer Ebene implementiert sie. Eine injizierte konkrete Klasse erfüllt das Erste, aber nicht das Zweite.
6. **Interface für jede Klasse:** Ein Interface mit genau einer Implementierung und ohne Aussicht auf eine zweite fügt eine Indirektionsebene hinzu, ohne etwas zu entkoppeln. Die Prinzipien verlangen nicht für jede Klasse ein Interface, sondern zielen auf Code, der sich voraussichtlich ändert.

## Siehe auch

- [Dependency Injection](./dependency-injection.md): die gängigste Technik, um das Dependency Inversion Principle umzusetzen
- [Abstraktion](./abstraction.md): abstrakte Klassen und Interfaces als die Abstraktionen, auf die sich die Prinzipien stützen
- [Entwurfsmuster](./design-patterns/index.mdx): bewährte Lösungen, die auf diesen Prinzipien aufbauen
