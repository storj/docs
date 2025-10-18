---
title: Storj Architecture Overview
docId: storj-arch-overview
metadata:
  title: Storj Network Architecture - Technical Overview
  description: Comprehensive overview of Storj's distributed storage architecture, peer classes, data flow, and how the network components work together.
---

Storj's architecture implements decentralized storage through a sophisticated network of specialized components called peer classes. Understanding this architecture helps you make informed decisions about how to integrate and optimize Storj for your use cases.

## Network Architecture Overview

The Storj network consists of three primary peer classes that work together to provide secure, distributed storage:

- **Storage Nodes** - Store encrypted data pieces and earn cryptocurrency rewards
- **Satellites** - Coordinate the network and manage metadata
- **Uplinks** - Client applications that store and retrieve data

This separation of concerns creates a robust, scalable system where no single component can compromise the security or availability of your data.

## Peer Classes Explained

### Storage Nodes

Storage Nodes form the foundation of the distributed storage network. They are operated by individuals and organizations worldwide who contribute storage capacity and bandwidth in exchange for cryptocurrency payments.

**Key Characteristics:**
- Store encrypted, erasure-coded data pieces
- Cannot decrypt or reconstruct complete files
- Operate independently with minimal coordination
- Earn revenue based on storage duration and bandwidth usage

**Quality Requirements:**
- Reliable internet connectivity
- Consistent uptime expectations
- Adequate storage capacity
- Geographic and network diversity

### Satellites

Satellites serve as coordination hubs for the network, handling metadata management, access control, and network operations without ever accessing your actual data.

**Primary Responsibilities:**
- User account and project management
- API credential and access grant generation
- Node discovery and reputation tracking
- Audit and repair coordination
- Usage tracking and billing
- Garbage collection and maintenance

**Trust Model:**
- Users choose which Satellite to trust with metadata
- Multiple Satellite options provide choice and redundancy
- Open source implementation allows independent operation

### Uplinks

Uplinks represent any application or service that stores or retrieves data from the network. This includes command-line tools, applications using libuplink, and S3-compatible gateways.

**Core Functions:**
- Client-side encryption and decryption
- Erasure encoding and decoding
- Direct communication with Storage Nodes
- Access control and key management

**Implementation Options:**
- **Native Integration** - Using libuplink directly
- **S3-Compatible Gateway** - Standard S3 API access
- **Command Line Interface** - Terminal-based operations

## Data Flow Architecture

### Upload Process

When you upload a file to Storj, several coordinated steps ensure security and reliability:

1. **Client-Side Encryption**: Your Uplink encrypts the entire file using strong encryption before any network transmission

2. **Segmentation**: Large files are divided into segments (typically 64MB each) for efficient processing

3. **Erasure Encoding**: Each segment is mathematically encoded into many pieces, where only a subset is needed to reconstruct the original segment

4. **Node Selection**: The Satellite provides a list of healthy, diverse Storage Nodes for storing pieces

5. **Distributed Storage**: Pieces are uploaded directly to Storage Nodes across the network

6. **Metadata Recording**: The Satellite records encrypted metadata about where pieces are stored

### Download Process

Retrieving data reverses this process with built-in performance optimizations:

1. **Metadata Retrieval**: Your Uplink requests file location information from the Satellite

2. **Parallel Downloads**: Multiple pieces are downloaded simultaneously from different Storage Nodes

3. **Redundancy Optimization**: Downloads stop as soon as enough pieces are retrieved for reconstruction

4. **Reconstruction**: Erasure decoding rebuilds the original segments from the downloaded pieces

5. **Decryption**: Your Uplink decrypts the reconstructed data using your encryption keys

## Security Architecture

### Encryption Layers

Storj implements multiple layers of encryption to ensure comprehensive data protection:

**File-Level Encryption:**
- Each file encrypted with a unique random key
- Industry-standard AES-256-GCM encryption
- Keys derived from your root secret and file path

**Path Encryption:**
- Object keys (file paths) are encrypted
- Prevents metadata analysis attacks
- Hierarchical key derivation for efficient access management

**Transport Security:**
- All network communications use TLS
- End-to-end encryption from client to storage

### Zero-Knowledge Design

The network architecture ensures that no single party can access your data without your explicit permission:

- **Storage Nodes** see only encrypted, meaningless pieces
- **Satellites** see only encrypted metadata and cannot decrypt file content
- **Network Operators** cannot access user data or meaningful metadata

### Access Control

