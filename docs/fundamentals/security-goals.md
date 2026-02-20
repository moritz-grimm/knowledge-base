---
title: IT Security Goals
description: The four core IT security goals, confidentiality, integrity, availability, authenticity, and what they mean in practice.
keywords:
    - Security Goals
    - Confidentiality
    - Integrity
    - Availability
    - Authenticity
---

# IT Security Goals

## Overview

IT security is built on four core goals that define what a secure system must guarantee.

## Confidentiality

Information is only accessible to authorized parties.

- Data must be protected from unauthorized access or disclosure
- Achieved through encryption, access controls, and need-to-know principles
- **Example**: Only the intended recipient can read an encrypted email

## Integrity

Information is accurate and has not been tampered with.

- Data must not be modified, corrupted, or deleted without authorization — whether intentionally or accidentally
- Achieved through hash functions, digital signatures, and checksums
- **Example**: A downloaded file whose hash matches the published value has not been altered

## Availability

Systems and data are accessible when needed by authorized users.

- Services must remain operational and responsive; downtime or denial of access is a security failure
- Achieved through redundancy, backups, DDoS protection, and fault-tolerant infrastructure
- **Example**: A web service protected against DDoS attacks remains reachable during an attack

## Authenticity

The identity of a communication partner or the origin of data can be verified.

- Ensures that parties are who they claim to be and that data originates from a trusted source
- Achieved through digital certificates, signatures, and authentication protocols (e.g. TLS, MFA)
- **Example**: A TLS certificate proves that a website is operated by the stated organization

## Summary

| Goal            | Question                                 | Solutions                  |
| --------------- | ---------------------------------------- | -------------------------- |
| Confidentiality | Who can access this?                     | Encryption, access control |
| Integrity       | Has this been tampered with?             | Hashes, digital signatures |
| Availability    | Is this accessible when needed?          | Redundancy, backups        |
| Authenticity    | Is this really who/what it claims to be? | Certificates, MFA          |
