---
title: "Active Directory"
description: "Core concepts of Active Directory and the domain controller: logical structure, trusts, LDAP naming, roaming profiles and group policies."
keywords:
    - Active Directory
    - Domain Controller
    - Organizational Unit
    - Forest
    - LDAP
    - Distinguished Name
    - Group Policy
    - GPO
---

# Active Directory

**Active Directory (AD)** is a directory service that provides central identity and access management in a Windows environment. Instead of configuring every machine individually, users, computers and resources are managed centrally. A **domain controller (DC)** is a Windows Server that hosts the Active Directory Domain Services (AD DS).

A domain controller requires a unique name (e.g. `dc1`), a static IP address and a working DNS server; the "Active Directory Domain Services" role is installed and then the server is promoted.

## Logical Structure

Active Directory separates the logical structure from the physical one (sites, subnets, DCs). The logical building blocks are:

- **Object** – The smallest manageable unit; every network resource (user, computer, printer …) is represented by an object.
- **Organizational Unit (OU)** – A container that groups objects (users, computers, groups) to model the company structure. OUs are also used to link group policies.
- **Domain** – The central unit that holds the Active Directory. Security policies apply within a domain, which must have at least one DC.
- **Tree** – Several domains arranged hierarchically, sharing a contiguous namespace (e.g. `de.abc.com` under `abc.com`).
- **Forest** – One or more trees, typically with different namespaces. Domains work independently but can communicate across the forest.

## Global Catalog

The **global catalog** is a database used to search for objects across the whole forest, including objects in other namespaces. Each AD site should host at least one DC with a copy of the global catalog.

## Trusts

A **trust** describes the relationship between two domains: the trusting domain accepts authentication from the trusted domain.

- **Unidirectional** – trust in one direction / **Bidirectional** – trust in both directions
- **Transitive** – trust extends across further trusts / **Non-transitive** – only for the explicitly configured trust

The default is **bidirectional and transitive**.

## LDAP and Naming

**LDAP** (Lightweight Directory Access Protocol) is used to access the directory service.

- **Distinguished Name (DN)** – The unique "LDAP path" of an object, using `CN` (Common Name), `OU` (Organizational Unit) and `DC` (Domain Component), e.g. `CN=HPjet5, OU=Assistenz, DC=Firma, DC=DE`.
- **Canonical Name** – The same information in DNS domain-name format, e.g. `HPjet5.Assistenz.firma.de`.

## Roaming Profiles

A **roaming profile** is stored centrally on a server so a user finds the same environment on any domain computer. The profile is copied to the machine at logon and synced back at logoff.

- **Advantage** – Same environment on every computer.
- **Disadvantage** – Requires much storage; logon/logoff can be slow.

The **SYSVOL** and **NETLOGON** shares are created when a server is promoted to a DC. They store group policies and logon scripts that clients retrieve.

## Functional Levels

When promoting a DC, a **forest functional level** and a **domain functional level** are chosen. They define which AD features are available and guarantee that DCs with different Windows Server versions can interoperate (backward compatibility). Higher levels offer more features but cannot be reversed. A domain can run at a higher level than the forest, but not lower.

## Group Policies (GPO)

**Group policies** are configuration instructions used to enforce settings (e.g. password policies, power settings, access restrictions). They are stored in Active Directory and are available domain-wide through replication. A **Group Policy Object (GPO)** stores the individual settings and is **linked** to the object it should affect. GPOs contain separate settings for users and computers, and they act on the user and computer accounts contained in an OU, not on groups.

### Processing Order

Group policies can be linked to a site, a domain or an OU; every computer also has a local policy. The processing order is **L-S-D-OU**:

1. **Local**
2. **Site**
3. **Domain**
4. **OU**

Each later step overrides conflicting settings of the earlier one. Thus the local policy has the lowest priority and the OU policy the highest. If several GPOs are linked at the same level, the link order decides (lowest link value wins, as it is processed last).

### Refresh

Group policy settings are refreshed in the background roughly every **90 minutes** on clients and every **5 minutes** on domain controllers. A refresh can be forced with `gpupdate /force`. Folder redirection is an exception: it is only applied at user logon.
