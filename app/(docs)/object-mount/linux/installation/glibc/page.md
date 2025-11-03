---
title: glibc
hideTitle: false
docId: ahWohd5eegh6eizi
weight: 2
metadata:
  title: Glibc
  description:
    glibc Installation Instructions
hidden: false
---

Many Linux distributions use the GNU Project’s C standard library 🌐 ([glibc](https://en.wikipedia.org/wiki/glibc)). 

Storj’s Object Mount **glibc scripted installer** (a `.run` file) is compatible with all such Linux distributions.

This installer shell script allows you to install Object Mount (for the current user) _without_ needing root privileges &mdash; no `sudo` required.

{% callout type="info" %}
If you prefer a **full installer** for use with package managers (i.e.: Debian, Ubuntu, etc.) refer to the [](docId:aemie9zeiP9Nie2k) installation instructions.
{% /callout %}

Follow the steps below to install and configure Object Mount for **glibc** platforms.


## Step 1. Download the Install Script

Download the latest scripted installer.

- **Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

Be sure to download the correct script file for your specific chip architecture:

| **Chip Type** | **Scripted Installer Filename**    |
|---------------|------------------------------------|
| AMD x64       | cuno-mne-amd64-glibc-installer.run
| Intel x86     | cuno-mne-x86_64-glibc-installer.run


## Step 2. Install & Activate Object Mount

- **Note:** If you do not yet have a license key, you can install Object Mount for Linux in a fully-featured **Free Trial** mode. Reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) for more details.

**2a.** To install Object Mount for use _only_ by the **current user**, run the following command from a terminal window (select your processor type):

{% tabs %}

{% tab label="AMD x64" %}
  ```shell
  # terminal
  sh cuno-mne-amd64-glibc-installer.run
  ```
{% /tab %}

{% tab label="Intel x86" %}
  ```shell
  # terminal
  sh cuno-mne-x86_64-glibc-installer.run
  ```
{% /tab %}

{% /tabs %}

**2b.** To install Object Mount to be used by **all users** system-wide, add `sudo` to the _front_ of the run command:

{% tabs %}

{% tab label="AMD x64" %}
  ```shell
  # terminal
  sudo sh cuno-mne-amd64-glibc-installer.run
  ```
{% /tab %}

{% tab label="Intel x86" %}
  ```shell
  # terminal
  sudo sh cuno-mne-x86_64-glibc-installer.run
  ```
{% /tab %}

{% /tabs %}

**2c.** The installation process will prompt you to read and agree to the **end-user license agreement (EULA)**. 

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-eula.jpg)

- **Note:** You can automate this step by setting the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"`. (This is equivalent to accepting the EULA).

**2d.** The installation process will then prompt you to **activate Object Mount**. 

- Press 1 to activate a free trial:
  - This will activate a fully-featured 14-day free trial.
- Press 2 if you already have a license key:
  - Paste your license key or enter a full path to a license key file.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-enter-license-key.jpg)

- **Note:** You can automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.


## Step 3. Run & Validate Object Mount’s Connectivity

Verify Object Mount is able to run correctly and can connect to publicly accessible S3 object storage buckets.

**3a.** Enter Object Mount’s CLI console (aka “cunoFS”):

- From a shell prompt (command line or terminal window) enter the `cuno` command:
  ```console
  user:~$ cuno
  ```

- You should see that the `cuno` CLI console interface has been activated:
  ```
  user:~$ cuno
  (cuno) user:~$
  ```

{% callout type="info" %}
If the Object Mount `cuno` application cannot be found (`cuno: command not found`), add the install location (`/home/<user>/.local/opt/cuno`) to your `$PATH` variable.
{% /callout %}

- Enter `exit` at any time to close the Object Mount CLI console and return to the shell prompt.
  ```
  (cuno) user:~$ exit
  user:~$
  ```

**3b.** `cuno` commands & documentation

Some Object Mount `cuno` commands _must_ be run from a Linux shell prompt:
  ```shell
  # terminal
  cuno --version
  CUNO v1.2.8.8 (b08568ca6)
  ```

Other commands must be run from within the `cuno` CLI console interface.

- **From a Linux Shell:** Use `cuno -h` (or `cuno --help`) from a Linux shell to view the **Cuno Documentation** and browse the list of Linux shell `cuno` commands:

  ```shell
  # terminal
  cuno -h
  ```

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-man-pages.jpg)

- **From the `cuno` Console:** Enter `help` within the `cuno` console interface to see commands that can be run from there:
  ```shell
  user:~$ cuno
  (cuno) user:~$ help

  job_spec [&]                            history [-c] [-d offset] [n] or hist>
  (( expression ))                        if COMMANDS; then COMMANDS; [ elif C>
  . filename [arguments]                  jobs [-lnprs] [jobspec ...] or jobs >
  :                                       kill [-s sigspec | -n signum | -sigs>
  [ arg... ]                              let arg [arg ...]
  [[ expression ]]                        local [option] name[=value] ...
  alias [-p] [name[=value] ... ]          logout [n]
  bg [job_spec ...]                       mapfile [-d delim] [-n count] [-O or>
  bind [-lpsvPSVX] [-m keymap] [-f file>  popd [-n] [+N | -N]
  break [n]                               printf [-v var] format [arguments]
  builtin [shell-builtin [arg ...]]       pushd [-n] [+N | -N | dir]
  caller [expr]                           pwd [-LP]
  case WORD in [PATTERN [| PATTERN]...)>  read [-ers] [-a array] [-d delim] [->
  ```


**3b.** Explore public datasets

Validate that Object Mount can reach Internet-based object storage buckets by listing the files in several public S3 repositories:

- View image file listings from the James Webb Space Telescope on AWS S3:

  ```shell
  (cuno) $ ls s3://stpubdata/jwst/public/
  ```

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-list-aws-bucket.jpg)

- Browse through satellite images on Google Cloud Storage:
  ```shell
  (cuno) $ ls gs://gcp-public-data-landsat/
  ```

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-list-gc-bucket.jpg)



## Step 4. Connect, access, and validate connectivity to your private object storage bucket(s)

