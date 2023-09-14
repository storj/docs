---
title: MongoDB Ops Manager
docId: fFkBYzSTI_0eLD8aohftm
tags:
  - cloud-ops
redirects:
  - /dcs/how-tos/mongodb-ops-manager-backup
  - /how-tos/mongodb-ops-manager-backup
metadata:
  title: Guide on Deploying MongoDB Ops Manager with Storj DCS
  description:
    Step-by-step tutorial on how to deploy, monitor, and scale MongoDB
    using Ops Manager on your own infrastructure with Storj DCS.
---

## Introduction

MongoDB is a powerful, flexible, and scalable general purpose database. It combines the ability to scale out with features such as secondary indexes, range queries, sorting, aggregations, and geospatial indexes.

Ops Manager is a management platform that makes it easy to deploy, monitor, back up, and scale MongoDB on your own infrastructure.

MongoDB Enterprise supports a variety of cloud-native deployment options. This gives you and your apps access to locally deployed MongoDB clusters alongside direct access to MongoDB clusters running in the MongoDB Atlas cloud.

For the complete documentation for the service, see: <https://github.com/jasonmimick/total-cluster>

## Before you begin

If you haven't yet, create a [Storj DCS account](https://www.storj.io/signup) before following the rest of the tutorial. Make sure to [](docId:Ch4vLynsEqyT2-3qDEBiy) and [](docId:pxdnqsVDjCLZgeEXt2S6x).

## Procure a Kubernetes cluster

Your first step is to procure a Kubernetes cluster. This full example will require 5 to 7 worker nodes with 2 nodes having at least 8 gb of ram.

Next, set up your S3-compatible Gateway (formerly known as Tardigrade gateway) for total-cluster, or you can use our [](docId:yYCzPT8HHcbEZZMvfoCFa). Check out the details for that over in the [gateway chart](https://github.com/jasonmimick/total-cluster/tree/master/addons/tardigade-gateway) in total-cluster.

Installing the chart (Note: requires Helm V3),

```Text
➜  addons git:(master) ✗ helm install s3-gateway tardigade-gateway
NAME: s3-gateway
LAST DEPLOYED: Sat May 30 07:52:43 2020
NAMESPACE: total-cluster
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

Here, we can inspect the cluster and see our local gateway running. This service provides a local secure connection for MongoDB Ops Manager to write database backups.

```Text

➜  addons git:(master) ✗ kubectl get all --selector='app=s3-gateway-tardigrade-gateway'
NAME                                                 READY   STATUS    RESTARTS   AGE
pod/s3-gateway-tardigrade-gateway-68fbf4b4d7-4qbvt   1/1     Running   0          104s

NAME                                        TYPE        CLUSTER-IP EXTERNAL-IP PORT(S) AGE
service/s3-gateway-tardigrade-gateway-svc   ClusterIP   10.43.65.192 <none> 7777/TCP   104s

NAME                                            READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/s3-gateway-tardigrade-gateway   1/1     1            1           104s

NAME                                                       DESIRED   CURRENT   READY   AGE
replicaset.apps/s3-gateway-tardigrade-gateway-68fbf4b4d7   1         1         1       104s
```

Once your gateway is setup and running, install the entire MongoDB data platform with the total-cluster chart.

```Text
git clone https://github.com/jasonmimick/total-cluster
helm install mongodb total-cluster
```

The entire chart takes between 5 to approx 10 mins to finish installing. This is because it’s installing quite a few [components](https://github.com/jasonmimick/total-cluster#what-is-total-cluster).

Ops Manager needs to be configured to use the gateway. You can connect to your Ops Manager with a basic port-forward command like this,

```Text
kubectl port-forward mongodb-ops-manager-0 8080:8080
```

Connect your browser to [localhost:8080](http://localhost:8080) and use <admin@mongodb.com> and MongoDB12345% to login.

{% callout type="info"  %}
Note: These credentials are stored in a secret, called mongodb-ops-manager-secret. You can update this in the chart. Also note the “mongodb” in the secret name comes directly from the Helm release name
{% /callout %}

You should see your MongoDB cluster once connected:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/FF9JYqaVtX4deZoaS8fmj_mongodb.png)

## Setting up the S3 Blockstore pointing to local gateway

**You can configure backups for your app databases following this guide:** [**Backup Overview**](https://docs.opsmanager.mongodb.com/current/core/backup-overview/)**.**

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/kJgbgrQYMtvXwRk64uzND_mongodb2.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5B3azwyWH9dHSdO9N-_qh_mongodb3.png)

Finally, you can see the backup data blocks stored in the Storj DCS bucket. You can even use the local tardigrade-gateway with command s3 command line tools:

```Text
$ kubectl port-forward tardigrade-gateway-tardigrade-gateway-75cfdb889-nz2n4 7777:7777 &
$ export AWS_ACCESS_KEY_ID=XXX
$ export AWS_SECRET_ACCESS_KEY=XXX
$ aws --endpoint-url http://localhost:7777 s3 ls test
```

## Conclusion

We look forward to seeing what MongoDB users do with Storj DCS (formerly known as Tardigrade).

We regularly hear from users who would like cloud backup services that provide end-to-end encryption, multi-region redundancy, as well as lower and more predictable costs compared to centralized services.

Storj DCS delivers on all of these needs, while still offering the same enterprise service level agreements users absolutely require.

**Learn more**

- [**MongoDB Ops Manager**](https://www.mongodb.com/products/ops-manager)

- [**Deploying MongoDB in Kubernetes** ](https://www.mongodb.com/kubernetes)
