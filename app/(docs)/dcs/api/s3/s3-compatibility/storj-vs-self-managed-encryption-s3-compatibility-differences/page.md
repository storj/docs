---
title: Storj Managed vs. Self-Managed Encryption S3 Compatibility Differences
docId: oozaauQueuq9hgeac4Ze
weight: 1
---

## Listing Endpoints Behavior

The behavior of listing endpoints depends on the encryption model configured for your project.

| Encryption Type | S3 Compatibility |
| :--- | :--- |
| **Self-Managed Encryption** | **Limited** (Restricted sorting/filtering) |
| **Storj Managed Encryption** | **Full** (Fully S3-compatible) |

### Self-Managed Encryption
When using **Self-Managed Encryption**, object keys are end-to-end encrypted. This prevents the listing endpoint from deciphering the keys, which affects sorting and filtering.

* **Standard Listing:** For requests using a forward-slash (`/`) as a prefix terminator or delimiter, results are returned in the lexicographical order of the *encrypted* object keys. This often differs from the expected alphabetical order of the decrypted keys. Clients should not rely on ordering in these cases.
* **Exhaustive Listing:** For requests using non-standard prefixes or delimiters (not ending in `/`), the endpoint performs an "exhaustive listing." This filters object keys server-side to return results in the correct (decrypted) lexicographical order.

**Limitations:**
1.  **New Projects:** Projects created after **November 30, 2025**, cannot use exhaustive listing. Requests triggering this behavior will fail with a `501 Not Implemented` error.
2.  **Large Buckets:** Exhaustive listing does not work for buckets containing hundreds of thousands of objects.

Users requiring these features should use Storj Managed Encryption.

### Storj Managed Encryption
If your project uses **Storj Managed Encryption**, object keys are **encrypted using server-managed keys**. This allows the system to process object keys directly, ensuring that Storj's S3 listing endpoints are **fully S3-compatible**.

Requests can use arbitrary prefixes and/or delimiters. These requests utilize an optimized execution path, offering superior performance compared to Self-Managed Encryption. Storj recommends Storj Managed Encryption for all new projects requiring high performance and strict S3 compatibility.
