---
author:
  name: Krista Spriggs and Jessica Grebenschikov
date: '2020-08-11 00:00:00'
heroimage: ./hero.png
layout: blog
metadata:
  description: Here at Storj Labs we just migrated our production databases from
    PostgreSQL to CockroachDB. We want to share why we did this and what our
    experience was. TL;DR Our experience has convinced us that CockroachDB is
    the best horizontally scalable database choice in 2020.
  title: Choosing Cockroach DB for Horizontal Scalability
title: Choosing Cockroach DB for Horizontal Scalability

---

Here at Storj Labs we just migrated our production databases from PostgreSQL to CockroachDB. We want to share why we did this and what our experience was.

TL;DR Our experience has convinced us that CockroachDB is the best horizontally scalable database choice in 2020.

# Why use a horizontally scalable database in the first place?

Our top goal at Storj is to run the largest, most secure, decentralized, and distributed cloud storage platform. Our cloud storage holds its own against AWS S3 and Google Cloud Storage in performance and durability and also goes further by improving reliability since it's fully distributed. In order to compete on the same scale as the big cloud providers it's crucial we can scale our infrastructure. One of the ways we are doing this is by using a horizontally scalable database. To meet our first goal of storing an exabyte of data on the Storj network, the current architecture will store over 90 PBs of file metadata. Additionally, it's vital that the Storj Network can withstand multi-region failures and still keep the network up and the data available. All of this is made relatively easy with CockroachDB!

# What about other horizontally scalable databases?

We considered a number of different horizontally scalable databases, but for our needs, CockroachDB consistently came out on top.

When considering a database that will horizontally scale there are three main categories of options:

1. Shard your current relational database.
2. Use a NoSQL key-value database, like Cassandra or BigTable.
3. Use a NewSQL relational database, like Spanner or CockroachDB.

Before the 2000s there weren’t any horizontally scaling database options. The only way to scale a database was to manually shard it yourself. Which is typically very tedious and kind of a nightmare. For example, it took Google over two years to shard some of their MySQL instances[^1]. Quite the undertaking! No wonder Google came up with the first “NewSQL” horizontally scalable relational database, Spanner.

In the early 2000s, NoSQL became all the rage since they were the first horizontally scaling options. However, NoSQL has some tradeoffs, mainly weaker consistency guarantees, and no relational models. And here we are in the 2020s, finally what we always wanted, which is the rise of the strongly consistent, relational, horizontally scaling database.

# What’s involved adding CockroachDB support to our application?

Here is our process for getting CockroachDB running up with our application:

1. Rewrote incompatible SQL code to be compatible with CockroachDB.
2. Performance and load tested in a QA environment.
3. Learned how to evaluate analytics about CockroachDB running in production.
4. Migrated production environments off PostgreSQL and over to CockroachDB.

## Writing Compatible SQL

One of the first parts of integrating with CockroachDB was to make sure all of our existing SQL was compatible. We were already backed by Postgres and CockroachDB is Postgresql wire protocol compatible, so we simply replaced the Postgres connection string with a CockroachDB connection URL and observed what broke. At the time (around v19.2-ish) there turned out to be quite a few PostgreSQL things that weren’t supported. Here’s a list of some of the highlights:

* Primary keys must be created at table creation time, so you can’t delete and create them later on if you need to change it.
* No schemas, there’s only a single “public” schema.
* No stored procedures.
* No cursor support
* Additional incompatibilities can be found here:  https://www.cockroachlabs.com/docs/v20.1/postgresql-compatibility.html.

Due to some of these unsupported Postgres features, we had to rewrite our migrations. Additionally, when we needed to change a primary key this resulted in a more tedious migration strategy where you create a new table with the new primary key then migrate all the data over to it and drop the old table.

While this process to make our SQL compatible was a bit more tedious than I had hoped, it ended up taking about a month of full-time developer time, I still feel like it was much easier than migrating over to spanner or another database without postgres compatibility.  Additionally since then, now in CockroachDB v20.1, many compatible issues have been resolved. CockroachDB is under fast development and is constantly listening to feedback from end-users and adding features per requests.

## End-to-end testing, performance and load testing

Once we had all the compatible SQL in place and all our unit tests passed, we then deployed to a production-like environment for some end-to-end testing and performance and load testing. Out of the box some things were faster than GCP CloudSQL Postgres, while some things were a teeny bit slower.

## Performance Improvement Metrics

One of the database access patterns we use is an ordered iterator, where we need to walk over every record in the database and perform some processing on each row. In our largest database with over six million rows, this iteration was getting very slow with CloudSQL Postgres database, taking about 13 hours, which was way too long. After we migrated to CockroachDB, processing every row in order was down to two hours!

Additionally, we wrote a smaller script that emulated our production iterator access patterns, but in a more isolated coding environment and got the following results when performing processing on each row in order. CockroachDB was much faster. We think there are a few reasons for this improved performance, one being the data in the CockroachDB cluster is split across many nodes and therefore increases read throughput.

```
Speed of ordered iterator

CockroachDB
Took 3.5s for 100,000 records
Took 18.8s for 1,000,000 records
Took 14m0.5s for 10,000,000 records

CloudSQL Postgres
Took 56.8s for 100,000 records
Took 4m53.3s for 1000,000 records
Took 1h48m25.1s for 10,000,000 records
```

Another awesome feature of CockroachDB is prefix compression. CockroachDB data is stored in sorted order by the primary key and any prefix shared with the previous record is dropped[^2]. This saved a lot more space than we expected. While the data stored in CockroachDB is replicated three times (by default), the additional bytes on disk was just a little over two times Postgres since the prefix compression saved quite a bit of space.

