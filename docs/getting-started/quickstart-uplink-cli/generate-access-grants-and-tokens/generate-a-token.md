---
description: >-
  Create an Access Grant in the Uplink CLI with Satellite and API Key info from
  the Satellite Admin Console
---

# Create Access Grant in CLI

1. [You need to have a satellite account and installed Uplink CLI](../prerequisites.md).
2. To start, proceed through the initial steps of creating a new Access Grant.&#x20;

![](<../../../.gitbook/assets/image (156) (1).png>)

3\. When given the options to either continue in the browser or in the CLI, select **Continue in CLI**.

![](<../../../.gitbook/assets/image (181).png>)

4\. Copy and save the **Satellite Address** and **API Key** as it will only appear once.

![](<../../../.gitbook/assets/image (174).png>)

5\. Make sure you've already [downloaded the Uplink CLI](../../../downloads/download-uplink-cli.md) and run `uplink setup`.

{% tabs %}
{% tab title="Windows" %}
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

{% hint style="info" %}
For anyone who has previously configured an uplink please use a named access. If you want to replace the default access, you should [Create an Access Grant](../uploading-your-first-object/create-first-access-grant.md) and use `--overwrite` flag.
{% endhint %}

6\. Follow the prompts. When asked for your API Key, enter it (you should have saved it in step 4 above).

7\. Generate the Access Grant by running `uplink share` with no restrictions.

{% hint style="info" %}
&#x20;If you chose an access name, you'll need to specify it in the following command as `--access=name`
{% endhint %}

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share --readonly=false
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share --readonly=false
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share --readonly=false
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
Keep your full-rights Access Grant in secret, it contains encryption key and it will allow to upload, download or delete your data from the entire project!
{% endhint %}

8\. Your Access Grant should have been output.&#x20;
