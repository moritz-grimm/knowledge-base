---
title: Problem Management
description: "Problem Management im ITSM: Unterschied zwischen Incidents und Problemen, Problem Control, Error Control, Proaktives Problem Management und wichtige KPIs"
keywords:
  - "Problem Management"
  - "Known Error"
  - "Known Error Database"
  - "Workaround"
  - "Problem Control"
  - "Error Control"
  - "Proaktives Problem Management"
  - "Ursachenanalyse"
sidebar_position: 2
---

# Problem Management

## Überblick

Das Problem Management ist die **2. Ebene des Incident Managements**. Während das Incident Management die schnellstmögliche Wiederherstellung des Service anstrebt, ermittelt das Problem Management die zugrundeliegende Ursache, um zukünftige Incidents zu verhindern.

## Incident vs. Problem vs. Known Error

| Begriff         | Definition                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **Incident**    | Ungeplante Serviceunterbrechung; Ursache kann unbekannt sein; Service wird prioritär wiederhergestellt |
| **Problem**     | Ein oder mehrere Incidents mit **unbekannter Ursache**; wird von Fachleuten untersucht                 |
| **Known Error** | Ein Problem, dessen Ursache bekannt ist und für das ein Workaround oder eine Lösung existiert          |

Wenn im First Level Support keine Lösung gefunden werden kann, wird das Ticket **eskaliert**: Der Incident wird zum Problem, das vom Second Level Support bearbeitet wird.

## Die drei Aktivitäten des Problem Managements

### 1. Problem Control

Alle Probleme werden grundlegend analysiert und dokumentiert. Ziel ist es, unbekannte Ursachen in **Known Errors** umzuwandeln.

Schritte:

1. Problem aufzeichnen und mit der Known Error Database abgleichen
2. Wenn Workaround/Lösung bereits bekannt => Known Error, Vorfallszähler erhöhen
3. Problem klassifizieren (Kategorie, Unterkategorie, Priorität, Auswirkung)
4. Ursache ermitteln (siehe [Analysemethoden](./analysis-methods.md))
5. Ergebnis als neuen Known Error in der KEDB erfassen

### 2. Error Control

Sobald ein Known Error vorliegt, steuert Error Control den Weg vom Workaround zur dauerhaften Lösung.

- **Workaround** wird sofort bereitgestellt, um den Service wiederherzustellen
- Dauerhafte Lösung über einen **[RFC](./change-management.md#request-for-change-rfc)** eingeleitet
- Nach Umsetzung der Änderung erhält das Problem Management die Bestätigung über einen **[Post Implementation Review (PIR)](./change-management.md#änderungen-abschließen-pir)**
- Der First Level Support wird informiert, damit er den Kunden benachrichtigen kann

### 3. Proaktives Problem Management

Probleme erkennen, bevor Incidents auftreten:

- Häufig wiederkehrende Known Errors analysieren (hoher Vorfallszähler = Kandidat für Proaktives PM)
- Hinweise von Herstellern über bevorstehende Software-/Hardwareprobleme auswerten
- Automatisierte Warnungen und Ausnahmen überwachen

## Workaround

Ein **Workaround** ist eine Problemumgehung, Not-/Behelfs-/Alternativlösung, um den Service übergangsweise schnell wieder aufzunehmen, während die eigentliche Ursache noch behoben wird.

**Wichtig:** Workarounds müssen im System klar als Übergangslösung markiert werden, damit das Provisorium nicht zur Dauerlösung wird.

**Beispiele:**

| Störung                                  | Workaround                                           |
| ---------------------------------------- | ---------------------------------------------------- |
| Integrierte Webcam des Notebooks defekt  | USB-Kamera anschließen                               |
| Mobiles Datenerfassungsgerät defekt      | Leihgerät verwenden                                  |
| Kabelgebundener Netzwerkanschluss defekt | WLAN-Stick oder LAN-Adapter verwenden                |
| DVI-Monitoranschluss defekt              | Ggf. andere Schnittstelle (DisplayPort, HDMI) nutzen |
| Laserdrucker startet nicht               | Vom Strom nehmen und erneut starten                  |
| Browser zeigt nur weiße Seite            | Browsercache löschen oder anderen Browser verwenden  |

## Known Error Database (KEDB)

Die KEDB speichert alle bekannten Probleme mit ihrem Workaround oder ihrer Lösung. Der First Level Support nutzt sie, um schnell Hilfe bereitstellen zu können, ohne zum Second Level eskalieren zu müssen.

Jeder Eintrag hat einen **Vorfallszähler**, der erfasst, wie oft das Problem auftritt. Ein hoher Zählerstand ist ein Kandidat für das Proaktive Problem Management.

## Wichtige KPIs

| KPI                                       | Bedeutung                                                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Number of New Problems**                | Summe erfasster Probleme einer Periode; Proaktives PM zielt darauf ab, diesen Wert zu minimieren, indem Fehler behoben werden, bevor sie zu Incidents werden                               |
| **Number of Incidents per Known Problem** | Durchschnittliche Anzahl gleichartiger Incidents im Zusammenhang mit demselben Problem; zeigt, wie hoch die tatsächliche Auswirkung war, und identifiziert Kandidaten für das Proaktive PM |
| **Problem Resolution Effort**             | Mittlerer Arbeitsaufwand für die Lösung eines Problems, aufgeschlüsselt nach Kategorien; zeigt, welche Kategorien einen besonders hohen Lösungsaufwand bedeuten                            |

## Trennung von Problemlokalisierung und Problemlösung

Das Problem Management lokalisiert die Ursache, das [Change Management](./change-management.md) behebt sie. Diese Trennung ermöglicht es:

- Sich zunächst auf eine Sache zu konzentrieren, bevor die nächste beginnt
- Den Service (Workaround) wiederherzustellen, bevor die Ursachenermittlung abgeschlossen ist
- Nicht zwangsläufig verschiedene Teams einzusetzen, sondern lediglich die Prozessabläufe zu trennen
