---
title: Storj Managed vs. User Managed Encryption
docId: aitie6rohXai9uuv
metadata:
  title: Encryption passphrase management comparison
  description:
    Overview of the supported methods for managing an encryption passphrase
    in  a Storj project, and their advantages/disadvantages.
---
When creating a new Storj project, users can choose between **Storj-Managed Encryption** and **Self-Managed Encryption**. Each option offers distinct benefits and tradeoffs. Once selected, the encryption method cannot be changed for that project.

This page explains the differences between these options to help users determine which approach best suits their needs.

## Overivew

**Storj Managed Encryption** is ideal for:
* Users who want a streamlined web-based experience similar to other cloud storage providers.
* Users who need to collaborate with others on the same project without managing passphrases manually.

**Storj Managed Encryption** is best suited to:
* Users who require complete control over their encryption keys.
* Users with advanced or specialized encryption requirements.

## Storj Managed Encryption

* Encrypts objects using a passphrase stored (encrypted) in the satellite's database.
* Users are not prompted for passphrases in the browser.
* Applies at the project level, ensuring seamless access for all project members.
* No path encryption and objects are listed in lexicographical order.

## User Managed Encryption

* Encrypts data using a user-provided passphrase that is **not stored in the satellite's database**.
* Users must remember and share their passphrase as needed; prompts appear in the browser for certain actions that require the passphrase.
* Path encryption is enabled by default, requiring extra steps for lexicographical object listing.
* Supports multiple passphrases within a project or bucket, though this practice is not recommended for most use cases.

## Choosing the Right Option
Storj offers both passphrase management methods to balance security, usability, and flexibility. Users prioritizing convenience and collaboration may prefer Storj-Managed Encryption, while those needing full control over encryption should opt for Self-Managed Encryption.