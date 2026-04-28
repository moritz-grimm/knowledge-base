---
title: "Normalisierung"
description: "Ein Überblick über die drei Normalformen von Datenbanken (1NF, 2NF, 3NF) mit Beispielen."
keywords:
    - "Normalisierung"
    - "Datenbank"
    - "Datenbanken"
    - "1NF"
    - "2NF"
    - "3NF"
    - "Normalformen"
    - "Relationale Datenbanken"
---

# Normalisierung

Normalisierung ist der Prozess der Strukturierung einer relationalen Datenbank, um Datenredundanz zu reduzieren und Datenintegrität zu verbessern. Jede Normalform baut auf der vorherigen auf.

## Erste Normalform (1NF)

**Regel**: Jede Spalte muss atomare (unteilbare) Werte enthalten, und jede Zeile muss eindeutig sein.

**Verstoß**: Eine Spalte `Phone`, welche mehrere Nummern in einer Zelle speichert.

| KundenID | Name  | Telefon-Nr       |
| -------- | ----- | ---------------- |
| 1        | Alice | 111-111, 222-222 |

**Lösung**:

| KundenID | Name  | Telefon-Nr |
| -------- | ----- | ---------- |
| 1        | Alice | 111-111    |
| 1        | Alice | 222-222    |

**Verstoß**: Mehrere Spalten für dasselbe Attribut.

| KundenID | Name  | Telefon-Nr-1 | Telefon-Nr-2 |
| -------- | ----- | ------------ | ------------ |
| 1        | Alice | 111-111      | 222-222      |

**Lösung**:

| KundenID | Name  | Telefon-Nr |
| -------- | ----- | ---------- |
| 1        | Alice | 111-111    |
| 1        | Alice | 222-222    |

## Zweite Normalform (2NF)

**Regel**: Muss sich bereits in der 1NF befinden und jedes Nicht-Schlüsselattribut muss vom **gesamten** Primärschlüssel abhängen, nicht nur von einem Teil davon. Dies gilt nur, wenn der Primärschlüssel zusammengesetzt ist.

**Verstoß**: Die Tabelle nutzt `(OrderID, ProductID)` als zusammengesetzten Primärschlüssel aber `ProductName` hängt nur von `ProductID` ab.

| BestellID | ProduktID | ProduktName | Menge |
| --------- | --------- | ----------- | ----- |
| 1         | 42        | Tastatur    | 2     |
| 2         | 42        | Tastatur    | 1     |

**Lösung**: `ProductName` in eine separate `Products` Tabelle verschieben.

**Bestellungen**:

| BestellID | ProduktID | Menge |
| --------- | --------- | ----- |
| 1         | 42        | 2     |
| 2         | 42        | 1     |

**Produkte**:

| ProduktID | ProduktName |
| --------- | ----------- |
| 42        | Tastatur    |

## Dritte Normalform (3NF)

**Regel**: Muss sich bereits in der 2NF befinden und kein Nicht-Schlüsselattribut darf von einem anderen Nicht-Schlüsselattribut abhängen (keine transitiven Abhängigkeiten).

**Verstoß**: `DepartmentHead` hängt von `Department` ab, nicht direkt von `EmployeeID`.

| MitarbeiterID | Abteilung | Abteilungsleiter |
| ------------- | --------- | ---------------- |
| 1             | Vertrieb  | Carol            |
| 2             | Vertrieb  | Carol            |
| 3             | IT        | Dave             |

**Lösung**: `DepartmentHead` in eine separate `Departments` Tabelle verschieben.

**Mitarbeiter**:

| MitarbeiterID | Abteilung |
| ------------- | --------- |
| 1             | Vertrieb  |
| 2             | Vertrieb  |
| 3             | IT        |

**Abteilungen**:

| Abteilung | Abteilungsleiter |
| --------- | ---------------- |
| Vertrieb  | Carol            |
| IT        | Dave             |

## Zusammenfassung

| Normalform | Voraussetzungen                                                           |
| ---------- | ------------------------------------------------------------------------- |
| 1NF        | Atomare Werte, keine wiederholenden Spalten, eindeutige Zeilen            |
| 2NF        | 1NF + keine Teilabhängigkeiten von einem zusammengesetzten Schlüssel      |
| 3NF        | 2NF + keine transitiven Abhängigkeiten zwischen Nicht-Schlüsselattributen |
