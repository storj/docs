# Git Conventions

In order to make the interaction between all the members (team and contributors), we follow some basic Git conventions.

We use the Github features to enforce as many restrictions as possible, however, because Github is continually evolving, some restrictions may not be currently enforced but it will be at the time that Github offer them.

The following conventions are:

1. While your branch isn't present in Storj repositories, you can do whatever you want, rebase, squash, etc., however once it's pushed to a Storj repository, we consider that the branch is shared, and from that point you SHOULD NEVER __force push__ into it.
2. A branch MUST BE up to date with least upstream changes before if it's merged into _master_; this is enforced by Github, however because of the convention mentioned above, if the branch is already pushed and it requires to be updated, the way of doing it is by MERGE, don't use rebase.
