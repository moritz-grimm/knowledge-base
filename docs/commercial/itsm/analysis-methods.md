---
title: Problem Analysis Methods
description: "Key methods for IT problem analysis: the 5-Why method, Ishikawa diagram, DMAIC cycle, and the Cause-Effect matrix"
keywords:
  - "5-Why Method"
  - "Ishikawa Diagram"
  - "Fishbone Diagram"
  - "DMAIC"
  - "Root Cause Analysis"
  - "Problem Analysis"
  - "Cause-Effect Matrix"
---

# Problem Analysis Methods

## Overview

These methods are used in [Problem Management](./problem-management.md) to systematically find the root cause of a problem.

## 5-Why Method (5-W-Methode)

**Goal:** Find the root cause of a problem by asking "Why?" repeatedly, with each answer becoming the next question. Usually five iterations are sufficient.

**Example (printer problem):**

| Step    | Question                                    | Answer                                                          |
| ------- | ------------------------------------------- | --------------------------------------------------------------- |
| Problem | The printer does not print clearly          |                                                                 |
| Why?    | Why doesn't the printer print clearly?      | It does not show all characters clearly / output is not legible |
| Why?    | Why doesn't it show all characters clearly? | The ink/toner is poor                                           |
| Why?    | Why is the ink/toner poor?                  | It smears and sometimes does not print at all                   |
| Why?    | Why does it smear and sometimes not print?  | The toner quality is low                                        |
| Why?    | Why is the toner quality low?               | **The cheapest toner was purchased** (root cause)               |

## Ishikawa Diagram (Fishbone Diagram)

The **Ishikawa diagram** (also called **cause-effect diagram** or **fishbone diagram**) was developed by Japanese scientist Kaoru Ishikawa in the 1940s. It visualises the causes of a problem.

**Structure:**

- Horizontal arrow pointing right => **Problem description at the tip** (the effect)
- Diagonal arrows off the horizontal line => **Main influence categories** (the "bones")
- Smaller arrows off the diagonal bones => **Sub-causes** (Nebenursachen)

**Arrow meaning:** each arrow "contributes to" the effect described at the tip.

### Main Influence Categories (8M)

- Category
- Material
- People
- Machine
- Method
- Management
- Environment
- Measurement
- Money

Other influence categories are also possible depending on the problem.

### Creating an Ishikawa Diagram

1. Write the problem description at the tip of the horizontal arrow (rightmost)
2. Define the main influence categories (8M)
3. Find main causes via team brainstorming (drawn as arrows parallel to the horizontal axis)
4. Find sub-causes for each main cause (drawn as diagonal arrows branching off the main cause arrow)

## DMAIC Cycle

The **DMAIC cycle** is used for complex problems and projects. The acronym stands for the five phases:

| Phase       | Key Question                    | Methods / Tools                                                                                                       |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Define**  | What is the problem?            | Customer feedback, problem definition, scope, KPI analysis, RACI matrix                                               |
| **Measure** | How big is the problem?         | IST situation analysis, [SLA](./sla.md) review, clarification of escalation level                                     |
| **Analyse** | What are the root causes?       | 5-Why method, customer surveys, [error database](./problem-management.md#known-error-database-kedb), Ishikawa diagram |
| **Improve** | Can a solution be developed?    | Simulations, test runs, solution matrix, Ishikawa diagram                                                             |
| **Control** | Can the improvement be secured? | Monitoring, service management system                                                                                 |

## Problemlösungsmatrix / Ursachen-Wirkungs-Matrix

The **Cause-Effect matrix** (based on the Kepner-Tregoe method) analyses a problem along four dimensions to systematically narrow down the root cause by comparing what IS the case with what is NOT the case:

| Dimension                   | IS (the problem)                            | IS NOT (the problem)               | Deviation                                          | Possible cause              |
| --------------------------- | ------------------------------------------- | ---------------------------------- | -------------------------------------------------- | --------------------------- |
| **Identify (What)**         | What is the problem?                        | What is NOT the problem?           | How is the difference between IS and target state? | What is the possible cause? |
| **Localise (Where)**        | Where does the problem occur?               | Where does it NOT occur?           | What is different at that location?                | What is the possible cause? |
| **Time (When)**             | When did the problem appear?                | When did it NOT appear?            | What was different at that time?                   | What is the possible cause? |
|                             | In which period was the problem identified? | In which period did it NOT appear? | What was different during that period?             |                             |
| **Significance (How much)** | How big / widespread is the problem?        | How small or limited is it?        | What is the difference in scope?                   | What is the possible cause? |
|                             | How many (units) are affected?              | How many (units) are NOT affected? |                                                    |                             |
|                             | Which part is affected?                     | Which part is NOT affected?        |                                                    |                             |
