import { MessageItem, Uri, env, l10n, window } from 'vscode';

import {
  EXTENSION_BUY_ME_A_COFFEE_URL,
  EXTENSION_DISPLAY_NAME,
  EXTENSION_MARKETPLACE_URL,
  EXTENSION_REPOSITORY_URL,
  EXTENSION_SPONSOR_URL,
} from '../configs';

/**
 * FeedbackController manages user feedback actions (About Us, Report Issues, Rate Us, Support Us).
 * All public methods are documented with JSDoc for clarity and maintainability.
 *
 * @class FeedbackController
 * @module controllers/feedback.controller
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
   * Opens the extension's marketplace page in the browser.
   */
  aboutUs(): void {
    env.openExternal(Uri.parse(EXTENSION_MARKETPLACE_URL));
  }

  /**
   * Opens the extension's repository issues page in the browser.
   */
  reportIssues(): void {
    env.openExternal(Uri.parse(`${EXTENSION_REPOSITORY_URL}/issues`));
  }

  /**
   * Opens the review page for the extension in the marketplace.
   */
  rateUs(): void {
    env.openExternal(
      Uri.parse(`${EXTENSION_MARKETPLACE_URL}&ssr=false#review-details`),
    );
  }

  /**
   * Shows support options (Sponsor, Buy Me a Coffee) and opens the selected link.
   * @returns Promise resolved when the user selects an option or cancels.
   */
  async supportUs(): Promise<void> {
    // Create the actions
    const actions: MessageItem[] = [
      { title: l10n.t('Become a Sponsor') },
      { title: l10n.t('Buy Me a Coffee') },
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
        env.openExternal(Uri.parse(EXTENSION_BUY_ME_A_COFFEE_URL));
        break;
    }
  }
}
