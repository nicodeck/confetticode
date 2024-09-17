import * as vscode from "vscode";

export const runConfettiTask = () => {
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

  vscode.tasks.executeTask(confettiTask);
};
