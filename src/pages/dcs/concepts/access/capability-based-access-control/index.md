---
title: Capability Based Access vs Access Control Lists
slug: concepts/access/capability-based-access-control
createdAt: 2022-05-19T22:20:21.000Z
updatedAt: 2023-03-03T08:30:09.000Z
docId: UmcbVZxfA8YJzjeq035-8
---

Why decentralized cloud has a better security model than Cloud ACL

From a security-design standpoint, the capability model introduces a fundamentally better approach to identity and access management than Public Cloud’s ACL framework.

By tying access to keys, rather than a centralized control system, capability-based models push security to the edge, decentralizing the large ACL attack vector and creating a more secure IAM system.&#x20;

The capability-based model solves both the ambient authority trap and the confused deputy problem by design.

**What is a capability?**

Often referred to as simply a ‘key,’ a capability is the single thing that both designates a resource and authorizes some kind of access to it. The capability is an unforgeable [token](https://en.wikipedia.org/wiki/Access_token) of authority.

Those coming from the Blockchain world will be very familiar with the capability-based security model, as it is the model implemented in Bitcoin where “your key is your money”.

This gives the client-user full insight into their privilege set, illustrating the core tenet of the Capability Mindset: “[don’t separate designation from authority.](https://crypto.stanford.edu/cs155old/cs155-spring09/papers/ConfusedDeputy.html)”.

Similar to how in the Blockchain world, “your keys are your money,” with Storj DCS, your keys are your data, and access grants add additional capabilities that allow the owners of data to caveat it, or granularly delegate access for sharing, programmatically.

Key-based ownership of object data will enable users to intuitively control their data as a first principle, and then delegate it as they see fit. The decentralized cloud eliminates the increasingly apparent risk of data loss/extortion due to holding data on one single provider (like Amazon, Google, or Microsoft).&#x20;

Storj DCS presents a better model where object data is encrypted, erasure-coded, and spread across thousands of nodes stratified by reputation whereby any and every computer can be the cloud.

