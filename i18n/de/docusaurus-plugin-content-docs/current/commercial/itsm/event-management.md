---
title: Event Management
description: "Die drei Typen von IT-Events (Information, Warning, Exception) und deren Management im ITSM"
keywords:
  - "Event Management"
  - "Statusmeldung"
  - "Information"
  - "Warning"
  - "Exception"
  - "Monitoring"
  - "ITSM"
---

# Event Management

## Überblick

**Events** benötigen keine direkte Meldung vom Anwender. Sie werden vom Überwachungssystem automatisch generiert und stellen Statusmeldungen über den Zustand eines Systems dar. Der Begriff „Event" kann als Auslöser oder ankommende Mitteilung interpretiert werden, die je nach Relevanz unterteilt wird.

Eine Softwareunterstützung ermöglicht eine Filterung und kann so konfiguriert werden, dass Ausnahmemeldungen schnellstmöglich an Verantwortliche weitergeleitet werden.

## Event-Typen

### Information

Eine **Statusmeldung über ein System ohne Handlungsbedarf**.

Das System läuft normal, es ist kein Eingriff notwendig.

**Beispiel:** Netzwerkauslastung liegt zwischen 45 % und 48 %.

### Warning

Eine **Statusmeldung mit der Notwendigkeit der genauen weiteren Beobachtung**; Handlungsbedarf kündigt sich bereits an. Die Warnung signalisiert, dass sich ein Problem anbahnt.

**Beispiel:** RAID-Datenverbund meldet eine Restkapazität von 20 %.

### Exception

Eine **Statusmeldung, die einen umgehenden Handlungsbedarf mit sich bringt**. Das System oder der Service ist ausgefallen oder hat einen kritischen Schwellenwert überschritten. Exception-Events führen typischerweise zu einem [Incident](./incident-management.md).

**Beispiel:** 48-Port-Netzwerkswitch ist ausgefallen.

## Beispiele zur Event-Einordnung

| Event                                                               | Typ         | Begründung                                                        |
| ------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| Festplattenkapazität zu 80 % erschöpft                              | Warning     | Noch kein Problem, aber könnte bald eines werden                  |
| Netzwerk läuft stabil mit einer Auslastung von 40 %                 | Information | Normaler Systemzustand                                            |
| Webbasiertes ERP-System nicht erreichbar                            | Exception   | Ausfall mit sofortigem Handlungsbedarf                            |
| Web-Server läuft stabil mit einer Auslastung von 85 %               | Warning     | Hohe Auslastung, nähert sich kritischem Bereich                   |
| 48 von 50 User-CAL-Lizenzen vergeben                                | Warning     | Lizenzgrenze fast erreicht; wird zur Exception bei Überschreitung |
| 52 Geräte melden sich an, aber nur 50 Device-CAL-Lizenzen vorhanden | Exception   | Lizenzgrenze überschritten                                        |
