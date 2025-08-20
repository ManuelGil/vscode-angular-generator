import {
  Event,
  EventEmitter,
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  workspace,
} from 'vscode';

import { EXTENSION_ID } from '../configs';
import { ListFilesController } from '../controllers';
import { NodeModel } from '../models';

/**
 * The ListRoutesProvider class
 *
 * @class
 * @classdesc The class that represents the list of files provider.
 * @export
 * @public
 * @implements {TreeDataProvider<NodeModel>}
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
 */
export class ListRoutesProvider implements TreeDataProvider<NodeModel> {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties
  /**
   * Event emitter for tree data changes.
   *
   * @private
   * @type {EventEmitter<NodeModel | undefined | null | void>}
   */
  private _onDidChangeTreeData: EventEmitter<
    NodeModel | undefined | null | void
  >;

  /**
   * Indicates whether the provider has been disposed.
   * @type {boolean}
   * @private
   * @memberof ListRoutesProvider
   * @example
   * this._isDisposed = false;
   */
  private _isDisposed = false;

  /**
   * The cached nodes.
   * @type {NodeModel[] | undefined}
   * @private
   * @memberof ListRoutesProvider
   * @example
   * this._cachedNodes = undefined;
   */
  private _cachedNodes: NodeModel[] | undefined = undefined;

  /**
   * The cache promise.
   * @type {Promise<NodeModel[] | undefined> | undefined}
   * @private
   * @memberof ListRoutesProvider
   * @example
   * this._cachePromise = undefined;
   */
  private _cachePromise: Promise<NodeModel[] | undefined> | undefined =
    undefined;

  // Public properties
  /**
   * Event for tree data changes.
   *
   * @public
   * The onDidChangeTreeData event.
   * @type {Event<NodeModel | undefined | null | void>}
   * @public
   * @memberof ListRoutesProvider
   * @example
   * readonly onDidChangeTreeData: Event<Node | undefined | null | void>;
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#Event
   */
  readonly onDidChangeTreeData: Event<NodeModel | undefined | null | void>;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ListRoutesProvider class
   *
   * @constructor
   * @public
   * @memberof ListRoutesProvider
   */
  constructor() {
    this._onDidChangeTreeData = new EventEmitter<
      NodeModel | undefined | null | void
    >();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Returns the tree item for the supplied element.
   *
   * @function getTreeItem
   * @param {NodeModel} element - The element
   * @public
   * @memberof ListRoutesProvider
   * @example
   * const treeItem = provider.getTreeItem(element);
   *
   * @returns {TreeItem | Thenable<TreeItem>} - The tree item
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getTreeItem(element: NodeModel): TreeItem | Thenable<TreeItem> {
    return element;
  }

  /**
   * Returns the children for the supplied element.
   *
   * @function getChildren
   * @param {NodeModel} [element] - The element
   * @public
   * @memberof ListRoutesProvider
   * @example
   * const children = provider.getChildren(element);
   *
   * @returns {ProviderResult<NodeModel[]>} - The children
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getChildren(element?: NodeModel): ProviderResult<NodeModel[]> {
    if (element) {
      return element.children;
    }

    if (this._cachedNodes) {
      return this._cachedNodes;
    }

    if (this._cachePromise) {
      return this._cachePromise;
    }

    this._cachePromise = this.getListRoutes().then((nodes) => {
      this._cachedNodes = nodes;
      this._cachePromise = undefined;
      return nodes;
    });

    return this._cachePromise;
  }

  /**
   * Refreshes the tree data by firing the event.
   *
   * @function refresh
   * @public
   * @memberof ListRoutesProvider
   * @example
   * provider.refresh();
   *
   * @returns {void} - No return value
   */
  refresh(): void {
    this._cachedNodes = undefined;
    this._cachePromise = undefined;
    this._onDidChangeTreeData.fire(undefined);
  }

  /**
   * Disposes the provider.
   *
   * @function dispose
   * @public
   * @memberof ListRoutesProvider
   * @example
   * provider.dispose();
   *
   * @returns {void} - No return value
   */
  dispose(): void {
    this._onDidChangeTreeData.dispose();
    if (this._isDisposed) {
      return;
    }

    this._isDisposed = true;

    if (this._onDidChangeTreeData) {
      this._onDidChangeTreeData.dispose();
    }
  }

  // Private methods
  /**
   * Returns the list of files.
   *
   * @function getListRoutes
   * @private
   * @memberof ListRoutesProvider
   * @example
   * const files = provider.getListRoutes();
   *
   * @returns {Promise<NodeModel[]>} - The list of files
   */
  private async getListRoutes(): Promise<NodeModel[]> {
    const files = await ListFilesController.getFiles();

    if (!files) {
      return []; // Return an empty array if no files found
    }

    // List of Modules
    const nodes: NodeModel[] = files.filter(
      (file: NodeModel) =>
        file.label.toString().includes('module.ts') ||
        file.label.toString().includes('routes.ts'),
    );

    const pathPattern = /^\s*path\s*:\s*['"]?([^'",\]\s}]+)/i;

    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(2);

    await Promise.all(
      nodes.map((file: NodeModel) =>
        limit(async () => {
          if (!file.resourceUri) {
            return file.setChildren([]);
          }

          try {
            const document = await workspace.openTextDocument(file.resourceUri);

            const children: NodeModel[] = [];

            for (let i = 0; i < document.lineCount; i++) {
              const text = document.lineAt(i).text;
              // Skip commented lines (single-line and common block comment markers)
              const trimmed = text.trim();
              if (
                trimmed.startsWith('//') ||
                trimmed.startsWith('/*') ||
                trimmed.startsWith('*/') ||
                trimmed.startsWith('*')
              ) {
                continue;
              }
              const match = pathPattern.exec(text);

              if (match) {
                const extractedPath = match[1].trim();

                children.push(
                  new NodeModel(
                    extractedPath,
                    new ThemeIcon('symbol-reference'),
                    {
                      command: `${EXTENSION_ID}.list.gotoLine`,
                      title: text,
                      arguments: [file.resourceUri, i],
                    },
                  ),
                );
              }
            }

            file.setChildren(children);
          } catch (error) {
            console.error(
              `Error reading file ${file.resourceUri?.fsPath}:`,
              error instanceof Error ? error.message : String(error),
            );

            file.setChildren([]);
          }
        }),
      ),
    );

    return nodes.filter((file: NodeModel) => file.children?.length !== 0);
  }
}
