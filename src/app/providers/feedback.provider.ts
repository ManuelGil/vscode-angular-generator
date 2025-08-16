import {
  Event,
  EventEmitter,
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  l10n,
} from 'vscode';

import { EXTENSION_ID } from '../configs';
import { FeedbackController } from '../controllers';
import { NodeModel } from '../models';

/**
 * The FeedbackProvider class
 *
 * @class
 * @classdesc The class that represents the feedback provider.
 * @export
 * @public
 * @implements {TreeDataProvider<NodeModel>}
 * @property {EventEmitter<NodeModel | undefined | null | void>} _onDidChangeTreeData - The onDidChangeTreeData event emitter
 * @property {Event<NodeModel | undefined | null | void>} onDidChangeTreeData - The onDidChangeTreeData event
 * @property {FeedbackController} controller - The feedback controller
 * @example
 * const provider = new FeedbackProvider();
 *
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
 */
export class FeedbackProvider implements TreeDataProvider<NodeModel> {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties
  /**
   * The onDidChangeTreeData event emitter.
   * @type {EventEmitter<NodeModel | undefined | null | void>}
   * @private
   * @memberof FeedbackProvider
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
   * @memberof FeedbackProvider
   * @example
   * this._isDisposed = false;
   */
  private _isDisposed = false;

  // Public properties
  /**
   * The onDidChangeTreeData event.
   * @type {Event<NodeModel | undefined | null | void>}
   * @public
   * @memberof FeedbackProvider
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
   * Constructor for the FeedbackProvider class
   *
   * @constructor
   * @param {FeedbackController} controller - The feedback controller
   * @public
   * @memberof FeedbackProvider
   */
  constructor(readonly controller: FeedbackController) {
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
   * @memberof FeedbackProvider
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
   * @param {NodeModel} [element] - The element.
   * @returns {ProviderResult<NodeModel[]>} - The children.
   */
  getChildren(element?: NodeModel): ProviderResult<NodeModel[]> {
    if (element) {
      return element.children;
    }

    return this.getFeedbacks();
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

  /**
   * Disposes the provider.
   *
   * @function dispose
   * @public
   * @memberof FeedbackProvider
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
   * Returns the feedbacks.
   *
   * @function getFeedbacks
   * @private
   * @memberof FeedbackProvider
   * @example
   * const feedbacks = this.getFeedbacks();
   *
   * @returns {NodeModel[]} - The feedbacks
   */
  private getFeedbacks(): NodeModel[] {
    return [
      new NodeModel(l10n.t('About Us'), new ThemeIcon('info'), {
        title: 'About Us',
        command: `${EXTENSION_ID}.feedback.aboutUs`,
      }),
      new NodeModel(l10n.t('Report Issues'), new ThemeIcon('bug'), {
        title: 'Report Issues',
        command: `${EXTENSION_ID}.feedback.reportIssues`,
      }),
      new NodeModel(l10n.t('Rate Us'), new ThemeIcon('star'), {
        title: 'Rate Us',
        command: `${EXTENSION_ID}.feedback.rateUs`,
      }),
      new NodeModel(l10n.t('Support Us'), new ThemeIcon('heart'), {
        title: 'Support Us',
        command: `${EXTENSION_ID}.feedback.supportUs`,
      }),
    ];
  }
}
