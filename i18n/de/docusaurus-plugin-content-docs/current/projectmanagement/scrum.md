---
title: "Scrum"
description: "Scrum ist ein agiles Framework zur Entwicklung komplexer Produkte durch kurze Iterationen, klare Rollen und regelmäßige Reflexion."
keywords:
    - SCRUM
    - Agil
    - Sprints
tags:
    - ap2
---

# Scrum

## Überblick

Scrum ist ein **agiles Framework** zur Entwicklung komplexer Produkte. Es wird besonders häufig in der Softwareentwicklung eingesetzt und basiert auf kurzen Iterationen, den sogenannten **Sprints**, klaren **Rollen** und regelmäßiger **Reflexion**.

---

## Die 3 Rollen

Ein Scrum-Team besteht aus einem Product Owner, einem Scrum Master und den Developers. Es hat in der Regel höchstens 10 Mitglieder und keine Teilteams oder Hierarchien. Diese Rollen werden auch als **Verantwortlichkeiten** (Accountabilities) bezeichnet.

### Product Owner (PO)

Der Product Owner ist die **einzige für das Produkt verantwortliche Person**. Der Product Owner vertritt die Interessen der Stakeholder.

**Aufgaben**:

- Pflegt und priorisiert das Product Backlog
- Definiert Anforderungen (User Storys)
- Entscheidet, was gebaut wird
- Prüft Ergebnisse

### Scrum Master

Der Scrum Master ist **für den Prozess selbst verantwortlich**. Der Scrum Master ist keine klassische Führungskraft, sondern ein **Servant Leader**.

**Aufgaben**:

- Stellt sicher, dass Scrum korrekt angewendet wird
- Beseitigt Hindernisse (Impediments)
- Coacht das Team
- Moderiert Meetings

### Developers

Die Developers sind die Personen im Scrum-Team, die **die Anforderungen umsetzen**. Das Scrum-Team ist **selbstmanagend**: Es entscheidet intern, wer was wann und wie erledigt, ohne Vorgaben von außen.

- Interdisziplinär
- Erstellen das Sprint Backlog
- Erstellen pro Sprint mindestens ein nutzbares Inkrement

---

## Die 5 Events

### Sprint

Ein Sprint ist ein **fester Zeitraum**, in dem das Team an einer Reihe von Aufgaben arbeitet. Er ist der **Herzschlag von Scrum** und gibt einen regelmäßigen Rhythmus für Planung, Umsetzung und Überprüfung der Arbeit vor.

- **Dauer:** höchstens 1 Monat (üblich sind 2-4 Wochen)
- **Ziel:** Fertiges, nutzbares Inkrement

**Wichtig**: Während eines Sprints sollten keine Änderungen vorgenommen werden, die das Sprint-Ziel gefährden.

### Sprint Planning

Zu Beginn jedes Sprints trifft sich das **gesamte Scrum-Team**, um festzulegen, welche Arbeit übernommen wird. Das Team wählt Einträge aus dem Product Backlog aus und erstellt einen Plan, wie diese geliefert werden.

**Ergebnis**:

- Sprint-Ziel
- Sprint Backlog

### Daily Scrum / Daily Standup

Das Daily Scrum ist ein **kurzes Synchronisationsmeeting**, in dem sich die Developers über den Fortschritt abstimmen und Blocker identifizieren. Es wird auch „Standup“ genannt, weil die Teilnehmenden oft stehen, um das Meeting kurz zu halten und die **Timebox von 15 Minuten** einzuhalten.

- **Dauer:** 15 Minuten
- **Teilnehmende:** die Developers

Eine feste Struktur ist nicht vorgeschrieben. Verbreitet sind drei Fragen:

- Was habe ich gestern gemacht?
- Was mache ich heute?
- Gibt es Hindernisse?

### Sprint Review

Am Ende jedes Sprints **präsentiert das Team das fertige Inkrement** den Stakeholdern. Ziel ist es, **Feedback** einzuholen und gemeinsam über die nächsten Schritte für das Produkt zu entscheiden.

- Präsentation der Ergebnisse
- Feedback der Stakeholder
- Anpassung des Product Backlogs

### Sprint Retrospective (Retro)

Die Retrospektive ist ein **internes Meeting**, in dem das Scrum-Team den vergangenen Sprint reflektiert. Ziel ist es, **konkrete Verbesserungen** für den nächsten Sprint zu identifizieren, womit sie das zentrale Event für kontinuierliche Verbesserung ist.

Typische Fragen:

- Was lief gut?
- Was lief schlecht?
- Was können wir verbessern?

---

## Die 3 Artefakte

