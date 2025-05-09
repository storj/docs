---
title: "How to fix database: file is not a database error"
docId: f8bed9a6-755f-4860-a5bb-ce2b1a51f8b0
redirects:
  - /hc/en-us/articles/4403032417044-How-to-fix-database-file-is-not-a-database-error
  - /hc/en-us/articles/4403032417044
---
If your node was abruptly terminated due to power failure, the database file could be irreversible corrupted, you can see an error `Error starting master database on storagenode: database: file is not a database` in [your logs](docId:O68S24Iww4ZEnVk8yO7Mv).

# Find out which database is corrupted
The Storage Node software might not mention which database is corrupted or errors displayed are not immediately understandable to the node operator. In this case we recommend to check all databases, as described in the article [How to fix a "database disk image is malformed"](docId:b75703c5-1484-4a1d-88fe-eb489dfc5554). 

{% callout type="warning" %}
Please note - the linked article will not help to recover database in state "file is not a database."
{% /callout %}

Once you discovered which database is irreversibly corrupted, you can continue with fixing.

# Recreate corrupted database(s)
1. [Stop the storagenode](docId:Zh_lD6UPciHT53wOWuAoD)
2. Delete the corrupted database(s), include file(s) with `.db-shm` and `.db-wal` extensions.
3. Move all remaining databases (`*.db`) to the backup folder (*the database files are placed in the storage location by default [unless you have changed that](https://forum.storj.io/search?q=move%20databases%20%23database%20%23sno-category%3Asno-faq%20)*). 

{% callout type="warning" %}
Please note, no databases should remain in the current database location, otherwise they will not be recreated in the next steps. The node will recreate all databases only if there wouldn't be any.
{% /callout %}

4. [Start the storagenode](docId:Zh_lD6UPciHT53wOWuAoD)

*it will re-create all databases, but they will be empty. Wait until all migrations are applied*.

5. Stop the storagenode
6. Move backed up databases back with replace
7. Start the storagenode
8. [Check your logs](docId:O68S24Iww4ZEnVk8yO7Mv)

{% callout type="warning" %}
Please note - since we recreated the database(s) from scratch, some statistics such as bandwidth or disk usage and payout information for shutdown satellites (like the now deprecated Stefan, Europe-North-1 and US2 satellites) could be lost, however it will not prevent the storage node from working.
{% /callout %}

# Still have issues?
Ask on the [forum](https://forum.storj.io)!
