/**
 * Runtime encapsulation for the Angular VSCode extension.
 * Owns configuration state, command registration, workspace selection, and version tracking.
 * Instantiated and controlled by extension.ts activation flow.
 *
 * @file extension.runtime.ts
 * @author ManuelGil
 */

import {
  commands,
  ExtensionContext,
  env,
  l10n,
  MessageItem,
  Uri,
  WorkspaceFolder,
  window,
  workspace,
} from 'vscode';
import { VSCodeMarketplaceClient } from 'vscode-marketplace-client';

import {
  CommandIds,
  Config,
  ContextKeys,
  EXTENSION_DISPLAY_NAME,
  EXTENSION_ID,
  EXTENSION_NAME,
  EXTENSION_REPOSITORY_URL,
  GlobalStateKeys,
  USER_PUBLISHER,
  ViewIds,
} from './app/configs';
import {
  FeedbackController,
  FileController,
  ListFilesController,
  TerminalController,
  TransformController,
} from './app/controllers';
import { clearCache } from './app/helpers';
import {
  FeedbackProvider,
  ListFilesProvider,
  ListModulesProvider,
  ListRoutesProvider,
} from './app/providers';

/**
 * Orchestrates the full lifecycle of the extension: workspace selection,
 * configuration, version checks, command registration, tree-view providers,
 * and file watchers.
 *
 * Usage follows a two-phase pattern: {@link initialize} resolves the workspace
 * and configuration, then {@link start} registers all VSCode contributions.
 */
export class ExtensionRuntime {
  private warningShown = false;
  private config!: Config;
  private readonly providers: Array<{ refresh: () => void }> = [];

  constructor(private readonly context: ExtensionContext) {}

  /**
   * Initializes the extension runtime.
   * Selects workspace, loads configuration, and handles version notifications.
   * Must complete successfully before start() is called.
   */
  async initialize(): Promise<boolean> {
    const workspace = await this.selectWorkspaceFolder();

    if (!workspace) {
      return false;
    }

    this.initializeConfiguration(workspace);

    if (!this.isExtensionEnabled()) {
      return false;
    }

    this.startVersionChecks();

    return true;
  }

  /**
   * Starts the extension by registering all commands and providers.
   * Only called after successful initialization.
   */
  start(): void {
    this.setContextKeys();
    this.registerWorkspaceCommands();
    this.registerFileCommands();
    this.registerTerminalCommands();
    this.registerTransformCommands();
    this.registerListCommands();
    this.registerTreeViews();
    this.registerFileWatchers();
    this.registerFeedbackCommands();
  }

  /**
   * Starts version related checks without blocking extension activation.
   * Local notifications are fast and run immediately, while the marketplace
   * check runs in the background because it requires a network request.
   */
  private startVersionChecks(): void {
    void this.handleLocalVersionNotifications();
    void this.checkMarketplaceVersion();
  }

  /**
   * Returns the version declared in the extension package.json.
   * If the version cannot be resolved, a fallback value is returned.
   */
  private getCurrentVersion(): string {
    return this.context.extension.packageJSON?.version ?? '0.0.0';
  }

  /**
   * Handles version notifications that depend only on local information.
   * This includes first activation messages and update notifications.
   */
  private async handleLocalVersionNotifications(): Promise<void> {
    const previousVersion = this.context.globalState.get<string>(
      GlobalStateKeys.Version,
    );

    const currentVersion = this.getCurrentVersion();

    // First activation of the extension
    if (!previousVersion) {
      const message = l10n.t(
        'Welcome to {0} version {1}! The extension is now active',
        EXTENSION_DISPLAY_NAME,
        currentVersion,
      );

      window.showInformationMessage(message);

      await this.context.globalState.update(
        GlobalStateKeys.Version,
        currentVersion,
      );

      return;
    }

    // Extension has been updated
    if (previousVersion !== currentVersion) {
      const actions: MessageItem[] = [
        { title: l10n.t('Release Notes') },
        { title: l10n.t('Dismiss') },
      ];

      const message = l10n.t(
        "The {0} extension has been updated. Check out what's new in version {1}",
        EXTENSION_DISPLAY_NAME,
        currentVersion,
      );

      const option = await window.showInformationMessage(message, ...actions);

      // Open the changelog in the marketplace if requested
      if (option?.title === actions[0].title) {
        const changelogUrl = `${EXTENSION_REPOSITORY_URL}/blob/main/CHANGELOG.md`;
        env.openExternal(Uri.parse(changelogUrl));
      }

      // Persist the new version locally
      await this.context.globalState.update(
        GlobalStateKeys.Version,
        currentVersion,
      );
    }
  }

