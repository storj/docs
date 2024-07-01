---
author:
  name: Brandon Iglesias
date: '2020-05-01 00:00:00'
layout: blog
metadata:
  description: We had our quarterly town hall on April 22. If you weren't able to
    attend, you can watch the video on YouTube. As with every town hall, we provided
    some great updates and this one included a live (well, it was live when it was
    recorded) demo using our Go library bindings for Tardigrade.Beyond the...
  heroimage: ./8855fa2f80969623.png
  title: Development Update 36 from Storj Labs
title: Development Update 36 from Storj Labs

---

We had our quarterly town hall on April 22. If you weren't able to attend, you can [watch the video on YouTube](https://www.youtube.com/watch?v=KddzVRATT3k). As with every town hall, we provided some great updates and this one included a live (well, it was live when it was recorded) [demo using our Go library](https://www.youtube.com/watch?v=lzWv4b5TZiE) bindings for Tardigrade.

Beyond the town hall, the dev teams have been incredibly busy in the wake of our production release. We're working with a wide range of partners and potential customers on some really interesting use cases.

One thing we're really interested in from a product management point of view is understanding how the developers in our community are using the platform. If you're using the Tardigrade network or you have a use case that you think is a good fit, we want to know more about it! Please head over to our [community forum and post an update on what you're doing](https://forum.storj.io/c/engineer-amas/dev-category/11). We'll be scheduling user feedback sessions over the next several weeks to get in-depth feedback on what's working and what features would be most valuable to developers.

But enough about the future. Let's talk about what's happening right now:

**Development Accomplishments**

* Sync files with [Rclone](https://documentation.tardigrade.io/how-tos/sync-files-with-rclone) and back up with [Restic](https://documentation.tardigrade.io/how-tos/backup-with-restic) tech previews. Further tooling integrations with Rclone and Restic are to come, but be sure to check it out—Rclone offers some great additional features the CLI only wishes it had!
* Backup your QNAP to the Tardigrade Platform using our [QNAP Gateway App tech preview](https://documentation.tardigrade.io/how-tos/backup-on-qnap). Currently we're working on a version of the QNAP Gateway App with a setup wizard.
* Monetize your excess capacity on the Storj Network using [QNAP Storage Node App tech preview](https://documentation.storj.io/sno-applications/qnap-storage-node-app). An updated setup wizard UI will be released soon.
* Added payment information to the dashboard for Storage Node Operators to clearly communicate how much revenue they have earned, how much is held, and their earnings for the current period.
* We improved performance on the Satellite by doing some of operations ahead of Uplink requests. Tardigrade users will notice this improvement because uploading and downloading files will take less time overall!
* We finished our distributed tracing implementation! This will allow us to track operations throughout our entire network so that we can determine which steps in the process are slow! For example, when a user uploads an object we can track how long the operations on the user's machine take, how long the operations on the Satellite take, and how long the operations on the Storage Nodes take. With this information we are able to quickly fix major bottlenecks on the network.

**In Our Next Post, We'll Cover**

* Our MongoDB integration for storing your database backups and snapshots.
* Our FileZilla integration which will allow you to transfer files via the Tardigrade platform.
* Progress we have made on our Linux installer/auto updater.
* Our implementation for Storage Node uptime disqualification.
* Refactoring our billing implementation in order to support multiple projects per user.
* Improvements to our auditing and vetting system to more quickly onboard Storage Node Operators.
* Adding the ability to revoke access keys programmatically.

**More Information**

* A view into our sprints
* [Tardigrade User Growth Team](https://storjlabs.aha.io/published/70af3a68a53be05165a201b0d5fb9995?page=1)
* [Storage Node Operator Growth Team](https://storjlabs.aha.io/published/f34da8a62ece8e183af5ceef0d55e82b?page=1)
* [Storj Network Maintain Team](https://storjlabs.aha.io/published/56dfa608b6d83ef613bc6c4bfad96f10?page=1)
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
