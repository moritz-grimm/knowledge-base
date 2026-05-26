---
title: "Tailscale"
description: "Überblick über Tailscale: ein auf WireGuard basierendes Mesh-VPN zur sicheren Verbindung von Geräten über verschiedene Netzwerke hinweg."
keywords:
  - "Tailscale"
  - "VPN"
  - "WireGuard"
  - "Mesh-Netzwerk"
  - "Tailnet"
  - "Zero-Config VPN"
  - "Netzwerken"
---

# Tailscale

## Was ist Tailscale?

Tailscale ist ein Zero-Config-Mesh-VPN-Service, der auf [WireGuard](https://www.wireguard.com/) basiert. Es verbindet Geräte in einem privaten Netzwerk, dem sogenannten "**Tailnet**", unabhängig vom Standort oder ob sie hinter NAT, Firewalls oder unterschiedlichen ISPs betrieben werden.

Anders als bei traditionellen VPNs, bei denen der gesamte Traffic durch ein zentrales Gateway geleitet wird, stellt Tailscale, soweit möglich, direkte **Peer-to-Peer-Verbindungen** zwischen den Geräten her. Das führt zu geringerer Latenz und höherem Durchsatz.

---

## Architektur

Tailscale hat zwei Hauptkomponenten:

- **Steuerungsebene**: Der Koordinierungsserver von Tailscale verwaltet den Schlüsselaustausch, die Authentifizierung und verteilt die Netzwerkkonfiguration an alle Nodes. Er hat keinen Einblick in den tatsächlichen Datenverkehr.
- **Datenebene**: Der eigentliche Datenverkehr fließt direkt zwischen den Nodes über verschlüsselte WireGuard-Tunnel und umgeht dabei die Server von Tailscale.

```text
Gerät A <===[WireGuard Tunnel (Peer-to-Peer)]===> Gerät B
             (Tailscale Steuerungsebene: nur Schlüsselaustausch)
```

Wenn eine direkte Verbindung nicht möglich ist (z.B. wegen strikter Firewalls auf beiden Seiten), fällt Tailscale auf seine **DERP**-Server (Designated Encrypted Relay for Packets) zurück, die die verschlüsselten Pakete weiterleiten, ohne sie lesen zu können.

---

## Wichtige Begriffe

### Tailnet

Ein Tailnet ist das private Netzwerk, das sich aus allen verbundenen Tailscale-Geräten bildet. Geräte im selben Tailnet können direkt miteinander kommunizieren, als wären sie im selben lokalen Netzwerk.

### Nodes

Jedes Gerät (Laptop, Server, Smartphone, Raspberry Pi), das bei Tailscale registriert und einem Tailnet beigetreten ist, wird als **Node** bezeichnet. Jeder Node erhält eine stabile private IP-Adresse im Bereich `100.64.0.0/10` (Carrier-Grade-NAT-Adressraum).

### MagicDNS

MagicDNS weist automatisch jedem Node im Tailnet einen menschenlesbaren Hostnamen zu (z.B. `mein-laptop`, `home-server`). So können Geräte über Namen statt über IP-Adressen angesprochen werden, ohne manuelle DNS-Konfiguration.

### Exit Nodes

Ein **Exit Node** ist ein Node, der den gesamten ausgehenden Internet-Traffic anderer Nodes durch sich selbst leitet. Das ist nützlich für:

- Zugriff auf das Internet scheinbar von einem anderen Standort aus
- Durchsetzung einer einzigen ausgehenden IP-Adresse für alle Geräte
- Absicherung des Datenverkehrs in nicht vertrauenswürdigen Netzwerken (z.B. öffentliches WLAN)

### Subnet Routers

Ein **Subnet Router** ermöglicht es einem Tailscale-Node, den Zugriff auf ein bestehendes lokales Netzwerk (Subnetz) bekannt zu machen. Andere Tailnet-Mitglieder können dann auf Geräte in diesem Subnetz zugreifen, ohne Tailscale auf jedem einzelnen Gerät installieren zu müssen.

```text
Tailnet Node (Subnetz Router) <===> Lokales Netzwerk (192.168.1.0/24)
                                           |
                                 [Nicht-Tailscale Gerät]
```

**Typischer Anwendungsfall:** Ein Heim- oder Büro-LAN für alle Tailscale-Geräte im Tailnet zugänglich machen.

### ACLs (Access Control Lists)

Tailscale verwendet eine zentral verwaltete ACL-Richtlinie, um zu steuern, welche Nodes miteinander kommunizieren können. Regeln werden im JSON-basierten HuJSON-Format in der Tailscale-Administrationskonsole definiert.

---

## Vorteile

- **Zero-Konfiguration**: Kein Port-Forwarding, keine Firewall-Regeln, kein manuelles Schlüsselmanagement
- **Funktioniert hinter NAT**: Nutzt NAT-Traversal-Techniken, um direkte Verbindungen herzustellen
- **Ende-zu-Ende-verschlüsselt**: Der gesamte Datenverkehr wird durch WireGuard verschlüsselt; Tailscale-Server sehen niemals die Nutzdaten
- **Plattformübergreifend**: Verfügbar für Linux, macOS, Windows, iOS, Android und mehr
- **Identitätsbasierter Zugriff**: Authentifizierung über SSO-Anbieter (Google, GitHub, Microsoft usw.)

---

## Häufige Anwendungsfälle

| Anwendungsfall                          | Vorgehensweise                             |
| --------------------------------------- | ------------------------------------------ |
| Auf Home-Server aus der Ferne zugreifen | Server als Node registrieren               |
| Öffentliches WLAN absichern             | Traffic über einen Exit Node leiten        |
| Geräte ohne Tailscale erreichen         | Subnet Router verwenden                    |
| Verteiltes Team verbinden               | Alle Mitglieder im selben Tailnet          |
| Home-Lab-Zugriff                        | Alle Lab-Maschinen als Nodes registrieren  |
