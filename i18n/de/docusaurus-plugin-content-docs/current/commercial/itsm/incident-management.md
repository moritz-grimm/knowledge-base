---
title: Incident Management
description: "Incident Management im ITSM: Configuration Items, Kategorisierung, Priorisierung, Incident Record, Major Incident und Support-Ebenen"
keywords:
  - "Incident Management"
  - "Configuration Item"
  - "CI"
  - "Incident Record"
  - "Major Incident"
  - "First Level Support"
  - "Service Request"
  - "Issue-Tracking-System"
sidebar_position: 1
---

# Incident Management

## Überblick

Das **Incident Management** ist die **erste Stufe des ITSM**, mit dem Ziel, Anwendern bei IT-Störungen so schnell wie möglich zu helfen, ihre Arbeit wieder aufzunehmen.

## Configuration Items (CI)

Ein **Configuration Item (CI)** ist ein übergreifender Begriff, der im Wesentlichen alle Hard- und Softwarekomponenten umfasst. CIs werden durch Attribute charakterisiert und stehen in Beziehung zu anderen CIs.

| Kategorie           | Beispiele                                              |
| ------------------- | ------------------------------------------------------ |
| Hardwaresysteme     | PC, Notebook, Server, Thin Client                      |
| Hardwarekomponenten | Grafikkarten, Netzwerkkarten, Festplatten, Prozessoren |
| Softwarekomponenten | Betriebssysteme, Anwendungssoftware                    |
| Netzwerkkomponenten | Router, Switch, Hub, Repeater, Patchfeld, NAS          |
| Peripheriegeräte    | Drucker, Scanner, Webcam                               |
| Mobile Geräte       | Tablet, Smartphone, Datenerfassungsgeräte              |

## Incident-Definition

Ein **Incident** ist jede ungeplante Unterbrechung oder Qualitätsminderung eines IT-Services. Auch ein Ereignis, das in der Zukunft einem IT-Service beeinträchtigen könnte, gilt als Incident. Selbst der Austausch einer leeren Tonerkartusche wird als Incident gewertet.

**Oberstes Ziel: den betroffenen Service so schnell wie möglich wiederherstellen.**

## Kategorisierung

Incidents werden bei der ersten Erfassung im Issue-Tracking-System kategorisiert:

- **HW** = Hardwareproblem
- **SW** = Softwareproblem
- **NW** = Netzwerkproblem

Zweck: Die richtige zuständige Abteilung kann agieren und einschätzen, wie wichtig das Problem ist.

## Priorisierung

Die Priorisierung ergibt sich aus zwei Faktoren:

- **Dringlichkeit (Urgency)**: Wie stark wirkt sich die Störung auf die Zielerreichung des Anwenders aus?
- **Auswirkung (Impact)**: Wie viele Personen sind von der Störung betroffen?

Die Kombination aus [Dringlichkeit und Auswirkung](./priorities.md#itil-prioritätsmatrix) bestimmt die Reihenfolge, in der eingehende Tickets bearbeitet werden.

## Support-Ebenen

| Ebene                    | Beschreibung                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **First Level Support**  | Helpdesk / SPOC; bearbeitet einfache Anfragen mit der Knowledge Base und fungiert als „Firewall" für den Second Level Support, da er die direkte Kundenkommunikation übernimmt |
| **Second Level Support** | Fachleute für die Ursachenforschung ([Problem Management](./problem-management.md)); bewertet die vom First Level vorgenommene Priorisierung neu                               |
| **Third Level Support**  | Herstellersupport oder externe Spezialisten, wenn der Second Level das Problem nicht lösen kann                                                                                |

## Incident Record

Der **Incident Record** ist ein Dokument mit allen Angaben zu einem Incident, in dem der Lebenszyklus des Incidents von der Ersterfassung bis zur Fertigstellung dokumentiert ist. Es ist ein Informationsdokument, das nach Abschluss der Prozessinstanz nicht mehr verändert werden darf.

Die 17 Standardfelder:

1. Kennung / ID
2. Ersterfassung (Datum/Uhrzeit)
3. Art der Benachrichtigung
4. Service-Desk-Agent
5. Melder-/Anwenderdaten
6. Kommunikationsweg
7. **Symptombeschreibung** (wichtigstes Feld, hilft bei der Diagnose und Recherche)
8. Betroffene Anwender, Standorte und/oder Geschäftsbereiche
9. Betroffene Services
10. Priorisierung
11. Bezug zu CIs
12. Incident-Kategorie
13. Links zu anderen Incident Records
14. Links zu Problem Records
15. Incident-Statushistorie
16. Aktivitäts-Historie / Tasks
17. Lösungs- und Abschlussdaten

**Die 5 wichtigsten Felder, die immer erfasst werden müssen:** Priorisierung, Incident-Kategorie, Kennung, betroffener Anwender/Service, Kommunikationsweg.

## Major Incident

Ein **Major Incident** ist ein hochpriorisiertes, hochwirksames Ereignis, das einen kritischen Serviceausfall oder eine massive Störung verursacht und den Geschäftsbetrieb erheblich beeinträchtigt. Er ist i.d.R. mit der Priorität „Kritisch" oder „Hoch" versehen.

Merkmale:

- Eine signifikante Anzahl von Kunden bzw. wichtigen Kundengruppen ist betroffen
- Die Kosten bzw. Verluste für Kunden und/oder die Service-Organisation sind beträchtlich
- Die Reputation des Service-Providers wird wahrscheinlich beschädigt
- Der Arbeits- und Zeitaufwand zur Lösung des Incidents ist vermutlich groß, und bestehende [SLAs](./sla.md) werden sehr wahrscheinlich verletzt

## Service Request vs. Incident

|                 | Service Request                                              | Incident                                            |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------- |
| **Auslöser**    | Anwender meldet sich aktiv mit einer Frage oder einem Wunsch | Ungeplante Service-Unterbrechung                    |
| **Beispiele**   | Vergessenes Passwort, Softwarefrage, neuer Arbeitsplatz      | Drucker fällt aus, ERP nicht erreichbar, Ransomware |
| **Bearbeitung** | Meist vollständig im First Level Support lösbar              | Ggf. Eskalation zum 2. / 3. Level notwendig         |
| **Prozess**     | Request Fulfillment                                          | Incident Management                                 |
