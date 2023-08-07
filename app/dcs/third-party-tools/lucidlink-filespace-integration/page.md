---
title: LucidLink Filespace
docId: N-d1y_hTKGgjDM0Z6Bjx5
redirects:
  - /dcs/how-tos/lucidlink-filespace-integration
pageTitle: LucidLink Filespace Integration Guide
---

[LucidLink](https://www.lucidlink.com/) Filespaces is a distributed global file system for object storage that performs like a local disk and provides seamless access to data stored in distant locations. LucidLink's cloud-native distributed file system allows many users to access it concurrently via a folder placed on the local client. The LucidLink cloud NAS provides access to large datasets through direct streaming, eliminating the need for downloading and synchronizing.&#x20;

## Advantages of Storj with Lucidlink 

Using Storj with LucidLink provides resilient cloud object storage with blazing performance and zero-trust security. This integration ensures:

1.  **Fast performance that simulates disk storage**: LucidLink enables unparalleled performance with object storage where only the data bits required at the current time are streamed to and from the client and storage.

2.  **Combined security features**: LucidLink provides a “Zero-Knowledge” [security model](https://www.lucidlink.com/wp-content/uploads/LucidLink-Security_Model.pdf) that encrypts all the data starting in the local cache on the client, in-flight, and in the object storage itself—and only the customer has the encryption key. Storj encrypts your data as well.

3.  **Access**: Allows multiple globally distributed users simultaneous access to data.&#x20;

## Integration

This integration uses S3 credentials passed from Storj to LucidLink. You will need to set up a Storj account, create a Storj bucket for LucidLink, and generate S3 credentials for LucidLink. Then, you will need to create a Filespace on LucidLink using and initialize it with credentials created in Storj.

### Software Requirements 

LucidLink integrates with any S3-compatible cloud storage platform, including Storj.&#x20;

To integrate LucidLink with Storj, you will need:

- A Storj account.&#x20;

  - [Login](https://storj.io/login), if you already have an account, or sign up here <https://us1.storj.io/signup?partner=lucidlink> &#x20;

- A LucidLink account

- The LucidLink desktop app&#x20;

LucidLink is available for Windows, MacOS, and Linux. Download LucidLink here: <https://www.lucidlink.com/download>

Or sign up for a free trial of LucidLink here: <https://www.lucidlink.com/trial>

---

### Create a Storj Account

To begin, you will need to create a Storj account. If you already an account, go to <https://storj.io/login>.

Navigate to <https://storj.io/signup> to sign up. Enter your full name, email address, and a password, as shown below:

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

## Connect LucidLink to Storj

To complete the integration, you will need the S3 credentials created in the previous steps, a LucidLink Filespace for Storj, and the LucidApp on your local machine.

### LucidLink Access

To sign in to your LucidLink account, visit [https://www.lucidlink.com/webportal/login ](https://www.lucidlink.com/webportal/login)or visit <https://www.lucidlink.com/> and click "Sign in". Otherwise, create an account.

Signing in takes you to the LucidLink web portal, where you will create your domain and Filespace.

### Create a Domain

When you initially log in to LucidLink, you will be prompted to name your domain. Your domain is where you will create Filespaces. In this case, we have named our domain "storjdemo".

### Create a LucidLink Filespace

1\. From the webportal, click on the "Create New Filespace" card.

2\. Choose the "Custom Filespace" plan to add your own cloud storage.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/aX7UqSXK4j8ASD-LM67yW_01home.png)

3\. Choose the "Custom Filespace" option to use your own cloud storage.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/diNf1NhPIcuGyLYlF6gq1_001filespace.png)

4\. Choose a Filespace name. In this case, we will use "storj".

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/a7OoUv56oD2pMUOptcVIl_03filespacename.png)

1.

5\. On the "Choose Your Provider" screen, scroll down to "Other Cloud" and select that option.

6\. Enter the endpoint URL that you saved from your S3 credentials in the "Endpoint URL" field. In this case, our endpoint is **https\://gateway.storjshare.io**.

7\. If desired, set your region under the "Region name" field. This is not required.

8\. If desired, check "Configure advanced settings" at the bottom of the page before clicking "Continue".

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/JvZmx8eldEen7okLe2Py8_endpoint.png)

9\. On the Advanced Settings page, enter the bucket name that you created in Storj. In this instance, the bucket is "lucidlink-bucket".

10\. It is recommended to set the block size to **at least 2MB** for optimal data stream quality.&#x20;

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/_UNPS7Kq_nfEidJ3xFVU5_00026bucket.png)

12\. Review and confirm the details of your Filespace before clicking "Create" at the bottom of the page.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/hpfpo2p9zlbmR5WqcF0P4_00027review.png)

13\. LucidLink will redirect you to your dashboard while it sets up your Filespace. Once the Filespace is set up, you will have to initialize it. Follow the steps below to initialize your Filespace.

### Initialize your Filespace

Initializing your Filespace must be completed through the LucidLink client, which you can download from the Lucidlink website. You will be prompted for your S3 credentials and required to set a root password during initialization.

1\. Click "Initialize" on your new Filespace.

2\. Read through the pop-up window detailing the instructions for initializing your Filespace.&#x20;

1.  At the top is a link to download the LucidLink client. If you have not already downloaded it, click on the link, or visit <https://www.lucidlink.com/download>.&#x20;

2.  If you have already downloaded the LucidLink client (LucidApp), click "Launch the desktop client" at the bottom of the window.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/9n306OD79T4a77FeLPhzF_00035instructions.png)

3\. Once the LucidApp has launched, add your saved **access key** and **secret key **created in Storj into the "Access Key" and "Secret Key" fields, respectively. Click "Next".

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/8O3vgxGkeWFux51kKXmrT_00036pass.png)

4\. Create a root password. Make sure to save this password because it cannot be recovered. Check the "Remember password" box at the bottom of the screen if you wish to store your password. Then click "Initialize".

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/vWdcZ6p9gNEyfCTcmrRJX_00037password.png)

### Initializing a Filespace From the Command Line

Initializing the Filespace from the command line allows you more options in configuring the initialization. The command takes the following general format:

```shell
lucid init-s3 --fs <filespace.domain> --password <rootpassword> --https --endpoint storage.googleapis.com --region <region> --access-key <accesskey> --secret-key <secretkey> --bucket-name <bucket> --provider <provider>
```

With our credentails in this example, we would have the following command:

```shell
lucid init-s3 --fs <storj.storjdemo> --password <MtrU76#pxxY98> --https --endpoint us1.storj.io/ --region <US east> --access-key <jx626ak4gis37hyvfi42znkz5mrq> --secret-key <j2gyivv7jor6gasbgqkhsalx4jky2qj36zlamm76mxiggl6esaj2u> --bucket-name <lucidlink-bucket> --provider Storj
```

For more information on using the command line with LucidLink, see the following guide: <https://support.lucidlink.com/hc/en-us/articles/5778797132557>

## Success!

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/8Snm14NljluKExsW2ZFZ__0004folder.png)
