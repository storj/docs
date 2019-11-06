# Metainfo Invariants

It's very easy in metainfo to:

* introduce wrong data,
* delete valid data, or
* leave old data undeleted.

Here are invariants that need to be kept at all times to ensure that errors are less likely.

At all times, we need to remember:

**Data in metainfo can change at any time.**

When this document talks about ordering changes, then it implies that they are flushed and committed to the database and not part of a transaction.

## Update and Delete data you know.

When deleting or updating data, we always need to provide the "original data" we started the operation with and use `CompareAndSwap` either directly or indirectly.

Concern: between starting the operation and finishing the operation, the segment/object may have changed.

Example problem scenario:

```
{
    pointer := pointerdb.Get(ctx, "hello") // returns pointer X

    // another server concurrently changes "hello" to pointer Z

    pointerdb.Update(ctx, "hello", newpointer) // this could overwrite Z
    pointerdb.Delete(ctx, "hello", newpointer) // this could delete Z
}
```

## Satellite verifies before and after.

While running audits, or similar operations, the data may change. This also applies to graceful exits and repairs.

Concern: Satellite disqualifies storage node, due to a deleted piece.

Example problem scenario:
```
satellite starts audit to storage node for piece X

concurrently {
    owner of X
    deletes X and uploads Z to the same path

    // or 

    repair, gracefulexit moves X to another node
}

satellite sees that storagenode fails audit for X and disqualifies it
```

## Satellite Updates after Storage Node.

The satellite should not add data about storage node before having a confirmation from it.

Concern: Satellite crashes between updating and sending request to storage node causing database to remember operations that didn't happen.

Example problem scenario:
```
{
    mark graceful exiting piece X to node Q
    update X to contain Q in pointer db
    // satellite crashes
    receive response from node Q
}

{
    // satellite after restarting
    audit storage node Q for segment X
    node fails the audit
}
```

## Satellite Deletes before Storage Node.

The satellite should delete data from database before sending delete requests to storage node.

Concern: Satellite ends up keeping old information that has been deleted from the storage node.

Example problem scenario:
```
{
    // either from uplink or satellite
    send delete piece XYZ to storage node
    // satellite crashes
    pointerdb delete segment XYZ // this doesn't get executed
}

{
    // satellite after restarting
    audit storage node for segment XYZ
    node fails the audit
}
```

## Restrictions need to be verified.

Before adding any additional constraints to the database, we must verify that we don't already store data that violates those constraints.

Concern: We add limitations that break end-users code.

Example problem scenario:
```
we add a limitation for object path for 1KB

user with an object, with length 1.1KB is unable to access it anymore
```