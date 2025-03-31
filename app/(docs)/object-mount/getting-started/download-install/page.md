---
title: Download, Installation and Activation
docId: iethahkeeX5EiJoh
weight: 2
metadata:
  title: Download, Installation and Activation
  description:
   Object Mount supports the Linux operating system, and can run inside Docker and other virtual environments such as Hyper-V and Virtualbox.
---
Object Mount supports the Linux operating system, and can run inside Docker and other virtual environments such as Hyper-V and Virtualbox.

Object Mount offers a "Scripted Installer" which does not *require* root privileges to install. We also offer distributions that can be installed using popular Linux package managers. 
All of our releases are [available on GitHub](https://github.com/cunoFS/cunoFS/releases).

## Downloading and installing

[Download and Install Instructions](./installation)

## Licenses and activation

[Register](mailto:sales@storj.io) and activate your license.

### Activating your license

If you have registered, you can activate your license (sent to you via email) by running the following command and following the interactive steps:

{% tabs %}
{% tab label="Linux" %}
   ```shell
   # terminal
   cuno creds activate
   ```
{% /tab %}
{% tab label="Mac" %}
   ```shell
   # terminal
   cuno-mac creds activate
   ```
   Note: Instructions for cuno-mac users:
    
   If any arguments are given to ``cuno-mac``, it starts a temporary container with your installation of cuno mounted into it, and runs the command inside the container.

   The first time ``cuno-mac`` is run, a Docker container will be created with Object Mount ready to use and a user set up within the container similar to your local user on your Mac.
{% /tab %}
{% /tabs %}

## Testing your installation

You should now be able to run Object Mount from the command line, which you can test out by running the following command:

{% tabs %}
{% tab label="Linux" %}
   ```shell
   # terminal
   cuno version
   ```
{% /tab %}
{% tab label="Mac" %}    
   ```shell
   # terminal
   cuno-mac version
   ```
    Note:

    If you have installed Object Mount directly onto a Mac, you must choose between using ``cuno-mac`` and ``cuno`` depending on the environment you are currently in.

    If you're in a Mac Terminal session and have not run ``cuno-mac``, then you must replace ``cuno`` in any instructions with ``cuno-mac``.

    If you have already started a Object Mount container by calling ``cuno-mac``, you will see the ``(cuno)`` prefix on your command line so any instructions using ``cuno`` commands will work as-is.

    To return to macOS, run ``exit``.

    See [user-guide-cuno-mac](../installation/mac) for more information.
    
    If you have already started a ``cuno-mac`` session:
    
   ```shell
   # terminal
   cuno version
   ```

{% /tab %}
{% /tabs %}

To test that Object Mount is fully working before connecting your own object storage, you can use it to browse publicly available data. In the following example, we use Object Mount to browse space telescope data hosted on the `stpubdata` Amazon S3 bucket:


{% tabs %}
{% tab label="Linux" %}
   ```shell
   # terminal
   cuno run sh -c "ls s3://stpubdata/"
   galex  hst  jwst  k2  kepler  panstarrs  tess
   ```
   ```shell
   # terminal
   cuno run sh -c "ls s3://stpubdata/tess/public/*"
   's3://stpubdata/tess/public/ffi':
   s0001  s0005  s0009  s0013  s0017  s0021  s0025  s0029 ... [truncated]
   's3://stpubdata/tess/public/mast':
   tess-s0001-1-1-cube.fits  tess-s0012-1-4-cube.fits  tess-s0023-2-3-cube.fits ... [truncated]
   ... [truncated]
   ```                
   Note that ``cuno run`` is a way to run a single command within a Object Mount context. Most of the time, and for interactive usage, 
   we recommend starting a "wrapped" shell using the command ``cuno`` - see the [Loading Object Mount](../getting-started/enabling-object-mount#direct-interception-with-object-mount-cli) section of this guide for more information, 
   or the [equivalent section](../user-guides/basic#direct-interception-with-object-mount-cli) from the full user guide for extra detail.
{% /tab %}
{% tab label="Mac" %} 
   ```shell
   # terminal
   cuno-mac run sh -c "ls s3://stpubdata/"
   galex  hst  jwst  k2  kepler  panstarrs  tess
   ```
   ```shell
   # terminal
   cuno-mac run sh -c "ls s3://stpubdata/tess/public/*"
   's3://stpubdata/tess/public/ffi':
   s0001  s0005  s0009  s0013  s0017  s0021  s0025  s0029 ... [truncated]
   's3://stpubdata/tess/public/mast':
   tess-s0001-1-1-cube.fits  tess-s0012-1-4-cube.fits  tess-s0023-2-3-cube.fits ... [truncated]
   ... [truncated]
   ```
   Note that ``cuno-mac run`` is a way to run a single command within a Object Mount context. Most of the time, and for interactive usage, we recommend starting a container using the 
   command ``cuno-mac`` and running your commands directly inside it - see the [Loading Object Mount](../getting-started/enabling-object-mount#direct-interception-with-object-mount-cli) section of this guide for more information, or the [equivalent section](../user-guides/basic#direct-interception-with-object-mount-cli) from the full user guide for extra detail.

{% /tab %}
{% /tabs %}

