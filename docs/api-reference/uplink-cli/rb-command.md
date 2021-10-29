---
description: >-
  rb is the command to remove an empty bucket, or empty a bucket and then remove
  it.
---

# rb

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe rb sj://BUCKET [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink rb sj://BUCKET [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink rb sj://BUCKET [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--force`         | if true, empties the bucket of objects first        |
| `--help`, `-h`    | help for rb                                         |

## Examples

### Delete empty bucket

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe rb sj://cakes
```
{% endtab %}

{% tab title="Linux" %}
```
uplink rb sj://cakes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink rb sj://cakes
```
{% endtab %}
{% endtabs %}

Output:

![](../../.gitbook/assets/rb-empty-bucket.png)

### Delete bucket and all the objects it contains

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe rb sj://cakes --force
```
{% endtab %}

{% tab title="Linux" %}
```
uplink rb sj://cakes --force
```
{% endtab %}

{% tab title="macOS" %}
```
uplink rb sj://cakes --force
```
{% endtab %}
{% endtabs %}

Output:

![](../../.gitbook/assets/rb-force.png)

