---
title: "ER-Modell"
description: "Ein Überblick zum Entity-Relationship Modell: Entitäten, Attribute, Beziehungen, Kardinalitäten und schwachen Entitäten."
keywords:
  - "ER-Modell"
  - "Entity-Relationship"
  - "Datenbank Design"
  - "Datenmodellierung"
  - "Entitäten"
  - "Attribute"
  - "Beziehungen"
  - "Kardinalitäten"
  - "schwache Entitäten"
---

# ER-Modell

Das Entity-Relationship (ER) Modell ist ein konzeptionelles Datenbankmodell, das dazu dient, die Struktur einer Datenbank auf einer übergeordneten Ebene zu beschreiben, unabhängig von einem bestimmten Datenbanksystem. Es wurde 1976 von Peter Chen eingeführt.

## Kernkonzepte

### Entitäten

Eine Entität ist ein Objekt oder Konzept aus der realen Welt, das sich von anderen Objekten unterscheiden lässt. Entitäten des selben Types werden zu **Entitätstypen** zusammengefasst (z.B. `Kunde`, `Produkt`, `Bestellung`). Ein einzelnes Vorkommen wird als **Entitätsinstanz** bezeichnet.

### Attribute

Attribute beschreiben die Eigenschaften eins Entitätstypen.

| Typ         | Beschreibung                          | Beispiel                              |
| ----------- | ------------------------------------- | ------------------------------------- |
| Simple      | Atomar, unteilbarer Wert              | `Vorname`, `Alter`                    |
| Composite   | Besteht aus Unterattributen           | `Adresse` = (Straße, Stadt, PLZ)      |
| Multivalued | Kann mehrere Werte enthalten          | `Handynummern`                        |
| Derived     | Berechnet aus einem anderen Attribut  | `Alter` abgeleitet aus `Geburtsdatum` |

Das **Schlüsselattribut** (Primärschlüssel) identifiziert jede Entitätsinstanz eindeutig, z.B. `KundenID`.

### Beziehungen

Eine Beziehung beschreibt eine Verbindung zwischen zwei oder mehreren Entitätstypen. Genau wie Entitäten werden Beziehungen in **Beziehungstypen** gruppiert (z.B. ein `Kunde` *platziert* eine `Bestellung`). Beziehungen können auch ihre eigenen Attribute haben (z.B. eine `ArbeitetFür`-Beziehung könnte ein `Startdatum` beinhalten).

## Kardinalitäten

Kardinalität definiert wie viele Instanzen einer Entität mit einer Instanz einer anderen Entität verknüpft werden können.

| Typ | Beschreibung                                    | Beispiel                                                       |
| --- | ----------------------------------------------- | -------------------------------------------------------------- |
| 1:1 | Eine Instanz bezieht sich genau auf eine andere | Eine Person hat einen Reisepass                                |
| 1:N | Eine Instanz bezieht sich auf viele andere      | Ein Kunde kann viele Bestellungen machen                       |
| N:M | Viele Instanzen beziehen sich auf viele andere  | Studenten belegen mehrere Kurse; Kurse haben mehrere Studenten |

**Participation** legt darüber hinaus fest, ob jede Entitätsinstanz an einer Beziehung beteiligt sein muss:

- **Total participation** (Pflicht): Jede Instanz muss in mindestens einer Beziehung sein, z.B. jede Bestellung muss einem Kunden zugeordnet sein.
- **Partial participation** (optional): Manche Instanzen nehmen eventuell nicht teil, z.B. nicht jeder Kunde hat eine Bestellung durchgeführt.

## Schwache Entitäten

Eine **schwache Entität** kann nicht eindeutig anhand ihrer eigenen Attribute identifiziert werden. Sie ist abhängig von einer **starken (Besitzer) Entität** für ihre Identität.

- Die schwache Entität hat einen **Teilschlüssel** (Diskriminator), der nur im Kontext ihres Eigentümers eindeutig ist.
- Die Beziehung, die eine schwache Entität mit ihrem Besitzer verbindet, wird als **identifizierende Beziehung** bezeichnet.

**Beispiel**: `OrderItem` ist eine schwache Entität. Der Teilschlüssel `LineNumber` ist nur eindeutig innerhalb einer spezifischen `Order`. Die vollständige Identität lautet `(OrderID, LineNumber)`.

## Beispiel: Bestellmanagement

Das folgenden Beispiel zeigt einen `Customer` welcher `Orders` platzieren kann, jede Bestellung besteht aus einem oder mehreren `OrderItems`. `OrderItem` ist eine schwache Entität, da eine `LineNumber` nur im Zusammenhang mit einem bestimmten Auftrag Sinn ergibt.

```text
┌──────────────────┐                      ┌──────────────────┐
│    Customer      │                      │     Order        │
├──────────────────┤                      ├──────────────────┤
│ CustomerID (PK)  │─── 1 ── places ── N ─│ OrderID (PK)     │
│ Name             │                      │ OrderDate        │
│ Email            │                      └────────┬─────────┘
└──────────────────┘                               │ 1
                                                   │
                                               contains
                                            (identifying)
                                                   │
                                                   │ 1..*
                                          ╔════════╧═════════╗
                                          ║    OrderItem     ║
                                          ╠══════════════════╣
                                          ║ ~LineNumber      ║
                                          ║  Quantity        ║
                                          ╚══════════════════╝
```

## Zuordnung zu relationalen Tabellen

| ER-Konzept        | Relationale Zuordnung                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Entitätstyp       | Tabelle                                                                                  |
| Attribut          | Spalte                                                                                   |
| Schlüsselattribut | Primärschlüssel                                                                          |
| 1:N Beziehung     | Fremdschlüssel auf der N-seitigen Tabelle                                                |
| N:M Beziehung     | Verbindungstabelle mit Fremdschlüsseln zu beiden Entitätstabellen                        |
| Schwache Entität  | Tabelle mit einem zusammengesetzten Primärschlüssel (Eigentümerschlüssel + Teilschlüssel) |
