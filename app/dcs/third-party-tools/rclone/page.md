---
title: Rclone
tags:
  - large-file
docId: LdrqSoECrAyE_LQMvj3aF
redirects:
  - /dcs/how-tos/sync-files-with-rclone
metadata:
  title: Getting Started with Rclone Configuration
  description:
    A beginner's guide to setting up and using Rclone with Storj, including
    different integration patterns for optimized performance and security.
---

## Introduction

These 'Getting Starting' tutorials will showcase the process for configuring [Rclone](https://rclone.org) with Storj DCS. We will cover only some of the basic features in this guide.

To make the most of Rclone, look at the complete Rclone [command reference](https://rclone.org/commands/).

{% callout type="danger"  %}
These guides are experimental. The main functionality appears to work, but there are expected to be undiscovered issues (including issues around connection timeouts). Please report any issues you may run into on this [forum thread](https://forum.storj.io/t/two-more-tech-previews-rclone-and-restic/6072).
{% /callout %}

You will need one of the following:

- [](docId:Ch4vLynsEqyT2-3qDEBiy) that someone else shared with you, or

- [](docId:OXSINcFRuVMBacPvswwNU) (access token) of a Storj DCS project you are a member of.

## Selecting an Integration Pattern

## Native

Use our native integration pattern to take advantage of client-side encryption as well as to achieve the best possible download performance. Uploads will be erasure-coded [](docId:Pksf8d0TCLY2tBgXeT18d), thus a 1GB upload will result in 2.68GB of data being uploaded to storage nodes across the network.

### Use this pattern for

- The strongest security

- The best download speed

{% quick-links %}
{% quick-link %}
[](docId:Mk51zylAE6xmqP7jUYAuX)
{% /quick-link %}
{% /quick-links %}

### Hosted Gateway

Use our S3 compatible Hosted Gateway integration pattern to increase upload performance and reduce the load on your systems and network. Uploads will be encrypted and erasure-coded [](docId:hf2uumViqYvS1oq8TYbeW), thus, a 1GB upload will result in only 1GB of data being uploaded to the Hosted Gateway.

### Use this pattern for

- Reduced upload time

- Reduction in network load

{% callout type="info"  %}
By selecting this integration pattern, you are opting in to server-side encryption.
{% /callout %}

{% quick-links %}
{% quick-link %}
[](docId:WayQo-4CZXkITaHiGeQF_)
{% /quick-link %}
{% /quick-links %}
