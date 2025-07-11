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

    return this.getListRoutes();
  }

  /**
   * Refreshes the tree data.
   *
   * @function refresh
   * @public
   * @memberof FeedbackProvider
   * @example
   * provider.refresh();
   *
   * @returns {void} - No return value
   */
  refresh(): void {
    this._onDidChangeTreeData.fire();
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
   * @returns {Promise<NodeModel[] | undefined>} - The list of files
   */
  private async getListRoutes(): Promise<NodeModel[] | undefined> {
    const files = await ListFilesController.getFiles();

    if (!files) {
      return;
    }

    // List of Modules
    const nodes = files.filter(
      (file) =>
        file.label.toString().includes('module.ts') ||
        file.label.toString().includes('routes.ts'),
    );

    for (const file of nodes) {
      const document = await workspace.openTextDocument(
        file.resourceUri?.path ?? '',
      );

      const children = Array.from(
        { length: document.lineCount },
        (_, index) => {
          const line = document.lineAt(index);

          let node: NodeModel | undefined;

          if (line.text.match(/path:/gi)) {
            const path = line.text
              .replace(/[\{\}]/gi, '')
              .split(',')[0]
              .trim();

            node = new NodeModel(path, new ThemeIcon('symbol-reference'), {
              command: `${EXTENSION_ID}.list.gotoLine`,
              title: line.text,
              arguments: [file.resourceUri, index],
            });
          }

          return node;
        },
      );

      if (children.length === 0) {
        continue;
      }

      file.setChildren(
        children.filter((child) => child !== undefined) as NodeModel[],
      );
    }

    return nodes.filter((file) => file.children?.length !== 0);
  }
}
