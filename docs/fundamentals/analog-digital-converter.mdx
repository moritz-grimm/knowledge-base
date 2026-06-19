---
title: "Analog-to-Digital Converter (ADC)"
description: "How an analog-to-digital converter turns a continuous voltage into a digital value, including resolution, quantization steps, measurement resolution, and the formulas to calculate a binary output."
keywords:
    - Analog-to-Digital Converter
    - ADC
    - A/D Converter
    - Resolution
    - Quantization
    - Bit
    - Sampling
    - Voltage Range
    - Microcontroller
    - Sensor
---

# Analog-to-Digital Converter (ADC)

## Why an ADC Is Needed

A sensor measures a physical quantity (temperature, light, pressure, etc.) and outputs a proportional **analog** signal, usually a continuous voltage. A microcontroller or a Raspberry Pi can only process **digital** values. Many boards (for example the Raspberry Pi) have no analog input at all and would only ever read `0` or `1`.

An **analog-to-digital converter (ADC)** bridges this gap: it samples the analog voltage and encodes it as a digital number. The result is then transferred to the controller, often over a bus such as I²C.

## Resolution and Quantization Steps

The **resolution** of an ADC is given in **bits**. The number of bits determines how many distinct digital values (**quantization steps**) the converter can output:

```text
Number of steps = 2^n        (n = resolution in bits)
```

- 8-bit  => 2^8  = 256 steps
- 10-bit => 2^10 = 1024 steps
- 16-bit => 2^16 = 65536 steps

More bits means a finer division of the input range and therefore a more precise measurement.

## Measurement Resolution (Smallest Detectable Change)

The **measurement resolution** is the smallest voltage change that still maps to a different digital value. It is the voltage range divided by the number of steps:

```text
Resolution = voltage range / number of steps
```

**Example:** A 10-bit ADC measures a range of 0 V to 10 V.

```text
Steps = 2¹⁰ = 1024 steps
Resolution = 10 V / 1024 steps = 0.009766 V ≈ 9.77 mV
```

Any change smaller than ~9.77 mV cannot be distinguished by this converter.

## From a Measured Value to a Binary Output

Converting a physical measurement into the ADC's digital output is done in three steps.

**Scenario:** A temperature sensor covers -20 °C to +80 °C and outputs a proportional voltage of 0 V to 10 V. The ADC has a 10-bit resolution. What binary value corresponds to exactly 25 °C?

**Step 1 — Map the measured value to a voltage.**

First the voltage per unit is determined, then multiplied by how far the value sits above the minimum:

```text
Voltage span / temperature span = 10 V / 100 °C = 0.1 V per °C

25 °C is 45 °C above the minimum of -20 °C
U = 45 °C x 0.1 V = 4.5 V
```

**Step 2 — Convert the voltage to a digital value.**

```text
Digital value = (U / voltage range) x number of steps
Digital value = (4.5 V / 10 V) x 1024 = 460.8 ≈ 461
```

The result is rounded to the nearest whole step, since the output can only be an integer.

**Step 3 — Express the value in binary.**

```text
461 = 0001 1100 1101
```

:::info
Some textbooks divide by `2^n - 1` (here 1023) instead of `2^n` (1024), so that the maximum input maps exactly to the highest code. Both conventions appear in practice; the difference is negligible at higher resolutions. This page uses `2^n` to match the step count.
:::

## See Also

- [Raspberry Pi Overview](./raspberry-pi.md): why the Pi needs an ADC to read an analog sensor
- [Electrical Units](./electrical-units.md): voltage, current, power, and the formulas linking them
- [Bit, Byte & Unit Conversions](./bit-byte-conversions.md): binary basics behind the digital output
- [Pulse-Width Modulation (PWM)](./pulse-width-modulation.md): the inverse idea — approximating an analog level with a digital output
