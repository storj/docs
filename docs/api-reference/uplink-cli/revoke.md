---
description: Allows to revoke an access grant
---

# revoke

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe revoke access_here [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink revoke access_here [flags]
```
{% endtab %}

{% tab title="MacOS" %}
```
uplink revoke access_here [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for revoke                                     |

## Examples

### Revoke a serialized access grant

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe revoke aSdfgljk...
```
{% endtab %}

{% tab title="Linux" %}
```
uplink revoke aSdfgljk...
```
{% endtab %}

{% tab title="MacOS" %}
```
uplink revoke aSdfgljk...
```
{% endtab %}
{% endtabs %}

Will revoke the provided serialized access grant.

### Revoke a named access grant

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe revoke --access access-name
```
{% endtab %}

{% tab title="Linux" %}
```
uplink revoke --access access-name
```
{% endtab %}

{% tab title="MacOS" %}
```
uplink revoke --access access-name
```
{% endtab %}
{% endtabs %}

Will revoke the provided named access grant.
