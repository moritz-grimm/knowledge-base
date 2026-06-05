---
title: Service Level Agreement (SLA)
description: "Aufbau und Inhalt von Service Level Agreements (SLAs), Service Level Management, die Rollen von Service Level Manager und Service Owner sowie OLAs"
keywords:
  - "SLA"
  - "Service Level Agreement"
  - "Service Level Management"
  - "OLA"
  - "Operational Level Agreement"
  - "Service Level Manager"
  - "KPI"
  - "Reaktionszeit"
---

# Service Level Agreement (SLA)

## Überblick

Ein **SLA (Service Level Agreement)** ist ein Vertrag zwischen einem IT-Service-Provider und einem Kunden, der den Umfang, die Qualität und die Bedingungen der erbrachten IT-Services festlegt.

## Typischer SLA-Aufbau

### 1. Beschreibung / Leistungsumfang

Legt fest, welche IT-Probleme abgedeckt werden, wie die Lösung erfolgt und welche Supportkanäle genutzt werden (Telefon, E-Mail). Enthält außerdem die abgedeckte Hardware und Systeme.

### 2. [Prioritäten](./priorities.md)

Drei oder mehr Prioritätsstufen mit unterschiedlichen Reaktionszeiten. Beispiel:

| Priorität   | Reaktionszeit                        |
| ----------- | ------------------------------------ |
| Priorität 1 | 1 Arbeitsstunde, Express-Zuschlag    |
| Priorität 2 | 5 Arbeitsstunden, Standard-Priorität |
| Priorität 3 | 1 Arbeitstag                         |

**Reaktionszeit:** Zeitspanne zwischen der Störungsmeldung am [Helpdesk](./service-requests.md) durch den Anwender und der Aufnahme der Arbeiten für die Problemlösung durch die entsprechende Supportstelle.

### 3. Servicezeiten

| Tag                 | Uhrzeit             |
| ------------------- | ------------------- |
| Mo–Fr               | 07:00–20:00 Uhr     |
| Samstag             | 09:00–18:00 Uhr     |
| Sonn- und Feiertage | Kein Betrieb        |
| Erweiterte Zeiten   | Auf Anfrage möglich |

### 4. Sprachen

Unterstützte Sprachen für den Support (z.B. Deutsch, Englisch).

### 5. Qualitätsgröße Anrufannahme

| Kennzahl                               | Zielwert                                      |
| -------------------------------------- | --------------------------------------------- |
| Beantwortete Anrufe                    | 95 % aller eingehenden Anrufe, < 5 % verloren |
| Innerhalb 20 Sekunden entgegengenommen | 75 %                                          |
| Innerhalb 40 Sekunden entgegengenommen | 90 %                                          |
| Per Voicemail beantwortet              | Maximal 10 %                                  |

### 6. Qualitätsgröße Problemlösung

| Kennzahl                                         | Zielwert                          |
| ------------------------------------------------ | --------------------------------- |
| Durchschn. Bearbeitungszeit für Anrufe           | Höchstens 30 Minuten              |
| Zwischenbericht wenn nicht beantwortet innerhalb | 4 Stunden                         |
| Durchschn. Bearbeitungszeit bei Störungen        | Höchstens 2 Stunden               |
| Maximale Bearbeitungszeit                        | 3 Tage                            |
| Mindestlösungsquote                              | 70 % innerhalb von 2 Arbeitstagen |

### 7. Qualitätsgröße Kundenzufriedenheit

Erfassung über Online-Fragebogen und Trailer-Calls (Rückruf und Auswertung bei 10 % der Anrufer).

### 8. Reporting

Monatliche Überprüfung; viermal pro Jahr statistische Erfassung und Auswertung.

### 9. Gültigkeit und Dauer

Gibt die Laufzeit des SLA und den Zeitpunkt der Nachverhandlung an (z.B. „gültig bis 1. August 20xx").

### 10. Vertragspartner

Anbieter und Kunde unterschreiben das Vereinbarung jeweils.

## Service Level Management (SLM)

Das **SLM** stellt sicher, dass SLAs mit Kunden abgeschlossen werden und dass Services so gestaltet sind, dass die vereinbarten Service Levels eingehalten werden.

**Aufgaben:**

- Erfassen von Service-Anforderungen
- Prüfen, ob die vereinbarten Service Levels erreicht werden
- Bereitstellung von Informationen im Service-Level-Bericht

## Rollen

### Service Level Manager

Der Prozess-Verantwortliche für das Service Level Management.

Verantwortlichkeiten:

- Verhandelt SLAs
- Stellt sicher, dass diese erfüllt werden
- Gewährleistet, dass alle ITSM-Prozesse, OLAs und Verträge mit Drittparteien geeignet sind, die vereinbarten Service Levels zu erreichen
- Überwacht die Service Levels und stellt entsprechende Reports zur Verfügung

### Service Owner (Serviceverantwortlicher)

Verantwortlich für die Erbringung eines Infrastruktur-Services im Rahmen der vereinbarten Service Levels.

Verantwortlichkeiten:

- Tritt als Verhandlungspartner des Service Level Managers auf, wenn es um die Vereinbarung von OLAs geht
- Ist häufig eine Führungskraft, die ein Team technischer Spezialisten oder einen internen Support-Bereich leitet

## OLA (Operational Level Agreement)

Ein **OLA** ist eine interne Vereinbarung zwischen IT-Teams bzw. -Abteilungen über die Leistungserbringung auf Betriebsebene. OLAs unterstützen die Einhaltung der externen SLAs.
