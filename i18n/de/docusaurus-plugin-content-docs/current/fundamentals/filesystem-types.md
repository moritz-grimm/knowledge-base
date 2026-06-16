---
title: "Dateisystemtypen"
description: "Überblick über gängige Dateisystemtypen (FAT32, exFAT, NTFS, ext4, APFS, btrfs) und ihre typischen Einsatzzwecke, Grenzen und Plattformunterstützung."
keywords:
    - Dateisystem
    - FAT32
    - exFAT
    - NTFS
    - ext4
    - APFS
    - btrfs
---

# Dateisystemtypen

Ein **Dateisystem** legt fest, wie Daten auf einem Speichermedium organisiert und abgelegt werden. Dateisysteme unterscheiden sich in der maximalen Dateigröße, der Journaling-Unterstützung und darin, welche Betriebssysteme sie lesen und schreiben können.

## Überblick

| Dateisystem | Max. Dateigröße | Journaling         | Typischer Einsatz                                    |
| ----------- | --------------- | ------------------ | ---------------------------------------------------- |
| FAT32       | 4 GB            | Nein               | USB-Sticks, SD-Karten, hohe Kompatibilität           |
| exFAT       | 16 EB           | Nein               | Große USB-Sticks und SD-Karten plattformübergreifend |
| NTFS        | 16 EB           | Ja                 | Windows System- und Datenlaufwerke                   |
| ext4        | 16 TB           | Ja                 | Standard-Dateisystem unter Linux                     |
| APFS        | 8 EB            | Ja (Copy-on-Write) | Standard-Dateisystem unter macOS                     |
| btrfs       | 16 EB           | Ja (Copy-on-Write) | Linux, mit Snapshots und Pooling                     |

## Auswahl eines Dateisystems

- **Höchste Kompatibilität (kleine Dateien):** FAT32 wird von praktisch jedem Gerät gelesen und beschrieben, ist aber auf 4 GB pro Datei begrenzt.
- **Höchste Kompatibilität (große Dateien):** exFAT hebt die 4-GB-Grenze auf und funktioniert unter Linux, Windows und macOS.
- **Nur Linux:** ext4 ist die sichere Standardwahl; btrfs ergänzt Snapshots und weitere fortgeschrittene Funktionen.
- **Nur Windows:** NTFS unterstützt Berechtigungen, Journaling und große Volumes.
- **Nur macOS:** APFS ist für SSDs optimiert und der moderne Standard.
