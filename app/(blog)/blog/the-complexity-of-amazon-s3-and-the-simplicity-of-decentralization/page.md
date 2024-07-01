---
author:
  name: Moby Von Briesen
date: '2021-11-26 00:00:00'
layout: blog
metadata:
  description: "In this post, we will compare Amazon S3 and Storj DCS across several\
    \ dimensions. Along the way, we\u2019ll touch on the performance and security\
    \ benefits distributed storage has by design, as well as the difference between\
    \ Amazon S3 and the storage tiers of Storj DCS."
  heroimage: ./a3d28c91951b5f80.png
  title: The Complexity of Amazon S3 and the Simplicity of Decentralization
title: The Complexity of Amazon S3 and the Simplicity of Decentralization

---

  


In this post, we will compare Amazon S3 and Storj DCS across several dimensions. Along the way, we’ll touch on the performance and security benefits distributed storage has by design, as well as the difference between Amazon S3 and the storage tiers of Storj DCS.  


**Complexity in Design and Execution**  


According to Amazon Web Service’s [global infrastructure overview](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/global-infrastructure.html), they support 80 availability zones within 25 geographic regions. If you wanted to upload data to Amazon S3 in multiple regions, you would need to [replicate it as an additional step](https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html). Replication can be costly and difficult to manage, but what is the alternative when performance and resilience are important?  


Storj DCS was designed with global performance and resilience in mind from its inception. We use erasure coding to divide objects into pieces, and store these encrypted pieces on Storage Nodes spread out across the globe. We handle the complexity so you don't have to even worry about it.   


For more information about replication versus erasure coding, with math and stuff, see Storj CTO, JT Olio’s excellent “Replication is bad for decentralized storage” ([part 1](https://www.storj.io/blog/replication-is-bad-for-decentralized-storage-part-1-erasure-codes-for-fun-and-profit), [part 2](https://www.storj.io/blog/why-proof-of-replication-is-bad-for-decentralized-storage-part-2-churn-and-burn)).  


For more information about taking advantage of decentralized storage’s “performance by design”, see Dominick Marino’s “Hot Rodding Decentralized Storage Series” ([part 1](https://storj.io/blog/hot-rodding-decentralized-storage), [part 2](https://www.storj.io/blog/hot-rodding-decentralized-storage-part-2), [part 3](https://www.storj.io/blog/hot-rodding-decentralization-part-3)).  


**Complexity in Security**  


Amazon S3 doesn’t encrypt data by default. There are tools and [documentation for adding client-side or server-side encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html), but client-side encryption requires additional work before uploading/downloading to/from the S3 client, and server-side encryption requires sharing your encryption credentials with S3, and in many cases, allowing S3 to manage your keys for you.  


Storj DCS is zero trust by default. In fact, all objects on Storj DCS and their paths [are automatically encrypted](https://www.storj.io/blog/security-and-encryption-on-the-v3-network) by default, at no extra cost.   


By the way, in case you were wondering, the Storj client encrypts the object data before its segments are erasure coded and the “pieces” are sent to Storage Nodes.  


**Complexity in Billing**  


Amazon S3 has [seven different storage classes](https://aws.amazon.com/s3/storage-classes/). They’re *S3 Standard*, *S3 Intelligent-Tiering*, *S3 Standard-IA* ("Infrequent Access"), *S3 One Zone-IA*, *S3 Glacier*, *S3 Glacier Deep Archive*, and *S3 Outposts*.  


The page linked above contains roughly 1,891 words going into detail about each S3 storage class, its optimal use cases, and any cost or performance details that might distinguish it from the other classes.  


Here are approximately 100 words that describe Storj DCS’s payment tiers:  


* If you do not add a credit card, you will get one project with 150 GB storage and 150 GB/month bandwidth usage
* If you add a credit card, you will get up to three projects, each with 25 TB storage and 100 TB/month bandwidth usage, at a flat rate of $0.004 per Gigabyte-Month for storage, $0.007 per GB for egress, and free ingress.
* If you need more projects, storage, or bandwidth than what our paid tier provides, great! Simply file a resource increase ticket, and you will get whatever limits you need at the same flat rate.

By the way, Storj DCS is on average, 80% less expensive on average than traditional centralized cloud storage.  


**Summary**  


Why use Storj DCS?  


* The storage layer handles client-side encryption by default
* It is very easy to create credentials/share access without compromising security
* The storage layer handles erasure coding by default
* Erasure coding is great for not losing data
* Erasure coding is great for performance
* We have two payment tiers: “add a credit card” or "pay with STORJ." We charge a flat rate, give you plenty of storage/bandwidth to play around with, and you are only charged for what you use.
* You may also prepay storage and egress beyond free account limits by making a STORJ token deposit.

  


[**Try Storj DCS for Free Today**](https://storj.io/)

  


