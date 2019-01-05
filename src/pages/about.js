// @flow
import React from 'react';
import loadable from '@loadable/component';

import Layout from '../components/Layout';

const Slopes = loadable(() => import('../components/Slopes'));

const SlopesIndex = () => (
  <Layout>
    <Slopes
      fallback={
        // TODO: Custom spinner
        <p>Building the Machine</p>
      }
    />
  </Layout>
);

export default SlopesIndex;
