---
title: Object Versioning
docId: oogh5vaiGei6atohm5thi
metadata:
  description: Detailed guide on enabling object versioning for buckets
  title: 'Object Versioning in Storj'
redirects:
  - /dcs/buckets/object-versioning
---

Object versioning enables you to preserve, retrieve, and restore every version of every object stored in a bucket. This feature adds an extra layer of data protection and recovery options, allowing you to safeguard against accidental deletions and overwrites.

## Key Features of Object Versioning

- **S3 Compatibility:** Storj's object versioning is designed to be compatible with the S3 API. This means you can use existing S3 SDKs and tools to manage versioned objects, making it easy to integrate into your current workflows.

- **Version Preservation:** Every time an object is overwritten or deleted, a new version is created. This means that previous versions of the object are preserved, not replaced, ensuring that you can access historical data at any time.

- **Recovery and Rollback:** In case of accidental deletion or if an object is overwritten with an undesired version, you can easily recover the previous version of the object.

- **Object Lock:** For more details on Object Lock support see [](docId:gjrGzPNnhpYrAGTTAUaj).

{% callout type="info" %}
Note that enabling object versioning can increase storage costs since each version of an object is stored separately.
{% /callout %}

## Supported S3 API Methods for Object Versioning

Storj's S3-Compatible Object Versioning supports a range of S3 API methods, allowing you to manage and interact with versioned objects. Below are the key S3 API methods supported by Storj's object versioning, along with a brief description of their use:

### Bucket Operations

- **PUT Bucket versioning**: Enables or suspends versioning for a bucket.
- **GET Bucket versioning**: Retrieves the versioning state of a bucket.

### Object Operations

- **PUT Object**: Adds an object to a bucket. If versioning is enabled, a unique version ID is assigned to the object.
- **GET Object**: Retrieves the current version of an object or a specific version if the version ID is specified.
- **DELETE Object**: Permanently deletes a version of an object if the version ID is provided, or marks the current version as deleted by adding a delete marker.
- **LIST Versions**: Lists all the versions of all objects in a bucket, including delete markers.

## Bucket Versioning Status

The following are the possible versioning statuses a bucket can be in:

| Status       | Description                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Not Supported| The bucket was created prior to the release of object versioning, and versioning cannot be enabled. Create a new bucket to enable versioning. |
| Unversioned  | Versioning has not been set on the bucket.                                                      |
| Enabled      | Versioning is enabled for the bucket.                                                           |
| Suspended    | Versioning was previously enabled, but is currently suspended. You may re-enable versioning at any time. |
