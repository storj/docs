---
title: Hugging Face
slug: how-tos/hugging-face
description: A walk-through of how to use Storj with Hugging Face cloud storage APIs. Examples of how to transfer, save, and load datasets. 
createdAt: 2023-01-24T16:33:16.000Z
updatedAt: 2023-03-16T20:15:31.000Z
docId: _TbcS1aJ44twHRve9UDPy
---

Hugging Face (🤗 ) is a platform that allows developers to train and deploy open-source AI models. It's similar to GitHub in that it provides a space for developers to code and deploy AI applications, including language models, transformers, text2image, and more. &#x20;

One of the stand-out features of the platform is “🤗 Datasets” – which is a collection of over 5,000 ML datasets that are available for use.

*In this guide, we will walk through the processfor configuring *[*HuggingFace Datasets*](https://huggingface.co/docs/datasets/index)* with Storj using *[*S3FS*](https://huggingface.co/docs/datasets/filesystems)* , until a storj-native integration pattern is defined*

## Prerequisites

*   Familarity and account with Hugging Face (see [Quick Start Guide](https://huggingface.co/docs/huggingface_hub/quick-start))

*   Familarity with [Colab](https://colab.research.google.com/) or equivalent environment to run code in (see [Notebooks](https://huggingface.co/docs/transformers/notebooks))

*   Storj S3 compatiable access and secret key (see [](docId\:LueFgrbZ9rJbWtDMXhIWZ))&#x20;

*   A bucket created on Storj (see [](docId\:OJPnxiexQIXHmzGBkvzHc))

## Setup Storj with S3Fs

Storj will use s3fs in order to work with the Hugging Face APIs.

First install some dependencies needed

```shell
pip install -qqU s3fs datasets
```

Next enter your Storj S3 compatible access and secret key (see [](docId\:LueFgrbZ9rJbWtDMXhIWZ))&#x20;

```python
from getpass import getpass
key = getpass('Enter Storj access key')
secret = getpass('Enter Storj secret key')
import s3fs
storage_options={"key":key, "secret":secret, "client_kwargs": {'endpoint_url':"https://gateway.storjshare.io"}}
fs = s3fs.S3FileSystem(**storage_options)
```

Create a bucket (see [](docId\:OJPnxiexQIXHmzGBkvzHc)) from the dataset to be stored in. In this walk-through the bucket will be called `my-dataset-bucket`.

## Transfer existing Hugging Face dataset to Storj

If your dataset is already on [Hugging Face Hub](https://huggingface.co/datasets), you can use the [load\_dataset\_builder](https://huggingface.co/docs/datasets/v2.8.0/en/package_reference/loading_methods#datasets.load_dataset_builder) function to download and transfer it to Storj. It'll first download raw datasets to your specified `cache_dir` then prepare it to uploaded to Storj using the `storage_options` defined previously.

Here we transfer the dataset [imdb](https://huggingface.co/datasets/imdb) to Storj

```python
from datasets import load_dataset_builder
builder = load_dataset_builder("imdb")

output_dir = "s3://my-dataset-bucket/imdb"
builder = load_dataset_builder("imdb")
builder.download_and_prepare(output_dir, storage_options=storage_options, file_format="parquet")
```

## Save dataset to Storj

Once you've [encoded a dataset](https://huggingface.co/docs/datasets/index), you can persist it using the `save_to_disk` method.

```python
encoded_dataset.save_to_disk("s3://my-dataset-bucket/imdb/train", storage_options=storage_options)
```

## Load dataset from Storj

Use the `load_from_disk` method you can download your datasets.

```python
from datasets import load_from_disk
# load encoded_dataset from cloud storage
dataset = load_from_disk("s3://my-dataset-bucket/imdb/train", storage_options=storage_options)  
print(len(dataset))
```

