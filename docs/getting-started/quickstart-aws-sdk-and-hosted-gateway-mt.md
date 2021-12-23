---
description: Hosted S3 Compatible Multitenant Gateway - AWS SDK
---

# Quickstart - AWS SDK and Hosted Gateway MT

Storj now offers a hosted multitenant gateway (Gateway MT)  that is backward compatible with S3. This means you’ll be able to integrate with the Storj network via HTTP, and you won’t have to run anything extra on your end.

{% hint style="info" %}
By using hosted Gateway MT you are opting-in to **** [**server-side encryption**](../concepts/encryption-key/design-decision-server-side-encryption.md).&#x20;
{% endhint %}

Using Gateway MT with AWS SDK is a 2-step process:

1. [Generate Credentials to the Gateway MT](gateway-mt/#generate-credentials-to-the-gateway-mt)
2. [Configure AWS SDK with your credentials](quickstart-aws-sdk-and-hosted-gateway-mt.md#1.-install-or-include-the-amazon-s3-sdk)

## Generate Credentials to the Gateway MT

**Navigate to the Access** page within your project and then click on **Create Access Grant +**. A modal window will pop up where you can enter a name for this access grant.

![](<../.gitbook/assets/image (127).png>)

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 9.02.50 AM.png>)

**Assign the permissions** you want this access grant to have, then click on **Continue in Browser**:

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.15 AM.png>)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.34 AM.png>)

Click on the **Generate S3 Gateway Credentials** link **** and then click on the **Generate Credentials** button.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.50 AM.png>)

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.54 AM.png>)

**Copy your Access Key, Secret Key, and Endpoint** to a safe location for future use.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-16 at 9.04.08 AM.png>)

Now you are ready to configure AWS SDK

## Gateway MT with Amazon S3 SDK (Node.js)

### 1. Install or include the Amazon S3 SDK

e.g. with npm

```javascript
npm install --save aws-sdk
```

### 2. Import the S3 client

```javascript
import S3 from "aws-sdk/clients/s3";
```

### 3. Create client object with MT credentials

```javascript
const accessKeyId = "access key here";
const secretAccessKey = "secret access key here";
const endpoint = "https://gateway.us1.storjshare.io";

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  connectTimeout: 0,
  httpOptions: { timeout: 0 }
});
```

### 4. List objects and log to console

```javascript
(async () => {

  const { Buckets } = await s3.listBuckets({}).promise();
  
  console.log(Buckets);

})();
```

### 5. Upload an object

```javascript
(async () => {

  // `file` can be a readable stream in node or a `Blob` in the browser

  const params = {
    Bucket: "my-bucket",
    Key: "my-object",
    Body: file
  };

  await s3.upload(params, {
    partSize: 64 * 1024 * 1024
  }).promise();
  
})();
```

### 6. Get URL that points to an object

The `getSignedUrl` function creates a cryptographically signed url. No contact with the gateway is needed here; this happens instantaneously.

```javascript
const params = {
  Bucket: "my-bucket",
  Key: "my-object"
}

const url = s3.getSignedUrl("getObject", params);

// e.g. create an <img> where src points to url
```
