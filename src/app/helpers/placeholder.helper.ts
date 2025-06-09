import { window, InputBoxOptions } from 'vscode';
import { l10n } from 'vscode';

/**
 * Built-in prompt definitions for known placeholders:
 * - ComponentName → PascalCase class name
 * - entityName    → camelCase or kebab-case entity name
 * - style         → uses passed defaultStyle
 */
const defaultPrompts: Record<
  string,
  InputBoxOptions | ((defaultStyle: string) => string)
> = {
  // biome-ignore lint/style/useNamingConvention: ComponentName is a common term in many codebases
  ComponentName: {
    prompt: l10n.t('Enter the class name'),
    validateInput: (value: string) => {
      if (!/^[A-Z][A-Za-z0-9]{2,}$/.test(value)) {
        return l10n.t(
          'Invalid format! Class names MUST be declared in PascalCase and have at least 3 characters (e.g. User, AuthService).',
        );
      }
      return;
    },
    placeHolder: l10n.t('E.g. User, Role, Auth...'),
  },
  entityName: {
    prompt: l10n.t('Enter the entity name'),
    validateInput: (value: string) => {
      if (!/^[a-z][A-Za-z0-9-]+$/.test(value)) {
        return l10n.t(
          'Invalid format! Entity names MUST be declared in camelCase (e.g. user, authService, userRole).',
        );
      }
      return;
    },
    placeHolder: l10n.t('E.g. user, role, auth...'),
  },
  style: (defaultStyle: string) => defaultStyle,
};

/**
 * Replaces all {{Key}} placeholders in `rawString`:
 *  - If Key ∈ defaultPrompts and is a function, calls it(defaultStyle)
 *  - If Key ∈ defaultPrompts and is InputBoxOptions, shows an input box
 *  - Otherwise substitutes with an empty string
 *
 * @param rawString The string containing zero or more {{Key}} placeholders.
 * @param defaultStyle The default style value for the style placeholder.
 * @returns The processed string with all placeholders replaced.
 * @throws Error('cancelled') if the user cancels any input box.
 */
export async function resolvePlaceholders(
  rawString: string,
  defaultStyle: string,
): Promise<string> {
  const placeholderRegex = /{{\s*(\w+)\s*}}/g;
  const keys = Array.from(
    new Set([...rawString.matchAll(placeholderRegex)].map((match) => match[1])),
  );

  const values: Record<string, string> = {};

  for (const key of keys) {
    const handler = defaultPrompts[key];
    if (!handler) {
      values[key] = '';
      continue;
    }

    if (typeof handler === 'function') {
      // style case
      values[key] = handler(defaultStyle);
    } else {
      // showInputBox for ComponentName or entityName
      const result = await window.showInputBox(handler);
      if (result === undefined) {
        // user cancelled
        throw new Error('cancelled');
      }
      values[key] = result;
    }
  }

  return rawString.replace(placeholderRegex, (_, name) => values[name] || '');
}
