import { WorkspaceConfiguration } from 'vscode';

import {
  ACTIVATE_MENU,
  CUSTOM_COMMANDS,
  EXCLUDE,
  INCLUDE,
  MenuInterface,
  SHOW_PATH,
  STANDALONE,
  STYLE,
  WATCH,
} from './constants';

/**
 * The Config class.
 *
 * @class
 * @classdesc The class that represents the configuration of the extension.
 * @export
 * @public
 * @property {WorkspaceConfiguration} config - The workspace configuration
 * @property {string} style - The style file extension
 * @property {boolean} standalone - The standalone option
 * @property {string[]} include - The files to include
 * @property {string[]} exclude - The files to exclude
 * @property {string[]} watch - The files to watch
 * @property {boolean} showPath - Whether to show the path or not
 * @property {object[]} customCommands - The custom commands
 * @property {object} activateItem - Whether to show the menu or not
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
    this.style = config.get<string>('components.style') ?? STYLE;
    this.standalone =
      config.get<boolean>('components.standalone') ?? STANDALONE;
    this.include = config.get<string[]>('files.include') ?? INCLUDE;
    this.exclude = config.get<string[]>('files.exclude') ?? EXCLUDE;
    this.watch = config.get<string[]>('files.watch') ?? WATCH;
    this.showPath = config.get<boolean>('files.showPath') ?? SHOW_PATH;
    this.customCommands =
      config.get<object[]>('submenu.customCommands') ?? CUSTOM_COMMANDS;
    this.activateItem =
      config.get<MenuInterface>('submenu.activateItem') ?? ACTIVATE_MENU;
  }
}
