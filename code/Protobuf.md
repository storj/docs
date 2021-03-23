# Protobuf

This document outlines the steps for creating or modifying a protobuf.

## Requirements

- Install the protoc compiler that is used to generate protobuf code and gRPC service code, `protoc`, by downloading the binary https://github.com/protocolbuffers/protobuf/releases.  Then move `protoc` to `/usr/local/bin/` and also move `protoc/include` to `/usr/local/include/`. Alternately, you can install protoc using the appropriate package for your OS:

  - Debian/Ubuntu/derivatives:

      apt install protobuf-compiler

  - MacOS with Homebrew:

      brew install protobuf

- Install the following tools with specific versions. You can use [gobin](https://github.com/myitcv/gobin) to make installation easier:

* github.com/ckaznocha/protoc-gen-lint@68a05858965b31eb872cbeb8d027507a94011acc
* storj.io/drpc/cmd/protoc-gen-go-drpc
* github.com/nilslice/protolock/cmd/protolock@v0.12.0

## Steps to Modify `.proto` Files

Assumes all steps occur from the home directory of the https://github.com/storj/storj repo.

1. Modify the `.proto` file

2. To update the generated code related to your `.proto` file changes, use `go generate` on the pb directory:

    $ go generate ./pb/...

3. Update the proto.lock file to match your changes:

    $ protolock commit

4. If step 3 fails with an error, your changes are not backward compatible! You should fix that, because we need to maintain backward compatibility so that versions of storagenode/satellite/uplink/etc built at different times can still communicate with each other. We should not break backward compatibility without _very_ careful investigation of the ramifications. For example, a backward-incompatible change might be fine if none of the protobufs are actually used for communication between any existing system components yet. If we are sure that the change is still ok, you can use the `--force` argument to protolock to override its complaint:

    $ protolock commit --force

5. Add the new `proto.lock` file to your branch and include it in your PR or changeset. If you forget the protolock steps, lint will complain and fail the build.
