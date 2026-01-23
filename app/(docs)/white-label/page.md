---
title: White Label Solutions
docId: white-label-overview
weight: 1
metadata:
  title: Storj White Label Solutions
  description: Documentation for partners deploying white-labeled Storj storage solutions.
---

Storj White Label enables partners to offer a fully branded storage experience to their end users. This documentation covers the setup process, configuration options, and operational details for white-label deployments.

## What is White Label?

A white-label Storj deployment provides:

- **Fully branded experience** - Your logo, colors, and brand name throughout the UI and emails
- **Custom domains** - Your own hostnames for the storage console and S3 gateway
- **Tenant isolation** - Users, projects, and credentials are isolated to your deployment
- **No Storj branding** - No "Storj" references appear in any customer-facing surface

## Key Features

{% callout type="note" %}
White-label deployments use S3 credentials only. Access Grants for uplink are not available in white-label configurations.
{% /callout %}

- **Custom branding** - Logos, colors, and product name
- **Custom domains** - Console and S3 gateway on your domain
- **Isolated user base** - Same email can exist independently across tenants
- **Branded emails** - Transactional emails sent via your SMTP with your branding
- **Configurable defaults** - Storage, bandwidth, and project limits

## Documentation

{% quick-links %}
{% quick-link title="Setup Worksheet" href="/white-label/setup-worksheet" %}
Complete the intake worksheet to configure your white-label deployment
{% /quick-link %}

{% quick-link title="DNS Configuration" href="/white-label/dns-configuration" %}
Set up custom domains for your S3 gateway
{% /quick-link %}

{% quick-link title="Defaults & Limits" href="/white-label/defaults" %}
Understand default limits and how to customize them
{% /quick-link %}
{% /quick-links %}

## Support

For assistance with your white-label deployment, contact your Storj account representative or email support@storj.io.
