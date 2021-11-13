---
description: >-
  A local application that mimics the AWS S3 API. Migrate your data from AWS to
  Storj DCS with minimal effort.
---

# Self-hosted S3 Compatible Gateway

{% hint style="info" %}
A download can become a chargeable event for 2 times the actual file size if the gateway is running on another cloud provider. We recommend interfacing with the network directly through the [Uplink Library](../uplink-cli/) or using our[ hosted Gateway MT](../../getting-started/gateway-mt/).
{% endhint %}

For a complete list of the supported architectures and API calls for the S3 Gateway, see [Concepts: S3 Compatibility](../../concepts/s3-compatibility.md).&#x20;

## Minimum Requirements

✅  1 CPU

✅  2GB of RAM

Depending on the load and throughput, more resources may be required.

{% hint style="warning" %}
To save on costs and improve performance, please see [this important note on multipart upload part sizes](../s3-compatible-gateway/multipart-upload/multipart-part-size.md).
{% endhint %}

## Dependencies

✅  [Storj DCS Satellite Account](../../getting-started/quickstart-uplink-cli/prerequisites.md#create-an-account)

✅  [Storj DCS Satellite token](../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md) or [Access grant](../../getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant.md)

## Steps:

1. [Get and install Gateway ST](./#get-and-install-gateway-st)
2. [Configure Gateway ST](./#configure-gateway-st)
3. [Run Gateway ST](./#run-gateway-st)
4. [Configure AWS CLI to use Gateway ST](./#configure-aws-cli-to-use-gateway-st)
5. [Try it out!](./#try-it-out)

## Get and install Gateway ST

Download, unzip, and install the binary for your OS:

{% tabs %}
{% tab title="Windows" %}
#### Curl Download (PowerShell)

```
curl https://github.com/storj/gateway-st/releases/latest/download/gateway_windows_amd64.exe.zip -o gateway_windows_amd64.exe.zip; Expand-Archive gateway_windows_amd64.exe.zip -Destination . -Force
```

#### Direct Download

[Windows Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway\_windows\_amd64.exe.zip)
{% endtab %}

{% tab title="Linux" %}
### AMD64

#### Curl Download

```
curl -L https://github.com/storj/gateway-st/releases/latest/download/gateway_linux_amd64.zip -O && unzip gateway_linux_amd64.zip
chmod 755 gateway
sudo mv gateway /usr/local/bin/gateway
```

#### Direct Download

[Linux AMD64 Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway\_linux\_amd64.zip)



### ARM

#### Curl Download

```
curl -L https://github.com/storj/gateway-st/releases/latest/download/gateway_linux_arm.zip -O && unzip gateway_linux_arm.zip
chmod 755 gateway
sudo mv gateway /usr/local/bin/gateway
```

#### Direct Download

[Linux ARM Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway\_linux\_arm.zip)
{% endtab %}

{% tab title="macOS" %}
#### Curl Download

```
curl -L https://github.com/storj/gateway-st/releases/latest/download/gateway_darwin_amd64.zip -O && unzip gateway_darwin_amd64.zip
chmod 755 gateway
sudo mv gateway /usr/local/bin/gateway
```

#### Direct Download

[macOS Gateway Binary](https://github.com/storj/gateway-st/releases/latest/download/gateway\_darwin\_amd64.zip)
{% endtab %}

{% tab title="Docker" %}
```
docker pull storjlabs/gateway
```
{% endtab %}
{% endtabs %}

## Configure Gateway ST

You have two ways to configure your Gateway ST:

1. [Interactive Setup](./#interactive-setup) (only if it is your first setup)
2. [Using an Access Grant](./#using-an-access-grant)

### Interactive Setup

1\. Setup your S3 gateway by running the following command and following the instructions provided by the wizard:

{% tabs %}
{% tab title="Windows" %}
#### PowerShell

[Navigate to the directory your **gateway.exe** file is located in](../../support/faqs.md#how-do-i-navigate-to-the-binary-location).

```
./gateway.exe setup
```
{% endtab %}

{% tab title="Linux" %}
```bash
gateway setup
```
{% endtab %}

{% tab title="macOS" %}
```bash
gateway setup
```
{% endtab %}

{% tab title="Docker" %}
```
docker run -it --rm --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway setup
```
{% endtab %}
{% endtabs %}

2\. Enter the numeric choice or satellite address corresponding to the satellite you've created your account on.&#x20;

The satellite address should be entered as \<nodeid>@\<address>:\<port> for example: `12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777`, or just use the number from the list:

![](<../../.gitbook/assets/image (114).png>)

3\. Choose an access name (this step may not yet be implemented in the version of S3 Gateway you are using - if you don't see this prompt, skip to step 5 below).

{% hint style="info" %}
If you would like to choose your own access name, please be sure to only use lowercase letters. Including any uppercase letters will result in your access name not getting recognized when creating buckets.
{% endhint %}

![](<../../.gitbook/assets/image (44).png>)

4\.  Enter the [API Key](../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md) you generated:

![Didn't save your Access token? Simply create another one in the satellite web interface.](../../.gitbook/assets/enter\_APIkey.png)

5\. Create and confirm an encryption passphrase, which is used to encrypt your files before they are uploaded:

![](<../../.gitbook/assets/encryption passphrase.png>)

{% hint style="warning" %}
Please note that **Storj Labs does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.&#x20;
{% endhint %}

6\.  Your S3 gateway is configured and ready to use!

### Using an Access Grant

You can use two methods to obtain an Access Grant:

1. [Obtain Access Grant with Uplink CLI](../../getting-started/quickstart-uplink-cli/sharing-your-first-object/generate-access.md)
2. [Obtain Access Grant with a Satellite UI](../../getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant.md)

Now we got our access grant and can configure the gateway as follows:

{% tabs %}
{% tab title="Windows" %}
```
./gateway setup --access 14aV.... --non-interactive
```
{% endtab %}

{% tab title="Linux" %}
```
gateway setup --access 14aV.... --non-interactive
```
{% endtab %}

{% tab title="macOS" %}
```
gateway setup --access 14aV.... --non-interactive
```
{% endtab %}

{% tab title="Docker" %}
```
docker run -it --rm --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway setup --access 14aV.... --non-interactive
```
{% endtab %}
{% endtabs %}

This command will register the provided access as the default access in the gateway config file.

It is possible to have several access grants, see how [here](gateway-st-advanced-usage.md#adding-access-grants).

## Run Gateway ST

The gateway functions as a daemon. Start it and leave it running.

{% tabs %}
{% tab title="Windows" %}
```
./gateway.exe run
```
{% endtab %}

{% tab title="Linux" %}
```
gateway run
```
{% endtab %}

{% tab title="macOS" %}
```
gateway run
```
{% endtab %}

{% tab title="Docker" %}
```
docker run -it --rm -p 127.0.0.1:7777:7777 --mount type=bind,source=/path/to/gateway-config-dir/,destination=/root/.local/share/storj/gateway/ --name gateway storjlabs/gateway run
```

{% hint style="info" %}
If you want to connect to your S3 Gateway via the network, then you should replace the `-p 127.0.0.1:7777:7777` port mapping with `-p 7777:7777`
{% endhint %}
{% endtab %}
{% endtabs %}

The gateway should output your S3-compatible endpoint, access key, and secret key.

![Example terminal output](<../../.gitbook/assets/image (43).png>)

If you are interested in more running options, checkout the Gateway ST Advanced Usage page where you can find how to:

1. [Run Gateway ST with an Access Grant](gateway-st-advanced-usage.md#running-gateway-st-with-an-access-grant)
2. [Run Gateway ST to host a static website](gateway-st-advanced-usage.md#running-gateway-st-to-host-a-static-website)
3. [Run Gateway ST to host a static website with cache](gateway-st-advanced-usage.md#running-gateway-st-to-host-a-static-website-with-cache)

## Configure AWS CLI to use Gateway ST

{% hint style="info" %}
Please make sure you have [AWS S3 CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).
{% endhint %}

Once you do, in a new terminal session, configure it with your Gateway's credentials:

```
$ aws configure
---
AWS Access Key ID: [Enter your Gateway's Access Key]
AWS Secret Access Key: [Enter your Gateway's Secret Key]
Default region name: [null]
Default output format: [null]

$ aws configure set default.s3.multipart_threshold 64MB
```

Then, test out some AWS S3 CLI commands!

## Try it out!

#### **Create a bucket**

{% tabs %}
{% tab title="AWS CLI" %}
```
aws s3 --endpoint=http://localhost:7777/ mb s3://bucket-name
```
{% endtab %}
{% endtabs %}

#### **Upload an object**

{% tabs %}
{% tab title="AWS CLI" %}
```
aws s3 --endpoint=http://localhost:7777/ cp ~/Desktop/your-large-file.mp4 s3://bucket-name
```
{% endtab %}
{% endtabs %}

#### **List objects in a bucket**

{% tabs %}
{% tab title="AWS CLI" %}
```
aws s3 --endpoint=http://localhost:7777 ls s3://bucket-name/
```
{% endtab %}
{% endtabs %}

#### **Download an object**

{% tabs %}
{% tab title="AWS CLI" %}
```
aws s3 --endpoint=http://localhost:7777 cp s3://bucket-name/your-large-file.mp4 ~/Desktop/your-large-file.mp4
```
{% endtab %}
{% endtabs %}

#### **Generate a URL for an object**

{% tabs %}
{% tab title="AWS CLI" %}
```
aws s3 --endpoint=http://localhost:7777 presign s3://bucket-name/your-large-file.mp4
```
{% endtab %}
{% endtabs %}

(This URL will allow live video streaming through your browser or VLC)

#### **Delete an object**

{% tabs %}
{% tab title="AWS CLI" %}
```
aws s3 --endpoint=http://localhost:7777 rm s3://bucket-name/your-large-file.mp4
```
{% endtab %}
{% endtabs %}

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

