const sideNavigation = [
  {
    title: 'Api-reference',
    type: 'api-reference',
    links: [
      {
        title: 'Linksharing Service',
        type: 'linksharing-service',
        links: [],
        href: '/dcs/api-reference/linksharing-service',
      },
      {
        title: 'S3-compatible-gateway',
        type: 's3-compatible-gateway',
        links: [
          {
            title: 'Storj-hosted S3 Compatible Gateway',
            type: 'index',
            links: [],
            href: '/dcs/api-reference/s3-compatible-gateway/index',
          },
          {
            title: 'Multipart Upload',
            type: 'multipart-upload',
            links: [
              {
                title: 'Multipart Part Size',
                type: 'multipart-part-size',
                links: [],
                href: '/dcs/api-reference/s3-compatible-gateway/multipart-upload/multipart-part-size',
              },
            ],
            href: '/dcs/api-reference/s3-compatible-gateway/multipart-upload',
          },
          {
            title: 'Supported S3 Commands',
            type: 'supported-s3-commands',
            links: [],
            href: '/dcs/api-reference/s3-compatible-gateway/supported-s3-commands',
          },
          {
            title: 'Using presigned URLs',
            type: 'using-presigned-urls',
            links: [],
            href: '/dcs/api-reference/s3-compatible-gateway/using-presigned-urls',
          },
        ],
      },
      {
        title: 'Self-hosted S3 Compatible Gateway',
        type: 's3-gateway',
        links: [
          {
            title: 'Gateway ST Advanced Usage',
            type: 'gateway-st-advanced-usage',
            links: [],
            href: '/dcs/api-reference/s3-gateway/gateway-st-advanced-usage',
          },
        ],
        href: '/dcs/api-reference/s3-gateway',
      },
      {
        title: 'Storj Client Libraries',
        type: 'storj-client-libraries',
        links: [],
        href: '/dcs/api-reference/storj-client-libraries',
      },
      {
        title: 'Uplink CLI',
        type: 'uplink-cli',
        links: [
          {
            title: 'Access-command',
            type: 'access-command',
            links: [
              {
                title: 'access create',
                type: 'access-create',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-create',
              },
              {
                title: 'access export',
                type: 'access-export',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-export',
              },
              {
                title: 'access import',
                type: 'access-import',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-import',
              },
              {
                title: 'access inspect',
                type: 'access-inspect-command',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-inspect-command',
              },
              {
                title: 'access list',
                type: 'access-list-command',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-list-command',
              },
              {
                title: 'access register',
                type: 'access-register',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-register',
              },
              {
                title: 'access remove',
                type: 'access-remove',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-remove',
              },
              {
                title: 'access restrict',
                type: 'access-restrict',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-restrict',
              },
              {
                title: 'access revoke',
                type: 'access-revoke',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-revoke',
              },
              {
                title: 'access use',
                type: 'access-use',
                links: [],
                href: '/dcs/api-reference/uplink-cli/access-command/access-use',
              },
            ],
          },
          {
            title: 'cp',
            type: 'cp-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/cp-command',
          },
          {
            title: 'import',
            type: 'import-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/import-command',
          },
          {
            title: 'ls',
            type: 'ls-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/ls-command',
          },
          {
            title: 'Meta-command',
            type: 'meta-command',
            links: [
              {
                title: 'meta',
                type: 'index',
                links: [],
                href: '/dcs/api-reference/uplink-cli/meta-command/index',
              },
              {
                title: 'meta get',
                type: 'meta-get-command',
                links: [],
                href: '/dcs/api-reference/uplink-cli/meta-command/meta-get-command',
              },
            ],
          },
          {
            title: 'mv',
            type: 'mv',
            links: [],
            href: '/dcs/api-reference/uplink-cli/mv',
          },
          {
            title: 'rb',
            type: 'rb-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/rb-command',
          },
          {
            title: 'rm',
            type: 'rm-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/rm-command',
          },
          {
            title: 'setup',
            type: 'setup-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/setup-command',
          },
          {
            title: 'share',
            type: 'share-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/share-command',
          },
          {
            title: 'mb',
            type: 'uplink-mb-command',
            links: [],
            href: '/dcs/api-reference/uplink-cli/uplink-mb-command',
          },
        ],
        href: '/dcs/api-reference/uplink-cli',
      },
    ],
  },
  {
    title: 'Backups',
    type: 'backups',
    links: [],
    href: '/dcs/backups',
  },
  {
    title: 'Billing',
    type: 'billing',
    links: [],
    href: '/dcs/billing',
  },
  {
    title: 'Billing-payment-and-accounts-1',
    type: 'billing-payment-and-accounts-1',
    links: [
      {
        title: 'Closing an Account',
        type: 'closing-an-account',
        links: [],
        href: '/dcs/billing-payment-and-accounts-1/closing-an-account',
      },
      {
        title: 'Data Retention Policy',
        type: 'data-retention-policy',
        links: [],
        href: '/dcs/billing-payment-and-accounts-1/data-retention-policy',
      },
      {
        title: 'Pricing',
        type: 'pricing',
        links: [
          {
            title: 'How Billing is Calculated',
            type: 'billing-and-payment',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/pricing/billing-and-payment',
          },
          {
            title: 'Free Plan',
            type: 'free-tier',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/pricing/free-tier',
          },
          {
            title: 'Billing, Payment and Accounts',
            type: 'index',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/pricing/index',
          },
          {
            title: 'Usage Limit Increases',
            type: 'usage-limit-increases',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/pricing/usage-limit-increases',
          },
        ],
      },
      {
        title: 'Requesting a Refund',
        type: 'requesting-a-refund',
        links: [],
        href: '/dcs/billing-payment-and-accounts-1/requesting-a-refund',
      },
      {
        title: 'Storj-token',
        type: 'storj-token',
        links: [
          {
            title: 'Changing Payment Methods',
            type: 'changing-payment-methods',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/storj-token/changing-payment-methods',
          },
          {
            title: 'Debits Against Payment Methods',
            type: 'debits-against-payment-methods',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/storj-token/debits-against-payment-methods',
          },
          {
            title: 'Deleting a Payment Method',
            type: 'deleting-a-payment-method',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/storj-token/deleting-a-payment-method',
          },
          {
            title: 'Expired Credit Card',
            type: 'expired-credit-card',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/storj-token/expired-credit-card',
          },
          {
            title: 'Payment Methods',
            type: 'index',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/storj-token/index',
          },
          {
            title: 'Promotional Credits',
            type: 'promotional-credits',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/storj-token/promotional-credits',
          },
          {
            title: 'Reporting a Payment Problem',
            type: 'reporting-a-payment-problem',
            links: [],
            href: '/dcs/billing-payment-and-accounts-1/storj-token/reporting-a-payment-problem',
          },
        ],
      },
    ],
  },
  {
    title: 'Buckets',
    type: 'buckets',
    links: [],
    href: '/dcs/buckets',
  },
  {
    title: 'Concepts',
    type: 'concepts',
    links: [
      {
        title: 'Access Management',
        type: 'access',
        links: [
          {
            title: 'Access-grants',
            type: 'access-grants',
            links: [
              {
                title: 'API Key',
                type: 'api-key',
                links: [
                  {
                    title: 'Access Restrictions',
                    type: 'restriction',
                    links: [],
                    href: '/dcs/concepts/access/access-grants/api-key/restriction',
                  },
                ],
                href: '/dcs/concepts/access/access-grants/api-key',
              },
              {
                title: 'Access Grants',
                type: 'index',
                links: [],
                href: '/dcs/concepts/access/access-grants/index',
              },
              {
                title:
                  'When to use the Satellite Web Interface and When to use the CLI',
                type: 'when-to-use-the-satellite-web-interface-and-when-to-use-the-cli',
                links: [],
                href: '/dcs/concepts/access/access-grants/when-to-use-the-satellite-web-interface-and-when-to-use-the-cli',
              },
            ],
          },
          {
            title: 'Access Management at the Edge',
            type: 'access-management-at-the-edge',
            links: [],
            href: '/dcs/concepts/access/access-management-at-the-edge',
          },
          {
            title: 'Access Revocation',
            type: 'access-revocation',
            links: [],
            href: '/dcs/concepts/access/access-revocation',
          },
          {
            title: 'Capability Based Access vs Access Control Lists',
            type: 'capability-based-access-control',
            links: [],
            href: '/dcs/concepts/access/capability-based-access-control',
          },
          {
            title: 'Encryption-and-keys',
            type: 'encryption-and-keys',
            links: [
              {
                title: 'Encryption Keys',
                type: 'index',
                links: [],
                href: '/dcs/concepts/access/encryption-and-keys/index',
              },
              {
                title: 'Key Management',
                type: 'key-management',
                links: [],
                href: '/dcs/concepts/access/encryption-and-keys/key-management',
              },
              {
                title: 'When to use different encryption keys',
                type: 'when-to-use-different-encryption-keys',
                links: [],
                href: '/dcs/concepts/access/encryption-and-keys/when-to-use-different-encryption-keys',
              },
            ],
          },
        ],
        href: '/dcs/concepts/access',
      },
      {
        title: 'Connectors',
        type: 'connectors',
        links: [],
        href: '/dcs/concepts/connectors',
      },
      {
        title: 'Data Structure',
        type: 'data-structure',
        links: [],
        href: '/dcs/concepts/data-structure',
      },
      {
        title: 'Decentralization',
        type: 'decentralization',
        links: [
          {
            title: 'Coordination Avoidance',
            type: 'coordination-avoidance',
            links: [],
            href: '/dcs/concepts/decentralization/coordination-avoidance',
          },
        ],
        href: '/dcs/concepts/decentralization',
      },
      {
        title: 'Definitions',
        type: 'definitions',
        links: [],
        href: '/dcs/concepts/definitions',
      },
      {
        title: 'Edge Services',
        type: 'edge-services',
        links: [
          {
            title: 'Auth Service',
            type: 'auth-service',
            links: [],
            href: '/dcs/concepts/edge-services/auth-service',
          },
        ],
        href: '/dcs/concepts/edge-services',
      },
      {
        title: 'Encryption-key',
        type: 'encryption-key',
        links: [
          {
            title: '"Design Decision: End-to-end Encryption"',
            type: 'design-decision-end-to-end-encryption',
            links: [],
            href: '/dcs/concepts/encryption-key/design-decision-end-to-end-encryption',
          },
          {
            title: '"Design Decision: Server-side Encryption"',
            type: 'design-decision-server-side-encryption',
            links: [],
            href: '/dcs/concepts/encryption-key/design-decision-server-side-encryption',
          },
          {
            title: 'How Encryption is Implemented',
            type: 'how-encryption-is-implemented',
            links: [],
            href: '/dcs/concepts/encryption-key/how-encryption-is-implemented',
          },
          {
            title: 'Encryption',
            type: 'index',
            links: [],
            href: '/dcs/concepts/encryption-key/index',
          },
        ],
      },
      {
        title: 'File Redundancy',
        type: 'file-redundancy',
        links: [],
        href: '/dcs/concepts/file-redundancy',
      },
      {
        title: 'File Repair',
        type: 'file-repair',
        links: [],
        href: '/dcs/concepts/file-repair',
      },
      {
        title: 'Key Architecture Constructs',
        type: 'key-architecture-constructs',
        links: [],
        href: '/dcs/concepts/key-architecture-constructs',
      },
      {
        title: 'Usage Limits',
        type: 'limits',
        links: [],
        href: '/dcs/concepts/limits',
      },
      {
        title: 'Multiregion Availability',
        type: 'multiregion-availability',
        links: [],
        href: '/dcs/concepts/multiregion-availability',
      },
      {
        title: 'Understanding Storj DCS',
        type: 'overview',
        links: [],
        href: '/dcs/concepts/overview',
      },
      {
        title: 'S3 Compatibility',
        type: 's3-compatibility',
        links: [],
        href: '/dcs/concepts/s3-compatibility',
      },
      {
        title: 'Satellite (Metadata Region)',
        type: 'satellite',
        links: [],
        href: '/dcs/concepts/satellite',
      },
    ],
  },
  {
    title: 'Dashboard',
    type: 'dashboard',
    links: [],
    href: '/dcs/dashboard',
  },
  {
    title: 'Downloads',
    type: 'downloads',
    links: [
      {
        title: 'Download Self-hosted S3 Compatible Gateway',
        type: 'download-self-hosted-s3-compatible-gateway',
        links: [],
        href: '/dcs/downloads/download-self-hosted-s3-compatible-gateway',
      },
      {
        title: 'Download Storj Client Libraries',
        type: 'download-storj-client-libraries',
        links: [],
        href: '/dcs/downloads/download-storj-client-libraries',
      },
      {
        title: 'Download Uplink CLI',
        type: 'download-uplink-cli',
        links: [],
        href: '/dcs/downloads/download-uplink-cli',
      },
    ],
  },
  {
    title: 'FileZilla',
    type: 'filezilla',
    links: [],
    href: '/dcs/filezilla',
  },
  {
    title: 'Getting-started',
    type: 'getting-started',
    links: [
      {
        title: 'Gateway-mt',
        type: 'gateway-mt',
        links: [
          {
            title: 'AWS CLI Advanced Options',
            type: 'aws-cli-advanced-options',
            links: [],
            href: '/dcs/getting-started/gateway-mt/aws-cli-advanced-options',
          },
          {
            title: 'AWS CLI and Hosted Gateway MT',
            type: 'index',
            links: [],
            href: '/dcs/getting-started/gateway-mt/index',
          },
        ],
      },
      {
        title: 'Getting Started',
        type: 'index',
        links: [],
        href: '/dcs/getting-started/index',
      },
      {
        title: 'AWS SDK and Hosted Gateway MT',
        type: 'quickstart-aws-sdk-and-hosted-gateway-mt',
        links: [],
        href: '/dcs/getting-started/quickstart-aws-sdk-and-hosted-gateway-mt',
      },
      {
        title: 'Object Browser',
        type: 'quickstart-objectbrowser',
        links: [],
        href: '/dcs/getting-started/quickstart-objectbrowser',
      },
      {
        title: 'Quickstart-uplink-cli',
        type: 'quickstart-uplink-cli',
        links: [
          {
            title: 'Generate-access-grants-and-tokens',
            type: 'generate-access-grants-and-tokens',
            links: [
              {
                title: 'Create Access Grant in CLI',
                type: 'generate-a-token',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token',
              },
              {
                title: 'Advanced Usage',
                type: 'index',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/index',
              },
            ],
          },
          {
            title: 'Interacting With Your First Object CLI',
            type: 'interacting-with-your-first-object',
            links: [
              {
                title: 'Delete an Object',
                type: 'delete-an-object',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object/delete-an-object',
              },
              {
                title: 'Download an Object',
                type: 'download-an-object',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object/download-an-object',
              },
              {
                title: 'List an Object',
                type: 'list-an-object',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object/list-an-object',
              },
            ],
            href: '/dcs/getting-started/quickstart-uplink-cli/interacting-with-your-first-object',
          },
          {
            title: 'Sharing-your-first-object',
            type: 'sharing-your-first-object',
            links: [
              {
                title: 'Create an Access to an Object',
                type: 'generate-access',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/generate-access',
              },
              {
                title: 'Import an Access to an Object',
                type: 'import-access',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/import-access',
              },
              {
                title: 'Sharing Your First Object',
                type: 'index',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/index',
              },
              {
                title: 'Prerequisites',
                type: 'prerequisites',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/prerequisites',
              },
              {
                title: 'Revoke an Access to an Object',
                type: 'revoke-an-access-to-an-object',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/revoke-an-access-to-an-object',
              },
            ],
          },
          {
            title: 'Uploading Your First Object CLI',
            type: 'uploading-your-first-object',
            links: [
              {
                title: 'Create a Bucket',
                type: 'create-a-bucket',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-a-bucket',
              },
              {
                title: 'Create an Access Grant',
                type: 'create-first-access-grant',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant',
              },
              {
                title: 'Set Up Uplink CLI with Access Grant',
                type: 'set-up-uplink-cli',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/set-up-uplink-cli',
              },
              {
                title: 'Upload an Object',
                type: 'upload-an-object',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/upload-an-object',
              },
              {
                title: 'View Distribution of an Object',
                type: 'view-distribution-of-an-object',
                links: [],
                href: '/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/view-distribution-of-an-object',
              },
            ],
            href: '/dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object',
          },
        ],
      },
      {
        title: 'Satellite Admin Console',
        type: 'satellite-developer-account',
        links: [
          {
            title: 'Creating Your Account',
            type: 'creating-your-account',
            links: [],
            href: '/dcs/getting-started/satellite-developer-account/creating-your-account',
          },
          {
            title: 'Manage Projects',
            type: 'manage-projects',
            links: [],
            href: '/dcs/getting-started/satellite-developer-account/manage-projects',
          },
          {
            title: 'My Account',
            type: 'my-account',
            links: [],
            href: '/dcs/getting-started/satellite-developer-account/my-account',
          },
          {
            title: 'Quick Start',
            type: 'quick-start',
            links: [],
            href: '/dcs/getting-started/satellite-developer-account/quick-start',
          },
          {
            title: 'Resources',
            type: 'resources',
            links: [],
            href: '/dcs/getting-started/satellite-developer-account/resources',
          },
        ],
        href: '/dcs/getting-started/satellite-developer-account',
      },
    ],
  },
  {
    title: 'Overview',
    type: 'how-tos',
    links: [
      {
        title: 'Acronis',
        type: 'acronis-integration-guide',
        links: [],
        href: '/dcs/how-tos/acronis-integration-guide',
      },
      {
        title: 'Arq',
        type: 'arq-integration-guide',
        links: [],
        href: '/dcs/how-tos/arq-integration-guide',
      },
      {
        title: 'Atempo (Miria)',
        type: 'atempo-miria-integration',
        links: [],
        href: '/dcs/how-tos/atempo-miria-integration',
      },
      {
        title: 'Duplicati',
        type: 'backup-with-duplicati',
        links: [],
        href: '/dcs/how-tos/backup-with-duplicati',
      },
      {
        title: 'Restic',
        type: 'backup-with-restic',
        links: [],
        href: '/dcs/how-tos/backup-with-restic',
      },
      {
        title: 'HashBackup',
        type: 'backups-with-hashbackup',
        links: [],
        href: '/dcs/how-tos/backups-with-hashbackup',
      },
      {
        title: 'Tools for the Partner Program',
        type: 'configure-tools-for-the-partner-program',
        links: [],
        href: '/dcs/how-tos/configure-tools-for-the-partner-program',
      },
      {
        title: 'Rucio',
        type: 'configuring-rucio-with-storj',
        links: [],
        href: '/dcs/how-tos/configuring-rucio-with-storj',
      },
      {
        title: 'Docker Container Registry',
        type: 'container-registry-docker',
        links: [],
        href: '/dcs/how-tos/container-registry-docker',
      },
      {
        title: 'Create and host Chainstate Snapshots',
        type: 'create-and-host-chainstate-snapshots',
        links: [],
        href: '/dcs/how-tos/create-and-host-chainstate-snapshots',
      },
      {
        title: 'Dataverse',
        type: 'dataverse-integration-guide',
        links: [],
        href: '/dcs/how-tos/dataverse-integration-guide',
      },
      {
        title: 'Elements',
        type: 'elements-integration-guide',
        links: [],
        href: '/dcs/how-tos/elements-integration-guide',
      },
      {
        title: 'Fastly',
        type: 'fastly-integration',
        links: [],
        href: '/dcs/how-tos/fastly-integration',
      },
      {
        title: 'FileZilla Pro Integration',
        type: 'filezilla-pro-integration-guide',
        links: [],
        href: '/dcs/how-tos/filezilla-pro-integration-guide',
      },
      {
        title: 'Hammerspace',
        type: 'hammerspace-integration-guide',
        links: [],
        href: '/dcs/how-tos/hammerspace-integration-guide',
      },
      {
        title: 'Host-a-static-website',
        type: 'host-a-static-website',
        links: [
          {
            title:
              'Host a Static Website with the Uplink CLI and Linksharing Service',
            type: 'host-a-static-website-with-the-cli-and-linksharing-service',
            links: [],
            href: '/dcs/how-tos/host-a-static-website/host-a-static-website-with-the-cli-and-linksharing-service',
          },
        ],
      },
      {
        title:
          'How to backup your WordPress site with UpdraftPlus to Storj DCS',
        type: 'how-to-backup-your-wordpress-site-with-updraftplus-to-storj-dcs',
        links: [],
        href: '/dcs/how-tos/how-to-backup-your-wordpress-site-with-updraftplus-to-storj-dcs',
      },
      {
        title: 's3fs',
        type: 'how-to-connect-s3fs-to-storj-dcs',
        links: [],
        href: '/dcs/how-tos/how-to-connect-s3fs-to-storj-dcs',
      },
      {
        title: 'How to Fine-tune File Transfer Performance on Storj DCS',
        type: 'how-to-hod-rod-file-transfer-performance-on-storj-dcs',
        links: [],
        href: '/dcs/how-tos/how-to-hod-rod-file-transfer-performance-on-storj-dcs',
      },
      {
        title: 'Video analytics and management with Kerberos Vault',
        type: 'how-to-set-up-video-analytics-and-video-management-with-kerberos-vault',
        links: [],
        href: '/dcs/how-tos/how-to-set-up-video-analytics-and-video-management-with-kerberos-vault',
      },
      {
        title: 'Cyberduck',
        type: 'how-to-use-cyberduck-and-storj-dcs',
        links: [],
        href: '/dcs/how-tos/how-to-use-cyberduck-and-storj-dcs',
      },
      {
        title: 'Plex and Storj DCS as a private streaming service',
        type: 'how-to-use-plex-and-storj-dcs-as-a-private-streaming-service',
        links: [],
        href: '/dcs/how-tos/how-to-use-plex-and-storj-dcs-as-a-private-streaming-service',
      },
      {
        title: 'Hugging Face',
        type: 'hugging-face',
        links: [],
        href: '/dcs/how-tos/hugging-face',
      },
      {
        title: 'TrueNAS - iX Systems',
        type: 'ix-systems-truenas-integration',
        links: [],
        href: '/dcs/how-tos/ix-systems-truenas-integration',
      },
      {
        title: 'Kubernetes Backup via Velero',
        type: 'kubernetes-backup-via-velero',
        links: [],
        href: '/dcs/how-tos/kubernetes-backup-via-velero',
      },
      {
        title: 'LucidLink Filespace',
        type: 'lucidlink-filespace-integration',
        links: [],
        href: '/dcs/how-tos/lucidlink-filespace-integration',
      },
      {
        title: 'MongoDB Ops Manager',
        type: 'mongodb-ops-manager-backup',
        links: [],
        href: '/dcs/how-tos/mongodb-ops-manager-backup',
      },
      {
        title: 'MSP360',
        type: 'msp360-integration-guide',
        links: [],
        href: '/dcs/how-tos/msp360-integration-guide',
      },
      {
        title: 'NFT storage for OpenSea',
        type: 'nft-storage',
        links: [],
        href: '/dcs/how-tos/nft-storage',
      },
      {
        title: 'Photos+',
        type: 'photos-plus-integration-guide',
        links: [],
        href: '/dcs/how-tos/photos-plus-integration-guide',
      },
      {
        title: 'Presigned URLs in the serverless cloud',
        type: 'presigned-urls-in-the-serverless-cloud',
        links: [],
        href: '/dcs/how-tos/presigned-urls-in-the-serverless-cloud',
      },
      {
        title: 'Rails Active Storage',
        type: 'rails-activestorage',
        links: [],
        href: '/dcs/how-tos/rails-activestorage',
      },
      {
        title: 'FileZilla Native Integration',
        type: 'set-up-filezilla-for-decentralized-file-transfer',
        links: [],
        href: '/dcs/how-tos/set-up-filezilla-for-decentralized-file-transfer',
      },
      {
        title: 'S3 Browser',
        type: 'simplify-file-management-with-s3-browser-and-storj-dcs',
        links: [],
        href: '/dcs/how-tos/simplify-file-management-with-s3-browser-and-storj-dcs',
      },
      {
        title: 'Splunk',
        type: 'splunk-integration-guide',
        links: [],
        href: '/dcs/how-tos/splunk-integration-guide',
      },
      {
        title: 'Sync-files-with-rclone',
        type: 'sync-files-with-rclone',
        links: [
          {
            title: 'Rclone',
            type: 'index',
            links: [],
            href: '/dcs/how-tos/sync-files-with-rclone/index',
          },
          {
            title: 'Rclone Hosted Gateway',
            type: 'rclone-with-hosted-gateway',
            links: [],
            href: '/dcs/how-tos/sync-files-with-rclone/rclone-with-hosted-gateway',
          },
          {
            title: 'Rclone Native Integration',
            type: 'rclone-with-native-integration',
            links: [],
            href: '/dcs/how-tos/sync-files-with-rclone/rclone-with-native-integration',
          },
        ],
      },
      {
        title: 'Store Tesla Sentry Mode & Dashcam videos on Storj DCS',
        type: 'tesla-sentry-mode-teslausb',
        links: [],
        href: '/dcs/how-tos/tesla-sentry-mode-teslausb',
      },
      {
        title: 'Unitrends',
        type: 'unitrends-integration-guide',
        links: [],
        href: '/dcs/how-tos/unitrends-integration-guide',
      },
      {
        title: 'Veeam',
        type: 'veeam-integration-guide',
        links: [],
        href: '/dcs/how-tos/veeam-integration-guide',
      },
      {
        title:
          'Workshop - Global Video Content Delivery with Storj and Livepeer',
        type: 'video-content-delivery-with-storj-and-livepeer',
        links: [],
        href: '/dcs/how-tos/video-content-delivery-with-storj-and-livepeer',
      },
      {
        title: 'Zerto',
        type: 'zerto-integration-guide',
        links: [],
        href: '/dcs/how-tos/zerto-integration-guide',
      },
    ],
    href: '/dcs/how-tos',
  },
  {
    title: 'Iconik',
    type: 'iconik-integration',
    links: [],
    href: '/dcs/iconik-integration',
  },
  {
    title: 'Immutability',
    type: 'immutability',
    links: [],
    href: '/dcs/immutability',
  },
  {
    title: 'Mastodon',
    type: 'mastodon',
    links: [],
    href: '/dcs/mastodon',
  },
  {
    title: 'Nextcloud with Storj DCS',
    type: 'nextcloud-with-storj-dcs',
    links: [],
    href: '/dcs/nextcloud-with-storj-dcs',
  },
  {
    title: 'PixelFed',
    type: 'pixelfed',
    links: [],
    href: '/dcs/pixelfed',
  },
  {
    title: 'Projects',
    type: 'projects',
    links: [],
    href: '/dcs/projects',
  },
  {
    title: 'Solution-architectures',
    type: 'solution-architectures',
    links: [
      {
        title: 'Common Architectural Pattern',
        type: 'common-architectural-patterns',
        links: [],
        href: '/dcs/solution-architectures/common-architectural-patterns',
      },
      {
        title: 'Common Use Cases',
        type: 'common-use-cases',
        links: [],
        href: '/dcs/solution-architectures/common-use-cases',
      },
    ],
  },
  {
    title: 'Storage',
    type: 'storage',
    links: [
      {
        title: 'Product Overview',
        type: 'considerations',
        links: [],
        href: '/dcs/storage/considerations',
      },
    ],
  },
  {
    title: 'Support',
    type: 'support',
    links: [
      {
        title: 'FAQ',
        type: 'faqs',
        links: [],
        href: '/dcs/support/faqs',
      },
      {
        title: 'Support Overview',
        type: 'support-process-overview',
        links: [],
        href: '/dcs/support/support-process-overview',
      },
    ],
  },
  {
    title: 'Users',
    type: 'users',
    links: [],
    href: '/dcs/users',
  },
]

export default sideNavigation
