import JsonToTS from 'json-to-ts';
import * as json5 from 'json5';
import { l10n, Range, TextEditor, window, workspace } from 'vscode';

// Import the helper functions
import { showError } from '../helpers';

/**
 * The TransformController class.
 *
 * @class
 * @classdesc The class that represents the example controller.
 * @export
 * @public
 * @example
 * const controller = new TransformController();
 */
export class TransformController {
  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The json2ts method.
   *
   * @function json2ts
   * @public
   * @async
   * @memberof TransformController
   * @example
   * await controller.json2ts();
   *
   * @returns {Promise<TextEditor | void>} The result
   */
  async json2ts(): Promise<TextEditor | void> {
    let editor;

    if (workspace.workspaceFolders) {
      editor = window.activeTextEditor;
    } else {
      const message = l10n.t('No text editor is active!');
      showError(message);
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

      let text = editor?.document.getText(selectionRange) || '';

      const languageId = editor?.document.languageId || '';

      if (
        [
          'javascript',
          'javascriptreact',
          'typescript',
          'typescriptreact',
        ].includes(languageId)
      ) {
        text = text
          .replace(/'([^']+)'/g, '"$1"')
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
          .replace(/,*\s*\n*\]/g, ']')
          .replace(/{\s*\n*/g, '{')
          .replace(/,*\s*\n*};*/g, '}');
      }

      const jsonSchema = this.tryParseJSONObject(text);

      if (!jsonSchema) {
        const message = l10n.t('Invalid JSON Schema!');
        showError(message);
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

    const message = l10n.t('No text is selected!');
    showError(message);
    return;
  }

  // Private methods
  /**
   * The tryParseJSONObject method.
   *
   * @private
   * @memberof TransformController
   * @param {string} str - The string to parse
   * @returns {boolean | object} The result
   * @example
   * const object = controller.tryParseJSONObject(str);
   *
   * @returns {boolean | object} The result
   */
  private tryParseJSONObject(str: string): boolean | object {
    try {
      const object = json5.parse(str);

      if (object && typeof object === 'object') {
        return object;
      }
    } catch (e) {
      return false;
    }

    return false;
  }
}
