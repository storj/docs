---
title: Advanced Guides
hideTitle: true
docId: GeWpcQTuVpL6d3wU
weight: 4
metadata:
  title: Feature Guides for Linus
  description:
    Details on unique features of Object Mount for Linux
hidden: false
---

# Feature Guide: Linux

Prominent Linux-specific Object Mount `cuno` commands and settings are detailed in the sections below.

Features that are global and apply to **all OS versions** of Object Mount (macOS, Windows, Linux) can be found in the [Global Features](#global-features) section below.


## General Help
For a complete listing of commands activate HELP

INSERT HELP INFO HERE x2


## Activating an Object Mount License Key

When you upgrade from an Object Mount **Free Trail** to a subscription, you will need to activate your new License Key.

Run the following command and follow the interactive steps:

   ```shell
   cuno creds activate
   ```



## browse publicly available data. 

In the following example, we use Object Mount to browse space telescope data hosted on the `stpubdata` Amazon S3 bucket:

Note that ``cuno run`` is a way to run a single command within a Object Mount context. Most of the time, and for interactive usage, we recommend starting a "wrapped" shell using the command ``cuno`` 

See the [Loading Object Mount](../getting-started/enabling-object-mount#direct-interception-with-object-mount-cli) section of this guide for more information, or the [equivalent section](../user-guides/basic#direct-interception-with-object-mount-cli) from the full user guide for extra detail.


   ```shell
   # terminal
   cuno run sh -c "ls s3://stpubdata/"
   galex  hst  jwst  k2  kepler  panstarrs  tess
   ```
   ```shell
   # terminal
   cuno run sh -c "ls s3://stpubdata/tess/public/*"
   's3://stpubdata/tess/public/ffi':
   s0001  s0005  s0009  s0013  s0017  s0021  s0025  s0029 ... [truncated]
   's3://stpubdata/tess/public/mast':
   tess-s0001-1-1-cube.fits  tess-s0012-1-4-cube.fits  tess-s0023-2-3-cube.fits ... [truncated]
   ... [truncated]
   ```





## Global Features






