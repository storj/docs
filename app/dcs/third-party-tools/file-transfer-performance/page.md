---
title: File Transfer Performance
docId: cQZlhPpzn3nD3Az3QTcm1
tags:
  - large-file
redirects:
  - /dcs/how-tos/how-to-hod-rod-file-transfer-performance-on-storj-dcs
metadata:
  title: How to Hod Rod File Transfer Performance on Storj DCS
---

Many of the performance benefits of decentralized storage are achieved through distributed, redundant segmentation of files on the network. This redundancy and segmentation allow platforms like Storj to implement parallelism in the network for a greater performance boost. In the context of file transfers, parallelism is the concept of uploading or downloading different pieces of a file simultaneously (in parallel). As a user, there are ways to optimize these parallel transfers to achieve more efficient throughput.

The exact optimal settings for parallel file transfers vary based on your own compute resources and network bandwidth. The size of the files being transferred also influences the optimal configuration, as this can affect which tools are capable of providing improved performance at that size. To give an example walkthrough for a single approach, this section will demonstrate how to achieve better performance for transferring many small- to medium-sized files using Rclone.

## Parallelism on Storj

Storj DCS achieves decentralization by breaking files into chunks and distributing those chunks among nodes. First, files are broken into 64MB segments. Each segment is then distributed as 80 smaller pieces to different nodes. These chunks of segments and pieces are the fundamental ideas that form the basis for parallelism in file transfers with the Storj network.

When files are transferred between your local system and the Storj network, each segment of the file is usually sent to the network serially. However, within each segment, the individual pieces are transferred in parallel. This is Storj's Base Parallelism model for parallel transfer.

There is another parallelism model on top of Base Parallelism that can also be used for improved performance. In this approach, the 64MB segments of a file are also transferred in parallel. This is known as Segment Parallelism, and it is how to achieve the fastest transfer throughput.

With these two concepts in mind, we can begin considering the available tools for uploading and downloading files on the Storj network.

## Tools

The two main tools available to transfer files between a local system and Storj DCS are [](docId:TbMdOGCAXNWyPpQmH6EOq) and [](docId:LdrqSoECrAyE_LQMvj3aF)

Uplink is Storj's command line tool for transferring directly with the Storj network. As a native CLI tool, Uplink is able to bypass the Storj network's edge service layer and connect directly to nodes on the network. This allows for more efficient transfers and higher throughput.

However, Uplink is limited in some of its options for parallelism. For instance, when files are uploaded to Uplink, erasure coding occurs on the client side resulting in a 2.68x upload multiplier. This means that users have to upload 2.68 times the original data to use the Uplink service. Further, when uploading 64MB or smaller files, multi-transfers need to occur creating the parallelism effect, since Uplink does not support moving more than one file at a time.

So, for the purposes of demonstrating uploads and downloads for many smaller files, we will use Rclone. Rclone is a tool intended to manage files on various cloud storage providers, and it works very well with Storj, too. While files smaller than 64MB will still not be able to take advantage of segment parallelism, Rclone offers the ability to process multiple file transfers at once.

## Uploading files with Rclone

When working with small and medium-sized files, the optimal parallelism is limited by the segment, or "chunk", size. With [](docId:WayQo-4CZXkITaHiGeQF_), this segmentation is referred to as "concurrency." So, for example, a 1GB file would be optimally uploaded to Storj with the following command:

```Text
rclone copy --progress --s3-upload-concurrency 16 --s3-chunk-size 64M 1gb.zip remote:bucket
```

In this example, there are a couple of additional flags. Here's what those do:

- `--progress` shows the current progress of the transfer

- `--s3-upload-concurrency` sets the number of segments to transfer with. Since this is a 1GB file, it can only be broken into a maximum of 16 segments when each segment is 64MB (1024/64=16).

- `--s3-chunk-size` defines the size of the segments for this transfer. Since the Storj network uses 64MB chunks, that is the size set here.

With larger files, your local hardware starts to become the limiting factor for transfer speed. Multiple concurrent segment transfers each require their own chunk of memory to complete, so determining peak performance relies on calculating the amount of memory that can be dedicated to the transfer. Since the segment size is a constant 64MB, the rest of the math is simple.

For example, a 10GB file could theoretically be transferred with 160 concurrency segments since 64MB \* 160 equals 10GB. However, this optimal parallelism requires enough memory that matches the file size (10GB). So it may not be the best option on every system.

Rclone also offers the advantage of being able to transfer multiple files in parallel with the `--transfers` flag. For example, multiple 1GB files could be transferred simultaneously with this command, modified from the single file example above:

```Text
rclone copy --progress --transfers 4 --s3-upload-concurrency 16 --s3-chunk-size 64M 1gb.zip remote:bucket
```

This command sets `--transfers 4` to upload 4 files at once. With a concurrency of `16` and our constant chunk size of 64MB this command will consume 4GB of RAM to complete.

The relationship of constant chunk size to variable file size is the determining factor for realizing peak performance. While there is no single solution to optimize all scenarios, experimenting with different numbers of concurrency segments allows for measurable performance improvements. These principles also apply to downloads.

## Downloading Files with Uplink CLI

The same basic mathematical calculations for uploads are also relevant for downloads. However, since the Uplink CLI supports parallelism with downloads, it is often the better choice for performance. This can be achieved using the `--parallelism` flag, as shown below:

```Text
uplink cp sj://bucket/bighugefile.zip ~/Downloads/bighugefile.zip --parallelism 4
```

Because Uplink bypasses the Storj edge network layer, this is the best option for downloading large files. This example command sets `--parallelism 4` which will consume 4 CPU cores to download the file.

## Downloading Files with Rclone

With small files, [](docId:Mk51zylAE6xmqP7jUYAuX) is still the best option to use for downloads as well. This is again thanks to the `--transfers` flag that allows Rclone to download multiple files in parallel, taking advantage of concurrency even when files are smaller than the Storj segment size. To download 10 small files at once with Rclone, the command would be:

```Text
rclone copy --progress --transfers 10 remote:bucket /tmp
```

## Summary

Decentralized cloud storage provides benefits for distribution and highly available access. We have shown in this article how to leverage these storage advantages with transfers as well as using parallelism.

Parallel transfers, either of single large files or multiple concurrent file uploads, demonstrate the highest performance possibilities. In fact, the only limiting factors for these transfers are often the network and hardware available to the user. By experimenting with different parallelism settings for different environments, you can see this optimal performance in your own transfers.

You can also read a more detailed explanation here: [Hotrodding Decentralized Storage.](https://forum.storj.io/t/hotrodding-decentralized-storage/15228)

## See also

- [Hot Rodding Decentralized Storage Part 1](https://www.storj.io/blog/hot-rodding-decentralized-storage)

- [Hot Rodding Decentralized Storage - Part 2](https://www.storj.io/blog/hot-rodding-decentralized-storage-part-2)

- [Hot Rodding Decentralization - Part 3](https://www.storj.io/blog/hot-rodding-decentralization-part-3)
