---
title: "Aktivitätsdiagramm"
description: "UML-Aktivitätsdiagramme: Notation, Aktionen, Kontrollfluss, Verzweigung und Zusammenführung, Schleifen, Parallelisierung und Synchronisation, Swimlanes sowie die Abbildung der Elemente auf Kontrollstrukturen im Programm."
keywords:
    - UML
    - Aktivitätsdiagramm
    - Kontrollfluss
    - Entscheidungsknoten
    - Verbindungsknoten
    - Parallelisierung und Synchronisation
    - Swimlane
    - Partition
    - Prozessmodellierung
    - Verhaltensdiagramm
tags:
    - ap2
---

# Aktivitätsdiagramm

## Überblick

Ein Aktivitätsdiagramm ist ein **Verhaltensdiagramm** der UML. Es beschreibt einen Ablauf als Folge von Aktionen, die durch Kontrollflüsse verbunden sind, einschließlich Verzweigungen, Schleifen und Schritten, die parallel laufen. Während ein [Klassendiagramm](./class-diagram.md) beantwortet, *woraus ein System besteht*, beantwortet ein Aktivitätsdiagramm, *in welcher Reihenfolge etwas geschieht und wer es tut*.

Typische Anwendungsfälle:

- Modellierung eines Geschäftsprozesses, der über mehrere Abteilungen oder Systeme läuft
- Beschreibung eines Algorithmus vor der Implementierung, unabhängig von einer Programmiersprache
- Detaillierung der Schritte innerhalb eines einzelnen Anwendungsfalls
- Dokumentation eines bestehenden Arbeitsablaufs zur Abstimmung mit fachlich Beteiligten

---

## Notation

| Element                 | Notation                                                     | Bedeutung                                                                          |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Startknoten             | Ausgefüllter Kreis `●`                                       | Beginn der Aktivität, genau einer je Diagramm                                      |
| Aktion                  | Abgerundetes Rechteck                                        | Ein unteilbarer Arbeitsschritt, benannt als *Verb + Objekt*                        |
| Aktivitätsaufruf        | Abgerundetes Rechteck mit Rechen-Symbol (Harke)              | Ein Schritt, der in einem eigenen Diagramm verfeinert wird                         |
| Kontrollfluss           | Durchgezogener Pfeil                                         | Ausführungsreihenfolge, führt von einer Aktion zur nächsten                        |
| Guard                   | `[Bedingung]` am Fluss notiert                               | Bedingung, unter der dieser Fluss genommen werden darf                             |
| Entscheidungsknoten     | Raute, ein eingehender und mehrere ausgehende Flüsse         | Verzweigung, die ausgehenden Flüsse tragen sich gegenseitig ausschließende Guards  |
| Verbindungsknoten       | Raute, mehrere eingehende und ein ausgehender Fluss          | Führt alternative Pfade wieder zusammen, wartet **nicht**                          |
| Parallelisierung (Fork) | Dicker Balken, ein eingehender und mehrere ausgehende Flüsse | Teilt den Fluss in nebenläufige Flüsse auf                                         |
| Synchronisation (Join)  | Dicker Balken, mehrere eingehende und ein ausgehender Fluss  | Wartet, bis jeder eingehende Fluss eingetroffen ist                                |
| Endknoten der Aktivität | Ausgefüllter Kreis im Ring `◉`                               | Beendet die gesamte Aktivität, auch noch laufende Pfade                            |
| Endknoten des Flusses   | Kreis mit Kreuz `⊗`                                          | Beendet nur den dort ankommenden Pfad, die Aktivität läuft weiter                  |
| Objektknoten            | Einfaches Rechteck am Fluss                                  | Daten, die von einer Aktion an die nächste übergeben werden                        |
| Partition               | Beschriftete Bahn                                            | Akteur, Rolle oder System, der bzw. das für die Aktionen dieser Bahn zuständig ist |
| Notiz                   | Rechteck mit geknickter Ecke an gestrichelter Linie          | Kommentar ohne Semantik                                                            |

