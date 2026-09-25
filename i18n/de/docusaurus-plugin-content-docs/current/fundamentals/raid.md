---
title: "RAID"
description: "Überblick über JBOD und die RAID-Level 0, 1, 5, 6, 10 und 01 sowie deren Kompromisse zwischen Performance, Redundanz und Speichereffizienz."
keywords:
    - RAID
    - Redundant Array of Independent Disks
    - Redundant Array of Inexpensive Disks
    - Speicher
    - Datenspeicher
    - Festplattenredundanz
tags:
    - ap2
---

# RAID

## Überblick

RAID (Redundant Array of Independent/Inexpensive Disks) ist eine Methode, bei der mehrere physische Festplatten zu einer logischen Einheit zusammengefasst werden, um Performance, Redundanz oder beides zu verbessern.

## JBOD – Just a Bunch of Disks

JBOD ist das Fehlen eines RAID-Levels: Die Festplatten werden so genutzt, wie sie sind. Entweder erscheint jede Festplatte einzeln im Betriebssystem, oder mehrere Festplatten werden zu einem großen logischen Laufwerk aneinandergehängt (auch Spanning oder Linear Mode genannt). Daten werden auf eine Festplatte geschrieben, bis diese voll ist, danach wird die nächste genutzt.

- **Mindestanzahl Festplatten:** 1
- **Performance:** Wie eine einzelne Festplatte, es gibt kein Striping und damit keinen parallelen Zugriff
- **Redundanz:** Keine
- **Nutzbare Kapazität:** 100%, Festplatten unterschiedlicher Größe lassen sich ohne Kapazitätsverlust kombinieren

**Am besten für:** Archive, Backupziele und Mediensammlungen, bei denen Kapazität pro Euro zählt und die Daten anderweitig verfügbar sind.

**Vorteile:**

- Festplatten unterschiedlicher Größe und unterschiedlichen Alters lassen sich kombinieren.
- Es geht keine Kapazität durch Parität oder Mirroring verloren.
- Ein Festplattenausfall betrifft nur die Daten auf dieser Festplatte, nicht das gesamte Laufwerk.
- Das Hinzufügen einer weiteren Festplatte erfordert keinen Neuaufbau des Verbunds.

**Nachteile:**

- Es gibt weder Redundanz noch einen Performancegewinn.
- Bei einem aneinandergehängten Laufwerk gehen auch Dateien verloren, die über eine Festplattengrenze reichen.
- Ein Ausfall ist schwerer einzuschätzen als bei einem echten RAID-Level, da er davon abhängt, welche Dateien zufällig auf der ausgefallenen Festplatte lagen.

## RAID 0 – Striping

Daten werden in Blöcke aufgeteilt und parallel auf alle Festplatten geschrieben.

- **Mindestanzahl Festplatten:** 2
- **Performance:** Höchste Read/Write-Geschwindigkeit (skaliert mit der Festplattenanzahl)
- **Redundanz:** Keine, der Ausfall einer Festplatte führt zum Verlust aller Daten
- **Nutzbare Kapazität:** 100%

**Am besten für:** temporäre Daten, Caches oder andere Szenarien, in denen Geschwindigkeit wichtiger ist als Zuverlässigkeit.

**Vorteile:**

- Maximale Read- und Write-Performance
- Volle nutzbare Speicherkapazität
- Einfach einzurichten

**Nachteile:**

- Keine Fehlertoleranz
- Verlust aller Daten bei einem einzigen Festplattenausfall

## RAID 1 – Mirroring

Daten werden identisch auf alle Festplatten geschrieben.

- **Mindestanzahl Festplatten:** 2
- **Performance:** Schnellere Reads (es kann von jeder Festplatte gelesen werden), dieselbe Write-Geschwindigkeit wie eine einzelne Festplatte
- **Redundanz:** Verkraftet den Ausfall aller Festplatten außer einer
- **Nutzbare Kapazität:** 50%

