import * as vscode from 'vscode';

import {registerCommands} from './commands';
import {deactivateClient, startClient} from './client';

export function activate(context: vscode.ExtensionContext) {
    registerCommands(context);
    startClient(context);
}

export function deactivate(): Thenable<void> | undefined {
    deactivateClient();
    return undefined;
}