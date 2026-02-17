---
title: RAID
description: Überblick über alle RAID Level und deren Kompromisse zwischen Performance, Redundanz und Speichereffizienz.
keywords:
    - RAID
    - Redundant Array of Independent Disks
    - Redundant Array of Inexpensive Disks
    - Speicher
    - Datenspeicher
    - Festplattenredundanz
---

# RAID

## Überblick

RAID (Redundant Array of Independent/Inexpensive Disks) ist eine Methode bei welcher mehrere physische Disks in eine logische Einheit verbunden werden um Performance, Redundanz oder beides zu verbessern.

## RAID 0 – Striping

Daten werden in Blöcke aufgeteilt und auf allen Disks parallel geschrieben.

- **Mindestanzahl Festplatten**: 2
- **Performance**: Höchste Read/Write Geschwindigkeit (Skaliert mit Festplattenanzahl)
- **Redundanz**: Keine, ein Festplattenversagen führt zu Verlust von allen Daten
- **Nutzbare Kapazität**: 100%

**Am besten für:** Temporäre Daten, Caching, oder andere Szenarien wo Geschwindigkeit wichtiger ist als Zuverlässigkeit.

**Vorteile:**

- Maximale Read und Write Performance
- Volle Speicherkapazität nutzbar
- Einfach einzurichten

**Nachteile:**

- Keine Redundanz, ein Festplattenausfall zerstört alle Daten

## RAID 1 – Mirroring

Daten werden identisch auf alle Disks geschrieben.

- **Mindestanzahl Festplatten**: 2
- **Performance**: Schnellere Reads (Kann von jeder Disk gelesen werden), selbe Write Geschwindigkeit wie mit einer einzelnen Festplatte
- **Redundanz**: Kann Festplattenversagen von allen Disks außer einer verkraften
- **Nutzbare Kapazität**: 50%

**Am besten für:** OS Laufwerke oder kritische Daten wo Zuverlässigkeit die erste Priorität ist.

**Vorteile:**

- Hohe Redundanz, einfache Wiederherstellung
- Schnelle Read Performance
- Einfach zu verstehen und zu verwalten

**Nachteile:**

- 50% der Speicherkapazität geht durch das Mirroring verloren
- Writes sind nicht schneller als mit einer einzelnen Festplatte

## RAID 5 – Striping mit Distributed Parity

Daten und Paritätsinformationen werden über alle Festplatten verteilt. Parität erlaubt Datenwiederherstellung wenn eine Festplatte ausfällt.

- **Mindestanzahl Festplatten**: 3
- **Performance**: Gute Read Geschwindigkeit, Write Geschwindigkeit aufgrund der Paritätsberechnung reduziert
- **Redundanz**: Toleriert 1 Festplattenversagen
- **Nutzbare Kapazität**: `(n - 1) / n` (z.B. 3 Festplatten → 66%)

**Am besten für:** Allzweck Dateiserver, die Kapazität, Leistung und Redundanz ausgleichen.

**Vorteile:**

- Gute Balance aus Kapazität, Performance und Redundanz
- Nur eine Festplatte an Kapazität geht durch Parität verloren

**Nachteile:**

- Write Performance durch Paritätsberechnung reduziert
- Wiederherstellung kann bei großen Festplatten sehr lange dauern
- Array ist während der Wiederherstellung anfällig für einen zweiten Ausfall

## RAID 6 – Striping mit doppelter Parität

Wie [RAID 5](#raid-5--striping-mit-distributed-parity), aber mit zwei unabhängigen Paritätsblöcken, wodurch zwei gleichzeitige Festplattenausfälle möglich sind.

- **Mindestanzahl Festplatten**: 4
- **Performance**: Leicht langsamere Write Geschwindigkeit als RAID 5 wegen der doppelten Parität
- **Redundanz**: Toleriert 2 Festplattenversagen
- **Nutzbare Kapazität**: `(n - 2) / n` (z.B. 4 Festplatten → 50%)

**Am besten für:** Große Arrays oder Umgebungen, in denen die Wiederherstellungszeit das Ausfallrisiko erhöht.

**Vorteile:**

- Überlebt zwei gleichzeitige Festplattenausfälle
- Sicherer für große Arrays, bei denen die Wiederherstellung Tage dauern kann

**Nachteile:**

- Höhere Write-Einbußen als RAID 5
- Zwei Festplatten an Kapazität gehen durch Parität verloren
- Mindestens 4 Festplatten erforderlich

## RAID 10 – Striping + Mirroring

Kombiniert [RAID 1](#raid-1--mirroring) (Mirroring) und [RAID 0](#raid-0--striping) (Striping): Daten werden in Paaren gespiegelt und dann in Paaren gestriped.

- **Mindestanzahl Festplatten**: 4
- **Performance**: Hohe Read & Write Geschwindigkeiten
- **Redundanz**: Toleriert 1 Versagen pro gespiegeltem Paar
- **Nutzbare Kapazität**: 50%

**Am besten für:** Datenbanken und Workloads mit hohem Durchsatz, die sowohl Geschwindigkeit als auch Redundanz erfordern.

**Vorteile:**

- Hervorragende Read und Write Performance
- Schnelle Wiederherstellung im Vergleich zu Parity-basierten RAID Leveln
- Einfacher Wiederherstellungsprozess

**Nachteile:**

- 50% der Speicherkapazität geht durch das Mirroring verloren
- Mindestens 4 Festplatten erforderlich, Kosten skalieren schnell

## Vergleich

| Level   | Min. Festplatten | Fehlertoleranz    | Nutzbare Kapazität | Performance                      |
| ------- | ---------------- | ----------------- | ------------------ | -------------------------------- |
| RAID 0  | 2                | 0 Festplatten     | 100%               | Sehr hohe Reads & Writes         |
| RAID 1  | 2                | n-1 Festplatten   | 50%                | Schnelle Reads, Writes wie 1 Disk|
| RAID 5  | 3                | 1 Festplatte      | (n-1)/n            | Schnelle Reads, langsame Writes  |
| RAID 6  | 4                | 2 Festplatten     | (n-2)/n            | Schnelle Reads, langsamere Writes|
| RAID 10 | 4                | 1 pro Paar        | 50%                | Sehr hohe Reads & Writes         |

## Wichtige Hinweise

- RAID **ist kein Backup**, es schützt vor Festplattenausfällen, nicht versehentlicher Löschung, Korruption oder Katastrophen
- Wiederherstellung bei großen Festplatten kann Stunden oder Tage dauern, während derer das Array anfällig ist
- Hardware RAID Controller bieten höhere Performance und Cache, aber kosten extra und führen zu Anbieterabhängigkeit
- Software RAID (z.B. Linux `mdadm`, Windows Storage Spaces, ZFS) ist eine kostengünstigere Alternative
