# Storage Node and Uplink Accounting for Payments/Invoices

The purpose of this document is to describe the various parts in the code base that are involved with accounting and invoicing for Storage Nodes (SN) and Uplinks.

This document describes the following:
- What data is needed
- Lifecycle of that data

## Data Needed

In order to pay Storage Nodes, the following data is stored:
- total bandwidth usage per SN
- total data stored on disk for each SN

In order to generate invoices that breakdown usage by buckets in projects for Uplinks, the following data is stored:
- total bandwidth usage per bucket
- total data stored on disk per bucket

There are a number of database tables on the Satellite in Satellite.DB that store this data. These tables include:
- `serial_number` - stores serial numbers of Order Limits
- `used_serial` - stores serial numbers of used Orders/Order Limits
- `bucket_bandwidth_rollup` - stores aggregate bandwidth usage data per bucket during the interval time frame
- `bucket_storage_rollup` - stores aggregate on disk data per bucket during the interval time frame
- `storagenode_bandwidth_rollup` - stores aggregate bandwidth usage data per storage node during the interval time frame
- `storagenode_storage_rollup` - stores aggregate on disk data per storage node during the interval time frame

Additionally there is metadata that keeps track of which storage nodes all the files are on. This metadata is in the key/value store PointerDB, on the Satellite.

## Lifecycle of the Data

This section describes when and how this data is created and deleted.

#### Create

The following steps outline how and when the data is created for the following scenario:

Scenario 1: Uplink uploads a file

![storj-components-orders-flow](orders.png)
See detailed steps that describe this image below.

1. Uplink wants to upload a file. First the Uplink makes a request to Satellite (SA) to request OrderLimits. The OrderLimits tell the Uplink which Storage Nodes to store the file pieces on and also set a limit of how much data can be sent.
2. SA does the following in response to this request (as it pertains to OrderLimits):
   - creates the OrderLimit for each appropriate SN.
   - creates a record for each new OrderLimit in the `serial_number` table.
   - creates (or updates if within interval window) a record for each new OrderLimit into the `bucket_bandwidth_rollup` and `storagenode_bw_rollup` table with the "allocated" field set.
3. The SA responds to the Uplink's request with a list of these newly created OrderLimits.
4. The Uplink then makes requests to each SN from each of the OrderLimits to store the pieces of the file.  The Uplink sends small Orders one at a time to the SN increasing total amount a small amount at a time.
5. Once the files are uploaded to all the SN, the Uplink creates a pointer for each file and stores it in PointerDB on the SA. The pointer keeps track of which storage nodes the pieces of a remote segment were stored on.
6. At some point in the future, the SN will send the finalized Orders to the SA.
7. When the SA gets the finalized Orders from the SN, it will do the following:
   - Update the existing `bucket_bandwidth_rollup` and `storagenode_bw_rollup` records with the "settled" amount on the Orders.
   - Insert a new record into the `user_serial` table for each Order serial number.

Resources:
- More details about definitions of data see [Storj Whitepaper](https://storj.io/storjv3.pdf) Section 4.1.2.
- More details of the structured file storage process are described in the [Storj Whitepaper](https://storj.io/storjv3.pdf) Section 4.8.
- More details of the pointer metadata storage process are described in the [Storj Whitepaper](https://storj.io/storjv3.pdf) Section 4.9.
- More details of this payments process are described in the [Storj Whitepaper](https://storj.io/storjv3.pdf) Section 4.16.
- More details of this bandwidth allocation process are described in the [Storj Whitepaper](https://storj.io/storjv3.pdf) Section 4.17.
- More details of this Upload process are described in the [Storj Whitepaper](https://storj.io/storjv3.pdf) Section 5.1.

#### Delete

Records in the `serial_number` table and the `used_serial` table are deleted when the expiration is reached.

Records in the `bucket_bandwidth_rollup` and `storagenode_bandwidth_rollup` are deleted on a timeline associated with accounting after payments have been made.
