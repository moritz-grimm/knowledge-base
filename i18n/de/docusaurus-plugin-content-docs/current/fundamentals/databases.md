---
title: Datenbanken
description: Ein Überblick zu relationalen und nicht-relationalen Datenbanken, sowie Kernkonzepten wie Normalisierung, ACID und bekannte Datenbanksysteme
keywords:
    - Datenbanken
    - SQL
    - NoSQL
    - Relationale Datenbanken
    - ACID
    - Normalisierung
    - PostgreSQL
    - MongoDB
---

# Datenbanken

## Überblick

Eine Datenbank ist eine organisierte Sammlung von strukturierten Daten, gemanaged von einem Database Management System (DBMS). Die zwei bekanntesten Arten sind **relationale (SQL)** und **nicht-relationale (NoSQL)** Datenbanken.

## Relationale Datenbanken (SQL)

Daten werden in **Tabellen** gespeichert mit Zeilen und Spalten. Jeder Datensatz ist einzigartig identifizierbar mit einem **Primärschlüssel** und Tabellen werden über **Fremdschlüssel** miteinander verbunden.

- Daten können mit **SQL** (Structured Query Language) abgefragt werden
- Das Schema ist im Voraus definiert und wird von der Datenbank strikt durchgesetzt
- Am besten geeignet für strukturiere Daten mit klaren Beziehungen

**Bekannte Beispiele**: PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Oracle DB

### Kernkonzepte

**Normalisierung** - Tabellen organisieren um Datenredundanz zu reduzieren:

- **1NF**: Atomare Werte, keine sich wiederholenden Gruppen
- **2NF**: Keine partiellen Abhängigkeiten von zusammengesetzten Schlüsseln
- **3NF**: Keine transitiven Abhängigkeiten

**ACID Properties** - Eine Garantie für zuverlässige Transaktionen:

- **Atomicity**: Eine Transaktion wird entweder komplett durchgeführt oder bricht ab
- **Consistency**: Daten bewegen sich immer nur von einem validen Zustand zu einem anderen
- **Isolation**: Gleichzeitige Transaktionen beeinträchtigen sich nicht gegenseitig
- **Durability**: Schon durchgeführte Änderungen bleiben auch nach einem Crash erhalten

## Nicht-relationale Datenbanken (NoSQL)

Designed für flexible, skalierbare Speicherung von unstrukturierten oder nur semi-strukturierten Daten. Kein fixes Schema wird benötigt.

| Typ           | Beschreibung                                         | Beispiele        |
| ------------- | ---------------------------------------------------- | ---------------- |
| Dokument      | Speichert JSON ähnliche Dokumente                    | MongoDB, CouchDB |
| Key-Value     | Einfache Schlüssel → Wertpaare                       | Redis, DynamoDB  |
| Column-Family | Optimiert für spaltenorientierte read/write Vorgänge | Apache Cassandra |
| Graph         | Nodes und edges für relationship-heavy Daten         | Neo4j            |

## Relational vs. NoSQL

|                | Relational                          | NoSQL                                               |
| -------------- | ----------------------------------- | --------------------------------------------------- |
| Schema         | Fest, vordefiniert                  | Flexibel / schemalos                                |
| Abfragesprache | SQL                                 | Variiert (z.B. MongoDB Query Language)              |
| Skalierung     | Vertikal (hochskalieren)            | Horizontal (ausskalieren)                           |
| Konsistenz     | Stark (ACID)                        | Oft eventuelle Konsistenz                           |
| Am besten für  | Strukturierte Daten, komplexe Joins | Große Skalierung, flexible oder hierarchische Daten |
