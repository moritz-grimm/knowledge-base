---
title: "OSI Model"
description: "The 7-layer OSI reference model: an overview of each layer's role, responsibilities, and common protocols."
keywords:
    - OSI Model
    - OSI Layer
    - Physical Layer
    - Data Link Layer
    - Network Layer
    - Transport Layer
    - Session Layer
    - Presentation Layer
    - Application Layer
    - Networking
---

# OSI Model

## Overview

The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes how different network systems communicate with each other. It divides communication into **7 layers**, each with a specific role. The model is vendor-neutral and serves as a reference for understanding how protocols interact.

## The 7 Layers

| #   | Name         | Key Responsibility                      |
| --- | ------------ | --------------------------------------- |
| 7   | Application  | User-facing protocols and services      |
| 6   | Presentation | Data formatting, encoding, encryption   |
| 5   | Session      | Session management between applications |
| 4   | Transport    | End-to-end delivery between processes   |
| 3   | Network      | Logical addressing and routing          |
| 2   | Data Link    | Frame delivery within a local network   |
| 1   | Physical     | Raw bit transmission over a medium      |

## Layer Details

### Layer 1 – Physical

Transmits raw bits over a physical medium (cables, radio, fiber). Defines voltage levels, pin layouts, and bit timing. Has no concept of addressing.

**Examples:** Ethernet cables, Wi-Fi radio signals, fiber optics, hubs, repeaters

### Layer 2 – Data Link

Packages bits into **frames** and handles delivery within a single network segment using **MAC addresses**. Also detects transmission errors via CRC.

**Sublayers:** LLC (Logical Link Control) and MAC (Media Access Control)

**Examples:** Ethernet, Wi-Fi (802.11), ARP, switches

### Layer 3 – Network

Handles **logical addressing** (IP) and routing of packets across multiple networks. Determines the best path from source to destination.

**Examples:** IP (IPv4, IPv6), ICMP, routers

### Layer 4 – Transport

Provides **end-to-end communication** between processes. Manages segmentation, reassembly, flow control, and error recovery.

- **TCP**: connection-oriented, reliable, ordered delivery
- **UDP**: connectionless, faster, no delivery guarantee

**Examples:** TCP, UDP, port numbers

### Layer 5 – Session

Establishes, manages, and terminates **sessions** (logical connections) between applications. Supports synchronization and checkpointing for long data transfers.

**Examples:** NetBIOS, RPC, session tokens

### Layer 6 – Presentation

Translates data between the application and network format. Handles encoding, serialization, compression, and encryption.

**Examples:** TLS/SSL (encryption), JSON, XML, JPEG, MPEG

### Layer 7 – Application

The layer closest to the user. Provides network services directly to applications. Does not refer to the applications themselves, but to the protocols they use.

**Examples:** HTTP, HTTPS, FTP, SMTP, DNS, SSH

## Mnemonic

To remember the layers from bottom (1) to top (7):

> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way`

**P**hysical, **D**ata Link, **N**etwork, **T**ransport, **S**ession, **P**resentation, **A**pplication
