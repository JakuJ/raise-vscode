import { execSync } from 'child_process';
import * as vscode from 'vscode';
import { getConfig } from './common';

export function registerFormatter() {
  if (getConfig("format.enable")) {
    vscode.languages.registerDocumentFormattingEditProvider('rsl', {
      provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.ProviderResult<vscode.TextEdit[]> {
        const filepath = document.fileName;
        const command = getConfig("commands.format");
        
        const buffer = execSync(`${command} '${filepath}'`);
        
        const firstLine = document.lineAt(0);
        const lastLine = document.lineAt(document.lineCount - 1);
        const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
        
        return [vscode.TextEdit.replace(textRange, buffer.toString())];
      }
    });
  }
}