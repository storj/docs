---
title: Create an Access Grant
docId: b4-QgUOxVHDHSIWpAf3hG
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant
  - >-
    /getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant
  - /getting-started/uploading-your-first-object/create-first-access-grant
weight: 0
---

You need to have a satellite account and installed Uplink CLI as described in [](docId:TbMdOGCAXNWyPpQmH6EOq)

Navigate to the **Access** page within your project and then click on **Create Access Grant**. A modal window will pop up where you should enter a name for this access grant.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/tDPWIcmlm5DNtndvZZ-oi_create-access-1.png)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/empZoglAtQ5qKj1VJRPj1_create-access-2.png)

{% callout type="info"  %}
If you click **Encrypt My Access**, our client-side javascript will finalize your access grant with your encryption passphrase. Your data will remain end-to-end encrypted until you explicitly register your access grant with [](docId:AsyYcUJFbO1JI8-Tu8tW3) for S3 compatibility. Only then will your access grant be shared with our servers. Storj does not know or store your encryption passphrase.

However, if you are still reluctant to enter your passphrase into our web application, that's completely understandable, and you should cancel creation of Access Grant in Web UI, select **Create Keys for CLI** and follow these [](docId:OXSINcFRuVMBacPvswwNU).

**The instructions below assume you selected \_Encrypt My Access.**\_
{% /callout %}

**Assign the permissions** you want this access grant to have, then click on **Encrypt My Access**:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/0uBSt2BPz_u4bP9mCtKyN_create-access-3.png)

Select a **Passphrase** type: Either **Enter** your own **_Encryption Passphrase_** or **Generate** a 12-Word **_Mnemonic Passphrase_**. Make sure you **save your encryption passphrase** as you'll not be able to reset this after it's created.

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/yjlB4DU8MBNHzdSohxzUN_create-access-4.png)

{% callout type="warning"  %}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!

Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won't be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.

Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% /callout %}

Click either on the **Copy to clipboard** link or **Download .txt** and then confirm that you copied your Encryption Phrase to a safe place.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/APMVw5JzZ74NLaYNPI7AS_create-access-5.png)

Click the **Create my Access** link to finish generating of Access Grant.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/hmCrRyczE1pi8g7jo2GN2_create-access-6.png)

Access Grant is generated. **The Access Grant will only display once.** Save this information in a password manager or wherever you prefer to store sensitive information.
