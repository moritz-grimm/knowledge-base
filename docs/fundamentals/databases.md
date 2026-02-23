---
title: Databases
description: An overview of relational and non-relational databases, core concepts like normalization and ACID, and common database systems.
keywords:
    - Databases
    - SQL
    - NoSQL
    - Relational Database
    - ACID
    - Normalization
    - PostgreSQL
    - MongoDB
---

# Databases

## Overview

A database is an organized collection of structured data managed by a Database Management System (DBMS). The two primary paradigms are **relational (SQL)** and **non-relational (NoSQL)** databases.

## Relational Databases (SQL)

Data is stored in **tables** with rows and columns. Each dataset is uniquely identifieable with a **Primary Key** and Tables are linked through **foreign keys**, forming a structured schema.

- Data is queried using **SQL** (Structured Query Language)
- Schema is defined upfront and enforced by the database
- Best suited for structured data with clear relationships

**Common systems**: PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Oracle DB

### Key Concepts

**Normalization**: Organizing tables to reduce data redundancy:

- **1NF**: Atomic values, no repeating groups
- **2NF**: No partial dependencies on composite keys
- **3NF**: No transitive dependencies

**ACID Properties**: Guarantees for reliable transactions:

- **Atomicity**: A transaction either fully succeeds or fully fails
- **Consistency**: Data always moves from one valid state to another
- **Isolation**: Concurrent transactions do not interfere with each other
- **Durability**: Committed changes persist even after a crash

## Non-Relational Databases (NoSQL)

Designed for flexible, scalable storage of unstructured or semi-structured data. No fixed schema required.

| Type          | Description                                 | Example Systems  |
| ------------- | ------------------------------------------- | ---------------- |
| Document      | Stores JSON-like documents                  | MongoDB, CouchDB |
| Key-Value     | Simple key => value pairs                   | Redis, DynamoDB  |
| Column-Family | Optimized for columnar reads/writes         | Apache Cassandra |
| Graph         | Nodes and edges for relationship-heavy data | Neo4j            |

## Relational vs. NoSQL

|                | Relational                     | NoSQL                                      |
| -------------- | ------------------------------ | ------------------------------------------ |
| Schema         | Fixed, predefined              | Flexible / schema-less                     |
| Query language | SQL                            | Varies (e.g., MongoDB Query Language)      |
| Scaling        | Vertical (scale up)            | Horizontal (scale out)                     |
| Consistency    | Strong (ACID)                  | Often eventual consistency                 |
| Best for       | Structured data, complex joins | Large scale, flexible or hierarchical data |
