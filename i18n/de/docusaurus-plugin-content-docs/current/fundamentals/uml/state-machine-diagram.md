---
title: "Zustandsdiagramm"
description: "UML-Zustandsdiagramme: Zustände, Transitionen mit Auslöser, Bedingung und Effekt, entry-, do- und exit-Aktivitäten, zusammengesetzte Zustände, Regionen, History-Zustände sowie die Zustandsübergangstabelle."
keywords:
    - UML
    - Zustandsdiagramm
    - Zustandsautomat
    - Transition
    - Guard
    - Entry-Aktion
    - Zusammengesetzter Zustand
    - Region
    - History-Zustand
    - Zustandsübergangstabelle
    - Verhaltensdiagramm
tags:
    - ap2
---

# Zustandsdiagramm

## Überblick

Ein Zustandsdiagramm ist ein **Verhaltensdiagramm** der UML. Es beschreibt den Lebenszyklus *eines einzelnen* Objekts, Bauteils oder Systems: welche Zustände es annehmen kann, welche Ereignisse es von einem Zustand in den nächsten überführen und was dabei geschieht.

Typische Anwendungsfälle:

- Bestellstatus in einem Shop-System (`New`, `Paid`, `Shipped`, `Delivered`, `Cancelled`)
- Sitzungs- und Anmeldeverwaltung (`Anonymous`, `Authenticated`, `Locked`, `Expired`)
- Geräte- und Verbindungszustände (`Off`, `Booting`, `Ready`, `Error`)
- Protokoll- und Parser-Logik, bei der das nächste Zeichen je nach Zustand unterschiedlich gedeutet wird
- Das innere Verhalten einer Klasse, deren Methoden nur in bestimmten Zuständen erlaubt sind

---

## Notation

| Element                   | Notation                                                                 | Bedeutung                                                                                 |
| ------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Startzustand              | Ausgefüllter Kreis `●`                                                   | Beginn des Lebenszyklus, genau einer je Region                                            |
| Zustand                   | Abgerundetes Rechteck mit Namen                                          | Eine Situation, in der das Objekt wartet, benannt als Adjektiv oder Substantiv            |
| Transition                | Pfeil von einem Zustand zum anderen                                      | Zustandswechsel, beschriftet mit `trigger [guard] / effect`, jeder Teil optional          |
| Auslöser (Trigger)        | Ereignisname an der Transition                                           | Das Ereignis, das die Transition anbietet, z.B. `cancel`, `timeout`                       |
| Abschlusstransition       | Transition ohne Auslöser                                                 | Feuert, sobald das Verhalten des Quellzustands beendet ist                                |
| Bedingung (Guard)         | `[condition]` an der Transition                                          | Boolescher Ausdruck, die Transition feuert nur, wenn er wahr ist                          |
| Effekt                    | `/ action` an der Transition                                             | Aktion, die beim Feuern der Transition ausgeführt wird, sie darf nicht blockieren         |
| Selbsttransition          | Pfeil, der denselben Zustand verlässt und wieder betritt                 | Der Zustand wird verlassen und erneut betreten, `exit` und `entry` laufen                 |
| Interne Transition        | `trigger / effect` innerhalb des Zustandsrechtecks                       | Reaktion ohne Zustandswechsel, `exit` und `entry` laufen **nicht**                        |
| Entry-Aktivität           | `entry / action` innerhalb des Zustandsrechtecks                         | Läuft bei jedem Betreten des Zustands, unabhängig von der genutzten Transition            |
| Do-Aktivität              | `do / activity` innerhalb des Zustandsrechtecks                          | Läuft fortlaufend, solange der Zustand aktiv ist, kann unterbrochen werden                |
| Exit-Aktivität            | `exit / action` innerhalb des Zustandsrechtecks                          | Läuft bei jedem Verlassen des Zustands, unabhängig von der genutzten Transition           |
| Zusammengesetzter Zustand | Zustandsrechteck, das weitere Zustände enthält                           | Ein Zustand, der in Unterzustände verfeinert ist                                          |
| Region                    | Teil eines zusammengesetzten Zustands, durch gestrichelte Linie getrennt | Unterzustände, die gleichzeitig aktiv sind                                                |
| Auswahlknoten (Choice)    | Raute an einer Transition                                                | Nach dem Effekt ausgewertete Verzweigung, die ausgehenden Transitionen tragen Bedingungen |
| Flache History            | Kreis mit `H`                                                            | Beim erneuten Betreten wird der zuletzt aktive Unterzustand dieser Ebene fortgesetzt      |
| Tiefe History             | Kreis mit `H*`                                                           | Setzt den zuletzt aktiven Unterzustand samt aller verschachtelten Ebenen fort             |
| Endzustand                | Ausgefüllter Kreis im Ring `◉`                                           | Der Lebenszyklus endet hier, das Objekt nimmt keine Ereignisse mehr an                    |

