---
author:
  name: Brandon Iglesias
date: '2021-09-08 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: "Hello Everyone! Summer is coming to an end, and we\u2019re looking\
    \ forward to cooler temperatures (at least here in Atlanta, Georgia where we are).\
    \ Currently, we\u2019re hyper focused on the user experience for our Storj DCS\
    \ customers and we\u2019re continuing to focus on the performance, security, and\
    \ reliabil..."
  title: September 2021 Development Update
title: September 2021 Development Update

---

Hello Everyone! Summer is coming to an end, and we’re looking forward to cooler temperatures (at least here in Atlanta, Georgia where we are). Currently, we’re hyper focused on the user experience for our Storj DCS customers and we’re continuing to focus on the performance, security, and reliability of the network.   


### **Open source and open data — Storj DCS network statistics:**

* In case you missed it, we [officially released](https://storj.io/blog/open-source-and-open-data-storj-dcs-network-statistics) Storj network statistics data. All the data we published can be found [here](https://stats.storjshare.io/). Dig in!
* If you’re interested in new data points and statistics, we’re planning on exposing—or if you have a suggestion please check out the [github repo](https://github.com/storj/stats).

### **New features:**

* Everyone with a Storj DCS account with a payment method on file was automatically upgraded to Pro Account limits. This means 25 TB of storage and 100 TB bandwidth per project, with a limit of three projects. That equates to 75 TB of storage and 300 TB egress total across all projects.
* Multi Factor Authentication (MFA) has been added to the Satellite GUI for an extra layer of added security and protection. We highly recommend all Storj DCS users to enable MFA on their accounts, immediately—like seriously, go do it now.
* We added safety checks for Storage Node audits for all Node Operators. This check ensures Satellites aren’t auditing pieces that were previously expected to be deleted from Nodes.
* We’ve started officially releasing binaries for the multi Node dashboard. The multi Node dashboard allows Node Operators to manage their Nodes in a more efficient manner. If you’re part of our community and want to start contributing code to this project, please feel free to let us know how to improve upon what we have so far if you have ideas.
* We’ve added the ability for users to update and see their promo code details.
* For more information about smaller items we’ve completed last month, please look at our changelogs: [v1.35.3](https://forum.storj.io/t/changelog-v1-35-3/14827), [v1.36.1](https://forum.storj.io/t/changelog-v1-36-1/14882), and [v1.37.1](https://forum.storj.io/t/changelog-v1-37-1/15039).

### **Upcoming features from our product roadmap:**

* The ability within uplink to set the concurrency when downloading data. This allows customers to saturate their networks and achieve the best performance possible from Storj DCS.
* Server side move/ copy.
* New account onboarding is now smoother and more educational; specifically around the different ways to leverage Storj DCS.
* New updates to the Satellite UI to improve consistency across the user experience.

### **For more information:**

* Dive into our code or contribute by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out to us by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum.](https://forum.storj.io)
