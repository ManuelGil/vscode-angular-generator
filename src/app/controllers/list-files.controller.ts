import {
  Position,
  Range,
  Selection,
  TextEditorRevealType,
  ThemeIcon,
  window,
  workspace,
} from 'vscode';

import { Config, EXTENSION_ID } from '../configs';
import { directoryMap } from '../helpers';
import { NodeModel } from '../models';

export class ListFilesController {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties

  // Public properties

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
  constructor(public readonly config: Config) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The getFiles method.
   *
   * @function getFiles
   * @public
   * @async
   * @memberof ListFilesController
   * @example
   * controller.getFiles();
   *
   * @returns {Promise<NodeModel[] | void>} - The list of files
   */
  async getFiles(): Promise<NodeModel[] | void> {
    // Get the files in the folder
    const files = await directoryMap('/', {
      extensions: this.config.include,
      ignore: this.config.exclude,
      maxResults: 512,
    });

    if (files.length > 0) {
      let nodes: NodeModel[] = [];

      for (const file of files) {
        const document = await workspace.openTextDocument(file);

        nodes.push(
          new NodeModel(
            document.fileName.replace(/\\/g, '/').split('/').pop() ?? 'unknown',
            new ThemeIcon('file'),
            {
              command: `${EXTENSION_ID}.list.openFile`,
              title: 'Open File',
              arguments: [document.uri],
            },
            document.uri,
            document.fileName,
          ),
        );
      }

      return nodes;
    }

    return;
  }

  /**
   * The openFile method.
   *
   * @function openFile
   * @param {string} uri - The file URI
   * @public
   * @memberof ListFilesController
   * @example
   * controller.openFile('file:///path/to/file');
   *
   * @returns {Promise<void>} - The promise
   */
  openFile(uri: string) {
    workspace.openTextDocument(uri).then((filename) => {
      window.showTextDocument(filename);
    });
  }

  /**
   * The gotoLine method.
   *
   * @function gotoLine
   * @param {string} uri - The file URI
   * @param {number} line - The line number
   * @public
   * @memberof ListFilesController
   * @example
   * controller.gotoLine('file:///path/to/file', 1);
   *
   * @returns {void} - The promise
   */
  gotoLine(uri: string, line: number) {
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
