---
title: "Raspberry Pi Overview"
description: "A practical overview of the Raspberry Pi: its GPIO pins, the difference between sensors and actuators, how a breadboard works, and what the connections of common components such as an LED, a temperature sensor, and a buzzer mean."
keywords:
    - Raspberry Pi
    - GPIO
    - Sensor
    - Actuator
    - Breadboard
    - LED
    - Temperature Sensor
    - Buzzer
    - Wiring
    - VCC
    - VDD
    - GND
    - SDA
    - SCL
    - I2C
---

# Raspberry Pi Overview

## What Is a Raspberry Pi

The Raspberry Pi is a small single-board computer. Besides the usual ports (USB, HDMI, network), it carries a row of **GPIO pins** that allow electronic components to be connected directly, which makes it a popular platform for hardware projects.

## GPIO Pins

**GPIO** stands for *General-Purpose Input/Output*. The pin header combines several kinds of pins:

- **Power pins:** fixed **3.3 V** and **5 V** outputs to supply components.
- **Ground pins (GND):** the common reference / return path for the current.
- **I/O pins:** freely programmable pins that can be read (**input**) or set (**output**).

A GPIO I/O pin is purely **digital**: it only knows **HIGH** (3.3 V) and **LOW** (0 V). It cannot directly measure an analog voltage, so an analog sensor needs an [analog-to-digital converter (ADC)](./analog-digital-converter.mdx) in between. Conversely, an analog-like output is approximated with [pulse-width modulation (PWM)](./pulse-width-modulation.md).

## Sensors vs. Actuators

Components fall into two opposite roles:

- A **sensor** is a component that converts a physical quantity from the environment (temperature, humidity, pressure, acceleration, etc.) into an **electrical signal**.
- An **actuator** is the counterpart of a sensor and does exactly the opposite: it converts an **electrical signal** into a physical quantity such as motion, pressure, sound, or light.

| Role     | Direction                        | Examples                             |
| -------- | -------------------------------- | ------------------------------------ |
| Sensor   | environment => electrical signal | temperature sensor, light sensor     |
| Actuator | electrical signal => environment | motor, lamp/LED, loudspeaker, buzzer |

## The Breadboard

A **breadboard** allows components to be connected without soldering, wires and component legs are simply pushed into its holes. Holes that belong to the same internal strip are electrically connected:

- The two long **power rails** along the edges (marked `+` and `-`) run the length of the board. They are usually fed once from a 3.3 V / 5 V pin and a GND pin, so power and ground are available everywhere.
- The inner **terminal strips** connect the holes of each short column together, divided by a gap in the middle of the board.

Components plugged into the same connected strip share an electrical connection, which is how a circuit is built up.

## Connecting Components

Most components expose a few clearly defined connections. The three most common are **power (VCC / `+`)**, **ground (GND / `-`)**, and a **signal** line.

| Component          | Role     | Connections                  | Further Explanation                             |
| ------------------ | -------- | ---------------------------- | ----------------------------------------------- |
| LED / lamp         | actuator | anode (`+`), cathode (`-`)   | longer leg is `+`, shorter leg is `-`           |
| Temperature sensor | sensor   | VCC (`+`), GND (`-`), signal | signal carries the measured value to a GPIO pin |
| Buzzer             | actuator | `+` (signal), `-` (GND)      | the signal switches or drives the sound         |

### Common Pin Labels

Sensor modules and breakout boards rarely spell their connections out, instead they print short, standardized abbreviations next to each pin:

- **VDD / VDC / VCC (`+`):** the positive supply voltage (power in). `VDD` and `VCC` stem from chip design, `VDC` simply means "volts DC"; in practice all three mark the power pin (e.g. 3.3 V or 5 V).
- **GND / VSS (`-`):** ground, the common reference and return path for the current.
- **SDA:** the **data** line of the **I2C** bus, over which a sensor exchanges values with the Pi.
- **SCL:** the **clock** line of the **I2C** bus, which keeps both sides in step.

**I2C** is a two-wire bus (SDA + SCL) that lets several digital sensors share the same two GPIO pins, each one addressed individually. An I2C sensor needs no [ADC](./analog-digital-converter.mdx), the conversion to digital values already happens inside the module.

### LED / Lamp

An LED has two legs with a fixed polarity:

- **Anode (`+`):** the **longer** leg, connected toward the GPIO / positive side.
- **Cathode (`-`):** the **shorter** leg (also marked by the flat edge of the rim), connected to GND.

An LED must always be driven through a **series resistor** to limit the current — without it, the LED draws too much current and burns out.

### Temperature Sensor

A typical sensor module has three pins:

- **VCC (`+`):** power, e.g. 3.3 V.
- **GND (`-`):** ground.
- **Signal:** the output that carries the measurement.

If the signal is **analog** (a voltage proportional to the temperature), it cannot go straight into a GPIO pin, an [ADC](./analog-digital-converter.mdx) is required first.

### Buzzer

A buzzer has just two connections, `+` (signal) and `-` (GND), and comes in two variants:

- **Active buzzer:** contains its own oscillator and only needs a HIGH / LOW signal to switch the sound on and off. It plays a single, fixed tone.
- **Passive buzzer:** has no oscillator and can play different tones, but needs a varying signal. The pitch is set by the frequency of a [PWM](./pulse-width-modulation.md) signal.

## See Also

- [Analog-to-Digital Converter (ADC)](./analog-digital-converter.mdx): reading an analog sensor on a digital-only Pi
- [Frequency (Hz) and Pulse-Width Modulation (PWM)](./pulse-width-modulation.md): approximating analog output and driving a passive buzzer
- [Electrical Units](./electrical-units.md): the voltage, current, and resistance behind every connection
