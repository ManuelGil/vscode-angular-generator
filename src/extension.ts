import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { newClass, start } from './commands';

export function activate(context: vscode.ExtensionContext) {
  const angularFileClass = vscode.commands.registerCommand(
    'angular.file.class',
    (args) => {
      newClass(vscode, fs, path, args);
    },
  );
  const angularTerminalStart = vscode.commands.registerCommand(
    'angular.terminal.start',
    () => {
      start(vscode);
    },
  );

  context.subscriptions.push(angularFileClass);
  context.subscriptions.push(angularTerminalStart);
}

export function deactivate() {}
