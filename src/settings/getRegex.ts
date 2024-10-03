import * as vscode from "vscode";

export const getRegex = () => {
  const defaultRegex =
    /^(yarn test|yarn jest|npm run test|npm run jest|npm test|npm jest|jest|test)/;

  const regex = (() => {
    try {
      const configurationRegexStringList = vscode.workspace
        .getConfiguration("confetticode")
        .get("customCommandRegexList") as string[];

      const cleanedRegexStringList = configurationRegexStringList.filter(
        (regexString) => regexString.trim() !== ""
      );

      if (cleanedRegexStringList.length === 0) {
        return defaultRegex;
      }

      const configurationRegexString = cleanedRegexStringList.join("|");

      const configurationRegex = new RegExp(`(?:${configurationRegexString})`);

      return configurationRegex;
    } catch (error) {}

    return defaultRegex;
  })();

  return regex;
};
