# Dependencies

## Adding new dependencies

All new dependencies should be held to the same quality standards as our codebase.
The following applies to direct and indirect dependencies.

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
	* Does the code have comprehensive testsuite?
	* If it contains parsing, does it have fuzzing?
	* Does the project have vetters and linters setup for PR-s?
	* Are they following semantic versioning?

* Are there any critical issues or PR-s open?

* Do the maintainers seem responsive? Are there more than one maintainer?

* Check how much it affects `storj/uplink` size.

Note: many of these are fixable with communication or making our own PR-s.