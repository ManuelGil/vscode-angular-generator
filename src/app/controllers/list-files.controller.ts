import {
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
import { directoryMap } from '../helpers';
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
  static async getFiles(
    maxResults: number = Number.MAX_SAFE_INTEGER,
  ): Promise<NodeModel[] | void> {
    // Get the files in the folder
    const files = await directoryMap('/', {
      extensions: this.config.include,
      ignore: this.config.exclude,
      maxResults,
    });

    if (files.length !== 0) {
      let nodes: NodeModel[] = [];

      files.sort((a, b) => a.path.localeCompare(b.path));

      for (const file of files) {
        const path = workspace.asRelativePath(file);
        let filename = path.split('/').pop();

        if (filename && this.config.showPath) {
          const folder = path.split('/').slice(0, -1).join('/');

          filename += folder ? ` (${folder})` : ' (root)';
        }

        nodes.push(
          new NodeModel(
            filename ?? 'Untitled',
            new ThemeIcon('file'),
            {
              command: `${EXTENSION_ID}.list.openFile`,
              title: 'Open File',
              arguments: [file],
            },
            file,
            file.fsPath,
          ),
        );
      }

      return nodes;
    }

    return;
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
