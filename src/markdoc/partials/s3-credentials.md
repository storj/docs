Storj has an Amazon [S3 compatible API](docId:eZ4caegh9queuQuaazoo) and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj console:

1. Navigate to **Access Keys** on the left side menu.

2. Click the **New Access Key** button.

3. When the New Access dialog comes up, set specifications according to the following guidelines:

   - **Name:** The name of the credentials (e.g. my-access)
   - **Type:** S3 Credentials
5. Choose **Full Access** or **Advanced**
   - In most cases, you DO NOT want to choose full access. 

6. Provide Access encryption Information
   {% callout type="warning"  %}
   If you have opted out of [Storj-managed passphrases](docId:aitie6rohXai9uuv) for the project you must unlock the bucket with your passphrase. In order to see the data uploaded to your bucket in the Storj console, you must unlock the bucket with the same encryption passphrase as the credentials.
   {% /callout %}

   - **Use the current passphrase**: this is default option
   - **Advanced**: you may provide a different encryption phrase either your own or generate a new one.
     - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase
     - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

7. Select the permissions you want to allow:
   - Read
   - Write
   - List
   - Delete

8. Select the object lock permissions you want to allow
   - PutObjectRetention
   - GetObjectRetention
   - BypassGovernanceRetention
   - PutObjectLegalHold
   - GetObjectLegalHold
   - PutObjectLockConfiguration
   - GetObjectLockConfiguration

9. Choose the buckets you want the access to include:
   - All Buckets
   - Select Buckets

10. Set an expiration

11. Click **Create Access** to finish creation of your S3 credentials

12. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

### Object Lock Permission Details
| Permission Name | Description |
|---|---|
| PutObjectRetention | Allows you to set retention policies, protecting objects from deletion or modification until the retention period expires. |
| GetObjectRetention | Allows you to view the retention settings of objects, helping ensure compliance with retention policies. |
| BypassGovernanceRetention | Allows you to bypass governance-mode retention, enabling deletion of objects before the retention period ends. |
| PutObjectLegalHold | Allows you to place a legal hold on objects, preventing deletion or modification regardless of retention policies. |
| GetObjectLegalHold | Allows you to view the legal hold status of objects, which is useful for auditing and compliance purposes. |
| PutObjectLockConfiguration | Allows you to set retention policies on the specified bucket, automatically applying them to every new object added to that bucket. |
| GetObjectLockConfiguration | Allows you to view the default retention policies configured for the specified bucket. |
