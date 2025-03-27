---
title: Machine Learning Accelerator
docId: aiwoo2Gohshah8Zo

metadata:
  title: Machine Learning Accelerator
  description: Machine Learning Accelerator Guide
    
weight: 11
---

(Object Mount-machine-learning-accelerator)=

# Object Mount Machine Learning Accelerator

The Object Mount Machine Learning Accelerator (Object Mount MLA) is a software library that accelerates your existing machine learning models by advanced leveraging of our data retrieval and storage technology.

It is available for our Professional and Enterprise customers.

## Requirements

Python 3.7+ is required to use the Object Mount Machine Learning Accelerator (Object Mount MLA). If you require lower versions of Python 3, please contact us at [support@cuno.io](mailto:support@cuno.io).

### Supported functions

The Object Mount MLA has been tested with the following data loading functions:

- `open`
- `numpy.loadfile`
- `numpy.load`
- `numpy.loadtxt`
- `PIL.Image.open`
- `torchaudio.load`

It may also work with additional data loading functions, and support is available at [support@cuno.io](mailto:support@cuno.io) if you need assistance to enable additional functions.

## Usage

First, you must install the MLA dependencies in your environment. You can use `pip` to do so:

```console
pip install -r "<path to Object Mount MLA>/requirements.txt"
```

You must also set the following environment variables to enable the Object Mount Machine Learning capability:

- `CUNO_SPEEDUP_PYTHON=1`
- `PYTHONPATH="<path to the Object Mount MLA>${PYTHONPATH+:$PYTHONPATH}"`

In this example, Python will load the Object Mount MLA's `sitecustomize.py` first. The `CUNO_SPEEDUP_PYTHON` environment variable will signal the Object Mount MLA to enable our ML optimizations.

Next, you can use any of the standard ways to enable Object Mount, including Direct Interception and Object Mount Mount.

### Using Object Mount Direct Interception

To enable the Object Mount Direct Interception you can launch a new shell with Object Mount enabled as usual with `cuno`.

If this is not an option, you can use `cuno run` to enable Object Mount for a single command. You can also set the `LD_PRELOAD` environment variable directly, like `LD_PRELOAD=<path to your Object Mount installation>/lib/cuno.so`.

#### Example usage

Activating a shell with Object Mount as an example:

```console
$ export CUNO_SPEEDUP_PYTHON=1
$ export PYTHONPATH="<path to the Object Mount MLA>${PYTHONPATH+:$PYTHONPATH}"
$ cuno
(cuno) $ python3 demo/verify.py
```

### Using Object Mount Mount

To use Object Mount Mount with your object storage data, you will need to configure your Python scripts to look for data inside the mount.

#### Example usage

Mounting an S3 bucket named `dataset_bucket` at the location `$HOME/cloudmount` as an example:

```console
export CUNO_SPEEDUP_PYTHON=1
export PYTHONPATH="<path to the Object Mount MLA>/dataset_preload2${PYTHONPATH+:$PYTHONPATH}"
cuno mount --root s3://dataset_bucket "$HOME/cloudmount"
python3 dataset_preload2/demo/verify.py --location "$HOME/cloudmount/training_set_1"
```
