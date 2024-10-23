---
title: Delete buckets
docId: pxdnqsVDjCLZgeEXt2S6x
weight: 1
metadata:
  title: Deleting Buckets Using Different Tools
  description:
    Guide on how to delete Storj buckets using command-line tools or the
    Storj Console even if the encryption phrase is lost.
---

You can delete a bucket from various command-line tools or the Storj Console.

{% tabs %}

{% tab label="rclone" %}

To remove an empty bucket:

```shell {% title="rclone" %}
# link[1:6] https://rclone.org/install/
# link[8:12] https://rclone.org/commands/rclone_rmdir/
# terminal
rclone rmdir storj:my-bucket
```

To remove all objects from the bucket if the encryption phrase is not lost:

```shell {% title="rclone" %}
# link[1:6] https://rclone.org/install/
# link[8:13] https://rclone.org/commands/rclone_delete/
# terminal
rclone delete --rmdirs storj:my-bucket
```

To remove the not empty bucket even if the encryption phrase is lost:

```shell {% title="rclone" %}
# link[1:6] https://rclone.org/install/
# link[8:12] https://rclone.org/commands/rclone_purge/
# terminal
rclone purge storj:my-bucket
```

{% /tab %}

{% tab label="aws cli" %}

To remove a not empty bucket even if the encryption phrase is lost:

```shell {% title="aws cli" %}
# link[1:3] https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io rb --force s3://my-bucket
```

{% /tab %}

{% tab label="uplink" %}

To remove a not empty bucket even if the encryption phrase is lost:

```shell {% title="uplink" %}
# link[1:6] docId:hFL-goCWqrQMJPcTN82NB
# link[8:9] docId:Wo5-shT0hZDNMeyM1kA12
# terminal
uplink rb --force sj://my-bucket
```

To remove objects from the bucket even if the encryption phrase is lost:

```shell {% title="uplink" %}
# link[1:6] docId:hFL-goCWqrQMJPcTN82NB
# link[8:9] docId:eavv_906IH-39ylIXq30d
# terminal
uplink rm --recursive --encrypted --parallelism 30 sj://my-bucket
```


{% /tab %}

{% tab label="Storj Console" %}

[](docId:4oDAezF-FcfPr0WPl7knd#deleting-buckets)

{% callout type="warning"  %}
If there are millions of objects, it could timeout. In that case it's highly recommended to use [`rclone purge`](https://rclone.org/commands/rclone_purge/),
[`uplink rb --force`](docId:Wo5-shT0hZDNMeyM1kA12), [`aws s3 rb --force`](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html),
[](docId:QQGzEDU8o-IodQWmr7xP3) or [](docId:3Vj_5zZ99c4mTMRhQjGFM) (_**FileZilla Free** wouldn't work if the encryption phrase is lost, you need to use [**FileZilla PRO with Storj S3 integration**](docId:APk9353kCNcg5PKRPQ06u#storj-file-zilla-pro-via-gateway-mt)_)
{% /callout %}

{% /tab %}

{% /tabs %}
