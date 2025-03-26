(user-guide-download-and-install)=

# Download and installation

There are multiple ways to install cunoFS:

- an installation script, which allows users to install cunoFS without root privileges ({ref}`user-guide-scripted-install`);
- standard packages for various Linux distributions ({ref}`user-guide-package-manager-install`).

(user-guide-install-locations)=

## Install locations

When cunoFS is installed via the Scripted Installer, it gets installed to different locations depending on whether it was installed by root, or by a non-root user.
Hereafter, root installations are called 'system-wide', and non-root installations are called 'user-local'.

:::{note}
A package manager install of cunoFS is always system-wide, regardless of the privileges of the user installing it.
:::

(cuno-install-locations)=

```{eval-rst}
.. table:: cunoFS installation locations for per-user and systemwide installations

   =================== =============================== =======================================
    Install type        Location (:code:`CUNO_ROOT`)    Symlinks created in
   =================== =============================== =======================================
    User-local          :code:`~/.local/opt/cuno/`      :code:`~/.local/bin/`

                                                        :code:`~/.local/lib/x86_64-linux-gnu`

                                                        :code:`~/.local/share/man/`
    System-wide         :code:`/opt/cuno/`              :code:`/usr/bin/`

                                                        :code:`/usr/lib/`

                                                        :code:`/usr/share/man/`
   =================== =============================== =======================================
```

(user-guide-scripted-install)=

## Scripted installer

### Distros using glibc (most)

Most Linux distributions (including Debian/Ubuntu, RedHat and its derivatives) use the GNU Project's C standard library (glibc). This installer/version is compatible with all such Linux distributions.

```{eval-rst}
.. include:: common-scripted-installer-glibc-instructions.rst
```

### Distros using musl (Alpine)

Some Linux distributions (Alpine) use the musl C standard library. This installer/version is compatible with all such Linux distributions.

```{eval-rst}
.. include:: common-scripted-installer-musl-instructions.rst
```

(user-guide-package-manager-install)=

## Package manager installation

(user-guide-debian-derivative-install)=

### Debian and derivatives (e.g. Ubuntu)

```{eval-rst}
.. include:: common-debian-install-instructions.rst
```

### RedHat and derivatives

```{eval-rst}
.. include:: common-redhat-install-instructions.rst
```

### Alpine Linux

:::{warning}
cunoFS APK packages for Alpine will be available soon.
:::

```console
sudo apk add --allow-untrusted ./cuno_{FULL-VERSION}_amd64_musl/cuno_{FULL-VERSION}_amd64_musl.apk
```

## Other operating systems

cunoFS is built for Linux distributions only, and does not {emphasis}`natively` support other operating systems.
However, there are still ways to use cunoFS.

### macOS using Docker

:::{note}
Alternatives to Docker on Mac are available, some recommended alternatives are:

- [Rancher Desktop](https://rancherdesktop.io/) (free) - If you're on Apple Silicon, enable Rosetta (Settings > Virtual Machine > VZ: Enable Rosetta support) and VirtioFS (Settings > Virtual Machine > Volumes: virtiofs)
- [OrbStack for Mac](https://orbstack.dev/) (may be faster) - OrbStack works out of the box.

Unfortunately, [colima](https://github.com/abiosoft/colima) is not currently supported.
:::

```{eval-rst}
.. include:: common-mac-install-instructions.rst
```

(user-guide-cuno-mac)=

### Additional instructions for cuno-mac users

If you have installed cunoFS directly onto a Mac, you will only have access to cunoFS functionality within Docker containers. We provide the `cuno-mac` utility which you run from Terminal to launch conveniently set-up Linux containers.

The first time `cuno-mac` is run, a Docker image will be created with cunoFS ready to use, and a user will be set up within the container similar to your local user on the host Mac.

The Dockerfile found at `~/.local/opt/cuno/share/macos/Dockerfile` can be edited to include any software packages you wish to have available inside the container. However, to update this will require deleting the old image first (by doing `docker rmi cuno-mac`), you can then run `cuno-mac` to rebuild it.

You must choose between using `cuno-mac` and `cuno` depending on the environment you are currently in.

To start a new session in which you can use cunoFS, you run `cuno-mac` in Terminal.

If any arguments are given to `cuno-mac`, it will start a temporary container and pass the arguments on to `cuno`.

If no arguments are given, `cuno-mac` will start a new interactive container and prefix `(cuno)` to your command-line prompt. This indicated that you are now inside a Docker container, so from here you cannot use `cuno-mac` and should instead use `cuno`.

To return to macOS, run `exit` until the `(cuno)` prefix is removed. You may only need to do this once, or you may need to do it multiple times if you have started subshells.

### Windows using WSL2

```{eval-rst}
.. include:: common-windows-install-instructions.rst
```

:::{note}
Refer to the [Microsoft documentation on installing WSL](https://docs.microsoft.com/en-gb/windows/wsl/install) for more information.
:::

### Exposing mounted object storage to the Host OS

If you’re running cunoFs in a virtual machine, you can expose any object storage mounted as volumes in it using guest-to-host volume mapping.
