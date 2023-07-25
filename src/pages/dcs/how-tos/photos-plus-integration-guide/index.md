---
title: Photos+
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-07-19T18:15:39.875Z
docId: e8RYUgo0V1EGA6wbuvb2x
redirects:
  - /dcs/how-tos/photos-plus-integration-guide
pageTitle: Photos+ Integration Guide
---

## Introduction

**Photos+** is an iOS/Android App. It allows you to store and manage your photos and videos in your own cloud storage account. You can use **Photos+** with **Storj DCS** S3-compatible storage.

**Main site**: <https://photosplus.app/>

Mobile app download links:

*   Apple App Store: <https://apps.apple.com/us/app/photos-cloud-library/id1310744251>

*   Google Play Store: <https://play.google.com/store/apps/details?id=com.pixegram.photosplus>

## Configure Photos+ to use Storj DCS

1.  When starting **Photos+**, you will be shown an empty Library.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/utqlQk3YxL60YZ5gWsSwK_img2807.png)




2\. Click on the person-shaped icon in the lower right corner to show your Profile page.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/a5v_k_PKDJqIsxs1DGfD1_img2808.png)

3\. Click on the cog wheel icon on the upper right to access Settings.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/WTySRmSPRk7ew95G59r2C_imgedaea36c758c-1-2.jpeg)

4\. Click **Configure** to begin setting up Storj DCS for Photos+.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/yXxrIf3BXor9m9KsqPY6W_imgf65448a9a594-1.jpeg)

5\. Select **S3 Storage** and enter “gateway.storjshare.io” as the URL, along with your corresponding access key and secret key. See [](docId\:AsyYcUJFbO1JI8-Tu8tW3) for details on creating these access credentials.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/zIpOoL3wJvmashUj-iHjB_img419569e7945f-1.jpeg)

6\. Once you’ve completed configuring Storj DCS as your Cloud Storage Provider, to see Storj in action, you’ll need to click the icon in the lower right corner composed of four squares to return to your Library. From there, click the three-dot icon in the upper right corner.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/UGNi_XIgzeXZMqdxT_e6Y_img2812.png)

7\. Click **Add Album** and type in your chosen Album name. Then click the large checkbox in the center of the screen to continue.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/nGx6MrNH0jddwuOyCkMpN_img2830.png)

8\. Once your album is created, click its name to view it. While viewing the album, you can add content to it using the plus-sign icon in the upper right corner. This will bring up the “Select Album” screen. Click the album from which you want to add photographs.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/GKmxVS6gEwcqADIQOf6Di_img2865.png)

9\. When viewing an album, select individual media to add by clicking each item, or use the blank checkbox next to the **Add** checkbox in the upper right to add all items. Once you’ve selected all the items your want in your album, click **Add** to continue.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/fKryepsJ2ygBUCb7NplLE_img2863.png)

10\. At this point, you should see an album in your Library. You’re ready to synchronize your media to Storj. Click the circular arrow icon at the bottom center of the screen.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/TMipi78UFMC_XlLSWX_W1_img2806.png)

11\. Click **Start** to begin synchronizing your library. You may check via the Storj DCS dashboard or use any of our command line tools to see if your library has been backed up to Storj.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/tEymuK4I_atEURjaPffbs_img2866.png)

