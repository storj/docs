---
title: Configure Object Mount
docId: hoeSh4ieSh6Ees9v
weight: 3
metadata:
  title: Configure Object Mount
  description:
    Each time you set up Object Mount in a new compute environment, you will need to assess the requirements of your workloads and your end goals.
---
## Overview

Each time you set up Object Mount in a new compute environment, you will need to assess the requirements of your workloads and your end goals.

By default, Object Mount is configured for core object storage access in a LAN setting. If you have one of the following specialized use cases, follow the relevant quick start guide:

- High-performance attached storage upgrade (EFS upgrade): [Object Mount Fusion](../getting-started/object-mount-fusion)
- Strict POSIX-controlled access to object storage: [Enforced Posix Access](../getting-started/enforced-posix-access)

### Which mode is for me?

When configuring Object Mount, it is important to understand the needs of the tools and workloads you wish to run. 
There are many configuration options which can be reviewed in our user guide as well in the `cuno help` pages. You can change your settings for each workflow/tool, or you can set some options on the bucket-level to impose a usage mode for all users.

There are two independent aspects you need to consider when configuring Object Mount:

- The requirements of your tools in order to work *correctly*.
- The needs of your tools in different environments to work *efficiently*.

For **correct operation**, you need to know what level of POSIX compatibility your tools require to function. 
For **efficient operation** your primary concerns are the bandwidth/latency between the compute and object storage resources, as well as the behaviours of your tools.

## Correct operation - Levels of POSIX compatibility

Some applications have limited requirements from a POSIX perspective and only needs the filesystem for basic operations like renaming, reading, or writing new data. 
Other applications may require a fully POSIX compatible interface, which requires additional work from the compatibility layer. Because full compatibility requires extra metadata to be written to object storage, and may slightly affect performance we make this optional.

The main levels of POSIX compatibility are:

- [Core File Access](#core-file-access) - no users/groups/symlinks/hardlinks/permissions control/file modes
- [POSIX File Access](#posix-file-access) - POSIX-compatible access with users/groups/symlinks/hardlinks/permission control/file modes
- [POSIX Enforced File Access](#posix-enforced-file-access) - as above but POSIX access control is enforced

{% callout type="note"  %}
How to check if you need POSIX File Access

- Check the outputs correspond to the same workload when run on the local file system. If there are randomised elements to workload (such as sampling in machine learning use cases), then the seeds need to be fixed to make such a comparison.
- If the application running under Object Mount with Core File Access fails with `(134) ENOTSUP` (not supported) or `Operation not permitted` then it is likely that POSIX File Access needs to be enabled.
{% /callout %}

### Core File Access

Objects as files, files as objects; this is the **default mode**. Does not support the persistence or modification of POSIX users, groups, symlinks, hard links, permissions control or file modes attributes on objects.

- Use this when you don’t have any metadata requirements and your tools don't need any POSIX metadata persistence to function correctly.
- Use this when you don't have any write access to the bucket in question, or you do not want to create any Object Mount-internal objects there.

#### Example use-cases

- Use this when interacting with data you already have on object storage and only require access to the names and data of those objects. For example, if you have machine learning datasets in the cloud and you have previously configured your libraries to read them directly from object storage.

#### How to enable

This is the default mode.

### POSIX File Access

This mode will maintain POSIX metadata for your objects, but it won't enforce any permissions or modes set on the objects. That means any user can use Object Mount to read or write any file that their object storage credentials give them access to.

See [enforced posix](../installation/enforced-posix).

#### Example use-cases

- Use this when your applications are dependent on the preservation of POSIX metadata (owner/group permissions, change/modify times, etc.) or POSIX “links” (symlinks or hardlinks).
- Use this if you’re moving workflows from POSIX to object storage, such as workloads that were previously run on EC2 with EFS.

{% callout type="note"  %}
We don't currently support POSIX ACLs or extended attributes on the cloud. Please get in contact with us via our [help desk](https://supportdcs.storj.io/hc/en-us/requests/new) if you need these features.
{% /callout %}

#### How to enable

There are two main ways to enable this. If the object storage provider supports setting tags at the bucket level, then POSIX compatibility mode can be enabled using the command `cuno creds setposix s3://yourbucket true`. This will affect everyone using the bucket and force all Object Mount users of that bucket into POSIX compatability mode. Otherwise it can be enabled manually by a user setting the environment variable `export CUNO_POSIX=1` (valid per-session).

### POSIX Enforced File Access

See [enforced posix](../installation/enforced-posix)

#### Example use-cases

- Host a website using NGINX (or other server technologies) entirely backed by object storage, without any attached storage device (such as EFS). This mode lets you do this while controlling which files/directories the NGINX process (as the `nginx` user) can access.
- Host an organisation's user filesystem in the cloud.

{% callout type="note"  %}
We don't currently support POSIX ACLs or extended attributes on the cloud. Please get in contact with us at our [help desk](https://supportdcs.storj.io/hc/en-us/requests/new) if you need these features.
{% /callout %}

#### How to enable

Please refer to the getting started [guide](../getting-started/enforced-posix-access).

## Efficient operation in your environments

### Where is the client?

#### Accessing object storage from within the same high-speed network

If the client is in the same high-speed network as the object storage system, the connection is considered *LAN* (local-area network) access. Examples include:

- The client is a cloud-hosted EC2 instance / virtual machine within the same **region** as the cloud data.
- The client is in the same LAN network as an on-premises object storage cluster and has a high-speed, low-latency connection linking the client to the storage.

If this is the case, consider what the tools behaviours are:

- If the workload requires *both* high IOPS (such as database operations), and high throughput, consider using [Object Mount Fusion](../getting-started/object-mount-fusion): combining the best of high-speed attached storage and object storage.
- Otherwise, no additional configuration is necessary.

#### Accessing object storage from remote networks

If the client is outside the network of the object storage system, the connection is considered *WAN* (wide-area network). Examples include:

- Accessing buckets from a cloud-hosted EC2 instance / virtual machine in a *different* region to the bucket being accessed.
- A home computer accessing cloud-hosted object storage.
- Accessing cloud storage of a different cloud provider.

If this is the case, consider:

- If the client needs to repeatedly read the same parts of a file, consider using client-side caching on a fast local disk.

{% callout type="note"  %}
Client-side caching on disk for workloads requiring many reads of the same data, such as video editing, is coming soon. Be the first to find out about it by signing up to our mailing list on our [website](https://storj.io) or by emailing us directly at [info@storj.io](mailto:info@storj.io).
{% /callout %}
