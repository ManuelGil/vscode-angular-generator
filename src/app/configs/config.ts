import { WorkspaceConfiguration, workspace } from 'vscode';

import {
  ACTIVATE_MENU,
  CUSTOM_COMMANDS,
  CUSTOM_TEMPLATES,
  EXCLUDE,
  INCLUDE,
  MenuInterface,
  OMIT_SUFFIX,
  SHOW_PATH,
  SKIP_FOLDER_CONFIRMATION,
  STANDALONE,
  STYLE,
  TYPE_SEPARATOR,
  WATCH,
} from './constants';

/**
 * Configuration settings and utilities for the Angular VSCode extension.
 * Provides a single source of truth for extension configuration, used throughout the codebase.
 * All exported constants, functions, and classes are documented with JSDoc for clarity and maintainability.
 * @property {string} style - The style file extension
 * @property {boolean} standalone - The standalone option
 * @property {string[]} include - The files to include
 * @property {string[]} exclude - The files to exclude
 * @property {string[]} watch - The files to watch
 * @property {boolean} showPath - Whether to show the path or not
 * @property {object[]} customCommands - The custom commands
 * @property {object[]} templates - The custom templates
 * @property {object} activateItem - Whether to show the menu or not
 * @property {boolean} skipFolderConfirmation - Whether to skip the folder confirmation or not
 * @example
 * const config = new Config(workspace.getConfiguration());
 * console.log(config.include);
 * console.log(config.exclude);
 */
export class Config {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties
  /**
   * The enable option.
   *
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * console.log(config.enable);
   */
  enable: boolean;
  /**
   * The style file extension.
   *
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * console.log(config.style);
   */
  style: string;
  /**
   * The standalone option.
   *
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * console.log(config.standalone);
   */
  standalone: boolean;
  /**
   * The files to include.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.include);
   */
  include: string[];
  /**
   * The files to exclude.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.exclude);
   */
  exclude: string[];
  /**
   * The files to watch.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.watch);
   */
  watch: string[];
  /**
   * Whether to show the path or not.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.showPath);
   */
  showPath: boolean;
  /**
   * The current working directory.
   * @type {string | undefined}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.cwd);
   */
  cwd: string | undefined;
  /**
   * The custom commands.
   * @type {object[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.customCommands);
   * console.log(config.customCommands[0].name);
   * console.log(config.customCommands[0].command);
   * console.log(config.customCommands[0].args);
   */
  customCommands: object[];
  /**
   * The custom templates.
   * @type {object[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.customTemplates);
   * console.log(config.customTemplates[0].name);
   * console.log(config.customTemplates[0].description);
   * console.log(config.customTemplates[0].type);
   * console.log(config.customTemplates[0].template);
   */
  templates: object[];
  /**
   * Whether to show the menu or not.
   * @type {MenuInterface}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.activateItem);
   * console.log(config.activateItem.terminal.components);
   */
  activateItem: MenuInterface;
  /**
   * Whether to skip the folder confirmation or not.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.skipFolderConfirmation);
   */
  skipFolderConfirmation: boolean;

  /**
   * Whether to omit the suffix or not.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.omitSuffix);
   */
  omitSuffix: boolean;

  /**
   * The type separator.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.typeSeparator);
   */
  typeSeparator: string;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the Config class.
   *
   * @constructor
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   */
  constructor(readonly config: WorkspaceConfiguration) {
    this.enable = config.get<boolean>('enable', true);
    this.style = config.get<string>('components.style', STYLE);
    this.standalone = config.get<boolean>('components.standalone', STANDALONE);
    this.include = config.get<string[]>('files.include', INCLUDE);
    this.exclude = config.get<string[]>('files.exclude', EXCLUDE);
    this.watch = config.get<string[]>('files.watch', WATCH);
    this.showPath = config.get<boolean>('files.showPath', SHOW_PATH);
    this.cwd = config.get<string | undefined>(
      'terminal.cwd',
      workspace.workspaceFolders?.[0].uri.fsPath,
    );
    this.customCommands = config.get<object[]>(
      'submenu.customCommands',
      CUSTOM_COMMANDS,
    );
    this.templates = config.get<object[]>(
      'submenu.templates',
      CUSTOM_TEMPLATES,
    );
    this.activateItem = config.get<MenuInterface>(
      'submenu.activateItem',
      ACTIVATE_MENU,
    );
    this.skipFolderConfirmation = config.get<boolean>(
      'fileGenerator.skipFolderConfirmation',
      SKIP_FOLDER_CONFIRMATION,
    );
    this.omitSuffix = config.get<boolean>(
      'fileGenerator.omitSuffix',
      OMIT_SUFFIX,
    );
    this.typeSeparator = config.get<string>(
      'fileGenerator.typeSeparator',
      TYPE_SEPARATOR,
    );
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The update method.
   *
   * @function update
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * config.update(workspace.getConfiguration());
   */
  update(config: WorkspaceConfiguration): void {
    this.enable = config.get<boolean>('enable', this.enable);
    this.style = config.get<string>('components.style', this.style);
    this.standalone = config.get<boolean>(
      'components.standalone',
      this.standalone,
    );
    this.include = config.get<string[]>('files.include', this.include);
    this.exclude = config.get<string[]>('files.exclude', this.exclude);
    this.watch = config.get<string[]>('files.watch', this.watch);
    this.showPath = config.get<boolean>('files.showPath', this.showPath);
    this.cwd = config.get<string | undefined>('terminal.cwd', this.cwd);
    this.customCommands = config.get<object[]>(
      'submenu.customCommands',
      this.customCommands,
    );
    this.templates = config.get<object[]>('submenu.templates', this.templates);
    this.activateItem = config.get<MenuInterface>(
      'submenu.activateItem',
      this.activateItem,
    );
    this.skipFolderConfirmation = config.get<boolean>(
      'fileGenerator.skipFolderConfirmation',
      this.skipFolderConfirmation,
    );
    this.omitSuffix = config.get<boolean>(
      'fileGenerator.omitSuffix',
      this.omitSuffix,
    );
    this.typeSeparator = config.get<string>(
      'fileGenerator.typeSeparator',
      this.typeSeparator,
    );
  }
}
