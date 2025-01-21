import * as vscode from 'vscode';

import {
  Config,
  EXTENSION_DISPLAY_NAME,
  EXTENSION_ID,
  EXTENSION_NAME,
  USER_PUBLISHER,
} from './app/configs';
import {
  FeedbackController,
  FileController,
  ListFilesController,
  TerminalController,
  TransformController,
} from './app/controllers';
import {
  FeedbackProvider,
  ListFilesProvider,
  ListModulesProvider,
  ListRoutesProvider,
} from './app/providers';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.WorkspaceFolder | undefined;

  // Check if there are workspace folders
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    const message = vscode.l10n.t(
      'No workspace folders are open. Please open a workspace folder to use this extension',
    );
    vscode.window.showErrorMessage(message);
    return;
  }

  // Optionally, prompt the user to select a workspace folder if multiple are available
  if (vscode.workspace.workspaceFolders.length === 1) {
    resource = vscode.workspace.workspaceFolders[0];
  } else {
    const placeHolder = vscode.l10n.t(
      'Select a workspace folder to use. This folder will be used to load workspace-specific configuration for the extension',
    );
    const selectedFolder = await vscode.window.showWorkspaceFolderPick({
      placeHolder,
    });

    resource = selectedFolder;
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new Config(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource?.uri),
  );

  // Watch for changes in the configuration
  vscode.workspace.onDidChangeConfiguration((event) => {
    const workspaceConfig = vscode.workspace.getConfiguration(
      EXTENSION_ID,
      resource?.uri,
    );

    if (event.affectsConfiguration(`${EXTENSION_ID}.enable`, resource?.uri)) {
      const isEnabled = workspaceConfig.get<boolean>('enable');

      config.update(workspaceConfig);

      if (isEnabled) {
        const message = vscode.l10n.t('{0} is now enabled and ready to use', [
          EXTENSION_DISPLAY_NAME,
        ]);
        vscode.window.showInformationMessage(message);
      } else {
        const message = vscode.l10n.t('{0} is now disabled', [
          EXTENSION_DISPLAY_NAME,
        ]);
        vscode.window.showInformationMessage(message);
      }
    }

    if (event.affectsConfiguration(EXTENSION_ID, resource?.uri)) {
      config.update(workspaceConfig);
    }
  });

  // -----------------------------------------------------------------
  // Get version of the extension
  // -----------------------------------------------------------------

  // Get the previous version of the extension
  const previousVersion = context.globalState.get('version');
  // Get the current version of the extension
  const currentVersion = context.extension.packageJSON.version;

  // Check if the extension is running for the first time
  if (!previousVersion) {
    const message = vscode.l10n.t(
      'Welcome to {0} version {1}! The extension is now active',
      [EXTENSION_DISPLAY_NAME, currentVersion],
    );
    vscode.window.showInformationMessage(message);

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // Check if the extension has been updated
  if (previousVersion && previousVersion !== currentVersion) {
    const actions: vscode.MessageItem[] = [
      {
        title: vscode.l10n.t('Release Notes'),
      },
      {
        title: vscode.l10n.t('Close'),
      },
    ];

    const message = vscode.l10n.t(
      'New version of {0} is available. Check out the release notes for version {1}',
      [EXTENSION_DISPLAY_NAME, currentVersion],
    );
    vscode.window.showInformationMessage(message, ...actions).then((option) => {
      if (!option) {
        return;
      }

      // Handle the actions
      switch (option?.title) {
        case actions[0].title:
          vscode.env.openExternal(
            vscode.Uri.parse(
              `https://marketplace.visualstudio.com/items/${USER_PUBLISHER}.${EXTENSION_NAME}/changelog`,
            ),
          );
          break;

        default:
          break;
      }
    });

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // -----------------------------------------------------------------
  // Set the context values
  // -----------------------------------------------------------------

  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.terminal.component`,
    config.activateItem.terminal.component,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.terminal.guard`,
    config.activateItem.terminal.guard,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.terminal.pipe`,
    config.activateItem.terminal.pipe,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.terminal.service`,
    config.activateItem.terminal.service,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.class`,
    config.activateItem.file.class,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.component`,
    config.activateItem.file.component,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.directive`,
    config.activateItem.file.directive,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.enum`,
    config.activateItem.file.enum,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.guard`,
    config.activateItem.file.guard,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.interceptor`,
    config.activateItem.file.interceptor,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.interface`,
    config.activateItem.file.interface,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.module`,
    config.activateItem.file.module,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.pipe`,
    config.activateItem.file.pipe,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.resolver`,
    config.activateItem.file.resolver,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.service`,
    config.activateItem.file.service,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.spec`,
    config.activateItem.file.spec,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.terminal.custom`,
    config.activateItem.terminal.custom,
  );
  vscode.commands.executeCommand(
    'setContext',
    `${EXTENSION_ID}.activateItem.file.template`,
    config.activateItem.file.template,
  );

  // -----------------------------------------------------------------
  // Register FileController and commands
  // -----------------------------------------------------------------

  // Create a new FileController
  const fileController = new FileController(config);

  const disposableFileClass = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.class`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateClass(args);
    },
  );
  const disposableFileComponent = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.component`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateComponent(args);
    },
  );
  const disposableFileDirective = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.directive`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateDirective(args);
    },
  );
  const disposableFileEnum = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.enum`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateEnum(args);
    },
  );
  const disposableFileGuard = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.guard`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateGuard(args);
    },
  );
  const disposableFileInterceptor = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.interceptor`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateInterceptor(args);
    },
  );
  const disposableFileInterface = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.interface`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateInterface(args);
    },
  );
  const disposableFileModule = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.module`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateModule(args);
    },
  );
  const disposableFilePipe = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.pipe`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generatePipe(args);
    },
  );
  const disposableFileResolver = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.resolver`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateResolver(args);
    },
  );
  const disposableFileService = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.service`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateService(args);
    },
  );
  const disposableFileTest = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.spec`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateTest(args);
    },
  );
  const disposableFileCustomElement = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.template`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      fileController.generateCustomElement(args);
    },
  );

  // -----------------------------------------------------------------
  // Register TerminalController and commands
  // -----------------------------------------------------------------

  // Create a new TerminalController
  const terminalController = new TerminalController(config);

  const disposableTerminalAnalyticsDisable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.disable`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.analyticsDisable();
    },
  );
  const disposableTerminalAnalyticsEnable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.enable`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.analyticsEnable();
    },
  );
  const disposableTerminalAnalyticsInfo = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.info`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.analyticsInfo();
    },
  );
  const disposableTerminalAnalyticsPrompt = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.prompt`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.analyticsPrompt();
    },
  );
  const disposableTerminalCacheClear = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.clear`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.cacheClear();
    },
  );
  const disposableTerminalCacheDisable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.disable`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.cacheDisable();
    },
  );
  const disposableTerminalCacheEnable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.enable`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.cacheEnable();
    },
  );
  const disposableTerminalCacheInfo = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.info`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.cacheInfo();
    },
  );
  const disposableTerminalComponent = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.component`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.generateComponent(args);
    },
  );
  const disposableTerminalEnvironments = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.environments`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.generateEnvironments();
    },
  );
  const disposableTerminalGuard = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.guard`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.generateGuard(args);
    },
  );
  const disposableTerminalLibrary = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.library`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.generateLibrary();
    },
  );
  const disposableTerminalPipe = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.pipe`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.generatePipe(args);
    },
  );
  const disposableTerminalService = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.service`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.generateService(args);
    },
  );
  const disposableTerminalStart = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.start`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.start();
    },
  );
  const disposableTerminalTest = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.test`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.test();
    },
  );
  const disposableTerminalE2E = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.e2e`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.e2e();
    },
  );
  const disposableTerminalVersion = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.version`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.version();
    },
  );
  const disposableTerminalNewApp = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.new`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.newApp();
    },
  );
  const disposableTerminalCustomElement = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.custom`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      terminalController.generateCustomElement(args);
    },
  );

  // -----------------------------------------------------------------
  // Register TransformController and commands
  // -----------------------------------------------------------------

  // Create a new TransformController
  const transformController = new TransformController();

  const disposableTransformJson2Ts = vscode.commands.registerCommand(
    `${EXTENSION_ID}.transform.json.ts`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      transformController.json2ts();
    },
  );

  // -----------------------------------------------------------------
  // Register ListFilesController
  // -----------------------------------------------------------------

  // Create a new ListFilesController
  const listFilesController = new ListFilesController(config);

  const disposableListOpenFile = vscode.commands.registerCommand(
    `${EXTENSION_ID}.list.openFile`,
    (uri) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      listFilesController.openFile(uri);
    },
  );

  const disposableListGotoLine = vscode.commands.registerCommand(
    `${EXTENSION_ID}.list.gotoLine`,
    (uri, line) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      listFilesController.gotoLine(uri, line);
    },
  );

  // -----------------------------------------------------------------
  // Register ListFilesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListFilesProvider
  const listFilesProvider = new ListFilesProvider();

  // Register the list provider
  const disposableListFilesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listFilesView`,
    {
      treeDataProvider: listFilesProvider,
      showCollapseAll: true,
    },
  );

  const disposableRefreshListFiles = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listFiles.refreshList`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      listFilesProvider.refresh();
    },
  );

  // -----------------------------------------------------------------
  // Register ListRoutesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListRoutesProvider
  const listRoutesProvider = new ListRoutesProvider();

  // Register the list provider
  const disposableListRoutesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listRoutesView`,
    {
      treeDataProvider: listRoutesProvider,
      showCollapseAll: true,
    },
  );

  const disposableRefreshListRoutes = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listRoutes.refreshList`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      listRoutesProvider.refresh();
    },
  );

  // -----------------------------------------------------------------
  // Register ListModulesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListModulesProvider
  const listModulesProvider = new ListModulesProvider();

  // Register the list provider
  const disposableListModulesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listModulesView`,
    {
      treeDataProvider: listModulesProvider,
      showCollapseAll: true,
    },
  );

  const disposableRefreshListModules = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listModules.refreshList`,
    () => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      listModulesProvider.refresh();
    },
  );

  // -----------------------------------------------------------------
  // Register provider events
  // -----------------------------------------------------------------

  vscode.workspace.onDidCreateFiles(() => {
    listFilesProvider.refresh();
    listRoutesProvider.refresh();
    listModulesProvider.refresh();
  });
  vscode.workspace.onDidDeleteFiles(() => {
    listFilesProvider.refresh();
    listRoutesProvider.refresh();
    listModulesProvider.refresh();
  });
  vscode.workspace.onDidRenameFiles(() => {
    listFilesProvider.refresh();
    listRoutesProvider.refresh();
    listModulesProvider.refresh();
  });

  // -----------------------------------------------------------------
  // Register FeedbackProvider and Feedback commands
  // -----------------------------------------------------------------

  // Create a new FeedbackProvider
  const feedbackProvider = new FeedbackProvider(new FeedbackController());

  // Register the feedback provider
  const disposableFeedbackTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.feedbackView`,
    {
      treeDataProvider: feedbackProvider,
    },
  );

  // Register the commands
  const disposableFeedbackAboutUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.aboutUs`,
    () => feedbackProvider.controller.aboutUs(),
  );
  const disposableFeedbackReportIssues = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.reportIssues`,
    () => feedbackProvider.controller.reportIssues(),
  );
  const disposableFeedbackRateUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.rateUs`,
    () => feedbackProvider.controller.rateUs(),
  );
  const disposableFeedbackSupportUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.supportUs`,
    () => feedbackProvider.controller.supportUs(),
  );

  context.subscriptions.push(
    disposableFileClass,
    disposableFileComponent,
    disposableFileDirective,
    disposableFileEnum,
    disposableFileGuard,
    disposableFileInterceptor,
    disposableFileInterface,
    disposableFileModule,
    disposableFilePipe,
    disposableFileResolver,
    disposableFileService,
    disposableFileTest,
    disposableFileCustomElement,
    disposableTerminalAnalyticsDisable,
    disposableTerminalAnalyticsEnable,
    disposableTerminalAnalyticsInfo,
    disposableTerminalAnalyticsPrompt,
    disposableTerminalCacheClear,
    disposableTerminalCacheDisable,
    disposableTerminalCacheEnable,
    disposableTerminalCacheInfo,
    disposableTerminalComponent,
    disposableTerminalEnvironments,
    disposableTerminalGuard,
    disposableTerminalLibrary,
    disposableTerminalPipe,
    disposableTerminalService,
    disposableTerminalStart,
    disposableTerminalTest,
    disposableTerminalE2E,
    disposableTerminalVersion,
    disposableTerminalNewApp,
    disposableTerminalCustomElement,
    disposableTransformJson2Ts,
    disposableListOpenFile,
    disposableListGotoLine,
    disposableListFilesTreeView,
    disposableRefreshListFiles,
    disposableListRoutesTreeView,
    disposableRefreshListRoutes,
    disposableListModulesTreeView,
    disposableRefreshListModules,
    disposableFeedbackTreeView,
    disposableFeedbackAboutUs,
    disposableFeedbackReportIssues,
    disposableFeedbackRateUs,
    disposableFeedbackSupportUs,
  );
}

export function deactivate() {}
