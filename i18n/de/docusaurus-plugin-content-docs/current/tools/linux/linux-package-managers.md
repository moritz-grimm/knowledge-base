---
title: "Linux Paketmanager"
description: "Ein Überblick über die bekanntesten Linux Paketmanager, die von ihnen unterstützten Distributionen und ihre wichtigsten Befehle."
keywords:
    - Linux
    - Paketmanager
    - apt
    - pacman
    - dnf
    - yum
    - zypper
    - portage
    - Debian
    - Ubuntu
    - Arch Linux
    - Fedora
    - openSUSE
    - Gentoo
---

# Linux Paketmanager

Ein Paketmanager automatisiert das Installieren, Updaten und Entfernen von Software auf Linux Systemen. Jede große Distributionsfamilie nutzt ihr eigenes Tool.

## apt

Genutzt von Debian-basierten Distributionen: Ubuntu, Debian, Kali Linux, Linux Mint.

| Befehl                  | Beschreibung                                          |
| ----------------------- | ----------------------------------------------------- |
| `apt update`            | Prüft auf neue Paketversionen                         |
| `apt upgrade`           | Alle installierten Pakete updaten                     |
| `apt install <package>` | Ein Paket installieren                                |
| `apt remove <package>`  | Ein Paket entfernen (Config Files beibehalten)        |
| `apt purge <package>`   | Ein Paket und alle zugehörigen Config Files entfernen |
| `apt search <term>`     | Nach einem Paket suchen                               |
| `apt list --installed`  | Alle installierten Pakete auflisten                   |

## pacman

Genutzt von Arch-basierten Distributionen: Arch Linux, Manjaro, EndeavourOS.

| Befehl                 | Beschreibung                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `pacman -Syu`          | Paketdatenbank synchronisieren und alle Pakete aktualisieren |
| `pacman -S <package>`  | Ein Paket installieren                                       |
| `pacman -R <package>`  | Ein Paket deinstallieren                                     |
| `pacman -Rs <package>` | Ein Paket und alle ungenutzen Abhängigkeiten deinstallieren  |
| `pacman -Ss <term>`    | Die Paket Datenbank nach einem Paket durchsuchen             |
| `pacman -Q`            | Alle installierten Pakete auflisten                          |

## dnf

Genutzt von Red Hat-basierten Distributionen von Fedora 22 und CentOS Stream 8 aufwärts.

| Befehl                  | Beschreibung                        |
| ----------------------- | ----------------------------------- |
| `dnf check-update`      | Auf verfügbare Updates prüfen       |
| `dnf upgrade`           | Alle installierten Pakete updaten   |
| `dnf install <package>` | Ein Paket installieren              |
| `dnf remove <package>`  | Ein Paket deinstallieren            |
| `dnf search <term>`     | Nach einem Paket suchen             |
| `dnf list --installed`  | Alle installierten Pakete auflisten |

## yum

Vorgänger zu [dnf](#dnf), genutzt von Fedora 21, CentOS 7, RHEL 7 und abwärts. Wurde durch dnf abgelöst, da sein Python-basierter Abhängigkeits-Resolver langsam war und der Code durch angesammelte Technical Debt schwer wartbar war.

| Befehl                  | Beschreibung                        |
| ----------------------- | ----------------------------------- |
| `yum check-update`      | Auf verfügbare Updates prüfen       |
| `yum update`            | Alle installierten Pakete updaten   |
| `yum install <package>` | Ein Paket installieren              |
| `yum remove <package>`  | Ein Paket deinstallieren            |
| `yum search <term>`     | Nach einem Paket suchen             |
| `yum list installed`    | Alle installierten Pakete auflisten |

## zypper

Genutzt von openSUSE und SUSE Linux Enterprise.

| Befehl                             | Beschreibung                        |
| ---------------------------------- | ----------------------------------- |
| `zypper refresh`                   | Alle Repositories aktualisieren     |
| `zypper update`                    | Alle installierten Pakete updaten   |
| `zypper install <package>`         | Ein Paket installieren              |
| `zypper remove <package>`          | Ein Paket deinstallieren            |
| `zypper search <term>`             | Nach einem Paket suchen             |
| `zypper packages --installed-only` | Alle installierten Pakete auflisten |

## portage

Genutzt von Gentoo. Pakete werden aus dem Source Code kompiliert was sie stark konfigurierbar macht. Das Frontend Tool ist `emerge`.

| Befehl                        | Beschreibung                                                |
| ----------------------------- | ----------------------------------------------------------- |
| `emerge --sync`               | Den Portage-Tree synchronisieren                            |
| `emerge -uDN @world`          | Alle installierten Pakete updaten                           |
| `emerge <package>`            | Ein Paket installieren                                      |
| `emerge --depclean <package>` | Ein Paket und alle ungenutzen Abhängigkeiten deinstallieren |
| `emerge --search <term>`      | Nach einem Paket suchen                                     |
| `qlist -I`                    | Alle installierten Pakete auflisten                         |
