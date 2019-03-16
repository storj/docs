# Protobuf

This document outlines the steps for creating or modifying a protobuf.

## Requirements

- Install GRPC.

`$ go get -u google.golang.org/grpc`

- Install the protoc compiler that is used to generate gRPC service code, `protoc` by downloading the binary https://github.com/protocolbuffers/protobuf/releases.  Then move `protoc` to `/usr/local/bin/` and also move `protoc/include` to `/usr/local/include/`.

- Install protoc plugin for Go, [`proto-gen-go`](https://github.com/golang/protobuf#installation):

`$ go get -u github.com/golang/protobuf/protoc-gen-go`

- Install [`protolock`](https://github.com/nilslice/protolock):

`$ go get -u github.com/nilslice/protolock/...`

## Steps to Modify `.proto` Files

Assumes all steps occur from the home directory of the https://github.com/storj/storj repo.

1. Modify the `.proto` file

2. From the `pkg/pb/` directory run the following command:

`$ go generate`

3. If a check that fails when there's a breaking API change, this command may need to be executed to override:

`$ protolock commit --force`
