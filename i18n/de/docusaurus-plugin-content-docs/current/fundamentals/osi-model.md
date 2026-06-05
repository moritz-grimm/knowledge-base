---
title: "OSI-Modell"
description: "Das 7-Schichten-OSI-Referenzmodell: Ein Überblick über die Aufgaben, Zuständigkeiten und gängigen Protokolle der einzelnen Schichten."
keywords:
    - OSI-Modell
    - OSI-Schicht
    - Bitübertragungsschicht
    - Sicherungsschicht
    - Vermittlungsschicht
    - Transportschicht
    - Sitzungsschicht
    - Darstellungsschicht
    - Anwendungsschicht
    - Netzwerken
---

# OSI-Modell

## Überblick

Das OSI (Open Systems Interconnection) Modell ist ein konzeptionelles Framework, das die Kommunikation zwischen verschiedenen Netzwerken standardisiert. Es unterteilt die Kommunikation in **7 Schichten**, jede mit einer bestimmten Funktion. Das Modell ist herstellerunabhängig und dient als Referenz, um zu verstehen, wie Protokolle miteinander interagieren.

## Die 7 Schichten

| #   | Name                   | Hauptverantwortlichkeit                                    |
| --- | ---------------------- | ---------------------------------------------------------- |
| 7   | Anwendungsschicht      | Benutzernahe Protokolle und Dienste                        |
| 6   | Darstellungsschicht    | Datenformatierung, Kodierung, Verschlüsselung              |
| 5   | Sitzungsschicht        | Sitzungsverwaltung zwischen Anwendungen                    |
| 4   | Transportschicht       | End-to-End-Übermittlung zwischen Prozessen                 |
| 3   | Vermittlungsschicht    | Logische Adressierung und Routing                          |
| 2   | Sicherungsschicht      | Netzwerkframeübertragung innerhalb eines lokalen Netzwerks |
| 1   | Bitübertragungsschicht | Rohbit-Übertragung über ein Medium                         |

## Die Schichten im Detail

### Layer 1 – Bitübertragung

Überträgt rohe Bits über ein physisches Medium (Kabel, Funk, Glasfaser). Definiert Spannungspegel, Pinbelegungen und Bittaktung. Es gibt kein Adressierungskonzept.

**Beispiele:** Ethernetkabel, Wi-Fi-Funksignale, Glasfaserkabel, Hubs, Repeater

### Layer 2 – Sicherung

Verpackt Bits in **Frames** und übernimmt die Zustellung innerhalb eines einzelnen Netzwerksegments über **MAC-Adressen**. Erkennt zudem Übertragungsfehler per CRC.

**Unterschichten:** LLC (Logical Link Control) und MAC (Media Access Control)

**Beispiele:** Ethernet, Wi-Fi (802.11), ARP, Switches

### Layer 3 – Vermittlung

Übernimmt die **logische Adressierung** (IP) und das Routing von Paketen über mehrere Netzwerke hinweg. Ermittelt den besten Pfad von der Quelle zum Ziel.

**Beispiele:** IP (IPv4, IPv6), ICMP, Router

### Layer 4 – Transport

Stellt **Ende-zu-Ende-Kommunikation** zwischen Prozessen bereit. Verwaltet Segmentierung, Reassemblierung, Flusskontrolle und Fehlerwiederherstellung.

- **TCP**: verbindungsorientiert, zuverlässig, geordnete Übertragung
- **UDP**: verbindungslos, schneller, keine Zustellgarantie

**Beispiele:** TCP, UDP, Portnummern

### Layer 5 – Sitzung

Baut **Sitzungen** (logische Verbindungen) zwischen Anwendungen auf, verwaltet und beendet sie. Unterstützt Synchronisation und Checkpointing bei langen Datenübertragungen.

**Beispiele:** NetBIOS, RPC, Sitzungstoken

### Layer 6 – Darstellung

Übersetzt Daten zwischen Anwendungs- und Netzwerkformat. Verarbeitet Kodierung, Serialisierung, Komprimierung und Verschlüsselung.

**Beispiele:** TLS/SSL (Verschlüsselung), JSON, XML, JPEG, MPEG

### Layer 7 – Anwendung

Die anwendungsnächste Schicht. Stellt Netzwerkdienste direkt für Anwendungen bereit. Bezieht sich nicht auf die Anwendungen selbst, sondern auf die von ihnen verwendeten Protokolle.

**Beispiele:** HTTP, HTTPS, FTP, SMTP, DNS, SSH

## Eselsbrücke

Um die Schichten von unten (1) nach oben (7) zu merken:

> **A**lle **d**eutschen **S**tudenten **t**rinken **v**erschiedene **S**orten **B**ier

**A**nwendung, **D**arstellung, **S**itzung, **T**ransport, **V**ermittlung, **S**icherung, **B**itübertragung
