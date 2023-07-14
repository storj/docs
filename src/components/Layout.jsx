import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import { Logo, Logomark } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'

export const navigation = [
  {
    "title": "Backups",
    "type": "backups",
    "links": [
      {
        "title": "Backups",
        "href": "/dcs/backups"
      }
    ]
  },
  {
    "title": "Billing",
    "type": "billing",
    "links": [
      {
        "title": "Billing",
        "href": "/dcs/billing"
      }
    ]
  },
  {
    "title": "Buckets",
    "type": "buckets",
    "links": [
      {
        "title": "Buckets",
        "href": "/dcs/buckets"
      }
    ]
  },
  {
    "title": "Dashboard",
    "type": "dashboard",
    "links": [
      {
        "title": "Dashboard",
        "href": "/dcs/dashboard"
      }
    ]
  },
  {
    "title": "Filezilla",
    "type": "filezilla",
    "links": [
      {
        "title": "FileZilla",
        "href": "/dcs/filezilla"
      }
    ]
  },
  {
    "title": "How Tos",
    "type": "how-tos",
    "links": [
      {
        "title": "Overview",
        "href": "/dcs/how-tos"
      },
      {
        "title": "Acronis",
        "href": "/dcs/how-tos/acronis-integration-guide"
      },
      {
        "title": "Arq",
        "href": "/dcs/how-tos/arq-integration-guide"
      },
      {
        "title": "Atempo (Miria)",
        "href": "/dcs/how-tos/atempo-miria-integration"
      },
      {
        "title": "Duplicati",
        "href": "/dcs/how-tos/backup-with-duplicati"
      },
      {
        "title": "Restic",
        "href": "/dcs/how-tos/backup-with-restic"
      },
      {
        "title": "HashBackup",
        "href": "/dcs/how-tos/backups-with-hashbackup"
      },
      {
        "title": "Tools for the Partner Program",
        "href": "/dcs/how-tos/configure-tools-for-the-partner-program"
      },
      {
        "title": "Rucio",
        "href": "/dcs/how-tos/configuring-rucio-with-storj"
      },
      {
        "title": "Docker Container Registry",
        "href": "/dcs/how-tos/container-registry-docker"
      },
      {
        "title": "Create and host Chainstate Snapshots",
        "href": "/dcs/how-tos/create-and-host-chainstate-snapshots"
      },
      {
        "title": "Dataverse",
        "href": "/dcs/how-tos/dataverse-integration-guide"
      },
      {
        "title": "Elements",
        "href": "/dcs/how-tos/elements-integration-guide"
      },
      {
        "title": "Fastly",
        "href": "/dcs/how-tos/fastly-integration"
      },
      {
        "title": "FileZilla Pro Integration",
        "href": "/dcs/how-tos/filezilla-pro-integration-guide"
      },
      {
        "title": "Hammerspace",
        "href": "/dcs/how-tos/hammerspace-integration-guide"
      },
      {
        "title": "How to backup your WordPress site with UpdraftPlus to Storj DCS",
        "href": "/dcs/how-tos/how-to-backup-your-wordpress-site-with-updraftplus-to-storj-dcs"
      },
      {
        "title": "s3fs",
        "href": "/dcs/how-tos/how-to-connect-s3fs-to-storj-dcs"
      },
      {
        "title": "How to Fine-tune File Transfer Performance on Storj DCS",
        "href": "/dcs/how-tos/how-to-hod-rod-file-transfer-performance-on-storj-dcs"
      },
      {
        "title": "Video analytics and management with Kerberos Vault",
        "href": "/dcs/how-tos/how-to-set-up-video-analytics-and-video-management-with-kerberos-vault"
      },
      {
        "title": "Cyberduck",
        "href": "/dcs/how-tos/how-to-use-cyberduck-and-storj-dcs"
      },
      {
        "title": "Plex and Storj DCS as a private streaming service",
        "href": "/dcs/how-tos/how-to-use-plex-and-storj-dcs-as-a-private-streaming-service"
      },
      {
        "title": "Hugging Face",
        "href": "/dcs/how-tos/hugging-face"
      },
      {
        "title": "TrueNAS - iX Systems",
        "href": "/dcs/how-tos/ix-systems-truenas-integration"
      },
      {
        "title": "Kubernetes Backup via Velero",
        "href": "/dcs/how-tos/kubernetes-backup-via-velero"
      },
      {
        "title": "LucidLink Filespace",
        "href": "/dcs/how-tos/lucidlink-filespace-integration"
      },
      {
        "title": "MongoDB Ops Manager",
        "href": "/dcs/how-tos/mongodb-ops-manager-backup"
      },
      {
        "title": "MSP360",
        "href": "/dcs/how-tos/msp360-integration-guide"
      },
      {
        "title": "NFT storage for OpenSea",
        "href": "/dcs/how-tos/nft-storage"
      },
      {
        "title": "Photos+",
        "href": "/dcs/how-tos/photos-plus-integration-guide"
      },
      {
        "title": "Presigned URLs in the serverless cloud",
        "href": "/dcs/how-tos/presigned-urls-in-the-serverless-cloud"
      },
      {
        "title": "Rails Active Storage",
        "href": "/dcs/how-tos/rails-activestorage"
      },
      {
        "title": "FileZilla Native Integration",
        "href": "/dcs/how-tos/set-up-filezilla-for-decentralized-file-transfer"
      },
      {
        "title": "S3 Browser",
        "href": "/dcs/how-tos/simplify-file-management-with-s3-browser-and-storj-dcs"
      },
      {
        "title": "Splunk",
        "href": "/dcs/how-tos/splunk-integration-guide"
      },
      {
        "title": "Store Tesla Sentry Mode & Dashcam videos on Storj DCS",
        "href": "/dcs/how-tos/tesla-sentry-mode-teslausb"
      },
      {
        "title": "Unitrends",
        "href": "/dcs/how-tos/unitrends-integration-guide"
      },
      {
        "title": "Veeam",
        "href": "/dcs/how-tos/veeam-integration-guide"
      },
      {
        "title": "Workshop - Global Video Content Delivery with Storj and Livepeer",
        "href": "/dcs/how-tos/video-content-delivery-with-storj-and-livepeer"
      },
      {
        "title": "Zerto",
        "href": "/dcs/how-tos/zerto-integration-guide"
      },
      {
        "title": "Host a Static Website with the Uplink CLI and Linksharing Service",
        "href": "/dcs/how-tos/host-a-static-website/host-a-static-website-with-the-cli-and-linksharing-service"
      },
      {
        "title": "Rclone",
        "href": "/dcs/how-tos/sync-files-with-rclone/index"
      },
      {
        "title": "Rclone Hosted Gateway",
        "href": "/dcs/how-tos/sync-files-with-rclone/rclone-with-hosted-gateway"
      },
      {
        "title": "Rclone Native Integration",
        "href": "/dcs/how-tos/sync-files-with-rclone/rclone-with-native-integration"
      }
    ]
  },
  {
    "title": "Iconik Integration",
    "type": "iconik-integration",
    "links": [
      {
        "title": "Iconik",
        "href": "/dcs/iconik-integration"
      }
    ]
  },
  {
    "title": "Immutability",
    "type": "immutability",
    "links": [
      {
        "title": "Immutability",
        "href": "/dcs/immutability"
      }
    ]
  },
  {
    "title": "Mastodon",
    "type": "mastodon",
    "links": [
      {
        "title": "Mastodon",
        "href": "/dcs/mastodon"
      }
    ]
  },
  {
    "title": "Nextcloud With Storj Dcs",
    "type": "nextcloud-with-storj-dcs",
    "links": [
      {
        "title": "Nextcloud with Storj DCS",
        "href": "/dcs/nextcloud-with-storj-dcs"
      }
    ]
  },
  {
    "title": "Pixelfed",
    "type": "pixelfed",
    "links": [
      {
        "title": "PixelFed",
        "href": "/dcs/pixelfed"
      }
    ]
  },
  {
    "title": "Projects",
    "type": "projects",
    "links": [
      {
        "title": "Projects",
        "href": "/dcs/projects"
      }
    ]
  },
  {
    "title": "Users",
    "type": "users",
    "links": [
      {
        "title": "Users",
        "href": "/dcs/users"
      }
    ]
  },
  {
    "title": "Api Reference",
    "type": "api-reference",
    "links": [
      {
        "title": "Linksharing Service",
        "href": "/dcs/api-reference/linksharing-service"
      },
      {
        "title": "Self-hosted S3 Compatible Gateway",
        "href": "/dcs/api-reference/s3-gateway"
      },
      {
        "title": "Storj Client Libraries",
        "href": "/dcs/api-reference/storj-client-libraries"
      },
      {
        "title": "Uplink CLI",
        "href": "/dcs/api-reference/uplink-cli"
      },
      {
        "title": "Storj-hosted S3 Compatible Gateway",
        "href": "/dcs/api-reference/s3-compatible-gateway/index"
      },
      {
        "title": "Multipart Upload",
        "href": "/dcs/api-reference/s3-compatible-gateway/multipart-upload"
      },
      {
        "title": "Supported S3 Commands",
        "href": "/dcs/api-reference/s3-compatible-gateway/supported-s3-commands"
      },
      {
        "title": "Using presigned URLs",
        "href": "/dcs/api-reference/s3-compatible-gateway/using-presigned-urls"
      },
      {
        "title": "Gateway ST Advanced Usage",
        "href": "/dcs/api-reference/s3-gateway/gateway-st-advanced-usage"
      },
      {
        "title": "cp",
        "href": "/dcs/api-reference/uplink-cli/cp-command"
      },
      {
        "title": "import",
        "href": "/dcs/api-reference/uplink-cli/import-command"
      },
      {
        "title": "ls",
        "href": "/dcs/api-reference/uplink-cli/ls-command"
      },
      {
        "title": "mv",
        "href": "/dcs/api-reference/uplink-cli/mv"
      },
      {
        "title": "rb",
        "href": "/dcs/api-reference/uplink-cli/rb-command"
      },
      {
        "title": "rm",
        "href": "/dcs/api-reference/uplink-cli/rm-command"
      },
      {
        "title": "setup",
        "href": "/dcs/api-reference/uplink-cli/setup-command"
      },
      {
        "title": "share",
        "href": "/dcs/api-reference/uplink-cli/share-command"
      },
      {
        "title": "mb",
        "href": "/dcs/api-reference/uplink-cli/uplink-mb-command"
      },
      {
        "title": "Multipart Part Size",
        "href": "/dcs/api-reference/s3-compatible-gateway/multipart-upload/multipart-part-size"
      },
      {
        "title": "access create",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-create"
      },
      {
        "title": "access export",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-export"
      },
      {
        "title": "access import",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-import"
      },
      {
        "title": "access inspect",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-inspect-command"
      },
      {
        "title": "access list",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-list-command"
      },
      {
        "title": "access register",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-register"
      },
      {
        "title": "access remove",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-remove"
      },
      {
        "title": "access restrict",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-restrict"
      },
      {
        "title": "access revoke",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-revoke"
      },
      {
        "title": "access use",
        "href": "/dcs/api-reference/uplink-cli/access-command/access-use"
      },
      {
        "title": "meta",
        "href": "/dcs/api-reference/uplink-cli/meta-command/index"
      },
      {
        "title": "meta get",
        "href": "/dcs/api-reference/uplink-cli/meta-command/meta-get-command"
      }
    ]
  },
  {
    "title": "Billing Payment And Accounts 1",
    "type": "billing-payment-and-accounts-1",
    "links": [
      {
        "title": "Closing an Account",
        "href": "/dcs/billing-payment-and-accounts-1/closing-an-account"
      },
      {
        "title": "Data Retention Policy",
        "href": "/dcs/billing-payment-and-accounts-1/data-retention-policy"
      },
      {
        "title": "Requesting a Refund",
        "href": "/dcs/billing-payment-and-accounts-1/requesting-a-refund"
      },
      {
        "title": "How Billing is Calculated",
        "href": "/dcs/billing-payment-and-accounts-1/pricing/billing-and-payment"
      },
      {
        "title": "Free Plan",
        "href": "/dcs/billing-payment-and-accounts-1/pricing/free-tier"
      },
      {
        "title": "Billing, Payment and Accounts",
        "href": "/dcs/billing-payment-and-accounts-1/pricing/index"
      },
      {
        "title": "Usage Limit Increases",
        "href": "/dcs/billing-payment-and-accounts-1/pricing/usage-limit-increases"
      },
      {
        "title": "Changing Payment Methods",
        "href": "/dcs/billing-payment-and-accounts-1/storj-token/changing-payment-methods"
      },
      {
        "title": "Debits Against Payment Methods",
        "href": "/dcs/billing-payment-and-accounts-1/storj-token/debits-against-payment-methods"
      },
      {
        "title": "Deleting a Payment Method",
        "href": "/dcs/billing-payment-and-accounts-1/storj-token/deleting-a-payment-method"
      },
      {
        "title": "Expired Credit Card",
        "href": "/dcs/billing-payment-and-accounts-1/storj-token/expired-credit-card"
      },
      {
        "title": "Payment Methods",
        "href": "/dcs/billing-payment-and-accounts-1/storj-token/index"
      },
      {
        "title": "Promotional Credits",
        "href": "/dcs/billing-payment-and-accounts-1/storj-token/promotional-credits"
      },
      {
        "title": "Reporting a Payment Problem",
        "href": "/dcs/billing-payment-and-accounts-1/storj-token/reporting-a-payment-problem"
      }
    ]
  },
  {
    "title": "Concepts",
    "type": "concepts",
    "links": [
      {
        "title": "Access Management",
        "href": "/dcs/concepts/access"
      },
      {
        "title": "Connectors",
        "href": "/dcs/concepts/connectors"
      },
      {
        "title": "Data Structure",
        "href": "/dcs/concepts/data-structure"
      },
      {
        "title": "Decentralization",
        "href": "/dcs/concepts/decentralization"
      },
      {
        "title": "Definitions",
        "href": "/dcs/concepts/definitions"
      },
      {
        "title": "Edge Services",
        "href": "/dcs/concepts/edge-services"
      },
      {
        "title": "File Redundancy",
        "href": "/dcs/concepts/file-redundancy"
      },
      {
        "title": "File Repair",
        "href": "/dcs/concepts/file-repair"
      },
      {
        "title": "Key Architecture Constructs",
        "href": "/dcs/concepts/key-architecture-constructs"
      },
      {
        "title": "Usage Limits",
        "href": "/dcs/concepts/limits"
      },
      {
        "title": "Multiregion Availability",
        "href": "/dcs/concepts/multiregion-availability"
      },
      {
        "title": "Understanding Storj DCS",
        "href": "/dcs/concepts/overview"
      },
      {
        "title": "S3 Compatibility",
        "href": "/dcs/concepts/s3-compatibility"
      },
      {
        "title": "Satellite (Metadata Region)",
        "href": "/dcs/concepts/satellite"
      },
      {
        "title": "Access Management at the Edge",
        "href": "/dcs/concepts/access/access-management-at-the-edge"
      },
      {
        "title": "Access Revocation",
        "href": "/dcs/concepts/access/access-revocation"
      },
      {
        "title": "Capability Based Access vs Access Control Lists",
        "href": "/dcs/concepts/access/capability-based-access-control"
      },
      {
        "title": "Coordination Avoidance",
        "href": "/dcs/concepts/decentralization/coordination-avoidance"
      },
      {
        "title": "Auth Service",
        "href": "/dcs/concepts/edge-services/auth-service"
      },
      {
        "title": "\"Design Decision: End-to-end Encryption\"",
        "href": "/dcs/concepts/encryption-key/design-decision-end-to-end-encryption"
      },
      {
        "title": "\"Design Decision: Server-side Encryption\"",
        "href": "/dcs/concepts/encryption-key/design-decision-server-side-encryption"
      },
      {
        "title": "How Encryption is Implemented",
        "href": "/dcs/concepts/encryption-key/how-encryption-is-implemented"
      },
      {
        "title": "Encryption",
        "href": "/dcs/concepts/encryption-key/index"
      },
      {
        "title": "API Key",
        "href": "/dcs/concepts/access/access-grants/api-key"
      },
      {
        "title": "Access Grants",
        "href": "/dcs/concepts/access/access-grants/index"
      },
      {
        "title": "When to use the Satellite Web Interface and When to use the CLI",
        "href": "/dcs/concepts/access/access-grants/when-to-use-the-satellite-web-interface-and-when-to-use-the-cli"
      },
      {
        "title": "Encryption Keys",
        "href": "/dcs/concepts/access/encryption-and-keys/index"
      },
      {
        "title": "Key Management",
        "href": "/dcs/concepts/access/encryption-and-keys/key-management"
      },
      {
        "title": "When to use different encryption keys",
        "href": "/dcs/concepts/access/encryption-and-keys/when-to-use-different-encryption-keys"
      },
      {
        "title": "Access Restrictions",
        "href": "/dcs/concepts/access/access-grants/api-key/restriction"
      }
    ]
  },
  {
    "title": "Downloads",
    "type": "downloads",
    "links": [
      {
        "title": "Download Self-hosted S3 Compatible Gateway",
        "href": "/dcs/downloads/download-self-hosted-s3-compatible-gateway"
      },
      {
        "title": "Download Storj Client Libraries",
        "href": "/dcs/downloads/download-storj-client-libraries"
      },
      {
        "title": "Download Uplink CLI",
        "href": "/dcs/downloads/download-uplink-cli"
      }
    ]
  },
  {
    "title": "Getting Started",
    "type": "getting-started",
    "links": [
      {
        "title": "Getting Started",
        "href": "/dcs/getting-started/index"
      },
      {
        "title": "AWS SDK and Hosted Gateway MT",
        "href": "/dcs/getting-started/quickstart-aws-sdk-and-hosted-gateway-mt"
      },
      {
        "title": "Object Browser",
        "href": "/dcs/getting-started/quickstart-objectbrowser"
      },
      {
        "title": "Satellite Admin Console",
        "href": "/dcs/getting-started/satellite-developer-account"
      },
      {
        "title": "AWS CLI Advanced Options",
        "href": "/dcs/getting-started/gateway-mt/aws-cli-advanced-options"
      },
      {
        "title": "AWS CLI and Hosted Gateway MT",
        "href": "/dcs/getting-started/gateway-mt/index"
      },
      {
        "title": "Interacting With Your First Object CLI",
        "href": "/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object"
      },
      {
        "title": "Uploading Your First Object CLI",
        "href": "/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object"
      },
      {
        "title": "Creating Your Account",
        "href": "/dcs/getting-started/satellite-developer-account/creating-your-account"
      },
      {
        "title": "Manage Projects",
        "href": "/dcs/getting-started/satellite-developer-account/manage-projects"
      },
      {
        "title": "My Account",
        "href": "/dcs/getting-started/satellite-developer-account/my-account"
      },
      {
        "title": "Quick Start",
        "href": "/dcs/getting-started/satellite-developer-account/quick-start"
      },
      {
        "title": "Resources",
        "href": "/dcs/getting-started/satellite-developer-account/resources"
      },
      {
        "title": "Create Access Grant in CLI",
        "href": "/dcs/getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token"
      },
      {
        "title": "Advanced Usage",
        "href": "/dcs/getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/index"
      },
      {
        "title": "Delete an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object/delete-an-object"
      },
      {
        "title": "Download an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object/download-an-object"
      },
      {
        "title": "List an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object/list-an-object"
      },
      {
        "title": "Create an Access to an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/generate-access"
      },
      {
        "title": "Import an Access to an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/import-access"
      },
      {
        "title": "Sharing Your First Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/index"
      },
      {
        "title": "Prerequisites",
        "href": "/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/prerequisites"
      },
      {
        "title": "Revoke an Access to an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/revoke-an-access-to-an-object"
      },
      {
        "title": "Create a Bucket",
        "href": "/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-a-bucket"
      },
      {
        "title": "Create an Access Grant",
        "href": "/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant"
      },
      {
        "title": "Set Up Uplink CLI with Access Grant",
        "href": "/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/set-up-uplink-cli"
      },
      {
        "title": "Upload an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/upload-an-object"
      },
      {
        "title": "View Distribution of an Object",
        "href": "/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/view-distribution-of-an-object"
      }
    ]
  },
  {
    "title": "Solution Architectures",
    "type": "solution-architectures",
    "links": [
      {
        "title": "Common Architectural Pattern",
        "href": "/dcs/solution-architectures/common-architectural-patterns"
      },
      {
        "title": "Common Use Cases",
        "href": "/dcs/solution-architectures/common-use-cases"
      }
    ]
  },
  {
    "title": "Storage",
    "type": "storage",
    "links": [
      {
        "title": "Product Overview",
        "href": "/dcs/storage/considerations"
      }
    ]
  },
  {
    "title": "Support",
    "type": "support",
    "links": [
      {
        "title": "FAQ",
        "href": "/dcs/support/faqs"
      },
      {
        "title": "Support Overview",
        "href": "/dcs/support/support-process-overview"
      }
    ]
  }
]


