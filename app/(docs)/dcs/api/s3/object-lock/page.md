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

Additionally, PutObjectLockConfiguration is not supported yet, so Object Lock can only be enabled during bucket creation and cannot be added afterward.
{% /callout %}

{% partial file="create-bucket.md" /%}

### FAQ
- **When will Object Lock be fully released?**
	- We are actively working on Governance Mode and Legal Hold and plan to add them to the beta by as soon as they are ready.
	- The full feature set will be released as generally available some time after the beta is feature complete
- **Why would I test this Beta?**
	- If you plan to conduct a proof of concept or want to test a a pre-production instance of an integration that utilizes object lock. 
- **How do I test the Beta?**
    - See instructions above
- **Why doesn't the initial version support Governance Mode and Legal Hold?**
	- Our initial goal was to implement the most common S3 features regarding immutability and deliver them as quickly as possible, which led us to focus on the strictest form of object lock: Compliance Mode.
	- We are actively working on Governance Mode, Legal Hold, and the `PutObjectLockConfiguration` action and will add them to the beta as soon as they are ready
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
* PutObjectRetention
* Places an object retention configuration on an object.
* The only value supported for `Mode` is `COMPLIANCE` as Governance Mode is initially out of scope. 
---
* GetObjectRetention
* Retrieves an object's retention settings. 
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
  * Mode (only Compliance is supported initially) that is currently in place for the requested object
  * Date/time that the object's lock will expire
---
* GetObject
* Retrieves an object from a bucket.
* GetObject will now return:
  * Mode (only Compliance is supported initially) that is currently in place for the requested object
  * Date/time that the object's lock will expire
---
* PutObject
* Adds an object to a bucket.
* PutObject will now:
  * Prevent locked object versions from being overwritten
  
  PutObject will now accept the following request parameters:
  * `x-amz-object-lock-mode` (only Compliance is supported initially)
  * `x-amz-object-lock-retain-until-date`
---
* CopyObject
* Creates a copy of an object that is already stored on Storj.
* CopyObject will now accept the following request parameters:
  * `x-amz-object-lock-mode` (only Compliance is supported initially)
  * `x-amz-object-lock-retain-until-date`
---
* CreateMultipartUpload
* This action initiates a multipart upload and returns an upload ID.
* CreateMultipartUpload will now accept the following request parameters:
  * `x-amz-object-lock-mode` (only Compliance is supported initially)
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

### Actions not yet available (currently in active development)
{% table %}
* Action
* API Description
* Description of Change(s)
---
* PutObjectLockConfiguration
* Enables Object Lock configuration on a bucket.
* **ObjectLockEnabled**: Indicates if Object Lock is enabled on the bucket.

  **Rule**: Specifies the Object Lock rule (mode and period) for the bucket. The period can be either `Days` or `Years`.
---
* GetObjectLegalHold
* Retrieves the Legal Hold status of an object.
* 
---
* PutObjectLegalHold
* Applies a Legal Hold to the specified object.
* 
{% /table %}
