---
title: "Klassisches vs. agiles Projektmanagement"
description: "Plangetriebene Vorgehensmodelle (Wasserfallmodell, V-Modell, Spiralmodell) im Vergleich mit agilen Ansätzen (Agiles Manifest, Scrum, Kanban, XP), Vor- und Nachteile, Auswahlkriterien und hybride Ansätze."
keywords:
    - Klassisches Projektmanagement
    - Agiles Projektmanagement
    - Plangetrieben
    - Wasserfallmodell
    - V-Modell
    - V-Modell XT
    - Spiralmodell
    - Agiles Manifest
    - Kanban
    - Extreme Programming
    - Stacey-Matrix
    - Hybrides Projektmanagement
tags:
    - ap2
---

# Klassisches vs. agiles Projektmanagement

Ein **Vorgehensmodell** legt fest, in welcher Reihenfolge die Tätigkeiten eines Projekts ausgeführt werden, welche Ergebnisse jeder Schritt liefert und wer dafür verantwortlich ist. **Klassische** (plangetriebene, prädiktive) Modelle planen das gesamte Projekt zu Beginn und arbeiten es in Phasen ab. **Agile** (adaptive) Ansätze planen in kurzen Zyklen und passen den Plan an das an, was der jeweilige Zyklus gezeigt hat.

## Klassische Ansätze

### Merkmale

- Aufeinanderfolgende Phasen, die jeweils abgeschlossen werden, bevor die nächste beginnt, z.B. entlang der [Projektphasen](./projectphases.mdx)
- Detaillierte Planung von Umfang, Terminen und Budget zu Beginn, z.B. mit einem [Gantt-Diagramm](./gantt.md) oder einem [Netzplan](./network-plan.md)
- Anforderungen vor der Entwicklung schriftlich festgelegt, z.B. im [Lasten- und Pflichtenheft](./requirements-specification.md)
- Meilensteine und Quality Gates am Ende jeder Phase, an denen die Phasenergebnisse abgenommen werden
- Umfangreiche Dokumentation als Ergebnis jeder Phase und als Grundlage für die nächste
- Zentrale Rolle der Projektleitung, die die Arbeit plant, verteilt und kontrolliert
- Einbindung des Kunden hauptsächlich zu Beginn (Anforderungen) und am Ende (Abnahme)
- Änderungen über ein formales Änderungsmanagement (Change Request)

### Wasserfallmodell

Das Wasserfallmodell ordnet die Phasen in einer strengen Abfolge an: Anforderungsanalyse, Entwurf, Implementierung, Test, Betrieb und Wartung. Jede Phase endet mit einem Dokument, das als Eingabe für die nächste Phase dient, sodass sich der Fortschritt an klaren Punkten prüfen lässt und das Modell leicht zu steuern ist. Die erweiterte Variante erlaubt einen Rücksprung in die vorhergehende Phase, wenn ein Fehler gefunden wird, aber nicht über mehrere Phasen hinweg.

### V-Modell

Das V-Modell erweitert das Wasserfallmodell, indem es jeder **Spezifikationsebene** eine **Teststufe** zuordnet. Der linke Ast des V beschreibt das System mit zunehmendem Detailgrad, der rechte Ast integriert und testet es in umgekehrter Reihenfolge.

```text
Anforderungsanalyse  --------------------------------->  Abnahmetest
    Systementwurf  ------------------------------->  Systemtest
        Architekturentwurf  ------------->  Integrationstest
            Modulentwurf  ------->  Modultest
                         Implementierung
```

| Spezifikationsebene (linker Ast) | Teststufe (rechter Ast) | Vom Test beantwortete Frage                 |
| -------------------------------- | ----------------------- | ------------------------------------------- |
| Anforderungsanalyse              | Abnahmetest             | Erfüllt das System den Bedarf des Kunden?   |
| Systementwurf                    | Systemtest              | Erfüllt das Gesamtsystem die Spezifikation? |
| Architekturentwurf               | Integrationstest        | Arbeiten die Komponenten zusammen?          |
| Modulentwurf                     | Modultest (Unit-Test)   | Funktioniert jedes Modul korrekt?           |

Die Testfälle einer Ebene werden abgeleitet, während diese Ebene spezifiziert wird. Modul-, Integrations- und Systemtest **verifizieren** das Produkt gegen die Spezifikation ihrer Ebene (wird das Produkt richtig gebaut?), während der Abnahmetest es gegen den Bedarf des Kunden **validiert** (wird das richtige Produkt gebaut?).

