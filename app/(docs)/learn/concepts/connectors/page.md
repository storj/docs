---
title: Connectors
docId: ogXXB9VTIZzLOf6pOGD7y
redirects:
  - /dcs/concepts/connectors
metadata:
  title: An Overview of Building Storj Connectors
  description: Learn how to build Storj Connectors, utilize them to bridge the
    gap between applications and storage infrastructure, and monetize cloud usage.
---

An overview of Storj Connectors

## Building Storj Connectors

Connectors bridge the gap between the applications we use every day and the underlying storage infrastructure on which application data is stored. Our team has worked with our partners to build a series of connectors between Storj, our decentralized cloud storage service, and our partners’ applications.

## What is a Storj Connector

A Storj connector is an application-level integration that enables the use of decentralized cloud storage in consumer software. Storj connectors enable Satellites to measure the volume of data associated with a bucket and give attribution to them.

Put simply, a Connector enables application developers to store, retrieve, and manage data on the decentralized cloud on behalf of the app users.

Storj connectors are different from standard libuplink integrations, as they provide application developers and open source projects a means to monetize their cloud usage programmatically on the Storj network.

So, using Storj with your favorite open source project can help you lower your cloud storage costs, while also financially supporting the project itself.

### How to build Connectors

The Storj Connector Framework is a basic set of utility methods and operations to provide a consistent approach to integrating and orchestrating among data sources, endpoints, and the Storj network. Some of the aspects addressed in the framework are:

- Buffering/resource management

- Abstraction

- Data transformation

- Configuration

- Authentication

- Logging

Generally, a Storj connector will interface directly with [libuplink](https://pkg.go.dev/storj.io/uplink), our native Go library, which enables you to programmatically interface with Storj. A basic architectural diagram of how a Storj Connector fits into the stack is located below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/fQgO9I6_fVG25opF3vI1r_image.png)

### Get Started - and Monetize OSS!

We hope that the Storj Connector Partner Program will empower a new class of entrepreneurs to ‘be the cloud’, and create more sustainable business models built on top of open-source software.\\
