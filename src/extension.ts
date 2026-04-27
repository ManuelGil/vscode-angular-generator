/**
 * Main entry point for the Angular VSCode extension.
 * Controls activation policy, error boundary, and runtime instantiation.
 * All runtime behavior is delegated to ExtensionRuntime.
 *
 * @file extension.ts
 * @author ManuelGil
 * @see https://code.visualstudio.com/api
 */

import * as vscode from 'vscode';

import { EXTENSION_DISPLAY_NAME } from './app/configs';
import { ExtensionRuntime } from './extension.runtime';

/**
 * Called when the Angular VSCode extension is activated (first time a command is executed).
 * Instantiates ExtensionRuntime, performs initialization checks, and starts the runtime.
 *
 * @param {vscode.ExtensionContext} context - The VSCode extension context object.
 * @returns {Promise<void>} Resolves when activation is complete.
 * @example
 * // In VSCode, extension host calls:
 * activate(context);
 */
export async function activate(
  context: vscode.ExtensionContext,
): Promise<void> {
  try {
    const runtime = new ExtensionRuntime(context);

    const initialized = await runtime.initialize();

    if (!initialized) {
      return;
    }

    await runtime.start();
  } catch (error) {
    const message = vscode.l10n.t(
      'Failed to activate {0}: {1}',
      EXTENSION_DISPLAY_NAME,
      error instanceof Error ? error.message : String(error),
    );
    vscode.window.showErrorMessage(message);
    console.error('Extension activation error:', error);
  }
}

/**
 * Called when the Angular VSCode extension is deactivated.
 * Used for cleanup if necessary (currently a no-op).
 *
 * @example
 * // VSCode calls this automatically on extension deactivation
 * deactivate();
 */
export function deactivate(): void {}
