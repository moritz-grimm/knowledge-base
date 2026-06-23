---
title: "IPv6 (Internet Protocol Version 6)"
description: "How IPv6 addresses are structured, compressed, and expanded, including the most important reserved addresses (loopback, link-local), the unicast/multicast/anycast types, and address scopes."
keywords:
    - IPv6
    - Internet Protocol
    - Networking
    - Loopback
    - Link-Local
    - Unicast
    - Multicast
    - Anycast
    - Scope
---

# IPv6 (Internet Protocol Version 6)

## Overview

IPv6 is the successor to IPv4 and was introduced to overcome the exhaustion of the 32-bit IPv4 address space. An IPv6 address is **128 bits** long, which provides 2¹²⁸ (roughly 3.4 x 10³⁸) possible addresses.

The address is written as **8 groups of 16 bits** (often called *hextets* or *groups*), each represented by 4 hexadecimal digits and separated by colons (`:`).

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
```

- 8 groups x 16 bits = 128 bits
- Hexadecimal digits are case-insensitive (`ff00` equals `FF00`); but lowercase is the recommended canonical form

## Address Structure

A typical IPv6 unicast address is split into two halves of 64 bits each:

| Part               | Length  | Purpose                                                  |
| ------------------ | ------- | -------------------------------------------------------- |
| **Network Prefix** | 64 bits | Identifies the network (routing prefix + subnet ID).     |
| **Interface ID**   | 64 bits | Identifies the individual interface within that network. |

The prefix length is written in CIDR notation, e.g. `2001:db8:abcd:1234::/64`. A `/64` is the standard size for a single subnet.

## Shortening (Compression)

Two rules allow an IPv6 address to be written more compactly. They can be combined.

### Rule 1: Remove Leading Zeros

Within each group, leading zeros may be omitted. At least one digit must remain per group.

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329
```

### Rule 2: Collapse One Run of Zero Groups (`::`)

One single contiguous run of one or more all-zero groups may be replaced by a double colon `::`.

```text
2001:db8:0:0:0:ff00:42:8329
2001:db8::ff00:42:8329
```

**Important:** `::` may appear **only once** in an address, otherwise the length would be ambiguous. If two equally long runs of zeros exist, the leftmost one should be compressed.

```text
fe80:0:0:0:1:0:0:1   =>   fe80::1:0:0:1   (correct)
fe80:0:0:0:1:0:0:1   =>   fe80::1::1      (invalid, two "::")
```

## Expanding

Expanding reverses the compression to recover the full 128-bit form. This is useful for comparison or manual subnet calculation.

1. **Restore the `::`** – Count the groups that are present, then insert as many `0` groups as needed to reach 8 groups in total.
2. **Pad each group** – Add leading zeros until every group has 4 hexadecimal digits.

```text
2001:db8::ff00:42:8329

Step 1 (restore zero groups, 5 groups present => insert 3):
2001:db8:0:0:0:ff00:42:8329

Step 2 (pad to 4 digits each):
2001:0db8:0000:0000:0000:ff00:0042:8329
```

## Address Types

IPv6 has no broadcast. Its place is taken by multicast.

| Type          | Meaning                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------- |
| **Unicast**   | One-to-one. Identifies a single interface; a packet is delivered to exactly that interface. |
| **Multicast** | One-to-many. Delivered to all interfaces that joined the multicast group.                   |
| **Anycast**   | One-to-nearest. Shared by multiple interfaces; delivered to the topologically nearest one.  |

## Scopes

The *scope* defines the region of the network in which an address is valid and routable. The two most relevant unicast scopes are:

- **Link-Local** – Valid only on the directly attached link (one segment). Not routed. Automatically configured on every IPv6 interface.
- **Global** – Globally unique and routable across the internet, comparable to a public IPv4 address.

Multicast addresses carry an explicit scope field (e.g. interface-local, link-local, site-local, global).

### Zone Index for Link-Local

Because link-local addresses (`fe80::/10`) are not unique across multiple interfaces, the outgoing interface must be specified using a zone index appended with `%`.

```text
ping fe80::1%eth0      # Linux (interface name)
ping fe80::1%12        # Windows (interface index)
```

## Important Addresses

| Address / Prefix | Name               | Description                                                                           |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------- |
| `::/128`         | Unspecified        | All zeros. Used as a source address before one is assigned (similar to `0.0.0.0`).    |
| `::1/128`        | Loopback           | The local host, equivalent to IPv4 `127.0.0.1`.                                       |
| `fe80::/10`      | Link-Local         | Auto-configured, valid only on the local link, never routed.                          |
| `fc00::/7`       | Unique Local (ULA) | Private addresses for internal use, not routed on the internet (similar to RFC 1918). |
| `2000::/3`       | Global Unicast     | Public, globally routable addresses.                                                  |
| `ff00::/8`       | Multicast          | All multicast addresses begin with `ff`.                                              |
| `ff02::1`        | All Nodes (link)   | Multicast to every node on the link.                                                  |
| `ff02::2`        | All Routers (link) | Multicast to every router on the link.                                                |
| `2001:db8::/32`  | Documentation      | Reserved for examples and documentation, never used in production.                    |

## IPv6 vs. IPv4

| Property       | IPv4                   | IPv6                         |
| -------------- | ---------------------- | ---------------------------- |
| Address length | 32 bits                | 128 bits                     |
| Notation       | Decimal, dot-separated | Hexadecimal, colon-separated |
| Broadcast      | Yes                    | No (replaced by multicast)   |
| Loopback       | `127.0.0.1`            | `::1`                        |
| Auto-config    | DHCP / APIPA           | SLAAC + link-local           |
