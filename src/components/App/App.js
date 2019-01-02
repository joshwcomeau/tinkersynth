// @flow
import React from 'react';
import loadable from '@loadable/component';

import GlobalStyles from '../GlobalStyles';

import 'focus-visible';

const Slopes = loadable(() => import('../Slopes'));

const App = () => (
  <>
    <Slopes fallback={<p>Building the Machine</p>} />

    <GlobalStyles />
  </>
);

export default App;
