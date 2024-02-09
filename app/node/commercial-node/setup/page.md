---
title: Setup
docId: ohngie2AhcuiX1ce
weight: 5
metadata:
  title: Setting Up Commercial Storage Nodes
  description:
    Guide for Cloud Operations Engineers on how to set up commercial storage
    nodes with Storj including prerequisites and node acceptance.
---

This guide is tailored for Cloud Operations Engineers who manage multiple racked servers, data centers, and enterprise-grade facilities and wish to run [Commercial Storage Nodes](docId:eisoh4oa2uRaac1n).

Please note that joining the Commercial Storage Node Operator Program is a prerequisite for this setup.

{% callout type="danger" %}

This guide is for Commerical Storage Nodes, if you're looking to join the public network follow [](docId:kjMiGo7HTr4v_qwD5Iqc7) instead.

{% /callout %}

## Prerequisites

- Admitted into the Commercial Storage Node Operator Program ([request to join the program](https://www.storj.io/partners/commercial-nodes))
- Understand the [difference between Public and Commercial Storage Nodes](docId:eisoh4oa2uRaac1n#how-does-it-compare-to-the-public-network)

## Setup

A commercial Storage Node runs the same software as a public Storage Node, but is not subject to the same restrictions.

Run one Storage Node per hard drive.

{% callout type="note" %}
If you have a virtualized environment, try to target the nodes size to be similar to the average drive size underlying that virtualized environment. So if the infrastructure is mostly on 10 TB HDD then set the node size to be 10 TB.
{% /callout %}

Follow Steps 1 through 6 in the [Storage Node setup guide](docId:kjMiGo7HTr4v_qwD5Iqc7) for each Commercial Storage Node:

[](docId:hbCGTv1ZLLR2-kpSaGEXw)

[](docId:v-fUvPqySvUwTMF-od6hD)

For Step 2, if you require a significant number of authorization tokens, please reach out to your contact for assistance.

[](docId:y0jltT-HzKPmDefi532sd)

[](docId:owZeAc56KSDnUzDhsBfB8)

[](docId:aT6VAB297OWLd4vqeXxf5)

[](docId:XC--4Jtp1o309gbWFOHPn)

For step 6, Commercial Storage Nodes require additional environment variables

```yaml
STORJ_STORAGE2_TRUST_SOURCES="https://www.storj.io/trusted-satellites-soc2"
WALLET="0x0000000000000000000000000000000000000000"
```

## Multi Storage node per host

Since it's recommended to run one Storage Node per drive a [sample ansible configuration](docId:aiwee4RieY4cooMa) is provided for some ideas on how to manage the nodes. Metrics for the Storage nodes can also be setup by following [the node dashboard guide](docId:eCupaiZizohpah7I).

## Auto updating

To ensure optimal functionality and security, it's mandatory to update your nodes to at least the minimum required version (usually updates every 2 to 3 weeks). We recommend utilizing the built-in auto-updater in the Storage Node docker image for hassle-free updates.

## Node acceptance

Once you have 1 or more Storage Nodes running, reply back to your contact with a csv file or document of all your Storage node IDs. The vetting process will begin and if the nodes are acceptable, they will be enabled to receive data.
