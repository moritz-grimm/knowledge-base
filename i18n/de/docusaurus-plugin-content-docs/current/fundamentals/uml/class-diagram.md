---
title: "Klassendiagramm"
description: "Ausführliche Erklärung von UML-Klassendiagrammen. Enthält Aufbau, Sichtbarkeiten, Beziehungen, Kardinalitäten, bewährte Vorgehensweisen sowie ein durchgehendes Beispiel anhand eines Bibliothekssystems."
keywords:
    - UML
    - Klassendiagramm
last_update:
    author: moritz-grimm
tags:
    - ap2
---

# Klassendiagramm

## Definition

Ein Klassendiagramm ist ein Strukturdiagramm der UML, das den statischen Aufbau eines Systems darstellt, indem es Klassen, deren Attribute und Methoden sowie die Beziehungen zwischen ihnen zeigt. Es gehört zu den am häufigsten eingesetzten Diagrammen in der objektorientierten Programmierung und im Softwaredesign.

## Zweck

Klassendiagramme dienen dazu:

- den Aufbau eines Systems zu modellieren
- Beziehungen zwischen Klassen sichtbar zu machen
- die Softwarearchitektur vor der Implementierung zu planen
- die Struktur von bestehendem Code zu dokumentieren
- Entwurfsentscheidungen im Team zu kommunizieren

## Bestandteile

### Klassen

Eine Klasse wird als Rechteck dargestellt, das in drei Abschnitte unterteilt ist:

```text
┌─────────────────┐
│   ClassName     │  ← Klassenname (PascalCase)
├─────────────────┤
│   - attribute   │  ← Attribute (camelCase)
│   # attribute   │
├─────────────────┤
│   + method()    │  ← Methoden (camelCase)
└─────────────────┘
```

### Attribute

Attribute stellen die Daten bzw. Eigenschaften einer Klasse dar.

**Syntax:** `visibility name: dataType`

Beispiel: `- email: String`

### Methoden

Methoden stellen das Verhalten bzw. die Funktionen einer Klasse dar.

**Syntax:** `visibility methodName(parameter: type): returnType`

Beispiel: `+ getName(): String`

### Sichtbarkeiten

| Symbol | Sichtbarkeit | Bedeutung                                    | Wann zu verwenden      |
| ------ | ------------ | -------------------------------------------- | ---------------------- |
| `-`    | Private      | Nur innerhalb der Klasse zugreifbar          | Standard für Attribute |
| `#`    | Protected    | In der Klasse und in Unterklassen zugreifbar | Für vererbte Attribute |
| `+`    | Public       | Von überall zugreifbar                       | Standard für Methoden  |
| `~`    | Package      | Innerhalb desselben Pakets zugreifbar        | Wird selten verwendet  |

## Beziehungen

### Assoziation

Eine allgemeine Beziehung zwischen zwei Klassen. Sie drückt aus, dass Objekte der einen Klasse mit Objekten der anderen Klasse in Verbindung stehen.

**Notation:** Durchgezogene Linie zwischen zwei Klassen

**Beispiel:** Ein `Customer` steht in Beziehung zu einer `Order`

```text
Customer ────── Order
```

### Aggregation (schwache Zugehörigkeit)

Ein Sonderfall der Assoziation, bei dem eine Klasse als Behälter für eine andere dient, die enthaltene Klasse aber unabhängig davon existieren kann.

**Notation:** Nicht ausgefüllte Raute auf der Seite des Behälters

**Beispiel:** Eine `Library` enthält `Books`, Bücher können aber auch ohne die Bibliothek existieren

```text
Library ◇────── Book
```

**Merksatz:** Wird der Behälter zerstört, bleiben die enthaltenen Objekte bestehen.

### Komposition (starke Zugehörigkeit)

Eine strengere Form der Aggregation, bei der die enthaltene Klasse ohne den Behälter nicht existieren kann.

**Notation:** Ausgefüllte Raute auf der Seite des Behälters

**Beispiel:** Ein `Book` besitzt `Chapters`, Kapitel können ohne das Buch nicht existieren

```text
Book ◆────── Chapter
```

**Merksatz:** Wird der Behälter zerstört, werden die enthaltenen Objekte ebenfalls zerstört.

### Vererbung

Beschreibt eine Beziehung, bei der eine Klasse (Unterklasse, Kindklasse) Attribute und Methoden einer anderen Klasse (Oberklasse, Elternklasse) erbt.

**Notation:** Nicht ausgefüllter Pfeil, der auf die Oberklasse zeigt

**Beispiel:** `Dog` und `Cat` erben von `Animal`

```text
      Animal
         △
         │
    ┌────┴────┐
    │         │
   Dog       Cat
```

**Wichtig:** Vererbte Attribute der Oberklasse sollten die Sichtbarkeit `protected` (`#`) erhalten, damit Unterklassen darauf zugreifen können.

## Kardinalität (Multiplizität)

Die Kardinalität legt fest, wie viele Instanzen einer Klasse mit Instanzen einer anderen Klasse in Beziehung stehen können.

