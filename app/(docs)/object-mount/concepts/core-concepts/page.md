---
title: Core Concepts
hideTitle: false
docId: xzAqS9Um7xjQSbmD
weight: 1
metadata:
  title: Core Concepts
  description:
    Core concepts of Object Mount.
hidden: false
---

The pages in this **Concepts & Technical Details** section provide a background and primer on how object storage works and how it differs from local storage.

The primary use case for object storage and the challenges that arise when trying to use cloud storage as an extension of local storage are covered.

We then discuss how the unique features of Storj’s Object Mount are used to overcome those challenges and limitations.

Then we provide a detailed look at POSIX mode: what it means, and how it can be used within the Object Mount environment.

Lastly, we describe the steps to obtain the cloud storage credentials you will need when configuring Object Mount.


## Characteristics of Object Storage

Object storage excels at high-throughput use-cases and is often considered best for “write-once-read-many” models. 

Direct file editing with object storage is traditionally seen as too slow and normally requires gateways, proprietary translations, and each file often needs to be completely rewritten &mdash; even for slight modifications.

Additionally, object storage technology differs significantly from conventional block-and-file storage solutions; especially for applications that expect strict POSIX compliance.

Storj’s Object Mount solves these shortcomings, unlocking the highest possible performance from object storage, providing POSIX compliance, and employing unique optimizations to improve performance for direct file editing and access.


## Direct Use of Object Storage

Object Mount enables the usage of object storage as “hot storage” or as “first-class” storage.

Prior to Object Mount, content workflows required you to “pre-stage” your files by copying your content from object storage down to local drives. You would then run your tasks locally. When finished, you uploaded the resulting content back up to object storage. 

Object Mount’s improved performance means you can now just run your tasks _directly_ on your files in object storage &mdash; just mount and go.

Object Mount overcomes the traditional inefficiencies of direct access to object storage by using prediction engines, partial writes, client-side write-caching and other optimizations to achieve much higher performance.

{% callout type="info" %}
For those with truly random workflows involving repeated write operations, consider Storj’s <<NEED LINK>> **Object Mount Fusion**, which combines the best of high-speed attached storage plus the convenience of direct object storage access.
{% /callout %}


## Direct Interception

Once installed, Object Mount transparently inserts itself between your applications and your host operating system. Object Mount will dynamically detect and intercept relevant file system calls made by your application and will redirect those requests to your object storage provider. This is called **Direct Interception** mode.

Direct Interception mode also facilitates the translation of your application’s standard file system calls (reads and writes) into the appropriate object storage API calls.

This enables _any_ application to instantly access cloud objects as if they were local files &mdash; no code changes or workflow alterations required. Object Mount intercepts file commands from any application, binary or EXE, including those you’ve written yourself. It even works inside unprivileged containerized environments like Docker and other virtual environments such as Hyper-V and Virtualbox.


## What Object Mount Does

- Provides applications high-speed access to object storage content as a local drive.
- Allows standard file system operations to list, copy, move, add, remove, and modify files directly on object storage.
- Supports rich POSIX metadata including: users, groups, permissions, symbolic & hard links.
- Preserves NFS-equivalent POSIX consistency guarantees. (<<LINK>>**Object Mount Fusion** can provide even stronger consistency guarantees, if needed).


## What Object Mount Does _Not_ Do

- Affect the way that application interact with non-cloud data.
- Alter or change the representation of files on object storage. File data is stored in a single object, and is not modified. This means your data can be accessed directly from your object storage tools and dashboards, bypassing Object Mount at any time.
  - Note: Objects accessed _directly_ on your object storage (rather than through Object Mount) bypasses Object Mount’s consistency guarantees.
