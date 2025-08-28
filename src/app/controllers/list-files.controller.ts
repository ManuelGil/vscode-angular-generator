import {
  l10n,
  Position,
  Range,
  Selection,
  TextEditorRevealType,
  ThemeIcon,
  Uri,
  window,
  workspace,
} from 'vscode';

import { Config, EXTENSION_ID } from '../configs';
import { findFiles } from '../helpers';
import { NodeModel } from '../models';

/**
 * Controller for listing and navigating Angular files in the workspace.
 * ListFilesController manages navigation and display of files and folders in the workspace.
 * All public methods and properties are documented with JSDoc for clarity and maintainability.
 *
 * @class ListFilesController
 * @module controllers/list-files.controller
 */
export class ListFilesController {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties
  /**
   * The static config property.
   *
   * @static
   * @property
   * @public
   * @type {Config}
   * @memberof ListFilesController
   */
  static config: Config;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ListFilesController class
   *
   * @constructor
   * @param {Config} config - The configuration object
   * @public
   * @memberof ListFilesController
   */
  constructor(config: Config) {
    ListFilesController.config = config;
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Returns a list of files in the workspace as NodeModel objects.
   * @param maxResults Maximum number of results to return.
   * @returns Promise resolved with an array of NodeModel or void if none found.
   */
  static async getFiles(): Promise<NodeModel[] | void> {
    if (!workspace.workspaceFolders) {
      window.showErrorMessage(l10n.t('Operation cancelled!'));
      return;
    }

    const folders = workspace.workspaceFolders.map(
      (folder) => folder.uri.fsPath,
    );
    const allFiles: Uri[] = [];

    const { include, exclude } = this.config;

    const includePatterns = include
      .map((pattern: string) => pattern?.trim())
      .filter((pattern): pattern is string => !!pattern && pattern.length > 0)
      .map((pattern: string) => {
        const hasGlob = /[\*?\[\]\{\}\(\)!]/.test(pattern);
        const hasSep = /[\\/]/.test(pattern);
        if (hasGlob || hasSep) {
          return pattern;
        }
        const ext = pattern.startsWith('.') ? pattern.slice(1) : pattern;
        return `**/*.${ext}`;
      });

    for (const folder of folders) {
      const result = await findFiles({
        baseDirectoryPath: folder,
        includeFilePatterns: includePatterns,
        excludedPatterns: exclude,
        includeDotfiles: false,
        enableGitignoreDetection: true,
      });
      allFiles.push(...result);
    }

    if (allFiles.length === 0) {
      return;
    }

    const uniqueFiles = Array.from(new Set(allFiles.map((f) => f.fsPath))).map(
      (path) => Uri.file(path),
    );

    uniqueFiles.sort((a, b) => a.path.localeCompare(b.path));

    const nodes: NodeModel[] = uniqueFiles.map((file) => {
      const path = workspace.asRelativePath(file);
      const filename = path.split('/').pop();
      let label: string = filename ?? l10n.t('Untitled');

      if (filename && this.config.showPath) {
        const folder = path.split('/').slice(0, -1).join('/');
        label += folder ? l10n.t(' ({0})', folder) : ` ${l10n.t('(root)')}`;
      }

      const node = new NodeModel(
        label,
        new ThemeIcon('file'),
        {
          command: `${EXTENSION_ID}.list.openFile`,
          title: l10n.t('Open File'),
          arguments: [file],
        },
        file,
        file.fsPath,
      );
      node.tooltip = file.fsPath;
      return node;
    });

    return nodes;
  }

  /**
   * Opens the specified file in the VSCode editor.
   * @param uri File Uri to open.
   */
  openFile(uri: Uri) {
    workspace.openTextDocument(uri).then((filename) => {
      window.showTextDocument(filename);
    });
  }

  /**
   * Opens the specified file and moves the cursor to the given line.
   * @param uri File Uri to open.
   * @param line Line number to navigate to.
   */
  gotoLine(uri: Uri, line: number) {
    workspace.openTextDocument(uri).then((document) => {
      window.showTextDocument(document).then((editor) => {
        const pos = new Position(line, 0);
        editor.revealRange(
          new Range(pos, pos),
          TextEditorRevealType.InCenterIfOutsideViewport,
        );
        editor.selection = new Selection(pos, pos);
      });
    });
  }
}
