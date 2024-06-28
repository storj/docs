---
author:
  name: Simon Guindon
date: '2019-05-30 00:00:00'
layout: blog
metadata:
  description: "The demand for storage is growing rapidly every year, and businesses\
    \ and consumers are storing unprecedented amounts of data. IDC predicts worldwide\
    \ data will grow to 175 zettabytes by 2025, with as much data stored in the cloud\
    \ as in data centers\xB9.The Storj network introduces an economy around s..."
  heroimage: /blog/coordination-avoidance-on-the-storj-network/a7e04c245b685755.jpeg
  title: Coordination Avoidance On The Storj Network
title: Coordination Avoidance On The Storj Network

---

The demand for storage is growing rapidly every year, and businesses and consumers are storing unprecedented amounts of data. IDC predicts worldwide data will grow to 175 zettabytes by 2025, with as much data stored in the cloud as in data centers[¹](https://www.seagate.com/files/www-content/our-story/trends/files/idc-seagate-dataage-whitepaper.pdf).

The Storj network introduces an economy around storage by creating a decentralized storage platform which enables anyone to become a storage node operator. Storage nodes aren’t managed by Storj Labs and storage node operators are peers in the community managing hardware and networks that Storj Labs doesn’t control. Thus, the Storj network uniquely enables the combination of storage from any cloud and any data center into one global storage system. This combination of storage results in a decentralized network[²](https://storj.io/blog/2019/04/what-storage-node-operators-need-to-know-about-satellites/) and increased challenges in some key areas of scale, security, and performance.    

Minimizing coordination between computers is vital to any large scale system design. This is even truer given the diversity of the hardware and network environments in which the storage nodes in the Storj network live. The number of storage nodes involved in any Storj file upload or download make preventing slow or misbehaving nodes from impacting response times essential. The Storj network applies redundancy and coordination avoidance to counter long tail latency or high throughput demands to deliver a healthy network for its users.

#### Redundancy

The Storj network uses erasure codes[³](https://storj.io/blog/2018/11/replication-is-bad-for-decentralized-storage-part-1-erasure-codes-for-fun-and-profit/) to store segments of your file across the network to provide a high level of durability. These erasure codes are spread many times across many machines so the network can tolerate failures without losing data. This redundancy also provides a performance side effect; if during any upload or download a set of storage nodes are responding slowly, the network will ignore these slow storage nodes and complete the upload or download using the responses from the faster storage nodes. As long as enough of the redundant nodes have responded with all the required segments, the network acknowledges the user request and discards the slow responses in favor of the responses from the faster nodes—this prevents long tail latency from impacting user response times.

#### Coordination Avoidance

Blockchain consensus offers very strong guarantees, but this comes at a heavy cost in coordination overhead. Bailis et al.’s[⁴](http://www.vldb.org/pvldb/vol8/p185-bailis.pdf) describes how coordination is not always necessary for correctness and minimizing coordination is key to maximizing scalability, availability, and high performance in database systems. One fundamental design decision of the Storj network was not to utilize blockchain consensus for file transfers to increase those properties of the Storj network. Storj takes a pragmatic approach to avoiding blockchain consensus while still maintaining correctness for file transfers. But, at the same time by default, Storj uses blockchain consensus with the Ethereum-based STORJ token for payment processing to storage node operators.

We recently announced Tardigrade [[5](https://storj.io/blog/2019/04/introducing-tardigrade---decentralized-cloud-storage-from-storj-labs/)], a production environment of the Storj network run and maintained by Storj Labs. It’s an enterprise, production-ready version of the Storj network, complete with guaranteed SLAs. All user uploads and downloads on Tardigrade go through Tardigrade [Satellites which are special nodes on the network that audit storage nodes and ensure they’re properly storing files and managing metadata for users storing data on the network](https://storj.io/blog/2018/12/decentralized-auditing-and-repair-the-low-key-life-of-data-resurrection/). 

  


![](/blog/coordination-avoidance-on-the-storj-network/0d31ccd75012f9a8.png)*Figure 1. Storj network architecture.*

As shown in *Figure 1,* storage nodes and Satellites in the Storj network architecture are both capable of being decentralized. The Storj network can leverage the decentralized nature of storage nodes and Satellites to create partitions in the network to isolate users and file transfers from each other, which helps minimize coordination across the Storj network. For extremely high throughput demands, organizations can run their own Satellite. This avoids coordination overhead with the rest of the Tardigrade network and allows users to make their own decisions about what database infrastructure their Satellite will use and relax consistency guarantees if they wish.

### **Benefits Over Coordination-dependant Systems**

By ensuring coordination avoidance within the Storj platform [[5](https://storj.io/storjv3.pdf)], we’re able to deliver better performance and scalability over other decentralized systems—two issues that are critical to achieving broad adoption with traditional storage users. Decentralized systems that are coordination dependant, like Bitcoin, require an increasing number of resources as they scale. To compete with centralized cloud storage platforms like Amazon S3, Microsoft Azure, and Google Cloud, the Tardigrade network must be able to scale into the exabyte range, and beyond—something we feel confident it will be able to achieve. 

We believe our approach of decentralizing both storage and metadata tiers in the Storj network allows greater scalability, performance, and reliability than systems that rely on seeking consensus.

### **REFERENCES**

‍

1. The Digitization of the World from Edge to Core.  
<https://www.seagate.com/files/www-content/our-story/trends/files/idc-seagate-dataage-whitepaper.pdf>
2. What Storage Node Operators Need to Know About Satellites.  
<https://storj.io/blog/2019/04/what-storage-node-operators-need-to-know-about-satellites/>
3. Replication is bad for decentralized storage, part 1: Erasure codes for fun and profit.  
<https://storj.io/blog/2018/11/replication-is-bad-for-decentralized-storage-part-1-erasure-codes-for-fun-and-profit/>
4. Coordination Avoidance in Database Systems  
<http://www.vldb.org/pvldb/vol8/p185-bailis.pdf>
5. Introducing Tardigrade - Decentralized Cloud Storage from Storj Labs.  
<https://storj.io/blog/2019/04/introducing-tardigrade---decentralized-cloud-storage-from-storj-labs/>
6. Coordination avoidance section 2.10  Storj v3 whitepaper  
<https://storj.io/storjv3.pdf>

### **SOCIAL**

At production, the @tardigrade\_io platform will deliver better performance and scalability than other cloud storage solutions—both centralized and decentralized—and coordination avoidance helps us make this possible. Read more about how and why we avoid coordination between nodes in our latest blog: <https://storj.io/blog/2019/05/coordination-avoidance-on-the-storj-network/>

One of the ways we're able to achieve a higher standard of cloud storage performance and scalability is through coordination avoidance. Read all about it in this update by #storj engineer @simongui. <https://storj.io/blog/2019/05/coordination-avoidance-on-the-storj-network/>

Our Tardigrade network boasts download speeds faster than #AmazonS3. A big way we achieve this is through coordination avoidance. See this post by @simongui to learn how it helps scalability and performance. <https://storj.io/blog/2019/05/coordination-avoidance-on-the-storj-network/>

