import * as vscode from "vscode";
import { runConfettiTask } from "./tasks/runConfettiTask";
import { getRegex } from "./settings/getRegex";
import { sign } from "crypto";

export function activate(context: vscode.ExtensionContext) {
  // Register the command to enable the extension
  const enableCommand = vscode.commands.registerCommand(
    "confetticode.enable",
    () => {
      vscode.workspace
        .getConfiguration("confetticode")
        .update("enable", true, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage("ConfettiCode extension enabled!");
    }
  );

  // Register the command to disable the extension
  const disableCommand = vscode.commands.registerCommand(
    "confetticode.disable",
    () => {
      vscode.workspace
        .getConfiguration("confetticode")
        .update("enable", false, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage("ConfettiCode extension disabled!");
    }
  );

  // Register the command to add a custom command regex
  const addCustomCommandRegexCommand = vscode.commands.registerCommand(
    "confetticode.addCustomCommandRegex",
    async () => {
      const customCommandRegex = await vscode.window.showInputBox({
        placeHolder: "Enter a custom command regex",
      });

      if (customCommandRegex) {
        const configurationRegexStringList = vscode.workspace
          .getConfiguration("confetticode")
          .get("customCommandRegexList") as string[];

        const updatedConfigurationRegexStringList = [
          ...configurationRegexStringList,
          customCommandRegex,
        ];

        vscode.workspace
          .getConfiguration("confetticode")
          .update(
            "customCommandRegexList",
            updatedConfigurationRegexStringList,
            vscode.ConfigurationTarget.Global
          );
      }
    }
  );

  context.subscriptions.push(
    enableCommand,
    disableCommand,
    addCustomCommandRegexCommand
  );

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
