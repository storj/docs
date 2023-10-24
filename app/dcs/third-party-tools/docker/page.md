---
title: Docker Container Registry
docId: pRj_WJuVm3TDmaSG6zM55
tags:
  - cloud-ops
redirects:
  - /dcs/how-tos/container-registry-docker
metadata:
  title: Utilizing Storj as a Docker Container Registry
  description:
    A guide on storing Docker containers on Storj infrastructure. It covers
    the structure of a container registry and explains how one can publish a Docker
    container using Storj.
---

Containers are wonderful: Containers provide a powerful way to package and deploy an application and make the runtime environment immutable and reproducible. But using containers also requires more infrastructure - distributing containers requires a docker registry, either a public one (like Dockerhub) or a private instance.

Under the hood, the container registry serves simple REST requests. As Storj DCS also can serve files via HTTP, it can be used as a container registry if the pieces are uploaded in the right order and mode.

## The structure of a container registry

But what is the right order? The container registry API follows a simple structure:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/U8gz4cywJwlI-BhRAr61d_0-fix.png)

Here we pull the **elek/herbsttag** image with the **latest** tag. The manifest can be found under .

The first item is a manifest JSON file that defines the required blobs and layer descriptors. For example:

```docker
{
 "schemaVersion": 2,
 "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
 "config": {
   "mediaType": "application/vnd.docker.container.image.v1+json",
   "size": 4416,
   "digest": "sha256:833c7a986ed965eec8fe864223920c366fb0a25dd23edd0bdd2a4428fd0ce1e2"
 },
 "layers": [
   {
     "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
     "size": 5865472,
     "digest": "sha256:e2eb06d8af8218cfec8210147357a68b7e13f7c485b991c288c2d01dc228bb68"
   }
 ]
}

```

Both layers should be found under*.* The layer in the manifest is a simple tar.gz file with the file system containing the first one, which is another JSON descriptor that includes all the container settings (labels), endpoints, environment variables, default volumes, etc.

If we upload the layers and metadata files in the same structure, Docker pull will be able to download our Docker images directly from the Storj decentralized cloud. But there are some catches:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/uBZ-3tmXTVgvuSBCFTnpd_1-fix.png)

1.  The _/v2_ endpoint should return with 200 (Docker uses this to double-check if registry implements v2 container registry). We will solve this by uploading an empty HTML file to _/v2/index.html._

2.  A specific _Content-Type_ should be returned for each manifest. Fortunately, Storj linksharing service supports custom content-type. We will solve this with uploading the manifest file with custom metadata:_uplink cp /tmp/1 sj://dockerrepo/v2/elek/herbsttag/latest --metadata '{"Content-Type":"application/vnd.docker.distribution.manifest.v2+json"}'_

3.  The container registry should be served under the root path of the domain ( is correct, while is incorrect). It can be resolved by assigning a custom domain name for the Storj bucket.

### Publish the container

So let’s see an example. What is the publishing process, assuming we have a local docker container (elek/herbsttag in this example)?

The process is simple:

1.  Create/prepare all the JSON / blob files to upload to Storj DCS with uplink CLI (or UI)

2.  During the upload, define the custom HTTP header for the manifests

3.  Upload blobs

4.  Upload an empty index.html to make the \`/v2\` endpoint work

5.  Define custom domain name for your registry.

The first step can be done with [skopeo](https://github.com/containers/skopeo), which is a command-line utility to copy container images between different types of registries (including local Docker daemon, and directories):

_skopeo copy docker-daemon/herbsttag dir:/tmp/container_

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/uVyodpXYaEhsJxQ6tTuXJ_2-fix.png)

The result is very close to what we really need:

- manifests.json should be uploaded to /v2/elek/herbsttag/manifests/latest

- The two hash-named layers are blobs to /v2/elek/herbsttag/blobs/

- version file is not required

Let’s upload them with uplink cli:

```bash
#just to make /v2 work
touch index.html
uplink cp index.html sj://registry/v2/index.html

#upload manifest with custom content type
uplink cp manifest.json sj://registry/v2/elek/herbsttag/manifests/latest --metadata '{"Content-Type":"application/vnd.docker.distribution.manifest.v2+json"}'

#note: sha256: prefix is added to the filenames
uplink cp 833c7a986ed965eec8fe864223920c366fb0a25dd23edd0bdd2a4428fd0ce1e2 sj://registry/v2/elek/herbsttag/blobs/sha256:833c7a986ed965eec8fe864223920c366fb0a25dd23edd0bdd2a4428fd0ce1e2
uplink cp e2eb06d8af8218cfec8210147357a68b7e13f7c485b991c288c2d01dc228bb68 sj://registry/v2/elek/herbsttag/blobs/sha256:e2eb06d8af8218cfec8210147357a68b7e13f7c485b991c288c2d01dc228bb68

#it's a good idea to support sha256 based pulls
sha256sum manifest.json
#output: be9eeb0e64046a25df3df2df0eb2577ea11a9e521733b6e10df37914cddc7bcb  manifest.json
uplink cp manifest.json sj://registry/v2/elek/herbsttag/manifests/sha256:be9eeb0e64046a25df3df2df0eb2577ea11a9e521733b6e10df37914cddc7bcb --metadata '{"Content-Type":"application/vnd.docker.distribution.manifest.v2+json"}
```

Now we are almost there. There are two remaining parts. First, we need to register a custom domain for our _sj://registry_ bucket. The exact process is documented in [](docId:GkgE6Egi02wRZtyryFyPz), in short, an uplink command can be used to save the access grant and assign it to a domain:

```bash
uplink share --public sj://registry/ --dns registry.anzix.net
```

The command returns all the important information to modify the DNS zones. The usage of this information depends on the DNS registrar.

```bash
# DNS INFO
# Remember to update the $ORIGIN with your domain name. You may also change the $TTL.
$ORIGIN example.com.
$TTL    3600
registry.anzix.net     IN CNAME  link.storjshare.io.
txt-registry.anzix.net IN TXT    storj-root:docker
txt-registry.anzix.net IN TXT    storj-access:jvydrxvotvks3tulle6pkvzmsgza
```

The last piece is the configuration of your local docker daemon. The Storj linksharing service doesn’t support custom SSL certificates (yet), therefore Docker should use HTTP to access it (another workaround here is terminating the SSL with a CDN service like Cloudflare).

Modify `/etc/docker/daemon/json` and add the following section:

```json
{
  "insecure-registries": ["registry.anzix.net"]
}
```

And now we can test the pull command:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/lKLwfi3Eg3yQue73SIWqF_3-fix.png)

### Summary

Storj supports custom Content-Type for any key, so it can be used as a container registry to distribute container images. Currently, it has some limitations (no custom SSL, push is a manual process, no easy way to share layers), but distributing static container images for a large-scale audience can be done with all the advantages of a real Decentralized Cloud Storage.
