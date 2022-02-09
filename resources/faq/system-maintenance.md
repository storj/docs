# How do I shutdown my node for system maintenance?

If you need to shutdown the Storage Node for maintenance on your system, run:

{% tabs %}
{% tab title="CLI Install" %}
```bash
docker stop -t 300 storagenode
```
{% endtab %}

{% tab title="GUI Windows Install" %}
Elevated PowerShell:

```bash
Stop-Service storagenode
```

Or click the "Stop" button in the Windows Services applet on "Storj V3 Storage Node" service
{% endtab %}
{% endtabs %}

After you finished your maintenance, restart the Node with:

{% tabs %}
{% tab title="CLI Install" %}
```bash
docker start storagenode
```
{% endtab %}

{% tab title="GUI Windows Install" %}
Elevated PowerShell:

```bash
Start-Service storagenode
```

Or click the "Start" button in the Windows Services applet on "Storj V3 Storage Node" service.
{% endtab %}
{% endtabs %}
