import { existsSync } from 'fs';
import { isAbsolute, normalize } from 'path';
import {
  FilePermission,
  FileSystemError,
  FileType,
  ProgressLocation,
  Uri,
  l10n,
  window,
  workspace,
} from 'vscode';

/**
 * Reads the contents of the file specified in the path.
 *
 * @param {string} path - Path to the source directory
 * @param {object} [options] - Options for the directoryMap function
 * @param {string[]} [options.extensions] - File extensions to include
 * @param {string[]} [options.ignore] - Directories to ignore
 * @param {number} [options.maxResults] - An upper-bound for the result
 * @example
 * const files = await directoryMap('src', {
 *   extensions: ['ts'],
 *   ignore: ['**​/node_modules/**'],
 *   maxResults: 100,
 * });
 *
 * @returns {Promise<Uri[]>} - Array of files
 */
export const directoryMap = async (
  path: string,
  options?: { extensions?: string[]; ignore?: string[]; maxResults?: number },
): Promise<Uri[]> => {
  let includes = path === '/' ? '**/*' : `${path}/**/*`;
  let exclude = '';

  if (options && options.extensions && options.extensions.length) {
    includes += `.{${options.extensions.join(',')}}`;
  }

  if (options && options.ignore && options.ignore.length) {
    exclude = `{${options.ignore.join(',')}}`;
  }

  return workspace.findFiles(includes, exclude, options?.maxResults);
};

/**
 * Writes content to the file specified in the path. If the file does not exist then the function will create it.
 *
 * @param {string} directoryPath - Relative path to the directory where the file should be created
 * @param {string} filename - Name of the file
 * @param {string} fileContent - Content to write to the file
 * @example
 * await saveFile('src', 'file.ts', 'console.log("Hello World")');
 *
 * @returns {Promise<void>} - Confirmation of the write operation
 */
export const saveFile = async (
  directoryPath: string,
  filename: string,
  fileContent: string,
): Promise<void> => {
  // Ensure there is an open workspace
  if (!workspace.workspaceFolders || workspace.workspaceFolders.length === 0) {
    const message = l10n.t('No workspace folder open');
    await window.showErrorMessage(message);
    return;
  }

  // Validate and normalize the provided directory path to avoid escaping the workspace root
  const normalizedRelativeDirectoryPath = normalize(directoryPath || '.');
  if (
    isAbsolute(normalizedRelativeDirectoryPath) ||
    normalizedRelativeDirectoryPath.split(/[\\\/]/).includes('..')
  ) {
    await window.showErrorMessage(l10n.t('Invalid directory path'));
    return;
  }

  // Split into path segments in a cross-platform way and remove empty/'./' segments
  const relativePathSegments = normalizedRelativeDirectoryPath
    .split(/[\\/]+/)
    .filter((s) => s !== '' && s !== '.');

  // Disallow parent-directory traversals
  if (relativePathSegments.includes('..')) {
    await window.showErrorMessage(l10n.t('Invalid directory path'));
    return;
  }

  // Determine base folder (first workspace folder)
  const workspaceRootUri = workspace.workspaceFolders?.[0]?.uri;
  if (!workspaceRootUri) {
    await window.showErrorMessage(l10n.t('No workspace folder open'));
    return;
  }

  // Build directory and file URIs using segments to ensure proper joining on all platforms
  const targetDirectoryUri =
    relativePathSegments.length > 0
      ? Uri.joinPath(workspaceRootUri, ...relativePathSegments)
      : workspaceRootUri;
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
          // If the user canceled immediately, stop.
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
            if (error instanceof FileSystemError) {
              targetFileExists = false;
            } else {
              // Unknown error - rethrow so outer catch can show it
              throw error;
            }
          }

          if (cancellationToken.isCancellationRequested) {
            return;
          }

          // If file exists, offer to open it instead of overwriting
          if (targetFileExists) {
            const openLabel = l10n.t('Open File');
            const choice = await window.showWarningMessage(
              l10n.t('File already exists: {0}', filename),
              openLabel,
            );
            if (choice === openLabel) {
              const textDocument =
                await workspace.openTextDocument(targetFileUri);
              await window.showTextDocument(textDocument);
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
          await window.showTextDocument(createdTextDocument);

          // Mark success; show notification after progress resolves
          createdFileFsPath = targetFileUri.fsPath;
        } catch (error: any) {
          // Show a helpful error message including the underlying error if available
          await window.showErrorMessage(
            l10n.t('Error creating file: {0}', error?.message ?? String(error)),
          );
        }
      },
    );
    // Show success notification after progress dialog closes
    if (createdFileFsPath) {
      await window.showInformationMessage(
        l10n.t('File created successfully: {0}', createdFileFsPath),
      );
    }
  } catch (error: any) {
    // Catch failures from withProgress or other unexpected issues
    await window.showErrorMessage(
      l10n.t('Error creating file: {0}', error?.message ?? String(error)),
    );
  }
};

/**
 * Deletes ALL files contained in the supplied path.
 *
 * @param {string} path - Path to the directory
 * @param {object} [options] - Options for the deleteFiles function
 * @param {boolean} [options.recursive] - Delete the content recursively if a folder is denoted.
 * @param {boolean} [options.useTrash] - Use the trash instead of permanently deleting the files.
 * @example
 * await deleteFiles('src');
 *
 * @returns {Promise<void>} - No return value
 */
