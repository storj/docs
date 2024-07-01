---
author:
  name: Brandon Iglesias
date: '2021-09-16 00:00:00'
layout: blog
metadata:
  description: "When people first hear about decentralized cloud storage, they usually\
    \ have questions about how it works and what benefits it can provide. In this\
    \ post, I\u2019ll answer some of these frequently asked questions regarding Storj\u2019\
    s Decentralized Cloud Storage (DCS) offering."
  heroimage: ./2c8582edba5fac76.png
  title: The 10 most common questions about decentralized cloud storage
title: The 10 most common questions about decentralized cloud storage

---

When people first hear about decentralized cloud storage, they usually have questions about how it works and what benefits it can provide. In this post, I’ll answer some of these frequently asked questions regarding Storj’s Decentralized Cloud Storage (DCS) offering.   


Storj recently attended Defcon 2021, where we had hundreds of conversations with people in the technology space, and here are the most common questions and conversations we fielded, but first, here are the players:   


* **Brandon**: Head of Product at Storj Labs (that’s me)
* **Megan**: A DevOps engineer at Company ABC
* **David**: A cloud engineer at Company XYZ

**Brandon**: Hey Megan and David! It’s so great to meet you here at Defcon 2021.   


**Megan**: Great to meet you as well, Brandon. Can you tell us a little about your company's product?  


**Brandon**: Sure. We built a decentralized Cloud object Storage product named Storj DCS.   


### **Q1: Decentralization**

**Megan**: Like AWS S3? What do you mean by decentralized?   


**Brandon**: Yes, it’s very similar to AWS S3; in fact, we’re S3 compatible. And what we mean by decentralized is that we don’t own or operate any data centers that store our client’s data. We build open-source software that allows people around the world to run Nodes on the network. These Nodes contribute two resources; storage space and bandwidth.   


### **Q2: Security**

**David**: Wait a second,  how is that secure?   


**Brandon**: Well, the way the data gets uploaded to the network makes it very secure. I’ll give you an example; If you upload a photo of your cat to Storj DCS, the very first thing we do is we client-side encrypt the photo with a key only you have. Then it gets broken up into 80 pieces; each of those pieces gets uploaded to a different Node on the network. Each piece represents just 1/29th of the file. So if you were a hacker trying to get your hands on the adorable cat photo, you would have to attack 29 nodes or more Nodes on the network who you don’t know are holding what pieces of what files. These Nodes are all operated by different people with different levels of security, operating systems, internet providers, and hardware.   


### **Q3: Encryption**

**David**: What kind of encryption do you use?

**Brandon**: Every file is encrypted using AES-256-GCM symmetric encryption using a key only you have.  


### **Q4: Durability and Availability**

**Megan**: That's interesting, but if Storj Labs doesn’t operate the Nodes, then what is the durability and availability of files uploaded to the network and how can you guarantee that?  


**Brandon**: We offer 11 9s of durability and 4 9s of availability but to get into how we guarantee those numbers, let me tell you a bit more about the network. On the Storj Network, we have three major actors; The Storage Nodes who are contributing resources, The clients who upload/ download data, and the Satellites who keep track of metadata like file pieces and audits Nodes.   


When you uploaded that cat photo, it was split into 80 pieces and stored on the network. We use [Reed-Solomon Erasure Coding](https://www.storj.io/blog/replication-is-bad-for-decentralized-storage-part-1-erasure-codes-for-fun-and-profit) to create “extra” unique pieces of the file, and because of that, you only need 29 of the 80 pieces to reconstruct the file.   


### **Q5: Nodes Storing Data**

**Megan**: But what happens if a Node goes offline or a bunch of Nodes goes offline?   


**Brandon**: When the file gets uploaded to the network, we store 51 extra pieces, if one or more Nodes go offline or delete the data, it’s still retrievable by our clients at all times. The Satellite is also constantly auditing Nodes for file pieces. The Satellite keeps track of how many pieces the network has for each file, and when files go hit the “repair threshold,” the Satellite will download pieces of the file, create new pieces, and upload those new pieces to Nodes to bring the durability levels for that file back up to 11 9s.   


### **Q6: Downloading Files**

**Megan**: How do I download my objects?   


**Brandon**: When you need to download one of your objects, you request the list of Nodes storing pieces of your file from the Satellite. Then you would connect to those Nodes directly and download the pieces; once you have 29 pieces, you’re able to reconstruct the file and decrypt it with the encryption passphrase you used when it was uploaded. All of this is done programmatically via our CLI tool or library.   


### **Q7: Performance**

**David**: If you have to connect to all those Nodes and then download the data, how does the performance compare to something like AWS S3?  


**Brandon**: The performance is incredible because we’re downloading pieces from all of these Nodes, and we can take advantage of parallelism in two places. When you upload or download from the network, file segments get sent one after another. However, the pieces that make the segments are sent in parallel. A lot of effort has gone into optimizing this process. For instance, when you download a file, we attempt to grab 39 pieces when only 29 are required, eliminating slow Nodes (Long Tail Elimination). This base parallelism allows up to 10 Nodes to respond slowly without affecting your download speeds. In addition to the base parallelism, we also have the capability of transferring multiple segments in parallel, which we refer to as *segment parallelism*. To download as fast as possible, you would request each *segment* at the same time, in parallel, which results in you downloading all pieces at the same time, allowing you to download at the limit of your compute and network bandwidth.   


### **Q8: Lost Files**

**David**: Has Storj DCS ever lost any data?  


**Brandon**: No, we haven’t. We’re  currently storing more than 372 million objects and more than 28 billion pieces, and the network has been operating at our production level SLAs for over two years.   


### **Q9: Storage/ Egress Cost?**

**Megan**: What is the cost to store and download data from Storj DCS?   


**Brandon**: We charge $4.00 per terabyte per month for storage and $7.00 dollars per terabyte for egress. Uploading your data to Storj DCS is free. Our pricing also includes multi-region data replication at no extra cost, unlike our competitors. The reason it doesn’t cost extra is all of the pieces for an object are being stored on different Nodes in a geographically different location, so multi-region data replication is done by default.   


### **Q10: How hard is it to get started?**

**David**: How do I get started?   


**Brandon**: You can create an account at storj.io/signup and start uploading your data to the decentralized cloud.   


The questions are often a bit different, but the Q&A provided here addresses the most common things people ask about decentralized storage. Do you happen to have a question we didn’t answer here? Ask us on Twitter or our forum and we’ll be happy to give you an answer! In the meantime, if you’d like your own answer to Q9, sign up today using coupon code 1TBFREE, and we’ll give you 10x our regular free tier for six months.   


