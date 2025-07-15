---
title: Satellite (Metadata Region)
docId: v0b3GtAU4dDT_1qibwCxc
redirects:
  - /dcs/concepts/satellite
metadata:
  title: Understanding Satellites and Metadata Regions in the Network
  description:
    Explore the role of Satellites in Storj, their key responsibilities,
    and how to choose a metadata region. Satellites aid with functions like node discovery,
    payment processing, data audit and repair. Users have options to use Storj
    satellites or run their own. The doc also discusses Storj's unique region concept
    and the importance of selecting an appropriate Satellite.
---

The **Satellite** is a set of hosted services that is responsible for a range of functions on the network, including the node discovery system, node address information caching, per-object metadata storage, storage node reputation management, billing data aggregation, storage node payment, data audit and repair, as well as user account and authorization management.

Users have accounts on and trust specific Satellites. Any user can run their own Satellite, but we expect many users will choose to avoid the operational complexity and create an account on another Satellite hosted by a trusted third party such as Storj, a friend, group, or workplace. Storj satellites are operated under the Storj brand. This component has a number of key responsibilities:

1.  Developer account registration & management

2.  API credential & access management

3.  Object metadata storage

4.  Billing & payment

5.  Audit & repair

Users of the network will have accounts on a specific Satellite instance, which will: store their file metadata, manage authorization to data, keep track of storage node reliability, repair and maintain data when redundancy is reduced, and issue payments to storage nodes on the user’s behalf.

## Choosing a metadata region

While Storj doesn't have "regions" like other cloud storage providers who operate data centers in one or more geographic location, the closest thing to a "region" is a satellite. While your data is stored across a globally distributed network of storage nodes, the encrypted metadata is stored across multiple satellites in a region.

{% callout type="info"  %}
When selecting the Satellite for your project, you'll want to choose the geographic region where the majority of the end users of your service who will be interacting with the objects on Storj will be located.
{% /callout %}

Importantly, a specific Satellite instance does not necessarily constitute one server. A Satellite may be run as a collection of servers and be backed by a horizontally scalable trusted database for higher uptime. Storj operates clusters of Satellites in regions, with all Satellites in a region sharing a multi-region, distributed back end. This configuration provides a highly resilient and available architecture in which the loss of any Satellite service, an entire Satellite or the unavailability of a facility hosting a Satellite has no impact on the availability of data stored on the network.

Storj implements a thin-client model that delegates trust around managing files’ location metadata to the Satellite service which manages data ownership. Uplinks are thus able to support the widest possible array of client applications, while Satellites require high uptime and potentially significant infrastructure, especially for an active set of files. Like storage nodes, the Satellite service is being developed and will be released as open source software. Any individual or organization can run their own Satellite to facilitate network access.

With respect to customer data, the Satellite is never given data unencrypted and does not hold [](docId:yI4q9JDB3w01xEkFWA4_z) The only knowledge of an object that the Satellite is able to share with third parties is its existence, rough size, and other metadata such as access patterns. This system protects the client’s privacy and gives the client complete control over access to the data, while delegating the responsibility of keeping files available on the network to the Satellite.

Uplink Clients may use Satellites run by a third-party. Because Satellites store almost no data and have no access to keys, this is a large improvement over the traditional data-center model. Many of the features Satellites provide, like storage node selection and reputation, leverage considerable network effects. Reputation data sets grow more useful as they increase in size, indicating that there are strong economic incentives to share infrastructure and information in a Satellite.

The Satellite instance is made up of these components:

- A full node discovery cache

- A per-object metadata database indexed by encrypted path

- An account management and authorization system

- A storage node reputation, statistics, and auditing system

- A data repair service

- A storage node payment service

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/gLz7oZ6M4vakL8WRG8yyx_image.png)
