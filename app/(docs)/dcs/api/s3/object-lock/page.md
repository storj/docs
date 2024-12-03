---
title: Object Lock
docId: gjrGzPNnhpYrAGTTAUaj
metadata:
  description: S3 Guide to Object Lock
  title: 'Object Lock'
---
Object Lock allows you to protect objects from being deleted or overwritten for a specified period or indefinitely. Object Lock operates in three modes:

- **Governance Mode**: Protects objects against accidental deletion but allows authorized users to bypass the lock.
- **Compliance Mode**: Provides immutable protection; no user can delete or modify the object until the retention period expires.
- **Legal Hold**: Prevents an object from being deleted until the legal hold is explicitly removed, regardless of retention settings.

{% partial file="override-governance-mode-callout.md" /%}

## Using Object Lock
- For enabling object lock, and setting bucket level defaults please see [](docId:e94a86fc-3deb-42f0-b7fe-1f80c675930a)
- For object lock related object operations please see [](docId:uyuWpwchZx29f28UGAILP)

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
