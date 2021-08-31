import * as vscode from 'vscode';
import { exec } from 'child_process';
import { existsSync } from 'fs';

const output = vscode.window.createOutputChannel("RAISE");

function execCommand(command: string, filepath: string) {
    output.clear();
    output.show(true);
    exec(`raise.sh ${command} '${filepath}'`, (error, stdout, stderr) => {
        output.append(stdout);
    });
}

function runWrapper(command: string) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const filepath = editor.document.fileName;
        execCommand(command, filepath);
    } else {
        console.warn("No file is currently opened");
    }
}

function typeCheck() {
    runWrapper('rsltc');
};

function compileToSML() {
    runWrapper('rsltc -m');
}

function runSML() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        let filepath = editor.document.fileName;

        filepath = filepath.slice(0, -4) + '.sml'; // replace ".rsl" extension with sml

        if (!existsSync(filepath)) {
            console.warn("Could not find an SML file with the same name as the currently opened RSL file");
            return;
        }

        execCommand('sml', filepath);
    } else {
        console.warn("No file is currently opened");
    }
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('raise.typeCheck', typeCheck));
    context.subscriptions.push(vscode.commands.registerCommand('raise.compileToSML', compileToSML));
    context.subscriptions.push(vscode.commands.registerCommand('raise.runSML', runSML));
}