| Notation        | Bedeutung          | Beispiel                                             |
| --------------- | ------------------ | ---------------------------------------------------- |
| `1`             | Genau eins         | Eine Person hat genau ein Geburtsdatum               |
| `0..1`          | Null oder eins     | Eine Person hat keinen oder einen Führerschein       |
| `*` bzw. `0..*` | Null oder mehr     | Eine Bibliothek kann null oder mehr Bücher enthalten |
| `1..*`          | Eins oder mehr     | Ein Buch hat eine oder mehrere Seiten                |
| `n..m`          | Bestimmter Bereich | Ein Kurs hat 5..30 Teilnehmer                        |

**Platzierung:** Die Kardinalität steht nahe an der Klasse, die sie beschreibt.

```text
Library 1 ────── 0..* Book
```

Gelesen: Eine Bibliothek kann null oder mehr Bücher enthalten.

## Namenskonventionen

### Allgemeine Regeln

1. **Klassennamen:** beginnen mit einem Großbuchstaben (PascalCase)
   - ✅ `Customer`, `ShoppingCart`
   - ❌ `customer`, `shopping_cart`

2. **Attribute und Methoden:** beginnen mit einem Kleinbuchstaben (camelCase)
   - ✅ `firstName`, `calculateTotal()`
   - ❌ `FirstName`, `CalculateTotal()`

3. **Keine Umlaute und keine Sonderzeichen**
   - ✅ `doppelgaenger`
   - ❌ `doppelgänger`

4. **Boolesche Attribute:** mit `is`, `has` oder `can` beginnen
   - ✅ `isActive`, `hasPermission`

5. **Methodennamen:** Verben verwenden
   - ✅ `calculateTotal()`, `saveData()`
   - ❌ `total()`, `data()`

## Bewährte Vorgehensweisen

### Sichtbarkeit von Attributen

- **Standard:** `private` (`-`) für alle Attribute
- **Ausnahme:** `protected` (`#`) für Attribute, die an Unterklassen vererbt werden
- **Zu vermeiden:** Attribute `public` zu setzen, sofern es nicht zwingend erforderlich ist

### Sichtbarkeit von Methoden

- **Standard:** `public` (`+`) für Methoden, die die Schnittstelle der Klasse bilden
- **`private` verwenden:** für Hilfsmethoden, die nur innerhalb der Klasse gebraucht werden

### Abstrakte Klassen

Abstrakte Klassen werden gekennzeichnet durch:

- den Klassennamen in *Kursivschrift*
- oder den Zusatz `<<abstract>>` über dem Klassennamen

```text
┌────────────────────────┐
│   <<abstract>>         │
│      Vehicle           │
├────────────────────────┤
│ # licensePlate: String │
├────────────────────────┤
│ + startEngine(): void  │
└────────────────────────┘
```

### Schnittstellen

Schnittstellen werden durch den Zusatz `<<interface>>` über dem Namen gekennzeichnet.

## Durchgehendes Beispiel: Bibliothekssystem

Dieses Beispiel zeigt alle wichtigen Konzepte eines Klassendiagramms.

### Szenario

Eine einfache Bibliotheksverwaltung mit Büchern, Zeitschriften, Benutzern und einer Ausleihfunktion.

### Überblick über die Klassen

- Medium (abstrakte Oberklasse)
  - abstrakte Klasse für jedes ausleihbare Objekt
  - die Attribute sind `protected`, weil sie vererbt werden

- Book (erbt von Medium)
  - eine konkrete Art von Medium
  - steht in einer Kompositionsbeziehung zu Kapiteln

- Magazine (erbt von Medium)
  - eine weitere konkrete Art von Medium

- Chapter
  - Bestandteil eines Buches (Komposition)
  - kann ohne Buch nicht existieren

- Library
  - enthält Medien (Aggregation)
  - Medien können ohne die Bibliothek existieren

- Media
  - ist Bestandteil der Bibliothek (Aggregation)
  - kann ohne die Bibliothek existieren

- User
  - kann Medien ausleihen (Assoziation)

### Die Klassen im Einzelnen

#### Medium (abstrakt)

```text
┌────────────────────────────┐
│     <<abstract>>           │
│        Medium              │
├────────────────────────────┤
│ # titel: String            │
│ # isbn: String             │
├────────────────────────────┤
│ + borrowMedium(): boolean  │
│ + returnMedium(): void     │
└────────────────────────────┘
```

#### Book

```text
┌─────────────────────────┐
│         Book            │
├─────────────────────────┤
│ - author: String        │
│ - numberOfPages: int    │
├─────────────────────────┤
│ + getAuthor(): String   │
└─────────────────────────┘
```

#### Magazine

```text
┌────────────────────────┐
│       Magazine         │
├────────────────────────┤
│ - edition: int         │
│ - releaseDate: Date    │
├────────────────────────┤
│ + getEdition(): int    │
└────────────────────────┘
```

#### Chapter

```text
┌─────────────────────────┐
│       Chapter           │
├─────────────────────────┤
│ - chapterNumber: int    │
│ - headline: String      │
├─────────────────────────┤
└─────────────────────────┘
```

#### Library

