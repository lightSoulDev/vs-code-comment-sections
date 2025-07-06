/*
    @author: lightSoulDev (justpd)
    @version: 1.0.0
    @since: 28.02.2022
*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import comment from './comment';

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

type LineRange = { start: number; end: number };

const generateComment = async (editor: vscode.TextEditor) => {
    const { document, selections } = editor;

    let lineRanges: LineRange[] = [];

    editor.edit((b) => {
        let offset: number = 0;
        for (const selection of selections) {
            let com: string = '';
            let replaceTarget: vscode.Selection | vscode.Range;

            if (!selection.isEmpty) {
                const text = document.getText(selection);
                com = comment(text);
                replaceTarget = selection;
            } else {
                const { text, range } = document.lineAt(selection.active.line);
                com = comment(text);
                replaceTarget = range;
            }

            b.replace(replaceTarget, com);

            let linesPushed: number = com.trim().split('\n').length - 1;

            lineRanges.push({
                start: selection.active.line + offset,
                end: selection.active.line + offset + linesPushed
            });

            offset += linesPushed;
        }
    });

    let postion = editor.selection.end;
    editor.selection = new vscode.Selection(postion, postion);

    const commentBlock = async (lineStart: number, lineEnd: number) => {
        var positionStart = new vscode.Position(lineStart, 0);
        var positionEnd = new vscode.Position(lineEnd + 1, 0);

        editor.selection = new vscode.Selection(positionStart, positionEnd);
        await vscode.commands.executeCommand('editor.action.commentLine');
    };

    const commentLine = async (line: number) => {
        var position = new vscode.Position(line, 0);
        editor.selection = new vscode.Selection(position, position);
        await vscode.commands.executeCommand('editor.action.commentLine');
    };

    for (const lineRange of lineRanges) {
        let start: number = lineRange.start;
        let end: number = lineRange.end;

        // Works bad with block-comments
        // await commentBlock(start, end);

        for (var i = start; i <= end; i++) {
            await commentLine(i);
        }
    }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "coolcommentsections" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'coolcommentsections.generateComment',
        async () => {
            const { activeTextEditor: editor } = vscode.window;

            if (editor) {
                await generateComment(editor);
            }
        }
    );

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
