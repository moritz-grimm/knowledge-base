---
title: "Normalization"
description: "An overview of the three database normalization forms (1NF, 2NF, 3NF) with examples."
keywords:
    - "Normalization"
    - "Database"
    - "Databases"
    - "1NF"
    - "2NF"
    - "3NF"
    - "Normal Forms"
    - "Relational Database"
---

# Normalization

Normalization is the process of structuring a relational database to reduce data redundancy and improve data integrity. Each normal form builds on the previous one.

## First Normal Form (1NF)

**Rule**: Every column must contain atomic (indivisible) values, and each row must be unique.

**Violation**: A `Phone` column storing multiple numbers in one cell.

| CustomerID | Name  | Phone            |
| ---------- | ----- | ---------------- |
| 1          | Alice | 111-111, 222-222 |

**Fixed**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

**Violation**: Multiple columns for the same attribute.

| CustomerID | Name  | Phone1  | Phone2  |
| ---------- | ----- | ------- | ------- |
| 1          | Alice | 111-111 | 222-222 |

**Fixed**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

## Second Normal Form (2NF)

**Rule**: Must be in 1NF, and every non-key attribute must depend on the **entire** primary key, not just part of it

**Violation**: The table uses `(OrderID, ProductID)` as a composite key, but `ProductName` depends only on `ProductID`.

| OrderID | ProductID | ProductName | Quantity |
| ------- | --------- | ----------- | -------- |
| 1       | 42        | Keyboard    | 2        |
| 2       | 42        | Keyboard    | 1        |

**Fixed**: Move `ProductName` into a separate `Products` table.

**Orders**:

| OrderID | ProductID | Quantity |
| ------- | --------- | -------- |
| 1       | 42        | 2        |
| 2       | 42        | 1        |

**Products**:

| ProductID | ProductName |
| --------- | ----------- |
| 42        | Keyboard    |

## Third Normal Form (3NF)

**Rule**: Must be in 2NF, and no non-key attribute may depend on another non-key attribute (no transitive dependencies).

**Violation**: `DepartmentHead` depends on `Department`, not directly on `EmployeeID`.

| EmployeeID | Department | DepartmentHead |
| ---------- | ---------- | -------------- |
| 1          | Sales      | Carol          |
| 2          | Sales      | Carol          |
| 3          | IT         | Dave           |

**Fixed**: Move `DepartmentHead` into a separate `Departments` table.

**Employees**:

| EmployeeID | Department |
| ---------- | ---------- |
| 1          | Sales      |
| 2          | Sales      |
| 3          | IT         |

**Departments**:

| Department | DepartmentHead |
| ---------- | -------------- |
| Sales      | Carol          |
| IT         | Dave           |

## Summary

| Normal Form | Requirement                                                 |
| ----------- | ----------------------------------------------------------- |
| 1NF         | Atomic values, no repeating columns, unique rows            |
| 2NF         | 1NF + no partial dependencies on a composite key            |
| 3NF         | 2NF + no transitive dependencies between non-key attributes |
