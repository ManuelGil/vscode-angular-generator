import { Range, window, workspace } from 'vscode';

import JsonToTS from 'json-to-ts';
import { Config } from '../configs';
import { showError } from '../helpers';

// Import the Config and helper functions

/**
 * The TransformController class.
 *
 * @class
 * @classdesc The class that represents the example controller.
 * @export
 * @public
 * @property {Config} config - The configuration
 * @example
 * const controller = new TransformController(config);
 */
export class TransformController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the TransformController class.
   *
   * @param {Config} config - The configuration
   * @public
   * @memberof TransformController
   */
  constructor(private readonly config: Config) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  async json2ts() {
    let editor;

    if (workspace.workspaceFolders) {
      editor = window.activeTextEditor;
    } else {
      showError('No text editor is active.');
      return;
    }

    const selection = editor?.selection;

    if (selection && !selection.isEmpty) {
      const selectionRange = new Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character,
      );

      const text = editor?.document.getText(selectionRange) || '';

      const jsonSchema = this.tryParseJSONObject(text);

      if (!jsonSchema) {
        window.showErrorMessage('Invalid JSON Schema!');
        return;
      }

      const tsSchema = JsonToTS(jsonSchema)
        .map((itf) => `export ${itf}\n`)
        .join('\n');

      const document = await workspace.openTextDocument({
        language: 'typescript',
        content: tsSchema,
      });

      return await window.showTextDocument(document);
    }
  }

  private tryParseJSONObject(str: string) {
    try {
      var object = JSON.parse(str);

      if (object && typeof object === 'object') {
        return object;
      }
    } catch (e) {
      return false;
    }

    return false;
  }
}
