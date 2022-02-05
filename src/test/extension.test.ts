import * as assert from 'assert';
import * as vscode from 'vscode';

import Position = vscode.Position;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextEditor = vscode.TextEditor;

const delay = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const execCommand = async (cmd: string) => {
  const { document } = vscode.window.activeTextEditor as TextEditor;
  await vscode.commands.executeCommand(`extension.${cmd}`);
  await delay(150); // above await doesn't work for some reason. This hack fixes that.
  return document.getText();
};

const reset = async (testInput: string) => {
  const editor = vscode.window.activeTextEditor as TextEditor;
  const fullRange = editor.document.validateRange(new Range(0, 0, editor.document.lineCount /*intentionally missing the '-1' */, 0));
  await editor.edit(edit => {
    edit.replace(fullRange, testInput);
  });
  editor.selection = new Selection(new Position(0, 0), new Position(0, testInput.length));
};

describe('Tests', function () {
    before(async () => {
      const doc = await vscode.workspace.openTextDocument();
      await vscode.window.showTextDocument(doc);
    });

    [
        {  cmd: 'decodeURI',          act: '',                                         exp: '', },
        {  cmd: 'decodeURI',          act: 'http://example.com',                       exp: 'http://example.com', },
        {  cmd: 'decodeURI',          act: 'http://example.com?a=1&b=2',               exp: 'http://example.com?a=1&b=2', },
        {  cmd: 'decodeURI',          act: 'http%3A%2F%2Fexample.com',                 exp: 'http%3A%2F%2Fexample.com', },
        {  cmd: 'decodeURI',          act: 'http%253A%252F%252Fexample.com',           exp: 'http%3A%2F%2Fexample.com', },

        {  cmd: 'decodeURIComponent', act: '',                                         exp: '', },
        {  cmd: 'decodeURIComponent', act: 'http%3A%2F%2Fexample.com%3Fa%3D1%26b%3D2', exp: 'http://example.com?a=1&b=2', },
        {  cmd: 'decodeURIComponent', act: 'http%3A%2F%2Fexample.com',                 exp: 'http://example.com', },
        {  cmd: 'decodeURIComponent', act: 'http://example.com',                       exp: 'http://example.com', },
        {  cmd: 'decodeURIComponent', act: 'http://example.com?a=1&b=2',               exp: 'http://example.com?a=1&b=2', },
        {  cmd: 'decodeURIComponent', act: 'a+b+c',                                    exp: 'a b c', },
        {  cmd: 'decodeURIComponent', act: 'a%20b+c',                                  exp: 'a b c', },
        {  cmd: 'decodeURIComponent', act: 'a%2Bb+c',                                  exp: 'a+b c', },

        {  cmd: 'encodeURI',          act: '',                                         exp: '', },
        {  cmd: 'encodeURI',          act: 'http%3A%2F%2Fexample.com%3Fa%3D1%26b%3D2', exp: 'http%253A%252F%252Fexample.com%253Fa%253D1%2526b%253D2', },
        {  cmd: 'encodeURI',          act: 'http%3A%2F%2Fexample.com',                 exp: 'http%253A%252F%252Fexample.com', },
        {  cmd: 'encodeURI',          act: 'http://example.com',                       exp: 'http://example.com', },
        {  cmd: 'encodeURI',          act: 'http://example.com?a=1&b=2',               exp: 'http://example.com?a=1&b=2', },

        {  cmd: 'encodeURIComponent', act: '',                                         exp: '', },
        {  cmd: 'encodeURIComponent', act: 'http%3A%2F%2Fexample.com%3Fa%3D1%26b%3D2', exp: 'http%253A%252F%252Fexample.com%253Fa%253D1%2526b%253D2', },
        {  cmd: 'encodeURIComponent', act: 'http%3A%2F%2Fexample.com',                 exp: 'http%253A%252F%252Fexample.com', },
        {  cmd: 'encodeURIComponent', act: 'http://example.com',                       exp: 'http%3A%2F%2Fexample.com', },
        {  cmd: 'encodeURIComponent', act: 'http://example.com?a=1&b=2',               exp: 'http%3A%2F%2Fexample.com%3Fa%3D1%26b%3D2', },
    ].forEach(async ({ cmd, act, exp }: { [key: string]: string}, idx: number) => {
        it(`should ${cmd} [${idx}]: ${exp}`, async () => {
            await reset(act);
            assert.equal(await execCommand(cmd), exp);
        });
    });
});