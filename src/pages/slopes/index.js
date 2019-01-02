// @flow
import React from 'react';
import loadable from '@loadable/component';

import Layout from '../../components/Layout';

const LazySlopes = loadable(() => import('../../components/Slopes'));

const SlopesIndex = () => (
  <Layout>
    <LazySlopes
      fallback={
        // TODO: Custom spinner
        <p>Building the Machine</p>
      }
    />
  </Layout>
);

export default SlopesIndex;
