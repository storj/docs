# How do I redirect my logs to a file?

1\. To redirect the logs to a file, stop your Node:&#x20;

{% tabs %}
{% tab title="CLI Install" %}
```bash
docker stop -t 300 storagenode
```
{% endtab %}

{% tab title="GUI WIndows Install" %}
Elevated PowerShell:

```bash
Stop-Service storagenode
```

Or click the "Stop" button in the Windows Services applet on "Storj V3 Storage Node" service
{% endtab %}
{% endtabs %}

2\. Then edit your `config.yaml` (you can use _nano_ or _vi_ editor for Linux/MacOS or _Notepad++_ for Windows) to add (or change) the log location (see [Where can I find a config.yaml?](where-can-i-find-a-config.yaml.md)):&#x20;

{% tabs %}
{% tab title="CLI Install" %}
```yaml
log.output: "/app/config/node.log"
```

You can find resulting log in the storage location.
{% endtab %}

{% tab title="GUI Windows Install" %}
```yaml
log.output: winfile:///X:\Storagenode\node.log
```
{% endtab %}
{% endtabs %}

3\. Start your Node again:

{% tabs %}
{% tab title="CLI Install" %}
```bash
docker start storagenode
```

{% hint style="info" %}
When you use this option, docker logs commands no longer show your node log. Use the file instead.
{% endhint %}
{% endtab %}

{% tab title="GUI Windows Install" %}
Elevated PowerShell:

```bash
Start-Service storagenode
```

Or click the "Start" button in the Windows Services applet on "Storj V3 Storage Node" service
{% endtab %}
{% endtabs %}
