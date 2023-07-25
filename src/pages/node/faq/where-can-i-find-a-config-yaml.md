---
title: Where can I find the config.yaml?
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-03-03T08:35:46.000Z
docId: gDXZgLlP_rcSW8SuflgqS
redirects:
  - /node/resources/faq/where-can-i-find-a-config-yaml
---

{% tabs %}
{% tab label="Docker" %}
The `config.yaml` is created in your storage location when you did the[](docId\:HaDkV_0aWg9OJoBe53o-J) step.

{% callout type="info"  %} 
For example, if your `--mount` option in your `docker run` command looks like `--mount type=bind,source=/mnt/storj/storagenode,destination=/app/config`, then the `config.yaml` will be in the `/mnt/storj/storagenode` location.
{% /callout %}

{% callout type="success"  %} 
Options and parameters specified in the `docker run` command have a precedence over options in the `config.yaml -` Only options not also specified in the `docker run` command will be taken from the `config.yaml`file.
{% /callout %}
{% /tab %}

{% tab label="Windows GUI" %}
By default, the `config.yaml` will be created in the `"C:\Program Files\Storj\Storage Node\"` folder.
{% /tab %}
{% /tabs %}

