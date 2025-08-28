import { statSync } from 'fs';
import { relative, resolve } from 'path';
import { Uri, workspace } from 'vscode';

/**
 * Generates a relative path from the workspace root to the specified path.
 * If the given path is a file, it will be resolved to the parent folder.
 * If showPath is disabled, it will return the relative path from the workspace root using
 * {@linkcode Workspace.asRelativePath}.
 * @param {Uri} [path] - The path to generate the relative path from.
 * @returns {string} The relative path.
 * @memberof TerminalController
 */
export const relativePath = (
  path: Uri | undefined,
  isRootContext: boolean,
): string => {
  // Check if the path is a file
  if (path && statSync(path.fsPath).isFile()) {
    path = Uri.file(resolve(path.fsPath, '..'));
  }

  let folderPath: string = '';

  if (isRootContext) {
    // First workspace is the root => https://code.visualstudio.com/api/references/vscode-api#workspace
    const wsFolder = workspace.workspaceFolders
      ? workspace.workspaceFolders[0]
      : '';
    if (wsFolder && path) {
      folderPath = relative(wsFolder.uri.fsPath, path.fsPath);
    }
  } else {
    folderPath = path ? workspace.asRelativePath(path.fsPath, false) : '';
  }

  return folderPath;
};
