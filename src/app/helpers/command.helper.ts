import {
  Disposable,
  EventEmitter,
  ProgressLocation,
  ShellExecution,
  Task,
  TaskRevealKind,
  TaskScope,
  Uri,
  l10n,
  tasks,
  window,
  workspace,
} from 'vscode';
import { showError } from './dialog.helper';

/**
 * Execute a shell command inside VS Code.
 *
 * - If `captureOutput` is false: spins up an integrated terminal, sends the command, and resolves immediately.
 * - If `captureOutput` is true: uses the Task API to capture `stdout`, `stderr`, and exit code.
 * - If `waitResponse` is true: returns a Promise that resolves when the command completes without blocking the main thread.
 *
 * @param {string} name - Name of the terminal
 * @param {string} command - Command to run
 * @param {string} [cwdPath] - Working directory path
 * @param {boolean} [captureOutput=true] - Whether to capture command output
 * @param {boolean} [showTerminal=true] - Whether to show the terminal
 * @param {boolean} [waitResponse=true] - Whether to wait for response without blocking main thread
 * @example
 * runCommand('echo', 'echo "Hello, World!"');
 * // Wait for response asynchronously
 * const result = await runCommand('npm install', 'npm install', undefined, true, true, true);
 *
 * @returns {Promise<{ success: boolean; output?: string; error?: string }>} - Result with success status and optional output/error
 */

// Interface for command result event data
export interface CommandResultEvent {
  success: boolean;
  output?: string;
  error?: string;
}
export const runCommand = async (
  name: string,
  command: string,
  cwdPath?: string,
  captureOutput: boolean = true,
  showTerminal: boolean = true,
  waitResponse: boolean = true,
): Promise<{ success: boolean; output?: string; error?: string }> => {
  // Determine a valid workspace URI for cwd (or undefined)
  const cwdUri = cwdPath ? Uri.file(cwdPath) : undefined;
  const hasValidWorkspace =
    cwdPath && workspace.getWorkspaceFolder(cwdUri!) !== undefined;

  // Wrap everything in a cancellable progress indicator
  return window.withProgress(
    {
      location: ProgressLocation.Notification,
      title: l10n.t('Executing: {0}', command),
      cancellable: true,
    },
    async (_progress, token) => {
      // Simple "fire-and-forget" mode
      if (!captureOutput && !waitResponse) {
        const terminal = window.createTerminal({
          name,
          cwd: hasValidWorkspace ? cwdUri : undefined,
        });

        // Register cancellation handler
        const disposable = token.onCancellationRequested(() => {
          showError(l10n.t('Command cancelled: {0}', command));
          terminal.dispose();
        });

        if (showTerminal) {
          terminal.show();
        }
        terminal.sendText(command);

        // Cleanup cancellation handler as it's no longer needed
        disposable.dispose();
        return { success: true };
      }

      // Advanced mode: use Task API for capturing output & exit code
      const shellExec = new ShellExecution(command, { cwd: cwdPath });
      const taskScope = hasValidWorkspace
        ? TaskScope.Workspace
        : TaskScope.Global;

      const task = new Task(
        { type: 'shell', command },
        taskScope,
        name,
        'extension',
        shellExec,
      );

      // Control terminal presentation
      task.presentationOptions = {
        reveal: showTerminal ? TaskRevealKind.Always : TaskRevealKind.Never,
        clear: true, // Clear terminal before execution
      };

      // Determine if we're using the non-blocking mode with waitResponse
      if (waitResponse && !captureOutput) {
        // Create a terminal for non-blocking execution but with waiting for response
        const terminal = window.createTerminal({
          name,
          cwd: hasValidWorkspace ? cwdUri : undefined,
        });

        // Create event emitter to signal when command completes
        const resultEmitter = new EventEmitter<CommandResultEvent>();

        // Create a custom task to monitor the execution
        const waitTask = new Task(
          { type: 'shell', command: 'echo "Command execution completed"' },
          TaskScope.Global,
          `${name}-monitor`,
          'extension',
          shellExec,
        );

        waitTask.presentationOptions = {
          reveal: TaskRevealKind.Never,
          clear: false,
        };

        // Start a background monitoring process that doesn't block the UI
        setTimeout(async () => {
          if (showTerminal) {
            terminal.show();
          }
          terminal.sendText(command);

          // Execute the monitor task in the background
          try {
            const exec = await tasks.executeTask(waitTask);

            // Monitor for completion
            const disposable = tasks.onDidEndTaskProcess((e) => {
              if (e.execution === exec) {
                resultEmitter.fire({
                  success: e.exitCode === 0,
                  error:
                    e.exitCode !== 0
                      ? `Exited with code ${e.exitCode}`
                      : undefined,
                });
                disposable.dispose();
              }
            });
          } catch (err) {
            resultEmitter.fire({
              success: false,
              error: err instanceof Error ? err.message : String(err),
            });
          }
        }, 100);

        // Return a promise that resolves when the command completes
        return new Promise<CommandResultEvent>((resolve) => {
          resultEmitter.event((result) => {
            resolve(result);
          });
        });
      }

      // Traditional blocking mode with output capture
      // Promise that resolves when the task process ends
      return new Promise<{
        success: boolean;
        output?: string;
        error?: string;
      }>(async (resolve) => {
        // Create a collection of disposables to ensure proper cleanup
        const disposables: Disposable[] = [];

        // Handle cancellation
        disposables.push(
          token.onCancellationRequested(() => {
            showError(l10n.t('Command cancelled: {0}', command));
            cleanupDisposables();
            resolve({ success: false, error: 'Cancelled by user' });
          }),
        );

        // Listen for the task process to finish
        disposables.push(
          tasks.onDidEndTaskProcess((e) => {
            if (e.execution === exec) {
              if (e.exitCode === 0) {
                resolve({ success: true });
              } else {
                const errMsg = `Exited with code ${e.exitCode}`;
                showError(
                  l10n.t('Command failed: {0}\n\n{1}', command, errMsg),
                );
                resolve({ success: false, error: errMsg });
              }
              // Clean up all disposables
              cleanupDisposables();
            }
          }),
        );

        /**
         * Clean up all registered disposable resources to prevent memory leaks
         *
         * @function cleanupDisposables
         * @private
         */
        function cleanupDisposables() {
          disposables.forEach((d) => d.dispose());
        }

        // Kick off the task
        const exec = await tasks.executeTask(task);
      });
    },
  );
};
