---
title: "Error, Defect and Failure"
description: "The ISTQB terms error, defect and failure as a causal chain, the root cause, defects without failures, testing versus debugging, and false positive and false negative test results."
keywords:
    - Error
    - Mistake
    - Defect
    - Fault
    - Bug
    - Failure
    - Root Cause
    - Root Cause Analysis
    - Debugging
    - False Positive
    - False Negative
    - ISTQB
tags:
    - ap2
---

# Error, Defect and Failure

The ISTQB (International Software Testing Qualifications Board) is an international body that defines terms and certifications for software testing. It distinguishes three terms that form a causal chain: a person makes an **error**, the error leaves a **defect** in a work product, and the defect can cause a **failure** when the work product is executed.

| Term    | Synonyms   | Definition                                                                                | Located in                                                                                                                                              |
| ------- | ---------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error   | Mistake    | A human action that produces an incorrect result                                          | The person: a misunderstanding, a wrong assumption or a slip, often caused by time pressure, complexity, fatigue, lack of knowledge or lack of training |
| Defect  | Fault, bug | An imperfection or deficiency in a work product where it does not meet its requirements   | A work product: requirements, design, source code, test cases, build scripts                                                                            |
| Failure | None       | An event in which the system does not perform a required function within specified limits | The behaviour of the running system                                                                                                                     |

## Deviations from the Causal Chain

- **Defects in early work products:** A defect in a requirement or in the design that nobody finds there is carried into the code, where it can produce several defects.
- **Defects without a failure:** A defect causes a failure only when the defective part is executed under the conditions that expose it. Some defects fail on every execution, some only with specific input, configuration or load, and some never, e.g. in code that is never reached.
- **Failures without an error:** Environmental conditions such as radiation or electromagnetic fields can corrupt firmware or memory and cause failures that no person caused.

## Root Cause

The **root cause**, which a **root cause analysis** looks for, is the fundamental reason why a defect occurred, usually the situation that led to the error, e.g. an ambiguous requirement or time pressure. Correcting the defect removes only this one defect, while removing the root cause also prevents further defects of the same kind.

## Testing and Debugging

**Dynamic testing** executes the test object and triggers failures, which show that a defect exists but not where it is. **Debugging** then reproduces the failure, diagnoses it (locating the defect and its root cause) and fixes the defect.

**Static testing** such as reviews and static analysis examines work products without executing them and finds defects directly, including defects in documents and defects that would never cause a failure. Since the location of the defect is already known, debugging consists only of fixing it.

In both cases, a [confirmation test and regression tests](./test-levels.md#change-related-tests) follow the fix.

## False Positives and False Negatives

- **False positive:** The test fails although the test object is correct, because the test or its environment is defective, e.g. a wrong expected result, wrong test data or a faulty test environment.
- **False negative:** The test passes although the test object contains a defect, e.g. because an assertion checks the wrong value or the input does not reach the defect.

## Example: Ticket Price

The requirement for the [`TicketPricer`](./unit-tests.md#structure-arrange-act-assert) states "children up to 6 years go free", by which the sales department means children before their sixth birthday.

| Term       | Example                                                                         |
| ---------- | ------------------------------------------------------------------------------- |
| Error      | The developer reads "up to 6 years" as "up to and including 6"                  |
| Defect     | The condition `age <= 6` instead of `age < 6`                                   |
| Failure    | `priceFor(6)` returns `0` instead of `6`: a six-year-old receives a free ticket |
| Root cause | The ambiguous wording "up to 6 years" in the requirement                        |

What this example shows: the defect causes a failure only for the input `6`, so tests with the ages `3`, `10` and `30` pass and a suite without [boundary value tests](./unit-tests.md#boundary-value-tests) does not reveal it. Correcting the condition fixes `priceFor`, but the ambiguous requirement remains and can lead to the same defect wherever else the age limit is implemented, e.g. in the online shop.

## Common Mistakes

1. **Defect and failure used as synonyms:** A test report stating "the defect is that the invoice shows 120 EUR" describes a failure. The defect is the place in the code that produces the wrong amount.
2. **Passed tests as proof that no defects exist:** A test reveals a defect only when it executes the defective part with its input and causes a failure, so defects that need other conditions or never cause a failure remain undetected.
3. **Every failed test as a defect in the test object:** A failed test can also be caused by the test, the test data or the environment, in which case debugging the test object searches for a defect that does not exist.
4. **Correcting the defect without the root cause:** The corrected line no longer fails, but the situation that led to the error remains and can produce the same kind of defect elsewhere.

## See Also

- [Test Levels](./test-levels.md): on which level which defects are found and why early levels are cheaper
- [Unit Tests](./unit-tests.md): boundary value tests and regression tests for `TicketPricer`
