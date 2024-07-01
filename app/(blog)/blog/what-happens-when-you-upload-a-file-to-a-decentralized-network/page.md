---
author:
  name: Brandon Iglesias
date: '2019-04-23 00:00:00'
layout: blog
metadata:
  description: "When people first hear about how decentralized cloud storage works,\
    \ it sounds like a joke. Common questions include: \u201CHow is it possible to\
    \ store data on random computers around the world?\u201D  \u201CThat doesn't sound\
    \ secure\u2026. Is it?!?\u201D  \u201CIs this a real thing?\u201D Let me tell\
    \ you, it\u2019s real and it\u2019s specta..."
  heroimage: ./0b83672fb222f6ad.jpeg
  title: What Happens When You Upload a File to a Decentralized Network
title: What Happens When You Upload a File to a Decentralized Network

---

When people first hear about how decentralized cloud storage works, it sounds like a joke. Common questions include: 

* “How is it possible to store data on random computers around the world?”
* “That doesn't sound secure…. Is it?!?”
* “Is this a real thing?”

Let me tell you, it’s real and it’s spectacular!

#### The Lifecycle of a File

![](./666fd702bcf215bb.gif)When files are uploaded to the Storj network, the first thing that happens is the Uplink, which runs on the local machine uploading the files to the network, determines if the file is small enough to be stored as an inline segment. I will discuss the difference between inline and remote segments later in this post but for the rest of this section assume we are referring to a remote segment. The Uplink then sends an upload request to the Satellite, which includes the Uplink’s API key so that the Satellite can validate if that Uplink is authorized to upload data to the project and bucket that it requested. If there are no issues with the authorization, the Satellite then compiles some information to send back to the Uplink.

This information includes a list of storage nodes (where the data can be stored) and an order limit for the Uplink. The list of storage nodes will include nodes with varying levels of reputation, as well as the information that the Uplink needs in order to establish a connection with them such as IP/port. Check out [our blog about reputation](https://storj.io/blog/2019/01/reputation-matters-when-it-comes-to-storage-nodes/) to read more about what type of criteria determines whether a node is reliable or not, and how the network disqualifies poorly behaved nodes. The Uplink will use the order limit as proof that the Satellite authorized its uploads when the Uplink establishes connections with storage nodes. Order limits are like an empty tank that the Satellite gives the Uplink. As the Uplink uploads more data over time, that empty tank will begin to fill. Once it reaches its limit, the Uplink won't be able to upload any more, because it has reached the amount that was agreed upon with the Satellite. While this seems like a lot of back and forth, this all happens in microseconds. 

At this point, the Uplink has been given the green light to store data on the network. From the order limit and other info shared by the Satellite, It creates orders for each of the storage nodes. The storage nodes will later send these orders to the Satellite. 

Next, the Uplink begins breaking down the file into segments, then stripes, after which it erasure codes each stripe to produce erasure shares. The Uplink then concatenates the erasure shares into pieces. This may seem like overkill, but it’s actually a key process of the network because it enables buffered file streaming by allowing the downloading, decrypting and recompiling of pieces of files, rather than waiting for the entire file to be downloaded first. These pieces are what is uploaded to storage nodes, and at this time the network begins to send all the pieces of the file to each storage node, in parallel. Because a 1 TB file might be uploaded to a thousand different nodes, the process goes very quickly as there is generally not a bottleneck on the storage node side. 

When the storage nodes receive the pieces, they hash them and send the hash of each piece back to the Uplink in a signed message. With the message signed by storage nodes, the Satellite can later audit both Uplinks and storage nodes for honest behavior.

The Uplink hashes all of the hashes it received from the storage nodes and then sends them to the Satellite, which stores a pointer to the file in its database. The pointerDB contains information about which storage nodes are storing which pieces. That way when the Uplink needs to download the file, the Satellite can tell it which storage nodes are holding the pieces it needs to download. 

#### An Aside About Inline vs. Remote Segments

Before the Uplink first contacts the Satellite, it must determine how big the file is and how big its pieces would be. In some instances, files might be so small that the metadata to store them (which keeps track of where the file’s pieces are located and the corresponding NodeIDs) would actually be larger than the file itself. If this is the case, the Uplink and Satellite would determine that the file should actually be stored inline on the Satellite, rather than distributed across a network of storage nodes. This maximizes the efficiency of costs, and we don’t foresee this occurring very regularly. These inline segments are also encrypted client-side for security and privacy. Remote segments are those that will be erasure encoded and distributed across the network. A remote segment is larger than the metadata required to keep track of its bookkeeping.

#### Repairing Data When Nodes Go Offline

As storage nodes go offline, the Satellite is responsible for “repairing” those missing pieces on the network. To execute a repair, the Satellite determines how many pieces a file has on the network and replenishes those that are missing if they fall under a threshold. This ensures that the file’s durability is maintained. If you want to learn more about our repair system, you can check out this [blog](https://storj.io/blog/2018/12/decentralized-auditing-and-repair-the-low-key-life-of-data-resurrection/).

#### Recompiling Decentralized Data During Download

When a user decides they need to download a file, the network begins the short process of downloading and assembling a file from its various pieces. The Uplink contacts the Satellite to begin the process of downloading the file. The Satellite returns data about the file’s pieces, specifically a list of nodes, with IP and port addresses, storing pieces and other metadata that helps the Uplink in the file download process. The Satellite returns a list of nodes that the Uplink may choose to download from. 

Once the Uplink receives the data it needs from the Satellite, it reaches out to the storage nodes storing file pieces and begins downloading them in parallel. If an Uplink needs 10 file pieces to rebuild a file, it will actually download 12 or 13 pieces, to accelerate the file download. That way the file can be rebuilt once the fastest 10 nodes complete the delivery of their corresponding file pieces. Once the needed file pieces are downloaded, the Uplink cancels any remaining downloads, reconstitutes the file from its pieces, unencrypts the file, and serves it up. 

#### Ridiculously Resilient, Highly Distributed

All of these steps may seem super complex, but they happen in microseconds, faster than what one would experience on a legacy, centralized cloud storage solution. Building decentralized systems is definitely not the easiest challenge to solve, which is why our team is committing so many resources to engineer the network. We are very passionate about building decentralized/distributed systems that are not only easy-to-use but better in nearly every way when compared to their centralized counterparts. From uploading your first file to building a web-scale application on top of the network, we hope you enjoy your journey down Decentralization Drive.

