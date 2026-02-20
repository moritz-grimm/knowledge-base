---
title: Encryption and Digital Signatures
description: Overview of symmetric and asymmetric encryption, hash functions, and digital signatures.
keywords:
    - Encryption
    - Digital Signature
    - Symmetric Encryption
    - Asymmetric Encryption
    - Public Key
    - Private Key
    - Hash
    - Security
---

# Encryption and Digital Signatures

## Overview

Encryption protects data from unauthorized access by transforming it into an unreadable format. Digital signatures verify the authenticity and integrity of data, ensuring it was not manipulated during transit.

## Symmetric Encryption

Both sender and receiver use the **same key** to encrypt and decrypt data.

- **Fast** and efficient for encrypting large amounts of data
- **Key distribution** is a challenge, because the key must be securely shared beforehand
- **Common algorithms**: AES (Advanced Encryption Standard), DES (Data Encryption Standard), 3DES (Triple Data Encryption Standard)
- **Typical Use Case**: Bulk data encryption

```text
Plaintext => [Encrypt with Key] => Ciphertext => [Decrypt with Key] => Plaintext
```

---

## Asymmetric Encryption

Uses a **key pair**: a public key (shared openly) and a private key (kept secret).

- Data encrypted with the public key can only be decrypted with the matching private key
- **Slower** than symmetric encryption due to mathematical complexity
- **Common algorithms**: RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography)
- **Typical Use Case**: Key exchange (hybrid encryption), digital signatures

```text
Plaintext => [Encrypt with Public Key of Receiver] => Ciphertext => [Decrypt with Private Key of Receiver] => Plaintext
```

---

## Hash Functions

A hash function maps data of arbitrary size to a fixed-size output (hash/digest).

- **One-way**: the original data cannot be derived from the hash
- **Deterministic**: the same input always produces the same hash
- **Collision-resistant**: different inputs should not produce the same hash
- **Common algorithms**: SHA-256, SHA-3, MD5

## Digital Signatures

Digital signatures verify that data was sent by a specific party and has not been altered.

**Signing (sender):**

1. Creates a [hash](#hash-functions) of the message
2. Encrypt the hash with his own **private key** => this is the signature
3. Send the message together with the signature

**Verification (receiver):**

1. Decrypt the signature using the sender's **public key** => reveals the original hash
2. Independently hash the received message
3. Compare both hashes, if they match, the signature is valid and the message is authentic
