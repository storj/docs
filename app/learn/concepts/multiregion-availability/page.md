---
title: Multiregion Availability
docId: i8S8oBY2CviXmrVnKnE9M
redirects:
  - /dcs/concepts/multiregion-availability
metadata:
  title: Understanding the Multi-region Availability
  description:
    Dive into Storj’s architecture, including multi-region storage nodes,
    satellites, and S3-compatible gateways, designed for top-tier availability and
    durability.
---

This section provides a high-level description of the default high availability, multi-region architecture.

Breaking the Storj service into multiple peer classes on the network provides the maximum flexibility to network participants. While the majority of the network is operated by third parties, the components and architecture are all designed to be inherently multi-region to meet strict SLAs for availability and durability.

## Storage Nodes

One key to the durability of the network is the distribution of data over a heterogeneous network of statistically uncorrelated nodes. Since the storage nodes are operated by different people, in different regions, on different power supplies, with different internet connections, etc., the risk of failure is highly distributed. While the risk of failure for any individual node is very low, the risk of 51 out of 80 nodes failing simultaneously is astronomically low.

## Satellites

While the network of Storage Nodes is inherently multi-region, customers frequently ask whether the Satellites that host the metadata and are critical to the storage and retrieval of data are also multi-region. Storj Satellites operated by Storj are also inherently multi-region. &#x20;

A specific Satellite instance does not necessarily constitute one server. A Satellite may be run as a collection of servers and be backed by a horizontally scalable trusted database for higher uptime. Storj operates clusters of Satellites in regions, with all Satellites in a region sharing a multi-region, distributed back end. This configuration provides a highly resilient and available architecture in which the loss of any Satellite service, an entire Satellite or the unavailability of a facility hosting a Satellite has no impact on the availability of data stored on the network.

## Gateways

Storj also operates a global network of highly available, distributed S3-compatible gateways. Each gateway is operated in a high availability environment, typically in Equinix data centers, with BGP-enabled global routing, where the loss of any one gateway has no impact of the availability of data. Applications are always routed to the closest available gateway to optimized for low latency and high performance.\\
