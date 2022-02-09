# What other commands can I run?

Run `help` to see other commands:

{% tabs %}
{% tab title="CLI Install" %}
```
docker exec -it storagenode /app/storagenode help
```
{% endtab %}

{% tab title="GUI Windows Install" %}
PowerShell:

```
&"$env:ProgramFiles\Storj\Storage Node\storagenode.exe" --help
```
{% endtab %}
{% endtabs %}

Run the following to execute other commands:

{% tabs %}
{% tab title="CLI Install" %}
```bash
docker exec -it storagenode /app/storagenode <<command>>
```
{% endtab %}

{% tab title="GUI Windows Install" %}
PowerShell:

```
&"$env:ProgramFiles\Storj\Storage Node\storagenode.exe" <<command>>
```
{% endtab %}
{% endtabs %}
