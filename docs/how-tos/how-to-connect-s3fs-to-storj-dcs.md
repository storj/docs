# How to connect s3fs to Storj DCS

## Prerequisites

Before you get started, you need to have already made a [satellite account](../getting-started/satellite-developer-account/creating-your-account.md), [created an access grant](../getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant.md) and [registered on the self-hosted S3-Compatible Gateway](../api-reference/uplink-cli/access-command/access-register.md) or [generated credentials for Storj-hosted S3-Compatible Gateway](../getting-started/quickstart-aws-sdk-and-hosted-gateway-mt.md#generate-credentials-to-the-gateway-mt).

## Install s3fs

See [https://github.com/s3fs-fuse/s3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse#installation) for installation instructions for your OS.

## Configure s3fs to use Storj DCS S3 Gateway

You can use either [Self-hosted S3 Compatible Gateway](../api-reference/s3-gateway/) or [Storj-hosted S3 Compatible Gateway](../api-reference/s3-compatible-gateway/). You only need S3 compatible credentials and endpoint.

### Create the credentials file

Please substitute your own **Access Key ID** instead of `ACCESS_KEY_ID` and your own **Secret Access Key** instead of `SECRET_ACCESS_KEY` in the example below:

```
echo ACCESS_KEY_ID:SECRET_ACCESS_KEY > ${HOME}/.passwd-s3fs
chmod 600 ${HOME}/.passwd-s3fs
```

### Create a bucket

You can create a bucket [with uplink](../getting-started/quickstart-uplink-cli/uploading-your-first-object/create-a-bucket.md), with [AWS S3 CLI](../getting-started/gateway-mt/#make-a-bucket) or with [Objects browser](../getting-started/quickstart-objectbrowser.md).

## Mount a bucket to the folder

Create a folder:

```
sudo mkdir /mnt/my-bucket
sudo chown myuser /mnt/my-bucket
```

Mount a bucket to the folder. We will assume that you [created a bucket `my-bucket`](how-to-connect-s3fs-to-storj-dcs.md#create-a-bucket) earlier. We will use the endpoint `https://gateway.us1.storjshare.io` here, but you can [choose the right one for you](../api-reference/s3-compatible-gateway/#regions-and-points-of-presence).

If you use the [Self-hosted S3 Compatible Gateway](../api-reference/s3-gateway/), then the endpoint could be `http://localhost:7777` (depends on your configuration and infrastructure).

```
s3fs my-bucket /mnt/my-bucket -o passwd_file=${HOME}/.passwd-s3fs -o url=https://gateway.us1.storjshare.io/ -o use_path_request_style
```

## Mount a bucket to the folder on boot

You should make sure that the credentials file is available for the root on boot time. You can create it in the `/etc/` folder:

```
sudo echo ACCESS_KEY_ID:SECRET_ACCESS_KEY > /etc/passwd-s3fs
sudo chmod 600 /etc/passwd-s3fs
```

Then add the following to `/etc/fstab`:

```
my-bucket /mnt/my-bucket fuse.s3fs _netdev,allow_other,use_path_request_style,url=https://gateway.us1.storjshare.io/ 0 0
```

Check that it is working - The command:

```
sudo mount -a
```

should not return any error. Next, check that your Storj DCS bucket is mounted:

```
df -HT
```

Now you can use the mounted bucket almost as any folder.

## See also

We would recommend to have a look at [rclone](sync-files-with-rclone/) and its [`rclone mount` command](https://rclone.org/commands/rclone\_mount/) as well.

Please note - you can [configure a native connector in rclone](sync-files-with-rclone/rclone-with-native-integration.md) and use [End-to-end Encryption](../concepts/encryption-key/design-decision-end-to-end-encryption.md), unlike [Storj-hosted S3 Compatible Gateway](../api-reference/s3-compatible-gateway/) which uses [Server-side Encryption](../concepts/encryption-key/design-decision-server-side-encryption.md) to provide a S3-compatible protocol (the S3 protocol does not use client side encryption by design).
