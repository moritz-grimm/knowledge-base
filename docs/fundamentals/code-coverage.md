---
title: "Code Coverage"
description: "Code coverage metrics and how to calculate them on the control flow graph: function, line, statement (C0), branch (C1), condition, MC/DC, multiple condition and path coverage, the subsumption hierarchy, coverage reports and the limits of coverage as a metric."
keywords:
    - Code Coverage
    - Test Coverage
    - Control Flow Graph
    - Function Coverage
    - Line Coverage
    - Statement Coverage
    - Branch Coverage
    - Decision Coverage
    - Condition Coverage
    - Multiple Condition Coverage
    - MC/DC
    - Path Coverage
    - C0
    - C1
    - White-Box Test
    - Istanbul
tags:
    - ap2
---

# Code Coverage

**Code coverage** measures which share of the code a set of tests executes. It is a white-box metric, because it is measured on the internal structure of the code.

```text
coverage = executed elements / all elements x 100 %
```

What counts as an element depends on the [coverage metric](#coverage-metrics).

## Control Flow Graph

The **control flow graph** (CFG) is the basis for statement, branch and path coverage. Each **node** stands for a statement or a sequence of statements without a branch. Each **edge** stands for a possible transfer of control from one node to the next. A node with two outgoing edges is a **decision**. A loop appears as an edge leading back to an earlier node.

The examples in this entry use the following function:

```typescript
export function shippingCost(total: number, isMember: boolean, express: boolean): number {
    let cost = 5;
    if (isMember || total >= 50) {
        cost = 0;
    }
    if (express) {
        cost += 10;
    }
    return cost;
}
```

```text
┌──────────────────────────────┐
│ 1  let cost = 5              │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 2  isMember || total >= 50   │
└──────────────────────────────┘
    true │            │ false
         ▼            │
┌───────────────┐     │
│ 3  cost = 0   │     │
└───────────────┘     │
         │            │
         ▼            ▼
┌──────────────────────────────┐
│ 4  express                   │
└──────────────────────────────┘
    true │            │ false
         ▼            │
┌───────────────┐     │
│ 5  cost += 10 │     │
└───────────────┘     │
         │            │
         ▼            ▼
┌──────────────────────────────┐
│ 6  return cost               │
└──────────────────────────────┘
```

## Coverage Metrics

The examples use these test cases for `shippingCost`:

| Test case | `total` | `isMember` | `express` | Expected result | Path        |
| --------- | ------- | ---------- | --------- | --------------- | ----------- |
| T1        | `20`    | `true`     | `true`    | `10`            | 1-2-3-4-5-6 |
| T2        | `20`    | `false`    | `false`   | `5`             | 1-2-4-6     |
| T3        | `60`    | `false`    | `true`    | `10`            | 1-2-3-4-5-6 |
| T4        | `20`    | `true`     | `false`   | `0`             | 1-2-3-4-6   |
| T5        | `60`    | `true`     | `false`   | `0`             | 1-2-3-4-6   |
| T6        | `20`    | `false`    | `true`    | `15`            | 1-2-4-5-6   |

| Metric                                             | Requires                                                                      | Test cases for 100 % |
| -------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------- |
| [Function coverage](#function-coverage)            | Every function called at least once                                           | T1                   |
| [Statement coverage (C0)](#statement-coverage-c0)  | Every statement (every node) executed at least once                           | T1                   |
| [Line coverage](#line-coverage)                    | Every executable line executed at least once                                  | T1                   |
| [Branch coverage (C1)](#branch-coverage-c1)        | Every edge traversed at least once                                            | T1, T2               |
| [Simple condition coverage](#condition-coverage)   | Every atomic condition evaluated to `true` and to `false` at least once       | T1, T3               |
| [MC/DC](#condition-coverage)                       | Every atomic condition shown to change the outcome of its decision on its own | T1, T2, T3           |
| [Multiple condition coverage](#condition-coverage) | Every combination of values of the atomic conditions of each decision         | T1, T2, T3, T5       |
| [Path coverage](#path-coverage)                    | Every path from the entry to the exit of the graph                            | T1, T2, T4, T6       |

### Function Coverage

Function coverage is the weakest metric. It finds functions that no test calls, e.g. dead code or forgotten error handlers, but says nothing about their content.

### Statement Coverage (C0)

T1 executes all six nodes and reaches 100 % statement coverage. T2 alone executes nodes 1, 2, 4 and 6, i.e. 4 of 6 statements, which is 66.7 %.

Statement coverage does not check edges without a statement of their own, e.g. the missing `else` of an `if` whose condition is always `true` in the tests. T1 never takes the edge 2 => 4, so a defect that only occurs when the shipping cost stays at `5` remains undetected.

### Line Coverage

Line coverage counts executable source lines instead of statements. A line counts as covered as soon as any part of it is executed. Line coverage therefore depends on the formatting:

```typescript
if (express) cost += 10;
```

T2 executes the condition of this line but not `cost += 10`, so the line counts as covered although one of its statements is not. Istanbul reports 100 % line coverage and 66.7 % statement coverage with T2 alone for a variant of `shippingCost` in which both `if` statements are written on one line each.

### Branch Coverage (C1)

T1 and T2 together traverse all 7 edges and reach 100 % branch coverage. T2 alone traverses 1 => 2, 2 => 4 and 4 => 6, i.e. 3 of 7 edges, which is 42.9 %.

**Decision coverage** counts the outcomes `true` and `false` of each decision instead of the edges. T2 alone covers 2 of 4 decision outcomes, which is 50 %. In code without jump statements such as `goto`, both metrics reach 100 % with the same test cases.

Branch coverage treats the decision `isMember || total >= 50` as a whole. T1 and T2 cover both of its outcomes although `total >= 50` is `false` in both test cases, so a defect in this condition, e.g. `total > 50`, remains undetected.

### Condition Coverage

Condition coverage looks at the **atomic conditions** within a decision, i.e. its parts without a logical operator, such as `isMember` and `total >= 50` in decision 2. It exists in three strengths:

- **Simple condition coverage:** Every atomic condition takes the value `true` and `false` at least once. T1 (`isMember` true, `total >= 50` false) and T3 (`isMember` false, `total >= 50` true) achieve it, but the decision is `true` in both test cases, so the edge 2 => 4 is never traversed. Simple condition coverage therefore does not include branch coverage.
- **Multiple condition coverage:** Every combination of values of the atomic conditions of a decision is tested. With `n` conditions these are `2^n` combinations, here the four combinations in T1, T2, T3 and T5. A decision with 10 conditions already needs 1024 test cases.
- **Modified condition/decision coverage (MC/DC):** For every atomic condition there is a pair of test cases in which only this condition of the decision changes and the outcome of the decision changes with it, which shows that the condition affects the outcome on its own. At decision 2, T2 and T1 differ only in `isMember` (`false` => `true`) and change the outcome. T2 and T3 do the same for `total >= 50`. MC/DC needs `n + 1` test cases instead of `2^n` and is required by safety standards for aviation and highly recommended automotive software.

These definitions assume that every condition is evaluated. TypeScript, Java and C# evaluate `||` and `&&` with **short-circuit evaluation**, so `total >= 50` is not evaluated when `isMember` is `true`. T1 therefore contributes no value for `total >= 50`. T1 and T5 evaluate decision 2 identically. Istanbul counts each operand of `||` and `&&` as a branch of its own, so its branch metric for `shippingCost` comprises 6 branches: the two outcomes of each `if` and the two operands of `||`.

### Path Coverage

A **path** is a sequence of edges from the entry to the exit of the control flow graph. `shippingCost` has four paths, because its two decisions are independent of each other and each combination of their outcomes leads through a different path. With `n` decisions in sequence the number of paths grows to `2^n`, while branch coverage still needs only two test cases.

A loop multiplies the paths by every possible number of iterations, so full path coverage is not achievable for most functions with loops. The **boundary-interior path test** restricts the number of iterations to zero, one and two. Paths can also be **infeasible**: two decisions on the same condition always take the same outcome, so the paths in which they differ can never be executed.

## Subsumption Hierarchy

A metric **subsumes** another if every set of test cases that reaches 100 % of the first metric also reaches 100 % of the second. An arrow points from the stronger to the weaker metric:

```text
 Path coverage        Multiple condition coverage
       │                          │
       │                          ▼
       │                        MC/DC
       │                     ┌────┴────┐
       ▼                     │         ▼
Branch coverage (C1) ◄───────┘  Simple condition coverage
       │
       ▼
Statement coverage (C0)
       │
       ▼
Line coverage
       │
       ▼
Function coverage
```

Path coverage and condition coverage are not comparable: T1, T2, T4 and T6 reach path coverage but never evaluate `total >= 50` as `true`, while T1, T2, T3 and T5 reach multiple condition coverage but leave out the path 1-2-4-5-6.

Only C0 and C1 are used consistently as abbreviations. Beyond C1 the numbering differs between sources: some use C2 for path coverage and C3 for condition coverage, others C2 for simple condition coverage and C4 for path coverage.

## Coverage Reports

Coverage tools write a report after the test run. Vitest with the Istanbul provider (`vitest run --coverage --coverage.provider=istanbul`) prints the following report for `shippingCost` with T1 alone:

```text
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |       50 |     100 |     100 |
 shipping-cost.ts |     100 |       50 |     100 |     100 | 3-6
------------------|---------|----------|---------|---------|-------------------
```

T1 covers 3 of the 6 Istanbul branches: the `true` outcome of both `if` statements and the operand `isMember`. The column `Uncovered Line #s` points to the lines with missing branches.

Every tool has its own counting rules. Vitest's default provider `v8` reports only 2 branches for the same function and the same 50 %, so percentages from different tools cannot be compared.

## Significance and Limits

Code coverage shows which code no test executes, but a high value does not show that the executed code is tested well:

- **Missing code:** Coverage refers to existing code, so a requirement that was never implemented has no code that could be uncovered.
- **Missing assertions:** Code that a test executes without checking its result still counts as covered (see [Unit Tests](./unit-tests.md#common-mistakes)).
- **Missing input values:** 100 % branch coverage does not ensure that the boundary values of a condition were tested, as shown by the [boundary value example](./unit-tests.md#boundary-value-tests).

Build pipelines often enforce a minimum value, e.g. with `coverage.thresholds` in Vitest. Values between 70 % and 80 % for lines or branches are a common target. A target turns coverage into a goal of its own (Goodhart's law): tests are written to raise the number instead of to find defects, so the value loses its significance.

## Common Mistakes

1. **Naming a coverage value without its metric:** "80 % coverage" can mean statement, line or branch coverage. Istanbul reports 100 % statement coverage and 50 % branch coverage for `shippingCost` with T1 alone.
2. **Treating statement coverage as branch coverage:** An `if` without `else` is fully covered at statement level by a single test with the condition `true`. The empty `false` branch is never executed, so C1 is not reached.
3. **Treating simple condition coverage as stronger than branch coverage:** Every condition can take both values while the decision always has the same outcome. In the example, T1 and T3 reach simple condition coverage but never traverse the edge 2 => 4.
4. **Counting the decisions but not the conditions:** Branch coverage of `isMember || total >= 50` is reached with test cases in which only `isMember` varies. Whether `total >= 50` is correct is never checked, which only MC/DC or multiple condition coverage enforce.
5. **Comparing percentages from different tools:** Istanbul counts each operand of `||` as a branch, but `v8` does not. A switch of the coverage provider changes the reported values without any change in the tests.
6. **Planning full path coverage for code with loops:** Every possible number of iterations creates its own path, so the number of possible paths is unbounded. Methods such as the boundary-interior path test restrict the iterations to a manageable number.

## Tools

- Istanbul (nyc) and V8 coverage via Vitest or Jest (JavaScript/TypeScript)
- coverage.py and pytest-cov (Python)
- JaCoCo (Java)
- Coverlet and dotCover (C#)
- gcov and llvm-cov (C/C++)

## See Also

- [Unit Tests](./unit-tests.md): equivalence classes and boundary values as the black-box counterpart to coverage
- [Test Levels](./test-levels.md#component-test): the component test as the test level with measured code coverage
- [Activity Diagram](./uml/activity-diagram.md): decisions and loops in a related notation for control flow
