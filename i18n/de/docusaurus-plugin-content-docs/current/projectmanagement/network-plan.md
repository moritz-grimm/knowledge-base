---
title: "Netzplan"
description: "Ein Netzplan stellt ein Projekt als einen gerichteten Graphen dar, um Abhängigkeiten zu erkennen, die frühesten und spätesten Zeitpunkte zu berechnen und den kritischen Pfad festzulegen."
keywords:
    - Netzplan
    - CPM
    - Kritischer Pfad
    - Projektplanung
    - Projektmanagement
---

# Netzplan

## Überblick

:::info
Es gibt verschiedene Netzplanmethoden, z.B. CPM (Critical Path Method), PERT und MPM. Dieser Artikel behandelt die CPM.
:::

Ein Netzplan ist ein gerichteter Graph, der Aufgaben als Knoten darstellt, mit Pfeilen, die die Abhängigkeiten widerspiegeln. Es erlaubt präzise Planung und Identifizierung von Engpässen.

## Knoten Struktur

Jeder Knoten im Netzplan enthält folgende Felder:

```text
┌──────────────────────────────┐
│        Aufgabenname          │
├──────────────┬───────────────┤
│ FAZ          │ FEZ           │
├──────────────┼───────────────┤
│ Gesamtpuffer │ Freier Puffer │
├──────────────┼───────────────┤
│ SAZ          │ SEZ           │
├──────────────┴───────────────|
|            Dauer             │   
└──────────────────────────────┘
```

- **FAZ** (Frühester Anfangszeitpunkt): frühestens, wann die Aufgabe beginnen kann
- **FEZ** (Frühester Endzeitpunkt): frühestens, wann die Aufgabe enden kann
- **SAZ** (Spätester Anfangszeitpunkt): spätestens, wann die Aufgabe beginnen kann ohne das Projekt zu verzögern
- **SEZ** (Spätester Endzeitpunkt): spätestens, wann die Aufgabe enden kann
- **Freier Puffer**: `min(FAZ aller Nachfolger) − FEZ`; wie weit eine Aufgabe verschoben werden kann, ohne einen direkten Nachfolger zu verzögern
- **Gesamtpuffer**: `SAZ − FAZ`; die Menge an Zeit, die eine Aufgabe verzögert werden kann, ohne das Projektende zu verzögern

## Pufferarten

**Freier Puffer** beschreibt *lokale* Flexibilität: wie lange eine Aufgabe verschoben werden kann, bevor ein direkter Nachfolger betroffen ist. Er betrachtet nur den nächsten Schritt im Netz.

**Gesamtpuffer** beschreibt *globale* Flexibilität: wie lange eine Aufgabe verschoben werden kann, bevor das gesamte Projektende betroffen ist, unabhängig von Zwischenwirkungen.

Es gilt stets `Freier Puffer ≤ Gesamtpuffer`. Wenn `Gesamtpuffer > Freier Puffer`, verschiebt eine Verzögerung größer als der Freie Puffer einen Nachfolger im Netz, jedoch hat dieser Nachfolger selbst genug Gesamtpuffer, um die Auswirkung aufzufangen, ohne das Projektende zu verschieben. Aufgaben auf dem kritischen Pfad haben beide Werte gleich Null.

## Berechnung des Plans

**Vorwärts Berechnung** – Berechnung des FAZ und FEZ von Links nach Rechts:

- FEZ = FAZ + Dauer
- Wenn eine Aufgabe mehrere Vorgänger hat => FAZ = der maximale FEZ aller Vorgänger

**Rückwärts Berechnung** – Berechnung von SAZ und SEZ von Rechts nach Links:

- SAZ = SEZ − Dauer
- Wenn eine Aufgabe mehrere Nachfolger hat => SEZ = der minimale SAZ aller Nachfolger

## Kritischer Pfad

Der kritische Pfad ist die längste Sequenz von aufeinander abhängigen Aufgaben von Projektbeginn bis zum Projektende. Aufgaben auf dem kritischen Pfad haben alle einen **Gesamtpuffer von Null**, jegliche Verzögerung hier verschiebt das gesamte Projektende direkt nach hinten.

## Vorteile

- Explizite Abbildung von Abhängigkeiten
- Identifiziert den kritischen Pfad und Planungsengpässe
- Erlaubt präzise Berechnung der frühestens und spätestens Start- und Endzeiten
- Am besten geeignet für komplexe Projekte mit vielen Abhängigkeiten

## Nachteile

- Komplexer in der Erstellung und schwerer zu lesen als ein [Gantt-Diagramm](./gantt.md)
- Weniger intuitiv für nicht-technische Stakeholder
- Benötigt präzise Zeiteinschätzungen um nützlich zu sein

## Beispiel

**Projekt:** Website-Launch

| ID | Vorgang               | Dauer  | Vorgänger |
|----|-----------------------|--------|-----------|
| A  | Anforderungsanalyse   | 2 Tage | —         |
| B  | UI-Design             | 3 Tage | A         |
| C  | Backend-Entwicklung   | 5 Tage | A         |
| D  | Frontend-Entwicklung  | 4 Tage | B         |
| E  | Integration           | 2 Tage | C, D      |
| F  | Testen                | 3 Tage | E         |
| G  | Bereitstellung        | 1 Tag  | F         |

**Netzplanstruktur:**

```text
    ┌──► B ──► D ───┐
A ──┤               ├──► E ──► F ──► G
    └──► C ─────────┘
```

**Berechnete Knotenwerte:**

```text
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  A: Anforderungen    │      │  B: UI-Design        │      │  C: Backend-Entw.    │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  FAZ: 0  │  FEZ: 2   │      │  FAZ: 2  │  FEZ: 5   │      │  FAZ: 2  │  FEZ: 7   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  GP:  0  │  FP:  0   │      │  GP:  0  │  FP:  0   │      │  GP:  2  │  FP:  2   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  SAZ: 0  │  SEZ: 2   │      │  SAZ: 2  │  SEZ: 5   │      │  SAZ: 4  │  SEZ: 9   │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│      Dauer: 2        │      │      Dauer: 3        │      │      Dauer: 5        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  D: Frontend-Entw.   │      │  E: Integration      │      │  F: Testen           │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  FAZ: 5  │  FEZ: 9   │      │  FAZ: 9  │  FEZ: 11  │      │  FAZ: 11 │  FEZ: 14  │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  GP:  0  │  FP:  0   │      │  GP:  0  │  FP:  0   │      │  GP:  0  │  FP:  0   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  SAZ: 5  │  SEZ: 9   │      │  SAZ: 9  │  SEZ: 11  │      │  SAZ: 11 │  SEZ: 14  │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│      Dauer: 4        │      │      Dauer: 2        │      │      Dauer: 3        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐
│  G: Bereitstellung   │
├──────────┬───────────┤
│  FAZ: 14 │  FEZ: 15  │
├──────────┼───────────┤
│  GP:  0  │  FP:  0   │
├──────────┼───────────┤
│  SAZ: 14 │  SEZ: 15  │
├──────────┴───────────┤
│      Dauer: 1        │
└──────────────────────┘
```

**Kritischer Pfad:** A => B => D => E => F => G (15 Tage gesamt)

Vorgang C hat einen Gesamtpuffer von 2 Tagen (der hier auch dem Freien Puffer entspricht) und liegt nicht auf dem kritischen Pfad, die Backend-Entwicklung kann sich also um bis zu 2 Tage verzögern, ohne einen Nachfolger oder das Projektende zu verschieben.
