---
title: Preferred storage region
docId: xohph8nieS2mahSh
metadata:
  title: Setting Up and Understanding Storj Geo-distributed Storage Regions
  description: Understand Storj's region-based storage strategy and learn how to set
    up a preferred storage region in accordance with the user location, data protection
    rules and specific needs.
---

This document outlines the geo-distribution and preferred storage region strategy for Storj, focusing on the deployment of satellites in various regions to enhance data accessibility and compliance with regional data protection laws. Storj utilizes a global network of satellites, with specific nodes dedicated to serving the EU, US, and AP regions, ensuring efficient data distribution and access.

## Global Satellite Distribution

Storj operates three primary satellites in different regions to support global distribution:

- US1 (United States)
- EU1 (Europe)
- AP1 (Asia-Pacific)

These satellites form the backbone of Storj's Global Distribution Public Nodes, enabling worldwide access and efficient data storage.

### Region-Specific Public Nodes

To comply with regional regulations and to provide optimized data access speeds, Storj offers IP-based public nodes in the EU and US regions.

#### EU IP-based Public Nodes

The EU1 satellite caters specifically to users within the European Union, offering localized data handling to adhere to GDPR and other regional data protection standards.

#### US IP-based Public Nodes and U.S. Select Region

The US1 satellite serves users within the United States, providing:

- IP-based Public Nodes for general access within the region.
- U.S. Select Region nodes, located in SOC2-compliant facilities, exclusively for users requiring heightened data security and compliance standards.

## Setting a storage region

Users can request for certain regions by contacting support. The bucket or project must be empty to have a region set. There currently is not a way to move data between regions.

Default Regions can be requested on the following:

- Account (All future created projects/buckets)
- Projects (All future created buckets)
- Bucket (Must contain no objects)

When deciding on your region:

1. Identify the preferred region
2. Select the appropriate satellite (US1, EU1, AP1) based on the user's region.
3. For EU and US regions, decide whether to utilize general EU or US IP-based Public Nodes or, for those in the US requiring enhanced security and compliance, opt for the U.S. Select Region nodes.
4. Submit a request to Storj support detailing your requirements.
