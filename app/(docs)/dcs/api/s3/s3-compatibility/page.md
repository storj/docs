---
title: S3 Compatibility
docId: eZ4caegh9queuQuaazoo
weight: 1
redirects:
  - /dcs/api-reference/s3-compatible-gateway/supported-s3-commands
  - /dcs/api/s3/s3-compatility
---

The Storj S3-compatible Gateway supports a RESTful API that is compatible with the basic data access model of the Amazon S3 API.

## Compatibility Table

| Name | Support | Caveats |
|---|---|---|
| AbortMultipartUpload | Full |  |
| CompleteMultipartUpload | Full |  |
| CopyObject | Full |  |
| CreateBucket | Full |  |
| CreateMultipartUpload | Full |  |
| DeleteBucket | Full |  |
| DeleteBucketAnalyticsConfiguration | No |  |
| DeleteBucketCors | No |  |
| DeleteBucketEncryption | No |  |
| DeleteBucketIntelligentTieringConfiguration | No |  |
| DeleteBucketInventoryConfiguration | No |  |
| DeleteBucketLifecycle | No |  |
| DeleteBucketMetricsConfiguration | No |  |
| DeleteBucketOwnershipControls | No |  |
| DeleteBucketPolicy | No |  |
| DeleteBucketReplication | No |  |
| DeleteBucketTagging | Full |  |
| DeleteBucketWebsite | No |  |
| DeleteObject | Full |  |
| DeleteObjectTagging | Full | Tags can be modified outside of tagging endpoints |
| DeleteObjects | Full |  |
| DeletePublicAccessBlock | No |  |
| GetBucketAccelerateConfiguration | No |  |
| GetBucketAcl | No |  |
| GetBucketAnalyticsConfiguration | No |  |
| GetBucketCors | No |  |
| GetBucketEncryption | No |  |
| GetBucketIntelligentTieringConfiguration | No |  |
| GetBucketInventoryConfiguration | No |  |
| GetBucketLifecycle (deprecated) | No |  |
| GetBucketLifecycleConfiguration | No |  |
| GetBucketLocation | Full | See GetBucketLocation section |
| GetBucketLogging | No | Available upon request; see Bucket Logging section below |
| GetBucketMetricsConfiguration | No |  |
| GetBucketNotification (deprecated) | No |  |
| GetBucketNotificationConfiguration | No |  |
| GetBucketOwnershipControls | No |  |
| GetBucketPolicy | Partial | Only in Gateway-ST with --website |
| GetBucketPolicyStatus | No | Currently, it always returns false |
| GetBucketReplication | No |  |
| GetBucketRequestPayment | No | Planned support status needs verification |
| GetBucketTagging | Full |  |
| GetBucketVersioning | Yes | [](docId:oogh5vaiGei6atohm5thi) |
| GetBucketWebsite | No |  |
| GetObject | Partial | We need to add support for the partNumber parameter |
| GetObjectAcl | No |  |
| GetObjectAttributes | Partial | Etag, StorageClass, and ObjectSize only |
| GetObjectLegalHold | Yes | [](docId:gjrGzPNnhpYrAGTTAUaj) |
| GetObjectLockConfiguration | Yes | [](docId:gjrGzPNnhpYrAGTTAUaj) |
| GetObjectRetention | Yes | [](docId:gjrGzPNnhpYrAGTTAUaj) |
| GetObjectTagging | Full | Tags can be modified outside of tagging endpoints |
| GetObjectTorrent | No |  |
| GetPublicAccessBlock | No |  |
| HeadBucket | Full |  |
| HeadObject | Full |  |
| ListBucketAnalyticsConfigurations | No |  |
| ListBucketIntelligentTieringConfigurations | No |  |
| ListBucketInventoryConfigurations | No |  |
| ListBucketMetricsConfigurations | No |  |
| ListBuckets | Full |  |
| ListMultipartUploads | Partial | See ListMultipartUploads section |
| ListObjectVersions | Yes | [](docId:oogh5vaiGei6atohm5thi) |
| ListObjects | Partial | See ListObjects section |
| ListObjectsV2 | Partial | See ListObjects section |
| ListParts | Full |  |
| PutBucketAccelerateConfiguration | No |  |
| PutBucketAcl | No |  |
| PutBucketAnalyticsConfiguration | No |  |
| PutBucketCors | No |  |
| PutBucketEncryption | No |  |
| PutBucketIntelligentTieringConfiguration | No |  |
| PutBucketInventoryConfiguration | No |  |
| PutBucketLifecycle (deprecated) | No |  |
| PutBucketLifecycleConfiguration | No |  |
| PutBucketLogging | No | Available upon request; see Bucket Logging section below |
| PutBucketMetricsConfiguration | No |  |
| PutBucketNotification (deprecated) | No |  |
| PutBucketNotificationConfiguration | No |  |
| PutBucketOwnershipControls | No |  |
| PutBucketPolicy | No |  |
| PutBucketReplication | No |  |
| PutBucketRequestPayment | No | Planned support status needs verification |
| PutBucketTagging | Full |  |
| PutBucketVersioning | Yes | [](docId:oogh5vaiGei6atohm5thi) |
| PutBucketWebsite | No |  |
| PutObject | Full |  |
| PutObjectAcl | No |  |
| PutObjectLegalHold | Yes | [](docId:gjrGzPNnhpYrAGTTAUaj) |
| PutObjectLockConfiguration | Yes | [](docId:gjrGzPNnhpYrAGTTAUaj) |
| PutObjectRetention | Yes | [](docId:gjrGzPNnhpYrAGTTAUaj) |
| PutObjectTagging | Full | Tags can be modified outside of tagging endpoints |
| PutPublicAccessBlock | No |  |
| RestoreObject | No |  |
| SelectObjectContent | No |  |
| UploadPart | Full |  |
| UploadPartCopy | Partial | Enabled on-request |
| WriteGetObjectResponse | No |  |