Jedes Artefakt hat ein **Commitment**, an dem sein Fortschritt gemessen wird: das Product Backlog das [Produkt-Ziel](#produkt-ziel), das Sprint Backlog das [Sprint-Ziel](#sprint-ziel) und das Inkrement die [Definition of Done](#definition-of-done-dod).

### Product Backlog

Das Product Backlog ist die **einzige verbindliche Quelle** für alle Arbeiten, die am Produkt anfallen. Es ist ein **lebendes Dokument**, das sich mit dem Produkt und seinem Umfeld weiterentwickelt.

- Eine priorisierte Liste aller Anforderungen
- Wird vom Product Owner gepflegt
- Einträge meist in Form von User Storys (z.B. „Als Nutzer möchte ich X, damit Y“)

### Sprint Backlog

Das Sprint Backlog enthält die für den aktuellen Sprint ausgewählte **Teilmenge des Product Backlogs**, das [Sprint-Ziel](#sprint-ziel) und einen Plan, wie die ausgewählten Einträge geliefert werden.

- Enthält die Aufgaben für den aktuellen Sprint
- Wird von den Developers erstellt
- Konkret und umsetzbar

### Inkrement

Ein Inkrement ist ein **konkreter Schritt** in Richtung [Produkt-Ziel](#produkt-ziel) und baut auf allen vorherigen Inkrementen auf. Innerhalb eines Sprints können mehrere Inkremente entstehen, deren Summe im Sprint Review präsentiert wird. Jedes Inkrement muss sich in einem **nutzbaren Zustand** befinden, unabhängig davon, ob der Product Owner sich für eine Veröffentlichung entscheidet.

- Fertiger, getesteter Produktbestandteil
- Muss die [Definition of Done (DoD)](#definition-of-done-dod) erfüllen

---

## Wichtige Begriffe

### Definition of Done (DoD)

Die Definition of Done ist eine **gemeinsame Vereinbarung** im Team, die klare Kriterien dafür festlegt, wann ein Backlog-Eintrag als „fertig“ gilt. Sie sichert eine **gleichbleibende Qualität** und verhindert, dass unfertige Arbeit ausgeliefert wird.

**Beispiel**:

- Code geschrieben
- Tests grün
- Review durchgeführt
- Dokumentation aktualisiert

### Produkt-Ziel

Das Produkt-Ziel beschreibt einen **zukünftigen Zustand des Produkts** und dient dem Scrum-Team als langfristiges Ziel. Das Scrum-Team verfolgt immer genau ein Produkt-Ziel. Es muss erfüllt oder verworfen werden, bevor das nächste angegangen wird.

### Sprint-Ziel

Das Sprint-Ziel ist ein **übergeordnetes Ziel**, das dem Team eine gemeinsame Richtung für den Sprint gibt. Es sollte ein **sinnvolles Ergebnis** beschreiben und keine Liste von Aufgaben.

Nicht „5 Tickets abschließen“, sondern z.B.:

- „Nutzer können sich registrieren und anmelden“
- „Nutzer können über einen eigenen Button Feedback geben“

### Velocity

Die Velocity misst die **durchschnittliche Anzahl an Story Points**, die ein Team pro Sprint abschließt. Sie dient als **Planungswerkzeug**, um abzuschätzen, wie viel Arbeit in künftigen Sprints realistisch übernommen werden kann. Sie ist kein Werkzeug für Leistungsrankings.

### Story Points

Story Points sind eine **relative Schätzeinheit**, die den Gesamtaufwand für die Umsetzung eines Backlog-Eintrags ausdrückt. Statt in Stunden zu schätzen, **vergleichen Teams die Einträge untereinander**.

- Oft Fibonacci (1, 2, 3, 5, 8, 13, ...)
- Berücksichtigt Komplexität, Risiko und Aufwand

---

## Typischer Sprint-Ablauf

1. [Sprint Planning](#sprint-planning)
2. Entwicklung + [Daily Standups](#daily-scrum--daily-standup)
3. [Sprint Review](#sprint-review)
4. [Sprint Retro](#sprint-retrospective-retro)
5. Neuer Sprint

---

## Vor- und Nachteile von Scrum

### Vorteile

- Schnelle Lieferung von Mehrwert
- Hohe Flexibilität
- Frühes Feedback durch Stakeholder
- Transparenz
- Kontinuierliche Verbesserung

### Nachteile

In der Praxis wird Scrum oft falsch umgesetzt. Das führt zu typischen Anti-Patterns:

- Falsch verstandene Rolle des Product Owners
- Scrum Master als „Mini-Chef“
- Daily als langes Statusmeeting für Manager
- Kein echtes Selbstmanagement
- „Wir machen Scrum, aber...“

---

## Unterschied zum klassischen Projektmanagement (z.B. Wasserfallmodell)

| Wasserfall                        | Scrum                                        |
| --------------------------------- | -------------------------------------------- |
| Feste Planung zu Beginn           | Iteratives Vorgehen                          |
| Änderungen sind teuer             | Änderungen sind eingeplant                   |
| Eine einzige Auslieferung         | Regelmäßige Updates durch Inkremente         |
| Starke Hierarchie                 | Selbstmanagend                               |
