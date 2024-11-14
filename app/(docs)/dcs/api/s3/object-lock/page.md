---
title: Object Lock (Beta)
docId: gjrGzPNnhpYrAGTTAUaj
metadata:
  description: Detailed guide on the Beta of object lock
  title: 'Object Lock (Beta)'
---
{% callout type="info" %}
**Beta Service Release**

S3-Compatible Object Lock is currently available as pre-production beta and may not be suitable for all production environments.

Please refer to our [Terms of Service](https://www.storj.io/legal/terms-of-service) for more information on release definitions.
{% /callout %}

## Summary

### Overview
Storj is currently developing [](docId:oogh5vaiGei6atohm5thi). As part of that development, we have released an early Beta Service Release, which includes **S3-Compatible Object Lock**, that can be used to evaluate the functionality.

## Beta Opt-In Instructions
To gain access to S3-compatible Object Lock, you'll need to opt into the **Object Versioning Beta** following the steps below:
{% partial file="versioning-opt-in.md" /%}

## Enabling Object Lock on a Bucket
{% callout type="info" %}
Object Lock is not backwards compatible with existing buckets—a new bucket must be created to enable Object Lock.
{% /callout %}

{% partial file="create-bucket.md" /%}

### FAQ
- **When will Object Lock be fully released?**
	- Object lock will be released soon - the target is December 2024 or January 2025
- **Why would I test this Beta?**
	- If you plan to conduct a proof of concept or want to test a a pre-production instance of an integration that utilizes object lock. 
- **How do I test the Beta?**
    - See instructions above
- **How do I give feedback or request features related to Object Lock?**
	- Our roadmap is public. Here are the relevant roadmap items:
		- [S3 Object Lock: Compliance Mode](https://github.com/storj/roadmap/issues/47)
		- [S3 Object Lock: Add Governance Mode and Legal Hold](https://github.com/storj/roadmap/issues/98)
	- You may also submit a support request here: [https://support.storj.io/hc/en-us/requests/new](https://support.storj.io/hc/en-us/requests/new)

## Technical Details
### New S3 Actions Supported:
{% table %}
* Action
* API Description
* Description of Change(s)
---
* GetObjectLockConfiguration
* Gets the object lock configuration for a bucket.
* Will return the ObjectLockConfiguration with `ObjectLockEnabled` either as `Enabled` or empty. 
  
  `Rule` will not be included as a response element as specifying a bucket-level object Lock rule is initially out of scope.
---
* PutObjectLockConfiguration
* Enables Object Lock configuration on a bucket.
* **ObjectLockEnabled**: Indicates if Object Lock is enabled on the bucket.

  **Rule** (Optional): Specifies the Object Lock rule (mode and period) for the bucket. The period can be either `Days` or `Years`.
---
* PutObjectRetention
* Places an object retention configuration on an object.
* 
---
* GetObjectRetention
* Retrieves an object's retention settings. 
---
* GetObjectLegalHold
* Retrieves the Legal Hold status of an object.
* 
---
* PutObjectLegalHold
* Applies a Legal Hold to the specified object.
* 
{% /table %}

### Existing S3 Actions Updated
{% table %}
* Action
* API Description
* Description of Change(s)
---
* CreateBucket
* Creates a new bucket.
* CreateBucket will now accept the following request parameter:
  * `x-amz-bucket-object-lock-enabled`
---
* HeadObject
* Retrieves metadata from an object without returning the object itself.
* HeadObject will now return:
  * Mode that is currently in place for the requested object
  * Date/time that the object's lock will expire
---
* GetObject
* Retrieves an object from a bucket.
* GetObject will now return:
  * Mode that is currently in place for the requested object
  * Date/time that the object's lock will expire
---
* PutObject
* Adds an object to a bucket.
* PutObject will now:
  * Prevent locked object versions from being overwritten
  
  PutObject will now accept the following request parameters:
  * `x-amz-object-lock-mode`
  * `x-amz-object-lock-retain-until-date`
---
* CopyObject
* Creates a copy of an object that is already stored on Storj.
* CopyObject will now accept the following request parameters:
  * `x-amz-object-lock-mode`
  * `x-amz-object-lock-retain-until-date`
---
* CreateMultipartUpload
* This action initiates a multipart upload and returns an upload ID.
* CreateMultipartUpload will now accept the following request parameters:
  * `x-amz-object-lock-mode`
  * `x-amz-object-lock-retain-until-date`
  
  Storj has a unique object level TTL. Any request that has both a TTL and a retention period will be rejected to prevent TTL's from conflicting with object lock retention periods.
---
* DeleteBucket
* Deletes the specified bucket.
* Forced deletion of a bucket with locked objects will be prevented.
---
* DeleteObject
* Removes an object from a bucket.
* Deletion of an object with a retention set will be prevented.
{% /table %}
