// @flow
import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import queryString from 'query-string';

import { COLORS, HEADER_HEIGHT } from '../../constants';
import analytics from '../../services/analytics.service';
import { getOrderDetails } from '../../helpers/api.helpers';
import {
  getNumberOfVisits,
  markNewVisit,
} from '../../helpers/local-storage.helpers';
import useTimeout from '../../hooks/timeout.hook';
import useScrollDisabler from '../../hooks/scroll-disabler.hook';

import LoadScript from '../../components/LoadScript';
import LoadingMachine from '../../components/LoadingMachine';

const Slopes = loadable(() => import('../../components/Slopes'));

const SlopesIndex = ({ location }) => {
  const { orderId } = queryString.parse(location.search);

  // For our initial render, we'll show a loading indicator.
  //
  // (I'm violating a best practice, and deciding to show the loader for several
  // seconds, even if the loading is finished... because I really like my
  // loading indicator.)
  //
  // I'm not sure how to use @loadable to signal to me when the component is
  // actually ready to be rendered,

  const [hasScriptLoaded, setHasScriptLoaded] = React.useState(false);
  const [hasTimeElapsed, setHasTimeElapsed] = React.useState(false);

  // If the user supplied an orderId in the query params, we want to fetch that
  // data before we mount our slopes.
  // We use this as the default state, since if we don't have an orderId,
  // we have no data we need to fetch (so we can mark it as fully fetched).
  const [needsToFetchOrderData, setNeedsToFetchOrderData] = React.useState(
    !!orderId
  );

  const [orderData, setOrderData] = React.useState();

  // On mount, kick off the order-data request if necessary
  React.useEffect(() => {
    if (needsToFetchOrderData) {
      getOrderDetails(orderId).then(order => {
        setNeedsToFetchOrderData(false);

        if (!order) {
          // This shouldn't happen, but whatever, ignore it if it does.
          return;
        }

        setOrderData(order.params);
      });
    }
  }, []);

  const numOfVisits = getNumberOfVisits();
  const amountOfTimeToWait = numOfVisits > 3 ? 1 : 4000;

  useTimeout(() => {
    setHasTimeElapsed(true);
  }, amountOfTimeToWait);

  const showLoading =
    !hasScriptLoaded || !hasTimeElapsed || needsToFetchOrderData;

  const showSlopes = hasScriptLoaded;

  React.useEffect(
    () => {
      if (!showLoading) {
        analytics.logEvent('load-machine', { type: 'slopes' });
        markNewVisit();
      }
    },
    [showLoading]
  );

  useScrollDisabler(showLoading);

  const loadingElements = (
    <LoadingWrapper>
      <LoadingMachine />
    </LoadingWrapper>
  );

  return (
    <>
      {showLoading && loadingElements}
      {showSlopes && (
        <Slopes fallback={loadingElements} orderParams={orderData} />
      )}

      <LoadScript
        src="https://checkout.stripe.com/checkout.js"
        onLoad={() => setHasScriptLoaded(true)}
      />
    </>
  );
};

const LoadingWrapper = styled.div`
  position: relative;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.gray[700]};
`;

export default SlopesIndex;
