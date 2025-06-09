import { QuickPickItem, window } from 'vscode';

/**
 * Displays a message box with the provided message
 *
 * @param {string} prompt - The prompt to display
 * @param {string} placeHolder - The input placeholder
 * @param {string} currentPath - The current path
 * @param {string} validate - The validation function
 * @example
 * const path = await getPath('Enter a path', 'src/app', 'src/app', (path) => {
 *   if (path.length === 0) {
 *     return 'Path cannot be empty';
 * });
 *
 * @returns {Promise<string | undefined>} - The selected path
 */
export const getPath = async (
  prompt: string,
  placeHolder: string,
  currentPath: string,
  validate: (path: string) => string | undefined,
): Promise<string | undefined> => {
  return await window.showInputBox({
    prompt,
    placeHolder,
    value: currentPath,
    validateInput: validate,
  });
};

/**
 * Displays a message box with the provided message
 *
 * @param {string} prompt - The prompt to display
 * @param {string} placeHolder - The input placeholder
 * @param {string} validate - The validation function
 * @example
 * const name = await getName('Enter a name', 'foo', (name) => {
 *   if (name.length === 0) {
 *     return 'Name cannot be empty';
 * });
 *
 * @returns {Promise<string | undefined>} - The selected name
 */
export const getName = async (
  prompt: string,
  placeHolder: string,
  validate: (name: string) => string | undefined,
): Promise<string | undefined> => {
  return await window.showInputBox({
    prompt,
    placeHolder,
    validateInput: validate,
  });
};

/**
 * Displays a message box with the provided message
 *
 * @param {string[]} items - The list of items to select from
 * @param {string} placeHolder - The input placeholder
 * @example
 * const item = await pickItem(['foo', 'bar'], 'Select an item');
 *
 * @returns {Promise<string | undefined>} - The selected item
 */
export const pickItem = async (
  items: string[],
  placeHolder: string,
): Promise<string | undefined> => {
  return await window.showQuickPick(items, {
    placeHolder,
  });
};

/**
 * Enhanced item with icon and description for QuickPick
 */
interface EnhancedQuickPickItem extends QuickPickItem {
  value: string;
}

/**
 * Displays an enhanced selection box with icons and descriptions
 *
 * @param {Array} items - Array of objects with label, value, icon and description
 * @param {string} placeHolder - The input placeholder
 * @example
 * const item = await pickItemWithIcons([
 *   { label: 'Component', value: 'component', icon: '$(preview)', description: 'Create a new UI component' },
 *   { label: 'Service', value: 'service', icon: '$(gear)', description: 'Create a new service' }
 * ], 'Select item type');
 *
 * @returns {Promise<string | undefined>} - The selected item value
 */
export const pickItemWithIcons = async (
  items: Array<{
    label: string;
    value: string;
    icon?: string;
    description?: string;
  }>,
  placeHolder: string,
): Promise<string | undefined> => {
  // Convert items to EnhancedQuickPickItem format
  const quickPickItems: EnhancedQuickPickItem[] = items.map((item) => ({
    label: item.icon ? `${item.icon} ${item.label}` : item.label,
    value: item.value,
    description: item.description || '',
  }));

  const selectedItem = await window.showQuickPick(quickPickItems, {
    placeHolder,
    matchOnDescription: true,
  });

  return selectedItem?.value;
};

/**
 * Displays a message box with the provided message
 *
 * @param {string} message - The message to display
 * @example
 * await showMessage('Hello, world!');
 *
 * @returns {Promise<void>} - No return value
 */
export const showMessage = async (message: string): Promise<void> => {
  window.showInformationMessage(message);
};

/**
 * Displays a message box with the provided message
 *
 * @param {string} message - The message to display
 * @example
 * await showError('An error occurred');
 *
 * @returns {Promise<void>} - No return value
 */
export const showError = async (message: string): Promise<void> => {
  window.showErrorMessage(message);
};

/**
 * Displays a message box with the provided message
 *
 * @param {string} message - The message to display
 * @example
 * await showWarning('This is a warning');
 *
 * @returns {Promise<void>} - No return value
 */
export const showWarning = async (message: string): Promise<void> => {
  window.showWarningMessage(message);
};
