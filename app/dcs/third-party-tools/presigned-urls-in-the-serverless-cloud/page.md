---
title: Presigned URLs in the serverless cloud
docId: AJzzSRQQpE3ecAOJ_3tpl
redirects:
  - /dcs/how-tos/presigned-urls-in-the-serverless-cloud
---

This document will guide you through the process of creating presigned URLs in a serverless cloud environment using the Go programming language.

Most applications will need some secure, server-side logic to enforce access-control.  Usually, though, the “goldilocks size” for infrastructure is _as little as possible_.  A minimum viable security solution would do well to be stateless. Presigned URLs work well here because they are inherently time limited, and thus not typically tracked (For more info see www\.storj.io/blog/how-developers-can-easily-connect-storj-to-compute-for-presigned-urls)

## Prerequisites

- Basic knowledge of Go programming language

- Storj account with [](docId:LueFgrbZ9rJbWtDMXhIWZ)

- A cloud platform account with access to serverless functions (e.g., AWS Lambda, Google Cloud Functions)

## Setting Up the Go Environment

1.  Install Go: Download and install the latest version of Go from the official website: <https://golang.org/dl/>

2.  Set up your Go workspace: Follow the official Go documentation to set up your Go workspace: <https://golang.org/doc/code.html>

## Presigning URLs via Amazon Lambda

Create a new Go file `main.go` and import the necessary packages (e.g. run `go get -u`)

```go
package main


import (
   "context"
   "time"


   "github.com/aws/aws-lambda-go/events"
   "github.com/aws/aws-lambda-go/lambda"
   "github.com/aws/aws-sdk-go/aws"
   "github.com/aws/aws-sdk-go/aws/credentials"
   "github.com/aws/aws-sdk-go/aws/request"
   "github.com/aws/aws-sdk-go/aws/session"
   "github.com/aws/aws-sdk-go/service/s3"
)


const (
   storjS3Bucket = "<YOUR S3 BUCKET>"
   storjS3Id     = "<YOUR ACCESS KEY ID>"
   storjS3Secret = "<YOUR SECRET KEY>"
   storjS3URL    = "https://gateway.storjshare.io/"
)


func main() {
   lambda.Start(handleRequest)
}


// HandleRequest accepts an S3 key and presigned URL method type, and returns a presigned URL.
// It is designed to be used directly as a Lambda function URL. (https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html)
// Nil errors are always returned, so that the client gets more than an "Internal Server Error" message.
func handleRequest(ctx context.Context, r events.LambdaFunctionURLRequest) (events.LambdaFunctionURLResponse, error) {
   key := r.QueryStringParameters["key"]
   method := r.QueryStringParameters["method"]


   if len(key) == 0 {
       return events.LambdaFunctionURLResponse{Body: "Request is missing 'key' query parameter", StatusCode: 400}, nil
   }
   if len(method) == 0 {
       return events.LambdaFunctionURLResponse{Body: "Request is missing 'method' query parameter", StatusCode: 400}, nil
   }


   sess, err := session.NewSession(&aws.Config{
       Credentials: credentials.NewStaticCredentials(storjS3Id, storjS3Secret, ""),
       Endpoint:    aws.String(storjS3URL),
       Region:      aws.String("us-east-1"),
   })
   if err != nil {
       return events.LambdaFunctionURLResponse{Body: "Failed to create AWS S3 session", StatusCode: 500}, nil
   }


   svc := s3.New(sess)
   var req *request.Request
   switch method {
   case "GET":
       req, _ = svc.GetObjectRequest(&s3.GetObjectInput{Bucket: aws.String(storjS3Bucket), Key: &key})
   case "POST":
       req, _ = svc.PutObjectRequest(&s3.PutObjectInput{Bucket: aws.String(storjS3Bucket), Key: &key})
   default:
       return events.LambdaFunctionURLResponse{Body: "The request 'method' query parameter is invalid", StatusCode: 400}, nil
   }
   urlStr, err := req.Presign(15 * time.Minute)
   if err != nil {
       return events.LambdaFunctionURLResponse{Body: "Failed to presign request", StatusCode: 500}, nil
   }


   return events.LambdaFunctionURLResponse{Body: urlStr, StatusCode: 200}, nil
}

```

