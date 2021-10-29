---
description: Inspect allows you to explode a serialized access into its constituent parts.
---

# access inspect

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access inspect [ACCESS-GRANT] [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access inspect [ACCESS-GRANT] [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access inspect [ACCESS-GRANT] [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`,` -h`    | help for inspect                                    |

## Examples

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access inspect cheesecake
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access inspect cheesecake
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access inspect cheesecake
```
{% endtab %}
{% endtabs %}

is equivalent to:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access --access cheesecake inspect
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access --access cheesecake inspect
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access --access cheesecake inspect
```
{% endtab %}
{% endtabs %}

and will output something like:

```
{
  "satellite_addr": "12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777",
  "encryption_access": {
    "default_path_cipher": "ENC_AESGCM"
  },
  "api_key": "...",
  "macaroon": {
    "head": "...",
    "caveats": [],
    "tail": "..."
  }
}
```
