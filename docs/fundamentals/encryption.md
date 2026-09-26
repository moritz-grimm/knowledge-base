---
title: "Encryption and Digital Signatures"
description: "Symmetric and asymmetric encryption including AES, RSA and Diffie-Hellman, hash functions, password hashing with salt and bcrypt, and digital signatures."
keywords:
    - Encryption
    - Digital Signature
    - Symmetric Encryption
    - Asymmetric Encryption
    - Public Key
    - Private Key
    - Hash
    - AES
    - RSA
    - Diffie-Hellman
    - Salting
    - bcrypt
    - Password Hashing
    - Security
tags:
    - ap2
---

# Encryption and Digital Signatures

## Overview

Encryption protects data from unauthorized access by transforming it into an unreadable format. Digital signatures verify the authenticity and integrity of data, ensuring it was not manipulated during transit.

## Symmetric Encryption

Both sender and receiver use the **same key** to encrypt and decrypt data.

- **Fast** and efficient for encrypting large amounts of data
- **Key distribution** is a challenge, because the key must be securely shared beforehand
- **Common algorithms:** AES (Advanced Encryption Standard), DES (Data Encryption Standard), 3DES (Triple Data Encryption Standard)
- **Typical use case:** Bulk data encryption

```text
Plaintext => [Encrypt with Key] => Ciphertext => [Decrypt with Key] => Plaintext
```

### AES

AES (Advanced Encryption Standard) was standardised in 2001 as the successor to DES and is the symmetric algorithm in use today.

- **Block cipher:** encrypts blocks of 128 bit, longer data is split into blocks and padded
- **Key lengths:** 128, 192 or 256 bit, which determine the number of rounds (10, 12 or 14)
- **Performance:** implemented in hardware on current CPUs (AES-NI), which makes it fast enough for full disk encryption
- **Considered secure:** there is no practical attack better than trying every key

Since a block cipher encrypts each block on its own, an **operating mode** determines how the blocks are linked:

| Mode                        | Property                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ECB (Electronic Codebook)   | Each block encrypted independently, identical plaintext blocks produce identical ciphertext blocks, therefore unsuitable |
| CBC (Cipher Block Chaining) | Each block is combined with the previous ciphertext block, requires an initialisation vector, no integrity protection    |
| CTR (Counter Mode)          | Turns the block cipher into a parallelisable stream cipher                                                               |
| GCM (Galois/Counter Mode)   | Current default choice: CTR plus an authentication tag that also detects manipulation                                    |

Typical use: file and disk encryption (LUKS, BitLocker, VeraCrypt), payload encryption in [TLS](#hybrid-encryption), encrypted archives and database columns.

### DES and 3DES

DES is the predecessor of AES with a key length of 56 bit, which can be brute-forced within hours today and is therefore broken. 3DES applies DES three times and thus reaches an effective 112 bit, but is slow and is only found in legacy systems. Neither is used for new development.

---

## Asymmetric Encryption

Uses a **key pair**: a public key (shared openly) and a private key (kept secret).

- Data encrypted with the public key can only be decrypted with the matching private key
- **Slower** than symmetric encryption due to mathematical complexity
- **Common algorithms:** RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography)
- **Typical use cases:** Key exchange (hybrid encryption), digital signatures

```text
Plaintext => [Encrypt with Public Key of Receiver] => Ciphertext => [Decrypt with Private Key of Receiver] => Plaintext
```

### RSA

RSA is the best known asymmetric algorithm. Its name is formed from its inventors Rivest, Shamir and Adleman.

- **Security basis:** multiplying two large prime numbers is easy, factoring the product back into them is not
- **Key lengths:** 2048 bit as the minimum, 3072 or 4096 bit for long-term protection, not comparable to symmetric key lengths
- **Capabilities:** encryption and digital signatures with the same key pair
- **Limitation:** the payload has to be shorter than the key, which is why RSA encrypts a symmetric key rather than the data itself

