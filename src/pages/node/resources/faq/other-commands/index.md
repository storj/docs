---
title: What other commands can I run?
slug: resources/faq/other-commands
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-03-03T08:35:46.000Z
docId: F2toWlqC-Xf3tEtzt29B6
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

