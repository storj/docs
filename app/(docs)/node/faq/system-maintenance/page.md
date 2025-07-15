---
title: How do I shut down my node for system maintenance?
docId: Zh_lD6UPciHT53wOWuAoD
redirects:
  - /node/resources/faq/system-maintenance
metadata:
  title: How do I shutdown my node for system maintenance?
---

If you need to shutdown the Storage Node for maintenance on your system, run:

{% tabs %}
{% tab label="CLI Install" %}

```none
docker stop -t 300 storagenode
```

{% /tab %}

{% tab label="GUI Windows Install" %}

```powershell
Stop-Service storagenode

```

Or click the “Stop” button in the Windows Services applet on “Storj V3 Storage Node” service
{% /tab %}
{% /tabs %}

After you finished your maintenance, restart the Node with:

{% tabs %}
{% tab label="CLI Install" %}

```none
docker start storagenode
```

{% /tab %}

{% tab label="GUI Windows Install" %}

```powershell
Start-Service storagenode
```

Or click the “Start” button in the Windows Services applet on “Storj V3 Storage Node” service.
{% /tab %}
{% /tabs %}
