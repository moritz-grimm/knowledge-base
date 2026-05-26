---
title: "Tailscale"
description: "Overview of Tailscale: a mesh VPN built on WireGuard for connecting devices securely across networks."
keywords:
  - "Tailscale"
  - "VPN"
  - "WireGuard"
  - "Mesh Network"
  - "Tailnet"
  - "Zero-Config VPN"
  - "Networking"
---

# Tailscale

## What Is Tailscale?

Tailscale is a zero-configuration mesh VPN service built on top of [WireGuard](../fundamentals/wireguard.md). It connects devices into a private network called a "**tailnet**", regardless of their location or whether they are behind NAT, firewalls, or different ISPs.

Unlike traditional VPNs that route all traffic through a central gateway, Tailscale establishes **direct peer-to-peer connections** between devices whenever possible. This results in lower latency and higher throughput.

---

## Architecture

Tailscale has two main components:

- **Control plane**: Tailscale's coordination server manages key exchange, authentication, and distributes network configuration to all nodes. It never sees your actual traffic.
- **Data plane**: Actual traffic flows directly between nodes over encrypted WireGuard tunnels, bypassing Tailscale's servers.

```text
Device A <===[WireGuard tunnel (direct P2P)]===> Device B
             (Tailscale control plane: key exchange only)
```

When a direct connection is not possible (e.g. strict firewalls on both sides), Tailscale falls back to its **DERP** (Designated Encrypted Relay for Packets) servers, which relay encrypted packets without being able to read them.

---

## Key Concepts

### Tailnet

A tailnet is the private network that all Tailscale-connected devices form. Devices on the same tailnet can communicate directly with each other as if they were on the same local network.

### Nodes

Any device (laptop, server, phone, Raspberry Pi) that is enrolled in Tailscale and joined to a tailnet is called a **node**. Each node gets a stable private IP address in the `100.64.0.0/10` range (Carrier-Grade NAT space).

### MagicDNS

MagicDNS automatically assigns human-readable hostnames to every node in the tailnet (e.g. `my-laptop`, `home-server`). This means you can connect to devices by name instead of IP address, without configuring any DNS manually.

### Exit Nodes

An **exit node** is a node that routes all internet-bound traffic from other nodes through itself. This is useful for:

- Accessing the internet as if from a different location
- Enforcing a single outbound IP for all devices
- Securing traffic on untrusted networks (e.g. public Wi-Fi)

### Subnet Routers

A **subnet router** allows a Tailscale node to advertise access to an existing local network (subnet). Other tailnet members can then reach devices on that subnet without installing Tailscale on each one.

```text
Tailnet Node (subnet router) <===> Local Network (192.168.1.0/24)
                                         |
                               [Non-Tailscale devices]
```

**Typical use case:** Expose a home or office LAN to all Tailscale devices on the tailnet.

### ACLs (Access Control Lists)

Tailscale uses a centrally managed ACL policy to control which nodes can communicate with each other. Rules are written in a JSON-based HuJSON format in the Tailscale admin console.

---

## Benefits

- **Zero configuration**: No port forwarding, no firewall rules, no manual key management
- **Works behind NAT**: Uses NAT traversal techniques to establish direct connections
- **End-to-end encrypted**: All traffic is encrypted by WireGuard; Tailscale servers never see payload data
- **Cross-platform**: Available on Linux, macOS, Windows, iOS, Android, and more
- **Identity-based access**: Authentication via SSO providers (Google, GitHub, Microsoft, etc.)

---

## Common Use Cases

| Use Case                        | How                                |
| ------------------------------- | ---------------------------------- |
| Access home server remotely     | Enroll the server as a node        |
| Secure public Wi-Fi             | Route traffic through an exit node |
| Reach devices without Tailscale | Use a subnet router                |
| Connect distributed team        | All members join the same tailnet  |
| Home lab access                 | Enroll all lab machines as nodes   |
