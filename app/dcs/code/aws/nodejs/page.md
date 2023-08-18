---
title: AWS SDK Nodejs
docId: LueFgrbZ9rJbWtDMXhIWZ
---



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