### Spiralmodell

Das Spiralmodell von Barry Boehm (1986) gliedert das Projekt in wiederholte Zyklen. Jeder Zyklus durchläuft vier Quadranten:

1. Ziele, Alternativen und Rahmenbedingungen festlegen
2. Alternativen bewerten, Risiken erkennen und verringern, z.B. mit [Prototypen](../fundamentals/prototyping.md)
3. Ergebnis des Zyklus entwickeln und testen
4. Nächsten Zyklus planen

Das Modell ist **risikogetrieben**: Die größten Risiken werden zuerst angegangen, und nach jedem Zyklus wird entschieden, ob das Projekt fortgesetzt wird. Es ist iterativ, jeder Zyklus wird aber vorab vollständig geplant und dokumentiert, sodass es sich eher für große, riskante Projekte eignet und für kleine zu schwergewichtig ist.

### Vor- und Nachteile

**Vorteile:**

- Kosten und Termin lassen sich zu Beginn prognostizieren und vereinbaren.
- Klare Struktur, Zuständigkeiten und Meilensteine.
- Fortschritt lässt sich am Plan messen.
- Vollständige Dokumentation unterstützt Wartung, Audits und Zulassungsverfahren.
- Geringer Zeitaufwand für den Kunden während der Entwicklung.

**Nachteile:**

- Späte Änderungen sind teuer und erfordern ein formales Änderungsverfahren.
- Der Kunde sieht erst am Ende ein funktionierendes Ergebnis.
- Fehler in den Anforderungen werden spät entdeckt, wenn ihre Korrektur am meisten kostet.
- Das gesamte Projekt wird zu dem Zeitpunkt geschätzt, an dem am wenigsten darüber bekannt ist.
- Hoher Dokumentationsaufwand.

## Agile Ansätze

### Merkmale

- Iterative und inkrementelle Entwicklung in kleinen, nutzbaren Inkrementen
- Anforderungen als priorisierte Liste, die laufend verfeinert und umsortiert wird
- Kontinuierliche Einbindung des Kunden durch regelmäßige Reviews der Inkremente
- Selbstorganisierte, interdisziplinäre Teams statt einer Projektleitung, die Aufgaben zuweist
- Funktionierendes Produkt als Maßstab für den Fortschritt
- Regelmäßige Reflexion der Arbeitsweise (Inspect and Adapt)

### Agiles Manifest

Das **Manifest für Agile Softwareentwicklung** wurde 2001 von 17 Softwareentwicklern verfasst. Es nennt vier Werte:

| Höher geschätzt               | Niedriger geschätzt      |
| ----------------------------- | ------------------------ |
| Individuen und Interaktionen  | Prozesse und Werkzeuge   |
| Funktionierende Software      | Umfassende Dokumentation |
| Zusammenarbeit mit dem Kunden | Vertragsverhandlung      |
| Reagieren auf Veränderung     | Befolgen eines Plans     |

Das Manifest ergänzt: „Obwohl wir die Werte auf der rechten Seite wichtig finden, schätzen wir die Werte auf der linken Seite höher ein.“

Die zwölf Prinzipien hinter dem Manifest in verkürzter Form:

1. Den Kunden durch frühe und kontinuierliche Auslieferung wertvoller Software zufriedenstellen.
2. Änderungen der Anforderungen willkommen heißen, auch spät in der Entwicklung.
3. Funktionierende Software regelmäßig ausliefern, eher in Wochen als in Monaten.
4. Fachexperten und Entwickler arbeiten täglich zusammen.
5. Projekte rund um motivierte Individuen aufbauen und ihnen das Umfeld und das Vertrauen geben, das sie benötigen.
6. Das Gespräch von Angesicht zu Angesicht ist die effizienteste Form der Informationsübermittlung.
7. Funktionierende Software ist das wichtigste Fortschrittsmaß.
8. Ein gleichmäßiges Tempo halten, das auf unbegrenzte Zeit durchgehalten werden kann.
9. Ständiges Augenmerk auf technische Exzellenz und gutes Design fördert Agilität.
10. Einfachheit, die Kunst, die Menge nicht getaner Arbeit zu maximieren, ist essenziell.
11. Die besten Architekturen, Anforderungen und Entwürfe entstehen in selbstorganisierten Teams.
12. Das Team reflektiert in regelmäßigen Abständen, wie es effektiver werden kann, und passt sein Verhalten entsprechend an.

### Agile Frameworks

