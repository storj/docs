---
title: 2.1 Core Concepts
docId: Xaegoh6iedietahf

metadata:
  title: Core Concepts
  description:
    The ideas presented here are intended to familiarise you with our approach to object storage.

weight: 0
---
The ideas presented here are intended to familiarise you with our approach to object storage. If you're already familiar, feel free to skip to the [next section](../getting-started/download-install).

## Characteristics of object storage

Object storage excels at high-throughput use-cases - usually in a "write-once-read-many" model. Object Mount, by itself, excels at unlocking the possible highest performance from object storage in many scenarios.

However, object storage technology significantly differs from conventional block and file storage solutions that POSIX applications typically expect. On object storage, file editing is typically slow and requires the file to be rewritten even for slight modifications. For this, Object Mount has some specific optimisations.

## Direct use of object storage

Object Mount is intended to enable the usage of object storage as "hot storage" or as "first-class" storage. Whilst it is possible to use Object Mount to stage data from object storage locally, then run the task, and then upload the result back to object storage - Object Mount' performance and POSIX-compliance mean that you can now just *run the task* directly on object storage.

Due to the "write-once-read-many" model of object storage, it does not always allow *efficient* partial modification in remote files or appending of new content. For many cases, our prediction engines, partial writes, client-side write-caching and other optimizations are enough to keep things running with great performance. For truly random, repeated writes our solution is {ref}`Object Mount Fusion <Object Mount-fusion-guide>`: combining the best of high-speed attached storage and object storage.

## Interception

When running in Direct Interception mode, Object Mount will insert itself between your applications and the operating system. It will dynamically redirect relevant filesystem calls made by the application through the API of your object storage solution. As a result, our mapping between file system concepts and object storage gives any application instant access to objects as files.

## What actually is Object Mount?

Object Mount is the common back-end system of both our Direct Interception and Object Mount Mount (a modified FUSE mount). It is an architecture and implementation for mapping POSIX file-system concepts to object storage concepts.

When the Object Mount CLI is used to launch a new shell, the primary purpose is to start a new shell (whether that's bash, zsh, or whatever else) with `LD_PRELOAD` set to point at `cuno.so`. There is no Object Mount shell binary - it only wraps existing shells with Object Mount pre-loaded.

As a result, any applications that can access file storage (including ones you’ve written yourself) are intercepted so that they can work with object storage as well. It intercepts any user binaries including those written in C/C++, Rust, Go, Java, Python, etc. It’s built to work everywhere. It works with dynamic binaries and static binaries. It works inside unprivileged containerised environments.

## What Object Mount does

- Provides any POSIX-compliant application high-speed access to object storage.
- Allows you to use filesystem operations to list, copy, move, add, remove, and modify files stored on object storage.
- Supports rich POSIX metadata including: users, groups, permissions, symbolic/hard links.
- Preserves POSIX consistency guarantees equivalent to NFS. ({ref}`Object Mount Fusion <Object Mount-fusion-guide>` can provide even stronger consistency guarantees if needed)

## What Object Mount does not do

- Change the representation of files on object storage. No lock-in: file data is stored in a single object, and is not modified. This means data can be accessed directly on the object storage, bypassing Object Mount.
- Affect the way that processes interact with non-cloud data.
- Provide consistency guarantees for objects accessed directly on the object store rather than through Object Mount.

