// @flow
import React from 'react';
import styled from 'styled-components';

import GlobalStyles from '../GlobalStyles';
import Header from '../Header';

import 'focus-visible';

type Props = {
  children: React$Node,
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <MainContentWrapper>{children}</MainContentWrapper>

    <GlobalStyles />
  </>
);

const MainContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export default Layout;
