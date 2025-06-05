---
title: Bunny CDN
docId: pheaSeeSh5Eepee0ooth3
tags:
  - content-delivery
metadata:
  description: Learn how to use Storj as the origin service for Bunny CDN.
  title: 'Using Storj with Bunny CDN'
---

Bunny CDN is a content delivery network that works well with Storj, providing a caching layer beyond Storj's already reliable global performance.
Storj is great for distributing files around the world, but for some workloads a Content Delivery Network combined with Storj is the more appropriate choice.
CDNs leverage distributed caching to reduce latency and enhance website performance from servers located closer to the end-users.

The following directions show how to set up static website hosting with Storj and Bunny CDN.

## Create a publicly shared bucket / prefix in Storj

To work with Bunny CDN, you'll first need to share a bucket or prefix (folder) in Storj.

This can be done by following Part 1 of our [](docId:GkgE6Egi02wRZtyryFyPz) directions, or using the Storj.io's
[](docId:4oDAezF-FcfPr0WPl7knd#share-a-bucket).

If using our CLI tool, record the `storj-root` and `storj-access` values from the [](docId:GkgE6Egi02wRZtyryFyPz) directions.

If using the Storj.io website, you'll need to determine the `storj-root` and `storj-access` values from the Shared Link.
Visit the Shared Link in a browser, and copy the new, resulting URL.
This URL will follow a known formula: `https://link.storjshare.io/s/` + `storj-access` + `/` + `storj-root`.

In the example of `https://link.storjshare.io/s/jwm2j2juznpzcyl5kzgxzxvareoq/mybucket/myfolder/`,
record `storj-root:jwm2j2juznpzcyl5kzgxzxvareoq` and `storj-access:/mybucket/myfolder/`

{% callout type="info"  %}
The `storj-root` part of a Shared Link URL is "URL-encoded."
URL-encoded values often have slash characters ('/') replaced with `%2F`.
Visiting the URL in a browser is a convenient fix in most circumstances.
{% /callout %}

## Configure Bunny CDN

1. Log into Bunny.

2. Click `CDN` of the left hand menu.

3. Click `Add Pull Zone` in the upper right.

4. Enter any name in the Pull Zone Name section. Record the full domain name (EG: `example.b-cdn.net`) for later use.

5. Make a new [linkshare to the bucket or path](docId:cie0gae7voob2Weigh3c) of your choice

6. Your linkshare URL needs the `/s` replaced with `/raw` and the trailing `/` removed, should look like this if at path level: `https://link.storjshare.io/raw/jwm2j2juznpzcyl5kzgxzxvareoq/mybucket/myfolder`

7. Set `Origin URL` to your modified linkshare URL

8. Set `Host Header` to the URL to the desired final hostname (EG: `www.example.test`).

9. Chose your tier and pricing zones.

10. Click `Add Pull Zone`

11. Bunny will then give you a new url, for example `https://example.b-cdn.net`.

12. The cache at Bunny will hydrate via storj and will only need to rehydrate when the bunny cache expires.

## Configure Your Domain Registrar

1. In your DNS provider, create a CNAME record on your hostname corresponding to your Bunny domain created above (EG: `example.b-cdn.net`).

{% callout type="info"  %}
Ensure you include the trailing `.` at the end of your CNAME if your DNS providers allows.
{% /callout %}

2. Create two TXT records, prepending `txt-` to your hostname. Set them equal to your `storj-root` and `storj-access` values.

**Root Path:** the bucket or object prefix key that you want your root domain to resolve to (and that contains your index.html file).

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/6lBTvetkB98edSAjvyB_q_root.png)

**Access Key:** the readonly and public access key to your root path.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jYrqviRrJEWf_dUioa0TE_access.png)

3. You can check to make sure your DNS records are ready with `dig @1.1.1.1 txt-<hostname>.<domain> TXT`

4. Optionally, if you create a page titled `404.html`in the root of your shared prefix, it will be served in 404 conditions.

5. That's it! You should be all set to access your website! e.g.`http://www.example.test`

{% callout type="info"  %}
For more detailed information, refer to [Bunny's documentation for integrating Bunny CDN with Cloudflare](https://support.bunny.net/hc/en-us/articles/360001631951-How-to-set-up-BunnyCDN-with-a-custom-hostname-on-CloudFlare)
{% /callout %}
