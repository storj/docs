---
title: S3 Compatibility
createdAt: 2022-05-19T22:24:55.000Z
updatedAt: 2023-03-03T08:30:09.000Z
docId: eEZ6hkJK6U7J7SyVwV5Th
redirects:
  - /dcs/concepts/s3-compatibility
---

The Storj DCS S3-compatible Gateway supports a RESTful API that is compatible with the basic data access model of the [Amazon S3 API](http://docs.aws.amazon.com/AmazonS3/latest/API/APIRest.html).

The Storj DCS S3 Gateway is well-suited for many application architectures, but the S3 standard was designed for centralized storage and there are a few areas where a decentralized architecture requires a different approach.

Storj DCS offers two options for S3 compatibility:

1.  [](docId\:yYCzPT8HHcbEZZMvfoCFa): Storj hosted S3 Compatible Service

2.  [](docId\:EGM8O-1xt2Az03eBWT8Rf): Self-hosted S3 Compatible Binary (run your own S3 endpoint)

The latest compatibility can be found in [the compatibility table for GatewayST in our GitHub repo](https://github.com/storj/gateway-st/blob/main/docs/s3-compatibility.md).

## When to use GatewayMT

If you have an existing application that is using an S3-compatible object storage service and you want to switch to Storj DCS, the easiest way to switch is to use the hosted S3-compatible service. The main design decision you need to be aware of is that Gateway-MT uses [](docId\:hf2uumViqYvS1oq8TYbeW). You can learn about the supported commands and endpoints for S3 compatibility under the SDK & Reference section for the [](docId\:yYCzPT8HHcbEZZMvfoCFa).&#x20;

## When to use GatewayST

If you have an hybrid cloud architecture, are working with on-premise data, or have other needs to host your own S3-compatible object storage service you may want to use the self-hosted GatewayST. The two main design decisions you need to be aware of are that:

1.  GatewayST uses [](docId\:Pksf8d0TCLY2tBgXeT18d).

2.  When you host your own Gateway, that gateway is handling the erasure coding and direct peer-to-peer transfer of data to storage nodes. You will need to account for the upstream bandwidth associated with the [](docId\:CBMEVO2vA2lDZ_BVuZ9aP) the data and any associated overhead related to concurrent connections with storage nodes related to parallel transfers.

You can learn about the supported commands and endpoints for S3 compatibility under the SDK & Reference section for the [](docId\:yYCzPT8HHcbEZZMvfoCFa).

