---
description: In order to interact with our data, we need to set up the Uplink CLI
---

# Set Up Uplink CLI with Access Grant

1\. Check [Prerequisites](../prerequisites.md).

2.** Save **[**Access Grant**](create-first-access-grant.md)** to a file.** The Access Grant that you created in the web interface (or [in uplink CLI](../generate-access-grants-and-tokens/generate-a-token.md)) needs to be saved to disk in a plain text file for simplicity (_for example - Mac terminal would not allow you to paste the whole access grant directly due terminal limitations_). Specify the path to the saved access grant in the following command (`~/Downloads/accessgrant.txt` _for example_).

3\. **Import** Access Grant.

{% tabs %}
{% tab title="Windows" %}
### PowerShell

{% hint style="warning" %}
For security reasons it's better to use a casual user to work from the CLI, thus please run PowerShell as a casual user, not as an Administrator.
{% endhint %}

[Navigate to the directory your **uplink.exe** file is located](../../../support/faqs.md#how-do-i-navigate-to-the-binary-location):

```
./uplink.exe import accessgrant.txt
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import accessgrant.txt
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import accessgrant.txt
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Please note that **Storj Labs does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% endhint %}

7\.  Your Uplink is configured and ready to use!
