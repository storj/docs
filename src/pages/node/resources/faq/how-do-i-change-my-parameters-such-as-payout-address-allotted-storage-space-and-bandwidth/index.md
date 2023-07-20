---
title: How do I change values like wallet address or storage capacity?
slug: resources/faq/how-do-i-change-my-parameters-such-as-payout-address-allotted-storage-space-and-bandwidth
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-03-03T08:35:46.000Z
---

1\. Stop and remove the running Storage Node Docker container (CLI) or stop the service (GUI Windows):

::::tabs
:::tab{label="CLI Install"}


```none
docker stop -t 300 storagenode
docker rm storagenode
```
:::

:::tab{label="GUI Windows Install"}


```powershell
Stop-Service storagenode

```

Or click the “Stop” button in the Windows Services applet on “Storj V3 Storage Node” service



:::
::::

2\. Run your Storage Node again after editing needed parameters:

::::tabs
:::tab{label="CLI Install"}
Parameters are described in [](docId\:KJzDdewgBVcK6rnp0Qho2) section. If you need to specify some parameters like a wallet options (i.e. [](docId:6TX_ve1PyUrXuwax-mWWw)) in the config.yaml, you can[](docId\:gDXZgLlP_rcSW8SuflgqS).



How to run your Storage Node with modified parameters from the CLI: [](docId\:HaDkV_0aWg9OJoBe53o-J)&#x20;


:::

:::tab{label="GUI Windows Install"}
Open the config file "%ProgramFiles%\Storj\Storage Node\config.yaml" with a text editor (we recommend to use *Notepad++*, as the regular Notepad will not work) and modify needed parameters. Save the configuration file and restart the Storj V3 Storage Node service.


Or in the elevated PowerShell:

```powershell
Restart-Service storagenode
```
:::
::::

---undefineddocId: bMlttgapdFJxCNAULJDIv