  /**
   * Checks the VS Code Marketplace for a newer extension version.
   * This operation requires a network request and therefore runs in the background.
   */
  private async checkMarketplaceVersion(): Promise<void> {
    const currentVersion = this.getCurrentVersion();

    try {
      const latestVersion = await VSCodeMarketplaceClient.getLatestVersion(
        USER_PUBLISHER,
        EXTENSION_NAME,
      );

      // No action required if the extension is already up to date
      if (latestVersion === currentVersion) {
        return;
      }

      const actions: MessageItem[] = [
        { title: l10n.t('Update Now') },
        { title: l10n.t('Dismiss') },
      ];

      const message = l10n.t(
        'A new version of {0} is available. Update to version {1} now',
        EXTENSION_DISPLAY_NAME,
        latestVersion,
      );

      const option = await window.showInformationMessage(message, ...actions);

      // Trigger the VSCode command to install the new version
      if (option?.title === actions[0].title) {
        await commands.executeCommand(
          'workbench.extensions.action.install.anotherVersion',
          `${USER_PUBLISHER}.${EXTENSION_NAME}`,
        );
      }
    } catch (error) {
      // Marketplace queries may fail due to network issues
      console.error('Error retrieving extension version:', error);
    }
  }

  /**
   * Selects the workspace folder to use for the extension.
   * VSCode does not guarantee a workspace folder exists during activation,
   * so this method explicitly handles missing workspace scenarios.
   */
  private async selectWorkspaceFolder(): Promise<WorkspaceFolder | undefined> {
    const workspaceFolders = workspace.workspaceFolders;

    // Check if there are workspace folders
    if (!workspaceFolders || workspaceFolders.length === 0) {
      const message = l10n.t(
        '{0}: No workspace folders are open. Please open a workspace folder to use this extension',
        EXTENSION_DISPLAY_NAME,
      );
      window.showErrorMessage(message);

      return undefined;
    }

    // Try to load previously selected workspace folder from global state
    const previousFolderUri = this.context.globalState.get<string>(
      GlobalStateKeys.WorkspaceFolder,
    );
    let previousFolder: WorkspaceFolder | undefined;

    // Find the workspace folder by URI
    if (previousFolderUri) {
      previousFolder = workspaceFolders.find(
        (folder) => folder.uri.toString() === previousFolderUri,
      );
    }

    // Determine the workspace folder to use
    // Only one workspace folder available
    if (workspaceFolders.length === 1) {
      return workspaceFolders[0];
    }

    // Use previously selected workspace folder if available
    if (previousFolder) {
      // Notify the user which workspace is being used
      window.showInformationMessage(
        l10n.t('Using workspace folder: {0}', previousFolder.name),
      );

      return previousFolder;
    }

    // Multiple workspace folders and no previous selection
    const placeHolder = l10n.t(
      '{0}: Select a workspace folder to use. This folder will be used to load workspace-specific configuration for the extension',
      EXTENSION_DISPLAY_NAME,
    );
    const selectedFolder = await window.showWorkspaceFolderPick({
      placeHolder,
    });

    // Remember the selection for future use
    if (selectedFolder) {
      this.context.globalState.update(
        GlobalStateKeys.WorkspaceFolder,
        selectedFolder.uri.toString(),
      );
    }

    return selectedFolder;
  }

