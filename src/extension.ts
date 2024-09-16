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
        const confettiTask = new vscode.Task(
          { type: "shell" },
          vscode.TaskScope.Workspace,
          "Confetti Task",
          "ConfettiCode",
          new vscode.ShellExecution("open raycast://confetti")
        );

        confettiTask.presentationOptions = {
          reveal: vscode.TaskRevealKind.Never,
          panel: vscode.TaskPanelKind.Dedicated,
          clear: true,
          close: true,
        };

        vscode.tasks.executeTask(confettiTask).then();
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
