// @flow
/**
 * We currently use Mixpanel for our analytics.
 *
 * The goal of this file is to abstract that API, so that it can easily be
 * swapped in the future for a different provider.
 */

import mixpanel from 'mixpanel-browser';

import { getDistinctId } from './local-storage.helpers';

export const MIXPANEL_KEY = '346d24c09aba76e15bf88847c8608e5d';

export type EventType =
  | 'initial-load'
  | 'change-control-value'
  | 'click-smaller-purchase'
  | 'change-purchase-kind'
  | 'change-purchase-size'
  | 'initiate-checkout'
  | 'complete-checkout';

export const createLogger = (environment?: ?string = process.env.NODE_ENV) => {
  mixpanel.init(MIXPANEL_KEY);

  let distinctId = getDistinctId();

  mixpanel.identify(distinctId);

  return {
    logEvent: (event: EventType, data: any) => {
      if (environment !== 'production') {
        console.info('Event tracked', event, data);
        return;
      }

      mixpanel.track(event, data);
    },
  };
};

// Export a singleton so that multiple modules can use the same instance.
// We'll only ever want to create alternatives in tests.
export default createLogger();
