---
title: How do I check my logs?
slug: resources/faq/check-logs
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-03-03T08:35:46.000Z
docId: O68S24Iww4ZEnVk8yO7Mv
---

You can look at your logs to see if you have some errors indicating that something is not functioning properly:

::::tabs
:::tab{label="CLI Install"}
```linux
docker logs storagenode
```

Use this command if you just want to see the last 20 lines of the log:

```linux
docker logs --tail 20 storagenode

```

For CLI Docker install on Windows, if you have[](docId\:EeyBBKEeuNK5oqkB4EyU0), please execute the following command in PowerShell, inserting your actual path to your log file instead of “pathtologfile”

```powershell
Get-Content "pathtologfile" -Tail 20 -Wait

```

For CLI Linux and MacOS install, if you have redirected your logs to a file, please use your preferred editor to view the contents of the log file.

:::

:::tab{label="GUI Windows Install"}
From PowerShell, to see the last 20 lines of the log:

```powershell
Get-Content "$env:ProgramFiles/Storj/Storage Node/storagenode.log" -Tail 20 -Wait

```

If you have [](docId\:EeyBBKEeuNK5oqkB4EyU0), from PowerShell execute the command, inserting your actual path to your log file in “pathtologfile”:

```powershell
Get-Content "pathtologfile" -Tail 20 -Wait

```


:::
::::

