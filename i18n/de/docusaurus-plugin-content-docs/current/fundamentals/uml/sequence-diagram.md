---
title: "Sequenzdiagramm"
description: "UML-Sequenzdiagramme: Lebenslinien, Ausführungsspezifikationen, synchrone und asynchrone Nachrichten, Antworten, Erzeugung und Zerstörung von Objekten, kombinierte Fragmente wie alt, opt, loop und par sowie die Abgrenzung zum Aktivitäts- und Kommunikationsdiagramm."
keywords:
    - UML
    - Sequenzdiagramm
    - Interaktionsdiagramm
    - Lebenslinie
    - Ausführungsspezifikation
    - Kombiniertes Fragment
    - Synchrone Nachricht
    - Asynchrone Nachricht
    - Verhaltensdiagramm
tags:
    - ap2
---

# Sequenzdiagramm

## Überblick

Ein Sequenzdiagramm ist ein **Verhaltensdiagramm** der UML und gehört zur Gruppe der *Interaktionsdiagramme*. Es zeigt, welche Kommunikationspartner welche Nachrichten austauschen und in welcher Reihenfolge das geschieht. Die Partner stehen nebeneinander, die Zeit läuft von oben nach unten.

Typische Anwendungsfälle:

- Detaillierung eines einzelnen Szenarios eines [Anwendungsfalls](./use-case-diagram.md), meist der Normalablauf und eine Ausnahme
- Dokumentation des Zusammenspiels von Objekten oder Komponenten für eine Funktionalität
- Beschreibung eines Protokolls zwischen Systemen, beispielsweise Client, Server und Datenbank
- Prüfung eines Entwurfs gegen das [Klassendiagramm](./class-diagram.md) in beide Richtungen: Eine Nachricht, die keine Klasse als Operation anbietet, deckt eine fehlende Operation auf, eine Lebenslinie ohne eingehende Nachrichten eine unerreichbare Klasse

Ein Sequenzdiagramm zeigt immer *einen* konkreten Ablauf. Alternativen und Wiederholungen lassen sich über kombinierte Fragmente ausdrücken, ein Diagramm, das jeden Fall zugleich abdecken will, wird jedoch unlesbar. Mehrere kleine Diagramme sind daher einem großen vorzuziehen.

---

## Notation

| Element                  | Notation                                                      | Bedeutung                                                           |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| Diagrammrahmen           | Rechteck mit Fünfeck-Reiter, beschriftet mit `sd` und Name    | Grenze und Name der Interaktion                                     |
| Kopf der Lebenslinie     | Rechteck mit `name : Class`, `:Class` oder `name`             | Ein Kommunikationspartner: Objekt, Komponente oder Akteur           |
| Lebenslinie              | Gestrichelte senkrechte Linie unterhalb des Kopfes            | Existenz dieses Partners im Zeitverlauf                             |
| Ausführungsspezifikation | Schmales Rechteck auf der Lebenslinie (Aktivierungsbalken)    | Zeitraum, in dem der Partner aktiv ist oder einen Aufruf bearbeitet |
| Synchrone Nachricht      | Durchgezogene Linie, gefüllte Pfeilspitze `──▶`               | Der Sender wartet, bis die Antwort eintrifft                        |
| Asynchrone Nachricht     | Durchgezogene Linie, offene Pfeilspitze `──>`                 | Der Sender läuft sofort weiter, es wird nicht gewartet              |
| Antwortnachricht         | Gestrichelte Linie, offene Pfeilspitze `<- - -`               | Rückgabe der Kontrolle, wahlweise mit dem Rückgabewert beschriftet  |
| Selbstaufruf             | Pfeil, der dieselbe Lebenslinie verlässt und wieder erreicht  | Ein Partner ruft eine eigene Operation auf                          |
| Erzeugungsnachricht      | Gestrichelter Pfeil mit `«create»` auf einen Lebenslinienkopf | Der Empfänger entsteht während der Interaktion                      |
| Zerstörungsereignis      | Kreuz `X` am unteren Ende einer Lebenslinie                   | Das Objekt wird zerstört, die Lebenslinie endet dort                |
| Kombiniertes Fragment    | Rechteck mit dem Operator in der linken oberen Ecke           | Kontrollstruktur, beispielsweise `alt`, `opt`, `loop`, `par`        |
| Operand                  | Abschnitt eines Fragments, durch gestrichelte Linie getrennt  | Ein Fall oder ein Zweig innerhalb des Fragments                     |
| Guard                    | `[condition]` am Anfang eines Operanden                       | Bedingung, unter der dieser Operand gilt                            |
| Interaktionsverwendung   | Fragment mit dem Operator `ref`                               | Verweis auf eine Interaktion, die ein eigenes Diagramm besitzt      |
| Zustandsinvariante       | `{condition}` auf einer Lebenslinie                           | Bedingung, die zu diesem Zeitpunkt gelten muss                      |
| Notiz                    | Rechteck mit geknickter Ecke an gestrichelter Linie           | Kommentar ohne Semantik                                             |

