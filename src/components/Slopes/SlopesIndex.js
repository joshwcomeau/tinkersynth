// @flow
import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import queryString from 'query-string';

import { COLORS, HEADER_HEIGHT } from '../../constants';
import analytics from '../../services/analytics.service';
import {
  getNumberOfVisits,
  markNewVisit,
} from '../../helpers/local-storage.helpers';
import useTimeout from '../../hooks/timeout.hook';
import useScrollDisabler from '../../hooks/scroll-disabler.hook';

import LoadingMachine from '../../components/LoadingMachine';

const SlopesIndex = ({ location }) => {
  // For our initial render, we'll show a loading indicator.
  //
  // (I'm violating a best practice, and deciding to show the loader for several
  // seconds, even if the loading is finished... because I really like my
  // loading indicator.)
  //
  // I'm not sure how to use @loadable to signal to me when the component is
  // actually ready to be rendered,

  const [hasTimeElapsed, setHasTimeElapsed] = React.useState(false);
  const [hasLoadedSlopes, setHasLoadedSlopes] = React.useState(false);
  const slopesComponent = React.useRef(null);

  // On mount, start async-loading the Slopes component
  React.useEffect(() => {
    import('../../components/Slopes').then(Component => {
      slopesComponent.current = Component.default;
      setHasLoadedSlopes(true);
    });
  }, []);

  // On mount, scroll to the top of the document

  React.useEffect(() => {
    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 60);
  }, []);

  const numOfVisits = getNumberOfVisits();
  const amountOfTimeToWait = numOfVisits > 3 ? 1 : 4000;

  useTimeout(() => {
    setHasTimeElapsed(true);
  }, amountOfTimeToWait);

  const showLoading = !hasTimeElapsed || !hasLoadedSlopes;

  React.useEffect(
    () => {
      if (!showLoading) {
        analytics.logEvent('load-machine', { machineName: 'slopes' });
        markNewVisit();
      }
    },
    [showLoading]
  );

  // useScrollDisabler(showLoading);

  const loadingElements = (
    <LoadingWrapper>
      <LoadingMachine />
    </LoadingWrapper>
  );

  const Slopes = slopesComponent.current;

  return <>{showLoading ? loadingElements : <Slopes />}</>;
};

const LoadingWrapper = styled.div`
  position: relative;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SlopesIndex;
