---
title: Common Use Cases
docId: zFCXk7pvmYvyefN2SZhHj
redirects:
  - /dcs/solution-architectures/common-use-cases
metadata:
  title: Best Use Cases for Distributed Storage Solutions
  description:
    This page outlines common use cases where distributed object storage
    like Storj excels, including general and database backup, private data, and multimedia
    storage and streaming.
---

## Introduction

Object storage is ideal for files that are written once and read many times (WORM - Write Once, Read Many data). Object storage has formed the backbone of many different applications and use cases. Distributed and decentralized object storage is optimized for larger files, especially where those files are accessed regularly from geographically diverse locations.

Object storage, in general, has a wide range of use cases. The use cases that are the best fit for Storj DCS are outlined below. If you don't see your use case listed, don't worry - this will just give you a sense of how Storj DCS is meant to be used.

## Common Use Cases

| Platform/Service               | Description                                                                                                                                                                              | **Decentralized Advantage**                                                                                                                                                                                       |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **General Backup**             | Long term storage of large files required for business continuity or disaster recovery needs                                                                                             | Low cost and always available high-throughput bandwidth means storage is economical and recovery is rapid                                                                                                         |
| **Database Backup**            | Regular snapshot backups of databases for backup or testing are an entrenched part of infrastructure management                                                                          | Streaming backup eliminates the need to write large database snapshots to local disk before backup or for recovery                                                                                                |
| **Private Data**               | Data that is highly sensitive and an attractive target for ransomware attacks or other attempts to compromise or censor the data                                                         | Client side encryption and industry-leading access management controls and highly distributed network of storage nodes reduce attack surface and risk                                                             |
| **Multimedia Storage**         | Storage of large numbers of large multimedia files, especially data produced at the edge from sources like security cameras that must be stored for long periods of time with low access | Rapid transit leveraging parallelism makes distributed storage effective for integrating with video compression systems to reduce volume of data stored                                                           |
| **Multimedia Streaming**       | Fluid delivery of multimedia files with the ability to seek to specific file ranges and support for large number of concurrent downloads                                                 | Native file streaming support and distributed bandwidth load across highly distributed nodes reduce bottlenecks                                                                                                   |
| **Large File Transfer**        | Transiting large amounts of data point to point over the internet                                                                                                                        | High-throughput bandwidth takes advantage of parallelism for rapid transit; Client-side encryption ensures privacy during transit                                                                                 |
| **Hybrid Cloud**               | Flexible ability to provide elastic capacity to on-premise data storage                                                                                                                  | Enables enterprises to monetize excess storage capacity when not needed and provides secure, private cloud storage on demand                                                                                      |
| **Machine Learning**           | Storage transit for processing of large data sets from disparate data sources and types                                                                                                  | Decentralized architecture provides better response times for data processing, which can translate into the ability to process more data within time limits, as well as efficiency in transport and peering costs |
| **VR/AR**                      | Virtual reality and augmented reality are both latency sensitive and bandwidth demanding with large file sets.                                                                           | Distributed storage provides better response times toward end users, as well as efficiency in transport and decreased peering costs                                                                               |
| **IoT Data**                   | Connected devices generate massive amounts of data                                                                                                                                       | Small IoT files can be packed into large blocks for efficient storage while individual message files can be accessed via streaming to specific data ranges                                                        |
| **NFT Related Digital Assets** | Storage digital assets associated with non-fungible tokens (NFTs)                                                                                                                        | Provide cost-effective storage with edge-based delegated authorization for managing access to digital content                                                                                                     |
