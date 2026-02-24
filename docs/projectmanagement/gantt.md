---
title: Gantt Chart
description: A Gantt chart is a horizontal bar chart used to visualize a project schedule, showing tasks, durations, and their timeline.
keywords:
    - Gantt Chart
    - Project Planning
    - Project Management
---

# Gantt Chart

## Overview

A Gantt chart is a horizontal bar chart that visualizes a project schedule over time. It is one of the most widely used tools for communicating project timelines to teams and stakeholders.

## Structure

- **Rows**: individual tasks or work packages
- **Columns**: time scale (days, weeks, months)
- **Bars**: duration of individual tasks based on their start and end dates
- **Dependencies**: arrows or overlaps can indicate task dependencies

## Characteristics

- Easy to understand and create, even for non-technical stakeholders
- Well suited for short-term projects with a manageable number of tasks
- Focuses on time-based planning rather than resource allocation
- Typically used for waterfall or phase-based projects
- Static representation: reflects a planned snapshot, not real-time progress

## Advantages

- Easy to read and communicate to stakeholders
- Provides a clear overview of the overall project timeline
- Shows which tasks run in parallel and which are sequential
- Simple to create and maintain for small to medium projects

## Disadvantages

- Does not identify the critical path
- Can become unwieldy for large projects with many tasks
- Changes to one task require manual adjustment of dependent tasks

## Example

A small team is tasked with building a landing page for a product launch in five weeks. The project manager creates a Gantt chart to plan the timeline:

1. **Requirements** (Week 1): The team gathers requirements from the marketing department, defines the page content, and agrees on the scope
2. **Design** (Week 1 to 2): The designer starts creating mockups while requirements are being finalized, overlapping slightly with the first phase
3. **Implementation** (Week 2 to 4): Once the design direction is clear, developers begin building the page. This is the longest phase
4. **Testing** (Week 4): QA starts testing completed sections while development is still ongoing
5. **Deployment** (Week 5): After final approval, the page is deployed to production ahead of the launch date

The Gantt chart makes it easy for the team to see which phases overlap, where handoffs happen, and whether the five-week deadline is realistic.

```text
| Task           |  Week 1 | Week 2 | Week 3 | Week 4  | Week 5 |
| -------------- | ------- | ------ | ------ | ------- | ------ |
| Requirements   |███████  |        |        |         |        |
| Design         |     ████|████    |        |         |        |
| Implementation |         |  ██████|████████|█████    |        |
| Testing        |         |        |        |  ███████|        |
| Deployment     |         |        |        |         |████████|
```
