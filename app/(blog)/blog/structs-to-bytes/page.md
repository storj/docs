---
author:
  name: Egon Elbre
date: '2024-08-16 00:00:00'
heroimage: ./hero.png
layout: blog
metadata:
  description: "At some point in your software you'll need to convert some struct into a `[]byte`.\
    \ So, let's take a dive into different ways for writing encoding and decoding libraries.
  title: Structs to Bytes
title: Structs to Bytes

---

At some point in your software you'll need to convert some struct into a `[]byte`.
So, let's take a dive into different ways for writing encoding and decoding libraries.

## What's the topic?

Let's start clarifying what we won't be talking about in this post. These are definitely
important concerns to consider, but for the sake of scope we'll leave them out.

* What's the encoding format? There are many trade-offs here, which also leads to many different formats.
  In this case we won't worry about it and pick a basic encoding format.
* Integer encoding formats? We won't also worry about ZigZag encoding and others to
  ensure that the most common integers take less space.
* Compression? For that matter, we won't talk about how to structure the encoding
  such that the bytes are minimal in size.
* Forwards and backwards compatibility? Neither we'll care about forward-backwards
  compatibility of the encoding format.
* High-Performance details? We won't care about performance either - at least it's not
  an important consideration.
* Protocols? Of course, we won't talk about protocols either.

So what's the topic then?

> We're going to take some basic types such as `uint64` and `string` and then encode
them into `[]byte`.

It might seem like an easy topic, but we'll show how even this simple problem can be solved
in different ways.

## Standard Library

