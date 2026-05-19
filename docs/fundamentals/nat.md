---
title: "NAT"
description: "How NAT translates private IP addresses to public ones, including PAT/overloading and port forwarding."
keywords:
    - NAT
    - Network Address Translation
    - PAT
    - Port Address Translation
    - Port Forwarding
    - Networking
    - IP Address
    - Private IP
    - Public IP
---

# NAT (Network Address Translation)

## Overview

The rapid growth of the internet would have quickly exhausted the available pool of IP addresses without mechanisms to use them more efficiently. NAT (Network Address Translation) addresses this by allowing many devices in a private network to share a small number of public IP addresses.

NAT operates on a border device (typically a firewall or router). As a packet passes through it, NAT replaces the source IP address (a private, non-routable address) with a public, routable IP address. The public address in the reply is then translated back to the private address so the packet can be delivered to the correct internal host.

## Benefits

- **Simpler renumbering**: When changing ISPs, internal hosts do not need new IP addresses. Only the public address assigned by the new ISP changes.
- **Address conservation**: [PAT](#nat-overloading-pat) lets many internal hosts share a single public IP address, greatly reducing the number of public addresses needed.
- **Increased security**: Internal addresses and network topology are hidden from external networks, since only the public address is visible.

## How NAT Works

1. An internal host (e.g., `10.0.0.3`) sends a packet destined for an external host (e.g., `128.23.2.2`)
2. The border router (RTA) recognises the packet is headed to the internet and selects an available global IP address (e.g., `179.9.8.80`)
3. RTA replaces the source address in the packet with the global address and records the mapping in the NAT table
4. The packet is forwarded to the destination
5. When the reply arrives addressed to `179.9.8.80`, RTA looks up the NAT table, finds the corresponding internal address, replaces the destination field, and forwards the packet internally

The NAT table records three types of addresses:

- **Internal local IP**: The private IP address of the internal host
- **Internal global IP**: The public IP address the NAT router assigns to represent the internal host externally
- **External global IP**: The IP address of the destination host in the external network

**NAT table example:**

| Internal local IP | Internal global IP | External global IP |
| ----------------- | ------------------ | ------------------ |
| 10.0.0.3          | 179.9.8.80         | 128.23.2.2         |

## NAT Overloading (PAT)

NAT Overloading, also called PAT (Port Address Translation), maps multiple private IP addresses to a single public IP address by additionally tracking port numbers. Each internal connection gets a unique port number on the public side, allowing the router to demultiplex incoming replies to the correct internal host.

**NAT table with overloading:**

| Internal IP | Internal port | Global IP  | External port |
| ----------- | ------------- | ---------- | ------------- |
| 10.0.0.2    | 1555          | 179.9.8.80 | 1555          |
| 10.0.0.3    | 1331          | 179.9.8.80 | 1331          |
| 10.0.0.4    | 1444          | 179.9.8.80 | 1444          |

## Port Forwarding

By default NAT blocks all inbound connections initiated from outside. Port forwarding allows specific external traffic to reach an internal host by mapping a destination port number on the public IP to a specific internal IP address.

Example flow:

1. A client sends a request to `https://knowledge.moritz-grimm.dev` (public IP `209.165.200.225`, port `443`)
2. The router receives the packet, since `209.165.200.225` is its own public IP
3. A port forwarding rule maps external port `443` to internal host `192.168.1.254:443`, so the router rewrites the destination and forwards the packet internally

:::info
The external and internal port numbers do not have to be the same.
:::
