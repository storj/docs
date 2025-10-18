---
title: Network Participation
docId: network-participation
metadata:
  title: Storage Node Network Participation - Technical Requirements and Protocols
  description: Technical explanation of how Storage Nodes participate in the Storj network, including protocols, requirements, and interaction patterns.
---

Storage Node network participation involves complex technical interactions between nodes, satellites, and customers. Understanding these protocols and requirements is essential for successful node operation and troubleshooting network-related issues.

## Network Architecture and Protocols

### Distributed Network Design

The Storj network operates as a distributed system where Storage Nodes participate as independent peers, coordinated by satellites but not controlled by any central authority.

**Peer-to-Peer Elements:**
- Direct data transfer between customers and Storage Nodes
- Independent node operation without central coordination
- Distributed storage and retrieval across global network

**Coordination Elements:**
- Satellites manage metadata and coordinate operations
- Network-wide protocols ensure interoperability
- Standardized APIs enable consistent node behavior

### Communication Protocols

**gRPC Protocol Stack:**
- **Transport**: gRPC over HTTP/2 for efficient bidirectional communication
- **Serialization**: Protocol Buffers for fast, compact message encoding
- **Security**: TLS encryption for all network communications

**Protocol Services:**
- **Node Contact**: Satellite health checks and node availability verification
- **Piece Storage**: Data upload and download operations
- **Audit Operations**: Data integrity verification requests
- **Repair Coordination**: Missing data regeneration processes

## Network Identity and Authentication

### Node Identity System

**Identity Generation:**
- Cryptographic identity created during node setup
- Ed25519 public/private key pairs for signatures
- Unique Node ID derived from public key

**Identity Verification:**
- Satellites verify node identity before data allocation
- Cryptographic challenges prove possession of private keys
- Identity theft protection through signature validation

**Identity Lifecycle:**
- Identity remains constant throughout node lifetime
- Identity migration requires complete node data migration
- Lost identity means loss of all stored data and accumulated reputation

### Authentication Mechanisms

**Certificate-Based Authentication:**
- X.509 certificates for TLS connections
- Certificate validation ensures communication security
- Automatic certificate rotation for security maintenance

**API Token Authentication:**
- Satellites issue temporary tokens for specific operations
- Token-based access control for different operation types
- Automatic token refresh and expiration management

## Network Discovery and Registration

### Satellite Discovery

**Bootstrap Process:**
- New nodes discover available satellites through configuration
- Satellite addresses provided during node setup
- Multiple satellite connections for redundancy and load balancing

**Satellite Selection:**
- Nodes can connect to multiple satellites simultaneously
- Geographic and performance-based satellite selection
- Automatic failover between satellites for reliability

### Node Registration

**Initial Contact Protocol:**
```
1. Node contacts satellite with identity certificate
2. Satellite verifies node identity and configuration
3. Satellite records node metadata (address, capacity, etc.)
4. Node begins receiving data allocation opportunities
```

**Ongoing Registration Maintenance:**
- Regular contact with satellites to maintain active status
- Configuration updates automatically propagated to satellites
- Graceful handling of temporary connectivity issues

## Data Flow and Operations

### Data Storage Operations

**Piece Upload Process:**
1. **Allocation Request**: Satellite requests node to store data piece
2. **Resource Verification**: Node checks available storage capacity
3. **Data Transfer**: Direct peer-to-peer transfer from customer to node
4. **Verification**: Node validates data integrity and sends confirmation
5. **Metadata Update**: Satellite records successful piece storage

**Storage Requirements:**
- Adequate disk space with overhead for temporary operations
- Fast enough I/O to handle concurrent upload requests
- Reliable storage medium to prevent data corruption

### Data Retrieval Operations

**Piece Download Process:**
1. **Download Request**: Customer requests piece from node
2. **Authentication**: Node verifies request authenticity
3. **Data Transfer**: Direct transfer from node to customer
4. **Bandwidth Accounting**: Node tracks egress bandwidth for payment
5. **Performance Metrics**: Response time recorded for reputation

**Performance Factors:**
- Network bandwidth affects customer experience
- Disk I/O speed influences response times
- Concurrent request handling improves node utilization

### Audit and Verification

**Audit Protocol:**
1. **Audit Challenge**: Satellite requests proof of piece storage
2. **Data Retrieval**: Node accesses and validates stored piece
3. **Cryptographic Proof**: Node generates proof of possession
4. **Response Submission**: Proof sent to satellite for verification
5. **Reputation Update**: Audit result affects node reputation score

**Audit Requirements:**
- Must respond to audits within specified timeframes
- Proof generation requires access to complete, uncorrupted data
- Failed audits negatively impact reputation and earnings

## Network Requirements and Infrastructure

### Connectivity Requirements

**Internet Connection Specifications:**
- **Minimum Upload Speed**: 5 Mbps for basic operation
- **Recommended Upload Speed**: 25+ Mbps for optimal performance
- **Latency Requirements**: <500ms to major internet hubs
- **Reliability**: >99% uptime for good reputation maintenance

