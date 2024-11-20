import { Uri, window, workspace } from 'vscode';

/**
 * Runs a command in the terminal
 *
 * @param {string} title - Title of the terminal
 * @param {string} command - Command to run
 * @example
 * runCommand('echo "Hello, World!"');
 *
 * @returns {Promise<void>} - No return value
 */
export const runCommand = async (
  name: string,
  command: string,
  path?: string | undefined,
): Promise<void> => {
  let cwd: Uri | undefined;

  if (path && workspace.getWorkspaceFolder(Uri.file(path))) {
    cwd = Uri.file(path);
  }

  const terminal = window.createTerminal({
    name,
    cwd,
  });

  terminal.show();
  terminal.sendText(command);
};
