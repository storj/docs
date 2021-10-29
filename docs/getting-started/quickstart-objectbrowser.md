---
description: A web base object browser
---

# Quickstart - Object Browser

## Introduction

The Storj DCS Satellite Admin Console supports uploading and managing objects directly through the browser with no command-line tool required. This component uses our hosted S3-compatible Gateway service.

{% hint style="info" %}
By using hosted Gateway MT you are opting in to** **[**server-side encryption**](../concepts/encryption-key/design-decision-server-side-encryption.md).&#x20;
{% endhint %}

### Configure Object Browser Access

**Navigate to the Objects** page within your project and then click on **Continue**.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.33.17 PM (1).png>)

{% hint style="info" %}
Don't forget to save your **Encryption Passphrase** generated below, you will need it for future access.
{% endhint %}

If this is your first time using the object browser, you **must create an encryption passphrase.** We strongly encourage you to use a mnemonic phrase. The GUI automatically generates one on the client-side for you. Alternatively, you can enter your own.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.33.21 PM (1).png>)

**Enter the Encryption Passphrase** you just created or used previously. If you enter a new Encryption Passphrase, you will not be able to see files previously uploaded as they would have been encrypted with a separate passphrase.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.33.41 PM (1).png>)

If you have not yet created a bucket a module window will pop up, **enter a lowercase alphanumeric name**. Buckets are your containers that store objects.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.33.49 PM (1).png>)

After creating your first bucket, **you will be placed into the bucket** where you can make folders and/or upload files. To upload your first object, **drag it into the browser or select upload file** and browse to the object you wish to upload.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.43.00 PM.png>)

{% hint style="success" %}
When you drag and drop your file into the Satellite Admin Console Object Browser, the Storj DCS S3-compatible Gateway will encrypt the data using server-side encryption, break large files into 64MB Segments (or for smaller files a single segment), then erasure code the segments, breaking each segment into 80 pieces, then distributing those pieces over our network of thousands of independently operated storage nodes.&#x20;
{% endhint %}

### Share a file

After the upload completes you will have the option of creating a share link. If you wish, select** Generate Share Link** to share your object.

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.45.31 PM.png>)

**Copy** your newly generated share link.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.45.47 PM.png>)

The share link includes a rendering of where the pieces of your file are located on the globally distributed network of storage nodes, as well as a preview of that file.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 2.46.03 PM.png>)

This concludes the Object Browser Quickstart.
