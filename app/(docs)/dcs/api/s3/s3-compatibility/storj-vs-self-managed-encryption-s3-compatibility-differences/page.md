---
title: Storj Managed vs. Self-Managed Encryption S3-Compatibility Differences
docId: oozaauQueuq9hgeac4Ze
weight: 1
---

## Listing endpoints behavior

If your project is using Self-Managed Encryption, a bucket's paths are
end-to-end encrypted, which means that it's impossible to always list a
bucket in lexicographical order (as per S3 specification). For requests
that come with forward-slash-terminated prefix and/or forward-slash
delimiter, listing endpoints return results in lexicographical order,
but for encrypted paths (which is often very different from the expected
order for decrypted paths). Ideally, clients shouldn't care about
ordering in those cases. For requests that come with
non-forward-slash-terminated prefix and/or non-forward-slash delimiter,
listing endpoints perform exhaustive listing, which filters paths
server-side before they are returned to the caller. In this case,
listing results are in lexicographical order.

Projects using Self-Managed Encryption created after November 30, 2025
are excluded from the usage of arbitrary prefixes and/or delimiters to
perform exhaustive listing. Such requests will immediately be rejected
by the listing endpoints with the 501 Not Implemented S3-compatible HTTP
error code. Users who need to create new projects utilizing exhaustive
listing are encouraged to create projects using Storj Managed
Encryption.

Exhaustive listing won't work for buckets containing hundreds of
thousands of objects. Users who need to perform exhaustive listing with
such buckets are encouraged to start utilizing projects using Storj
Managed Encryption.

### Storj Managed Encryption

If your project is using Storj Managed Encryption, a bucket's paths are
kept in plaintext. This means that the behavior of Storj's S3 listing
endpoints is fully S3-compatible. Requests can come with an arbitrary
prefix and/or delimiter and they will take a preferable execution path,
resulting in superior listing times compared to listing over buckets in
any projects using Self-Managed Encryption. Storj recommends all new
projects to be projects using Storj Managed Encryption for users that
care about S3-compatibility, robustness, and performance.
