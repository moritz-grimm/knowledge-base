---
title: "NAT"
description: "Wie NAT private IP Adressen in öffentliche umwandelt, einschließlich PAT/Overloading und Port-Forwarding."
keywords:
    - NAT
    - Network Address Translation
    - PAT
    - Port Address Translation
    - Port-Forwarding
    - Netzwerken
    - IP-Adressen
    - Private IP
    - Öffentliche IP
---

# NAT (Network Address Translation)

## Überblick

Das rapide Wachstum des Internets hätte sehr schnell den Pool aller verfügbaren IP-Adressen ausgeschöpft, hätte man sich nicht Wege überlegt diese effizienter zu nutzen. NAT (Network Address Translation) adressiert dieses Problem, indem es vielen Geräten innerhalb eines Netzwerks erlaubt eine kleine Nummer an öffentliche IP-Adressen zu nutzen.

NAT arbeitet an einem Grenzgerät (typischerweise einer Firewall oder einem Router). Wenn ein Datenpaket dieses durchläuft, ersetzt NAT die Quell-IP-Adresse (eine private, nicht routbare Adresse) durch eine öffentliche, routbare IP-Adresse. Die öffentliche Adresse in der Antwort wird anschließend wieder in die private Adresse zurückübersetzt, damit das Paket an den richtigen internen Host zugestellt werden kann.

## Vorteile

- **Einfache Neunummerierung**: Bei einem Wechsel des ISP benötigen interne Hosts keine neuen IP-Adressen. Es ändert sich lediglich die vom neuen ISP zugewiesene öffentliche Adresse.
- **Adressersparnis**: [PAT](#nat-overloading-pat) erlaubt vielen internen Hosts sich eine einzige öffentliche IP-Adresse zu teilen, wodurch sich der Bedarf an öffentlichen Adressen erheblich verringert.
- **Erhöhte Sicherheit**: Interne Adressen und Netzwerktopologien sind vor externen Netzwerken versteckt, da nur die öffentliche IP-Adresse sichtbar ist.

## Wie NAT funktioniert

1. Ein interner Host (z.B. `10.0.0.3`) sendet ein Paket welches für einen externen Host bestimmt ist (z.B. `128.23.2.2`)
2. Das Gateway (RTA) erkennt dass das Paket an einen externen Host adressiert ist und wählt eine global verfügbare IP-Adresse (z.B. `179.9.8.80`)
3. RTA ersetzt die Quell-IP-Adresse im Paket mit der gewählten globalen Adresse und speichert das Mapping auf die Original Quell-IP-Adresse in der NAT-Tabelle
4. Das Paket wird an das Ziel weitergeleitet
5. Wenn die Antwort an die Adresse `179.9.8.80` eintrifft, durchsucht RTA die NAT-Tabelle, ermittelt die entsprechende interne IP-Adresse, ersetzt das Ziel-IP-Adressfeld und leitet das Paket intern weiter

Die NAT-Tabelle erfasst drei Arten von Adressen:

- **Interne lokale IP**: Die private IP-Adresse des internen Hosts
- **Interne globale IP**: Die öffentliche IP-Adresse, die der NAT-Router dem internen Host für die externe Kommunikation zuweist
- **Externe globale IP**: Die IP-Adresse des Zielhosts im externen Netz

**NAT-Tabelle Beispiel:**

| Interne lokale IP | Interne globale IP | Externe globale IP |
| ----------------- | ------------------ | ------------------ |
| 10.0.0.3          | 179.9.8.80         | 128.23.2.2         |

## NAT Overloading (PAT)

NAT Overloading, auch PAT (Port Address Translation) genannt, ordnet mehrere private IP-Adressen einer einzigen öffentlichen IP-Adresse zu, indem es zusätzlich die Portnummern trackt. Jede interne Verbindung erhält auf der öffentlichen Seite eine einzigartige Portnummer, wodurch der Router eingehende Antworten an den richtigen internen Host weiterleiten kann.

**NAT-Tabelle mit Overloading:**

| Interne IP | Interner port | Globale IP | Externer port |
| ---------- | ------------- | ---------- | ------------- |
| 10.0.0.2   | 1555          | 179.9.8.80 | 1555          |
| 10.0.0.3   | 1331          | 179.9.8.80 | 1331          |
| 10.0.0.4   | 1444          | 179.9.8.80 | 1444          |

## Port-Forwarding

Standardmäßig blockiert NAT alle eingehenden Verbindungen, die von außen initiiert wurden. Port-Forwarding ermöglicht es, dass spezifischer externer Traffic interne Hosts erreicht, indem eine Zielportnummer auf der öffentlichen IP-Adresse zu einer spezifischen internen IP-Adresse zugewiesen wird.

Beispielablauf:

1. Ein Client sendet eine Anfrage an `https://knowledge.moritz-grimm.dev` (öffentliche IP `209.165.200.225`, Port `443`)
2. Der Router empfängt das Paket da `209.165.200.225` seine eigene öffentliche IP-Adresse ist
3. Eine Port-Forwarding Regel weist den externen Port `443` dem internen Host `192.168.1.254:443` zu, daher schreibt der Router das Ziel um und leitet das Paket intern weiter

:::info
Die externen und internen Portnummern müssen nicht identisch sein.
:::
