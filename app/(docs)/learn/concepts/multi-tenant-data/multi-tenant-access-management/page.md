---
title: Key Management for Multi-tenant Data Partitioning and Isolation
docId: multitenantpart1
redirects:
  - /dcs/concepts/multi-tenant-access
  - /dcs/concepts/fine-grained-access
metadata:
  title: Key Management for Multi-tenant Data Partitioning and Isolation
  description:
    Common implementation patterns for multi-tenant security isoldataion and fine-rained access control.  The focus of 
    is primarily on the access management options, including application authorization and key management capabilities.
---
# Multi-Tenant Isolation and Access Management

Applications and systems often provide for multiple distinct groups of uses to access common sets of services.  Typically isloation is handled in the application layer via Identity and Access Management tooling(IAM).  Lower in the applicaiton stack, storage platforms have many options to isolate data: from following filesystem conventions to metadata stores with unstructured data.

Here we outline the options for using Storj in a multi-tenant mobile application requiring tenant data partitioning and isolation. The focus is primarily on access management options, including application authorization and key management capabilities.  We present common implementation patterns but actual implementation of specific integrations will depend on the requirements of your application, including the relevant security policies in place.

# Prerequisites

To better understand the concepts described in this document, please read the following related documentation sections:

- [Edge Security Models](docId:ohm3EChieYaCh6ka)
- [Multi-tenant Data Partitioning and Isolation](docId:eisait3Wieso5tij)

Those content sections will help you identify the appropriate model for multi-tenant data partitioning and isolation, and provide an understanding of the different options available for access and credential management. With that understanding, this document will provide different approaches to implementing a scalable approach for your application.

Important Note: In all cases and approaches below, Storj assumes that your application has an existing mechanism for user authentication and identity management generally, for groups, roles, authorization, etc. within the context of your application. The concepts and approaches described below are limited to application authorization related to storage of data on Storj only.

# Approaches to Credential Management for Multi-tenant Applications

Storj provides tools to enable secure and scalable application integration, including supporting multiple access patterns including tools to manage credentials associated with the multi-tenant users of those applications. Establishing credential lifecycle management with least privilege and defined expiration within the paradigm of the application’s security policy provides optimal protection against common credential-related attack vectors.

There are several tools in the Storj protocol related to credential and access management:

- **Access Grant** - authorization token to perform actions on the service, a type of Bearer token that includes:

  - API Key - may be restricted based on operation, path, TTL, etc.
  - Encryption Key - may be restricted on path
  - Can be used to generate other access grants, S3 credentials and Linkshare Links ([More information](docId:XKib9SzjtEXTXWvdyYWX6))
- **S3 Credential** - Programmatically generated with restrictions on path, operation and duration.

  - Derived from Access Grant and subject to restrictions encoded in Access Grant ([More information](docId:eZ4caegh9queuQuaazoo))
  - Compatible and Interoperable with S3-compatible technology (Software, SDKs, etc.)
- **Presigned URL** - standard S3 function to generate timebound unauthenticated bucket or path access link to interact with objects

  - Generated with S3 Credential and subject to restrictions encoded in S3 Credential ([More information](docId:_pCGnHv0_XwR0-mX0rIkJ) and some background detail)
- **Linkshare Link** - persistent public HTTP link to retrieve objects

  - Generated with Access Grant and subject to restrictions encoded in Access Grant ([More information](docId:sN2GhYgGUtqBVF65GhKEa))
