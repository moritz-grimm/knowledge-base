---
title: Serviceanfragen einordnen
description: "Die drei Typen eingehender Serviceanfragen im ITSM: Events, Service Requests und Incidents, sowie die Rolle des Helpdesks als SPOC"
keywords:
  - "Serviceanfrage"
  - "Incident"
  - "Event"
  - "SPOC"
  - "Helpdesk"
  - "First Level Support"
  - "Issue-Tracking-System"
  - "Knowledge Base"
---

# Serviceanfragen einordnen

## Überblick

Alle eingehenden Meldungen treffen am zentralen Punkt der IT-Organisation ein: dem **Single Point of Contact (SPOC)**, auch **Helpdesk** genannt. Der Helpdesk kann unternehmenslokal, dezentral oder virtuell organisiert sein (mehrere Helpdesks bilden nach außen einen zentralen). Diese erste Ebene der Hilfestellung wird auch **First Level Support** bezeichnet.

Eingehende Meldungen werden grundlegend in drei Typen eingeteilt:

## Die drei Typen

### [Statusmeldung (Event)](./event-management.md)

Eine **automatisch generierte Meldung** zum Zustand eines Systems. Diese eingehenden Meldungen werden auch **Events** genannt und erfordern keine direkte Meldung durch einen Anwender. Sie werden vom Überwachungssystem generiert.

### Kundenanfrage (Service Request)

Eine **formale Anfrage eines Anwenders** bzw. Unterstützungsanfrage, auch **Service Request** genannt. Dazu zählen allgemeine Fragen, vergessene Passwörter, Bedienungshinweise zu einem Programm oder der Wunsch nach neuer Hardware.

### [Störungsfall (Incident)](./incident-management.md)

Eine **Meldung einer nicht geplanten Unterbrechung** eines Service, im ITSM auch als **Incident** bezeichnet.

## Issue-Tracking-System

Das **Issue-Tracking-System** des Helpdesks verwaltet alle eingehenden Anfragen und weist diese automatisiert freien Helpdesk-Mitarbeitern zu. Es ermöglicht einen detaillierten Überblick über die Störungs- und Anfragehistorie.

Auch genannt: **Helpdesk-System** oder **Support-Ticketing-System**.

Prozessablauf:

```text
Kundenanfrage / Störungsmeldung
=> Serviceticket anlegen
=> Klassifizieren und priorisieren (HW / SW / NW, Dringlichkeit, Auswirkung)
=> An zuständiges Team weiterleiten
=> Lösung finden und bereitstellen
=> Dokumentieren und abschließen (inkl. kaufmännische Aspekte via CRM-Verknüpfung)
```

Zweck der Kategorisierung und Priorisierung: Die richtige zuständige Abteilung kann agieren und einschätzen, wie wichtig das Problem ist.

## Knowledge Base

Ein **wissensbasiertes, informationsverarbeitendes Unterstützungssystem** zum selbstständigen Nachlesen. Helpdesk-Mitarbeiter nutzen sie, um schnell Lösungen für bekannte Probleme ([Known Errors](./problem-management.md#known-error-database-kedb)) zu finden.

| Vorteile                                                                                                           | Nachteile                                                          |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Schnelle Antwort auf einfache, wiederkehrende Probleme                                                             | Wissen „veraltet" => Dokumentation und Datenpflege arbeitsintensiv |
| Wissen verbleibt im Unternehmen, auch wenn Mitarbeiter das Unternehmen verlassen => Wissenslücken werden vermieden | Nicht für jedes Problem gibt es eine passende Lösung               |
| Kostengünstige Fehlerbehebung                                                                                      | Weniger Interaktionen mit dem Kunden                               |

## Request-Fulfillment-Prozess

Der Teilprozess **Request Fulfillment** bearbeitet Service Requests (Kundenanfragen). Ziel ist die effiziente Bearbeitung geringfügiger Änderungen und Benutzeranfragen.

- Verantwortlich: First Level Support
- Benötigte Systeme: Issue-Tracking-System, Knowledge Base, Handbuch
- Auslöser: Kunde wendet sich mit einer Anwenderfrage an den Support
- Entscheidungspunkt: Anwenderfrage einordnen (Hilfestellung / Änderungswunsch / Passwortanfrage)