Sophisticated access management provides granular control without compromising security:

**Access Grants:**
- Combine API keys, encryption keys, and permissions
- Enable secure sharing without exposing root credentials
- Support time-limited and scope-restricted access

**Hierarchical Permissions:**
- Path-based access control
- Operation-specific restrictions (read, write, delete, list)
- Bucket and project-level isolation

## Network Operations

### Reputation System

Storage Nodes build reputation through consistent performance:

- **Uptime Tracking** - Availability and responsiveness monitoring
- **Audit Compliance** - Regular verification of data integrity
- **Data Transfer Performance** - Speed and reliability metrics

Higher reputation nodes receive more data storage opportunities and higher payment rates.

### Repair and Maintenance

The network automatically maintains data integrity and availability:

**Proactive Monitoring:**
- Continuous health checks of stored pieces
- Detection of node failures or departures
- Predictive identification of at-risk data

**Automated Repair:**
- Recreation of lost pieces when redundancy falls below thresholds
- Placement of repaired pieces on healthy, diverse nodes
- Maintenance of geographic and network diversity

### Economic Model

The network operates through market-based economics:

**Storage Node Incentives:**
- Payment for data storage over time
- Bandwidth compensation for uploads and downloads
- Performance bonuses for reliable operation

**User Costs:**
- Competitive pricing through market competition
- Pay-only-for-usage model
- Predictable pricing without hidden fees

## Performance Characteristics

### Scalability

The distributed architecture scales horizontally:

- **Node Network Growth** - More nodes increase capacity and performance
- **Geographic Expansion** - Global distribution reduces latency
- **Parallel Processing** - Multiple simultaneous operations across the network

### Reliability

Multiple design elements ensure high reliability:

- **No Single Points of Failure** - Distributed architecture eliminates critical dependencies
- **Redundancy Management** - Automated maintenance of data availability
- **Graceful Degradation** - Performance degrades gradually rather than failing completely

### Efficiency

Optimizations throughout the architecture improve resource utilization:

- **Erasure Coding** - Better storage efficiency than replication
- **Deduplication** - Reduced storage requirements for similar content
- **Intelligent Routing** - Optimal path selection for data transfer

## Integration Patterns

### Application Integration

**Direct Integration:**
- Use libuplink for custom applications
- Full control over encryption and access management
- Optimal performance for application-specific needs

**S3-Compatible Integration:**
- Drop-in replacement for existing S3-based applications
- Familiar APIs and tooling
- Simplified migration from centralized storage

**Hybrid Approaches:**
- Combine direct integration with S3 compatibility
- Use appropriate method for each use case
- Leverage strengths of both approaches

## Comparison with Traditional Architecture

### Centralized Storage Architecture

Traditional cloud storage relies on:
- Large data centers with massive infrastructure
- Centralized control and management
- Replication across limited geographic regions
- Trust-based security models

### Storj's Distributed Architecture

In contrast, Storj provides:
- Thousands of independent storage nodes
- Decentralized coordination through Satellites
- Global distribution with mathematical redundancy
- Zero-trust security with client-side encryption

## Technical Specifications

### Current Network Parameters

- **Erasure Coding**: 29 pieces required, 80 pieces stored, 130 pieces attempted upload
- **Segment Size**: 64MB maximum
- **Encryption**: AES-256-GCM with client-side key generation
- **Node Selection**: Geographic and network diversity requirements

### Network Statistics

The Storj network operates thousands of storage nodes across six continents, providing:
- Petabytes of distributed storage capacity
- Sub-second global response times
- 99.95%+ durability through erasure coding
- Enterprise-grade performance and reliability

## Future Architecture Evolution

### Planned Enhancements

**Performance Improvements:**
- Advanced caching and content delivery optimizations
- Enhanced geographic routing algorithms
- Improved parallel processing capabilities

**Feature Expansion:**
- Additional S3-compatible features
- Enhanced access control granularity
- Integration with emerging Web3 protocols

**Network Growth:**
- Expansion to new geographic regions
- Support for additional storage node types
- Integration with edge computing infrastructure

Understanding Storj's architecture enables you to make informed decisions about integration approaches, performance optimization, and security considerations for your specific use cases.

## Related Concepts

- [Understanding Decentralized Storage](docId:understand-decent-stor) - Foundational concepts behind distributed storage
- [Security and Encryption](docId:security-encryption) - Detailed cryptographic protections
- [File Redundancy](docId:file-redundancy) - How erasure coding provides better durability