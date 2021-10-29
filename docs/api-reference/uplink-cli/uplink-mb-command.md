---
description: Create a new bucket
---

# mb

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe mb [flags] sj://<BUCKET>
```
{% endtab %}

{% tab title="Linux" %}
```
uplink mb [flags] sj://<BUCKET>
```
{% endtab %}

{% tab title="macOS" %}
```
uplink mb [flags] sj://<BUCKET>
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for `mb`                                       |

## Examples

## Create bucket

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe mb sj://cakes
```
{% endtab %}

{% tab title="Linux" %}
```
uplink mb sj://cakes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink mb sj://cakes
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Nested buckets are not supported.
{% endhint %}

Output:

![](../../.gitbook/assets/bucket\_cakes\_created.png)
