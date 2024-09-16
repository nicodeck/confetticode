import * as vscode from "vscode";
import { runConfettiTask } from "./tasks/runConfettiTask";
import { getRegex } from "./settings/getRegex";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidEndTerminalShellExecution((event) => {
    // Check if the extension is enabled and exit if it's not
    const isExtensionEnabled = vscode.workspace
      .getConfiguration("confetticode")
      .get("enable") as boolean;

    if (!isExtensionEnabled) {
      return;
    }

    // Get the command that was executed
    const command = event.execution.commandLine.value;

    // Get the regex from the configuration and use the default if it's not set
    const regex = getRegex();

    // Check if the command matches the regex and if the exit code is 0
    if (regex.test(command)) {
      const exitCode = event.exitCode;

      if (exitCode === 0) {
        // Fire the confetti 🎉
        runConfettiTask();
      }
    }
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
