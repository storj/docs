---
title: Rucio
slug: how-tos/configuring-rucio-with-storj
createdAt: 2022-08-15T22:47:14.000Z
updatedAt: 2023-03-09T18:47:00.000Z
docId: LUZSWyVR7NPwpyzgBD7S6
pageTitle: Configuring Rucio with Storj
---

## Overview

Rucio is an open-source software framework that provides scientific collaborations with the functionality to organize, manage, and access their data at scale. This tutorial walks through the steps needed to configure a [Rucio Storage Element (RSE)](https://rucio.cern.ch/documentation/rucio_storage_element) with a [demo of Rucio](https://rucio.cern.ch/documentation/setting_up_demo/).

These configuration instructions were adapted from the draft instructions being developed in the Rucio GitHub project: [Create documentation page for S3-type storage](https://github.com/rucio/rucio/issues/5450)

### Setup a demo environment

**Prerequisites:**

*   Docker is installed and running: <https://docs.docker.com/get-docker/>

{% callout type="info"  %} 
Already have a Rucio environment?

Skip ahead to [](docId\:LUZSWyVR7NPwpyzgBD7S6)&#x20;
{% /callout %}

### Clone Rucio and jump into the docker container

{% callout type="info"  %} 
Note that if you get an error like `No such container: dev_rucio_1` run `docker ps`  to identify the name of your rucio container (it may be something like "dev-rucio-1)
{% /callout %}

```console
git clone https://github.com/rucio/rucio
cd rucio
docker-compose --file ./etc/docker/dev/docker-compose.yml up -d
docker exec -it dev_rucio_1 /bin/bash
```

***

The rest of the commands are to be executed within the Docker container

### Initialize the database

```console
tools/run_tests_docker.sh -i
```

### Update the ca-certificates package

{% callout type="info"  %} 
The image has python3 linked in `/usr/bin/python`  but yum requires python2



One workaround is to change the first line of `/usr/bin/yum`  and `/usr/libexec/urlgrabber-ext-down`&#x20;&#x20;to use `/usr/bin/python2` .&#x20;



`vi /usr/bin/yum` < now change "python" to "python2" in the first line

sdf

`vi /usr/libexec/urlgrabber-ext-down` < now change "python" to "python2" in the first line
{% /callout %}

```console
yum update ca-certificates
```

### Configure the Storj RSE

The [gfal protocol](https://github.com/rucio/rucio/blob/master/lib/rucio/rse/protocols/gfal.py) was chosen because s3boto was recently removed and the draft rucio doc (linked [here](https://github.com/rucio/rucio/issues/5450)) suggested using it to support s3. gfal is used to send requests like get, put, delete, rename, and copy to the RSE.

```console
# replace YOUR_BUCKET_NAME with your storj bucket
rucio-admin rse add STORJ
rucio-admin rse add-protocol --hostname gateway.storjshare.io --scheme https --port 443 --prefix YOUR_BUCKET_NAME --impl rucio.rse.protocols.gfal.NoRename --domain-json '{"wan": {"read": 1, "write": 1, "delete": 1, "third_party_copy_read": 1, "third_party_copy_write": 1}, "lan": {"read": 1, "write": 1, "delete": 1}}' STORJ
rucio-admin rse set-attribute --rse STORJ --key sign_url --value s3
rucio-admin rse set-attribute --rse STORJ --key skip_upload_stat --value True
rucio-admin rse set-attribute --rse STORJ --key verify_checksum --value False
rucio-admin rse set-attribute --rse STORJ --key strict_copy --value True
```

### Create rse-accounts.cfg

```console
# get your rse_id
rucio-admin rse info STORJ

# use your rse_id and s3 credentials below
cat >> etc/rse-accounts.cfg <<EOL
{
    "YOUR_RSE_ID": {
        "access_key": "YOUR_ACCESS_KEY",
        "secret_key": "YOUR_SECRET_KEY",
        "signature_version": "s3v4",
        "region": "us-east-1"
    }
}
EOL
```

### Upload and download a file

```console
rucio upload --rse STORJ --scope archive tools/test.file.1000
rucio download archive:test.file.1000
```

### What Next?

**Explore the Rucio Documentation**

[<https://rucio.cern.ch/documentation/>](https://rucio.cern.ch/documentation/)

**Set up a Rucio Client**

*   Rucio CLI
    *   <https://rucio.cern.ch/documentation/setting_up_the_rucio_client>

*   Rucio WebUI
    *   <https://hub.docker.com/r/rucio/rucio-ui>

    *   <https://github.com/rucio/webui>

**Getting additional Rucio Support**

If you are looking for additional support, Rucio has a mailing list [rucio-users@googlegroups.com]() as well as a [slack support channel](https://rucio.slack.com/messages/#support).

