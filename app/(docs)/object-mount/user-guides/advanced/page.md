---
title: Advanced Loading
docId: airoogh4Waengi8u

metadata:
  title: Advanced Loading
  description: Advanced Loading

weight: 7    
---

This section describes advanced usage of Object Mount, including the user-mode library, scripting, containerisation, and high-performance computing (HPC) integration.

## User-mode library

{% callout type="note"  %}
The `$CUNO_ROOT` environment variable should be set to wherever your Object Mount installation is: `/opt/cuno` for a system-wide installation, and usually `$HOME/.local/opt/cuno` for a user-local installation. See [user-guide-install-locations](user-guide-install-locations) for more information on installation locations.
{% /callout %}

As mentioned in [user-guide-overview](user-guide-overview), Object Mount provides `cuno.so` which may be loaded into a running process using `LD_PRELOAD`.
Set the environment variable `LD_PRELOAD="$CUNO_ROOT"/cuno.so` before executing a command, and Object Mount will be enabled for that command.
To start a `bash` instance with Object Mount loaded, run:

```console
LD_PRELOAD="$CUNO_ROOT"/cuno.so bash
```

`bash` and any command executed from within this instance will run with Object Mount enabled.
However, other processes are not affected; this could be useful for unattended scripts.

{% callout type="note"  %}
Loading the library in this manner will {emphasis}`not` apply the `(cuno)` prefix to the prompt.
{% /callout %}

## Environment variables

If Object Mount was not installed to a default location, first set the `CUNO_ROOT` environment variable as described in [user-guide-install-locations](user-guide-install-locations). Then, set the following environment variables for convenience:

``` 
.. table::
   :widths: auto

   +---------------------------------------------+----------------------+---------------------------------------------------------------+
   | Description                                 | Environment Variable | Value                                                         |
   +=============================================+======================+===============================================================+
   | Load the Object Mount library                     | :code:`LD_PRELOAD`   | :code:`"${CUNO_ROOT}"/lib/cuno.so${LD_PRELOAD+:$LD_PRELOAD}`  |
   +---------------------------------------------+----------------------+---------------------------------------------------------------+
   | Path-free access to Object Mount executables      | :code:`PATH`         | :code:`"${CUNO_ROOT}"/bin:${PATH}`                            |
   +---------------------------------------------+----------------------+---------------------------------------------------------------+
   | Easy access to Object Mount manual pages          | :code:`MANPATH`      | :code:`"${CUNO_ROOT}"/share/man:${MANPATH}`                   |
   +---------------------------------------------+----------------------+---------------------------------------------------------------+
```

## Shell profiles

To always load Object Mount when starting a new interactive shell, append the following line to `~/.bashrc` or `~/.zshrc`:

