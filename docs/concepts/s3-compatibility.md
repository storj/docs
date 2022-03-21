---
description: An Overview of S3 API and compatibility feature-set
---

# S3 Compatibility

The Storj DCS S3-compatible Gateway supports a RESTful API that is compatible with the basic data access model of the [Amazon S3 API](http://docs.aws.amazon.com/AmazonS3/latest/API/APIRest.html).

The Storj DCS S3 Gateway is well-suited for many application architectures, but the S3 standard was designed for centralized storage and there are a few areas where a decentralized architecture requires a different approach.

Storj DCS offers two options for S3 compatibility: [GatewayMT, a hosted S3-compatible service](../api-reference/s3-compatible-gateway/) and [GatewayST, a self-hosted S3-compatible binary](../api-reference/s3-gateway/) to run your own endpoint (see [the compatibility table for GatewayST in our GitHub repo](https://github.com/storj/gateway-st/blob/main/docs/s3-compatibility.md)).

## When to use GatewayMT

If you have an existing application that is using an S3-compatible object storage service and you want to switch to Storj DCS, the easiest way to switch is to use the hosted S3-compatible service. The main design decision you need to be aware of is that [GatewayMT uses server-side encryption](encryption-key/design-decision-server-side-encryption.md). You can learn about the supported commands and endpoints for S3 compatibility under the SDK & Reference section for the [S3 compatible gateway](../api-reference/s3-compatible-gateway/).&#x20;

## When to use GatewayST

If you have an hybrid cloud architecture, are working with on-premise data, or have other needs to host your own S3-compatible object storage service you may want to use the self-hosted GatewayST. The two main design decisions you need to be aware of are that:

1. &#x20;GatewayST uses [end-to-end encryption](encryption-key/design-decision-end-to-end-encryption.md).&#x20;
2. When you host your own Gateway, that gateway is handling the erasure coding and direct peer-to-peer transfer of data to storage nodes. You will need to account for the upstream bandwidth associated with the [expansion factor related to erasure coding](file-redundancy.md) the data and any associated overhead related to concurrent connections with storage nodes related to parallel transfers.

You can learn about the supported commands and endpoints for S3 compatibility under the SDK & Reference section for the [S3 compatible gateway](../api-reference/s3-compatible-gateway/).&#x20;