Benennungsregeln, die ein Diagramm lesbar halten:

- Eine Nachricht trägt die Signatur der aufgerufenen Operation, beispielsweise `reserve(seatNo)`, keinen Satz wie `the seat is reserved`
- Eine Antwort wird mit dem Rückgabewert beschriftet, nicht erneut mit dem Operationsnamen
- Lebenslinien werden nach Objekten benannt, nicht nach Tätigkeiten: `:SeatRepository` ist ein Partner, `Save seat` nicht
- Anonyme Objekte werden als `:Class` geschrieben, ein benanntes Objekt als `seat : Seat`, eine Rolle nur mit ihrem Namen

---

## Bausteine

### Lebenslinie, Ausführungsspezifikation und Antwort

Eine Nachricht von einem Partner an einen anderen startet beim Empfänger eine Ausführungsspezifikation, die Antwort beendet sie. Eine synchrone Nachricht passt zu einem Aufruf, dessen Ergebnis der Aufrufer braucht, bevor er weiterarbeiten kann, z.B. ein Methodenaufruf oder eine HTTP-Anfrage, auf deren Antwort gewartet wird.

```text
   :Client                  :AuthService
      │                           │
     ┌┴┐                          │
     │ │─── login(user, pw) ────▶┌┴┐
     │ │                         │ │
     │ │<- - - - - token - - - - └┬┘
     │ │                          │
     └┬┘                          │
      │                           │
```

Die Antwort darf entfallen, wenn sie keine Information trägt.

### Asynchrone Nachricht

Eine asynchrone Nachricht wird übergeben, der Sender läuft ohne Warten weiter. Sie passt zu Ereignissen, Benachrichtigungen, Nachrichten an eine Warteschlange und Aufrufen in einem eigenen Thread, bei denen der Sender kein Ergebnis braucht. Der Balken des Senders ist unabhängig vom Balken des Empfängers und darf vor diesem enden.

```text
:OrderService                   :MailService
      │                               │
     ┌┴┐                              │
     │ │──── sendMail(order) ───────>┌┴┐
     └┬┘                             │ │
      │                              │ │
      │                              └┬┘
      │                               │
```

### Selbstaufruf

Ein Selbstaufruf ist ein Pfeil, der eine Lebenslinie verlässt und etwas weiter unten dieselbe Lebenslinie wieder erreicht. Er wird gezeichnet, wenn ein interner Schritt eines Partners, etwa eine Prüfung oder Berechnung, für das Verständnis des Ablaufs wichtig ist. Private Hilfsaufrufe ohne diese Bedeutung entfallen. Ein streng gezeichneter Selbstaufruf erhält eine geschachtelte Ausführungsspezifikation, also einen leicht versetzten zweiten Balken auf dem ersten.

