---
description: Register your access for use with a hosted gateway.
---

# access register

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access register <flags> <ACCESS-GRANT>
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access register <flags> <ACCESS-GRANT>
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access register <flags> <ACCESS-GRANT>
```
{% endtab %}
{% endtabs %}

## Flags

| Flag                    | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `--access string`       | the serialized access, or name of the access to use              |
| `--auth-service string` | the address to the service you wish to register your access with |
| `--public`              | if the access should be public. Default false                    |

## Example

Once you have an access grant from the [Satellite Admin Console](../../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md) or `uplink share` you can register it with a GatewayMT auth service and designate the access to be public (no secret ket necessary to access) or private. If you want to use it to host a static site or share a URL, you must create a public access.&#x20;

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access register --public=true --auth-service=<gateway auth service url> <ACCESS-GRANT>
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access register --public=true --auth-service=<gateway auth service url> <ACCESS-GRANT>
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access register --public=true --auth-service="https://auth.us1.storjshare.io" 1CoNaDGVYBVZcurLF99kmPrGLfcMw5qw9Vxv9hAKp9NK... 
```
{% endtab %}
{% endtabs %}

```
========== CREDENTIALS ===================================================================
Access Key ID: jw7w7n2...
Secret Key   : jycbodr...
Endpoint     : https://gateway.us1.storjshare.io
```
