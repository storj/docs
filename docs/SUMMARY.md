# Table of contents

* [Introduction](README.md)
* [Node Docs](http://docs.storj.io/node/)

## Decentralized Cloud Storage <a href="storage" id="storage"></a>

* [Product Overview](storage/considerations.md)

## downloads

* [Download Uplink CLI](downloads/download-uplink-cli.md)
* [Download Self-hosted S3 Compatible Gateway](downloads/download-self-hosted-s3-compatible-gateway.md)
* [Download Storj Client Libraries](downloads/download-storj-client-libraries.md)

## Getting Started

* [Quickstart Guide](getting-started/quickstart-guide.md)
* [Quickstart - Object Browser](getting-started/quickstart-objectbrowser.md)
* [Quickstart - AWS CLI and Hosted Gateway MT](getting-started/gateway-mt/README.md)
  * [AWS CLI Advanced Options](getting-started/gateway-mt/aws-cli-advanced-options.md)
* [Quickstart - AWS SDK and Hosted Gateway MT](getting-started/quickstart-aws-sdk-and-hosted-gateway-mt.md)
* [Quickstart - Uplink CLI](getting-started/quickstart-uplink-cli/README.md)
  * [Prerequisites](getting-started/quickstart-uplink-cli/prerequisites.md)
  * [Uploading Your First Object CLI](getting-started/quickstart-uplink-cli/uploading-your-first-object/README.md)
    * [Create an Access Grant](getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant.md)
    * [Set Up Uplink CLI with Access Grant](getting-started/quickstart-uplink-cli/uploading-your-first-object/set-up-uplink-cli.md)
    * [Create a Bucket](getting-started/quickstart-uplink-cli/uploading-your-first-object/create-a-bucket.md)
    * [Upload an Object](getting-started/quickstart-uplink-cli/uploading-your-first-object/upload-an-object.md)
    * [View Distribution of an Object](getting-started/quickstart-uplink-cli/uploading-your-first-object/view-distribution-of-an-object.md)
  * [Interacting With Your First Object CLI](getting-started/quickstart-uplink-cli/interacting-with-your-first-object/README.md)
    * [List an Object](getting-started/quickstart-uplink-cli/interacting-with-your-first-object/list-an-object.md)
    * [Download an Object](getting-started/quickstart-uplink-cli/interacting-with-your-first-object/download-an-object.md)
    * [Delete an Object](getting-started/quickstart-uplink-cli/interacting-with-your-first-object/delete-an-object.md)
  * [Sharing Your First Object](getting-started/quickstart-uplink-cli/sharing-your-first-object/README.md)
    * [Prerequisites](getting-started/quickstart-uplink-cli/sharing-your-first-object/prerequisites.md)
    * [Create an Access to an Object](getting-started/quickstart-uplink-cli/sharing-your-first-object/generate-access.md)
    * [Import an Access to an Object](getting-started/quickstart-uplink-cli/sharing-your-first-object/import-access.md)
    * [Revoke an Access to an Object](getting-started/quickstart-uplink-cli/sharing-your-first-object/revoke-an-access-to-an-object.md)
  * [Advanced Usage](getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/README.md)
    * [Create Access Grant in CLI](getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md)
* [Quickstart - Satellite Admin Console](getting-started/satellite-developer-account/README.md)
  * [Creating Your Account](getting-started/satellite-developer-account/creating-your-account.md)
  * [Project Dashboard](getting-started/satellite-developer-account/dashboard.md)
  * [Objects](getting-started/satellite-developer-account/objects.md)
  * [Access Grants](getting-started/satellite-developer-account/access-grants.md)
  * [Users](getting-started/satellite-developer-account/users.md)

## SDK & Reference <a href="api-reference" id="api-reference"></a>

* [Storj-hosted S3 Compatible Gateway](api-reference/s3-compatible-gateway/README.md)
  * [Multipart Upload](api-reference/s3-compatible-gateway/multipart-upload/README.md)
    * [Multipart Part Size](api-reference/s3-compatible-gateway/multipart-upload/multipart-part-size.md)
  * [Using presigned URLs](api-reference/s3-compatible-gateway/using-presigned-urls.md)
  * [Supported S3 Commands](api-reference/s3-compatible-gateway/supported-s3-commands.md)
* [Uplink CLI](api-reference/uplink-cli/README.md)
  * [access](api-reference/uplink-cli/access-command/README.md)
    * [access inspect](api-reference/uplink-cli/access-command/access-inspect-command.md)
    * [access list](api-reference/uplink-cli/access-command/access-list-command.md)
    * [access register](api-reference/uplink-cli/access-command/access-register.md)
  * [cat](api-reference/uplink-cli/cat-command.md)
  * [cp](api-reference/uplink-cli/cp-command.md)
  * [help](api-reference/uplink-cli/help-command.md)
  * [import](api-reference/uplink-cli/import-command.md)
  * [ls](api-reference/uplink-cli/ls-command.md)
  * [mb](api-reference/uplink-cli/uplink-mb-command.md)
  * [meta](api-reference/uplink-cli/meta-command/README.md)
    * [meta get](api-reference/uplink-cli/meta-command/meta-get-command.md)
  * [mv](api-reference/uplink-cli/mv.md)
  * [put](api-reference/uplink-cli/put-command.md)
  * [rb](api-reference/uplink-cli/rb-command.md)
  * [revoke](api-reference/uplink-cli/revoke.md)
  * [rm](api-reference/uplink-cli/rm-command.md)
  * [setup](api-reference/uplink-cli/setup-command.md)
  * [share](api-reference/uplink-cli/share-command.md)
* [Self-hosted S3 Compatible Gateway](api-reference/s3-gateway/README.md)
  * [Gateway ST Advanced Usage](api-reference/s3-gateway/gateway-st-advanced-usage.md)
* [Linksharing Service](api-reference/linksharing-service.md)
* [Storj Client Libraries](api-reference/storj-client-libraries/README.md)
  * [Go](https://github.com/storj/uplink)
  * [C](https://github.com/storj/uplink-c)
  * [Android](https://github.com/storj/uplink-android)
  * [Java](https://github.com/storj/uplink-java)
  * [uplink-nodejs](https://www.npmjs.com/package/uplink-nodejs)
  * [Nodejs](https://www.npmjs.com/package/uplink-nodejs)

## How To's

* [Container Registry - Docker](how-tos/container-registry-docker.md)
* [Host a Static Website](how-tos/host-a-static-website/README.md)
  * [Host a Static Website with the Uplink CLI and Linksharing Service](how-tos/host-a-static-website/host-a-static-website-with-the-cli-and-linksharing-service.md)
* [Configure Tools for the Partner Program](how-tos/configure-tools-for-the-partner-program.md)
* [Configure Storj DCS as Origin for Fastly Edge](https://docs.fastly.com/en/guides/tardigrade-decentralized-object-cloud-storage)
* [Configure Filebase for easy upload](https://filebase.com)
* [Backup With Duplicati](how-tos/backup-with-duplicati.md)
* [NFT storage for OpenSea](how-tos/nft-storage.md)
* [Sync Files With Rclone](how-tos/sync-files-with-rclone/README.md)
  * [Rclone with Native Integration](how-tos/sync-files-with-rclone/rclone-with-native-integration.md)
  * [Rclone with Hosted Gateway](how-tos/sync-files-with-rclone/rclone-with-hosted-gateway.md)
* [Backup With Restic](how-tos/backup-with-restic.md)
* [FileZilla Native Integration](how-tos/set-up-filezilla-for-decentralized-file-transfer.md)
* [Kubernetes Backup via Velero](how-tos/kubernetes-backup-via-velero.md)
* [MongoDB Ops Manager Backup](how-tos/mongodb-ops-manager-backup.md)
* [Store Tesla Sentry Mode & Dashcam videos on Storj DCS](how-tos/tesla-sentry-mode-teslausb.md)
* [How to connect s3fs to Storj DCS](how-tos/how-to-connect-s3fs-to-storj-dcs.md)

## Solution Architectures

* [Common Use Cases](solution-architectures/common-use-cases.md)
* [Common Architectural Patterns](solution-architectures/common-architectural-patterns.md)

## Concepts

* [Understanding Storj DCS](concepts/overview.md)
* [Definitions](concepts/definitions.md)
* [Key Architecture Constructs](concepts/key-architecture-constructs.md)
* [Access Management](concepts/access/README.md)
  * [Access Grants](concepts/access/access-grants/README.md)
    * [API Key](concepts/access/access-grants/api-key/README.md)
      * [Access Restrictions](concepts/access/access-grants/api-key/restriction.md)
    * [When to use the Satellite Web Interface and When to use the CLI](concepts/access/access-grants/when-to-use-the-satellite-web-interface-and-when-to-use-the-cli.md)
  * [Encryption Keys](concepts/access/encryption-and-keys/README.md)
    * [Key Management](concepts/access/encryption-and-keys/key-management.md)
    * [When to use different encryption keys](concepts/access/encryption-and-keys/when-to-use-different-encryption-keys.md)
  * [Access Revocation](concepts/access/access-revocation.md)
  * [Capability Based Access vs Access Control Lists](concepts/access/capability-based-access-control.md)
  * [Access Management at the Edge](concepts/access/access-management-at-the-edge.md)
* [Edge Services](concepts/edge-services/README.md)
  * [Auth Service](concepts/edge-services/auth-service.md)
* [Connectors](concepts/connectors.md)
* [Data Structure](concepts/data-structure.md)
* [Encryption](concepts/encryption-key/README.md)
  * [How Encryption is Implemented](concepts/encryption-key/how-encryption-is-implemented.md)
  * [Design Decision: End-to-end Encryption](concepts/encryption-key/design-decision-end-to-end-encryption.md)
  * [Design Decision: Server-side Encryption](concepts/encryption-key/design-decision-server-side-encryption.md)
* [Decentralization](concepts/decentralization/README.md)
  * [Coordination Avoidance](concepts/decentralization/coordination-avoidance.md)
* [File Redundancy](concepts/file-redundancy.md)
* [File Repair](concepts/file-repair.md)
* [Multiregion Availability](concepts/multiregion-availability.md)
* [Usage Limits](concepts/limits.md)
* [Satellite (Metadata Region)](concepts/satellite.md)
* [S3 Compatibility](concepts/s3-compatibility.md)

## Support

* [Support Overview](support/support-process-overview.md)
* [FAQ](support/faqs.md)
* [Status Page](https://status.tardigrade.io)
* [Community Forum](https://forum.storj.io/c/engineer-amas/dev-category)
* [Help Desk](https://support.tardigrade.io)

## Billing, Payment & Accounts <a href="billing-payment-and-accounts-1" id="billing-payment-and-accounts-1"></a>

* [Billing, Payment and Accounts](billing-payment-and-accounts-1/pricing/README.md)
  * [How Billing is Calculated](billing-payment-and-accounts-1/pricing/billing-and-payment.md)
  * [Free Plan](billing-payment-and-accounts-1/pricing/free-tier.md)
  * [Usage Limit Increases](billing-payment-and-accounts-1/pricing/usage-limit-increases.md)
* [Payment Methods](billing-payment-and-accounts-1/storj-token/README.md)
  * [Promotional Credits](billing-payment-and-accounts-1/storj-token/promotional-credits.md)
  * [Debits Against Payment Methods](billing-payment-and-accounts-1/storj-token/debits-against-payment-methods.md)
  * [Changing Payment Methods](billing-payment-and-accounts-1/storj-token/changing-payment-methods.md)
  * [Deleting a Payment Method](billing-payment-and-accounts-1/storj-token/deleting-a-payment-method.md)
  * [Expired Credit Card](billing-payment-and-accounts-1/storj-token/expired-credit-card.md)
  * [Reporting a Payment Problem](billing-payment-and-accounts-1/storj-token/reporting-a-payment-problem.md)
* [Requesting a Refund](billing-payment-and-accounts-1/requesting-a-refund.md)
* [Closing an Account](billing-payment-and-accounts-1/closing-an-account.md)
* [Data Retention Policy](billing-payment-and-accounts-1/data-retention-policy.md)

## Resources

***

* [Whitepaper](https://www.storj.io/storjv3.pdf)
