---
title: Zerto
slug: how-tos/zerto-integration-guide
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-09T18:45:44.000Z
docId: 3fdjlw0QhKg2w6FU4ZdbX
---

## Introduction

**Zerto** brings together disaster recovery and data protection.  It provides a single, scalable solution provides simple cloud data management and protection across on-premises, hybrid, and multi-cloud environments.  You can use **Zerto** with **Storj DCS** S3-compatible storage.

**Main site**: [Zerto](https://www.zerto.com) - You can download a free trial [here](https://www.zerto.com/try-or-buy/try-zerto-free/).

**Demo site**: [Zerto’s Hands on Labs](https://www.zerto.com/page/labs/?z_campaign=2020_Google_Ads_Training_Labs_On_demand\&z_content=Labs\&z_leadsource=Google_Adwords\&z_referrer=Adwords\&z_source=7012I000001hzgP\&gclid=CjwKCAjwj42UBhAAEiwACIhADqQ1Xo-tUPvM5qy8Pe1U2IxOnx-KBzpTQAgevDJYc42LYIXwgLIJTRoCDkUQAvD_BwE)

## Configure Zerto to use Storj DCS

Log into Zerto Virtual Manager (ZVM).

On the left-hand side of the ZVM dashboard, click the `Setup` button (icon looks like a wrench).

Tab over to `Repositories` and click `New Repository`.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/wd8mAal1a9cJzhJz1ZIiu_image-131-2.png)

On the `New Repository` wizard screen:

*   General:
    *   Provide a name for the repository

    *   Change `Storage Type` to S3-Compatible storage

    *   Toggle whether to set this as your default LTR repo

*   Settings:
    *   Region: enter the region your bucket is provisioned in (US1, EU1 or AP1)

    *   Endpoint URL: provided in the[](docId\:AsyYcUJFbO1JI8-Tu8tW3) <https://gateway.storjshare.io/>

    *   Bucket Name: enter the name of your bucket, for example, ¨demo-bucket

    *   Access Key: provided in [](docId\:AsyYcUJFbO1JI8-Tu8tW3) you generated with Storj DCS

    *   Secret Access Key: provided in [](docId\:AsyYcUJFbO1JI8-Tu8tW3) you generated with Storj DCS

After populating all fields, click `Save`. You should now see the Storj Repo as part of your LTR repository list.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/LTGvqT_kuVNQi-upd1i_w_image-128-2.png)

You may optionally verify Zerto's connection via the Storj DCS website. To do so, please sign in to your Storj DCS account, click on `Buckets` on the left-hand side, then select your demo-bucket from the `Buckets` view, and provide the encryption passphrase.  You will be taken to this bucket’s page where you will see a *repository.config* file, confirming the connection.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/159AagxGtKM2d-4Pa6ciu_image-132-1.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/mXYqiwqgtYgHu7XVmFPOO_image-161.png)

Once the repository is configured, return to the ZVM interface in Zerto.

On the left-hand side click `VPGs`. On the VPG management screen, tick the box next to the VPG you are looking to protect.

Check the following Long-Term Retention settings and click `Done`:

Returning to the VPG management page, click `Actions` then `Run Retention Process`. This will initiate an upload of a copy of the virtual machine to the Storj repository.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/NjjDzbSCkPTtwdQR9nVhv_image-150-1.png)

You may return to the Storj DCS website, to see a copy of the Windows File Server in the Storj demo-bucket.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/f2lF3e0pHov1aETDPaluE_image-167.png)

## Restoring a backup with Zerto

Once the initial Retention Process has been completed, you may “accidentally” delete all the files in that recently copied file server in order to test functionality of restoring a backup.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/2n7g0THrz5ACXRxzlXkWW_image-129.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/7MGQmDFCJNHK1L7iSrIRw_image-125-1.png)

Return to the ZVM console and start a File Level Restore. Click `Restore` then `Search and Restore`.

Search for the deleted file share and click on it. Then click `Restore File`.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/WgsTjg4zAftrU333gmhrE_image-138-2.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/oOqJtwIiCO5d6UknkU77d_image-140.png)

Click the folder icon and select the Fileshare to restore it to the Windows File Servers (WinFS) as shown below. Click `Restore`.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/CYZhE0y58fP6p4aophQW5_image-126.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Selcqw8DpSSzAZBkswAe2_image-136.png)

A file restore task will kick-off, beginning the movement of that file share directory and all its contents backed up in Storj back to the Windows File Server.  Once completed, you can find the recovered folder and its files restored in the directory.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/foiWuDXaE2bKPhJpASFuY_image-152.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/QwfpOYEO6JYjVl4IaS-kl_image-178.png)

