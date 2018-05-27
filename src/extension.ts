'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const encodeURICommand = 
        vscode.commands.registerCommand('extension.encodeURI', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, encodeURI(text));
            });
        });
    context.subscriptions.push(encodeURICommand);

    const encodeURIComponentCommand = 
        vscode.commands.registerCommand('extension.encodeURIComponent', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, encodeURIComponent(text));
            });
        });
    context.subscriptions.push(encodeURIComponentCommand);

    const decodeURICommand = 
        vscode.commands.registerCommand('extension.decodeURI', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, decodeURI(text));
            });
        });
    context.subscriptions.push(decodeURICommand);

    const decodeURIComponentCommand = 
        vscode.commands.registerCommand('extension.decodeURIComponent', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, decodeURIComponent(text));
            });
        });
    context.subscriptions.push(decodeURIComponentCommand);
}