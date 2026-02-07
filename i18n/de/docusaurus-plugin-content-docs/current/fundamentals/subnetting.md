---
description: "Subnetting Basics, Calculations & Examples (IPv4)"
---

# Subnetting (IPv4)

## Subnetting Grundlagen

Subnetting teilt ein großes Netzwerk in kleinere, besser verwaltbare Teilnetzwerke (Subnetze). Das verbessert die Performance, Organisation und Sicherheit.

| Begriff           | Abkürzung  | Definition                                                                | Beispiel               |
| ----------------- | ---------- | ------------------------------------------------------------------------- | ---------------------- |
| **IP-Adresse**    | IP         | Eindeutige Adresse eines Geräts im Netzwerk.                              | `192.168.1.10`         |
| **Subnetzmaske**  | Netmask    | Trennt den Netzteil vom Hostteil                                          | `255.255.255.0`        |
| **CIDR**          | Slash Not. | Kurzformat der Maske (Gezählt in "1" Bit jeweils)                         | `/24`                  |
| **Netzwerk-ID**   | Net ID     | Der "Straßenname". Die erste Adresse des Subnetzes                        | `192.168.1.0`          |
| **Broadcast**     | Bcast      | Sendet an *alle* Geräte gleichzeitig. Die letzte Adresse des Subnetzes    | `192.168.1.255`        |
| **Host**          | Host       | Ein Gerät (PC, Router) innerhalb des Subnetzes                            | `.1` to `.254`         |
| **Netzwerk-Bits** | Net-Bits   | Bits in der IP-Adresse, die das Netzwerk kennzeichnen                     | `/24` => first 24 bits |
| **Host-Bits**     | Host-Bits  | Bits in der IP-Adresse, die Hosts innerhalb des Netzwerks identifizieren. | `24` => last 8 bits    |

**Regel:** Eine IPv4 Adresse besteht aus **32 Bits**, aufgeteilt in 4 Okteten (8 bits jeweils).  
**Format:** `x.x.x.x` (Dezimal) oder `11000000.10101000.00000001.00001010` (Binär)

---

## Subnetzmasken & CIDR verstehen

Die Subnetzmaske sagt dem Computer welcher Teil der IP das **Netzwerk** (Straße) ist und welcher der **Host** (Hausnummer) ist.

### CIDR Notation (Classless Inter-Domain Routing)

CIDR (e.g., `/24`) zählt einfach die Anzahl der **aktiven Bits** in der Maske von links nach rechts.

| CIDR | Dezimal Subnetzmaske | Binär Subnetzmaske (First Octets) | Hosts pro Subnetz* |
| ---- | -------------------- | --------------------------------- | ------------------ |
| /8   | 255.0.0.0            | `11111111.00000000...`            | 16,777,214         |
| /16  | 255.255.0.0          | `11111111.11111111...`            | 65,534             |
| /24  | 255.255.255.0        | `11111111...11111111.0`           | 254                |
| /25  | 255.255.255.128      | `11111111...1.10000000`           | 126                |
| /26  | 255.255.255.192      | `11111111...1.11000000`           | 62                 |
| /30  | 255.255.255.252      | `11111111...1.11111100`           | 2                  |

**Anmerkung:** Gesamtanzahl Adressen Minus 2 (1 für die Netzwerk-ID, 1 für die Broadcastadresse).

---

## Berechnungsmethoden

### 1. Subnetzgrößen berechnen (Anzahl der Hosts)

Wieviele Geräte passen in ein Netzwerk?

```text
Formel: 2^(Host-Bits) - 2 = Nutzbare Hosts

Host-Bits = 32 - (CIDR)
```

#### Beispiel: /24 Netzwerk

1. **Host-Bits:** 32 - 24 = 8 Bits
2. **Berechnung:** 2⁸ = 256
3. **Nutzbare Hosts:** 256 - 2 = **254 Hosts**

#### Beispiel: /26 Netzwerk

1. **Host-Bits:** 32 - 26 = 6 Bits
2. **Berechnung:** 2⁶ = 64
3. **Nutzbare Hosts:** 64 - 2 = **62 Hosts**

---