```console
export LD_PRELOAD="${CUNO_ROOT}"/lib/cuno.so`
```

`/etc/profile.d` contains application-specific startup scripts, which are executed at user login by their respective login shells.
A sample script is provided in `${CUNO_ROOT}/etc/profile.d/cunorc.sh`.
Copy this to `/etc/profile.d/` to enable Object Mount for all users.

## Containerisation and HPC

### Docker

There are multiple methods to use Object Mount from within Docker containers.

#### Automatic interception

{% callout type="note"  %}
Support for automatic Docker interception is currently **experimental**.
For ways of running Docker with Object Mount interception manually, see [user-guide-manual-docker-interception](user-guide-manual-docker-interception).
{% /callout %}

To enable automatic Docker interception, set the environment variable `CUNO_INTERCEPT_DOCKER=1` and load Object Mount.
Launching a Docker container via `docker run …` will make Object Mount available inside the container.
For instance, the following code will run a command inside an Ubuntu container with Object Mount enabled with the host's Object Mount credentials:

```console
export CUNO_INTERCEPT_DOCKER=1
cuno run docker run --rm ubuntu:latest ls -l s3://bucket
```

Object Mount options will be forwarded into the container.
To override Object Mount options just for Docker containers, use the `CUNO_DOCKER_OPTIONS` environment variable: if set, its value overrides that of `CUNO_OPTIONS` inside Docker containers.

#### Manual interception

Besides automatic interception, the following methods can be used to enable Object Mount in Docker containers:

- Install Object Mount as part of the creation of the Docker image (see [user-guide-download-and-install](user-guide-download-and-install));
- Inject Object Mount at launch into an existing Docker image.

To inject Object Mount into a Docker container when it is launched:

1. Set `CUNO_CREDENTIALS` outside the container; see [user-guide-credentials-management](user-guide-credentials-management) for details.
2. Optionally, the `CUNO_OPTIONS` environment variable can be set using the `--env` [option](https://docs.docker.com/engine/reference/commandline/run/#env) of `docker run`.
3. Use the following options when using `docker run`:
    ```console
     docker run                                               \
         --tmpfs /cunodb                                      \
         -v $CUNO_ROOT:/opt/cuno:ro                           \
         -v /opt/cuno/etc/ld.so.preload:/etc/ld.so.preload:ro \
         -v $CUNO_CREDENTIALS:/opt/cuno-config/creds:ro       \
         <image> [container-commands]
     ```

     {% callout type="note"  %}
     This uses the volume mount option (`-v`) to make Object Mount and other directories available to the container.

     This command requires Object Mount to already be installed and [activated](user-guide-activate-licence) on the host system.

     The `$CUNO_ROOT` environment variable should be set to wherever your Object Mount installation is: `/opt/cuno` for a system-wide installation, and usually `$HOME/.local/opt/cuno` for a user-local installation. See [user-guide-install-locations](user-guide-install-locations) for more information on installation locations.
     {% /callout %}

The Object Mount credentials directory is only readable by the current user for security reasons.
However, credentials may need to be accessed by processes run by other users (e.g. NGINX worker processes) within the Docker container.
To enable this, bind mount the nested `bindpoint` directory instead of the credentials directory:

```console
docker run                                                             \
    --tmpfs /cunodb                                                    \
    -v $CUNO_ROOT:/opt/cuno:ro                                         \
    -v /opt/cuno/etc/ld.so.preload:/etc/ld.so.preload:ro               \
    -v $CUNO_CREDENTIALS/bindpoint:/opt/cuno-config/creds/bindpoint:ro \
    <image> [container-commands]
```

## Kubernetes

You can use Object Mount on Kubernetes clusters with the Object Mount Kubernetes CSI Driver.
Please refer to [the Object Mount K8s CSI Driver page](user-guide-kubernetes-csi-driver).

## Singularity

There are multiple methods for enabling [Singularity] images with Object Mount, allowing transparent access to cloud hosted files:

- Install Object Mount as part of the creation of the Singularity image
- Inject the Object Mount library at launch into an existing Singularity image

The following Singularity definition file will install Object Mount into an image:

```
Bootstrap: docker
From: rockylinux:8

%files
    /home/admin/downloads/cuno-{FULL-VERSION}.x86_64.rpm /opt/src/

%post
    yum update -y
    yum install -y /opt/src/cuno-{FULL-VERSION}.x86_64.rpm
    echo "YOUR LICENCE KEY HERE" | cuno creds activate
    chmod og+r /opt/cuno/etc/license

%environment
    export LD_PRELOAD=/usr/lib/cuno.so
    export CUNO_CREDENTIALS=/opt/cuno-config/creds

%labels
    Name cuno
    URL cuno.io
    Email supportdcs@storj.io
```

The above will require that the Object Mount software package is available at the paths starting `/home/admin/downloads` as listed in the `%files` section.

Rather than modifying an existing Singularity image, another option is to pass-through the Object Mount library and binaries making them available inside the image. Optionally, the `CUNO_OPTIONS` environment variable can also be set for a particular mode of operation.

The following commands demonstrate injecting Object Mount into a Singularity image:

```
$ singularity exec   \
    --bind $CUNO_ROOT:/opt/cuno \
    --bind $CUNO_ROOT/etc/ld.so.preload:/etc/ld.so.preload \
    --bind "$CUNO_CREDENTIALS":/opt/cuno-config/creds     \
    ./singularity_image.sif ls s3://commoncrawl

