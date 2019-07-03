# Tally vs Rollup

The terms "tally" and "rollup" are used throughout the code base. Their specific meanings have been a source of confusion since their meanings are similar.

The purpose of this document is to:

* [define the terms "tally" and "rollup".](tally-vs-rollup.md#Definitions)
* [explain what problem is being solved with tallies and rollups.](tally-vs-rollup.md#What-Problem-is-Being-Solved)
* [provide details about how tally and rollup are used in the code base.](tally-vs-rollup.md#Implementations-of-Tally-and-Rollup)

## Definitions

Tally adds up values over a span of time. The span of time depends on how long it takes to iteratively add up all values. Transactions that happen during tallying may or may not be accounted in the current result. Transactions that happened before tallying started are always included.

Rollup involves summarizing data over a time interval. Where the time interval can be 1 hr, 1 day, 1 month, etc. Rollups can aggregate the tally data or some other data, for example `Order` amounts.

## What Problem is Being Solved

We need to create invoices from Uplinks to display what they are paying for. We also need generate payments for storage nodes. Uplinks pay for/storage nodes get paid for two things. One, bytes of egress bandwidth and two, bytes of data stored. In order to calculate bandwidth and storage bytes, we need a way to keep track of usage. We do this with tally and rollups.

## Implementations of Tally and Rollup

Here is a high level overview of how tallies and rollups are used in the code base.

The items that are tallied include:

* storage usage \(i.e. bytes stored\) for storage nodes
* storage usage \(i.e. bytes stored\) for uplinks

The items that are rolled-up include:

* storage usage for storage nodes
* storage usage for uplinks
* bandwidth usage for storage nodes
* bandwidth usage for uplinks

### Storage usage is tallied when the Tally service runs

Details:

There is a Tally service which runs every x mins \(where x is configurable, defaults to 1 hr\). This Tally service loops through PointerDB and adds up all the inline and remote data currently stored on each SN then creates a record in `bucket_storage_tallies` and `storagenode_storage_tallies` database tables with that information.

### Storage usage is rolled-up when the Rollup service runs

Details:

There is a Rollup service which runs every x mins \(where x is configurable, defaults to 120 seconds\). This Rollup service aggregates all the tally records since the last time the Rollup service ran. Then a record is created in `bucket_storage_rollups` and `storagenode_storage_rollups` tables with that information.

### Bandwidth usage is rolled-up when SA settles Orders

Details:

When the SA receives requests to settle Orders from the SN, the SA then adds/updates a record to the `storagenode_bandwidth_rollups` and `bucket_bandwidth_rollups` Satellite.DB tables with the settled amount. The SA updates the record if a rollup already exists for the time interval \(currently 1 hr interval\), or creates a new record otherwise.

### List of databases and the tables involved in tallies and rollups:

Satellite.DB tables:

* `storagenode_bandwidth_rollups`
* `bucket_bandwidth_rollups`
* `bucket_storage_tallyies`
* `storagenode_storage_tallies`
* `bucket_storage_rollups`
* `storagenode_storage_rollups`

### Summary table:

|  | Rollup for bandwidth | Tally for storage | Rollup for storage |
| :--- | :--- | :--- | :--- |
| **who creates data** | SA | Tally service | Rollup service |
| **when is data created** | SA creates/updates rollup when settling `Orders` from SN | when Tally service runs | when Rollup service runs |
| **where is data stored** | adds/updates a record in `storagenode_bandwidth_rollup` & `bucket_bandwidth_rollup` table | adds a record in `bucket_storage_tally` & `storagenode_storage_tally` table | adds a record in `bucket_storage_rollup` & `storagenode_storage_rollup` table |

