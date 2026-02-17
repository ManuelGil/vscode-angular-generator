/**
 * Basic test suite for the Angular VSCode extension.
 * Demonstrates how to set up and run extension tests using Mocha and assert.
 *
 * @file extension.test.ts
 * @author ManuelGil
 * @see https://code.visualstudio.com/api/working-with-extensions/testing-extension
 */

import * as assert from 'assert';
import * as vscode from 'vscode';

// import * as myExtension from '../../extension'; // Uncomment to test extension APIs

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Sample test: Array indexOf', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  // Example for future extension API tests:
  // test('Extension should be present', () => {
  //   assert.ok(vscode.extensions.getExtension('angular.vscode-angular-generator'));
  // });
});
