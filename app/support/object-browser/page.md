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

**Navigate to the** [](docId:pxdnqsVDjCLZgeEXt2S6x) page within your project. If you do not have any buckets yet - we will create a `demo-bucket` for you.

When you click on the bucket, you will be prompted to read carefully - The object browser uses [](docId:hf2uumViqYvS1oq8TYbeW).

{% callout type="info"  %}
Don't forget to save your **Encryption Passphrase** generated below, you will need it for future access.
{% /callout %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/PgEXOy3cK2ue1zGwGqxdh_qsobject01.png)

If this is your first time using the object browser, you **must create an encryption passphrase.** We strongly encourage you to use a mnemonic phrase. The GUI automatically generates one on the client side for you with the **Generate passphrase** option. You can also download it as a text file.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/SWYh6j1RWfLrc4dPlgYW2_qsobject02.png)

Alternatively, you can enter your own passphrase using the **Enter passphrase** option. Finish selection by click on **Continue** button.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/m_4pzkqRUSiGpOXmnWd60_qsobject03.png)

To continue, you need to mark the checkbox **_\[v] I understand, and I have saved the passphrase._** This will enable the **Continue** button.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/VJondlvfOjDcc04ILsAsF_qsobject04.png)

When you click the **Continue** button, you will be placed into the **Objects** view if you already have buckets, otherwise a new bucket **_demo-bucket_** will be created and you will be placed into that bucket view.

## Upload files and folders

{% callout type="warning"  %}
**The web browser is best for uploads up to 1GB. **

To upload larger files, please utilize the [](docId:TbMdOGCAXNWyPpQmH6EOq).
{% /callout %}

If you have not yet created a bucket, the bucket **_demo-bucket_** will be created automatically to allow you to upload objects right away.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/A1VBtbjhSjxV187WZEiAH_qsobject04.png)

To upload your first object, **drag it into the browser** or select **Upload File** and browse to the file you wish to upload.

You can upload not only files but also folders, just **drag them into the browser** or select **Upload Folder** and browse to the folder you wish to upload.

If you want to create a folder, you can do that with the **New Folder** button.

{% callout type="success"  %}
When you drag and drop your file into the Satellite Admin Console Object Browser, the Storj S3-compatible Gateway will encrypt the data using [](docId:hf2uumViqYvS1oq8TYbeW), break large files into 64MB Segments (or for smaller files a single segment), then erasure code the segments, breaking each segment into 80 pieces, then distributing those pieces over our network of thousands of independently operated storage nodes.
{% /callout %}

## Deleting files

1. If you select the three vertical dots on the right side of a file, a popup menu will appear:

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/pEw5qFRbraYchiz0mtOv7_qsobject05.png)

2. Select the **Delete** command.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/JRQ09me42z8yIy05hLLn0_qsobject06.png)

3. Confirm deletion with **Yes**.

## Creating buckets

Buckets are your containers that store objects.

You can create your buckets in the **Objects** view or if you click on the **<-Back to Buckets** button, in the bucket view.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/oJ74hmgmN9h5iDemALwMk_qsobject07.png)

{% callout type="warning"  %}
The bucket name can only contain lowercase letters, numbers, and hyphens.
{% /callout %}

To create a new bucket, click the **New bucket** button in the **Buckets** view. A new module window will pop up called **Create Bucket**. Please provide a name using only lower case alphanumeric characters and dashes (this is a limitation for compatibility with existing object storages).

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Yewew2V1tdS66o93P_XIM_qsobject08.png)

After creating your new bucket, you will be placed into the bucket where you can [](docId:gh5RtIDbMkAoomljO7f8d)

## Deleting buckets

1. Clicking the three vertical dots on the right side of the bucket, a popup menu will appear:

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5YJzM4uQlX2DkoFIuyNp1_qsobject09.png)

2. Click the **Delete** command

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/awroxWO45F35KG6mW6zys_qsobject10.png)

3. Type the **_Bucket Name_** and **Confirm Delete Bucket**.

{% callout type="warning"  %}
Be careful when deleting buckets - If you still have objects in the bucket being deleted, they will be deleted too!
{% /callout %}

## Share a file

After an upload completes, you will have the option of creating a share link. If you wish, click the file name - it will open a preview with a map. Here you can click the **Share** button.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/vCYGlW3Gy5TJHiQHzLT_n_qsobjectshare01.png)

Or you can click on the three vertical dots to the right of the file you want to share, and select **Share** to share your object.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/AvXeXUPRK2-PFiOyCGS6Z_qsobjectshare02.png)

The **Share** pop-up window allows you to share the link via social media or copy it with **Copy Link**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/GmA5kH_adiXmGOaw7iTAz_qsobjectshare03.png)

The share link includes a rendering of where the pieces of your file are located on the globally distributed network of storage nodes, as well as a preview of that file.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/y1Z-utzw4fEsvj6gffynu_qsobjectshare04.png)

## Share a bucket

1. Click the three vertical dots to the right of the bucket, a popup menu will appear

   ![Share Bucket](https://link.storjshare.io/raw/juc6cqmbtg2qgaja6jzx67zfkjwa/docs/images/Share-Bucket.png)

2. Click the **Share Bucket** command

   ![Share the link](https://link.storjshare.io/raw/jwkhjjn4le4udilzxbeoe3wj7iwa/docs/images/Share%20a%20link.png)

3. Click the needed button to share the link

This concludes the Object Browser Quickstart.
