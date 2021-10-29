---
description: An overview of Storj DCS Connectors
---

# Connectors

## **Building Storj DCS Connectors**

Connectors bridge the gap between the applications we use every day and the underlying storage infrastructure on which application data is stored. Our team has worked with our partners to build a series of connectors between Storj DCS, our decentralized cloud storage service, and our partners’ applications.&#x20;

### **What is a Storj DCS Connector**

A Storj DCS connector is an application-level integration that enables the use of decentralized cloud storage in consumer software. Storj DCS connectors enable Satellites to measure the volume of data associated with a bucket and give attribution to them.&#x20;

Put simply, a Connector enables application developers to store, retrieve, and manage data on the decentralized cloud on behalf of the app users.

Storj DCS connectors are different from standard libuplink integrations, as they provide application developers and open source projects a means to monetize their cloud usage programmatically on the Storj network.&#x20;

So, using Storj DCS with your favorite open source project can help you lower your cloud storage costs, while also financially supporting the project itself.&#x20;

### How to build Connectors&#x20;

The Storj Connector Framework is a basic set of utility methods and operations to provide a consistent approach to integrating and orchestrating among data sources, endpoints, and the Storj DCS network. Some of the aspects addressed in the framework are:

* Buffering/resource management
* Abstraction
* Data transformation
* Configuration
* Authentication
* Logging

Generally, a Storj DCS connector will interface directly with [libuplink](https://pkg.go.dev/storj.io/uplink), our native Go library, which enables you to programmatically interface with Storj. A basic architectural diagram of how a Storj Connector fits into the stack is located below:

![](https://lh3.googleusercontent.com/o9Zo6dAdA9qrxDgsZh6kdPvtLHTjnbGUtkSuvZMTZabp47w8nrswys\_rdLcKvrjYLbDaJrSmR7a1emZSKfNRsTZzZbQy\_39P-O77CSvDvPPy8xEdulTRjio3mnPjomsZl-RcmAMw)

### **Get Started - and Monetize OSS!**

We hope that the Storj Connector Partner Program will empower a new class of entrepreneurs to ‘be the cloud’, and create more sustainable business models built on top of open-source software.\
