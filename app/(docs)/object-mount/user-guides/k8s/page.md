---
title: Kubernetes CSI Driver
docId: zohm4zeXohpae9ga

metadata:
  title: Kubernetes CSI Driver
  description: Kubernetes CSI Driver Guide
    
weight: 10
---


The Object Mount CSI Driver facilitates seamless integration of your cloud storage services (Amazon S3, Google Cloud, and Azure Cloud) within a Kubernetes cluster. The driver is available through [Helm](https://helm.sh) under `oci://registry-1.docker.io/cunofs/cunofs-csi-chart`. More information can be found [on docker hub](https://hub.docker.com/r/cunofs/cunofs-csi-chart).

## Install

1. Ensure that Helm is installed. If not, follow the [Helm installation guide](https://helm.sh/docs/intro/install/)
2. Deploy the Object Mount CSI Driver:

```shell
helm install cunofs-csi-chart oci://registry-1.docker.io/cunofs/cunofs-csi-chart \
  --set Object MountLicense.license="<license-text>"                                   \
  --set credsToImport="{<credentials-1>,<credential-2>, ... ,<credentials-N>}"
```

- `--set Object MountLicense.license`: (required) Object Mount license [[more details](mailto:sales@storj.io/)]
- `--set credsToImport`: (optional) cloud credentials [[more details](../getting-started/configuring-credentials)]

3. Display the status of the Object Mount CSI Driver resources:

```shell
kubectl get all -l app.kubernetes.io/name=Object Mount-csi-driver
```

{% callout type="note"  %}
For security reasons, helm doesn't allow access to files via paths.
Therefore, you need to provide the credential file contents in `credsToImport`, and not the paths.
To ensure that the cloud credentials are passed correctly, please provide them in `base64` encoding. For example:

```shell
--set credsToImport="{$(cat creds-1.txt | base64), $(cat creds-2.json | base64)}"
```
{% /callout %}

## Update

Upgrade to the latest version:

```shell
helm upgrade --reuse-values cunofs-csi-chart 'oci://registry-1.docker.io/cunofs/cunofs-csi-chart'
```

You can append the `--version <version>` to upgrade to a specific version.

## Uninstall

```shell
helm uninstall cunofs-csi-chart
```

# Storage allocation

The Object Mount CSI Driver support the following strategies:

- [Static storage provisioning](#static_provisioning)
- [Dynamic storage provisioning](#dynamic_provisioning)

## Static provisioning

To allocate storage statically, define one or more `PV` ([PersistentVolume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)) providing the bucket details and options:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: cunofs-pv
spec:
  capacity:
    storage: 16Ei # ignored but required
  accessModes:
    - ReadWriteOncePod # Currently only support "ReadWriteOncePod"
  csi:
    driver: cunofs.csi.com # required
    volumeHandle: cunofs-csi-driver-volume
    volumeAttributes:
      root: "/cuno/s3/bucket/subdirectory/other_subdirectory" # optional
      posix: "true" # optional
      allow_root: "false" # optional
      allow_other: "true" # optional
      auto_restart: "true" # optional
      readonly: "true" # optional
```

Then, define a `PVC` ([PersistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)):

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: cunofs-pvc
spec:
  accessModes:
    - ReadWriteOncePod
  storageClassName: "" # ensures that no dynamic provisioning occurs
  resources:
    requests:
      storage: 16Ei # ignored but required
  volumeName: cunofs-pv # PV metadata.name
```

Finally, cluster users can mount the `PVC`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: consumer-pod
spec:
  containers:
    - name: cunofs-app
      image: centos
      command: ["/bin/sh"]
      args: ["-c", "echo 'Hello from the container!' > /data/s3/cuno-csi-testing/K8s_$(date -u).txt; tail -f /dev/null"]
      volumeMounts:
        - name: persistent-storage
          mountPath: /data
  volumes:
    - name: persistent-storage
      persistentVolumeClaim:
        claimName: cunofs-pvc # PVC metadata.name
```

## Dynamic provisioning

To allocate storage dynamically, define a [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) providing the bucket details and options:

```yaml
apiVersion: storage.K8s.io/v1
kind: StorageClass
metadata:
  name: cunofs-storageclass
provisioner: cunofs.csi.com
  reclaimPolicy: Retain # default is Delete
  parameters:
    cloud-type: s3 # requires either of s3/az/gs
    bucket: cuno-csi-testing # requires bucket that already exists
    bucket-subdir: test_kubernetes # optional
    # Options passed down to the PV:
    posix: "true" # optional
    allow_root: "false" # optional
    allow_other: "true" # optional
    auto_restart: "true" # optional
    readonly: "true" # optional
```

Then, define a `PVC` which has a reference to the `StorageClass`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: cunofs-pvc
spec:
  accessModes:
    - ReadWriteOncePod
  storageClassName: "cunofs-storageclass" # StorageClass metadata.name
  resources:
    requests:
      storage: 16Ei # ignored but required
```

Cluster users can mount the `PVC` similarly to the static allocation case:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: consumer-pod
spec:
  containers:
    - name: cunofs-app
      image: centos
      command: ["/bin/sh"]
      args: ["-c", "echo 'Hello from the container!' > /data/s3/cuno-csi-testing/K8s_$(date -u).txt; tail -f /dev/null"]
      volumeMounts:
        - name: persistent-storage
          mountPath: /data
  volumes:
    - name: persistent-storage
      persistentVolumeClaim:
        claimName: cunofs-pvc # PVC metadata.name
```

Alternatively, cluster users can create a generic inline volume which doesn't require a `PVC`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: consumer-pod-dyn-inline
spec:
  containers:
    - name: cunofs-app-inline
      image: centos
      command: ["/bin/sh"]
      args: ["-c", "echo 'Hello from the container, inline volume!' >> /data/generic-inline-k8s_$(date -u).txt; tail -f /dev/null"]
      volumeMounts:
        - name: inline-cuno-storage
          mountPath: /data
  volumes:
    - name: inline-cuno-storage
      ephemeral:
        volumeClaimTemplate:
          metadata:
            labels:
              type: my-inline-volume
          spec:
            accessModes: [ "ReadWriteOncePod" ]
            storageClassName: cunofs-storageclass # StorageClass metadata.name
            resources:
              requests:
                storage: 16Ei # ignored but required
```

{% callout type="note"  %}
The current version of Object Mount CSI Driver does not support [CSI inline volumes](https://kubernetes.io/blog/2020/01/21/csi-ephemeral-inline-volumes/)
{% /callout %}


# Configuration

This section offers additional details about the configuration options for the Object Mount CSI driver.

## Helm chart

The Helm chart can be also installed, configured and deployed manually.

Download the chart manually:

```shell
helm pull --untar oci://registry-1.docker.io/cunofs/cunofs-csi-chart
```

Set the `Object MountLicense.license` variable and import the cloud credentials:

```yaml
# values.yaml file
Object MountLicense:
  license: "<your license key>"
credsToImport:
  - "<credential-1>"
  - "<credential-2>"
  - "<..>"
  - "<credential-N>"
```

Finally, install the local chart by pointing to its directory:

```shell
helm install cunofs-csi-chart <path-to-chart>
```

Available options:

| Yaml Value | Description | Default Value |
|------------|-------------|---------------|
| `driverName` | Optionally change the name of the deployed driver. Only useful if you want to deploy several instances of the driver. | `cunofs.csi.com` |
| `cunofsCSIimage.pullPolicy` | Specifies how the docker image is deployed onto the Node and Controller. Only useful to change if self-hosting the docker image. | `Always` |
| `cunofsCSIimage.name` | Specifies the Object Mount CSI docker image. Only useful to change if self-hosting the docker image under a different name (Note: do not include the version here). | `cunofs/cunofs_csi` |
| `cunofsCSIimage.version` | Specifies the docker image's version. No need to change it unless you have a good reason to. | <equal to chart version> |
| `cunofsLicense.license` | The license used for activating Object Mount on the Driver. It needs to be a valid Professional or Enterprise license. | <empty> |
| `credsToImport` | Yaml array that you can populate with your s3/az/gs credential files. | <empty> |
| `rbac.useRBAC` | Enables out of the box support for RBAC clusters (deploys the required ClusterRole/ClusterRoleBinding). | `true` |
| `eks.iam_arn` | On Amazon EKS, associates IAM role to `ServiceAccount`. | <empty> |

## PersistentVolume options

{% callout type="warning"  %}
Note that due to K8s parameter passing design decisions, the boolean parameters require strings and not yaml booleans.
For this reason, please use `"true"` and `"false"` instead of `true` and `false`.
{% /callout %}


| Yaml Value | Description |
|------------|-------------|
| `metadata.name` | Can be any legal, unique name |
| `spec.capacity.storage` | This value is ignored, but is required to be set by the CSI specification |
| `spec.csi.driver` | Set this to the name of the CSI driver you deployed which is `cunofs.csi.com` by default |
| `spec.csi.volumeHandle` | Name of the volume, needs to be unique |
| `spec.accessModes` | We support `ReadWriteOncePod`, `ReadWriteOnce`, `ReadOnlyMany`, `ReadWriteMany`. `ReadWriteMany` requires Object Mount Fusion for write consistency, but works in any mode |
| `spec.csi.volumeAttributes.root` | This is the cloud URI that will be mounted to the target mountpath. If not specified, you can access s3, az and gz through the target + `/az` or `/gs` or `/s3` directories |
| `spec.csi.volumeAttributes.posix` | Set it to `"true"` to enforce strict posix mode for Object Mount |
| `spec.csi.volumeAttributes.allow_root` | Set it to `"true"` to allow *only* the root user to access the mount. Overrides `allow_other` |
| `spec.csi.volumeAttributes.allow_other` | Set it to `"true"` to allow all users to use the mount (recommended) |
| `spec.csi.volumeAttributes.auto_restart` | Set it to `"true"` to automatically restart the Object Mount on FUSE if an error occurs |
| `spec.csi.volumeAttributes.readonly` | Set it to `"true"` to mount the volume as read only |
| `spec.csi.volumeAttributes.CUNO_OPTIONS` | Sets the `CUNO_OPTIONS` of the `cuno mount` |
| `spec.csi.volumeAttributes.CUNO_LOG` | Sets the `CUNO_LOG` of the `cuno mount` |
| `spec.csi.volumeAttributes.fusion_pvc` | Enables Object Mount Fusion on the `PV` with the input as the backing `PVC` |

## StorageClass options

| Yaml Value | Description |
|------------|-------------|
| `metadata.name` | Can be any name as long as it's unique |
| `provisioner` | The name of the driver, by default: `cunofs.csi.com` |
| `reclaimPolicy` | `Retain` will not delete the generated `PVs` and their storage when the `PVCs` go out of scope, `Delete` will |
| `parameters.cloud-type` | Can be `s3`, `az` or `gs` |
| `parameters.bucket` | The bucket used to create volumes |
| `parameters.bucket-subdir` | Optional. The subdirectory of the bucket where the `PVCs` will get generated. Can be nested subdirectories like "dir/other_dir/yet_another_dir" |
| `parameters.{posix, allow_root, allow_other, auto_restart, readonly, CUNO_OPTIONS, CUNO_LOG}` | These options will be passed down to the generated `PV` and behave the same way as described in the `PV` options |
| `parameters.fusionStorageClass` | Tells Object Mount Fusion to use the given `StorageClass` to allocate backing `PVs` |

# Object Mount Fusion Support

The Object Mount CSI Driver, as of version `v1.0.2`, supports all access modes.
However, using a single `PV` on multiple pods at once with the `ReadWriteMany` access mode, on the same node or not, does not guarantee write consistency to the same file.
We offer a way around this limitation by using Object Mount Fusion.

Object Mount Fusion enables users to get the best out of object storage and traditional shared filesystems at the same time.
In the case of the Object Mount CSI Driver, it gives you the ability of writing to a `PV` with `ReadWriteMany` without potential issues with multiple writers.
Object Mount Fusion uses object storage with a supporting backing filesystem and will intelligently use the filesystem that has the best performance for large or small files, while ensuring that read and writes remain ordered.
For more information, please refer to [the Object Mount Fusion documentation](../getting-started/object-mount-fusion).

## Static Allocation

For static allocation, you need to deploy two `PVs`: one for Object Mount, and one for the backing mount.
Choose a backing mount that offers write consistency (Amazon EFS, Amazon EBS, a local NFS server, etc...), and deploy it with a `PV` and `PVC`, as if it was used by a `Pod`.
Then, refer to the `PVC`'s name in the `spec.csi.volumeAttributes.fusion_pvc` parameter of the Object Mount `PV`.
The Object Mount CSI Driver will mount the `PV` to itself and bind the two filesystems.

```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: "backing-pv"
# <...>
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: backing-pvc
spec:
  volumeName: "backing-pv"
  # <...>
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: cunofs-pv
spec:
  capacity:
    storage: 16Ei # ignored, required
  accessModes:
    - ReadWriteMany
  csi:
    driver: cunofs.csi.com
    volumeHandle: cunofs-csi-driver-volume
    volumeAttributes:
      # <...>
      fusion_pvc: "backing-pvc" # gets the name of the pvc to try and mount to it
```

{% callout type="warning"  %}
Please ensure that the `PV`/`PVC` pair you create has the same access mode as the Object Mount `PV`/`PVC` pair and compatible parameters (readonly, etc...).

If you have any issues deploying the Object Mount Fusion `PV`/`PVC` pair, pelase first ensure that the backing pair is correctly set up.
{% /callout %}

## Dynamic Allocation

The Object Mount CSI Driver supports dynamic provisioning of Fusion `PV` pairs.
Simply deploy a backing `StorageClass` and refer to it in the Object Mount `StorageClasse's` `parameters.fusionStorageClass` parameter.
The Object Mount CSI Driver will use it to generate and delete backing `PVs` alongside Object Mount `PVs` and bind them as needed.

```yaml
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: "backing-sc"
<...>
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: cunofs-storageclass
provisioner: cunofs.csi.com
parameters:
  cloud-type: s3
  bucket: cuno-csi-testing
  bucket-subdir: test_kubernetes
  fusionStorageClass: "backing-sc" # Refer to the backing StorageClass
```

{% callout type="warning"  %}
Please ensure that the deployed `StorageClass` can create `PVs` that bind to `PVCs` with `ReadWriteMany` of size `8Gi`.
In a future release, you will be able to parameterise it.
{% /callout %}

# RBAC Support

By default, the Object Mount CSI Driver deploys a `ServiceAccount`, `ClusterRole` and `ClusterRoleBinding` to support Role-Based Access Control (RBAC) out of the box.

They are respectively deployed under the following names: `<release name>-serviceaccount`, `<release name>-clusterrole` and `<release name>-clusterrolebinding`.

This also means that the Object Mount CSI Driver supports Amazon EKS clusters out-of-the-box.

You can choose not to deploy the `ClusterRole` and `ClusterRoleBinding` by setting the `rbac.useRBAC` property to `false` in the `values.yaml` file:

```shell
helm install cunofs-csi-chart oci://registry-1.docker.io/cunofs/cunofs-csi-chart \
  --set cunofsLicense.license="<license-text>"                                   \
  --set credsToImport="{<credentials-1>,<credential-2>, ... ,<credentials-N>}"   \
  --set rbac.useRBAC=false
```

# Technical Details

The Object Mount CSI Driver abides by the [Kubernetes Container Storage Interace standard](https://github.com/container-storage-interface/spec/blob/master/spec.md).

It implements the `Node`, `Controller` and `Identity` plugins and uses sidecar containers for simplifying its deployment and maintenance.

The CSI Driver is shipped into one binary, which can act as the `Node` or the `Controller` depending on the context (how it's deployed and which sidecar containers are connected).
The helm chart deploys docker containers that have this binary preinstalled.
The `Node` plugin refers to the ability to mount and organise existing `PersistentVolumes` on a Kubernetes node.
The `Controller` plugin implements the ability to create `PersistentVolumes` dynamically through a `StorageClass`.

The `Node` and the `Controller` need to handle logic at different levels:

- The `Node` plugin needs to be deployed on every K8s Node, since it handles mounting logic that's specific to each machine on which the application containers run. Therefore, it is deployed via a K8s [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/). Additionally, these sidecar containers are shipped with the `Node`:

  [Liveness Probe](https://kubernetes-csi.github.io/docs/livenessprobe.html)

  : This sidecar container ensures that the driver remains responsive, and replaces the driver container on crash.

  [Node Driver Registrar](https://kubernetes-csi.github.io/docs/node-driver-registrar.html)

  : This sidecar container registers the driver to the kubelet to simplify its discovery and communication.

- The `Controller` plugin needs to be unique across a Kubernetes cluster, since it handles the lifecycle of `PersistentVolumes`, which are K8s global objects. It is therefore managed through a K8s [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/):

  [Liveness Probe](https://kubernetes-csi.github.io/docs/livenessprobe.html)

  : This sidecar container, like with the Node plugin, ensures that the driver remains responsive, and replaces the driver container on crash.

  [External Provisioner](https://kubernetes-csi.github.io/docs/external-provisioner.html)

  : This sidecar container helps the driver interacting with the K8s API by listening to volume provisioning-related calls.

During the deployment, the Object Mount CSI Driver deploys the Object Mount license and cloud credentials as [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).
The license `Secret` is imported by the `Node` and the `Controller` through an environment variable.

The credential `Secret` is mounted to the `Node` and the `Controller` through a [Projected Volume](https://kubernetes.io/docs/concepts/storage/projected-volumes/) and sequentially imported by Object Mount.

# Limitations

Not every existing `K8s` optional feature is currently implemented in this driver.
Please contact [supportdcs@storj.io](mailto:supportdcs@storj.io) for specific feature inquiries.

- Due to the internals of K8s, the Object Mount CSI Driver makes use of `Object Mount on FUSE` as a backend instead of regular `Object Mount`. This means that performance will be high, but not always as high as a regular `Object Mount` installation.
- Not every `Object Mount` option is currently available for use in the driver. Please refer to the [configuration section](#configuration-section) for the available options.
- The `ReadWriteMany` access mode doesn't guarantee write consistency without Object Mount Fusion
- The `Object Mount` CSI Driver currently doesn't support CSI Ephemeral Volumes, raw block volumes, volume snapshotting, volume expansion, volume cloning and volume topology options.
