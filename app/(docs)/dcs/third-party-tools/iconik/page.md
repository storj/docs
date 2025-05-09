---
title: iconik
docId: DOrHKPnU0WwmIG7LX4Pfg
tags:
  - file-management
redirects:
  - /dcs/iconik-integration
  - /dcs/how-tos/iconik-integration-guide
metadata:
  title: Guide to Integrating iconik with Storj
  description:
    Learn to integrate Storj with iconik, a cloud media management software.
    Leverage benefits like collaborative editing, file aggregation and cost savings.
    Topics covered include account creation, bucket creation and S3 credentials generation.
---

[iconik](https://www.iconik.io/) is a cloud media management and collaboration software that gathers and organizes media from multiple storage locations. iconik has powerful features that allow users to find, share, and collaborate on media from anywhere in the world. iconik is web-based and runs in the cloud, using its iconik Storage Gateway (ISG) to manage and track files while allowing users to bring their own storage.

## Advantages of iconik with Storj

iconik is easy to use and intuitive with a clean and intuitive platform. It organizes your media by making it searchable.

1.  **Edit, manage, and collaborate on files in a feature-rich environment.** Storj integration with iconik allows multiple users from different locations to view and edit your files on Storj simultaneously. Even parties who do not use iconik can be invited to collaborate on documents in iconik. iconik also provides fine control of data sharing, allowing you to remove shares and add a time limit on shares.

2.  **Aggregates files from multiple cloud storages.** If Storj is only one part of your storage solution, iconik makes it easy to aggregate your files from multiple storage providers.

3.  **Cost Savings.** Adds editing and sharing features to your Storj data, creating feature-rich storage and while maintaining low costs for the storage itself.

## Integration

To integrate Storj storage with iconik, you will mount your cloud storage in iconik's Admin section using S3 credentials.

iconik integrates with any S3-compatible cloud storage platform.

To complete the integration, you will need:

- A Storj account - sign up here <https://storj.io/signup?partner=iconik> or go to <https://storj.io/login> if you already have an account.

- An iconik account.

iconik is compatible with Windows, Mac, and Linux OS. To request a trial, visit <https://www.iconik.io/trial>.

---

### Create a Storj Account

To begin, you will need to create a Storj account. If you already an account, go to <https://storj.io/login>.

Navigate to <https://storj.io/signup?partner=iconik> to sign up. Enter your full name, email address, and a password, as shown below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/x1VMINrRdadrVk5vLXIBT_capture.PNG)

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

1\. Navigate to “Buckets” on the left side menu.

2\. Click “New Bucket” on the top right.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jbnQ38ynnrWl0jnO_j-E5_comet-backup-storj-2.png)

3\. Assign the bucket an easily identifiable name, such as "my-bucket".

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/K65vHcrJtRq4S87jICtYx_screenshot-2023-03-09-at-110429-am.png)

4\. Click **Create bucket**

### Generate S3 credentials

Storj has an Amazon S3 compatible API and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj web console:

1\. Navigate to **Access** on the left side menu.

2\. Click **Create S3 Credentials** under the S3 Credentials block.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/EZyAl8Wux2GOlyPd70HnI_screenshot-2023-03-09-at-110900-am.png)

3\. When the Create Access screen comes up, set specifications according to the following guidelines:

- **Type:** S3 Credentials

- **Name:** The name of the credentials (e.g. my-access)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Cv1Lirp-3-OueRk-YAR8u_image.png)

4\. Click **Continue** to provide permissions

- **Permissions:** All

- **Buckets:** Feel free to specify the bucket you created above (e.g. my-bucket), or leave as “All”

- **End date**: provide an expiration date for these credentials (optional)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/gQ8jBHtvd5sFZFuAqth_h_image.png)

5\. Click **Continue** to provide Access encryption Information

- **Use the current passphrase**: this is default option

- **Advanced**: you may provide a different encryption phrase either your own or generate a new one.

  - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase

  - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Uxn8zBqXQVmQvsswV3pJ2_image.png)

{% callout type="warning"  %}
In order to see the data uploaded to your bucket in the web console, you must unlock the bucket with the same encryption passphrase as the credentials.
{% /callout %}

6\. Click **Create Access** to finish creation of your S3 credentials

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zk2JE9Z6f3vk_R2cjpdqc_image.png)

7\. Click **Confirm** the Confirm details pop-up message

8\. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/xH5tgzVKXn-uK2hVfSo8e_image.png)

---

## Integrating iconik with Storj

To complete the integration, you will need the S3 credentials created in the previous steps and access to an iconik account.

