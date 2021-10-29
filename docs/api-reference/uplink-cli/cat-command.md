---
description: Copies a Storj object to standard out
---

# cat

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cat [flags] sj://<BUCKET>/<KEY>
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cat [flags] sj://<BUCKET>/<KEY>
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cat [flags] sj://<BUCKET>/<KEY>
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for cat                                        |

## Example

{% tabs %}
{% tab title="Windows" %}
```
echo "Hello there !" | uplink put sj://cakes/hello.txt
uplink cat sj://cakes/hello.txt
```
{% endtab %}

{% tab title="Linux" %}
```
echo "Hello there !" | uplink put sj://cakes/hello.txt
uplink cat sj://cakes/hello.txt
```
{% endtab %}

{% tab title="macOS" %}
```
echo "Hello there!" | uplink put sj://cakes/hello.txt
uplink cat sj://cakes/hello.txt
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/cat-cmd.png)
