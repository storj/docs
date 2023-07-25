---
title: How is the online score calculated?
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-03-03T08:35:46.000Z
docId: p7qPegEKWZtjlC0fKCRB7
redirects:
  - /dcs/resources/faq/how-the-online-score-is-calculated
---

The implementation matches the design doc here: [Storage Node Downtime Tracking with Audits](https://github.com/storj/storj/blob/c2a97aeb143791dd7edd8bea5bb43558a95b57de/docs/blueprints/storage-node-downtime-tracking-with-audits.md).

In production, we have 12-hour windows and a 30-day tracking period, which translates to 60 windows per tracking period and two windows a day. Every single audit the storage node gets will affect its online score to some extent. For example, if a node got audited during 30 seconds of downtime, that offline audit will have a negative effect on the `online_score` of the storage node. But other audits that happened inside the same 12 hour window will be equally weighted.

So in one 12-hour window, if a storage node gets 1 offline audit and 10 total audits, the `online_score` *for that window* will be 0.9. Then, the score for that window will be averaged with all the other windows in the 30-day tracking period to calculate the storage node's overall `online_score`. So if this storage node had perfect uptime outside of the 12-hour window mentioned above, the online score would be approximately

(59 \* *1.0 + 1 \* *0.9)/60 = 0.99833

The `online_score` is reported back to nodes not immediately but with some delay (up to 12 hours), so it may not drop until long after the downtime happened.

For a more detailed description of the downtime tracking calculations, please refer to this [blueprint](https://github.com/storj/storj/blob/c2a97aeb143791dd7edd8bea5bb43558a95b57de/docs/blueprints/storage-node-downtime-tracking-with-audits.md).
