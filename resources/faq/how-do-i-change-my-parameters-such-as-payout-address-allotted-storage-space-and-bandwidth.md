# How do I change values like wallet address or storage capacity?

1\. Stop and remove the running Storage Node Docker container (CLI) or stop the service (GUI Windows):

{% tabs %}
{% tab title="CLI Install" %}
```bash
docker stop -t 300 storagenode
docker rm storagenode
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

2\. Run your Storage Node again after editing needed parameters:

{% tabs %}
{% tab title="CLI Install" %}
Parameters are described in the article [Storage Node concepts](../../setup/cli/storage-node.md#storage-node-concepts). If you need to specify some parameters like a wallet options (i.e. [zkSync](../../dependencies/storage-node-operator-payout-information/zk-sync-opt-in-for-snos.md)) in the `config.yaml`, you can [find it in the storage location](where-can-i-find-a-config.yaml.md).

How to run your Storage Node with modified parameters from the CLI: [Running Storage Node](../../setup/cli/storage-node.md#running-the-storage-node)
{% endtab %}

{% tab title="GUI Windows Install" %}
Open the config file `"%ProgramFiles%\Storj\Storage Node\config.yaml"` with a text editor (we recommend to use _Notepad++_, as __ the regular Notepad will not work)  and modify needed parameters. Save the configuration file and restart the `Storj V3 Storage Node` service.

Or in the elevated PowerShell:

```bash
Restart-Service storagenode
```
{% endtab %}
{% endtabs %}
