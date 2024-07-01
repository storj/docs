---
author:
  name: Brandon Iglesias
date: '2020-06-29 00:00:00'
layout: blog
metadata:
  description: "Hello Everyone! We hope you are enjoying your summer and staying safe.\
    \ As a company, we typically meet in person every quarter to fully immerse ourselves\
    \ into a specific topic or goal. Last week we had a virtual all company week where\
    \ we all participated in an internal hackathon. The theme was, \u201C..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 37 from Storj Labs
title: Development Update 37 from Storj Labs

---

Hello Everyone! We hope you are enjoying your summer and staying safe. As a company, we typically meet in person every quarter to fully immerse ourselves into a specific topic or goal. Last week we had a virtual all company week where we all participated in an internal hackathon. The theme was, “Drink our own champagne.” Each team was tasked with building an application, connector, script, or anything that used Tardigrade as a storage layer. We ended up with 10 different teams all working on different projects that utilized the Storj Network to solve our own real-world problems or finish some of our hobby projects! We’ll be sharing details about these projects in a series of blog posts we will be publishing in the next few weeks, so look for those.

Aside from our hackathon projects, here are some of our development accomplishments from the last month:

### Development Accomplishments:

* We’ve migrated all of the Satellite CloudSQL databases to a self-hosted CloudSQL so we have more control over tuning and optimization. This is already helping us improve our performance on Tardigrade Satellites.
* We have also migrated all of the Satellite meta info databases to CockroachDB! CockroachDB is a distributed SQL database that scales horizontally. This means that as we continue to increase the amount of data (and metadata) we store on the network, we’ll be able to scale without any major issues.
* We’ve made improvements to Tardigrade invoices so customers can easily understand everything they’re billed for.
* We added support for Storj as a backend on Rclone. This was a huge accomplishment for our team because it allows anyone to use Rclone and store data on Tardigrade. Check our [documentation](https://documentation.tardigrade.io/how-tos/sync-files-with-rclone) or this [pull request](https://github.com/rclone/rclone/pull/3699) to learn more.
* We launched [QNAP NAS apps for both Storage Nodes and Tardigrade users](https://storj.io/blog/2020/05/turn-your-qnap-device-into-a-storage-node-backup-your-nas-to-the-cloud/). This will allow anyone with a QNAP device to turn their NAS into a Storage Node to utilize its extra resources. It also allows anyone to back up their QNAP NAS to deceive the decentralized cloud.
* We launched support for [MongoDB backups via MongoDB Ops Manager](https://storj.io/blog/2020/06/storj-labs-partners-with-mongodb/). Now users can easily back up their databases to Tardigrade through the MongoDB GUI.
* We’ve decided to take [‘the lean startup’](http://theleanstartup.com/) approach to our espresso-making by measuring grind size, amount of grinds used (grams), length of espresso pour (seconds), and the total weight of the pour (grams). With this data, we’ll be able to pour, measure, taste, and iterate more quickly towards the perfect shot of espresso.

### In Our Next Post, We'll Cover:

* The progress we’re making on connectors for all of your database backup needs.
* Publishing some of our hackathon projects externally so the community can start utilizing these tools and projects for yourselves.
* The Linux installer and auto-update functionality which will make it possible to run a Storage Node on Linux without using Docker.
* Enhancements to graceful exit for Storage Nodes.
* Adding some more Storage Node Operator payout information on the Node Dashboard.
* Our progress we are making to simplify the SNO Auth Tokens experience as well as some updates to the SNO dashboard.

Until now, we’ve been aiming to issue our development updates every two weeks. Moving forward, we’ll be issuing our development updates on a monthly basis. Watch for our next one at the end of July.

### For More Information:

* A view into our sprints:
* [Tardigrade User Growth Team](https://storjlabs.aha.io/published/70af3a68a53be05165a201b0d5fb9995?page=1)
* [Storage Node Operator Growth Team](https://storjlabs.aha.io/published/f34da8a62ece8e183af5ceef0d55e82b?page=1)
* [Storj Network Maintain Team](https://storjlabs.aha.io/published/56dfa608b6d83ef613bc6c4bfad96f10?page=1)
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
