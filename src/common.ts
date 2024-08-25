import * as vscode from 'vscode';

export function getConfig(field: string) : string {
    const parts = ['raise', ...field.split('.')];
    const last = parts.pop()!;
    return vscode.workspace.getConfiguration(parts.join("."))[last];
}

export function reportFailure(command: string) {
    let msg = `Failed to execute command: '${command}'.`;
          
    if (command.includes("raise.sh") || command.includes("docker")) {
        msg += ` Perhaps the Docker Engine is not running?`
    }
    
    vscode.window.showErrorMessage(msg);
}

export const delimiter: string = process.platform == 'win32' ? '"' : '\'';