| Framework           | Kernidee                                                             | Iterationen                         | Vorgegebene Rollen                      |
| ------------------- | -------------------------------------------------------------------- | ----------------------------------- | --------------------------------------- |
| [Scrum](./scrum.md) | Sprints fester Länge mit festgelegten Events und Artefakten          | Sprints von höchstens einem Monat   | Product Owner, Scrum Master, Developers |
| Kanban              | Arbeitsfluss visualisieren und die Menge paralleler Arbeit begrenzen | Keine, kontinuierlicher Fluss       | Keine                                   |
| Extreme Programming | Entwicklungspraktiken, die den Code änderbar halten                  | Iterationen von ein bis zwei Wochen | Kunde, Entwickler, Coach (optional)     |

<!-- TODO: move Kanban and Extreme Programming into their own entries and link them from the framework table -->

**Kanban** stammt aus dem Produktionssystem von Toyota und wurde von David J. Anderson auf die Softwareentwicklung übertragen. Seine Kernpraktiken sind:

- **Arbeitsfluss visualisieren:** Ein Board zeigt jede Aufgabe in ihrem aktuellen Zustand, z.B. *To Do*, *In Progress*, *Review*, *Done*.
- **Parallele Arbeit begrenzen (WIP-Limit):** Jede Spalte hat eine Höchstzahl an Aufgaben. Eine neue Aufgabe wird erst gezogen, wenn ein Platz frei wird (Pull-Prinzip).
- **Fluss steuern:** Durchlaufzeit (Lead Time), Bearbeitungszeit (Cycle Time) und Durchsatz werden gemessen, um Engpässe zu erkennen.
- **Regeln explizit machen:** Die Regeln für das Weiterschieben einer Aufgabe, z.B. wann sie als erledigt gilt, werden schriftlich festgehalten.
- **Feedbackschleifen einführen:** Regelmäßige Meetings, z.B. ein tägliches Stand-up am Board und periodische Delivery Reviews, überprüfen Arbeit und Prozess.
- **Kontinuierlich verbessern:** Der Prozess wird auf Basis der Messungen in kleinen, evolutionären Schritten verändert.

**Extreme Programming (XP)** wurde Ende der 1990er-Jahre von Kent Beck entwickelt. Es konzentriert sich auf Entwicklungspraktiken statt auf die Projektorganisation: Pair Programming, testgetriebene Entwicklung, Continuous Integration, Refactoring, kleine Releases, gemeinsame Verantwortung für den Code, einfaches Design, ein vor Ort verfügbarer Kunde und ein nachhaltiges Arbeitstempo. XP wird häufig mit Scrum kombiniert, das den organisatorischen Rahmen liefert.

### Vor- und Nachteile

**Vorteile:**

- Früh und regelmäßig nutzbare Ergebnisse.
- Geänderte Anforderungen können jederzeit berücksichtigt werden.
- Frühes Feedback verringert das Risiko, das falsche Produkt zu bauen.
- Der Fortschritt ist transparent, und Probleme werden nach jeder Iteration sichtbar statt am Ende.

**Nachteile:**

- Gesamtumfang und Endkosten sind zu Beginn schwer zu prognostizieren.
- Festpreisverträge sind schwer zu vereinbaren.
- Erfordert einen Kunden oder Product Owner, der laufend verfügbar ist.
- Erfordert erfahrene Teams, die sich selbst organisieren können.
- Die Abstimmung vieler Teams in großen Organisationen erfordert zusätzliche Skalierungsframeworks.
- Dokumentation und Architektur können ohne Disziplin vernachlässigt werden.

## Vergleich

| Aspekt                                                  | Klassisch                                               | Agil                                                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Planung                                                 | Vollständig und detailliert zu Beginn                   | Grob für das ganze Produkt, detailliert für die nächste Iteration                                    |
| Anforderungen                                           | Vor der Entwicklung festgelegt                          | Entwickeln sich während der Entwicklung                                                              |
| Feste Ecken im [magischen Dreieck](./magic-triangle.md) | Umfang; Zeit und Kosten daraus geschätzt                | Zeit und Kosten; der Umfang variiert                                                                 |
| Kundeneinbindung                                        | Zu Beginn und bei der Abnahme                           | Kontinuierlich, mindestens am Ende jeder Iteration                                                   |
| Dokumentation                                           | Umfangreich, Ergebnis jeder Phase                       | So viel wie nötig, das funktionierende Produkt hat Vorrang                                           |
| Umgang mit Änderungen                                   | Formaler Change Request, Änderungen sind teuer          | Änderungen kommen ins Backlog und werden priorisiert                                                 |
| Auslieferung                                            | Einmal, am Projektende                                  | Häufig, in Inkrementen                                                                               |
| Rollen                                                  | Projektleitung plant und steuert, Team führt aus        | Selbstorganisiertes Team mit Rollen wie Product Owner und Scrum Master                               |
| Risiko                                                  | Spät erkannt, z.B. bei Integration und Test             | Früh verringert durch häufige Auslieferung und Feedback                                              |
| Vertrag                                                 | Werkvertrag mit Festpreis und festem Umfang (§ 631 BGB) | Häufig Dienstvertrag mit Abrechnung nach Aufwand (§ 611 BGB) oder festes Budget mit variablem Umfang |

