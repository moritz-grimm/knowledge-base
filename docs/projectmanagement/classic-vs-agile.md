---
title: "Classic vs. Agile Project Management"
description: "Plan-driven process models (waterfall model, V-model, spiral model) compared with agile approaches (Agile Manifesto, Scrum, Kanban, XP), advantages, disadvantages, selection criteria and hybrid approaches."
keywords:
    - Classic Project Management
    - Agile Project Management
    - Plan-Driven
    - Waterfall Model
    - V-Model
    - V-Modell XT
    - Spiral Model
    - Agile Manifesto
    - Kanban
    - Extreme Programming
    - Stacey Matrix
    - Hybrid Project Management
tags:
    - ap2
---

# Classic vs. Agile Project Management

A **process model** defines in which order the activities of a project are carried out, which results each step produces and who is responsible for them. **Classic** (plan-driven, predictive) models plan the whole project at the start and work through it in phases. **Agile** (adaptive) approaches plan in short cycles and adapt the plan to what each cycle has shown.

## Classic Approaches

### Characteristics

- Sequential phases, each completed before the next one starts, e.g. along the [project phases](./projectphases.mdx)
- Detailed planning of scope, schedule and budget at the start, e.g. with a [Gantt chart](./gantt.md) or a [network plan](./network-plan.md)
- Requirements fixed in writing before development, e.g. in a [requirement and functional specification](./requirements-specification.md)
- Milestones and quality gates at the end of each phase, at which the phase results are approved
- Extensive documentation as the result of each phase and as the basis for the next
- Central role of the project manager, who plans, assigns and controls the work
- Customer involvement mainly at the start (requirements) and at the end (acceptance)
- Changes handled through a formal change request process

### Waterfall Model

The waterfall model arranges the phases in a strict sequence: requirements analysis, design, implementation, testing, operation and maintenance. Each phase ends with a document that serves as the input for the next phase, so progress can be checked at clear points and the model is easy to control. The extended variant allows a step back to the preceding phase when an error is found, but not across several phases.

### V-Model

The V-model extends the waterfall model by assigning a **test level** to each **specification level**. The left branch of the V describes the system with increasing detail, the right branch integrates and tests it in reverse order.

```text
Requirements analysis  ------------------------------->  Acceptance test
    System design  ----------------------------->  System test
        Architecture design  ----------->  Integration test
            Module design  ----->  Unit test
                         Implementation
```

| Specification level (left branch) | Test level (right branch) | Question answered by the test           |
| --------------------------------- | ------------------------- | --------------------------------------- |
| Requirements analysis             | Acceptance test           | Does the system meet the customer need? |
| System design                     | System test               | Does the whole system meet the spec?    |
| Architecture design               | Integration test          | Do the components work together?        |
| Module design                     | Unit test                 | Does each module work correctly?        |

The test cases of a level are derived while that level is specified. Unit, integration and system tests **verify** the product against the specification of their level (is the product built correctly?), while the acceptance test **validates** it against the customer need (is the right product being built?).

### Spiral Model

The spiral model by Barry Boehm (1986) runs through the project in repeated cycles. Each cycle passes through four quadrants:

1. Define objectives, alternatives and constraints
2. Evaluate alternatives, identify and reduce risks, e.g. with [prototypes](../fundamentals/prototyping.md)
3. Develop and test the result of the cycle
4. Plan the next cycle

The model is **risk-driven**: the biggest risks are addressed first, and after each cycle a decision is made whether to continue. It is iterative, but every cycle is planned and documented completely in advance, so it is better suited to large, risky projects and too heavy for small ones.

### Advantages and Disadvantages

**Advantages:**

- Cost and deadline can be forecast and agreed at the start.
- Clear structure, responsibilities and milestones.
- Progress can be measured against the plan.
- Complete documentation supports maintenance, audits and approval procedures.
- Low demand on the customer's time during development.

**Disadvantages:**

- Late changes are expensive and require a formal change process.
- The customer sees a working result only at the end.
- Errors in the requirements are discovered late, when correcting them costs the most.
- The whole project is estimated at the point where the least is known about it.
- High documentation overhead.

## Agile Approaches

### Characteristics

- Iterative and incremental development in small, usable increments
- Requirements maintained as a prioritised list that is refined and reordered continuously
- Continuous customer involvement through regular reviews of the increments
- Self-organising, cross-functional teams instead of a project manager who assigns tasks
- Working product as the measure of progress
- Regular reflection on the way of working (inspect and adapt)

### Agile Manifesto

The **Manifesto for Agile Software Development** was written in 2001 by 17 software developers. It states four values:

| Valued more                  | Valued less                 |
| ---------------------------- | --------------------------- |
| Individuals and interactions | Processes and tools         |
| Working software             | Comprehensive documentation |
| Customer collaboration       | Contract negotiation        |
| Responding to change         | Following a plan            |

