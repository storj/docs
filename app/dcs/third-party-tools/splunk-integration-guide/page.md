---
title: Splunk
docId: QlBLsOc7Q7MhxEDvM9cod
redirects:
  - /dcs/how-tos/splunk-integration-guide
pageTitle: Splunk Integration Guide
---

[Splunk](https://www.splunk.com/) is a data analytics platform that provides data-driven insights across all aspects of a company.

Visit <https://www.splunk.com/> for more information.&#x20;

## Advantages of Splunk with Storj

1.  Adds powerful features to your data storage. Monitor, analyze, and visualize data.

2.  Access your data from anywhere thanks to Splunk's unified hybrid experience.

## Integration

Integrating Splunk with Storj requires S3 credentials from Storj that will be added to the [indexes.conf]() in Splunk.

Splunk Enterprise integrates with any S3-compatible cloud storage platform.&#x20;

To complete the integration, you will need:

- A Storj account&#x20;

- An on-premises instance of Splunk&#x20;

Splunk is compatible with Windows, Mac, and Linux OS.&#x20;

To complete the integration, follow the steps below.

---

### Create a Storj Account

To begin, you will need to create a Storj account. If you already an account, go to <https://storj.io/login>.

Navigate to <https://storj.io/signup> to sign up. Enter your full name, email address, and a password, as shown below:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/x1VMINrRdadrVk5vLXIBT_capture.PNG)

### Create a Bucket 

Once you have your Storj account you can create a bucket for your data to be stored in.

1\. Navigate to “Buckets” on the left side menu.

2\. Click “New Bucket” on the top right.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/jbnQ38ynnrWl0jnO_j-E5_comet-backup-storj-2.png)

3\. Assign the bucket an easily identifiable name, such as "my-bucket".

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/K65vHcrJtRq4S87jICtYx_screenshot-2023-03-09-at-110429-am.png)

4\. Click **Create bucket**

### Generate S3 credentials

Storj has an Amazon S3 compatible API and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj web console:

1\. Navigate to **Access** on the left side menu.

2\. Click **Create S3 Credentials** under the S3 Credentials block.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/EZyAl8Wux2GOlyPd70HnI_screenshot-2023-03-09-at-110900-am.png)

3\. When the Create Access screen comes up, set specifications according to the following guidelines:

- **Type:** S3 Credentials

- **Name:** The name of the credentials (e.g. my-access)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Cv1Lirp-3-OueRk-YAR8u_image.png)

4\. Click **Continue** to provide permissions

- **Permissions:** All

- **Buckets:** Feel free to specify the bucket you created above (e.g. my-bucket), or leave as “All”

- **End date**: provide an expiration date for these credentials (optional)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/gQ8jBHtvd5sFZFuAqth_h_image.png)

5\. Click **Continue** to provide Access encryption Information

- **Use the current passphrase**: this is default option

- **Advanced**: you may provide a different encryption phrase either your own or generate a new one.

  - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase

  - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Uxn8zBqXQVmQvsswV3pJ2_image.png)

{% callout type="warning"  %}
In order to see the data uploaded to your bucket in the web console, you must unlock the bucket with the same encryption passphrase as the credentials.
{% /callout %}

6\. Click **Create Access** to finish creation of your S3 credentials

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/zk2JE9Z6f3vk_R2cjpdqc_image.png)

7\. Click **Confirm** the Confirm details pop-up message

8\. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/xH5tgzVKXn-uK2hVfSo8e_image.png)

---

## Connecting Splunk to Storj

To complete the integration, you will need the S3 credentials created in the previous steps and an instance of Splunk Enterprise on your local machine.

### Splunk Access

To get started with Splunk Enterprise, visit <https://www.splunk.com/en_us/products/splunk-enterprise.html>. Either request a free trial or contact the Splunk sales team.

### Connect Storj remote storage

1\. To connect Storj remote storage to Splunk, add Storj volume information to indexes.conf. This is usually added at the top of the file.&#x20;

See Splunk's [indexes.conf](https://docs.splunk.com/Documentation/Splunk/7.3.1/Admin/Indexesconf#indexes.conf.spec) documentation for more details.

Name this volume Storj and specify credentials underneath.

- The access key, secret key, and endpoint are those generated in Storj in the previous steps of this tutorial.

- For the `path` , use `s3://splunk/` .

- Set `maxGlobalDataSizeMB` to 5 for optimal performance.

```shell
[volume:Storj]

storageType = remote

path = s3://splunk/

remote.s3.access_key = ACCESS_KEY

remote.s3.secret_key = SECRET_KEY

remote.s3.endpoint = https://gateway.storjshare.io

remote.s3.auth_region = global

maxGlobalDataSizeMB = 5

# If versioning is not being utilized add:

# remote.s3.supports_versioning = false
```

2\. Restart Splunk

### Verify Connectivity

1\. Create a test file using the following command:

```shell
echo "test" > test01.txt
```

2\. Use Splunk to attempt to push the test file into Storj using the Storj volume just created in Splunk:

```shell
./opt/splunk/bin/splunk cmd splunkd rfs -- ls --starts-with volume:Storj
```

3\. You should see the file listed in the shell and in your Storj web UI.&#x20;

```shell
Size	Name
12B	test01.txt
```

### Add the remote storage to a provisioned index

1\. In Splunk, create an index and name it something memorable such as "Storj". This is the index you will add the Storj volume to.

2\. Mount the Storj volume under the Storj index stanza in indexes.conf:

```shell
[Storj]

  coldPath = $SPLUNK_DB/Storj/colddb

  enableDataIntegrityControl = 0

  enableTsidxReduction = 0

  homePath = $SPLUNK_DB/Storj/db

  maxTotalDataSizeMB = 512000

  thawedPath = $SPLUNK_DB/Storj/thaweddb

  remotePath = volume:Storj/Storj

  hotlist_bloom_filter_recency_hours = 48

  hotlist_recency_secs = 86400
```

3\. Restart Splunk

```shell
./opt/splunk/bin/splunk restart
```

4\. Force a data roll from hot to warm for testing purposes by performing an internal rest call. You will need to authenticate with your Splunk username and password.

```shell
./splunk _internal call /data/indexes/Storj/roll-hot-buckets –auth (admin_username):(admin_password)
```

Alternate call without credentials. You will still be prompted for credentials:

```shell
./opt/splunk/bin/splunk _internal call /data/indexes/Storj/roll-hot-buckets
```

### Success!

Once the bucket is rolled to warm, it will populate in its own folder within the Storj bucket. Smart Store has been fully enabled for the index.

Smartstore allows many other items to be configured, please reference the following documentation for additional configuration options:

- Indexes.conf <https://docs.splunk.com/Documentation/Splunk/7.3.1/Admin/Indexesconf>

- Smart Store <https://docs.splunk.com/Documentation/Splunk/9.0.1/Indexer/ConfigureSmartStore>