```text
:OrderService
      │
     ┌┴┐
     │ ├───┐ validate()
     │ ┌─┐◀┘
     │ │ │
     │ └─┘
     │ │
     └┬┘
      │
```

### Erzeugung und Zerstörung von Objekten

Ein Objekt, das erst während der Interaktion entsteht, wird mit seinem Kopf auf der Höhe gezeichnet, auf der es erzeugt wird. Die Erzeugungsnachricht zeigt auf den Kopf, nicht auf die Lebenslinie. Die Zerstörung wird mit einem Kreuz am Ende der Lebenslinie markiert.

```text
  :Session
      │
     ┌┴┐
     │ │        «create»
     │ │- - - - - - - - - ->┌─────────┐
     │ │                    │  :Cart  │
     │ │                    └────┬────┘
     │ │──── addItem(item) ────▶┌┴┐
     │ │                        └┬┘
     │ │──── «destroy» ────────▶ X
     └┬┘
      │
```

---

## Kombinierte Fragmente

Ein kombiniertes Fragment ist ein Rechteck um einen Teil der Interaktion. Der Operator in der linken oberen Ecke legt fest, welche Kontrollstruktur für die eingeschlossenen Nachrichten gilt, z.B. eine Alternative oder eine Schleife. Gestrichelte waagerechte Linien teilen das Fragment in Operanden, und in einem `alt`-Fragment trägt jeder Operand einen Guard.

| Operator   | Bedeutung                                                                                  | Entspricht                        |
| ---------- | ------------------------------------------------------------------------------------------ | --------------------------------- |
| `alt`      | Alternativen, genau ein Operand läuft, der verbleibende Fall wird mit `[else]` beschriftet | `if / else if / else`             |
| `opt`      | Ein einzelner Operand, der nur läuft, wenn der Guard erfüllt ist                           | `if` ohne `else`                  |
| `loop`     | Wiederholung, geschrieben als `loop(min,max)` oder mit einem Guard                         | `while`, `for`, `do … while`      |
| `break`    | Der Operand ersetzt den Rest der umgebenden Interaktion                                    | Vorzeitiges `return`, Ausnahme    |
| `par`      | Die Operanden laufen nebenläufig, ihre Nachrichten dürfen sich verschränken                | Threads, Tasks, parallele Aufrufe |
| `ref`      | Verweis auf eine Interaktion, die in einem eigenen Diagramm gezeichnet wird                | Methodenaufruf, Teilablauf        |
| `critical` | Der Operand darf nicht von nebenläufig laufenden Operanden unterbrochen werden             | Kritischer Abschnitt, Sperre      |
| `neg`      | Die eingeschlossene Folge ist ungültig und darf nicht auftreten                            | Negativer Testfall                |
| `assert`   | Die eingeschlossene Folge ist die einzig gültige Fortsetzung                               | Zusicherung                       |

In der Praxis decken `alt`, `opt` und `loop` die weitaus meisten Diagramme ab.

### Alternative

```text
      :Client                        :Booking
         │                               │
        ┌┴┐                              │
        │ │──── reserve(seatNo) ───────▶┌┴┐
        │ │                             │ │
 ┌──────┼─┼─────────────────────────────┼─┼────────┐
 │ alt  │ │ [seat is free]              │ │        │
 │      │ │<- - - - reservationId - - - │ │        │
 ├╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌┤
 │      │ │ [else]                      │ │        │
 │      │ │<- - - SeatTakenError - - - -│ │        │
 └──────┼─┼─────────────────────────────┼─┼────────┘
        └┬┘                             └┬┘
         │                               │
```

Die Guards eines `alt`-Fragments müssen sich gegenseitig ausschließen und sollten jeden Fall abdecken.

### Schleife

