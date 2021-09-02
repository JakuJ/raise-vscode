# RSL extension for VS Code

This project aims to bring basic support for the RAISE Specification Language to VS Code. For a file to be recognized as RSL it has to have the `.rsl` extension.

![screenshot](./images/example.png)

## Features

- Syntax highlighing
- Language server support 
- Auto-indentation
- Snippets for `scheme` and `class` keywords
- Commands:
  - `Typecheck`
  - `Compile to SML`
  - `Run SML`
- Code lenses for the above commands

## Requirements

Install this extension from the Marketplace and make sure you also have the following dependencies:

### RSL Tools

This extension uses the Dockerized version of the `rsltc` and `sml` utilities.
Install the `raise.sh` utility in your `PATH` [[link](https://github.com/JakuJ/raise-docker-util)]

Support for locally installed tools (no Docker) coming soon.

### Language server

The [rsl-language-server](https://github.com/JakuJ/rsl-language-server) binary should be in your `PATH` for the language server integration to work.
