---
title: Hard and Soft Links
description: Hard links and symbolic (soft) links in Linux. What they are, how they differ and how to create and manage them with the `ln` command.
keywords:
    - Linux
    - Hard Link
    - Soft Link
    - Symbolic Link
    - symlink
    - ln
    - Filesystem
    - inode
---

# Hard and Soft Links

A **link** is a reference from one path in the filesystem to another file or directory. Linux supports two kinds: **hard links** and **symbolic (soft) links**. Both are created with the `ln` command but behave very differently.

## Inodes

Every file on a Linux filesystem is identified by an **inode**, a number that points to the actual data on disk. A filename is just a label that maps to an inode, and multiple filenames can point to the same inode.

```bash
ls -i file.txt    # Show the inode number of a file
```

## Hard Links

A hard link creates an additional **filename for the same inode**. Both names refer to exactly the same file on disk. Neither is "the original". The file's data is only released when the last hard link to it is removed.

### Creating a Hard Link

```bash
ln target.txt linkname.txt
```

### Properties

- Both names share the same inode
- Removing one name does not affect the other
- Cannot span filesystems, both names must live on the same partition
- Cannot link directories (with rare exceptions reserved for the system)
- Cannot link to a file that does not exist

### Example

```bash
echo "hello" > original.txt
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 original.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 hardlink.txt
rm original.txt
cat hardlink.txt    # still prints "hello"
```

## Symbolic (Soft) Links

A symbolic link is a small special file that **stores the path** to another file or directory. It has its own inode. If the target is moved or deleted, the symlink becomes "dangling" and broken.

### Creating a Symbolic Link

```bash
ln -s target.txt linkname.txt
```

### Properties

- Has its own inode separate from the target
- Can span filesystems freely
- Can link directories
- Can point to a non-existent target (broken/dangling link)
- Can use absolute or relative paths as the target

### Example

```bash
echo "hello" > original.txt
ln -s original.txt softlink.txt
ls -li original.txt softlink.txt
# 12345 -rw-r--r-- 1 user user  6 Apr 25 10:00 original.txt
# 12346 lrwxrwxrwx 1 user user 12 Apr 25 10:00 softlink.txt -> original.txt
rm original.txt
cat softlink.txt    # error: No such file or directory
```

## Hard vs Soft Links

| Property                   | Hard Link           | Soft Link |
| -------------------------- | ------------------- | --------- |
| Points to                  | inode               | path      |
| Own inode?                 | No (same as target) | Yes       |
| Can cross filesystems?     | No                  | Yes       |
| Can link directories?      | No                  | Yes       |
| Can target a missing file? | No                  | Yes       |
| Survives target deletion?  | Yes                 | No        |
| Created with               | `ln`                | `ln -s`   |

## Common `ln` Options

| Command              | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `ln target name`     | Create a hard link                                                                |
| `ln -s target name`  | Create a symbolic (soft) link                                                     |
| `ln -f target name`  | Remove (overwrite) an existing destination file                                   |
| `ln -i target name`  | Prompt before overwriting an existing destination                                 |
| `ln -b target name`  | Back up an existing destination before replacing it (appends `~` to the filename) |
| `ln -v target name`  | Print the name of each linked file (verbose)                                      |
| `ln -sf target name` | Force-replace an existing link of the same name                                   |
| `readlink name`      | Show the path a symbolic link points to                                           |
| `readlink -f name`   | Resolve all symlinks to the canonical absolute path                               |

## When to Use Which

- **Hard links** are useful for keeping multiple stable names for the same file (for example, backup snapshots that share unchanged content) without using extra disk space.
- **Soft links** are the more common choice for shortcuts. For example switching between versions of a tool (e.g. `/usr/bin/python => python3.12`), or referencing files across mount points.
