---
title: Edge Services
createdAt: 2022-05-19T22:26:50.000Z
updatedAt: 2023-07-11T20:20:09.553Z
docId: 21Y2RfU-4h21vZycBqizJ
redirects:
  - /dcs/concepts/edge-services
---

## Overview

Storj Edge Services are hosted components that provide S3 compatibility and publicly-available data sharing services and are composed of the Storj Gateway MT, the auth service and the link sharing service. Storj Edge Services use server-side encryption.

{% callout type="info"  %} 
**Note:** All of the Edge Services use [](docId\:hf2uumViqYvS1oq8TYbeW).&#x20;
{% /callout %}

### Edge Services

The three components comprising the edge services are:

**S3 Compatible Gateway**

Storj DCS includes a globally distributed, multi-region cloud-hosted [](docId\:yYCzPT8HHcbEZZMvfoCFa).

**Linkshare Service**

The [](docId\:sN2GhYgGUtqBVF65GhKEa) is a globally distributed, multi-region cloud-hosted gateway for standard HTTP requests, for sharing objects with users via a web browser.&#x20;

**Auth Service**

Both the Storj S3-compatible gateway and the Linkshare service leverage the [](docId\:cSsmRiNfJD_NK3ksKCPQ4) for access management via a registered Access Grant.\\

