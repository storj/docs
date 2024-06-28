---
author:
  name: Jennifer Johnson
date: '2019-03-04 00:00:00'
layout: blog
metadata:
  description: "At last, the moment you\u2019ve been waiting for. Storage node operators\
    \ (SNOs), here\u2019s your lucky day. We\u2019re telling you exactly how and when\
    \ you get paid! \U0001F4B8\U0001F4B8\U0001F4B8By the time this blog post is published,\
    \ it will have been one month since we launched the V3 network Explorer release,\
    \ the public alpha for S..."
  heroimage: /blog/so-youre-ready-for-your-first-payday-as-a-storage-node-operator/f597592e440fac90.png
  title: "So You\u2019re Ready for Your First Payday as a Storage Node Operator"
title: "So You\u2019re Ready for Your First Payday as a Storage Node Operator"

---

At last, the moment you’ve been waiting for. Storage node operators (SNOs), here’s your lucky day. We’re telling you exactly how and when you get paid! 💸💸💸

By the time this blog post is published, it will have been one month since we launched the V3 network Explorer release, the [public alpha for SNOs](https://storj.io/blog/2019/02/announcing-the-storj-v3-explorer-release/). To all those who have joined the network, thank you! And to all those who are still waiting for your invites, thank you for your patience! New invites are going out each day so watch your inboxes. 

In addition to earning reputation to increase your ultimate payout, a benefit of helping us test our network during this current alpha is that we pay you like we would during production. As described at length in [Sharing Storage Space for Fun and Profit](https://storj.io/blog/2019/01/sharing-storage-space-for-fun-and-profit/), we pay node operators as follows: 

* Static Storage (on-node HD space): paid at $1.50 per terabyte month (TBM)
* Egress bandwidth (downloads by Uplinks): $20 per TB of utilized bandwidth
* Repair bandwidth (downloads by Satellites): $10 per TB of utilized bandwidth

It’s important to note that at the time of publication, Storj Labs is paying only for the trusted Tardigrade Satellites found on this [list](https://tardigrade.io/trusted-satellites). Your storage node must be connected to one of these Satellites if you would like to be compensated. Because all of our software is open source, there may be other parties setting up Satellites and running storage environments. If you are connected to—and storing data for—a third party Satellite, you may not be compensated. Don’t worry, in your storage node configuration, you will be able to whitelist the Satellites from which you’ll accept data.

As an open source company, we aim to be as transparent as we can in our methodology as well. Much of our platform is described in our 85-page [white paper](https://storj.io/white-paper), but there are details we are still designing as we go. One of these features is our V3 payments system. We will share our MVP design with you here today. 

The V3 payments system occurs in 3 steps: accounting (tally and rollup), report generation, and payment. 

Accounting starts with the tally service. Every hour we check the pieces on the network and on which nodes they are stored. Piece sizes are summed to calculate the current hour’s static storage. Here’s an example to help us explain. Note that this example is simplified for demonstration purposes and may not represent real network activity. 

Let’s assume 5GB of data is uploaded to your storage node every hour and continues at this rate for the whole month of February. At 1:00 am on February 1, the tally service runs and accounts for 5 gigabytes stored on your node the hour between midnight and 1 am. This equates to 5 gigabyte hours (GBh). At 2:00 am, it runs again and calculates 15GBh. At 3:00 am, we get 30GBh. The tally service runs like this every hour. 

Next, we look at the rollup service. Every 24 hours, rollup service sums the previous day’s tally data and aggregates bandwidth agreements that were sent within the past day. Using the example above, the rollup entry for your node for Feb 1 would be 1500GBh. Additionally, let’s say that on that same day 100GB of data was downloaded from your node and 10GB of data was repaired, resulting in corresponding egress and repair bandwidth agreements. Feb 2 would show 5880GBh static, 100GB egress, and 10GB repair. This data is stored in the rollup table and is queried in the final phase of payments.

Every month, we generate a payment report that includes each NodeID, rollup data, operator wallet address, node creation date, and audit information. We use the node creation date to calculate [escrow withholdings](https://storj.io/blog/2019/01/sharing-storage-space-for-fun-and-profit/) and audit information to determine any disqualifications. In our example, our report for your node would show 1130.64TBh static data, 100GB\*28 days = 2.8TB egress and 10GB\*28 days = 0.28TB repair bandwidth for the month of February. Converting our static storage to TBM, we get 1130.64TBh/(24h\*28days) = 1.6825TBM. The chart below shows the data added to your node every hour, the total data on your node at the beginning of the hour, and the resulting gigabyte hours. Hour 0 represents midnight Feb 1. You can recreate the calculations in the last column using the [equation](https://bit.ly/2EtUjVk):

![](/blog/so-youre-ready-for-your-first-payday-as-a-storage-node-operator/b6b8386771375187.png)where *b* = 5 and *n* = total hours.

 \*\*Storage Node Static Data\*\* 

![Storage Node Static Data](/blog/so-youre-ready-for-your-first-payday-as-a-storage-node-operator/2319262679a9c69e.png)Finally, it’s payday! Within 2 weeks after the end of each month, we will send STORJ tokens valued in USD to the wallet addresses provided by storage node operators. Make sure yours is correct, as there’s no way to re-send payments to an incorrect address after the fact. In our example, if you’ve been well behaved, you could expect the following payout for the month of Feb (before withholdings): 

* Static: 1.6825TBM \* $1.5 = $2.52
* Egress: 2.8TB \* $20 = $56
* Repair: 0.28TB \* $10 = $2.8
* Total: $61.32

And that’s it! Yes, we know this may take a couple of read-throughs to wrap your head around. But remember it is our MVP and we just want to make sure our community of nodes gets paid what they deserve, and on a timely basis. It may not the most efficient system, but we hope it runs a bit smoother than our V2 system (which worked with a more complex contracts system and only nodes active within the last week would have been paid). It also created a huge burden on our data science team in the process. Overall, we think our V3 payments system is easier to understand, and we aim to be as transparent as possible to our users.

**A Note About February Payments**

For this first payment cycle on the V3 network, we will be making payouts to storage node operators more broadly and will not incorporate downtime into payment calculations. We hope this grace period will help storage node operators get used to achieving the uptime needed to maintain a positive reputation on the V3 network. Only by maintaining high uptime, and earning a strong reputation on the network, can storage node operators maximize the amount of data they receive from Satellites and their earning potential. As we approach the latter stages of the alpha and into beta, we will begin mirroring the payout model that will occur in production. 

In addition, we will be paying for all data stored, regardless of reputation. The data we have gathered from the telemetry of different quality nodes has been very valuable to us as we refine the V3 network ahead of production launch. We are not currently implementing containment mode and disqualification but will be in future updates.

As we move forward in the months to come, release new versions of our alpha, and begin to implement a production payout model, we will share more info around payouts. 

Last but not least, we’re excited to continue [testing the Raiden network](https://storj.io/blog/2018/12/taking-payments-to-the-next-level-with-raiden/) and have high hopes for integrating their technology into our product, making storage node payments smoother and faster. If you have any questions about how payments work on V3, please don’t hesitate to reach out on [our community Rocket.Chat](https://storj.io/community/)!

