---
author:
  name: Dominick Marino and Josh Dougall
date: '2022-03-03 00:00:00'
layout: blog
metadata:
  description: In the modern world of entertainment, there are endless options for
    things to watch. Besides extensive lists of classic movies and TV shows, growing
    studios have contributed to a recent explosion in new popular series. These can't-miss
    titles have amassed viewerships in the millions and critical ...
  heroimage: ./1bb0baa6b3e5f63c.png
  title: Use the Decentralized Cloud to Transform Your Multimedia Library Into Your
    Personal Netflix
title: Use the Decentralized Cloud to Transform Your Multimedia Library Into Your
  Personal Netflix

---

In the modern world of entertainment, there are endless options for things to watch. Besides extensive lists of classic movies and TV shows, growing studios have contributed to a recent explosion in new popular series. These can't-miss titles have amassed viewerships in the millions and critical acclaim for many.

  


With so much to watch, it's no wonder that movie buffs and bingeaholics alike struggle to keep up with the constant stream of new releases. To help with this, streaming services like [Netflix](https://www.netflix.com/), Hulu, and Apple+ have provided a successful venue for finding new and classic videos. 

  


But the subscription costs of using these sites can quickly add up. It's often necessary to subscribe to several at once to access the shows and movies subscribers want to see. This is why many people have chosen to simply maintain their own multimedia libraries of their favorite shows and movies.   
‍  


### Challenges with Traditional Media Collections

In many ways, it seems we have come full circle with our multimedia libraries. We’ve evolved from storing DVDs (or even VHS, for those of us who can remember that) to now storing gigabytes (or terabytes) of media files on our hard drives. Unsurprisingly, this has brought back some of the same types of problems that physical media created.

  


For many, an extensive media collection is a proud accomplishment. In the days of physical media, this was displayed as stacks of shelves holding CDs and DVDs that could grow to impressive sizes rivaling even what Netflix has to offer. 

  


However, for most people the size of the library was literally limited by the physical size of their media room, such that even the most avid collectors had to ultimately shrink their collections to one that could fit in their house. 

### The Risks Associated with Physical Media Libraries

There were also risks to investing in an extensive physical media library, such as theft and natural disasters like fires and floods that could pose a threat of losing your collection. It didn't make sense to buy multiple copies of every DVD to offset this risk, and even if you wanted to you would end up with less space for storing other movies.

  


These downsides to physical media are reflected again today by the multimedia file collector. Hard drives have limited space for storing media files, especially given the large size of high-quality 4K movies and TV shows. Local storage also suffers as a single point of failure for an extensive library. Besides the same risks of theft and damage, computers are also vulnerable to drive failures, viruses, or even power surges that can cause data loss. Fortunately, cloud services are becoming a viable alternative for media storage that resolves these issues.

  


Now, taking advantage of your own cloud-based storage alleviates the need for expensive local disk space and eliminates the risk of damage or loss. However, many of the popular cloud services are costly and require additional services to propagate your data across multiple availability zones or regions. And while cloud hosting protects data with redundancy and backups, it is not unheard of for some hosting regions to go down, limiting access to the content hosted there.

  


So while these services initially solve the initial concerns of media storage, the cost and availability can grow to become issues. 

### The Answer to Traditional Centralized Cloud Storage

As an alternative to the traditional centralized cloud storage approach, Storj DCS offers decentralized storage. By decentralizing the cloud storage architecture, there are several immediate benefits.

  


First, the cost is much lower than centralized hosting. Decentralized distribution of content means that there are no central data centers or servers to maintain, which brings down the prices which need to be passed on to the user. This also provides the benefit of a built-in distributed network for storing your files. That network improves overall availability to accessing stored files by eliminating single points of failure. 

  


Okay, decentralized storage solves the problems around building your own media library. But what about the user experience? All of the big streaming services offer intuitive apps designed to easily browse content. And for local libraries, programs like Plex provide a similar interface and features for navigating your own media files. Is it possible to set up something like that when your files are hosted on a decentralized cloud service?

  


The answer is yes! At its core, [Plex](https://www.plex.tv/) is simply a front-end application that navigates through a backing content directory. It works just like the file browser on your computer or the web interface for [Storj DCS](https://www.storj.io/how-it-works). When storing files locally, Plex knows the location of that content directory to pull from. So, to get the same behavior with cloud storage, you just need to mirror your content from Storj to a locally-accessible location for Plex to reach it.

This mirroring can be done by mounting your Storj buckets as a local directory. If you aren't aware, mounting is essentially the process of linking your computer to the Storj network which makes your files appear as local objects. To do this, you can use a program called [Rclone](https://rclone.org/).

  


### Storj DCS, Rclone & Plex

Rclone works with multiple cloud providers to provide a command-line tool for syncing local files to the cloud network. With [Rclone and Storj](https://docs.storj.io/dcs/how-tos/sync-files-with-rclone/), you can open a persistent two-way mount between your compute and multimedia resources. This keeps your files hosted on Storj DCS up-to-date (by continuously checking for new local files and uploading them to the network) and updates Plex as new files become available to it.

  


With Storj DCS, Plex, and Rclone, your multimedia library can transform into your own personal Netflix. The possibilities of affordable, high-availability, secure distributed storage are now at your fingertips. Reclaim your media collection and experience the benefits of decentralized hosting.

  
  


