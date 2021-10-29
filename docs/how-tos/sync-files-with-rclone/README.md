---
description: Rclone is a command line program to sync files and directories
---

# Sync Files With Rclone

These 'Getting Starting' tutorials will showcase the process for configuring [Rclone](https://rclone.org) with Storj DCS. We will cover only some of the basic features in this guide.

&#x20;For making the most of Rclone, take a look at the complete Rclone [command reference](https://rclone.org/commands/)

{% hint style="danger" %}
These guides are experimental. The main functionality appears to work, but there are expected to be undiscovered issues (including issues around connection timeouts). Please report any issues you may run into on this [forum thread](https://forum.storj.io/t/two-more-tech-previews-rclone-and-restic/6072).
{% endhint %}

You will need one of the following:

* [Access Grant](../../getting-started/quickstart-uplink-cli/sharing-your-first-object/generate-access.md) that someone else shared with you, or
* [API Key](../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md) ([Access token](../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md)) of a Storj DCS project you are a member of.

## Selecting an Integration Pattern

### Native

Use our native integration pattern to take advantage of client-side encryption as well as to achieve the best possible download performance. Uploads will be erasure-coded locally, thus a 1gb upload will result in 2.68gb of data being uploaded to storage nodes across the network.&#x20;

#### Use this pattern for

* The strongest security
* The best download speed

{% content-ref url="rclone-with-native-integration.md" %}
[rclone-with-native-integration.md](rclone-with-native-integration.md)
{% endcontent-ref %}

### Hosted Gateway

Use our S3 compatible Hosted Gateway integration pattern to increase upload performance and reduce the load on your systems and network. Uploads will be encrypted and erasure-coded server-side, thus a 1GB upload will result in only in 1GB of data being uploaded to storage nodes across the network.

#### Use this pattern for

* Reduced upload time
* Reduction in network load

{% hint style="info" %}
By selecting this integration pattern you are opting in to server-side encryption.
{% endhint %}

{% content-ref url="rclone-with-hosted-gateway.md" %}
[rclone-with-hosted-gateway.md](rclone-with-hosted-gateway.md)
{% endcontent-ref %}

