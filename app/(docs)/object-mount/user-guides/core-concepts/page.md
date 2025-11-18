---
title: Core Concepts
hideTitle: false
docId: xzAqS9Um7xjQSbmD
weight: 1
redirects:
  - /object-mount/linux/user-guides/core-concepts
metadata:
  title: Core Concepts
  description:
    Core concepts of Object Mount.
hidden: false
---

## Characteristics of Object Storage

Object storage excels at high-throughput use-cases and is often considered best for “write-once, read-many” models. 

Direct file editing with object storage is traditionally seen as too slow and often requires gateways, proprietary translations, and each file often needs to be completely rewritten &mdash; even for the slightest modification.

Additionally, object storage technology differs significantly from the conventional block-and-file I/O calls used by local drives and network-attached solutions &mdash; especially for applications that expect strict POSIX compliance.

Storj’s Object Mount solves these shortcomings, redirecting and translating file access calls, simplifying cloud storage implementations, and delivering the highest possible performance from your object storage. POSIX compliance and unique optimizations ensure compatibility and improve performance enabling fast editing and file access directly from the cloud.


## Direct Use of Object Storage

Object Mount enables the use of object storage as “hot storage” or as “first-class” storage.

Prior to Object Mount, content workflows required you to “pre-stage” your files by copying content from the cloud down to local, faster drives. You would then run your tasks locally. When finished, you re-uploaded the resulting content back up to object storage to share with your team.

Object Mount’s elegant simplicity and improved performance means you can now run your tasks _directly_ on your files in object storage &mdash; just mount and go.

Object Mount overcomes the traditional inefficiencies of direct access to object storage by using prediction engines, partial writes, client-side write-caching and other optimizations to achieve much higher performance. Use your cloud storage like it was local storage.


## Read/Write Interception

Once installed, Object Mount transparently inserts itself between your applications and your host operating system. Object Mount dynamically detects and intercepts relevant file and system calls made by your application and redirects those requests to your object storage provider. This is called **Direct Interception**.

Direct Interception also facilitates the translation of your application’s standard file system calls (reads and writes) into the appropriate object storage API calls.

This enables _any_ application to instantly access cloud objects as if they were local files &mdash; no code changes or workflow alterations required. Object Mount intercepts file commands from _any_ application, binary or EXE, including those you’ve written yourself. It even works inside unprivileged containerized environments like Docker and virtual environments such as Hyper-V and Virtualbox.


## What Object Mount Does

- Provides applications high-speed access to object storage content as if it were a local drive
- Allows standard file system operations to list, copy, move, add, remove, and modify files directly on object storage
- Supports rich POSIX metadata including: users, groups, permissions, symbolic & hard links
- Preserves NFS-equivalent POSIX consistency guarantees


## What Object Mount Does _Not_ Do

- Object Mount does _not_ interfere with how applications interact with local drives and any other non-S3 object data
- Object Mount does _not_ alter or change the representation of your files on object storage &mdash; file data is not modified. This means your content can be accessed directly from your object storage tools and dashboards, bypassing Object Mount at any time.

  _**Note:** Content accessed_ directly _on your object storage (rather than through Object Mount) bypasses Object Mount’s consistency guarantees._
