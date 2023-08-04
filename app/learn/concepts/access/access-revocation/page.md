---
title: Access Revocation
docId: k-qsdTq8rYcpbfhWIFLeR
redirects:
  - /dcs/concepts/access/access-revocation
---

Storj DCS provides an easy way to revoke client-side delegated authorization with hierarchically deterministic API keys

While delegated authorization and the ability to generate Access Grants at the edge provides the opportunity to create more private and secure applications, there are design considerations to take into account when building applications with data sharing capabilities based on long-lived bearer tokens.

While it is possible to create Access Grants with time-based restrictions and to required Access Grants be refreshed as they expire, applications must be able to revoke access to data. Access grant revocation is supported on Storj DCS in two ways:

1.  Deleting a primary Access Grant - from the Satellite Admin Console, it is possible to delete a primary Access Grant. Deleting a primary Access Grant also immediately invalidates all child Restricted Access Grants derived from that primary Access Grant.

2.  Adding an Access Grant to the Revocation service - by adding an Access Grant to the authorization revocation service, only the API Key associated with that Access Grant is revoked (along with any child Restricted Access Grants further derived from that Access Grant). This can be done via the CLI.

Imagine the case where you have used a primary Access Grant to create dozens of child Restricted Access Grants. Deleting the primary Access Grant immediately invalidates all of the Access Grants derived from that primary Access Grant. Conversely, adding one of the child Restricted Access Grants to the Access Revocation service invalidates only that Access Grant and any child Restricted Access Grants derived from it. Deleting a Primary Access Key has the same effect as adding it to the Access Revocation service.

The main differences is that primary Access Grants are created from the Satellite Admin Console and therefore the Satellite is aware that the associated API Key was created. The Satellite has no way to know if further child Restricted Access Grants were created client side. While this makes for much more private application sharing, it does require that the associated Access Grants be managed appropriately.