### iconik Access

To sign in to your iconik account, visit [https://iconik.io/](https://app.iconik.io/) and click Sign In. This takes you to <https://app.iconik.io/> from where you can enter your credentials.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/W_L58KzUqW4fiZ9RTNCul_image.png)

If you do not have an iconik account, you must request a trial by clicking Request Trial on the home page or filling out the contact form at [https://www.iconik.io/trial.](https://www.iconik.io/trial)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/6fx_6jRseVAUIazaaTp9l_image.png)

### Add New Storage in iconik

1\. From the iconik app landing page, click on ADMIN in the top navigation bar.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rhokM20s1IZ30eoBgNcRQ_admin1.png)

2\. From the left-hand menu, select the brown Storages icon, which appears as a file storage unit. This will take you to the Storages section, where all connected storages are listed.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/b8sCXzCaADRieY9JWLLrd_storage.png)

3\. From the Storages section, click + NEW STORAGE in the upper right corner. This brings up a pop-up screen.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/8Bnk1Igu6MRrQkNTjifqu_image.png)

4\. In the pop-up screen, you will enter all of the relevant information about your storage, including the S3 credentials you have saved from the previous section of this tutorial. Fill out the fields as directed below:

1.  **Name**: What you will call this storage in the iconik app. For example, "storj-bucket".

2.  **Description**: An optional brief description of your storage space.

3.  **Storage Purpose**: Select the purpose of this storage space from the drop-down. For instance, if it is primarily an archive destination, select Archive. If it will contain working files, select Files.

4.  **Storage Type**: Select **Amazon S3**. This is the option for all S3-compatible cloud storage.

5.  **Access Key**: Enter the access key from the S3 credentials you generated in Storj.

6.  **Secret Key**: Enter the secret key from the S3 credentials you generated in Storj.

7.  **Bucket**: Enter the name of the bucket you want iconik to access in Storj. In this case, the bucket is the "iconik" bucket you created earlier.

8.  **Path**: The root path of your cloud storage. Normally left empty.

9.  **Region**: Your region. For example, "us-east-1".

10. **Endpoint**: iconik sets the default to the AWS endpoint, but any S3 compatible storage will work. Put the Storj corresponding http(s)-endpoint here, https\://gateway.storjshare.io

11. **Use Acceleration**: This feature only applies to AWS storage and should be ignored.

12. **Enable any of the following file permissions to your files if desired**:

    1.  Add unique ID to the filenames

    2.  Read

    3.  Write

    4.  Delete

    5.  Enable Scan

    6.  **Scan Directories**: add directories to scan in this field.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/DWaqqDnHgbuHdNElutGWI_image.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Qhrfg0CwjPsUWgY3IyNyj_image.png)

5\. Click OK at the bottom of the pop-up screen.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/y1zwlwVrJ2KNYFnf4D405_image.png)

## Success!

### Confirmation of Success

A pop-up window confirms that your storage was created successfully with a green checkmark next to "Access credentials" and "Permissions on the storage".

Click **Close** to exit, or **Edit** to make changes to your storage credentials.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/L6UuZmhowWvbhmmezzb5F_image.png)

### Editing Your Storage

Clicking **Edit** takes you to the general settings page for the storage. From there, you can make any changes to the credentials and permissions you initially set.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/G9C1f9lpZDfLzCQUYVjja_image.png)

Returning to the **_Storages_** section, you will see the new storage listed. Clicking on the storage row also takes you to the general settings page of that storage.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/masloLmwj8xPFE5-K-eCV_image.png)

### Testing your Storj storage in iconik

All storage files are accessible from the main page of the iconik app. When you add files to your iconik bucket in Storj, they become available in iconik's web app.

{% callout type="info"  %}
If using [iconik Agent](https://www.iconik.io/agent) or [iconik Storage Gateway](https://app.iconik.io/help/pages/isg/), you may benefit from optimizing your configuration for Storj.
 - In iconik Storage Gateway, set `upload-chunk-size = 67108864`.
   Consider adjusting `file-upload-parallel-uploads-num` and `file-upload-parallel-uploads-threads-num` for optimal performance.
   See [ISG Advanced Options](https://app.iconik.io/help/pages/isg/advanced_options) for more information.
 - In iconik Agent, set `"chunkSize": 67108864`.
   Consider adjusting `numConcurrentChunks` and `numConcurrentUploads` for optimal performance.
   See [Configuring iconik Agent](https://app.iconik.io/help/pages/agent/configuration) for more information.
{% /callout %}
