import { l10n } from 'vscode';

/**
 * Validation patterns used across the application.
 */

/**
 * Regular expression pattern for validating folder names
 */
export const FOLDER_NAME_PATTERN = /^(?!\/)[^\sÀ-ÿ]+?$/;

/**
 * Message for folder name validation errors
 */
export const FOLDER_NAME_VALIDATION_MESSAGE =
  'The folder name must be a valid name';

/**
 * Regular expression pattern for validating class names
 */
export const CLASS_NAME_PATTERN = /^[A-Z][A-Za-z0-9]{2,}$/;

/**
 * Error message for invalid class names.
 */
export const INVALID_CLASS_NAME_MESSAGE =
  'Invalid format! Class names MUST be declared in PascalCase and have at least 3 characters (e.g. User, AuthService)';

/**
 * Regular expression pattern for validating entity names.
 * Ensures entity names are in camelCase and have at least 1 character.
 */
export const ENTITY_NAME_PATTERN = /^[a-z][A-Za-z0-9-]+$/;

/**
 * Error message for invalid entity names.
 */
export const ENTITY_NAME_VALIDATION_MESSAGE =
  'Invalid format! Entity names MUST be declared in camelCase and have at least 1 character (e.g. user, authService)';

/**
 * Error messages for validation
 */
export const VALIDATION_MESSAGES = {
  // biome-ignore lint/style/useNamingConvention: Use constants for validation messages
  FOLDER_NAME_INVALID: 'folder.name.invalid',
  // biome-ignore lint/style/useNamingConvention: Use constants for validation messages
  CLASS_NAME_INVALID: 'class.name.invalid',
  // biome-ignore lint/style/useNamingConvention: Use constants for validation messages
  ENTITY_NAME_INVALID: 'entity.name.invalid',
};

/**
 * Validates a folder name using the centralized folder name pattern
 *
 * @param path - The path to validate
 * @returns A validation error message if invalid, undefined if valid
 */
export function validateFolderName(path: string): string | undefined {
  if (!FOLDER_NAME_PATTERN.test(path)) {
    return l10n.t(FOLDER_NAME_VALIDATION_MESSAGE);
  }
  return;
}

/**
 * Validates a class name using the centralized class name pattern
 *
 * @param name - The class name to validate
 * @returns A validation error message if invalid, undefined if valid
 */
export function validateClassName(name: string): string | undefined {
  if (!CLASS_NAME_PATTERN.test(name)) {
    return l10n.t(INVALID_CLASS_NAME_MESSAGE);
  }
  return;
}

/**
 * Validates an entity name using the centralized entity name pattern.
 *
 * @param name - The entity name to validate.
 * @returns A validation error message if invalid, undefined if valid.
 */
export function validateEntityName(name: string): string | undefined {
  if (!ENTITY_NAME_PATTERN.test(name)) {
    return l10n.t(ENTITY_NAME_VALIDATION_MESSAGE);
  }
  return;
}
