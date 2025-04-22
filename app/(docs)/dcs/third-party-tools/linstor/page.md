---
title: LINSTOR
docId: 1b4cca3e-05b7-4173-a22d-15e5285830ae
tags:
  - backup
metadata:
  title: Using LINSTOR with Storj for Disaster Recovery
  description:
    Guide how to store your LINSTOR data on Storj to be able to recover
---
LINSTOR® is an open source configuration management system, developed by LINBIT®, for storage on Linux systems.
It manages LVM logical volumes, ZFS volumes, or both, on a cluster of nodes.
It uses DRBD® (also open source software) for replication between different nodes and to provide block storage devices to users and applications, for high availability and disaster recovery use cases.

Because DRBD is a live replication software and not a backup solution, you might want a complimentary solution to create immutable backups.
LINSTOR allows you to make such backups and then store them, for example, in S3 compatible storage, such as a Storj bucket.
Storj provides enterprise-grade, globally distributed cloud object storage and can be a drop-in replacement for any S3-compatible object storage.

## Overview of integrating LINSTOR with Storj
To integrate LINSTOR with Storj, for disaster recovery, you can configure a Storj storage bucket as an S3 remote in LINSTOR. An S3 remote in LINSTOR can be a destination for shipping storage volume snapshots. These snapshots are called backups on the remote S3 storage. You can create snapshots and [ship them to a LINSTOR S3 remote](https://linbit.com/drbd-user-guide/linstor-guide-1_0-en/#s-linstor-snapshots-shipping) either manually, or automatically on a schedule.

When disaster strikes, you can restore data from a Storj backup into your existing LINSTOR cluster, or into another LINSTOR cluster at an off-site DR location.

## Prerequisites
To configure LINSTOR to use Storj storage as a LINSTOR S3 remote, you need to meet the following prerequisites:

1. Have a Storj account, and a storage bucket with configured access to the bucket through [S3 credentials](docId:_xWsamBjOsZYyu9xtQCm5#create-s3-credentials)
2. Have a local LINSTOR cluster with a LINSTOR resource backed by thin-provisioned LVM or ZFS storage

## Setting up LINSTOR encryption for Storj access and secret keys
To access a Storj storage bucket through LINSTOR, you need to record the Storj access and secret keys associated with the S3 credentials for your bucket in the LINSTOR database. LINSTOR will store these keys encrypted, so you need to have an encryption passphrase with LINSTOR.

If you have not already created a [LINSTOR encryption passphrase](https://linbit.com/drbd-user-guide/linstor-guide-1_0-en/#s-encrypt_commands), you can create one by entering the following command:
```bash
linstor encryption create-passphrase
```

If the LINSTOR controller service restarts, for example, after an upgrade or if the LINSTOR controller node reboots, you will need to enter the passphrase before you can access Storj storage through LINSTOR. To do this, enter the command:

```bash
linstor encryption enter-passphrase
```

{% callout type="info" %}
LINSTOR allows for automating the encryption passphrase entry. This is not without security risk implications. Refer to details in the [LINSTOR User Guide](https://linbit.com/drbd-user-guide/linstor-guide-1_0-en/#s-automatic_passphrase).
{% /callout %}

## Creating a LINSTOR remote for your Storj S3 storage
Enter the following commands to create a LINSTOR Storj S3 remote, in all LINSTOR clusters that might need to access your Storj bucket. Change the values stored in the variables to match your environment.

```bash
linstor_s3remotename=storj-remote
storj_bucketname=linstor-storj
storj_region=global
storj_endpoint=<storj-s3-credentials-endpoint>
storj_accesskey=<storj-s3-credentials-access-key>
storj_secretkey=<storj-s3-credentials-secret-key>
linstor remote create s3 $linstor_s3remotename $storj_endpoint \
    $storj_bucketname $storj_region $storj_accesskey $storj_secretkey
```

The `linstor_s3remotename` is a user-defined name for the LINSTOR S3 remote object that you are creating. The `storj_bucketname` is the name of an existing Storj bucket that you want to use for holding LINSTOR storage backups and `storj_region` is the associated location of the bucket. You can verify the bucket name and region from the Storj dashboard by navigating to the Browse Buckets screen, by clicking on Browse from the left-side menu, or by clicking Buckets from the Project Dashboard.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images%2FLinstor/linstor-storj-remote-s3-storage-backup-guide_01-storj-dashboard.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images%2FLinstor/linstor-storj-remote-s3-storage-backup-guide_02-browse-buckets-screen.png)

You will also need to know the Storj access and secret keys, and the associated Storj endpoint for the Storj S3 credentials applicable to the Storj bucket that you are using as a LINSTOR remote. You can show, copy, or download these when you create your Storj S3 credentials.

You can omit the `$storj_secretkey` argument from the `linstor remote create` command to enter the secret key manually. Clear any sensitive variables after using them and remove any commands used to set them from your shell command history.

## Verifying your LINSTOR S3 remote
After creating an S3 LINSTOR remote object, you can verify it exists by entering the following command:

```bash
linstor remote list --pastable
```

Output will be similar to the following:

```text
+------------------------------------------------------------------+
| Name         | Type | Info                                       |
|==================================================================|
| storj-remote | S3   | global.gateway.storjshare.io/linstor-storj |
+------------------------------------------------------------------+
```

## Creating a backup of a LINSTOR storage resource
To back up a LINSTOR storage resource to your Storj storage, enter the following commands, where myres is the name of the LINSTOR resource that you want to back up.

```bash
linstor backup create $linstor_s3remotename myres
```

## Verifying LINSTOR storage resource backups
You can verify that a backup of your LINSTOR resource exists at your LINSTOR S3 remote, by entering the following command:

```bash
linstor backup list $linstor_s3remotename --pastable
```

Output from the command will be similar to the following:

```text
+----------------------------------------------------------------------------+
| Resource | Snapshot             | Finished at         | Based On | Status  |
|============================================================================|
| myres    | back_20250328_150859 | 2025-03-28 15:09:01 |          | Success |
+----------------------------------------------------------------------------+
```

You can also verify the backup by using a utility such as `rclone`, independent of LINSTOR, to list the contents of your Storj bucket. For example, output from an `rclone lsf storj:linstor-storj/` command might show something similar to this:

```
myres_00000_back_20250328_150859
myres_back_20250328_150859.meta
```

## Restoring from a remote backup to a new resource
To restore a remote S3 backup to a new LINSTOR resource on a LINSTOR satellite node named `linstor-sat-0`, in either your existing LINSTOR cluster or another off-site LINSTOR cluster, enter the following commands:

```bash
newresourcename=myrestoredres
linstor backup restore \
    --resource myres $linstor_s3remotename \
    --target-resource-group myresgroup \
    linstor-sat-0 $newresourcename
```

After restoring the resource backup to a new resource on a single LINSTOR satellite node, `linstor-sat-0` in this example, you can then enter the following command to replicate the resource to other LINSTOR satellite nodes in your cluster:

```bash
linstor resource-definition auto-place $newresourcename
```

This command will create new resources on other LINSTOR satellite nodes, based on the LINSTOR auto-placement count value associated with the resource definition that you specify. Because this is a new resource definition, the resource definition will inherit auto-placement properties from the resource group it belongs to. After creating the resource replicas on other satellite nodes to meet auto-placement constraints, LINSTOR will use DRBD to synchronize these new resources with the resource on the satellite node that you restored to earlier.

## Restoring an existing resource from a remote backup
Besides restoring a backup to a new resource, you can also restore an existing resource to a state stored in a remote S3 backup. This might be a recovery method of last resort, because it involves downtime while LINSTOR downloads the backup from S3 storage. Generally, it is better to restore or roll back an existing LINSTOR resource from local snapshots.

Restoring an existing resource to a previous snapshot is a multiple-step process. First verify whether a local snapshot exists for the resource you want to roll back, by entering the following command:

```bash
linstor snapshot list --resources myres --pastable
```

If there are no local snapshots for the resource in your local LINSTOR cluster that you want to roll back to, then your only option might be to restore the resource from a remote backup.

Before you can restore the resource from a remote backup, you first need to delete the local resource on all LINSTOR satellite nodes, after confirming that the resource is not in use in your cluster. An example command might be as follows:

```bash
linstor resource delete linstor-sat-0 linstor-sat-1 linstor-sat-2 myres
```

{% callout type="warning" %}
Deleting a LINSTOR resource will also delete the data stored in the resource in a way that will require snapshot restoration or data forensics recovery to get back. However, LINSTOR will not delete a resource that is in an InUse state on a satellite node, for example, if the storage resource is mounted within a file system.
{% /callout %}

Next, restore the resource from the S3 remote to a single LINSTOR satellite node (`linstor-sat-0` in this example) in your local LINSTOR cluster by entering the following commands. Change the remote, satellite, resource group, and resource names to match your environment.

```bash
linstor backup restore \
    $linstor_s3remotename \
    linstor-sat-0 myres \
    --target-resource-group myresgroup \
    --resource myres
```

Enter a linstor resource list command to verify that the LINSTOR resource is in an up-to-date state. While not highly available, because it is only on one node, you can now put the resource back into use for any applications and services that depend upon it.

Next, enter the following command to replicate the resource to other LINSTOR satellite nodes to match LINSTOR automatic placement constraints, as described earlier:

```bash
linstor resource-definition auto-place $newresourcename
```

Wait for the resource to synchronize and reach an up-to-date state on your LINSTOR satellite nodes. You can use a `watch linstor resource list --resources myres --pastable` command if you need to monitor the synchronization in real time.
