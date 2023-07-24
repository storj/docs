---
title: Gateway ST Advanced Usage
slug: api-reference/s3-gateway/gateway-st-advanced-usage
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-06-02T04:06:07.000Z
docId: SLxI54SPLjGgjhRWkKJdb
---

Advanced usage for the single-tenant Gateway

## Configuration options

1.  [](docId\:SLxI54SPLjGgjhRWkKJdb)&#x20;

## Adding Access Grants

You can add several access grants to the `config.yaml`, using this format:

```Text
access: 14aV.... # default Access
accesses.site: 26NBm..... # the Access with name "site"
```

You can see the path to the default config file `config.yaml` with this command:

{% tabs %}
{% tab label="Windows" %}
```Text
./gateway help
```
{% /tab %}

{% tab label="Linux" %}
```Text
gateway help
```
{% /tab %}

{% tab label="macOS" %}
```Text
gateway help
```
{% /tab %}
{% /tabs %}

## Running options

1.  [](docId\:SLxI54SPLjGgjhRWkKJdb)

2.  [](docId\:SLxI54SPLjGgjhRWkKJdb)

3.  [](docId\:SLxI54SPLjGgjhRWkKJdb)

You can run a gateway with specifying the access grant (or its name) with the option `--access`, for example:

{% tabs %}
{% tab label="Windows" %}
```Text
./gateway run --access 14aV....
```

or with the name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
./gateway run --access site
```
{% /tab %}

{% tab label="Linux" %}
```Text
gateway run --access 14aV....
```

or with name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
gateway run --access site
```
{% /tab %}

{% tab label="macOS" %}
```Text
gateway run --access 14aV....
```

or with name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
gateway run --access site
```
{% /tab %}

{% tab label="Docker" %}
```Text
docker run -it --rm -p 127.0.0.1:7777:7777 --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway run --access 14aV....
```

or with name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
docker run -it --rm -p 127.0.0.1:7777:7777 --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway run --access site
```
{% /tab %}
{% /tabs %}

## Running Gateway ST to host a static website

You can also run a gateway to handle a bucket as a static website. Make sure to set [](docId\:SLxI54SPLjGgjhRWkKJdb).

{% tabs %}
{% tab label="Windows" %}
```Text
./gateway run --access 14aV.... --website
```

or with the name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
./gateway run --access site --website
```
{% /tab %}

{% tab label="Linux" %}
```Text
gateway run --access 14aV.... --website
```

or with name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
gateway run --access site --website
```
{% /tab %}

{% tab label="macOS" %}
```Text
gateway run --access 14aV.... --website
```

