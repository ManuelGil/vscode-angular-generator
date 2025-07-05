import JsonToTS from 'json-to-ts';
import * as json5 from 'json5';
import { Range, TextEditor, l10n, window, workspace } from 'vscode';

// Import the helper functions
import { showError } from '../helpers';

/**
 * TransformController handles parsing, validation, and code generation for Angular elements.
 * All public methods are documented with JSDoc for clarity and maintainability.
 * @class TransformController
 * @module controllers/transform.controller
 */
export class TransformController {
  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Converts selected JSON text to TypeScript interfaces and opens it in a new editor.
   * @returns Promise resolved with the opened TextEditor or void if cancelled.
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
   * Attempts to parse a string as a JSON object using JSON5.
   * @param str String to parse.
   * @returns Parsed object if valid, or false if invalid.
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
