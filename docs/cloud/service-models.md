---
title: "Service Models (IaaS, PaaS, SaaS)"
sidebar_position: 2
description: "On-Premise, Infrastructure-as-a-Service, Platform-as-a-Service, Function-as-a-Service and Software-as-a-Service explained"
keywords:
    - "IaaS"
    - "PaaS"
    - "SaaS"
    - "Cloud Service Models"
    - "Infrastructure as a Service"
    - "Platform as a Service"
    - "Software as a Service"
    - "FaaS"
    - "Function as a Service"
    - "Serverless"
tags:
    - ap2
---

# Cloud Service Models

## Overview

Cloud computing services are typically categorized into three main service models, each offering different levels of control & flexibility.

| Service Model                                                               | Customer Manages                            | Provider Manages                                                               | Examples                                             |
| --------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| **[On-Premise](#on-premise)**                                               | Everything                                  | Nothing                                                                        | Own data center, local servers                       |
| **[IaaS](#infrastructure-as-a-service-iaas)** (Infrastructure as a Service) | OS, Middleware, Runtime, Data, Applications | Virtualization, Servers, Storage, Networking                                   | AWS EC2, Azure VMs, Google Compute Engine            |
| **[PaaS](#platform-as-a-service-paas)** (Platform as a Service)             | Data, Applications                          | Runtime, Middleware, OS, Virtualization, Servers, Storage, Networking          | Heroku, Google App Engine, Azure App Service, Vercel |
| **[FaaS](#function-as-a-service-faas--serverless)** (Function as a Service) | Individual functions, Data                  | Runtime, Scaling, Middleware, OS, Virtualization, Servers, Storage, Networking | AWS Lambda, Azure Functions, Cloudflare Workers      |
| **[SaaS](#software-as-a-service-saas)** (Software as a Service)             | Configuration only                          | Everything                                                                     | Gmail, Salesforce, Microsoft 365, Dropbox            |

---

## On-Premise

### Definition

On-premise (also called "on-prem") means running and managing all IT infrastructure locally within the organization's own facilities. No cloud provider is involved. The organization owns, operates and maintains everything from the physical hardware to the applications.

### What Is Included

- Physical servers and hardware
- Complete control over all layers
- Data stays within the organization's own facilities
- No dependency on external providers

### Responsibilities

**Organization manages:**

- Physical hardware (servers, storage, networking)
- Virtualization
- Operating systems
- Middleware
- Runtime environments
- Applications
- Data
- Security, backups, disaster recovery

### Use Cases

- **Strict Compliance Requirements:** Industries with strict data regulations (e.g. government, healthcare, finance)
- **Legacy Systems:** Applications that cannot be migrated to the cloud
- **Low-Latency Needs:** Systems requiring minimal network latency
- **Full Data Sovereignty:** Keeping sensitive data entirely in-house

### Advantages

- Full control over hardware and software
- Data never leaves the organization's premises
- No recurring cloud subscription costs
- No dependency on internet connectivity
- Easier compliance with strict data regulations

### Disadvantages

- High upfront capital costs (hardware, facilities, cooling)
- Requires dedicated IT staff for maintenance
- Scaling requires purchasing and installing new hardware
- Full responsibility for all updates, patches and security
- Hardware can become outdated

---

## Infrastructure as a Service (IaaS)

### Definition

IaaS only provides virtualized computing resources over the internet. It offers the fundamental building blocks for building a custom cloud IT infrastructure.

### What Is Included

- Virtual machines
- Storage
- Networks
- Operating system images

### Responsibilities

**Customer manages:**

- Operating systems
- Applications
- Data
- Runtime environments
- Middleware

**Provider manages:**

- Physical servers
- Storage hardware
- Networking equipment
- Virtualization layer

### Use Cases

- **Testing and Development:** Quickly spin up/down test environments
- **Website Hosting:** Host websites with full control over the infrastructure
- **Storage and Backup:** Large-scale data storage solutions
- **High-Performance Computing:** Computationally intensive workloads

### Advantages

- Complete control over infrastructure
- Pay-as-you-go pricing model
- Highly scalable
- No physical hardware maintenance

### Disadvantages

- Requires technical expertise
- Security patches and updates are the customer's sole responsibility
- More management overhead than PaaS/SaaS

### Examples

- Amazon Web Services (AWS) EC2
- Microsoft Azure Virtual Machines
- Google Compute Engine
- Hetzner

---

## Platform as a Service (PaaS)

### Definition

PaaS provides a platform allowing customers to develop, run, and manage applications without dealing with the infrastructure.

### What Is Included

- **Ready-to-use runtime environments** (Node.js, Python, Java, PHP, ...)
- **Managed databases** (PostgreSQL, MySQL, MongoDB, Redis)
- **Automatic deployment** (push code via Git => automatic builds)
- **Built-in scaling** (the application scales automatically based on traffic)
- **Development tools** (logging, monitoring, debugging)

### Responsibilities

**Customer manages:**

- Applications
- Data

**Provider manages:**

- Runtime environment
- Middleware
- Operating systems
- Virtualization
- Servers, storage, networking

### Use Cases

- **Application Development:** Build apps without infrastructure concerns
- **API Development and Management:** Create and host APIs
- **Microservices Architecture:** Deploy containerized applications

### Advantages

- Faster development and deployment
- Built-in scalability
- Reduced management complexity
- Focus on code, not infrastructure
- Integrated development tools

### Disadvantages

- Less control than IaaS
- Potential vendor lock-in
- May not support all programming languages/frameworks
- Limited customization options

### Examples

- Heroku
- Google App Engine
- Microsoft Azure App Service
- Red Hat OpenShift
- AWS Elastic Beanstalk
- Vercel, Netlify

---

## Function as a Service (FaaS) / Serverless

### Definition

FaaS is the logical continuation of PaaS: the unit that gets deployed is no longer an application but a single function. It does not run permanently: an event starts it, it processes the event and is stopped again.

"Serverless" is the wider term for this operating model and is misleading: servers are still involved but are no longer visible or manageable for the customer. Alongside FaaS it covers managed services that follow the same principle, such as serverless databases, object storage and message queues.

### What Is Included

- **Event-driven execution:** HTTP request, timer, message in a queue, file upload, database change
- **Automatic scaling from zero:** no instance while idle, many parallel instances under load
- **No capacity planning:** no instance count, no machine size, no autoscaling rules
- **Billing per invocation:** execution time and memory, usually in millisecond granularity
- **Integrated logging and monitoring** provided by the platform

### Responsibilities

**Customer manages:**

- The function code and its dependencies
- Configuration: triggers, permissions, environment variables, memory and timeout
- Data and external state

**Provider manages:**

- Runtime environment and its updates
- Scaling, including the number of parallel instances
- Middleware, operating system, virtualization
- Servers, storage, networking

### Properties

| Property          | Consequence for the design                                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Stateless         | A function keeps no state between invocations. State belongs in a database, cache or object storage                                     |
| Cold start        | The first invocation after an idle period needs additional time to start the runtime, which is noticeable for latency-critical requests |
| Execution limit   | An invocation is aborted after a maximum runtime. Long-running jobs therefore have to be split                                          |
| Event-driven      | The function only runs when an event triggers it and cannot start on its own                                                            |
| Scaling from zero | A load spike produces many parallel cold starts                                                                                         |

### Use Cases

- **APIs and webhooks:** endpoints with irregular or unpredictable load
- **Event processing:** reacting to an upload, a queue message or a database change
- **Scheduled jobs:** cleanup, reports, imports on a timer
- **Glue code:** small transformations between two services
- **Image and file processing:** generating thumbnails after an upload

### Advantages

- No server administration and no capacity planning
- Costs scale exactly with the load and idle time is free
- Very fast from idea to a deployed endpoint
- Scaling is handled by the platform

### Disadvantages

- Cold starts make the latency less predictable
- Limited runtime, memory and package size per function
- Strong vendor lock-in because triggers and permission models are provider-specific
- Debugging and local testing are harder than with a permanently running application
- Many small functions distribute the logic and make the overall behaviour harder to follow
- Under constant high load a permanently running instance is usually cheaper

### Examples

- AWS Lambda
- Azure Functions
- Google Cloud Functions / Cloud Run Functions
- Cloudflare Workers
- Vercel Functions, Netlify Functions

---

## Software as a Service (SaaS)

### Definition

SaaS delivers fully functional applications over the internet. Users access software through a web browser without installation or maintenance.

### What Is Included

- Ready-to-use applications
- Automatic updates
- Accessible from any device with internet
- Multi-tenant architecture

### Responsibilities

**Customer manages:**

- User configuration
- Data input
- Access permissions

**Provider manages:**

- Everything else (application, data, runtime, middleware, OS, infrastructure)

### Use Cases

- **Email and Communication:** Business email, messaging
- **Customer Relationship Management (CRM)**
- **Collaboration Tools:** Document sharing, project management
- **Office Productivity:** Word processing, spreadsheets, presentations
- **Human Resources:** Payroll, recruiting, employee management

### Advantages

- No installation or maintenance required
- Automatic updates
- Lower upfront costs
- Easy to use and scale

### Disadvantages

- No control over the infrastructure and full dependency on the operating company
- Limited customization
- Data security concerns (data stored externally in the cloud)
- Subscription costs can add up
- Dependent on internet connectivity

### Examples

- **Google Workspace** (Gmail, Google Docs, Drive)
- **Microsoft 365** (Outlook, Word, Excel, Teams)
- **ADITO** (CRM)
- **Slack** (Team communication)
- **Dropbox** (File storage)
- **Zoom** (Video conferencing)

---

## The Pizza Analogy

- **On-Premise:** Making pizza at home
- **IaaS:** Buying pizza dough and toppings and baking at home
- **PaaS:** Ordering pizza with self-chosen toppings for delivery
- **FaaS:** Buying a single slice when hungry and paying per slice (nothing is kept warm)
- **SaaS:** Eating at a pizza restaurant

---

## Additional Service Models

Beyond the core three and [FaaS](#function-as-a-service-faas--serverless), there are further specialized service models:

### Database as a Service (DBaaS)

- Managed database solutions
- Examples: Amazon RDS, Azure SQL Database, MongoDB Atlas

### Container as a Service (CaaS)

- Container orchestration platforms
- Examples: Amazon ECS, Google Kubernetes Engine, Azure Kubernetes Service

### Desktop as a Service (DaaS)

- Virtual desktops delivered via the cloud
- Examples: Amazon WorkSpaces, Azure Virtual Desktop, Citrix DaaS

### Backend as a Service (BaaS)

- Backend managed by the provider, frontend by the customer
- Examples: Supabase, Firebase
