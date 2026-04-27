/**
 * @fileoverview Safely writes generated file content to disk within the workspace.
 * Handles directory creation, secure path validation, duplicate detection,
 * progress/cancellation UI, and post-creation cache invalidation.
 */

import { isAbsolute, normalize } from 'path';
import {
  FileSystemError,
  l10n,
  ProgressLocation,
  Uri,
  window,
  workspace,
} from 'vscode';

import { Config, EXTENSION_DISPLAY_NAME } from '../configs';
import { clearCache } from './find-files.helper';
import { getWorkspaceRoot } from './workspace-root.helper';

/**
 * Writes data to a file inside the current workspace.
 * If the file does not exist, it will be created safely.
 *
 * @param directoryPath - Absolute or workspace-relative directory path.
 * @param filename - Name of the file to create.
 * @param fileContent - Text content to write.
 * @param config - Active extension configuration.
 */
export const saveFile = async (
  directoryPath: string,
  filename: string,
  fileContent: string,
  config: Config,
): Promise<void> => {
  const workspaceRoot = getWorkspaceRoot(config);

  if (!workspaceRoot) {
    const message = l10n.t(
      '{0}: No workspace folders are open. Please open a workspace folder to use this extension',
      EXTENSION_DISPLAY_NAME,
    );
    window.showErrorMessage(message);
    return;
  }

  // Normalize input path to prevent malformed segments
  const normalizedDirPath = normalize(directoryPath || '.');
  const workspaceRootUri = Uri.file(workspaceRoot);

  /**
   * Build the target directory URI safely.
   *
   * Absolute paths are used directly.
   * Relative paths are resolved against the workspace root.
   */
  const targetDirectoryUri = isAbsolute(normalizedDirPath)
    ? Uri.file(normalizedDirPath)
    : Uri.joinPath(workspaceRootUri, normalizedDirPath);

  /**
   * Security check:
   * Ensure the resolved path stays inside the workspace root.
   * Prevents directory traversal and unintended writes.
   */
  const relativeCheck = workspace.asRelativePath(targetDirectoryUri, false);
  if (relativeCheck.startsWith('..')) {
    window.showErrorMessage(l10n.t('Invalid directory path'));
    return;
  }

  const targetFileUri = Uri.joinPath(targetDirectoryUri, filename);

  // Track success to show notification after progress completes
  let createdFileFsPath: string | undefined;

  try {
    await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: l10n.t('Creating file: {0}', filename),
        cancellable: true,
      },
      async (_progress, cancellationToken) => {
        try {
          // If the user cancelled immediately, stop.
          if (cancellationToken.isCancellationRequested) {
            return;
          }

          // Create the directory only if it's not the workspace root (no-op if it already exists).
          if (targetDirectoryUri.toString() !== workspaceRootUri.toString()) {
            await workspace.fs.createDirectory(targetDirectoryUri);
          }

          // Check if file exists. Treat FileSystemError from stat as "not exists".
          let targetFileExists = false;
          try {
            await workspace.fs.stat(targetFileUri);
            targetFileExists = true;
          } catch (error: unknown) {
            if (!(error instanceof FileSystemError)) {
              throw error;
            }
          }

          if (cancellationToken.isCancellationRequested) {
            return;
          }

          // If file exists, offer to open it instead of overwriting
          if (targetFileExists) {
            const openFileLabel = l10n.t('Open File');
            const choice = await window.showWarningMessage(
              l10n.t('File already exists: {0}', filename),
              openFileLabel,
            );

            if (choice === openFileLabel) {
              const textDocument =
                await workspace.openTextDocument(targetFileUri);
              window.showTextDocument(textDocument);
            }
            return;
          }

          // Write file contents (TextEncoder -> Uint8Array)
          const encodedFileContent = new TextEncoder().encode(fileContent);
          await workspace.fs.writeFile(targetFileUri, encodedFileContent);

          if (cancellationToken.isCancellationRequested) {
            return;
          }

          // Open the created file in the editor
          const createdTextDocument =
            await workspace.openTextDocument(targetFileUri);
          window.showTextDocument(createdTextDocument);

          // Mark success; show notification after progress resolves
          createdFileFsPath = targetFileUri.fsPath;

          // Clear the file cache since a new file was created
          clearCache();
        } catch (error: any) {
          // Show a helpful error message including the underlying error if available
          window.showErrorMessage(
            l10n.t(
              'Error creating file: {0}. Please check the path and try again',
              error?.message ?? String(error),
            ),
          );
        }
      },
    );

    // Show success notification after progress dialog closes
    if (createdFileFsPath) {
      window.showInformationMessage(
        l10n.t('File created successfully: {0}', createdFileFsPath),
      );
    }
  } catch (error: any) {
    // Catch failures from withProgress or other unexpected issues
    window.showErrorMessage(
      l10n.t(
        'Error creating file: {0}. Please check the path and try again',
        error?.message ?? String(error),
      ),
    );
  }
};
