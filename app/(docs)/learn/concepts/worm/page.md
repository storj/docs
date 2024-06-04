---
title: Write Once, Read Many (WORM)
docId: uowaeHeigea0peCei1Pei
metadata:
  title: Implementing Write Once, Read Many (WORM) System
  description:
    Guide on creating credentials to set up a Write Once, Read Many (WORM)
    system, including required permissions and exclusions.
---

WORM credentials allow uploading new objects, reading and listing those objects, but prevents those objects from ever being overwritten or deleted even if the credential is leaked or stolen. This provides protection against ransomware by making the bucket immutable when using the credentials.

To implement a Write Once, Read Many (WORM) system, [create a credential](docId:_xWsamBjOsZYyu9xtQCm5) that includes the following permissions:

- Read
- Write
- List

Ensure the credential does **not** include:

- Delete

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-worm.png)
