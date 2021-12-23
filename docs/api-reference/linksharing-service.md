---
description: >-
  A gateway for standard HTTP requests, so you can share objects with users via
  a web browser or even host full static websites.
---

# Linksharing Service

## **Overview**

The Linksharing service provides an easy way to share an object via a web browser. Linkshare links may be shared with the following features:

* **Storj DCS Linkshare web page** - displays a preview of the shared object, including a streaming player for multimedia files along with a map displaying the geolocation of the storage nodes storing the encrypted and erasure coded pieces of the object
* **Path-based linkshare** - displays a list of objects with a shared path in a browser. This feature allows sharing a folder of objects. When clicked in a browser, any of the objects will be displayed individually on a Linkshare web page
* **Direct download Linkshare** - a URL to directly access and download an object via the internet without loading a web page
* **Restricted Access** - Linkshare links are read-only by default, but may be further restricted with any supported [access restriction](../concepts/access/access-grants/api-key/restriction.md) (bucket, path and prefix, time window)
* **Revokable Access** - Link share links may be revoked by deleting the associated Access Grant from the Auth Service or by revoking the Access Grant via the revocation service.

The Linkshare service is part of [the Storj Edge Services](../concepts/edge-services/) and provides an additional way to access objects over the internet via a browser in addition to the [S3-compatible gateway](s3-compatible-gateway/).

{% hint style="info" %}
Note: All of the Edge Services, including the Linksharing service use [server-side encryption](../concepts/encryption-key/design-decision-server-side-encryption.md).&#x20;
{% endhint %}

## **Linkshare Examples**

The Storj Linkshare web page and Path-based Linkshare web page are shown below:

![Storj Linkshare web page example](https://lh5.googleusercontent.com/D-mGIuIH5Omh0sBia6vqvYQPiNfH4WsXXn-GOU-QIiiWpYRd7xnpMTXofYhea\_tiPC1kaT4Xe4tYWusaE4500aN7SDaGdiyXwiv78GmqX9KTTrXdmoKKRYZZ1bJ-YVsSpr03Wm2I=s0)

![Storj Path-based Linkshare web page example](https://lh6.googleusercontent.com/eXoBLnasQcKSjqxtoaUDMzEBqjBZgFzY3ua9\_OLvkEZQb6Y-woLIaWGM\_wbsPWIeRgxmkRqYi-45L5cpAlhpxkOercyXeQ96KWAA\_fPqSDxm4jpAlneKKH4iTE4F4bNbURHjCIhq=s0)

## Linkshare QuickStart&#x20;

To accelerate your time to success we offer an Object Browser GUI that allows you to upload and share with no command line interface required. Check out [the tutorial for the Object Browser](../getting-started/quickstart-objectbrowser.md).&#x20;

The [steps for sharing an object via the GUI](../getting-started/quickstart-objectbrowser.md#share-a-file) are included in that tutorial.&#x20;

## **Linkshare via CLI (Advanced)**

If you prefer a command line interface (CLI) or wish to programmatically integrate to Storj __ DCS we have our [CLI documentation](uplink-cli/share-command.md) in addition to our [Client Libraries](storj-client-libraries/). You can also [host full static websites via the Linksharing service](../how-tos/host-a-static-website/).

## Regions of availability

| Region | CNAME                  |
| ------ | ---------------------- |
| Asia   | link.ap1.storjshare.io |
| EU     | link.eu1.storjshare.io |
| US     | link.us1.storjshare.io |
