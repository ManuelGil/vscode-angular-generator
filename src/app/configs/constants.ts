/**
 * EXTENSION_ID: The unique identifier of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_ID);
 *
 * @returns {string} - The unique identifier of the extension
 */
export const EXTENSION_ID: string = 'angular';

/**
 * EXTENSION_NAME: The repository ID of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_NAME);
 *
 * @returns {string} - The repository ID of the extension
 */
export const EXTENSION_NAME: string = 'vscode-angular-generator';

/**
 * EXTENSION_DISPLAY_NAME: The name of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_DISPLAY_NAME);
 *
 * @returns {string} - The name of the extension
 */
export const EXTENSION_DISPLAY_NAME: string = 'Angular File Generator';

/**
 * USER_NAME: The githubUsername of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(USER_NAME);
 *
 * @returns {string} - The githubUsername of the extension
 */
export const USER_NAME: string = 'ManuelGil';

/**
 * USER_PUBLISHER: The publisher of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(USER_PUBLISHER);
 *
 * @returns {string} - The publisher of the extension
 */
export const USER_PUBLISHER: string = 'imgildev';

/**
 * EXTENSION_REPOSITORY_URL: The repository URL of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_REPOSITORY_URL);
 *
 * @returns {string} - The repository URL of the extension
 */
export const EXTENSION_REPOSITORY_URL: string = `https://github.com/${USER_NAME}/${EXTENSION_NAME}`;

/**
 * MARKETPLACE_URL: The marketplace URL of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(MARKETPLACE_URL);
 *
 * @returns {string} - The marketplace URL of the extension
 */
export const EXTENSION_MARKETPLACE_URL: string = `https://marketplace.visualstudio.com/items?itemName=${USER_PUBLISHER}.${EXTENSION_NAME}`;

/**
 * EXTENSION_SPONSOR_URL: The sponsor URL of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_SPONSOR_URL);
 *
 * @returns {string} - The sponsor URL of the extension
 */
export const EXTENSION_SPONSOR_URL: string =
  'https://github.com/sponsors/ManuelGil';

/**
 * EXTENSION_PAYPAL_URL: The PayPal URL of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_PAYPAL_URL);
 *
 * @returns {string} - The PayPal URL of the extension
 */
export const EXTENSION_PAYPAL_URL: string =
  'https://www.paypal.com/paypalme/ManuelFGil';

/**
 * STYLE: The style file extension when generating a new component.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(STYLE);
 *
 * @returns {string} - The style file extension
 */
export const STYLE: string = 'css';

/**
 * STANDALONE: The standalone option when generating a new component.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(STANDALONE);
 *
 * @returns {boolean} - The standalone flag
 */
export const STANDALONE: boolean = true;

/**
 * INCLUDE: The files to include.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(INCLUDE);
 *
 * @returns {string[]} - The files to include
 */
export const INCLUDE: string[] = ['ts'];
/**
 * EXCLUDE: The files to exclude.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXCLUDE);
 *
 * @returns {string[]} - The files to exclude
 */
export const EXCLUDE: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/out/**',
  '**/build/**',
  '**/.*/**',
];

/**
 * WATCH: The files to watch.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(WATCH);
 *
 * @returns {string[]} - The files to watch
 */
export const WATCH: string[] = ['modules', 'components', 'services'];

/**
 * SHOW_PATH: Whether to show the path or not.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(SHOW_PATH);
 *
 * @returns {boolean} - Whether to show the path or not
 */
export const SHOW_PATH: boolean = true;

/**
 * CUSTOM_COMMANDS: The custom commands.
 * @type {object[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(CUSTOM_COMMANDS);
 *
 * @returns {object[]} - The custom commands
 */
export const CUSTOM_COMMANDS: object[] = [
  {
    'name': 'Custom Component',
    'command': 'ng g c',
    'args': '--style css --standalone true --inline-style --inline-template',
  },
];

/**
 * CUSTOM_TEMPLATES: The custom templates.
 * @type {object[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(CUSTOM_TEMPLATES);
 *
 * @returns {object[]} - The custom templates
 */
export const CUSTOM_TEMPLATES: object[] = [
  {
    'name': 'Custom Component',
    'description': 'Generate a custom component',
    'type': 'component',
    'template': [
      "import { Component, OnInit } from '@angular/core';",
      '',
      '@Component({',
      "  selector: 'app-custom-component',",
      "  templateUrl: './custom-component.component.html',",
      "  styleUrls: ['./custom-component.component.css']",
      '})',
      'export class CustomComponentComponent implements OnInit {',
      '',
      '  constructor() { }',
      '',
      '  ngOnInit(): void {',
      '  }',
      '',
      '}',
    ],
  },
];

/**
 * MenuIterface: The menu options.
 * @type {object}
 * @public
 * @memberof Constants
 * @example
 * console.log(MenuIterface);
 *
 * @returns {object} - The menu options
 */
export interface MenuInterface {
  terminal: {
    component: boolean;
    guard: boolean;
    pipe: boolean;
    service: boolean;
    custom: boolean;
  };
  file: {
    class: boolean;
    component: boolean;
    directive: boolean;
    enum: boolean;
    guard: boolean;
    interceptor: boolean;
    interface: boolean;
    module: boolean;
    pipe: boolean;
    resolver: boolean;
    service: boolean;
    spec: boolean;
    template: boolean;
  };
}

/**
 * ACTIVATE_MENU: Whether to show the menu or not.
 * @type {object}
 * @public
 * @memberof Constants
 * @example
 * console.log(ACTIVATE_MENU);
 *
 * @returns {object} - Whether to show the menu or not
 */
export const ACTIVATE_MENU: MenuInterface = {
  terminal: {
    component: true,
    guard: true,
    pipe: true,
    service: true,
    custom: true,
  },
  file: {
    class: true,
    component: true,
    directive: true,
    enum: true,
    guard: true,
    interceptor: true,
    interface: true,
    module: true,
    pipe: true,
    resolver: true,
    service: true,
    spec: true,
    template: true,
  },
};

/**
 * SKIP_FOLDER_CONFIRMATION: Whether to skip the folder confirmation or not.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(SKIP_FOLDER_CONFIRMATION);
 *
 * @returns {boolean} - Whether to skip the folder confirmation or not
 */
export const SKIP_FOLDER_CONFIRMATION: boolean = false;
