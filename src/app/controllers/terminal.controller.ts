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
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsDisable();
   *
   * @returns {void} - No return value
   */
  analyticsDisable() {
    runCommand('analytics disable', 'ng analytics disable');
  }

  /**
   * Enables analytics.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsEnable();
   *
   * @returns {void} - No return value
   */
  analyticsEnable() {
    runCommand('analytics enable', 'ng analytics enable');
  }

  /**
   * Gets analytics information.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsInfo();
   *
   * @returns {void} - No return value
   */
  analyticsInfo() {
    runCommand('analytics info', 'ng analytics info');
  }

  /**
   * Prompts for analytics.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.analyticsPrompt();
   *
   * @returns {void} - No return value
   */
  analyticsPrompt() {
    runCommand('analytics prompt', 'ng analytics prompt');
  }

  /**
   * Clears the cache.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheClear();
   *
   * @returns {void} - No return value
   */
  cacheClear() {
    runCommand('cache clean', 'ng cache clean');
  }

  /**
   * Disables the cache.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheDisable();
   *
   * @returns {void} - No return value
   */
  cacheDisable() {
    runCommand('cache disable', 'ng cache disable');
  }

  /**
   * Enables the cache.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheEnable();
   *
   * @returns {void} - No return value
   */
  cacheEnable() {
    runCommand('cache enable', 'ng cache enable');
  }

  /**
   * Gets cache information.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.cacheInfo();
   *
   * @returns {void} - No return value
   */
  cacheInfo() {
    runCommand('cache info', 'ng cache info');
  }

  /**
   * Generates a component.
   *
   * @param {Uri} [path] - The path
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateComponent();
   *
   * @returns {void} - No return value
   */
  async generateComponent(path?: Uri) {
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
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateEnvironments();
   *
   * @returns {void} - No return value
   */
  e2e() {
    runCommand('e2e', 'ng e');
  }

  /**
   * Generates environments.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateEnvironments();
   *
   * @returns {void} - No return value
   */
  generateEnvironments() {
    runCommand('generate environments', 'ng g environments');
  }

  /**
   * Generates a guard.
   *
   * @param {Uri} [path] - The path
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateGuard();
   *
   * @returns {void} - No return value
   */
  async generateGuard(path?: Uri) {
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
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateLibrary();
   *
   * @returns {void} - No return value
   */
  async generateLibrary() {
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
   * @param {Uri} [path] - The path
   * @public
   * @memberof TerminalController
   * @example
   * controller.generatePipe();
   *
   * @returns {void} - No return value
   */
  async generatePipe(path?: Uri) {
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
   * @public
   * @memberof TerminalController
   * @example
   * controller.start();
   *
   * @returns {void} - No return value
   */
  start() {
    runCommand('start', 'ng s');
  }

  /**
   * Generates a service.
   *
   * @param {Uri} [path] - The path
   * @public
   * @memberof TerminalController
   * @example
   * controller.generateService();
   *
   * @returns {void} - No return value
   */
  async generateService(path?: Uri) {
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
   * @public
   * @memberof TerminalController
   * @example
   * controller.test();
   *
   * @returns {void} - No return value
   */
  test() {
    runCommand('test', 'ng t');
  }

  /**
   * Displays the version.
   *
   * @public
   * @memberof TerminalController
   * @example
   * controller.version();
   *
   * @returns {void} - No return value
   */
  version() {
    runCommand('version', 'ng v');
  }
}