## Compatibility Table Support/Caveats

### Definitions

#### Full compatibility

Full compatibility means that we support all features of a specific action
except for features that rely on other actions that we haven't fully
implemented.

### Bucket Logging
Bucket Logging is available upon request. Please refer to [](docId:0191fc71-e031-761c-a16b-aa8ca9e44413).

### GetBucketLocation

This is currently supported in Gateway-MT only.

#### LocationConstraint

Specifies the placement region where the object data for a bucket is stored:

|     Value     |                                                        Description                                                        |
| :-----------: | :-----------------------------------------------------------------------------------------------------------------------: |
|   `global`    |                                  Stored on nodes connected to the global public network                                   |
| `us-select-1` | Stored on infrastructure located in SOC 2 Type 2 certified facilities located in the continental United States of America |

#### Partial compatibility

Partial compatibility means that we don't support all features of a specific
action (see Caveats column).

### ListObjects

#### Encrypted Object Keys
A bucket's paths are end-to-end encrypted. We don't use an ordering-preserving
encryption scheme yet, meaning that it's impossible to always list a bucket in
lexicographical order (as per S3 specification). For requests that come with
forward-slash-terminated prefix and/or forward-slash delimiter, we list in the
fastest way we can, which will list a bucket in lexicographical order, but for
encrypted paths (which is often very different from the expected order for
decrypted paths). Ideally, clients shouldn't care about ordering in those cases.
For requests that come with non-forward-slash-terminated prefix and/or
non-forward-slash delimiter, we perform exhaustive listing, which will filter
paths gateway-side. In this case, gateways return listing in lexicographical
order. Forcing exhaustive listing for any request is not possible for Storj
production deployments of Gateway-MT, and for, e.g. Gateway-ST can be achieved
with `--s3.fully-compatible-listing`.

