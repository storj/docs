---
title: How is the online score calculated?
docId: p7qPegEKWZtjlC0fKCRB7
redirects:
  - /node/resources/faq/how-the-online-score-is-calculated
---

The implementation matches the design doc here: [Storage Node Downtime Tracking with Audits](https://github.com/storj/storj/blob/c2a97aeb143791dd7edd8bea5bb43558a95b57de/docs/blueprints/storage-node-downtime-tracking-with-audits.md).

In production, we have 12-hour windows and a 30-day tracking period, which translates to 60 windows per tracking period and two windows a day. Every single audit the storage node gets will affect its online score to some extent. For example, if a node got audited during 30 seconds of downtime, that offline audit will have a negative effect on the `online_score` of the storage node. But other audits that happened inside the same 12 hour window will be equally weighted.

So in one 12-hour window, if a storage node gets 1 offline audit and 10 total audits, the `online_score` _for that window_ will be 0.9. Then, the score for that window will be averaged with all the other windows in the 30-day tracking period to calculate the storage node's overall `online_score`. So if this storage node had perfect uptime outside of the 12-hour window mentioned above, the online score would be approximately

(59 \* 1.0 + 1 \* 0.9)/60 = 0.99833

The `online_score` is reported back to nodes not immediately but with some delay (up to 12 hours), so it may not drop until long after the downtime happened.

You may see a [graphical explanation](https://forum.storj.io/t/online-score-not-updating-2-weeks/26444/9?u=alexey) on the forum:

![](https://link.storjshare.io/raw/jvgdmqtyhgztaeyejjekh5dcywha/docs/images/34de4ae4675ad987b387f29be4342033e9b606bf.jpeg)

You may use [these scripts](https://forum.storj.io/t/my-uptime-should-be-100-on-all-satellites-i-have-not-gotten-any-uptime-robot-notifications-of-downtime-in-months/14694/2?u=alexey) to find out when your node was offline.

For a more detailed description of the downtime tracking calculations, please refer to this [blueprint](https://github.com/storj/storj/blob/c2a97aeb143791dd7edd8bea5bb43558a95b57de/docs/blueprints/storage-node-downtime-tracking-with-audits.md).
