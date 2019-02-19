// @flow
import React from 'react';
import styled from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import configureStore from '../../store';
import analytics from '../../services/analytics.service';

import GlobalStyles from '../GlobalStyles';
import DevTools from '../DevTools';
import ToastManager from '../ToastManager';
import Header from '../Header';
import Footer from '../Footer';

import 'focus-visible';
import 'react-tippy/dist/tippy.css';
import { HEADER_HEIGHT } from '../../constants';

const store = configureStore();

type Props = {
  pageId: string,
  children: React$Node,
  noHeader?: boolean,
  transparentHeader?: boolean,
  transparentFooter?: boolean,
  adminPage?: boolean,
};

const Layout = ({
  pageId,
  children,
  noHeader,
  transparentHeader,
  transparentFooter,
  adminPage,
}: Props) => {
  React.useEffect(() => {
    if (!adminPage) {
      analytics.logEvent('visit-page', { pageId });
    }
  }, []);

  return (
    <Provider store={store}>
      <ToastManager />

      {!noHeader && <Header transparentBackground={transparentHeader} />}

      <MainContentWrapper>{children}</MainContentWrapper>

      <Footer transparentBackground={transparentFooter} />

      <GlobalStyles />
      <DevTools />
    </Provider>
  );
};

const MainContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export default Layout;
