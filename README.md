# Senses Smart Mirror CLI

CLI tool for creating & provisioning widgets to the Senses Smart Mirror.

[![Version](https://img.shields.io/npm/v/smart-mirror-cli.svg)](https://npmjs.org/package/senses-cli)
[![License](https://img.shields.io/npm/l/smart-mirror-cli.svg)](https://github.com/petarblazevski/smart-mirror-cli/blob/master/package.json)

<!-- toc -->
* [Senses Smart Mirror CLI](#senses-smart-mirror-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g smart-mirror-cli
$ sm COMMAND
running command...
$ sm (-v|--version|version)
smart-mirror-cli/0.0.1 darwin-x64 node-v12.20.0
$ sm --help [COMMAND]
USAGE
  $ sm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sm help [COMMAND]`](#sm-help-command)
* [`sm widget:build [WIDGET]`](#sm-widgetbuild-widget)
* [`sm widget:build-import [WIDGET] [TARGET]`](#sm-widgetbuild-import-widget-target)
* [`sm widget:create [NAME] [LOCATION]`](#sm-widgetcreate-name-location)
* [`sm widget:import [WIDGET] [TARGET]`](#sm-widgetimport-widget-target)

## `sm help [COMMAND]`

display help for sm

```
USAGE
  $ sm help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `sm widget:build [WIDGET]`

Build widget for the Smart Mirror.

```
USAGE
  $ sm widget:build [WIDGET]

ARGUMENTS
  WIDGET  The widget that should be build

OPTIONS
  -f, --force
  -h, --help           show CLI help
  -w, --widget=widget  specify the widget it should be build
```

_See code: [src/commands/widget/build.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v0.0.1/src/commands/widget/build.ts)_

## `sm widget:build-import [WIDGET] [TARGET]`

Build & Import a widget for the Smart Mirror.

```
USAGE
  $ sm widget:build-import [WIDGET] [TARGET]

ARGUMENTS
  WIDGET  The widget that should be build
  TARGET  Target IP address.

OPTIONS
  -h, --help           show CLI help
  -t, --target=target  specify the target to where it should import
  -w, --widget=widget  specify the widget it should be build
```

_See code: [src/commands/widget/build-import.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v0.0.1/src/commands/widget/build-import.ts)_

## `sm widget:create [NAME] [LOCATION]`

Create a widget for the Smart Mirror.

```
USAGE
  $ sm widget:create [NAME] [LOCATION]

ARGUMENTS
  NAME      The name of the Widget
  LOCATION  Location where the widget should be created

OPTIONS
  -f, --force
  -h, --help               show CLI help
  -l, --location=location  location where to create the widget
  -n, --name=name          name to widget
```

_See code: [src/commands/widget/create.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v0.0.1/src/commands/widget/create.ts)_

## `sm widget:import [WIDGET] [TARGET]`

Widget provisioning

```
USAGE
  $ sm widget:import [WIDGET] [TARGET]

ARGUMENTS
  WIDGET  The widget that should be imported.
  TARGET  Target IP address.

OPTIONS
  -f, --force
  -h, --help           show CLI help
  -t, --target=target  specify the target to where it should import
  -w, --widget=widget  specify the widget it should be build
```

_See code: [src/commands/widget/import.ts](https://github.com/senses-smart-mirror/senses-cli/blob/v0.0.1/src/commands/widget/import.ts)_
<!-- commandsstop -->
