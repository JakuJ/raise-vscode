# RSL extension for VS Code

VS Code extension introducing support for the RAISE Specification Language. For a file to be recognized as RSL it has to have the `.rsl` extension.

![screenshot](./extras/example.png)

## Features

- Syntax highlighing
- Commands for type checking, compilation to, and execution of generated SML with extraction of test results
- [Language server](https://github.com/JakuJ/rsl-language-server) integration for on-save diagnostics
- Formatting via the `rsltc` pretty-printer
- Auto-indentation
- Snippets for `scheme` and `class` keywords

## Requirements

Install this extension from the Extension menu in VS Code and make sure you also have the following dependencies:

### RSL Tools

This extension requires the `rsltc` and `sml` binaries to be globally available (put them in your `PATH`).

#### Optional: Docker utility script

If you cannot run `rsltc` or `sml` on your OS natively (as is the case with macOS), you might want to use the [Docker utility script](https://github.com/JakuJ/raise-docker-util).

### Language server

Install the [rsl-language-server](https://github.com/JakuJ/rsl-language-server) and add it to your `PATH` or define the path to it in the configuration. The language server requires `rsltc` and `rsltc -m` to be available on your system either by wrapping raise.sh in a bash script or without using Docker.

## Configuration

The following configuration options are grouped under the "RAISE" category:

| Key                                      | Default value       | Description                                |
| ---------------------------------------- | ------------------- | ------------------------------------------ |
| raise.commands.typecheck                 | rsltc               | Command used to run type checking          |
| raise.commands.compile                   | rsltc -m            | Command used to generate SML               |
| raise.commands.execute                   | sml <               | Command used to run SML                    |
| raise.commands.format                    | rsltc -pl 80        | Command used to pretty-print               |
| raise.format.enable                      | true                | Whether to enable code formatting          |
| raise.languageServer.path                | rsl-language-server | Path to the RSL LS executable              |
| raise.languageServer.compilerDiagnostics | true                | Whether to report SML compiler diagnostics |

> [!WARNING]
> - If format-on-save (`editor.formatOnSave` setting) is enabled, the RSL formatter might overwrite files with old content, effectively preventing any changes to the document. If this is the case for you, either disable format-on-save or uncheck `raise.format.enable` to remove RSL formatting altogether.
> - If the Save Results command does not create a results file, ensure the `raise.commands.execute` command terminates by itself. That is, you don’t need to send EOF to the interactive SML session.
> - The Save Results command does not check if the tests ran successfully or if there are any. If no tests are run, the resulting file will be empty. If there are errors they should be included in the file.
> - To make the language server use a new configuration you must restart the extension.

### macOS

`rsltc` versions 2.5 and 2.6 are known to segfault on MacOS for some flags (e.g. `-c` or `-pl <length>`). `sml` is also completely broken because of the 64-bit architecture of macOS. Therefore, some functions like pretty-printing need to be executed inside a 32-bit Linux container.

To achieve full functionality of the extension on macOS, the following commands must be changed in the configuration. Using [raise.sh](https://github.com/JakuJ/raise-docker-util) is one way to do it:

```json
{
  "raise.commands.execute": "raise.sh sml",
  "raise.commands.format": "raise.sh rsltc -pl 80",
}
```

### Installing Version 0.3.0
The VS Code marketplace currently only offers version 0.2.0, which does not include the save results command. To install version 0.3.0, you'll need to follow the installation steps provided in this [Release]( https://github.com/stinem1/raise-vscode/releases/tag/v0.3.0).

# Development

```shell
$ npm install
$ npx @vscode/vsce package
```
