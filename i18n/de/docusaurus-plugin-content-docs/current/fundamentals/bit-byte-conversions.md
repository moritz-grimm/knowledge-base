---
title: "Bit, Byte & Unit Conversions"
description: "Bit, Byte & Kibi Basics"
keywords:
  - "Bit"
  - "Byte"
  - "Dateneinheiten"
  - "Konvertierung"
  - "Binär"
  - "Dezimal"
  - "Speicher"
---

# Bit, Byte & Unit Conversions

## Bit & Byte Basics

| Unit | Symbol | In Bits | In Bytes |
| ---- | ------ | ------- | -------- |
| Bit  | b      | 1       | 0.125    |
| Byte | B      | 8       | 1        |

**Further Info:** Network speeds use **bits/s** (Mb/s, Gb/s), storage uses **bytes** (MB, GB)

---

## Decimal Units (Base 10)

| Unit     | Symbol | Power | Factor | In Bytes              |
| -------- | ------ | ----- | ------ | --------------------- |
| Kilobyte | kB     | 10³   | 1,000¹ | 1,000                 |
| Megabyte | MB     | 10⁶   | 1,000² | 1,000,000             |
| Gigabyte | GB     | 10⁹   | 1,000³ | 1,000,000,000         |
| Terabyte | TB     | 10¹²  | 1,000⁴ | 1,000,000,000,000     |
| Petabyte | PB     | 10¹⁵  | 1,000⁵ | 1,000,000,000,000,000 |

**Step:** One step is worth '³'  
**Used by:** Hard drive manufacturers, marketing, networking

---

## Binary Units (Base 2)

| Unit     | Symbol | Power | Factor | In Bytes              |
| -------- | ------ | ----- | ------ | --------------------- |
| Kibibyte | KiB    | 2¹⁰   | 1,024¹ | 1,024                 |
| Mebibyte | MiB    | 2²⁰   | 1,024² | 1,048,576             |
| Gibibyte | GiB    | 2³⁰   | 1,024³ | 1,073,741,824         |
| Tebibyte | TiB    | 2⁴⁰   | 1,024⁴ | 1,099,511,627,776     |
| Pebibyte | PiB    | 2⁵⁰   | 1,024⁵ | 1,125,899,906,842,624 |

**Step:** One step is worth '¹⁰'  
**Used by:** Operating systems, RAM, actual storage calculations

---

## Conversion Methods

### 1. Bit ↔ Byte

#### Bit → Byte

```text
Formula: bits ÷ 8 = bytes

Example: 64 bits → bytes
64 ÷ 8 = 8 bytes
```

#### Byte → Bit

```text
Formula: bytes × 8 = bits

Example: 100 bytes → bits
100 × 8 = 800 bits
```

---

### 2. Decimal Units (Using 1,000)

#### Upward (Smaller → Larger)

```text
Steps: kB → MB → GB → TB → PB
Formula: value ÷ 10^steps

Example: 5,000,000 kB → GB
Steps: kB → MB → GB = 2 steps
5,000,000 kB ÷ 10⁶ = 5 GB
```

#### Downward (Larger → Smaller)

```text
Steps: PB → TB → GB → MB → kB
Formula: value × 10^steps

Example: 2 TB → MB
Steps: TB → GB → MB = 2 steps
2 TB × 10⁶ = 2,000,000 MB
```

---

### 3. Binary Units (Using 1,024)

#### Upward (Smaller → Larger)

```text
Steps: KiB → MiB → GiB → TiB → PiB
Formula: value ÷ 2^steps

Example: 6,800,000 KiB → GiB
Steps: KiB → MiB → GiB = 2 steps
6,800,000 KiB ÷ 2²⁰ = 6.485 GiB
```

#### Downward (Larger → Smaller)

```text
Steps: PiB → TiB → GiB → MiB → KiB
Formula: value × 2^steps

Example: 3 GiB → KiB
Steps: GiB → MiB → KiB = 2 steps
3 GiB × 2²⁰ = 3,145,728 KiB
```

---

### 4. Decimal ↔ Binary Conversion

#### Decimal → Binary (e.g., MB → MiB)

```text
Formula: (decimal value) ÷ 1.024^steps ≈ binary value

Example: 1,000 MB → MiB
Steps: Both are "Mega" level = same position, but different base
1,000 MB ÷ 1.024 ≈ 976.56 MiB

Alternative (precise):
1,000 MB * 10⁶ = 1,000,000,000 bytes
1,000,000,000 bytes ÷ 2¹⁰ = 953.67 MiB
```

#### Binary → Decimal (e.g., GiB → GB)

```text
Formula: (binary value) × 1.024^steps ≈ decimal value

Example: 500 GiB → GB
Steps: Both are "Giga" level = same position, but different base
500 × 1.024 ≈ 512 GB

Alternative (precise):
500 GiB * 2³⁰ = 536,870,912,000 bytes
536,870,912,000 bytes ÷ 10⁹ = 536,87
```

---

## Quick Reference

| Conversion Type | Formula    | Example               |
| --------------- | ---------- | --------------------- |
| Bit → Byte      | ÷ 8        | 1,000 b → 125 B       |
| Byte → Bit      | × 8        | 125 B → 1,000 b       |
| Decimal Up      | ÷ 10^steps | 5,000 MB → 5 GB       |
| Decimal Down    | × 10^steps | 2 TB → 2,000,000 MB   |
| Binary Up       | ÷ 2^steps  | 2,048 KiB → 2 MiB     |
| Binary Down     | × 2^steps  | 3 GiB → 3,145,728 KiB |
| MB → MiB        | ÷ 1.024    | 1,000 MB ≈ 976.56 MiB |
| GiB → GB        | × 1.024    | 500 GiB ≈ 512 GB      |

---

## Common Pitfalls

- **Don't mix units:** `1 GB ≠ 1 GiB` (1 GB = 0.931 GiB)
- **Marketing trick:** A "500 GB" hard drive is actually ~465.66 GiB
- **Network speeds:** 100 Mb/s ≠ 100 MB/s (100 Mb/s = 12.5 MB/s)
