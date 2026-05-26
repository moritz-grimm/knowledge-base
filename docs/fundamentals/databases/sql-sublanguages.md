---
title: "SQL Sublanguages"
description: ""
keywords:
    - "SQL"
    - "Sublanguages"
    - "DDL"
    - "DML"
    - "DQL"
    - "DCL"
    - "Data Definition Language"
    - "Data Manipulation Language"
    - "Data Query Language"
    - "Data Control Language"
    - "Database"
    - "Databases"
    - "Relational Database"
---

# SQL Sublanguages

## DDL (Data Definition Language)

DDL commands define and manage the structure of a database, i.e. its tables, columns, constraints, and indexes.

**Common commands:**

- `CREATE` — creates a new table, view, index, or database
- `ALTER` — modifies an existing structure (e.g. adding or removing a column)
- `DROP` — permanently deletes a table or database
- `TRUNCATE` — removes all rows from a table without deleting the table itself

## DML (Data Manipulation Language)

DML commands are used to modify the actual stored data.

**Common commands:**

- `INSERT` — adds new rows to a table
- `UPDATE` — modifies existing rows
- `DELETE` — removes rows from a table

## DQL (Data Query Language)

DQL is used to query and retrieve data from the database without modifying it.

**Common commands:**

- `SELECT` — retrieves rows from one or more tables, optionally filtered, grouped, or sorted

## DCL (Data Control Language)

DCL manages access rights and permissions for database users.

**Common commands:**

- `GRANT` — gives a user permission to perform specific actions
- `REVOKE` — removes previously granted permissions
