---
title: "File Paths"
description: "Absolute and relative paths in a filesystem. How they differ and the special path components `/`, `.`, `..` and `~`."
keywords:
    - File Path
    - Absolute Path
    - Relative Path
    - Working Directory
    - Filesystem
---

# File Paths

A **path** describes the location of a file or directory in the filesystem. There are two ways to write one: **absolute** and **relative**.

## Absolute Paths

An absolute path starts at the **root** of the filesystem and is therefore unambiguous, regardless of the current location.

- On Linux and macOS the root is `/`, e.g. `/home/user/notes.txt`
- On Windows it starts with a drive letter, e.g. `C:\Users\user\notes.txt`

## Relative Paths

A relative path is interpreted **relative to the current working directory**. It does not start with `/` (or a drive letter).

```bash
cd /home/user
cat notes.txt          # => /home/user/notes.txt
cat projects/app.js    # => /home/user/projects/app.js
```

## Special Path Components

| Component | Meaning                                    |
| --------- | ------------------------------------------ |
| `/`       | Root directory (start of an absolute path) |
| `.`       | The current directory                      |
| `..`      | The parent directory (one level up)        |
| `~`       | The current user's home directory          |

### Examples

```bash
cd ..        # Move up one directory
cd ./bin     # Enter the bin directory below the current one
cd ~         # Go to the home directory
cat ../config.txt
```

## Working Directory

The **working directory** is the directory a process is currently "in". It is the anchor every relative path is resolved against.

```bash
pwd    # Print the current working directory
```
