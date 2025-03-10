---
title: Storj Managed vs. User Managed Encryption
docId: aitie6rohXai9uuv
metadata:
  title: Encryption passphrase management comparison
  description:
    Overview of the supported methods for managing an encryption passphrase
    in  a Storj project, and their advantages/disadvantages.
---

When creating a new Storj project, users are able to select between "Storj Managed Encryption" and "Self Managed Encryption". Each has its own benefits and tradeoffs, and once an option is selected, it cannot be changed for that project.

This page is intended to explain the difference between the two options, so that users can be better informed about which project encryption option is better suited to their use-case.

## Overivew

**Storj Managed Encryption** is best suited to:
* users who want a streamlined web browser experience, similar to other cloud storage providers
* users who want to collaborate with others on the same project

**Storj Managed Encryption** is best suited to:
* users who want complete ownership of their data encryption keys
* users who have more advanced/specialized encryption use-cases

## Storj Managed Encryption

* Encrypts data using a passphrase stored (encrypted) in the satellite's database.
* Users are not prompted for passphrases in the browser.
* Applies to entire projects, allowing seamless access for all project members.
* No path encryption; files listed in lexicographical order.

## User Managed Encryption

* Encrypts data using a user-provided passphrase, not stored in the satellite's database.
* Users must remember and share the passphrase; prompts appear in the browser for certain actions.
* Path encryption is enabled by default; extra steps needed to list files lexicographically.
* Allows multiple passphrases within a project/bucket, though not recommended.

