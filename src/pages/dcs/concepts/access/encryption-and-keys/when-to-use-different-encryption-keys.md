---
title: When to use different encryption keys
createdAt: 2022-05-19T22:23:19.000Z
updatedAt: 2023-03-03T08:30:09.000Z
docId: DUfoyppOZA756jGFgj9qw
redirects:
  - >-
    /dcs/concepts/access/encryption-and-keys/when-to-use-different-encryption-keys
---

Each Access Grant includes only one encryption key, but there are use cases  where multiple keys are relevant and useful.

With encryption embedded into Access Grants, it is possible to create multiple Access Grants with the same access authorization but different encryption keys. The default behavior of the Uplink Client is not to display data that the Uplink Client cannot decrypt. It is possible to view the data in it's encrypted state, but it is not possible to derive an encryption key or otherwise reverse engineer an encryption key from an Access Grant with authorization to read data, if that Access Grant does not have an encryption key scoped to the data in question.

In general, the best practice is to use one encryption passphrase per bucket.  If an object with the same path and object name uploaded by two uplinks with encryption keys derived from the same encryption passphrase, the most recent upload will over-write the older object.

If an object with the same path and object name uploaded by two uplinks with encryption keys derived from different encryption passphrases, the objects will be uploaded as two separate objects.

Because encryption keys are hierarchically deterministic, when an Access Grant is used to create a restricted Access Grant that is restricted to a particular path prefix, the encryption key of the child Restricted Access Grant is derived from the parent Access Grant. In this case, the Parent Access Grant could decrypt the data within the path restriction associated with the parent Access Grant and the child Restricted Access Grant, but the encryption key in the child Restricted Access Grant could not be used to decrypt data to which the parent Access Grant might have access but which is outside the scope of the path restriction of the the child Restricted Access Grant.

The only use case for which using different encryption passphrases is common is in the case of a multiuser or multi-tenant application, storing data on behalf of different users or entities. In this case, the default behavior could be used in which is user or tenant within the application would be logically represented as a top-level path within the bucket that corresponds to the application. Each user or tenant within the application would be issued a child Restricted Access Grant scoped to the top level path associated to that user or tenant.&#x20;

The child Restricted Access Grant would allow a user or tenant to interact with object data restricted to their top level path, but not allow access outside of that path. Users or tenants would be unable to view or interact with data associated with peer tenants or users.&#x20;

It is also possible to overwrite the encryption key within a child Restricted Access Grant, allowing users to "choose" their own encryption passphrase. If those users lost access to that passphrase and the associated Access Grant, the data would be unrecoverable.

