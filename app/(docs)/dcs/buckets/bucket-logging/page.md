---
title: Bucket Logging (Available Upon Request)
docId: 0191fc71-e031-761c-a16b-aa8ca9e44413
metadata:
  description: Detailed guide on enabling bucket logging
  title: 'Bucket Logging (Available Upon Request)'
---

The `GetBucketLogging` and `PutBucketLogging` actions are not available, however, you can get the same functionality by following the steps below.

{% callout type="info" %}
**Request Bucket Logging:** This feature is currently provided upon request - please submit your request here, and include "Enable Bucket Logging" as the subject: 

[Submit a support request](https://supportdcs.storj.io/hc/en-us/requests/new?ticket_form_id=360000379291)

_Note: It may take up to two weeks to process your request._
{% /callout %}

## Enabling Bucket Logging

To enable bucket logging, you will be asked to provide us with the following information via a secure channel:

### Information Needed to Enable Logging

| **Item**           | **Details**                                        |
|--------------------|----------------------------------------------------|
| **Satellite**      | The Satellite your project is on: AP1, EU1, or US1 |
| **Project Name**   | Your project's name                                |
| **Bucket Name(s)** | The bucket(s) to log                               |

### Information About the Destination for Logs

| **Item**                     | **Details**                                                |
|------------------------------|------------------------------------------------------------|
| **Destination Project Name** | The project where logs will be stored                      |
| **Destination Bucket Name**  | The bucket to store logs                                   |
| **Prefix (optional)**        | Prefix for log object keys                                 |
| **Write-only Access Grant**  | Access grant with write-only permissions (see steps below) |

### Steps to Create a Write-Only Access Grant for Logging Destination

{% callout type="info" %}
**Important:** Access grants used to access the watched bucket need to be created after June 25th 2024.
{% /callout %}

1. **Generate a New Access Grant:**

   - Log in to the Satellite UI.
   - Click **New Access Key** and select **"Access Grant"**.
   - Name the access grant appropriately.

2. **Select Advanced Options:**

   - On the second screen, click on **"Advanced Options"**.
   - This allows you to customize permissions for the access grant.

3. **Set Encryption Passphrase:**

   - Enter an encryption passphrase of your choice.

   {% callout type="info" %}
   **Important:** Keep this passphrase secure. Losing it will prevent you from decrypting the log data.
   {% /callout %}

4. **Configure Permissions:**

   - On the permissions screen, select **"Write Only"**.
   - Ensure no other permissions are granted.
   - This restricts the access grant to only write logging files without the ability to read, delete, or overwrite them.

5. **Limit Access to Destination Bucket:**

   - Specify the destination bucket for the logs.
   - This limits the access grant to the specified bucket only.

6. **Set Expiration (Optional):**

   - You can add an expiration date to the access.

   {% callout type="info" %}
   **Recommendation:** Select **"No Expiration"** to ensure continuous logging. If the access expires, logging will stop.
   {% /callout %}

7. **Review and Create Access Grant:**

   - Confirm all selections are correct.
   - Click on **"Create Access"** to generate the access grant.

8. **Provide Access Grant to Storj:**

   - Send us the generated access grant over a secure channel.

### Log Format

The log objects are stored in the following key format with non-date-based partitioning:
```
[DestinationPrefix][YYYY]-[MM]-[DD]-[hh]-[mm]-[ss]-[UniqueString]
```

**Example:**
```
v-0730-ttl30/2024-08-29-03-48-32-33A6009CA7B144AF
```


### Log Fields

The fields in the logs conform to the [Amazon S3 Server Access Log Format](https://docs.aws.amazon.com/AmazonS3/latest/userguide/LogFormat.html#log-record-fields).

### Example Logs

```
1831182b-718f-471f-852d-6e1a4701eadd v-0730-ttl30 [29/Aug/2024:03:07:14 +0000] 136.0.77.2 1831182b-718f-471f-852d-6e1a4701eadd 17F0142B99B6139E PostPolicyBucket - "POST /v-0730-ttl30/ HTTP/1.1" 204 - - - - - "-" "Go-http-client/1.1" - 46ccb4215d73986341ced57f4a224a18133bf183644e3873e3384d8f95295bb3 SigV4 TLS_AES_128_GCM_SHA256 - - TLS 1.3 - -
1831182b-718f-471f-852d-6e1a4701eadd v-0730-ttl30 [29/Aug/2024:03:07:14 +0000] 136.0.77.2 1831182b-718f-471f-852d-6e1a4701eadd 17F0142B9E85FFFE GetBucketLocation - "GET /v-0730-ttl30/?location= HTTP/1.1" 200 - 134 - - - "-" "MinIO (linux; amd64) minio-go/v7.0.70" - 46ccb4215d73986341ced57f4a224a18133bf183644e3873e3384d8f95295bb3 SigV4 TLS_AES_128_GCM_SHA256 - - TLS 1.3 - -
1831182b-718f-471f-852d-6e1a4701eadd v-0730-ttl30 [29/Aug/2024:03:07:14 +0000] 136.0.77.2 1831182b-718f-471f-852d-6e1a4701eadd 17F0142B9E845AFB GetBucketLocation - "GET /v-0730-ttl30/?location= HTTP/1.1" 200 - 134 - - - "-" "MinIO (linux; amd64) minio-go/v7.0.70" - 46ccb4215d73986341ced57f4a224a18133bf183644e3873e3384d8f95295bb3 SigV4 TLS_AES_128_GCM_SHA256 - - TLS 1.3 - -
1831182b-718f-471f-852d-6e1a4701eadd v-0730-ttl30 [29/Aug/2024:03:07:14 +0000] 136.0.77.2 1831182b-718f-471f-852d-6e1a4701eadd 17F0142B9992374E PostPolicyBucket - "POST /v-0730-ttl30/ HTTP/1.1" 204 - - - - - "-" "Go-http-client/1.1" - 46ccb4215d73986341ced57f4a224a18133bf183644e3873e3384d8f95295bb3 SigV4 TLS_AES_128_GCM_SHA256 - - TLS 1.3 - -
```
