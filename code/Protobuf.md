# Protobuf

This document outlines the steps for creating or modifying a protobuf.

## Requirements

- Install the protoc compiler that is used to generate protobuf code and gRPC service code, `protoc`, by downloading the binary https://github.com/protocolbuffers/protobuf/releases.  Then move `protoc` to `/usr/local/bin/` and also move `protoc/include` to `/usr/local/include/`. Alternately, you can install protoc using the appropriate package for your OS:

  - Debian/Ubuntu/derivatives:

      apt install protobuf-compiler

  - MacOS with Homebrew:

      brew install protobuf

- Install a protobuf specification linter, the protolock tool, and their dependencies. (This step is idempotent, so run it again if you're not sure whether your tools need updating):

    $ go run scripts/protobuf.go install

## Steps to Modify `.proto` Files

Assumes all steps occur from the home directory of the https://github.com/storj/storj repo.

1. Modify the `.proto` file

2. To update the generated code related to your `.proto` file changes, use `go generate` on the pb directory:

    $ go generate ./pkg/pb/...

3. Update the proto.lock file to match your changes:

    $ protolock commit

4. If step 3 fails with an error, your changes are not backward compatible! You should fix that, because we need to maintain backward compatibility so that versions of storagenode/satellite/uplink/etc built at different times can still communicate with each other. We should not break backward compatibility without _very_ careful investigation of the ramifications. If we are sure that the change is still ok, you can use the `--force` argument to protolock to override its complaint:

    $ protolock commit --force

5. Add the new `proto.lock` file to your branch and include it in your PR or changeset. If you forget the protolock steps, lint will complain and fail the build.
