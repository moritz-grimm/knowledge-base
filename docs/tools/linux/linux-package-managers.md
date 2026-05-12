---
title: "Linux Package Managers"
description: "An overview of the most common Linux package managers, their supported distributions, and their key commands."
keywords:
    - Linux
    - Package Manager
    - apt
    - pacman
    - dnf
    - yum
    - zypper
    - portage
    - Debian
    - Ubuntu
    - Arch Linux
    - Fedora
    - openSUSE
    - Gentoo
---

# Linux Package Managers

A package manager automates installing, updating, and removing software on a Linux system. Each major distribution family uses its own tool.

## apt

Used by Debian-based distributions: Ubuntu, Debian, Kali Linux, Linux Mint.

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `apt update`            | Refresh the package index             |
| `apt upgrade`           | Upgrade all installed packages        |
| `apt install <package>` | Install a package                     |
| `apt remove <package>`  | Remove a package (keep config files)  |
| `apt purge <package>`   | Remove a package and its config files |
| `apt search <term>`     | Search for a package                  |
| `apt list --installed`  | List all installed packages           |

## pacman

Used by Arch-based distributions: Arch Linux, Manjaro, EndeavourOS.

| Command                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `pacman -Syu`          | Sync package database and upgrade all packages |
| `pacman -S <package>`  | Install a package                              |
| `pacman -R <package>`  | Remove a package                               |
| `pacman -Rs <package>` | Remove a package and its unused dependencies   |
| `pacman -Ss <term>`    | Search the package database                    |
| `pacman -Q`            | List all installed packages                    |

## dnf

Used by Red Hat-based distributions from Fedora 22 and CentOS Stream 8 onwards.

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `dnf check-update`      | Check for available updates    |
| `dnf upgrade`           | Upgrade all installed packages |
| `dnf install <package>` | Install a package              |
| `dnf remove <package>`  | Remove a package               |
| `dnf search <term>`     | Search for a package           |
| `dnf list --installed`  | List all installed packages    |

## yum

Predecessor to [dnf](#dnf), used on Fedora 21, CentOS 7, and RHEL 7 and earlier. Replaced by dnf due to its slow Python-based dependency resolver and accumulated technical debt.

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `yum check-update`      | Check for available updates    |
| `yum update`            | Upgrade all installed packages |
| `yum install <package>` | Install a package              |
| `yum remove <package>`  | Remove a package               |
| `yum search <term>`     | Search for a package           |
| `yum list installed`    | List all installed packages    |

## zypper

Used by openSUSE and SUSE Linux Enterprise.

| Command                            | Description                    |
| ---------------------------------- | ------------------------------ |
| `zypper refresh`                   | Refresh all repositories       |
| `zypper update`                    | Upgrade all installed packages |
| `zypper install <package>`         | Install a package              |
| `zypper remove <package>`          | Remove a package               |
| `zypper search <term>`             | Search for a package           |
| `zypper packages --installed-only` | List all installed packages    |

## portage

Used by Gentoo. Packages are compiled from source, making them highly configurable. The front-end tool is `emerge`.

| Command                       | Description                                  |
| ----------------------------- | -------------------------------------------- |
| `emerge --sync`               | Sync the portage tree                        |
| `emerge -uDN @world`          | Upgrade all installed packages               |
| `emerge <package>`            | Install a package                            |
| `emerge --depclean <package>` | Remove a package and its unused dependencies |
| `emerge --search <term>`      | Search for a package                         |
| `qlist -I`                    | List all installed packages                  |
