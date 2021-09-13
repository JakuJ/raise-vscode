import * as vscode from 'vscode';

export function getConfig(field: string) {
    const parts = ['raise', ...field.split('.')];
    const last = parts.pop()!;
    return vscode.workspace.getConfiguration(parts.join("."))[last];
}