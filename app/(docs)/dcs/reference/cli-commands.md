---
title: "CLI Commands Reference"
docId: "cli-reference-001"
metadata:
  title: "Uplink CLI Commands Reference"
  description: "Complete reference for all Uplink CLI commands, flags, and usage patterns for managing Storj DCS storage."
---

Complete reference for the Uplink CLI tool commands and options.

{% callout type="info" %}
For installation instructions, see [Uplink CLI Installation](docId:TbMdOGCAXNWyPpQmH6EOq).
{% /callout %}

## Global Flags

| Flag                  | Description                                     |
| :-------------------- | :---------------------------------------------- |
| `--advanced`          | if used in with `-h`, print advanced flags help |
| `--config-dir string` | main directory for uplink configuration         |

## Core Commands

### uplink access

Manage access grants for secure access to buckets and objects.

#### Subcommands

| Command | Description |
|---------|-------------|
| `access create` | Create a new access grant |
| `access export` | Export an access grant to a string |
| `access import` | Import an access grant from a string |
| `access inspect` | Inspect an access grant |
| `access list` | List stored access grants |
| `access register` | Register an access grant with a satellite |
| `access remove` | Remove an access grant |
| `access restrict` | Create a restricted access grant |
| `access revoke` | Revoke an access grant |
| `access use` | Set default access grant |

**Usage Examples:**
```bash
uplink access create --name my-access
uplink access export my-access
uplink access restrict my-access --readonly
```

### uplink cp

Copy files between local filesystem and Storj buckets.

**Syntax:**
```
uplink cp [source] [destination] [flags]
```

**Common Flags:**
- `--recursive, -r` - Copy directories recursively
- `--parallelism int` - Number of parallel transfers (default 1)
- `--parallelism-chunk-size memory` - Size of chunks for parallel transfers

**Usage Examples:**
```bash
# Upload file
uplink cp local-file.txt sj://mybucket/remote-file.txt

# Download file
uplink cp sj://mybucket/remote-file.txt local-file.txt

# Upload directory recursively
uplink cp local-dir/ sj://mybucket/remote-dir/ --recursive
```

### uplink ls

List objects and prefixes in buckets.

**Syntax:**
```
uplink ls [path] [flags]
```

**Common Flags:**
- `--recursive, -r` - List recursively
- `--encrypted` - Show encrypted object names
- `--pending` - Show pending multipart uploads

**Usage Examples:**
```bash
# List all buckets
uplink ls

# List objects in bucket
uplink ls sj://mybucket/

# List recursively
uplink ls sj://mybucket/ --recursive
```

### uplink mb

Create a new bucket.

**Syntax:**
```
uplink mb sj://bucket-name [flags]
```

**Usage Examples:**
```bash
uplink mb sj://my-new-bucket
```

### uplink rb

Remove an empty bucket.

**Syntax:**
```
uplink rb sj://bucket-name [flags]
```

**Common Flags:**
- `--force` - Remove bucket and all objects

**Usage Examples:**
```bash
uplink rb sj://my-bucket
uplink rb sj://my-bucket --force
```

### uplink rm

Remove objects from buckets.

**Syntax:**
```
uplink rm sj://bucket/path [flags]
```

**Common Flags:**
- `--recursive, -r` - Remove recursively
- `--pending` - Remove pending multipart uploads

**Usage Examples:**
```bash
# Remove single object
uplink rm sj://mybucket/file.txt

# Remove directory recursively
uplink rm sj://mybucket/folder/ --recursive
```

### uplink mv

Move or rename objects within Storj.

**Syntax:**
```
uplink mv sj://source sj://destination
```

**Usage Examples:**
```bash
uplink mv sj://mybucket/oldname.txt sj://mybucket/newname.txt
uplink mv sj://mybucket/file.txt sj://anotherbucket/file.txt
```

### uplink share

Create shareable URLs for objects with restricted access.

**Syntax:**
```
uplink share [flags] sj://bucket/path
```

**Common Flags:**
- `--readonly` - Create read-only access
- `--writeonly` - Create write-only access
- `--not-after time` - Access expires after this time
- `--not-before time` - Access not valid before this time

**Usage Examples:**
```bash
uplink share sj://mybucket/file.txt --readonly --not-after +24h
uplink share sj://mybucket/ --writeonly
```

## Metadata Commands

### uplink meta

Manage object metadata.

#### Subcommands

| Command | Description |
|---------|-------------|
| `meta get` | Get object metadata |

**Usage Examples:**
```bash
uplink meta get sj://mybucket/file.txt
```

## Configuration Commands

### uplink setup

Create initial uplink configuration.

**Syntax:**
```
uplink setup [flags]
```

This command walks you through the initial configuration process.

### uplink import

Import serialized access grant into configuration.

**Syntax:**
```
uplink import [name] [serialized access] [flags]
```

**Usage Examples:**
```bash
uplink import my-access 13GRuHAiA...
```

## Advanced Usage

### Environment Variables

- `UPLINK_CONFIG_DIR` - Override configuration directory
- `UPLINK_ACCESS` - Set default access grant
- `UPLINK_DEBUG` - Enable debug output

### Configuration File

The uplink configuration is stored at:
- Linux/macOS: `$HOME/.config/storj/uplink/config.yaml`  
- Windows: `%AppData%\storj\uplink\config.yaml`

### Exit Codes

- `0` - Success
- `1` - General error
- `2` - Access denied
- `3` - Network error

## Performance Tuning

### Parallelism Settings

For large files or directories, adjust parallelism:

```bash
uplink cp large-file.bin sj://bucket/ --parallelism 10
uplink cp dir/ sj://bucket/ --recursive --parallelism 8
```

### Chunk Size Optimization

For very large files, adjust chunk size:

```bash
uplink cp huge-file.bin sj://bucket/ --parallelism-chunk-size 64MiB
```

This reference covers all major Uplink CLI commands and common usage patterns. For specific flag details, use `uplink [command] --help`.