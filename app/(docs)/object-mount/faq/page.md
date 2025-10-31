---
title: FAQs
weight: 7
docId: dd27e33c-7804-4e15-bdc5-941f9a1a7e12
metadata:
  title: Frequently Asked Questions
  description:
    Comprehensive resource to various FAQs covering topics related to Object Mount.
---
## What S3 permissions are recommended to mount a bucket with Object Mount?
Short answer, for a generic cloud: read, write, and list permissions for the bucket intended to be mounted.

## Are full permissions required to achieve maximum performance of Object Mount?
The maximum performance comes from Object Mount's ability to prefetch data based on how we handle certain file types. It is not dependent on being able to write the POSIX-metadata file. With read-only permissions to a bucket, Object Mount will still achieve maximum performance - but it will not be able to update any POSIX-related metadata associated with the original files.

## Why don't read-only credentials work with POSIX enabled in Object Mount?
The POSIX mode needs to write a hidden file at the root of the bucket that tracks all the POSIX permissions, etc. This is why the read-only use case works so long as you mount the bucket without POSIX enabled.

## How can I mount all buckets with Object Mount?
In order for Object Mount to "see" the bucket to be mounted when adding new credentials into Object Mount, the AWS equivalent of ListAllMyBuckets is required. In the absence of ListAllMyBuckets, you can specify what bucket to mount by manually pairing the bucket.

## Where can I see logs of Object Mount on Windows?
Logs are available at `C:\Users\%username%\AppData\Local\Object Mount\cunofs.log` - the default logging level is "error" so changing this to "access" or "trace" will provide more verbose logs to better understand what is going on.

## Where can I see logs of Object Mount on macOS?
For macOS the logs are located at `/Users/$USER/Library/Application Support/Object Mount/cunoFS.log`

## Where are the configs and license files located on Windows?
For Windows they are located in [where logs are stored](#where-can-i-see-logs-of-object-mount-on-windows): `C:\Users\%username%\AppData\Local\Object Mount\license` and the `config.json` file is in the same directory, here the mount/bucket information is kept

## Where configs and license files are located on macOS?
For macOS they are located in [where logs are stored](#where-can-i-see-logs-of-object-mount-on-mac-os): `/Users/$USER/Library/Application Support/Object Mount/license` and the `config.json` file is in the same directory, here the mount/bucket information is kept
