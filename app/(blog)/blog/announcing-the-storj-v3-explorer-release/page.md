---
author:
  name: JT Olio
date: '2019-02-01 00:00:00'
layout: blog
metadata:
  description: The wait is over for storage node operators! We have launched the Storj
    network V3 Explorer release, which is the alpha that allows storage node operators
    to join the network! We know many of you have been waiting to join the V3 network
    as storage node operators to start earning STORJ tokens by s...
  heroimage: /blog/announcing-the-storj-v3-explorer-release/c12f0143a9f81c8c.png
  title: Announcing The Storj V3 Explorer Release
title: Announcing The Storj V3 Explorer Release

---

The wait is over for storage node operators! We have launched the Storj network V3 Explorer release, which is the alpha that allows storage node operators to join the network! We know many of you have been waiting to join the V3 network as storage node operators to start earning STORJ tokens by sharing your unused hard drive space and bandwidth. Today we will be sending invites to the first folks on our waitlist. If you receive an email, follow the instructions to set up your node. It may take several months to get through our entire waitlist. If you are still operating a V2 node, we encourage you to keep this node running until V3 beta.

During the Explorer alpha, storage node operators will be paid for the storage and bandwidth used by the network. Between now and the next phase of our alpha (which is slated for April), Storj will be controlling the flow of data on the V3 network. This will help us fine-tune the network and establish a baseline before partners and developers join and begin storing their data on our network of storage nodes. 

#### Supported Operating Systems for Explorer At Launch

At launch, we will support Linux (AMD 64 & ARM), Mac OS, and Windows 10 Pro operating systems for our storage node operators. Storage node operators who are running Windows Home as the OS for their storage nodes will encounter issues when running the Explorer Docker image. Windows Home users will need to wait for an upcoming update to our release before they are able to join the V3 network, will need to switch to a different OS, or upgrade to Windows Pro. If you would like to wait until the update to our binary before joining the network, save your authorization token and we will notify all storage node invitees when this issue has been corrected.

#### What to Expect During Explorer Alpha

We are very excited to be shipping the Explorer alpha ahead of our initial schedule. We previously estimated to release Explorer mid-to-late February and we are now going live February 1st. 

The reason we are shipping in alpha, rather than waiting until beta, is because we realize how sensitive it can be to store people’s data. Developers are often told to “fail fast” and “move fast and break things.” This mantra works great in non-mission critical applications, but when it comes to securely and reliability storing people’s data, the threshold for tolerating “breaking” and “failing” is drastically lower than arguably any other space. 

That means we need a rock-solid product by the time we reach production, otherwise we could not provide enterprise-grade SLAs. If we could not guarantee reliability, no one would want to store data on the network, and you can’t have a storage network with no data to store. The various phases of our alpha allow us to ensure the product reaches the durability levels we expect it can and allow storage node operators to build reputation before a deluge of data hits the network. Please do share feedback with us and [let us know how we can improve the product](https://ideas.storj.io), the experience and all the nooks and crannies in between. 

#### Sign Up for the Waitlist

We don’t expect to make it through our waitlist extremely quickly. We have more than 4,000 people currently on the waitlist and these folks have many petabytes of data to share. We will be carefully growing the network, focusing only on supply until the next phase of our alpha, which is slated for April.

If you have not yet signed up for the waitlist, [you can still sign up](https://storj.io/sign-up-farmer). You will be added to the queue and receive a notification once the waitlist is ready to accept new participants. 

#### How to Be a Successful Storage Node Operator

Being a successful storage node operator on the V3 network will require a bit more diligence than it did on the V2 network. That said, don’t fear! We have everything you need to understand how to be successful. 

We’ve covered all the main details in our recent blog series for storage node operators, including topics like how reputation is calculated and why it matters, how payments for storage node operators will work, how much storage node operators can earn, and how the intricacies of the network will function. If you haven’t read these posts, please take some time to read them and ask us questions in the comment section below each blog post. Here is a short summary of each. 

#### Why (Proof-of-) Replication is Bad for Decentralized Storage, Part 2: Churn and Burn

We began our recent series looking at the importance for storage node operators to [stay connected to the network](https://storj.io/blog/2019/01/why-proof-of--replication-is-bad-for-decentralized-storage-part-2-churn-and-burn). Every time a storage node operator abruptly and permanently leaves the network without completing a “graceful exit” (more on this later), they take the files they had stored offline, making file repair necessary. This post looks at how this impacts file durability and the math behind the network architecture. Suffice it to say the best thing you can do is set up your node, leave it connected to the network, and let the software do its thing! 

#### We need great storage node operators for the V3 network! Have you got what it takes to succeed?

As mentioned before, the metrics for success are very different on the V3 network, compared to the V2 network. This post outlines [what it takes for storage node operators to be successful](https://storj.io/blog/2019/01/we-need-great-storage-node-operators-for-the-v3-network-have-you-got-what-it-takes-to-succeed/), including onboarding, hardware requirements, how storage nodes impact file durability on the network, incentives, and much more. 

#### Reputation Matters When it Comes to Storage Nodes

One of the most critical things for storage node operators to understand is [how their node’s reputation impacts their earnings on the network](https://storj.io/blog/2019/01/reputation-matters-when-it-comes-to-storage-nodes/). When it comes to storage nodes, reputation is everything! On the V3 network, reputation is a nuanced, multifaceted statistical model incorporating dozens of factors. Reputation touches many different parts of the network, including Satellite/storage node interaction, file repair and storage contracts. There are more than 30 reputation factors that impact a storage node’s overall reputation, making it much more complex than the previous network! Check them out to better understand how your node’s behavior will impact your STORJ token earnings.  

#### New Guidelines for Storage Node Operators in the United States

On the new V3 network, US-based storage node operators who expect to earn more than $600 per year will have to provide additional information during the sign-up process to comply with US tax law. Because of Storj Labs’ presence in the United States, any node operator that is located in the US (or has an IP address connected to the US) earning over this threshold will need to share some standard tax information to receive payments over $600. If you’re based in the US, [read more about this here](https://storj.io/blog/2019/01/new-guidelines-for-storage-node-operators-in-the-united-states/). 

#### What Every Node Operator Wants (and Needs) to Know About the Explorer Release

When storage node operators signed up for our [V3 waitlist](https://storj.io/sign-up-farmer), we gathered information about the environment where their node is located to ensure their nodes were well suited for the type of network we are creating. [We analyzed these stats and found that our storage node operators generally have great setups that will help the V3 network thrive](https://storj.io/blog/2019/01/what-every-node-operator-wants-and-needs-to-know-about-the-explorer-release/). Here we also covered when the community could expect the new V3 network (SURPRISE, IT’S HERE!) and some specifics around waitlist phases, the gating process and onboarding. 

#### Sharing Storage Space for Fun and Profit

Our most recent blog post looked at the topic everyone has been waiting for! [How much can you earn running a node on the Storj network?](https://storj.io/blog/2019/01/sharing-storage-space-for-fun-and-profit/) Read about how payments work on the Storj network, including an overview on the incentive structure, held amount model, sample calculations, [storage node earnings estimator](https://storj.io/storage-node-estimator), and graceful exit, which allows storage nodes to leave the network without taking data with them. 

We realize this is a lot of information to read, but doing so will ensure you can be all that you can be on the Storj network. 

We thank all of our community members for their support during this V3 rebuild! We are excited to get everyone access to the V3 network so we can all begin storing data or earning STORJ tokens (or both) across the Storj ecosystem! See you in the cloud!

