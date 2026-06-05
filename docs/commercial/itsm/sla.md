---
title: Service Level Agreement (SLA)
description: "Structure and content of Service Level Agreements (SLAs), Service Level Management, the roles of Service Level Manager and Service Owner, and OLAs"
keywords:
  - "SLA"
  - "Service Level Agreement"
  - "Service Level Management"
  - "OLA"
  - "Operational Level Agreement"
  - "Service Level Manager"
  - "KPI"
  - "Response Time"
---

# Service Level Agreement (SLA)

## Overview

An **SLA (Service Level Agreement)** is a contract between an IT service provider and a customer that defines the scope, quality, and conditions of the IT services provided.

## Typical SLA Structure

### 1. Description / Scope

Defines which IT problems are covered, how they are handled, and which support channels are used (phone, email). Also specifies hardware and systems covered.

### 2. [Priorities](./priorities.md)

Three or more priority levels with different response times. Example:

| Priority   | Response time                      |
| ---------- | ---------------------------------- |
| Priority 1 | 1 working hour, express surcharge  |
| Priority 2 | 5 working hours, standard priority |
| Priority 3 | 1 working day                      |

**Response time:** the time between the disruption being reported to the [helpdesk](./service-requests.md) and work on the problem resolution beginning at the responsible support level.

### 3. Service Times

| Day                         | Hours                |
| --------------------------- | -------------------- |
| Mon–Fri                     | 07:00–20:00          |
| Saturday                    | 09:00–18:00          |
| Sundays and public holidays | No service           |
| Extended hours              | Available on request |

### 4. Languages

Supported languages for support (e.g. German, English).

### 5. Quality Metrics: Call Acceptance

| Metric                     | Target                                 |
| -------------------------- | -------------------------------------- |
| Calls answered             | 95 % of all incoming calls, < 5 % lost |
| Answered within 20 seconds | 75 %                                   |
| Answered within 40 seconds | 90 %                                   |
| Handled via voicemail      | Max 10 %                               |

### 6. Quality Metrics: Problem Resolution

| Metric                                     | Target                     |
| ------------------------------------------ | -------------------------- |
| Avg. handling time for calls               | Max 30 minutes             |
| Intermediate report if not answered within | 4 hours                    |
| Avg. handling time for disruptions         | Max 2 hours                |
| Max. handling time                         | 3 days                     |
| Minimum resolution rate                    | 70 % within 2 working days |

### 7. Quality Metric: Customer Satisfaction

Measured via online survey and trailer calls (callback and evaluation with 10 % of callers).

### 8. Reporting

Monthly review; quarterly statistical evaluation.

### 9. Validity and Duration

States the term of the SLA and when it will be renegotiated (e.g. "valid until 1 August 20xx").

### 10. Signatories

Provider and customer each sign the agreement.

## Service Level Management (SLM)

**SLM** ensures that SLAs are concluded with customers and that services are designed to meet the agreed service levels.

**Tasks:**

- Capture service requirements
- Check whether agreed service levels are being met
- Provide information in Service Level Reports

## Roles

### Service Level Manager

The process owner for Service Level Management.

Responsibilities:

- Negotiates SLAs
- Ensures they are met
- Ensures all ITSM processes, OLAs, and third-party contracts support the agreed service level goals
- Monitors service levels and provides reports

### Service Owner (Serviceverantwortlicher)

Responsible for delivering an infrastructure service within the agreed SLAs.

Responsibilities:

- Acts as negotiating partner for the Service Level Manager when agreeing OLAs
- Usually a manager leading a team of technical specialists or an internal support area

## OLA (Operational Level Agreement)

An **OLA** is an internal agreement between IT teams or departments on service delivery at the operational level. OLAs support the fulfilment of external SLAs.