Benennungsregeln, die ein Diagramm lesbar halten:

- Zustände beschreiben eine Situation, keine Tätigkeit: `Paid`, `Waiting for payment`, nicht `Pay`
- Auslöser werden nach dem Ereignis benannt, nicht nach der verarbeitenden Methode: `cancel`, nicht `handleCancel`
- Effekte und interne Aktivitäten werden als Operationen mit Klammern notiert: `/ refundPayment()`

---

## Bausteine

### Zustände und Transitionen

```text
              ●
              │
              ▼
   ╭────────────────────────╮
   │         Idle           │
   ╰────────────────────────╯
              │
              │ coinInserted [amount >= price] / unlock()
              ▼
   ╭────────────────────────╮
   │        Ready           │
   ╰────────────────────────╯
              │
              │ productSelected / dispense()
              ▼
              ◉
```

Als Satz gelesen: *Tritt im Zustand `Idle` das Ereignis `coinInserted` ein und gilt die Bedingung `amount >= price`, so wird `unlock()` ausgeführt und der Automat wechselt nach `Ready`*. Tritt das Ereignis ein, ist die Bedingung aber falsch, wird das Ereignis verworfen und der Zustand ändert sich nicht.

### Selbsttransition

Nach einer Selbsttransition befindet sich das Objekt wieder im selben Zustand. Auf dem Weg dorthin wird der Zustand verlassen und erneut betreten, `exit` und `entry` laufen also, und eine `do`-Aktivität startet neu.

```text
        ┌───────────────────────────────────┐
        │   digitPressed / appendDigit()    │
        │                                   │
        │   ╭───────────────────────────╮   │
        └──►│        Collecting         │───┘
            ╰───────────────────────────╯
```

Ist der Neustart von `entry`, `do` und `exit` unerwünscht, wird stattdessen eine **interne Transition** verwendet. Sie wird innerhalb des Zustandsrechtecks notiert und lässt den Zustand aktiv:

```text
╭───────────────────────────────────────────╮
│               Collecting                  │
├───────────────────────────────────────────┤
│ digitPressed / appendDigit()              │
╰───────────────────────────────────────────╯
```

Ein Zeitablauf, der als `entry / startTimer()` umgesetzt ist, wird z.B. von einer Selbsttransition zurückgesetzt und von einer internen Transition weiterlaufen gelassen.

### Interne Aktivitäten

Drei Schlüsselwörter beschreiben Verhalten, das zum Zustand selbst gehört und nicht zu einer Transition:

- `entry / action`: wird bei jedem Betreten einmal ausgeführt, vor einer Do-Aktivität
- `do / activity`: läuft, solange der Zustand aktiv ist, darf lange dauern und kann von einer ausgehenden Transition unterbrochen werden
- `exit / action`: wird bei jedem Verlassen einmal ausgeführt, nachdem die Do-Aktivität beendet oder abgebrochen wurde

```text
╭───────────────────────────────────────────╮
│                 Heating                   │
├───────────────────────────────────────────┤
│ entry / switchHeaterOn()                  │
│ do / measureTemperature()                 │
│ exit / switchHeaterOff()                  │
╰───────────────────────────────────────────╯
```

Die Reihenfolge bei einem Zustandswechsel lautet immer: `exit` des Quellzustands, dann der Effekt der Transition, dann `entry` des Zielzustands.