```text
┌──────────────────────────────────────────┐
│            Library                       │
├──────────────────────────────────────────┤
│ - name: String                           │
│ - adress: String                         │
├──────────────────────────────────────────┤
│ + addMedium(medium: Medium): void        │
│ + removeMedium(medium: Medium): boolean  │
└──────────────────────────────────────────┘
```

#### Benutzer

```text
┌─────────────────────────────────────────┐
│           User                          │
├─────────────────────────────────────────┤
│ - userId: int                           │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Beziehungen

1. **Vererbung:**
   - `Book` erbt von `Medium`
   - `Magazine` erbt von `Medium`

2. **Komposition:** `Book ◆────── 1..* Chapter`
   - ein Buch muss mindestens ein Kapitel besitzen
   - Kapitel können ohne ihr Buch nicht existieren

3. **Aggregation:** `Library ◇────── 0..* Medium`
   - eine Bibliothek kann null oder mehr Medien enthalten
   - Medien können unabhängig von der Bibliothek existieren

4. **Assoziation:** `User ────── * Medium` (beschriftet mit "borrows")
   - Benutzer können mehrere Medien ausleihen
   - ein Medium kann im Lauf der Zeit von mehreren Benutzern ausgeliehen werden

### Grafische Darstellung

```text
                    ┌────────────────────────────┐
                    │     <<abstract>>           │
                    │        Medium              │
                    ├────────────────────────────┤
                    │ # titel: String            │
                    │ # isbn: String             │
                    ├────────────────────────────┤
                    │ + borrowMedium(): boolean  │
                    │ + returnMedium(): void     │
                    └───────────┬────────────────┘
                                △
                                │ (Vererbung)
                    ┌───────────┴───────────┐
                    │                       │
        ┌───────────┴──────────┐   ┌────────┴──────────────┐
        │       Book           │   │    Magazine           │
        ├──────────────────────┤   ├───────────────────────┤
        │ - author: String     │   │ - edition: int        │
        │ - numberOfPages: int │   │ - releaseDate: Date   │
        ├──────────────────────┤   ├───────────────────────┤
        │ + getAuthor()        │   │ + getEdition()        │
        └─────────┬────────────┘   └───────────────────────┘
                  │
                  │ ◆ (Komposition)
                  │ 1..*
        ┌─────────┴────────────┐
        │      Chapter         │
        ├──────────────────────┤
        │ - chapterNumber: int │
        │ - headline: String   │
        └──────────────────────┘


┌────────────────────────┐                *  ┌────────────────┐
│        Library         │ ◇──────────────   │    Medium     │
├────────────────────────┤  (Aggregation)    └────────────────┘
│ - name: String         │
│ - adress: String       │
├────────────────────────┤
│ + mediumHinzufuegen()  │
│ + mediumEntfernen()    │
└────────────────────────┘


┌─────────────────────────────────────────┐ 1         borrows         *  ┌─────────────────┐
│     User                                │ ───────────────────────────  │     Medium      │
├─────────────────────────────────────────┤        (Assoziation)         └─────────────────┘
│ - benutzerId: int                       │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Die wichtigsten Erkenntnisse aus diesem Beispiel

1. **Protected-Attribute in Medium:** `titel` und `isbn` sind `protected` (`#`), damit `Book` und `Magazine` sie erben können
2. **Komposition gegenüber Aggregation:** Kapitel gehören fest zu einem Buch (Komposition), während Medien auch ohne Bibliothek existieren können (Aggregation)
3. **Vererbung:** sowohl `Book` als auch `Magazine` erben gemeinsames Verhalten von `Medium`
4. **Kardinalität:** ein Buch muss mindestens ein Kapitel besitzen (`1..*`), eine Bibliothek darf dagegen auch null Medien enthalten (`0..*`)

## Häufige Fehler

1. **Öffentliche Attribute:** fast immer sollte `private` oder `protected` verwendet werden
2. **Fehlende Kardinalität:** es sollte immer angegeben werden, wie viele Instanzen in Beziehung stehen können
3. **Falscher Beziehungstyp:** der Unterschied zwischen Aggregation und Komposition muss klar sein
4. **Uneinheitliche Benennung:** camelCase für Attribute und Methoden, PascalCase für Klassen

## Werkzeuge zum Erstellen von Klassendiagrammen

- draw.io / diagrams.net (kostenlos, browserbasiert)
- Lucidchart (eingeschränkte kostenlose Version)
- PlantUML (textbasiert, Einrichtung erforderlich)
- Visual Paradigm
- StarUML

## Siehe auch

- [Objektdiagramm](./further-uml-diagrams.md#objektdiagramm): eine konkrete Momentaufnahme von Instanzen zu einem Zeitpunkt
- [Sequenzdiagramm](./sequence-diagram.md): das Zusammenspiel von Objekten dieser Klassen im zeitlichen Verlauf
- [Anwendungsfalldiagramm](./use-case-diagram.md): das Verhaltensgegenstück, das zeigt, welche Leistungen diese Klassen den Akteuren anbieten
- [ER-Modell](../databases/er-model.md): das relationale Gegenstück, das beschreibt, wie die Attribute dieser Klassen in Tabellen gespeichert werden
