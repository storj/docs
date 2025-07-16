{% callout type="warning" %}
**Governance Mode Override Permissions**

By default, the account owner and any user with default project access have Governance Mode override permissions due to Storj's macaroon-based access system, which restricts capabilities rather than explicitly granting permissions. 

To avoid unintentionally granting Governance Mode override permissions, use S3 credentials that explicitly restrict this capability for any operations involving Object Lock.

Note: Storj does not currently support role-based access controls (RBAC) for default restrictions by roles. This functionality may be added in the future.
{% /callout %}
