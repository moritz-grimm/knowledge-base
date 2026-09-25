---
title: "RAID"
description: "Overview of JBOD and the RAID levels 0, 1, 5, 6, 10 and 01 with their trade-offs between performance, redundancy and storage efficiency."
keywords:
    - RAID
    - Redundant Array of Independent Disks
    - Redundant Array of Inexpensive Disks
    - storage
    - disk redundancy
tags:
    - ap2
---

# RAID

## Overview

RAID (Redundant Array of Independent/Inexpensive Disks) is a method of combining multiple physical disks into a logical unit to improve performance, redundancy, or both.

## JBOD – Just a Bunch of Disks

JBOD is the absence of a RAID level: the disks are used as they are. Either every disk appears individually to the operating system, or several disks are concatenated into one large logical volume (also called spanning or linear mode). Data is written to one disk until it is full, then the next one is used.

- **Minimum disks:** 1
- **Performance:** Same as a single disk, there is no striping and therefore no parallel access
- **Redundancy:** None
- **Usable capacity:** 100%, disks of different sizes can be combined without losing space

**Best for:** archives, backup targets and media libraries where capacity per euro matters and the data is available elsewhere.

**Pros:**

- Disks of different sizes and ages can be combined.
- No capacity is lost to parity or mirroring.
- A failed disk only affects the data stored on that disk, not the whole volume.
- Adding another disk does not require rebuilding the array.

**Cons:**

- There is neither redundancy nor a performance gain.
- With a concatenated volume, files that span a disk boundary are lost as well.
- A failure is harder to assess than with a real RAID level, because it depends on which files happened to be on the failed disk.

## RAID 0 – Striping

Data is split into blocks and written across all disks in parallel.

- **Minimum disks:** 2
- **Performance:** Highest read/write speed (scales with disk count)
- **Redundancy:** None, one disk failure leads to loss of all data
- **Usable capacity:** 100%

**Best for:** temporary data, caches, or other scenarios where speed matters more than reliability.

**Pros:**

- Maximum read and write performance
- Full usable storage capacity
- Simple to set up

**Cons:**

- No fault tolerance
- Loss of all data on a single disk failure

## RAID 1 – Mirroring

Data is written identically to all disks.

- **Minimum disks:** 2
- **Performance:** Faster reads (can read from any disk), same write speed as a single disk
- **Redundancy:** Can survive failure of all but one disk
- **Usable capacity:** 50%

**Best for:** OS drives or critical data where reliability is the priority.

**Pros:**

- High redundancy, simple recovery
- Fast read performance
- Easy to understand and manage

**Cons:**

- 50% of storage capacity lost to mirroring
- Writes no faster than a single disk

## RAID 5 – Striping with Distributed Parity

Data and parity information are striped across all disks. Parity allows recovery of data if one disk fails.

- **Minimum disks:** 3
- **Performance:** Good read speed; write speed reduced due to parity calculation
- **Redundancy:** Tolerates 1 disk failure
- **Usable capacity:** `(n - 1) / n` (e.g. 3 disks => 67%)

**Best for:** general-purpose file servers balancing capacity, performance, and redundancy.

**Pros:**

- Good balance of capacity, performance, and redundancy
- Only one disk's worth of capacity lost to parity

**Cons:**

- Parity calculation reduces write performance.
- Rebuild times can be very long on large drives.
- The array is vulnerable to a second failure during rebuild.

## RAID 6 – Striping with Double Parity