ECC (Elliptic Curve Cryptography) achieves comparable security with much shorter keys. A 256-bit ECC key roughly corresponds to a 3072-bit RSA key. This is why ECC has become the default for the key exchange in [TLS](#hybrid-encryption) (ECDHE) and is increasingly used for certificate signatures (ECDSA).

### Diffie-Hellman

Diffie-Hellman is not an encryption algorithm but a **key agreement** procedure. Both sides derive a shared secret from public values and their own secret value, without that secret ever being transmitted.

```text
Alice                                  Bob
secret a                               secret b
       ── public value A ────────────►
       ◄──────────── public value B ──
shared key from (B, a)  ==  shared key from (A, b)
```

- An eavesdropper sees both public values but cannot derive the shared key from them
- **Ephemeral** variants (DHE, ECDHE) generate a new key pair per session, so a later compromise of the long-term key does not decrypt recorded traffic (forward secrecy)
- Diffie-Hellman alone does not authenticate anyone: without a certificate an attacker in the middle can agree one key with each side and relay the traffic

---

## Hybrid Encryption

In practice neither method is used on its own: asymmetric cryptography solves key distribution, symmetric cryptography does the actual work. TLS combines them exactly that way:

1. The server proves its identity with a **certificate** containing its public key.
2. Both sides agree on a session key via **ECDHE** and authenticate the exchange with the certificate.
3. The payload is encrypted **symmetrically** with that session key, usually AES-GCM.
4. The session key is discarded when the connection ends.

---

## Hash Functions

A hash function maps data of arbitrary size to a fixed-size output (hash/digest).

- **One-way:** the original data cannot be derived from the hash
- **Deterministic:** the same input always produces the same hash
- **Collision-resistant:** different inputs should not produce the same hash
- **Avalanche effect:** changing a single bit of the input changes roughly half the bits of the hash

Typical applications: integrity checks on downloads, duplicate detection, signatures, and in combination with the procedures below the storage of passwords.

| Algorithm | Digest length | Assessment                                                                                                   |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| MD5       | 128 bit       | Broken, collisions can be produced within seconds, only acceptable as a checksum against transmission errors |
| SHA-1     | 160 bit       | Broken, practical collision attacks exist, no longer used for signatures                                     |
| SHA-256   | 256 bit       | Current standard, part of the SHA-2 family                                                                   |
| SHA-512   | 512 bit       | Like SHA-256 with a longer digest, faster than SHA-256 on 64-bit systems                                     |
| SHA-3     | variable      | Different internal construction than SHA-2, intended as a reserve should SHA-2 be weakened                   |

---

## Hashing Passwords

Passwords are never stored in plaintext and never encrypted, because a key that can decrypt them has to exist somewhere. They are hashed, so that a stolen database does not reveal the passwords themselves.

A plain `SHA-256` is not enough for this for two reasons:

- **Identical passwords produce identical hashes**, so the hash reveals which accounts share a password, and a precomputed table (rainbow table) resolves common passwords immediately
- **Hash functions are fast by design**, and current hardware computes billions of SHA-256 hashes per second, which makes brute-forcing short passwords practical

### Salt

A salt is a random value that is generated per password and hashed together with it. The salt is not secret and is stored next to the hash.

```text
hash = H(salt + password)
```

- Identical passwords produce different hashes, since the salt differs
- Rainbow tables become worthless because an attacker would need one table per salt
- Every password has to be attacked individually instead of all of them at once

A **pepper** is an additional secret value that is identical for all passwords and is stored outside the database, for example in the application configuration. It only helps if the database leaks while the configuration does not.

### Work Factor

The second measure is to make hashing deliberately slow: a procedure designed for passwords repeats its internal operation many times. The number of repetitions is configurable as a **cost factor** and is raised as hardware gets faster. A delay of around 100 ms per login is imperceptible to the user and makes trying billions of candidates impractical.

### bcrypt

bcrypt is the most widely used procedure of this kind and is based on the Blowfish cipher.

- Salt is generated and stored **inside the hash**, so no separate column is required
- The cost factor is part of the hash, which allows old hashes to be verified after it has been raised
- Deliberately slow and memory-bound, which makes it harder to accelerate on GPUs than SHA-based procedures
- Limitation: only the first 72 bytes of the input are used

```text
$2b$12$eImiTXuWVxfM37uY4JANjQ.../hJ6CtPTuOrAXTlHGDLcJU3wG6Hpu
 │   │  └── salt (22 characters) ──┘└── hash ────────────────┘
 │   └───── cost factor 12, meaning 2^12 rounds
 └───────── algorithm identifier
```

Alternatives with the same purpose:

| Procedure | Note                                                                                                                        |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| Argon2id  | Winner of the Password Hashing Competition, tunable in time, memory and parallelism, current recommendation for new systems |
| scrypt    | Memory-hard, therefore expensive to parallelise on specialised hardware                                                     |
| PBKDF2    | Widely available and standardised, but only computation-bound, which makes it the weakest of these options                  |
| bcrypt    | Established, well understood, available in every language                                                                   |

What never belongs in a password store: plaintext, reversible encryption, unsalted hashes, and a single fast hash function such as MD5, SHA-1 or SHA-256.

---

## Digital Signatures

Digital signatures verify that data was sent by a specific party and has not been altered.

**Signing (sender):**

1. Create a [hash](#hash-functions) of the message
2. Encrypt the hash with the sender's own **private key** => this is the signature
3. Send the message together with the signature

**Verification (receiver):**

1. Decrypt the signature using the sender's **public key** => reveals the original hash
2. Independently hash the received message
3. Compare both hashes: if they match, the signature is valid and the message is authentic

This procedure describes RSA signatures. [ECDSA](#rsa) does not encrypt the hash but computes the signature from the hash and the private key. The receiver verifies it with the public key.
