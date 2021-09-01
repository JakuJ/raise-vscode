# raise-vscode

VS Code extension which adds basic support for the RAISE Specification Language.

**WORK IN PROGRESS**

## Features

- Syntax highlighing
- Language server support:
  - On-save typechecking with error squiggles
- Auto-indentation
- Snippets for `scheme` and `class` keywords
- Commands:
  - `Typecheck`
  - `Compile to SML`
  - `Run SML`
- Code lenses for the above commands

## Requirements

### RSL Tools 

This extension uses the Dockerized version of the `rsltc` and `sml` utilities.
Install the `raise.sh` utility in your `PATH` [[link](https://github.com/JakuJ/raise-docker-util)]

Support for locally installed tools (no Docker) coming soon.

### Language server

The [rsl-language-server](https://github.com/JakuJ/rsl-language-server) binary should be in your `PATH` as well.
