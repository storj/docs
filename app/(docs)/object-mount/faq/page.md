---
title: FAQs
docId: dd27e33c-7804-4e15-bdc5-941f9a1a7e12
metadata:
  title: Frequently Asked Questions
  description:
    Comprehensive resource to various FAQs covering topics related to Object Mount.
---
# What S3 permissions are recommended to mount a bucket with Object Mount?
Short answer, for a generic cloud: read, write, list permissions inside the bucket intended to be mounted.

# Does full permissions are required to achieve a maximum performance of Object Mount?
The maximum performance comes from cunoFS's ability to prefetch data based on how we handle certain file types. It is not dependent on being able to write the POSIX-metadata file. With read-only permissions to a bucket, cunoFS will still achieve a maximum performance - but it will not be able to update any POSIX-related metadata associated with the original files.

# Why my read-only credentials doesn't work with POSIX enabled in Object Mount?
The POSIX mode needs to write a hidden file at the root of the bucket that tracks all the POSIX permissions, etc. This is why the read-only use case works so long as you mount the bucket without POSIX enabled.

# How to mount all buckets with Object Mount?
In order for Object Mount to "see" the bucket to be mounted when adding new credentials into cunoFS, the AWS equivalent of ListAllMyBuckets is required. In the absence of ListAllMyBuckets, you can specify what bucket to mount by manually pairing the bucket.

# Where can I see logs of Object Mount on Windows?
Logs are available at `C:\Users\(your username)\AppData\Local\cunoFS\cunofs.log` - the default logging level is "error" so changing this to “access,trace" will provide much more verbose logs to better understand what is going on.

# Where can I see logs of Object Mount on macOS?
For MacOS the logs are located at:
`/Users/[username]/Library/Application Support/cunoFS/cunoFS.log`