---
author:
  name: Egon Elbre
date: '2022-10-13 00:00:00'
heroimage: ./d2d97753e00bbc80.png
layout: blog
metadata:
  description: Forgetting to close a file, a connection, or some other resource is
    a rather common issue in Go. Usually you can spot them with good code review practices,
    but what if you wanted to automate it and you don't have a suitable linter at
    hand?
  title: Finding and Tracking Resource Leaks in Go
title: Finding and Tracking Resource Leaks in Go

---

Forgetting to close a file, a connection, or some other resource is a rather common issue in Go. Usually you can spot them with good code review practices, but what if you wanted to automate it and you don't have a suitable linter at hand?  
  
How do we track and figure out those leaks?  
  
Fortunately, there's an approach to finding common resource leaks that we’ll explore below.

## Problem: Connection Leak

Let's take a simple example that involves a TCP client. Of course, it applies to other protocols, such as GRPC, database, or HTTP. We'll omit the communication implementation because it's irrelevant to the problem.

It's easy to put the defer in the wrong place or forget to call Close altogether.

Notice if we fail to dial the second client, we have forgotten to close the source connection.

## Problem: File Leak

Another common resource management mistake is a file leak.

## Tracking Resources

How do we track and figure out those leaks? One thing we can do is to keep track of every single open file and connection and ensure that everything is closed when the tests finish.

We need to build something that keeps a list of all open things and tracks where we started using a resource.

To figure out where our "leak" comes from, we can use [runtime.Callers](https://pkg.go.dev/runtime#Callers). You can look at the [Frames example](https://pkg.go.dev/runtime#example-Frames) to learn how to use it. Let's call the struct we use to hold this information a `Tag`.

Of course, we need something to keep the list of all open trackers:

Let's look at how it works:

You can test it over at <https://go.dev/play/p/8AkKrzYVFH5>.

## Hooking up the tracker to a `fs.FS`

We need to integrate it into the initially problematic code. We can create a wrapper for `fs.FS` that creates a tag for each opened file.

Finally, we can use this wrapper in a test and get some actual issues resolved:

You can play around with it here <https://go.dev/play/p/VTKZUzWukTe>.

## Hooking up the tracker via a Context

Passing this `tracker` everywhere would be rather cumbersome. However, we can write some helpers to put the tracker inside a `Context`.

Of course, we need to adjust our `Client` implementation as well:

To make our testing code even shorter, we can make a tiny helper:

Finally, we can put it all together:

You can see it working over here <https://go.dev/play/p/B6qI6xgij1m>.

## Making it zero cost for production

Now, all of this `runtime.Callers` calling comes with a high cost. However, we can reduce it by conditionally compiling the code. Luckily we can use tags to only compile it only for testing. I like to use the `race` tag for it because it is added anytime you run your tests with `-race`.

The implementations are left as an exercise for the reader. :)

## Conclusion

This is probably not a final solution for your problem, but hopefully, it is a good starting point. You can add more helpers, maybe track the filename inside a `Tag`, or only print unique caller frames in the test failure. Maybe try implementing this for SQL driver and track each thing separately you can take a peek [at our implementation](https://github.com/storj/private/tree/main/tagsql), if you get stuck.  
  
May all your resource leaks be discovered.This is a continuation of our series of finding leaks in Golang. In case you missed it, in a previous post we covered [finding leaked goroutines](https://www.storj.io/blog/finding-goroutine-leaks-in-tests).