The manifesto adds: "while there is value in the items on the right, we value the items on the left more."

The twelve principles behind the manifesto, in condensed form:

1. Satisfy the customer through early and continuous delivery of valuable software.
2. Welcome changing requirements, even late in development.
3. Deliver working software frequently, within weeks rather than months.
4. Business people and developers work together daily.
5. Build projects around motivated individuals and give them the environment and trust they need.
6. Face-to-face conversation is the most efficient way of conveying information.
7. Working software is the primary measure of progress.
8. Keep a sustainable pace that can be maintained indefinitely.
9. Continuous attention to technical excellence and good design increases agility.
10. Simplicity, the art of maximising the amount of work not done, is essential.
11. The best architectures, requirements and designs emerge from self-organising teams.
12. The team reflects at regular intervals on how to become more effective and adjusts accordingly.

### Agile Frameworks

| Framework           | Core idea                                                 | Iterations                     | Prescribed roles                        |
| ------------------- | --------------------------------------------------------- | ------------------------------ | --------------------------------------- |
| [Scrum](./scrum.md) | Fixed-length sprints with defined events and artifacts    | Sprints of at most one month   | Product Owner, Scrum Master, Developers |
| Kanban              | Visualise the flow of work and limit the work in progress | None, continuous flow          | None                                    |
| Extreme Programming | Engineering practices that keep the code changeable       | Iterations of one to two weeks | Customer, developers, coach (optional)  |

<!-- TODO: move Kanban and Extreme Programming into their own entries and link them from the framework table -->

**Kanban** originates from the production system of Toyota and was transferred to software development by David J. Anderson. Its core practices are:

- **Visualise the workflow:** A board shows every work item in its current state, e.g. *To Do*, *In Progress*, *Review*, *Done*.
- **Limit work in progress (WIP):** Each column has a maximum number of items. A new item is only pulled when a place becomes free (pull principle).
- **Manage the flow:** Lead time, cycle time and throughput are measured to detect bottlenecks.
- **Make policies explicit:** The rules for moving an item, e.g. when it counts as done, are written down.
- **Implement feedback loops:** Regular meetings, e.g. a daily stand-up at the board and periodic delivery reviews, check the work and the process.
- **Improve continuously:** The process is changed in small, evolutionary steps based on the measurements.

**Extreme Programming (XP)** was developed by Kent Beck in the late 1990s. It concentrates on engineering practices rather than project organisation: pair programming, test-driven development, continuous integration, refactoring, small releases, collective code ownership, simple design, a customer available on site and a sustainable pace. XP is often combined with Scrum, which provides the organisational frame.

### Advantages and Disadvantages

**Advantages:**

- Usable results early and regularly.
- Changing requirements can be taken into account at any time.
- Early feedback reduces the risk of building the wrong product.
- Progress is transparent, and problems become visible after each iteration instead of at the end.

**Disadvantages:**

- Total scope and final cost are hard to forecast at the start.
- Fixed-price contracts are difficult to agree.
- Requires a customer or Product Owner who is available continuously.
- Requires experienced teams that are able to organise themselves.
- Coordinating many teams in large organisations requires additional scaling frameworks.
- Documentation and architecture can be neglected without discipline.

## Comparison

| Aspect                                                     | Classic                                                  | Agile                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Planning                                                   | Complete and detailed at the start                       | Rough for the whole product, detailed for the next iteration                                 |
| Requirements                                               | Fixed before development                                 | Evolve during development                                                                    |
| Fixed corners of the [magic triangle](./magic-triangle.md) | Scope; time and cost estimated from it                   | Time and cost; scope varies                                                                  |
| Customer involvement                                       | At the start and at acceptance                           | Continuously, at least at the end of each iteration                                          |
| Documentation                                              | Extensive, a result of every phase                       | As much as needed, working product has priority                                              |
| Change handling                                            | Formal change request, changes are expensive             | Changes go into the backlog and are prioritised                                              |
| Delivery                                                   | Once, at the end of the project                          | Frequently, in increments                                                                    |
| Roles                                                      | Project manager plans and controls, team executes        | Self-organising team with roles such as Product Owner and Scrum Master                       |
| Risk                                                       | Discovered late, e.g. during integration and testing     | Reduced early through frequent delivery and feedback                                         |
| Contract                                                   | Contract for work with fixed price and scope (§ 631 BGB) | Often contract for services billed by effort (§ 611 BGB) or fixed budget with variable scope |

## Selection Criteria

No approach is better in general. The decision depends on how well the requirements and the technology are known and on the framework conditions of the project.

