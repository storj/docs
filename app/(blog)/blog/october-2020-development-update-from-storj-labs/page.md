---
author:
  name: Brandon Iglesias
date: '2020-10-01 00:00:00'
layout: blog
metadata:
  description: Hello Everyone! It's been two months since our last development update
    from our product team so we have a lot to share with you! The global pandemic
    has lasted longer than many of us thought and even under these circumstances it's
    amazing how much our team has been able to accomplish. We've also ...
  heroimage: /blog/october-2020-development-update-from-storj-labs/8855fa2f80969623.png
  title: October 2020 Development Update from Storj Labs
title: October 2020 Development Update from Storj Labs

---

Hello Everyone! It's been two months since our last development update from our product team so we have a lot to share with you! The global pandemic has lasted longer than many of us thought and even under these circumstances it's amazing how much our team has been able to accomplish. We've also seen some increases in developer usage from our community. Here are a few ways others are starting to utilize the network; [NEM and IoDLT](https://storj.io/blog/2020/09/nem-and-iodlt-using-tardigrade-to-accelerate-mongodb-snapshot-distribution-and-storage/), [Speed Up Sync Times for GETH](https://storj.io/blog/2020/09/using-tardigrade-and-the-decentralized-cloud-to-speed-up-sync-times-for-geth/), [Private, Multiregion File Transfer with FileZilla](https://storj.io/blog/2020/08/private-multiregion-file-transfer-with-tardigrade-and-filezilla/). 

**Recent Features Added to the Product:**

* Multi-Project Support: Users can create multiple projects on their account. This is important because now you have separate projects for each of your applications, environments, etc.
* We added the ability to edit project names within the Satellite GUI.
* We finished updating our Storage Node auth token flow. You can now get an auth token right away in the browser if you go here <https://registration.storj.io/>
* We added Node downtime for the current period to the Storage Node Dashboard so operators can have more information and metrics about their Nodes.
* Storage Node Payout Dashboard has a more advanced view than it was for a while, with very structured and detailed information about every payout.
* Storage Node Dashboard now has an additional pie chart with Used/Remaining/Trash sections.
* Storage Node notification system turned on again with the first notification event about version update—more new notification events coming soon.
* We resolved some more bugs with graceful exit and improved its stability for our Node Operators.

**Coming Down the Pipe:** 

* Multi-Node dashboard: This is going to simplify the management for operators who run multiple Storage Nodes by allowing them to view all of the information for their Nodes in a single place.
* Object Map: This will allow you to see just how distributed the pieces of your file are across the globe.
* CRDB Migration: We're migrating all of the metadata that Satellites store to cockroach DB so that the Satellites are multi-region.
* QUIC implementation as our transport layer network protocol: This will reduce the number of round trips on the network and increase speed for most network operations like uploads and downloads.
* Pumpkin spice lattes: Since fall has started we are getting into the holiday spirit by changing up our typical espressos/ cappuccinos with a little bit of pumpkin spice.
* Reed Solomon for uploads to the network: We're fine-tuning these numbers to reduce the amount of redundancy and keep our durability consistent with our SLA of 11'9s. Our initial choice for RS numbers was very conservative and since we have data about our network for over a year, we can begin to fine-tune it to help increase our performance and decrease redundancy without sacrificing any durability of the files.

We also wanted to give you a quick update about our public road maps (In Aha.io) and the ideas portal. The public roadmap links we have been sharing aren't roadmaps, they were just a list of items we had worked on in the last few sprints. This is repetitive information because you can find the same list of things in our release notes and commits. What we're going to do instead is share the major pieces of functionality we're working on in the next month in these blog posts. This is going to give our community a better idea and understanding of what things are coming down the pipeline. As for the ideas portal it has transitioned to the [forum](https://forum.storj.io/c/parent-cat/5).

**For More Information:**

* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
