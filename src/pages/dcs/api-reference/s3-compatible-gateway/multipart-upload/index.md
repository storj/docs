---
title: Multipart Upload
slug: api-reference/s3-compatible-gateway/multipart-upload
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:11.000Z
docId: _49AHstKRWMEMsbx_SQ8P
---

Understanding how to use Multipart Upload with the Storj DCS globally  distributed, multi-region cloud-hosted S3-compatible gateway

Multipart Upload is a function that allows large files to be broken up into smaller pieces for more efficient uploads. When an object is uploaded using Multipart Upload, a file is first broken into parts, each part of a Multipart Upload is also stored as one or more Segments. With Multipart Upload, a single object is uploaded as a set of parts.&#x20;

Each part is an integral portion of the data comprising the object. The object parts may be uploaded independently, in parallel, and in any order. Uploads may be paused and resumed by uploading an initial set of parts, then resuming and uploading the remaining parts. If the upload of any part fails, that part may be re-uploaded without impacting the upload of other parts.

&#x20;All of these parts are broken into one or more Segments by the Storj DCS Gateway based on whether the Part Size is smaller or larger than the default Segment size. While Multipart Upload is most appropriate for files larger than the 64MB default Segment size, the Part Size is configurable in applications that use Multipart Upload.&#x20;

## Using Multipart Upload&#x20;

Multipart upload takes a single object and divides it into encapsulated pieces to be uploaded, with all the pieces representing the complete object.  Once all the pieces are completely uploaded the platform will assemble the pieces into a single logical object.  The purpose of providing multipart capability is to more easily resume and manage transfers of larger files so developers will want to take advantage of this capability within their applications.

## Specific benefits for usage of multipart upload:

*   **Speed** - Concurrently uploaded multiple pieces of a single object

*   **Streaming** - When the size of the object is unknown you can upload parts of the object until specifically completing the operation.

*   **Resuming Operations** - If connectivity is disrupted you can resume uploading pieces anytime after the multipart process is initiated. &#x20;

## Workflow for Multipart upload

As described below, mutlipart upload is a process consisting of: starting the upload, transferring each piece, and finally completing the multipart upload.  Upon successful upload of the final piece, Storj DCS will logically reassemble the object, apply metadata and make the object accessible.  During the multipart upload operation, you can get status of active upload operations and get lists of parts you have uploaded.  More detail on multipart operations is provided in the sections below.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/9qF0Kk8WCViIQLFoL5pZD_storj.png)

## Initiate Multipart upload

At the start of a multipart upload, Storj DCS will return an ID that you use to reference your multipart upload; you need to include this ID when working with the object.  Operations such as uploading parts, listing parts and canceling the multipart operation.

### Upload Part

While uploading an object part you need to specify the ID received when you created the multipart upload along with a unique part number that your specific call will be sending to the platform.  Because of the capability of multipart upload to work non sequentially, you can upload any part at any time before the multipart upload is completed. Additionally, you can over right existing parts numbers you've previously transferred as long as the multipart upload has not been completed.  Part numbers are chosen by the client and are between 1 and 2^31.  When a part is uploaded, the Storj DCS platform will return several items, one of which is an ETag.  To complete the multipart upload process you will need to provide a list of part IDs and their corresponding ETags.

Be advised that billing occurs when data is stored on the Storj DCS platform - as such - when you initiate a multipart upload and begin uploading parts, charges will be applied based on the amount of space the parts occupy.  Billing will occur regardless of a multipart upload being completed. &#x20;

### Completing a multipart upload

When you upload the final part of a multipart upload you need to call the complete operation to tell Storj DCS to reconstitute the object from the individual parts you have uploaded. When the complete operation concludes all metadata and individual parts will be consolidated into a single object.

To call the complete operation you need to provide the list of ETags and their corresponding part IDs.  You should maintain this list in your application.

If you decide to cancel the multipart operation, you must provide the object key and multipart ID you received when you initiated the multipart upload.  Space that was used during the multipart process will be freed when all the active multipart transactions have been completed and the abort operation has been called.

### Listing for multipart uploads

During a multipart upload you can list active upload transactions or the parts that have been successfully uploaded. For a single list parts request, storage DCS will return information up to a maximum of 1000 parts.  For objects with more than 1000 parts, multiple requests are required. Because of the distributed nature of Storj DCS, you should not use the response from listing multipart uploads as input to complete in multipart upload operation.  Be advised that part listing requests will only return completed part uploads - any active part uploads will not be returned.

## Multipart upload for distributed systems

Depending on the behavior of your application it may be possible for multiple concurrent operations to be performed on the same object key.  It may occur that an application that sends multiple requests for the same object during a multipart operation would cause that object to ultimately not be accessible.  One example would be permission changes or object removal while a multipart upload is in process for a specific object. The multipart operation may successfully complete , however, the operations received on that multipart object would change the availability of that object when the multipart upload is completed.

## Cost for Multipart upload

When a multipart upload is initiated, storage DCS processes and makes available all constituent parts of the multipart object.  Multipart object is either made available by completing the multipart upload process or cancelled by explicitly stopping the multipart upload process through API call.  Storj DCS will measure resource usage on multipart upload operations unless they are explicitly cancelled.  only when a multipart upload is explicitly cancelled are the associated resources freed.

## Multipart upload limits

| **Item**                                                                         | **Limit**           |
| :------------------------------------------------------------------------------- | :------------------ |
| Maximum object size                                                              | No practical limit. |
| Maximum number of parts per upload                                               | 2^31                |
| Part numbers                                                                     | 0 to 2^31           |
| Part size                                                                        | No practical limit. |
| Maximum number of parts returned for a list parts request                        | 1000                |
| Maximum number of multipart uploads returned in a list multipart uploads request | 1000                |

