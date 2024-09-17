import * as vscode from "vscode";

export const getRegex = () => {
  const defaultRegex =
    /^(yarn test|yarn jest|npm run test|npm run jest|npm test|npm jest|jest|test|npm exec jest)/;

  const regex = (() => {
    try {
      const configurationRegex = new RegExp(
        vscode.workspace
          .getConfiguration("confetticode")
          .get("customCommandRegex") as string
      );

      if (configurationRegex.source === "(?:)") {
        return defaultRegex;
      }
      return configurationRegex;
    } catch (error) {}
    return defaultRegex;
  })();

  return regex;
};
