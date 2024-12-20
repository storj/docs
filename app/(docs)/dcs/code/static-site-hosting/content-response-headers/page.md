---
title: Content response headers
docId: eug9caeS8fee5Ep3
metadata:
  title: Content response headers
  description: Linksharing will respond with certain headers if they are set on an object's metadata.
---
 
Linksharing will respond with certain headers if they are set on an object's metadata.

This metadata can be set when uploading a file using either native Storj upload using Uplink, or using an S3 gateway.

A few common examples:

* Uplink CLI: `uplink cp /tmp/myfile.txt sj://files/myfile.txt --metadata '{"content-type":"text/html","cache-control":"no-cache"}'`
* AWS S3 CLI: `aws s3 cp /tmp/myfile.txt s3://files/myfile.txt --content-type text/html --cache-control no-cache`

The following headers can be customized:

* `Content-Type`
* `Cache-Control`
* `Content-Encoding`

Linksharing will look for metadata header names in an object by the following order:

* `Content-Type` (canonical form)
* `content-type` (all lowercase, typically how S3 gateway sets this header metadata on upload)
* any other case that is found first in the list

Metadata header names set through AWS S3 CLI or SDKs will be lowercase. Uplink currently does not automatically normalize these, so it is recommended to consistently use lowercase header names when setting metadata with Uplink if you're using both Uplink and S3 to interact with your storage.

See sections below for further details.

## Content-Type

This header indicates the media type of content.

If no type is set in metadata, Linksharing will attempt to detect the type based on the file extension of the object key. It will also detect if a default value of `application/octet-stream` or `binary/octet-stream` is set. S3 clients and SDKs typically set these defaults automatically if a type was not specified on upload.

If you wish to avoid this detection on default types, you can set `X-Content-Type-Options: nosniff` in the request headers.

If a type is missing from metadata and detection is disabled, then type defaults to `application/octet-stream`.

See [Content-Type - HTTP - MDN Web Docs](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Type) for more information.

## Cache-Control

This header influences caching behavior of browsers and shared caches (e.g. proxies, CDNs).

Linksharing does not set a default for this header.

See [Cache-Control - HTTP - MDN Web Docs](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control) for more information.

## Content-Encoding

This header indicates any encoding applied to the content.

This is useful for indicating already compressed content that should be decompressed by the client when downloaded from Linksharing. For example, for static web assets. In the case of a CSS file, you would compress the file and upload it with `Content-Type: text/css` and `Content-Encoding: gzip` as the metadata.

Linksharing does not set a default for this header unless you are accessing a compressed zip file, in which case it will be set to `gzip`.

See [Content-Encoding - HTTP - MDN Web Docs](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Encoding) for more information.
