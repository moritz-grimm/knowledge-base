---
title: ARP (Address Resolution Protocol)
description: How ARP resolves IP addresses to MAC addresses within a local network, including the request/reply process and the ARP cache.
keywords:
    - ARP
    - Address Resolution Protocol
    - MAC Address
    - IP Address
    - Networking
    - Layer 2
    - Layer 3
draft: true
---

# ARP (Address Resolution Protocol)

## Overview

ARP (Address Resolution Protocol) operates at the boundary of Layer 2 (Data Link) and Layer 3 (Network) of the OSI model. It resolves a known **IP address** to the corresponding **MAC address** needed to deliver a frame within a local network segment.

## Why ARP is Needed

IP packets contain source and destination IP addresses, but Ethernet frames use MAC addresses for delivery. When a device wants to send data to an IP address on the same subnet, it must first discover the MAC address associated with that IP.

## ARP Process

1. **Sender checks the ARP cache** – If the MAC address for the target IP is already cached, no request is needed
2. **ARP Request (Broadcast)** – If not cached, the sender broadcasts an ARP request to all devices on the subnet: *"Who has IP X.X.X.X? Tell IP Y.Y.Y.Y"*
3. **ARP Reply (Unicast)** – The device with the matching IP responds directly to the sender with its MAC address
4. **Cache update** – The sender stores the IP-to-MAC mapping in its ARP cache for future use
5. **Frame is sent** – The sender now constructs the Ethernet frame with the resolved MAC address

## ARP Cache

The ARP cache stores recent IP-to-MAC mappings to avoid repeated broadcasts.

- Entries have a TTL (Time to Live) and expire automatically
- Can be viewed with `arp -a` on Windows/Linux

## Security: ARP Spoofing

Because ARP has no authentication mechanism, an attacker can send fake ARP replies to poison the cache of other devices, redirecting traffic through the attacker's machine (Man-in-the-Middle attack).

Countermeasures include:

- **Dynamic ARP Inspection (DAI)** on managed switches
- **Static ARP entries** for critical devices
- Network monitoring and anomaly detection
