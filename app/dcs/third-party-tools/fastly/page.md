---
title: Fastly
docId: LSHpad8pwMKZ50POWK2wM
tags:
  - content-delivery
redirects:
  - /dcs/how-tos/fastly-integration
metadata:
  title: Guide for Integrating Fastly with Storj
  description:
    A step-by-step guide on how to connect Storj buckets with Fastly, configure
    Fastly as edge server, and verify the Fastly service configuration.
---

## Introduction

Fastly's CDN platform allows users to distribute their content among the Fastly edge cloud service. You can easily configure your buckets on Storj as a source of content and integrate them with Fastly.

## Prerequisites

Before you can connect your buckets to Fastly, you will first need a Fastly account. Once that is set up, follow the instructions below to configure a Fastly service with your buckets as an origin host.

## Setting Up Fastly as an Edge Server

To make your buckets available through the Fastly edge cloud network, you will configure Storj as your Fastly service's origin server.

To do that, you must first [create a Fastly service](https://docs.fastly.com/en/guides/working-with-services#creating-a-new-service) using the following values as you go:

- For the new Fastly domain and host, set the **Domain Name** field to the hostname you will be using for your URL. For example, `cdn.example.com`

- When you get to the **Hosts** section on the **Origins** page, enter the address of the Storj gateway endpoint ([](docId:yYCzPT8HHcbEZZMvfoCFa)) you would like to use for this service. Include the name of your bucket, for example: `mybucket.gateway.us1.storjshare.io`

- After adding the host, click the pencil icon to **Edit this host** and check that the following are correctly filled out:

  - **Name**: Any name you would like to use for your Fastly service

  - **Address**: This should be the address of your gateway endpoint

Additionally, if you have enabled TLS for your gateway and wish to configure that, check the following fields as well:

- **Enable TLS**: The default for this is **Yes**

- **SNI hostname**: Select **Match the SNI hostname to the Certificate hostname**. The gateway address you filled out and double-checked above should automatically appear.

- **Certificate hostname**: This should be the same IP address or hostname of your gateway.

Note that if you are going to use AWS S3 integration, you may want to leave the **Override host** field blank when creating your service. Otherwise, it will override important authentication headers read by AWS (more on that below).

## Verifying the service is configured

Fastly creates a DNS mapping from the domain you entered when creating your service to `<domain>.global.prod.fastly.net`. So following the above steps, this would be `cdn.example.com.global.prod.fastly.net`.

Create an alias in your own DNS settings for the domain name you are using. For example, create a CNAME record mapping `cdn.example.com` to `global-nossl.fastly.net`

Fastly caches all content by default for 1 hour. This can be modified by sending a `Cache-Control` header. If you are unsure whether you are sending any cache control headers, you can verify with a simple cURL command:

```Text
$ curl -I https://cdn.example.com

Accept-Ranges: bytes
Content-Length: 250
Content-Type: application/xml
Server: MinIO/DEVELOPMENT.GOGET
Vary: Origin
Date: Wed, 20 Oct 2020 05:56:29 GMT
```

Since there are no `Cache-Control` headers in this example, the default cache of 1 hour will be applied.

### Advanced Cache Control

Fastly also has documentation on how different objects are cached. You can find more information in their [cache freshness docs](https://developer.fastly.com/learning/concepts/cache-freshness/).

## Using a bucket for origin hosting

To integrate your S3 compatible gateway as an origin with Fastly, first [create S3 credentials](docId:quai3ugaP9paich3ai5e). You will need the **Access key** and **Secret key**, as well as your bucket name and gateway endpoint.

Once you have the access grant you will use, enable your Fastly service to support the latest version of [Amazon's header-based authentication](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html) by creating a [custom VCL](https://docs.fastly.com/en/guides/uploading-custom-vcl) on Fastly.

Next create a Fastly [VCL snippet](https://docs.fastly.com/en/guides/about-vcl-snippets). Select the following options for your snippet:

- **Type**: select **within subroutine**

- In the dropdown box, select **miss**. Then, paste the following code into the **VCL** box. Update the variables where noted to the values from your access grant, bucket name, and bucket gateway:

```Text
declare local var.accessKey STRING;
declare local var.secretKey STRING;
declare local var.storjBucket STRING;
declare local var.storjGateway STRING;
declare local var.region STRING;
declare local var.canonicalHeaders STRING;
declare local var.signedHeaders STRING;
declare local var.canonicalRequest STRING;
declare local var.canonicalQuery STRING;
declare local var.stringToSign STRING;
declare local var.dateStamp STRING;
declare local var.signature STRING;
declare local var.scope STRING;


set var.accessKey = "YOUR_ACCESS_KEY";   # Change this value to your own data
set var.secretKey = "YOUR_SECRET_KEY";   # Change this value to your own data
set var.storjBucket = "YOUR_BUCKET_NAME";   # Change this value to your own data
set var.storjGateway = "STORJ-DCS_GATEWAY";   # Change this value to your own data
set var.region = "decentralized";


if (req.method == "GET" && !req.backend.is_shield) {

  set bereq.http.x-amz-content-sha256 = digest.hash_sha256("");
  set bereq.http.x-amz-date = strftime({"%Y%m%dT%H%M%SZ"}, now);
  set bereq.http.host = var.storjBucket "." var.storjGateway;
  set bereq.url = querystring.remove(bereq.url);
  set bereq.url = regsuball(urlencode(urldecode(bereq.url.path)), {"%2F"}, "/");
  set var.dateStamp = strftime({"%Y%m%d"}, now);
  set var.canonicalHeaders = ""
	"host:" bereq.http.host LF
	"x-amz-content-sha256:" bereq.http.x-amz-content-sha256 LF
	"x-amz-date:" bereq.http.x-amz-date LF
  ;
  set var.canonicalQuery = "";
  set var.signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  set var.canonicalRequest = ""
	"GET" LF
	bereq.url.path LF
	var.canonicalQuery LF
	var.canonicalHeaders LF
	var.signedHeaders LF
	digest.hash_sha256("")
  ;

  set var.scope = var.dateStamp "/" var.region "/s3/aws4_request";


  set var.stringToSign = ""
	"AWS4-HMAC-SHA256" LF
	bereq.http.x-amz-date LF
	var.scope LF
	regsub(digest.hash_sha256(var.canonicalRequest),"^0x", "")
  ;

  set var.signature = digest.awsv4_hmac(
	var.secretKey,
	var.dateStamp,
	var.region,
	"s3",
	var.stringToSign
  );


 set bereq.http.Authorization = "AWS4-HMAC-SHA256 "
	"Credential=" var.accessKey "/" var.scope ", "
	"SignedHeaders=" var.signedHeaders ", "
	"Signature=" + regsub(var.signature,"^0x", "")
  ;

  unset bereq.http.Accept;
  unset bereq.http.Accept-Language;
  unset bereq.http.User-Agent;
  unset bereq.http.Fastly-Client-IP;
}
```

Note that, as mentioned above, if you have an **override host** specified in your Fastly service settings, that value will cause the `http.host` header to be overwritten which could be invalid for AWS authentication.

See also [Storj DCS Object Storage on Fastly](https://docs.fastly.com/en/guides/storj-dcs-object-storage).
