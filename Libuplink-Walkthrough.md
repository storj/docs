## Getting Started

The Libuplink developer library is written for the Go language, and will allow Storj partners and clients to start to integrate with the Storj object store programmatically. We’ve created this library to make it as easy as possible for developers to leverage decentralized object storage in their applications. 

There are more than a number of reasons why you may wish to utilize decentralized storage over legacy alternatives, namely:
<ul>
<li>Better performance</li>
<li>Simple, and economical pricing</li>
<li>Ease of integration</li>
<li>Client-side encryption and key-based ownership of object data</li>
</ul>

Libuplink contains a number of interesting components, including pre-written code and subroutines, classes, values or type specifications, message templates, configuration walkthroughs, and great documentation.

### Background

An Uplink is an entry point into the Storj network. It connects to a specific Satellite and caches connections and resources, allowing users to create sessions. At its core, Libuplink is a Go library that you can use to programmatically interact with the Storj network. 

In the near future, additional library language wrappers will be released, allowing you to programmatically interface the Storj network with other programming languages. The first language binding that we are planning to release are for C, Java (Android), and iOS - with additional language bindings planned through community bounties.


### Prerequisites

This walkthrough assumes that the user has already created an account on a satellite and has done the following:
* Selected a Satellite
* Generated an API Key
* Created a Project
* Created a bucket

