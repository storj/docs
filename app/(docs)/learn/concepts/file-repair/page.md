---
title: File Repair
docId: z4JgCuivlGbnn4YQMmlVX
redirects:
  - /dcs/concepts/file-repair
metadata:
  title: Understanding File Repair in a Distributed Network
  description:
    Overview of how data durability is ensured in a distributed network,
    even when nodes fail or leave the network, including a detailed explanation of
    the File Repair function.
---

This section describes at a high level how the system maintains availability of data on the network in the event that one or more storage nodes fail or leave the network.

All of the nodes on the network are operated by third party volunteers. One key to the durability of the network is the distribution of data over a heterogeneous network of statistically uncorrelated nodes. Since the storage nodes are operated by different people, in different regions, on different power supplies, with different internet connections, etc., the risk of failure is highly distributed. While the risk of failure for any individual node is very low, the risk of 51 out of 80 nodes failing simultaneously is astronomically low.

Hard drives don’t last forever, and we expect and plan for nodes to fail, as well as to voluntarily leave the network. While we provide a way for nodes to leave the network via Graceful Exit, without impacting the availability of pieces, we also have tools to address situations where storage nodes fail or leave the network without triggering Graceful Exit. (Graceful Exit is a command that allows a Storage Node to upload the pieces it is holding peer-to-peer to other Storage Nodes. When that Storage Node then exits the network, it does so without loss of any pieces.

If a Storage Node does fail or leave the network without completing Graceful Exit, file availability isn’t impacted by the loss of one piece. You only need any subset of the total pieces to retrieve a file (e.g. 29 of the 80). Over time, though, if enough nodes were to fail or leave the network without intervention, it’s possible that a file would eventually be lost. For this reason, we have a function that can rebuild missing pieces and store them on healthy storage nodes called File Repair.

File Repair works in conjunction with the Audit and Uptime Checker services that are constantly sampling the network to ensure that the network is monitoring the health and availability of Storage Nodes. The network constantly audits Storage Nodes by requesting a tiny byte range from a piece the node should be storing. If a Storage Node is healthy, it will be able to return the appropriate data. Even though the data is end-to-end encrypted and neither the Storage Node nor the Satellite have the encryption keys, the satellite can determine the validity of the response and determine if the node is storing the data it’s supposed to be storing. Other data elements (uptime, for example) are combined with audits to determine a Storage Node’s reputation, the statistical model by which nodes are allowed to operate or disqualified.

All of this analysis of Storage Nodes is fed into the data science engine which keeps track of all the objects on the network on a segment by segment basis. If, through the failure, loss or unavailability of Storage Nodes, the number of available pieces of a segment reaches the Repair Threshold, Repair Workers download the required pieces of that object, re-encode the object, regenerate the missing pieces, then upload pieces to healthy storage nodes so that sufficient pieces are available to guarantee the availability of the object.

There are a number of great blog posts on the math behind the redundancy model using erasure codes and how the repair system works. Probably the most important takeaway is that erasure codes are an alternative to replication that deliver much higher durability at a much lower expansion factor. As a result, an approach whereby objects are erasure coded and distributed over dozens, hundreds, or thousands of endpoints will provide superior durability to making multiple replications in a small number of endpoint locations or using erasure codes in a single location. If you want the details, check out:

- [Replication is bad for decentralized storage, part 1: Erasure codes for fun and profit](https://storj.io/blog/2018/11/replication-is-bad-for-decentralized-storage-part-1-erasure-codes-for-fun-and-profit/)

- [Why (Proof-of-) Replication is Bad for Decentralized Storage, Part 2: Churn and Burn](https://storj.io/blog/2019/01/why-proof-of-replication-is-bad-for-decentralized-storage-part-2-churn-and-burn/)

- [Reputation Matters When it Comes to Storage Nodes](https://storj.io/blog/2019/01/reputation-matters-when-it-comes-to-storage-nodes/)

- [Decentralized Auditing and Repair! The Low-key Life of Data Resurrection](https://storj.io/blog/2018/12/decentralized-auditing-and-repair-the-low-key-life-of-data-resurrection/)
