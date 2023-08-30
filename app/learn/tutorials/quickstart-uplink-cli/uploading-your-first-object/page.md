---
title: Uploading Your First Object CLI
docId: R8xZNlt1dr3nZzo-_ZQLx
redirects:
  - /dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object
weight: 0
---

Install and configure the CLI and follow the steps below to upload your first object to Storj DCS.

{% callout type="success"  %}
Every time you upload a file, the Storj DCS CLI will do all the heavy lifting - encrypt the data using [](docId:Pksf8d0TCLY2tBgXeT18d) (including path and metadata), break large files into 64MB Segments (or for smaller files into a single segment), then erasure code the segments, breaking each segment into 80 pieces, then distributing those pieces over our network of thousands of independently operated storage nodes. All of that happens in the background with a simple `cp` command.
{% /callout %}

- [](docId:b4-QgUOxVHDHSIWpAf3hG)
- [](docId:h3RyJymEIi4gf2S9wVJg8)
- [](docId:OJPnxiexQIXHmzGBkvzHc)
- [](docId:gh5RtIDbMkAoomljO7f8d)
- [](docId:-v_wZieO-SN4FiEn3mmFU)
