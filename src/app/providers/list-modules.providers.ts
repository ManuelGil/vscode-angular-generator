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
 * The ListModulesProvider class
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
 * const provider = new ListModulesProvider();
 *
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
 */
export class ListModulesProvider implements TreeDataProvider<NodeModel> {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties
  /**
   * The onDidChangeTreeData event emitter.
   * @type {EventEmitter<NodeModel | undefined | null | void>}
   * @private
   * @memberof ListModulesProvider
   * @example
   * this._onDidChangeTreeData = new EventEmitter<Node | undefined | null | void>();
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#EventEmitter
   */
  private _onDidChangeTreeData: EventEmitter<
    NodeModel | undefined | null | void
  >;

  // Public properties
  /**
   * Event that signals when the module tree data has changed.
   * Used by VSCode to refresh the explorer view when modules are added, removed, or updated.
   *
   * @public
   * @readonly
   * @type {Event<NodeModel | undefined | null | void>}
   * @see https://code.visualstudio.com/api/references/vscode-api#Event
   */
  readonly onDidChangeTreeData: Event<NodeModel | undefined | null | void>;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Creates an instance of ListModulesProvider for the VSCode explorer tree.
   * Associates the provider with a ListFilesController to manage file discovery and navigation.
   *
   * @param {ListFilesController} controller - The controller responsible for listing files in the workspace.
   * @public
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
   * Returns the TreeItem representation for a given NodeModel element.
   * Used by VSCode to render nodes in the explorer tree.
   *
   * @param {NodeModel} element - The node model representing a file or section.
   * @returns {TreeItem} The corresponding TreeItem for the VSCode explorer.
   * @public
   */
  getTreeItem(element: NodeModel): TreeItem | Thenable<TreeItem> {
    return element;
  }

  /**
   * Returns the child nodes for a given module node or root.
   * If no element is provided, returns the top-level module nodes; otherwise, returns children for the given node.
   *
   * @param {NodeModel} [element] - The parent node to retrieve children for.
   * @returns {ProviderResult<NodeModel[]>} Array of child NodeModel elements or undefined if none.
   * @public
   */
  getChildren(element?: NodeModel): ProviderResult<NodeModel[]> {
    if (element) {
      return element.children;
    }

    return this.getListModules();
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
   * Retrieves all Angular module files in the workspace and parses their structure.
   * Filters files ending with 'module.ts' and scans for key sections (declarations, exports, imports, bootstrap, providers).
   *
   * @private
   * @returns {Promise<NodeModel[] | undefined>} Array of NodeModel representing Angular module sections, or undefined if none found.
   * @example
   * const modules = await provider.getListModules();
   */
  private async getListModules(): Promise<NodeModel[] | undefined> {
    const files = await ListFilesController.getFiles();

    if (!files) {
      return;
    }

    const nodes = files.filter((file) =>
      file.label.toString().includes('module.ts'),
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

          if (
            line.text.match(
              /(declarations|exports|imports|bootstrap|providers): \[/g,
            )
          ) {
            node = new NodeModel(
              line.text.trim(),
              new ThemeIcon('symbol-module'),
              {
                command: `${EXTENSION_ID}.list.gotoLine`,
                title: line.text,
                arguments: [file.resourceUri, index],
              },
            );
          }

          return node;
        },
      );

      file.setChildren(
        children.filter((child) => child !== undefined) as NodeModel[],
      );
    }

    return nodes.filter((file) => file.children && file.children.length !== 0);
  }
}
