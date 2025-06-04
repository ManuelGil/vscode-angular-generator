import { statSync } from 'fs';
import { resolve } from 'path';
import { Uri, l10n, window, workspace } from 'vscode';

// Import the Config and helper functions
import { Config } from '../configs';
import { getName, getPath, runCommand, showError } from '../helpers';

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
    runCommand('analytics disable', 'ng analytics disable', this.config.cwd);
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
    runCommand('analytics enable', 'ng analytics enable', this.config.cwd);
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
    runCommand('analytics info', 'ng analytics info', this.config.cwd);
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
    runCommand('analytics prompt', 'ng analytics prompt', this.config.cwd);
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
    runCommand('cache clean', 'ng cache clean', this.config.cwd);
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
    runCommand('cache disable', 'ng cache disable', this.config.cwd);
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
    runCommand('cache enable', 'ng cache enable', this.config.cwd);
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
    runCommand('cache info', 'ng cache info', this.config.cwd);
  }

  /**
   * Creates a new application.
   *
   * @function newApp
   * @public
   * @async
   * @memberof TerminalController
   * @example
   * controller.newApp();
   *
   * @returns {Promise<void>} - No return value
   */
  async newApp(): Promise<void> {
    // Get the path to the folder
    const applicationName = await getPath(
      l10n.t('Enter the application name'),
      'Application name.',
      '',
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return 'The application name must be a valid name';
        }
        return;
      },
    );

    if (!applicationName) {
      const message = l10n.t('Operation cancelled!');
      showError(message);
      return;
    }

    const items = [
      {
        label: 'Dry Run',
        description: '--dry-run',
        detail: 'Run through and reports activity without writing out results.',
      },
      {
        label: 'Force',
        description: '--force',
        detail: 'Force overwriting of existing files.',
      },
      {
        label: 'Inline Style',
        description: '--inline-style',
        detail:
          'Include styles inline in the component TS file. By default, an external styles file is created and referenced in the component TypeScript file.',
      },
      {
        label: 'Inline Template',
        description: '--inline-template',
        detail:
          'Include template inline in the component.ts file. By default, an external template file is created and referenced in the component TypeScript file.',
      },
      {
        label: 'Prefix',
        description: '--prefix',
        detail:
          'The prefix to apply to generated selectors for the initial project.',
      },
      {
        label: 'Routing',
        description: '--routing',
        detail: 'Enable routing in the initial project.',
      },
      {
        label: 'Skip Git',
        description: '--skip-git',
        detail: 'Do not initialize a git repository.',
      },
      {
        label: 'Skip Install',
        description: '--skip-install',
        detail: 'Do not install dependency packages.',
      },
      {
        label: 'Skip Tests',
        description: '--skip-tests',
        detail: 'Do not generate "spec.ts" test files for the new project.',
      },
      {
        label: 'SSR',
        description: '--ssr',
        detail:
          'Creates an application with Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering) enabled.',
      },
      {
        label: 'Standalone',
        description: '--standalone',
        detail:
          'Creates an application based upon the standalone API, without NgModules.',
        picked: this.config.standalone,
      },
      {
        label: 'View Encapsulation',
        description: '--view-encapsulation',
        detail:
          'The view encapsulation strategy to use in the initial project.',
      },
    ];

    let options: any = [];
    let extras: any = [];
    let isStandalone = false;

    options = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the options for the component generation (optional)',
      ),
      canPickMany: true,
    });

    if (options.find((item: any) => item.description === '--prefix')) {
      const prefix = await window.showInputBox({
        placeHolder: l10n.t(
          'The prefix to apply to generated selectors for the initial project.',
        ),
      });

      if (prefix) {
        extras.push('--prefix ' + prefix);
        options = options.filter(
          (item: any) => item.description !== '--prefix',
        );
      }
    }

    if (
      options.find((item: any) => item.description === '--view-encapsulation')
    ) {
      const encapsulation = await window.showQuickPick(
        ['Emulated', 'None', 'ShadowDom'],
        {
          placeHolder: l10n.t(
            'The view encapsulation strategy to use in the initial project.',
          ),
        },
      );

      if (encapsulation) {
        extras.push('--view-encapsulation ' + encapsulation);
        options = options.filter(
          (item: any) => item.description !== '--view-encapsulation',
        );
      }
    }

    if (options.find((item: any) => item.description === '--standalone')) {
      isStandalone = true;
      options = options.filter(
        (item: any) => item.description !== '--standalone',
      );
    }

    const command =
      'ng n ' +
      applicationName +
      (this.config.style ? ' --style ' + this.config.style : '') +
      (isStandalone ? ' --standalone true' : ' --standalone false') +
      (options
        ? ' ' + options.map((item: any) => item.description).join(' ')
        : '') +
      (extras ? ' ' + extras.join(' ') : '');

    runCommand('new application', command, this.config.cwd);
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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    let folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    if (this.config.cwd) {
      const cwd = workspace.asRelativePath(Uri.file(this.config.cwd).path);
      folderPath = folderPath.replace(cwd, '');

      if (folderPath.startsWith('/')) {
        folderPath = folderPath.substring(1);
      }
    }

    // Get the path to the folder
    let folder = await getPath(
      l10n.t('Enter the component name'),
      'Component name. E.g. src/app/modules/users, modules/users, modules/projects...',
      `${folderPath}/`,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (!folder) {
      const message = l10n.t('Operation cancelled!');
      showError(message);
      return;
    }

    const items = [
      {
        label: 'Dry Run',
        description: '--dry-run',
        detail: 'Run through and reports activity without writing out results.',
      },
      {
        label: 'Force',
        description: '--force',
        detail: 'Force overwriting of existing files.',
      },
      {
        label: 'Change Detection',
        description: '--change-detection',
        detail: 'The change detection strategy to use in the new component.',
      },
      {
        label: 'Display Block',
        description: '--display-block',
        detail:
          'Specifies if the style will contain `:host { display: block; }`.',
      },
      {
        label: 'Flat',
        description: '--flat',
        detail: 'Create the new files at the top level of the current project.',
      },
      {
        label: 'Inline Style',
        description: '--inline-style',
        detail:
          'Include styles inline in the component.ts file. Only CSS styles can be included inline. By default, an external styles file is created and referenced in the component.ts file.',
      },
      {
        label: 'Inline Template',
        description: '--inline-template',
        detail:
          'Include template inline in the component.ts file. By default, an external template file is created and referenced in the component.ts file.',
      },
      {
        label: 'Prefix',
        description: '--prefix',
        detail: 'The prefix to apply to the generated component selector.',
      },
      {
        label: 'Selector',
        description: '--selector',
        detail: 'The HTML selector to use for this component.',
      },
      {
        label: 'Skip Import',
        description: '--skip-import',
        detail: 'Do not import this component into the owning NgModule.',
      },
      {
        label: 'Skip Selector',
        description: '--skip-selector',
        detail: 'Specifies if the component should have a selector or not.',
      },
      {
        label: 'Skip Tests',
        description: '--skip-tests',
        detail: 'Do not create "spec.ts" test files for the new component.',
      },
      {
        label: 'Standalone',
        description: '--standalone',
        detail: 'Whether the generated component is standalone.',
        picked: this.config.standalone,
      },
      {
        label: 'Type (Only for Angular version 20+)',
        description: '--type',
        detail:
          "Append a custom type to the component's filename. For example, if you set the type to `container`, the file will be named `my-component.container.ts`.",
      },
      {
        label: 'View Encapsulation',
        description: '--view-encapsulation',
        detail: 'The view encapsulation strategy to use in the new component.',
      },
    ];

    let options: any = [];
    let extras: any = [];
    let isStandalone = false;

    options = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the options for the component generation (optional)',
      ),
      canPickMany: true,
    });

    if (options.find((item: any) => item.description === '--type')) {
      const type = await window.showInputBox({
        placeHolder: l10n.t('The type to append to the component filename'),
      });

      if (type) {
        extras.push('--type ' + type);
        options = options.filter((item: any) => item.description !== '--type');
      }
    }

    if (
      options.find((item: any) => item.description === '--change-detection')
    ) {
      const detection = await window.showQuickPick(['Default', 'OnPush'], {
        placeHolder: l10n.t(
          'The change detection strategy to use in the new component',
        ),
      });

      if (detection) {
        extras.push('--change-detection ' + detection);
        options = options.filter(
          (item: any) => item.description !== '--change-detection',
        );
      }
    }

    if (options.find((item: any) => item.description === '--prefix')) {
      const prefix = await window.showInputBox({
        placeHolder: l10n.t(
          'The prefix to apply to the generated component selector',
        ),
      });

      if (prefix) {
        extras.push('--prefix ' + prefix);
        options = options.filter(
          (item: any) => item.description !== '--prefix',
        );
      }
    }

    if (options.find((item: any) => item.description === '--selector')) {
      const selector = await window.showInputBox({
        placeHolder: 'The HTML selector to use for this component',
      });

      if (selector) {
        extras.push('--selector ' + selector);
        options = options.filter(
          (item: any) => item.description !== '--selector',
        );
      }
    }

    if (
      options.find((item: any) => item.description === '--view-encapsulation')
    ) {
      const encapsulation = await window.showQuickPick(
        ['Emulated', 'None', 'ShadowDom'],
        {
          placeHolder: l10n.t(
            'The view encapsulation strategy to use in the new component',
          ),
        },
      );

      if (encapsulation) {
        extras.push('--view-encapsulation ' + encapsulation);
        options = options.filter(
          (item: any) => item.description !== '--view-encapsulation',
        );
      }
    }

    if (options.find((item: any) => item.description === '--standalone')) {
      isStandalone = true;
      options = options.filter(
        (item: any) => item.description !== '--standalone',
      );
    }

    folder = folder.replace('src/app/', '');

    const command =
      'ng g c ' +
      folder +
      (this.config.style ? ' --style ' + this.config.style : '') +
      (isStandalone ? ' --standalone true' : ' --standalone false') +
      (options
        ? ' ' + options.map((item: any) => item.description).join(' ')
        : '') +
      (extras ? ' ' + extras.join(' ') : '');

    runCommand('generate component', command, this.config.cwd);
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
    runCommand('e2e', 'ng e', this.config.cwd);
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
    runCommand('generate environments', 'ng g environments', this.config.cwd);
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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    let folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    if (this.config.cwd) {
      const cwd = workspace.asRelativePath(Uri.file(this.config.cwd).path);
      folderPath = folderPath.replace(cwd, '');

      if (folderPath.startsWith('/')) {
        folderPath = folderPath.substring(1);
      }
    }

    // Get the path to the folder
    let folder = await getPath(
      l10n.t('Enter the guard name'),
      'Guard name. E.g. guards/auth, guards/jwt...',
      `${folderPath}/`,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (!folder) {
      const message = l10n.t('Operation cancelled!');
      showError(message);
      return;
    }

    const items = [
      {
        label: 'Dry Run',
        description: '--dry-run',
        detail: 'Run through and reports activity without writing out results.',
      },
      {
        label: 'Force',
        description: '--force',
        detail: 'Force overwriting of existing files.',
      },
      {
        label: 'Flat',
        description: '--skip-tests',
        detail: 'Do not create "spec.ts" test files for the new guard.',
      },
      {
        label: 'Functional',
        description: '--functional',
        detail: 'Specifies whether to generate a guard as a function.',
        picked: true,
      },
      {
        label: 'Skip Tests',
        description: '--skip-tests',
        detail: 'Do not create "spec.ts" test files for the new guard.',
      },
      {
        label: 'Type Separator (Only for Angular version 20+)',
        description: '--type-separator',
        detail:
          "The separator character to use before the type within the generated file's name. For example, if you set the option to `.`, the file will be named `example.guard.ts`.",
      },
    ];

    let options: any = [];
    let extras: any = [];
    let isFunctional = false;

    options = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the options for the guard generation (optional)',
      ),
      canPickMany: true,
    });

    if (options.find((item: any) => item.description === '--type-separator')) {
      const separator = await window.showQuickPick(['-', '.'], {
        placeHolder: l10n.t(
          "The type separator to use before the type within the generated file's name.",
        ),
      });

      if (separator) {
        extras.push('--type-separator ' + separator);
        options = options.filter(
          (item: any) => item.description !== '--type-separator',
        );
      }
    }

    if (options.find((item: any) => item.description === '--functional')) {
      isFunctional = true;
      options = options.filter(
        (item: any) => item.description !== '--functional',
      );
    }

    folder = folder.replace('src/app/', '');

    const command =
      'ng g g ' +
      folder +
      (isFunctional ? ' --functional true' : ' --functional false') +
      (options
        ? ' ' + options.map((item: any) => item.description).join(' ')
        : '') +
      (extras ? ' ' + extras.join(' ') : '');

    runCommand('generate guard', command, this.config.cwd);
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
      l10n.t('Enter the library name'),
      'Library name. E.g. users, projects...',
      (name: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(name)) {
          return 'The library name must be a valid name';
        }
        return;
      },
    );

    if (!folder) {
      const message = l10n.t('Operation cancelled!');
      showError(message);
      return;
    }

    const items = [
      {
        label: 'Dry Run',
        description: '--dry-run',
        detail: 'Run through and reports activity without writing out results.',
      },
      {
        label: 'Force',
        description: '--force',
        detail: 'Forces overwriting of files.',
      },
      {
        label: 'Prefix',
        description: '--prefix',
        detail: 'A prefix to apply to generated selectors.',
      },
      {
        label: 'Publishable',
        description: '--publishable',
        detail:
          'Create a publishable library that can be packaged and published.',
      },
      {
        label: 'Skip Install',
        description: '--skip-install',
        detail: 'Do not install dependency packages.',
      },
      {
        label: 'Skip Package JSON',
        description: '--skip-package-json',
        detail: 'Do not add dependencies to the "package.json" file.',
      },
      {
        label: 'Skip Ts Config',
        description: '--skip-ts-config',
        detail:
          'Do not update "tsconfig.json" to add a path mapping for the new library. The path mapping is needed to use the library in an app, but can be disabled here to simplify development.',
      },
      {
        label: 'Standalone',
        description: '--standalone',
        detail:
          'Creates a library based upon the standalone API, without NgModules.',
        picked: this.config.standalone,
      },
    ];

    let options: any = [];
    let isStandalone = false;
    let extras: any = [];

    options = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the options for the library generation (optional)',
      ),
      canPickMany: true,
    });

    if (options.find((item: any) => item.description === '--prefix')) {
      const prefix = await window.showInputBox({
        placeHolder: 'A prefix to apply to generated selectors',
      });

      if (prefix) {
        extras.push('--prefix ' + prefix);
        options = options.filter(
          (item: any) => item.description !== '--prefix',
        );
      }
    }

    if (options.find((item: any) => item.description === '--standalone')) {
      isStandalone = true;
      options = options.filter(
        (item: any) => item.description !== '--standalone',
      );
    }

    const command =
      'ng g lib ' +
      folder +
      (isStandalone ? ' --standalone true' : ' --standalone false') +
      (options
        ? ' ' + options.map((item: any) => item.description).join(' ')
        : '');

    runCommand('generate library', command, this.config.cwd);
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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    let folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    if (this.config.cwd) {
      const cwd = workspace.asRelativePath(Uri.file(this.config.cwd).path);
      folderPath = folderPath.replace(cwd, '');

      if (folderPath.startsWith('/')) {
        folderPath = folderPath.substring(1);
      }
    }

    // Get the path to the folder
    let folder = await getPath(
      l10n.t('Enter the pipe name'),
      'Pipe name. E.g. modules/transform-letters, modules/searh-user, modules/search-projects...',
      `${folderPath}/`,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (!folder) {
      const message = l10n.t('Operation cancelled!');
      showError(message);
      return;
    }

    const items = [
      {
        label: 'Dry Run',
        description: '--dry-run',
        detail: 'Run through and reports activity without writing out results.',
      },
      {
        label: 'Force',
        description: '--force',
        detail: 'Force overwriting of existing files.',
      },
      {
        label: 'Flat',
        description: '--flat',
        detail:
          'When true (the default) creates files at the top level of the project.',
      },
      {
        label: 'Skip Import',
        description: '--skip-import',
        detail: 'Do not import this pipe into the owning NgModule.',
      },
      {
        label: 'Skip Tests',
        description: '--skip-tests',
        detail: 'Do not create "spec.ts" test files for the new pipe.',
      },
      {
        label: 'Standalone',
        description: '--standalone',
        detail: 'Whether the generated pipe is standalone.',
        picked: this.config.standalone,
      },

      {
        label: 'Type Separator (Only for Angular version 20+)',
        description: '--type-separator',
        detail:
          "The separator character to use before the type within the generated file's name. For example, if you set the option to `.`, the file will be named `example.pipe.ts`",
      },
    ];

    let options: any = [];
    let extras: any = [];
    let isStandalone = false;

    options = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the options for the pipe generation (optional)',
      ),
      canPickMany: true,
    });

    if (options.find((item: any) => item.description === '--type-separator')) {
      const separator = await window.showQuickPick(['-', '.'], {
        placeHolder: l10n.t(
          "The type separator to use before the type within the generated file's name",
        ),
      });

      if (separator) {
        extras.push('--type-separator ' + separator);
        options = options.filter(
          (item: any) => item.description !== '--type-separator',
        );
      }
    }

    if (options.find((item: any) => item.description === '--standalone')) {
      isStandalone = true;
      options = options.filter(
        (item: any) => item.description !== '--standalone',
      );
    }

    folder = folder.replace('src/app/', '');

    const command =
      'ng g p ' +
      folder +
      (isStandalone ? ' --standalone true' : ' --standalone false') +
      (options
        ? ' ' + options.map((item: any) => item.description).join(' ')
        : '') +
      (extras ? ' ' + extras.join(' ') : '');

    runCommand('generate pipe', command, this.config.cwd);
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
    runCommand('start', 'ng s', this.config.cwd);
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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    let folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    if (this.config.cwd) {
      const cwd = workspace.asRelativePath(Uri.file(this.config.cwd).path);
      folderPath = folderPath.replace(cwd, '');

      if (folderPath.startsWith('/')) {
        folderPath = folderPath.substring(1);
      }
    }

    // Get the path to the folder
    let folder = await getPath(
      l10n.t('Enter the service name'),
      'Service name. E.g. services/auth, services/jwt...',
      `${folderPath}/`,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (!folder) {
      const message = l10n.t('Operation cancelled!');
      showError(message);
      return;
    }

    const items = [
      {
        label: 'Dry Run',
        description: '--dry-run',
        detail: 'Run through and reports activity without writing out results.',
      },
      {
        label: 'Force',
        description: '--force',
        detail: 'Force overwriting of existing files.',
      },
      {
        label: 'Flat',
        description: '--flat',
        detail:
          'When true (the default) creates files at the top level of the project.',
      },
      {
        label: 'Skip Tests',
        description: '--skip-tests',
        detail: 'Do not create "spec.ts" test files for the new service.',
      },
      {
        label: 'Type (Only for Angular version 20+)',
        description: '--type',
        detail:
          "Append a custom type to the service's filename. For example, if you set the type to `service`, the file will be named `my-service.service.ts`.",
      },
    ];

    let options: any = [];
    let extras: any = [];

    options = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the options for the service generation (optional)',
      ),
      canPickMany: true,
    });

    if (options.find((item: any) => item.description === '--type')) {
      const type = await window.showInputBox({
        placeHolder: l10n.t('The type to append to the service filename'),
      });

      if (type) {
        extras.push('--type ' + type);
        options = options.filter((item: any) => item.description !== '--type');
      }
    }

    folder = folder.replace('src/app/', '');

    const command =
      'ng g s ' +
      folder +
      (options
        ? ' ' + options.map((item: any) => item.description).join(' ')
        : '') +
      (extras ? ' ' + extras.join(' ') : '');

    runCommand('generate service', command, this.config.cwd);
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
    runCommand('test', 'ng t', this.config.cwd);
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
    runCommand('version', 'ng v', this.config.cwd);
  }

  /**
   * Generates a custom element.
   *
   * @function generateCustomElement
   * @param {Uri} [path] - The path
   * @public
   * @async
   * @memberof TerminalController
   * @example
   * controller.generateCustomElement();
   *
   * @returns {Promise<void>} - No return value
   */
  async generateCustomElement(path?: Uri): Promise<void> {
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    let folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    if (this.config.cwd) {
      const cwd = workspace.asRelativePath(Uri.file(this.config.cwd).path);
      folderPath = folderPath.replace(cwd, '');

      if (folderPath.startsWith('/')) {
        folderPath = folderPath.substring(1);
      }
    }

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!skipFolderConfirmation) {
      // Get the path to the folder
      let folder = await getPath(
        l10n.t('Enter the element name'),
        'Element name. E.g. src/app/modules/users, modules/users, modules/projects...',
        `${folderPath}/`,
        (path: string) => {
          if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
            return 'The folder name must be a valid name';
          }
          return;
        },
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled!');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    if (this.config.customCommands.length === 0) {
      const message = l10n.t(
        'The custom commands list is empty. Please add custom commands to the configuration',
      );
      window.showErrorMessage(message);
      return;
    }

    const items = this.config.customCommands.map((item: any) => {
      return {
        label: item.name,
        description: item.command,
        detail: item.args,
      };
    });

    const option = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the template for the custom element generation',
      ),
    });

    if (!option) {
      const message = l10n.t('Operation cancelled!');
      showError(message);
      return;
    }

    if (folder) {
      folder = folder.replace('src/app/', '');
    }

    const command = `${option.description} ${folder} ${option.detail}`;

    runCommand('generate custom element', command, this.config.cwd);
  }
}