## Auswahlkriterien

Kein Ansatz ist grundsätzlich besser. Die Entscheidung hängt davon ab, wie gut Anforderungen und Technologie bekannt sind, und von den Rahmenbedingungen des Projekts.

| Kriterium                 | Klassischer Ansatz passt bei                                                                                   | Agiler Ansatz passt bei                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Anforderungen             | Bekannt, stabil und vollständig beschreibbar                                                                   | Unklar oder voraussichtlich veränderlich |
| Technologie               | Bekannt und erprobt                                                                                            | Neu, mit offenen technischen Fragen      |
| Verfügbarkeit des Kunden  | Gering, nur für Anforderungen und Abnahme                                                                      | Hoch, laufende Mitwirkung möglich        |
| Regulierung und Nachweise | Strenge Zulassungs- oder Dokumentationspflichten, z.B. Medizinprodukte, Luftfahrt, öffentliche Ausschreibungen | Wenige formale Vorgaben                  |
| Kosten von Änderungen     | Hoch, z.B. Hardware, Bau, physische Fertigung                                                                  | Gering, z.B. Software                    |
| Teilnutzung               | Produkt erst vollständig nutzbar                                                                               | Teilversionen bereits nutzbar            |
| Team                      | Große, verteilte oder wechselnde Teams                                                                         | Kleine, stabile, interdisziplinäre Teams |

### Stacey-Matrix

Die **Stacey-Matrix** ordnet ein Projekt nach der Einigkeit über seine Anforderungen und der Sicherheit seiner Technologie ein.

| Zone        | Anforderungen     | Technologie          | Geeigneter Ansatz                                                |
| ----------- | ----------------- | -------------------- | ---------------------------------------------------------------- |
| Einfach     | Klar              | Bekannt              | Klassisch, der Plan kann vorab erstellt werden                   |
| Kompliziert | Teilweise unklar  | Teilweise unbekannt  | Klassisch mit Expertenanalyse oder hybrid                        |
| Komplex     | Weitgehend unklar | Weitgehend unbekannt | Agil, die Lösung entsteht über Iterationen                       |
| Chaotisch   | Unklar            | Unbekannt            | Sofort handeln, stabilisieren, dann in eine andere Zone wechseln |

Die Matrix ist eine grobe Orientierungshilfe. Ralph Stacey selbst hat sie später nicht mehr verwendet, weil Projekte nicht in feste Zonen fallen und sich ihre Position im Laufe der Zeit verschieben kann.

### Hybride Ansätze

Hybride Ansätze kombinieren klassische und agile Elemente in einem Projekt. Sie sind in der Praxis verbreitet, weil viele Projekte einen festen Rahmen für Budget und Vertrag brauchen, während die Entwicklung selbst von kurzen Zyklen profitiert.

- **Klassischer Rahmen, agile Umsetzung:** Phasen, Meilensteine, Budget und Lastenheft werden klassisch geplant, und die Entwicklung innerhalb der Umsetzungsphase läuft in Sprints.
- **Agile Entwicklung, klassische Auslieferung:** Die Entwicklung ist agil, während Abnahme, Test in einer separaten Testabteilung und Rollout einem festen Plan folgen. Werden zusätzlich die Anforderungen zu Beginn klassisch geplant, heißt die Kombination *Water-Scrum-Fall*.
- **Aufteilung nach Teilprojekten:** Hardware oder Infrastruktur wird klassisch geplant, Software wird agil entwickelt, und beide werden an gemeinsamen Meilensteinen synchronisiert.
- **Anpassbare Vorgehensmodelle:** Das V-Modell XT, eine für IT-Projekte der Bundesverwaltung vorgeschriebene Variante des V-Modells, und PRINCE2 Agile erlauben agile Praktiken innerhalb eines formal strukturierten Vorgehensmodells.

