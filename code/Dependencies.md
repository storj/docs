# Dependencies

## Adding new dependencies

All new dependencies should be held to the same quality standards as our codebase.

The following applies to all **direct** and **indirect** dependencies.

To add a new dependency evaluate the following things:

* Check whether licenses are compatible with our project. No GPL, LGPL. `storj/uplink` shouldn't have a dependency on Apache v2, because it should be GPL compatible. Try to stick to BSD/MIT.

* See whether it easily compiles on all platforms.

* Does the code expect an existance of an `os`? e.g. WASM may not have a filesystem.

* See whether it uses cgo, unsafe or reflect.

* Run our linter suite on them. Are there any significant issues that haven't been fixed?

* Read/skim every line in the new dependency:

	* Would you be able to maintain the code?
	* Would you be able to do a critical fix under a day?
	* How idiomatic is the code?
	* Does it have code that is really hard to follow?
	* Does it have global variables/state (either private or public)?
	* Does it use global logging? Is it customizable? (i.e. can you supply different logger for different tests)
	* Does the code have comprehensive testsuite?
	* If it contains parsing, does it have fuzzing?
	* Does the project have vetters and linters setup for PR-s?
	* Are they following semantic versioning?
	* Ideally there are two independent reviewers.

* Are there any critical issues or PR-s open?

* Do the maintainers seem responsive? Are there more than one maintainer?

* Check how much it affects `storj/uplink` size.

Note: many of these are fixable with communication or making our own PR-s.

## Updating a dependency

When updating a dependency it's usually sufficient to skim over the code and,
if something looks weird then do a similar review as above.

## Finding the changed code in dependencies

When `go.mod` is using `go 1.17` then looking through the changed lines
in `go.mod` gives the list of modules that need to be reviewed.
Not every package will be used from the module, so sometimes it's possible
to reduce the amount of code to review with the following:

``` sh
# create a temporary git branch
git switch -c deps

# vendor direct and indirect dependencies
go mod vendor

# commit the vendor directory
git commit -a -m"before"`

# add the new dependency
go get example.test/new-dependency@latest
modify-code to include the packages

# update the vendor
go mod vendor

# commit the vendor directory
git commit -a -m"after"`
```

The diff between these commits show the code that gets compiled into to the
project.

Note, linting and reviewing the whole module, instead of only the used
packages, can help finding bugs in the used packages. For example the
`_test.go` code isn't included in the vendor directory, however fixing
bugs in testing code can uncover existing bugs.