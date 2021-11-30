---
description: A web base object browser
---

# Quickstart - Object Browser

## Introduction

The Storj DCS Satellite Admin Console supports uploading and managing objects directly through the browser with no command-line tool required. This component uses our [hosted S3-compatible Gateway](../api-reference/s3-compatible-gateway/) service.

{% hint style="info" %}
By using hosted Gateway MT you are opting in to **** [**server-side encryption**](../concepts/encryption-key/design-decision-server-side-encryption.md).&#x20;
{% endhint %}

## Configure Object Browser Access

**Navigate to the Objects** page within your project and read carefully - it will use a [Server-side encryption](../concepts/encryption-key/design-decision-server-side-encryption.md).

{% hint style="info" %}
Don't forget to save your **Encryption Passphrase** generated below, you will need it for future access.
{% endhint %}

![](<../.gitbook/assets/image (143).png>)

If this is your first time using the object browser, you **must create an encryption passphrase.** We strongly encourage you to use a mnemonic phrase. The GUI automatically generates one on the client-side for you in the **Generate a new passphrase** tab. You can also download it as a text file.

Alternatively, you can enter your own passphrase in the **Enter your own passphrase** tab.

To continue you need to mark the checkbox _**\[v] I understand, and I have saved the passphrase**_, this will enable the button **Next >**.

When you click the **Next >** button you will be placed to the **Objects** view if you already have buckets, otherwise a new bucket _**demo-bucket**_ will be created and you will be placed to there.

## Upload files and folders

If you have not yet created a bucket, the bucket _**demo-bucket**_ will be created automatically to allow you upload objects right away.

![](<../.gitbook/assets/image (169).png>)

To upload your first object, **drag it into the browser** or select **Upload File** and browse to the file you wish to upload.

You can upload not only files but folders too, just **drag them into the browser** or select **Upload Folder** and browse to the folder you wish to upload.

If you want to create a folder - you can do that with the **New Folder** button.

{% hint style="success" %}
When you drag and drop your file into the Satellite Admin Console Object Browser, the Storj DCS S3-compatible Gateway will encrypt the data using [server-side encryption](../concepts/encryption-key/design-decision-server-side-encryption.md), break large files into 64MB Segments (or for smaller files a single segment), then erasure code the segments, breaking each segment into 80 pieces, then distributing those pieces over our network of thousands of independently operated storage nodes.&#x20;
{% endhint %}

## Creating buckets

Buckets are your containers that store objects.&#x20;

You can create your buckets in the **Objects** view or if you click on **<-Back to Buckets** button in the bucket view.

![](<../.gitbook/assets/image (159).png>)

To create a new bucket click the **New bucket** button in the **Objects** view. A new module window will pop up, **Create Bucket**. Please provide a name using only lowercase alphanumeric characters and dashes (this is a limitation for compatibility with existing object storages).

![](<../.gitbook/assets/image (172).png>)

After creating your new bucket, you will be placed into the bucket where you can [make folders and/or upload files](quickstart-objectbrowser.md#upload-files-and-folders).

## Share a file

After the upload completes you will have the option of creating a share link. If you wish, click the file name - it will open a preview with map. Here you can click the **Share** button.

![](<../.gitbook/assets/image (147).png>)

Or you can click on three vertical dots and select **Share** to share your object.

![](<../.gitbook/assets/image (126).png>)

The pop-up window **Share** allows you to share the link via social media or copy it with **Copy Link**.

![](<../.gitbook/assets/image (145).png>)

The share link includes a rendering of where the pieces of your file are located on the globally distributed network of storage nodes, as well as a preview of that file.&#x20;

![](<../.gitbook/assets/image (122).png>)

This concludes the Object Browser Quickstart.
