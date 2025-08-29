---
title: "Service Limits Reference"
docId: "service-limits-ref-001"
metadata:
  title: "Storj DCS Service Limits and Specifications"
  description: "Complete reference for service limits, quotas, and technical specifications for Storj DCS object storage."
---

Complete reference for service limits and technical specifications.

## Storage Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| **Buckets per account** | 100 | Contact support for increases |
| **Objects per bucket** | No limit | |
| **Object size** | No limit | Unlike AWS S3's 5 TiB limit |
| **Minimum object size** | 0 B | Empty objects supported |
| **Maximum PUT operation size** | No limit | Use multipart for large objects |
| **Object name length (encrypted)** | 1,280 characters | Path encryption adds overhead |
| **Object metadata size** | 2 KiB | Custom metadata storage |

## Bucket Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| **Bucket name minimum length** | 3 characters | |
| **Bucket name maximum length** | 63 characters | |
| **Bucket name format** | DNS-compliant | Lowercase letters, numbers, hyphens |

## Multipart Upload Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| **Maximum parts per upload** | 10,000 | Standard S3 limit |
| **Minimum part size** | 5 MiB | Last part can be smaller |
| **Maximum part size** | 5 GiB | Standard S3 limit |
| **Parts returned per list request** | 10,000 | Pagination available |

## API Request Limits

| Operation | Limit | Notes |
|-----------|-------|-------|
| **Objects per ListObjects request** | 1,000 | Use pagination for more |
| **Multipart uploads per list request** | 1,000 | Pagination available |
| **Parts per ListParts request** | 10,000 | |

## Network and Performance

| Resource | Specification | Notes |
|----------|---------------|-------|
| **Upload bandwidth** | No artificial limits | Limited by network and node capacity |
| **Download bandwidth** | No artificial limits | Limited by network and node capacity |
| **Concurrent connections** | No specific limit | Best practice: 10-100 concurrent |
| **Request rate** | No specific limit | Use exponential backoff for retries |

## Access and Security

| Resource | Limit | Notes |
|----------|-------|-------|
| **Access grants per account** | No limit | Store securely |
| **Access grant size** | ~1-2 KB typical | Varies based on restrictions |
| **Encryption key size** | 32 bytes | AES-256 encryption |
| **Macaroon restrictions** | 64 KB serialized | Access grant restrictions |

## Geographic Distribution

| Resource | Specification | Notes |
|----------|---------------|-------|
| **Default redundancy** | 80 pieces (29 required) | Erasure coding parameters |
| **Storage nodes** | Thousands globally | Decentralized network |
| **Satellite regions** | Multiple | US1, EU1, AP1 available |

## Large Object Considerations

### Objects Larger Than 5 TiB

Unlike AWS S3, Storj supports objects larger than 5 TiB. Configure S3 clients appropriately:

**Required multipart configuration for 6 TiB file:**
```bash
aws configure set s3.multipart_chunksize 630MiB
```

**Formula for chunk size:**
```
chunk_size = object_size / 10000 (rounded up to nearest MiB)
```

## Rate Limiting and Backoff

### Best Practices

**Recommended retry strategy:**
- Initial delay: 100ms
- Maximum delay: 30 seconds  
- Exponential backoff with jitter
- Maximum retry attempts: 5

**Connection pooling:**
- Reuse HTTP connections
- Limit concurrent connections per endpoint
- Use appropriate timeout values

## Monitoring and Quotas

### Account Usage Monitoring

Monitor usage through:
- Satellite web console
- CLI commands: `uplink ls --recursive`
- S3 API: ListBuckets, ListObjects

### Cost Optimization

**Storage efficiency:**
- Delete unnecessary objects regularly
- Use object expiration for temporary data
- Monitor duplicate objects

**Bandwidth optimization:**
- Use appropriate parallelism settings
- Implement client-side caching where appropriate
- Consider CDN for frequently accessed public data

## Regional Specifications

### Placement Options

| Region | Description | Compliance |
|--------|-------------|------------|
| **Global** | Worldwide distributed | Standard |
| **US-Select-1** | Continental US only | SOC 2 Type 2 |

### Performance Characteristics

**Global placement:**
- Lowest cost
- Best global performance
- Highest durability

**US-Select-1 placement:**
- Compliance focused
- US-based infrastructure
- Premium pricing

## Support and Escalation

### Limit Increase Requests

For limit increases, contact support with:
- Current usage patterns
- Projected growth requirements
- Business justification
- Timeline requirements

### Enterprise Features

Additional limits and features available for enterprise customers:
- Custom redundancy parameters
- Private satellite deployment
- Dedicated support channels
- SLA guarantees

This reference covers all standard service limits. For enterprise requirements or limit increases, contact [Storj support](https://supportdcs.storj.io/).