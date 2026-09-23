---
title: "Deployment Diagram"
description: "UML deployment diagrams: nodes, devices and execution environments, artifacts and their deployment, communication paths with protocol stereotypes, multiplicities and nesting."
keywords:
    - UML
    - Deployment Diagram
    - Node
    - Device
    - Execution Environment
    - Artifact
    - Communication Path
    - Deployment
    - System Landscape
    - Structural Diagram
tags:
    - ap2
---

# Deployment Diagram

## Overview

A deployment diagram is a **structural** UML diagram. It shows how a finished system is physically distributed: which hardware and which runtime environments exist, which files are installed on them, and over which communication paths those parts exchange data.

Typical applications:

- Documenting the system landscape of an application for operations and handover
- Showing a client-server or three-tier architecture including its network boundaries
- Planning an installation: which artifact is copied onto which machine
- Describing a container or cloud deployment with its protocols and replica counts
- Providing a basis for discussions about availability, scaling and security zones

---

## Notation

| Element               | Notation                                                               | Meaning                                                                                           |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Node                  | Cuboid (three-dimensional box)                                         | Execution resource on which something runs or is stored                                           |
| Device                | Cuboid with the keyword `<<device>>`                                   | Physical hardware: server, workstation, smartphone, router, printer                               |
| Execution environment | Cuboid with `<<executionEnvironment>>`, usually nested inside a device | Software that hosts artifacts: operating system, JVM, application server, container runtime, DBMS |
| Artifact              | Rectangle with the keyword `<<artifact>>` or a document icon           | Physical file produced by the development process                                                 |
| Deployment            | Artifact drawn inside a node, or a dashed `<<deploy>>` arrow           | The artifact is installed on that node                                                            |
| Manifestation         | Dashed `<<manifest>>` arrow from an artifact to a component or class   | The artifact is the physical realisation of a logical element                                     |
| Communication path    | Solid line between two nodes                                           | Connection over which the nodes exchange data, without a direction                                |
| Protocol              | Stereotype on the path, e.g. `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`     | Protocol used on that connection                                                                  |
| Multiplicity          | Number at the end of a communication path, e.g. `2` or `1..*`          | How many nodes at that end are connected to one node at the other end                             |
| Nesting               | Node or artifact drawn inside a node                                   | Containment: hardware contains runtime contains file                                              |
| Instance              | Underlined name with a leading colon, e.g. `:AppServer`                | A concrete instance instead of a type                                                             |
| Note                  | Dog-eared rectangle on a dashed line                                   | Comment without semantics                                                                         |

Naming rules that keep a diagram readable:

- A node is named as a type, `ApplicationServer`, or as a concrete machine, `appsrv01:ApplicationServer`. An instance name is underlined in a drawing tool.
- Artifacts carry the real file name including its extension: `shop.war`, not `Shop application`.
- Every communication path carries a protocol stereotype, an unlabelled line states only *connected somehow*.
- Keywords and stereotypes are written in guillemets, `«device»`. The spelling `<<device>>` is the ASCII form used by text-based tools and is the one used below.

---

## Building Blocks

### Node

Two kinds of node are distinguished by keyword:

- **`<<device>>`:** physical hardware such as a server, a workstation, a mobile phone or an embedded controller
- **`<<executionEnvironment>>`:** a software environment that hosts artifacts and provides them with services such as memory management, transactions or request dispatching

An execution environment is normally nested inside a device. A node without a keyword is simply *some* execution resource.

```text
        ┌────────────────────────────────────────┐
       ╱                                        ╱│
      ┌────────────────────────────────────────┐ │
      │  <<device>>                            │ │
      │  ApplicationServer                     │ │
      │                                        │ │
      │  ┌──────────────────────────────────┐  │ │
      │  │  <<executionEnvironment>>        │  │ │
      │  │  Tomcat 10                       │  │ │
      │  │                                  │  │ │
      │  │  ┌────────────────────────────┐  │  │ │
      │  │  │  <<artifact>>              │  │  │ │
      │  │  │  shop.war                  │  │  │ │
      │  │  └────────────────────────────┘  │  │ │
      │  └──────────────────────────────────┘  │ ╱
      └────────────────────────────────────────┘╱
```

In a drawing tool every node is a cuboid, the nested ones included. The diagrams here draw inner nodes as plain rectangles so that the nesting stays readable in plain text.

### Artifact and Deployment

In practice an artifact is a file. Typical examples are `shop.war`, `payment-service.jar`, `setup.exe`, `schema.sql`, `nginx.conf` and a container image such as `shop-app:2.4.0`.

Two notations state that an artifact is installed on a node:

