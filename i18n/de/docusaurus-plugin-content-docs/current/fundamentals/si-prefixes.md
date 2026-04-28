---
title: "SI Präfixe"
description: "Gängige SI (metrische) Präfixe und deren Multiplikatoren von Pico zu Tera, die zur Skalierung von Einheiten wie Metern, Gramm, Sekunden, Volt, Watt oder Hertz verwendet werden."
keywords:
    - SI Präfixe
    - Metrische Präfixe
    - Einheiten
    - Tera
    - Giga
    - Mega
    - Kilo
    - Deci
    - Centi
    - Milli
    - Micro
    - Nano
    - Pico
---

# SI Präfixe

SI Präfixe sind standardisierte Multiplikatoren, die an eine Basiseinheit angehängt werden, um sehr große oder sehr kleine Einheiten abzubilden.  
Sie gelten für alle SI-Einheiten: Meter, Gramm, Sekunden, Volt, Watt, Hertz und so weiter.

## Gängige Präfixe

Die Tabelle ist absteigend vom größten zum kleinsten Präfix geordnet. Die Basiseinheit (Faktor 1) befindet sich in der Mitte.

| Präfix | Symbol | Faktor            | Potenz | Beispiel        |
| ------ | ------ | ----------------- | ------ | --------------- |
| tera   | T      | 1.000.000.000.000 | 10¹²   | TB, THz         |
| giga   | G      | 1.000.000.000     | 10⁹    | GHz, GW         |
| mega   | M      | 1.000.000         | 10⁶    | MW, MΩ          |
| kilo   | k      | 1.000             | 10³    | km, kg, kV, kWh |
| —      | —      | 1                 | 10⁰    | m, g, V, W      |
| deci   | d      | 0,1               | 10⁻¹   | dl, dm          |
| centi  | c      | 0,01              | 10⁻²   | cm              |
| milli  | m      | 0,001             | 10⁻³   | mm, mV, ms      |
| micro  | µ      | 0,000001          | 10⁻⁶   | µs, µm, µF      |
| nano   | n      | 0,000000001       | 10⁻⁹   | nm, ns          |
| pico   | p      | 0,000000000001    | 10⁻¹²  | pF, ps          |

:::info
Die "Haupt"-Reihenfolge (kilo => mega => giga => tera und milli => micro => nano => pico) erfolgt in Schritten von **1.000** (10³) pro Präfix. **Deci** und **centi** befinden sich mit kleineren Zwischenschritten (10⁻¹ und 10⁻²) zwischen der Basiseinheit und Milli.
:::

## Skalierung zwischen Präfixen

Jedes Präfix entspricht lediglich einer Potenz von 10 (siehe die Spalte [Potenz](#gängige-präfixe) oben). Um zwischen zwei Präfixen umzurechnen, berechnet man die Differenz zwischen den Potenzen und wendet diese als Schrittzahl an.

### Aufwärts (Kleiner => Größer)

```text
Formel: Wert / 10^Schritte

Beispiel: 2,500 mV => V
Schritte: mV (10⁻³) => V (10⁰) = 3 Zehnerpotenzen
2,500 mV / 10³ = 2.5 V
```

### Abwärts (Größer => Kleiner)

```text
Formel: Wert x 10^Schritte

Beispiel: 5 km => mm
Schritte: km (10³) => mm (10⁻³) = 6 Zehnerpotenzen
5 km x 10⁶ = 5,000,000 mm
```

## Gängige Beispiele in der Praxis

- **kV** — Kilovolt, 1.000 V (Hochspannungsleitungen)
- **mA** — Milliampere, 0,001 A (Kleinelektronik)
- **MHz** — Megahertz, 1.000.000 Hz (Radiofrequenzen, CPU-Taktfrequenzen)
- **nm** — Nanometer, 0,000000001 m (Halbleiterprozessknoten, Lichtwellenlänge)
- **kWh** — Kilowattstunde, 1.000 Wh (Stromrechnungen)
- **µF** — Microfarad, 0,000001 F (Kondensatorwerte)

## Siehe auch

- [Bit, Byte & Unit Conversions](./bit-byte-conversions.md): wendet diese Präfixe auf Bytes (dezimal) an und stellt sie den binären IEC-Präfixen (kibi, mebi, gibi, usw.) gegenüber
- [Elektrische Einheiten](./electrical-units.md): nutzt diese Präfixe für V, A, W, Wh, usw.
