'use strict';

import * as vscode from 'vscode';

function transformEditorSelection(transformer: (text: string) => string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    editor.edit(editBuilder => {
        editBuilder.replace(selection, transformer(text));
    });
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.encodeURI', () => {
            transformEditorSelection(encodeURI);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.encodeURIComponent', () => {
            transformEditorSelection(encodeURIComponent);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.decodeURI', () => {
            transformEditorSelection(decodeURI);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.decodeURIComponent', () => {
            transformEditorSelection(decodeURIComponent);
        })
    );
}