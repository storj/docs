---
title: Objects
docId: uyuWpwchZx29f28UGAILP
weight: 6
redirects:
  - /dcs/getting-started/satellite-developer-account/objects
metadata:
  title: Uploading and Downloading Files Guide
  description:
    Learn how to upload and download files to and from your bucket using
    various methods.
---

## Upload file

Copy a file to your bucket.

{% tabs %}

{% tab label="rclone" %}

```shell {% title="rclone" %}
# link[8:11] https://rclone.org/commands/rclone_copy/
# terminal
rclone copy ~/Downloads/storj-tree.png storj:my-bucket/
```

{% /tab %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io cp ~/Downloads/storj-tree.png s3://my-bucket/

upload: Downloads/storj-tree.png to s3://my-bucket/storj-tree.png
```

{% /tab %}

{% tab label="uplink" %}

```shell {% title="uplink" %}
# terminal
uplink cp ~/Downloads/storj-tree.png sj://my-bucket
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to **Browse** on the left side menu

2. Open your bucket from the list

3. Click **Upload**

{% /tab %}

{% /tabs %}

## Download file

Copy a file from your bucket.

{% tabs %}

{% tab label="rclone" %}

```shell {% title="rclone" %}
# terminal
# link[8:11] https://rclone.org/commands/rclone_copy/
rclone copy storj:my-bucket/ ~/Downloads/storj-tree-2.png
```

{% /tab %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io cp s3://my-bucket/ ~/Downloads/storj-tree-2.png
```

{% /tab %}

{% tab label="uplink" %}

```shell {% title="uplink" %}
# terminal
uplink cp sj://my-bucket ~/Downloads/storj-tree.png
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to **Browse** on the left side menu

2. Open your bucket from the list

3. Click on the Download button on your file.

{% /tab %}

{% /tabs %}

## Locking an Object

### Locking a New Object Upon Upload

{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-object \
  --bucket my-object-lock-bucket \
  --key my-file.txt \
  --body my-file.txt \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date 2025-01-01T00:00:00Z \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% tab label="Storj Console" %}

You cannot lock an object on upload via the Storj Console. You must first upload then lock the object version OR have default retention settings on the bucket.

{% /tab %}

{% /tabs %}

### Locking an Existing Object

{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-object-retention \
  --bucket my-object-lock-bucket \
  --key my-file.txt \
  --version-id <version-id> \
  --retention "Mode=COMPLIANCE,RetainUntilDate=2025-06-01T00:00:00Z" \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to **Browse** on the left side menu

2. Open your bucket from the list

3. Toggle "Show Versions"

4. Locate the object you want to modify and open the quick action menu.

5. Select "Legal Hold" to add a legal hold

6. Select "Lock" to add a retention period in Compliance or Governance Mode

7. Select a Lock Type and Retention Priod

8. Click "Set Lock" to save

{% /tab %}

{% /tabs %}

### Extending Retention Period

Retention periods can only be extended, not reduced. The Storj Console currently doesn't allow removal of retention periods in Governance Mode - see below for S3 usage to perform this action.

{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-object-retention \
  --bucket my-object-lock-bucket \
  --key my-file.txt \
  --version-id <version-id> \
  --retention "Mode=COMPLIANCE,RetainUntilDate=2025-07-01T00:00:00Z" \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to **Browse** on the left side menu

2. Open your bucket from the list

3. Toggle "Show Versions"

4. Locate the object you want to modify and open the quick action menu.

5. Select "Lock" to extend a retention period in Compliance or Governance Mode

6. Select a Lock Type and Retention Priod

7. Click "Set Lock" to save

{% /tab %}

{% /tabs %}

### Bypassing Governance Mode
A user with the `BypassGovernanceRetention` permission may remove the retention period for an object locked with Governance Mode using the AWS CLI or other AWS SDK.

The Storj Console currently doesn't support this feature.

{% partial file="override-governance-mode-callout.md" /%}

{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-object-retention \
  --bucket my-object-lock-bucket \
  --key my-file.txt \
  --version-id <version-id> \
  --retention "{}" \
  --bypass-governance-retention \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% /tabs %}
