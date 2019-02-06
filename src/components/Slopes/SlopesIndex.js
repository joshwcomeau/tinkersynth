// @flow
import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import { COLORS } from '../../constants';
import analytics from '../../services/analytics.service';
import {
  getNumberOfVisits,
  markNewVisit,
} from '../../helpers/local-storage.helpers';
import useTimeout from '../../hooks/timeout.hook';
import useScrollDisabler from '../../hooks/scroll-disabler.hook';

import LoadScript from '../../components/LoadScript';
import LoadingMachine from '../../components/LoadingMachine';

const Slopes = loadable(() => import('../../components/Slopes'));

const SlopesIndex = () => {
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

  // TODO: Reduce this number after 3 visits, track in localStorage.
  const numOfVisits = getNumberOfVisits();
  const amountOfTimeToWait = numOfVisits > 3 ? 1 : 4000;

  useTimeout(() => {
    setHasTimeElapsed(true);
  }, amountOfTimeToWait);

  const showLoading = !hasScriptLoaded || !hasTimeElapsed;

  const showSlopes = hasScriptLoaded;

  React.useEffect(
    () => {
      if (!showLoading) {
        analytics.logEvent('load-machine');
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
      {showSlopes && <Slopes fallback={loadingElements} />}

      <LoadScript
        src="https://checkout.stripe.com/checkout.js"
        onLoad={() => setHasScriptLoaded(true)}
      />
    </>
  );
};

const LoadingWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.gray[700]};
`;

export default SlopesIndex;
