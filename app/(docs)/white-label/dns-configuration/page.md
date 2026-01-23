---
title: DNS Configuration
docId: white-label-dns-configuration
weight: 3
metadata:
  title: White Label DNS Configuration
  description: Set up custom domains for your Storj white-label S3 gateway and email sender.
---

This guide explains how to configure custom domains for your white-label deployment, including the S3 Gateway and email sender.

## Step 1: Add DNS Records

To set up a custom domain for your S3 Gateway, add the following **CNAME records** to your DNS configuration:

### Required Records

| Record Type | Name/Host | Value/Points to |
|-------------|-----------|-----------------|
| CNAME | `_acme-challenge.<YOUR_GATEWAY_DOMAIN>` | `_acme-challenge.certs.storjapi.com` |
| CNAME | `gateway.<YOUR_GATEWAY_DOMAIN>` | `gateway.storjshare.io` |
| CNAME | `*.gateway.<YOUR_GATEWAY_DOMAIN>` | `gateway.storjshare.io` |

### Example

For a gateway domain of `s3.yourdomain.com`:

```
Name: _acme-challenge.s3.yourdomain.com
Type: CNAME
Value: _acme-challenge.certs.storjapi.com
TTL: 3600

Name: gateway.s3.yourdomain.com
Type: CNAME
Value: gateway.storjshare.io
TTL: 3600

Name: *.gateway.s3.yourdomain.com
Type: CNAME
Value: gateway.storjshare.io
TTL: 3600
```

{% callout type="note" %}
The `_acme-challenge` record delegates the DNS-01 challenge to Storj, allowing us to automatically issue and renew SSL/TLS certificates for your custom domain.
{% /callout %}

---

## Step 2: Verify DNS Propagation

After adding the records, verify that they have propagated correctly using the `dig` command:

```shell
dig @1.1.1.1 _acme-challenge.<YOUR_GATEWAY_DOMAIN>
```

The result should point to `_acme-challenge.certs.storjapi.com`.

You can also verify the gateway record:

```shell
dig @1.1.1.1 gateway.<YOUR_GATEWAY_DOMAIN>
```

This should resolve to `gateway.storjshare.io`.

{% callout type="warning" %}
DNS propagation can take up to 48 hours, though it typically completes within a few minutes to a few hours.
{% /callout %}

---

## Step 3: Notify Storj

Once your DNS records are configured and verified, share your gateway domain with your Storj contact (e.g., `s3.yourdomain.com`).

Storj will:

1. Configure the gateway to accept requests for your domain
2. Use the delegated DNS-01 challenge to issue an SSL/TLS certificate
3. Confirm when your custom domain is active

Certificates are issued by **GTS CA 1P5 (Google Trust Services LLC)** and are automatically renewed.

---

## Email Sender Configuration

To send transactional emails (account verification, password resets, etc.) from your custom domain, you'll need to configure DNS records for email authentication.

### Required Email DNS Records

Storj will provide you with the specific values for these records based on your email domain (e.g., `storage.yourdomain.com`):

| Record Type | Purpose |
|-------------|---------|
| **SPF** (TXT) | Authorizes Storj's mail servers to send email on behalf of your domain |
| **DKIM** (CNAME or TXT) | Enables email signing for authentication |
| **DMARC** (TXT) | Optional but recommended for email deliverability |

### Example Records

For a "from" email address of `noreply@storage.yourdomain.com`:

```
# SPF Record
Name: storage.yourdomain.com
Type: TXT
Value: v=spf1 include:_spf.storj.io ~all

# DKIM Record (Storj will provide the specific selector and value)
Name: storj._domainkey.storage.yourdomain.com
Type: CNAME
Value: storj._domainkey.storj.io

# DMARC Record (optional)
Name: _dmarc.storage.yourdomain.com
Type: TXT
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

{% callout type="note" %}
The exact DKIM selector and SPF include domain will be provided by Storj during setup. The examples above are for illustration purposes.
{% /callout %}

### Verify Email DNS Records

After adding the records, verify SPF:

```shell
dig @1.1.1.1 storage.yourdomain.com TXT
```

And verify DKIM:

```shell
dig @1.1.1.1 storj._domainkey.storage.yourdomain.com CNAME
```

---

## Troubleshooting

### Certificate not issuing

- Verify the `_acme-challenge` CNAME record is correctly configured
- Ensure DNS has fully propagated (check with `dig @1.1.1.1`)
- Confirm there are no conflicting A or AAAA records

### Gateway not responding

- Verify the `gateway` CNAME records are pointing to `gateway.storjshare.io`
- Check that the wildcard record (`*.gateway`) is also configured
- Ensure Storj has been notified and completed the gateway configuration

### Emails going to spam or not delivering

- Verify SPF record is correctly configured and includes Storj's mail servers
- Check that DKIM record is properly set up
- Consider adding a DMARC record to improve deliverability
- Use an email testing tool like [Mail Tester](https://www.mail-tester.com/) to diagnose issues

---

## Support

If you encounter any issues during setup, contact support@storj.io or your Storj account representative for assistance.
