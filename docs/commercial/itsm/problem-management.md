---
title: Problem Management
description: "Problem management in ITSM: the distinction between incidents and problems, problem control, error control, proactive problem management, and key KPIs"
keywords:
  - "Problem Management"
  - "Known Error"
  - "Known Error Database"
  - "Workaround"
  - "Problem Control"
  - "Error Control"
  - "Proactive Problem Management"
  - "Root Cause Analysis"
sidebar_position: 2
---

# Problem Management

## Overview

Problem Management is the **second level of Incident Management**. While Incident Management focuses on restoring service as fast as possible, Problem Management identifies and eliminates the underlying root cause to prevent future incidents.

## Incident vs. Problem vs. Known Error

| Term            | Definition                                                                              |
| --------------- | --------------------------------------------------------------------------------------- |
| **Incident**    | Unplanned service interruption; cause may be unknown; service is restored as a priority |
| **Problem**     | One or more incidents with an **unknown root cause**; investigated by experts           |
| **Known Error** | A problem whose root cause is known and for which a workaround or fix exists            |

If no solution can be found in First Level Support, the ticket is **escalated**: the incident becomes a Problem managed by Second Level Support.

## The Three Activities of Problem Management

### 1. Problem Control

All problems are systematically analysed and documented. The goal is to turn unknown causes into **Known Errors**.

Steps:

1. Record the problem and compare with the Known Error Database
2. If a workaround/solution already exists => Known Error, update occurrence counter
3. Classify the problem (category, sub-category, priority, business impact)
4. Analyse root cause (see [analysis methods](./analysis-methods.md))
5. Record result as a new Known Error in the KEDB

### 2. Error Control

Once a Known Error exists, Error Control manages the path from workaround to permanent fix.

- **Workaround** provided immediately to restore service
- Permanent fix initiated via **[RFC](./change-management.md#request-for-change-rfc)**
- After change implementation, Problem Management receives confirmation via a **[Post Implementation Review (PIR)](./change-management.md#closing-a-change-pir)**
- First Level Support is informed so they can update the customer

### 3. Proactive Problem Management

Preventing incidents before they occur:

- Analyse frequently recurring Known Errors (high occurrence counter = candidate for proactive PM)
- Evaluate manufacturer hints about upcoming software/hardware issues
- Monitor automated warnings and exceptions

## Workaround

A **workaround** is a problem bypass, alternative, or interim solution ("working around" the issue) to quickly restore service provisionally while the root cause is being addressed.

**Important:** Workarounds must be clearly marked as temporary measures in the system, so the provisional fix does not become a permanent state.

**Examples:**

| Disruption                           | Workaround                                     |
| ------------------------------------ | ---------------------------------------------- |
| Integrated webcam defective          | Connect USB camera                             |
| Mobile data capture device defective | Use a loan device                              |
| Wired network port defective         | Use WLAN stick or LAN adapter                  |
| DVI monitor port defective           | Use DisplayPort or HDMI if available           |
| Laser printer won't start            | Disconnect from power and restart              |
| Browser shows blank page             | Clear browser cache or use a different browser |

## Known Error Database (KEDB)

The KEDB stores all known problems with their workaround or solution. First Level Support uses it to provide quick help without escalating to Second Level.

Each entry has an **occurrence counter** (Vorfallszähler) that tracks how often the problem recurs. A high counter indicates a candidate for Proactive Problem Management.

## Key KPIs

| KPI                                       | Meaning                                                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Number of New Problems**                | Total problems registered in a period; Proactive PM aims to minimise this by resolving errors before they turn into incidents               |
| **Number of Incidents per Known Problem** | Average number of incidents associated with the same problem; shows how widespread the impact is and identifies candidates for Proactive PM |
| **Problem Resolution Effort**             | Average work effort to resolve a problem, broken down by category; shows which categories require the most effort                           |

## Separation of Problem Localisation and Problem Resolution

Problem Management localises the root cause; [Change Management](./change-management.md) resolves it. This separation:

- Allows focusing on one task at a time
- Enables service restoration (workaround) before the root cause investigation is complete
- Does not necessarily involve different teams, but separates the process steps