Like [RAID 5](#raid-5--striping-with-distributed-parity), but with two independent parity blocks, tolerating two simultaneous disk failures.

- **Minimum disks:** 4
- **Performance:** Slightly slower writes than RAID 5 due to double parity
- **Redundancy:** Tolerates 2 disk failures
- **Usable capacity:** `(n - 2) / n` (e.g. 4 disks => 50%)

**Best for:** large arrays or environments where rebuild time increases failure risk.

**Pros:**

- Survives two simultaneous disk failures
- Safer for large arrays where a rebuild can take days

**Cons:**

- Higher write penalty than RAID 5
- Two disks' worth of capacity lost to parity
- Requires at least 4 disks

## RAID 10 – Striping + Mirroring

Combines [RAID 1](#raid-1--mirroring) (mirroring) and [RAID 0](#raid-0--striping) (striping): data is mirrored in pairs, then striped across pairs.

- **Minimum disks:** 4
- **Performance:** High read and write speed
- **Redundancy:** Tolerates 1 failure per mirrored pair
- **Usable capacity:** 50%

**Best for:** databases and high-throughput workloads that need both speed and redundancy.

**Pros:**

- Excellent read and write performance
- Fast rebuild compared to parity-based RAID levels
- Simple recovery process

**Cons:**

- 50% of storage capacity lost to mirroring
- Requires at least 4 disks, with quickly scaling costs

## RAID 01 – Mirroring + Striping

RAID 01 (also written RAID 0+1) combines the same two levels as RAID 10, but in the opposite order: the disks are first grouped into RAID 0 stripe sets, and those sets are then mirrored.

- **Minimum disks:** 4
- **Performance:** Same as RAID 10, high read and write speed
- **Redundancy:** Tolerates 1 disk failure with certainty
- **Usable capacity:** 50%

```text
RAID 10:  mirror(Disk1, Disk2) + mirror(Disk3, Disk4), striped across both mirrors
RAID 01:  stripe(Disk1, Disk2) + stripe(Disk3, Disk4), mirrored onto each other
```

**Best for:** nothing in particular. RAID 10 achieves the same with better failure behaviour and is therefore used instead.

**Difference to RAID 10:** a single disk failure takes down the entire stripe set it belongs to, so the array runs on the remaining mirror. A second failure destroys the array unless it hits one of the already failed set's disks. With RAID 10 only the affected mirror pair is degraded, and a second failure is survived as long as it occurs in a different pair. The rebuild differs accordingly: RAID 10 only resynchronises one mirror partner, RAID 01 has to rebuild the whole stripe set.

**Pros:**

- High read and write performance
- Simple to understand as a combination of two basic levels

**Cons:**

- Worse failure behaviour than RAID 10 at identical cost
- 50% of storage capacity lost to mirroring
- Longer rebuild, since a complete stripe set has to be restored

## Comparison

| Level                                               | Min. Disks | Fault Tolerance | Usable Capacity | Performance               |
| --------------------------------------------------- | ---------- | --------------- | --------------- | ------------------------- |
| [JBOD](#jbod--just-a-bunch-of-disks)                | 1          | 0 disks         | 100%            | Like a single disk        |
| [RAID 0](#raid-0--striping)                         | 2          | 0 disks         | 100%            | Very high reads & writes  |
| [RAID 1](#raid-1--mirroring)                        | 2          | n-1 disks       | 50%             | Fast reads, normal writes |
| [RAID 5](#raid-5--striping-with-distributed-parity) | 3          | 1 disk          | (n-1)/n         | Fast reads, slow writes   |
| [RAID 6](#raid-6--striping-with-double-parity)      | 4          | 2 disks         | (n-2)/n         | Fast reads, slower writes |
| [RAID 10](#raid-10--striping--mirroring)            | 4          | 1 per pair      | 50%             | Very high reads & writes  |
| [RAID 01](#raid-01--mirroring--striping)            | 4          | 1 disk          | 50%             | Very high reads & writes  |

## Important Notes

- RAID is **not a backup**: it protects against disk failure, not against accidental deletion, corruption, or disasters.
- Rebuild time on large drives can take hours to days, during which the array is vulnerable.
- Hardware RAID controllers offer better performance and cache, but add cost and vendor lock-in.
- Software RAID (e.g. Linux `mdadm`, Windows Storage Spaces, ZFS) is a cost-effective alternative.