Eine Aktion in `entry` statt an jeder eingehenden Transition zu notieren, vermeidet Doppelungen und stellt sicher, dass sie nicht vergessen wird, wenn später eine neue Transition in diesen Zustand hinzukommt.

### Zusammengesetzte Zustände

Ein zusammengesetzter Zustand enthält einen eigenen Automaten. Er hält Diagramme klein und erlaubt es, eine Transition einmalig für eine ganze Gruppe von Unterzuständen zu zeichnen.

```text
╭────────────────────────────────────────────────────────╮
│ Active                                                 │
│                                                        │
│    ●                                                   │
│    │                                                   │
│    ▼                                                   │
│  ╭───────────────────╮  connected  ╭───────────────────╮
│  │     Dialling      │────────────►│    Talking        │
│  ╰───────────────────╯             ╰───────────────────╯
│                                                        │
╰────────────────────────────────────────────────────────╯
              │
              │ hangUp
              ▼
   ╭───────────────────╮
   │       Idle        │
   ╰───────────────────╯
```

Die Transition `hangUp` beginnt am *Rand* des zusammengesetzten Zustands und gilt damit für `Dialling` und `Talking` gleichermaßen.

Regeln, die dabei zu beachten sind:

- Ein zusammengesetzter Zustand braucht einen eigenen Startzustand, sonst ist undefiniert, welcher Unterzustand aktiv wird
- Es ist immer genau ein Unterzustand je Region aktiv, zusammen mit dem umgebenden zusammengesetzten Zustand
- Eine Transition darf auch direkt auf einen Unterzustand zeigen und umgeht damit den Startzustand
- Ein Endzustand innerhalb eines zusammengesetzten Zustands beendet den inneren Automaten, was die ausgehende Abschlusstransition des zusammengesetzten Zustands auslöst

### Regionen und parallele Zustände

Ein zusammengesetzter Zustand kann durch eine gestrichelte Linie in **Regionen** geteilt werden. Jede Region hat einen eigenen Startzustand, eigene Unterzustände und eigene Transitionen. Solange der zusammengesetzte Zustand aktiv ist, ist in jeder Region gleichzeitig ein Unterzustand aktiv. So lassen sich unabhängige Aspekte eines Objekts modellieren, etwa Ton und Bild einer Aufzeichnung.

```text
╭──────────────────────────────────────────────────────────╮
│ Recording                                                │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮   muteAudio   ╭───────────────╮       │
│  │ AudioRunning  │──────────────►│  AudioMuted   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮  pauseVideo   ╭───────────────╮       │
│  │ VideoRunning  │──────────────►│ VideoPaused   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

Ein Ereignis wird jeder Region angeboten. Es kann in einer Region, in mehreren oder in keiner eine Transition auslösen.

### History-Zustand

Ein History-Zustand beantwortet die Frage, *wo der Automat nach einer Unterbrechung weitermacht*. Ohne ihn beginnt das erneute Betreten eines zusammengesetzten Zustands stets an dessen Startzustand.

```text
              ╭──────────────────────────────────────────╮
              │ Playing                                  │
   resume     │                                          │
 ┌───────────►│   (H)                                    │
 │            │    │                                     │
 │            │    ▼                                     │
 │            │  ╭───────────╮        ╭───────────╮      │
 │            │  │  Track 1  │───────►│  Track 2  │      │
 │            │  ╰───────────╯        ╰───────────╯      │
 │            ╰──────────────────────────────────────────╯
 │                           │ pause
 │            ╭──────────────▼───────────╮
 └────────────│          Paused          │
              ╰──────────────────────────╯
