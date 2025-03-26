(user-guide-advanced-loading)=

# Advanced loading

This section describes advanced usage of cunoFS, including the user-mode library, scripting, containerisation, and high-performance computing (HPC) integration.

(user-guide-ldpreload)=

## User-mode library

:::{note}
The `$CUNO_ROOT` environment variable should be set to wherever your cunoFS installation is: `/opt/cuno` for a system-wide installation, and usually `$HOME/.local/opt/cuno` for a user-local installation. See {ref}`user-guide-install-locations` for more information on installation locations.
:::

As mentioned in {ref}`user-guide-overview`, cunoFS provides {code}`cuno.so` which may be loaded into a running process using {code}`LD_PRELOAD`.
Set the environment variable {code}`LD_PRELOAD="$CUNO_ROOT"/cuno.so` before executing a command, and cunoFS will be enabled for that command.
To start a {code}`bash` instance with cunoFS loaded, run:

```console
LD_PRELOAD="$CUNO_ROOT"/cuno.so bash
```

{code}`bash` and any command executed from within this instance will run with cunoFS enabled.
However, other processes are not affected; this could be useful for unattended scripts.

:::{note}
Loading the library in this manner will {emphasis}`not` apply the {code}`(cuno)` prefix to the prompt.
:::

## Environment variables

If cunoFS was not installed to a default location, first set the `CUNO_ROOT` environment variable as described in {ref}`user-guide-install-locations`. Then, set the following environment variables for convenience:

```{eval-rst}
.. table::
   :widths: auto

   +---------------------------------------------+----------------------+---------------------------------------------------------------+
   | Description                                 | Environment Variable | Value                                                         |
   +=============================================+======================+===============================================================+
   | Load the cunoFS library                     | :code:`LD_PRELOAD`   | :code:`"${CUNO_ROOT}"/lib/cuno.so${LD_PRELOAD+:$LD_PRELOAD}`  |
   +---------------------------------------------+----------------------+---------------------------------------------------------------+
   | Path-free access to cunoFS executables      | :code:`PATH`         | :code:`"${CUNO_ROOT}"/bin:${PATH}`                            |
   +---------------------------------------------+----------------------+---------------------------------------------------------------+
   | Easy access to cunoFS manual pages          | :code:`MANPATH`      | :code:`"${CUNO_ROOT}"/share/man:${MANPATH}`                   |
   +---------------------------------------------+----------------------+---------------------------------------------------------------+
```

## Shell profiles

To always load cunoFS when starting a new interactive shell, append the following line to {code}`~/.bashrc` or {code}`~/.zshrc`:

```console
export LD_PRELOAD="${CUNO_ROOT}"/lib/cuno.so`
```

{code}`/etc/profile.d` contains application-specific startup scripts, which are executed at user login by their respective login shells.
A sample script is provided in {code}`${CUNO_ROOT}/etc/profile.d/cunorc.sh`.
Copy this to {code}`/etc/profile.d/` to enable cunoFS for all users.

% TODO: test if this works with wildcards and tab-completion

## Containerisation and HPC

### Docker

There are multiple methods to use cunoFS from within Docker containers.

#### Automatic interception

:::{note}
Support for automatic Docker interception is currently **experimental**.
For ways of running Docker with cunoFS interception manually, see {ref}`user-guide-manual-docker-interception`.
:::

To enable automatic Docker interception, set the environment variable {code}`CUNO_INTERCEPT_DOCKER=1` and load cunoFS.
Launching a Docker container via {code}`docker run …` will make cunoFS available inside the container.
For instance, the following code will run a command inside an Ubuntu container with cunoFS enabled with the host's cunoFS credentials:

```console
export CUNO_INTERCEPT_DOCKER=1
cuno run docker run --rm ubuntu:latest ls -l s3://bucket
```

cunoFS options will be forwarded into the container.
To override cunoFS options just for Docker containers, use the {code}`CUNO_DOCKER_OPTIONS` environment variable: if set, its value overrides that of {code}`CUNO_OPTIONS` inside Docker containers.

(user-guide-manual-docker-interception)=

#### Manual interception

Besides automatic interception, the following methods can be used to enable cunoFS in Docker containers:

- Install cunoFS as part of the creation of the Docker image (see {ref}`user-guide-download-and-install`);
- Inject cunoFS at launch into an existing Docker image.

To inject cunoFS into a Docker container when it is launched:

1. Set {code}`CUNO_CREDENTIALS` outside the container; see {ref}`user-guide-credentials-management` for details.
2. Optionally, the {code}`CUNO_OPTIONS` environment variable can be set using the `--env` [option](https://docs.docker.com/engine/reference/commandline/run/#env) of `docker run`.
3. Use the following options when using `docker run`:
   : ```console
     docker run                                               \
         --tmpfs /cunodb                                      \
         -v $CUNO_ROOT:/opt/cuno:ro                           \
         -v /opt/cuno/etc/ld.so.preload:/etc/ld.so.preload:ro \
         -v $CUNO_CREDENTIALS:/opt/cuno-config/creds:ro       \
         <image> [container-commands]
     ```

     :::{note}
     This uses the volume mount option ({code}`-v`) to make cunoFS and other directories available to the container.

     This command requires cunoFS to already be installed and {ref}`activated <user-guide-activate-licence>` on the host system.

     The `$CUNO_ROOT` environment variable should be set to wherever your cunoFS installation is: `/opt/cuno` for a system-wide installation, and usually `$HOME/.local/opt/cuno` for a user-local installation. See {ref}`user-guide-install-locations` for more information on installation locations.
     :::

The cunoFS credentials directory is only readable by the current user for security reasons.
However, credentials may need to be accessed by processes run by other users (e.g. NGINX worker processes) within the Docker container.
To enable this, bind mount the nested {code}`bindpoint` directory instead of the credentials directory:

```console
docker run                                                             \
    --tmpfs /cunodb                                                    \
    -v $CUNO_ROOT:/opt/cuno:ro                                         \
    -v /opt/cuno/etc/ld.so.preload:/etc/ld.so.preload:ro               \
    -v $CUNO_CREDENTIALS/bindpoint:/opt/cuno-config/creds/bindpoint:ro \
    <image> [container-commands]
