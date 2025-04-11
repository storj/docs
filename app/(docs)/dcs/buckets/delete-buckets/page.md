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

To remove the bucket with [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) enabled in a Governance mode and if you know the encryption phrase:
You need to use [rclone configured with Storj S3](https://storj.dev/dcs/getting-started) credentials with **`List`**, **`Upload`**, **`Download`**, **`Delete`** and **`BypassGovernanceRetention`** permissions in an **Advance** mode:

```shell {% title="rclone" %}
# link[1:6] https://rclone.org/install/
# link[8:12] https://rclone.org/commands/rclone_purge/
# terminal
rclone purge us1-gw-mt:my-locked-bucket --header "x-amz-bypass-governance-retention:true"
```

{% callout type="warning" %}
Please note, this command do not honor any include/exclude filters or prefixes (subfolders), it will always purge the entire bucket, including bucket itself.
{% /callout %}

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

To remove object versions from the bucket even if the encryption phrase is lost:

You can [setup uplink](https://storj.dev/learn/tutorials/quickstart-uplink-cli/uploading-your-first-object/set-up-uplink-cli) with the access grant created in advanced mode and all permissions (including required **`BypassGovernanceRetention`** if you also have [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) enabled in a Governance mode), then you can use this command:

```shell {% title="uplink" %}
# link[1:6] docId:hFL-goCWqrQMJPcTN82NB
# terminal
uplink ls --encrypted --recursive --all-versions sj://locked-bucket/ -o json | jq '"uplink rm --encrypted --bypass-governance-retention --version-id " + .versionId + " sj://locked-bucket/" + .key' -r | bash
```

PowerShell version:
```powershell {% title="uplink" %}
# link[3:8] docId:hFL-goCWqrQMJPcTN82NB
# terminal
./uplink ls --encrypted --recursive --all-versions sj://locked-bucket/ -o json | %{$o = ($_ | ConvertFrom-Json); ./uplink rm --encrypted --bypass-governance-retention --version-id $o.versionId $("sj://locked-bucket/" + $o.key)}
```

after that you can delete the bucket:
```shell {% title="uplink" %}
# link[1:6] docId:hFL-goCWqrQMJPcTN82NB
# link[8:9] docId:Wo5-shT0hZDNMeyM1kA12
# terminal
uplink rb --force sj://locked-bucket
```

PowerShell version:
```powershell {% title="uplink" %}
# link[3:8] docId:hFL-goCWqrQMJPcTN82NB
# link[10:11] docId:Wo5-shT0hZDNMeyM1kA12
# terminal
./uplink rb --force sj://locked-bucket
```


{% /tab %}

{% tab label="Storj Console" %}

[Objects Browser|Deleting buckets](docId:4oDAezF-FcfPr0WPl7knd#deleting-buckets)

{% callout type="warning"  %}
If there are millions of objects, it could timeout. In that case it's highly recommended to use [`rclone purge`](https://rclone.org/commands/rclone_purge/),
[`uplink rb --force`](docId:Wo5-shT0hZDNMeyM1kA12), [`aws s3 rb --force`](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html),
[](docId:QQGzEDU8o-IodQWmr7xP3) even if the encryption phrase is lost or [](docId:3Vj_5zZ99c4mTMRhQjGFM) (_Please note, [**FileZilla Free**](docId:OkJongWeLGhPy4KKz34W4) or [**FileZilla PRO with a Storj Native integration**](docId:APk9353kCNcg5PKRPQ06u#storj-file-zilla-pro-via-native-uplink) wouldn't work if the encryption phrase is lost, you need to use [**FileZilla PRO with Storj S3 integration**](docId:APk9353kCNcg5PKRPQ06u#storj-file-zilla-pro-via-gateway-mt) in that case_)
{% /callout %}

{% /tab %}

{% /tabs %}
