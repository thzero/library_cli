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
cli <options>

--generate :: generates a UUIDs, either in short (default) or long format
  --number, --n :: the number of ids to generate
  --long, --l :: generates a long uuid

--updateversion :: updates the version
  --major, --ma :: sets the major version, defaults to the current value or 0
  --minor, --mi :: sets the minor version, defaults to the current value or 0
  --patch, --p :: sets the patch, defaults to the current value or 0
  --patch_inc, --pi :: increments the patch by one
  --date, --d :: sets the version date in MM/DD/YYYY format, defaults to current date
  --package, --pa :: sets the path of the package.json file
```

### Help

```
node -r esm cli.js --help
// from within an application
node -r esm ./node_modules/@thzero/library/cli.js --help
```

### Version

```
node -r esm cli.js --version
// from within an application
node -r esm ./node_modules/@thzero/library/cli.js --version
```

### Generate UUID examples

#### Single UUID

```
node -r esm cli.js --generate
// from within an application
node -r esm ./node_modules/@thzero/library/cli.js --generate
```

#### Multiple UUIDs

```
node -r esm cli.js --generate --n 5
// from within an application
node -r esm ./node_modules/@thzero/library/cli.js --generate --n 5
```

### Update Version examples

#### Increment patch

```
node -r esm cli.js --updateversion --pi
// from within an application
node -r esm ./node_modules/@thzero/library/cli.js --updateversion --pi --package \"../../../package.json\"
```

#### Update date

```
node -r esm cli.js --updateversion --d '7/15/2020'
// from within an application
node -r esm ./node_modules/@thzero/library/cli.js --updateversion --d '7/15/2020' --package \"../../../package.json\"
```
