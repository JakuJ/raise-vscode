import * as vscode from 'vscode';
import { workspace, ExtensionContext } from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function startClient(context: vscode.ExtensionContext) {
    const serverOptions: ServerOptions = { 
        command: "rsl-language-server",
        args: [],
        options: {}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'rsl' }]
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'rsl-language-server',
		'RSL Language Server',
		serverOptions,
		clientOptions
	);

    client.start();
}

export function deactivateClient(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}