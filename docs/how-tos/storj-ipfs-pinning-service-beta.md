---
description: Storj IPFS Pinning Service (Beta)
---

# Storj IPFS Pinning Service (Beta)

## Prerequisites

{% hint style="info" %}
You should have received an email that you have been invited to the beta which will include credentials to access the service. If you have not signed up yet, you can [Join the beta](https://landing.storj.io/permanently-pin-with-storj-dcs).
{% endhint %}

The Storj IPFS Pinning service consists of an HTTP endpoint for uploading and pinning content, and an IPFS Gateway that serves the pinned content over IPFS and HTTP. Details on smart contract pinning will be made available in the future.

## How to pin with Storj IPFS

All content uploaded to the Storj IPFS service via the HTTP endpoint below is pinned. Examples are given in curl, but could be done from any programming language or with existing IPFS client bindings for a given programming language, such as the  [IPFS HTTP Client library](https://www.npmjs.com/package/ipfs-http-client) for npm.

### HTTP Upload endpoint

Uploading content follows the [IPFS HTTP RPC for /api/v0/add](https://docs.ipfs.io/reference/http/api/#api-v0-add) with two small differences:

1. The only optional argument supported is `wrap-with-directory`&#x20;
2. You must specify the credentials given when invited to participate in the beta as _HTTP basic authentication._

{% hint style="warning" %}
_**This is not the same as your Storj DCS username and password. Do not use your Storj DCS username and password to try and use the IPFS Pinning Service.**_
{% endhint %}

#### Example using Curl&#x20;

For example, this is how it would work with curl and a file you wanted to pin called `/path/file.extension`. Please replace _**ipfs\_beta\_user**_ and _**ipfs\_beta\_password**_ with the beta credentials you received when accepted into the beta.

```
curl -u ipfs_beta_user:ipfs_beta_password -X POST -F file=@/path/file.extension https://www.storj-ipfs.com/api/v0/add
```

{% hint style="info" %}
The '`@`' before the file path is required for the upload to work properly. For example, if the file you wanted to upload was `/home/hello/hi.jpg`, the curl argument would be `file=@/home/hello/hi.jpg`.
{% endhint %}

## How to retrieve pinned Objects

Any content uploaded is automatically pinned and retrievable through any software that supports IPFS natively via its CID like [IPFS Desktop](https://github.com/ipfs/ipfs-desktop) or [IPFS CLI](https://docs.ipfs.io/how-to/command-line-quick-start/). Some browsers like [Brave](https://brave.com/ipfs-support/) include support, as well as some IPFS programs.

For those applications that do not support IPFS natively, you can use any [public IPFS gateway](https://docs.ipfs.io/concepts/ipfs-gateway/), or the Storj IPFS Gateway as described below.

### HTTP via Storj IPFS Gateway

For best performance, we have provided a Storj IPFS Gateway. This gateway will only host content pinned to Storj DCS, so it is not like other public IPFS gateways.

You can construct a link like this:

```
https://www.storj-ipfs.com/ipfs/<cid>
```

In cases where the gateway is unable to retrieve a given CID (e.g., returns a 404 not found error), please double check that you are using the correct CID and that it was uploaded to the Storj IPFS service.
