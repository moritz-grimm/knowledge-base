---
title: "SQL-Untersprachen"
description: ""
keywords:
    - "SQL"
    - "Untersprachen"
    - "DDL"
    - "DML"
    - "DQL"
    - "DCL"
    - "Data Definition Language"
    - "Data Manipulation Language"
    - "Data Query Language"
    - "Data Control Language"
    - "Datenbank"
    - "Datenbanken"
    - "Relationale Datenbanken"
---

# Überblick

SQL kann in vier Subkategorien aufgeteilt werden: DDL, DML, DQL und DCL.

## DDL (Data Definition Language)

DDL-Befehle dienen dazu, die Struktur einer Datenbank zu definieren und zu verwalten, d.h. ihre Tabellen, Spalten, Constraints und Indizes.

**Gängige Befehle:**

- `CREATE` — erstellt eine neue Tabelle, View, Index oder eine Datenbank
- `ALTER` — modifiziert eine bestehende Struktur (z.B. Hinzufügen oder Entfernen einer Spalte)
- `DROP` — löscht eine Tabelle oder Datenbank endgültig
- `TRUNCATE` — löscht alle Datensätze einer Tabelle ohne die Tabelle selbst zu löschen

## DML (Data Manipulation Language)

DML-Befehle dienen dazu, die tatsächlich gespeicherten Daten zu ändern.

**Gängige Befehle:**

- `INSERT` — fügt neue Zeilen in eine Tabelle ein
- `UPDATE` — modifiziert bereits existierende Zeilen
- `DELETE` — löscht Zeilen aus einer Tabelle

## DQL (Data Query Language)

DQL dient dazu, Daten aus der Datenbank abzufragen und abzurufen, ohne diese zu verändern.

**Gängige Befehle:**

- `SELECT` — ruft Zeilen aus einer oder mehreren Tabellen ab, optional gefiltert, gruppiert oder sortiert

## DCL (Data Control Language)

DCL-Befehle dienen dazu, Zugriffsrechte und Berechtigungen für Datenbankbenutzer zu verwalten.

**Gängige Befehle:**

- `GRANT` — gibt einem User die Berechtigungen, bestimmte Aktionen auszuführen
- `REVOKE` — entfernt zuvor erteilte Berechtigungen wieder