- **Uplink Tools** - generate and manage Access Grants, S3 Credentials, linkshare links ([More information](docId:TC-N6QQVQg8w2cRqvEqEf))

  - Uplink is offered in several options, including:
    - [Storj CLI](docId:TC-N6QQVQg8w2cRqvEqEf) (Linux, Windows, Mac)
    - [Go Library](https://github.com/storj/storj/wiki/Libuplink-Walkthrough)
    - [Bindings for C](https://github.com/storj/uplink-c)
    - [Uplink Access](https://github.com/storj/access-python) (Uplink Lite library for Python native and Access Management only)

These tools can be combined to support flexible architectures to serve most customer use cases for multi-tenant applications.

# Typical Multi-tenant Solution Architecture Patterns

Customer applications generally use one of the following solution architecture patterns when utilizing unique credentials as part of a multi-tenant applications.

## Shared Datastore / Shared Schema

In this pattern, all tenants share the same database and the same tables. The data for different tenants is distinguished using an identifier and referenced with metadata.  The simplest approach, this involves storing all tenants' data in the same datastore, distinguished by a tenant identifier. While it offers ease of implementation and cost efficiency, it poses significant security risks and potential performance issues

## Shared Datastore / Seperate Schema

Each tenant has its own schema within the same database. This pattern provides a logical separation of tenant data.  This provides a better isolation level by assigning each tenant a distinct schema within the same database, facilitating tenant-specific customizations and improved security, albeit with increased management complexity

## Dedicated Datastore

Each tenant has its own database. This pattern offers the highest level of isolation, where each tenant has a dedicated datastore. This ensures strong data isolation and allows for customizable configurations, but at the cost of higher operational overhead and resource usage.

## Attribute-based Access Control (ABAC)

Access is granted based on attributes (e.g., roles, departments, projects) rather than just tenant identifiers. This pattern is useful for complex, hierarchical access requirements.  ABAC uses attributes associated with users, resources, and the environment to make real-time access decisions. This flexibility is particularly advantageous in multi-tenant environments, where tenants may have varying and complex access requirements. For instance, ABAC can evaluate user attributes such as department, role, and security clearance, as well as resource attributes like data sensitivity and classification, and environmental attributes including time of day and IP address. This allows for highly customized access policies that can accommodate the unique needs of each tenant.

# Python Access Library

The following python information is using the SDK located at [https://github.com/storj/access-python]().  Note, this has been tested with Python 3.12.0.  Ensure your environment certs and chains are installed.

Create virtual environment

```
$ python3 -m venv .venv
```

Activate the environment:

```
$ . ./.venv/bin/activate
```

Install the project into the virtual environment as an editable project

```
(.venv) $ python3 -m pip install -e ".[dev,tests]"
```

---

# Python CLI Tool

Once installed, the python access SDK provides a basic cli tool called `access`

## Registration

### Registration for S3 Credentials

```
access register --access <ACCESS_GRANT>
```

### Registration for Linksharing

```
access register --access <ACCESS_GRANT> --public=true
```

## Restriction

```
access restrict --access <ACCESS_GRANT> --readonly true
```

## Other Common Examples

Config with an unrestricted Access Grant credential

```
access restrict --access <ACCESS_GRANT> --readonly=false
```

Create path-prefix specific S3 credential bound to a top-level path prefix representing a tenant

```
access restrict --access <ACCESS_GRANT> --prefix sj://<BUCKET>/<PATH>/
```

Restrict operations: Read/Write/List not Delet

```
uplink access restrict --access <ACCESS_GRANT> --disallow-deletes true
```

---



# Uplink CLI Tool

## Registration

Allows you to register an Access Grant with the S3 gateway, allowing you to get S3 credentials assocated to the provided Access Grant.

### Registration for S3 credentials
```
uplink access register <ACCESS_GRANT>
```

### Registration for linksharing
```
uplink access register --access <ACCESS_GRANT> --public=true
```
## Restriction

Allows you to restrict the permissions an Access Grant has. (e.g. disallow reads, writes, timebox, etc.)

Example:
```
uplink access restrict --access <ACCESS_GRANT> --readonly true
```

## URL Sharing Construction

```
https://link.storjshare.io/s/<PUBLIC_ACCESS_KEY_ID>/<BUCKET>/<OBJECT_KEY>
```

You can also optionally add *?map=1* to the URL to return a graphic map of the nodes serving the object.

### Linksharing Query Parameters

*download* - if value is 1, forces a download of the object

*wrap* - if value is 1, shows the storj sharing frame, if 0, goes directly to data using the browser to render based on MIME type

*map*  - if value is 1, shows only the map.  Note that map=1 must be set for the following parameters to take affect.

*include-stats* - If value is 1, shows data with the map. If 0, hides data

*width* (int) - configures width of map - defaults to 800

*view* - if wrap is not set, this is the opposite of wrap

## Other Common Examples...

Config with an unrestricted Access Grant credential

```
uplink share sj://<BUCKET>/ --readonly=false
```

Create path-prefix specific S3 credential

```
uplink access restrict --access <ACCESS_GRANT> --prefix sj://<BUCKET>/<PATH>/
uplink access register <ACCESS_GRANT>
```

Time bound to 2 weeks

```
uplink access restrict --access <ACCESS_GRANT> --not-after +336h
```

Path bound to single top-level path prefix representing a tenant

```
uplink access restrict --access <ACCESS_GRANT> --prefix sj://<BUCKET>/<PATH>/
```

Restrict operations: Read/Write/List not Delete

```
uplink access restrict --access <ACCESS_GRANT> --disallow-deletes
```

List credentials

```
uplink access list
```

Delete credential

```
uplink access revoke --access <PARENT_ACCESS_GRANT> <ACCESS_GRANT_TO_REVOKE>
```

REST API

Storj provides a set of REST APIs by which you can perform basic operations related to access management. To execute the list and delete commands you must be logged into storj.io.

# Export List of IDs

The following will export your access list including name, 50 at a time. You will need to increment pages 1+ for lists longer than 50. Please note the limit is hard coded on the back end at 50 and changing that figure to greater than 50 will have no effect.

Page 1, items 1-50 & Page, Items 51-100. Continue as needed. pageCount at the end of the command output will tell you the number of pages you have.

```
https://us1.storj.io/api/v0/api-keys/list-paged?projectID={yourprojectid}&limit=50&page=1&order=0&orderDirection=0  
```

```
{
  "apiKeys": [
    {
      "id": "acc0dd0a-786b-46e7-b5e8-6b9c8bfffbb8",
      "projectId": "c4885998-ead0-48db-abe6-ffff8635b453",
      "projectPublicId": "f3452ca7-9d8b-4aa1-9e32-f2ffa0f58bd4",
      "userAgent": null,
      "name": "access1_lab",
      "createdAt": "2023-12-22T21:19:37.48406Z"
    },
    {
      "id": "01c46872-1573-4944-8a0a-54752aff98f1",
      "projectId": "c4885998-ead0-48db-ffe6-ff798635b453",
      "projectPublicId": "f3452ca7-9d8b-4ff1-9e32-f2a9a0f581d4",
      "search": "",
      "limit": 50,
      "order": 0,
      "orderDirection": 0,
      "offset": 0,
      "pageCount": 1,
      "currentPage": 1,
      "totalCount": 1
    }
  ]
}
```

# Delete IDs

Although the listing above is a traditional GET and can be sent through your browser the delete task must be sent as a DELETE. There are various ways to do this including using [Postman](https://www.postman.com/) or a browser plugin like [RESTer](https://chromewebstore.google.com/detail/rester/eejfoncpjfgmeleakejdcanedmefagga?pli=1).

## Sample Command

```
https://us1.storj.io/api/v0/apikeys/delete/acc0dd0a-786b-46e7-b5e8-6b9c8b05fbb8
```

Read more about [](docId:XKib9SzjtEXTXWvdyYWX6).
