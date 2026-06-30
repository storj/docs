---
title: JuiceFS
docId: 000e734c-c211-43a3-8d8c-f4cc58a07c1f
tags:
  - file-management
metadata:
  title: Guide to Integrating JuiceFS with Storj
  description:
    Learn how to integrate Storj with JuiceFS, an open-source, high-performance distributed file system designed for the cloud.
---

## Introduction
[JuiceFS](https://github.com/juicedata/juicefs) is an open-source, high-performance distributed file system designed for the cloud, released under the Apache License 2.0. By providing full POSIX compatibility, it allows almost all kinds of object storage to be used as massive local disks and to be mounted and accessed on different hosts across platforms and regions.
See [more about JuiceFS](https://juicefs.com/docs/community/introduction/).

## Configuration of Object Storage to use Storj
The integration is implemented to use a native Storj protocol.

Storj provides a native Uplink integration. Use `storj` as the `--storage` option and generate a [Storj Access Grant](docId:XKib9SzjtEXTXWvdyYWX6).

1. Log in to the Satellite Console and follow the steps to [Create Access Grant](docId:_xWsamBjOsZYyu9xtQCm5#create-access-grant).
2. Pass the access grant via `--access-key` and the bucket name via `--bucket`:
```
juicefs format \
    --storage storj \
    --bucket <bucket-name> \
    --access-key <your-access-grant> \
    ... \
    myjfs
```

See other options in [JuiceFS documentation](https://juicefs.com/docs/community/command_reference).

{%callout type="info %}
Because encryption happens before upload and the keys never leave your client, Storj already provides the same protection that JuiceFS' own encryption would offer. Because of this, adding [JuiceFS encryption at rest](https://juicefs.com/docs/community/security/encryption/#enable-data-encryption-at-rest) using `--encrypt-rsa-key` on top would result in double-encrypting every block: first by JuiceFS (RSA key-wrap + AES) and then again by the uplink library (AES-GCM). The result is the same security, but with measurably higher CPU usage on every read and write. For more information, check [Storj encryption documentation](docId:yI4q9JDB3w01xEkFWA4_z).
{% /callout %}