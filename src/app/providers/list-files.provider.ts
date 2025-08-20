import {
  Event,
  EventEmitter,
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
} from 'vscode';

import { ListFilesController } from '../controllers';
import { singularize, titleize } from '../helpers';
import { NodeModel } from '../models';

/**
 * The ListFilesProvider class
 *
 * @class
 * @classdesc The class that represents the list of files provider.
 * @export
 * @public
 * @implements {TreeDataProvider<NodeModel>}
 * @property {EventEmitter<NodeModel | undefined | null | void>} _onDidChangeTreeData - The onDidChangeTreeData event emitter
 * @property {Event<NodeModel | undefined | null | void>} onDidChangeTreeData - The onDidChangeTreeData event
 * @property {ListFilesController} controller - The list of files controller
 * @example
 * const provider = new ListFilesProvider();
 *
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
 */
export class ListFilesProvider implements TreeDataProvider<NodeModel> {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties
  /**
   * The onDidChangeTreeData event emitter.
   * @type {EventEmitter<NodeModel | undefined | null | void>}
   * @private
   * @memberof ListFilesProvider
   * @example
   * this._onDidChangeTreeData = new EventEmitter<Node | undefined | null | void>();
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#EventEmitter
   */
  private _onDidChangeTreeData: EventEmitter<
    NodeModel | undefined | null | void
  >;

  /**
   * Indicates whether the provider has been disposed.
   * @type {boolean}
   * @private
   * @memberof ListFilesProvider
   * @example
   * this._isDisposed = false;
   */
  private _isDisposed = false;

  /**
   * The cached nodes.
   * @type {NodeModel[] | undefined}
   * @private
   * @memberof ListFilesProvider
   * @example
   * this._cachedNodes = undefined;
   */
  private _cachedNodes: NodeModel[] | undefined = undefined;

  /**
   * The cache promise.
   * @type {Promise<NodeModel[] | undefined> | undefined}
   * @private
   * @memberof ListFilesProvider
   * @example
   * this._cachePromise = undefined;
   */
  private _cachePromise: Promise<NodeModel[] | undefined> | undefined =
    undefined;

  // Public properties
  /**
   * The onDidChangeTreeData event.
   * @type {Event<NodeModel | undefined | null | void>}
   * @public
   * @memberof ListFilesProvider
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
   * Constructor for the ListFilesProvider class
   *
   * @constructor
   * @public
   * @memberof ListFilesProvider
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
   * @memberof ListFilesProvider
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
   * @memberof ListFilesProvider
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

    this._cachePromise = this.getListFiles().then((nodes) => {
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
   * @memberof ListFilesProvider
   * @example
   * provider.refresh();
   *
   * @returns {void} - No return value
   */
  refresh(): void {
    this._cachedNodes = undefined;
    this._cachePromise = undefined;
    this._onDidChangeTreeData.fire();
  }

  /**
   * Disposes the provider.
   *
   * @function dispose
   * @public
   * @memberof ListFilesProvider
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
   * Gets the list of files.
   *
   * @function getListFiles
   * @private
   * @memberof ListFilesProvider
   * @example
   * const files = provider.getListFiles();
   *
   * @returns {Promise<NodeModel[] | undefined>} - The list of files
   */
  private async getListFiles(): Promise<NodeModel[]> {
    const files = await ListFilesController.getFiles();

    if (!files) {
      return [];
    }

    const fileTypes = ListFilesController.config.watch;

    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(2);

    const groups = await Promise.all(
      fileTypes.map((type) =>
        limit(async () => {
          const suffix = `${singularize(type)}.ts`;

          const children: NodeModel[] = files.filter((file: NodeModel) =>
            file.label.toString().includes(suffix),
          );

          if (children.length === 0) {
            return;
          }

          return new NodeModel(
            `${titleize(type)}: ${children.length}`,
            new ThemeIcon('folder-opened'),
            undefined,
            undefined,
            type,
            children,
          );
        }),
      ),
    );

    return groups.filter((node): node is NodeModel => node !== undefined);
  }
}