```text
      :Order                         :LineItem
         │                               │
        ┌┴┐                              │
 ┌──────┼─┼──────────────────────────────┼─────────┐
 │ loop │ │ [more items]                 │         │
 │      │ │──── subtotal() ────────────▶┌┴┐        │
 │      │ │<- - - - amount - - - - - - -└┬┘        │
 └──────┼─┼──────────────────────────────┼─────────┘
        └┬┘                              │
         │                               │
```

`loop(1,n)` drückt eine Anzahl statt einer Bedingung aus, `loop` ohne Zusatz bedeutet eine unbegrenzte Wiederholung.

---

## Beispiel: Detaillierung des Anwendungsfalls *Sitzplatz buchen*

Detailliert wird hier der Normalablauf des Anwendungsfalls *Sitzplatz buchen*: Ein Kunde bucht einen bestimmten Platz, das System schlägt den Platz nach und markiert ihn als gebucht, sofern er noch frei ist. Das Diagramm wird in diesen Schritten aus der textuellen Beschreibung des Anwendungsfalls abgeleitet:

1. Ein Szenario des Anwendungsfalls wird ausgewählt, üblicherweise der Normalablauf aus der textuellen Beschreibung.
2. Der auslösende Akteur wird zur äußerst linken Lebenslinie.
3. Die internen Partner kommen hinzu, typischerweise entlang der Schichten der Architektur: Oberfläche, Steuerung, Fachobjekt, Persistenz.
4. Jeder Schritt des textuellen Ablaufs wird zu einer Nachricht, deren Name zu einer Operation des Empfängers passt.
5. Ausnahmen aus der textuellen Beschreibung werden zu `alt`- oder `break`-Fragmenten oder zu je einem eigenen Diagramm.

```text
┌────────────────┐
│ sd BookSeat    │
├────────────────┴─────────────────────────────────────────────────────┐
│                                                                      │
│       :Customer            :BookingService         :SeatRepository   │
│           │                       │                       │          │
│          ┌┴┐                      │                       │          │
│          │ │── bookSeat(id) ────▶┌┴┐                      │          │
│          │ │                     │ │── findSeat(id) ────▶┌┴┐         │
│          │ │                     │ │<- - seat - - - - - -└┬┘         │
│          │ │                     │ │                      │          │
│          │ │              ┌──────┼─┼──────────────────────┼───────┐  │
│          │ │              │ opt  │ │ [seat is free]       │       │  │
│          │ │              │      │ │── markBooked(id) ──▶┌┴┐      │  │
│          │ │              │      │ │<- - - - ok - - - - -└┬┘      │  │
│          │ │              └──────┼─┼──────────────────────┼───────┘  │
│          │ │<- - confirmation - -└┬┘                      │          │
│          └┬┘                      │                       │          │
│           │                       │                       │          │
└──────────────────────────────────────────────────────────────────────┘
```

Was sich aus diesem Beispiel ablesen lässt:

- Der Fehlerfall des `opt`-Fragments ist hier nicht gezeichnet, er würde entweder mit `alt` oder in einem eigenen Diagramm modelliert.
- Der Bezahlvorgang würde als `ref`-Fragment eingefügt, damit dieses Diagramm lesbar bleibt und die Bezahlung eine eigene Interaktion erhält.

---

## Sequenz-, Aktivitäts- oder Kommunikationsdiagramm

Alle drei sind Verhaltensdiagramme.

| Kriterium       | Sequenzdiagramm                                | Aktivitätsdiagramm                               | Kommunikationsdiagramm                         |
| --------------- | ---------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| Schwerpunkt     | Nachrichtenaustausch im Zeitverlauf            | Kontrollfluss eines Ablaufs                      | Struktur der Zusammenarbeit                    |
| Zeit            | Explizit, als senkrechte Achse                 | Implizit, über die Flussrichtung                 | Nur über die Nummerierung der Nachrichten      |
| Beteiligte      | Lebenslinien nebeneinander                     | Optional, als Partitionen                        | Frei platzierte Objekte, durch Links verbunden |
| Verzweigungen   | Kombinierte Fragmente, schnell unübersichtlich | Entscheidungs- und Verbindungsknoten, gut lesbar | Kaum lesbar                                    |
| Nebenläufigkeit | `par`-Fragment                                 | Parallelisierung und Synchronisation             | Möglich, aber schlecht lesbar                  |
| Typischer Zweck | Detaillierung eines Szenarios                  | Modellierung eines ganzen Ablaufs                | Darstellung, welches Objekt welches kennt      |

