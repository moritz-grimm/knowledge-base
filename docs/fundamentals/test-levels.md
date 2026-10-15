---
title: "Test Levels"
description: "The test levels according to ISTQB: component test, integration test with its strategies, stubs and drivers, system test and acceptance test with its forms, their relation to the V-model, the test pyramid, confirmation tests and regression tests across all levels."
keywords:
    - Test Levels
    - ISTQB
    - Component Test
    - Unit Test
    - Integration Test
    - Component Integration Test
    - System Integration Test
    - Big Bang Integration
    - Top-Down Integration
    - Bottom-Up Integration
    - Stub
    - Driver
    - System Test
    - Acceptance Test
    - User Acceptance Test
    - Operational Acceptance Test
    - Alpha Test
    - Beta Test
    - V-Model
    - Test Pyramid
    - Confirmation Test
    - Regression Test
tags:
    - ap2
---

# Test Levels

A **test level** is a group of test activities that are organised and managed together and that refer to one stage of development. The ISTQB Certified Tester Foundation Level (syllabus 4.0) distinguishes five test levels: component test, component integration test, system test, system integration test and acceptance test. Many descriptions combine the two integration levels into one and speak of four test levels.

Each level has its own **test object** (what is tested), its own **test basis** (the documents from which the test cases and expected results are derived) and its own goal. The test cases of a level are designed as soon as its test basis exists, long before they can be executed. Designing them reveals ambiguous or contradictory requirements early, when correcting them is still cheap.

A defect is cheapest to correct on the lowest level that is able to find it. There it is found soon after it was made, the search is limited to one small test object, and no other component has been built on top of it yet. On higher levels, the defect first has to be located among many components, and its correction can affect parts that depend on it.

## Comparison

