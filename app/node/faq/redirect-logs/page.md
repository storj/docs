---
title: How do I redirect my logs to a file?
docId: EeyBBKEeuNK5oqkB4EyU0
redirects:
  - /node/resources/faq/redirect-logs
---

1\. To redirect the logs to a file, stop your Node:&#x20;
CLI Install

{% tabs %}
{% tab label="CLI Install" %}

```none
docker stop -t 300 storagenode
```

{% /tab %}

{% tab label="GUI WIndows Install" %}

```powershell
Stop-Service storagenode

```

Or click the “Stop” button in the Windows Services applet on “Storj V3 Storage Node” service
{% /tab %}
{% /tabs %}

2\. Then edit your `config.yaml` (you can use _nano_ or _vi_ editor for Linux/MacOS or _Notepad++_ for Windows) to add (or change) the log location (see [](docId:gDXZgLlP_rcSW8SuflgqS)):

{% tabs %}
{% tab label="CLI Install" %}

```none
log.output: "/app/config/node.log"
```

You can find resulting log in the storage location.
{% /tab %}

{% tab label="GUI Windows Install" %}

```powershell
log.output: winfile:///X:\Storagenode\node.log
```

{% /tab %}
{% /tabs %}

3\. Start your Node again:

{% tabs %}
{% tab label="CLI Install" %}

```shell
docker start storagenode
```

When you use this option, docker logs commands no longer show your node log. Use the file instead.
{% /tab %}

{% tab label="GUI Windows Install" %}

```powershell
Start-Service storagenode
```

Or click the “Start” button in the Windows Services applet on “Storj V3 Storage Node” service
{% /tab %}
{% /tabs %}
