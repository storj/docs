---
description: Imports a serialized access grant into the configuration
---

# import

## Usage

{% tabs %}
{% tab title=" Windows" %}
```
./uplink.exe import [flags] [NAME] (ACCESS | FILE)
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import [flags] [NAME] (ACCESS | FILE)
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import [flags] [NAME] (ACCESS | FILE)
```
{% endtab %}
{% endtabs %}

## Flags

| Flag           | Description                         |
| -------------- | ----------------------------------- |
| `--help`, `-h` | help for import                     |
| `--overwrite`  | overwrite the existing access grant |

## Examples

### Import access grant from a file

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe import cheesecake cheesecake.access
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import cheesecake cheesecake.access
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import cheesecake cheesecake.access
```
{% endtab %}
{% endtabs %}

### Import access grant with a key

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe import cheesecake 13df....qa
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import cheesecake 13df....qa
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import cheesecake 13df....qa
```
{% endtab %}
{% endtabs %}

These two commands will have the same output:

![](../../.gitbook/assets/access-imported.png)

### Import access grant to the default access

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe import 13df....qa --overwrite
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import 13df....qa --overwrite
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import 13df....qa --overwrite
```
{% endtab %}
{% endtabs %}

