import * as vscode from 'vscode';

import {registerCommands} from './commands';
import {registerFormatter} from './formatting';
import {deactivateClient, startClient} from './client';

export function activate(context: vscode.ExtensionContext) {
    registerCommands(context);
    registerFormatter();
    startClient(context);
}

export function deactivate(): Thenable<void> | undefined {
    deactivateClient();
    return undefined;
}