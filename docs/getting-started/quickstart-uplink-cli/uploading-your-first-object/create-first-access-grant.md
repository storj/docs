---
description: >-
  Access Grants give access to a project to create buckets, upload files to the
  network, and read them when they are needed.
---

# Create an Access Grant

[You need to have a satellite account and installed Uplink CLI](../prerequisites.md).

Navigate to the **Access** page within your project and then click on **Continue**.&#x20;

![](<../../../.gitbook/assets/image (124) (2) (1).png>)

Give your new **** Access Grant a **name.**

![](<../../../.gitbook/assets/image (156) (1) (1).png>)

**Assign** **permissions** to the Access Grant.

![](<../../../.gitbook/assets/image (181).png>)

{% hint style="info" %}
If you click **Continue in Browser**, our client-side javascript will finalize your access grant with your encryption passphrase. Your data will remain end-to-end encrypted until you explicitly register your access grant with [Gateway MT](../../gateway-mt/) for S3 compatibility. Only then will your access grant be shared with our servers. Storj does not know or store your encryption passphrase.

However, if you are still reluctant to enter your passphrase into our web application, that's completely understandable, and you should select **Continue in CLI** and follow these [instructions](../generate-access-grants-and-tokens/generate-a-token.md).

**The instructions below assume you selected **_**Continue in Browser.**_
{% endhint %}

Select a **Passphrase** type: Either **Enter** your own _**Encryption Passphrase**_ or **Generate** a 12-Word _**Mnemonic Passphrase**_. Make sure you **save your encryption passphrase** as you'll not be able to reset this after it's created.

{% hint style="warning" %}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!

Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won't be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.

Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% endhint %}

![](<../../../.gitbook/assets/image (157).png>)

Access Grant is generated. **The Access Grant will only display once.** Save this information in a password manager or wherever you prefer to store sensitive information.&#x20;

![](<../../../.gitbook/assets/image (164) (1).png>)