Benennungsregeln, die ein Diagramm lesbar halten:

- Aktionen werden als *Verb + Objekt* benannt: `Bestellung prüfen`, nicht `Bestellung` und nicht `Prüfung`
- Guards stehen in eckigen Klammern direkt am Fluss, niemals innerhalb der Aktion
- Der verbleibende Fall einer Verzweigung wird mit `[else]` beschriftet statt mit einer negierten Bedingung

---

## Bausteine

### Sequenz

Aktionen, die nacheinander ausgeführt werden. Der Fluss verlässt den Startknoten, durchläuft jede Aktion und endet am Endknoten der Aktivität.

```text
              ●
              │
              ▼
 ╭─────────────────────────╮
 │  Bestellung empfangen   │
 ╰─────────────────────────╯
              │
              ▼
 ╭─────────────────────────╮
 │     Bestand prüfen      │
 ╰─────────────────────────╯
              │
              ▼
              ◉
```

### Verzweigung und Zusammenführung

Ein Entscheidungsknoten teilt den Fluss in Alternativen auf. Genau ein ausgehender Fluss wird genommen, daher müssen sich die Guards gegenseitig ausschließen und jeden möglichen Fall abdecken. Ein Verbindungsknoten führt die Alternativen wieder zusammen, er gibt jeden ankommenden Pfad weiter und wartet nie.

```text
                        │
                        ▼
                  ╱───────────╲
                 ╱   Betrag    ╲
                 ╲   > 100 ?   ╱
                  ╲───────────╱
                   │         │
             [ja]  │         │ [nein]
          ┌────────┘         └────────┐
          │                           │
          ▼                           ▼
╭───────────────────╮       ╭───────────────────╮
│  Rabatt gewähren  │       │ Preis beibehalten │
╰───────────────────╯       ╰───────────────────╯
          │                           │
          └────────┐         ┌────────┘
                   ▼         ▼
                  ╱───────────╲
                 ╱             ╲
                 ╲             ╱
                  ╲───────────╱
                        │
                        ▼
```

Eine Verzweigung mit mehr als zwei Ausgängen verwendet einen Entscheidungsknoten mit mehreren Flüssen, die jeweils einen eigenen Guard tragen, was `if / else if / else` oder einer `switch`-Anweisung entspricht. Der Verbindungsknoten bleibt eine einzelne Raute, unabhängig davon, wie viele Pfade in ihn hineinführen.

### Schleife

Eine Schleife ist ein Kontrollfluss, der an eine frühere Stelle im Diagramm zurückführt. Im folgenden Diagramm steht die Entscheidung *hinter* der Aktion, die Aktion läuft also mindestens einmal, was einer `do … while`-Schleife entspricht.

```text
               ●
               │
               ▼
     ╭───────────────────╮
┌───►│  Datensatz lesen  │
│    ╰───────────────────╯
│              │
│              ▼
│      ╱───────────────╲
│     ╱     weitere     ╲
│     ╲  Datensätze ?   ╱
│      ╲───────────────╱
│       │             │
│  [ja] │             │ [nein]
└───────┘             ▼
                      ◉
```

Steht die Entscheidung stattdessen *vor* der Aktion und mündet die Rückführung oberhalb davon ein, wird aus derselben Struktur eine kopfgesteuerte `while`-Schleife, deren Aktionen null Mal laufen können.

### Parallelisierung und Synchronisation

Eine Parallelisierung teilt einen Fluss in mehrere nebenläufige Flüsse auf. Eine Synchronisation wartet, bis jeder eingehende Fluss eingetroffen ist, und setzt erst dann als einzelner Fluss fort. Ohne Synchronisation könnte die Aktivität enden, während parallele Schritte noch laufen.

```text
                     │
                     ▼
          ━━━━━━━━━━━━━━━━━━━━━━━
          │                     │
          ▼                     ▼
╭───────────────────╮ ╭───────────────────╮
│ Ware reservieren  │ │  Karte belasten   │
╰───────────────────╯ ╰───────────────────╯
          │                     │
          ▼                     ▼
          ━━━━━━━━━━━━━━━━━━━━━━━
                     │
                     ▼
```

