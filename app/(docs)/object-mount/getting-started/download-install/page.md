---
title: Download, Installation and Activation
docId: iethahkeeX5EiJoh

metadata:
  title: Download, Installation and Activation
  description:
    Object Mount supports the Linux operating system, and can run inside Docker and other virtual environments such as Hyper-V and Virtualbox.

weight: 0
---

(getting-started-download-install)=

# Download, Installation and Activation

 Object Mount supports the Linux operating system, and can run inside Docker and other virtual environments such as Hyper-V and Virtualbox.

 Object Mount offers a "Scripted Installer" which does not *require* root privileges to install. We also offer distributions that can be installed using popular Linux package managers. All of our releases are [available on GitHub](https://github.com/ Object Mount/ Object Mount/releases).

## Downloading and installing

``` 
.. include:: {COMMON_DOWNLOAD_INSTALL_INSTRUCTIONS}
```

## Licenses and activation

When installing, you will have the option for a 14-day trial of  Object Mount Professional. You don't need to register or activate  Object Mount during the trial period. To continue using  Object Mount beyond the trial period, you must [register online](https://cuno.io/register) and activate your license.

:::{note}
Trials are only to be used once per user/organisation. If installing inside a cloud instance or container, you should register and activate an appropriate license manually.

Register [online](https://cuno.io/register) for a free personal-use license or Professional, Educational or Enterprise evaluation. Contact [sales@cuno.io](mailto:sales@cuno.io) when you're ready for a quote.

All free licenses (including evaluations) let you use Professional-tier features for 14 days, and thereafter you will be limited to the [Personal](https://cuno.io/pricing) tier of usage. See the [pricing page](https://cuno.io/pricing) for more information about pricing, licenses and the available features on each tier.
:::

### Activating your license

If you have registered, you can activate your license (sent to you via email) by running the following command and following the interactive steps:

``` 
.. tabs::

    .. group-tab:: **Linux**

        .. code-block:: console

            cuno creds activate

    .. group-tab:: **Mac**

        Open Terminal, and run the command:

        .. code-block:: console

            cuno-mac creds activate

        .. note:: Instructions for cuno-mac users

            If any arguments are given to ``cuno-mac``, it starts a temporary container with your installation of cuno mounted into it, and runs the command inside the container.

            The first time ``cuno-mac`` is run, a Docker container will be created with  Object Mount ready to use and a user set up within the container similar to your local user on your Mac.
```

## Testing your installation

You should now be able to run  Object Mount from the command line, which you can test out by running the following command:

``` 
.. tabs::

    .. group-tab:: **Linux**

        .. code-block:: console

            cuno version

    .. group-tab:: **Mac**

        .. note::

            If you have installed  Object Mount directly onto a Mac, you must choose between using ``cuno-mac`` and ``cuno`` depending on the environment you are currently in.

            If you're in a Mac Terminal session and have not run ``cuno-mac``, then you must replace ``cuno`` in any instructions with ``cuno-mac``.

            If you have already started a  Object Mount container by calling ``cuno-mac``, you will see the ``(cuno)`` prefix on your command line so any instructions using ``cuno`` commands will work as-is.

            To return to macOS, run ``exit``.

            See :ref:`user-guide-cuno-mac` for information.

        Open Terminal and run:

        .. code-block:: console

            cuno-mac version

        If you have already started a ``cuno-mac`` session:

        .. code-block:: console

            cuno version
```

To test that  Object Mount is fully working before connecting your own object storage, you can use it to browse publicly available data. In the following example, we use  Object Mount to browse space telescope data hosted on the `stpubdata` Amazon S3 bucket:

``` 
.. tabs::

    .. group-tab:: **Linux**

        .. code-block:: console

            $ cuno run sh -c "ls s3://stpubdata/"

            galex  hst  jwst  k2  kepler  panstarrs  tess

            $ cuno run sh -c "ls s3://stpubdata/tess/public/*"

            's3://stpubdata/tess/public/ffi':
            s0001  s0005  s0009  s0013  s0017  s0021  s0025  s0029 ... [truncated]

            's3://stpubdata/tess/public/mast':
            tess-s0001-1-1-cube.fits  tess-s0012-1-4-cube.fits  tess-s0023-2-3-cube.fits ... [truncated]

            ... [truncated]

        .. note::

            Note that ``cuno run`` is a way to run a single command within a  Object Mount context. Most of the time, and for interactive usage, we recommend starting a "wrapped" shell using the command ``cuno`` - see the :ref:`Loading  Object Mount <getting-started-direct-interception>` section of this guide for more information, or the :ref:`equivalent section <user-guide-direct-interception>` from the full user guide for extra detail.

    .. group-tab:: **Mac**

        .. code-block:: console

            $ cuno-mac run sh -c "ls s3://stpubdata/"

            galex  hst  jwst  k2  kepler  panstarrs  tess

            $ cuno-mac run sh -c "ls s3://stpubdata/tess/public/*"

            's3://stpubdata/tess/public/ffi':
            s0001  s0005  s0009  s0013  s0017  s0021  s0025  s0029 ... [truncated]

            's3://stpubdata/tess/public/mast':
            tess-s0001-1-1-cube.fits  tess-s0012-1-4-cube.fits  tess-s0023-2-3-cube.fits ... [truncated]

            ... [truncated]

        .. note::

            Note that ``cuno-mac run`` is a way to run a single command within a  Object Mount context. Most of the time, and for interactive usage, we recommend starting a container using the command ``cuno-mac`` and running your commands directly inside it - see the :ref:`Loading  Object Mount <getting-started-direct-interception>` section of this guide for more information, or the :ref:`equivalent section <user-guide-direct-interception>` from the full user guide for extra detail.
```

% .. note::

% To make usage as comfortable as possible, we support `man pages`_ and `tab auto-complete`_ for our commands/subcommands - see the full user-guide for setup instructions.

% TODO: _tab auto-complete: https://cuno.io/docs/tab-auto-complete

% TODO: _man pages: https://cuno.io/docs/man-pages
