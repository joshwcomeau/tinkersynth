// @flow
import React from 'react';
import styled from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import configureStore from '../../store';
import { COLORS } from '../../constants';
import analytics from '../../services/analytics.service';

import GlobalStyles from '../GlobalStyles';
import DevTools from '../DevTools';
import ToastManager from '../ToastManager';
import Header from '../Header';
import Footer from '../Footer';
import HiddenTopShelf from '../HiddenTopShelf';

import 'focus-visible';
import 'react-tippy/dist/tippy.css';
import { HEADER_HEIGHT } from '../../constants';

const store = configureStore();

type Props = {
  pageId: string,
  children: React$Node,
  noHeaderBorder?: boolean,
  transparentFooter?: boolean,
  theme?: 'default' | 'dark',
};

const Layout = ({
  pageId,
  children,
  noHeaderBorder,
  theme = 'default',
}: Props) => {
  React.useEffect(() => {
    analytics.logEvent('visit-page', { pageId });
  }, []);

  return (
    <Provider store={store}>
      <ToastManager />
      <HiddenTopShelf />

      <Wrapper
        style={{
          backgroundColor: theme === 'dark' ? COLORS.navy : 'white',
        }}
      >
        <Header theme={theme} noBorder={noHeaderBorder} />

        <MainContentWrapper>{children}</MainContentWrapper>

        <Footer theme={theme} />
      </Wrapper>

      <GlobalStyles />
      <DevTools />
    </Provider>
  );
};

const Wrapper = styled.div``;

const MainContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export default Layout;
