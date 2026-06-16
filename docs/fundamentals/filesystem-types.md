---
title: "Filesystem Types"
description: "Overview of common filesystem types (FAT32, exFAT, NTFS, ext4, APFS, btrfs) and their typical use cases, limits and platform support."
keywords:
    - Filesystem
    - FAT32
    - exFAT
    - NTFS
    - ext4
    - APFS
    - btrfs
---

# Filesystem Types

A **filesystem** defines how data is organized and stored on a storage device. Filesystems differ in maximum file size, journaling support and which operating systems can read and write them.

## Overview

| Filesystem | Max file size | Journaling          | Typical use                                    |
| ---------- | ------------- | ------------------- | ---------------------------------------------- |
| FAT32      | 4 GB          | No                  | USB sticks, SD cards, broad compatibility      |
| exFAT      | 16 EB         | No                  | Large USB sticks and SD cards across platforms |
| NTFS       | 16 EB         | Yes                 | Windows system and data drives                 |
| ext4       | 16 TB         | Yes                 | Default Linux filesystem                       |
| APFS       | 8 EB          | Yes (copy-on-write) | Default macOS filesystem                       |
| btrfs      | 16 EB         | Yes (copy-on-write) | Linux, with snapshots and pooling              |

## Choosing a Filesystem

- **Maximum compatibility (small files):** FAT32 is read and written by virtually every device, but is limited to 4 GB per file.
- **Maximum compatibility (large files):** exFAT removes the 4 GB limit and works across Linux, Windows and macOS.
- **Linux only:** ext4 is the safe default; btrfs adds snapshots and other advanced features.
- **Windows only:** NTFS supports permissions, journaling and large volumes.
- **macOS only:** APFS is optimized for SSDs and is the modern default.
