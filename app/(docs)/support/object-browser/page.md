---
title: Object Browser
docId: 4oDAezF-FcfPr0WPl7knd
weight: 15
redirects:
  - /dcs/browser-usage
  - /dcs/getting-started/quickstart-objectbrowser
  - /dcs/getting-started/quickstart-objectbrowser/
metadata:
  title: Using the Object Browser
  description:
    Guidance on how to use the Object Browser to upload and manage objects
    hassle-free, as well as steps on how to configure access and upload files and
    folders.
---

The Object Browser supports uploading and managing objects directly through the browser with no command-line tool required. This component uses our [](docId:yYCzPT8HHcbEZZMvfoCFa) service.

{% callout type="info"  %}
By using hosted Gateway MT you are opting into **server-side encryption**. See [](docId:hf2uumViqYvS1oq8TYbeW)
{% /callout %}

## Configure Object Browser Access

**Navigate to the** [](docId:pxdnqsVDjCLZgeEXt2S6x) page within your project.

When you click on the bucket, you will be prompted to read carefully - The object browser uses [](docId:hf2uumViqYvS1oq8TYbeW).

{% callout type="info"  %}
Don't forget to save your **Encryption Passphrase** generated below, you will need it for future access.
{% /callout %}

If this is your first time using the object browser, you **must create an encryption passphrase.** We strongly encourage you to use a mnemonic phrase. The GUI automatically generates one on the client side for you with the **Generate passphrase** option. You can also download it as a text file.

Alternatively, you can enter your own passphrase using the **Enter passphrase** option. Finish selection by click on **Continue** button.

To continue, you need to mark the checkbox **_\[v] I understand, and I have saved the passphrase._** This will enable the **Continue** button.

When you click the **Continue** button, you will be placed into the **Objects** view if you already have buckets, otherwise a new bucket **_demo-bucket_** will be created and you will be placed into that bucket view.

## Upload files and folders

{% callout type="warning"  %}
**The web browser is best for uploads up to 1GB. **

To upload larger files, please utilize the [](docId:TbMdOGCAXNWyPpQmH6EOq).
{% /callout %}

If you have not yet created a bucket, the bucket **_demo-bucket_** will be created automatically to allow you to upload objects right away.

To upload your first object, **drag it into the browser** or select **Upload File** and browse to the file you wish to upload.

You can upload not only files but also folders, just **drag them into the browser** or select **Upload Folder** and browse to the folder you wish to upload.

If you want to create a folder, you can do that with the **New Folder** button.

{% callout type="success"  %}
When you drag and drop your file into the Storj console, the Storj S3-compatible Gateway will encrypt the data using [](docId:hf2uumViqYvS1oq8TYbeW), break large files into 64MB Segments (or for smaller files a single segment), then erasure code the segments, breaking each segment into 80 pieces, then distributing those pieces over our network of thousands of independently operated storage nodes.
{% /callout %}

## Deleting files

1. If you select the three vertical dots on the right side of a file, a popup menu will appear:

2. Select the **Delete** command.

3. Confirm deletion with **Delete**.

## Creating buckets

Buckets are your containers that store objects.

You can create your buckets in the **Browse** view or if you click on the **<-Back to Buckets** button, in the bucket view.

{% callout type="warning"  %}
The bucket name can only contain lowercase letters, numbers, and hyphens.
{% /callout %}

To create a new bucket, click the **New bucket** button in the **Browse** view. A new module window will pop up called **Create Bucket**. Please provide a name using only lower case alphanumeric characters and dashes (this is a limitation for compatibility with existing object storages).

After creating your new bucket, you will be placed into the bucket where you can [](docId:gh5RtIDbMkAoomljO7f8d)

## Deleting buckets

1. Clicking the three vertical dots on the right side of the bucket, a popup menu will appear:

2. Click the **Delete** command

3. Type the **_Bucket Name_** and **Delete Bucket**.

{% callout type="warning"  %}
Be careful when deleting buckets - If you still have objects in the bucket being deleted, they will be deleted too!
{% /callout %}

## Share a file

After an upload completes, you will have the option of creating a share link. If you wish, click the file name - it will open a preview with a map. Here you can click the **Share** button.

Or you can click on the three vertical dots to the right of the file you want to share, and select **Share** to share your object.

The **Share** pop-up window allows you to share the link via social media or copy it with **Copy Link**.

The share link includes a rendering of where the pieces of your file are located on the globally distributed network of storage nodes, as well as a preview of that file.

## Share a bucket

1. Click the three vertical dots to the right of the bucket, a popup menu will appear

2. Click the **Share Bucket** command

3. Click the copy button to copy and share the link

This concludes the Object Browser Quickstart.
