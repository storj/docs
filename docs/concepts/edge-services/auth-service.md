---
description: >-
  The Auth Service is one of the Edge Services that enables the Storj
  S3-compatible gateway and Linkshare service to interact with browser-based or
  other cloud-native applications.
---

# Auth Service

### **Overview**

When objects are shared via [the Linksharing service](../../api-reference/linksharing-service.md) or via the [S3-compatible hosted gateway](../../api-reference/s3-compatible-gateway/), an [Access Grant](../../getting-started/satellite-developer-account/access-grants.md) is automatically registered with the [Auth Service](auth-service.md). The Access Grant used in conjunction with the edge services does contain encryption information for the objects that are within the scope of the Access Grant. Access Grants registered with the Auth Service are encrypted with an encryption key that is not stored or persisted by any Storj Service. The encryption key used to encrypt the Access Grants are held by the user or the user's application.

In all cases, the encryption key used to encrypt the Access Grants registered with the Auth Service is managed in the same way and treated the same way by the code. There are three different ways the users and applications interact with the Auth Service:

* **Object Browser** - users must enter their encryption passphrase that derives the appropriate encryption keys each time they access the Object Browser in the Satellite Admin Console.
* **Hosted S3 Gateway** - the encryption key used to encrypt the Access Grant is the Access Key in the S3 credentials generated from registering the Access Grant.
* **Linkshare Service** - the encryption key used to encrypt the Access Grant is embedded in the URL. Note that in the case of Access Keys specifically registered for the linksharing service, the Access Key does not require a Secret Key for authorization and use.

{% hint style="info" %}
**Note:** The encryption information generated for use in conjunction with the Linksharing Service or S3-compatible gateway credentials follows the same hierarchically deterministic derived method as all [Access Grants](../../getting-started/satellite-developer-account/access-grants.md) and the [encryption information](../access/encryption-and-keys/) is limited in scope to the level of access provided at the path-key or object-key as defined in the access Grant.\
\
All of the Edge Services use [server-side encryption](../encryption-key/design-decision-server-side-encryption.md).&#x20;
{% endhint %}

### **Secure Handling of Encryption Information**

Where customers elect to utilize server-side encryption in conjunction with Storj Edge Services, Storj Edge Services only hold customer encryption information during the duration of an operation but not longer. Such customer encryption information is stored encrypted at rest. This data is encrypted with a key given to the user that Storj does not keep. Without an encryption key, no one, including Storj, can access customer encrypted information. The user must provide this key as part of their operation authentication.

### **Registering an Access Grant**

Access Grants are registered with the Auth Service either via [the Object Browser](../../getting-started/quickstart-objectbrowser.md) in the Satellite Admin Console or via the CLI. The CLI may be used to [generate Linkshare links](../../api-reference/uplink-cli/share-command.md#link-sharing) or [S3-compatible gateway credentials](../../api-reference/uplink-cli/share-command.md#register-with-gateway-mt).\
