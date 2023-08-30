---
title: Access Restrictions
docId: BvM5lT5lXn3A7BNqs__1w
redirects:
  - /dcs/concepts/access/access-grants/api-key/restriction
metadata:
  title: Understanding Access Restrictions and Caveats
  description:
    Details about encoding access restrictions into the API Key with Caveats,
    including operations, bucket access, path restrictions, as well as time window
    limitations. Additional information on the role of Access Grants for object retrieval,
    sharing read access, and uplink client actions.
---

Access restrictions are encoded into the API Key inside of an Access Grant via Caveats.

## Granular Access Control with Caveats

Access restrictions are encoded into the API Key within and Access Grant automatically when creating an Access Grant via the Satellite Admin Console, via the CLI, or libuplink library, when using the Share command. While the possibilities for access controls that can be encoded in a Caveat are virtually unlimited, the specific Caveats supported on Storj DCS today are as follows:

Specific Operations: Caveats can restrict whether an Access Grant can permit any of the following operations:

- Read

- Write

- Delete

- List

**Bucket:** Caveats can restrict whether an Access Grant can permit operations on one or more Buckets.

**Path and path prefix:** Caveats can restrict whether an Access Grant can permit operations on Objects within a specific path in the object hierarchy.

**Time Window:** Caveats can restrict when an Access Grant can permit operations on objects stored on the platform (before or after a date and time or a range of time between two dates/times.

The [code related to the supported Caveats](https://github.com/storj/common/blob/main/macaroon/apikey.go) on the Satellite is available for review on GitHub.When an Access Grant is created to share access to an object, it creates an Access Grant because the object will need to be retrieved using the API Key in the Access Grant and decrypted using the encryption key.

When an Uplink Client makes a request to a Satellite to perform an action on an object, the Satellite will evaluate the validity of the Access Grant and allow the action if the Access Grant is valid for the action and object.

In the case of sharing read access to an object, the Access Grant is used to allow an Uplink Client to download the pieces of a file and re-encode the pieces into a complete file, but the Uplink Client must also be able to decrypt the encrypted file for file sharing to be actually useful.&#x20;