**Am besten für:** OS-Laufwerke oder kritische Daten, bei denen Zuverlässigkeit Vorrang hat.

**Vorteile:**

- Hohe Redundanz, einfache Wiederherstellung
- Schnelle Read-Performance
- Einfach zu verstehen und zu verwalten

**Nachteile:**

- 50% Kapazitätsverlust durch das Mirroring
- Writes nicht schneller als mit einer einzelnen Festplatte

## RAID 5 – Striping mit Distributed Parity

Daten und Paritätsinformationen werden über alle Festplatten verteilt. Die Parität ermöglicht die Wiederherstellung der Daten, wenn eine Festplatte ausfällt.

- **Mindestanzahl Festplatten:** 3
- **Performance:** Gute Read-Geschwindigkeit, Write-Geschwindigkeit aufgrund der Paritätsberechnung reduziert
- **Redundanz:** Toleriert 1 Festplattenausfall
- **Nutzbare Kapazität:** `(n - 1) / n` (z.B. 3 Festplatten => 67%)

**Am besten für:** Allzweck-Dateiserver, die Kapazität, Performance und Redundanz ausbalancieren.

**Vorteile:**

- Gute Balance aus Kapazität, Performance und Redundanz
- Kapazitätsverlust durch Parität von nur einer Festplatte

**Nachteile:**

- Die Paritätsberechnung reduziert die Write-Performance.
- Die Wiederherstellung kann bei großen Festplatten sehr lange dauern.
- Das Array ist während der Wiederherstellung anfällig für einen zweiten Ausfall.

## RAID 6 – Striping mit doppelter Parität