```

Die flache History `(H)` stellt den Unterzustand wieder her, der auf dieser Ebene zuletzt aktiv war. Eine tiefe History `(H*)` stellt die letzte Konfiguration samt aller verschachtelten Ebenen wieder her. Wurde der zusammengesetzte Zustand noch nie betreten, fällt die Transition in den History-Zustand auf den Startzustand zurück.

---

## Zustandsübergangstabelle

Ein Zustandsdiagramm lässt sich auch als **Zustandsübergangstabelle** schreiben. Die Tabelle lässt sich leichter auf Vollständigkeit prüfen als das Diagramm, weil fehlende Kombinationen aus Zustand und Ereignis auffallen, wenn die Zeilen nach Zustand gruppiert sind.

| Aktueller Zustand | Ereignis          | Bedingung         | Effekt                 | Folgezustand |
| ----------------- | ----------------- | ----------------- | ---------------------- | ------------ |
| `New`             | `itemAdded`       | –                 | `recalculateTotal()`   | –            |
| `New`             | `paymentReceived` | –                 | `capturePayment()`     | `Paid`       |
| `New`             | `cancel`          | –                 | `releaseReservation()` | `Cancelled`  |
| `Paid`            | `dispatched`      | `allItemsInStock` | `sendTrackingMail()`   | `Shipped`    |
| `Paid`            | `cancel`          | –                 | `refundPayment()`      | `Cancelled`  |
| `Shipped`         | `delivered`       | –                 | –                      | `Delivered`  |

Eine Kombination, die nicht in der Tabelle steht, löst keine Transition aus. Das Ereignis wird wirkungslos verworfen.

Eine Zeile mit leerer Spalte *Folgezustand* und gefüllter Spalte *Effekt* beschreibt eine interne Transition. Eine Zeile, deren aktueller Zustand und Folgezustand identisch sind, beschreibt eine Selbsttransition.

---

## Beispiel: Bestellstatus

Der Lebenszyklus einer Bestellung in einem Shop-System, von der Anlage bis zur Zustellung oder Stornierung.

```text
                          ●
                          │
                          ▼
                ╭────────────────────────╮
                │          New           │
                │ entry / reserveItems() │
                ╰────────────────────────╯
                     │              │
    paymentReceived  │              │ cancel
    / capturePayment()              │ / releaseReservation()
         ┌───────────┘              └────────────┐
         ▼                                       │
╭────────────────────────╮                       │
│          Paid          │──────────────────────►┤
╰────────────────────────╯  cancel               │
         │                  / refundPayment()    │
         │ dispatched [allItemsInStock]          │
         │ / sendTrackingMail()                  ▼
         ▼                          ╭────────────────────────╮
╭────────────────────────╮          │       Cancelled        │
│        Shipped         │          ╰────────────────────────╯
╰────────────────────────╯                       │
         │                                       │
         │ delivered                             │
         ▼                                       │
╭────────────────────────╮                       │
│       Delivered        │                       │
╰────────────────────────╯                       │
         │                                       │
         └───────────────────┐   ┌───────────────┘
                             ▼   ▼
                             ◉
