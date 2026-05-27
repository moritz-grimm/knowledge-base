---
title: "WireGuard"
description: "Überblick über WireGuard: ein modernes, schnelles VPN-Protokoll, das auf modernster Kryptografie basiert."
keywords:
  - "WireGuard"
  - "VPN"
  - "Tunneling"
  - "Kryptografie"
  - "Netzwerken"
  - "UDP"
---

# WireGuard

## Was ist WireGuard?

WireGuard ist ein modernes VPN-Protokoll, das verschlüsselte Tunnel zwischen Geräten herstellt. Es ist deutlich einfacher und schneller als ältere Protokolle wie IPsec oder OpenVPN und verfügt über eine wesentlich kleinere Codebasis (~4.000 Zeilen vs. Hunderttausende).

WireGuard arbeitet auf der **[Netzwerkschicht](./osi-model.md#layer-3--network) (Layer 3)** und erstellt dabei ein virtuelles Netzwerk Interface für jedes verbundene Gerät. Der über diese Schnittstelle geleitete Traffic wird verschlüsselt und über UDP an die Peers gesendet.

---

## Wie es funktioniert

WireGuard nutzt ein Konzept namens **Cryptokey Routing**: Jeder Peer wird anhand seines Public Keys identifiziert und legt fest, welche IP-Adressen über ihn erreichbar sind.

```text
[Interface]
PrivateKey = <your private key>
Address    = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey  = <peer's public key>
AllowedIPs = 10.0.0.2/32
Endpoint   = 203.0.113.5:51820
```

Wenn die Ziel-IP eines ausgehenden Pakets mit den `AllowedIPs` eines Peers übereinstimmt, verschlüsselt WireGuard das Paket und sendet es an den `Endpoint` dieses Peers. Eingehende Pakete werden nur dann entschlüsselt und akzeptiert, wenn sie von einem bekannten öffentlichen Schlüssel stammen und ihre Quell-IP in den `AllowedIPs` dieses Peers enthalten ist.

---

## Schlüsselbegriffe

### Schlüsselpaare

Jedes WireGuard Interface hat einen **privaten Schlüssel** und einen davon abgeleiteten **öffentlichen Schlüssel**. Öffentliche Schlüssel werden außerhalb des Datenkanals ausgetauscht (manuell, oder über ein Tool wie [Tailscale](../tools/tailscale.md)) und dienen als Identitätsnachweis eines Peers.

### Interface

Ein WireGuard **Interface** ist eine virtuelle Netzwerkschnittstelle (z.B. `wg0`) auf einem Gerät. Die Schnittstelle hat eine eigene IP-Adresse und lauscht auf dem konfigurierten Port auf eingehende UDP-Pakete.

### Peer

Ein **Peer** ist jedes andere WireGuard Interface, mit dem die eigene Schnittstelle kommunizieren darf. Jeder Peer-Eintrag definiert:

- **PublicKey**: der öffentliche Schlüssel des Peers
- **AllowedIPs**: IP-Adressbereiche, die über diesen Peer geleitet werden
- **Endpoint** *(Optional)*: die IP-Adresse und der UDP-Port des Peers

### AllowedIPs

`AllowedIPs` erfüllt einen doppelten Zweck:

- **Ausgehend**: fungiert als Weiterleitungsregel – Pakete an diese IP-Adressen werden an diesen Peer gesendet
- **Eingehend**: fungiert als Filter – Pakete von diesem Peer werden nur akzeptiert, wenn ihre Quell-IP in diesem Bereich liegt

Durch die Einstellung `AllowedIPs = 0.0.0.0/0` wird der gesamte Datenverkehr über einen Peer geleitet, was die Grundlage für Konfigurationen mit Ausgangsknoten bzw. Volltunnel-VPN bildet.

---

## Kryptografie

WireGuard nutzt eine feste, moderne Kryptografie-Suite ohne Verhandlungsspielraum. Dadurch kann eine ganze Klasse von Downgrade-Angriffen ausgeschlossen werden:

| Zweck                        | Algorithmus       |
| ---------------------------- | ----------------- |
| Schlüsselaustausch           | Curve25519 (ECDH) |
| Symmetrische Verschlüsselung | ChaCha20          |
| Authentifizierung            | Poly1305 (MAC)    |
| Hashing                      | BLAKE2s           |
| Schlüsselableitung           | HKDF              |

---

## Vergleich zu anderen VPN Protokollen

| Eigenschaft    | WireGuard          | OpenVPN             | IPsec           |
| -------------- | ------------------ | ------------------- | --------------- |
| Codebase Größe | ~4.000 Zeilen Code | ~70.000 Zeilen Code | Sehr groß       |
| Protokolle     | Nur UDP            | TCP oder UDP        | UDP / ESP       |
| Konfiguration  | Einfach            | Komplex             | Komplex         |
| Performance    | Sehr schnell       | Moderat             | Schnell         |
| Kryptografie   | fest, modern       | Konfigurierbar      | Konfigurierbar  |
| NAT-Traversal  | Eingebaut          | Limitiert           | Benötigt Extras |

---

## Verbindung zu Tailscale

WireGuard übernimmt ausschließlich die **Datenebene** => Pakete werden zwischen Peers verschlüsselt und weitergeleitet. Peer-Erkennung, Schlüsselverteilung und Zugriffskontrolle sind nicht Bestandteil von WireGuard.

[Tailscale](../tools/tailscale.md) baut auf WireGuard auf und ergänzt eine verwaltete **Steuerungsebene**: automatischer Schlüsselaustausch, Peer-Erkennung, NAT-Traversal, MagicDNS und ACLs. So steht die Performance von WireGuard zur Verfügung, ohne manuelle Konfiguration.
