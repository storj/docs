# Tally vs Rollup

The terms "tally" and "rollup" are used throughout the code base. Their specific meanings have been a source of confusion since their meanings are similar.

The purpose of this document is to:
- define the terms "tally" and "rollup".
- provide details about how tally and rollup are used in the code base.

## Definitions

Both tally and rollup sum an amount of something (i.e. storage or bandwidth) as it relates to a period of time.

They differ in what the period of time is.
- For tally, the period of time is just a single moment in time, typically the most recent or current moment.
- For rollup, the period of time is a time frame, for example 1 hr or 1 day time interval.

This means that tally is a snapshot of the current state. And rollup is an aggregate of those snapshots.

## Implementations of Tally and Rollup

Here is a high level overview of how tallies and rollups are used in the code base.

The items that need to be tallied and rolledup include:
- bandwidth usage for storage nodes
- bandwidth usage for uplinks
- storage usage for storage nodes
- storage usage for uplinks

#### Bandwidth usage is tallied when Orders are created

Details:

OrderLimits are created by the Satellite (SA) when an Uplink uploads/downloads a file. OrderLimits indicate the maximum amount of bandwidth an Uplink can use per Storage node (SN) when storing a file. Orders are created by the Uplink when storing a file on a SN.  The Uplink sends the Orders to the SN. The Order has an "amount" field which is the "tally" and indicates how much bandwidth the Uplink is currently using. The SN saves this and once the file is done being uploaded, then sends the Orders to the SA to finanlize (i.e. "settle") that amount.

#### Bandwidth usage is rolledup when SA settles Orders

Details:

When the SA receives the request to settle the Orders from the SN, the SA then adds/updates a record to the `storagenode_bandwidth_rollup` and `bucket_bandwidth_rollup` database tables with the settled amount. The SA updates the record if there is already a rollup created in same interval.

####  Storage usage is tallied when the Tally service runs

Details:

There is a Tally service which runs every x mins (where x is configuratble, defaults to 1 hr). This Tally service loops through PointerDB and adds up all the inline and remote data currently stored on each SN then creates a record in `bucket_storage_tally` and `storagenode_storage_tally` database tables with that information.

####  Storage usage is rolledup when the Rollup service runs

Details:

There is a Rollup service which runs every x mins (where x is configuratble, defaults to 120 seconds). This Rollup service aggregates all the tally records since the last time the Rollup service ran. Then a record is created in `bucket_storage_rollup` and `storagenode_storage_rollup` tables with that information.

#### List of databases and the tables involved in tallies and rollups:

Satellite.DB tables:
- `storagenode_bandwidth_rollup`
- `bucket_bandwidth_rollup`
- `bucket_storage_tally`
- `storagenode_storage_tally`
- `bucket_storage_rollup`
- `storagenode_storage_rollup`

#### Summary table:

| | Tally for bandwidth | Rollup for bandwidth | Tally for storage | Rollup for storage |
| --- | --- | --- |--- | --- |
| **who creates data** | Uplinks or SA | SA  | Tally service | Rollup service |
| **when is data created** | Uplink uploads/downloads a file| SA creates/updates rollup when settling `Orders` from SN | when Tally service runs | when Rollup service runs |
| **where is data stored** | Uplink creates `Orders` with an amount that represents the tally | adds/updates a record in `storagenode_bandwidth_rollup` & `bucket_bandwidth_rollup` table | adds a record in `bucket_storage_tally` & `storagenode_storage_tally` table | adds a record in `bucket_storage_rollup` & `storagenode_storage_rollup` table |
