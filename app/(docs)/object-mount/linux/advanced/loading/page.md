---
title: Advanced Loading Options
hideTitle: false
docId: airoogh4Waengi8u
weight: 2
metadata:
  title: Advanced Loading
  description: 
    Advanced Loading
hidden: false
---

## Loading Object Mount

This section describes advanced usage of Object Mount, including the user-mode library, scripting, containerization, and high-performance computing (HPC) integration.


## Via CLI

You can use the `cuno` command to launch a new default Linux shell that is “wrapped” by Object Mount running in Direct Interception Mode:

```
user:~$ cuno
```

You should see the `(cuno)` CLI prefix to the left of your user prompt. This indicates that a new shell has been launched, wrapped in Object Mount’s `cuno` wrapper:

```
user:~$ cuno
(cuno) user:~$
```

The shell, and any command or application executed from within this shell, will be monitored by Object Mount. Any I/O calls will be intercepted, transformed and redirected to object storage as needed.

Enter `exit` at any time to close the Object Mount CLI console and return to the unwrapped shell prompt:

```
(cuno) user:~$ exit
user:~$
```

## Via User-Mode library: LD_PRELOAD

As mentioned in the Object Mount for Linux [Introduction](docId:wxtofwqcb5f2), Object Mount provides a User-mode Library, `cuno.so`. This dynamic loader can be pre-loaded into a running process using the `LD_PRELOAD` environment variable.

Set the environment variable `LD_PRELOAD="$CUNO_ROOT"/cuno.so` before executing a command and Object Mount will be enabled for that command.

