---
title: "Analog-Digital-Wandler (ADC)"
description: "Wie ein Analog-Digital-Wandler eine kontinuierliche Spannung in einen digitalen Wert umsetzt – einschließlich Auflösung, Quantisierungsstufen, Messauflösung und der Formeln zur Berechnung eines binären Ausgangswerts."
keywords:
    - Analog-Digital-Wandler
    - ADC
    - AD-Wandler
    - Auflösung
    - Quantisierung
    - Bit
    - Abtastung
    - Spannungsbereich
    - Mikrocontroller
    - Sensor
---

# Analog-Digital-Wandler (ADC)

## Wozu ein ADC benötigt wird

Ein Sensor misst eine physikalische Größe (Temperatur, Licht, Druck usw.) und gibt ein dazu proportionales **analoges** Signal aus, meist eine kontinuierliche Spannung. Ein Mikrocontroller oder ein Raspberry Pi kann jedoch nur **digitale** Werte verarbeiten. Viele Boards (z.B. der Raspberry Pi) besitzen gar keinen analogen Eingang und würden nur `0` oder `1` erkennen.

Ein **Analog-Digital-Wandler (ADC)** schließt diese Lücke: Er tastet die analoge Spannung ab und kodiert sie als digitale Zahl. Das Ergebnis wird anschließend an den Controller übertragen, oft über einen Bus wie I²C.

## Auflösung und Quantisierungsstufen

Die **Auflösung** eines ADC wird in **Bit** angegeben. Die Anzahl der Bits bestimmt, wie viele unterschiedliche digitale Werte (**Quantisierungsstufen**) der Wandler ausgeben kann:

```text
Anzahl der Stufen = 2^n        (n = Auflösung in Bit)
```

- 8 Bit  => 2^8  = 256 Stufen
- 10 Bit => 2^10 = 1024 Stufen
- 16 Bit => 2^16 = 65536 Stufen

Mehr Bits bedeuten eine feinere Unterteilung des Eingangsbereichs und damit eine genauere Messung.

## Messauflösung (kleinste erkennbare Änderung)

Die **Messauflösung** ist die kleinste Spannungsänderung, die noch einem anderen digitalen Wert zugeordnet wird. Sie ergibt sich aus dem Spannungsbereich geteilt durch die Anzahl der Stufen:

```text
Auflösung = Spannungsbereich / Anzahl der Stufen
```

**Beispiel:** Ein 10-Bit-ADC misst einen Bereich von 0 V bis 10 V.

```text
Stufen = 2¹⁰ = 1024 Stufen
Auflösung = 10 V / 1024 = 0,009766 V ≈ 9,77 mV
```

Eine Änderung kleiner als ~9,77 mV kann dieser Wandler nicht unterscheiden.

## Vom Messwert zum binären Ausgang

Die Umrechnung eines physikalischen Messwerts in den digitalen Ausgang des ADC erfolgt in drei Schritten.

**Szenario:** Ein Temperatursensor deckt einen Bereich von -20 °C bis +80 °C ab und gibt eine dazu proportionale Spannung von 0 V bis 10 V aus. Der ADC hat eine Auflösung von 10 Bit. Welcher binäre Wert entspricht genau 25 °C?

**Schritt 1 — Den Messwert in eine Spannung umrechnen.**

Zuerst wird die Spannung pro Einheit bestimmt und dann damit multipliziert, wie weit der Wert über dem Minimum liegt:

```text
Spannungsspanne / Temperaturspanne = 10 V / 100 °C = 0,1 V pro °C

25 °C liegen 45 °C über dem Minimum von -20 °C
U = 45 °C x 0,1 V = 4,5 V
```

**Schritt 2 — Die Spannung in einen digitalen Wert umrechnen.**

```text
Digitalwert = (U / Spannungsbereich) x Anzahl der Stufen
Digitalwert = (4,5 V / 10 V) x 1024 = 460,8 ≈ 461
```

Das Ergebnis wird auf die nächste ganze Stufe gerundet, da der Ausgang nur eine ganze Zahl sein kann.

**Schritt 3 — Den Wert binär darstellen.**

```text
461 = 0001 1100 1101
```

:::info
Manche Lehrbücher teilen durch `2^n - 1` (hier 1023) statt durch `2^n` (1024), damit der maximale Eingang exakt auf den höchsten Code abgebildet wird. Beide Konventionen kommen in der Praxis vor; der Unterschied ist bei höheren Auflösungen vernachlässigbar. Diese Seite verwendet `2^n` passend zur Stufenzahl.
:::

## Siehe auch

- [Raspberry Pi Überblick](./raspberry-pi.md): warum der Pi einen ADC benötigt, um einen analogen Sensor auszulesen
- [Elektrische Einheiten](./electrical-units.md): Spannung, Stromstärke, Leistung und die Formeln, die sie verbinden
<!-- TODO: Add back as soon as a german bit-byte-conversion.md entry exists [Bit, Byte & Einheitenumrechnungen](./bit-byte-conversions.md): die binären Grundlagen hinter dem digitalen Ausgang -->
- [Pulsweitenmodulation (PWM)](./pulse-width-modulation.md): die umgekehrte Idee — einen analogen Pegel mit einem digitalen Ausgang annähern
