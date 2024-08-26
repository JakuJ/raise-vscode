import * as vscode from 'vscode';
import { exec } from 'child_process';
import { existsSync } from 'fs';
import { getConfig, reportFailure, delimiter } from './common';
import { dirname, basename } from 'path';
import { promises as fs } from 'fs';

const output = vscode.window.createOutputChannel("RAISE");

function execCommand(command: string, filepath: string) : Promise<string> {
    output.clear();
    output.show(true);

    const dir = dirname(filepath);
    const file = basename(filepath);

    return new Promise<string>((resolve, _) => {
        const child = exec(`${command} ${delimiter}${file}${delimiter}`,
            { cwd: dir },
            (error, _stdout, _stderr) => { 
                if (error?.code == 125) {
                    reportFailure(command);
                }
                resolve(_stdout);
            });

        child.stdout?.on('data', (data: string) => {
            output.append(data); 
        });
    });
}

async function runWrapper(run: (filepath: string) => Promise<string | void>) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        return run(editor.document.fileName)
    } else {
        console.warn("No file is currently opened");
    }
}

function typeCheck() {
    return runWrapper((filepath: string) => {
        return execCommand(getConfig("commands.typecheck"), filepath)
    });
}

function compileToSML() {
    return runWrapper ((filepath: string) => {
        return execCommand(getConfig("commands.compile"), filepath)
    });
}

function runSML() {
    return runWrapper(async (filepath: string) => {
        filepath = filepath.slice(0, -4) + '.sml'; // replace ".rsl" extension with sml

        if (!existsSync(filepath)) {
            console.warn("Could not find an SML file with the same name as the currently opened RSL file");
            return;
        }

        return execCommand(getConfig("commands.execute"), filepath);
    });
}

function extractResults(out: string) {
    const separator = "<sig>\nopen";
    let pos = out.lastIndexOf(separator) + separator.length;
    pos = out.indexOf("\n", pos);
    if (pos == -1) return '';

    let coverageMessageString = /^Unexecuted expressions in |Complete expression coverage of /;
    let results = out.substring(pos + 1).split("\n");

    results = results.filter((line) => 
        line != "val it = () : unit" && 
        line != "- " && 
        !coverageMessageString.test(line)
    );

    return results.join("\n");
}

async function saveResults() {
    return runWrapper(async (filepath: string) => {
        filepath = filepath.slice(0, -4) + '.sml.results';

        try {
            await compileToSML();
            const out = await runSML();

            if (out) { 
                await fs.writeFile(filepath, extractResults(out));
            } else {
                console.warn("No results to save.");
            }
        } catch (error) {
            console.error("Failed to save results:", error);
            vscode.window.showErrorMessage("Failed to save results to file");
        }
    });
}

export function registerCommands(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('raise.typeCheck', typeCheck));
    context.subscriptions.push(vscode.commands.registerCommand('raise.compileToSML', compileToSML));
    context.subscriptions.push(vscode.commands.registerCommand('raise.runSML', runSML));
    context.subscriptions.push(vscode.commands.registerCommand('raise.saveResults', saveResults));
}
