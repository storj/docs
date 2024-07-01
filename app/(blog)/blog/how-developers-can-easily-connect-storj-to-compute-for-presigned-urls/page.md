---
author:
  name: Bill Thorp
date: '2023-03-20 00:00:00'
heroimage: ./5197073b00a85cfc.jpeg
layout: blog
metadata:
  description: "Storj provides a variety of ways to access and secure your content.\
    \ We built a fantastic security model based on \u201Cmacaroons\u201D, likenable\
    \ to an API key you can further restrict and then share. We have expanded upon\
    \ that security model to support public sharing files via the web in our Link\
    \ Sharing service. Additionally, we offer S3-compatible services, including support\
    \ for S3-style presigned URLs."
  title: How developers can easily connect Storj to compute for presigned URLs
title: How developers can easily connect Storj to compute for presigned URLs

---

Storj provides a variety of ways to access and secure your content. We built a fantastic [security model](https://www.storj.io/blog/secure-access-control-in-the-decentralized-cloud) based on “[macaroons](https://research.google/pubs/pub41892/)”, likenable to an API key you can further [restrict](https://docs.storj.io/dcs/concepts/access/access-grants/api-key/restriction) and then share.  We have expanded upon that security model to support public sharing files via the web in our [Link Sharing service](https://docs.storj.io/dcs/api-reference/linksharing-service/).  Additionally, we offer [S3-compatible services](https://docs.storj.io/dcs/api-reference/s3-compatible-gateway), including support for S3-style [presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html).  
‍

Most applications will need some secure, server-side logic to enforce access-control.  Usually, though, the “goldilocks size” for infrastructure is *as little as possible*.  A minimum viable security solution would do well to be stateless. Presigned URLs work well here because they are inherently time limited, and thus not typically tracked.

## What can you do with Storj plus presigned posts?

‍

Any developer building an application that needs compute, but wants to use Storj’s extremely secure cloud object storage can find value in setting up presigned posts. This functionality allows for Storj to be used in conjunction with compute services of other providers in order to securely grant permission for users to post content into the cloud or get content from the cloud.

‍

For example, a real estate company that has an application for its real estate agents to upload pictures of houses, but needs these uploads to be done via a specific presigned urls that matches the agent and the listing would be a great candidate for this functionality.

‍

More advanced features that could be built upon this core include:

* Rate limiting for cost control reasons
* Persisting of per-user credentials into a database
* Time-locking writability of backups, deterring ransomware
* Deriving Storj access grants, rather than presigning URLs
* Presigning URLs within templates, such as HLS video M3U8 files

‍

Fundamentally, Storj has supplied a friendly framework to enable people to build more complicated applications on top of Storj in the most cost effective way possible.

‍

## How to connect Storj’s stateless authentication via presigned URLs to compute

‍

Stateless authentication via presigned URLs pairs well with cost-efficient, serverless computing services. The videos below provide instructions for two such services: [AWS’s Lambda](https://aws.amazon.com/lambda/) and [Google’s Cloud Functions](https://cloud.google.com/functions). These serverless endpoints act to hide underlying credentials from prying eyes. They can be disabled as an “off switch” for data access. Finally, the underlying credentials can easily be swapped out for regular credential rotations or due to compromise.

‍

*Want step-by-step written instructions? See Storj Docs* <https://docs.storj.io/dcs/presigned-urls-in-the-serverless-cloud>

‍

## Storj fits well in your multi-cloud environment

‍

If you are trying to build an application, we know you need more than storage. That’s why we work hard to provide the resources and enablement developer’s need to completely understand the Storj solution and to make it work for them. And that means helping you take advantage of the cost effective and secure storage with Storj.

‍

