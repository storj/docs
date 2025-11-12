---
title: "S3 API Reference"
docId: s3-api
metadata:
  title: "S3 API Compatibility Reference"
  description: "Complete reference for S3 API compatibility with Storj DCS, including supported operations, limits, and Storj-specific extensions."
---

Complete reference for S3 API compatibility with Storj DCS.

## API Compatibility Overview

The Storj S3-compatible Gateway supports a RESTful API that is compatible with the basic data access model of the Amazon S3 API.

### Support Definitions

- **Full** - Complete support for all features except those requiring unsupported dependencies
- **Partial** - Limited support (see specific caveats)
- **No** - Not supported

## Supported Operations

### Bucket Operations

| Operation | Support | Notes |
|-----------|---------|-------|
| CreateBucket | Full | |
| DeleteBucket | Full | |
| HeadBucket | Full | |
| ListBuckets | Full | |
| GetBucketLocation | Full | Gateway-MT only |
| GetBucketTagging | Full | |
| PutBucketTagging | Full | |
| DeleteBucketTagging | Full | |
| GetBucketVersioning | Yes | See [Object Versioning](docId:oogh5vaiGei6atohm5thi) |
| PutBucketVersioning | Yes | See [Object Versioning](docId:oogh5vaiGei6atohm5thi) |

### Object Operations

| Operation | Support | Notes |
|-----------|---------|-------|
| PutObject | Full | |
| GetObject | Partial | Need to add partNumber parameter support |
| DeleteObject | Full | |
| DeleteObjects | Full | |
| HeadObject | Full | |
| CopyObject | Full | Supports objects up to ~671 GB (vs AWS 5 GB limit) |
| GetObjectAttributes | Partial | Etag, StorageClass, and ObjectSize only |
| GetObjectTagging | Full | Tags can be modified outside tagging endpoints |
| PutObjectTagging | Full | Tags can be modified outside tagging endpoints |
| DeleteObjectTagging | Full | Tags can be modified outside tagging endpoints |

### Object Lock Operations

| Operation | Support | Notes |
|-----------|---------|-------|
| GetObjectLockConfiguration | Yes | See [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) |
| PutObjectLockConfiguration | Yes | See [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) |
| GetObjectLegalHold | Yes | See [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) |
| PutObjectLegalHold | Yes | See [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) |
| GetObjectRetention | Yes | See [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) |
| PutObjectRetention | Yes | See [Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) |

### Multipart Upload Operations

| Operation | Support | Notes |
|-----------|---------|-------|
| CreateMultipartUpload | Full | |
| UploadPart | Full | |
| UploadPartCopy | Partial | Available on request |
| CompleteMultipartUpload | Full | |
| AbortMultipartUpload | Full | |
| ListMultipartUploads | Partial | See ListMultipartUploads section |
| ListParts | Full | |

### Listing Operations

| Operation | Support | Notes |
|-----------|---------|-------|
| ListObjects | Partial | See ListObjects section |
| ListObjectsV2 | Partial | See ListObjects section |
| ListObjectVersions | Yes | See [Object Versioning](docId:oogh5vaiGei6atohm5thi) |

## Service Limits

| Limit | Value |
|-------|--------|
| Maximum buckets per account | 100 |
| Maximum objects per bucket | No limit |
| Maximum object size | No limit |
| Minimum object size | 0 B |
| Maximum object size per PUT | No limit |
| Maximum parts per multipart upload | 10,000 |
| Minimum part size | 5 MiB (last part can be 0 B) |
| Maximum parts returned per list request | 10,000 |
| Maximum objects per list request | 1,000 |
| Maximum multipart uploads per list request | 1,000 |
| Maximum bucket name length | 63 characters |
| Minimum bucket name length | 3 characters |
| Maximum encrypted object name length | 1,280 characters |
| Maximum metadata size | 2 KiB |

## API Behavior Notes

### ListObjects Behavior

#### Encrypted Object Keys
Object paths are end-to-end encrypted. Since we don't use ordering-preserving encryption, lexicographical ordering may not match expectations:

- **Forward-slash terminated prefix/delimiter**: Fast listing in encrypted path order
- **Non-forward-slash terminated prefix/delimiter**: Exhaustive listing in correct lexicographical order

#### Unencrypted Object Keys
Always lists in lexicographical order per S3 specification.

### ListMultipartUploads Behavior

- Same ordering characteristics as ListObjects
- Only supports forward-slash terminated prefixes and delimiters
- `UploadIdMarker` and `NextUploadIdMarker` not supported

### GetBucketLocation Response

Returns placement regions for bucket data:

| Value | Description |
|-------|-------------|
| `global` | Stored on global public network |
| `us-select-1` | SOC 2 Type 2 certified US facilities |

## Storj-Specific Extensions

### Object TTL (Time To Live)

Set object expiration using the `X-Amz-Meta-Object-Expires` header:

**Supported Formats:**
- Duration: `+300ms`, `+1.5h`, `+2h45m`
- RFC3339 timestamp: `2024-05-19T00:10:55Z`
- `none` for no expiration

**Example:**
```bash
aws s3 --endpoint-url https://gateway.storjshare.io cp file s3://bucket/object \
  --metadata Object-Expires=+2h
```

### ListBucketsWithAttribution (Gateway-MT only)

Returns bucket listing with attribution information.

**Request:**
```http
GET /?attribution HTTP/1.1
Host: gateway.storjshare.io
```

**Response includes additional Attribution element:**
```xml
<Bucket>
  <Attribution>string</Attribution>
  <CreationDate>timestamp</CreationDate>
  <Name>string</Name>
</Bucket>
```

## Large Object Handling

### Objects Larger Than 5 TiB

For objects exceeding AWS S3's 5 TiB limit, configure multipart chunk size:

```bash
# For 6 TiB files, set chunk size to ~630 MiB
aws --profile storj configure set s3.multipart_chunksize 630MiB
aws --profile storj --endpoint-url https://gateway.storjshare.io s3 cp 6TiB_file s3://bucket/
```

## Client Compatibility

### Python boto3 / AWS CLI

**Supported versions:** boto3 up to 1.35.99

**Issue:** Newer versions enable default integrity protections not yet supported by Storj.

**Recommendation:** Downgrade rather than using `WHEN_REQUIRED` workaround.

## Unsupported Features

### Security Features
- ACL operations (GetObjectAcl, PutObjectAcl, etc.)
- Bucket policies (except Gateway-ST with --website)
- Public access blocks

### Advanced Features
- Lifecycle management
- Cross-region replication  
- Analytics configurations
- Metrics configurations
- Inventory configurations
- Notification configurations
- Intelligent tiering
- Acceleration
- Website hosting
- Logging (available on request)

This reference provides complete S3 API compatibility information for integration planning and troubleshooting.