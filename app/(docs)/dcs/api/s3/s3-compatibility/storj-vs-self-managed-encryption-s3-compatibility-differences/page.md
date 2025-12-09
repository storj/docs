---
title: Storj Managed vs. Self-Managed Encryption S3-Compatibility Differences
docId: oozaauQueuq9hgeac4Ze
weight: 1
---

## Listing Endpoints Behavior

The behavior of listing endpoints depends on the encryption model configured for your project.

### Self-Managed Encryption
When using **Self-Managed Encryption**, bucket paths are end-to-end encrypted. This prevents the listing endpoint from seeing the plaintext paths, which affects sorting and filtering.

* **Standard Listing:** For requests using a forward-slash (`/`) as a prefix terminator or delimiter, results are returned in the lexicographical order of the *encrypted* paths. This often differs from the expected alphabetical order of the decrypted keys. Clients should not rely on ordering in these cases.
* **Exhaustive Listing:** For requests using non-standard prefixes or delimiters (not ending in `/`), the endpoint performs an "exhaustive listing." This filters paths server-side to return results in the correct (decrypted) lexicographical order.

**Limitations:**
1.  **New Projects:** Projects created after **November 30, 2025**, cannot use exhaustive listing. Requests triggering this behavior will fail with a `501 Not Implemented` error.
2.  **Large Buckets:** Exhaustive listing does not work for buckets containing hundreds of thousands of objects.

Users requiring these features should use Storj Managed Encryption.

### Storj Managed Encryption
If your project uses **Storj Managed Encryption**, bucket paths are stored in plaintext. This ensures that Storj's S3 listing endpoints are **fully S3-compatible**.

Requests can use arbitrary prefixes and/or delimiters. These requests utilize an optimized execution path, offering superior performance compared to Self-Managed Encryption. Storj recommends Storj Managed Encryption for all new projects requiring high performance and strict S3 compatibility.
