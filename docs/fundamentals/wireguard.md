---
title: "WireGuard"
description: "Overview of WireGuard: a modern and fast VPN protocol using state-of-the-art cryptography."
keywords:
  - "WireGuard"
  - "VPN"
  - "Tunneling"
  - "Cryptography"
  - "Networking"
  - "UDP"
---

# WireGuard

## What Is WireGuard?

WireGuard is a modern VPN protocol that creates encrypted tunnels between devices. It is designed to be significantly simpler and faster than older protocols like IPsec or OpenVPN, with a much smaller codebase (~4,000 lines vs. hundreds of thousands).

WireGuard operates at the **[network layer](./osi-model.md#layer-3--network) (Layer 3)** and creates a virtual network interface on each device. Traffic routed through that interface is encrypted and sent to peers over UDP.

---

## How It Works

WireGuard uses a concept called **cryptokey routing**: every peer is identified by its public key, and each peer defines which IP addresses are reachable through that peer.

```text
[Interface]
PrivateKey = <your private key>
Address    = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey  = <peer's public key>
AllowedIPs = 10.0.0.2/32
Endpoint   = 203.0.113.5:51820
```

When an outgoing packet's destination IP matches a peer's `AllowedIPs`, WireGuard encrypts it and sends it to that peer's `Endpoint`. Incoming packets are decrypted and accepted only if they arrive from a known public key and their source IP is within that peer's `AllowedIPs`.

---

## Key Concepts

### Key Pairs

Each WireGuard interface has a **private key** and a derived **public key**. Public keys are exchanged out-of-band (manually, or by a tool like [Tailscale](../tools/tailscale.md)) and serve as the identity of a peer.

### Interface

A WireGuard **interface** is a virtual network interface (e.g. `wg0`) on a device. It has its own IP address and listens for incoming UDP packets on a configured port.

### Peer

A **peer** is any other WireGuard interface that this interface is allowed to communicate with. Each peer entry defines:

- **PublicKey**: the peer's public key
- **AllowedIPs**: IP ranges whose traffic is routed through this peer
- **Endpoint** *(optional)*: the peer's actual IP address and UDP port

### AllowedIPs

`AllowedIPs` serves a dual purpose:

- **Outgoing**: acts as a routing rule — packets to these IPs are sent to this peer
- **Incoming**: acts as a filter — packets from this peer are only accepted if their source IP is within this range

Setting `AllowedIPs = 0.0.0.0/0` routes all traffic through a peer, which is the basis for exit node / full-tunnel VPN setups.

---

## Cryptography

WireGuard uses a fixed, modern cryptographic suite — there is no negotiation, which eliminates a whole class of downgrade attacks:

| Purpose             | Algorithm          |
| ------------------- | ------------------ |
| Key exchange        | Curve25519 (ECDH)  |
| Symmetric cipher    | ChaCha20           |
| Authentication      | Poly1305 (MAC)     |
| Hashing             | BLAKE2s            |
| Key derivation      | HKDF               |

---

## Comparison to Other VPN Protocols

| Property        | WireGuard     | OpenVPN        | IPsec            |
| --------------- | ------------- | -------------- | ---------------- |
| Codebase size   | ~4,000 lines  | ~70,000 lines  | Very large       |
| Protocol        | UDP only      | TCP or UDP     | UDP / ESP        |
| Configuration   | Simple        | Complex        | Complex          |
| Performance     | Very fast     | Moderate       | Fast             |
| Cryptography    | Fixed, modern | Configurable   | Configurable     |
| NAT traversal   | Built-in      | Limited        | Requires extras  |

---

## Relation to Tailscale

WireGuard handles the **data plane** only => it encrypts and routes packets between peers. It does not handle peer discovery, key distribution, or access control.

[Tailscale](../tools/tailscale.md) is built on top of WireGuard and adds a managed **control plane**: automatic key exchange, peer discovery, NAT traversal, MagicDNS, and ACLs. That way you get WireGuard's performance without any manual configuration.
