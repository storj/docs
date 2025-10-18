---
title: "Error Codes Reference"
docId: error-codes
metadata:
  title: "Error Codes and Troubleshooting Reference"
  description: "Reference for common error codes, HTTP status codes, and troubleshooting information for Storj DCS."
---

Reference for error codes and common issues when working with Storj DCS.

## CLI Exit Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `0` | Success | Operation completed successfully |
| `1` | General error | Check command syntax and parameters |
| `2` | Access denied | Verify access grant permissions |
| `3` | Network error | Check internet connectivity and satellite endpoints |

## HTTP Status Codes

### 2xx Success
| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created successfully |
| `204` | No Content | Request successful, no content returned |

### 4xx Client Errors
| Code | Status | Description | Common Causes |
|------|--------|-------------|---------------|
| `400` | Bad Request | Invalid request format | Malformed JSON, invalid parameters |
| `401` | Unauthorized | Authentication failed | Invalid access key, expired token |
| `403` | Forbidden | Access denied | Insufficient permissions, restricted access |
| `404` | Not Found | Resource not found | Bucket/object doesn't exist, wrong path |
| `409` | Conflict | Resource conflict | Bucket already exists, object locked |

### 5xx Server Errors  
| Code | Status | Description | Resolution |
|------|--------|-------------|------------|
| `500` | Internal Server Error | Server error | Retry request, contact support if persistent |
| `502` | Bad Gateway | Gateway error | Check satellite status, retry request |
| `503` | Service Unavailable | Service temporarily unavailable | Wait and retry with backoff |

## Common Error Messages

### Access Grant Errors

**"Access grant invalid"**
- **Cause**: Malformed or expired access grant
- **Resolution**: Generate new access grant, verify serialization

**"Insufficient permissions"**  
- **Cause**: Access grant lacks required permissions
- **Resolution**: Create access grant with appropriate permissions

### Network Errors

**"Dial timeout"**
- **Cause**: Network connectivity issues
- **Resolution**: Check internet connection, firewall settings

**"Connection refused"**
- **Cause**: Satellite unreachable
- **Resolution**: Verify satellite address, check network access

### Storage Errors

**"Bucket already exists"**
- **Cause**: Bucket name already taken
- **Resolution**: Choose different bucket name

**"Object not found"**
- **Cause**: Object path incorrect or object deleted
- **Resolution**: Verify object path, check bucket listing

**"Upload failed"**
- **Cause**: Network interruption or insufficient space
- **Resolution**: Retry upload, check available storage

### S3 API Errors

**"SignatureDoesNotMatch"**
- **Cause**: Incorrect access credentials or clock skew
- **Resolution**: Verify access keys, sync system clock

**"NoSuchBucket"**
- **Cause**: Bucket name incorrect or doesn't exist
- **Resolution**: Create bucket or verify bucket name

**"InvalidAccessKeyId"**
- **Cause**: Access key not recognized
- **Resolution**: Verify access key, regenerate if necessary

## Troubleshooting Steps

### General Troubleshooting

1. **Verify credentials**: Ensure access grant or S3 keys are correct
2. **Check permissions**: Confirm access grant has required permissions  
3. **Test connectivity**: Verify network access to satellites
4. **Review syntax**: Double-check command syntax and parameters
5. **Check limits**: Ensure request doesn't exceed service limits

### Debug Mode

Enable debug output for detailed error information:

```bash
# CLI debug mode
export UPLINK_DEBUG=true
uplink ls sj://mybucket/

# Or use debug flag
uplink --debug ls sj://mybucket/
```

### Log Analysis

**CLI logs**: Look for specific error messages and stack traces  
**S3 client logs**: Enable verbose logging in S3 client configuration
**Network logs**: Use tools like `curl` or `wget` to test endpoints

### Performance Issues

**Slow uploads/downloads**:
- Adjust parallelism settings
- Check network bandwidth
- Consider chunked upload for large files

**Timeouts**:
- Increase client timeout settings
- Use smaller chunk sizes
- Check for network stability

## Getting Help

When reporting issues, include:

1. **Error message**: Complete error text and codes
2. **Command used**: Full command with parameters (sanitize credentials)
3. **Environment**: OS, CLI version, client library version  
4. **Network**: Connection type and any proxies/firewalls
5. **Timing**: When error occurs and frequency

For persistent issues, contact support through the [support portal](https://supportdcs.storj.io/).