```

Was sich aus diesem Beispiel ablesen lässt:

- Die Rückerstattung steht an der Transition `Paid => Cancelled` und **nicht** als `entry`-Aktivität von `Cancelled`, denn eine aus `New` stornierte Bestellung wurde nie bezahlt.
- `dispatched` trägt eine Bedingung. Fehlt Bestand, bleibt die Bestellung in `Paid`.
- `Shipped` hat keine Transition für `cancel`. Die fachliche Regel *eine versandte Bestellung ist nicht mehr stornierbar* wird durch das Fehlen einer Transition ausgedrückt.

Im Code umgesetzt wird jeder Zustand zu einem Wert einer Aufzählung, und die Tabelle wird zu einem `switch` über Zustand und Ereignis. Alles, was nicht in der Tabelle steht, fällt in den Default-Zweig und wird abgewiesen. Ein ungültiger Zustandswechsel ist damit bauartbedingt unmöglich.

---

## Abgrenzung zum Aktivitätsdiagramm

| Aspekt              | Zustandsdiagramm                            | [Aktivitätsdiagramm](./activity-diagram.md)     |
| ------------------- | ------------------------------------------- | ----------------------------------------------- |
| Knoten              | Ein **Zustand**, das Objekt wartet          | Eine **Aktion**, es wird gearbeitet             |
| Benennung           | Adjektiv oder Substantiv: `Paid`            | Verb + Objekt: `Capture payment`                |
| Pfeil               | Wird durch ein **Ereignis** ausgelöst       | Feuert, wenn die vorige Aktion **beendet** ist  |
| Betrachtungsbereich | Der Lebenszyklus eines Objekts              | Ein Prozessdurchlauf, ggf. über mehrere Akteure |
| Verzweigung         | Bedingungen an ausgehenden Transitionen     | Entscheidungsknoten mit Guards an den Flüssen   |
| Nebenläufigkeit     | Regionen in einem zusammengesetzten Zustand | Parallelisierung und Synchronisation            |
| Typische Frage      | *In welchem Zustand ist die Bestellung?*    | *Welcher Schritt kommt als Nächstes?*           |

Lässt sich ein Pfeil nur mit etwas wie *danach* beschriften, ist ein Aktivitätsdiagramm die richtige Wahl. Braucht der Pfeil einen Namen wie `cancel`, `timeout` oder `paymentReceived`, passt ein Zustandsdiagramm.

---

## Häufige Fehler

1. **Tätigkeiten als Zustandsnamen:** `Pay` ist eine Aktion und gehört in ein Aktivitätsdiagramm. Der Zustand heißt `Paid` oder `Waiting for payment`.
2. **Transitionen ohne Auslöser:** Ein Pfeil zwischen zwei Zuständen ohne Ereignis ist eine Abschlusstransition. Er feuert, sobald der Quellzustand sein Verhalten beendet hat.
3. **Überlappende Bedingungen:** Können bei zwei Transitionen mit demselben Auslöser beide Bedingungen zugleich wahr sein, ist das Verhalten undefiniert. Die Bedingungen müssen sich gegenseitig ausschließen.
4. **Bedingung mit Auslöser verwechselt:** `[cancel]` ist eine Bedingung, kein Ereignis. `cancel [orderNotShipped]` trennt beides korrekt.
5. **Fehlender Startzustand:** Ohne ihn ist der Anfangszustand undefiniert. Jedes Diagramm und jede Region braucht genau einen.
6. **Unerreichbare oder ausweglose Zustände:** Ein Zustand ohne eingehende Transition wird nie erreicht. Ein Zustand ohne ausgehende Transition, der kein Endzustand ist, hält das Objekt fest.
7. **Selbsttransition statt interner Transition:** Eine Selbsttransition startet `entry`, `do` und `exit` neu. Ein in `entry` gestarteter Zeitgeber wird dadurch zurückgesetzt.
8. **Zustandsexplosion:** Werden unabhängige Aspekte in eine flache Zustandsmenge gepresst, vervielfacht sich die Anzahl der Zustände. Regionen oder zusätzliche Attribute vermeiden das.

---

## Werkzeuge

- draw.io / diagrams.net (kostenlos, browserbasiert, UML-Formenbibliothek enthalten)
- PlantUML (textbasiert, das Diagramm wird aus Quelltext erzeugt und lässt sich versionieren)
- Mermaid (textbasiert, `stateDiagram-v2` wird auf vielen Plattformen direkt in Markdown gerendert)
- Visual Paradigm, StarUML, Lucidchart (kommerziell, mit kostenlosen Tarifen)

## Siehe auch

- [Aktivitätsdiagramm](./activity-diagram.md): die Prozesssicht, Aktionen und Kontrollfluss statt Zuständen und Ereignissen
- [Sequenzdiagramm](./sequence-diagram.md): zeigt im zeitlichen Verlauf, welche Nachrichten die hier verwendeten Ereignisse auslösen
- [Klassendiagramm](./class-diagram.md): die Klasse, deren Lebenszyklus ein Zustandsdiagramm beschreibt
- [Anwendungsfalldiagramm](./use-case-diagram.md): die Außensicht, aus der die Ereignisse eines Automaten stammen
- [UML-Überblick](./uml-overview.mdx): Einordnung der Diagrammarten in Struktur und Verhalten
- [UML-Notationsgrundlagen](./uml-notation-basics.md): Notationselemente, die alle Diagrammarten gemeinsam haben
- [Weitere UML-Diagramme](./further-uml-diagrams.md): die übrigen Diagrammarten im Überblick