**Port Configuration:**
- **Storage Node Port**: 28967 (TCP and UDP) for data operations
- **Dashboard Port**: 14002 (TCP) for web interface access
- **Port Forwarding**: Required for inbound connections from customers

**Network Address Translation (NAT):**
- Public IP address or proper port forwarding required
- Dynamic DNS services supported for residential connections
- IPv4 required (IPv6 support under development)

### Firewall and Security Configuration

**Required Inbound Access:**
- Storage node port must accept inbound connections from internet
- Dashboard port typically restricted to local network access
- QUIC protocol support for improved performance

**Security Best Practices:**
- Firewall rules limiting access to essential ports only
- Regular security updates for operating system and node software
- Network monitoring for suspicious activity

### Quality of Service (QoS)

**Bandwidth Management:**
- Adequate bandwidth allocation for node operations
- QoS policies to prioritize node traffic if sharing connection
- Monitoring tools to track bandwidth utilization patterns

**Performance Optimization:**
- Low-latency routing to major internet exchanges
- Multiple internet service provider connections for redundancy
- Content delivery network (CDN) considerations for global performance

## Operational States and Lifecycles

### Node Operational States

**Active Operation:**
- Node regularly contacts satellites and responds to requests
- Receives new data allocation opportunities
- Full participation in all network operations

**Suspended State:**
- Temporary status due to performance issues or downtime
- No new data allocation until performance improves
- Existing data remains accessible with potential reputation impact

**Disqualified State:**
- Permanent removal from network due to serious issues
- All stored data becomes inaccessible to customers
- Loss of all accumulated earnings and reputation

**Graceful Exit:**
- Voluntary departure with data migration to other nodes
- Maintains reputation and receives final payments
- Planned process for clean network departure

### Lifecycle Management

**Node Startup Sequence:**
```
1. Identity verification and configuration loading
2. Satellite contact establishment and registration
3. Storage and bandwidth capacity reporting
4. Ready state for data operations
```

**Shutdown Procedures:**
- Graceful completion of in-progress operations
- Final satellite contact to report offline status
- Proper data persistence for restart capability

**Maintenance Windows:**
- Planned downtime notification to satellites
- Minimized impact on reputation through proactive communication
- Coordinated maintenance scheduling with network operations

## Performance Monitoring and Optimization

### Key Performance Indicators

**Network Performance Metrics:**
- **Contact Success Rate**: Percentage of successful satellite communications
- **Response Time**: Average time to respond to requests
- **Bandwidth Utilization**: Upload and download capacity utilization
- **Error Rates**: Failed operations and their causes

**Resource Utilization:**
- **Storage Utilization**: Percentage of allocated space in use
- **CPU Usage**: Processing overhead for network operations
- **Memory Usage**: Buffer and cache utilization patterns
- **Disk I/O**: Read/write performance and queue depths

### Optimization Strategies

**Hardware Optimization:**
- SSD storage for better I/O performance
- Adequate RAM for caching and buffering operations
- Network interface cards optimized for throughput
- Redundant power supplies for reliability

**Software Configuration:**
- Operating system tuning for network and disk performance
- Node software configuration optimization
- Monitoring and logging system setup
- Automated maintenance and update procedures

**Network Optimization:**
- Bandwidth allocation and QoS configuration
- Route optimization and latency reduction
- Connection pooling and multiplexing
- Protocol tuning for specific network conditions

## Troubleshooting Network Issues

### Common Network Problems

**Connectivity Issues:**
- Port forwarding configuration problems
- Firewall blocking required network traffic
- ISP restrictions on server-type traffic
- Dynamic IP address changes affecting accessibility

**Performance Problems:**
- Insufficient bandwidth for node operations
- High network latency affecting response times
- Packet loss causing operation failures
- Network congestion during peak usage periods

**Protocol Issues:**
- Certificate expiration or validation problems
- Protocol version mismatches between node and satellites
- gRPC communication errors and timeout issues
- TLS handshake failures affecting secure connections

### Diagnostic Tools and Techniques

**Network Connectivity Testing:**
- Port scanning to verify accessibility
- Bandwidth testing to measure actual throughput
- Latency measurement to identify performance issues
- Packet capture analysis for protocol-level debugging

**Node-Specific Diagnostics:**
- Dashboard metrics for operational visibility
- Log file analysis for error identification
- Satellite communication testing
- Performance benchmarking against network standards

**Infrastructure Monitoring:**
- Network utilization tracking
- System resource monitoring
- Historical performance analysis
- Automated alerting for operational issues

Understanding network participation requirements and protocols enables Storage Node Operators to design robust, performant systems that reliably contribute to the Storj network while maximizing earnings potential.

## Related Concepts

- [Storage Node Economics](docId:storage-node-economics) - Economic aspects of network participation
- [Reputation System](docId:reputation-system) - How network performance affects reputation
- [Privacy and Security for Operators](docId:privacy-security-operators) - Security considerations for network operations