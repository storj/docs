---
title: Common Architectural Pattern
createdAt: 2022-05-17T01:15:39.000Z
updatedAt: 2023-03-03T08:30:01.000Z
docId: wpnNd2zF3PXpmlv5haLnO
redirects:
  - /dcs/solution-architectures/common-architectural-patterns
---

## Introduction

There are a standard set of integration patterns in which the Storj Uplink is implemented.  This section provides a solution architecture overview of the following integration patterns.

# Common Architectural Pattern

There are a standard set of integration patterns in which the Storj Uplink is implemented.  This section provides a solution architecture overview of the following integration patterns.

| Platform/Service                    | Description                                                                                                      | **Decentralized Advantage**                                                                                                                                                        |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud-hosted Gateway**            | S3-compatible cloud hosted gateway providing elastic object storage capacity                                     | Easy implementation and broad compatibility. Note: uses server-side encryption                                                                                                     |
| **Hybrid Cloud On Premise Gateway** | On-premis to cloud elastic storage capacity                                                                      | Enhanced privacy via end-to-end encryption                                                                                                                                         |
| **Cloud Native Applications**       | Web-based applications interact with  S3-compatible cloud hosted gateway                                         | Server-side encryption and industry-leading access management controls with highly distributed network of storage nodes make it easy to build more secure and private applications |
| **Mobile Apps**                     | Choose libuplink library for end-to-end encryption or S3-compatible cloud hosted gateway for ease of integration | Take advantage edge-based delegated authorization for secure and private file sharing                                                                                              |
| **Command Line File Transfer**      | Command line tool for end-to-end encrypted large file transfer between people or environments                    | Fast, easy, secure, private and economical way to move large files                                                                                                                 |
| **Client App Integration**          | Integrate libuplink into applications with native cloud storage use                                              | Easily integrate secure, private and economical cloud object storage inn your app (Examples FileZilla, Rclone and Restic)                                                          |
| **Dapp Integration**                | Add decentralized object storage to your decentralized app                                                       | S3 compatibility, default multi-region high availability via a network of decentralized storage nodes, and enhanced security and privacy through delegated authorization.          |
| **Multi-cloud Storage**             | Neutral, provider-agnostic cloud storage                                                                         | Low egress costs and distributed storage provide consistent performance for inter-cloud transit                                                                                    |

