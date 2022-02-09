---
description: >-
  Ensure your storage node is getting pieces by keeping your software up to
  date.
---

# Software Updates

## Automatic Updates

You can set up automatic updates for your `storagenode` Docker container using `watchtower`. Watchtower will look for new updates to the Docker container on Docker Hub in a random interval between 12 and 72 hours and automatically update your storage node when it sees a new version.&#x20;

First, please pull the latest watchtower image from docker:

```
docker pull storjlabs/watchtower
```

To set up auto-update for `storagenode`, please run the following command once:&#x20;

```
docker run -d --restart=always --name watchtower -v /var/run/docker.sock:/var/run/docker.sock storjlabs/watchtower storagenode watchtower --stop-timeout 300s
```

If you want to double check that watchtower is properly running, you can run the following command

```
docker ps -a
```

You should see the "storjlabs/watchtower:latest" container with the uptime under the "status" column

## Manual Updates

Please use manual updates only if the automatic update method was unsuccessful, or is unavailable for your node configuration.&#x20;

1\. Stop the running Storage Node container:

```bash
docker stop -t 300 storagenode
```

2\. Remove the existing container:

```bash
docker rm storagenode
```

3\. Pull the latest image from docker:

```
docker pull storjlabs/storagenode:latest
```

4\. Start your storage node again by running the following command after editing `WALLET`, `EMAIL`, `ADDRESS`, `STORAGE`, `<identity-dir>`, and `<storage-dir>`: [Running the Storage Node](storage-node.md#running-the-storage-node)

{% hint style="warning" %}
**Previous versions of the`docker run storagenode`command that used the `-v` rather than the `--mount` option will not work properly. Copy the updated command below.**&#x20;
{% endhint %}
