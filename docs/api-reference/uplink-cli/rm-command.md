---
description: Delete an object
---

# rm

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe rm sj://BUCKET/KEY [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink rm sj://BUCKET/KEY [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink rm sj://BUCKET/KEY [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `--access string` | the serialized access, or name of the access to use    |
| `--encrypted`     | if true, treat paths as base64-encoded encrypted paths |
| `--help`, `-h`    | help for `rm`                                          |

## Examples

### Delete an object

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe rm sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="Linux" %}
```
uplink rm sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="macOS" %}
```
uplink rm sj://cakes/cheesecake.jpg
```
{% endtab %}
{% endtabs %}

### Delete an encrypted object

If an object has been created with another encryption key, you won't be able to read it, but you can delete it. In order to delete an encrypted object, you have to know its encrypted path. To retrieve it, you can use the list command [`ls`](ls-command.md) with the encrypted file. For instance, to list the encrypted path of the objects in a bucket `sj://cakes` you could use:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe ls sj://cakes --encrypted
```
{% endtab %}

{% tab title="Linux" %}
```
uplink ls sj://cakes --encrypted
```
{% endtab %}

{% tab title="macOS" %}
```
uplink ls sj://cakes --encrypted
```
{% endtab %}
{% endtabs %}

![](<../../.gitbook/assets/ls-encrypted (1).png>)

You can then use this path to delete the encrypted object:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```
{% endtab %}

{% tab title="Linux" %}
```
uplink rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```
{% endtab %}

{% tab title="macOS" %}
```
uplink rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/deleted-encrypted.png)
