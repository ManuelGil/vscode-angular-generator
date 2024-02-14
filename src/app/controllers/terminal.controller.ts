import { Uri, window } from 'vscode';

import { Config } from '../configs';
import { getName, getPath, getRelativePath, runCommand } from '../helpers';

// Import the Config and helper functions

/**
 * The TerminalController class.
 *
 * @class
 * @classdesc The class that represents the example controller.
 * @export
 * @public
 * @property {Config} config - The configuration
 * @example
 * const controller = new TerminalController(config);
 */
export class TerminalController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the TerminalController class.
   *
   * @constructor
   * @param {Config} config - The configuration
   * @public
   * @memberof TerminalController
   */
  constructor(private readonly config: Config) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Disables analytics.
   *
   * @function analyticsDisable
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsDisable();
   *
   * @returns {void} - No return value
   */
  analyticsDisable(): void {
    runCommand('analytics disable', 'ng analytics disable');
  }

  /**
   * Enables analytics.
   *
   * @function analyticsEnable
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsEnable();
   *
   * @returns {void} - No return value
   */
  analyticsEnable(): void {
    runCommand('analytics enable', 'ng analytics enable');
  }

  /**
   * Gets analytics information.
   *
   * @function analyticsInfo
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsInfo();
   *
   * @returns {void} - No return value
   */
  analyticsInfo(): void {
    runCommand('analytics info', 'ng analytics info');
  }

  /**
   * Prompts for analytics.
   *
   * @function analyticsPrompt
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsPrompt();
   *
   * @returns {void} - No return value
   */
  analyticsPrompt(): void {
    runCommand('analytics prompt', 'ng analytics prompt');
  }

  /**
   * Clears the cache.
   *
   * @function cacheClear
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheClear();
   *
   * @returns {void} - No return value
   */
  cacheClear(): void {
    runCommand('cache clean', 'ng cache clean');
  }

  /**
   * Disables the cache.
   *
   * @function cacheDisable
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheDisable();
   *
   * @returns {void} - No return value
   */
  cacheDisable(): void {
    runCommand('cache disable', 'ng cache disable');
  }

  /**
   * Enables the cache.
   *
   * @function cacheEnable
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheEnable();
   *
   * @returns {void} - No return value
   */
  cacheEnable(): void {
    runCommand('cache enable', 'ng cache enable');
  }

  /**
   * Gets cache information.
   *
   * @function cacheInfo
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheInfo();
   *
   * @returns {void} - No return value
   */
  cacheInfo(): void {
    runCommand('cache info', 'ng cache info');
  }

  /**
   * Generates a component.
   *
   * @function generateComponent
   * @param {Uri} [path] - The path
   * @public
   * @async
   * @memberof TerminalController
   * @example
   * controller.generateComponent();
   *
   * @returns {Promise<void>} - No return value
   */
  async generateComponent(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    let folder = await getPath(
      'Component name',
      'Component name. E.g. src/app/modules/users, modules/users, modules/projects...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    const items = [
      {
        label: '--dry-run',
        description:
          'Run through and reports activity without writing out results.',
      },
      {
        label: '--force',
        description: 'Force overwriting of existing files.',
      },
      {
        label: '--flat',
        description:
          'Create the new files at the top level of the current project.',
      },
      {
        label: '--skip-import',
        description: 'Do not import this component into the owning NgModule.',
      },
      {
        label: '--skip-selector',
        description:
          'Specifies if the component should have a selector or not.',
      },
      {
        label: '--skip-tests',
        description:
          'Do not create "spec.ts" test files for the new component.',
      },
      {
        label: '--standalone',
        description: 'Whether the generated component is standalone.',
        picked: this.config.standalone,
      },
    ];

    let options: any = [];
    let isStandalone = false;

    options = await window.showQuickPick(items, {
      placeHolder: 'Select the options for the component generation (optional)',
      canPickMany: true,
    });

    isStandalone = !!options.find((item: any) => item.label === '--standalone');
    options = options.filter((item: any) => item.label !== '--standalone');

    folder = folder.replace('src/app/', '');

    const command =
      'ng g c ' +
      folder +
      (this.config.style ? ' --style ' + this.config.style : '') +
      (isStandalone ? ' --standalone true' : ' --standalone false') +
      (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

    runCommand('generate component', command);
  }

  /**
   * Generates environments.
   *
   * @function e2e
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateEnvironments();
   *
   * @returns {void} - No return value
   */
  e2e(): void {
    runCommand('e2e', 'ng e');
  }

  /**
   * Generates environments.
   *
   * @function generateEnvironments
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateEnvironments();
   *
   * @returns {void} - No return value
   */
  generateEnvironments(): void {
    runCommand('generate environments', 'ng g environments');
  }

  /**
   * Generates a guard.
   *
   * @function generateGuard
   * @param {Uri} [path] - The path
   * @public
   * @async
   * @memberof TerminalController
   * @example
   * controller.generateGuard();
   *
   * @returns {Promise<void>} - No return value
   */
  async generateGuard(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    let folder = await getPath(
      'Guard name',
      'Guard name. E.g. guards/auth, guards/jwt...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    const items = [
      {
        label: '--dry-run',
        description:
          'Run through and reports activity without writing out results.',
      },
      {
        label: '--force',
        description: 'Force overwriting of existing files.',
      },
      {
        label: '--skip-tests',
        description: 'Do not create "spec.ts" test files for the new guard.',
      },
    ];

    let options: any = [];

    options = await window.showQuickPick(items, {
      placeHolder: 'Select the options for the guard generation (optional)',
      canPickMany: true,
    });

    folder = folder.replace('src/app/', '');

    const command =
      'ng g g ' +
      folder +
      (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

    runCommand('generate guard', command);
  }

  /**
   * Generates a library.
   *
   * @function generateLibrary
   * @public
   * @async
   * @memberof TerminalController
   * @example
   * controller.generateLibrary();
   *
   * @returns {Promise<void>} - No return value
   */
  async generateLibrary(): Promise<void> {
    // Get the path to the folder
    let folder = await getName(
      'Library name',
      'Library name. E.g. users, projects...',
      (name: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(name)) {
          return 'The library name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    const items = [
      {
        label: '--dry-run',
        description:
          'Run through and reports activity without writing out results.',
      },
      {
        label: '--force',
        description: 'Forces overwriting of files.',
      },
      {
        label: '--skip-install',
        description: 'Do not install dependency packages.',
      },
      {
        label: '--skip-package-json',
        description: 'Do not add dependencies to the "package.json" file.',
      },
      {
        label: '--skip-ts-config',
        description:
          'Do not update "tsconfig.json" to add a path mapping for the new library. The path mapping is needed to use the library in an app, but can be disabled here to simplify development.',
      },
      {
        label: '--standalone',
        description:
          'Creates a library based upon the standalone API, without NgModules.',
        picked: this.config.standalone,
      },
    ];

    let options: any = [];
    let isStandalone = false;

    options = await window.showQuickPick(items, {
      placeHolder: 'Select the options for the library generation (optional)',
      canPickMany: true,
    });

    isStandalone = !!options.find((item: any) => item.label === '--standalone');
    options = options.filter((item: any) => item.label !== '--standalone');

    const command =
      'ng g lib ' +
      folder +
      (isStandalone ? ' --standalone true' : ' --standalone false') +
      (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

    runCommand('generate library', command);
  }

  /**
   * Generates a pipe.
   *
   * @function generatePipe
   * @param {Uri} [path] - The path
   * @public
   * @async
   * @memberof TerminalController
   * @example
   * controller.generatePipe();
   *
   * @returns {Promise<void>} - No return value
   */
  async generatePipe(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    let folder = await getPath(
      'Pipe name',
      'Pipe name. E.g. modules/transform-letters, modules/searh-user, modules/search-projects...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    const items = [
      {
        label: '--dry-run',
        description:
          'Run through and reports activity without writing out results.',
      },
      {
        label: '--force',
        description: 'Force overwriting of existing files.',
      },
      {
        label: '--flat',
        description:
          'When true (the default) creates files at the top level of the project.',
      },
      {
        label: '--skip-import',
        description: 'Do not import this pipe into the owning NgModule.',
      },
      {
        label: '--skip-tests',
        description: 'Do not create "spec.ts" test files for the new pipe.',
      },
      {
        label: '--standalone',
        description: 'Whether the generated pipe is standalone.',
        picked: this.config.standalone,
      },
    ];

    let options: any = [];
    let isStandalone = false;

    options = await window.showQuickPick(items, {
      placeHolder: 'Select the options for the pipe generation (optional)',
      canPickMany: true,
    });

    isStandalone = !!options.find((item: any) => item.label === '--standalone');
    options = options.filter((item: any) => item.label !== '--standalone');

    folder = folder.replace('src/app/', '');

    const command =
      'ng g p ' +
      folder +
      (isStandalone ? ' --standalone true' : ' --standalone false') +
      (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

    runCommand('generate pipe', command);
  }

  /**
   * Starts the server.
   *
   * @function start
   * @public
   * @memberof TerminalController
   * @example
   * controller.start();
   *
   * @returns {void} - No return value
   */
  start(): void {
    runCommand('start', 'ng s');
  }

  /**
   * Generates a service.
   *
   * @function generateService
   * @param {Uri} [path] - The path
   * @public
   * @async
   * @memberof TerminalController
   * @example
   * controller.generateService();
   *
   * @returns {Promise<void>} - No return value
   */
  async generateService(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    let folder = await getPath(
      'Service name',
      'Service name. E.g. services/auth, services/jwt...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    const items = [
      {
        label: '--dry-run',
        description:
          'Run through and reports activity without writing out results.',
      },
      {
        label: '--force',
        description: 'Force overwriting of existing files.',
      },
      {
        label: '--flat',
        description:
          'When true (the default) creates files at the top level of the project.',
      },
      {
        label: '--skip-tests',
        description: 'Do not create "spec.ts" test files for the new service.',
      },
    ];

    let options: any = [];

    options = await window.showQuickPick(items, {
      placeHolder: 'Select the options for the service generation (optional)',
      canPickMany: true,
    });

    folder = folder.replace('src/app/', '');

    const command =
      'ng g s ' +
      folder +
      (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

    runCommand('generate service', command);
  }

  /**
   * Runs the tests.
   *
   * @function test
   * @public
   * @memberof TerminalController
   * @example
   * controller.test();
   *
   * @returns {void} - No return value
   */
  test(): void {
    runCommand('test', 'ng t');
  }

  /**
   * Displays the version.
   *
   * @function version
   * @public
   * @memberof TerminalController
   * @example
   * controller.version();
   *
   * @returns {void} - No return value
   */
  version(): void {
    runCommand('version', 'ng v');
  }
}
