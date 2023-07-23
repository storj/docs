---
title: How do I redirect my logs to a file?
slug: resources/faq/redirect-logs
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-03-03T08:35:46.000Z
docId: EeyBBKEeuNK5oqkB4EyU0
---

1\. To redirect the logs to a file, stop your Node:&#x20;
CLI Install

::::tabs
:::tab{label="CLI Install"}
```none
docker stop -t 300 storagenode
```
:::

:::tab{label="GUI WIndows Install"}
```powershell
Stop-Service storagenode

```

Or click the “Stop” button in the Windows Services applet on “Storj V3 Storage Node” service
:::
::::



2\. Then edit your `config.yaml` (you can use *nano* or *vi* editor for Linux/MacOS or *Notepad++* for Windows) to add (or change) the log location (see [](docId\:gDXZgLlP_rcSW8SuflgqS)):&#x20;

::::tabs
:::tab{label="CLI Install"}
```none
log.output: "/app/config/node.log"
```

You can find resulting log in the storage location.
:::

:::tab{label="GUI Windows Install"}
```powershell
log.output: winfile:///X:\Storagenode\node.log
```
:::
::::

3\. Start your Node again:

::::tabs
:::tab{label="CLI Install"}
```shell
docker start storagenode
```

When you use this option, docker logs commands no longer show your node log. Use the file instead.
:::

:::tab{label="GUI Windows Install"}
```powershell
Start-Service storagenode
```

Or click the “Start” button in the Windows Services applet on “Storj V3 Storage Node” service
:::
::::