For more information on these prerequisites, check out a walkthrough of our satellite, located [here:](https://storj.io/blog/2019/04/starting-your-first-project-on-the-tardigrade-cloud-storage-network/)

### Let's write code

Now that we have created  a project and generated an API key, let’s get started with some code! We are going to write a Go program with functions that will upload a file to a project that we created on the Satellite in the previous walkthrough. The full code for this walkthrough can be found [this gist](Here is the gist if you decide to go this way: https://gist.github.com/kaloyan-raev/d4a857f09f2ab3e3d83d6ed72858a579).

First, we need to list the package and import dependencies related to the Uplink. Every Go program must be a part of some package - and because this is a standalone executable Go program, we must first make a `package main` declaration, and import some additional package dependencies as well. Write:

``` 
import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"log"

	"storj.io/storj/lib/uplink"
	"storj.io/storj/pkg/storj"
)
```

Next, let’s define our 

Let’s define our constants that we have pulled from the satellite.  In Go, constants are declared like variables, but with the `const` keyword.  These constants include constants for our API key, Satellite address, bucket name, upload path, and encryption key. The following values are fillers for what you would be using in real life. 

In this example, `satellite` will define the Satellite URL, 
* `myBucket` will be an example bucket, created on the satellite in the previous walkthrough, (ie. `uplink mb sj://example-bucket`
* `myUploadPath` will take the path
* `myData` will be the data that you are uploading
* `myAPIKey` will be the API Key generated previously in the previous walkthrough

Write: 
```const (
    myAPIKey = "change-me-to-the-api-key-created-in-satellite-gui"

    satellite       = "mars.tardigrade.io:7777"
    myBucket        = "my-first-bucket"
    myUploadPath    = "foo/bar/baz"
    myData          = "one fish two fish red fish blue fish"
    myEncryptionKey = "you'll never guess this"
)
```
Next, let’s define a function, `WorkWithLibUplink`, that uploads data to a specified path in a bucket, ingesting a Satellite address, encryption key, and API key, bucket name, upload path, and data to upload as parameters.

Write:
// specified bucket, using the specified Satellite, encryption key, and API key.
func WorkWithLibUplink(satelliteAddress string, encryptionKey *storj.Key, apiKey uplink.APIKey,
    bucketName, uploadPath string, dataToUpload []byte) error {
    ctx := context.Background()
```
Now, let’s get started and upload an object programatically. To do so, we will need to initialize our Uplink and open a project and bucket that we are working with.  Write:
 // It is temporarily required to set the encryption key in project options.
    // This requirement will be removed in the future.
    opts := uplink.ProjectOptions{}
    opts.Volatile.EncryptionKey = encryptionKey

    // Open up the Project we will be working with
    proj, err := upl.OpenProject(ctx, satelliteAddress, apiKey, &opts)
    if err != nil {
        return fmt.Errorf("could not open project: %v", err)
    }
    defer proj.Close()

    // Create the desired Bucket within the Project
    _, err = proj.CreateBucket(ctx, bucketName, nil)
    if err != nil {
        return fmt.Errorf("could not create bucket: %v", err)
    }

    // Open up the desired Bucket within the Project
    bucket, err := proj.OpenBucket(ctx, bucketName, &uplink.EncryptionAccess{Key: *encryptionKey})
    if err != nil {
        return fmt.Errorf("could not open bucket %q: %v", bucketName, err)
    }
    defer bucket.Close()
```
Now that we have finished setting everything up, let’s write some code to upload an object!

```
// Upload our Object to the specified path
    buf := bytes.NewBuffer(dataToUpload)
    err = bucket.UploadObject(ctx, uploadPath, buf, nil)
    if err != nil {
        return fmt.Errorf("could not upload: %v", err)
    }
```


To download it, let’s another method to call the file back. We want to download the whole file, so let’s specify the range from 0 to -1.   We will also want to read everything from the stream.  Write:

```
    // Initiate a download of the same object again
    readBack, err := bucket.OpenObject(ctx, uploadPath)
    if err != nil {
        return fmt.Errorf("could not open object at %q: %v", uploadPath, err)
    }
    defer readBack.Close()

    // We want the whole thing, so range from 0 to -1
    strm, err := readBack.DownloadRange(ctx, 0, -1)
    if err != nil {
        return fmt.Errorf("could not initiate download: %v", err)
    }
    defer strm.Close()

    // Read everything from the stream
    receivedContents, err := ioutil.ReadAll(strm)
    if err != nil {
        return fmt.Errorf("could not read object: %v", err)
    }

    if !bytes.Equal(receivedContents, dataToUpload) {
        return fmt.Errorf("got different object back: %q != %q", dataToUpload, receivedContents)
    }
    return nil
}
```

Now that we have defined our primary functions,

To wrap everything up, let’s write a main function that ingests the const parameters. Write:
```
func main() {
    var encryptionKey storj.Key
    copy(encryptionKey[:], []byte(myEncryptionKey))

    apiKey, err := uplink.ParseAPIKey(myAPIKey)
    if err != nil {
        log.Fatalln("could not parse api key:", err)
    }

    err = WorkWithLibUplink(satellite, &encryptionKey, apiKey, myBucket, myUploadPath, []byte(myData))
    if err != nil {
        log.Fatalln("error:", err)
    }

    fmt.Println("success!")
}
```
Congrats, you have now written a basic Go program with functions that upload a file from the Tardigrade Network and download it back to your machine!	

For the full file,  see below:

```
// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

package main

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"log"

	"storj.io/storj/lib/uplink"
	"storj.io/storj/pkg/storj"
)

const (
	myAPIKey = "change-me-to-the-api-key-created-in-satellite-gui"

	satellite       = "mars.tardigrade.io:7777"
	myBucket        = "my-first-bucket"
	myUploadPath    = "foo/bar/baz"
	myData          = "one fish two fish red fish blue fish"
	myEncryptionKey = "you'll never guess this"
)

// WorkWithLibUplink uploads the specified data to the specified path in the
// specified bucket, using the specified Satellite, encryption key, and API key.
func WorkWithLibUplink(satelliteAddress string, encryptionKey *storj.Key, apiKey uplink.APIKey,
	bucketName, uploadPath string, dataToUpload []byte) error {
	ctx := context.Background()

	// Create an Uplink object with a default config
	upl, err := uplink.NewUplink(ctx, nil)
	if err != nil {
		return fmt.Errorf("could not create new Uplink object: %v", err)
	}
	defer upl.Close()

	// It is temporarily required to set the encryption key in project options.
	// This requirement will be removed in the future.
	opts := uplink.ProjectOptions{}
	opts.Volatile.EncryptionKey = encryptionKey

	// Open up the Project we will be working with
	proj, err := upl.OpenProject(ctx, satelliteAddress, apiKey, &opts)
	if err != nil {
		return fmt.Errorf("could not open project: %v", err)
	}
	defer proj.Close()

	// Create the desired Bucket within the Project
	_, err = proj.CreateBucket(ctx, bucketName, nil)
	if err != nil {
		return fmt.Errorf("could not create bucket: %v", err)
	}

	// Open up the desired Bucket within the Project
	bucket, err := proj.OpenBucket(ctx, bucketName, &uplink.EncryptionAccess{Key: *encryptionKey})
	if err != nil {
		return fmt.Errorf("could not open bucket %q: %v", bucketName, err)
	}
	defer bucket.Close()

	// Upload our Object to the specified path
	buf := bytes.NewBuffer(dataToUpload)
	err = bucket.UploadObject(ctx, uploadPath, buf, nil)
	if err != nil {
		return fmt.Errorf("could not upload: %v", err)
	}

	// Initiate a download of the same object again
	readBack, err := bucket.OpenObject(ctx, uploadPath)
	if err != nil {
		return fmt.Errorf("could not open object at %q: %v", uploadPath, err)
	}
	defer readBack.Close()

	// We want the whole thing, so range from 0 to -1
	strm, err := readBack.DownloadRange(ctx, 0, -1)
	if err != nil {
		return fmt.Errorf("could not initiate download: %v", err)
	}
	defer strm.Close()

	// Read everything from the stream
	receivedContents, err := ioutil.ReadAll(strm)
	if err != nil {
		return fmt.Errorf("could not read object: %v", err)
	}

	if !bytes.Equal(receivedContents, dataToUpload) {
		return fmt.Errorf("got different object back: %q != %q", dataToUpload, receivedContents)
	}
	return nil
}

func main() {
	var encryptionKey storj.Key
	copy(encryptionKey[:], []byte(myEncryptionKey))

	apiKey, err := uplink.ParseAPIKey(myAPIKey)
	if err != nil {
		log.Fatalln("could not parse api key:", err)
	}

	err = WorkWithLibUplink(satellite, &encryptionKey, apiKey, myBucket, myUploadPath, []byte(myData))
	if err != nil {
		log.Fatalln("error:", err)
	}

	fmt.Println("success!")
}
```