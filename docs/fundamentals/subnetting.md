---
title: Subnetting (IPv4)
description: "Subnetting Basics, Calculations & Examples (IPv4)"
keywords: 
    - Subnetting
    - IPv4
last_update:
    author: moritz-grimm
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

CIDR (e.g., `/24`) simply counts the number of **active bits** in the mask from left to right.

| CIDR | Decimal Subnet Mask | Binary Subnet Mask (First Octets) | Hosts per Subnet* |
| ---- | ------------------- | --------------------------------- | ----------------- |
| /8   | 255.0.0.0           | `11111111.00000000...`            | 16,777,214        |
| /16  | 255.255.0.0         | `11111111.11111111...`            | 65,534            |
| /24  | 255.255.255.0       | `11111111...11111111.0`           | 254               |
| /25  | 255.255.255.128     | `11111111...1.10000000`           | 126               |
| /26  | 255.255.255.192     | `11111111...1.11000000`           | 62                |
| /30  | 255.255.255.252     | `11111111...1.11111100`           | 2                 |

**Note:** Total addresses minus 2 (1 for Network ID, 1 for Broadcast).

---

## Calculation Methods

### 1. Calculating Subnet Size (Number of Hosts)

How many **total IP addresses** does a subnet contain (across all octets)?

```text
Formula (Total Addresses): 2^(Host-Bits) = Total Addresses
Formula (Usable Hosts): 2^(Host-Bits) - 2 = Usable Hosts

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

### 2. Finding the "Magic Number" (Block Size in the Interesting Octet)

The Magic Number represents the **step size** within the octet where subnetting occurs.

**Important:** The Magic Number only applies to the "interesting octet" (the octet where the subnet mask is neither 0 nor 255).

```text
Method 1 (Binary Place):
Look at the last bit set to '1' in the subnetmask. Its value is the Magic Number.

Method 2 (Subtraction):
256 - (Last non-zero octet of the mask) = Magic Number
```

#### Which octet is "interesting"?

- `/24 - /32`: **4th octet** changes
- `/16 - /23`: **3rd octet** changes
- `/8 - /15`: **2nd octet** changes

#### Relationship between Methods 1 & 2

- **For `/24+` (4th octet subnetting):** Magic Number = 2^(Host-Bits) ✔
- **For `/23-` (earlier octet subnetting):** They're different:
  - **Calculating Subnet Sizes:** Total Addresses spans multiple octets
  - **Finding the "Magic Number":** Magic Number is only the step size in one octet

#### Example: /26 Mask => 255.255.255.192 - 4th Octet Subnetting

- **Interesting Octet:** 192
- **Calculation:** 256 - 192 = **64**
- **Result:** The networks increase in steps of 64 (0, 64, 128, 192).

#### Example: `/18` Mask => 255.255.192.0 - 3rd Octet Subnetting

**Total Size:**

- Host-Bits: 32 - 18 = 14
- Total Addresses: 2^14 = **16,384**

**Magic Number (Step Size in 3rd Octet):**

- Mask: `255.255.192.0`
- Interesting Octet: 3rd (192)
- Magic Number: 256 - 192 = **64**
- Meaning: 3rd octet increments by 64 (0, 64, 128, 192)

**How they connect:**

- The 64 is the step in the 3rd octet
- Each step contains 256 addresses (full 4th octet)
- Total: 64 × 256 = 16,384 ✓

---

### 3. Calculating Number of Subnets

When you subnet a network, you "borrow" bits from the Host portion to create more networks.

```text
Formula: 2^(Borrowed Bits) = Number of Subnets

Borrowed Bits = New CIDR - Original CIDR
```

#### Example: From /24 to /26

**Scenario:** You have `192.168.1.0/24` and want to split it into `/26` subnets.

1. **Original Network:** `/24` (256 addresses total)
2. **New Subnet Size:** `/26`
3. **Borrowed Bits:** 26 - 24 = **2 Bits**
4. **Number of Subnets:** 2² = **4 Subnets**

**Result:** You get 4 subnets, each with 64 addresses (62 usable hosts).

| Subnet # | Network ID    | First Host    | Last Host     | Broadcast     |
| -------- | ------------- | ------------- | ------------- | ------------- |
| 1        | 192.168.1.0   | 192.168.1.1   | 192.168.1.62  | 192.168.1.63  |
| 2        | 192.168.1.64  | 192.168.1.65  | 192.168.1.126 | 192.168.1.127 |
| 3        | 192.168.1.128 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 4        | 192.168.1.192 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

#### Example: From /16 to /24

**Scenario:** ISP gives you `10.0.0.0/16`, you want `/24` networks for departments.

1. **Original:** `/16`
2. **New:** `/24`
3. **Borrowed Bits:** 24 - 16 = **8 Bits**
4. **Number of Subnets:** 2⁸ = **256 Subnets**

**Result:** You can create 256 department networks (10.0.0.0/24, 10.0.1.0/24, ..., 10.0.255.0/24).

---

## Step-by-Step Example Calculation

**Task:** Analyze the IP `192.168.10.150` with the mask `255.255.255.192` (/26).

### Step 1: Find the Magic Number (Block Size)

- Mask is `/26`. The change happens in the 4th Octet.
- Mask in 4th Octet: `192`
- Magic Number: `256 - 192 = 64`

### Step 2: Determine Subnet Ranges

Increment by 64 until you pass the IP address (`150`).

- Subnet 1: `0 - 63`
- Subnet 2: `64 - 127`
- Subnet 3: `128 - 191`  (150 falls into this range)
- Subnet 4: `192 - 255`

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
| **/27** | .224      | 32           | 30           | Small Teams                      |
| **/28** | .240      | 16           | 14           | Very small groups                |
| **/29** | .248      | 8            | 6            | Transfer nets (Router-to-Router) |
| **/30** | .252      | 4            | 2            | Point-to-Point Links             |
| **/32** | .255      | 1            | 1            | Single Host IP (Loopback)        |

---

## Common Pitfalls

- **Forgetting ID/Broadcast:** Always subtract 2 to get *usable* hosts.
- **Wrong stepping:** Subnet ranges are inclusive. The first subnet therefore ends at `start + block size − 1`. Once the first subnet is correct, subsequent subnet ends can be calculated either by adding the block size to the previous subnet end, or by applying the same `start + block size − 1` formula using the network address of each subnet.
- **Even/Odd:** Network IDs are usually even numbers; Broadcasts are usually odd numbers.
- **Wrong Octet:** A `/18` subnet changes in the *3rd* octet, not the 4th.
- `/8 - /15`: Change in 2nd Octet
- `/16 - /23`: Change in 3rd Octet
- `/24 - /32`: Change in 4th Octet
