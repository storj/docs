---
description: Create an uplink config file
---

# setup

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe setup [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink setup [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink setup [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag           | Description    |
| -------------- | -------------- |
| `--help`, `-h` | help for setup |

## Example

1\. Start the CLI wizard.

{% tabs %}
{% tab title="Windows" %}
### PowerShell

[Navigate to the directory your **uplink.exe** file is located in](../../support/faqs.md#how-do-i-navigate-to-the-binary-location).

```
./uplink.exe setup
```
{% endtab %}

{% tab title="Linux" %}
```
uplink setup
```
{% endtab %}

{% tab title="macOS" %}
```
uplink setup
```
{% endtab %}
{% endtabs %}

2\. Enter the numeric choice or satellite address corresponding to the satellite you've created your account on (ie - enter the number 1, 2, or 3).&#x20;

```
Select your satellite:
	[1] us1.storj.io
	[2] ap1.storj.io
	[3] eu1.storj.io
Enter number or satellite address as "<nodeid>@<address>:<port>"
```

3\. Choose an access name, by default this should be left blank, so hit 'enter'

{% hint style="info" %}
If you would like to choose your own access name, please be sure to only use lowercase letters. Including any uppercase letters will result in your access name not getting recognized when creating buckets.
{% endhint %}

```
Choose an access name ["default"]:
```

4\.  Enter the [Access ](../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md)grant you generated:

```
Enter your Access Grant: 1Dv41bZAnPGpR...
```

5\. Create and confirm an encryption passphrase. This is used to encrypt your files on your machine before they are uploaded to the network:

```
Enter your encryption passphrase:
```

{% hint style="warning" %}
Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% endhint %}

6\.  Your Uplink is configured and ready to use!
