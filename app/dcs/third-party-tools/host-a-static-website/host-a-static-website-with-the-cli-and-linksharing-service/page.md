---
title: Host a Static Website with the Uplink CLI and Linksharing Service
docId: GkgE6Egi02wRZtyryFyPz
redirects:
  - >-
    /dcs/how-tos/host-a-static-website/host-a-static-website-with-the-cli-and-linksharing-service
---

You can use your own domain name and host your own static website on Storj DCS with the following setup.

{% callout type="info"  %}
**Static websites** serve files, including HTML, CSS, and Javascript files, exactly as they are stored on the server. All visitors will be served the same files.

**Dynamic websites** use server-side processing to generate the underlying code behind each page. They support Create, Read, Update, Delete operations against a database. Web views can be custom rendered to each user.
{% /callout %}

## Part 1: Uplink CLI

1.  Download the uplink binary ([](docId:h3RyJymEIi4gf2S9wVJg8)) and upload your static site files to Storj DCS. You may also upload your files in any other manner, but you will need the Uplink CLI for the remaining steps.

2.  Share the bucket or object prefix (not individual objects) that will be the root of your website/subdomain. At the root, name your home page`index.html`. The website will serve the index.html file automatically e.g.`http://www.example.test` and `http://www.example.test/index.html`will serve the same content. Anything shared with `--dns` will be _readonly_ and available _publicly_ (no secret key needed). You can optionally specify your preferred linkshare endpoint with `--base-url`

{% tabs %}
{% tab label="Windows" %}

```Text
./uplink.exe share --dns <hostname> sj://<bucket>/<prefix> --base-url <linkshare url>
```

{% /tab %}

{% tab label="Linux" %}

```Text
uplink share --dns <hostname> sj://<bucket>/<prefix> --base-url <linkshare url>
```

{% /tab %}

{% tab label="macOS" %}

```Text
uplink share --dns <hostname> sj://<bucket>/<prefix> --base-url <linkshare url>
```

{% /tab %}
{% /tabs %}

Notably, this mechanism allows you to host multiple websites from the same bucket by using different prefixes. You may also create multiple subdomains by using different hostnames (however, the Uplink CLI only generates info for one at a time).

The command above prints a zone file with the information needed to create 3 DNS records. Your CNAME should match the linkshare service domain (`link.storjshare.io` by default).

```Text
$ORIGIN example.com.
$TTL    3600
<hostname>    	IN	CNAME	link.storjshare.io.
txt-<hostname> 	IN	TXT  	storj-root:<bucket>/<prefix>
txt-<hostname> 	IN	TXT  	storj-access:<access key>
```

Remember to update the `$ORIGIN` from `example.com` to your domain name (keep the trailing `.`). You may also change the DNS `$TTL`.

For example, running

```Text
uplink share --dns www.example.com sj://bucket/prefix
```

&#x20; will output a zone file like the following:

```Text
$ORIGIN example.com.
$TTL    3600
www.example.com    	IN	CNAME	link.storjshare.io.
txt-www.example.com	IN	TXT  	storj-root:bucket/prefix
txt-www.example.com	IN	TXT  	storj-access:jqaz8xihdea93jfbaks8324jrhq1
```

## Part 2: DNS Provider

1\. In your DNS provider, create a CNAME record on your hostname using the CNAME from your generated zone file as the target name.

{% callout type="info"  %}
Ensure you include the trailing `.` at the end of your CNAME if your DNS providers allows.
{% /callout %}

2\. Create 2 TXT records, prepending `txt-` to your hostname.

**Root Path:** the bucket or object prefix key that you want your root domain to resolve to (and that contains your index.html file).

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/6lBTvetkB98edSAjvyB_q_root.png)

&#x20;**Access Key:** the readonly and public access key to your root path.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/jYrqviRrJEWf_dUioa0TE_access.png)

3\. You can check to make sure your DNS records are ready with `dig @1.1.1.1 txt-<hostname>.<domain> TXT`

4\. Optionally, if you create a page titled `404.html`in the root of your shared prefix, it will be served in 404 conditions.

5\. That's it! You should be all set to access your website! e.g.`http://www.example.test`

{% callout type="info"  %}
**Why is my browser telling me that my connection is not secure?**

While Linksharing links are secure, when you use a custom domain the browser is expecting a TLS certificate for your domain to be present on the Storj servers hosting the link. We do not generate this certificate by default, so you will need to upgrade to a Pro Account and follow the relevant steps for enabling TLS (HTTPS) for custom domains here: [](docId:RI4zz1sLvVEZ4ZcZbuT7l)&#x20;
{% /callout %}
