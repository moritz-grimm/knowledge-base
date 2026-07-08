---
title: "Namensauflösung"
description: "Warum Namensauflösung nötig ist und ein Überblick über die gängigen Systeme in Windows- und Linux-Netzwerken: DNS, LLMNR, NetBIOS und mDNS."
keywords:
    - Namensauflösung
    - DNS
    - LLMNR
    - NetBIOS
    - mDNS
    - Name Resolution
---

# Namensauflösung

Vernetzte Rechner werden durch eindeutige Adressen identifiziert (IP-Adresse, MAC-Adresse) und kommunizieren über diese miteinander. Da sich Menschen numerische Adressen schlecht merken können, werden stattdessen Namen verwendet. Die **Namensauflösung** ist der Mechanismus, der einen Namen (z.B. einen Rechnernamen) seiner Adresse (z.B. einer IP-Adresse) zuordnet.

## Auflösungssysteme

Für Windows- und Linux-Netzwerke existieren mehrere Systeme:

| System      | Reichweite                   | Hinweis                                                                                                                               |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **DNS**     | Gesamtes Netzwerk / Internet | Wichtigstes System, wird von Active Directory benötigt. UDP-Port `53`, bis zu 255 Zeichen (z.B. `pc01.bs1-landshut.de`)               |
| **LLMNR**   | Nur gleiches Subnetz         | Link Local Multicast Name Resolution (seit Windows Vista), für Arbeitsgruppen. Nutzt Multicast, IPv6-fähig, keine Konfiguration nötig |
| **NetBIOS** | Gleiches Subnetz / veraltet  | Vor Windows Vista zum Suchen von Rechnern genutzt. Max. 15 Zeichen, Ports `137/138/139/445`                                           |
| **mDNS**    | LAN, link-lokal              | Multicast DNS (von Apple entwickelt), TLD `.local`, kein Namensserver nötig. Linux-Implementierung ist `avahi`                        |

## DNS

DNS (Domain Name System) ist das wichtigste Namensauflösungssystem und die Grundlage der Namensauflösung im Internet. Es wird ausführlich unter [DNS](./dns.md) behandelt.

## LLMNR

LLMNR löst Namen nur innerhalb desselben Subnetzes auf und ist für kleine Arbeitsgruppen gedacht. Es nutzt Multicast statt Broadcasts (geringerer Netzwerkverkehr) und ist im Gegensatz zu NetBIOS IPv6-fähig. Namen älterer Systeme (z.B. Windows Server 2003, Windows XP) kann es nicht auflösen.

## NetBIOS

NetBIOS (NetBIOS über TCP/IP, NetBT/NBT) war bis Windows 2000/Vista relevant und wurde genutzt, um in der Netzwerkumgebung nach Rechnern zu suchen. Es dient als Rückfalloption, wenn DNS nicht konfiguriert ist und LLMNR deaktiviert ist oder einen Namen nicht auflösen kann.

## mDNS

mDNS (Multicast DNS) ermöglicht die Namensauflösung im LAN ohne dedizierten Namensserver, mittels Multicast-Nachrichten unter der link-lokalen TLD `.local`. Ab Windows 11 22H2 will Microsoft mDNS sowohl NetBIOS als auch LLMNR ablösen lassen.
