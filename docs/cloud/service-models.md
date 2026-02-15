---
title: "Service Models (IaaS, PaaS, SaaS)"
sidebar_position: 2
description: "Infrastructure-as-a-Service, Platform-as-a-Service, and Software-as-a-Service explained"
keywords:
  - "IaaS"
  - "PaaS"
  - "SaaS"
  - "Cloud Service Models"
  - "Infrastructure as a Service"
  - "Platform as a Service"
  - "Software as a Service"
---

# Cloud Service Models

## Overview

Cloud computing services are typically categorized into three main service models, each offering different levels of control & flexibility.

| Service Model                                                               | You Manage                                  | Provider Manages                                                      | Examples                                             |
| --------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------- |
| **[IaaS](#infrastructure-as-a-service-iaas)** (Infrastructure as a Service) | OS, Middleware, Runtime, Data, Applications | Virtualization, Servers, Storage, Networking                          | AWS EC2, Azure VMs, Google Compute Engine            |
| **[PaaS](#platform-as-a-service-paas)** (Platform as a Service)             | Data, Applications                          | Runtime, Middleware, OS, Virtualization, Servers, Storage, Networking | Heroku, Google App Engine, Azure App Service, Vercel |
| **[SaaS](#software-as-a-service-saas)** (Software as a Service)             | Configuration only                          | Everything                                                            | Gmail, Salesforce, Microsoft 365, Dropbox            |

---

## Infrastructure as a Service (IaaS)

### Definition

IaaS only provides virtualized computing resources over the internet. It offers the fundamental building blocks you need for building your own cloud IT infrastructure.

### What You Get

- Virtual machines
- Storage
- Networks
- Operating systems

### Responsibilities

**You manage:**

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

- **Testing and Development**: Quickly spin up/down test environments
- **Website Hosting**: Host websites with full control over the infrastructure
- **Storage and Backup**: Large-scale data storage solutions
- **High-Performance Computing**: Computationally intensive workloads

### Advantages

- Complete control over infrastructure
- Pay-as-you-go pricing model
- Highly scalable
- No time-consuming physical hardware maintenance

### Disadvantages

- Requires technical expertise
- You manage security patches and updates all by yourself
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

### What You Get

- **Ready-to-use runtime environments** (Node.js, Python, Java, PHP, ...)
- **Managed databases** (PostgreSQL, MySQL, MongoDB, Redis)
- **Automatic deployment** (push code via Git => automatic builds)
- **Built-in scaling** (your app scales automatically based on traffic)
- **Development tools** (logging, monitoring, debugging)

### Responsibilities

**You manage:**

- Applications
- Data

**Provider manages:**

- Runtime environment
- Middleware
- Operating systems
- Virtualization
- Servers, storage, networking

### Use Cases

- **Application Development**: Build apps without infrastructure concerns
- **API Development and Management**: Create and host APIs
- **Microservices Architecture**: Deploy containerized applications

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

## Software as a Service (SaaS)

### Definition

SaaS delivers fully functional applications over the internet. Users access software through a web browser without installation or maintenance.

### What You Get

- Ready-to-use applications
- Automatic updates
- Accessible from any device with internet
- Multi-tenant architecture

### Responsibilities

**You manage:**

- User configuration
- Data input
- Access permissions

**Provider manages:**

- Everything else (application, data, runtime, middleware, OS, infrastructure)

### Use Cases

- **Email and Communication**: Business email, messaging
- **Customer Relationship Management (CRM)**
- **Collaboration Tools**: Document sharing, project management
- **Office Productivity**: Word processing, spreadsheets, presentations
- **Human Resources**: Payroll, recruiting, employee management

### Advantages

- No installation or maintenance required
- Accessible anywhere with internet
- Automatic updates
- Lower upfront costs
- Easy to use and scale

### Disadvantages

- No control over infrastructure, fully dependant on the operating company
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

A popular analogy compares cloud service models to ordering pizza:

- **On-Premises**: You make pizza at home (you manage everything)
- **IaaS**: You buy pizza dough and toppings, bake it yourself (infrastructure provided)
- **PaaS**: You order pizza for delivery (platform provided, you choose toppings)
- **SaaS**: You eat at a pizza restaurant (complete service provided)

---

## Additional Service Models

Beyond the core three, there are specialized service models:

### Function as a Service (FaaS) / Serverless

- Run code without managing servers
- Examples: AWS Lambda, Azure Functions, Google Cloud Functions
- Pay only for execution time

### Database as a Service (DBaaS)

- Managed database solutions
- Examples: Amazon RDS, Azure SQL Database, MongoDB Atlas

### Container as a Service (CaaS)

- Container orchestration platforms
- Examples: Amazon ECS, Google Kubernetes Engine, Azure Kubernetes Service

### Backend as a Service (BaaS)

- Manages the backend while you take care of the frontend
- Examples: Supabase, Firebase
