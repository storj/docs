---
title: How to configure CORS for web applications
docId: configure-cors
metadata:
  title: How to Configure CORS for Storj Web Applications
  description: Step-by-step guide to understand and work with Storj's CORS policy for secure web application development.
---

{% callout type="info" %}
**How-to Guide** - Problem-solving guide for specific tasks
{% /callout %}

This guide explains how to work with Cross-Origin Resource Sharing (CORS) when building web applications that access Storj storage.

## Prerequisites

Before configuring CORS for your application, ensure you have:

- A web application that needs to access Storj storage from a browser
- Basic understanding of CORS and web security concepts
- Storj S3-compatible credentials configured

## Understanding Storj's CORS policy

Storj's S3-compatible API includes a permissive CORS policy by default:

- **Access-Control-Allow-Origin**: `*` (allows access from any domain)
- **Automatic configuration**: No manual CORS setup required
- **Immediate access**: Your web applications can access Storj resources directly

This eliminates the need for proxy servers or backend-only access patterns common with other storage providers.

## Secure your application access

While Storj's permissive CORS policy simplifies development, follow these security best practices:

### 1. Use restricted access keys

Create access keys with minimal required permissions:

```shell
# Create restricted access key for web app
uplink access restrict \
  --readonly \
  --bucket=my-web-app-bucket \
  --path-prefix=public/ \
  my-main-access
```

### 2. Implement client-side validation

Add validation in your web application:

```javascript
// Example: Validate file types before upload
function validateFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed');
  }
}
```

### 3. Use presigned URLs for sensitive operations

Generate time-limited URLs for uploads:

```javascript
// Request presigned URL from your backend
const response = await fetch('/api/presigned-url', {
  method: 'POST',
  body: JSON.stringify({ filename: 'user-upload.jpg' })
});
const { uploadUrl } = await response.json();

// Use presigned URL for direct upload
await fetch(uploadUrl, {
  method: 'PUT',
  body: file
});
```

## Test CORS access

Verify your web application can access Storj storage:

### 1. Create a test HTML page

```html
<!DOCTYPE html>
<html>
<head>
    <title>Storj CORS Test</title>
</head>
<body>
    <script>
        // Test bucket listing
        fetch('https://gateway.storjshare.io/v1/buckets', {
            headers: {
                'Authorization': 'Bearer your-access-token'
            }
        })
        .then(response => response.json())
        .then(data => console.log('Buckets:', data))
        .catch(error => console.error('CORS error:', error));
    </script>
</body>
</html>
```

### 2. Check browser developer tools

1. Open the page in your browser
2. Open Developer Tools (F12)
3. Check the Console tab for any CORS errors
4. Verify the Network tab shows successful requests

## Handle CORS in different frameworks

### React/Next.js
```javascript
// pages/api/upload.js
export default async function handler(req, res) {
  // Set CORS headers if needed for your API routes
  res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
  
  // Your Storj integration code
}
```

### Vue.js
```javascript
// In your component
async uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await this.$http.put(
      'https://gateway.storjshare.io/v1/buckets/my-bucket/objects/file.jpg',
      formData,
      {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
    );
    console.log('Upload successful');
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

## Troubleshooting CORS issues

**"Access blocked by CORS policy"**: This typically indicates an issue with your authorization headers or request format, not Storj's CORS policy.

**Preflight request failures**: Ensure your access tokens are valid and have appropriate permissions.

**Mixed content warnings**: Use HTTPS for your web application when accessing Storj's HTTPS endpoints.

**Network errors in development**: Consider using a local development server (like `http-server` or your framework's dev server) instead of opening HTML files directly.

## Security considerations

**Risk assessment**: The permissive CORS policy means any website can attempt to access your Storj resources if they have credentials.

**Mitigation strategies**:
- Use read-only access keys for public content
- Implement server-side validation for sensitive operations
- Monitor access logs for unusual activity
- Rotate access keys regularly

**Best practices**:
- Store sensitive credentials on your backend, not in client-side code
- Use environment variables for configuration
- Implement proper authentication and authorization in your application

## Next steps

Once CORS is working correctly:

- [Use Presigned URLs](docId:use-presigned-urls) for secure uploads
- [Set up Object Versioning](docId:setup-object-versioning) for data protection
- [Optimize Upload Performance](docId:optimize-upload-performance) for better UX

## Related Content

**Start Learning:**
- [Your First Week with Storj](docId:your-first-week-with-storj) - Complete beginner tutorial
- [Build Your First App](docId:build-your-first-app) - Web app development guide

**Related How-to Guides:**
- [Use Presigned URLs](docId:use-presigned-urls) - Secure browser uploads
- [Migrate from AWS S3](docId:migrate-from-s3) - Switch to Storj storage

**Technical Details:**
- [S3 API Reference](docId:s3-api) - CORS specification details
- [CLI Commands Reference](docId:cli-reference-001) - Command-line tools

**Background Concepts:**
- [Security and Encryption](docId:security-and-encryption) - How Storj secures data
- [Storj Architecture Overview](docId:storj-architecture-overview) - System design