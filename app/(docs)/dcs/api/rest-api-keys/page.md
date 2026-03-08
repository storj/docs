---
title: REST API Keys
docId: Ra4bNZaVFf3dEyThK2gA9
metadata:
  title: REST API Keys
  description:
    How to create, use, and revoke REST API keys for programmatic access to
    Storj account management operations including projects, access grants, and usage data.
---

REST API keys let you authenticate programmatic requests to the Storj public API without using your account password or session cookies. They are distinct from S3-compatible credentials and access grants — REST API keys grant access to account management operations such as listing projects, managing access grants, and retrieving usage data.

{% callout type="info" %}
REST API keys are available to Pro users only.
{% /callout %}

## Creating a REST API Key

1. Log in to the Storj satellite dashboard.
2. Click **API Keys** in the sidebar (or go directly to `https://us1.storj.io/account/api-keys`).
3. Click **Create New Key**.
4. Enter a name and optionally set an expiration date.
5. Click **Create**. Copy the key immediately — it will not be shown again.

## Revoking a REST API Key

1. Click **API Keys** in the sidebar (or go directly to `https://us1.storj.io/account/api-keys`).
2. Find the key you want to revoke and click **Revoke**.

Revoking a key immediately invalidates it. Any in-flight requests using that key will fail.

## Using a REST API Key

Include your key as a Bearer token in the `Authorization` header of every request:

```
Authorization: Bearer <your-key>
```

All endpoints are served from your satellite's base URL (e.g. `https://us1.storj.io`).

## Available Endpoints

### User

#### Get User Info

Returns the account details for the authenticated user.

```
GET /public/v1/users/
```

**Example:**

```bash
curl -s \
  -H "Authorization: Bearer <your-key>" \
  https://us1.storj.io/public/v1/users/
```

**Response:**

```json
{
  "id": "...",
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "paidTier": true
}
```

### Projects

#### List Projects

Returns all projects owned by the authenticated user.

```
GET /public/v1/projects
```

**Example:**

```bash
curl -s \
  -H "Authorization: Bearer <your-key>" \
  https://us1.storj.io/public/v1/projects
```

#### Create Project

```
POST /public/v1/projects/create
```

**Request body:**

```json
{
  "name": "my-project",
  "description": "optional description"
}
```

**Example:**

```bash
curl -s -X POST \
  -H "Authorization: Bearer <your-key>" \
  -H "Content-Type: application/json" \
  -d '{"name":"my-project"}' \
  https://us1.storj.io/public/v1/projects/create
```

#### Update Project

```
PATCH /public/v1/projects/update/{project_id}
```

**Request body:** any subset of `name` or `description`.

#### Delete Project

```
DELETE /public/v1/projects/delete/{project_id}
```

### Bucket Usage

#### Single Bucket Rollup

Returns usage statistics for a single bucket.

```
GET /public/v1/bucket-rollup?projectID={project_id}&bucket={bucket_name}&since={since}&before={before}
```

#### All Bucket Rollups

Returns usage statistics for all buckets in a project.

```
GET /public/v1/bucket-rollups?projectID={project_id}&since={since}&before={before}
```

### Access Grants (API Keys)

#### List Project Access Grants

Returns all access grants (API keys) for a project.

```
GET /public/v1/projects/apikeys/{project_id}
```

#### Create Access Grant

```
POST /public/v1/apikeys/create
```

**Request body:**

```json
{
  "projectID": "<project-id>",
  "name": "my-access-grant"
}
```

#### Delete Access Grant

```
DELETE /public/v1/apikeys/delete/{api_key_id}
```

## Key Properties

| Property       | Details                                                                      |
|----------------|------------------------------------------------------------------------------|
| **Format**     | UUID string                                                                  |
| **Storage**    | Only the SHA-256 hash is stored; the plaintext key is shown once at creation |
| **Expiration** | Optional. Once expired, the key is automatically rejected                    |
| **Scope**      | Grants access to all endpoints listed above for the owning account           |
| **Revocation** | Immediate; no grace period                                                   |
