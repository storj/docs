---
description: Prints name and associated satellite of all available accesses.
---

# access list

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access list [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access list [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access list [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`,` -h`    | help for list                                       |

## Examples

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access list
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access list
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access list
```
{% endtab %}
{% endtabs %}

```
=========== ACCESSES LIST: name / satellite ================================
cheesecake / 12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777
pumpkin-pie / 12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777
tarte / 121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@ap1.storj.io:7777
```
