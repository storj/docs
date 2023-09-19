---
title: Edge Security Models
docId: ohm3EChieYaCh6ka
metadata:
  title: 'Storj Data Access Methods'
  description: Explore Storj's diverse data access solutions from public Linksharing to encrypted S3 credentials, ensuring optimal security for your storage needs.
---

Storj provides multiple data access methods: "Linksharing" for public links, "Presigned URLs" for time-limited access, "Customer-specific S3 Credentials" for personalized encryption, and "Rotating Credentials" for broader time-restricted access. Each offers distinct security levels.

## Linksharing

Making data publicly available via [Linksharing](docId:sN2GhYgGUtqBVF65GhKEa) is very simple. There is the one-time need to register an intended bucket or path with Storj, after which this data in that bucket or path becomes publicly accessible for anyone who has the link. Because this public file sharing need only occur once, it is simple to do via the Storj Console (see [](docId:cie0gae7voob2Weigh3c)), and need not be automated. Linksharing does not include the ability to upload files, but it may be used alongside other solutions.

## Presigned URLs

[Presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) are a feature of S3 compatible cloud storage solutions. You [can use presigned URLs](docId:_pCGnHv0_XwR0-mX0rIkJ) to grant time-limited access to either [upload](https://gist.github.com/wthorp/7a6ba6b037efea3949322be1121f0d4e) or [download](https://gist.github.com/wthorp/b6239e521fe3f82ce4dd3a308192c067) an object. A presigned URL can be entered in a browser or used by a program to download an object. A presigned URL would be generated in your web service, and used browsers or clients using simple HTTP GET and POST commands. No S3 compatible SDK is necessary to use presigned URLs via browsers or code. Instead, Amazon's SDKs would be used on the web service tier to generate the presigned URLs. Presigned URLs have the advantage of allowing you to fine-tune your security needs. Because all customer requests to storage must first be authorized, you can create whatever logic and security scheme fits you best. The downside is that each file request incurs two round trips to web service, once for authorization and to create the presigned URL, and once to either upload or download the object. This make presigned URLs most popular for sharing files between users, or for performing uploads in applications dominated by primarily public viewing.

## Customer-specific S3 Credentials

An alternative to presigned URLs is to create unique [S3 credentials](docId:_xWsamBjOsZYyu9xtQCm5#create-s3-credentials) per-user. You can use Amazon's S3 SDKs. This SDK should handle all of the upload and download functionality.

If you opt for this solution, you may have one security credential for your administrative needs, and credentials for each customer. Customer credentials could use its own encryption passphrase, it you need to keep their data truly private . Each credential would also restrict permissions to a single customer bucket. Each customer credential can be enabled for [S3 compatibility](docId:eZ4caegh9queuQuaazoo). A high level of our security / encryption implementation is located [here](docId:KEt1PX_a8sbmwGXI4IhT_). It's also worth looking at our [multi-tenancy docs](https://pkg.go.dev/storj.io/uplink#hdr-Multitenancy_in_a_Single_Application_Bucket).

## Rotating Credentials

Whether you're using Linksharing or a global S3 credential, you can add time limitations similar to the use of presigned-URLs. Using rotating Linksharing credentials has some benefits over presigned URLs in that they can be generated for an entire application and apply to large number of files, rather than being be generated per request for each file.
