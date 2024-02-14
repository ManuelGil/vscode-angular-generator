import * as vscode from 'vscode';

import { Config, EXTENSION_ID } from './app/configs';
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
} from './app/providers';

export function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.Uri | null = null;

  // Get the resource for the workspace
  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0].uri;
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new Config(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource ?? null),
  );

  // -----------------------------------------------------------------
  // Register FileController and commands
  // -----------------------------------------------------------------

  // Create a new FileController
  const fileController = new FileController(config);

  const angularFileClass = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.class`,
    (args) => fileController.generateClass(args),
  );
  const angularFileComponent = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.component`,
    (args) => fileController.generateComponent(args),
  );
  const angularFileDirective = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.directive`,
    (args) => fileController.generateDirective(args),
  );
  const angularFileEnum = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.enum`,
    (args) => fileController.generateEnum(args),
  );
  const angularFileGuard = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.guard`,
    (args) => fileController.generateGuard(args),
  );
  const angularFileInterceptor = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.interceptor`,
    (args) => fileController.generateInterceptor(args),
  );
  const angularFileInterface = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.interface`,
    (args) => fileController.generateInterface(args),
  );
  const angularFileModule = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.module`,
    (args) => fileController.generateModule(args),
  );
  const angularFilePipe = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.pipe`,
    (args) => fileController.generatePipe(args),
  );
  const angularFileResolver = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.resolver`,
    (args) => fileController.generateResolver(args),
  );
  const angularFileService = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.service`,
    (args) => fileController.generateService(args),
  );
  const angularFileTest = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.spec`,
    (args) => fileController.generateTest(args),
  );

  // -----------------------------------------------------------------
  // Register TerminalController and commands
  // -----------------------------------------------------------------

  // Create a new TerminalController
  const terminalController = new TerminalController(config);

  const angularTerminalAnalyticsDisable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.disable`,
    () => terminalController.analyticsDisable(),
  );
  const angularTerminalAnalyticsEnable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.enable`,
    () => terminalController.analyticsEnable(),
  );
  const angularTerminalAnalyticsInfo = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.info`,
    () => terminalController.analyticsInfo(),
  );
  const angularTerminalAnalyticsPrompt = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.analytics.prompt`,
    () => terminalController.analyticsPrompt(),
  );
  const angularTerminalCacheClear = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.clear`,
    () => terminalController.cacheClear(),
  );
  const angularTerminalCacheDisable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.disable`,
    () => terminalController.cacheDisable(),
  );
  const angularTerminalCacheEnable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.enable`,
    () => terminalController.cacheEnable(),
  );
  const angularTerminalCacheInfo = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.info`,
    () => terminalController.cacheInfo(),
  );
  const angularTerminalComponent = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.component`,
    (args) => terminalController.generateComponent(args),
  );
  const angularTerminalEnvironments = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.environments`,
    () => terminalController.generateEnvironments(),
  );
  const angularTerminalGuard = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.guard`,
    (args) => terminalController.generateGuard(args),
  );
  const angularTerminalLibrary = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.library`,
    () => terminalController.generateLibrary(),
  );
  const angularTerminalPipe = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.pipe`,
    (args) => terminalController.generatePipe(args),
  );
  const angularTerminalService = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.service`,
    (args) => terminalController.generateService(args),
  );
  const angularTerminalStart = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.start`,
    () => terminalController.start(),
  );
  const angularTerminalTest = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.test`,
    () => terminalController.test(),
  );
  const angularTerminalE2E = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.e2e`,
    () => terminalController.e2e(),
  );
  const angularTerminalVersion = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.version`,
    () => terminalController.version(),
  );

  // -----------------------------------------------------------------
  // Register TransformController and commands
  // -----------------------------------------------------------------

  // Create a new TransformController
  const transformController = new TransformController();

  const angularTransformJson2Ts = vscode.commands.registerCommand(
    `${EXTENSION_ID}.transform.json.ts`,
    () => transformController.json2ts(),
  );

  // -----------------------------------------------------------------
  // Register ListFilesController
  // -----------------------------------------------------------------

  // Create a new ListFilesController
  const listFilesController = new ListFilesController(config);

  // -----------------------------------------------------------------
  // Register ListFilesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListFilesProvider
  const listFilesProvider = new ListFilesProvider(listFilesController);

  // Register the list provider
  const angularListFilesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listFilesView`,
    {
      treeDataProvider: listFilesProvider,
    },
  );

  const angularListOpenFile = vscode.commands.registerCommand(
    `${EXTENSION_ID}.list.openFile`,
    (uri) => listFilesProvider.controller.openFile(uri),
  );

  // -----------------------------------------------------------------
  // Register ListModulesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListModulesProvider
  const listModulesProvider = new ListModulesProvider(listFilesController);

  // Register the list provider
  const angularListModulesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listModulesView`,
    {
      treeDataProvider: listModulesProvider,
    },
  );

  const angularListGotoLine = vscode.commands.registerCommand(
    `${EXTENSION_ID}.list.gotoLine`,
    (uri, line) => listModulesProvider.controller.gotoLine(uri, line),
  );

  // -----------------------------------------------------------------
  // Register ListFilesProvider and ListMethodsProvider events
  // -----------------------------------------------------------------

  vscode.workspace.onDidChangeTextDocument(() => {
    listFilesProvider.refresh();
    listModulesProvider.refresh();
  });
  vscode.workspace.onDidCreateFiles(() => {
    listFilesProvider.refresh();
    listModulesProvider.refresh();
  });
  vscode.workspace.onDidDeleteFiles(() => {
    listFilesProvider.refresh();
    listModulesProvider.refresh();
  });
  vscode.workspace.onDidRenameFiles(() => {
    listFilesProvider.refresh();
    listModulesProvider.refresh();
  });
  vscode.workspace.onDidSaveTextDocument(() => {
    listFilesProvider.refresh();
    listModulesProvider.refresh();
  });

  // -----------------------------------------------------------------
  // Register FeedbackProvider and Feedback commands
  // -----------------------------------------------------------------

  // Create a new FeedbackProvider
  const feedbackProvider = new FeedbackProvider(new FeedbackController());

  // Register the feedback provider
  const angularFeedbackTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.feedbackView`,
    {
      treeDataProvider: feedbackProvider,
    },
  );

  // Register the commands
  const angularFeedbackAboutUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.aboutUs`,
    () => feedbackProvider.controller.aboutUs(),
  );
  const angularFeedbackReportIssues = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.reportIssues`,
    () => feedbackProvider.controller.reportIssues(),
  );
  const angularFeedbackRateUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.rateUs`,
    () => feedbackProvider.controller.rateUs(),
  );
  const angularFeedbackSupportUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.supportUs`,
    () => feedbackProvider.controller.supportUs(),
  );

  context.subscriptions.push(angularFileClass);
  context.subscriptions.push(angularFileComponent);
  context.subscriptions.push(angularFileDirective);
  context.subscriptions.push(angularFileEnum);
  context.subscriptions.push(angularFileGuard);
  context.subscriptions.push(angularFileInterceptor);
  context.subscriptions.push(angularFileInterface);
  context.subscriptions.push(angularFileModule);
  context.subscriptions.push(angularFilePipe);
  context.subscriptions.push(angularFileResolver);
  context.subscriptions.push(angularFileService);
  context.subscriptions.push(angularFileTest);
  context.subscriptions.push(angularTerminalAnalyticsDisable);
  context.subscriptions.push(angularTerminalAnalyticsEnable);
  context.subscriptions.push(angularTerminalAnalyticsInfo);
  context.subscriptions.push(angularTerminalAnalyticsPrompt);
  context.subscriptions.push(angularTerminalCacheClear);
  context.subscriptions.push(angularTerminalCacheDisable);
  context.subscriptions.push(angularTerminalCacheEnable);
  context.subscriptions.push(angularTerminalCacheInfo);
  context.subscriptions.push(angularTerminalComponent);
  context.subscriptions.push(angularTerminalEnvironments);
  context.subscriptions.push(angularTerminalGuard);
  context.subscriptions.push(angularTerminalLibrary);
  context.subscriptions.push(angularTerminalPipe);
  context.subscriptions.push(angularTerminalService);
  context.subscriptions.push(angularTerminalStart);
  context.subscriptions.push(angularTerminalTest);
  context.subscriptions.push(angularTerminalE2E);
  context.subscriptions.push(angularTerminalVersion);
  context.subscriptions.push(angularTransformJson2Ts);
  context.subscriptions.push(angularListFilesTreeView);
  context.subscriptions.push(angularListOpenFile);
  context.subscriptions.push(angularListModulesTreeView);
  context.subscriptions.push(angularListGotoLine);
  context.subscriptions.push(angularFeedbackTreeView);
  context.subscriptions.push(angularFeedbackAboutUs);
  context.subscriptions.push(angularFeedbackReportIssues);
  context.subscriptions.push(angularFeedbackRateUs);
  context.subscriptions.push(angularFeedbackSupportUs);
}

export function deactivate() {}
