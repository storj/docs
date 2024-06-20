---
title: Object Lock (Tech Preview)
docId: gjrGzPNnhpYrAGTTAUaj
metadata:
  description: Detailed guide on the technical preview of object lock
  title: 'Object Lock (Tech Preview)'
---

## Summary

### Overview
Storj is currently developing S3 Compatible Object Lock. As part of that development, we have an early version of the API that can be used to test compatibility. Note that any testing will not be representative of real-world performance, and there is no value in testing anything outside the correctness of the implementation.

### FAQ
- **When will Object Lock be in Beta? When will it be fully released?**
	- We expect to begin an open beta of Object Lock sometime in July or August 2024.
	- We tentatively plan to add Governance Mode and Legal Hold to the beta sometime in Q4, with the goal of rolling out Object Lock fully by the end of the year.
- **Why would I test this Alpha version?**
	- We used this particular Alpha version to do our own validation against key tools that implement S3's Object Lock, for example, Veeam.
	- If your product or an integration uses Object Lock, you can use this Alpha to validate compatibility before we get into Beta.
- **How do I sign up to join the Beta when it arrives?**
	- Fill out this form to be the first to know when the beta is arriving: [Sign Up Form](https://forms.gle/dkyqXjMkwQ34o7os6)
- **Why doesn't the initial version support Governance Mode and Legal Hold?**
	- Our initial goal is to implement the most common S3 features regarding immutability and deliver them as quickly as possible, which led us to focus on the strictest form of object lock: Compliance Mode.
- **How do I give feedback or request features related to Object Lock?**
	- Our roadmap is public. Here are the relevant roadmap items:
		- [S3 Object Lock: Compliance Mode](https://github.com/storj/roadmap/issues/47)
		- [S3 Object Lock: Add Governance Mode and Legal Hold](https://github.com/storj/roadmap/issues/98)
	- You can also let us know your thoughts/opinions/needs by indicating your interest in the Object Lock beta here: [Sign Up Form](https://forms.gle/dkyqXjMkwQ34o7os6)

## Instructions
1. Register on [https://satellite.qa.storj.io](https://satellite.qa.storj.io/)
2. [Generate S3-compatible credentials](docId:AsyYcUJFbO1JI8-Tu8tW3#generate-s3-compatible-credentials)
3. Use [https://gateway.staging.storjshare.io](https://gateway.staging.storjshare.io/) with generated credentials:
	1. The Object Lock alpha implementation is enabled only using this specific endpoint.

## Technical Details
### New S3 Actions Supported:
| Action                     | API Description                                            | Description of Change(s)                                                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetObjectLockConfiguration | Gets the object lock configuration for a bucket.           | Will return the ObjectLockConfiguration with `ObjectLockEnabled` either as `Enabled` or empty. `Rule` will not be included as a response element as specifying a bucket-level object Lock rule is initially out of scope. |
| PutObjectRetention         | Places an object retention configuration on an object.<br> | The only value supported for `Mode` is `COMPLIANCE` as Governance Mode is initially out of scope.                                                                                                                         |
| GetObjectRetention         | Retrieves an object's retention settings.                  |                                                                                                                                                                                                                           |

### Existing S3 Actions Updated
| Method                | API Description                                                        | Description of Change(s)                                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CreateBucket          | Creates a new bucket.                                                  | CreateBucket will now accept the following request parameter:<br>- `x-amz-bucket-object-lock-enabled`                                                                                                                                                                                                                                                                                |
| HeadObject            | Retrieves metadata from an object without returning the object itself. | HeadObject will now return:<br>- Mode (only Compliance is supported initially) that is currently in place for the requested object<br>- Date/time that the object's lock will expire                                                                                                                                                                                                 |
| GetObject             | Retrieves an object from a bucket.                                     | GetObject will now return:<br>- Mode (only Compliance is supported initially) that is currently in place for the requested object<br>- Date/time that the object's lock will expire                                                                                                                                                                                                  |
| PutObject             | Adds an object to a bucket.                                            | PutObject will now:<br> - Prevent locked object versions from being overwritten<br><br>PutObject will now accept the following request parameters:<br>- `x-amz-object-lock-mode` (only Compliance is supported initially) <br>- `x-amz-object-lock-retain-until-date`                                                                                                                |
| CopyObject            | Creates a copy of an object that is already stored on Storj.           | CopyObject will now accept the following request parameters:<br>- `x-amz-object-lock-mode` (only Compliance is supported initially) <br>- `x-amz-object-lock-retain-until-date`                                                                                                                                                                                                      |
| CreateMultipartUpload | This action initiates a multipart upload and returns an upload ID.     | CreateMultipartUpload will now accept the following request parameters:<br>- `x-amz-object-lock-mode` (only Compliance is supported initially) <br>- `x-amz-object-lock-retain-until-date`<br><br>Storj has a unique object level TTL. Any request that has both a TTL and a retention period will be rejected to prevent TTL's from conflicting with object lock retention periods. |
| DeleteBucket          | Deletes the specified bucket.                                          | Forced deletion of a bucket with locked objects will be prevented.                                                                                                                                                                                                                                                                                                                   |
| DeleteObject          | Removes an object from a bucket.                                       | Deletion of an object with a retention set will be prevented.                                                                                                                                                                                                                                                                                                                        |

In addition to the new and updated actions supported above, we have a follow on roadmap item to implement the remaining scope of S3 Compatible Lock, mainly the addition of Governance Mode and Legal hold. These additional actions are outlined in the roadmap item here: https://github.com/storj/roadmap/issues/98