or with name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
gateway run --access site --website
```
{% /tab %}

{% tab label="Docker" %}
```Text
docker run -it --rm -p 127.0.0.1:7777:7777 --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway run --access 14aV.... --website
```

or with name of the access grant from your config (see [](docId\:SLxI54SPLjGgjhRWkKJdb))

```Text
docker run -it --rm -p 127.0.0.1:7777:7777 --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway run --access site --website
```
{% /tab %}
{% /tabs %}

Now you can navigate to <http://localhost:7777/site/> to see the bucket `site` as XML or to <http://localhost:7777/site/index.html> to see a static page, uploaded to the bucket `site`.

{% callout type="info"  %} 
You can publish this page to the internet, but in this case, you should run your gateway with the option `--server.address local_IP:local_Port` (replace`local_IP`with the local IP of your PC and`local_Port` with the port you want to expose).&#x20;

If you use`localhost` or `127.0.0.1` as your `local_IP,` you will not be able to publish it directly (via port forwarding for example), instead, you will have to use a reverse proxy here.
{% /callout %}

### Running Gateway ST to host a static website with cache

You can use the [Minio caching technology](https://docs.min.io/docs/minio-disk-cache-guide.html) in conjunction with the hosting of a static website.

> The following example uses `/mnt/drive1`, `/mnt/drive2` ,`/mnt/cache1` ... `/mnt/cache3` for caching, while excluding all objects under bucket `mybucket` and all objects with '.pdf' extensions on a S3 Gateway setup. Objects are cached if they have been accessed three times or more. Cache max usage is restricted to 80% of disk capacity in this example. Garbage collection is triggered when the high watermark is reached (i.e. at 72% of cache disk usage) and will clear the least recently accessed entries until the disk usage drops to the low watermark - i.e. cache disk usage drops to 56% (70% of 80% quota).

Export the environment variables before running the Gateway:

{% tabs %}
{% tab label="Windows" %}
Cache disks are not supported, because caching requires the [`atime`](http://kerolasa.github.io/filetimes.html) function to be enabled.

```Text
$env:MINIO_CACHE="on"
$env:MINIO_CACHE_EXCLUDE="*.pdf,mybucket/*"
$env:MINIO_CACHE_QUOTA=80
$env:MINIO_CACHE_AFTER=3
$env:MINIO_CACHE_WATERMARK_LOW=70
$env:MINIO_CACHE_WATERMARK_HIGH=90
```
{% /tab %}

{% tab label="Linux" %}
```Text
export MINIO_CACHE="on"
export MINIO_CACHE_DRIVES="/mnt/drive1,/mnt/drive2,/mnt/cache{1...3}"
export MINIO_CACHE_EXCLUDE="*.pdf,mybucket/*"
export MINIO_CACHE_QUOTA=80
export MINIO_CACHE_AFTER=3
export MINIO_CACHE_WATERMARK_LOW=70
export MINIO_CACHE_WATERMARK_HIGH=90
```
{% /tab %}

{% tab label="macOS" %}
```Text
export MINIO_CACHE="on"
export MINIO_CACHE_DRIVES="/mnt/drive1,/mnt/drive2,/mnt/cache{1...3}"
export MINIO_CACHE_EXCLUDE="*.pdf,mybucket/*"
export MINIO_CACHE_QUOTA=80
export MINIO_CACHE_AFTER=3
export MINIO_CACHE_WATERMARK_LOW=70
export MINIO_CACHE_WATERMARK_HIGH=90
```
{% /tab %}

{% tab label="Docker" %}
You can create a file with environment variables, for example - `minio_vars` with such content:

```Text
MINIO_CACHE="on"
MINIO_CACHE_DRIVES="/mnt/drive1,/mnt/drive2,/mnt/cache{1...3}"
MINIO_CACHE_EXCLUDE="*.pdf,mybucket/*"
MINIO_CACHE_QUOTA=80
MINIO_CACHE_AFTER=3
MINIO_CACHE_WATERMARK_LOW=70
MINIO_CACHE_WATERMARK_HIGH=90
```

For Windows, the option `-e MINIO_CACHE_DRIVES` is useless due to the lack of an [`atime`](http://kerolasa.github.io/filetimes.html) function, and can be removed with mounts those drives to the docker container.

Then add parameters `--env-file ./minio_vars --mount type=bind,src=/mnt/drive1,dst=/mnt/drive1 --mount type=bind,src=/mnt/drive2,dst=/mnt/drive2 --mount type=bind,src=/mnt/cache1,dst=/mnt/cache1 --mount type=bind,src=/mnt/cache2,dst=/mnt/cache2 --mount type=bind,src=/mnt/cache3,dst=/mnt/cache3` to the `docker run` section, for example:

```Text
docker run -it --rm -p 127.0.0.1:7777:7777 --env-file ./minio_vars --mount type=bind,src=/mnt/drive1,dst=/mnt/drive1 --mount type=bind,src=/mnt/drive2,dst=/mnt/drive2 --mount type=bind,src=/mnt/cache1,dst=/mnt/cache1 --mount type=bind,src=/mnt/cache2,dst=/mnt/cache2 --mount type=bind,src=/mnt/cache3,dst=/mnt/cache3 --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway run --access site --website
```
{% /tab %}
{% /tabs %}

{% callout type="info"  %} 
Setting `MINIO_BROWSER=off` env variable would disable the Minio browser. This would make sense if running the gateway as a static website in production.
{% /callout %}

