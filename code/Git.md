# Commit

This gives a rough guide how to make good commits that are easy to review and understand.

Most of these shouldn't be a blocker for getting a commit merged, however it's good practice. If you have difficulty in any of these parts, then ask for help.

**NB: Github pull requests require the message and subject to be manually edited before merging.**

## Subject

Our commit messages follow quite closely [Go Project](https://github.com/golang/go/wiki/CommitMessage) conventions. See also https://golang.org/doc/contribute#commit_messages.

```
[scope]: [change]

[longer description]
```

The `[scope]` part gives a quick insight into which packages it affects. This usually is just the package name. However, sometimes using `mod` for module changes or `ci` for Jenkins changes are applicable.

If `[scope]` becomes long then using "bash expansion" syntax can be used to shorten it, e.g. `satellite/{metabase,metainfo}`. However, if that is still long, then it can be an indication that the commit should be split into multiple commits.

The `[scope]` should avoid including the repository name, since when looking at the commit log, you already know the repository context.

On rare cases, for fixing lint changes or refactoring, using scope `all` is useful. However, such changes should try to avoid making functional changes in the same commit.

When a change requires minor change in another package, e.g. a method name in package `metabase` requires updating `metainfo` package, then it's not necessary to include the other package. Usually that doesn't add useful information.

`[change]` should complete the blank in `This change modifies [scope] to ______`. It should start with lowercase and there's no trailing period.

Try to keep the subject line less than \~72 characters, however, it's not critical. Subject line should always be followed by an empty line.

---

The first line helps to understand the impact of the change. For example when trying to find a possible cause with broken zombie deletion, then searching from this list is really effective:

```
$ git log --oneline
5269596c7 satellite/{metabase,metainfo}: use ObjectStream as argument
d06206488 satellite/rolluparchive: archiveAge use 90d prod default for storj-sim
dba932148 satellite/metabase: Remove pending_index
834b7cf6b private/server: close connection after each connector test
efcb8e412 .github: enable dependabot for upgrading go dependencies
e8ef68992 satellite/metabase: add DeleteZombieObjects method
bb343d902 satellite/satellitedb: don't remove offline nodes from containment
```

These subject lines are also useful for creating change logs in https://github.com/storj/storj/releases and help undertand which commits can be omitted from the release.

## Body

Wrap the body at \~72 characters, to please git viewing tools, unless tables require otherwise.

The body should try to introduce the change assuming the other person has no clue about the change. Imagine writing an email to another developer. Try to answer three questions in the commit "why this commit exists", "how does it fix the issue", "how does it affect the system".

If there are other approaches that were considered, then that information should be included int the body.

When a change has been split into multiple commits to ensure backwards compatible database changes, then include that information in the body to reduce the likelihood of both of the changes being included in the release.

Similarly, if a change has been split into multiple commits, include information that it's "part 1" of the full change and that it requires some other changes to be completed.

Go project commit messages are a really good case study https://github.com/golang/go/commits/master.

---

The most immediate benefit from good body is that the reviewer can get a good idea why some particular commit exists in the first place.

The body is helpful for understanding a particular commit several months and years later when tracking down different design decisions.

Similarly, to the subject lines, it's helpful for the release process.

## Change

Conceptually different changes should be different commits. The first indication that a commit needs to be split is that it's difficult to figure out what to write as the subject.

Review your own changes by reading the diff in the reverse order. This often helps to find one or two mistakes.

Changes should target less than 400 LOC. Research indicates that larger changes take exponentially more time to properly review. Or if it's not properly reviewed then defect discovery rate decreases. This is mainly due to reviewer fatigue. https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/

For reviewers, if a commit is larger than 800 LOC and makes reviewing difficult, then asking the submitter to split into multiple changes is reasonable.

_Note: the exception is "changes that could be done by an automated tool", e.g. renaming a method or variable. There are other exceptions, but these should be coordinate with reviewers._

If it's hard to figure out how to split a change into separate commits, then ask for help.