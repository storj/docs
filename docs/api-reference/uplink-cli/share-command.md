---
description: Shares restricted access to objects
---

# share

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share [ALLOWED_PATH_PREFIX]... [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share [ALLOWED_PATH_PREFIX]... [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share [ALLOWED_PATH_PREFIX]... [flags]
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
An access generated using `uplink share` with no arguments creates an access to your **entire project** with read permissions.
{% endhint %}

## Flags

| Flag                    | Description                                                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--access string`       | the serialized access, or name of the access to use                                                                                                             |
| `--auth-service string` | <p>url for shared auth service</p><p>Asia https://auth.ap1.storjshare.io</p><p>US https://auth.us1.storjshare.io</p><p>EU https://auth.eu1.storjshare.io</p>    |
| `--base-url string`     | <p>the base url for link sharing </p><p>Asia https://link.ap1.storjshare.io</p><p>US https://link.us1.storjshare.io</p><p>EU https://link.eu1.storjshare.io</p> |
| `--disallow-deletes`    | if true, disallow deletes                                                                                                                                       |
| `--disallow-lists`      | if true, disallow lists                                                                                                                                         |
| `--disallow-reads`      | if true, disallow reads                                                                                                                                         |
| `--disallow-writes`     | if true, disallow writes                                                                                                                                        |
| `--dns string`          | specify your custom hostname. if set, returns dns settings for web hosting. implies `--register` and `--public`                                                 |
| `--export-to string`    | path to export the shared access to                                                                                                                             |
| `--help`, `-h`          | help for share                                                                                                                                                  |
| `--not-after`           | disallow access after this time (e.g. '+2h', '2020-01-02T15:01:01-01:00')                                                                                       |
| `--not-before`          | disallow access before this time (e.g. '+2h', '2020-01-02T15:01:01-01:00')                                                                                      |
| `--public`              | if true, the access will be public. `--dns`and `--url`override this                                                                                             |
| `--readonly`            | implies `--disallow-writes` and `--disallow-deletes`                                                                                                            |
| `--register`            | if true, creates and registers access grant                                                                                                                     |
| `--url`                 | if true, returns a url for the shared path. implies `--register` and `--public`                                                                                 |
| `--writeonly`           | implies `--disallow-reads` and `--disallow-lists`                                                                                                               |

## Examples

### Share a single object

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share sj://cakes/cheesecake.jpg
```
{% endtab %}
{% endtabs %}

Notice that by default, only download (read) and list operations are allowed.

```
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://cakes/cheesecake.jpg
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 12yUGNqdsKX1Xky2qVoGwdpL...
```

### Share a bucket with all permissions

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share sj://cakes/ --readonly=false
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share sj://cakes/ --readonly=false
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share sj://cakes/ --readonly=false
```
{% endtab %}
{% endtabs %}

As the `--readonly` flag is set to false, _uploads_ and _deletes_ are allowed.

```
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Allowed
Lists     : Allowed
Deletes   : Allowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://cakes/
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 12BncZWg9xc4GyXCgCi3YvBg...
```

### Register with Gateway MT

Generate credentials to use with our S3 multitenant gateway (beta): [GatewayMT](../../getting-started/gateway-mt/)

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share sj://cakes/ --register --auth-service=https://auth.us1.storjshare.io
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share sj://cakes/ --register --auth-service=https://auth.us1.storjshare.io
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share sj://cakes/ --register --auth-service=https://auth.us1.storjshare.io
```
{% endtab %}
{% endtabs %}

Notice the endpoint generated for Gateway MT `gateway.us1.storjshare.io` corresponds to the auth service used `auth.us1.storjshare.io`

```
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://cakes/ (entire bucket)
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 1Q74vfxunqiAQ15WPxPqreya...
========== CREDENTIALS ===================================================================
Access Key ID: jvguri...
Secret Key   : j3nj4x...
Endpoint     : https://gateway.us1.storjshare.io
```

### Link Sharing

You can also generate a URL to share your projects/buckets/objects

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share sj://cakes/ --url --base-url=https://link.us1.storjshare.io
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share sj://cakes/ --url --base-url=https://link.us1.storjshare.io
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share sj://cakes/ --url --base-url=https://link.us1.storjshare.io
```
{% endtab %}
{% endtabs %}

Note that specifying `--base-url` is optional.

```
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://cakes/ (entire bucket)
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 1Q74vfxunqiAQ15WPxPqreya...
========== CREDENTIALS ===================================================================
Access Key ID: jvguri...
Secret Key   : j3nj4x...
Endpoint     : https://gateway.us1.storjshare.io
Public Access: true
=========== BROWSER URL ==================================================================
REMINDER  : Object key must end in '/' when trying to share recursively
URL       : https://link.us1.storjshare.io/s/jvguri.../cakes
```

Also note that the URL uses the same Gateway MT access key, so if you have that already, you don't necessarily need to run this command to generate a shareable link.&#x20;

`https://link.<region>.storjshare.io/s/<access key>/<object path>`

To download content directly, use `/raw/` in Linkshare URL ex: [https://link.us1.storjshare.io/raw/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4](https://link.us1.storjshare.io/raw/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)

To view the object location map, use `/s/` in Linkshare URL ex: [https://link.us1.storjshare.io/s/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4](https://link.us1.storjshare.io/s/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)

### Webhosting

For more detail, visit the documentation on [hosting a static website with the Uplink CLI](../../how-tos/host-a-static-website/host-a-static-website-with-the-cli-and-linksharing-service.md).

While you may share individual objects with the above linksharing instructions, you must share a bucket or object prefix for webhosting. Your web address will render the index.html file.

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share --dns www sj://cakes/ --base-url https://link.us1.storjshare.io
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share --dns www sj://cakes/ --base-url https://link.us1.storjshare.io
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share --dns www sj://cakes/ --base-url https://link.us1.storjshare.io
```
{% endtab %}
{% endtabs %}

```
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://cakes/ (entire bucket)
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 12BncZWg9xc4GyXCDX73...
========== CREDENTIALS ===================================================================
Access Key ID: ju3ga56lfk7x...
Secret Key   : j2psszecoqtc...
Endpoint     : https://gateway.us1.storjshare.io
Public Access:  true
=========== DNS INFO =====================================================================
Remember to update the $ORIGIN with your domain name. You may also change the $TTL.
$ORIGIN example.com.
$TTL    3600
www    	IN	CNAME	link.us1.storjshare.io.
txt-www	IN	TXT  	storj-root:cakes
txt-www	IN	TXT  	storj-access:ju3ga56lfk7x...
```

Use the generated DNS info to connect your domain name to your shared objects.

Note you can use any hostname in place of `www` in the example. The base-url is also optional.
