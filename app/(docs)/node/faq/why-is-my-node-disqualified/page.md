---
title: Why is my node disqualified?
docId: 2832eccf-8c63-4563-abd7-92ede9dece83
redirects:
  - /hc/en-us/articles/4403035941780-Why-is-my-node-disqualified
  - /hc/en-us/articles/4403035941780
---
Node disqualification is designed to protect customers' data from being lost or getting altered. It's an edge action when the node become unreliable or malicious.

Disqualifications are permanent and not reversible. There are some rare exceptions where disqualifications may be reverted such as, due to a bug in our code or satellite misconfiguration. These special cases are not the subject of this article.

# Reasons of disqualification
A disqualification could happen on one or more satellites for the following reasons:

* too many failed audits (losing more than 4% of audit score: when the audit score falls below the 96% threshold, the node will be disqualified);
* node too long in offline status (more than 30 days);
* too many offline periods.

See:

* [how the audit score is calculated](https://github.com/storj/design-docs/blob/f6b8e7b3124326228ee4ae0e81e06e3d5007edef/20190909-reputation-and-node-selection.md);
* [what initial parameters used for audit score](https://forum.storj.io/t/tuning-audit-scoring/14084/72?u=alexey);
* [design of online detection with audits](https://github.com/storj/design-docs/blob/f6b8e7b3124326228ee4ae0eh81e06e3d5007edef/20200521-access-revocation.md);
* [how the online score is calculated](docId:p7qPegEKWZtjlC0fKCRB7).


# Reasons of failed audits
To be audited, the node should be online and answering to audit requests, otherwise it will [affect the online score](docId:p7qPegEKWZtjlC0fKCRB7) instead of audit score.

So, the node is online, answers to audits but:

* did not provide a piece for audit in 5 minutes. Did the same two more times for the same piece;
* has provided a piece but it's corrupted;
* did not provide a piece with error "file not found".

In such cases, the audit of this piece is considered failed. 40 consecutive failed audits are enough to disqualify the node. However, while 40 consecutive failed audits are sufficient to be disqualified, that’s just the fastest way. The failed audits don’t have to be consecutive - you can also be disqualified e.g., by failing 100 audits with lots of passing audits in between, as any failure of more than 4% of audits over time would lead to disqualification. The higher the percentage that fail, the fewer audits are needed. 40 audits at 100% failure rate is the fastest way to get there. In contrast, at 4% failure rate it would take about 3000 audits to get disqualified.

# How to detect an audit failure
You need to inspect [your logs](docId:O68S24Iww4ZEnVk8yO7Mv) for errors during **GET_AUDIT** and **GET_REPAIR** operations, if they show **failed**, then it will affect the audit score immediately.

Failed audits due to corrupted pieces can be not logged by the storagenode software to make adoption of malicious user harder. However, they could be detected indirectly (see [Detect hanging and silent audit failures](#detect-hanging-and-silent-audit-failures) below). Some corruption errors are logged: [https://github.com/storj/storj/issues/4194](https://github.com/storj/storj/issues/4194)

Failed audits due to timeouts are not logged on the node's side for obvious reason - if the node is unable to provide a piece, it's likely hanging and cannot write a log either. These types of failure are hard to detect, they usually relate to the hardware (SMR disks or dying disks, overheating etc.) or OS (drivers, updates etc.) or other software (antivirus, firewalls, malware or viruses etc.)

When storagenode cannot provide a piece before the 5 minute timeout has expired, it can still respond to audit requests but cannot provide a piece because it becomes incredibly slow (usually SMR disks or dying disks or other hardware / software problems that make the node too slow to respond), even the port will appear open on [https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/), and even UptimeRobot.com would not be able to notice the problem.

Usually a simple reboot is enough to bring storagenode back to life.

# Detecting direct audit failures
Direct audit failures can be detected by keywords in the logs as shown below.

## Linux/MacOS bash
```
docker logs storagenode 2>&1 | grep -E "GET_AUDIT|GET_REPAIR" | grep failed
```
## Windows Docker Powershell
```
docker logs storagenode 2>&1 | sls "GET_AUDIT|GET_REPAIR" | sls failed
```
## Windows GUI Powershell
```
sls "GET_AUDIT|GET_REPAIR" "C:\Program Files\Storj\Storage Node\storagenode.log" | sls failed
```

# Detect hanging and silent audit failures
Hanging and silent audit failures can be detected by a lack of audit requests during long periods in the logs, or started but not finished audits, or by long periods between "download started" and "downloaded" for **GET_AUDIT** or **GET_REPAIR**. This also affects the audit score on the dashboard (it may not display as updated depending on how badly your node is hanging).

For the first sign there is no automation at the moment - you can detect it only visually - usually your node should be audited not less than once an hour. If you see no audits for a long time (it's even visible on your dashboard as lack of audit traffic), this is a reason to be concerned, especially if you see that the audit score starts to fall even by one percent.

For the second sign you can calculate total audits started and total audits finished. If the numbers doesn't match - there could be a problem (the unmatched numbers should not be greater than 7).

For the third sign you can request the time stamps for the exact pieces for one or several satellites: [https://forum.storj.io/t/topic/14848/97](https://forum.storj.io/t/topic/14848/97) 

## Linux/MacOS bash
Number of started audits:
```
docker logs storagenode 2>&1 | grep -E "GET_AUDIT|GET_REPAIR" | grep started -c
```
Number of finished audits:
```
docker logs storagenode 2>&1 | grep -E "GET_AUDIT|GET_REPAIR" | grep downloaded -c
```
## Windows Docker Powershell
Number of started audits:
```
(docker logs storagenode 2>&1 | sls "GET_AUDIT|GET_REPAIR" | sls started).Count
```
Number of finished audits:
```
(docker logs storagenode 2>&1 | sls "GET_AUDIT|GET_REPAIR" | sls downloaded).Count
```
## Windows GUI Powershell
Number of started audits:
```
(sls "GET_AUDIT|GET_REPAIR" "C:\Program Files\Storj\Storage Node\storagenode.log" | sls started).Count
```
Number of finished audits:
```
(sls "GET_AUDIT|GET_REPAIR" "C:\Program Files\Storj\Storage Node\storagenode.log" | sls downloaded).Count
```

# Disqualification for downtime
The disqualification for downtime is implemented only for long downtimes (more than 30 days offline.)

In other cases only a suspension would be applied. However, downtime disqualification could get enabled soon, so better consider it as enabled already.

## Long time offline
If your node was offline or is running a version of the software lower than the minimum allowed version (see [Both nodes remain OFFLINE](https://forum.storj.io/t/both-nodes-remain-offline/4025) for example), it can be disqualified. So please if you are using the docker version of the software, enable [automatic updates](docId:ojIatmeXyCN4rc-GPx8yW#automatic-updates) to protect the node. The Windows GUI and Linux GUI versions already use the automatic updates by default.

## Too many offline events
Your node can be offline for 288 hours before it would get suspended, however, if your node is still relatively new, the online score could be very sensitive, so in general - when the online score falls below 60%, the node will get suspended. While suspended, the node will not receive any ingress traffic, but will still be audited and could have egress traffic.

After a suspension happened, you have a week to fix the issue. If the issue is not resolved (your node is still offline), it may get disqualified.

When you fix the issue and the node comes back online, it needs to stay online for the next 30 days to recover fully.  So during this 30-day recovery time your node will be under review. If the node still is in suspension at the end of the review period - it will be disqualified as unreliable.

Every new offline event will require another 30 days online to recover after the downtime. The review period is not extended.

When the online score rises above the 60% threshold, the node will come out of suspension and receive ingress normally again. See [How is the online score calculated?](docId:p7qPegEKWZtjlC0fKCRB7) for details.

While your node is offline, it can lose pieces due to repair, because offline pieces are considered as unhealthy. The longer the node stays offline - the more of its used space could be freed up due to pieces being repaired to other healthy nodes and this would then also lead to a lower payout.
