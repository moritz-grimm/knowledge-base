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

| Operation | Item                                          | Note                          |
| --------- | --------------------------------------------- | ----------------------------- |
|           | List purchase price (Listeneinkaufspreis)     | Supplier's catalog price      |
| −         | Supplier discount (Lieferantenrabatt)         | % reduction on list price     |
| =         | Net purchase price (Zieleinkaufspreis)        |                               |
| −         | Supplier cash discount (Lieferantenskonto)    | % reduction for early payment |
| =         | Cash purchase price (Bareinkaufspreis)        |                               |
| +         | Procurement costs (Bezugskosten)              | Shipping, customs             |
| =         | **Cost price (Bezugspreis / Einstandspreis)** | True cost of the goods        |

### Sales Side

| Operation | Item                                                      | Note                                               |
| --------- | --------------------------------------------------------- | -------------------------------------------------- |
|           | Cost price (Einstandspreis)                               | Carried over from above                            |
| +         | Overhead surcharge (Handlungsgemeinkosten)                | Operating costs, rent, staff, etc.                 |
| =         | Break-even price (Selbstkostenpreis)                      |                                                    |
| +         | Profit markup (Gewinnzuschlag)                            | Desired profit margin                              |
| =         | Cash selling price (Barverkaufspreis)                     |                                                    |
| +         | Customer cash discount (Kundenskonto)                     | Added back: allows customer early-payment discount |
| =         | Net selling price (Zielverkaufspreis)                     |                                                    |
| +         | Customer discount (Kundenrabatt)                          | Added back: allows customer to receive a discount  |
| =         | List selling price net (Listenverkaufspreis netto)        |                                                    |
| +         | VAT (Umsatzsteuer / MwSt.)                                | e.g. 19% in Germany                                |
| =         | **List selling price gross (Listenverkaufspreis brutto)** | Final price for the customer                       |

## Notes

- Skonto and Rabatt are **added back** on the sales side because they represent potential deductions the customer may claim — the sales price must cover them
- Overhead surcharge is typically expressed as a percentage of the cost price, based on the company's actual operating costs
- The calculation can be performed forward (from purchase price to selling price) or backward (from a target selling price to derive required purchase price)
