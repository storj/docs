---
author:
  name: Egon Elbre
date: '2023-03-20 00:00:00'
heroimage: ./2aaa5a3adcf49612.jpeg
layout: blog
metadata:
  description: When writing server side projects in Go, at some point you will also
    need to test against a database. Let's take a look at different ways of using
    Postgres with different performance characteristics. The final approach shows
    how you can set up a clean database in 20ms (there are a few caveats).
  title: Go Integration Tests with Postgres
title: Go Integration Tests with Postgres

---

When writing server side projects in Go, at some point you will also need to test against a database. Let's take a look at different ways of using Postgres with different performance characteristics. The final approach shows how you can set up a clean database in 20ms (there are a few caveats).

We're not going to cover the "how should you use a real database in your tests" debate. At some point you'll need to test your database layer, so, we'll cover those cases.

## Using containers

If you have searched a bit on how to set up a clean test environment, you've probably come across [github.com/ory/dockertest](https://github.com/ory/dockertest) package. There's also [testcontainers](https://golang.testcontainers.org) for setting up containers. Alternatively, you could even invoke docker as a command and use that. Whichever your poison, the approach will look similar. We'll use *dockertest* for our examples.

Usually, the first thing you do is set up something to act as the client. With *dockertest* it means creating a *dockertest.Pool*. And we need to set it up in our *TestMain*:

If we are writing tests, then using a specific helper is going to be very convenient.

This approach creates a docker image and calls *test* callback whenever it's ready.

The callback based approach is especially helpful if you need to test with multiple backends such as Cockroach and Postgres. In your own codebase you probably would return the data layer interface rather than *\*pgx.Conn* directly. For example:

A single table migration isn't indicative of a proper database layer, but it's sufficient for seeing the best-case scenario. Adding more tables didn't seem to affect things that much.

Let's get back on track and see how you can implement the first approach. It's should be trivial to convert one to the other:

Let's look at the performance:

## Using DATABASE

In most cases, creating a new postgres instance per test isn't necessary. It'll be entirely sufficient to have a database per test. If we have SUPERUSER permissions in postgres we can create them dynamically.

To contrast with the previous approach, let's use a locally installed Postgres instance. This can be helpful, if you want to run tests against a remote database or want to avoid the container startup time.

Let's rewrite the function to create a new database per test:

Now for the small utility funcs that we used:

The performance looks already significantly better:

## Using SCHEMA

But, 90ms is still a lot of time per single test. There's one lesser-known approach we discovered in Storj. It's possible to use a [schema](https://www.postgresql.org/docs/current/ddl-schemas.html) to create an isolated namespace that can be dropped together.

Creating a new schema is as straightforward as executing `CREATE SCHEMA example;` and dropping `DROP SCHEMA example CASCADE;`. When connecting to the database it's possible to add a connection string parameter `?search\_path=example` to execute all queries by default in that schema.

Of course, if you use schemas for other purposes in your system, then this approach may complicate the rest of your code. Similarly, schemas are not as isolated as separate databases.

Now that the disclaimer is out of the way, let's take a look at some code:

The smaller utilities that make it work:

After running some benchmarks we can see that we've reached ~20ms:

## Final tweaks

There's one important flag that you can adjust in Postgres to make it run faster... of course, this should only be used for testing. It's disabling [fsync](https://www.postgresql.org/docs/current/runtime-config-wal.html).

The final results of the comparison look like:

All the tests were run in a container that didn't have persistent disk mounted. The fsync=off would probably have a bigger impact with an actual disk.

So for the conclusion, we looked at three different approaches to creating a clean Postgres environment. The approaches aren't completely equivalent, but use the fastest one that you can.

‍