{% callout type="note"  %}
  **`CUNO_ROOT`**

  The `CUNO_ROOT` environment variable should be set to wherever your Object Mount installation is:
  
  - `/opt/cuno` for a system-wide installation
  - `$HOME/.local/opt/cuno` for a user-local installation (generally)

  Display your `CUNO_ROOT` variable:
  ```sh
  echo $CUNO_ROOT
  ```

  If it is blank, first set the `CUNO_ROOT` environment variable:
  
  1. Locate your deployment by running:
    
      ```sh
      ls /opt/cuno
      ls $HOME/.local/opt/cuno
      ```
  
  One of those directories should display multiple cuno-related files.

  2. Set your CUNO_ROOT variable (for the current shell session) by running:
      ```sh
      export CUNO_ROOT="/opt/cuno"
        -or-
      export CUNO_ROOT="$HOME/.local/opt/cuno"
      ```

  See [Installation Locations](docId:ahWohd5eegh6eizi#installation-locations-scripted-installers) for more information on installation locations.
{% /callout %}

After verifying that your `CUNO_ROOT` variable is set to the `cuno` installation directory, you can start a `bash` shell wrapped by `cuno.so` with the following command:

```console
LD_PRELOAD="$CUNO_ROOT"/lib/cuno.so bash
```

The `bash` shell, and any command executed from within this shell instance, will run with Object Mount enabled. Other processes and applications will not be affected.

**Note:** Loading the `cuno.so` library in this manner will **not** display the `(cuno)` prefix to the prompt.

Example: Browse satellite images on Google Cloud Storage:
```sh
ls gs://gcp-public-data-landsat/
```

### Additional Environment Variables

In addition to `CUNO_ROOT`, you may consider setting the following environment variables for convenience:

| **Environment Variable** | **Description** | **Value** |
|--------------------------|-----------------|-----------|
| `LD_PRELOAD`| Load the Object Mount library  | "${CUNO_ROOT}"/lib/cuno.so${LD_PRELOAD+:$LD_PRELOAD}
| `PATH`      | Path-free access to Object Mount executables  | "${CUNO_ROOT}"/bin:${PATH}
| `MANPATH`   | Easy access to Object Mount manual pages |  "${CUNO_ROOT}"/share/man:${MANPATH}


## Via Shell Profiles

To _always_ load Object Mount when starting a new interactive shell, append the following line to `~/.bashrc` or `~/.zshrc`:

```console
export LD_PRELOAD="${CUNO_ROOT}"/lib/cuno.so`
```

`/etc/profile.d` contains application-specific startup scripts, which are executed at user login by their respective login shells.

A sample script is provided in `${CUNO_ROOT}/etc/profile.d/cunorc.sh`.

Copy this to `/etc/profile.d/` to enable Object Mount for all users.


## Via Docker

There are multiple methods to use Object Mount from within Docker containers.

### Automatic Docker Interception

To enable automatic Docker interception, set the environment variable `CUNO_INTERCEPT_DOCKER=1` and load Object Mount.
Launching a Docker container via `docker run …` will make Object Mount available inside the container.

{% callout type="warning"  %}
  **Automatic Interception within Docker**
  
  Support for automatic Docker interception is currently **experimental**.
  
  For ways of running Docker with Object Mount interception manually, see Manual Interception below.
{% /callout %}

For instance, the following code will run a command inside an Ubuntu container with Object Mount enabled with the hosts Object Mount credentials:

```console
export CUNO_INTERCEPT_DOCKER=1
cuno run docker run --rm ubuntu:latest ls -l s3://bucket
```

Object Mount options will be forwarded into the container.

To override Object Mount options just for Docker containers, use the `CUNO_DOCKER_OPTIONS` environment variable. If set, its value overrides that of `CUNO_OPTIONS` inside Docker containers.

### Manual Docker Interception

Besides automatic interception, the following manual methods can be used to enable Object Mount in Docker containers:

  - Install Object Mount as part of the creation of the Docker image.
  - Inject Object Mount at launch into an existing Docker image.

To inject Object Mount into a Docker container when it is launched:

  1. Set `CUNO_CREDENTIALS` outside the container

      - See [Credential File Location](docId:aish4shuiheeZaig#credential-file-location) for details.

  2. If desired, the `CUNO_OPTIONS` environment variable can be set using the Docker `--env` option when using `docker run`

      - See [Set environment variables (--env](https://docs.docker.com/reference/cli/docker/container/run/#env) in the Docker documentation.

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

      This command requires Object Mount already be installed and [activated](docId:BN6yJrwasPnZsaf), with a valid license key, on the host system.
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

## Within Kubernetes Clusters

You can use Object Mount on Kubernetes clusters with the Object Mount Kubernetes CSI Driver.

Refer to the User Guide article: [Kubernetes CSI Driver](docId:zohm4zeXohpae9ga).


## With Sylabs Singularity

There are multiple methods for enabling 🌐 [Sylabs Singularity](https://sylabs.io/) images with Object Mount, allowing transparent access to cloud hosted files.

You can:

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
    Name object mount
    URL storj.io
    Email supportdcs@storj.io
```

The above will require that the Object Mount software package is available at the path’s starting `/home/admin/downloads` as listed in the `%files` section.

Rather than modifying an existing Singularity image, another option is to pass-through the Object Mount library and binaries making them available inside the image. 

Optionally, the `CUNO_OPTIONS` environment variable can be set for a particular mode of operation.

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
  **Activated License Required**

  This method requires Object Mount be installed and [activated](docId:BN6yJrwasPnZsaf), with a valid license key, on the system that is used to execute the Singularity images.
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


## Using the Lmod Environment Module System

The [Lmod](https://lmod.readthedocs.io/en/latest/) Environment Module System is a tool to help users manage shell environments. It allows groups of related environment variable settings to be made or removed dynamically.

Many HPC environments incorporate `module` as one of the means by which software can be loaded by their users.

A sample script has been provided within your Object Mount installation directory here: `${CUNO_ROOT}/share/modulefiles/cuno/{FULL-VERSION}.lua`.

It is built specifically for the **Lmod** implementation in **Lua**, and uses values set to example paths (see the `base` variable in particular) and default options that you might want to append to, modify, or remove to suit your environment and your installation choices.

After adding the parent directory of the file to the `MODULEPATH` with `module use "${CUNO_ROOT}/share/modulefiles/cuno"`, a user should be able to run `module load cuno` to add Object Mount to their environment.


## With Spectrum LSF

Depending on your exact requirements and setup, there are multiple ways of using IBM’s [Spectrum LSF](https://www.ibm.com/products/hpc-workload-management) HPC Workload Management suite with Object Mount.

First, assuming that Object Mount is installed on all compute nodes, ensure that the `cuno` executable is available in the `PATH`, and that Object Mount credentials are configured for all nodes. 

Jobs can be submitted by prefixing the submitted command with `cuno run` (without quotes).

For example:

```
bsub -Is cuno run ls -l s3://bucket
```

If further configuration of Object Mount is required, an LSF job starter can be created. 

The script should be created at the location `$LSF_ENVDIR/cuno-starter.sh` or some other location that is common to all LSF nodes. (**Note:** The queue template that ships with Object Mount assumes this location). 

The following script can be used as an outline for the job starter:

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

Regardless of whether an LSF queue was set up, the job starter can be used with the `lsrun` command (but **not** `bsub`).

For example:

```console
export LSF_JOB_STARTER=$LSF_ENVDIR/cuno-starter.sh
lsrun ls -l s3://bucket
```

To use the dedicated queue, specify it when invoking `bsub`.

For example:

```console
bsub -q cuno -Is ls -l s3://demo
```
