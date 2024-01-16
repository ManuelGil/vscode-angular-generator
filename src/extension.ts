import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import {
  analyticsDisable,
  analyticsEnable,
  analyticsInfo,
  analyticsPrompt,
  cacheClear,
  cacheDisable,
  cacheEnable,
  cacheInfo,
  e2e,
  generateComponent,
  generateEnvironments,
  generateGuard,
  generateLibrary,
  generatePipe,
  generateService,
  json2ts,
  newClass,
  newComponent,
  newDirective,
  newEnum,
  newGuard,
  newInterceptor,
  newInterface,
  newModule,
  newPipe,
  newResolver,
  newService,
  newTest,
  start,
  test,
  version,
} from './commands';

export function activate(context: vscode.ExtensionContext) {
  const angularFileClass = vscode.commands.registerCommand(
    'angular.file.class',
    (args) => newClass(vscode, fs, path, args),
  );
  const angularFileComponent = vscode.commands.registerCommand(
    'angular.file.component',
    (args) => newComponent(vscode, fs, path, args),
  );
  const angularFileDirective = vscode.commands.registerCommand(
    'angular.file.directive',
    (args) => newDirective(vscode, fs, path, args),
  );
  const angularFileEnum = vscode.commands.registerCommand(
    'angular.file.enum',
    (args) => newEnum(vscode, fs, path, args),
  );
  const angularFileGuard = vscode.commands.registerCommand(
    'angular.file.guard',
    (args) => newGuard(vscode, fs, path, args),
  );
  const angularFileInterceptor = vscode.commands.registerCommand(
    'angular.file.interceptor',
    (args) => newInterceptor(vscode, fs, path, args),
  );
  const angularFileInterface = vscode.commands.registerCommand(
    'angular.file.interface',
    (args) => newInterface(vscode, fs, path, args),
  );
  const angularFileModule = vscode.commands.registerCommand(
    'angular.file.module',
    (args) => newModule(vscode, fs, path, args),
  );
  const angularFilePipe = vscode.commands.registerCommand(
    'angular.file.pipe',
    (args) => newPipe(vscode, fs, path, args),
  );
  const angularFileResolver = vscode.commands.registerCommand(
    'angular.file.resolver',
    (args) => newResolver(vscode, fs, path, args),
  );
  const angularFileService = vscode.commands.registerCommand(
    'angular.file.service',
    (args) => newService(vscode, fs, path, args),
  );
  const angularFileTest = vscode.commands.registerCommand(
    'angular.file.spec',
    (args) => newTest(vscode, fs, path, args),
  );
  const angularTerminalAnalyticsDisable = vscode.commands.registerCommand(
    'angular.terminal.analytics.disable',
    () => analyticsDisable(vscode),
  );
  const angularTerminalAnalyticsEnable = vscode.commands.registerCommand(
    'angular.terminal.analytics.enable',
    () => analyticsEnable(vscode),
  );
  const angularTerminalAnalyticsInfo = vscode.commands.registerCommand(
    'angular.terminal.analytics.info',
    () => analyticsInfo(vscode),
  );
  const angularTerminalAnalyticsPrompt = vscode.commands.registerCommand(
    'angular.terminal.analytics.prompt',
    () => analyticsPrompt(vscode),
  );
  const angularTerminalCacheClear = vscode.commands.registerCommand(
    'angular.terminal.cache.clear',
    () => cacheClear(vscode),
  );
  const angularTerminalCacheDisable = vscode.commands.registerCommand(
    'angular.terminal.cache.disable',
    () => cacheDisable(vscode),
  );
  const angularTerminalCacheEnable = vscode.commands.registerCommand(
    'angular.terminal.cache.enable',
    () => cacheEnable(vscode),
  );
  const angularTerminalCacheInfo = vscode.commands.registerCommand(
    'angular.terminal.cache.info',
    () => cacheInfo(vscode),
  );
  const angularTerminalComponent = vscode.commands.registerCommand(
    'angular.terminal.component',
    (args) => generateComponent(vscode, path, args),
  );
  const angularTerminalEnvironments = vscode.commands.registerCommand(
    'angular.terminal.environments',
    () => generateEnvironments(vscode),
  );
  const angularTerminalGuard = vscode.commands.registerCommand(
    'angular.terminal.guard',
    (args) => generateGuard(vscode, path, args),
  );
  const angularTerminalLibrary = vscode.commands.registerCommand(
    'angular.terminal.library',
    () => generateLibrary(vscode),
  );
  const angularTerminalPipe = vscode.commands.registerCommand(
    'angular.terminal.pipe',
    (args) => generatePipe(vscode, path, args),
  );
  const angularTerminalService = vscode.commands.registerCommand(
    'angular.terminal.service',
    (args) => generateService(vscode, path, args),
  );
  const angularTerminalStart = vscode.commands.registerCommand(
    'angular.terminal.start',
    () => start(vscode),
  );
  const angularTerminalTest = vscode.commands.registerCommand(
    'angular.terminal.test',
    () => test(vscode),
  );
  const angularTerminalE2E = vscode.commands.registerCommand(
    'angular.terminal.e2e',
    () => e2e(vscode),
  );
  const angularTerminalVersion = vscode.commands.registerCommand(
    'angular.terminal.version',
    () => version(vscode),
  );
  const angularTransformJson2Ts = vscode.commands.registerCommand(
    'angular.transform.json.ts',
    () => json2ts(vscode),
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
}

export function deactivate() {}
