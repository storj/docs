---
title: Linksharing Service
docId: sN2GhYgGUtqBVF65GhKEa
redirects:
  - /dcs/api-reference/linksharing-service
metadata:
  title: Explaining the Linksharing Service
  description:
    Guide to using Storj's Linksharing service, covering features like
    sharing via custom domains, path-based linkshare, direct download linkshare, and
    handling access restrictions.
---

## Overview

The Linksharing service provides an easy way to share an object via a web browser. Linkshare links may be shared with the following features:

- **Storj DCS Linkshare web page** - displays a preview of the shared object, including a streaming player for multimedia files along with a map displaying the geolocation of the storage nodes storing the encrypted and erasure coded pieces of the object

- **Custom Domains** - Instead of using the default URL provided by linksharing, users can access their content using a custom domain: [](docId:RI4zz1sLvVEZ4ZcZbuT7l)

- **Path-based linkshare** - displays a list of objects with a shared path in a browser. This feature allows sharing a folder of objects. When clicked in a browser, any of the objects will be displayed individually on a Linkshare web page

- **Direct download Linkshare** - a URL to directly access and download an object via the internet without loading a web page

- **Restricted Access** - Linkshare links are read-only by default, but may be further restricted with any supported [](docId:BvM5lT5lXn3A7BNqs__1w) (bucket, path and prefix, time window)

- **Revokable Access** - Link share links may be revoked by deleting the associated Access Grant from the Auth Service or by revoking the Access Grant via the revocation service.

The Linkshare service is part of the Storj [](docId:21Y2RfU-4h21vZycBqizJ) and provides an additional way to access objects over the internet via a browser in addition to the [](docId:yYCzPT8HHcbEZZMvfoCFa).

{% callout type="info"  %}
Note: All of the Edge Services, including the Linksharing service use [](docId:hf2uumViqYvS1oq8TYbeW).&#x20;
{% /callout %}

## Linkshare Examples

The Storj Linkshare web page and Path-based Linkshare web page are shown below:

![Storj Linkshare web page example](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/95gBoFCZFkLVk-pvoxNAA_screen-shot-2021-09-03-at-92832-am.png)

![Storj Path-based Linkshare web page example](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/_imI9aKD9jERtnE3ffL5Q_screen-shot-2021-09-03-at-92131-am.png)

## Linkshare QuickStart

To accelerate your time to success we offer an Object Browser GUI that allows you to upload and share with no command line interface required. Check out [](docId:4oDAezF-FcfPr0WPl7knd).

The [](docId:4oDAezF-FcfPr0WPl7knd) are included in that tutorial.

## Linkshare via CLI (Advanced)

If you prefer a command line interface (CLI) or wish to programmatically integrate to Storj _ DCS we have our_ [](docId:tBnCSrmR1jbOewG38fIr4) in addition to our [](docId:2x_b4StTLjm2WoHEPx2Cm). You can also [](docId:GkgE6Egi02wRZtyryFyPz).

## Regions of availability

Linksharing Service is available in several geographical regions. When you use the endpoint <https://link.storjshare.io>, it automatically routes traffic from the closest region to your location.