```

## Kubernetes

You can use cunoFS on Kubernetes clusters with the cunoFS Kubernetes CSI Driver.
Please refer to {ref}`the cunoFS K8s CSI Driver page <user-guide-kubernetes-csi-driver>`.

## Singularity

There are multiple methods for enabling [Singularity] images with cunoFS, allowing transparent access to cloud hosted files:

- Install cunoFS as part of the creation of the Singularity image
- Inject the cunoFS library at launch into an existing Singularity image

The following Singularity definition file will install cunoFS into an image:

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
    Email support@cuno.io
```

The above will require that the cunoFS software package is available at the paths starting {code}`/home/admin/downloads` as listed in the {code}`%files` section.

Rather than modifying an existing Singularity image, another option is to pass-through the cunoFS library and binaries making them available inside the image. Optionally, the {code}`CUNO_OPTIONS` environment variable can also be set for a particular mode of operation.

The following commands demonstrate injecting cunoFS into a Singularity image:

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

:::{note}
This method requires cunoFS be installed and {ref}`activated <user-guide-activate-licence>` on the system that is used to execute the Singularity images.

The `$CUNO_ROOT` environment variable should be set to wherever your cunoFS installation is: usually `/opt/cuno` for a system-wide installation, and usually `$HOME/.local/opt/cuno` for user-local installion. See {ref}`user-guide-install-locations` for more information on installation locations.
:::

Alternatively, rather than using command options, the {code}`--bind` parameters can be specified as environment variables before the {code}`singularity` binary is called, making it easier to modify existing pipelines without changing the command line call, like so:

```
export SINGULARITY_BIND="$CUNO_ROOT:/opt/cuno,$CUNO_CREDENTIALS:/opt/cuno-config/creds"
```

As another alternative, cunoFS can be used via a FUSE mount inside Singularity with the {code}`--fusemount` parameter:

```
$ singularity exec \
    --bind "$CUNO_ROOT":/opt/cuno \
    --bind "$CUNO_CREDENTIALS":/opt/cuno-config/creds \
    --fusemount 'container:/opt/cuno/bin/cuno mount --root /cuno /cuno' \
    ./singularity_image.sif /cuno/s3/commoncrawl
```

This will allow software inside the container to access cloud buckets via the {code}`/cuno` path prefix.

## Lmod

The Environment Modules system is a tool to help users manage shell environments, by allowing groups of related environment variable settings to be made or removed dynamically.

Many HPC environments incorporate {code}`module` as one of the means by which software can be loaded by their users.

A sample script has been provided within your cunoFS installation directory here: {code}`${CUNO_ROOT}/share/modulefiles/cuno/{FULL-VERSION}.lua`, it is built specifically for the Lmod implementation in Lua, and uses values set to example paths (see the {code}`base` variable in particular) and default options that you might want to append to, modify or remove to suit your environment and your installation choices.

After adding the parent directory of the file to the {code}`MODULEPATH` with {code}`module use "${CUNO_ROOT}/share/modulefiles/cuno"`, a user should be able to run {code}`module load cuno` to add cunoFS to their environment.

## Spectrum LSF

Depending on the exact requirements and setup, there are multiple ways of using Spectrum LSF with cunoFS.

First, assuming that cunoFS is installed on all compute nodes, that the {code}`cuno` executable is available in the {code}`PATH`, and that cunoFS credentials are configured for all nodes, jobs can be submitted by prefixing the submitted command with {code}`cuno run` (without quotes!), e.g.:

```
bsub -Is cuno run ls -l s3://bucket
```

If further configuration of cunoFS is required, an LSF job starter can be created. The script should be created at the location {code}`$LSF_ENVDIR/cuno-starter.sh`, or some other location that is common to all LSF nodes (however, the queue template that ships with cunoFS assumes this location). The following script can be used as an outline for the job starter:

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

To configure a new LSF queue for cunoFS enabled jobs, fill in and append the LSF configuration template for cunoFS to {code}`lsb.queues`.
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

Regardless of whether an LSF queue was set up, the job starter can be used with the {code}`lsrun` command (but not {code}`bsub`!), e.g.:

```console
export LSF_JOB_STARTER=$LSF_ENVDIR/cuno-starter.sh
lsrun ls -l s3://bucket
```

To use the dedicated queue, specify it when invoking {code}`bsub`, e.g.:

```console
bsub -q cuno -Is ls -l s3://demo
```

[singularity]: https://sylabs.io
