---
author:
  name: Brandon Iglesias
date: '2021-05-03 00:00:00'
layout: blog
metadata:
  description: "We\u2019ve been working hard to create product-changing features for\
    \ our customers and on April 20th, 2021 we officially launched Storj DCS; Decentralized\
    \ Cloud Storage for Developers. With this launch came a bunch of new features\
    \ you can start utilizing to build onto Storj DCS!"
  heroimage: /blog/may-2021-development-update-from-storj/71d8a35b9b3f6042.png
  title: May 2021 Development Update from Storj
title: May 2021 Development Update from Storj

---

Hello Everyone! As we mentioned in our last product update, we’ve been working hard to create product-changing features for our customers and on April 20th, 2021 we officially launched [Storj DCS](https://www.storj.io/blog/introducing-storj-dcs-decentralized-cloud-storage-for-developers); Decentralized Cloud Storage for Developers. With this launch came a bunch of new features you can start utilizing to build onto Storj DCS!  


#### **New Storj DCS features:**

* We’ve added an object browser to the Satellite GUI. This gives you the ability to create buckets, upload objects, download objects, and even generate Storj share links directly in the web browser.
* The object browser takes advantage of another feature we just released, called Gateway MT. Gateway MT uses server-side encryption for S3 compatibility.
* We’ve enabled and deployed Gateway MT on all of the Storj DCS Satellites. You can learn about Gateway MT [here](https://www.storj.io/blog/announcing-the-new-storj-hosted-s3-compatible-gateway).
* All Storj DCS Satellites now have multipart upload support. This allows you to upload large files more reliably.
* We finished migrating the Satellite DBs to CRDB and enabled Satellites to be multiregion. This means the metadata we store about the data on the network is stored on multi region CRDB clusters and Satellites will stay running even if we lose a whole region.
* Tons of UI/ UX improvements to the Satellite GUI.
* For more information about smaller items we’ve completed last month please check out these change logs: [v1.26.3](https://forum.storj.io/t/changelog-v1-26-3/12857) & [v1.28.2](https://forum.storj.io/t/changelog-v1-28-2-title-has-already-been-used/13483).

#### **Planned updates coming soon:**

* Improving the Uplink CLI UX.
* Adding support for atomic server-side rename of a single object at a time. This will give customers the ability to rename an object without having to upload it.
* Officially releasing the linux installer/ auto updater for Node software. This feature is currently under [tech preview.](https://forum.storj.io/t/tech-preview-linux-storage-node-updater/10041)
* Continuing development on the Multi Node Dashboard for Node Operators. This feature is also under [tech preview](https://forum.storj.io/t/tech-preview-storage-node-multinode-dashboard/11749).

We have a lot of new exciting news we can’t wait to share soon, so please stay tuned for our next product update!  


#### **For more information:**

* Dive into our code or contribute by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out to us by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum.](https://forum.storj.io)