### 2. Die "magische Nummer" herausfinden (Größe jedes Subnetzes)

Die magische Nummer hilft dir, Subnetzbereiche im Kopf zu berechnen. Sie gibt die Schrittweite Erhöhung der Netzwerke an.

```markdown
Methode 1 (Binär):
Schau dir das letzte Bit an welches auf '1' steht in der Subnetzmaske. Der Wert dieses Bits ist die magische Nummer.

Methode 2 (Substraktion):
256 - (Letztes nicht null Oktet der Subnetzmaske) = Magische Nummer
```

#### Beispiel: /26 Maske (255.255.255.192)

* **Relevantes Oktet:** 192
* **Berechnung:** 256 - 192 = **64**
* **Ergebnis:** Die Netzwerk erhöhen sich in 64'er Schritten (0, 64, 128, 192).

---

## Schritt für Schritt Beispiel Rechnung

**Aufgabe:** Analysiere die IP `192.168.10.150` mit der Subnetzmaske `255.255.255.192` (/26).

### Schritt 1: Die magische Nummer finden

* Die Subnetzmaske ist `/26`. Die Änderung betrifft das 4. Oktett.
* Subnetzmaske im 4. Oktett: `192`
* Magische Nummer: `256 - 192 = 64`

### Schritt 2: Die Subnetzbereiche festlegen

Erhöhe um 64, bis du die IP-Adresse `150` überschreitest.

* Subnetz 1: `0 - 63`
* Subnetz 2: `64 - 127`
* Subnetz 3: `128 - 191`  (150 fällt in diesen Bereich)
* Subnetz 4: `192 - 255`

### Schritt 3: Adressen berechnen

Die IP `192.168.10.150` gehört zum `.128` Subnetz.

| Typ            | Berechnung           | Ergebnis           |
| -------------- | -------------------- | ------------------ |
| **Network ID** | Start of the block   | **192.168.10.128** |
| **First Host** | Network ID + 1       | **192.168.10.129** |
| **Last Host**  | Broadcast - 1        | **192.168.10.190** |
| **Broadcast**  | Next Block (192) - 1 | **192.168.10.191** |

---

## Schnellübersicht: Gängige Subnetze

| CIDR    | Subnetzmaske (.x) | Magische Nummer | Nutzbare Hosts | Typischer Anwendungsfall         |
| ------- | ----------------- | --------------- | -------------- | -------------------------------- |
| **/24** | .0                | 256             | 254            | Standard LAN (Home/Office)       |
| **/25** | .128              | 128             | 126            | Ein LAN in zwei Hälften teilen   |
| **/26** | .192              | 64              | 62             | Abteilunsnetzwerke               |
| **/27** | .224              | 32              | 30             | Kleine Teams                     |
| **/28** | .240              | 16              | 14             | Sehr kleine Teams                |
| **/29** | .248              | 8               | 6              | Transfernetze (Router-zu-Router) |
| **/30** | .252              | 4               | 2              | Punkt-zu-Punkt Links             |
| **/32** | .255              | 1               | 1              | Einzelne Host-IP (Loopback)      |

---

## Häufige Fehler

* **Netzwerk-ID/Broadcast vergessen:** Immer 2 subtrahieren um die *nutzbaren* Hosts zu bekommen.
* **Falsches hochzählen:** Subnetzbereiche sind inklusive. Das erste Subnetz endet daher bei `Startadresse + Blockgröße − 1`. Sobald das erste Subnetz korrekt bestimmt ist, können die Endadressen der folgenden Subnetze entweder durch Addieren der Blockgröße zur vorherigen Endadresse berechnet werden oder durch erneute Anwendung der Formel `Startadresse + Blockgröße − 1` unter Verwendung der jeweiligen Netzadresse des Subnetzes.
* **Falsches Oktett:** Ein `/18` Subnetz verändert sich im *3.* Oktett, nicht im 4.
* `/8 - /15`: Änderung im 2. Oktett.
* `/16 - /23`: Änderung im 3. Oktett.
* `/24 - /32`: Änderung im 4. Oktett.

* **Gerade/Ungerade:** Netzwerk-IDs sind normallerweise gerade Nummern; Broadcasts sind normalerweise ungerade.
