---
title: What other commands can I run?
docId: F2toWlqC-Xf3tEtzt29B6
redirects:
  - /node/resources/faq/other-commands
---

Run `help` to see other commands:

Run the following to execute other commands:

{% tabs %}
{% tab label="CLI Install" %}

```none
docker exec -it storagenode /app/storagenode help
```

{% /tab %}

{% tab label="GUI Windows Install" %}

```powershell
&"$env:ProgramFiles\Storj\Storage Node\storagenode.exe" --help
```

{% /tab %}
{% /tabs %}

Run the following to execute other commands:

{% tabs %}
{% tab label="CLI Install" %}

```none
docker exec -it storagenode /app/storagenode <<command>>
```

{% /tab %}

{% tab label="GUI Windows Install" %}

```powershell
&"$env:ProgramFiles\Storj\Storage Node\storagenode.exe" <<command>>
```

{% /tab %}
{% /tabs %}
