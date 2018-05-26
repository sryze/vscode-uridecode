'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.encodeURIComponent', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);

        editor.edit(editBuilder => {
            editBuilder.replace(selection, encodeURIComponent(text));
        });
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.decodeURIComponent', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);

        editor.edit(editBuilder => {
            editBuilder.replace(selection, decodeURIComponent(text));
        });
    });
    context.subscriptions.push(disposable);
}