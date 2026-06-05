---
title: Change Management
description: "Change Management im ITSM: RFC, Change-Typen (Standard, Normal, Notfall), Genehmigungsgremien (CAB, CIO, EC/ECAB), FSC, CMDB und PIR"
keywords:
  - "Change Management"
  - "RFC"
  - "Request for Change"
  - "CAB"
  - "Change Advisory Board"
  - "Standard Change"
  - "Normaler Change"
  - "Notfall Change"
  - "CMDB"
  - "FSC"
  - "PIR"
sidebar_position: 3
---

# Change Management

## Überblick

Das **Change Management** ist die dritte Stufe des ITSM. Es kümmert sich um die Genehmigung und Planung anstehender Änderungen im IT-System.

**Ziel:** Sicherstellen, dass Änderungen nicht überstürzt und ohne Gesamtüberblick durchgeführt werden. Fachleute verschiedener Bereiche sollen Risiken bewerten, um Folgefehler zu vermeiden. Nur beim Notfall-Change kann darauf verzichtet werden, da dort die maximal schnelle Wiederherstellung des Systems an oberster Stelle steht.

## Request for Change (RFC)

Bevor eine Änderung umgesetzt wird, erstellt das [Problem Management](./problem-management.md) einen **Request for Change (RFC)**. Der RFC ist ein formeller Antrag zur Durchführung einer Änderung. Er enthält:

- Beschreibung der Veränderungsanforderung
- Grund der Durchführung
- Zeitvorgabe
- Priorität
- Befürchtete Nebeneffekte (Side Effects)
- Mögliche Kosten

Der RFC beschreibt **was** getan werden soll, nicht **wie** es durchgeführt wird, da die Art und Weise im nachfolgenden Change-Management-Prozess erarbeitet wird.

## RFC-Priorisierung

Eingehende RFCs werden nach **Dringlichkeit** und **Auswirkung** priorisiert:

### Dringlichkeitsstufen

| Stufe                  | Beschreibung                     |
| ---------------------- | -------------------------------- |
| **Priority Low**       | Unbedeutend, aber wünschenswert  |
| **Priority Middle**    | Notwendig, aber nicht dringend   |
| **Priority High**      | Unverzügliches Handeln notwendig |
| **Priority Immediate** | Sofortiges Handeln notwendig     |

### Auswirkungsstufen

| Stufe             | Beschreibung                                               | Beispiel                                        |
| ----------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| **Effect Low**    | Geringe Auswirkung auf die IT-Dienstleistung, kaum Aufwand | Austausch eines PC's                            |
| **Effect Middle** | Mittlere Auswirkung, erhöhter Aufwand                      | Betriebssystem aller PCs auf neue Version heben |
| **Effect High**   | Hohe Auswirkung, sehr hoher Aufwand                        | Kompletter Serverausfall                        |

## Change-Typen

| Typ                                   | Merkmale                                                                                                                                | Genehmigung           |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **Standard Change**                   | Vorab autorisierte Routineänderungen aus einem Katalog; geringes Risiko; automatisch autorisiert                                        | Change Manager allein |
| **Normaler Change**                   | Mittleres Risiko, mittlere Dringlichkeit, mittlere Komplexität; erfordert Bewertung durch Experten                                      | CAB + CIO             |
| **Notfall Change (Emergency Change)** | Hohe Dringlichkeit, kurzfristige Lösung erforderlich; strukturiertes Genehmigungsverfahren wird zugunsten der Schnelligkeit vereinfacht | EC / ECAB             |

## Genehmigungsgremien

| Gremium                             | Beschreibung                                                                                                                                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Change Manager (CM)**             | Entscheidet allein über Änderungen geringer Reichweite (Standard Change); verantwortlich für zeitlich gesteuerte Umsetzung und Überwachung                              |
| **Change Advisory Board (CAB)**     | Expertenteam aus verschiedenen Unternehmensbereichen; entscheidet über Änderungen mittlerer Reichweite (Normaler Change)                                                |
| **Chief Information Officer (CIO)** | Auf Geschäftsführungs- oder Vorstandsebene angesiedelte Person, die die Interessen der IT vertritt; beteiligt bei Entscheidungen mit großer Tragweite (z.B. Schulungen) |
| **Emergency Committee (EC / ECAB)** | Kleines, mit weitreichenden Handlungsbefugnissen ausgestattetes Experten-Team für dringende Fälle; bearbeitet Notfall-Changes                                           |

## Änderungen planen

### Forward Schedule of Change (FSC)

Ein Kalender, in dem alle langfristigen geplanten Änderungen dokumentiert werden. Es sollte immer so geplant werden, dass die Ausfallzeit möglichst geringgehalten wird.

### Configuration Management Database (CMDB)

Eine zentrale Datenbank, in der alle CI mit entsprechender Ausstattung und Lizenznummer hinterlegt sind. Alle Änderungen an CIs werden hier zentral dokumentiert.

Der Change Manager (CM) ist verantwortlich für die zeitlich gesteuerte Umsetzung und Überwachung der Änderungen.

## Änderungen genehmigen und ausführen

Die bewusste Trennung zwischen Einordnen/Genehmigen und Planen/Ausführen einer Änderung dient dazu:

- Nachhaltige Entscheidungen durch Fachleute zu treffen, die das Gesamtsystem berücksichtigen
- Reaktives Fehlerbeheben ohne Gesamtüberblick zu verhindern
- Dokumentierte Verantwortlichkeiten sicherzustellen

## Änderungen abschließen (PIR)

Nach der Umsetzung dokumentiert das Change Management alle Maßnahmen und die Fehlerursache in der CMDB und der Known Error Database für zukünftige Fehler.

Der **Post Implementation Review (PIR)** dokumentiert alle markanten Punkte des Changes:

- Testverlauf
- Umsetzungsdetails
- Veränderungen zum vorherigen Systemzustand
- Kosten und Aufwand
- Zeitangaben

**Ziel des PIR:** Kontinuierliche Verbesserung durch Analyse und Bewertung durchgeführter Änderungen.

## Zusammenfassung: Change-Typen und Genehmigung

| Change-Typ      | Genehmigungsgremium | Wesentliches Merkmal                                         |
| --------------- | ------------------- | ------------------------------------------------------------ |
| Standard Change | Change Manager      | Katalogbasiert, vorab genehmigt, geringes Risiko             |
| Normaler Change | CAB + CIO           | Mittleres Risiko, CAB beteiligt                              |
| Notfall Change  | EC / ECAB           | Maximale Schnelligkeit, strukturiertes Verfahren vereinfacht |
