![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_cli)
![David](https://img.shields.io/david/thzero/library_cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_cli

A cli tool for the opinonated @thzero/library packages.

### Installation

[![NPM](https://nodei.co/npm/@thzero/library_cli.png?compact=true)](https://npmjs.org/package/@thzero/library_cli)

## CLI

The tool includes a command line interface application that performs a couple of tasks

* Generate short UUIDs
* Update version information in a package.json

### Usage

```
library-cli <options>

--help, --h :: help

--version, --v :: cli version

--generate :: generates a UUIDs, either in short (default) or long format
  --number, --n :: the number of ids to generate
  --long, --l :: generates a long uuid

--updateversion :: updates the version
  --major, --ma :: sets the major version, defaults to the current value or 0
  --minor, --mi :: sets the minor version, defaults to the current value or 0
  --patch, --p :: sets the patch, defaults to the current value or 0
  --patch_inc, --pi :: increments the patch by one
  --date, --d :: sets the version date in MM/DD/YYYY format, defaults to current date
  --silent, --s :: does not prompt
```

### Help

```
node -r esm cli.js --help
// from within an application
./node_modules/.bin/library-cli --help
```

### Version

```
node -r esm cli.js --version
// from within an application
./node_modules/.bin/library-cli --version
```

The version will utilize the following properties in the package.json file.

```
  "version": "<major>.<minor>.<patch>",
  "version_major": <major>,
  "version_minor": <minor>,
  "version_patch": <patch; to increment must be an integer value>,
  "version_date": "<date in MM/DD/YYY>",
```

### Generate UUID examples

#### Single UUID

```
// installed globally
library-cli --generate
// installed locally
./node_modules/.bin/library-cli --generate
```

#### Multiple UUIDs

```
// installed globally
library-cli --generate --n 5
// installed locally
./node_modules/.bin/library-cli --generate --n 5
```

### Update Version examples

#### Increment patch

```
// installed globally
library-cli --updateversion --pi
// installed locally
./node_modules/.bin/library-cli --updateversion --pi"
```

#### Update date

```
// installed globally
library-cli--updateversion --d '7/15/2020'
// installed locally
./node_modules/.bin/library-cli --updateversion --d '7/15/2020'"
```
