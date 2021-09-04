import * as vscode from 'vscode';

export function getConfig(field: string) {
    return vscode.workspace.getConfiguration('raise')[field];
}