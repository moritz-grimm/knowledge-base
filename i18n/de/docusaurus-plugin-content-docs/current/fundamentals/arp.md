---
title: "ARP (Address Resolution Protocol)"
description: "Wie ARP IP-Adressen innerhalb eines lokalen Netzwerks in MAC-Adressen auflöst, einschließlich lokaler vs. entfernter Zustellung, des Request/Reply-Ablaufs und des ARP-Caches."
keywords:
    - ARP
    - Address Resolution Protocol
    - MAC-Adresse
    - IP-Adresse
    - Netzwerken
    - Layer 2
    - Layer 3
    - Standardgateway
---

# ARP (Address Resolution Protocol)

## Überblick

ARP (Address Resolution Protocol) arbeitet an der Grenze zwischen Layer 2 (Sicherungsschicht) und Layer 3 (Vermittlungsschicht) des [OSI-Modells](./osi-model.md). Es löst eine bekannte **IP-Adresse** in die zugehörige **MAC-Adresse** auf, die zur Zustellung eines Frames innerhalb eines lokalen Netzwerksegments benötigt wird.

## Zwei Arten von Adressen

Jedes Gerät in einem Ethernet-LAN wird über zwei unterschiedliche Adressen erreicht:

- **MAC-Adresse**: Wird für die Kommunikation zwischen Netzwerkkarten innerhalb desselben Netzwerksegments verwendet. Sie ist die Adressierung des Layer-2-Ethernet-Frames.
- **IP-Adresse**: Wird verwendet, um das Paket von der ursprünglichen Quelle zum endgültigen Ziel zu senden, unabhängig davon, wie viele Netzwerke dazwischen liegen. Sie ist die Adressierung des Layer-3-IP-Pakets.

Der Ethernet-Frame wird um das IP-Paket gekapselt. Während das IP-Paket von Anfang bis Ende durchläuft, existiert der umschließende Ethernet-Frame immer nur auf einem einzelnen Netzwerksegment.

## Warum ARP benötigt wird

IP-Pakete enthalten Quell- und Ziel-IP-Adressen, Ethernet-Frames verwenden zur Zustellung auf dem lokalen Segment jedoch MAC-Adressen. Wenn ein Gerät Daten senden möchte, kennt es die Ziel-IP-Adresse, muss aber zunächst die MAC-Adresse ermitteln, an die der Frame adressiert werden soll.

## Lokale vs. entfernte Zustellung

Das sendende Gerät ermittelt zunächst über seine Subnetzmaske, ob sich das Ziel im **selben Netzwerk** befindet (eine logische UND-Verknüpfung der eigenen IP und der Ziel-IP mit der Maske). Das Ergebnis entscheidet, welche MAC-Adresse der Frame benötigt:

- **Selbes Netzwerk** – Die Ziel-MAC-Adresse ist die MAC-Adresse des Zielhosts selbst. Das Gerät löst die Ziel-IP per ARP auf.
- **Anderes Netzwerk** – Die Ziel-MAC-Adresse ist die MAC-Adresse des **Standardgateways** (der Netzwerkkarte des Routers). Das Gerät löst die IP des Gateways per ARP auf.

In beiden Fällen ändern sich die Quell- und Ziel-**IP-Adressen im Paket niemals**. Lediglich die MAC-Adressen im Frame werden ausgetauscht: Jeder Router auf dem Weg entfernt den eingehenden Frame und erstellt einen neuen mit den Quell- und Ziel-MAC-Adressen für den nächsten Abschnitt.

## Suche in der ARP-Tabelle

Vor dem Senden durchsucht das Gerät seine ARP-Tabelle (im RAM gehalten) nach der IP-Adresse, die es auflösen muss:

- Befindet sich die Ziel-IP im **selben Netzwerk**, sucht es nach der **Ziel-IP-Adresse**.
- Befindet sich die Ziel-IP in einem **anderen Netzwerk**, sucht es nach der **IP-Adresse des Standardgateways**.

Existiert ein passender Eintrag, wird die zwischengespeicherte MAC-Adresse zum Erstellen des Frames verwendet. Existiert kein Eintrag, sendet das Gerät eine **ARP-Anfrage**.

## ARP Request / Reply Ablauf

1. **ARP-Cache prüfen** – Ist die MAC-Adresse für die benötigte IP bereits zwischengespeichert, ist keine Anfrage erforderlich
2. **ARP-Anfrage (Broadcast)** – Ist sie nicht zwischengespeichert, sendet der Absender eine ARP-Anfrage als Broadcast an alle Geräte im Segment: *„Wer hat IP X.X.X.X? Sag es IP Y.Y.Y.Y“*. Die Ziel-MAC-Adresse dieses Broadcast-Frames ist `FF:FF:FF:FF:FF:FF`
3. **ARP-Antwort (Unicast)** – Das Gerät mit der passenden IP antwortet dem Absender direkt mit seiner MAC-Adresse; alle anderen Geräte ignorieren die Anfrage
4. **Cache-Aktualisierung** – Der Absender speichert die Zuordnung von IP zu MAC für die zukünftige Verwendung in seinem ARP-Cache
5. **Frame wird gesendet** – Der Absender erstellt nun den Ethernet-Frame mit der aufgelösten MAC-Adresse

## ARP-Cache

Der ARP-Cache speichert kürzlich verwendete Zuordnungen von IP zu MAC, um wiederholte Broadcasts zu vermeiden.

- Einträge haben eine TTL (Time to Live) und laufen automatisch ab
- Gängige Befehle (Windows/Linux):

| Befehl   | Zweck                        |
| -------- | ---------------------------- |
| `arp -a` | ARP-Tabelle anzeigen         |
| `arp -d` | ARP-Tabelleneinträge löschen |

## Sicherheit: ARP-Spoofing

Da ARP über keinen Authentifizierungsmechanismus verfügt, kann ein Angreifer gefälschte ARP-Antworten senden, um den Cache anderer Geräte zu vergiften und den Datenverkehr über den Rechner des Angreifers umzuleiten (Man-in-the-Middle-Angriff).

Zu den Gegenmaßnahmen gehören:

- **Dynamic ARP Inspection (DAI)** auf Managed Switches
- **Statische ARP-Einträge** für kritische Geräte
- Netzwerküberwachung und Anomalieerkennung
