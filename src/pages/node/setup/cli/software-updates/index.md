---
title: Software Updates
slug: setup/cli/software-updates
createdAt: 2022-08-30T18:25:24.000Z
updatedAt: 2023-04-17T05:13:22.000Z
---

## Automatic Updates

As of v1.52.2, the storagenode software will automatically update itself.  We recommend that you install Watchtower in the event that the base image needs updating. Watchtower will look for new updates to the Docker container on Docker Hub in a random interval between 12 and 72 hours and automatically update your storage node when it sees a new version.

First, please pull the latest watchtower image from docker:

```none
docker pull storjlabs/watchtower

```

To set up auto-update for storagenode, please run the following command once:

```none
docker run -d --restart=always --name watchtower -v /var/run/docker.sock:/var/run/docker.sock storjlabs/watchtower storagenode watchtower --stop-timeout 300s
```

If you want to double check that watchtower is properly running, you can run the following command

```none
docker ps -a

```

You should see the “storjlabs/watchtower\:latest” container with the uptime under the “status” column

## Manual Updates

Please use manual updates only if the automatic update method was unsuccessful, or is unavailable for your node configuration.

1\. Stop the running Storage Node container:

```none
docker stop -t 300 storagenode

```

2\. Remove the existing container:

```none
docker rm storagenode

```

3\. Pull the latest image from docker:

```none
docker pull storjlabs/storagenode:latest

```

4\. Start your storage node again by running the following command after editing `WALLET`, `EMAIL`, `ADDRESS`, `STORAGE`, `<identity-dir>`, and `<storage-dir>` [](docId\:HaDkV_0aWg9OJoBe53o-J).

{% callout type="warning"  %} 
**Previous versions of the command  **`docker run storagenode`**  that used the**`-v`** rather than the **`--mount`** option will not work properly. Copy the updated command from the **[](docId\:HaDkV_0aWg9OJoBe53o-J)** article.**
{% /callout %}

---undefineddocId: ojIatmeXyCN4rc-GPx8yW
