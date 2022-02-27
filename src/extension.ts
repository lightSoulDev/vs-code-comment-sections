// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import comment from "./comment";

const generateComment = (editor: vscode.TextEditor) => {
  const { document, selections } = editor;

  editor.edit((b) => {
    selections.forEach(async (selection) => {
      if (!selection.isEmpty) {
        const text = document.getText(selection);

        b.replace(selection, comment(text));
      } else {
        const { text, rangeIncludingLineBreak } = document.lineAt(
          selection.active.line
        );

        let com = comment(text);
        b.replace(rangeIncludingLineBreak, com + "\n");
        await vscode.commands.executeCommand("cursorMove", {
          to: "wrappedLineStart",
          by: "line",
          select: true,
        });
        await vscode.commands.executeCommand("cursorMove", {
          to: "down",
          by: "line",
          select: true,
          value: com.split("\n").length,
        });
      }
    });
  });
  vscode.commands.executeCommand("editor.action.addCommentLine");
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
    "coolcommentsections.generateComment",
    async () => {
      const { activeTextEditor: editor } = vscode.window;

      // const symbol = await window.showInputBox({ placeHolder: "symbols" });
      if (editor) generateComment(editor);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