Nebenläufig bedeutet in der UML *ohne vorgeschriebene Reihenfolge*, nicht zwangsläufig *gleichzeitig auf getrennten Prozessoren*. Ob die beiden Zweige auf zwei Threads oder schlicht in beliebiger Reihenfolge laufen, ist eine Entscheidung der Implementierung.

---

## Partitionen (Swimlanes)

Eine Partition gruppiert Aktionen nach dem Akteur, der Rolle, der Abteilung oder dem System, der bzw. das sie ausführt. Die Bahnen können senkrecht oder waagerecht gezeichnet werden, der Fluss überquert einfach die Bahngrenzen.

Regeln, die dabei zu beachten sind:

- Eine Aktion gehört zu genau einer Bahn, die Bahn ist die Antwort auf *wer tut das*
- Entscheidungs- und Verbindungsknoten gehören in die Bahn des Akteurs, der entscheidet
- Eine Parallelisierung darf sich über mehrere Bahnen erstrecken, genau so wird parallele Arbeit verschiedener Akteure dargestellt
- Die Anzahl der Bahnwechsel ist ein grobes Maß für den Koordinationsaufwand im Prozess

---

## Abbildung auf Code

| Aktivitätsdiagramm                                   | Konstrukt im Programm                               |
| ---------------------------------------------------- | --------------------------------------------------- |
| Aktionen in Sequenz                                  | Aufeinanderfolgende Anweisungen                     |
| Entscheidung mit zwei Guards und Zusammenführung     | `if / else`                                         |
| Entscheidung mit mehreren Guards und `[else]`        | `if / else if / else` oder `switch`                 |
| Rückführung mit der Entscheidung hinter den Aktionen | `do … while`                                        |
| Rückführung mit der Entscheidung vor den Aktionen    | `while` oder `for`                                  |
| Parallelisierung und Synchronisation                 | Threads, Tasks, `Promise.all`, paralleler Stream    |
| Aufgerufene Aktivität                                | Methoden- oder Funktionsaufruf                      |
| Objektknoten zwischen zwei Aktionen                  | Rückgabewert, der als Parameter weitergereicht wird |
| Endknoten der Aktivität                              | Ende der Methode, `return`                          |
| Endknoten des Flusses                                | Ein Pfad endet, während die übrigen weiterlaufen    |

---

## Beispiel: Bearbeitung einer Online-Bestellung

Beteiligt sind drei Partitionen: der Kunde, das Shop-System und das Lager. Die Bestellung wird vom Shop geprüft, eine ungültige Bestellung wird abgelehnt, eine gültige wird vom Lager kommissioniert und versendet.

```text
           Kunde           │           Shop-System          │           Lager
───────────────────────────┼────────────────────────────────┼───────────────────────────
             ●             │                                │
             │             │                                │
             ▼             │                                │
 ╭───────────────────────╮ │                                │
 │  Bestellung aufgeben  │ │                                │
 ╰───────────────────────╯ │                                │
             │             │                                │
             └─────────────┼───────────────┐                │
                           │               │                │
                           │               ▼                │
                           │   ╭───────────────────────╮    │
                           │   │   Bestellung prüfen   │    │
                           │   ╰───────────────────────╯    │
                           │               │                │
                           │               ▼                │
                           │         ╱───────────╲          │
                           │        ╱ Bestellung  ╲         │
                           │        ╲  gültig ?   ╱         │
                           │         ╲───────────╱          │
                           │          │         │           │
                           │   [nein] │         │ [ja]      │
             ┌─────────────┼──────────┘         └───────────┼─────────────┐
             │             │                                │             │
             ▼             │                                │             ▼
 ╭───────────────────────╮ │                                │ ╭───────────────────────╮
 │    Ablehnung lesen    │ │                                │ │ Ware kommissionieren  │
 ╰───────────────────────╯ │                                │ ╰───────────────────────╯
             │             │                                │             │
             ▼             │                                │             ▼
             ◉             │                                │ ╭───────────────────────╮
                           │                                │ │    Paket versenden    │
                           │                                │ ╰───────────────────────╯
                           │                                │             │
             ┌─────────────┼────────────────────────────────┼─────────────┘
             │             │                                │
             ▼             │                                │
 ╭───────────────────────╮ │                                │
 │    Paket annehmen     │ │                                │
 ╰───────────────────────╯ │                                │
             │             │                                │
             ▼             │                                │
             ◉             │                                │
```

