---
title: Machine Learning Accelerator
hideTitle: false
docId: aiwoo2Gohshah8Zo
weight: 6
metadata:
  title: Machine Learning Accelerator
  description: 
    Machine Learning Accelerator Guide
hidden: false  
---

The Object Mount **Machine Learning Accelerator** (Object Mount MLA) is a software library that accelerates existing machine learning models by leveraging Object Mount’s enhanced data retrieval and storage technology.

{% callout type="note" %}
  **Enterprise Feature**
  
  The Object Mount MLA library is only available to Object Mount for Linux users with an **Enterprise License Key**.
{% /callout %}


## Requirements

Python 3.7 or higher is required to use the Object Mount Machine Learning Accelerator. 

If you require previous versions of Python 3, reach out to our [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new).


## Supported Functions

The Object Mount MLA has been tested with the following data loading functions:

  - `open`
  - `numpy.loadfile`
  - `numpy.load`
  - `numpy.loadtxt`
  - `PIL.Image.open`
  - `torchaudio.load`

It may also work with additional data loading functions.

Contact our [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new) for assistance with using additional functions.


## Installation and Usage

1. **Installation:**

    To use Object Mount MLA you myst install the dependencies in your environment. 

    Use `pip` to do so:

    ```console
    pip install -r "<path to Object Mount MLA>/requirements.txt"
    ```

2. **Set Environment Variables:**

    Then set the following environment variables:

      - `CUNO_SPEEDUP_PYTHON=1`
      - `PYTHONPATH="<path to the Object Mount MLA>${PYTHONPATH+:$PYTHONPATH}"`

    The `CUNO_SPEEDUP_PYTHON` variable signals Object Mount MLA to enable specific Machine Learning optimizations.

    The `PYTHONPATH` alteration causes Python to load the Object Mount MLA’s `sitecustomize.py` file first. 

When finished, you can begin using Object Mount. All standard Object Mount deployment modes are support, including Direct Interception and Object Mount on FUSE.

Use the examples below for details on using Object Mount within your specific deployment mode.

### Object Mount MLA with Direct Interception Mode

Object Mount’s Direct Interception Mode is easily activate by running the `cuno` command to invoke a new Object Mount-wrapped shell.

  ```shell
  # terminal
  cuno
  (cuno) $ 
  ```

If using the Object Mount CLI (`cuno`) is _not_ an option, you can use `cuno run` to enable Object Mount for a _single command_. 

You can also set the `LD_PRELOAD` environment variable directly: e.g.: `LD_PRELOAD=<path to your Object Mount installation>/lib/cuno.so`.

See the “User-Mode library: LD_PRELOAD” section in the Advanced Guide article: [Advanced Loading Options](docId:airoogh4Waengi8u#via-user-mode-library-ld-preload) for additional details on using `LD_PRELOAD`.

**Example Usage:**

Activating a shell with Object Mount as an example:

```console
$ export CUNO_SPEEDUP_PYTHON=1
$ export PYTHONPATH="<path to the Object Mount MLA>${PYTHONPATH+:$PYTHONPATH}"
$ cuno
(cuno) $ python3 demo/verify.py
```

### Object Mount MLA with Object Mount on FUSE

To use Object Mount MLA with Object Mount on FUSE you will need to configure your Python scripts to look for data _inside_ the mount.

**Example Usage:**

Mount an S3 bucket named `dataset_bucket` at the location `$HOME/cloudmount`:

```console
export CUNO_SPEEDUP_PYTHON=1
export PYTHONPATH="<path to the Object Mount MLA>/dataset_preload2${PYTHONPATH+:$PYTHONPATH}"
cuno mount --root s3://dataset_bucket "$HOME/cloudmount"
python3 dataset_preload2/demo/verify.py --location "$HOME/cloudmount/training_set_1"
```