cc-index   crawl-002       hive_analysis  meanpath           projects      wikipedia
contrib    crawl-analysis  index2012      parse-output       robots.txt
crawl-001  crawl-data      mapred-temp    parse-output-test  stats-output
```

{% callout type="note"  %}
This method requires Object Mount be installed and [activated](user-guide-activate-licence) on the system that is used to execute the Singularity images.

The `$CUNO_ROOT` environment variable should be set to wherever your Object Mount installation is: usually `/opt/cuno` for a system-wide installation, and usually `$HOME/.local/opt/cuno` for user-local installion. See [user-guide-install-locations](user-guide-install-locations) for more information on installation locations.
{% /callout %}

Alternatively, rather than using command options, the `--bind` parameters can be specified as environment variables before the `singularity` binary is called, making it easier to modify existing pipelines without changing the command line call, like so:

```
export SINGULARITY_BIND="$CUNO_ROOT:/opt/cuno,$CUNO_CREDENTIALS:/opt/cuno-config/creds"
```

As another alternative, Object Mount can be used via a FUSE mount inside Singularity with the `--fusemount` parameter:

```
$ singularity exec \
    --bind "$CUNO_ROOT":/opt/cuno \
    --bind "$CUNO_CREDENTIALS":/opt/cuno-config/creds \
    --fusemount 'container:/opt/cuno/bin/cuno mount --root /cuno /cuno' \
    ./singularity_image.sif /cuno/s3/commoncrawl
```

This will allow software inside the container to access cloud buckets via the `/cuno` path prefix.

## Lmod

The Environment Modules system is a tool to help users manage shell environments, by allowing groups of related environment variable settings to be made or removed dynamically.

Many HPC environments incorporate `module` as one of the means by which software can be loaded by their users.

A sample script has been provided within your Object Mount installation directory here: `${CUNO_ROOT}/share/modulefiles/cuno/{FULL-VERSION}.lua`, it is built specifically for the Lmod implementation in Lua, and uses values set to example paths (see the `base` variable in particular) and default options that you might want to append to, modify or remove to suit your environment and your installation choices.

After adding the parent directory of the file to the `MODULEPATH` with `module use "${CUNO_ROOT}/share/modulefiles/cuno"`, a user should be able to run `module load cuno` to add Object Mount to their environment.

## Spectrum LSF

Depending on the exact requirements and setup, there are multiple ways of using Spectrum LSF with Object Mount.

First, assuming that Object Mount is installed on all compute nodes, that the `cuno` executable is available in the `PATH`, and that Object Mount credentials are configured for all nodes, jobs can be submitted by prefixing the submitted command with `cuno run` (without quotes!), e.g.:

```
bsub -Is cuno run ls -l s3://bucket
```

If further configuration of Object Mount is required, an LSF job starter can be created. The script should be created at the location `$LSF_ENVDIR/cuno-starter.sh`, or some other location that is common to all LSF nodes (however, the queue template that ships with Object Mount assumes this location). The following script can be used as an outline for the job starter:

```shell
#!/bin/sh

cuno_basedir=<cuno_install_dir>
# e.g.:
# cuno_basedir=/opt/cuno

# Further configuration as necessary, e.g.:
# export CUNO_CREDENTIALS=/usr/share/cuno-creds
# export CUNO_OPTIONS=+cloudroot=acme

"$cuno_basedir"/bin/cuno run "$@"
```

Make the job starter executable:

```console
chmod +x "$LSF_ENVDIR"/cuno-starter.sh
```

To configure a new LSF queue for Object Mount enabled jobs, fill in and append the LSF configuration template for Object Mount to `lsb.queues`.
Use the following command:

```
cluster_name=$(lsid | grep 'cluster name' | awk '{print $NF}')
cuno run sh -c "
    sed 's;@LSF_ENVDIR@;$LSF_ENVDIR;' \"\$CUNO_BASEDIR\"/share/lsf/lsb.queues \
    >>\"$LSF_ENVDIR\"/lsbatch/$cluster_name/configdir/lsb.queues
"
```

Afterwards, LSF needs to be reconfigured:

```
badmin reconfig
```

To check that the queue was set up correctly, run:

```
bqueues -l cuno
```

Regardless of whether an LSF queue was set up, the job starter can be used with the `lsrun` command (but not `bsub`!), e.g.:

```console
export LSF_JOB_STARTER=$LSF_ENVDIR/cuno-starter.sh
lsrun ls -l s3://bucket
```

To use the dedicated queue, specify it when invoking `bsub`, e.g.:

```console
bsub -q cuno -Is ls -l s3://demo
```

[singularity]: https://sylabs.io
