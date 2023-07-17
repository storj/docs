---
title: Self-hosted S3 Compatible Gateway
slug: api-reference/s3-gateway
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-07-01T01:10:15.941Z
---

{% callout type="info"  %} 
A download can become a chargeable event for 2 times the actual file size if the gateway is running on another cloud provider. We recommend interfacing with the network directly through the [](docId\:TC-N6QQVQg8w2cRqvEqEf) or using our [](docId\:AsyYcUJFbO1JI8-Tu8tW3).
{% /callout %}

For a complete list of the supported architectures and API calls for the S3 Gateway, see [](docId\:eEZ6hkJK6U7J7SyVwV5Th).

## Minimum Requirements

✅  1 CPU

✅  2GB of RAM

Depending on the load and throughput, more resources may be required.

{% callout type="warning"  %} 
To save on costs and improve performance, please see [](docId\:rkPrCIwpTjmMKiZajeaxp).
{% /callout %}

## Dependencies

✅  [](docId\:TbMdOGCAXNWyPpQmH6EOq)&#x20;

✅  [](docId\:OXSINcFRuVMBacPvswwNU) or [](docId\:b4-QgUOxVHDHSIWpAf3hG)&#x20;

## Steps:

1.  [](docId\:EGM8O-1xt2Az03eBWT8Rf)&#x20;

2.  [](docId\:EGM8O-1xt2Az03eBWT8Rf)&#x20;

3.  [](docId\:EGM8O-1xt2Az03eBWT8Rf)&#x20;

4.  [](docId\:EGM8O-1xt2Az03eBWT8Rf)&#x20;

5.  [](docId\:EGM8O-1xt2Az03eBWT8Rf)&#x20;

## Get and install Gateway ST

Download, unzip, and install the binary for your OS:

::::tabs
:::tab{label="Windows"}
## Curl Download (PowerShell)

```curl
curl https://github.com/storj/gateway-st/releases/latest/download/gateway_windows_amd64.exe.zip -o gateway_windows_amd64.exe.zip; Expand-Archive gateway_windows_amd64.exe.zip -Destination . -Force
```

### Direct Download

[Windows Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway_windows_amd64.exe.zip)
:::

:::tab{label="Linux"}
### AMD64

### Curl Download

```curl
curl -L https://github.com/storj/gateway-st/releases/latest/download/gateway_linux_amd64.zip -O && unzip gateway_linux_amd64.zip
chmod 755 gateway
sudo mv gateway /usr/local/bin/gateway
```

### Direct Download

[Linux AMD64 Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway_linux_amd64.zip)

### ARM

### Curl Download

```curl
curl -L https://github.com/storj/gateway-st/releases/latest/download/gateway_linux_arm.zip -O && unzip gateway_linux_arm.zip
chmod 755 gateway
sudo mv gateway /usr/local/bin/gateway
```

### Direct Download

[Linux ARM Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway_linux_arm.zip)
:::

:::tab{label="macOS"}
### Curl Download

```Text
curl -L https://github.com/storj/gateway-st/releases/latest/download/gateway_darwin_amd64.zip -O && unzip gateway_darwin_amd64.zip
chmod 755 gateway
sudo mv gateway /usr/local/bin/gateway
```

### Direct Download

[macOS Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway_darwin_amd64.zip)
:::

:::tab{label="Docker"}
```Text
docker pull storjlabs/gateway
```
:::
::::

## Configure Gateway ST

You have two ways to configure your Gateway ST:

1.  [](docId\:EGM8O-1xt2Az03eBWT8Rf) (only if it is your first setup)

2.  [](docId\:EGM8O-1xt2Az03eBWT8Rf)&#x20;

### Interactive Setup

1\. Setup your S3 gateway by running the following command and following the instructions provided by the wizard:

::::tabs
:::tab{label="Windows"}
### PowerShell

[](docId:4qPQxa8HlvDIO1Kgqa2No)

```powershell
./gateway.exe setup
```
:::

:::tab{label="Linux"}
```bash
gateway setup
```
:::

:::tab{label="macOS"}
```bash
gateway setup
```
:::

:::tab{label="Docker"}
```dockerfile
docker run -it --rm --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway setup
```
:::
::::

2\. Enter the numeric choice or satellite address corresponding to the satellite you've created your account on.&#x20;

The satellite address should be entered as \<nodeid>@\<address>:\<port> for example: `12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777`, or just use the number from the list:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/BirgvyDy2IoOQ47RfoyHZ_self-s3-01.png)

3\. Choose an access name (this step may not yet be implemented in the version of S3 Gateway you are using - if you don't see this prompt, skip to step 5 below).

{% callout type="info"  %} 
If you would like to choose your own access name, please be sure to only use lowercase letters. Including any uppercase letters will result in your access name not getting recognized when creating buckets.
{% /callout %}

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/6vsa92CZ3AjvuQ0Hfc79__self-s3-02.png)

4\.  Enter the [](docId\:OXSINcFRuVMBacPvswwNU)  you generated:

![Didn't save your Access token? Simply create another one in the satellite web interface.](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Rw3hYkf0CYKx49aJUyCgU_self-s3-03.png)

5\. Create and confirm an encryption passphrase, which is used to encrypt your files before they are uploaded:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/r0PGzFlbeZmrAUhoUXuYJ_self-s3-04.png)

