## Getting Started

The `uplink` developer library is written for the Go language and allows Storj partners and clients to integrate with the Storj object store programmatically. We created this library to make it as easy as possible for developers to leverage decentralized object storage in their applications.

There are more than a number of reasons why you may wish to utilize decentralized storage over legacy alternatives, namely:

* Better performance
* Simple, and economical pricing
* Ease of integration
* Client-side encryption and key-based ownership of object data

`uplink` contains a number of interesting components, including pre-written code and subroutines, classes, values or type specifications, message templates, configuration walkthroughs, and great documentation.

### Background

Uplink is the entry point into the Storj network. It connects to a specific Satellite and caches connections and resources, allowing users to create sessions. At its core, `storj.io/uplink` is a Go library that you can use to programmatically interact with the Storj network.

Additional library language wrappers are released, allowing you to programmatically interface the Storj network with other programming languages: [C](https://github.com/storj/uplink-c), [Java](https://github.com/storj/uplink-java), [Android](https://github.com/storj/uplink-android), [Swift](https://github.com/storj-thirdparty/uplink-swift), [PHP](https://github.com/storj-thirdparty/uplink-php), [Python](https://github.com/storj-thirdparty/uplink-python), [JavaScript](https://github.com/storj-thirdparty/uplink-js), and [Node.js](https://github.com/storj-thirdparty/uplink-nodejs). Additional language bindings are planned through community bounties.

For the complete documentation around uplink, check out the [Go Docs](https://pkg.go.dev/storj.io/uplink).

### Prerequisites

This walkthrough assumes that the user has already done the following:
* [Created an account on a Satellite](https://docs.storj.io/getting-started/quickstart-uplink-cli/uploading-your-first-object/prerequisites)
* [Generated an Access grant](https://docs.storj.io/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant)

For more information on these prerequisites, check out a walkthrough on uploading your first object, located [here](https://docs.storj.io/getting-started/quickstart-uplink-cli/uploading-your-first-object).

### Let's write code

Now that we have created a project and generated an Access Grant, let's get started with some code! We are going to write a Go program with functions that will upload a file to a project that we created on the Satellite. The full code for this walkthrough can be found at the very bottom.

First, it is necessary to set up a Go module for your program. This helps Go keep track and use the right version of libraries. For a more thorough guide, please read [Using Go Modules](https://blog.golang.org/using-go-modules). However, the simplest way to get started is to create a new folder outside of your `GOPATH` and run commands:

``` sh
$ go mod init example.test
```

You can replace "example.test" with your Github project, e.g. `github.com/<username>/<project>`, if you wish.

We need to add the `storj.io/uplink` package as a dependency to the module. Run this command:

``` sh
$ go get storj.io/uplink
```

Next, create a file with the name `main.go` where we will write the code of our program. Open this file in your text or code editor.

We need to list the package and import dependencies related to the Uplink. Every Go program must be a part of some package - and because this is a standalone executable Go program, we must first make a `package main` declaration, and import some additional package dependencies as well. Write:

```golang
package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"log"

	"storj.io/uplink"
)
```

Next, let's define our constants that we have pulled from the satellite. In Go, constants are declared like variables, but with the `const` keyword.  These constants include constants for our Access Grant, Satellite address, bucket name, upload key, and data to upload. The following values are fillers for what you would be using in real life. 

In this example:
* `myAccessGrant` will be the Access Grant generated on the satellite
* `myBucket` will be an example bucket
* `myUploadKey` will take the object's key (this is the unique identifier of the object in the bucket)
* `myData` will be the data that you are uploading

Write: 
```golang
const (
	myAccessGrant = "change-me-to-the-access-grant-created-in-satellite-gui"
	myBucket      = "mybucket"
	myUploadKey   = "foo/bar/baz"
	myData        = "one fish two fish red fish blue fish"
)
```
Next, let's define a function, `UploadAndDownloadData`, that uploads data to a specified path in a bucket, ingesting an Access Grant, bucket name, upload key, and data to upload as parameters.

Write:

```golang
// UploadAndDownloadData uploads the data to uploadKey in
// bucketName, using accessGrant.
func UploadAndDownloadData(ctx context.Context,
	accessGrant, bucketName, uploadKey string,
	data []byte) error {
```

Now, let's get started and upload an object programmatically. To do so, we will need to parse the access grant, open the project, and ensure the bucket that we are working with is created. Write:

```golang
	// Parse the Access Grant.
	access, err := uplink.ParseAccess(accessGrant)
	if err != nil {
		return fmt.Errorf("could not parse access grant: %v", err)
	}

	// Open up the Project we will be working with.
	project, err := uplink.OpenProject(ctx, access)
	if err != nil {
		return fmt.Errorf("could not open project: %v", err)
	}
	defer project.Close()

	// Ensure the desired Bucket within the Project is created.
	_, err = project.EnsureBucket(ctx, bucketName)
	if err != nil {
		return fmt.Errorf("could not ensure bucket: %v", err)
	}
```

Now, let's write some code to upload an object!

```golang
	// Intitiate the upload of our Object to the specified bucket and key.
	upload, err := project.UploadObject(ctx, bucketName, objectKey, nil)
	if err != nil {
		return fmt.Errorf("could not initiate upload: %v", err)
	}

	// Copy the data to the upload.
	buf := bytes.NewBuffer(data)
	_, err = io.Copy(upload, buf)
	if err != nil {
		_ = upload.Abort()
		return fmt.Errorf("could not upload data: %v", err)
	}

	// Commit the uploaded object.
	err = upload.Commit()
	if err != nil {
		return fmt.Errorf("could not commit uploaded object: %v", err)
	}
```

To download it, let's write the code to call the file back.  Write:

```golang
	// Initiate a download of the same object again
	download, err := project.DownloadObject(ctx, bucketName, objectKey, nil)
	if err != nil {
		return fmt.Errorf("could not open object: %v", err)
	}
	defer download.Close()

	// Read everything from the download stream
	receivedContents, err := ioutil.ReadAll(download)
	if err != nil {
		return fmt.Errorf("could not read data: %v", err)
	}

	// Check that the downloaded data is the same as the uploaded data.
	if !bytes.Equal(receivedContents, data) {
		return fmt.Errorf("got different object back: %q != %q", data, receivedContents)
	}

	return nil
}
```

Now that we have defined our primary functions, let's write a main function that ingests the const parameters. Write:

```golang
func main() {
	err := UploadAndDownloadData(context.Background(),
		myAccessGrant, myBucket, myUploadKey, []byte(myData))
	if err != nil {
		log.Fatalln("error:", err)
	}

	fmt.Println("success!")
}
```

Congrats, you have now written a basic Go program with functions that upload a file from the Storj Network and download it back to your machine!

You can run the program with this command:

``` sh
$ go run main.go
```

For the full source code, see below:

```golang
package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"log"

	"storj.io/uplink"
)

const (
	myAccessGrant = "change-me-to-the-access-grant-created-in-satellite-gui"
	myBucket      = "mybucket"
	myUploadKey   = "foo/bar/baz"
	myData        = "one fish two fish red fish blue fish"
)

// UploadAndDownloadData uploads the data to objectKey in
// bucketName, using accessGrant.
func UploadAndDownloadData(ctx context.Context,
	accessGrant, bucketName, objectKey string,
	data []byte) error {

	// Parse the Access Grant.
	access, err := uplink.ParseAccess(accessGrant)
	if err != nil {
		return fmt.Errorf("could not parse access grant: %v", err)
	}

	// Open up the Project we will be working with.
	project, err := uplink.OpenProject(ctx, access)
	if err != nil {
		return fmt.Errorf("could not open project: %v", err)
	}
	defer project.Close()

	// Ensure the desired Bucket within the Project is created.
	_, err = project.EnsureBucket(ctx, bucketName)
	if err != nil {
		return fmt.Errorf("could not ensure bucket: %v", err)
	}

	// Intitiate the upload of our Object to the specified bucket and key.
	upload, err := project.UploadObject(ctx, bucketName, objectKey, nil)
	if err != nil {
		return fmt.Errorf("could not initiate upload: %v", err)
	}

	// Copy the data to the upload.
	buf := bytes.NewBuffer(data)
	_, err = io.Copy(upload, buf)
	if err != nil {
		_ = upload.Abort()
		return fmt.Errorf("could not upload data: %v", err)
	}

	// Commit the uploaded object.
	err = upload.Commit()
	if err != nil {
		return fmt.Errorf("could not commit uploaded object: %v", err)
	}

	// Initiate a download of the same object again
	download, err := project.DownloadObject(ctx, bucketName, objectKey, nil)
	if err != nil {
		return fmt.Errorf("could not open object: %v", err)
	}
	defer download.Close()

	// Read everything from the download stream
	receivedContents, err := ioutil.ReadAll(download)
	if err != nil {
		return fmt.Errorf("could not read data: %v", err)
	}

	// Check that the downloaded data is the same as the uploaded data.
	if !bytes.Equal(receivedContents, data) {
		return fmt.Errorf("got different object back: %q != %q", data, receivedContents)
	}

	return nil
}

func main() {
	err := UploadAndDownloadData(context.Background(),
		myAccessGrant, myBucket, myUploadKey, []byte(myData))
	if err != nil {
		log.Fatalln("error:", err)
	}

	fmt.Println("success!")
}
```
