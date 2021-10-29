---
description: Uploading your first object using the Uplink CLI Tool
---

# Uploading Your First Object CLI

Install and configure the CLI and follow the steps below to upload your first object to Storj DCS.

{% hint style="success" %}
Every time you upload a file, the Storj DCS CLI will do all the heavy lifting - encrypt the data using [end-to-end encryption](../../../concepts/encryption-key/design-decision-end-to-end-encryption.md) (including path and metadata), break large files into 64MB Segments (or for smaller files into a single segment), then erasure code the segments, breaking each segment into 80 pieces, then distributing those pieces over our network of thousands of independently operated storage nodes. All of that happens in the background with a simple `cp` command.
{% endhint %}

{% content-ref url="../prerequisites.md" %}
[prerequisites.md](../prerequisites.md)
{% endcontent-ref %}

{% content-ref url="create-first-access-grant.md" %}
[create-first-access-grant.md](create-first-access-grant.md)
{% endcontent-ref %}

{% content-ref url="set-up-uplink-cli.md" %}
[set-up-uplink-cli.md](set-up-uplink-cli.md)
{% endcontent-ref %}

{% content-ref url="create-a-bucket.md" %}
[create-a-bucket.md](create-a-bucket.md)
{% endcontent-ref %}

{% content-ref url="upload-an-object.md" %}
[upload-an-object.md](upload-an-object.md)
{% endcontent-ref %}

{% content-ref url="view-distribution-of-an-object.md" %}
[view-distribution-of-an-object.md](view-distribution-of-an-object.md)
{% endcontent-ref %}
