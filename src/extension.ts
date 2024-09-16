import { exec } from "child_process";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "confetticode" is now active!');
  vscode.window.onDidEndTerminalShellExecution((event) => {
    console.log("Terminal shell execution ended");
    const command = event.execution.commandLine.value;
    const regex = /^(yarn jest|yarn test)/;
    if (regex.test(command)) {
      const exitCode = event.exitCode;
      console.log("Command matches regex", command);
      if (exitCode === 0) {
        console.log("Command executed successfully");
        exec("open raycast://confetti");
      }
    }
  });

  // const disposable = vscode.commands.registerCommand('confetticode.helloWorld', () => {
  // 	vscode.window.showInformationMessage('Hello World from ConfettiCode!');
  // });

  // context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
