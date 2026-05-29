---
title: Libuplink mode (Storj only)
hideTitle: false
docId: d60d5a4b-8215-4a8d-8a65-6b4ab8f699db
weight: 3
metadata:
  title: Configure the Object Mount to use Storj libuplink (read only)
  description:
    Understanding how to configure a new Mount to use libuplink with Storj Object Storage in a read only mode and mount object buckets.
hidden: false
---

Object Mount can connect to Storj’s Distributed Cloud Storage offering as well using Storj libuplink. This connection method is read only and designed for the quick data migration from Storj Object Storage.

## Obtaining a latest version of Object Mount

1. Download latest Object Mount release for your OS here: https://link.storjshare.io/s/ju4fw3iep5pp2bxqioi7dlaaxqgq/object-mount-builds/latest/

2. Install and reboot if asked

## Obtaining an access grant for your Storj project

Open your project in Storj web portal, go to **Access Keys** 

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/access-keys.png)

and [create a new access grant](docId:_xWsamBjOsZYyu9xtQCm5#create-access-grant):
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/access-grant-1.png)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/access-grant-2.png)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/access-grant-3.png)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/access-grant-4.png)

## Configure a new Credentials record

1. Open Object Mount, navigate to **Credentials** > *Add New Credentials*

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-credentials-uplink.png)

2. Select **Storj**, switch to **Uplink (Access Grant)** and paste the access grant created previously

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-credentials-uplink-access-grant.png)

3. Complete the procedure by selecting all buckets or specific buckets you want to add to the mount

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-credentials-uplink-access-grant-all-buckets.png)

## Add a new Mount

Navigate to **Mounts** and create additional mounts if desired using ***Create New Mount*** and specifying buckets and mount points.

{% tabs %}
{% tab label="Windows" %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-configure-your-mount.jpg)

See [](docId:khHGfZsyY9NJ2uGK#enter-your-credentials-and-create-a-mount) for Windows.

{% /tab %}
{% tab label="macOs" %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-credentials-macos-mount-path.png)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-credentials-macos-mount-path-confirmation.png)

See [](docId:QpBba8p4bMTXAkBK#enter-your-credentials-and-create-a-mount) for macOS.

{% /tab %}
{% /tabs %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mount-success.png)

## Mount a bucket with a new Mount

Enable one of the added mounts and use it as a read-only file system to migrate the data.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mount-bucket.png)


_See the Advanced Guide article [](docId:aish4shuiheeZaig) for additional credential options._
