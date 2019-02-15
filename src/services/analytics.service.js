// @flow
/**
 * We currently use Mixpanel for our analytics.
 *
 * The goal of this file is to abstract that API, so that it can easily be
 * swapped in the future for a different provider.
 */

import mixpanel from 'mixpanel-browser';
import uuid from 'uuid/v1';

import { getDistinctId } from '../helpers/local-storage.helpers';

export const MIXPANEL_KEY = '346d24c09aba76e15bf88847c8608e5d';

export type EventType =
  | 'initial-visit'
  | 'visit-page'
  | 'load-machine'
  | 'change-control-value'
  | 'click-smaller-purchase'
  | 'change-purchase-kind'
  | 'change-purchase-size'
  | 'initiate-checkout'
  | 'complete-checkout'
  | 'fail-to-load-purchase-button';

export const createLogger = (environment?: ?string = process.env.NODE_ENV) => {
  mixpanel.init(MIXPANEL_KEY);

  let distinctId = getDistinctId();

  mixpanel.identify(distinctId);

  return {
    logEvent: (eventType: EventType, data: any, cb?: any) => {
      if (environment !== 'production') {
        console.info('Event tracked', eventType, data);
        return;
      }

      mixpanel.track(eventType, data, cb);
    },
  };
};

// Export a singleton so that multiple modules can use the same instance.
// We'll only ever want to create alternatives in tests.
export default createLogger();
