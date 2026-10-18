---
title: "Project Management Triangle"
description: "The project management triangle with scope, time and cost as competing targets, the role of quality, the devil's square, the inverted triangle of agile approaches and the options when one target changes."
keywords:
    - Project Management Triangle
    - Iron Triangle
    - Triple Constraint
    - Scope
    - Time
    - Cost
    - Quality
    - Devil's Square
    - Inverted Triangle
tags:
    - ap2
---

# Project Management Triangle

The **project management triangle**, also called the **iron triangle** or **triple constraint**, describes the three competing targets of a project: **scope**, **time** and **cost**. A change to one corner affects at least one of the others: more scope requires more time or more cost, and a shorter schedule requires more cost or less scope.

| Corner | Question                      | Typical measure                                         |
| ------ | ----------------------------- | ------------------------------------------------------- |
| Scope  | What is delivered?            | Requirements, functions, deliverables, required quality |
| Time   | By when is it delivered?      | Deadline, milestones, duration                          |
| Cost   | What may the project consume? | Budget, personnel days, material                        |

## Quality

The original triangle by Martin Barnes (1969) had **time**, **cost** and **quality** as its corners. Many later versions, especially in the US, replaced quality with scope and either count quality as part of the scope or put it in the centre of the triangle as the result of the three corners. But all variants agree that quality suffers first when scope, time and cost are fixed and the project falls behind schedule, because cutting tests, reviews and documentation saves time without changing a visible corner.

## Devil's Square

The **devil's square** by Harry Sneed (1987) extends the triangle to four corners: **quantity** (scope), **quality**, **time** and **cost**. Each corner points in the favourable direction: outwards means more quantity, higher quality, less time and lower cost. The area of the square is the productivity of the team, and since it cannot be increased in the short term, pulling one corner outwards pulls at least one other corner inwards: more quantity with the same team and budget either takes more time or lowers the quality. The term originates in German-language project management literature and has no established English alternative.

## Classic and Agile Approaches

Classic and agile approaches fix different corners.

| Corner | Classic                                | Agile                                                      |
| ------ | -------------------------------------- | ---------------------------------------------------------- |
| Scope  | Fixed in the requirement specification | Variable, determined by the prioritised backlog            |
| Time   | Estimated from the scope               | Fixed by timeboxes and the release date                    |
| Cost   | Estimated from the scope               | Fixed by the size of the team and the number of iterations |

The agile approach is therefore called the **inverted triangle**, because it swaps what is fixed and what follows. A variable scope is acceptable because the highest-priority requirements are delivered first, so whatever remains when time runs out is the least important part. Agile teams fix quality through a [Definition of Done](./scrum.md#definition-of-done-dod), so a sprint under time pressure delivers less scope instead of lower quality.

## Example: Additional Requirement Before the Deadline

A web shop is to go live on 1 March with a budget of 60,000 EUR. Four weeks before the deadline, the customer asks for an additional payment method.

| Option                        | Fixed corners | Consequence                                                  |
| ----------------------------- | ------------- | ------------------------------------------------------------ |
| Postpone the go-live          | Scope, cost   | The payment method is delivered and the shop goes live later |
| Add developers                | Scope, time   | The budget rises, and new team members first need training   |
| Deliver it in a later release | Time, cost    | The shop goes live on time without the new payment method    |
| Drop another function         | Time, cost    | The scope stays the same size, but its content changes       |

## Common Mistakes

1. **All three corners fixed:** When scope, time and cost are all fixed and the estimate turns out to be wrong, the only variable left is quality. The shortfall then appears as missing tests or defects after delivery instead of as a visible decision.
2. **Corners treated as independent:** A change request that is accepted without adjusting time or cost silently overloads the plan. Every change to the scope needs to be assessed for its effect on the other corners before it is accepted.
3. **More people as a fix for a late project:** Additional team members need training and increase the coordination effort, so they slow a late project down at first. This effect is known as Brooks's law.

## See Also

- [Classic vs. Agile Project Management](./classic-vs-agile.md): the process models that fix different corners of the triangle
- [Scrum](./scrum.md): timeboxes and the Definition of Done as fixed time and quality
- [Requirement/Functional Specifications](./requirements-specification.md): the documents that fix the scope in a classic project
- [Network Plan](./network-plan.md): calculating the time corner from the activities and their dependencies
