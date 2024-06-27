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

- An active Storj account
- A bucket for Veeam in your Storj instance.
- An installation of Veeam.

{% callout %} Important Note: Please be sure to use at least **large** and ideally **extra large blocks** as demonstrated in the Job Creation Wizard below. {% /callout %}

Download a [free trial](https://www.veeam.com/vm-backup-recovery-replication-software.html) of Veeam or [create a Veeam account](https://www.veeam.com/signin.html?client_id=my-veeam-com).

---

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://www.storj.io/signup?partner=veeam> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting Veeam to Storj

### Repository Configuration

Storj backup is integrated with Veeam using Veeam's **New Object Repository** wizard. Follow the steps below to complete the integration:

#### Launch the **New Object Repository** wizard

1. Open the **Backup Infrastructure** view.

1. In the inventory pane select the **Backup Repositories** node and click **Add Repository** on the ribbon.

1. In the **Add Backup Repository** dialog, select **Object Storage > S3 Compatible**.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MMbsPEmATTdZ81_JyAe92_news3storagesplash.png)

#### Name Object Storage Repository

1.  At the **Name** step of the wizard, specify a name and description for the object storage repository. In the **Name** field, specify a name for the new object storage repository, such as **Storj.**

1.  In the **Description** field, enter an optional description.

1.  To change the maximum number of tasks that can be processed at once, select the **Limit concurrent tasks to N** check box.
{% callout type="info"  %}
In some instances, there may be a benefit to creating a **S3ConcurrentTaskLimit** (DWORD) registry value under the `HKLM\SOFTWARE\Veeam\Veeam Backup and Replication` key on the backup server.
This changes the maximum number of TCP connections used by each Veeam task to upload data to any S3 compatible storage.
Without this registry value present, the default number of TCP connections used by Veeam is 64.  
Setting a value higher than 64 can increase throughput backing up (offloading) to Storj.
{% /callout %}

    ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/XLfq1ljqWaRGqlyKujk7K_s3repository.png)

1.  Select **Next**.

#### Manage Cloud Credentials

1. At the **Account** step of the wizard, add the object storage account created in the previous section. Here you will need the S3 credentials created in Storj to specify the connection settings:

1. In the **Service point** field, specify an endpoint address of your S3 Compatible object storage. This will be the endpoint from the S3 credentials that you downloaded, and should be the following or similar: **https\://gateway.storjshare.io**

1. In the **Region** field, specify a region, such as **us-east-1**.

1. To add the Storj credentials, selecy the **Add...** button next to the **Credentials** drop-down list. Enter the access key and session key in their corresponding fields. Add an optional description in the **Description** field, if desired.
   {% callout type="info" %}
   You can also click the **Manage cloud accounts** link to add, edit, or remove a credentials record.
   {% /callout %}

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/PSB-9XpGQgOYkyM-rMD4l_awsaccount.png)

1. Note the **Use the following gateway server** check box. If selected without a server specified, by default the role of a gateway server is assigned to the machine where Veeam is installed.
   For more information on considerations and limitations for using a gateway server, see [Considerations and Limitations](https://helpcenter.veeam.com/docs/backup/vsphere/object_storage_repository_cal.html) on the Veeam website.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Nm_ozkSpgKbrppfRK5G_v_archiverepositorys3c.png)

1. Select **Next**.

#### Specify the bucket settings

{% callout type="info" %}
**Information regarding Object Lock**

S3 Compatible Object Lock is currently in development. For more information please refer to [](docId:gjrGzPNnhpYrAGTTAUaj).
{% /callout %}

1.  From the **Bucket** drop-down list, select the "veeam" bucket created earlier.

1.  In the **Select Folder** field, select **Browse** and find the cloud folder in your "veeam" bucket to map your object storage repository, if it already exists. If not, you can select **New Folder** to make a new one.

1.  If desired, select the **Limit object storage consumption to** check box to define a soft limit that can be exceeded temporarily for your object storage consumption. Enter a limit value in terabytes or petabytes.
    ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/YOE-le-vX4D0wfn7tnrey_archiverepositorys3cbucket.png)

1.  Select **Next**.

#### Review the credentials and selections

1.  Review the information in the **Summary** window. Go back and make any necessary edits using the **Previous** button.

1.  Select **Finish** and exit the wizard.

### Job Configuration

Use the New **Backup Job wizard** to configure the backup job. Follow the steps below to complete the integration. This is an important step to optimize cost and performance of your backups. For more detail please see the following [Object Storage Considerations Veeam.](https://community.veeam.com/blogs-and-podcasts-57/sobr-veeam-capacity-tier-calculations-and-considerations-in-v11-2548)

1. Launch the New Object Repository wizard:

2. Work your way though the configuration and open **Advanced** on the [Storage Selection Step](https://helpcenter.veeam.com/docs/backup/vsphere/backup_job_storage_vm.html)

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/veeam1.png)

3. Upon opening Advanced - Storage, you will be presented with the option of selecting Storage Optimization.
Veeam recommends the default of 1MB because increasing the block size can result in larger incremental backups. 
However, Storj's recommended setting for object storage is **4MB** or **8MB**. 
Taking into account [Storj segment cost](docId:59T_2l7c1rvZVhI8p91VX#per-segment-fee), using larger block sizes both reduces overall Storj costs and provides better backup and restore times.
{% callout type="info"  %}
To enable **8MB** as a Storage Optimization option, create a **UIShowLegacyBlockSize** (DWORD, 1) registry value under the `HKLM\SOFTWARE\Veeam\Veeam Backup and Replication` key on the backup server. This requires Veeam 11a or newer.

You may need to reboot or restart the Veeam services for the change to take effect in Veeam's user interface.
{% /callout %}

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/veeam_advanced_settings.png) 

