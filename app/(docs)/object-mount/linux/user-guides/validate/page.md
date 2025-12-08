---
title: Validate Functionality & Access Object Storage
hideTitle: false
docId: JDK2ED8HGFmyaxk
weight: 1
metadata:
  title: Validate Object Mount & Access Object Storage
  description:
    After installation, steps to run and validate Object Mount for Linux.
hidden: false
---

After [installing Object Mount](docId:iethahkeeX5EiJoh), you should:

  1. Run and Validate global functionality by accessing public buckets
  2. Import S3 credentials into Object Mount
  3. Connect to your private Object Storage buckets

Details for each step is outlined below:

## Step 1. Validate Object Mount’s Public Connectivity

The following steps will help you verify that Object Mount is running correctly and can connect to publicly accessible S3 storage buckets.

**1a. Enter Object Mount’s CLI Console (aka “cunoFS”)**

- From a Linux shell prompt enter the `cuno` command:
  ```
  user:~$ cuno
  ```

- You should see the `(cuno)` CLI prefix to the left of your user prompt. This indicates that a new shell has been launched, wrapped in Object Mount’s `cuno` wrapper:
  ```
  user:~$ cuno
  (cuno) user:~$
  ```

  {% callout type="info" %}
    **Adding `cuno` to the PATH**

    If the Object Mount `cuno` application cannot be found (`cuno: command not found`), add the [install location](docId:ahWohd5eegh6eizi#installation-locations-scripted-installers) to your `$PATH` variable.
  {% /callout %}

- Enter `exit` at any time to close the Object Mount CLI console and return to the unwrapped shell prompt:
  ```
  (cuno) user:~$ exit
  user:~$
  ```

**1b. Explore Public Datasets**

Validate that Object Mount can reach Internet-based object storage buckets by listing the files in several public S3 repositories:

- View image file listings from the James Webb Space Telescope on AWS S3:

  ```
  (cuno) $ ls s3://stpubdata/jwst/public/
  ```

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-list-aws-bucket.jpg)

- Browse satellite images on Google Cloud Storage:
  ```
  (cuno) $ ls gs://gcp-public-data-landsat/
  ```

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-list-gc-bucket.jpg)


## Step 2. Import S3 Credentials

In order to access and mount your private Object Storage buckets you will need to save your S3 credentials to a file. 

Instructions on obtaining your credentials and saving them to a file can be found in the Concepts article: [](docId:E4NhE5kPdjURRajJ).

Once your credentials have been saved to a file on your Linux drive, proceed with the following steps:

**2a. Import Your Credential File into Object Mount**

Assuming you have saved your credentials to a file named `credentials.txt`, run the following command to add these credentials to the local set of Object Mount managed credentials:

```sh
cuno creds import credentials.txt
```

This command will attempt to discover all the buckets that your credentials have access to, as well as the settings, limitations, and compatibility of these buckets. This may take a while if you have _many_ buckets associated with the credentials you are importing.

```sh
cuno creds import credentials.txt
- Examining credential file..
- Importing credential file into CUNO's credentials store..
- Detecting available buckets/containers..
Detected buckets: 2     
- Attempting to pair 2 buckets/containers..
Paired 2/2 buckets: 
 [+] s3://bucket01
 [+] s3://bucket02
```

You can display your imported credentials with the `cuno creds list` command:

```
+-------------+
| credentials |
+-------------+
 [*] credentials.s3c

+----------+
| pairings |
+----------+
 [*] s3://bucket01 -> credentials.s3c
 [*] s3://bucket02 -> credentials.s3c
```

Notice that a new credential file has been created with the `.s3c` extension, and that two buckets were found using the credentials.

{% callout type="note"  %}
  **Generated `.s3c` Credential File Location**

  The `cuno creds import` command creates an `.s3c` file with the corresponding bucket entries and adds appropriate configuration settings such as: region, URL path style, etc.

  The default location for storing these imported credentials is the directory `$XDG_CONFIG_HOME/cuno/creds` (if unset, `$XDG_CONFIG_HOME` defaults to `~/.config`). 

  To use an alternative location, set the `CUNO_CREDENTIALS` environment variable to point to your preferred path. 
  
  For example: `export CUNO_CREDENTIALS=/home/user/my-cloud-credentials`.

  **Note:** You should _not_ manually copy your credentials directly into these locations.
{% /callout %}

**2b. Troubleshooting Credential Import**

**Purge and Re-Import:**

If you encounter an issue and need to re-import your credential file, you must first remove the previously generated (and unwanted) `.s3c` credential file using the `purge` command:

```sh
cuno creds purge credentials.s3c
```

_See the [](docId:aish4shuiheeZaig) article for additional `cuno cred` details._

**S3 Compatibility Check:**

