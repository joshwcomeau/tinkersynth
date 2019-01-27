// @flow
import React from 'react';
import styled from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import configureStore from '../../store';

import GlobalStyles from '../GlobalStyles';
import DevTools from '../DevTools';
import ToastManager from '../ToastManager';
import Header from '../Header';

import 'focus-visible';
import 'react-tippy/dist/tippy.css';

const store = configureStore();

type Props = {
  children: React$Node,
};

const Layout = ({ children }: Props) => (
  <Provider store={store}>
    <ToastManager />
    <Header />
    <MainContentWrapper>{children}</MainContentWrapper>

    <GlobalStyles />
    <DevTools />
  </Provider>
);

const MainContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export default Layout;
