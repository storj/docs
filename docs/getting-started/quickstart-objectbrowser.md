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

**Navigate to the Buckets** page within your project. If you do not have any buckets yet - we will create a `demo-bucket` for you.

When you click on the bucket, you will be prompted to read carefully - The object browser uses [Server-side encryption](../concepts/encryption-key/design-decision-server-side-encryption.md).

{% hint style="info" %}
Don't forget to save your **Encryption Passphrase** generated below, you will need it for future access.
{% endhint %}

If this is your first time using the object browser, you **must create an encryption passphrase.** We strongly encourage you to use a mnemonic phrase. The GUI automatically generates one on the client side for you in the **Generate a new passphrase** tab. You can also download it as a text file.

![](<../.gitbook/assets/image (144).png>)

Alternatively, you can enter your own passphrase in the **Enter your own passphrase** tab.

To continue, you need to mark the checkbox _**\[v] I understand, and I have saved the passphrase**_, this will enable the button **Next >**.

When you click the **Next >** button you will be placed into the **Objects** view if you already have buckets, otherwise a new bucket _**demo-bucket**_ will be created and you will be placed into that bucket view.

## Upload files and folders

If you have not yet created a bucket, the bucket _**demo-bucket**_ will be created automatically to allow you to upload objects right away.

![](<../.gitbook/assets/image (139).png>)

To upload your first object, **drag it into the browser** or select **Upload File** and browse to the file you wish to upload.

You can upload not only files but folders too, just **drag them into the browser** or select **Upload Folder** and browse to the folder you wish to upload.

If you want to create a folder, you can do that with the **New Folder** button.

{% hint style="success" %}
When you drag and drop your file into the Satellite Admin Console Object Browser, the Storj DCS S3-compatible Gateway will encrypt the data using [server-side encryption](../concepts/encryption-key/design-decision-server-side-encryption.md), break large files into 64MB Segments (or for smaller files a single segment), then erasure code the segments, breaking each segment into 80 pieces, then distributing those pieces over our network of thousands of independently operated storage nodes.&#x20;
{% endhint %}

## Deleting files

1\. If you select the three vertical dots on the right side of the file, a popup menu will appear:

![](<../.gitbook/assets/image (125).png>)

2\. Select the **Delete** command.

![](<../.gitbook/assets/image (166) (1).png>)

3\. Confirm deletion with **Yes**.

## Creating buckets

Buckets are your containers that store objects.&#x20;

You can create your buckets in the **Objects** view or if you click on the **<-Back to Buckets** button in the bucket view.

![](<../.gitbook/assets/image (141).png>)

To create a new bucket, click the **New bucket** button in the **Objects** view. A new module window will pop up called **Create Bucket**. Please provide a name using only lower case alphanumeric characters and dashes (this is a limitation for compatibility with existing object storages).

![](<../.gitbook/assets/image (168).png>)

After creating your new bucket, you will be placed into the bucket where you can [make folders and/or upload files](quickstart-objectbrowser.md#upload-files-and-folders).

## Deleting buckets

1\. Clicking the three vertical dots on the right side of the bucket, a popup menu will appear:

![](<../.gitbook/assets/image (151) (1).png>)

2\. Click the **Delete** command

![](<../.gitbook/assets/image (156) (1).png>)

3\. Type the _**Bucket Name**_ and **Confirm Delete Bucket**.

{% hint style="warning" %}
Be careful when deleting buckets - If you have objects in the bucket being deleted, they will be deleted too!
{% endhint %}

## Share a file

After an upload completes, you will have the option of creating a share link. If you wish, click the file name - it will open a preview with a map. Here you can click the **Share** button.

![](<../.gitbook/assets/image (148) (1).png>)

Or you can click on the three vertical dots to the right of the file you want to share, and select **Share** to share your object.

![](<../.gitbook/assets/image (127) (2).png>)

The **Share** pop-up window allows you to share the link via social media or copy it with **Copy Link**.

![](<../.gitbook/assets/image (146) (1).png>)

The share link includes a rendering of where the pieces of your file are located on the globally distributed network of storage nodes, as well as a preview of that file.&#x20;

![](<../.gitbook/assets/image (122).png>)

This concludes the Object Browser Quickstart.
