---
title: Graceful Exit Guide
docId: ddd68892-8aa9-4f8c-b1d1-4cd41f077334
redirects:
  - /hc/en-us/articles/360039432051-Graceful-Exit-Guide
  - /hc/en-us/articles/360039432051
---
*(This guide was originally published by Jens Heimbürge in [this forum thread](https://forum.storj.io/t/graceful-exit-guide/3618) and updated with a new version of the Graceful Exit implementation [later](https://forum.storj.io/t/graceful-exit-guide-new-procedure-as-of-2023-10/23882). Please read the thread in order to find the most recent updates and changes).*

{% callout type="warning" %}
Warning: Read this carefully before you start
Please read the following information carefully and ask any questions your might have on this forum thread and this one before executing graceful exit.
{% /callout %}

# Requirements
1. Storage node has joined the network more than **15 months** ago (requirement **temporarily reduced to 6 months**).
2. Storage node is **healthy** and **hasn’t lost any significant amount of data**. Disqualification during graceful exit is possible.
3. Storage node will have **no huge downtime** during the graceful exit period (30 days). The uptime score requirement is higher during graceful exit (0.8) than it is normally (0.6). If your node has too much downtime during the graceful exit period, the graceful exit will fail and you will not get back your held amount.

# Start Graceful Exit
Are you sure you want to start graceful exit? Did you read the information above? Do you understand that graceful exit can’t be canceled once initiated?

Here is an example how you call graceful exit from the command prompt (Linux):
```shell
docker exec -it storagenode /app/bin/storagenode exit-satellite --config-dir /app/config

Please be aware that by starting a graceful exit from a satellite, you will no longer be allowed to participate in repairs or uploads from that satellite. This action can not be undone. Are you sure you want to continue? y/n : y

Domain Name                      Node ID                                             Space Used
ap1.storj.io:7777   121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6 37.9 GB
us1.storj.io:7777  12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S 38.7 GB
eu1.storj.io:7777 12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs 0.8 TB

Please enter a space delimited list of satellite domain names you would like to gracefully exit. Press enter to continue: ap1.storj.io:7777 us1.storj.io:7777 eu1.storj.io:7777
```

For Windows GUI users, the exit command should look as follows, but be sure to point to your own identity and config directories (in cmd.exe):
```shell
"C:\Program Files\Storj\Storage Node\storagenode.exe" exit-satellite --config-dir "C:\Program Files\Storj\Storage Node\\" --identity-dir "C:\Users\USER\AppData\Roaming\Storj\Identity\storagenode2" --log.output stderr

Please be aware that by starting a graceful exit from a satellite, you will no longer be allowed to participate in repairs or uploads from that satellite. This action can not be undone. Are you sure you want to continue? y/n : y

Domain Name                      Node ID                                             Space Used
ap1.storj.io:7777   121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6 37.9 GB
us1.storj.io:7777  12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S 38.7 GB
eu1.storj.io:7777 12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs 0.8 TB

Please enter a space delimited list of satellite domain names you would like to gracefully exit. Press enter to continue: ap1.storj.io:7777 us1.storj.io:7777 eu1.storj.io:7777
```

You can exit the satellites one by one or all at the same time.

## For multiple nodes owners
If you used multiple nodes on the same host, you have changed the `server.private-address` option in your config file. You must use this option in the exit-satellite and exit-status commands.

For example, if you changed it to `server.private-address: 127.0.0.1:7779` and your other identity is located in `"C:\Users\USER\AppData\Roaming\Storj\Identity\storagenode2"`, and the `config.yaml` file is located in `"C:\Program Files\Storj\Storage Node2\"` then the exit-satellite command will look like:

```shell
"C:\Program Files\Storj\Storage Node\storagenode.exe" exit-satellite --config-dir "C:\Program Files\Storj\Storage Node2\\" --identity-dir "C:\Users\USER\AppData\Roaming\Storj\Identity\storagenode2" --log.output stderr --server.private-address 127.0.0.1:7779
```

# During Graceful Exit
You can watch the status of graceful exit as follows (example output from a test satellite):

```shell
docker exec -it storagenode /app/bin/storagenode exit-status --config-dir /app/config --identity-dir /app/identity

Domain Name     Node ID                                             Percent Complete Successful Completion Receipt 
127.0.0.1:10000 12fbck97kqEGbWPu673CpeyrXavtqgVriyv9pCfL3mpw3yz2zN9 0.00%            N          N/A
```

From the `cmd.exe` (Windows)
```shell
"C:\Program Files\Storj\Storage Node\storagenode.exe" exit-status --config-dir "C:\Program Files\Storj\Storage Node\\" --identity-dir "C:\Users\USER\AppData\Roaming\Storj\Identity\storagenode" --log.output stderr

Domain Name     Node ID                                             Percent Complete Successful Completion Receipt 
127.0.0.1:10000 12fbck97kqEGbWPu673CpeyrXavtqgVriyv9pCfL3mpw3yz2zN9 0.00%            N          N/A
```

For the second node with identity `"C:\Users\USER\AppData\Roaming\Storj\Identity\storagenode2"` and `server.private-address: 127.0.0.1:7779`, and the `config.yaml` file is located in `"C:\Program Files\Storj\Storage Node2\"`:

```shell
"C:\Program Files\Storj\Storage Node\storagenode.exe" exit-status --config-dir "C:\Program Files\Storj\Storage Node2\" --identity-dir "C:\Users\USER\AppData\Roaming\Storj\Identity\storagenode2" --log.output stderr --server.private-address 127.0.0.1:7779
```

{% callout type="info" %}
The “Percent Complete” field is a relic of the old graceful exit and is no longer meaningful. It will likely be removed at some point.
{% /callout %}

If you get the output `No graceful exit in progress.` this means graceful exit didn’t start because of the minimum node age requirement. In the storage node logs you will find additional information such as: `node is not yet eligible for graceful exit: will be eligible after 2020-04-02 01:18:23.910919 +0000 UTC.`

In case of a crash, power failure or other outage during graceful exit, please get your storage node back online. Graceful exit will continue.

# Finish Graceful Exit
After the graceful exit period (currently 30 days) is complete, your node will no longer be in the graceful exit stage. Either it will have succeeded (if your uptime was high enough) or it will have failed.

At the end you will get this output: (sample output from a test satellite)

```shell
root@kali:~# storagenode exit-status

Domain Name     Node ID                                             Percent Complete Successful Completion Receipt 
127.0 0 1:10000 12fbck97kqEGbWPu673CpeyrXavtqgVriyv9pCfL3mpw3yz2zN9 100.00%          Y          0a473045022100da86329cfb4f5bb16f0702c1d073c3a8b54787311b54855bcf01a8e245250040022003ef911b3b2b2bea86ba34cd4927223f2718cd35c3b7de7cc030cd3a8ce4959a1220db55bd9fa76e8938be5a7a25c970d48bde19936e269dcf69a3ab9fa41b5486001a207508f9a6138cdc4089ea075f1553736d472cb1d3afa4397496a8eb948d121200220c08abe5dcf0051086e6fefe01
Your node should automatically delete any remaining data for the satellite(s) it exited from when graceful exit is completed.
```

As long as graceful exit was successful, you will get back your held amount with the next regular payout. The “Completion Receipt” contains a signature from the satellite and is your ticket to get the payback.

In some situations, the storage node doesn’t need to transfer 100% of the data and might finish graceful exit with a lower percentage. As long as graceful exit was successful, you should get your held back amount along with the next regular SNO payout on Layer 1, if the owed amount is above the minimum payout threshold, or if the node is opted in to zkSync Era, on Layer 2. The “Completion Receipt” contains a signature from the satellite you exited and is your ticket to get the held back amount. Please keep your nodeID, each satelliteID and each completion receipt in a safe place. With this information your can open a [support ticket](https://support.storj.io/hc/en-us/requests/new) if needed.