While Amazon has quite the variety of methods to deploy code to Lambda, this example showcases the most primitive and explicit method, using the aws cli tool.

`deploy.sh`

```shell
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o main main.go
zip lambda-handler.zip main
aws iam create-role --role-name lambda-ex --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name lambda-ex --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws lambda create-function --function-name cloudsigning --runtime go1.x --role arn:aws:iam::<YOUR IAM NUMBER>:role/lambda-ex --handler main --zip-file fileb://lambda-handler.zip
aws lambda add-permission --function-name cloudsigning --action lambda:InvokeFunctionUrl --principal "*" --function-url-auth-type "NONE" --statement-id url
aws lambda create-function-url-config --function-name cloudsigning --auth-type NONE
curl 'https://<YOUR LAMBDA NUMBER>.lambda-url.us-east-1.on.aws/?key=test&method=POST'
```

`trust-policy.json`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## Presigning URLs via Google Cloud Functions

Create a new Go file `main.go` and import the necessary packages (e.g. run `go get -u`)

```go
package cloudsigning


import (
   "fmt"
   "net/http"
   "time"


   "github.com/GoogleCloudPlatform/functions-framework-go/functions"
   "github.com/aws/aws-sdk-go/aws"
   "github.com/aws/aws-sdk-go/aws/credentials"
   "github.com/aws/aws-sdk-go/aws/request"
   "github.com/aws/aws-sdk-go/aws/session"
   "github.com/aws/aws-sdk-go/service/s3"
)


const (
   storjS3Bucket = "<YOUR S3 BUCKET>"
   storjS3Id     = "<YOUR ACCESS KEY ID>"
   storjS3Secret = "<YOUR SECRET KEY>"
   storjS3URL    = "https://gateway.storjshare.io/"
)


func init() {
   functions.HTTP("Presign", HandleRequest)
}


// HandleRequest accepts an S3 key and presigned URL method type, and returns a presigned URL.
func HandleRequest(w http.ResponseWriter, r *http.Request) {
   key := r.URL.Query()["key"]
   method := r.URL.Query()["method"]


   if len(key) == 0 {
       w.WriteHeader(400)
       fmt.Fprint(w, "Request is missing 'key' query parameter")
       return
   }
   if len(method) == 0 {
       w.WriteHeader(400)
       fmt.Fprint(w, "Request is missing 'method' query parameter")
       return
   }


   sess, err := session.NewSession(&aws.Config{
       Credentials: credentials.NewStaticCredentials(storjS3Id, storjS3Secret, ""),
       Endpoint:    aws.String(storjS3URL),
       Region:      aws.String("us-east-1"),
   })
   if err != nil {
       w.WriteHeader(500)
       fmt.Fprint(w, "Failed to create AWS S3 session")
       return
   }


   svc := s3.New(sess)
   var req *request.Request
   switch method[0] {
   case "GET":
       req, _ = svc.GetObjectRequest(&s3.GetObjectInput{Bucket: aws.String(storjS3Bucket), Key: &key[0]})
   case "POST":
       req, _ = svc.PutObjectRequest(&s3.PutObjectInput{Bucket: aws.String(storjS3Bucket), Key: &key[0]})
   default:
       w.WriteHeader(400)
       fmt.Fprint(w, "The request 'method' query parameter is invalid")
       return
   }
   urlStr, err := req.Presign(15 * time.Minute)
   if err != nil {
       w.WriteHeader(500)
       fmt.Fprint(w, "Failed to presign request")
       return
   }
   fmt.Fprint(w, urlStr)
}

```

`deploy.sh`

```shell
gcloud functions deploy Presign --runtime go119 --trigger-http --allow-unauthenticated
curl "https://<YOUR LOCATION>.cloudfunctions.net/Presign?key=test&method=POST"
```

``
