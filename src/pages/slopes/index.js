// @flow
import React from 'react';
import loadable from '@loadable/component';

import Layout from '../../components/Layout';
import LoadingMachine from '../../components/LoadingMachine';

const Slopes = loadable(() => import('../../components/Slopes'));

const SlopesIndex = () => (
  <Layout>
    <Slopes
      fallback={
        // TODO: Custom spinner
        <LoadingMachine />
      }
    />
  </Layout>
);

export default SlopesIndex;