{% callout type="warning"  %} 
Please note that **Storj Labs does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.&#x20;
{% /callout %}

6\.  Your S3 gateway is configured and ready to use!

### Using an Access Grant

You can use two methods to obtain an Access Grant:

1.  [](docId\:Ch4vLynsEqyT2-3qDEBiy)

2.  [](docId\:b4-QgUOxVHDHSIWpAf3hG)&#x20;

Now we got our access grant and can configure the gateway as follows:

:::codeblocktabs
```windows
./gateway setup --access 14aV.... --non-interactive
```

```linux
gateway setup --access 14aV.... --non-interactive
```

```macos
gateway setup --access 14aV.... --non-interactive
```

```dockerfile
docker run -it --rm --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway setup --access 14aV.... --non-interactive
```
:::

This command will register the provided access as the default access in the gateway config file.

It is possible to have several access grants, see how [](docId\:SLxI54SPLjGgjhRWkKJdb).

## Run Gateway ST

The gateway functions as a daemon. Start it and leave it running.

:::::tabs
:::tab{label="Windows"}
```Text
./gateway.exe run
```
:::

:::tab{label="Linux"}
```Text
gateway run
```
:::

:::tab{label="macOS"}
```Text
gateway run
```
:::

::::tab{label="Docker"}
```Text
docker run -it --rm -p 127.0.0.1:7777:7777 --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway run
```

{% callout type="info"  %} 
If you want to connect to your S3 Gateway via the network, then you should replace the `-p 127.0.0.1:7777:7777` port mapping with `-p 7777:7777`
{% /callout %}
::::
:::::

The gateway should output your S3-compatible endpoint, access key, and secret key.

![Example terminal output](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/3WoImqP2O-QBdVwDK-eHV_self-s3-05.png)

If you are interested in more running options, checkout the Gateway ST Advanced Usage page where you can find how to:

1.  [](docId\:SLxI54SPLjGgjhRWkKJdb)

2.  [](docId\:SLxI54SPLjGgjhRWkKJdb)

3.  [](docId\:SLxI54SPLjGgjhRWkKJdb)

## Configure AWS CLI to use Gateway ST

{% callout type="info"  %} 
Please make sure you have [AWS S3 CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).
{% /callout %}

Once you do, in a new terminal session, configure it with your Gateway's credentials:

```Text
$ aws configure
docId: EGM8O-1xt2Az03eBWT8Rf
---
AWS Access Key ID: [Enter your Gateway's Access Key]
AWS Secret Access Key: [Enter your Gateway's Secret Key]
Default region name: [null]
Default output format: [null]

$ aws configure set default.s3.multipart_threshold 64MB
```

Then, test out some AWS S3 CLI commands!

{% callout type="success"  %} 
See also [](docId:20zlQyfMD9gmHJOUPx3jh)
{% /callout %}

## Try it out!

### Create a bucket

```none
aws s3 --endpoint=http://localhost:7777 mb s3://bucket-name
```

### Upload an object

```none
aws s3 --endpoint=http://localhost:7777 cp your-large-file.mp4 s3://bucket-name/your-large-file.mp4
```

### List objects in a bucket

```none
aws s3 --endpoint=http://localhost:7777 ls s3://bucket-name/
```

### Download an object

```none
aws s3 --endpoint=http://localhost:7777 cp s3://bucket-name/your-large-file.mp4 ~/Downloads/your-large-file.mp4
```

### Generate a URL for an object

```none
aws s3 --endpoint=http://localhost:7777 presign s3://bucket-name/your-large-file.mp4
```

(This URL will allow live video streaming through your browser or VLC)

### Delete an object

```none
aws s3 --endpoint=http://localhost:7777 rm s3://bucket-name/your-large-file.mp4
```

## All Commands

[`cp`](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html) - Copies a local file or S3 object to another location locally or in S3

[`ls`](https://docs.aws.amazon.com/cli/latest/reference/s3/ls.html) - List S3 objects and common prefixes under a prefix or all S3 buckets

[`mb`](https://docs.aws.amazon.com/cli/latest/reference/s3/mb.html) - Creates an S3 bucket

[`mv`](https://docs.aws.amazon.com/cli/latest/reference/s3/mv.html) - Moves a local file or S3 object to another location locally or in S3.

[`presign`](https://docs.aws.amazon.com/cli/latest/reference/s3/presign.html) - Generate a pre-signed URL for an S3 object. This allows anyone who receives the pre-signed URL to retrieve the S3 object with an HTTP GET request.

[`rb`](https://docs.aws.amazon.com/cli/latest/reference/s3/rb.html) - Deletes an empty S3 bucket

[`rm`](https://docs.aws.amazon.com/cli/latest/reference/s3/rm.html) - Deletes an S3 object

[`sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) - Syncs directories and S3 prefixes. Recursively copies new and updated files from the source directory to the destination. Only creates folders in the destination if they contain one or more files

And that's it! You've learned how to use our S3-compatible Gateway. Ideally, you'll see how easy it is to swap out AWS for the Uplink, going forward.