export const deleteFiles = async (
  path: string,
  options?: { recursive?: boolean; useTrash?: boolean },
): Promise<void> => {
  const files = await workspace.findFiles(`${path}/**/*`);

  await Promise.all(
    files.map(async (file) => {
      try {
        await workspace.fs.delete(file, options);
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error';
        window.showErrorMessage(
          l10n.t('Error deleting file: {0}', errorMessage),
        );
      }
    }),
  );
};

/**
 * Returns an array of filenames in the supplied path.
 *
 * @param {string} path - Path to the directory
 * @param {object} [options] - Options for the directoryMap function
 * @param {string[]} [options.extensions] - File extensions to include
 * @param {string[]} [options.ignore] - Directories to ignore
 * @param {number} [options.maxResults] - An upper-bound for the result.
 * @example
 * const files = await getFilenames('src');
 *
 * @returns {Promise<string[]>} - Array of filenames
 */
export const getFilenames = async (
  path: string,
  options?: { extensions?: string[]; ignore?: string[]; maxResults?: number },
): Promise<string[]> => {
  const files = await directoryMap(path, options);

  // Use fsPath to ensure OS-correct path formatting (e.g., backslashes on Windows)
  return files.map((file) => file.fsPath);
};

/**
 * Returns an object containing the file information for the supplied path.
 *
 * @param {string} path - Path to the file
 * @example
 * const fileInfo = await getFileInfo('src/file.ts');
 *
 * @returns {Promise<object>} - File information
 */
export const getFileInfo = async (path: string): Promise<object> => {
  return await workspace.fs.stat(Uri.file(path));
};

/**
 * Returns an object containing the directory information for the supplied path.
 *
 * @param {string} path - Path to the directory
 * @example
 * const dirInfo = await getDirFileInfo('src');
 *
 * @returns {Promise<object>} - Directory information
 */
export const getDirFileInfo = async (path: string): Promise<object> => {
  return await workspace.fs.stat(Uri.file(path));
};

/**
 * Returns the symbolic permissions for the supplied path.
 *
 * @param {string} path - Path to the file
 * @example
 * const permissions = await symbolicPermissions('src/file.ts');
 *
 * @returns {Promise<FilePermission | undefined>} - Symbolic permissions
 */
export const symbolicPermissions = async (
  path: string,
): Promise<FilePermission | undefined> => {
  return await workspace.fs
    .stat(Uri.file(path))
    .then((file) => file.permissions);
};

/**
 * Returns the octal permissions for the supplied path.
 *
 * @param {string} path - Path to the file
 * @example
 * const permissions = await octalPermissions('src/file.ts');
 *
 * @returns {Promise<string | undefined>} - Octal permissions
 */
export const octalPermissions = async (
  path: string,
): Promise<string | undefined> => {
  const file = await workspace.fs
    .stat(Uri.file(path))
    .then((file) => file.permissions);

  return file?.toString(8);
};

/**
 * Returns a boolean indicating whether the two supplied files are the same.
 *
 * @param {string} file1 - Path to the first file
 * @param {string} file2 - Path to the second file
 * @example
 * const isSame = await sameFile('src/file1.ts', 'src/file2.ts');
 *
 * @returns {Promise<boolean>} - Confirmation of the comparison
 */
export const sameFile = async (
  file1: string,
  file2: string,
): Promise<boolean> => {
  const [file1Info, file2Info] = await Promise.all([
    workspace.fs.stat(Uri.file(file1)),
    workspace.fs.stat(Uri.file(file2)),
  ]);

  // Compare key attributes to determine if both refer to the same file contents/entry
  return (
    file1Info.type === file2Info.type &&
    file1Info.size === file2Info.size &&
    file1Info.mtime === file2Info.mtime &&
    file1Info.ctime === file2Info.ctime
  );
};

/**
 * Sets the realpath for the supplied path.
 *
 * @param {string} path - Path to the file
 * @example
 * await setRealpath('src/file.ts');
 *
 * @returns {Promise<Uri>} - Uri for the file if it exists
 */
export const setRealpath = async (path: string): Promise<Uri> => {
  // Validate the file exists; will throw if not
  await workspace.fs.stat(Uri.file(path));
  // Return a proper Uri for the supplied path
  return Uri.file(path);
};

/**
 * Returns the relative path from the workspace root to the supplied path.
 *
 * @param {string} path - Path to the file
 * @example
 * const relativePath = await getRelativePath('src/file.ts');
 *
 * @returns {Promise<string>} - Relative path
 */
export const getRelativePath = async (path: string): Promise<string> => {
  return workspace.asRelativePath(path);
};

/**
 * Returns the realpath for the supplied path.
 *
 * @param {string} path - Path to the file
 * @example
 * const realpath = await getRealpath('src/file.ts');
 *
 * @returns {Promise<string>} - Realpath
 */
export const getRealpath = async (path: string): Promise<string> => {
  return Uri.file(path).fsPath;
};

/**
 * Returns a boolean indicating whether the supplied path exists.
 *
 * @param {string} path - Path to the file or directory
 * @example
 * const fileExists = await exists('src/file.ts');
 *
 * @returns {Promise<boolean>} - Confirmation of the existence
 */
export const exists = async (path: string): Promise<boolean> => {
  return existsSync(path);
};

// isDirectory
/**
 * Returns a boolean indicating whether the supplied path is a directory.
 *
 * @param {string} path - Path to the file or directory
 * @example
 * const isDir = await isDirectory('src');
 *
 * @returns {Promise<boolean>} - Confirmation of the directory
 */
export const isDirectory = async (path: string): Promise<boolean> => {
  return (await workspace.fs.stat(Uri.file(path))).type === FileType.Directory;
};
