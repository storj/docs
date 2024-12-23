---
title: Storj IPFS Pinning Service (Beta)
docId: KvwtaDpf_VH01I8oMwGKY
redirects:
  - /dcs/storj-ipfs-pinning-service-beta
---

## Prerequisites

{% callout type="info"  %}
You should have received an email that you have been invited to the beta which will include credentials to access the service. If you have not signed up yet, you can [Join the beta](https://landing.storj.io/permanently-pin-with-storj-dcs).
{% /callout %}

{% callout type="warning" %}
Thank you for your interest in the IPFS Pinning Beta.
We are no longer accepting additional beta users, however, here's a Github link should you choose to run this on your own: [https://github.com/storj/ipfs-go-ds-storj](https://github.com/storj/ipfs-go-ds-storj) 
{% /callout %}

The Storj IPFS Pinning service consists of an HTTP endpoint for uploading and pinning content, and an IPFS Gateway that serves the pinned content over IPFS and HTTP. Details on smart contract pinning will be made available in the future.

## How to pin with Storj IPFS

All content uploaded to the Storj IPFS service via the HTTP endpoint below is pinned. Examples are given in cURL and JavaScript, but could be done from any programming language or with existing IPFS client bindings for a given programming language, such as the [IPFS HTTP Client library](https://www.npmjs.com/package/ipfs-http-client) for npm.

## HTTP Upload endpoint

Uploading content follows the [IPFS HTTP RPC for /api/v0/add](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-add) with two minor differences:

1.  The only optional arguments supported are `wrap-with-directory` and `cid-version`.

2.  You must specify the credentials given when invited to participate in the beta as _HTTP basic authentication._

{% callout type="warning"  %}
**_This is not the same as your Storj username and password. Do not use your Storj username and password to try and use the IPFS Pinning Service._**
{% /callout %}

### Example for pinning a single file using cURL

For example, this is how it would work with cURL and a file you wanted to pin called `/path/file.extension`. Please replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

```shell
curl -u ipfs_beta_user:ipfs_beta_password -X POST -F file=@/path/file.extension "https://www.storj-ipfs.com/api/v0/add"
```

{% callout type="info"  %}
The '`@`' before the file path is required for the upload to work properly. For example, if the file you wanted to upload was `/home/hello/hi.jpg`, the curl argument would be `file=@/home/hello/hi.jpg`.
{% /callout %}

### Example for pinning a single file using cURL and optional arguments

Another example is to pin the same file `/path/file.extension`, but wrap it in a directory and use CIDv1 instead of the default CIDv0 for the content identifier. Again, replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

```shell
curl -u ipfs_beta_user:ipfs_beta_password -X POST -F file=@/path/file.extension "https://www.storj-ipfs.com/api/v0/add?wrap-with-directory&cid-version=1"
```

{% callout type="info"  %}
The '`@`' before the file path is required for the upload to work properly. For example, if the file you wanted to upload was `/home/hello/hi.jpg`, the curl argument would be `file=@/home/hello/hi.jpg`.
{% /callout %}

### Example for pinning a single file using JavaScript

You'll need [Node.js](https://nodejs.org) installed on your local system for this example.

1\. Make a new JavaScript project.

Create a new directory and use `npm` to create a new project:

```shell
mkdir storj-ipfs-quickstart
cd storj-ipfs-quickstart
npm init
```

NPM will ask a few questions about your project and create a `package.json` file.

2\. Add the `got` HTTP client and the `form-data` library to your project dependencies.

Install the latest versions of the `got` and `form-data` packages:

```shell
npm install got form-data
```

3\. Create a file called `upload-file.mjs` and open it with your code editor.

{% callout type="info"  %}
A `.mjs` extension indicates an ES6 module file. For more details see [here](https://stackoverflow.com/questions/57492546/what-is-the-difference-between-js-and-mjs-files).
{% /callout %}

Below is the code we need to upload a file and pin it on the Storj IPFS pinning service.

Paste in the code below and read through it. Feel free to remove the comments - they're just there to highlight what's happening.

```javascript
// The 'got' module gives a promised-based HTTP client.
import got from 'got'

// The 'fs' built-in module provides access to the file system.
import fs from 'fs'

// The 'form-data' module helps us submit forms and file uploads
// to other web applications.
import FormData from 'form-data'

/**
 * Uploads a file from `filepath` and pins it to the Storj IPFS pinning service.
 * @param {string} username your username for the Storj IPFS pinning service
 * @param {string} password your password for the Storj IPFS pinning service
 * @param {string} filepath the path to the file
 */
async function pinFileToIPFS(username, password, filepath) {
  // The HTTP upload endpoint of the Storj IPFS pinning service
  const url = `https://www.storj-ipfs.com/api/v0/add`

  // Create a form with the file to upload
  let data = new FormData()
  data.append('file', fs.createReadStream(filepath))

  // Execute the Upload request to the Storj IPFS pinning service
  return got.post(url, {
    username: username,
    password: password,
    headers: {
      'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
    },
    body: data,
  })
}

/**
 * The main entry point for the script that checks the command line arguments and
 * calls pinFileToIPFS.
 *
 * To simplify the example, we don't do fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */
async function main() {
  const args = process.argv.slice(2)
  if (args.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <username> <password> <filepath>`
    )
    process.exit(1)
  }

  const [username, password, filepath] = args
  const response = await pinFileToIPFS(username, password, filepath)
  console.log(response.body)
}

/**
 * Don't forget to call the main function!
 * We can't `await` things at the top level, so this adds
 * a .catch() to grab any errors and print them to the console.
 */
main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

4\. Run your script with node.

You should now be able to run the script and give it the path to a file. You'll also need to supply your username and password for the Storj IPFS pinning service.

```shell
node upload-file.mjs ipfs_beta_user ipfs_beta_password /path/file.extension
```

Please replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

### Example for pinning a folder using JavaScript

This example builds on top of the example for pinning a single file.

1\. Add the `recursive-js` and `base-path-converter` libraries to your project dependencies.

Install the latest versions of the `recursive-js` and `base-path-converter` packages:

```shell
npm install recursive-js base-path-converter
```

2\. Create a file called `upload-folder.mjs` and open it with your code editor.

{% callout type="info"  %}
A `.mjs` extension indicates an ES6 module file. For more details see [here](https://stackoverflow.com/questions/57492546/what-is-the-difference-between-js-and-mjs-files).
{% /callout %}

Below is the code we need to upload a folder and pin it on the Storj IPFS pinning service.

Paste in the code below and read through it. Feel free to remove the comments - they're just there to highlight what's happening.

```javascript
// The 'got' module gives a promised-based HTTP client.
import got from 'got'

// The 'fs' built-in module provides access to the file system.
import fs from 'fs'

// The 'form-data' module helps us submit forms and file uploads
// to other web applications.
import FormData from 'form-data'

// The 'recursive-fs' module provides async recursive file system operations.
import rfs from 'recursive-fs'

// The 'base-path-converter' module trims file paths from a base path.
import basePathConverter from 'base-path-converter'

/**
 * Uploads a folder from `folderpath` and pins it to the Storj IPFS pinning service.
 * @param {string} username your username for the Storj IPFS pinning service
 * @param {string} password your password for the Storj IPFS pinning service
 * @param {string} folderpath the path to the folder
 */
async function pinFolderToIPFS(username, password, folderpath) {
  // The HTTP upload endpoint of the Storj IPFS pinning service
  const url = `https://www.storj-ipfs.com/api/v0/add`

  // Create a form with the folder and its files to upload
  let data = new FormData()
  const { dirs, files } = await rfs.read(folderpath)
  for (const file of files) {
    data.append(`file`, fs.createReadStream(file), {
      filepath: basePathConverter(folderpath, file),
    })
  }

  // Execute the Upload request to the Storj IPFS pinning service
  return got
    .post(url, {
      username: username,
      password: password,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
      body: data,
    })
    .on('uploadProgress', (progress) => {
      console.log(progress)
    })
}

/**
 * The main entry point for the script that checks the command line arguments and
 * calls pinFolderToIPFS.
 *
 * To simplify the example, we don't do fancy command line parsing. Just three
 * positional arguments for username, password, and folder path.
 */
async function main() {
  const args = process.argv.slice(2)
  if (args.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <username> <password> <folderpath>`
    )
    process.exit(1)
  }

  const [username, password, folderpath] = args
  const response = await pinFolderToIPFS(username, password, folderpath)
  console.log(response.body)
}

/**
 * Don't forget to call the main function!
 * We can't `await` things at the top level, so this adds
 * a .catch() to grab any errors and print them to the console.
 */
main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

3\. Run your script with node.

You should now be able to run the script and give it the path to a folder. You'll also need to supply your username and password for the Storj IPFS pinning service.

```shell
node upload-folder.mjs ipfs_beta_user ipfs_beta_password /path/folder
```

Please replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

## How to retrieve pinned objects

Any content uploaded is automatically pinned and retrievable through any software that supports IPFS natively via its CID like [IPFS Desktop](https://github.com/ipfs/ipfs-desktop) or [IPFS CLI](https://docs.ipfs.io/how-to/command-line-quick-start/). Some browsers like [Brave](https://brave.com/ipfs-support/) include support, as well as some IPFS programs.

For those applications that do not support IPFS natively, you can use any [public IPFS gateway](https://docs.ipfs.io/concepts/ipfs-gateway/), or the Storj IPFS Gateway as described below.

### HTTP via Storj IPFS Gateway

For best performance, we have provided a Storj IPFS Gateway. This gateway will only host content pinned to Storj, so it is not like other public IPFS gateways.

You can construct a link like this:

```Text
https://www.storj-ipfs.com/ipfs/<cid>
```

In cases where the gateway is unable to retrieve a given CID (e.g., returns a 404 not found error), please double check that you are using the correct CID and that it was uploaded to the Storj IPFS service.

### Peering your IPFS node with Storj pinning nodes

If you run your own IPFS node that retrieves a lot of data pinned on the Storj IPFS Pinning Service, you may want to prioritize the connections to the Storj IPFS nodes. This will improve the download performance by bypassing the DHT lookup for the data.

Prioritizing connections to certain peers is called **Peering**, and you can tell IPFS which peers to prioritize by editing the [`Peering` configuration](https://docs.ipfs.io/how-to/configure-node/#peering) in your IPFS config file.

To _peer_ with Storj IPFS nodes, you could update the `Peering` section of your config to include their ID and addresses:

```json
{
  "Peering": {
    "Peers": [
      {
        "ID": "12D3KooWFFhc8fPYnQXdWBCowxSV21EFYin3rU27p3NVgSMjN41k",
        "Addrs": [
          "/ip4/5.161.92.43/tcp/4001",
          "/ip4/5.161.92.43/udp/4001/quic",
          "/ip6/2a01:4ff:f0:3b1e::1/tcp/4001",
          "/ip6/2a01:4ff:f0:3b1e::1/udp/4001/quic"
        ]
      },
      {
        "ID": "12D3KooWSW4hoHmDXmY5rW7nCi9XmGTy3foFt72u86jNP53LTNBJ",
        "Addrs": [
          "/ip4/5.161.55.227/tcp/4001",
          "/ip4/5.161.55.227/udp/4001/quic",
          "/ip6/2a01:4ff:f0:1e5a::1/tcp/4001",
          "/ip6/2a01:4ff:f0:1e5a::1/udp/4001/quic"
        ]
      },
      {
        "ID": "12D3KooWSDj6JM2JmoHwE9AUUwqAFUEg9ndd3pMA8aF2bkYckZfo",
        "Addrs": [
          "/ip4/5.161.92.36/tcp/4001",
          "/ip4/5.161.92.36/udp/4001/quic",
          "/ip6/2a01:4ff:f0:3764::1/tcp/4001",
          "/ip6/2a01:4ff:f0:3764::1/udp/4001/quic"
        ]
      }
    ]
  }
}
```

## How to list pinned objects

Listing pinned content follows the [IPFS HTTP RPC for /api/v0/pin/ls](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-pin-ls) with two minor differences:

1.  None of the optional arguments are currently supported.

2.  You must specify the credentials given when invited to participate in the beta as _HTTP basic authentication._

{% callout type="warning"  %}
**_This is not the same as your Storj username and password. Do not use your Storj username and password to try and use the IPFS Pinning Service._**
{% /callout %}

### Example for listing pins using cURL

For example, this is how it would work with cURL to list all pins for your user. Please replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

```shell
curl -u ipfs_beta_user:ipfs_beta_password -X POST "https://www.storj-ipfs.com/api/v0/pin/ls"
```

## How to unpin objects

Unpinning content follows the [IPFS HTTP RPC for /api/v0/pin/rm](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-pin-rm) with two minor differences:

1.  None of the optional arguments are currently supported.

2.  You must specify the credentials given when invited to participate in the beta as _HTTP basic authentication._

{% callout type="warning"  %}
**_This is not the same as your Storj username and password. Do not use your Storj username and password to try and use the IPFS Pinning Service._**
{% /callout %}

{% callout type="info"  %}
**_Unpinning the content does not remove it immediately from the IPFS network, and it may still be accessible through the Storj IPFS Gateway for some time._**
{% /callout %}

### Example for removing a single pin using cURL

For example, this is how it would work with cURL and a pin with CID `QmExample`. Please replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

```shell
curl -u ipfs_beta_user:ipfs_beta_password -X POST "https://www.storj-ipfs.com/api/v0/pin/rm?arg=QmExample"
```

### Example for removing multiple pins using cURL

For example, this is how it would work with cURL and three pins with CIDs `QmExample1`, `QmExample2`, and `QmExample3`. Please replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

```shell
curl -u ipfs_beta_user:ipfs_beta_password -X POST "https://www.storj-ipfs.com/api/v0/pin/rm?arg=QmExample1&arg=QmExample2&arg=QmExample3"
```

## How to import CAR archives

The Content Addressable aRchives ([CAR](https://ipld.io/specs/transport/car/carv2/)) format is used to store content addressable objects in the form of IPLD block data as a sequence of bytes; typically in a file with a .car filename extension.

Importing a CAR archive to the Storj IPFS service will store its content and pin the root CID.

### HTTP Upload endpoint

Importing CAR content follows the [IPFS HTTP RPC for /api/v0/dag/import](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-dag-import) with two minor differences:

1.  The `stats` argument is implicitely set to `true`. No other arguments are supported.

2.  You must specify the credentials given when invited to participate in the beta as _HTTP basic authentication._

{% callout type="warning"  %}
**_This is not the same as your Storj username and password. Do not use your Storj username and password to try and use the IPFS Pinning Service._**
{% /callout %}

### Example for pinning a single file using cURL

For example, this is how it would work with cURL and a file you wanted to pin called `/path/file.car`. Please replace **_ipfs_beta_user_** and **_ipfs_beta_password_** with the beta credentials you received when accepted into the beta.

```shell
curl -u ipfs_beta_user:ipfs_beta_password -X POST -F file=@/path/file.car "https://www.storj-ipfs.com/api/v0/dag/import"
```

{% callout type="info"  %}
The '`@`' before the file path is required for the import to work properly. For example, if the file you wanted to import was `/home/hello/myfile.car`, the curl argument would be `file=@/home/hello/myfile.car`.
{% /callout %}
