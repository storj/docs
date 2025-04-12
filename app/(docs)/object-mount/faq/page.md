---
title: FAQs
docId: dd27e33c-7804-4e15-bdc5-941f9a1a7e12
metadata:
  title: Frequently Asked Questions
  description:
    Comprehensive resource to various FAQs covering topics related to Object Mount.
---
## What S3 permissions are recommended to mount a bucket with Object Mount?
Short answer, for a generic cloud: read, write, list permissions inside the bucket intended to be mounted.

## Does full permissions are required to achieve a maximum performance of Object Mount?
The maximum performance comes from cunoFS's ability to prefetch data based on how we handle certain file types. It is not dependent on being able to write the POSIX-metadata file. With read-only permissions to a bucket, cunoFS will still achieve a maximum performance - but it will not be able to update any POSIX-related metadata associated with the original files.

## Why my read-only credentials doesn't work with POSIX enabled in Object Mount?
The POSIX mode needs to write a hidden file at the root of the bucket that tracks all the POSIX permissions, etc. This is why the read-only use case works so long as you mount the bucket without POSIX enabled.

## How to mount all buckets with Object Mount?
In order for Object Mount to "see" the bucket to be mounted when adding new credentials into cunoFS, the AWS equivalent of ListAllMyBuckets is required. In the absence of ListAllMyBuckets, you can specify what bucket to mount by manually pairing the bucket.

## Where can I see logs of Object Mount on Windows?
Logs are available at `C:\Users\%username%\AppData\Local\cunoFS\cunofs.log` (or `C:\Users\%username%\AppData\Local\Object Mount\cunofs.log` if you use the latest version of Object Mount) - the default logging level is "error" so changing this to "access,trace" will provide much more verbose logs to better understand what is going on.

## Where can I see logs of Object Mount on macOS?
For macOS the logs are located at:
`/Users/$USER/Library/Application Support/cunoFS/cunoFS.log` (or `/Users/$USER/Library/Application Support/Object Mount/cunoFS.log` if use the latest version of Object Mount)

## Where configs and license files are located on Windows?
For Windows they are located in the same place, to [where logs are stored](#where-can-i-see-logs-of-object-mount-on-windows): `C:\Users\%username%\AppData\Local\cunoFS\license` and the `config.json` file is in the same directory, here the mount/bucket information is kept, i.e. `C:\Users\%username%\AppData\Local\cunoFS\` (or `C:\Users\%username%\AppData\Local\Object Mount\` if you use the latest version of Object Mount)

## Where configs and license files are located on macOS?
For macOS they are located in the same place, to [where logs are stored](#where-can-i-see-logs-of-object-mount-on-mac-os): `/Users/$USER/Library/Application Support/cunoFS/license` and the `config.json` file is in the same directory, here the mount/bucket information is kept, i.e. `/Users/$USER/Library/Application Support/cunoFS/` (or `/Users/$USER/Library/Application Support/cunoFS/Object Mount/` if you use the latest version of Object Mount)