If you are using an S3-compatible service and are having problems, you can run a compatibility check using the `detectfeatures` command:

```sh
cuno creds detectfeatures s3://bucket-to-test credentials.txt
```

This command will iterate through multiple S3-compatibility tests, settings, and limitations, and then reconfigure and adjust the generated credentials `.s3c` file based on its findings. 

**Note:** The bucket specified must permit **write access** to allow for the creation of temporary files for testing purposes.

{% callout type="warning"  %}
  **Feature Detection: Bandwidth & Time Usage**

  Running feature detection may use up to a few gigabytes of bandwidth and may take a several minutes to complete depending on the machine’s connection speed and the S3 storage provider.
{% /callout %}


## Step 3. Test Connectivity to Your Private Object Storage Bucket(s)

Once your credentials have been successfully imported you can test access to your private buckets.

**3a. Enter Object Mount’s CLI Console (aka “cunoFS”)**

- From a Linux shell prompt enter the `cuno` command:
  ```
  user:~$ cuno
  ```

- You should see the `(cuno)` CLI prefix to the left of your user prompt. This indicates that a new shell has been launched, wrapped in Object Mount’s `cuno` wrapper:
  ```
  user:~$ cuno
  (cuno) user:~$
  ```

**3b. Access Your Bucket’s Contents**

Select your Object Storage Provider below for the appropriate commands to:

  - View buckets
  - View files
  - Create files
  - Display files
  - Delete files

{% tabs %}

  {% tab label="AWS S3" %}
  List your accessible buckets:
  ```
  (cuno) $ ls s3://
  ```

  List files and folders in a bucket:
  ```  
  (cuno) $ ls s3://bucket01/
  ```

  Create a new object in your bucket
  ```
  (cuno) $ echo "hello world" > s3://bucket01/helloworld.txt
  ```

  Display that new file back to the console:
  ```
  (cuno) $ cat s3://bucket01/helloworld.txt
  ```

  Delete that new file:
  ```
  (cuno) $ rm s3://bucket01/helloworld.txt
  ```
  {% /tab %}

  {% tab label="Storj" %}
  List your accessible buckets:
  ```
  (cuno) $ ls s3://
  ```

  List files and folders in a bucket:
  ```
  (cuno) $ ls s3://bucket01/
  ```

  Create a new object in your bucket
  ```
  (cuno) $ echo "hello world" > s3://bucket01/helloworld.txt
  ```

  Display that new file back to the console:
  ```
  (cuno) $ cat s3://bucket01/helloworld.txt
  ```

  Delete that new file:
  ```
  (cuno) $ rm s3://bucket01/helloworld.txt
  ```
  {% /tab %}

  {% tab label="Microsoft Azure" %}
  List your accessible buckets:
  ```
  (cuno) $ ls az://
  ```

  List files and folders in a bucket:
  ```
  (cuno) $ ls az://your-azure-storage-account/bucket01/
   ```

  Create a new object in your bucket
  ```
  (cuno) $ echo "hello world" > az://your-azure-storage-account/bucket01/helloworld.txt
  ```

  Display that new file back to the console:
  ```
  (cuno) $ cat az://your-azure-storage-account/bucket01/helloworld.txt
  ```

  Delete that new file:
  ```
  (cuno) $ rm az://your-azure-storage-account/bucket01/helloworld.txt
  ```
  {% /tab %}

  {% tab label="Google Cloud" %}
  List your accessible buckets:
  ```
  (cuno) $ ls gs://
  ```

  List files and folders in a bucket:
  ```
  (cuno) $ ls gs://bucket01/
   ```

  Create a new object in your bucket
  ```
  (cuno) $ echo "hello world" > gs://bucket01/helloworld.txt
  ```

  Display that new file back to the console:
  ```
  (cuno) $ cat gs://bucket01/helloworld.txt
  ```

  Delete that new file:
  ```
  (cuno) $ rm gs://bucket01/helloworld.txt
  ```
  {% /tab %}   

  {% tab label="Other S3 Compatible" %}
  List your accessible buckets:
  ```
  (cuno) $ ls s3://
  ```

  List files and folders in a bucket:
  ```
  (cuno) $ ls s3://bucket01/
  ```

  Create a new object in your bucket
  ```
  (cuno) $ echo "hello world" > s3://bucket01/helloworld.txt
  ```

  Display that new file back to the console:
  ```
  (cuno) $ cat s3://bucket01/helloworld.txt
  ```

  Delete that new file:
  ```
  (cuno) $ rm s3://bucket01/helloworld.txt
  ```
  {% /tab %}
{% /tabs %}

**3c. Exit Object Mount’s CLI**

Enter `exit` at any time to close the Object Mount CLI console and return to the unwrapped shell prompt:

```
(cuno) user:~$ exit
user:~$
```