## Beispiel: Auswahl eines Ansatzes

| Projekt                                                                                 | Einschätzung                                                                                    | Ansatz                                                               |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Migration eines Lohnabrechnungssystems auf eine neue Datenbank, unveränderte Funktionen | Anforderungen aus dem Altsystem bekannt, Technologie bekannt, Festpreis vereinbart              | Klassisch, z.B. Wasserfallmodell mit Netzplan                        |
| Software für ein Medizinprodukt                                                         | Anforderungen durch das Zulassungsverfahren festgelegt, jede Teststufe muss dokumentiert werden | V-Modell                                                             |
| Neue mobile App eines Start-ups, dessen Zielgruppe noch erkundet wird                   | Anforderungen unklar, häufiges Nutzerfeedback nötig, Budget pro Monat fest                      | Agil, z.B. Scrum                                                     |
| Supportteam, das eingehende Änderungswünsche bearbeitet                                 | Kontinuierlicher Fluss kleiner Aufgaben unterschiedlicher Priorität, kein festes Projektende    | Kanban                                                               |
| Behörde führt eine neue Fachanwendung ein                                               | Ausschreibung mit Lastenheft und festem Budget, Benutzeroberfläche unklar                       | Hybrid: klassischer Rahmen, agile Entwicklung der Benutzeroberfläche |

## Häufige Fehler

1. **Agil als Arbeiten ohne Plan:** Agile Ansätze planen laufend auf mehreren Ebenen, z.B. Produkt, Release, Iteration und Tag. Die Planung verteilt sich über das Projekt, statt wie bei klassischen Ansätzen vollständig zu Beginn zu erfolgen.
2. **Agil als Arbeiten ohne Dokumentation:** Das Manifest schätzt funktionierende Software höher als umfassende Dokumentation, lehnt Dokumentation aber nicht ab. Dokumentation, die einen Leser und einen Zweck hat, z.B. für Betrieb oder Wartung, muss weiterhin erstellt und aktuell gehalten werden.
3. **Scrum und agil als Synonyme:** Agil bezeichnet die Werte und Prinzipien des Manifests. Scrum, Kanban und XP sind eigenständige Frameworks, die sie umsetzen.
4. **Spiralmodell als agiler Ansatz:** Das Spiralmodell ist iterativ, plant und dokumentiert aber jeden Zyklus vorab vollständig und bleibt damit trotz der Iterationen plangetrieben.
5. **V-Modell als Testen am Ende:** Die Testfälle jeder Ebene werden zusammen mit der zugehörigen Spezifikationsebene geschrieben, z.B. die Abnahmetestfälle während der Anforderungsanalyse. Nur das Ausführen der Tests muss warten, bis das System gebaut ist.
6. **Kanban als reines Aufgabenboard:** Das Aufgabenboard visualisiert nur die Arbeit, aber Kanban braucht zwei weitere Elemente: WIP-Limits, die dafür sorgen, dass das Team begonnene Aufgaben abschließt, bevor es neue zieht, und die Messung des Flusses, die zeigt, wo Arbeit hängen bleibt.

## Siehe auch

- [Projektphasen](./projectphases.mdx): die Phasen, die ein klassisches Projekt durchläuft
- [Scrum](./scrum.md): Rollen, Events und Artefakte des am weitesten verbreiteten agilen Frameworks
- [Lastenheft/Pflichtenheft](./requirements-specification.md): die Dokumente, die in einem klassischen Projekt den Umfang festlegen
- [Gantt-Diagramm](./gantt.md): Visualisierung des Terminplans für phasenbasierte Projekte
- [Netzplan](./network-plan.md): Abhängigkeiten und kritischer Pfad in einem klassischen Terminplan
- [Magisches Dreieck](./magic-triangle.md): Umfang, Zeit und Kosten als konkurrierende Ziele und die Ecken, die jeder Ansatz festlegt
- [INVEST-Modell](./invest.md): Qualitätskriterien für User Storys in einem agilen Backlog
- [Prototyping](../fundamentals/prototyping.md): Arten von Prototypen und ihr Einsatz in klassischer und agiler Entwicklung
- [Teststufen](../fundamentals/test-levels.md): die Teststufen, die den Entwicklungsphasen des V-Modells gegenüberstehen
- [Leitungssysteme](../commercial/line-systems.md): Formen der Projektorganisation innerhalb der Unternehmensstruktur
