---
title: Veeam
tags:
  - backup
docId: Cr9Ak4IM8F9uuHVlVtbpj
redirects:
  - /dcs/how-tos/veeam-integration-guide
metadata:
  title: Guide to Veeam and Storj Integration
  description:
    A comprehensive guide to integrating Veeam backup and replication with
    Storj, detailing its advantages and step-by-step integration instructions.
---

**Veeam Backup & Replication** is an all-in-one backup, recovery, and data security solution that serves both on-premises and cloud storage. It is the foundation of the Veeam Platform and delivers simple, flexible, reliable, and powerful data protection.

For more information, visit [veeam.com](). You can also [download a free trial](https://www.veeam.com/vm-backup-recovery-replication-software.html) for 30 days.

## Advantages of Veeam with Storj

- **Eliminate downtime**: instant recovery and protection from cyber threats.

- **Fast and secure backup for your data**: automate workload backup and discovery across cloud, virtual, physical, and NAS. Fast image-based backups take advantage of VMs, hardware, and OS snapshots.

- **Lightning-fast data recovery for any scenario**: instant recovery of OSes, applications, databases, VMs, files, folders, objects, and shares. Recovery works across multiple clouds and platforms.

- **Flexibility**: a software-defined and hardware–agnostic solution for ultimate flexibility.

## Integration

To integrate Storj with Veeam, you will need to create S3 credentials in Storj and add them within Veeam. Veeam uses a wizard to guide users in adding S3-compatible cloud storage.

### Requirements

- An active Storj account: navigate to <https://us1.storj.io/signup?partner=veeam> to sign up, or log in <https://storj.io/login> if you already have an account.

- A bucket for Veeam in your Storj instance.

- An installation of Veeam.

Download a [free trial](https://www.veeam.com/vm-backup-recovery-replication-software.html) of Veeam or [create a Veeam account](https://www.veeam.com/signin.html?client_id=my-veeam-com).

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

## Connecting Veeam to Storj

### Veeam Configuration

Storj backup is integrated with Veeam using Veeam's **New Object Repository** wizard. Follow the steps below to complete the integration:

1\. Launch the **New Object Repository** wizard:

1.  Open the **Backup Infrastructure** view.

2.  In the inventory pane select the **Backup Repositories** node and click **Add Repository** on the ribbon.

3.  In the **Add Backup Repository** dialog, select **Object Storage > S3 Compatible**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MMbsPEmATTdZ81_JyAe92_news3storagesplash.png)

2\. Specify the Object Storage Name

1.  At the **Name** step of the wizard, specify a name and description for the object storage repository. In the **Name** field, specify a name for the new object storage repository, such as **Storj.**

2.  In the **Description** field, enter an optional description.

3.  To limit the maximum number of tasks that can be processed at once, select the **Limit concurrent tasks to N** check box.

4.  Select **Next**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/XLfq1ljqWaRGqlyKujk7K_s3repository.png)

3\. At the **Account** step of the wizard, add the object storage account created in the previous section. Here you will need the S3 credentials created in Storj to specify the connection settings:

1.  In the **Service point** field, specify an endpoint address of your S3 Compatible object storage. This will be the endpoint from the S3 credentials that you downloaded, and should be the following or similar: **https\://gateway.storjshare.io**

2.  In the **Region** field, specify a region, such as **us-east-1**.

3.  To add the Storj credentials, selecy the **Add...** button next to the **Credentials** drop-down list. Enter the access key and session key in their corresponding fields. Add an optional description in the **Description** field, if desired.
    **Note**: you can also click the **Manage cloud accounts** link to add, edit, or remove a credentials record.

4.  Note the **Use the following gateway server** check box. If selected without a server specified, by default the role of a gateway server is assigned to the machine where Veeam is installed.
    For more information on considerations and limitations for using a gateway server, see [Considerations and Limitations](https://helpcenter.veeam.com/docs/backup/vsphere/object_storage_repository_cal.html) on the Veeam website.

5.  Select **Next**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Nm_ozkSpgKbrppfRK5G_v_archiverepositorys3c.png)

Credentials window:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/PSB-9XpGQgOYkyM-rMD4l_awsaccount.png)

4\. Specify the bucket settings.

1.  From the **Bucket** drop-down list, select the "veeam" bucket created earlier.

2.  In the **Select Folder** field, select **Browse** and find the cloud folder in your "veeam" bucket to map your object storage repository, if it already exists. If not, you can select **New Folder** to make a new one.

3.  If desired, select the **Limit object storage consumption to** check box to define a soft limit that can be exceeded temporarily for your object storage consumption. Enter a limit value in terabytes or petabytes.

4.  If desired, select the **Make recent backups immutable for** check box to prohibit the deletion of blocks of data from object storage. Specify the immutability period, in days.

    Note: selecting this option might increase storage costs. For more information about immutability, see [Immutability](https://helpcenter.veeam.com/docs/backup/vsphere/immutability_sobr.html?ver=120) on the Veeam website.

5.  Select **Next**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/YOE-le-vX4D0wfn7tnrey_archiverepositorys3cbucket.png)

5\. Review the credentials and selections.

1.  Review the information in the **Summary** window. Go back and make any necessary edits using the **Previous** button.

2.  Select **Finish** and exit the wizard.
