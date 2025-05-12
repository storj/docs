---
title: MASV
docId: xee3thooxoozah7wuuv7i
tags:
  - content-delivery
metadata:
  description: Learn how to use Storj with MASV.
  title: 'Using Storj with MASV'
---

## Integration

To integrate Storj with MASV, you will need to create S3 credentials in Storj and add them within MASV.

### Requirements

- An active Storj account
- A bucket for use with MASV in your Storj instance
- An active account on MASV

---

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://www.storj.io/signup?partner=MASV> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting MASV to Storj

### Creating a Storj Cloud Integration in MASV

1. Log into your MASV Account:

1. In the MASV web app, select **Integrations** from the left-hand menu.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%202.50.29%E2%80%AFPM.png)

1. If you are using Cloud Integrations for the first time, click **Storj** from the grid; or you can also select Storj from the **New Integration** > **Select Service** drop-down menu.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%202.50.56%E2%80%AFPM.png)


1. In the pop-up window, fill out **Connection Name**. Tip: enter a short description of what you use this integration for.
   Fill out **Bucket**, **Access Key ID**, and **Secret Access Key** with the S3 credentials you created above.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%202.54.16%E2%80%AFPM.png)

1. After clicking **Connect**, you should be greated with a message confirming the integration.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%202.55.05%E2%80%AFPM.png)


### Creating a MASV Portal integrated with Storj

1. In the MASV web app, select **Request Files with Portals** from the left-hand menu.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%203.59.58%E2%80%AFPM.png)

1. Select **New Portal** from the top right-hand corner.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%203.58.14%E2%80%AFPM.png)

1. In the **Select New Portal** pop-up window, select **Custom Portal** by clicking **Create Portal**.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%203.59.01%E2%80%AFPM.png)

1. On the **Integrations** tab, enable **Storj** by clicking its corresponding button in the **Status** column.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%204.01.41%E2%80%AFPM.png)

1. Continue to configure your portal as desired, finally clicking **Create** in the bottom right-hand corner.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MASV/Screenshot%202024-05-29%20at%204.08.34%E2%80%AFPM.png)

1. Shortly after users upload content to MASV, the files should be available in your Storj bucket.
