import { MessageItem, Uri, env, l10n, window } from 'vscode';

import {
  EXTENSION_DISPLAY_NAME,
  EXTENSION_MARKETPLACE_URL,
  EXTENSION_PAYPAL_URL,
  EXTENSION_REPOSITORY_URL,
  EXTENSION_SPONSOR_URL,
} from '../configs';

/**
 * The FeedbackController class.
 *
 * @class
 * @classdesc The class that represents the feedback controller.
 * @export
 * @public
 * @example
 * const controller = new FeedbackController();
 */
export class FeedbackController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FeedbackController class.
   *
   * @constructor
   * @public
   * @memberof FeedbackController
   */
  constructor() {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The aboutUs method.
   *
   * @function aboutUs
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  aboutUs(): void {
    env.openExternal(Uri.parse(EXTENSION_MARKETPLACE_URL));
  }

  /**
   * The reportIssues method.
   *
   * @function reportIssues
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  reportIssues(): void {
    env.openExternal(Uri.parse(`${EXTENSION_REPOSITORY_URL}/issues`));
  }

  /**
   * The rateUs method.
   *
   * @function rateUs
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  rateUs(): void {
    env.openExternal(
      Uri.parse(`${EXTENSION_MARKETPLACE_URL}&ssr=false#review-details`),
    );
  }

  /**
   * The supportUs method.
   *
   * @function supportUs
   * @public
   * @async
   * @memberof FeedbackController
   *
   * @returns {Promise<void>} - The promise that resolves with no value
   */
  async supportUs(): Promise<void> {
    // Create the actions
    const actions: MessageItem[] = [
      { title: l10n.t('Become a Sponsor') },
      { title: l10n.t('Donate via PayPal') },
    ];

    // Show the message
    const message = l10n.t(
      'Although {0} is offered at no cost, your support is deeply appreciated if you find it beneficial. Thank you for considering!',
      EXTENSION_DISPLAY_NAME,
    );
    const option = await window.showInformationMessage(message, ...actions);

    // Handle the actions
    switch (option?.title) {
      case actions[0].title:
        env.openExternal(Uri.parse(EXTENSION_SPONSOR_URL));
        break;

      case actions[1].title:
        env.openExternal(Uri.parse(EXTENSION_PAYPAL_URL));
        break;
    }
  }
}
