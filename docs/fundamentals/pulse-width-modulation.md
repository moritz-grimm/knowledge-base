---
title: "Frequency (Hz) and Pulse-Width Modulation (PWM)"
description: "What frequency in Hertz means, and how pulse-width modulation uses a duty cycle to approximate analog output levels with a purely digital signal, including the period, frequency, and duty-cycle formulas."
keywords:
    - Frequency
    - Hertz
    - Hz
    - Period
    - Pulse-Width Modulation
    - PWM
    - Duty Cycle
    - GPIO
    - Dimming
    - Motor Control
---

# Frequency (Hz) and Pulse-Width Modulation (PWM)

## Frequency (Hz)

**Frequency** describes how often a periodic signal repeats per second. Its unit is the **Hertz (Hz)**: 1 Hz equals one full cycle per second.

The frequency `f` and the duration of one cycle, the **period** `T`, are inverses of each other:

```text
f = 1 / T        (frequency  = 1 / period)
T = 1 / f        (period     = 1 / frequency)
```

**Example:** A signal repeats every 1 ms (0.001 s).

```text
f = 1 / 0.001 s = 1000 Hz = 1 kHz
```

## The Problem PWM Solves

A digital GPIO output can only ever supply two states: **HIGH** (for example 3.3 V) or **LOW** (0 V). There is no value in between. Yet many tasks need something in between, such as dimming an LED, running a motor at half speed, or driving a passive [buzzer](./raspberry-pi.md).

**Pulse-width modulation (PWM)** solves this by switching the output between HIGH and LOW very rapidly. The ratio of HIGH time to the total cycle determines the *average* power delivered, which the connected device perceives as a value between fully off and fully on.

## Duty Cycle

The **duty cycle** (in German *Puls-Pause-Verhältnis*) is the share of one period during which the signal is HIGH:

```text
Duty cycle = (t_on / T) x 100%

t_on = time HIGH within one period
T    = t_on + t_off (full period)
```

| Duty cycle | Signal                       | Effect (at 3.3 V)      |
| ---------- | ---------------------------- | ---------------------- |
| 0 %        | always LOW                   | fully off              |
| 25 %       | HIGH 1/4 of the time         | low power              |
| 50 %       | HIGH half the time           | half power             |
| 75 %       | HIGH 3/4 of the time         | high power             |
| 100 %      | always HIGH                  | fully on               |

**Example:** A signal is HIGH for 0.25 ms within a 1 ms period.

```text
Duty cycle = (0.25 ms / 1 ms) x 100% = 25%
```

## Average Output Level

The average voltage seen by the device scales linearly with the duty cycle:

```text
U_avg = duty cycle x U_max
```

**Example:** A 3.3 V output running at a 50 % duty cycle.

```text
U_avg = 0.5 x 3.3 V = 1.65 V
```

:::note
PWM does **not** actually lower the voltage, the output still toggles between 0 V and the full level. The device only *behaves* as if it received the average, because the switching is faster than it can react.
:::

## Calculating the HIGH Time

Combining the formulas above gives the HIGH time for a chosen frequency and duty cycle:

```text
T = 1 / f
t_on = duty cycle x T
```

**Example:** A 1 kHz signal at a 25 % duty cycle.

```text
T = 1 / 1000 Hz = 0.001 s = 1 ms
t_on = 0.25 x 1 ms = 0.25 ms
```

## Typical Applications

- **Dimming an LED:** a higher duty cycle means a brighter LED.
- **Motor and fan speed:** at a relatively high frequency the output is toggled between HIGH and LOW; the ratio sets the power, and therefore the speed.
- **Tones on a passive [buzzer](./raspberry-pi.md):** the *frequency* of the PWM signal sets the pitch of the tone.

## See Also

- [Raspberry Pi Overview](./raspberry-pi.md): how sensors and actuators (such as a passive buzzer) are wired up
- [Analog-to-Digital Converter (ADC)](./analog-digital-converter.md): the inverse direction — turning an analog signal into a digital value
- [Electrical Units](./electrical-units.md): voltage and power fundamentals
