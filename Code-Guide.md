This document describes Storj way of writing code. Occasionally, code may diverge from this guide, however it should be a significant reason for the alternate behavior.

If the guide is not followed then CI may fail.

## Formatting

All code is formatted with `goimports -local storj.io`.

## Copyright

All code should have a copyright header.

## Error handling

All errors must be handled and checked.

_Exceptions: printing to console or log (e.g. `fmt.Println`, `log.Print`)_

## Tests

### Data in temporary directory

Tests should only create data in temp directory. The created data must be cleaned-up.

_Reasoning: by creating things inside source directory we risk the data being committed or accumulating in the source directory._

### Automatically choose ports

Tests should only use automatic port selection when starting servers. Use `net.Listen("127.0.0.1:0")` for this.

_Reasoning: developers usually have many things running on their own system, so eventually we will use a port that is already in use and cause a failure. Similarly this prevents the test being tested in parallel. Using `"127.0.0.1:0"` is necessary for Windows users, because using `":0"` causes firewall notices when running tests._