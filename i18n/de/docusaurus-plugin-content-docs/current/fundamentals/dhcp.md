---
title: "DHCP"
description: "Wie DHCP Clients automatisch die IP-Konfiguration zuweist, einschließlich DORA-Ablauf, Lease, Bereich, Optionen, Reservierung, Relay-Agent und Failover."
keywords:
    - DHCP
    - Dynamic Host Configuration Protocol
    - DORA
    - Lease
    - Bereich
    - Relay-Agent
    - Failover
    - DHCPv6
---

# DHCP (Dynamic Host Configuration Protocol)

DHCP weist Clients automatisch eine IP-Adresse, Subnetzmaske und weitere Konfigurationsparameter im lokalen Netzwerk zu. Damit entfällt die manuelle Konfiguration jedes einzelnen Hosts. DHCP verwendet die UDP-Ports `67` (Server) und `68` (Client).

## Der DORA-Ablauf

Ein Client erhält seine Konfiguration in vier Schritten, die als **DORA** gemerkt werden:

1. **Discover** – Der Client sendet einen `DHCP Discover` als Broadcast in das lokale Netz, um einen Server zu finden.
2. **Offer** – Ein DHCP-Server antwortet mit einem `DHCP Offer`, das eine verfügbare Adresse und Konfigurationsparameter enthält.
3. **Request** – Der Client fordert die angebotene Adresse mit einem `DHCP Request` an.
4. **Acknowledge** – Ist die Adresse noch verfügbar, bestätigt der Server sie mit einem `DHCP Ack`.

## Kernbegriffe

- **Lease** – Eine Adresse wird nur für eine begrenzte Dauer vergeben (der Lease). Das verhindert, dass Adressen dauerhaft an einen Client gebunden bleiben, und erlaubt ihre Wiederverwendung.
- **Bereich (Scope)** – Der Bereich an IP-Adressen, den ein Server vergeben darf (inklusive Subnetzmaske).
- **Optionen** – Zusätzliche Parameter, die zusammen mit der Adresse verteilt werden, z.B. Standardgateway, DNS-Server, Subnetzmaske.
- **Reservierung** – Eine feste IP-Adresse, die dauerhaft an eine bestimmte MAC-Adresse gebunden ist, sodass ein Client immer dieselbe Adresse erhält.

## Relay-Agent

Da Router keine Broadcasts weiterleiten, bedient ein DHCP-Server normalerweise nur sein eigenes Subnetz. Ein **DHCP-Relay-Agent** leitet DHCP-Anfragen aus einem anderen Subnetz an den DHCP-Server weiter (als Unicast), sodass ein Server mehrere Subnetze bedienen kann.

## Failover

Für Ausfallsicherheit können sich zwei DHCP-Server dieselben Bereiche teilen und ihre Lease-Informationen replizieren. Es gibt zwei Modi:

- **Lastenausgleich** – Beide Server vergeben gleichzeitig Adressen (Standardverhältnis 50/50, anpassbar).
- **Hot Standby** – Ein primärer Server vergibt alle Adressen; ein sekundärer Server übernimmt nur beim Ausfall des primären.

Failover unterstützt maximal zwei Server und funktioniert nur für IPv4-Bereiche.

## DHCPv6 vs. SLAAC

Bei IPv6 ist für die Adresskonfiguration nicht zwingend DHCP nötig:

- **SLAAC** (Stateless Address Autoconfiguration) – Der Host bildet seine Adresse selbst aus einem globalen Präfix, das der Router per Router Advertisement bekannt gibt. Es ist kein zentraler Server beteiligt.
- **DHCPv6** (stateful) – Ein DHCPv6-Server weist die vollständige Konfiguration zentral zu und verwaltet sie, ähnlich wie bei IPv4. Der Router sendet weiterhin Router Advertisements mit dem `managed`-Flag, damit der Host weiß, dass er DHCPv6 nutzen soll.

## Nützliche Befehle (Client)

| Befehl              | Zweck                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| `ipconfig /all`     | Zeigt die komplette IP-Konfiguration an (Adapter, MAC, IP, DNS, Gateway) |
| `ipconfig /release` | Gibt die aktuelle Adresse frei (Lease)                                   |
| `ipconfig /renew`   | Fordert einen neuen Lease vom DHCP-Server an                             |
