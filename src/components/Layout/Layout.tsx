'use client';

import React from 'react';
import styled from 'styled-components';

import { AppStateProvider } from '../../context/AppStateContext';
import { COLORS } from '../../constants';

import GlobalStyles from '../GlobalStyles';
import ToastManager from '../ToastManager';
import Header from '../Header';
import Footer from '../Footer';
import HiddenTopShelf from '../HiddenTopShelf';

import 'react-tippy/dist/tippy.css';
import { HEADER_HEIGHT } from '../../constants';

type Props = {
  pageId: string;
  children: React.ReactNode;
  noHeaderBorder?: boolean;
  transparentFooter?: boolean;
  theme?: 'default' | 'dark';
};

const Layout = ({
  pageId,
  children,
  noHeaderBorder,
  theme = 'default',
}: Props) => {
  return (
    <AppStateProvider>
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
    </AppStateProvider>
  );
};

const Wrapper = styled.div``;

const MainContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export default Layout;
