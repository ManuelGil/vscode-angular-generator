import { WorkspaceConfiguration } from 'vscode';

import { EXCLUDE, INCLUDE, STANDALONE, STYLE, WATCH } from './constants';

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
 * @property {string[]} watch - The files to watch
 * @property {{ apiKey: string; model: string; }} openai - The OpenAI API key
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
    this.style = config.get<string>('style') ?? STYLE;
    this.standalone = config.get<boolean>('standalone') ?? STANDALONE;
    this.include = config.get<string[]>('files.include') ?? INCLUDE;
    this.exclude = config.get<string[]>('files.exclude') ?? EXCLUDE;
    this.watch = config.get<string[]>('watch') ?? WATCH;
  }
}
