# Where can I find the config.yaml?

{% tabs %}
{% tab title="Docker" %}
The `config.yaml` is created in your storage location when you did the [initial setup of the storagenode](../../setup/cli/storage-node.md#setting-up-the-storage-node).

{% hint style="info" %}
For example, if your `--mount` option in your `docker run` command looks like `--mount type=bind,source=/mnt/storj/storagenode,destination=/app/config`, then the `config.yaml` will be in the `/mnt/storj/storagenode` location.
{% endhint %}

{% hint style="success" %}
Options and parameters specified in the `docker run` command have a precedence over options in the `config.yaml -` Only options not also specified in the `docker run` command will be taken from the `config.yaml`file.
{% endhint %}
{% endtab %}

{% tab title="Windows GUI" %}
By default, the `config.yaml` will be created in the `"C:\Program Files\Storj\Storage Node\"` folder.&#x20;
{% endtab %}
{% endtabs %}