Was sich aus diesem Beispiel ablesen lässt:

- Der Kunde startet den Prozess, der Startknoten liegt daher in der Bahn des Kunden
- `Bestellung prüfen` ist hier eine einzelne Aktion. Ist die Prüfung komplex, wird daraus ein Aktivitätsaufruf mit eigenem Diagramm
- Die Guards `[nein]` und `[ja]` schließen sich gegenseitig aus und decken jeden Fall ab, der Fluss kann an der Entscheidung also nie hängen bleiben
- Beide Zweige enden in einem Endknoten der Aktivität, der Prozess hat zwei mögliche Ausgänge
- Es wird nichts darüber ausgesagt, *wie* die Bestellung geprüft wird oder *wie lange* der Versand dauert, ein Aktivitätsdiagramm modelliert den Kontrollfluss, nicht Datenstrukturen oder Zeitverhalten

Eine realitätsnahe Erweiterung würde hinter `[ja]` parallelisieren, sodass `Karte belasten` in der Bahn des Shops und `Ware kommissionieren` in der Bahn des Lagers nebenläufig laufen und vor `Paket versenden` wieder synchronisiert werden.

---

## Häufige Fehler

1. **Fehlende oder überlappende Guards:** Jeder ausgehende Fluss einer Entscheidung braucht einen Guard, die Guards müssen sich gegenseitig ausschließen und vollständig sein, sonst hat der Fluss entweder keinen oder mehrere Pfade
2. **Entscheidung statt Parallelisierung:** Eine Raute bedeutet *einer dieser Pfade*, ein Balken bedeutet *alle diese Pfade*
3. **Parallelisierung ohne Synchronisation:** Die Aktivität kann einen Endknoten erreichen, während parallele Flüsse noch laufen, der Endknoten verwirft sie dann
4. **Synchronisation ohne Parallelisierung:** Eine Synchronisation wartet auf einen Fluss, der nie eintrifft, und der Prozess gerät in einen Deadlock
5. **Substantive als Aktionsnamen:** `Rechnung` sagt nichts aus, `Rechnung erstellen` schon
6. **Bedingungen innerhalb der Aktion:** Die Bedingung gehört an den ausgehenden Fluss, die Aktion ist das, was getan wird, nicht das, was geprüft wird
7. **Mehrere Startknoten:** Eine Aktivität hat genau einen Startpunkt. Nebenläufige Starts werden mit einer Parallelisierung modelliert
8. **Bahnen als Dekoration:** Werden die Akteure gezeichnet, ohne dass der Fluss je eine Bahngrenze überquert, bringt die Partitionierung nichts
9. **Vermischung von Kontrollfluss und Datenfluss:** Daten, die zwischen Aktionen weitergegeben werden, gehören in Objektknoten, nicht in die Beschriftungen von Kontrollflüssen

---

## Werkzeuge

- draw.io / diagrams.net (kostenlos, browserbasiert, UML-Formenbibliothek enthalten)
- PlantUML (textbasiert, das Diagramm wird aus Quelltext erzeugt und lässt sich versionieren)
- Mermaid (textbasiert, wird auf vielen Plattformen direkt in Markdown gerendert)
- Visual Paradigm, StarUML, Lucidchart (kommerziell, mit kostenlosen Tarifen)

## Siehe auch

- [Klassendiagramm](./class-diagram.md): das strukturelle Gegenstück, modelliert Klassen und ihre Beziehungen
- [ER-Modell](../databases/er-model.md): modelliert die Daten, auf denen die Aktionen eines Aktivitätsdiagramms arbeiten
