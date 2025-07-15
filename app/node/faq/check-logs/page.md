---
title: How do I check my logs?
docId: O68S24Iww4ZEnVk8yO7Mv
redirects:
  - /node/resources/faq/check-logs
---

You can look at your logs to see if you have some errors indicating that something is not functioning properly:

{% tabs %}
{% tab label="CLI Install" %}

```linux
docker logs storagenode
```

Use this command if you just want to see the last 20 lines of the log:

```linux
docker logs --tail 20 storagenode

```

For CLI Docker install on Windows, if you would like to copy your logs to a file you can follow this link [](docId:EeyBBKEeuNK5oqkB4EyU0) or you can execute the following command in PowerShell, inserting your actual path to your log file instead of “pathtologfile”

```powershell
Get-Content "pathtologfile" -Tail 20 -Wait

```

For CLI Linux and macOS install, if you have redirected your logs to a file, please use your preferred editor to view the contents of the log file, or in your terminal (replace the path `/path/to/the/log/file.log` with the correct path):

```linux
cat /path/to/the/log/file.log

```

{% /tab %}

{% tab label="GUI Windows Install" %}
From PowerShell, to see the last 20 lines of the log:

```powershell
Get-Content "$env:ProgramFiles/Storj/Storage Node/storagenode.log" -Tail 20 -Wait

```

If you have [](docId:EeyBBKEeuNK5oqkB4EyU0), from PowerShell execute the command, inserting your actual path to your log file in “pathtologfile”:

```powershell
Get-Content "pathtologfile" -Tail 20 -Wait

```

{% /tab %}
{% /tabs %}
