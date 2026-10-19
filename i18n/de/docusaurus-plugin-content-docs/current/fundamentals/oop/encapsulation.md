---
title: "Kapselung"
description: "Kapselung und Geheimnisprinzip in der objektorientierten Programmierung: die Sichtbarkeiten public, protected, package und private in UML, Java, TypeScript und C# sowie der Zweck von Gettern und Settern."
keywords:
    - Kapselung
    - Geheimnisprinzip
    - Information Hiding
    - Sichtbarkeit
    - Zugriffsmodifizierer
    - public
    - protected
    - private
    - Getter
    - Setter
sidebar_position: 2
tags:
    - ap2
---

# Kapselung

Kapselung verbirgt den inneren Zustand eines Objekts und erlaubt den Zugriff nur über definierte Methoden (Geheimnisprinzip, Information Hiding). Das Objekt garantiert seine Konsistenz selbst: Ein Bankkonto lehnt eine negative Einzahlung ab, statt sich darauf zu verlassen, dass jeder Aufrufer sie prüft.

## Sichtbarkeiten

| Modifizierer | UML | Zugreifbar aus                           |
| ------------ | --- | ---------------------------------------- |
| public       | `+` | Überall                                  |
| protected    | `#` | Der Klasse selbst und ihren Unterklassen |
| package      | `~` | Allen Klassen im selben Paket            |
| private      | `-` | Nur der Klasse selbst                    |

- **Java:** Ohne Modifizierer hat ein Element Paketsichtbarkeit. `protected` schließt zusätzlich das Paket ein.
- **TypeScript:** Ohne Modifizierer ist ein Element `public`. Paketsichtbarkeit gibt es nicht. `private` prüft nur der Compiler, während `#name` (ein privates ECMAScript-Feld) auch zur Laufzeit privat ist.
- **C#:** `internal` beschränkt den Zugriff auf dieselbe Assembly und kommt der Paketsichtbarkeit am nächsten.

## Getter und Setter

Getter und Setter sind Methoden, die ein privates Attribut lesen oder ändern. Ihr Zweck ist die Kontrolle über den Zugriff:

- Ein Setter kann den neuen Wert prüfen, bevor er ihn übernimmt.
- Ein Getter kann einen berechneten Wert oder eine Kopie statt der internen Referenz zurückgeben.
- Ohne Setter ist ein Attribut von außen nur lesbar.
- Die interne Darstellung kann sich später ändern, ohne dass Aufrufer angepasst werden müssen.

```typescript
class BankAccount {
    private balance = 0;

    getBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Amount must be positive");
        }
        this.balance += amount;
    }
}
```

`deposit()` übernimmt die Rolle des Setters und setzt die Regel durch, erlaubt aber anders als ein `setBalance()` nur die fachlich vorgesehene Änderung, sodass der Kontostand nicht mit einem beliebigen Wert überschrieben werden kann.

## Häufige Fehler

1. **Getter und Setter für jedes Attribut:** Ein Setter ohne Prüfung lässt jeden Aufrufer jeden Wert setzen. Das Objekt kann seine Konsistenz nicht mehr garantieren, und das Attribut ist faktisch öffentlich.

## Siehe auch

- [Klasse und Objekt](./class-and-object.md): Attribute, Zustand und Verhalten eines Objekts
- [Klassendiagramm](../uml/class-diagram.md): die UML-Notation für Klassen, Sichtbarkeiten, Vererbung und Assoziationen
