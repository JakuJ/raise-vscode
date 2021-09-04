# RSL extension for VS Code

This project aims to bring basic support for the RAISE Specification Language to VS Code. For a file to be recognized as RSL it has to have the `.rsl` extension.

![screenshot](./images/example.png)

## Features

- Syntax highlighing
- [Language server support](https://github.com/JakuJ/rsl-language-server)
- Auto-indentation
- Snippets for `scheme` and `class` keywords
- Commands:
  - `Typecheck`
  - `Compile to SML`
  - `Run SML`

## Requirements

Install this extension from the Extension menu in VS Code and make sure you also have the following dependencies:

### RSL Tools

This extension requires the `rsltc` and `sml` binaries to be globally available (put them in your `PATH`).

#### Optional: Docker utility script

If you cannot run `rsltc` or `sml` on your OS natively, you might want to use the [Docker utility script](https://github.com/JakuJ/raise-docker-util).

Install the `raise.sh` utility in your `PATH` and then introduce aliases to the required programs, like so:

```shell
# put this in your ~/.bashrc
alias sml='raise.sh sml'
```
### Language server

The [rsl-language-server](https://github.com/JakuJ/rsl-language-server) binary should be in your `PATH` for the language server integration to work.