- **Nesting:** the artifact rectangle is drawn inside the node. This form is more compact and by far the more common one.
- **Dependency:** a dashed arrow with the keyword `<<deploy>>` leads from the artifact to the node. This form is useful when the same artifact is deployed onto several nodes.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈┈ <<deploy>> ┈┈┈┈┈┈▶ │  <<device>>            │
 │  shop.war              │                          │  ApplicationServer     │
 └────────────────────────┘                          └────────────────────────┘
```

A manifestation is the counterpart pointing towards the design. A dashed arrow with the keyword `<<manifest>>` leads from the artifact to the component or class that it physically realises, and so shows which part of the model ends up in this file.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈ <<manifest>> ┈┈┈┈┈▶ │  <<component>>         │
 │  payment-service.jar   │                          │  PaymentService        │
 └────────────────────────┘                          └────────────────────────┘
```

### Communication Path

A communication path is a solid line without an arrowhead, because the connection itself has no direction, and is labelled with the protocol as a stereotype.

```text
    ┌──────────────────────┐                  ┌──────────────────────┐
   ╱                      ╱│                 ╱                      ╱│
  ┌──────────────────────┐ │                ┌──────────────────────┐ │
  │  <<device>>          │ │ 2            1 │  <<device>>          │ │
  │  AppServer           │ ├──── <<JDBC>> ──┤  DatabaseServer      │ │
  │                      │ ╱                │                      │ ╱
  └──────────────────────┘╱                 └──────────────────────┘╱
```

Common protocol stereotypes are `<<HTTP>>`, `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`, `<<REST>>`, `<<AMQP>>`, `<<SSH>>` and `<<SMTP>>`. Which of them is chosen is a question of the intended level of detail: `<<TCP/IP>>` names the transport, `<<HTTPS>>` additionally states that the connection is encrypted, which is usually the more useful piece of information.

### Multiplicity and Nesting

A multiplicity is written at the end of a communication path and requires type names: an instance such as `appsrv01:ApplicationServer` is always exactly one machine.

Nesting can span several levels, each level runs on the one surrounding it:

```text
<<device>>                  ServerHardware
  <<executionEnvironment>>    Linux
    <<executionEnvironment>>    Docker Engine
      <<artifact>>                shop-app:2.4.0
```

Levels that do not matter for the purpose of the diagram are left out, e.g. the container runtime in a capacity plan. In a release plan, by contrast, the version tag of the image is the key information.

---

## Example: Three-Tier Web Shop

The shop consists of a browser front end, an application in a container and a relational database. Each tier runs on its own machine, the application server exists twice, and the database is reachable only from the application server.

```text
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ClientPC                                  │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Browser                             │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 0..*
               <<HTTPS>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ApplicationServer                         │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Docker Engine                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-app:2.4.0                │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 2
                <<JDBC>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  DatabaseServer                            │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  PostgreSQL 16                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-schema.sql               │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
```

What this example shows:

- The multiplicity `2` at the application server end of the `<<JDBC>>` path states that two application servers access the database, `0..*` at the client end that any number of clients may be connected, including none.
- Nothing is said about *when* which call happens. The order of the calls belongs in a [sequence diagram](./sequence-diagram.md).

---

## Common Mistakes

1. **Classes or components inside a node:** a node contains artifacts. The logical element belongs in a [class diagram](./class-diagram.md) or a component diagram and is linked to the artifact with `<<manifest>>`.
2. **Communication path without a protocol:** without `<<HTTPS>>` or `<<JDBC>>` on the line, the diagram no longer shows which connections are encrypted or which ports a firewall has to open.
3. **Device and execution environment confused:** `<<device>>` is hardware, `<<executionEnvironment>>` is software running on it. A container is not a device.
4. **Arrowheads on a communication path:** the path is undirected. A direction belongs to a dependency such as `<<deploy>>` or `<<manifest>>`.
5. **Every file drawn:** only what matters for installation and operation belongs in the diagram, not every library and configuration file.
6. **Missing multiplicities:** a cluster of four machines drawn as a single node without `4` hides its size.
7. **Logical tiers equated with nodes:** presentation, logic and data layer are a logical split, nodes are a physical one. Three tiers may well run on one machine.

---

## Tools

- draw.io / diagrams.net (free, browser-based, UML shape library included)
- PlantUML (text-based, diagram is generated from source and can be versioned)
- Mermaid (text-based, renders directly in Markdown on many platforms)
- Visual Paradigm, StarUML, Lucidchart (commercial, with free tiers)

## See Also

- [Component Diagram](./component-diagram.md): the logical building blocks whose artifacts are deployed here
- [Class Diagram](./class-diagram.md): the fine-grained structure of the software that ends up inside the artifacts
- [Sequence Diagram](./sequence-diagram.md): the interaction over the communication paths shown here
- [UML Overview](./uml-overview.mdx): classification of the diagram types
- [UML Notation Basics](./uml-notation-basics.md): keywords, stereotypes, instance names and the elements shared by all diagram types