#### Unencrypted Object Keys
Always lists in lexicographical order (as per S3 specification). For requests that come with a
non-forward-slash delimiter, we perform exhaustive listing, which will filter
paths gateway-side.

### ListMultipartUploads

This endpoint has the same ordering characteristics as `ListObjects` described
above, in that lexicographic ordering works on encrypted upload paths, not the
decrypted uploads paths. It also only supports prefixes that contain a trailing
forward-slash, as well as a forward-slash delimiter. An exhaustive search
similar to what `ListObjects` does with arbitrary prefixes and delimiters is not
supported.

`UploadIdMarker` and `NextUploadIdMarker` are not supported. This is used to
filter out uploads that come before the given upload ID marker. This is tracked
at [storj/gateway-mt#213](https://github.com/storj/gateway-mt/issues/213)

### ACL-related actions

[Secure access control in the decentralized
cloud](https://www.storj.io/blog/secure-access-control-in-the-decentralized-cloud)
is a good read for why we don't support ACL-related actions.

## Limits

|                                      Limit                                      |        Specification        |
| :-----------------------------------------------------------------------------: | :-------------------------: |
|                            Maximum number of buckets                            |             100             |
|                      Maximum number of objects per bucket                       |          No limit           |
|                               Maximum object size                               |          No limit           |
|                               Minimum object size                               |             0 B             |
|                      Maximum object size per PUT operation                      |          No limit           |
|                       Maximum number of parts per upload                        |            10000            |
|                                Minimum part size                                | 5 MiB. Last part can be 0 B |
|             Maximum number of parts returned per list parts request             |            10000            |
|           Maximum number of objects returned per list objects request           |            1000             |
| Maximum number of multipart uploads returned per list multipart uploads request |            1000             |
|                         Maximum length for bucket names                         |             63              |
|                         Minimum length for bucket names                         |              3              |
|                    Maximum length for encrypted object names                    |            1280             |
|                              Maximum metadata size                              |            2 KiB            |

### S3-compatible clients configuration for objects larger than 5 TiB

AWS S3 limits users to upload objects no larger than 5 TiB. Edge services at
Storj don't impose such a limit, but the existence of the limit in AWS S3
requires users to tweak their client's configuration to be able to upload larger
objects.

This example is specific to AWS CLI, but your particular S3-compatible client
might carry a need for a similar configuration.

A multipart upload requires that a single object is uploaded in not more than
10000 distinct parts. You must ensure that the chunk size you set balances the
part size and the number of parts.

For example, for 6 TiB objects, you need to set AWS CLI's `multipart_chunksize`
to approximately 630 MiB:

```console
$ aws --profile storj configure set s3.multipart_chunksize 630MiB
$ aws --profile storj --endpoint-url https://gateway.storjshare.io s3 cp 6TiB_file s3://objects/
```

## Storj-specific extensions

### Object-level TTL

It's possible to specify TTL for the object by sending the

- `X-Amz-Meta-Object-Expires`

header (note: S3-compatible clients usually add the `X-Amz-Meta-` /
`X-Minio-Meta-` prefix themselves) with one of the following values:

- a signed, positive sequence of decimal numbers, each with an optional fraction
  and a unit suffix, such as `+300ms`, `+1.5h`, or `+2h45m`
  - valid time units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`
  - `+2h` means the object expires 2 hours from now
- full RFC3339-formatted date

It's also possible to specify `none` for no expiration (or not send the header).

#### AWS CLI example

```console
$ aws s3 --endpoint-url https://gateway.storjshare.io cp file s3://bucket/object --metadata Object-Expires=+2h
upload: ./file to s3://bucket/object

# or

$ aws s3 --endpoint-url https://gateway.storjshare.io cp file s3://bucket/object --metadata Object-Expires=2022-05-19T00:10:55Z
upload: ./file to s3://bucket/object
```

#### Caveats

The value under `X-Amz-Meta-Object-Expires` has priority over the value under
`X-Minio-Meta-Object-Expires`.

### ListBucketsWithAttribution (Gateway-MT only)

An alternate response of the S3 ListBuckets API endpoint which includes Attribution in the Bucket XML element.
Other than the addition of Attribution in the response the endpoint behavior is the same as ListBuckets.

#### Request Syntax

```http
GET /?attribution HTTP/1.1
Host: gateway.storjshare.io
```

#### Response Syntax

```http
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<ListAllMyBucketsResult>
   <Buckets>
      <Bucket>
         <Attribution>string</Attribution>
         <CreationDate>timestamp</CreationDate>
         <Name>string</Name>
      </Bucket>
   </Buckets>
   <Owner>
      <DisplayName>string</DisplayName>
      <ID>string</ID>
   </Owner>
</ListAllMyBucketsResult>
```

#### Example

This sample code works with the AWS SDK for Go and derives from ListBuckets a call to ListBucketsWithAttribution.

```go
package main

import (
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awsutil"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/request"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type BucketWithAttribution struct {
	_            struct{}   `type:"structure"`
	CreationDate *time.Time `type:"timestamp"`
	Name         *string    `type:"string"`
	Attribution  *string    `type:"string"`
}

type ListBucketsWithAttributionOutput struct {
	_       struct{}                 `type:"structure"`
	Buckets []*BucketWithAttribution `locationNameList:"Bucket" type:"list"`
	Owner   *s3.Owner                `type:"structure"`
}

func main() {
	// Note: YOUR-ACCESSKEYID and YOUR-SECRETACCESSKEY are example values, please replace them with your keys.
	creds := credentials.NewCredentials(&credentials.StaticProvider{
		Value: credentials.Value{
			AccessKeyID:     "YOUR_ACCESSKEYID",
			SecretAccessKey: "YOUR_SECRETACCESSKEY",
		}})

	ses := session.Must(session.NewSession(aws.NewConfig().WithCredentials(creds).WithRegion("eu1").WithEndpoint("https://gateway.storjshare.io")))
	svc := s3.New(ses)

	op := &request.Operation{
		Name:       "ListBuckets",
		HTTPMethod: "GET",
		HTTPPath:   "/?attribution",
	}

	output := &ListBucketsWithAttributionOutput{}

	req := svc.NewRequest(op, &s3.ListBucketsInput{}, output)

	if err := req.Send(); err != nil {
		panic(err)
	}

	fmt.Println(awsutil.Prettify(output))
}
```

## Compatibility with Python SDK (`boto3`) and `aws` CLI
Currently only `boto3` version up to 1.35.99 is working normally. Since AWS CLI uses `boto3` under the hood, it's affected too.

You can find the explanation of this breaking change in boto3 in this [github issue](https://github.com/boto/boto3/issues/4392).

{% callout type="warning" %}
Specifically, please note:

> Disclaimer: The AWS SDKs and CLI are designed for usage with official AWS services. We may introduce and enable new features by default, such as these new [default integrity protections](https://aws.amazon.com/blogs/aws/introducing-default-data-integrity-protections-for-new-objects-in-amazon-s3/) prior to them being supported or handled by third-party service implementations. You can disable the new behavior with the `WHEN_REQUIRED` value for the `request_checksum_calculation` and `response_checksum_validation` configuration options covered in [Data Integrity Protections for Amazon S3](https://docs.aws.amazon.com/sdkref/latest/guide/feature-dataintegrity.html).
{% /callout %}

It is preferable to downgrade rather than disabling the new behavior with `WHEN_REQUIRED`, and this may not even work with Storj anyway.

You may track [this issue](https://github.com/storj/gateway-st/issues/89) to be notified, when this new behavior would be supported by [Gateway-ST](docId:EGM8O-1xt2Az03eBWT8Rf) and [Gateway-MT](docId:yYCzPT8HHcbEZZMvfoCFa).
