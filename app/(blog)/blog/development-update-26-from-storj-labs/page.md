---
author:
  name: Brandon Iglesias
date: '2019-07-18 00:00:00'
layout: blog
metadata:
  description: "As we get closer to launching Pioneer 1 (our first beta release),\
    \ we\u2019ve been burning the midnight oil finishing features and squashing bugs!\
    \ We expect we\u2019ll be launching this release in the next few weeks, so be\
    \ on the lookout. From V0.14.3 to V0.15.3 releases we had over 200 PRs get merged\
    \ into ..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 26 from Storj Labs
title: Development Update 26 from Storj Labs

---

As we get closer to launching Pioneer 1 (our first beta release), we’ve been burning the midnight oil finishing features and squashing bugs! We expect we’ll be launching this release in the next few weeks, so be on the lookout. From V0.14.3 to V0.15.3 releases we had over 200 PRs get merged into our V3 codebase. If you haven't had a chance to watch our [town hall](https://www.youtube.com/watch?v=S5coCag7vR4&t=2273s) from last week, please check it out, it has tons of information about where we’re headed. 

#### Recent development accomplishments:

* We made some network protocol level changes ahead of our network wipe. This will allow us to be ready to support backward compatibility during the Pioneer 1 release coming in the next few weeks.
* We improved the file repair process to store pieces it repairs, even if it doesn’t hit the success threshold—this will give the file more overall durability.
* We decreased how long order limits are valid for from 45 to 14 days. This way, we don't have to hold onto them for so long, reducing the amount of data stored.
* We fixed a number of bugs and made some enhancements to the Satellite UI for an improved UX.
* We added rollups for bandwidth usage on the storage nodes to reduce the amount of disk usage the Storage nodes use.

#### In our next post, we’ll cover:

* Storage Node database optimizations so that the nodes on the network run smoother and more efficiently.
* Design docs for the features we’re planning on implementing as a part of our Pioneer 2 release. The docs will be posted and discussed between our team and community in the [forum](https://forum.storj.io/c/engineer-amas/design-draft).
* Finishing up the last few features in our Pioneer 1 release.
* Improving the Satellite database performance so we can handle more users and more files being uploaded to the network.
* Measuring network performance in order to determine what needs to be improved or optimized.

#### For more information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/06/development-update-25-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
