---
description: "Subnetting Basics, Calculations & Examples (IPv4)"
---

# Subnetting (IPv4)

## Subnetting Basics

Subnetting divides a large network into smaller, more manageable sub-networks (subnets). This improves performance, organization, and security.

| Term             | Symbol/Ref | Definition                                                   | Example                |
| ---------------- | ---------- | ------------------------------------------------------------ | ---------------------- |
| **IP Address**   | IP         | Unique address of a device on the network.                   | `192.168.1.10`         |
| **Subnet Mask**  | Netmask    | Separates the Network part from the Host part.               | `255.255.255.0`        |
| **CIDR**         | Slash Not. | Short format of the mask (Count of "1" bits).                | `/24`                  |
| **Network ID**   | Net ID     | The "Street Name". The first address of the subnet.          | `192.168.1.0`          |
| **Broadcast**    | Bcast      | Call to *all* devices. The last address.                     | `192.168.1.255`        |
| **Host**         | Host       | A device (PC, Router) inside the subnet.                     | `.1` to `.254`         |
| **Network-Bits** | Net-Bits   | Bits in the IP address identifying the network.              | `/24` => first 24 bits |
| **Host-Bits**    | Host-Bits  | Bits in the IP address identifying hosts within the network. | `24` => last 8 bits    |

**Rule:** An IPv4 address consists of **32 Bits**, divided into 4 Octets (8 bits each).  
**Format:** `x.x.x.x` (Decimal) or `11000000.10101000.00000001.00001010` (Binary)

---

## Understanding Subnet Masks & CIDR

The Subnet Mask tells the computer which part of the IP is the **Network** (Street) and which part is the **Host** (House Number).

### CIDR Notation (Classless Inter-Domain Routing)

CIDR (e.g., `/24`) simply counts the number of **active bits (Ones)** in the mask from left to right.

| CIDR | Subnet Mask (Decimal) | Binary Mask (First Octets) | Hosts per Subnet* |
| ---- | --------------------- | -------------------------- | ----------------- |
| /8   | 255.0.0.0             | `11111111.00000000...`     | 16,777,214        |
| /16  | 255.255.0.0           | `11111111.11111111...`     | 65,534            |
| /24  | 255.255.255.0         | `11111111...11111111.0`    | 254               |
| /25  | 255.255.255.128       | `11111111...1.10000000`    | 126               |
| /26  | 255.255.255.192       | `11111111...1.11000000`    | 62                |
| /30  | 255.255.255.252       | `11111111...1.11111100`    | 2                 |

**Note:** Total addresses minus 2 (1 for Network ID, 1 for Broadcast).

---

## Calculation Methods

### 1. Calculating Subnet Size (Number of Hosts)

How many devices fit into a subnet?

```text
Formula: 2^(Host-Bits) - 2 = Usable Hosts

Host-Bits = 32 - (CIDR)

```

#### Example: /24 Network

1. **Host-Bits:** 32 - 24 = 8 Bits
2. **Calculation:** 2⁸ = 256
3. **Usable:** 256 - 2 = **254 Hosts**

#### Example: /26 Network

1. **Host-Bits:** 32 - 26 = 6 Bits
2. **Calculation:** 2⁶ = 64
3. **Usable:** 64 - 2 = **62 Hosts**

---

### 2. Finding the "Magic Number" (Size of each Subnet)

The Magic Number helps you calculate subnet ranges mentally. It represents the increment (step size) of the networks.

```markdown
Method 1 (Binary Place):
Look at the last bit set to '1' in the subnetmask. Its value is the Magic Number.

Method 2 (Subtraction):
256 - (Last non-zero octet of the mask) = Magic Number

Method 3:
2^(Host-Bits) = Size of each Subnet

```

#### Example: /26 Mask (255.255.255.192)

* **Interesting Octet:** 192
* **Calculation:** 256 - 192 = **64**
* **Result:** The networks increase in steps of 64 (0, 64, 128, 192).

---

## Step-by-Step Example Calculation

**Task:** Analyze the IP `192.168.10.150` with the mask `255.255.255.192` (/26).

### Step 1: Find the Magic Number (Block Size)

* Mask is `/26`. The change happens in the 4th Octet.
* Mask in 4th Octet: `192`
* Magic Number: `256 - 192 = 64`

### Step 2: Determine Subnet Ranges

Increment by 64 until you pass the IP address (`150`).

* Subnet 1: `0 - 63`
* Subnet 2: `64 - 127`
* Subnet 3: `128 - 191`  (150 falls into this range)
* Subnet 4: `192 - 255`

### Step 3: Calculate Addresses

The IP `192.168.10.150` belongs to the `.128` Subnet.

| Type           | Calculation          | Result             |
| -------------- | -------------------- | ------------------ |
| **Network ID** | Start of the block   | **192.168.10.128** |
| **First Host** | Network ID + 1       | **192.168.10.129** |
| **Last Host**  | Broadcast - 1        | **192.168.10.190** |
| **Broadcast**  | Next Block (192) - 1 | **192.168.10.191** |

---

## Quick Reference: Common Subnets

| CIDR    | Mask (.x) | Magic Number | Usable Hosts | Typical Use Case                 |
| ------- | --------- | ------------ | ------------ | -------------------------------- |
| **/24** | .0        | 256          | 254          | Standard LAN (Home/Office)       |
| **/25** | .128      | 128          | 126          | Splitting a LAN in half          |
| **/26** | .192      | 64           | 62           | Department networks              |
| **/27** | .224      | 32           | 30           | Small Teams / DMZ                |
| **/28** | .240      | 16           | 14           | Very small groups                |
| **/29** | .248      | 8            | 6            | Transfer nets (Router-to-Router) |
| **/30** | .252      | 4            | 2            | Point-to-Point Links             |
| **/32** | .255      | 1            | 1            | Single Host IP (Loopback)        |

---

## Common Pitfalls

* **Forgetting ID/Broadcast:** Always subtract 2 to get *usable* hosts.
* **Wrong Octet:** A `/18` subnet changes in the *3rd* octet, not the 4th.
* `/8 - /15`: Change in 2nd Octet
* `/16 - /23`: Change in 3rd Octet
* `/24 - /32`: Change in 4th Octet

* **Even/Odd:** Network IDs are usually even numbers; Broadcasts are usually odd numbers.
