---
title: Edge Services
docId: 21Y2RfU-4h21vZycBqizJ
redirects:
  - /dcs/concepts/edge-services
metadata:
  title: Understanding Storj's Edge Services
  description:
    Exploring Storj's Edge Services, which include S3 compatibility, data
    sharing services like a globally distributed Gateway, Linkshare Service, and Auth
    Service.
---

## Overview

Storj Edge Services are hosted components that provide S3 compatibility and publicly-available data sharing services and are composed of the Storj Gateway MT, the auth service and the link sharing service. Storj Edge Services use server-side encryption.

{% callout type="info"  %}
**Note:** All of the Edge Services use [](docId:hf2uumViqYvS1oq8TYbeW).
{% /callout %}

### Edge Services

The three components comprising the edge services are:

**S3 Compatible Gateway**

Storj includes a globally distributed, multi-region cloud-hosted [](docId:yYCzPT8HHcbEZZMvfoCFa).

**Linkshare Service**

The [](docId:sN2GhYgGUtqBVF65GhKEa) is a globally distributed, multi-region cloud-hosted gateway for standard HTTP requests, for sharing objects with users via a web browser.

**Auth Service**

Both the Storj S3-compatible gateway and the Linkshare service leverage the [](docId:cSsmRiNfJD_NK3ksKCPQ4) for access management via a registered Access Grant.\\
