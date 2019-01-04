// @flow
import React from 'react';

import GlobalStyles from '../GlobalStyles';
import Header from '../Header';

import 'focus-visible';

type Props = {
  children: React$Node,
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    {children}

    <GlobalStyles />
  </>
);

export default Layout;
