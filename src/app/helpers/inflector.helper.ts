/**
 * Converts a string to camelCase, removing dashes/underscores and capitalizing each subsequent word.
 * Useful for generating variable or property names in Angular projects.
 *
 * @param {string} str - The string to convert to camelCase.
 * @returns {string} The camelCased version of the input string.
 * @example
 * camelize('foo-bar'); // 'fooBar'
 */
export const camelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');
};

/**
 * Converts a string to PascalCase, capitalizing the first letter of each word and removing spaces/underscores.
 * Useful for generating class, interface, or type names in Angular projects.
 *
 * @param {string} str - The string to convert to PascalCase.
 * @returns {string} The PascalCase version of the input string.
 * @example
 * pascalize('foo bar'); // 'FooBar'
 */
export const pascalize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '');
};

/**
 * Converts a string to snake_case, replacing spaces, dashes, or camel/pascal case transitions with underscores and using lowercase.
 * Useful for generating constant names or file names in Angular projects.
 *
 * @param {string} str - The string to convert to snake_case.
 * @returns {string} The snake_case version of the input string.
 * @example
 * underscore('foo bar'); // 'foo_bar'
 */
export const underscore = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : `_${word.toLowerCase()}`,
    )
    .replace(/\s+/g, '_');
};

/**
 * Converts a camelCase, PascalCase, or space-separated string to snake_case (lowercase with underscores).
 * Useful for transforming identifiers to a consistent, human-readable format in Angular projects.
 *
 * @param {string} str - The string to convert to snake_case.
 * @returns {string} The snake_case version of the input string.
 * @example
 * decamelize('fooBar'); // 'foo_bar'
 */
export const decamelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : `_${word.toLowerCase()}`,
    )
    .replace(/\s+/g, '_');
};

/**
 * Converts a camelCase, PascalCase, snake_case or dash-separated string to a human-readable form (words separated by spaces, capitalized).
 * Useful for displaying variable names or identifiers in UI.
 *
 * @param {string} str - The string to humanize.
 * @returns {string} The human-readable version of the input string.
 * @example
 * humanize('fooBar_baz'); // 'Foo Bar Baz'
 */
export const humanize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toUpperCase() : ` ${word.toLowerCase()}`,
    )
    .replace(/\s+/g, ' ');
};

/**
 * Checks if a string is pluralizable.
 *
 * @param {string} str - The string to check
 * @example
 * isPluralizable('foo');
 *
 * @returns {boolean} - Whether the string is pluralizable
 */
export const isPluralizable = (str: string): boolean => {
  return str.endsWith('s');
};

/**
 * Converts a camelCase, PascalCase, or space-separated string to kebab-case (lowercase with dashes).
 * This is useful for generating Angular file and selector names.
 *
 * @param {string} inputString - The string to convert.
 * @returns {string} The kebab-case version of the input string.
 */
export const dasherize = (inputString: string): string => {
  return inputString
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : `-${word.toLowerCase()}`,
    )
    .replace(/\s+/g, '-');
};

/**
 * Converts a number to its English ordinal string representation (e.g., 1st, 2nd, 3rd, 4th).
 * This is useful for formatting display values in UI or code generation.
 *
 * @param {number} num - The number to convert to ordinal form.
 * @returns {string} The ordinal string (e.g., '1st', '2nd').
 */
export const ordinal = (num: number): string => {
  const j = num % 10;
  const k = num % 100;

  if (j === 1 && k !== 11) {
    return `${num}st`;
  }
  if (j === 2 && k !== 12) {
    return `${num}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${num}rd`;
  }
  return `${num}th`;
};

/**
 * Returns the ordinalized string for a given number (e.g., 1st, 2nd, 3rd, 4th).
 *
 * @param {number} num - The number to ordinalize.
 * @returns {string} The ordinalized number as a string.
 */
export const ordinalize = (num: number): string => {
  return `${num}${ordinal(num)}`;
};

/**
 * Converts a singular English noun to its plural form using basic rules.
 * Useful for generating entity names, labels, or code artifacts in Angular projects.
 *
 * @param {string} str - The string to pluralize.
 * @returns {string} The pluralized string.
 * @example
 * pluralize('cat'); // 'cats'
 */
export const pluralize = (str: string): string => {
  if (str.endsWith('y')) {
    return str.slice(0, -1) + 'ies';
  }
  if (str.endsWith('s')) {
    return str;
  }
  return str + 's';
};

/**
 * Converts a plural English noun to its singular form using basic rules.
 * Useful for generating entity names, labels, or code artifacts in Angular projects.
 *
 * @param {string} str - The string to singularize.
 * @returns {string} The singularized string.
 */
export const singularize = (str: string): string => {
  if (str.endsWith('ies')) {
    return str.slice(0, -3) + 'y';
  }
  if (str.endsWith('s')) {
    return str.slice(0, -1);
  }
  return str;
};

/**
 * Converts a string to Title Case, capitalizing the first letter of each word and replacing dashes/underscores with spaces.
 * Useful for formatting labels, UI strings, or class names in Angular projects.
 *
 * @param {string} str - The string to convert to title case.
 * @returns {string} The title-cased version of the input string.
 * @example
 * titleize('foo bar'); // 'Foo Bar'
 */
export const titleize = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
