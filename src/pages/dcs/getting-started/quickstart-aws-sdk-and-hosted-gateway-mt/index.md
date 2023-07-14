---
title: AWS SDK and Hosted Gateway MT
slug: getting-started/quickstart-aws-sdk-and-hosted-gateway-mt
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-17T16:18:39.000Z
docId: LueFgrbZ9rJbWtDMXhIWZ
---

Hosted S3 Compatible Multitenant Gateway - AWS SDK

Storj now offers a hosted multitenant gateway (Gateway MT)  that is backward compatible with S3. This means you’ll be able to integrate with the Storj network via HTTP, and you won’t have to run anything extra on your end.

:::hint{type="info"}
By using hosted Gateway MT you are opting into [](docId\:hf2uumViqYvS1oq8TYbeW) &#x20;
:::

Using Gateway MT with AWS CLI is a 2-step process:

1.  [](docId\:LueFgrbZ9rJbWtDMXhIWZ) &#x20;

2.  [](docId\:LueFgrbZ9rJbWtDMXhIWZ)

## Generate Credentials to the Gateway MT

**Navigate to the Access** page within your project and then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/EJNN2TH25_5SZ-3h8FVCe_create-s3-credentials.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/gXEtwtTBKCcE1vvP3cDd2_create-s3-credentials-access.png)

**Assign the permissions** you want this access grant to have, then click on **Encrypt My Access**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/GnoGYsx7gpzCa_W6Q-PMC_create-s3-credentials-passphrase.png)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/7-zh2FMM3ASPI4oV2THEn_create-s3-credentials-encrypt.png)

:::hint{type="warning"}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!

Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won't be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.

Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
:::

Click either on the **Copy to clipboard** link or **Download .txt** and confirm that you copied your Encryption Phrase to a safe place.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/tuGxBtg2FAWRKWiHHcED4_create-s3-credentials-save.png)

Click the **Create my Access** link to finish generating of S3 credentials.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/8R44NOCYriIgX4GfaNB9D_create-s3-credentials-demo-created.png)

Copy your **Access Key**, **Secret Key**, and **Endpoint** to a safe location or download them.

Now you are ready to configure AWS SDK

## Gateway MT with Amazon S3 SDK (Node.js)

## 1. Install or include the Amazon S3 SDK

e.g. with npm

```none
npm install --save aws-sdk
```

### 2. Import the S3 client

```none
import S3 from "aws-sdk/clients/s3";
```

### 3. Create client object with MT credentials

```none
const accessKeyId = "access key here";
const secretAccessKey = "secret access key here";
const endpoint = "https://gateway.storjshare.io";

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

```none
(async () => {

  const { Buckets } = await s3.listBuckets({}).promise();
  
  console.log(Buckets);

})();
```

### 5. Upload an object

```none
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

```none
const params = {
  Bucket: "my-bucket",
  Key: "my-object"
}

const url = s3.getSignedUrl("getObject", params);

// e.g. create an <img> where src points to url
```

