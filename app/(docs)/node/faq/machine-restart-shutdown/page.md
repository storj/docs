---
title: What if my machine restarts or shuts down?
docId: M-Yv2DFc-OFZ4r9Q8b8HY
redirects:
  - /node/resources/faq/machine-restart-shutdown
---

If you have properly mounted your hard drive (if on Linux, [](docId:nZeFxmawYPdgkwUPy6f9s)), then your Node should start up again automatically after your machine has rebooted.

However, power failures on [](docId:hbCGTv1ZLLR2-kpSaGEXw) or other abrupt disconnections may cause database corruption leading to errors such as: `database error: database disk image is malformed` or `database: file is not a database` in [](docId:O68S24Iww4ZEnVk8yO7Mv)).

Incorrect mounting could lead the Node to not recognize the proper data location where the Node was previously storing the data, resulting in node crash.

In case of using the storagenode docker version, it will continuously restarted until the Node Operator would fix the problem.

In case of using the Windows GUI, the service will not restart automatically and the Node Operator should fix the problem and [](docId:Zh_lD6UPciHT53wOWuAoD).

Such failures should be attended to immediately as they can lead to the node getting disqualified.

[Here are instructions on how to fix a malformed database disk image](https://support.storj.io/hc/en-us/articles/360029309111-How-to-fix-a-database-disk-image-is-malformed-). If the database is not recognized ("file is not a database"), recovery of this database will be impossible, and you will need to [recreate it](https://support.storj.io/hc/en-us/articles/4403032417044-How-to-fix-database-file-is-not-a-database-error).

If you need assistance, please ask on our [forum](https://forum.storj.io/c/sno-category).
