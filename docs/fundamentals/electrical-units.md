---
title: Electrical Units – Power, Voltage, Current, and Energy
description: The relationship between power (P), voltage (U), current (I), resistance (R), and electrical work/energy (W). Including the power triangle, Ohm's law, and kilowatt-hours.
keywords:
    - Electrical Units
    - Power
    - Voltage
    - Current
    - Watt
    - Volt
    - Ampere
    - Ohm's Law
    - Power Triangle
    - Electrical Work
    - Energy
    - Joule
    - Kilowatt-hour
    - kWh
---

# Electrical Units – Power, Voltage, Current, and Energy

## The Three Core Units

| Symbol | Quantity | Unit       |
| ------ | -------- | ---------- |
| P      | Power    | Watt (W)   |
| U      | Voltage  | Volt (V)   |
| I      | Current  | Ampere (A) |

## The Power Triangle

The three quantities are related by the formula **P = U x I**. Covering the quantity you want to calculate reveals the formula:

```text
      P
    -----
    U | I
```

- **P = U x I** (Power = Voltage x Current)
- **U = P / I** (Voltage = Power / Current)
- **I = P / U** (Current = Power / Voltage)

## Ohm's Law

Ohm's Law introduces resistance **R** (measured in Ohms, Ω) and connects it to voltage and current.

The same triangle approach applies here:

```text
      U
    -----
    R | I
```

- **U = R x I** (Voltage = Resistance x Current)
- **R = U / I** (Resistance = Voltage / Current)
- **I = U / R** (Current = Voltage / Resistance)

## Combined Formulas

Combining the power formula with Ohm's Law gives additional ways to calculate power:

- **P = U² / R**
- **P = I² x R**

## Examples

**Example 1:** A device runs at 230 V and draws 2 A. What is its power consumption (P)?

```text
P = U x I = 230 V x 2 A = 460 W
```

**Example 2:** A 100 W bulb operates at 230 V. How much current (I) does it draw?

```text
I = P / U = 100 W / 230 V ≈ 0.43 A
```

**Example 3:** A resistor of 50 Ω carries 3 A. What voltage drops across it?

```text
U = R x I = 50 Ω x 3 A = 150 V
```

## Electrical Work (Energy)

Electrical work **W** (often called energy, sometimes written as **E**) is the amount of energy a device consumes or produces over time. The SI unit is the **Joule (J)**, but in everyday electrical use it is more commonly given in **Watt-hours (Wh)** or **Kilowatt-hours (kWh)**.

The basic formula is:

- **W = P x t** (Work = Power x Time)

Replacing **P** with **U x I** gives a form that calculates **W** directly from **U**, **I**, and **t**, without needing to calculate **P** first:

- **W = U x I x t**

### Common Units of Energy

| Unit          | Symbol | Equals                 |
| ------------- | ------ | ---------------------- |
| Joule         | J      | 1 W x 1 s              |
| Watt-hour     | Wh     | 3,600 J                |
| Kilowatt-hour | kWh    | 1,000 Wh = 3,600,000 J |

:::info
The symbol **W** is used for both the unit "Watt" (a unit of power) and the quantity "work". Context usually makes the meaning clear. Some sources use **E** for "work" to avoid confusion.
:::

### Examples

**Example 1:** A 60 W light bulb runs for 5 hours. How much energy does it consume?

```text
W = P x t = 60 W x 5 h = 300 Wh = 0.3 kWh
```

**Example 2:** A device draws 2 A at 230 V for 30 minutes. How much energy does it use?

```text
W = U x I x t = 230 V x 2 A x 0.5 h = 230 Wh
```

**Example 3:** An electricity bill shows 250 kWh consumed at €0.30 per kWh. What is the total cost?

```text
Cost = 250 kWh x €0.30/kWh = €75.00
```
