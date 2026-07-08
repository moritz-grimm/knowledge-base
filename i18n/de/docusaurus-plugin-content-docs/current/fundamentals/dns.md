---
title: "DNS"
description: "Wie das Domain Name System Namen in IP-Adressen auflöst: Hierarchie und FQDN, Zonen und Eintragstypen, rekursive vs. iterative Abfragen und Caching."
keywords:
    - DNS
    - Domain Name System
    - FQDN
    - Zone
    - Forward-Lookup
    - Reverse-Lookup
    - Rekursive Abfrage
    - Iterative Abfrage
---

# DNS (Domain Name System)

DNS löst DNS-Namen in IP-Adressen auf und umgekehrt. Ein DNS-Name besteht aus zwei Teilen: dem **Hostnamen**, der einen einzelnen Host identifiziert, und dem **Domänennamen**, der eine Gruppe von Hosts in einem gemeinsamen Namensraum kennzeichnet. Beide werden durch einen Punkt getrennt.

## Hierarchie und FQDN

DNS ist ein hierarchisches System, das von der Wurzel abwärts aufgebaut ist:

- **Root (Stammdomäne)** – Die Spitze der Hierarchie (geschrieben als `.`)
- **Top-Level-Domain (TLD)** – z.B. `com`, `net`, `de`, `org`
- **Second-Level-Domain** – z.B. `heise` in `heise.de`
- **Subdomain / Host** – weitere Ebenen unterhalb der Second-Level-Domain, z.B. `www`

Sind alle Teile bis zur Root angegeben, ergibt sich der **FQDN** (Fully Qualified Domain Name), der im Netzwerk eindeutig sein muss, z.B. `www.heise.de`.

## Zonen

Jeder DNS-Server ist für einen abgegrenzten Teil des Namensraums zuständig, der als **Zone** bezeichnet wird (z.B. `heise.de`). Der Server, der die Zonendatei verwaltet, besitzt die **Autorität** für diese Zone.

- **Primäre Zone** – Schreib- und Lesezugriff; die autoritative Kopie der Zone.
- **Sekundäre Zone** – Eine Read-only-Kopie einer primären Zone (zur Redundanz oder Lastverteilung). Sie kann Abfragen beantworten, aber die Zonendatei nicht aktualisieren.

Zonendaten werden zwischen Servern per **Zonenübertragung** (zwei DNS-Server ohne Domänencontroller) oder **Zonenreplikation** (Active-Directory-integrierte Zonen auf Domänencontrollern) ausgetauscht.

Nach Richtung:

- **Forward-Lookup-Zone** – Löst Domänennamen in IP-Adressen auf.
- **Reverse-Lookup-Zone** – Löst IP-Adressen in Domänennamen auf.

## Eintragstypen

| Eintrag   | Zweck                                          |
| --------- | ---------------------------------------------- |
| **A**     | Domänenname zu IPv4-Adresse                    |
| **AAAA**  | Domänenname zu IPv6-Adresse                    |
| **CNAME** | Alias, der auf einen anderen Hosteintrag zeigt |
| **SRV**   | Löst einen Dienst zu einer IP-Adresse auf      |
| **PTR**   | Reverse Lookup: IP-Adresse zu Domänenname      |

## Rekursive vs. iterative Abfragen

- **Rekursive Abfrage** – Der Client sendet diese an seinen Namensserver und erwartet eine endgültige Antwort (die IP-Adresse). Verwaltet der Server die Zone, gibt er eine **autorisierte Antwort** zurück.
- **Iterative Abfrage** – Kann der Server die Anfrage nicht selbst beantworten, fragt er weitere DNS-Server entlang der Hierarchie ab. Jeder verweist ggf. nur auf den nächsten zuständigen Server statt auf die endgültige Antwort, bis der autoritative Server erreicht ist.
- **Caching** – Jeder beteiligte Server speichert Ergebnisse in seinem **DNS-Cache**. Eine aus dem Cache erteilte Antwort gilt als **nicht-autorisierte Antwort**.

## Beispielauflösung (`www.example.com`)

1. Der Client sendet eine **rekursive** Abfrage an seinen konfigurierten DNS-Server.
2. Dieser Server ist nicht autoritativ und hat keinen Cache-Eintrag, also sendet er eine **iterative** Abfrage an einen **Root**-Namensserver.
3. Der Root-Server antwortet mit der Adresse des `com.`-TLD-Namensservers.
4. Der DNS-Server fragt den `com.`-Namensserver ab.
5. Der `com.`-Server antwortet mit der Adresse des `example.com.`-Namensservers.
6. Der DNS-Server fragt den `example.com.`-Namensserver ab.
7. Dieser Server, autoritativ für die Zone, antwortet mit der IP-Adresse des FQDN.
8. Der DNS-Server gibt die IP-Adresse an den Client zurück (und speichert sie im Cache).

## HOSTS-Datei

Für sehr kleine Netzwerke kann statt DNS eine statische `HOSTS`-Datei (`C:\Windows\System32\Drivers\etc\HOSTS`) Hostnamen auf IP-Adressen abbilden. Da Active Directory DNS benötigt, findet diese Alternative heute kaum noch Anwendung.

## Nützliche Befehle (Client)

| Befehl                 | Zweck                          |
| ---------------------- | ------------------------------ |
| `ipconfig /displaydns` | Zeigt den lokalen DNS-Cache an |
| `ipconfig /flushdns`   | Löscht den lokalen DNS-Cache   |

## Regeln für die Benennung von Windows-Domänen

- Für interne Netzwerke eine Subdomain einer offiziellen Internet-Domain verwenden (z.B. `media.ct.de` statt `media.ct.local`).
- Namen möglichst kurz halten (Domänen max. 64 Zeichen).
