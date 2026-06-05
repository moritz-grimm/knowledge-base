---
title: Release Management
description: "Release Management im ITSM: Änderungen reibungslos umsetzen per Big-Bang- oder Phased-Rollout, Release-Paket, Rollback, virtuelle Maschinen und PIR"
keywords:
  - "Release Management"
  - "Big Bang"
  - "Phased Rollout"
  - "Release-Paket"
  - "Rollback"
  - "Virtuelle Maschine"
  - "PIR"
  - "Change Management"
  - "ITSM"
sidebar_position: 4
---

# Release Management

## Überblick

Das **Release Management** ist die vierte Stufe des ITSM und die Fortsetzung des Change Managements. Während das Change Management eine Änderung genehmigt und plant, **setzt** das Release Management diese **um** und sorgt dabei für eine reibungslose, unterbrechungsfreie Durchführung.

## Zusammenhang mit dem Change Management

| Change Management                                                 | Release Management                                                     |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Genehmigt und plant Änderungen                                    | Führt Änderungen durch                                                 |
| Erstellt den [RFC](./change-management.md#request-for-change-rfc) | Implementiert den [RFC](./change-management.md#request-for-change-rfc) |
| Entscheidet Was und Wann                                          | Entscheidet Wie und rollt aus                                          |

## Release-Paket

Vor dem Rollout wird ein **Release-Paket** mit allen geplanten Änderungen erstellt. Das Testen erfolgt vorzugsweise an einem [CI](./incident-management.md#configuration-items-ci), das aus dem laufenden Betrieb entnommen, aktualisiert und in einer Testumgebung betrieben wird. Verläuft der Test für eine definierte Zeit ohne Probleme, kann das Release auf alle Zielsysteme ausgerollt werden.

Ein Softwareverteilungssystem hilft, Releases effizient auf viele [CIs](./incident-management.md#configuration-items-ci) zu verteilen.

## Rollout-Verfahren

### Big Bang

Alle Empfänger erhalten das Release gleichzeitig.

**Vorteile:**

- Schnellere Gesamtumsetzung
- Alle Systeme enthalten gleichzeitig das gleiche Update
- Effizientere Fehlersuche (keine Versionsunterschiede)

**Nachteile:**

- Hohes Risiko bei Fehlern (alle Systeme gleichzeitig betroffen)
- Hohe Belastung der Infrastruktur beim Rollout

### Schrittweise (Phased)

Das Release wird zunächst an eine **Teilmenge** der Empfänger ausgerollt, dann schrittweise an weitere.

**Vorteile:**

- Weniger Risiko (nur ein Teil der Systeme betroffen)
- Fehler werden früher erkannt, ohne große Ausfälle

**Nachteile:**

- Einführung dauert länger
- Unterschiedliche Softwareversionen laufen während der Übergangszeit parallel

## Rollback

Wenn ein Release in der Produktivumgebung unerwartet nicht fehlerfrei läuft, sollte jederzeit ein **Rollback** auf den alten Stand möglich sein. Nach Abschluss des Rollouts wird der Anwender durch die Prozessinstanzen über die Aktualisierung informiert.

## Virtuelle Maschinen im Release Management

**Virtuelle Maschine (VM):** Softwaretechnische Kapselung eines Rechnersystems, die einen realen IT-Rechner auf einem Host-System simuliert.

**Vorteile:**

- Kopien lassen sich einfach und risikofrei erstellen, starten und ändern
- Physische Systeme können in VMs umgewandelt werden (P2V = Physical to Virtual)

**Nutzen für das Release Management:** Neue Versionen, Updates und Anwendungen können sicher in der VM getestet werden; ältere Versionen lassen sich parallel weiternutzen (Ressourceneffizienz).

## ITSM-Prozessüberblick

Die vier ITSM-Stufen greifen als Kette ineinander:

| Prozess                                             | Aufgabe                                                     |
| --------------------------------------------------- | ----------------------------------------------------------- |
| [**Incident Management**](./incident-management.md) | Nimmt Störungen auf und filtert Probleme heraus             |
| [**Problem Management**](./problem-management.md)   | Ermittelt Problemursachen, ermöglicht ggf. einen Workaround |
| [**Change Management**](./change-management.md)     | Genehmigt und plant sinnvolle Änderungen                    |
| [**Release Management**](./release-management.md)   | Führt Änderungen sicher durch                               |

**Grund für diese Zerlegung:** Die Prozessanordnung (Orchestrierung) zielt auf Nachhaltigkeit und bringt Struktur in den komplexen Ablauf.

## ITSM-Prozesse und [IMAC/R/D-Phasen](./service-types.md#imacrd-lebenszyklus)

| IMAC/R/D-Tätigkeit | Zuständige ITSM-Prozesse                                                       |
| ------------------ | ------------------------------------------------------------------------------ |
| Wartung            | Change Management, Release Management                                          |
| Inspektion         | Problem Management, Change Management, Release Management                      |
| Instandsetzung     | Incident Management, Problem Management, Change Management, Release Management |
| Verbesserung       | Change Management, Release Management                                          |
