---
title: "IPv6 (Internet Protocol Version 6)"
description: "Wie IPv6-Adressen aufgebaut, gekürzt und erweitert werden, einschließlich der wichtigsten reservierten Adressen (Loopback, Link-Local), der Typen Unicast/Multicast/Anycast und der Adress-Scopes."
keywords:
    - IPv6
    - Internet Protocol
    - Netzwerken
    - Loopback
    - Link-Local
    - Unicast
    - Multicast
    - Anycast
    - Scope
---

# IPv6 (Internet Protocol Version 6)

## Überblick

IPv6 ist der Nachfolger von IPv4 und wurde eingeführt, um die Erschöpfung des 32-Bit-Adressraums von IPv4 zu überwinden. Eine IPv6-Adresse ist **128 Bit** lang, was 2¹²⁸ (etwa 3,4 x 10³⁸) mögliche Adressen ergibt.

Die Adresse wird als **8 Gruppen zu je 16 Bit** geschrieben (oft *Hextets* oder *Gruppen* genannt), jeweils durch 4 Hexadezimalziffern dargestellt und durch Doppelpunkte (`:`) getrennt.

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
```

- 8 Gruppen x 16 Bit = 128 Bit
- Hexadezimalziffern unterscheiden nicht zwischen Groß- und Kleinschreibung (`ff00` entspricht `FF00`); Aber Kleinschreibung ist die empfohlene kanonische Form

## Adressaufbau

Eine typische IPv6-Unicast-Adresse wird in zwei Hälften zu je 64 Bit aufgeteilt:

| Teil               | Länge  | Zweck                                                             |
| ------------------ | ------ | ----------------------------------------------------------------- |
| **Netzwerkpräfix** | 64 Bit | Identifiziert das Netzwerk (Routing-Präfix + Subnetz-ID).         |
| **Interface-ID**   | 64 Bit | Identifiziert die einzelne Schnittstelle innerhalb des Netzwerks. |

Die Präfixlänge wird in CIDR-Notation angegeben, z.B. `2001:db8:abcd:1234::/64`. Ein `/64` ist die Standardgröße für ein einzelnes Subnetz.

## Kürzen (Komprimierung)

Zwei Regeln erlauben es, eine IPv6-Adresse kompakter zu schreiben. Sie lassen sich auch kombinieren.

### Regel 1: Führende Nullen entfernen

Innerhalb jeder Gruppe dürfen führende Nullen weggelassen werden. Pro Gruppe muss mindestens eine Ziffer erhalten bleiben.

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329
```

### Regel 2: Eine Folge von Nullgruppen zusammenfassen (`::`)

Eine einzelne zusammenhängende Folge aus einer oder mehreren reinen Nullgruppen darf durch einen doppelten Doppelpunkt `::` ersetzt werden.

```text
2001:db8:0:0:0:ff00:42:8329
2001:db8::ff00:42:8329
```

**Wichtig:** `::` darf in einer Adresse **nur einmal** vorkommen, da die Länge sonst mehrdeutig wäre. Existieren zwei gleich lange Nullfolgen, sollte die am weitesten links liegende komprimiert werden.

```text
fe80:0:0:0:1:0:0:1   =>   fe80::1:0:0:1   (korrekt)
fe80:0:0:0:1:0:0:1   =>   fe80::1::1      (ungültig, zwei „::“)
```

## Erweitern

Das Erweitern kehrt die Komprimierung um, um die vollständige 128-Bit-Form wiederherzustellen. Das ist für Vergleiche oder die manuelle Subnetzberechnung nützlich.

1. **`::` wiederherstellen** – Die vorhandenen Gruppen zählen und so viele `0`-Gruppen einfügen, bis insgesamt 8 Gruppen erreicht sind.
2. **Jede Gruppe auffüllen** – Führende Nullen ergänzen, bis jede Gruppe 4 Hexadezimalziffern hat.

```text
2001:db8::ff00:42:8329

Schritt 1 (Nullgruppen wiederherstellen, 5 Gruppen vorhanden => 3 einfügen):
2001:db8:0:0:0:ff00:42:8329

Schritt 2 (auf je 4 Ziffern auffüllen):
2001:0db8:0000:0000:0000:ff00:0042:8329
```

## Adresstypen

IPv6 kennt keinen Broadcast. Dessen Aufgabe übernimmt Multicast.

| Typ           | Bedeutung                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **Unicast**   | Eins-zu-eins. Identifiziert eine einzelne Schnittstelle; ein Paket wird genau an diese zugestellt. |
| **Multicast** | Eins-zu-viele. Zustellung an alle Schnittstellen, die der Multicast-Gruppe beigetreten sind.       |
| **Anycast**   | Eins-zu-nächstem. Von mehreren Schnittstellen geteilt; Zustellung an die topologisch nächste.      |

## Scopes

Der *Scope* legt den Bereich des Netzwerks fest, in dem eine Adresse gültig und routbar ist. Die beiden wichtigsten Unicast-Scopes sind:

- **Link-Local** – Nur auf dem direkt angeschlossenen Link (einem Segment) gültig. Nicht geroutet. Wird auf jeder IPv6-Schnittstelle automatisch konfiguriert.
- **Global** – Weltweit eindeutig und über das Internet routbar, vergleichbar mit einer öffentlichen IPv4-Adresse.

Multicast-Adressen tragen ein explizites Scope-Feld (z.B. interface-local, link-local, site-local, global).

### Zone-Index für Link-Local

Da Link-Local-Adressen (`fe80::/10`) über mehrere Schnittstellen hinweg nicht eindeutig sind, muss die ausgehende Schnittstelle über einen mit `%` angehängten Zone-Index angegeben werden.

```text
ping fe80::1%eth0      # Linux (Schnittstellenname)
ping fe80::1%12        # Windows (Schnittstellenindex)
```

## Wichtige Adressen

| Adresse / Präfix | Name               | Beschreibung                                                                                |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| `::/128`         | Unspecified        | Nur Nullen. Wird als Quelladresse verwendet, bevor eine zugewiesen ist (ähnlich `0.0.0.0`). |
| `::1/128`        | Loopback           | Der lokale Host, entspricht IPv4 `127.0.0.1`.                                               |
| `fe80::/10`      | Link-Local         | Automatisch konfiguriert, nur auf dem lokalen Link gültig, nie geroutet.                    |
| `fc00::/7`       | Unique Local (ULA) | Private Adressen für den internen Gebrauch, nicht im Internet geroutet (ähnlich RFC 1918).  |
| `2000::/3`       | Global Unicast     | Öffentliche, weltweit routbare Adressen.                                                    |
| `ff00::/8`       | Multicast          | Alle Multicast-Adressen beginnen mit `ff`.                                                  |
| `ff02::1`        | All Nodes (Link)   | Multicast an jeden Knoten auf dem Link.                                                     |
| `ff02::2`        | All Routers (Link) | Multicast an jeden Router auf dem Link.                                                     |
| `2001:db8::/32`  | Documentation      | Reserviert für Beispiele und Dokumentation, nie produktiv verwendet.                        |

## IPv6 vs. IPv4

| Eigenschaft       | IPv4                   | IPv6                             |
| ----------------- | ---------------------- | -------------------------------- |
| Adresslänge       | 32 Bit                 | 128 Bit                          |
| Notation          | Dezimal, punktgetrennt | Hexadezimal, doppelpunktgetrennt |
| Broadcast         | Ja                     | Nein (durch Multicast ersetzt)   |
| Loopback          | `127.0.0.1`            | `::1`                            |
| Autokonfiguration | DHCP / APIPA           | SLAAC + Link-Local               |
