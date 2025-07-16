---
title: Object Lock
docId: e94a86fc-3deb-42f0-b7fe-1f80c675930a
weight: 1
metadata:
  title: Using Object Lock to Protect Data
  description:
    Comprehensive guide on enabling and managing Object Lock.
---

Object Lock allows you to protect objects from being deleted or overwritten for a specified period or indefinitely. Object Lock operates in three modes:

- **Governance Mode**: Protects objects against accidental deletion but allows authorized users to bypass the lock.
- **Compliance Mode**: Provides immutable protection; no user can delete or modify the object until the retention period expires.
- **Legal Hold**: Prevents an object from being deleted until the legal hold is explicitly removed, regardless of retention settings.

{% partial file="override-governance-mode-callout.md" /%}

## Enabling Object Lock on a Bucket

### For New Buckets

{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api create-bucket \
  --bucket my-object-lock-bucket \
  --object-lock-enabled-for-bucket \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% tab label="Storj Console" %}

{% partial file="create-bucket.md" /%}

{% /tab %}

{% /tabs %}

### For Existing Buckets

#### Step 1: Enable Versioning

{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-bucket-versioning \
  --bucket my-existing-bucket \
  --versioning-configuration Status=Enabled \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to the Browse Buckets page.
2. Locate the bucket you want to modify and open the quick action menu.
3. Select "Enable Versioning".

{% /tab %}

{% /tabs %}

#### Step 2: Enable Object Lock

{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-object-lock-configuration \
  --bucket my-existing-bucket \
  --object-lock-configuration "ObjectLockEnabled=Enabled" \
  --endpoint-url https://gateway.storjshare.io

```

{% /tab %}

{% tab label="Storj Console" %}
1. Navigate to the Browse Buckets page.
2. Locate the bucket you want to modify and open the quick action menu.
3. Select "Object Lock"
4. [Optional] Set default mode and retention period
5. Click "Set Lock" to save

{% /tab %}

{% /tabs %}

## Adding, Updating, and Deleting a Default Object Lock Configuration
Default Object Lock configurations apply retention settings to all new objects uploaded to the bucket.

### Add/Update Default Configuration
{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-object-lock-configuration \
  --bucket my-object-lock-bucket \
  --object-lock-configuration "ObjectLockEnabled=Enabled,Rule={DefaultRetention={Mode=GOVERNANCE,Days=30}}" \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to the Browse Buckets page.
2. Locate the bucket you want to modify and open the quick action menu.
3. Select "Object Lock"
4. Set a new default mode and retention period
   - If you want to remove a default configuration, deselecting the mode will remove the default
5. Click "Set Lock" to save

{% /tab %}

{% /tabs %}

### Delete Default Configuration
{% tabs %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
aws s3api put-object-lock-configuration \
  --bucket my-object-lock-bucket \
  --object-lock-configuration 'ObjectLockEnabled=Enabled' \
  --endpoint-url https://gateway.storjshare.io
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to the Browse Buckets page.
2. Locate the bucket you want to modify and open the quick action menu.
3. Select "Object Lock"
4. To remove a default configuration, deselecting the mode will remove the default
5. Click "Set Lock" to save

{% /tab %}

{% /tabs %}

## Object Operations
Please see the docs for [Locking an Object](docId:uyuWpwchZx29f28UGAILP#locking-an-object).

## Important Notes
- **Object Version Required**: Locking an existing object requires the version id to be specified.
- **Retention Rules**: The retention period can only be extended, not reduced or removed.
- **Mutual Exclusivity with TTL**: Objects with active [TTL Settings](docId:55e7ac9b-cf21-41fa-be19-087f55de1066) cannot be locked, and locked objects cannot have TTL applied.
- **S3 Compatibility**: For full S3 compatibility information please see [](docId:gjrGzPNnhpYrAGTTAUaj)
