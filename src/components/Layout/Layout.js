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

const store = configureStore();

type Props = {
  children: React$Node,
  noHeader?: boolean,
};

const Layout = ({ pageId, children, noHeader, transparentFooter }: Props) => {
  React.useEffect(() => {
    analytics.logEvent('visit-page', { pageId });
  }, []);

  return (
    <Provider store={store}>
      <ToastManager />

      {!noHeader && <Header />}

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
`;

export default Layout;
