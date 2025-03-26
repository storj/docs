(cunofs-machine-learning-accelerator)=

# cunoFS Machine Learning Accelerator

The cunoFS Machine Learning Accelerator (cunoFS MLA) is a software library that accelerates your existing machine learning models by advanced leveraging of our data retrieval and storage technology.

It is available for our Professional and Enterprise customers.

## Requirements

Python 3.7+ is required to use the cunoFS Machine Learning Accelerator (cunoFS MLA). If you require lower versions of Python 3, please contact us at [support@cuno.io](mailto:support@cuno.io).

### Supported functions

The cunoFS MLA has been tested with the following data loading functions:

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
pip install -r "<path to cunoFS MLA>/requirements.txt"
```

You must also set the following environment variables to enable the cunoFS Machine Learning capability:

- `CUNO_SPEEDUP_PYTHON=1`
- `PYTHONPATH="<path to the cunoFS MLA>${PYTHONPATH+:$PYTHONPATH}"`

In this example, Python will load the cunoFS MLA's `sitecustomize.py` first. The `CUNO_SPEEDUP_PYTHON` environment variable will signal the cunoFS MLA to enable our ML optimizations.

Next, you can use any of the standard ways to enable cunoFS, including Direct Interception and cunoFS Mount.

### Using cunoFS Direct Interception

To enable the cunoFS Direct Interception you can launch a new shell with cunoFS enabled as usual with `cuno`.

If this is not an option, you can use `cuno run` to enable cunoFS for a single command. You can also set the `LD_PRELOAD` environment variable directly, like `LD_PRELOAD=<path to your cunoFS installation>/lib/cuno.so`.

#### Example usage

Activating a shell with cunoFS as an example:

```console
$ export CUNO_SPEEDUP_PYTHON=1
$ export PYTHONPATH="<path to the cunoFS MLA>${PYTHONPATH+:$PYTHONPATH}"
$ cuno
(cuno) $ python3 demo/verify.py
```

### Using cunoFS Mount

To use cunoFS Mount with your object storage data, you will need to configure your Python scripts to look for data inside the mount.

#### Example usage

Mounting an S3 bucket named `dataset_bucket` at the location `$HOME/cloudmount` as an example:

```console
export CUNO_SPEEDUP_PYTHON=1
export PYTHONPATH="<path to the cunoFS MLA>/dataset_preload2${PYTHONPATH+:$PYTHONPATH}"
cuno mount --root s3://dataset_bucket "$HOME/cloudmount"
python3 dataset_preload2/demo/verify.py --location "$HOME/cloudmount/training_set_1"
```
