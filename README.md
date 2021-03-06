<p align="center">
  <a href="https://senses-smartmirror.com#gh-light-mode-only">
    <img src=".github/images/senses-logo.png" width="360" />
  </a>
  <a href="https://senses-smartmirror.com/#gh-dark-mode-only">
    <img src=".github/images/senses-logo-dark.png" width="360" />
  </a>
</p>

<br /><br />

# Senses - Smart Mirror CLI

CLI tool for installing Senses - Software and creating & provisioning widgets to the Senses Smart Mirror.

[![Version](https://img.shields.io/npm/v/@senses-mirror/senses-cli.svg)](https://npmjs.com/package/@senses-mirror/senses-cli)
[![License](https://img.shields.io/npm/l/@senses-mirror/senses-cli.svg)](https://github.com/senses-smart-mirror/senses-cli/blob/master/package.json)

<!-- toc -->
* [Senses - Smart Mirror CLI](#senses---smart-mirror-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @senses-mirror/senses-cli
$ senses COMMAND
running command...
$ senses (-v|--version|version)
@senses-mirror/senses-cli/1.0.7 darwin-x64 node-v14.18.3
$ senses --help [COMMAND]
USAGE
  $ senses COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`senses help [COMMAND]`](#senses-help-command)
* [`senses senses:install`](#senses-sensesinstall)
* [`senses senses:run`](#senses-sensesrun)
* [`senses widget:build [WIDGET]`](#senses-widgetbuild-widget)
* [`senses widget:build-import [WIDGET] [TARGET]`](#senses-widgetbuild-import-widget-target)
* [`senses widget:create [NAME] [LOCATION]`](#senses-widgetcreate-name-location)
* [`senses widget:import [WIDGET] [TARGET]`](#senses-widgetimport-widget-target)

## `senses help [COMMAND]`

display help for senses

```
USAGE
  $ senses help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `senses senses:install`

Install the Senses - Smart Mirror software.

```
USAGE
  $ senses senses:install

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ senses install
  $ senses i
```

_See code: [src/commands/senses/install.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v1.0.7/src/commands/senses/install.ts)_

## `senses senses:run`

Run the Senses - Smart Mirror software

```
USAGE
  $ senses senses:run

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ senses run
  $ senses r
```

_See code: [src/commands/senses/run.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v1.0.7/src/commands/senses/run.ts)_

## `senses widget:build [WIDGET]`

Build (and zip) widget so widget is for the Senses - Smart Mirror.

```
USAGE
  $ senses widget:build [WIDGET]

ARGUMENTS
  WIDGET  The widget that should be build

OPTIONS
  -f, --force
  -h, --help           show CLI help
  -w, --widget=widget  specify the widget it should be build
```

_See code: [src/commands/widget/build.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v1.0.7/src/commands/widget/build.ts)_

## `senses widget:build-import [WIDGET] [TARGET]`

Build & Provision (import) a widget for the Smart Mirror.

```
USAGE
  $ senses widget:build-import [WIDGET] [TARGET]

ARGUMENTS
  WIDGET  The widget that should be build
  TARGET  Target IP address.

OPTIONS
  -h, --help           show CLI help
  -t, --target=target  specify the target to where it should import
  -w, --widget=widget  specify the widget it should be build
```

_See code: [src/commands/widget/build-import.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v1.0.7/src/commands/widget/build-import.ts)_

## `senses widget:create [NAME] [LOCATION]`

Scaffold a widget for the Senses - Smart Mirror.

```
USAGE
  $ senses widget:create [NAME] [LOCATION]

ARGUMENTS
  NAME      The name of the Widget
  LOCATION  Location where the widget should be created

OPTIONS
  -f, --force
  -h, --help               show CLI help
  -l, --location=location  location where to create the widget
  -n, --name=name          name to widget
```

_See code: [src/commands/widget/create.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v1.0.7/src/commands/widget/create.ts)_

## `senses widget:import [WIDGET] [TARGET]`

Provision (import) a widget to Senses - Smart Mirror.

```
USAGE
  $ senses widget:import [WIDGET] [TARGET]

ARGUMENTS
  WIDGET  The widget that should be imported.
  TARGET  Target IP address.

OPTIONS
  -f, --force
  -h, --help           show CLI help
  -t, --target=target  specify the target to where it should import
  -w, --widget=widget  specify the widget it should be build
```

_See code: [src/commands/widget/import.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v1.0.7/src/commands/widget/import.ts)_
<!-- commandsstop -->

### Special Thanks

With special thanks to <a href="https://github.com/petarblazevski/"> Petar Blazevski </a> for helping out with creating the CLI.
