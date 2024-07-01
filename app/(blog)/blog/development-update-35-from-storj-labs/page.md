---
author:
  name: Brandon Iglesias
date: '2020-03-27 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: Hello Storjlings! We took a little sabbatical from our normally scheduled
    bi-weekly development updates, but during that time we did a few small things.
    We launched Tardigrade into GA production! Ok, it was a BIG thing. What this means
    is that anyone can start utilizing our decentralized cloud st...
  title: Development Update 35 from Storj Labs
title: Development Update 35 from Storj Labs

---

Hello Storjlings! We took a little sabbatical from our normally scheduled bi-weekly development updates, but during that time we did a few small things. 

We launched Tardigrade into GA [production](https://storj.io/blog/2020/03/general-availability-for-tardigrade-is-here/)! Ok, it was a BIG thing. What this means is that anyone can start utilizing our decentralized cloud storage network by going to [tardigrade.io/satellites](https://tardigrade.io/satellites/) and creating an account. We have over 5,000 users with accounts already and we're hoping to continue to drive growth on our network with the next set of [open source, partner connectors](https://tardigrade.io/blog/post/community/building-tardigrade-connectors/) we're building. These connectors allow users to easily integrate Tardigrade as the backend storage layer to their applications. They also help open source projects generate revenue, as we give these partners a very healthy cut of the revenue generated from every GB of data stored or retrieved on Tardigrade. If there's a connector you would find useful or would like to build, please reach out to us on the [forum](https://forum.storj.io/c/parent-cat/5).

Along with launching the GA production release of Tardigrade, we've had some major changes within Storj Labs. We switched our espresso intake from cappuccinos to cortados to increase the velocity at which we can ingest caffeine. We also reorganized our entire company around three major teams: The Tardigrade User Growth Team, The Storage Node Operator Growth Team, and The Storj Network Maintain Team. We made this change to give our teams more autonomy over specific goals, to enable us to iterate more quickly on functionality based on user feedback, and to ensure company-wide alignment on our strategic initiatives. Our focus is to give Tardigrade and Storj users the best possible experience.

We hope you, your families, and your teams are staying safe and healthy during these difficult times with the global situation and Covid-19. We're doing great so far. Since we're already quite decentralized—with 45 employees across 10 countries and 22 cities—the Covid-19 crisis hasn't impacted the day-to-day function of our team and our fingers are crossed that this trend will continue.

**Development Accomplishments:**

* Tardigrade has officially launched and we're beyond thrilled we've finally reached this milestone. Thanks to our fantastic community members for supporting us throughout this long journey. If you've read all 35 of our development updates (or even half) this includes you!
* We finished the [libuplink](https://github.com/storj/uplink) 1.0 implementation. This helps community members integrate Tardigrade at the programmatic layer.
* We improved the new user flow for creating your first project along with other UI and UX enhancements in the Satellite web interface.
* We increased the API rate limits to allow for more concurrent operations on the network.

**In Our Next Post, We'll Cover:**

* What Open Source Partner connectors are ready, and which connectors are almost finished.
* Our implementation for Storage Node uptime disqualification.
* Refactoring our billing implementation in order to support multiple projects per user.
* Displaying the held amount, along with other payment information on the Storage Node dashboard.
* Implementing distributed tracing across the network, so we can measure operations across the Uplinks, Satellites, and Storage Nodes to determine where we have bottlenecks.
* SNOBoard UI Enhancements like - mobile adaptation, black and white theme
* Linux Installer and Autoupdater

**For More Information:**

* A view into our sprints:
* [Tardigrade User Growth Team](https://storjlabs.aha.io/published/70af3a68a53be05165a201b0d5fb9995?page=1)
* [Storage Node Operator Growth Team](https://storjlabs.aha.io/published/f34da8a62ece8e183af5ceef0d55e82b?page=1)
* [Storj Network Maintain Team](https://storjlabs.aha.io/published/56dfa608b6d83ef613bc6c4bfad96f10?page=1)
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
