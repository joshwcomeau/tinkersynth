// @flow
import React from 'react';

import GlobalStyles from '../GlobalStyles';

import 'focus-visible';

type Props = {
  children: React$Node,
};

const Layout = ({ children }: Props) => (
  <>
    {children}

    <GlobalStyles />
  </>
);

export default Layout;
