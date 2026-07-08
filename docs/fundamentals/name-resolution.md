---
title: "Name Resolution"
description: "Why name resolution is needed and an overview of the common systems for Windows and Linux networks: DNS, LLMNR, NetBIOS and mDNS."
keywords:
    - Name Resolution
    - DNS
    - LLMNR
    - NetBIOS
    - mDNS
    - Namensauflösung
---

# Name Resolution

Networked computers are identified by unique addresses (IP address, MAC address) and use these to communicate. Since numeric addresses are hard for people to remember, names are used instead. **Name resolution** is the mechanism that maps a name (e.g. a computer name) to its address (e.g. an IP address).

## Resolution Systems

Several systems exist for Windows and Linux networks:

| System      | Scope                    | Note                                                                                                                              |
| ----------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **DNS**     | Whole network / internet | Most important system, required by Active Directory. UDP port `53`, up to 255 characters (e.g. `pc01.bs1-landshut.de`)            |
| **LLMNR**   | Same subnet only         | Link Local Multicast Name Resolution (since Windows Vista), for workgroups. Uses multicast, IPv6-capable, no configuration needed |
| **NetBIOS** | Same subnet / legacy     | Used before Windows Vista to find computers. Max. 15 characters, ports `137/138/139/445`                                          |
| **mDNS**    | LAN, link-local          | Multicast DNS (developed by Apple), TLD `.local`, no name server needed. Linux implementation is `avahi`                          |

## DNS

DNS (Domain Name System) is the primary name resolution system and the basis for name resolution on the internet. It is covered in detail in [DNS](./dns.md).

## LLMNR

LLMNR resolves names only within the same subnet and is intended for small workgroups. It uses multicast instead of broadcasts (less network traffic) and, unlike NetBIOS, is IPv6-capable. It cannot resolve names of older systems (e.g. Windows Server 2003, Windows XP).

## NetBIOS

NetBIOS (NetBIOS over TCP/IP, NetBT/NBT) was relevant up to Windows 2000/Vista and was used to browse the network for computers. It is used as a fallback when DNS is not configured and LLMNR is disabled or cannot resolve a name.

## mDNS

mDNS (Multicast DNS) enables name resolution on a LAN without a dedicated name server, using multicast messages under the link-local TLD `.local`. Starting with Windows 11 22H2, Microsoft intends mDNS to replace both NetBIOS and LLMNR.