Faustregeln:

- Viele Verzweigungen und Schleifen, wenige Beteiligte => [Aktivitätsdiagramm](./activity-diagram.md)
- Wenige Verzweigungen, viele Beteiligte und eine relevante Reihenfolge => Sequenzdiagramm
- Die Frage *wer ist mit wem verbunden* statt *in welcher Reihenfolge* => [Kommunikationsdiagramm](./further-uml-diagrams.md#kommunikationsdiagramm)
- Das Verhalten *eines einzelnen* Objekts über seine gesamte Lebensdauer => [Zustandsdiagramm](./state-machine-diagram.md)

---

## Häufige Fehler

1. **Zeitachse ignoriert:** Die Zeit läuft über alle Lebenslinien hinweg von oben nach unten. Ein nach oben gezeichneter Pfeil kehrt die beabsichtigte Reihenfolge deshalb um. Zwei Nachrichten auf gleicher Höhe haben keine festgelegte Reihenfolge.
2. **Antwort als durchgezogener Pfeil:** Eine Antwort wird als gestrichelte Linie mit offener Pfeilspitze gezeichnet. Eine durchgezogene Linie mit gefüllter Pfeilspitze wird als neuer Aufruf in die Gegenrichtung gelesen.
3. **Synchron und asynchron verwechselt:** Die gefüllte Pfeilspitze bedeutet, dass der Sender auf die Antwort wartet. Ereignisse, Benachrichtigungen und Nachrichten an eine Warteschlange sind asynchron und erhalten die offene Pfeilspitze.
4. **Ausführungsspezifikationen nicht geschlossen:** Der Balken eines Aufrufers muss mindestens bis zum Eintreffen der Antwort reichen. Ein früher endender Balken behauptet, der Aufrufer sei bereits fertig gewesen.
5. **Tätigkeiten statt Objekte auf den Lebenslinien:** Eine Lebenslinie steht für einen Kommunikationspartner wie `:SeatRepository`. Ein Schritt wie `Check availability` ist kein Partner und wird stattdessen zu einer Nachricht.
6. **Fehlende Guards an alt-Operanden:** Ohne Guards zeigt das Diagramm nicht, unter welcher Bedingung welcher Operand des `alt`-Fragments gilt.

---

## Werkzeuge

- draw.io / diagrams.net (kostenlos, browserbasiert, UML-Formenbibliothek enthalten)
- PlantUML (textbasiert, besonders stark bei Sequenzdiagrammen, lässt sich versionieren)
- Mermaid (textbasiert, wird auf vielen Plattformen direkt in Markdown gerendert)
- Visual Paradigm, StarUML, Lucidchart (kommerziell, mit kostenlosen Tarifen)

## Siehe auch

- [Aktivitätsdiagramm](./activity-diagram.md): die Alternative für Abläufe mit vielen Verzweigungen und Schleifen
- [Anwendungsfalldiagramm](./use-case-diagram.md): liefert die Szenarien, die ein Sequenzdiagramm detailliert
- [Klassendiagramm](./class-diagram.md): liefert die Klassen und Operationen, auf die sich die Nachrichten beziehen
- [Zustandsdiagramm](./state-machine-diagram.md): das Verhalten eines einzelnen Objekts statt des Zusammenspiels mehrerer
- [UML-Überblick](./uml-overview.mdx): Einordnung aller Diagrammarten
- [Grundlagen der UML-Notation](./uml-notation-basics.md): Elemente, die jede Diagrammart gemeinsam hat
