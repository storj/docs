# Gerrit

Many developers at the company use a tool called Gerrit (https://review.dev.storj.io/) to submit code and get reviews. There are some key differences between using Github PRs and Gerrit changesets. This document is intended to highlight some of these differences and debug common issues that may arise. It is also a quick source for getting set up with Gerrit for the first time.

## Table of Contents

1. [Differences between Gerrit Changesets and Github PRs](#differences)
    1. [Github workflow example](#gh-example)
    2. [Gerrit workflow example](#gerrit-example)
2. [Advantages (and disadvantages) of Gerrit](#advantages)
3. [Common git+gerrit issues and how to fix them](#common-issues)
    1. [Errors trying to push to Gerrit](#error-pushing)
    2. [Dealing with merge conflicts](#merge-conflicts)
    3. [Updating a multi-commit change](#multi-commit)
4. [Setting up Gerrit for the first time](#first-time)

## Differences between Gerrit Changesets and Github PRs <a name="differences"></a>

The core difference between code reviews on Gerrit and Github is that Gerrit is "commit-based" while Github is "branch-based". Here is a short example of what that looks like in practice:

### Github <a name="gh-example"></a>

You are making a bugfix. You checkout the `main` branch of `storj/storj` on your local machine. You run `git switch -c my-bug-fix` to switch to a new branch called `my-bug-fix`.

You change the necessary code and add and commit the file:

```
git add file.go
git commit -m "fix bug in file.go"
```

Now, if you run `git diff`, you will see the following:

* fix bug in file.go
* the latest commit from your local `main` branch
* ...

You push to Github, with `git push origin my-bug-fix`, then open a PR and ask for reviews.

Someone reviews your change and asks you to fix a typo. You do so, and run

```
git add file.go
git commit -m "fix typo"
git push origin my-bug-fix
```
Now, if you look at your commit history with `git diff`, it will look like this:

* fix typo
* fix bug in file.go
* the latest commit from your local `main` branch
* ...

Two people approved your PR in Github, and build passed, but some new changes have been committed to the `main` branch since you originally created the PR, so you need to merge the main branch and update the PR.

```
git pull origin main
git push origin my-bug-fix
```

Now your commit history looks like this:

* Merge branch 'main' of github.com:storj/storj into my-bug-fix 
* fix typo
* fix bug in file.go
* the latest commit from your local `main` branch
* ...

Build passes, and with your two approvals, you are now able to "squash and merge" into `main`. You do so, and make sure to update the commit message before merging to "file.go: fixed a bug". See [code/Git.md](./Git.md) for information about how your commit messages should look.

Now, the commit history of the `main` branch looks like this:

* file.go: fixed a bug
* the previous commit on the `main` branch
* ...

### Gerrit <a name="gerrit-example"></a>

You are making a bugfix. You checkout the `main` branch of `storj/storj` on your local machine. You run `git switch -c my-bug-fix` to switch to a new branch called `my-bug-fix`.

You change the necessary code and add and commit the file:

```
git add file.go
git commit -m "file.go: fixed a bug"
```

Now, if you run `git diff`, you will see the following:

* file.go: fixed a bug
* the latest commit from your local `main` branch
* ...

You push to Gerrit, with `git push gerrit HEAD:refs/for/main`, then you ask for reviews.

Someone reviews your change and asks you to fix a typo. You do so, and run

```
git add file.go
git commit --amend --no-edit
git push gerrit HEAD:refs/for/main
```
Now, if you look at your commit history with `git diff`, it will look like this:

* file.go: fixed a bug
* the latest commit from your local `main` branch
* ...

Two people approved your PR in Github, and build passed, but some new changes have been committed to the `main` branch since you originally created the PR, so you need to merge the main branch and update the PR.

```
git pull --rebase origin main
git push gerrit HEAD:refs/for/main
```

Now your commit history looks like this:

* file.go: fixed a bug
* the latest commit from the remote `main` branch
* ...

Build passes, and with your two approvals, submit to `main`. You do so

Now, the commit history of the `main` branch looks like this:

* file.go: fixed a bug
* the previous commit on the `main` branch
* ...

## Advantages (and disadvantages) of Gerrit <a name="advantages"></a>

Gerrit essentially requires that the commit you are submitting to the `main` branch is _exactly_ the commit being submitted to the `main` branch. Github only requires that the files changed are approved. This means that any change that is submitted to the `main` branch via Gerrit must have a commit history that looks exactly like:

* The commit for the change
* The latest commit in the `main` branch

Which is conveniently exactly what the `main`branch will look like after the new change is submitted.

One of the things this gives us is the ability to review commit messages in Gerrit, which is important since we have some [important things to keep in mind](./Git.md) regarding commit messages, and it is easy to make a mistake when merging a Github pull request.

Another advantage of this is it means that you can track multiple reviews on the same branch using Gerrit, which is not possible in Github.

In Github, if you want to make to get concurrent reviews on two changes, A and B, where B is dependent on A, then you will need to make two branches:

`branch-a`

* A commits
* main branch commits

`branch-b`

* B commits
* A commits
* main branch commits

meaning that a pull request to merge `branch-b` into `main` will _also_ contain the changes from `branch-a`, making the review more complicated.

In Gerrit, you can have one branch with two commits:

* single commit for B
* single commit for A
* main branch commits

Now, when you push to Gerrit, a separate review will be created for A and B, and each review only contains the changes for a single commit. However, the B commit will still not be submittable until the A commit is submittable (or has already been submitted).

One of the most common issues people have with Gerrit is around getting used to an unfamiliar git workflow. Once you get some practice with it, you will be able to decide whether or not you prefer it. The advantage of the different git workflow is that it requires you to be very mindful of your git history, and organize your code into sensible commits. The disadvantage of the different git workflow is that it requires you to be very mindful of your git history, and organize your code into sensible commits. 

## Common git+gerrit issues and how to fix them <a name="common-issues"></a>

### Errors trying to push to Gerrit <a name="error-pushing"></a>

(TODO specific error messages)

If you get an error submitting a change to Gerrit, the first thing you should check is that you have pulled the latest commits from the `main` branch:

```
git pull --rebase origin main
git push gerrit HEAD:refs/for/main
```

You may also see an error if you are pushing a change that is identical to one that has already been pushed to Gerrit. If you know this, and want to push anyway (e.g. go back to a previous version of the change), then simply run the following to update the commit's timestamp:

```
git commit --amend --no-edit
git push gerrit HEAD:refs/for/main
```

### Dealing with merge conflicts <a name="merge-conflicts"></a>

Sometimes, when you do `git pull --rebase origin main`, you will see a message about conflicting files that you will need to resolve. Getting specific about how to fix conflicts in git is out of the scope of this document, but one important thing to keep in mind is that pulling `main` with `--rebase` basically temporarily removes your commits, puts all the new commits from the `main` branch in your git history, then puts your commits back on top. This way, your commits _always_ remain as the latest commits in the git history. 

What this means is that the conflicts you see will look reversed from what you may be used to. If you are used to doing `git pull origin main`, your conflicts would look like this:

```
<<<<<<< HEAD
conflicting changes from main
=======
conflicting changes from your-local-branch
>>>>>>>
```

But with `--rebase`, the same conflict looks like:

```
<<<<<<< HEAD
conflicting changes from your-local-branch
=======
conflicting changes from main
>>>>>>>
```

### Updating a multi-commit change <a name="multi-commit"></a>

Let's say you are working on a big change that requires three separate commits: A, B, and C. Your local branch might look like this:

* C commit
* B commit
* A commit
* latest commit on `main`
* ...

Now, someone reviews your B change, and asks you to update it. How do you do this? `git commit --amend` will update the latest commit, "C commit", but you need to keep your changes for B and C separate.

There are many ways to approach this problem, but one way is to do an interactive git rebase. This will look like:

```
git rebase -i HEAD~2

```
This will open up an editor - change the beginning of the "B commit" line from "pick" to "edit", then save and quit.

The rebase will pause when the commit history looks like:

* B commit
* A commit
* latest commit on `main`
* ...

Then, edit the necessary files, `git add path/to/files`, and do `git commit --amend` to update "B commit". Then,

```
git rebase --continue
```

Now, your commit history looks the same as before, and you can push to Gerrit, and the correct reviews will all be updated.

## Setting up Gerrit for the first time <a name="first-time"></a>

In this example, we are setting up Gerrit the main repository, https://github.com/storj/storj/. The steps should be almost identical for other repositories.

### Permissions

Before requesting Gerrit access in Slack, you will need to log in at https://review.dev.storj.io/ with your Github account. Once you have done this, share your Github email and username, and ask for review and submit permissions in the #gerrit Slack channel. When you have permissions, you can verify that you have submit access by going to any open changeset, and checking for a "CODE-REVIEW+2" button in the top right. If you don't see this, you still need to be added to the Reviewers group. 

Next, set up your SSH key in Gerrit by going to your settings: https://review.dev.storj.io/settings/#SSHKeys. If you have already set up SSH with Github, this should be easy. Otherwise, see Github's docs for [][generating a new SSH key]()(https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
* [checking for existing ssh keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)
* [generating a new ssh key (if no existing ones)](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
* [adding an ssh key to your account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) - the only difference here is that you are adding the ssh key in your Gerrit settings rather than your Github settings.

### Setting up an existing storj/storj clone to work with Gerrit

#### Automatic setup

Run

```
curl -L [storj.io/clone](http://storj.io/clone) | sh
```

from inside your local storj/storj repository.

#### Manual setup

Run the following command in order to add a hook which executes whenever a commit message is written:

```
scp -p -P 29418 <yourusername>@review.dev.storj.io:hooks/commit-msg ".git/hooks/"
```

This will add a line that looks like `Change-Id: I989b8a46c0e97c1278517e1de07fe42d5950cf54` to the end of each commit message you create, allowing Gerrit to track a single changeset, even as the commit hash, message, and files change.

Now, add the `gerrit` remote path, allowing you to push to gerrit:

```
git remote add gerrit ssh://<yourusername>@review.dev.storj.io:29418/storj/storj
```

#### Next steps

You should be all set now! When you have a commit to push for review, use one of the following commands (remember to `git pull --rebase origin main`, or the change may not be pushed successfully:

* `git push gerrit HEAD:refs/for/main`
* `git push gerrit HEAD:refs/for/main%wip` - if you do this, the changeset will be created in gerrit, but it will not trigger a build until you take it out of "wip"

You can use the same command to update an existing changeset. As long as the `Change-Id` in the commit message is the same, the corresponding review in Gerrit will be updated.
