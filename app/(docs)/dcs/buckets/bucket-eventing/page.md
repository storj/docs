---
title: Bucket Event Notifications
docId: Bf0SpKVT6dGmV7vj
weight: 2
metadata:
  title: Bucket Event Notifications with Google Pub/Sub
  description:
    Guide to configuring S3-compatible bucket event notifications for real-time object change notifications via Google Pub/Sub.
---

Bucket event notifications allow you to receive real-time notifications when objects are created or deleted in your Storj buckets. This feature is S3-compatible and delivers notifications to Google Cloud Pub/Sub topics.

{% callout type="info" %}
**Request Access:** Bucket eventing is currently available upon request. Please contact support to enable this feature for your project:

[Submit a support request](https://supportdcs.storj.io/hc/en-us/requests/new?ticket_form_id=360000379291)

Include "Enable Bucket Eventing" as the subject and provide your project name.
{% /callout %}

## Overview

Bucket event notifications enable automated workflows when objects change in your buckets. Common use cases include:

- **Media & Entertainment**: Triggering transcoding pipelines when new video files are uploaded
- **Quality Control**: Starting automated QC workflows when assets land in a bucket
- **Data Processing**: Initiating ETL jobs when data files are created
- **Backup Verification**: Confirming successful uploads or tracking deletions

### Supported Event Types

| Event Type | Description |
|---|---|
| s3:ObjectCreated:Put | Object created via PUT, POST, or multipart upload |
| s3:ObjectCreated:Copy | Object created via copy operation |
| s3:ObjectCreated:* | All object creation events (wildcard) |
| s3:ObjectRemoved:Delete | Object permanently deleted |
| s3:ObjectRemoved:DeleteMarkerCreated | Delete marker created (versioned buckets) |
| s3:ObjectRemoved:* | All object deletion events (wildcard) |

### Delivery Guarantees

- **At-least-once delivery**: Events may occasionally be delivered more than once
- **No ordering guarantee**: Events may arrive out of order
- **Low latency**: Events are typically delivered within seconds of the object operation

## Requirements

Before configuring bucket event notifications:

1. **Project enabled for eventing**: Contact Storj support to enable bucket eventing for your project
2. **Storj-managed encryption**: Your project must use [Storj-managed encryption](docId:aitie6rohXai9uuv#storj-managed-encryption). This ensures object keys in notifications are readable. Projects with self-managed encryption are not supported.
3. **Google Cloud Pub/Sub topic**: You must create and own a Pub/Sub topic in your Google Cloud account

## Setting Up Google Cloud Pub/Sub

### Step 1: Create a Pub/Sub Topic

1. Go to the [Google Cloud Console](https://console.cloud.google.com/cloudpubsub/topic/list)
2. Click **Create Topic**
3. Enter a topic ID (e.g., `my-bucket-events`)
4. Click **Create**

Note the fully-qualified topic name: `projects/my-gcp-project-id/topics/my-topic-id`

### Step 2: Grant Permission to Storj

Storj needs permission to publish messages to your Pub/Sub topic. Grant the **Pub/Sub Publisher** role to the Storj bucket eventing service account for your satellite.

| Satellite | Bucket Eventing Service Account Email |
|---|---|
| US1 | bucket-eventing@storj-prod.iam.gserviceaccount.com |
| EU1 | bucket-eventing@storj-prod-europe-west1.iam.gserviceaccount.com |
| AP1 | bucket-eventing@storj-prod-asia-east1.iam.gserviceaccount.com |

To grant access:

1. In the Google Cloud Console, navigate to your Pub/Sub topic
2. Click the **Permissions** tab
3. Click **Add principal**
4. In the "New principals" field, enter the Storj service account email for your satellite
5. Select the role **Pub/Sub Publisher**
6. Click **Save**

### Step 3: Create a Subscription (Optional)

To receive the notifications, create a subscription for your topic:

1. In the Google Cloud Console, navigate to your Pub/Sub topic
2. Click **Create Subscription**
3. Choose subscription type:
   - **Pull**: Your application pulls messages from Pub/Sub
   - **Push**: Pub/Sub delivers messages to an HTTPS endpoint

For webhook delivery, use a Push subscription with your webhook URL.

## Configuring Bucket Notifications

{% tabs %}

{% tab label="Storj Console" %}

1. Navigate to the **Buckets** page in the Storj Console.

2. Locate the bucket you want to configure and click the **three-dot menu** (⋯) on the right side of the row.

3. Select **Configure Eventing** from the dropdown menu.

![Bucket list with Eventing column showing Off and context menu with Configure Eventing option](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/eventing/1_bucket_eventing_status_disabled.png)

4. In the **Configure Bucket Eventing** dialog:

   - **GCP Pub/Sub Topic**: Enter the fully-qualified topic name in the format `projects/GCP_PROJECT_ID/topics/TOPIC_ID`

   - **Event Types**: Select which events should trigger notifications:
     - **Object Created** - includes Object Created (Put) and Object Created (Copy)
     - **Object Removed** - includes Object Removed (Delete) and Object Removed (Delete Marker)
     - You can also select individual event types in each category

   - **Filter Rules (Optional)**: Match objects by prefix and/or suffix. For example, set Object Key Prefix to `images/` and Object Key Suffix to `.jpg` to only receive events for JPEG files in the images folder. See [Filter Behavior](#filter-behavior) for details.

![Configure Bucket Eventing dialog with GCP Pub/Sub Topic field, Event Types checkboxes, and Filter Rules](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/eventing/2_bucket_eventing_configuration_dialog.png)

5. Click **Save** to apply the configuration.

Once configured, the **Eventing** column in the bucket list will show **On** for buckets with eventing enabled.

![Bucket list showing Eventing status as On with Disable Eventing option in context menu](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/eventing/3_bucket_eventing_status_enabled.png)

To disable eventing, click the three-dot menu and select **Disable Eventing**.

{% /tab %}

{% tab label="AWS CLI" %}

#### Enable Notifications

Create a notification configuration file (`notification.json`):

```json
{
  "TopicConfigurations": [
    {
      "Id": "MyNotificationConfig",
      "TopicArn": "arn:gcp:pubsub::my-gcp-project-id:my-topic-id",
      "Events": [
        "s3:ObjectCreated:*",
        "s3:ObjectRemoved:Delete"
      ],
      "Filter": {
        "Key": {
          "FilterRules": [
            {
              "Name": "prefix",
              "Value": "uploads/"
            },
            {
              "Name": "suffix",
              "Value": ".mp4"
            }
          ]
        }
      }
    }
  ]
}
```

Apply the configuration:

```shell {% title="aws cli" %}
aws s3api put-bucket-notification-configuration \
  --bucket my-bucket \
  --notification-configuration file://notification.json \
  --endpoint-url https://gateway.storjshare.io
```

{% callout type="info" %}
**Topic ARN Format:** Storj uses a Google Cloud-specific ARN format for Pub/Sub topics:
`arn:gcp:pubsub::GCP_PROJECT_ID:TOPIC_ID`

This differs from AWS SNS ARN format but follows the same structure.
{% /callout %}

#### View Current Configuration

```shell {% title="aws cli" %}
aws s3api get-bucket-notification-configuration \
  --bucket my-bucket \
  --endpoint-url https://gateway.storjshare.io
```

#### Disable Notifications

To disable notifications, apply an empty configuration:

```shell {% title="aws cli" %}
aws s3api put-bucket-notification-configuration \
  --bucket my-bucket \
  --notification-configuration '{}' \
  --endpoint-url https://gateway.storjshare.io
```

#### Configuration Options

##### Event Types

Specify which events trigger notifications:

```json
{
  "Events": [
    "s3:ObjectCreated:Put",
    "s3:ObjectCreated:Copy",
    "s3:ObjectRemoved:Delete",
    "s3:ObjectRemoved:DeleteMarkerCreated"
  ]
}
```

Or use wildcards:

```json
{
  "Events": ["s3:ObjectCreated:*"]
}
```

##### Filtering Rules

Filter notifications by object key prefix and/or suffix:

```json
{
  "Filter": {
    "Key": {
      "FilterRules": [
        {"Name": "prefix", "Value": "videos/"},
        {"Name": "suffix", "Value": ".mp4"}
      ]
    }
  }
}
```

See [Filter Behavior](#filter-behavior) for details on how filters work.

{% /tab %}

{% /tabs %}

### Filter Behavior

Filters allow you to receive notifications only for objects matching specific patterns:

- Filters are case-sensitive
- Prefix `logs/` matches `logs/2025.txt` but NOT `archive/logs/file.txt`
- Suffix `.jpg` matches `photo.jpg` but NOT `photo.JPG` or `image.jpg.bak`
- When both prefix and suffix are specified, both must match (AND logic)
- Maximum filter length: 1024 characters

## Event Message Format

Event notifications follow the S3 event message structure (version 2.1):

```json
{
  "Records": [
    {
      "eventVersion": "2.1",
      "eventSource": "storj:s3",
      "eventTime": "2025-01-17T10:30:00.000Z",
      "eventName": "ObjectCreated:Put",
      "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "MyNotificationConfig",
        "bucket": {
          "name": "my-bucket",
          "ownerIdentity": {
            "principalId": "my-storj-project-id"
          },
          "arn": "arn:storj:s3:::my-bucket"
        },
        "object": {
          "key": "uploads/video.mp4",
          "size": 1048576,
          "versionId": "000000000000000190f2277f35af0b76",
          "sequencer": "1892E0DE46FBAE18"
        }
      }
    }
  ]
}
```

### Message Fields

| Field | Description |
|---|---|
| eventVersion | Always `2.1` |
| eventSource | Always `storj:s3` |
| eventTime | ISO-8601 timestamp when the event occurred |
| eventName | Type of event (e.g., `ObjectCreated:Put`) |
| configurationId | The ID from your notification configuration |
| bucket.name | Name of the bucket |
| bucket.ownerIdentity.principalId | Your Storj project ID |
| object.key | Object key (path) |
| object.size | Object size in bytes |
| object.versionId | Object version ID |
| object.sequencer | Hex-encoded timestamp for ordering events |

### Test Event

When you first configure notifications, Storj sends a test event to verify the destination is reachable:

```json
{
  "Service": "Storj S3",
  "Event": "s3:TestEvent",
  "Time": "2026-01-17T10:30:00.000Z",
  "Bucket": "my-bucket"
}
```

If the test event fails to publish, the configuration is rejected with an error message.

## Setting Up a Webhook

To receive notifications at an HTTPS endpoint, configure a Pub/Sub Push subscription:

### Step 1: Create a Push Subscription

1. In Google Cloud Console, go to Pub/Sub > Subscriptions
2. Click **Create Subscription**
3. Select your topic
4. Choose **Push** delivery type
5. Enter your webhook URL (must be HTTPS)
6. Configure authentication if needed
7. Click **Create**

### Step 2: Verify Your Endpoint

Ensure your webhook endpoint:
- Accepts POST requests
- Returns a 2xx status code on success
- Handles JSON payloads
- Responds within 10 seconds (Pub/Sub timeout)

### Example Webhook Handler (Node.js)

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const message = req.body.message;

  if (message && message.data) {
    // Decode base64 data
    const data = Buffer.from(message.data, 'base64').toString();
    const event = JSON.parse(data);

    // Log full event with nested objects expanded
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Process the event
    for (const record of event.Records || []) {
      console.log(`Event: ${record.eventName}`);
      console.log(`Bucket: ${record.s3.bucket.name}`);
      console.log(`Object: ${record.s3.object.key}`);
    }
  }

  // Acknowledge receipt
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});
```

## Limitations

| Limitation | Description |
|---|---|
| **One configuration per bucket** | Each bucket supports a single notification configuration |
| **Google Pub/Sub only** | Only Google Pub/Sub is supported as a destination (no AWS SNS, SQS, Lambda) |
| **Storj-managed encryption required** | Projects using self-managed encryption are not supported |
| **No ETag in events** | The object ETag is not included in event messages |
| **No user identity** | Events do not include information about who performed the action |

## Troubleshooting

### Configuration Fails with Permission Error

Ensure the Storj service account has the **Pub/Sub Publisher** role on your topic. Double-check:
- The service account email is correct for your satellite
- The role is granted at the topic level (not the subscription level)

### IAM Policy Update Failed (Domain Restricted Sharing)

If you see an error like:

> **IAM policy update failed**
> The 'Domain Restricted Sharing' organization policy (constraints/iam.allowedPolicyMemberDomains) is enforced. Only principals in allowed domains can be added as principals in the policy.

This occurs when your Google Cloud organization has the **Domain Restricted Sharing** policy enabled, which prevents adding external service accounts (like Storj's) to your IAM policies.

**Solution:** You need to add Storj's organization to the allowed domains in your organization policy:

1. In the Google Cloud Console, ensure you have the **Organization** selected (not a project)
2. Navigate to **IAM & Admin** > **Organization Policies**
3. Find and click on **Domain restricted sharing** (`iam.allowedPolicyMemberDomains`)
4. Click **Manage policy**
5. Under **Rules**, expand the existing **Allow** rule
6. Click **Add value** to add a new custom value
7. Add `principalSet://iam.googleapis.com/organizations/693710676402` (Storj's organization ID)
8. Click **Done**, then **Set policy**

{% callout type="warning" %}
You must have the **Organization Policy Administrator** role to modify organization policies. If the "Manage policy" button is grayed out, contact your organization administrator.
{% /callout %}

After updating the organization policy, return to your Pub/Sub topic and grant the Pub/Sub Publisher role to the Storj service account.

### Not Receiving Events

1. **Check your bucket eventing configuration**: Use `GetBucketNotificationConfiguration` to verify the configuration is set correctly
2. **Check event types**: Ensure the event type you expect is in your configuration
3. **Check filters**: Verify your prefix/suffix filters match the objects you're uploading
4. **Check your subscription**: Ensure you have an active subscription to the Pub/Sub topic
5. **Check Pub/Sub logs**: Review Cloud Logging for any delivery errors

### Delayed Events

Events are typically delivered within seconds, but may be delayed during:
- High system load
- Network issues between Storj and Google Cloud

### Duplicate Events

Due to at-least-once delivery, you may occasionally receive duplicate events. Design your application to handle duplicates idempotently using the `sequencer` field.

## S3 Compatibility

### API Methods

| Method | Support |
|---|---|
| PutBucketNotificationConfiguration | Yes |
| GetBucketNotificationConfiguration | Yes |
| PutBucketNotification (deprecated) | Yes |
| GetBucketNotification (deprecated) | Yes (AWS CLI has a [known bug](https://github.com/aws/aws-cli/issues/2808) with JSON output) |

### Destination Types

| Destination | Support |
|---|---|
| Google Cloud Pub/Sub | Yes |
| AWS SNS | No |
| AWS SQS | No |
| AWS Lambda | No |
| AWS EventBridge | No |

### Event Types

| Event | Support |
|---|---|
| s3:ObjectCreated:Put | Yes (also emitted for Post and CompleteMultipartUpload) |
| s3:ObjectCreated:Post | No (emits Put event instead) |
| s3:ObjectCreated:Copy | Yes |
| s3:ObjectCreated:CompleteMultipartUpload | No (emits Put event instead) |
| s3:ObjectCreated:* | Yes |
| s3:ObjectRemoved:Delete | Yes |
| s3:ObjectRemoved:DeleteMarkerCreated | Yes |
| s3:ObjectRemoved:* | Yes |
| s3:ObjectRestore:* | No |
| s3:ReducedRedundancyLostObject | No |
| s3:Replication:* | No |
| s3:LifecycleExpiration:* | No |
| s3:LifecycleTransition | No |
| s3:IntelligentTiering | No |
| s3:ObjectTagging:* | No |
| s3:ObjectAcl:Put | No |

### Filters

| Filter | Support |
|---|---|
| Key prefix filter | Yes |
| Key suffix filter | Yes |

### Other Features

| Feature | Support |
|---|---|
| Number of configurations per bucket | Only one |
| Test events on configuration | Yes |

## Cost Considerations

Bucket eventing incurs costs on Google Cloud for Pub/Sub usage, including throughput and message storage. See the [Google Cloud Pub/Sub pricing page](https://cloud.google.com/pubsub/pricing) for current rates.

Storj does not currently charge for the bucket eventing feature itself.

{% callout type="info" %}
**Tip:** Google Cloud offers a [free tier](https://cloud.google.com/free) for Pub/Sub. For most use cases, this covers event notification costs.
{% /callout %}
