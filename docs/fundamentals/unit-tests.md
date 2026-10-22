---
title: "Unit Tests"
description: "Unit tests and their kinds: positive and negative tests, equivalence classes and boundary values, exception tests, parameterised tests, state-based and interaction-based testing with test doubles, solitary and sociable tests, Arrange-Act-Assert and the FIRST properties, with examples in TypeScript and Vitest."
keywords:
    - Unit Test
    - Component Test
    - Vitest
    - Arrange-Act-Assert
    - FIRST
    - Positive Test
    - Negative Test
    - Equivalence Class
    - Boundary Value Analysis
    - Exception Test
    - Parameterised Test
    - Test Double
    - Mock
    - Stub
    - Code Coverage
tags:
    - ap2
---

# Unit Tests

A **unit test**, called **component test** by the ISTQB and also known as **module test**, is an automated test that checks a small unit of code in isolation from the rest of the system. It calls the unit with defined input, compares the result with an expected value and reports pass or fail without human inspection. Unit tests are written by developers, usually in the same language as the production code, and run in milliseconds.

## What Is a Unit

The **unit** is the smallest part of the code that can be tested on its own. In procedural code it is a function, in object-oriented code usually a class with its public methods. The term is not strictly defined: a unit can also be a small group of classes that together provide one behaviour (see [Solitary and Sociable Unit Tests](#solitary-and-sociable-unit-tests)).

A test is no longer a unit test when it accesses a database, the network or the file system, or when it requires a special configuration of the environment. Such dependencies make the test slow and its result dependent on external state and are therefore replaced by [test doubles](#test-doubles).

The unit test is the lowest of the [test levels](./test-levels.md).

## Structure: Arrange-Act-Assert

1. **Arrange:** Create the object under test and prepare the input data and dependencies.
2. **Act:** Call the method under test, normally exactly once.
3. **Assert:** Compare the result with the expected value.

In behaviour-driven development (BDD) the same three steps are called **Given-When-Then**.

The examples in this entry test the following class:

```typescript
export class TicketPricer {
    priceFor(age: number): number {
        if (!Number.isInteger(age) || age < 0) {
            throw new RangeError("age must be a non-negative integer");
        }
        if (age < 6) {
            return 0;
        }
        if (age < 18) {
            return 6;
        }
        return 12;
    }
}
```

```typescript
import { expect, test } from "vitest";
import { TicketPricer } from "./ticket-pricer";

test("adult pays full price", () => {
    // Arrange
    const pricer = new TicketPricer();

    // Act
    const price = pricer.priceFor(30);

    // Assert
    expect(price).toBe(12);
});
```

## Properties of Good Unit Tests (FIRST)

The acronym FIRST was popularised by Robert C. Martin's *Clean Code* (2008).

| Letter | Property        | Meaning                                                                                                                   |
| ------ | --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| F      | Fast            | A test runs in milliseconds, so the whole suite can run after every change.                                               |
| I      | Independent     | No test depends on the result or the order of another test. Each test creates its own data.                               |
| R      | Repeatable      | A test delivers the same result on every run and in every environment, without dependence on time, randomness or network. |
| S      | Self-validating | Assertions decide on pass or fail. Nobody has to read console output or compare files by hand.                            |
| T      | Timely          | Tests are written together with the production code or before it instead of weeks later.                                  |

Writing the test before the code is the core of **test-driven development** (TDD): a failing test (red), the minimal code that makes it pass (green), then a cleanup of the code (refactor).

## Black-Box and White-Box View

| View      | Test cases are derived from             | Techniques                                    |
| --------- | --------------------------------------- | --------------------------------------------- |
| Black box | The specification, without knowing code | Equivalence classes, boundary values          |
| White box | The source code and its control flow    | Statement coverage (C0), branch coverage (C1) |

Unit tests are the test level at which the white-box view is used most, because the developer knows the code. [Coverage tools](./code-coverage.md) show which statements and branches no test has executed but not whether the assertions check the right values or the decisive input values were tested. The [boundary value example](#boundary-value-tests) shows that even 100 % branch coverage does not prove correctness, as its defect remains undetected.

## Kinds of Unit Tests

| Kind                                         | Checks                                                                     | Example for `priceFor`                                  |
| -------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Positive test](#positive-tests)             | Correct result for valid input                                             | `priceFor(30)` returns `12`                             |
| [Negative test](#negative-tests)             | Correct handling of invalid input                                          | `priceFor(-5)` is rejected                              |
| [Boundary value test](#boundary-value-tests) | Behaviour at the boundaries of [equivalence classes](#equivalence-classes) | `priceFor(17)` returns `6`, `priceFor(18)` returns `12` |
| [Exception test](#exception-tests)           | That the expected exception is thrown                                      | `priceFor(-1)` throws `RangeError`                      |
| [Parameterised test](#parameterised-tests)   | One test logic with many input/output pairs (data-driven)                  | All boundary values in one test                         |
| [Regression test](#regression-tests)         | That a fixed defect does not return                                        | `priceFor(6)` after fixing `age <= 6`                   |

The kinds overlap: a boundary value test is a positive or a negative test, an exception test is a form of negative test, and almost every kind can be written as a parameterised test.

### Positive Tests

Positive tests cover the intended use of the unit (*happy path*). The example in [Arrange-Act-Assert](#structure-arrange-act-assert) is a positive test. Positive tests alone only show that the unit works when everything goes right.

### Negative Tests

Typical invalid inputs such as values outside the permitted range, `null`, empty strings and wrong formats have to be rejected by the unit in the specified way instead of leading to a wrong result. A negative test checks this reaction, whether it is an exception, a return value such as `false` or an error message. A unit without a specified reaction to invalid input cannot be tested negatively, so writing negative tests also reveals gaps in the specification.

### Equivalence Classes

An **equivalence class** groups input values for which the unit is expected to behave the same way, so one representative per class is enough. For units with several input parameters, each test case contains at most one invalid value, because the first invalid value already triggers the rejection and masks the others.

| Class | Range                      | Expected result | Representative |
| ----- | -------------------------- | --------------- | -------------- |
| I1    | `age < 0`                  | `RangeError`    | `-5`           |
| I2    | Not an integer, e.g. `NaN` | `RangeError`    | `5.5`          |
| V1    | `0` to `5`                 | `0`             | `3`            |
| V2    | `6` to `17`                | `6`             | `10`           |
| V3    | `age >= 18`                | `12`            | `30`           |

### Boundary Value Tests

Defects such as a `<` written instead of `<=` cluster at the boundaries between classes. **Boundary value analysis** therefore tests each boundary and its neighbour in the adjacent class (two-value boundary analysis). For `priceFor` these are `-1 | 0`, `5 | 6` and `17 | 18`. Three-value boundary analysis tests each boundary value together with both of its neighbours, e.g. `4`, `5`, `6` and `5`, `6`, `7`. Open boundaries such as the upper end of V3 are tested with the largest value of the data type, here `Number.MAX_VALUE`, if the specification permits it.

If `priceFor` contained the defect `age <= 6` instead of `age < 6`, the five representatives `-5`, `5.5`, `3`, `10` and `30` would all pass and reach 100 % branch coverage. Only the boundary value `6` reveals the defect: it returns `0` instead of `6`.

### Exception Tests

```typescript
test("negative age is rejected", () => {
    const pricer = new TicketPricer();

    expect(() => pricer.priceFor(-1)).toThrow(RangeError);
});
```

The test fails if no exception or an exception of a different type is thrown. If arrange code is placed inside the function, an exception of the expected type thrown there lets the test pass by mistake.

### Parameterised Tests

Each data set of a parameterised test appears in the report as a separate test case.

```typescript
test.each([
    [0, 0],
    [5, 0],
    [6, 6],
    [17, 6],
    [18, 12],
])("age %s costs %s", (age, expectedPrice) => {
    expect(new TicketPricer().priceFor(age)).toBe(expectedPrice);
});

test.each([-1, -Number.MAX_VALUE, 5.5, NaN])("age %s is rejected", (age) => {
    expect(() => new TicketPricer().priceFor(age)).toThrow(RangeError);
});
```

Parameterised tests suit boundary values and equivalence class representatives, because the table of test data documents the classes at the same time.

### Regression Tests

A regression test reproduces a reported defect. It is written before the fix and fails as long as the defect exists. After the fix it remains in the suite and reports the defect as soon as it returns. Every unit test also acts as a regression test for later changes.

## State-Based and Interaction-Based Testing

A **state-based test** checks the return value of the unit or the state of an object after the call. All previous examples are state-based. An **interaction-based test** (also *behaviour test*) checks which methods of its dependencies the unit calls, with which arguments and how often. It is needed when the effect of the unit consists of a call to another object, e.g. sending an e-mail, and there is no return value to check.

```typescript
test("sends confirmation after order", () => {
    const sender = { send: vi.fn() };
    const service = new OrderService(sender);

    service.placeOrder("anna@example.com");

    expect(sender.send).toHaveBeenCalledWith("anna@example.com", "Order confirmed");
});
```

`vi.fn()` creates a function that records its calls. The test can replace the `MessageSender` because `OrderService` receives it by [dependency injection](./oop/dependency-injection.md) through its constructor.

Interaction-based tests are bound to the implementation: if `OrderService` sends the same mail through a different method, the test fails although the behaviour is correct. State-based tests are therefore preferred where a result can be observed, interaction-based tests only where the interaction itself is the observable effect of the unit, which is typically the case at the boundary to external systems.

### Test Doubles

A **test double** replaces a real dependency in the test. The terms go back to Gerard Meszaros (*xUnit Test Patterns*, 2007).

| Double | Purpose                                                                   | Example                                              |
| ------ | ------------------------------------------------------------------------- | ---------------------------------------------------- |
| Dummy  | Fills a parameter that the tested code path never uses                    | `null` or an empty object for a required logger      |
| Stub   | Returns predefined answers and supplies the unit with input               | Exchange rate provider that always returns `1.10`    |
| Spy    | Records the calls it receives, so that the test can check them afterwards | Mail sender that stores every sent message in a list |
| Mock   | Is configured with expected calls and verifies that the unit made them    | Mail sender that expects exactly one `send` call     |
| Fake   | Working but simplified implementation, unsuitable for production          | In-memory repository instead of a database           |

A mock checks the **output** of the unit towards its dependencies and is used in interaction-based tests. A stub provides **input** to the unit and is used in state-based tests.

```typescript
const stub: ExchangeRateProvider = { rateFor: () => 1.10 };
const converter = new PriceConverter(stub);

expect(converter.toUsd(10)).toBeCloseTo(11);    // 10 * 1.10 is 11.000000000000002
```

## Solitary and Sociable Unit Tests

The terms **solitary** and **sociable unit test** go back to Jay Fields (*Working Effectively with Unit Tests*, 2014) and describe whether a unit test isolates the unit from its collaborators. Both approaches replace database, network, file system and system clock and differ in how in-process collaborators such as value objects or calculation classes are treated.

|                     | Solitary unit test                                         | Sociable unit test                                                  |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| Dependencies        | All collaborators replaced by test doubles                 | Real collaborators, only slow or non-deterministic ones replaced    |
| Unit                | One class                                                  | One behaviour, possibly spanning several classes                    |
| School              | London school, *mockist*                                   | Classical, Detroit or Chicago school                                |
| Defect localisation | Precise: a failing test points to one class                | Less precise: a defect in a collaborator fails several tests        |
| Refactoring         | Tests break when the collaboration between classes changes | Tests survive restructuring as long as the behaviour stays the same |

Many teams combine them: sociable tests by default, solitary tests where a collaborator is expensive to set up.

## Common Mistakes

1. **Testing only the happy path:** Most defects occur with unexpected input and at the boundaries of value ranges. A suite of positive tests passes even if the unit accepts negative ages or calculates wrong prices at the boundaries.
2. **Representatives without boundary values:** One value per equivalence class does not find a `<` that should be `<=`, because the defect lies exactly on the boundary, which a representative from the middle of the class never hits.
3. **Several behaviours in one test:** The first failing assertion aborts the test, so the remaining behaviours go unchecked. A failure also does not show which behaviour is broken, because the test name covers several of them.
4. **Exception test with try/catch and no fail:** `try { pricer.priceFor(-1); } catch (e) { }` passes even if no exception is thrown. `expect(...).toThrow()` fails in that case.
5. **Test without assertion:** A test that only calls the method and prints the result to the console passes as long as no exception occurs, although it checks nothing.
6. **Dependencies between tests:** A test that relies on data from a previous test or on a static field fails when run alone or in a different order. Test frameworks may run tests in any order or in parallel.
7. **Access to database, network or current time:** The test becomes slow and its result depends on the environment, so it can fail without any change in the code, e.g. on a build server without database access or after midnight when the current date changes.
8. **Verifying every interaction:** A test that checks every internal call checks the implementation instead of the behaviour and therefore breaks on every refactoring, even if the behaviour is unchanged.
9. **Equating coverage with correctness:** 100 % coverage shows that every line was executed but not whether the results were checked. Tests without meaningful assertions reach full coverage as well.

## Tools

- Vitest and Jest (JavaScript/TypeScript)
- pytest (Python)
- JUnit, Mockito, AssertJ and JaCoCo (Java)
- NUnit, xUnit.net and MSTest (C#)

## See Also

- [Test Levels](./test-levels.md): integration, system and acceptance test and the test pyramid
- [Code Coverage](./code-coverage.md): statement, branch, condition and path coverage on the control flow graph
- [Error, Defect and Failure](./error-defect-failure.md): the `age <= 6` defect as a causal chain from error to failure
- [Dependency Injection](./oop/dependency-injection.md): precondition for test doubles
- [ISO/IEC 25010](../projectmanagement/iso-25010.md#maintainability): testability as a sub-characteristic of maintainability
- [Project Phases](../projectmanagement/projectphases.mdx#4-testing--monitoring): the testing phase in the project