| Test level                                      | Test object                                                                      | Test basis                                                                      | Goal                                                                                                                 | Typical defects                                                                                      | Tested by                                     | Environment                                                     |
| ----------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| [Component test](#component-test)               | Single component: function, class, module                                        | Detailed design, component specification, code                                  | The component works correctly on its own                                                                             | Wrong calculations, wrong conditions, unhandled boundary values and exceptions                       | Developers                                    | Development environment, test framework, test doubles           |
| [Component integration test](#integration-test) | Interfaces and interaction between components                                    | Architecture design, interface specifications, sequence diagrams                | The components work together correctly                                                                               | Wrong data formats or units at an interface, wrong call order, missing parameters, unhandled errors  | Developers, testers                           | Build server or integration environment                         |
| [System test](#system-test)                     | The complete, integrated system                                                  | Functional specification, use cases, user stories, non-functional requirements  | The system fulfils the specified functional and non-functional requirements                                          | Wrong or missing functions, broken end-to-end workflows, insufficient performance or security        | Independent testers                           | Test environment close to production                            |
| [System integration test](#integration-test)    | Interfaces to external systems, e.g. payment provider, ERP system, web services  | Interface agreements, API specifications, cross-system business processes       | The system works together with the systems around it                                                                 | Different message structures, protocol errors, wrong interpretation of data, no reaction to timeouts | Testers, often together with the partner side | Environment close to production with real or simulated partners |
| [Acceptance test](#acceptance-test)             | The system in its context of use, including business processes and documentation | Business requirements, contract, laws and standards, user and operating manuals | Proof that the system meets the agreed requirements and is ready for use, and the decision on acceptance and release | Deviations from the business need, unusable workflows, unfulfilled contractual or legal requirements | Customer, users, operators, regulatory bodies | Production-like environment, partly the production environment  |

## Component Test

The component test is also called **unit test** or **module test**.

- **Isolation:** Each component is tested on its own. Dependencies on other components, databases or the network are replaced by test doubles.
- **Automation:** Without these dependencies, a component test runs in milliseconds and always delivers the same result. Component tests can therefore be easily automated and run on every build.
- **White-box test:** The test cases are derived from the code and its internal structure. Because the test object is small and the developers know its code, the component test is the only level at which white-box tests with measured code coverage are standard practice.

Structure, kinds, test doubles and the white-box are described in more detail in [Unit Tests](./unit-tests.md).

## Integration Test

**Integration** is the step-by-step assembly of tested components into larger units up to the complete system. Each time a component is added, the integration test checks the new interfaces between it and the components already assembled. The ISTQB separates two levels:

- **Component integration test:** Tests the interaction of the components within the system. It is carried out after the component test.
- **System integration test:** Tests the interfaces between the system and other systems. It is carried out after the system test or in parallel to it, because the partner systems are often available only late or only as a simulation.

### Integration Strategies

The integration strategy defines the order in which components are combined. The choice depends on the architecture, on the order in which components are finished and on the risk of individual interfaces.

| Strategy               | Procedure                                                                                    | Advantages                                                              | Disadvantages                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Big bang               | All components are combined at once and tested as a whole                                    | No stubs or drivers needed                                              | Testing starts only when everything is finished, defects are hard to localise        |
| Top-down               | Starts with the top component, e.g. the user interface, and adds the called components below | Early executable skeleton of the system, early feedback on the workflow | Many stubs needed, lower components are tested late                                  |
| Bottom-up              | Starts with the lowest components, e.g. data access, and adds the calling components above   | No stubs needed, basic components are tested thoroughly early           | Many drivers needed, the system as a whole becomes visible only at the end           |
| Sandwich (hybrid)      | Combines top-down for the upper and bottom-up for the lower layers, meeting in the middle    | Upper and lower layers are tested in parallel                           | Higher planning effort, the middle layer is tested last                              |
| Functional incremental | Integrates the components needed for one function or business process at a time              | Usable functions early, order follows business priority                 | Requires knowing which components a function touches, stubs and drivers still needed |

- **Incremental:** Components are added one at a time or in small groups, and each step is tested before the next one. Top-down, bottom-up, sandwich and functional incremental integration belong to this group.
- **Non-incremental:** Big bang is the only strategy of this kind.

**Continuous integration** is a form of incremental integration in which every change is integrated into the main branch and tested automatically as soon as it is committed, not only at the end of a development phase.

### Stubs and Drivers

Incremental integration tests a component before all components around it are integrated. In top-down integration, the components that the test object calls are still missing, and a **stub** stands in for them. In bottom-up integration, no component exists yet that calls the test object, and a **driver** takes over this role.

|                           | Stub                                                    | Driver                                                     |
| ------------------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| Replaces                  | A component that the test object **calls**              | A component that **calls** the test object                 |
| Position in the hierarchy | Below the test object                                   | Above the test object                                      |
| Behaviour                 | Returns fixed or simple answers instead of real results | Supplies input data, calls the test object, checks results |
| Example                   | Payment service that confirms every payment             | Test program that calls the data access layer directly     |

In automated tests, the test method takes over the role of the driver, so no separate driver program is written. It calls the test object with input data defined in the test and checks the results with assertions.

As one kind of [test double](./unit-tests.md#test-doubles), stubs also replace the dependencies of the isolated component in the component test.

## System Test

The system test checks the complete system from the point of view of its users and against its specification. The test cases are derived without knowledge of the code (black-box test), typically as end-to-end scenarios along use cases or business processes.

- **Functional system test:** Checks *what* the system does, i.e. whether every specified function delivers the expected result, e.g. whether an order is saved and an invoice is created.
- **Non-functional system test:** Checks *how well* the system does it, along the quality characteristics of [ISO/IEC 25010](../projectmanagement/iso-25010.md). Examples are load and performance tests, security tests, usability tests, compatibility tests with different browsers and operating systems, and recovery tests after a failure.

The test environment is set up as close to production as possible:

- **Infrastructure:** The same operating system, the same database and middleware versions and comparable hardware, network and configuration are used. Many [failures](./error-defect-failure.md) only occur with a specific configuration and would remain undetected in a development environment.
- **Data volume:** Realistic data volumes reveal failures that only occur under load.
- **Test data:** Test data is generated or derived from production data by anonymisation. Personal data from production may not be used for testing without a legal basis ([GDPR](../commercial/personal-data.md)).
- **Separation from production:** The production environment itself is not used for system tests, because test runs could change or damage real data.

The system test is carried out by testers who did not develop the system. Independent testers do not share the developers' assumptions and therefore find misunderstandings of the requirements that the developers may have carried into both code and component tests.

## Acceptance Test

The acceptance test checks whether the system is suitable for its intended use and serves as the basis for the decision on acceptance and release. Its main goal is not to find defects but to demonstrate that the system meets the agreed requirements and is ready for use. A large number of failures at this level indicates that the lower levels were insufficient. The acceptance criteria are agreed before development, e.g. in the [requirement specification](../projectmanagement/requirements-specification.md) or as acceptance criteria of user stories.

| Form                              | Checks                                                                                                                               | Carried out by                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| User acceptance test (UAT)        | Whether the users can carry out their business processes with the system in a real or simulated work environment                     | Intended users                        |
| Operational acceptance test (OAT) | Whether the system can be operated: installation, backup and restore, disaster recovery, user management, monitoring, patching       | Administrators, operations team       |
| Contractual acceptance test       | Whether the acceptance criteria agreed in the contract are fulfilled, typically for custom software                                  | Customer                              |
| Regulatory acceptance test        | Whether the system complies with laws, standards and regulations, e.g. GDPR, accessibility under BITV 2.0, medical device regulation | Customer, auditors, regulatory bodies |
| Alpha test                        | Behaviour of a product for the mass market, tested at the developer's site                                                           | Potential users, independent testers  |
| Beta test                         | Behaviour of a product for the mass market, tested at the users' sites in their own environment                                      | Selected real users                   |

### Acceptance Protocol

The result of a formal acceptance is recorded in an **acceptance protocol**. It contains:

- Date, place and participants
- Test object with version, and the contract or specification it is checked against
- Executed tests and their results
- Defects found, classified by severity, with deadlines for their correction
- Result: acceptance, acceptance with reservation of the listed defects, or refusal
- Signatures of both parties

If the software is developed under a contract for work (§ 631 BGB), acceptance has legal consequences:

- The payment becomes due.
- The limitation period for defect claims begins.
- The risk of accidental loss or damage of the work passes to the customer (§ 644 BGB).
- The burden of proof for defects passes to the customer. Before acceptance, the contractor has to prove that the work is free of defects.
- For defects known at acceptance, subsequent performance, withdrawal and price reduction can only be claimed later if they are reserved in the acceptance protocol.
- If the contractor sets the customer a reasonable deadline for acceptance after completing the work and the customer does not refuse acceptance within it, stating at least one defect, the work counts as accepted.

## Test Levels in the Development Process

Sequential and agile development use the same test levels with the same test bases but run them at different times and with different frequency.

### V-Model

Each specification document on the left branch of the [V-model](../projectmanagement/classic-vs-agile.md#v-model) is the test basis of the test level opposite it.

### Agile Development

The test levels are not run as successive phases. Component, integration and system tests take place within every iteration, and the acceptance of the increment by the Product Owner corresponds to the acceptance test.

## Test Pyramid

The **test pyramid** by Mike Cohn (*Succeeding with Agile*, 2009) covers only automated tests and describes how many of each granularity a test suite should contain.

| Layer                 | Tests                                                                           | Share        | Speed and stability                                           |
| --------------------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------- |
| UI / end-to-end (top) | Complete workflows through the user interface, e.g. with Selenium or Playwright | approx. 10 % | Seconds to minutes per test, fragile with every layout change |
| Service / integration | Interaction of components and with the database, APIs without user interface    | approx. 20 % | Seconds per test, dependent on infrastructure                 |
| Unit (base)           | Single components in isolation                                                  | approx. 70 % | Milliseconds per test, deterministic                          |

The percentages are a frequently quoted rule of thumb, but Cohn himself did not specify any values. Because higher tests are slower, more fragile and more expensive to write and maintain, and because a failing high-level test does not show which component contains the defect, each behaviour is tested on the lowest layer that can detect a defect in it, and end-to-end tests cover only the most important workflows.

The counterpart of the test pyramid is the **ice cream cone** anti-pattern (Alister Scott): few unit tests at the bottom, many end-to-end tests above them and a large share of manual tests on top. Unlike in the pyramid, most tests here are slow, so developers wait a long time for feedback on their changes.

## Change-Related Tests

After a change or a defect correction, existing tests are run again.

- **Confirmation test (re-test):** Shows that the correction has removed the defect by running the tests that revealed it again.
- **Regression test:** Shows that the change has not broken previously working parts. It ranges from the automated component tests on every build up to a repeated acceptance test before a new release.

## Example: Online Shop Discount

An online shop introduces a discount: orders of 100 EUR or more receive 5 % off.

| Test level                  | Test case                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Component test              | `DiscountCalculator` returns 0 for 99.99 EUR and 5.00 for 100.00 EUR                                             |
| Component integration test  | The shopping cart passes the gross total in cents, and `DiscountCalculator` interprets it as cents, not as euros |
| System test                 | A customer places an order of 120 EUR through the web interface, and order confirmation and invoice show 114 EUR |
| System test, non-functional | The checkout with discount responds within 2 seconds at 500 simultaneous users                                   |
| System integration test     | The payment provider receives 114 EUR, not 120 EUR                                                               |
| Acceptance test             | The sales department places test orders and confirms that the discount matches the campaign conditions           |

What this example shows: if the cart passes the total in cents while `DiscountCalculator` expects euros, an order of 99.99 EUR arrives as 9999 and receives a discount. The component test cannot find this defect, because the calculator is correct on its own. Only the component integration test, which connects the cart with the calculator, reveals it.

## Common Mistakes

1. **Integration test as a repeated component test:** Integration tests that check the calculations of the individual components again, e.g. every discount boundary through the whole checkout, duplicate the component tests at a higher cost. The test cases of an integration test target the interfaces instead, i.e. data formats, call order and error handling between the components.
2. **Stub and driver swapped:** A stub is called by the test object and replaces a component below it. A driver calls the test object and replaces a component above it. Top-down integration therefore needs stubs, bottom-up integration needs drivers.
3. **Big bang as a time saver:** Integrating everything at once saves the effort for stubs and drivers, but a failure can then originate in any of the interfaces. The time spent on localising defects usually exceeds the saved effort.
4. **System test in the development environment:** Failures caused by configuration, operating system or database versions, data volumes or load do not occur there and are only found in production.
5. **Production data as test data:** Copying personal data from production into the test environment without a legal basis violates the GDPR.
6. **Acceptance test as the search for defects:** Its test cases cover the agreed acceptance criteria, not boundary values or interfaces. Defects left for this level are therefore found at the most expensive point or reach production undetected.
7. **Non-functional requirements tested only at the end:** Performance and security problems often have their cause in the architecture. When they are discovered only in the acceptance test, a correction often requires changes to the architecture.
8. **Test pyramid as a fixed ratio:** The ratio is not a target but the result of testing each behaviour on the lowest layer able to detect a defect in it.

## See Also

- [Unit Tests](./unit-tests.md): structure, kinds and test doubles of component tests
- [Error, Defect and Failure](./error-defect-failure.md): the terms for the cause and the effect of a defect
- [Classic vs. Agile Project Management](../projectmanagement/classic-vs-agile.md): the V-model as a process model
- [ISO/IEC 25010 Software Quality](../projectmanagement/iso-25010.md): the quality characteristics checked by non-functional tests
- [Requirement/Functional Specifications](../projectmanagement/requirements-specification.md): the documents that form the test basis of system and acceptance tests
- [Use Case Diagram](./uml/use-case-diagram.md): use cases as the basis for system test scenarios