  /**
   * Initializes configuration and sets up a listener for configuration changes.
   * The listener updates context keys and notifies users when enable state changes.
   */
  private initializeConfiguration(workspaceFolder: WorkspaceFolder): void {
    this.config = new Config(
      workspace.getConfiguration(EXTENSION_ID, workspaceFolder.uri),
    );
    this.config.workspaceRoot = workspaceFolder.uri.fsPath;

    const disposableConfigChange = workspace.onDidChangeConfiguration(
      (event) => {
        const workspaceConfig = workspace.getConfiguration(
          EXTENSION_ID,
          workspaceFolder.uri,
        );

        if (
          event.affectsConfiguration(
            `${EXTENSION_ID}.enable`,
            workspaceFolder.uri,
          )
        ) {
          const isEnabled = workspaceConfig.get<boolean>('enable');

          this.config.update(workspaceConfig);

          if (isEnabled) {
            const message = l10n.t(
              'The {0} extension is now enabled and ready to use',
              EXTENSION_DISPLAY_NAME,
            );
            window.showInformationMessage(message);
          } else {
            const message = l10n.t(
              'The {0} extension is now disabled',
              EXTENSION_DISPLAY_NAME,
            );
            window.showInformationMessage(message);
          }
        }

        if (event.affectsConfiguration(EXTENSION_ID, workspaceFolder.uri)) {
          this.config.update(workspaceConfig);
        }
      },
    );

    this.context.subscriptions.push(disposableConfigChange);
  }

  /**
   * Checks if the extension is enabled based on the current configuration.
   * If disabled, shows a warning message to the user (only once).
   *
   * @returns true if the extension is enabled, false otherwise
   */
  private isExtensionEnabled(): boolean {
    const isEnabled = this.config.enable;

    if (isEnabled) {
      this.warningShown = false;
      return true;
    }

    if (!this.warningShown) {
      window.showErrorMessage(
        l10n.t(
          'The {0} extension is disabled in settings. Enable it to use its features',
          EXTENSION_DISPLAY_NAME,
        ),
      );
      this.warningShown = true;
    }

    return false;
  }

