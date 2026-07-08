---
title: "DHCP"
description: "How DHCP automatically assigns IP configuration to clients, including the DORA process, leases, scopes, options, reservations, relay agents and failover."
keywords:
    - DHCP
    - Dynamic Host Configuration Protocol
    - DORA
    - Lease
    - Scope
    - Relay Agent
    - Failover
    - DHCPv6
---

# DHCP (Dynamic Host Configuration Protocol)

DHCP automatically assigns clients an IP address, subnet mask and other configuration parameters within a local network. This removes the need to configure every host manually. DHCP uses UDP ports `67` (server) and `68` (client).

## The DORA Process

A client obtains its configuration in four steps, remembered as **DORA**:

1. **Discover** – The client broadcasts a `DHCP Discover` into the local network to find a server.
2. **Offer** – A DHCP server answers with a `DHCP Offer` containing an available address and configuration parameters.
3. **Request** – The client requests the offered address with a `DHCP Request`.
4. **Acknowledge** – If the address is still available, the server confirms it with a `DHCP Ack`.

## Key Concepts

- **Lease** – An address is handed out for a limited time (the lease). This prevents addresses from staying bound to a client forever and allows them to be reused.
- **Scope** – The range of IP addresses a server may hand out (including subnet mask).
- **Options** – Additional parameters distributed alongside the address, e.g. default gateway, DNS server, subnet mask.
- **Reservation** – A fixed IP address permanently tied to a specific MAC address, so a client always receives the same address.

## Relay Agent

Because routers do not forward broadcasts, a DHCP server normally serves only its own subnet. A **DHCP relay agent** forwards DHCP requests from another subnet to the DHCP server (as unicast), allowing one server to serve multiple subnets.

## Failover

For high availability, two DHCP servers can share the same scopes and replicate their lease information. There are two modes:

- **Load balancing** – Both servers hand out addresses simultaneously (default ratio 50/50, adjustable).
- **Hot standby** – A primary server hands out all addresses; a secondary server only takes over if the primary fails.

Failover supports a maximum of two servers and only works for IPv4 scopes.

## DHCPv6 vs. SLAAC

For IPv6, address configuration does not strictly require DHCP:

- **SLAAC** (Stateless Address Autoconfiguration) – The host builds its own address from a global prefix advertised by the router (Router Advertisement). No central server is involved.
- **DHCPv6** (stateful) – A DHCPv6 server assigns and tracks the full configuration centrally, similar to IPv4. The router still sends Router Advertisements with the `managed` flag so the host knows to use DHCPv6.

## Useful Commands (Client)

| Command             | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `ipconfig /all`     | Show the full IP configuration (adapter, MAC, IP, DNS, gateway) |
| `ipconfig /release` | Release the current address (lease)                             |
| `ipconfig /renew`   | Request a new lease from the DHCP server                        |
