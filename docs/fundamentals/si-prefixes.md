---
title: SI Prefixes
description: Common SI (metric) prefixes and their multipliers, from femto to tera, used to scale units like meters, grams, seconds, volts, watts, and hertz.
keywords:
    - SI Prefixes
    - Metric Prefixes
    - Units
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
    - Femto
---

:::info
This page has not been translated into German yet
:::

# SI Prefixes

SI prefixes are standardized multipliers attached to a base unit to express very large or very small quantities.  
They apply to any SI unit: meters, grams, seconds, volts, watts, hertz, and so on.

## Common Prefixes

The table is ordered from the largest prefix down to the smallest. The base unit (factor 1) sits in the middle.

| Prefix | Symbol | Factor                | Power | Example         |
| ------ | ------ | --------------------- | ----- | --------------- |
| tera   | T      | 1,000,000,000,000     | 10¹²  | TB, THz         |
| giga   | G      | 1,000,000,000         | 10⁹   | GHz, GW         |
| mega   | M      | 1,000,000             | 10⁶   | MW, MΩ          |
| kilo   | k      | 1,000                 | 10³   | km, kg, kV, kWh |
| —      | —      | 1                     | 10⁰   | m, g, V, W      |
| deci   | d      | 0.1                   | 10⁻¹  | dl, dm          |
| centi  | c      | 0.01                  | 10⁻²  | cm              |
| milli  | m      | 0.001                 | 10⁻³  | mm, mV, ms      |
| micro  | µ      | 0.000001              | 10⁻⁶  | µs, µm, µF      |
| nano   | n      | 0.000000001           | 10⁻⁹  | nm, ns          |
| pico   | p      | 0.000000000001        | 10⁻¹² | pF, ps          |

:::info
The "main" sequence (kilo => mega => giga => tera and milli => micro => nano => pico) goes in steps of **1,000** (10³) per prefix. **Deci** and **centi** sit between the base unit and milli as smaller intermediate steps (10⁻¹ and 10⁻²).
:::

## Scaling Between Prefixes

Each prefix is just a power of 10 (see the [Power](#common-prefixes) column above). To convert between two prefixes, take the difference of their powers and apply it as steps.

### Upward (Smaller => Larger)

```text
Formula: value / 10^steps

Example: 2,500 mV => V
Steps: mV (10⁻³) => V (10⁰) = 3 powers of 10
2,500 mV / 10³ = 2.5 V
```

### Downward (Larger => Smaller)

```text
Formula: value x 10^steps

Example: 5 km => mm
Steps: km (10³) => mm (10⁻³) = 6 powers of 10
5 km x 10⁶ = 5,000,000 mm
```

## Common Examples in Practice

- **kV** — kilovolt, 1,000 V (high-voltage power lines)
- **mA** — milliampere, 0.001 A (small electronics)
- **MHz** — megahertz, 1,000,000 Hz (radio frequencies, CPU clocks)
- **nm** — nanometer, 0.000000001 m (semiconductor process nodes, light wavelengths)
- **kWh** — kilowatt-hour, 1,000 Wh (electricity bills)
- **µF** — microfarad, 0.000001 F (capacitor values)

## See Also

- [Bit, Byte & Unit Conversions](./bit-byte-conversions.md): applies these prefixes to bytes (decimal) and contrasts them with the binary IEC prefixes (kibi, mebi, gibi, etc.)
- [Electrical Units](./electrical-units.md): uses these prefixes for V, A, W, Wh, etc.