Wie [RAID 5](#raid-5--striping-mit-distributed-parity), aber mit zwei unabhängigen Paritätsblöcken, wodurch zwei gleichzeitige Festplattenausfälle toleriert werden.

- **Mindestanzahl Festplatten:** 4
- **Performance:** Leicht langsamere Write-Geschwindigkeit als RAID 5 wegen der doppelten Parität
- **Redundanz:** Toleriert 2 Festplattenausfälle
- **Nutzbare Kapazität:** `(n - 2) / n` (z.B. 4 Festplatten => 50%)

**Am besten für:** große Arrays oder Umgebungen, in denen die Wiederherstellungszeit das Ausfallrisiko erhöht.

**Vorteile:**

- Überlebt zwei gleichzeitige Festplattenausfälle
- Sicherer für große Arrays, bei denen die Wiederherstellung Tage dauern kann

**Nachteile:**

- Höhere Write-Einbußen als RAID 5
- Kapazitätsverlust durch Parität von zwei Festplatten
- Mindestens 4 Festplatten erforderlich

## RAID 10 – Striping + Mirroring

Kombiniert [RAID 1](#raid-1--mirroring) (Mirroring) und [RAID 0](#raid-0--striping) (Striping): Daten werden in Paaren gespiegelt und dann über die Paare gestriped.

- **Mindestanzahl Festplatten:** 4
- **Performance:** Hohe Read- und Write-Geschwindigkeit
- **Redundanz:** Toleriert 1 Ausfall pro gespiegeltem Paar
- **Nutzbare Kapazität:** 50%

**Am besten für:** Datenbanken und Workloads mit hohem Durchsatz, die sowohl Geschwindigkeit als auch Redundanz erfordern.

**Vorteile:**

- Hervorragende Read- und Write-Performance
- Schnelle Wiederherstellung im Vergleich zu paritätsbasierten RAID-Leveln
- Einfacher Wiederherstellungsprozess

**Nachteile:**

- 50% Kapazitätsverlust durch das Mirroring
- Mindestens 4 Festplatten erforderlich, mit schnell steigenden Kosten

## RAID 01 – Mirroring + Striping

RAID 01 (auch RAID 0+1 geschrieben) kombiniert dieselben zwei Level wie RAID 10, jedoch in umgekehrter Reihenfolge: Die Festplatten werden zunächst zu RAID-0-Stripe-Sets zusammengefasst, und diese Sets werden anschließend gespiegelt.

- **Mindestanzahl Festplatten:** 4
- **Performance:** Wie RAID 10, hohe Read- und Write-Geschwindigkeit
- **Redundanz:** Toleriert sicher 1 Festplattenausfall
- **Nutzbare Kapazität:** 50%

```text
RAID 10:  mirror(Disk1, Disk2) + mirror(Disk3, Disk4), striped across both mirrors
RAID 01:  stripe(Disk1, Disk2) + stripe(Disk3, Disk4), mirrored onto each other
```

**Am besten für:** nichts im Besonderen. RAID 10 erreicht dasselbe mit besserem Ausfallverhalten und wird deshalb stattdessen eingesetzt.

**Unterschied zu RAID 10:** Ein einzelner Festplattenausfall legt das gesamte Stripe-Set lahm, zu dem die Festplatte gehört, das Array läuft danach auf dem verbleibenden Mirror. Ein zweiter Ausfall zerstört das Array, sofern er nicht eine Festplatte des ohnehin ausgefallenen Sets trifft. Bei RAID 10 ist nur das betroffene Spiegelpaar degradiert, und ein zweiter Ausfall wird überlebt, solange er ein anderes Paar trifft. Entsprechend unterscheidet sich die Wiederherstellung: RAID 10 synchronisiert nur einen Spiegelpartner neu, RAID 01 muss das gesamte Stripe-Set wiederherstellen.

**Vorteile:**

- Hohe Read- und Write-Performance
- Einfach nachvollziehbar als Kombination zweier Grundlevel

**Nachteile:**

- Schlechteres Ausfallverhalten als RAID 10 bei identischen Kosten
- 50% Kapazitätsverlust durch das Mirroring
- Längere Wiederherstellung, da ein vollständiges Stripe-Set neu aufgebaut werden muss

## Vergleich

| Level                                              | Min. Festplatten | Fehlertoleranz  | Nutzbare Kapazität | Performance                       |
| -------------------------------------------------- | ---------------- | --------------- | ------------------ | --------------------------------- |
| [JBOD](#jbod--just-a-bunch-of-disks)               | 1                | 0 Festplatten   | 100%               | Wie eine einzelne Festplatte      |
| [RAID 0](#raid-0--striping)                        | 2                | 0 Festplatten   | 100%               | Sehr hohe Reads & Writes          |
| [RAID 1](#raid-1--mirroring)                       | 2                | n-1 Festplatten | 50%                | Schnelle Reads, normale Writes    |
| [RAID 5](#raid-5--striping-mit-distributed-parity) | 3                | 1 Festplatte    | (n-1)/n            | Schnelle Reads, langsame Writes   |
| [RAID 6](#raid-6--striping-mit-doppelter-parität)  | 4                | 2 Festplatten   | (n-2)/n            | Schnelle Reads, langsamere Writes |
| [RAID 10](#raid-10--striping--mirroring)           | 4                | 1 pro Paar      | 50%                | Sehr hohe Reads & Writes          |
| [RAID 01](#raid-01--mirroring--striping)           | 4                | 1 Festplatte    | 50%                | Sehr hohe Reads & Writes          |

## Wichtige Hinweise

- RAID **ist kein Backup**: Es schützt vor Festplattenausfällen, nicht vor versehentlichem Löschen, Datenkorruption oder Katastrophen.
- Die Wiederherstellung kann bei großen Festplatten Stunden bis Tage dauern, während derer das Array anfällig ist.
- Hardware-RAID-Controller bieten höhere Performance und Cache, kosten aber extra und führen zu Anbieterabhängigkeit.
- Software-RAID (z.B. Linux `mdadm`, Windows Storage Spaces, ZFS) ist eine kostengünstige Alternative.
