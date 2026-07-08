---
title: "DNS"
description: "How the Domain Name System resolves names to IP addresses: hierarchy and FQDN, zones and record types, recursive vs. iterative queries and caching."
keywords:
    - DNS
    - Domain Name System
    - FQDN
    - Zone
    - Forward Lookup
    - Reverse Lookup
    - Recursive Query
    - Iterative Query
---

# DNS (Domain Name System)

DNS resolves DNS names to IP addresses and vice versa. A DNS name has two parts: the **host name**, identifying a single host, and the **domain name**, identifying a group of hosts in a shared namespace. The two are separated by a dot.

## Hierarchy and FQDN

DNS is a hierarchical system, structured from the root downwards:

- **Root** – The top of the hierarchy (written as `.`)
- **Top-Level Domain (TLD)** – e.g. `com`, `net`, `de`, `org`
- **Second-Level Domain** – e.g. `heise` in `heise.de`
- **Subdomain / Host** – further levels below the second-level domain, e.g. `www`

When all parts up to the root are specified, the result is the **FQDN** (Fully Qualified Domain Name), which must be unique in the network, e.g. `www.heise.de`.

## Zones

Each DNS server is responsible for a delimited part of the namespace, called a **zone** (e.g. `heise.de`). The server managing a zone's file holds the **authority** for that zone.

- **Primary zone** – Read and write access; the authoritative copy of the zone.
- **Secondary zone** – A read-only copy of a primary zone (for redundancy or load distribution). It can answer queries but cannot update the zone file.

Zone data is exchanged between servers via **zone transfer** (two DNS servers without a domain controller) or **zone replication** (Active Directory-integrated zones on domain controllers).

By direction:

- **Forward lookup zone** – Resolves domain names to IP addresses.
- **Reverse lookup zone** – Resolves IP addresses to domain names.

## Record Types

| Record    | Purpose                                   |
| --------- | ----------------------------------------- |
| **A**     | Domain name to IPv4 address               |
| **AAAA**  | Domain name to IPv6 address               |
| **CNAME** | Alias pointing to another host record     |
| **SRV**   | Resolves a service to an IP address       |
| **PTR**   | Reverse lookup: IP address to domain name |

## Recursive vs. Iterative Queries

- **Recursive query** – The client sends this to its name server and expects a final answer (the IP address). If the server holds the zone, it returns an **authoritative answer**.
- **Iterative query** – If the server cannot answer itself, it queries other DNS servers along the hierarchy. Each may only point to the next responsible server rather than the final answer, until the authoritative server is reached.
- **Caching** – Every involved server stores results in its **DNS cache**. A cached answer is returned as a **non-authoritative answer**.

## Example Resolution (`www.example.com`)

1. The client sends a **recursive** query to its configured DNS server.
2. That server is not authoritative and has no cached entry, so it sends an **iterative** query to a **root** name server.
3. The root server replies with the address of the `com.` TLD name server.
4. The DNS server queries the `com.` name server.
5. The `com.` server replies with the address of the `example.com.` name server.
6. The DNS server queries the `example.com.` name server.
7. That server, authoritative for the zone, replies with the IP address of the FQDN.
8. The DNS server returns the IP address to the client (and caches it).

## HOSTS File

For very small networks, a static `HOSTS` file (`C:\Windows\System32\Drivers\etc\HOSTS`) can map host names to IP addresses instead of DNS. Because Active Directory requires DNS, this alternative is rarely used today.

## Useful Commands (Client)

| Command                | Purpose                   |
| ---------------------- | ------------------------- |
| `ipconfig /displaydns` | Show the local DNS cache  |
| `ipconfig /flushdns`   | Clear the local DNS cache |

## Naming Rules for Windows Domains

- For internal networks, use a subdomain of an official internet domain (e.g. `media.ct.de` instead of `media.ct.local`).
- Keep names short (domains max. 64 characters).
