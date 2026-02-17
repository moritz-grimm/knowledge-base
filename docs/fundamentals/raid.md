---
title: RAID
description: Overview of RAID levels and their trade-offs between performance, redundancy, and storage efficiency.
keywords:
    - RAID
    - Redundant Array of Independent Disks
    - Redundant Array of Inexpensive Disks
    - storage
    - disk redundancy
---

# RAID

## Overview

RAID (Redundant Array of Independent/Inexpensive Disks) is a method of combining multiple physical disks into a logical unit to improve performance, redundancy, or both.

## RAID 0 – Striping

Data is split into blocks and written across all disks in parallel.

- **Minimum disks**: 2
- **Performance**: Highest read/write speed (scales with disk count)
- **Redundancy**: None, one disk failure leads to loss of all data
- **Usable capacity**: 100%

**Best for:** temporary data, caches, or other scenarios where speed matters more than reliability.

**Pros:**

- Maximum read and write performance
- Full storage capacity is usable
- Simple to set up

**Cons:**

- No fault tolerance whatsoever
- One disk failure destroys all data

## RAID 1 – Mirroring

Data is written identically to all disks.

- **Minimum disks**: 2
- **Performance**: Faster reads (can read from either disk), same write speed as a single disk
- **Redundancy**: Can survive failure of all but one disk
- **Usable capacity**: 50%

**Best for:** OS drives or critical data where reliability is the priority.

**Pros:**

- High redundancy, simple recovery
- Fast read performance
- Easy to understand and manage

**Cons:**

- 50% of storage capacity is lost to mirroring
- Writes are no faster than a single disk

## RAID 5 – Striping with Distributed Parity

Data and parity information are striped across all disks. Parity allows recovery of data if one disk fails.

- **Minimum disks**: 3
- **Performance**: Good read speed; write speed reduced due to parity calculation
- **Redundancy**: Tolerates 1 disk failure
- **Usable capacity**: `(n - 1) / n` (e.g. 3 disks → 66%)

**Best for:** general-purpose file servers balancing capacity, performance, and redundancy.

**Pros:**

- Good balance of capacity, performance, and redundancy
- Only one disk worth of capacity lost to parity

**Cons:**

- Write performance penalty due to parity calculation
- Rebuild times can be very long on large drives
- Array is vulnerable to a second failure during rebuild

## RAID 6 – Striping with Double Parity

Like RAID 5, but with two independent parity blocks, allowing two simultaneous disk failures.

- **Minimum disks**: 4
- **Performance**: Slightly slower writes than RAID 5 due to double parity
- **Redundancy**: Tolerates 2 disk failures
- **Usable capacity**: `(n - 2) / n` (e.g. 4 disks → 50%)

**Best for:** large arrays or environments where rebuild time increases failure risk.

**Pros:**

- Survives two simultaneous disk failures
- Safer for large arrays where rebuild takes days

**Cons:**

- Higher write penalty than RAID 5
- Two disks worth of capacity lost to parity
- Requires at least 4 disks

## RAID 10 – Striping + Mirroring

Combines RAID 1 (mirroring) and RAID 0 (striping): data is mirrored in pairs, then striped across pairs.

- **Minimum disks**: 4
- **Performance**: High read and write speed
- **Redundancy**: Tolerates 1 failure per mirrored pair
- **Usable capacity**: 50%

**Best for:** databases and high-throughput workloads that need both speed and redundancy.

**Pros:**

- Excellent read and write performance
- Fast rebuild compared to parity-based RAID levels
- Simple recovery process

**Cons:**

- 50% of storage capacity is lost to mirroring
- Requires at least 4 disks, costs scale quickly

## Comparison

| Level   | Min. Disks | Fault Tolerance | Usable Capacity | Performance              |
| ------- | ---------- | --------------- | --------------- | ------------------------ |
| RAID 0  | 2          | 0 disks         | 100%            | Very high reads & writes |
| RAID 1  | 2          | n-1 disks       | 50%             | Fast reads, slow writes  |
| RAID 5  | 3          | 1 disk          | (n-1)/n         | Fast reads, slow writes  |
| RAID 6  | 4          | 2 disks         | (n-2)/n         | Fast reads, slower writes|
| RAID 10 | 4          | 1 per pair      | 50%             | Very high reads & writes |

## Important Notes

- RAID is **not a backup**, it protects against disk failure, not accidental deletion, corruption, or disasters
- Rebuild time on large drives can take hours to days, during which the array is vulnerable
- Hardware RAID controllers offer better performance and cache, but add cost and vendor lock-in
- Software RAID (e.g. Linux `mdadm`, Windows Storage Spaces, ZFS) is a cost-effective alternative
