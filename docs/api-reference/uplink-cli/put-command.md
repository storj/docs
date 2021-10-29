---
description: Copies data from standard in to a Storj object
---

# put

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe put sj://BUCKET/KEY [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink put sj://BUCKET/KEY [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink put sj://BUCKET/KEY [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for put                                        |

## Example

{% tabs %}
{% tab title="Windows" %}
```
echo "Very secret ingredient list" | ./uplink.exe put sj://recipes/secret.txt
```
{% endtab %}

{% tab title="Linux" %}
```
echo "Very secret ingredient list" | uplink put sj://recipes/secret.txt
```
{% endtab %}

{% tab title="macOS" %}
```
echo "Very secret ingredient list" | uplink put sj://recipes/secret.txt
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/put-example.png)

You can check the content of the file by using the [`cat`](cat-command.md) command.
