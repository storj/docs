# How do I check my logs?

You can look at your logs to see if you have some errors indicating that something is not functioning properly:

{% tabs %}
{% tab title="CLI Install" %}
```
docker logs storagenode
```

Use this command if you just want to see the last 20 lines of the log:&#x20;

```
docker logs --tail 20 storagenode
```

For CLI Docker install on Windows, if you have [redirected your logs to a file](redirect-logs.md), please execute the following command in PowerShell, inserting your actual path to your log file instead of "pathtologfile"

```
Get-Content "pathtologfile" -Tail 20 -Wait
```

For CLI Linux and MacOS install, if you have [redirected your logs to a file](redirect-logs.md), please use your preferred editor to view the contents of the log file.
{% endtab %}

{% tab title="GUI Windows Install" %}
From PowerShell, to see the last 20 lines of the log:

```
Get-Content "$env:ProgramFiles/Storj/Storage Node/storagenode.log" -Tail 20 -Wait
```

If you have [redirected your logs to a file](redirect-logs.md), from PowerShell execute the command, inserting your actual path to your log file in "pathtologfile":

```
Get-Content "pathtologfile" -Tail 20 -Wait
```
{% endtab %}
{% endtabs %}