function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="flex mr-6 lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex items-center flex-grow basis-0">
        <Link href="/" aria-label="Home page">
          <Logomark className="h-9 w-9 lg:hidden" />
          <Logo className="hidden w-auto h-9 fill-slate-700 dark:fill-sky-100 lg:block" />
        </Link>
      </div>
      <div className="mr-6 -my-5 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex justify-end basis-0 gap-6 sm:gap-8 md:flex-grow">
        <ThemeSelector className="relative z-10" />
        <Link href="https://github.com" className="group" aria-label="GitHub">
          <GitHubIcon className="w-6 h-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      </div>
    </header>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function Layout({ children, title, tableOfContents }) {
  let router = useRouter()
  let isHomePage = router.pathname === '/'
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <>
      <Header navigation={navigation} />

      {isHomePage && <Hero />}

      <div className="relative flex justify-center mx-auto max-w-8xl sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute bottom-0 right-0 hidden w-px h-12 top-16 bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute bottom-0 right-0 hidden w-px top-28 bg-slate-800 dark:block" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
            <Navigation navigation={navigation} />
          </div>
        </div>
        <div className="flex-auto max-w-2xl min-w-0 px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="text-sm font-medium font-display text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="text-3xl tracking-tight font-display text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="flex pt-6 mt-12 border-t border-slate-200 dark:border-slate-800">
            {previousPage && (
              <div>
                <dt className="text-sm font-medium font-display text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="text-sm font-medium font-display text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="text-sm font-medium font-display text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 text-sm space-y-3">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-sky-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="pl-5 mt-2 space-y-3 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-sky-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