```
Prefix compression:

CloudSQL Postgres
239 GB
65,323,332  rows
~3658 bytes/row

The same database ported to CockroachDB
186 GB
65,323,332  rows
~2846 bytes/row
```

## End-to-end Testing

While end-to-end testing, there were three main issues we encountered:

* Retry errors
* Transaction contention
* Stalled transactions that never completed

### Retry Errors

Everything in CockroachDB is run as a transaction, either an explicit transaction if the application code creates a transaction or CockroachDB will create an implicit transaction otherwise. If the transaction is implicit and fails, then CockroachDB will retry for you behind the scenes. However, if an explicit transaction is aborted/fails then it’s up to the application code to handle retries. For this, we added retry functionality to our database driver code [like so](https://github.com/storj/storj/blob/master/private/dbutil/cockroachutil/driver.go#L331).

### Transaction Contention

We experienced much more transaction contention with CockroachDB and therefore aborted transactions and also slower performance with some of our database access patterns. The following changes greatly improved these issues:

* Use a smaller number of connections, fully saturated to help eliminate contention and improve throughput. This is especially helpful when there are many connections reading/writing from the same range.
* Multi-row upserts (reference [code](https://github.com/storj/storj/commit/955abd929304d41f51a651e1b6fabff2cac927b0)), instead of updating one row at a time, sends a single request with many upsert statements together.
* Blind writes to help reduce contention (reference [code](https://github.com/storj/storj/commit/78c6d5bb327185a5dfc4f3fd81f77f8f1310a180)).
* Bulk inserts.
* And more on CockroachDB [docs](https://www.cockroachlabs.com/docs/stable/performance-best-practices-overview.html#understanding-and-avoiding-transaction-contention).

### Stalled Transactions

We encountered some unusual behaviors where we had long-running queries taking over two hours sometimes.

```
-- run query from CockroachDB CLI to see age for active queries

> SELECT node_id,
   age(clock_timestamp(), oldest_query_start::timestamptz),
   substring(active_queries, 0, 50) AS query
FROM [SHOW SESSIONS]
WHERE oldest_query_start IS  NOT  NULL
ORDER BY oldest_query_start ASC
LIMIT  10;

 node_id |      age       |                       query
+---------+----------------+----------------------------------------------+

       1 | 02:24:29.576152 | INSERT  INTO example_table(id, first, last...

       3 | 02:23:59.30406| INSERT  INTO example_table(id, first, last...

       2 | 02:23:51.504073 | INSERT  INTO example_table(id, first, last...

       1 | 02:23:35.517911 | INSERT  INTO example_table(id, first, last...

       3 | 02:23:21.543682 | INSERT  INTO example_table(id, first, last...
```

Another way to see slow query times is:

```
SELECT * FROM [SHOW CLUSTER QUERIES]
WHERE  start < (now() - INTERVAL '1 min');
```

Luckily we run our databases on CockroachCloud, so the Cockroach Lab’s SREs and support team came to the rescue! They worked hard with us to debug this persistent stalled transaction issue that reared its head when we put the system under heavy load. It turned out that there was a recent change that merged into v19.2 where a potential downside is that UPDATE-heavy workloads experiencing high contention on many keys may have worse performance (up to O(n^2)). This seems to be the downside we hit. To solve this problem they deployed a patch to our cluster and now in v20.1 the fairness is adjusted when transactions conflict to reduce latencies under high contention.

While this ended up being a one-off bug with the re-scheduling of transactions that CockroachDB has already implemented a fix for in v20.1, I think it’s an interesting experience to share because it displays a number of the reasons I love CockroachDB; .they work hard and fast to build a high-quality product and they consistently offer top-notch technical support.

## Migrating the data during a maintenance window

Once we had completed all of our testing we started migrating the actual data to CockroachDB. Luckily we were able to verify the migration steps and estimate how long it might take us for each of our deployments. We made the choice to make use of one of our maintenance windows which are Sunday 2 am-6 am eastern time. With the teams ready we began the migration steps. In order to ensure we didn’t miss any data, we had to stop all services within the deployment to stop all transactions. The next step was then to take a dump of all the data, with databases ranging in size from 110 GB to 260 GB. After waiting for the data dump to complete we then sorted the data to maximize import efficiency when importing to CockroachDB. The sorting steps took the longest, between 40 and 75 minutes. A small misjudgment on the size of these intermediate VMs meant that this step ended up taking significantly longer than we had estimated. With the sorting completed we then uploaded each snapshot to a cloud storage bucket and prepared our credentials to be passed to the CockroachDB servers to access the data dumps. The imports themselves took between 40 and 75 minutes as well. Once we had all the data imported we validated several tables to ensure the data had indeed been successfully imported, and then made the configuration changes for our application to be able to talk to its new database backend.

## Adapting Existing Tooling to CockroachDB

To ensure we have all of our bases covered we have a lot of automation around our deployments. One of these pieces is a backup step that ensures we have a snapshot backup of the database before we run any migrations. With the managed services for PostgreSQL that we’ve used in the past, we’ve always had an administrator API we can hit to trigger an automated backup. Cockroach Cloud already does a great job at running periodic backups as part of their managed service, but our requirements state that the backup we take before deployment is as close in time to the migration step as possible.

We modified our existing scripts to now execute the CockroachDB backup commands directly in the database to trigger a full backup to one of our own storage buckets. Once these backups are complete we can then move forward with our existing deployment pipeline.

[^1]: [Google Spanner white paper](https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf)
[^2]: RocksDB, underlying kv store of CockroachDB, [details](https://github.com/facebook/rocksdb/blob/master/table/block_based/block_builder.cc#L10) of prefix compression
