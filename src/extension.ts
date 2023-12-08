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
  generateEnvironments,
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
} from './commands';
import { generateComponent } from './commands/controllers/terminal/component';

export function activate(context: vscode.ExtensionContext) {
  const angularFileClass = vscode.commands.registerCommand(
    'angular.file.class',
    (args) => {
      newClass(vscode, fs, path, args);
    },
  );
  const angularFileComponent = vscode.commands.registerCommand(
    'angular.file.component',
    (args) => {
      newComponent(vscode, fs, path, args);
    },
  );
  const angularFileDirective = vscode.commands.registerCommand(
    'angular.file.directive',
    (args) => {
      newDirective(vscode, fs, path, args);
    },
  );
  const angularFileEnum = vscode.commands.registerCommand(
    'angular.file.enum',
    (args) => {
      newEnum(vscode, fs, path, args);
    },
  );
  const angularFileGuard = vscode.commands.registerCommand(
    'angular.file.guard',
    (args) => {
      newGuard(vscode, fs, path, args);
    },
  );
  const angularFileInterceptor = vscode.commands.registerCommand(
    'angular.file.interceptor',
    (args) => {
      newInterceptor(vscode, fs, path, args);
    },
  );
  const angularFileInterface = vscode.commands.registerCommand(
    'angular.file.interface',
    (args) => {
      newInterface(vscode, fs, path, args);
    },
  );
  const angularFileModule = vscode.commands.registerCommand(
    'angular.file.module',
    (args) => {
      newModule(vscode, fs, path, args);
    },
  );
  const angularFilePipe = vscode.commands.registerCommand(
    'angular.file.pipe',
    (args) => {
      newPipe(vscode, fs, path, args);
    },
  );
  const angularFileResolver = vscode.commands.registerCommand(
    'angular.file.resolver',
    (args) => {
      newResolver(vscode, fs, path, args);
    },
  );
  const angularFileService = vscode.commands.registerCommand(
    'angular.file.service',
    (args) => {
      newService(vscode, fs, path, args);
    },
  );
  const angularFileTest = vscode.commands.registerCommand(
    'angular.file.spec',
    (args) => {
      newTest(vscode, fs, path, args);
    },
  );
  const angularTerminalAnalyticsDisable = vscode.commands.registerCommand(
    'angular.terminal.analytics.disable',
    () => {
      analyticsDisable(vscode);
    },
  );
  const angularTerminalAnalyticsEnable = vscode.commands.registerCommand(
    'angular.terminal.analytics.enable',
    () => {
      analyticsEnable(vscode);
    },
  );
  const angularTerminalAnalyticsInfo = vscode.commands.registerCommand(
    'angular.terminal.analytics.info',
    () => {
      analyticsInfo(vscode);
    },
  );
  const angularTerminalAnalyticsPrompt = vscode.commands.registerCommand(
    'angular.terminal.analytics.prompt',
    () => {
      analyticsPrompt(vscode);
    },
  );
  const angularTerminalCacheClear = vscode.commands.registerCommand(
    'angular.terminal.cache.clear',
    () => {
      cacheClear(vscode);
    },
  );
  const angularTerminalCacheDisable = vscode.commands.registerCommand(
    'angular.terminal.cache.disable',
    () => {
      cacheDisable(vscode);
    },
  );
  const angularTerminalCacheEnable = vscode.commands.registerCommand(
    'angular.terminal.cache.enable',
    () => {
      cacheEnable(vscode);
    },
  );
  const angularTerminalCacheInfo = vscode.commands.registerCommand(
    'angular.terminal.cache.info',
    () => {
      cacheInfo(vscode);
    },
  );
  const angularTerminalComponent = vscode.commands.registerCommand(
    'angular.terminal.component',
    (args) => {
      generateComponent(vscode, path, args);
    },
  );
  const angularTerminalEnvironments = vscode.commands.registerCommand(
    'angular.terminal.environments',
    () => {
      generateEnvironments(vscode);
    },
  );
  const angularTerminalStart = vscode.commands.registerCommand(
    'angular.terminal.start',
    () => {
      start(vscode);
    },
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
  context.subscriptions.push(angularTerminalStart);
}

export function deactivate() {}
