---
author:
  name: Jessica Grebenschikov
date: '2019-04-26 00:00:00'
heroimage: ./0a307b9d9d2384d3.jpeg
layout: blog
metadata:
  description: "The Storj network includes three main components: the storage node,\
    \ the Satellite, and the Uplink.The storage node\u2019s role is to store and return\
    \ data. The Uplink is the software or service that puts and gets data onto and\
    \ from the network. The role of Satellites is to act as the mediator between ..."
  title: What Storage Node Operators Need to Know About Satellites
title: What Storage Node Operators Need to Know About Satellites

---

The Storj network includes three main components: the storage node, the Satellite, and the Uplink.

The storage node’s role is to store and return data. The Uplink is the software or service that puts and gets data onto and from the network. The role of Satellites is to act as the mediator between Uplinks and storage nodes, facilitating the storage interaction, and deciding which storage nodes will store what files.

![The Circle of Life on a decentralized cloud storage network](./46d5d20f2cc7cf1f.png)The Satellite’s relationship with the storage node is an important one. The Satellite is responsible for paying the storage node for the storage and bandwidth utilized by the network. The storage node wants to store the most data it can for the network so it can make the most money and it’s heavily dependent on the Satellite for that.

At beta launch, Storj will be operating all the Satellites on the network, but because the software we create is open source and the network is decentralized, in the future, anyone will be able to operate a Satellite. 

Since this relationship is so important, we want to outline what storage node operators need to know to make the best decisions about which Satellites they work with, which will help them maximize the earning potential for their nodes.

#### Types of Satellites

As mentioned, anyone can run a Satellite on the Storj network. Providers might want to operate Satellite as a service, or a company may want to run their own Satellite to build their own decentralized cloud storage network. There are likely many other reasons someone may choose to operate their own Satellite. Due to this, we expect there to be a large variation in quality. 

Storj Labs will offer a high-quality credentialing system for Satellites called Tardigrade. [Read more on this in previous blog posts](https://storj.io/blog/2019/04/introducing-tardigrade-decentralized-cloud-storage-from-storj-labs). Any Satellite that is officially “Tardigrade quality” will meet high standards for durability, resilience, and reliability. There will be compliance and quality controls to ensure that storage nodes are paid fairly and that the Tardigrade quality continuously meets the predetermined SLAs. 

#### Which Satellites Do Storage Nodes Work With

By default, storage nodes will accept requests to store data from all Satellites on the network. When a new Satellite comes online and makes the first request to a storage node, there will be a vetting process to limit exposure and build trust. Storage nodes can indicate the maximum amount of data they will store for untrusted Satellites. This is a two-way street. When a new storage node comes online, the Satellite vets the new storage node as well to ensure it can reliability store data. Over time, the storage node will build up its [reputation](https://storj.io/blog/2019/01/reputation-matters-when-it-comes-to-storage-nodes/) with the Satellite and will be allowed to store more data.

However, when a new Tardigrade Satellite comes online, by default, the storage nodes will automatically trust them and there will be no vetting process.

Storage nodes will want to work with the Satellites where they make the most money. Storage nodes are paid for returning data when requested and storing data at rest. 

Currently, storage nodes have the ability to whitelist Satellites if they only want to work with specific ones. If a request comes in from a Satellite not on the whitelist, the request won’t be processed. In the future, there may be a blacklist as well—where storage nodes can explicitly refuse to work with certain Satellites. This would allow storage node operators to store a limited amount of data for all untrusted Satellites, except those on the blacklist. 

When the network reaches its production release later this year, there will be a dashboard for the storage node operators that will list how much data is stored and what usage they have been paid for by which Satellites. This dashboard will provide insight into their relationship with different Satellites. From the dashboard, the storage node operators can make more informed decisions about which Satellites they want to work with.

#### Things to keep in mind

If a storage node works with many Satellites, then payments may come from multiple sources on varying payment schedules.

Each part of the network is critical to the entire decentralized cloud storage ecosystem. Because the Storj network is decentralized, and various parts of the network may be considered “untrusted,” it’s critical to understand how the network vets its different parts to ensure data can be stored reliability. If you are a storage node operator reading this, we very much appreciate the contributions you provide to the platform.