  /**
   * Sets VSCode context keys based on configuration.
   * These keys control menu item visibility in package.json.
   */
  private setContextKeys(): void {
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemTerminalComponent}`,
      this.config.activateItem.terminal.component,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemTerminalGuard}`,
      this.config.activateItem.terminal.guard,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemTerminalPipe}`,
      this.config.activateItem.terminal.pipe,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemTerminalService}`,
      this.config.activateItem.terminal.service,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileClass}`,
      this.config.activateItem.file.class,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileComponent}`,
      this.config.activateItem.file.component,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileDirective}`,
      this.config.activateItem.file.directive,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileEnum}`,
      this.config.activateItem.file.enum,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileGuard}`,
      this.config.activateItem.file.guard,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileInterceptor}`,
      this.config.activateItem.file.interceptor,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileInterface}`,
      this.config.activateItem.file.interface,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileModule}`,
      this.config.activateItem.file.module,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFilePipe}`,
      this.config.activateItem.file.pipe,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileResolver}`,
      this.config.activateItem.file.resolver,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileService}`,
      this.config.activateItem.file.service,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileSpec}`,
      this.config.activateItem.file.spec,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemTerminalCustom}`,
      this.config.activateItem.terminal.custom,
    );
    commands.executeCommand(
      'setContext',
      `${EXTENSION_ID}.${ContextKeys.ActivateItemFileTemplate}`,
      this.config.activateItem.file.template,
    );
  }

  /**
   * Registers a VSCode command that is gated by the extension's enabled state.
   * If the extension is disabled when the command is invoked, the handler is skipped.
   */
  private registerCommand(
    id: string,
    handler: (...args: any[]) => void | Promise<any>,
  ) {
    return commands.registerCommand(id, (...args: any[]) => {
      if (!this.isExtensionEnabled()) {
        return;
      }

      return handler(...args);
    });
  }

  /** Registers the command that lets users switch the active workspace folder. */
  private registerWorkspaceCommands(): void {
    const disposableChangeWorkspace = commands.registerCommand(
      `${EXTENSION_ID}.${CommandIds.ChangeWorkspace}`,
      async () => {
        const placeHolder = l10n.t('Select a workspace folder to use');
        const selectedFolder = await window.showWorkspaceFolderPick({
          placeHolder,
        });

        if (selectedFolder) {
          this.context.globalState.update(
            GlobalStateKeys.WorkspaceFolder,
            selectedFolder.uri.toString(),
          );

          const workspaceConfig = workspace.getConfiguration(
            EXTENSION_ID,
            selectedFolder.uri,
          );
          this.config.update(workspaceConfig);
          this.config.workspaceRoot = selectedFolder.uri.fsPath;

          window.showInformationMessage(
            l10n.t('Switched to workspace folder: {0}', selectedFolder.name),
          );
        }
      },
    );

    this.context.subscriptions.push(disposableChangeWorkspace);
  }

  /** Registers all file-generation commands (class, controller, service, etc.). */
  private registerFileCommands(): void {
    const fileController = new FileController(this.config);

    const disabledMessage = l10n.t(
      'The {0} extension is disabled in settings. Enable it to use its features',
      EXTENSION_DISPLAY_NAME,
    );

    const fileCommands = [
      {
        id: CommandIds.FileClass,
        handler: (args: any) => fileController.generateClass(args),
      },
      {
        id: CommandIds.FileComponent,
        handler: (args: any) => fileController.generateComponent(args),
      },
      {
        id: CommandIds.FileDirective,
        handler: (args: any) => fileController.generateDirective(args),
      },
      {
        id: CommandIds.FileEnum,
        handler: (args: any) => fileController.generateEnum(args),
      },
      {
        id: CommandIds.FileGuard,
        handler: (args: any) => fileController.generateGuard(args),
      },
      {
        id: CommandIds.FileInterceptor,
        handler: (args: any) => fileController.generateInterceptor(args),
      },
      {
        id: CommandIds.FileInterface,
        handler: (args: any) => fileController.generateInterface(args),
      },
      {
        id: CommandIds.FileModule,
        handler: (args: any) => fileController.generateModule(args),
      },
      {
        id: CommandIds.FilePipe,
        handler: (args: any) => fileController.generatePipe(args),
      },
      {
        id: CommandIds.FileResolver,
        handler: (args: any) => fileController.generateResolver(args),
      },
      {
        id: CommandIds.FileService,
        handler: (args: any) => fileController.generateService(args),
      },
      {
        id: CommandIds.FileSpec,
        handler: (args: any) => fileController.generateTest(args),
      },
      {
        id: CommandIds.FileTemplate,
        handler: (args: any) => fileController.generateCustomElement(args),
      },
    ];

    const fileDisposables = fileCommands.map(({ id, handler }) => {
      return commands.registerCommand(`${EXTENSION_ID}.${id}`, (args: any) => {
        if (!this.config.enable) {
          window.showErrorMessage(disabledMessage);
          return;
        }
        handler(args);
      });
    });

    this.context.subscriptions.push(...fileDisposables);
  }

  /** Registers all NestJS CLI terminal commands (generate, start, etc.). */
  private registerTerminalCommands(): void {
    const terminalController = new TerminalController(this.config);

    const disabledMessage = l10n.t(
      'The {0} extension is disabled in settings. Enable it to use its features',
      EXTENSION_DISPLAY_NAME,
    );

    const terminalCommands = [
      {
        id: CommandIds.TerminalAnalyticsDisable,
        handler: () => terminalController.analyticsDisable(),
      },
      {
        id: CommandIds.TerminalAnalyticsEnable,
        handler: () => terminalController.analyticsEnable(),
      },
      {
        id: CommandIds.TerminalAnalyticsInfo,
        handler: () => terminalController.analyticsInfo(),
      },
      {
        id: CommandIds.TerminalAnalyticsPrompt,
        handler: () => terminalController.analyticsPrompt(),
      },
      {
        id: CommandIds.TerminalCacheClear,
        handler: () => terminalController.cacheClear(),
      },
      {
        id: CommandIds.TerminalCacheDisable,
        handler: () => terminalController.cacheDisable(),
      },
      {
        id: CommandIds.TerminalCacheEnable,
        handler: () => terminalController.cacheEnable(),
      },
      {
        id: CommandIds.TerminalCacheInfo,
        handler: () => terminalController.cacheInfo(),
      },
      {
        id: CommandIds.TerminalComponent,
        handler: (args: any) => terminalController.generateComponent(args),
      },
      {
        id: CommandIds.TerminalEnvironments,
        handler: () => terminalController.generateEnvironments(),
      },
      {
        id: CommandIds.TerminalGuard,
        handler: (args: any) => terminalController.generateGuard(args),
      },
      {
        id: CommandIds.TerminalLibrary,
        handler: () => terminalController.generateLibrary(),
      },
      {
        id: CommandIds.TerminalPipe,
        handler: (args: any) => terminalController.generatePipe(args),
      },
      {
        id: CommandIds.TerminalService,
        handler: (args: any) => terminalController.generateService(args),
      },
      {
        id: CommandIds.TerminalStart,
        handler: () => terminalController.start(),
      },
      {
        id: CommandIds.TerminalTest,
        handler: () => terminalController.test(),
      },
      {
        id: CommandIds.TerminalE2E,
        handler: () => terminalController.e2e(),
      },
      {
        id: CommandIds.TerminalVersion,
        handler: () => terminalController.version(),
      },
      {
        id: CommandIds.TerminalNew,
        handler: () => terminalController.newApp(),
      },
      {
        id: CommandIds.TerminalCustom,
        handler: (args: any) => terminalController.generateCustomElement(args),
      },
    ];

    const terminalDisposables = terminalCommands.map(({ id, handler }) => {
      return commands.registerCommand(`${EXTENSION_ID}.${id}`, (args?: any) => {
        if (!this.config.enable) {
          window.showErrorMessage(disabledMessage);
          return;
        }
        handler(args);
      });
    });

    this.context.subscriptions.push(...terminalDisposables);
  }

  /** Registers data-transformation commands (e.g. JSON to TypeScript). */
  private registerTransformCommands(): void {
    const transformController = new TransformController();

    const disabledMessage = l10n.t(
      'The {0} extension is disabled in settings. Enable it to use its features',
      EXTENSION_DISPLAY_NAME,
    );

    const transformCommands = [
      {
        id: CommandIds.TransformJsonToTs,
        handler: () => transformController.json2ts(),
      },
    ];

    const transformDisposables = transformCommands.map(({ id, handler }) => {
      return commands.registerCommand(`${EXTENSION_ID}.${id}`, () => {
        if (!this.config.enable) {
          window.showErrorMessage(disabledMessage);
          return;
        }
        handler();
      });
    });

    this.context.subscriptions.push(...transformDisposables);
  }

  /** Registers commands for opening files and navigating to lines from tree views. */
  private registerListCommands(): void {
    const listFilesController = new ListFilesController(this.config);

    const disabledMessage = l10n.t(
      'The {0} extension is disabled in settings. Enable it to use its features',
      EXTENSION_DISPLAY_NAME,
    );

    const disposableListOpenFile = commands.registerCommand(
      `${EXTENSION_ID}.${CommandIds.ListOpenFile}`,
      (uri: any) => {
        if (!this.config.enable) {
          window.showErrorMessage(disabledMessage);
          return;
        }
        listFilesController.openFile(uri);
      },
    );

    const disposableListGotoLine = commands.registerCommand(
      `${EXTENSION_ID}.${CommandIds.ListGotoLine}`,
      (uri: any, line: any) => {
        if (!this.config.enable) {
          window.showErrorMessage(disabledMessage);
          return;
        }
        listFilesController.gotoLine(uri, line);
      },
    );

    this.context.subscriptions.push(
      disposableListOpenFile,
      disposableListGotoLine,
    );
  }

  /** Creates sidebar tree views (files, modules, entities, DTOs, methods) and their refresh commands. */
  private registerTreeViews(): void {
    const listFilesProvider = new ListFilesProvider();

    const disposableListFilesTreeView = window.createTreeView(
      `${EXTENSION_ID}.${ViewIds.ListFilesView}`,
      {
        treeDataProvider: listFilesProvider,
        showCollapseAll: true,
      },
    );

    const listRoutesProvider = new ListRoutesProvider();

    const disposableListRoutesTreeView = window.createTreeView(
      `${EXTENSION_ID}.${ViewIds.ListRoutesView}`,
      {
        treeDataProvider: listRoutesProvider,
        showCollapseAll: true,
      },
    );

    const listModulesProvider = new ListModulesProvider();

    const disposableListModulesTreeView = window.createTreeView(
      `${EXTENSION_ID}.${ViewIds.ListModulesView}`,
      {
        treeDataProvider: listModulesProvider,
        showCollapseAll: true,
      },
    );

    const viewRefreshCommands = [
      {
        id: CommandIds.ListFilesRefresh,
        handler: () => listFilesProvider.refresh(),
      },
      {
        id: CommandIds.ListRoutesRefresh,
        handler: () => listRoutesProvider.refresh(),
      },
      {
        id: CommandIds.ListModulesRefresh,
        handler: () => listModulesProvider.refresh(),
      },
    ];

    const disabledMessage = l10n.t(
      'The {0} extension is disabled in settings. Enable it to use its features',
      EXTENSION_DISPLAY_NAME,
    );

    const viewRefreshDisposables = viewRefreshCommands.map(
      ({ id, handler }) => {
        return commands.registerCommand(`${EXTENSION_ID}.${id}`, () => {
          if (!this.config.enable) {
            window.showErrorMessage(disabledMessage);
            return;
          }
          handler();
        });
      },
    );

    const refreshAllProviders = () => {
      listFilesProvider.refresh();
      listRoutesProvider.refresh();
      listModulesProvider.refresh();
    };

    const disposableCreateFiles =
      workspace.onDidCreateFiles(refreshAllProviders);
    const disposableDeleteFiles =
      workspace.onDidDeleteFiles(refreshAllProviders);
    const disposableRenameFiles =
      workspace.onDidRenameFiles(refreshAllProviders);

    this.providers.push(
      listFilesProvider,
      listRoutesProvider,
      listModulesProvider,
    );

    this.context.subscriptions.push(
      listFilesProvider,
      disposableListFilesTreeView,
      listRoutesProvider,
      disposableListRoutesTreeView,
      listModulesProvider,
      disposableListModulesTreeView,
      ...viewRefreshDisposables,
      disposableCreateFiles,
      disposableDeleteFiles,
      disposableRenameFiles,
    );
  }

  /** Watches for file creation and save events to auto-refresh all tree-view providers. */
  private registerFileWatchers(): void {
    /**
     * Debounced refresh to avoid excessive UI updates when multiple events fire.
     */
    let refreshTimeout: NodeJS.Timeout | undefined;

    const scheduleRefresh = () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }

      refreshTimeout = setTimeout(() => {
        this.providers.forEach((provider) => provider.refresh());
      }, 150);
    };

    /**
     * Refresh UI only when relevant files (.ts) are saved
     */
    const disposableSave = workspace.onDidSaveTextDocument((document) => {
      if (document.fileName.endsWith('.ts')) {
        scheduleRefresh();
      }
    });

    /**
     * Optional: refresh on file creation (useful for generators)
     */
    const disposableCreate = workspace.onDidCreateFiles(() => {
      scheduleRefresh();
    });

    /**
     * File system watcher for cache invalidation (precise and immediate)
     */
    const watcher = workspace.createFileSystemWatcher('**/*.ts');

    watcher.onDidCreate(() => {
      clearCache();
    });

    watcher.onDidDelete(() => {
      clearCache();
    });

    watcher.onDidChange(() => {
      clearCache();
    });

    /**
     * Register disposables for cleanup
     */
    this.context.subscriptions.push(watcher, disposableSave, disposableCreate);
  }

  /** Registers the feedback tree view and its action commands (about, report, rate, support). */
  private registerFeedbackCommands(): void {
    const feedbackProvider = new FeedbackProvider(new FeedbackController());

    const disposableFeedbackTreeView = window.createTreeView(
      `${EXTENSION_ID}.${ViewIds.FeedbackView}`,
      {
        treeDataProvider: feedbackProvider,
      },
    );

    const feedbackCommands = [
      {
        id: CommandIds.FeedbackAboutUs,
        handler: () => feedbackProvider.controller.aboutUs(),
      },
      {
        id: CommandIds.FeedbackReportIssues,
        handler: () => feedbackProvider.controller.reportIssues(),
      },
      {
        id: CommandIds.FeedbackRateUs,
        handler: () => feedbackProvider.controller.rateUs(),
      },
      {
        id: CommandIds.FeedbackSupportUs,
        handler: () => feedbackProvider.controller.supportUs(),
      },
    ];

    const feedbackDisposables = feedbackCommands.map(({ id, handler }) => {
      return commands.registerCommand(`${EXTENSION_ID}.${id}`, handler);
    });

    this.context.subscriptions.push(
      feedbackProvider,
      disposableFeedbackTreeView,
      ...feedbackDisposables,
    );
  }
}
