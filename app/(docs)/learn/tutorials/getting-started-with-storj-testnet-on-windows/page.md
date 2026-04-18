---
title: Getting started with Storj Testnet on Windows
docId: a1b98770-bb79-4a9d-b0e0-8d3d57106a4d
metadata:
  title: Getting started with Storj Testnet on Windows
  description: Would you like to build an app with the Storj network as backend? Let's create a local test network with Storj-Sim on Windows!
redirects:
  - /hc/en-us/articles/360028417532-Getting-started-with-Storj-Testnet-on-Windows
  - /hc/en-us/articles/360028417532
---
If you want to try it on Linux, you can read this article: [https://github.com/storj/storj/wiki/Test-network](https://github.com/storj/storj/wiki/Test-network)

In addition, we have an article for freeBSD: [Getting started with Storj Testnet on FreeNAS (freeBSD)](docId:c1df00c3-9e22-43fe-9590-6157c88d2f20)

See also our docker-compose based setup: [https://github.com/storj/up](https://github.com/storj/up)

# Install the necessary dependencies
It is recommended to install **Notepad++** for easy config file editing.

1. Install the latest Go (version 1.22.x or later), the executable can be found [here](https://golang.org/dl/). Documentation for the installation can be found [here](https://golang.org/doc/install#install).
2. Install `Msys2`, which can be found [here](http://www.msys2.org/). Please, select the `x86_64` package.

Run the **MSYS2 MinGW 64-bit** program from the Start menu and execute:
```shell
pacman -S git make mingw-w64-x86_64-gcc
```

Now close the MinGW terminal.

## Install NodeJS LTS (Optional)
You can do this in several different ways:

* [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* using [Chocolatey](https://chocolatey.org/)

```powershell
choco install nodejs-lts
```

Check the installation
```powershell
node --version
```

## Install VisualStudio 2017 build tools for C++
Install using a Chocolatey:

```powershell
choco install visualstudio2017-workload-vctools -y
```

## Install Python
Install using a Chocolatey:

```powershell
choco install python -y
```

Disable the [app execution alias for python installer](https://stackoverflow.com/a/66409838), because otherwise you will get this error:

```powershell
python --version
Python was not found; run without arguments to install from the Microsoft Store, or disable this shortcut from Settings > Manage App Execution Aliases.
```

Finish setup by restarting the terminal.

Now check the installation:

```powershell
python --version
```

## Confirm dependencies were installed correctly
Start a PowerShell or cmd terminal and execute:

```shell
setx path "C:\msys64\mingw64\bin;C:\msys64\usr\bin"
```

Please restart your terminal to apply the changes.

You should now be able to execute the following commands, please note that **for each command a version number should be returned**:

```shell
go version
git version
gcc --version
```

# Storj installation and setup instructions
## Compile Storj from Source
To compile Storj from main, please execute the following commands:

```shell
git clone https://github.com/storj/storj -b main
cd storj
go install ./...
```

If you want to have access to the storagenodes' web dashboards and to the satellite's web dashboard, you need NodeJS LTS, VisualStudio BuildTools C++ and Python installed (see optional steps above) and compile the web UIs (PowerShell):

```powershell
cd .\web\satellite\
$env:GOOS="js"; $env:GOARCH="wasm"; go build -o ./static/wasm/access.wasm storj.io/storj/satellite/console/wasm
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ./static/wasm
get-item .\static\wasm\* | %{brotli -k $_.FullName}
npm install
npm run build

cd ..\storagenode
npm install
npm run build

cd ..\multinode
npm install
npm run build

cd ..\..\satellite\admin\ui
npm install
npm run build

cd ..\..\..
And to finish compilation:
go install -race -v storj.io/gateway@latest
go install ./...
```

# Install the REDIS binaries
We should have the redis server set up locally.

Download the pre-build redis binary with libraries or build your own: [https://github.com/meiry/redis5_compiled_for_windows10](https://github.com/meiry/redis5_compiled_for_windows10) or [https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip](https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip)

Unpack the archive and copy the binary and needed libraries to `%USERPROFILE%\go\bin`

 

# Run PostgreSQL
We can install PostgreSQL either locally, in the WSL, or in a Docker container. In this example, we will create a `teststorj` DB and will use the database user `postgres`.


## Run PostgreSQL in a Docker container
The easiest way is to run it in a Docker container, but it requires Docker installed.

```powershell
docker pull postgres

docker run --rm -p 5432:5432 --name postgres postgres
```

In a new terminal, create the teststorj database:

```powershell
docker exec -it postgres createdb -U postgres teststorj
```

To run your own queries in the PostgreSQL, you can use the following command to open an interactive terminal:

```powershell
docker exec -it postgres psql -h localhost -U postgres teststorj
```

## Install PostgreSQL in the WSL
If you have a WSL enabled, then you can install PostgreSQL in the Ubuntu shell.

```shell
sudo apt update
sudo apt install postgresql -y
sudo service postgresql start
```

To create the `teststorj` database for the satellite:

```shell
sudo -u postgres psql
```

You should get a prompt `postgres=#`, execute this SQL command:
```sql
create database teststorj;
```

Then exit from the postgres shell by executing the command `\q`.

To run your own queries in PostgreSQL you can use these command to open an interactive terminal:

```shell
sudo -u postgres psql teststorj
```

### Enable access for postgres user by host
Edit `/etc/postgresql/12/main/pg_hba.conf`:

```shell
sudo nano /etc/postgresql/12/main/pg_hba.conf
```

Add this line above all lines that start with host:

```
host teststorj postgres 0.0.0.0/0 trust
```

Save the configuration file and restart the PostgreSQL:

```shell
sudo service postgresql restart
```

## Install the native PostgreSQL locally
[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

[https://www.postgresql.org/docs/current/tutorial-install.html](https://www.postgresql.org/docs/current/tutorial-install.html)

# Setup a local Storj Network
First we have to make sure we are able to call the compiled Storj binaries. To do so, please execute the following on the command line in `cmd.exe`:

```shell
setx path "C:\msys64\mingw64\bin;C:\msys64\usr\bin;%USERPROFILE%\go\bin"
```

Now restart the terminal and execute the following:

```powershell
# This will create a local test network containing the Satellite, Uplink, S3 gateway and 10 storage nodes
storj-sim network setup --postgres=postgres://postgres@localhost/teststorj?sslmode=disable

# This will run the created network
storj-sim network run
```

At the moment it's assigning ports as follows:

* Gateways start from port `11000`
* Version control is at port `12000`
* Bootstrap server is at port `13000`
* Satellites start from port `10000`
* Satellite Console starts on port `10002`
* Storage Nodes public ports start from port `14000`
* Storage Nodes private ports start from port `14001`
* Storage Nodes web dashboard start from port `13002`, `13012`, `13022`, ..., `13092`

# Getting environment variables for the Local test network
```shell
storj-sim network env
```
 
# Setup the uplink
In Powershell:

```powershell
uplink import $(storj-sim network env GATEWAY_0_ACCESS)
```

If the command throws an error such as

```powershell
PS > uplink import $(storj-sim network env GATEWAY_0_ACCESS)
Error: accepts between 1 and 2 arg(s), received 0
Usage:
 C:\Users\USER\go\bin\uplink.exe import [NAME] (ACCESS | FILE) [flags]

Flags:
 -h, --help help for import

Global Flags:
 --advanced if used in with -h, print advanced flags help
 --config-dir string main directory for uplink configuration (default "C:\\Users\\USER\\AppData\\Roaming\\Storj\\Uplink")
```

Then stop storj-sim (**Ctrl-C**) and run it back (`storj-sim network run`). After that, the configuration of uplink should work.

More info you can read at [https://github.com/storj/storj/wiki/Test-network](https://github.com/storj/storj/wiki/Test-network)

# Up- and Download Files

```powershell
# This will list all buckets in your network. If the network is new, nothing should be returned.
uplink ls 

# This is where we create bucket(mb = make bucket), e.g. uplink mb sj://Myfiles
uplink mb sj://test

# Now the bucket should appear in the list.
uplink ls

# This command is used to upload a file (cp = copy file) to your bucket.
uplink cp bigfile.avi sj://test/

# This will list all files in a specific bucket.
uplink ls sj://test/

# This is the command to download a file from your bucket to your machine. 
uplink cp sj://test/bigfile.avi bigfile.avi

# This command will delete a file from a specific bucket.
uplink rm sj://test/bigfile.avi
```

You can read more about [Uplink CLI](docId:TC-N6QQVQg8w2cRqvEqEf).

# S3 Gateway
The S3 gateway, which also is being run by `storj-sim`, allows users to quickly and easily upload files to the Storj network through a S3 gateway (Minio). Furthermore, this gateway is accessible via localhost in the browser.

Copy your S3 keys from the [Getting environment variables for the Local test network](#getting-environment-variables-for-the-local-test-network) of `storj-sim` and configure the AWS CLI:

```powershell
aws configure set default.aws_access_key_id eUXZt66VWTTpcwgBazQnPsuSYri
aws configure set default.aws_secret_access_key xDkJKUqJVhAj69CGH1VPqDPi47Q
aws configure set default.s3.multipart_threshold 1TB
```

Here are the commands to make a bucket, upload the file, make an external link for sharing:

```powershell
aws s3 --endpoint http://localhost:11000 mb s3://test3
aws s3 --endpoint http://localhost:11000 cp C:\bigvideo.avi s3://bigvideo.avi
aws s3 --endpoint http://localhost:11000 ls
aws s3 --endpoint http://localhost:11000 ls s3://test3
aws s3 --endpoint http://localhost:11000 presign s3://test3/bigvideo.avi
```

You can configure your AWS CLI to include an endpoint URL to the config: [Define an endpoint with AWS CLI](docId:20zlQyfMD9gmHJOUPx3jh).

## S3 gateway video streaming
Video streaming is possible with the S3 endpoint by executing the following command:

```powershell
aws s3 --endpoint http://127.0.0.1:11000 mb S3://Bucket
aws s3 --endpoint http://127.0.0.1:11000 cp c:\StorjIntro.mp4 S3://Bucket/StorjIntro.mp4
aws s3 --endpoint http://127.0.0.1:11000 presign s3://Bucket/StorjIntro.mp4
```

After the last command you will get an URL to your video file, which you can open in your browser or VLC player.

You can read more about [S3 Gateway](docId:EGM8O-1xt2Az03eBWT8Rf).

# Relevant directories on Windows
```powershell
#This is where the Storj code from github is stored:
C:\Users\USER\storj

#Stores the config files.
C:\Users\USER\AppData\Roaming\Storj

#Stores compiled binaries.
C:\Users\USER\go\bin
```

To revert the entire installation, deleting the directories above will do the trick.
