---
title: "ARP (Address Resolution Protocol)"
description: "How ARP resolves IP addresses to MAC addresses within a local network, including local vs. remote delivery, the request/reply process, and the ARP cache."
keywords:
    - ARP
    - Address Resolution Protocol
    - MAC Address
    - IP Address
    - Networking
    - Layer 2
    - Layer 3
    - Default Gateway
---

# ARP (Address Resolution Protocol)

## Overview

ARP (Address Resolution Protocol) operates at the boundary of Layer 2 (Data Link) and Layer 3 (Network) of the [OSI model](./osi-model.md). It resolves a known **IP address** to the corresponding **MAC address** needed to deliver a frame within a local network segment.

## Two Types of Addresses

Every device in an Ethernet LAN is reached using two different addresses:

- **MAC address**: Used for communication between network interface cards within the same network segment. It is the addressing of the Layer 2 Ethernet frame.
- **IP address**: Used to send the packet from the original source to the final destination, regardless of how many networks lie in between. It is the addressing of the Layer 3 IP packet.

The Ethernet frame is encapsulated around the IP packet. While the IP packet travels end to end, the surrounding Ethernet frame only ever exists on a single network segment.

## Why ARP is Needed

IP packets contain source and destination IP addresses, but Ethernet frames use MAC addresses for delivery on the local segment. When a device wants to send data, it knows the destination IP address but must first discover the MAC address that the frame should be addressed to.

## Local vs. Remote Delivery

The sending device first determines whether the destination is on the **same network** by applying its subnet mask (a logical AND of its own IP and the destination IP against the mask). The result decides which MAC address the frame needs:

- **Same network** – The destination MAC address is the MAC address of the destination host itself. The device resolves the destination IP via ARP.
- **Different network** – The destination MAC address is the MAC address of the **default gateway** (the router's network interface). The device resolves the gateway's IP via ARP.

In both cases the source and destination **IP addresses in the packet never change**. Only the MAC addresses in the frame are rewritten: each router along the path strips the incoming frame and builds a new one with the source and destination MAC addresses for the next hop.

## ARP Table Lookup

Before sending, the device searches its ARP table (held in RAM) for the IP it needs to resolve:

- If the destination IP is in the **same network**, it looks up the **destination IP address**.
- If the destination IP is in a **different network**, it looks up the **default gateway's IP address**.

If a matching entry exists, the cached MAC address is used to build the frame. If no entry exists, the device sends an **ARP request**.

## ARP Request / Reply Process

1. **Check the ARP cache** – If the MAC address for the needed IP is already cached, no request is required
2. **ARP request (broadcast)** – If not cached, the sender broadcasts an ARP request to all devices on the segment: *"Who has IP X.X.X.X? Tell IP Y.Y.Y.Y"*. The destination MAC address of this broadcast frame is `FF:FF:FF:FF:FF:FF`
3. **ARP reply (unicast)** – The device with the matching IP responds directly to the sender with its MAC address; all other devices ignore the request
4. **Cache update** – The sender stores the IP-to-MAC mapping in its ARP cache for future use
5. **Frame is sent** – The sender now constructs the Ethernet frame with the resolved MAC address

## ARP Cache

The ARP cache stores recent IP-to-MAC mappings to avoid repeated broadcasts.

- Entries have a TTL (Time to Live) and expire automatically
- Common commands (Windows/Linux):

| Command  | Purpose                  |
| -------- | ------------------------ |
| `arp -a` | Display the ARP table    |
| `arp -d` | Delete ARP table entries |

## Security: ARP Spoofing

Because ARP has no authentication mechanism, an attacker can send fake ARP replies to poison the cache of other devices, redirecting traffic through the attacker's machine (Man-in-the-Middle attack).

Countermeasures include:

- **Dynamic ARP Inspection (DAI)** on managed switches
- **Static ARP entries** for critical devices
- Network monitoring and anomaly detection
