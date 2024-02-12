import { WorkspaceConfiguration } from 'vscode';

/**
 * The Config class.
 *
 * @class
 * @classdesc The class that represents the configuration of the extension.
 * @export
 * @public
 * @property {WorkspaceConfiguration} config - The workspace configuration
 * @property {string[]} include - The files to include
 * @property {string[]} exclude - The files to exclude
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

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the Config class.
   *
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   */
  constructor(readonly config: WorkspaceConfiguration) {
    this.style = config.get<string>('style') ?? 'css';
    this.standalone = config.get<boolean>('standalone') ?? true;
  }
}
