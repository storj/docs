---
title: Kubernetes Backup via Velero
tags:
  - cloud-ops
docId: -qeCzVrbZxM-Wz6P5SQbZ
redirects:
  - /dcs/how-tos/kubernetes-backup-via-velero
  - /how-tos/kubernetes-backup-via-velero
metadata:
  title: Velero-based Kubernetes Backup Guide
  description:
    Detailed guide on backing up and restoring Kubernetes clusters using
    Storj and Velero CLI tool.
---

## Introduction

This guide walks through the process of backing up a Kubernetes cluster using Restic with Velero. Velero is a command-line tool that backs up Kubernetes clusters and restores them in case of loss. Velero includes a command-line interface and server-side component that runs inside of your Kubernetes cluster.

Velero lets you:

- Take backups of your cluster and restore them in case of loss.

- Migrate cluster resources to other clusters.

- Replicate your production cluster to development and testing clusters.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jSTBcYDqE4MTLcq5GQr3o_kubernetes.jpeg)

{% callout type="info"  %}
The Storj DCS Velero plugin does not support volume snapshots for now.
{% /callout %}

## Prerequisites

- [Complete Velero Prerequisites and install the CLI](https://velero.io/docs/main/basic-install/)

- [Create a Storj DCS account](https://storj.io/signup)

- [](docId:OXSINcFRuVMBacPvswwNU) for the project or create an access grant with the [](docId:TbMdOGCAXNWyPpQmH6EOq)

- [Create a bucket](docId:pxdnqsVDjCLZgeEXt2S6x) where Velero will store the backups

## Instructions

**Install Velero with Storj plugin**

```Text
$ velero install --provider tardigrade \
    --plugins storjlabs/velero-plugin:latest \
    --bucket $BUCKET \
    --backup-location-config accessGrant=$ACCESS \
    --no-secret
```

{% callout type="info"  %}
To generate an access grant ($ACCESS) for the configuration, follow the guide here: [](docId:LsiWFnRXOkhMuKjQhKbh3).
{% /callout %}

**Backup/Restore**

Perform a backup:

```Text
$ velero backup create $BACKUP_NAME
```

Perform a restore:

```Text
$ velero restore create $RESTORE_NAME --from-backup $BACKUP_NAME
```

{% callout type="info"  %}
Note: it's possible to overwrite the backup location or access grant by editing the `backupstoragelocations.velero.io` CR and restarting the Velero Pod on the cluster in case of any mistake with the configuration.
{% /callout %}

The complete Velero documentation is [located here.](https://velero.io/docs/main/restore-reference/)

## Multicloud Architecture for Disaster Prevention and Migration

Because Storj DCS is a globally distributed hot object store, you can store and recover your Kubernetes volumes from anywhere in the world, instantly, without having to replicate data across regions. For DevOps managers, this can mean better resilience for your cluster, reduced global RTO (recovery time objective), cost-savings, and improved native security over centralized alternatives.

In the example below, we can see a Disaster Recovery scenario where we might need to migrate into a new cluster:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jSTBcYDqE4MTLcq5GQr3o_kubernetes.jpeg)

---

In this scenario, Cluster B is restored from the backup of A and reconstituting the Kubernetes volume in the cluster.

## Github Source: [Velero Plugin](https://github.com/storj/velero-plugin)
