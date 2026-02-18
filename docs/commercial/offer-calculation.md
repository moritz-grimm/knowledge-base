---
title: Offer Calculation
description: How to calculate a sales price from a supplier's list price using the standard trade calculation scheme, covering discounts, markups, and VAT.
keywords:
    - Offer Calculation
    - Trade Calculation
    - Pricing
    - Procurement
    - Commercial
---

# Offer Calculation

## Overview

The offer calculation determines the sales price of a product based on the purchase price plus all associated costs, markups, and taxes. It follows a standardized step-by-step scheme used in trade and retail.

## Calculation Scheme

### Purchase Side

| Operation | Item                   | Note                          |
| --------- | ---------------------- | ----------------------------- |
|           | List purchase price    | Supplier's catalog price      |
| −         | Supplier discount      | % reduction on list price     |
| =         | Net purchase price     |                               |
| −         | Supplier cash discount | % reduction for early payment |
| =         | Cash purchase price    |                               |
| +         | Procurement costs      | Shipping, customs             |
| =         | **Cost price**         | True cost of the goods        |

### Sales Side

| Operation | Item                         | Note                                               |
| --------- | ---------------------------- | -------------------------------------------------- |
|           | Cost price                   | Carried over from above                            |
| +         | Overhead surcharge           | Operating costs, rent, staff, etc.                 |
| =         | Break-even price             |                                                    |
| +         | Profit markup                | Desired profit margin                              |
| =         | Cash selling price           |                                                    |
| +         | Customer cash discount       | Added back: allows customer early-payment discount |
| =         | Net selling price            |                                                    |
| +         | Customer discount            | Added back: allows customer to receive a discount  |
| =         | List selling price net       |                                                    |
| +         | VAT                          | e.g. 19% in Germany                                |
| =         | **List selling price gross** | Final price for the customer                       |

## Notes

- Skonto and Rabatt are **added back** on the sales side because they represent potential deductions the customer may claim, the sales price must cover them
- Overhead surcharge is typically expressed as a percentage of the cost price, based on the company's actual operating costs
- The calculation can be performed forward (from purchase price to selling price) or backward (from a target selling price to derive required purchase price)