| Criterion             | Classic approach suits                                                                  | Agile approach suits                    |
| --------------------- | --------------------------------------------------------------------------------------- | --------------------------------------- |
| Requirements          | Known, stable and completely describable                                                | Unclear or expected to change           |
| Technology            | Known and proven                                                                        | New, with open technical questions      |
| Customer availability | Low, only for requirements and acceptance                                               | High, continuous participation possible |
| Regulation and proof  | Strict approval or documentation duties, e.g. medical devices, aviation, public tenders | Few formal requirements                 |
| Cost of changes       | High, e.g. hardware, construction, physical production                                  | Low, e.g. software                      |
| Partial use           | Product only useful when complete                                                       | Partial versions already useful         |
| Team                  | Large, distributed or changing teams                                                    | Small, stable, cross-functional teams   |

### Stacey Matrix

The **Stacey matrix** classifies a project by the agreement on its requirements and the certainty of its technology.

| Zone        | Requirements    | Technology      | Suitable approach                                       |
| ----------- | --------------- | --------------- | ------------------------------------------------------- |
| Simple      | Clear           | Known           | Classic, the plan can be made in advance                |
| Complicated | Partly unclear  | Partly unknown  | Classic with expert analysis, or hybrid                 |
| Complex     | Largely unclear | Largely unknown | Agile, the solution emerges through iterations          |
| Chaotic     | Unclear         | Unknown         | Act immediately, stabilise, then switch to another zone |

The matrix is a rough orientation aid. Ralph Stacey himself later stopped using it, because projects do not fall into fixed zones and their position can shift over time.

### Hybrid Approaches

Hybrid approaches combine classic and agile elements in one project. They are common in practice, because many projects need a fixed frame for budget and contract while the development itself benefits from short cycles.

- **Classic frame, agile execution:** Phases, milestones, budget and a requirement specification are planned classically, and development within the implementation phase runs in sprints.
- **Agile development, classic release:** Development is agile, while approval, testing in a separate test department and rollout follow a fixed plan. If the requirements are also planned classically at the start, the combination is called *Water-Scrum-Fall*.
- **Split by subproject:** Hardware or infrastructure is planned classically, software is developed agilely, and both are synchronised at shared milestones.
- **Tailorable process models:** The V-Modell XT, a variant of the V-model prescribed for IT projects of the German federal administration, and PRINCE2 Agile allow agile practices within a formally structured process model.

## Example: Choosing an Approach

| Project                                                                  | Assessment                                                                        | Approach                                                       |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Migration of a payroll system to a new database, unchanged functions     | Requirements known from the old system, technology known, fixed price agreed      | Classic, e.g. waterfall model with a network plan              |
| Software for a medical device                                            | Requirements fixed by the approval procedure, every test level must be documented | V-model                                                        |
| New mobile app for a start-up whose target group is still being explored | Requirements unclear, frequent feedback from users needed, budget per month fixed | Agile, e.g. Scrum                                              |
| Support team processing incoming change requests                         | Continuous flow of small tasks of varying priority, no fixed project end          | Kanban                                                         |
| Public authority introduces a new specialist application                 | Tender with requirement specification and fixed budget, user interface unclear    | Hybrid: classic frame, agile development of the user interface |

## Common Mistakes

1. **Agile as working without a plan:** Agile approaches plan continuously on several levels, e.g. the product, the release, the iteration and the day. The planning is distributed over the project instead of being done completely at the start as in classic approaches.
2. **Agile as working without documentation:** The manifesto values working software more than comprehensive documentation, but it does not reject documentation. Documentation that has a reader and a purpose, e.g. for operation or maintenance, still needs to be written and kept up to date.
3. **Scrum and agile as synonyms:** Agile denotes the values and principles of the manifesto. Scrum, Kanban and XP are separate frameworks that implement them.
4. **Spiral model as an agile approach:** The spiral model is iterative, but it plans and documents each cycle completely in advance, so it remains plan-driven despite the iterations.
5. **V-model as testing at the end:** The test cases of each level are written together with the specification level they belong to, e.g. the acceptance test cases during the requirements analysis. Only running the tests has to wait until the system is built.
6. **Kanban as a task board only:** The task board only visualises the work, but Kanban needs two more elements: work-in-progress limits, which make the team finish started items before pulling new ones, and flow measurement, which reveals where work gets stuck.

## See Also

- [Project Phases](./projectphases.mdx): the phases a classic project runs through
- [Scrum](./scrum.md): roles, events and artifacts of the most widely used agile framework
- [Requirement/Functional Specifications](./requirements-specification.md): the documents that fix the scope in a classic project
- [Gantt Chart](./gantt.md): schedule visualisation for phase-based projects
- [Network Plan](./network-plan.md): dependencies and critical path in a classic schedule
- [Magic Triangle](./magic-triangle.md): scope, time and cost as competing targets and the corners each approach fixes
- [INVEST Model](./invest.md): quality criteria for user stories in an agile backlog
- [Prototyping](../fundamentals/prototyping.md): kinds of prototypes and their use in classic and agile development
- [Test Levels](../fundamentals/test-levels.md): the test levels paired with the development phases of the V-model
- [Line Systems](../commercial/line-systems.md): forms of project organisation within the company structure
